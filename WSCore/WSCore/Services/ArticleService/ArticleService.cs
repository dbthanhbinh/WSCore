using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using WSCore.Common;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;
using WSCore.Models.Dto;
using WSCore.Models.VM;
using WSCore.Services.MediaService;
using WSCore.Services.ObjectTagService;
using WSCore.Services.SeoService;
using WSCore.Services.UserService;

namespace WSCore.Services.ArticleService
{
    public class ArticleService : BasicService<Article>, IArticleService
    {
        private readonly IUserService _userService;
        private readonly IObjectTagService _objectTagService;
        private readonly IMediaService _mediaService;
        private readonly ISeoService _seoService;

        public ArticleService(
            IUnitOfWork uow,
            IUserService userService,
            IObjectTagService objectTagService,
            IMediaService mediaService,
            ISeoService seoService
        ) : base(uow, userService, objectTagService, mediaService, seoService)
        {
            _userService = userService;
            _objectTagService = objectTagService;
            _mediaService = mediaService;
            _seoService = seoService;
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

        /// <summary>
        /// Create new article bussiness
        /// </summary>
        /// <param name="articleDto"></param>
        /// <returns></returns>
        public async Task<ArticleVM> CreateArticleLogicAsync(ArticleDto articleDto)
        {
            try
            {
                if (!Defined.Posttypes.ContainsKey(articleDto.Type))
                {
                    return new ArticleVM { 
                        Error = true,
                        Message = "Posttype not allowed!"
                    };
                }

                // Create Article
                // Check validation Dto
                string title = articleDto.Title;
                string alias = articleDto.Alias;
                // Clean Obj
                CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias, false);

                string content = articleDto.Content;
                string excerpt = articleDto.Excerpt;
                CleanObjecAndBuildExcerptDto(ref content, ref excerpt);

                // Create logic
                Article article = new Article
                {
                    Title = title,
                    Alias = alias,
                    Excerpt = excerpt,
                    Content = content,
                    Type = articleDto.Type,
                    CategoryId = articleDto.CategoryId,
                    CreatedUserId = GetUserId(),
                    LastSavedUserId = GetUserId()
                };
                await CreateArticleAsync(article, false);

                // Create Seo
                string seoTitle = (articleDto.SeoTitle != null) ? articleDto.SeoTitle : title;
                string seoContent = (articleDto.SeoContent != null) ? articleDto.SeoContent : excerpt;
                string seoKeyWord = (articleDto.SeoKeyWord != null) ? articleDto.SeoKeyWord : title;
                SeoDto seoDto = new SeoDto
                {
                    ObjectId = article.Id,
                    ObjectType = articleDto.Type,
                    SeoTitle = seoTitle,
                    SeoContent = seoContent,
                    SeoKeyWord = seoKeyWord
                };
                await _seoService.AddSeoLogicAsync(seoDto);

                // Create Media/ Media Related
                string mediaId = ""; // for Edit media
                Media media = new Media();
                if (articleDto.File != null)
                {
                    media = await _mediaService.CreateOrUpdateSingleMediaAsync(
                        articleDto.File,
                        article.Id,
                        controllerObj,
                        attachedThumb,
                        mediaId,
                        true,
                        false
                    );
                }

                // Create Tag/ Tag Related                
                string ids = articleDto.TagIds;
                if (ids != null)
                {
                    List<string> tagIds = ids.Split(',').ToList();
                    if (tagIds.Count() > 0)
                    {
                        _objectTagService.UpdateObjectTagsInObject(
                            tagIds,
                            objectId: article?.Id,
                            objectType: article?.Type,
                            articleDto.Type, true
                        );
                    }
                }

                // Save changed
                _uow.SaveChanges();

                return new ArticleVM {
                    Article = article
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

        public async Task<EditArticleInfoVM> UpdateArticleLogicAsync(ArticleDto articleDto, string id)
        {
            try
            {
                ArticleVM articleVM = new ArticleVM();

                // Check validation Dto
                ArticleInfoVM articleInfoVM = _GetArticleById(id);
                if(articleInfoVM?.Article == null)
                {
                    return new EditArticleInfoVM();
                }

                string title = articleDto.Title;
                string alias = articleDto.Alias;

                // Clean Obj
                CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias, true);

                string content = articleDto.Content;
                string excerpt = articleDto.Excerpt;
                CleanObjecAndBuildExcerptDto(ref content, ref excerpt);

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
                    articleU.CategoryId = articleDto.CategoryId;
                    articleU.LastSavedUserId = GetUserId();
                    articleU.LastSavedTime = DateTime.UtcNow;
                    articleU.Type = articleDto.Type;
                }
                UpdateArticle(articleU);

                // Update Seo
                Seo seoInfo = await _seoService.GetSeoByObjectAsync(articleU.Id, articleU.Type);
                if (seoInfo != null)
                {
                    string seoTitle = (articleDto.SeoTitle != null) ? articleDto.SeoTitle : title;
                    string seoContent = (articleDto.SeoContent != null) ? articleDto.SeoContent : excerpt;
                    string seoKeyWord = (articleDto.SeoKeyWord != null) ? articleDto.SeoKeyWord : title;

                    seoInfo.SeoTitle = seoTitle;
                    seoInfo.SeoContent = seoContent;
                    seoInfo.SeoKeyWord = seoKeyWord;
                    seoInfo.LastSavedUserId = GetUserId();
                    seoInfo.LastSavedTime = DateTime.UtcNow;
                    await _seoService.UpdateSeoEntityAsync(seoInfo, false);
                }

                // Create Media/ Media Related
                Media media = new Media();
                media = articleInfoVM.Media;
                if (articleDto.File != null)
                {
                    string mediaId = media?.Id;
                    media = await _mediaService.CreateOrUpdateSingleMediaAsync(
                        articleDto.File,
                        articleU.Id,
                        controllerObj,
                        attachedThumb,
                        mediaId,
                        true,
                        true // Upload thumbnail/Media
                    );
                }

                // Update Tag/ Tag Related
                string ids = articleDto.TagIds;
                if (ids != null)
                {
                    List<string> tagIds = ids.Split(',').ToList();
                    if (tagIds.Count() > 0)
                    {
                        _objectTagService.UpdateObjectTagsInObject(tagIds, objectId: id, objectType: articleU.Type, articleDto.Type, true);
                    }
                }

                // Get list current objecttags
                List<ObjectTag> objectTags = await _objectTagService.GetObjectTagByObjectIdAndObjectTypeAsync(id, articleDto.Type);

                // Save changed
                _uow.SaveChanges();
                return new EditArticleInfoVM
                {
                    Article = articleU,
                    Media = media,
                    Seo = seoInfo,
                    ObjectTags = objectTags
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
        public ArticleInfoVM GetArticleByIdAsync(string id)
        {
            return _GetArticleById(id);
        }

        public EditArticleInfoVM EditArticleByIdAsync(string id)
        {
            return _EditArticleById(id);
        }

        private EditArticleInfoVM _EditArticleById(string id)
        {
            try
            {
                var rs = from ar in _uow.GetRepository<Article>().GetEntities(
                                x => x.IsActive == true && x.Id == id,
                                o => o.OrderByDescending(a => a.CreatedTime)).AsQueryable()
                         join objTag in _uow.GetRepository<ObjectTag>().GetEntities(obt => obt.ObjId == id).AsQueryable()
                            on id equals objTag.ObjId into group1
                         from g1 in group1.DefaultIfEmpty()

                         join md in _uow.GetRepository<Media>().GetEntities(m => m.IsActive == true).AsQueryable()
                            on g1.ObjId equals md.ObjectId into group2
                         from g2 in group2.DefaultIfEmpty()

                         join seo in _uow.GetRepository<Seo>().GetEntities(s => s.IsActive == true).AsQueryable()
                            on g2.ObjectId equals seo.ObjectId into group3
                         from g3 in group3.DefaultIfEmpty()
                         select new ArticleInfoVM
                         {
                             Article = ar,
                             ObjectTag = g1,
                             Media = g2,
                             Seo = g3
                         };

                var res1 = rs?.FirstOrDefault();
                if (res1 == null)
                    return new EditArticleInfoVM();

                List<ArticleInfoVM> ls = rs?.ToList();
                List<ObjectTag> objectTags = new List<ObjectTag>();
                foreach (ArticleInfoVM articleInfoVM in ls)
                {
                    if(articleInfoVM.ObjectTag != null)
                        objectTags.Add(articleInfoVM.ObjectTag);
                }

                return new EditArticleInfoVM
                {
                    Article = res1.Article,
                    ObjectTags =objectTags,
                    Media = res1.Media,
                    Seo = res1.Seo
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private ArticleInfoVM _GetArticleById(string id)
        {
            try
            {
                var rs = from ar in _uow.GetRepository<Article>().GetEntities(
                            x => x.IsActive == true && x.Id == id,
                            o => o.OrderByDescending(a => a.CreatedTime)
                         )
                         join media in _uow.GetRepository<Media>().GetEntities(m => m.IsActive == true)
                            on ar.Id equals media.ObjectId into group1
                         from g1 in group1.DefaultIfEmpty()

                         join seo in _uow.GetRepository<Seo>().GetEntities(s => s.ObjectId == id)
                            on ar.Id equals seo.ObjectId into group2
                         from g2 in group2.DefaultIfEmpty()
                         select new ArticleInfoVM
                         {
                             Article = ar,
                             Media = g1 == null ? null : g1,
                             Seo = g2 == null ? null : g2
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
        public List<ArticlesVM> GetArticles()
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

        /// <summary>
        /// Get Data list with Paging
        /// </summary>
        /// <param name="type"></param>
        /// <param name="currentPage"></param>
        /// <returns></returns>
        public PagingResponse GetArticlesByTypeWithPagingAsync(string type, int currentPage = 1)
        {
            try
            {
                int totalRecords = GetCountTotalArticlesByType(type); // Total
                if(totalRecords <= pageSize)
                {
                    skipIdx = 0;
                    takeNumber = totalRecords;
                }
                else
                {
                    toTalPages = totalRecords / pageSize; // Total Pages will render
                    int mode = totalRecords % pageSize;
                    if (mode > 1)
                    {
                        toTalPages++;
                    }
                    if(currentPage <= 1 || currentPage > toTalPages)
                        skipIdx = 0;
                    else
                        skipIdx = ((currentPage - 1) * pageSize);
                }
                var dataList = GetArticlesByType(type, skipIdx, takeNumber);

                return new PagingResponse(dataList, toTalPages, totalRecords, currentPage, pageSize);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private List<ArticlesVM> GetArticlesByType(string type, int skipIdx, int take)
        {
            try
            {
                    var rs = from ar in _uow.GetRepository<Article>().GetEntities(
                            x => x.IsActive == true && x.Type == type,
                            orderBy: o => o.OrderByDescending(i => i.CreatedTime)
                         )
                         join med in _uow.GetRepository<Media>().GetEntities(x => x.IsActive == true)
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

                return rs?.Skip(skipIdx).Take(take).ToList();
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

                    // Delete Seo

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
        
        private int GetCountTotalArticlesByType(string type)
        {
            try
            {
                return _uow.GetRepository<Article>().GetEntities(
                             x => x.Type == type && x.IsActive == true,
                             orderBy: o => o.OrderByDescending(i => i.CreatedTime)
                         ).AsQueryable().Select(s => new {s.Id}).Count();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Library

    }
}
