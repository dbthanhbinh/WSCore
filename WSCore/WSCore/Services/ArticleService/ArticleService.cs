using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Common;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;
using WSCore.Models.Dto;
using WSCore.Models.VM;
using WSCore.Services.MediaService;
using WSCore.Services.ObjectTagService;
using WSCore.Services.UserService;

namespace WSCore.Services.ArticleService
{
    public class ArticleService : BasicService<Article>, IArticleService
    {
        private readonly IObjectTagService _objectTagService;
        private readonly IMediaService _mediaService;

        public ArticleService(
            IUnitOfWork uow,
            IUserService userService,
            IObjectTagService objectTagService,
            IMediaService mediaService
        ) : base(uow, userService, objectTagService, mediaService)
        {
            _objectTagService = objectTagService;
            _mediaService = mediaService;
            controllerObj = "article";
        }

        #region Create
        /// <summary>
        /// Create Article Entity
        /// </summary>
        /// <param name="article"></param>
        /// <param name="isSavechange"></param>
        /// <returns></returns>
        private async Task<Article> CreateArticleAsync(Article article, bool isSavechange = false)
        {
            try
            {
                await _uow.GetRepository<Article>().AddAsync(article);
                if (isSavechange)
                    _uow.SaveChanges();

                return article;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ArticleVM> CreateArticleLogicAsync(ArticleDto articleDto)
        {
            try
            {
                // Create Article
                // Check validation Dto
                string title = articleDto.Title;
                string alias = articleDto.Alias;
                // Clean Obj
                CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias, false);

                string content = articleDto.Content;
                string excerpt = articleDto.Excerpt;
                CleanObjecAndBuildExcerptDto(ref content, ref excerpt);

                // Create Category logic
                Article article = new Article
                {
                    Title = title,
                    Alias = alias,
                    Excerpt = excerpt,
                    Content = content,
                    CreatedUserId = GetUserId(),
                    LastSavedUserId = GetUserId()
                };
                await CreateArticleAsync(article, false);

                // Create Media/ Media Related
                string mediaId = ""; // for Edit media
                Media media = new Media();
                if (articleDto.File != null)
                {
                    media = await _mediaService.CreateOrUpdateSingleMediaAsync(
                        articleDto.File,
                        article.Id, controllerObj,
                        attachedThumb,
                        mediaId,
                        true,
                        false
                    );
                }

                // Create Tag/ Tag Related
                List<string> tagIds = articleDto.TagIds;
                if (tagIds != null)
                {

                }

                // Create Seo


                // Save changed
                _uow.SaveChanges();

                return new ArticleVM {

                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion Create

        #region Update
        private Article UpdateArticle(Article article, bool isSavechange = false)
        {
            try
            {
                _uow.GetRepository<Article>().Update(article);
                if (isSavechange)
                    _uow.SaveChanges();

                return article;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ArticleVM> UpdateArticleLogicAsync(ArticleDto articleDto, string id)
        {
            try
            {
                string title = articleDto.Title;
                string alias = articleDto.Alias;
                // Clean Obj
                CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias, true);

                string content = articleDto.Content;
                string excerpt = articleDto.Excerpt;
                CleanObjecAndBuildExcerptDto(ref content, ref excerpt);

                ArticleInfoVM articleInfoVM = GetArticleByIdAsync(id);

                // Update Category logic
                Article articleU = new Article();
                if (articleInfoVM != null)
                {
                    articleU = articleInfoVM.Article;
                    articleU.Title = title;
                    articleU.Alias = alias;
                    articleU.Excerpt = excerpt;
                    articleU.Content = content;
                    articleU.ParentId = articleDto.ParentId;
                    articleU.LastSavedUserId = GetUserId();
                    articleU.LastSavedTime = DateTime.UtcNow;
                }
                UpdateArticle(articleU);

                // Create Media/ Media Related
                Media media = new Media();
                media = articleInfoVM.Media;
                if (articleDto.File != null)
                {
                    string mediaId = media?.Id;
                    media = await _mediaService.CreateOrUpdateSingleMediaAsync(
                        articleDto.File,
                        articleU.Id, controllerObj,
                        attachedThumb,
                        mediaId,
                        true,
                        true // Upload thumbnail/Media
                    );
                }

                // Update Tag/ Tag Related
                List<string> tagIds = articleDto.TagIds;
                if (tagIds != null)
                {

                }


                // Save changed
                _uow.SaveChanges();

                return new ArticleVM
                {

                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion Update

        #region Get
        /// <summary>
        /// Get single Article by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private ArticleInfoVM GetArticleByIdAsync(string id)
        {
            try
            {
                var dbContext = _uow.GetRepository<Article>();
                var dbContext2 = _uow.GetRepository<Media>();

                var rs = from ar in dbContext.GetEntities(x => x.IsActive == true && x.Id == id, o => o.OrderByDescending(a => a.CreatedTime))
                         join media in dbContext2.GetEntities(m => m.IsActive == true)
                         on ar.Id equals media.ObjectId into relatedMedia
                         from a in relatedMedia.DefaultIfEmpty()
                         select new ArticleInfoVM
                         {
                             Article = ar,
                             Media = a == null ? null : a
                         };

                var re = rs?.FirstOrDefault();
                return re;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// get list all articles
        /// </summary>
        /// <returns></returns>
        public List<ArticlesVM> GetListArticle()
        {
            try
            {
                var dbContext = _uow.GetRepository<Article>();
                var dbContext2 = _uow.GetRepository<Media>();

                var rs = from ar in dbContext.GetEntities(x => x.IsActive == true, orderBy: o => o.OrderByDescending(i => i.CreatedTime))
                         join med in dbContext2.GetEntities(x => x.IsActive == true)
                         on ar.Id equals med.ObjectId into leftGroup
                         from media in leftGroup.DefaultIfEmpty()
                         select new ArticlesVM
                         {
                             Id = ar.Id,
                             Title = ar.Title,
                             Alias = ar.Alias,
                             Excerpt = ar.Excerpt,
                             ParentId = ar.ParentId,
                             Type = ar.Type,
                             Media = media == null ? null : new MediasVM
                             {
                                 FileId = media.FileId,
                                 Title = media.Title,
                                 Alt = media.Alt,
                                 Caption = media.Caption,
                                 Path = media.Path,
                                 ObjectId = media.ObjectId,
                                 ObjectType = media.ObjectType,
                                 MediaType = media.MediaType,
                                 AttachedType = media.AttachedType,
                                 Small = media.Small,
                                 Medium = media.Medium,
                                 Large = media.Large
                             }
                         };

                return rs?.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion Get

        #region Delete
        public Article DeleteArticleById(string id)
        {
            try
            {
                Article article = null;
                article = _uow.GetRepository<Article>().GetById(id);

                if (article != null)
                {
                    // Delete single item
                    _uow.GetRepository<Article>().Delete(article);

                    // Delete ObjectTags relate Deleted tagId
                    // await _objectTagService.DeleteAllObjectTagRelateToObjectDeletedAsync(objectId: id, objectType: category.Type, false);
                }
                _uow.SaveChanges();
                return article;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        #endregion Delete

        #region Library
        /// <summary>
        /// Clean html tags and build frienly alias from title or not
        /// </summary>
        /// <param name="title"></param>
        /// <param name="alias"></param>
        protected void CleanObjecAndBuildtTitleAndAliasDto(ref string title, ref string alias, bool isEdit)
        {
            string originalAlias = alias;
            if (title.Length >= 3)
                title = StringHelper.CleanTagHtmlForTitle(title.ToString().Trim());
            if (alias?.Length >= 3)
                alias = StringHelper.CleanTagHtmlForTitle(alias.ToString().Trim());

            NameAndAliasVM rs = new NameAndAliasVM();
            rs = BGetNameAndAliasVM(title, alias);
            string newAlias = rs.Alias;

            if (isEdit)
            {
                if (!string.Equals(originalAlias, alias))
                {
                    newAlias = BGetNewAliasAsync(rs.Alias, f => f.Alias.StartsWith(rs.Alias), s => s.Alias);
                }
            }
            else
            {
                newAlias = BGetNewAliasAsync(rs.Alias, f => f.Alias.StartsWith(rs.Alias), s => s.Alias);
            }

            title = rs.Name;
            alias = newAlias;
        }

        protected void CleanObjecAndBuildExcerptDto(ref string content, ref string excerpt)
        {
            if (!string.IsNullOrEmpty(excerpt) && !string.IsNullOrWhiteSpace(excerpt))
            {
                excerpt = StringHelper.CleanTagHtmlForTitle(excerpt.ToString().Trim());
            }

            if (!string.IsNullOrEmpty(content) && !string.IsNullOrWhiteSpace(content))
            {
                content = StringHelper.CleanTagHtmlForTitle(content.ToString().Trim());
            }

            if (
                (string.IsNullOrEmpty(content) && string.IsNullOrWhiteSpace(content))
                && (string.IsNullOrEmpty(excerpt) || string.IsNullOrWhiteSpace(excerpt))
            )
            {
                excerpt = StringHelper.GenerateLimitCharacter(content, 150, false);
            }
        }
        #endregion Library
    }
}
