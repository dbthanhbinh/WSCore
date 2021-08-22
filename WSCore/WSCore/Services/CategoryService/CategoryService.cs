using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WSCore.Common;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;
using WSCore.Models.Dto;
using WSCore.Models.VM;
using WSCore.Services.ObjectTagService;
using WSCore.Services.UserService;
using WSCore.Services.MediaService;
using System.Linq;
using WSCore.Services.SeoService;

namespace WSCore.Services.CategoryService
{
    public class CategoryService : BasicService<Category>, ICategoryService
    {
        private readonly IObjectTagService _objectTagService;
        private readonly IUserService _userService;
        private readonly IMediaService _mediaService;
        private readonly ISeoService _seoService;

        public CategoryService(
            IUnitOfWork uow,
            IUserService userService,
            IObjectTagService objectTagService,
            IMediaService mediaService,
            ISeoService seoService
        ) : base(uow, userService, objectTagService, mediaService, seoService) {
            _objectTagService = objectTagService;
            _userService = userService;
            _mediaService = mediaService;
            _seoService = seoService;
            controllerObj = "category";
        }

        #region Create
        /// <summary>
        /// Create single Category
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        private async Task<Category> CreateCategory(Category category, bool isSavechange = false)
        {
            try
            {
                await _uow.GetRepository<Category>().AddAsync(category);

                if (isSavechange)
                    _uow.SaveChanges();

                return category;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// Create Category with Logic business
        /// </summary>
        /// <param name="categoryLogicDto"></param>
        /// <returns></returns>
        public async Task<CategoryLogicVM> CreateCategoryLogicAsync(CategoryLogicDto categoryLogicDto)
        {
            //// Get user Permissions
            //ClientActVM userPermissions = _userService.GetUserPermissions(userId);
            //List<ModulesWithPackageIdVM> modulesWithPackageIdVMs = userPermissions.PackageModules;
            //ModulesWithPackageIdVM modulesWithPackage = modulesWithPackageIdVMs.Find(s => s.ModuleId == categoryId);

            //List<UserModuleAct> userModuleActs = userPermissions.UserModuleActs;
            //UserModuleAct userModuleAct = userModuleActs.Find(s => s.ModuleId == modulesWithPackage.ModuleId && s.PackageId == modulesWithPackage.PackageId && s.UserId == userId);
            //string acts = userModuleAct.Acts;
            ////string[] actArray = acts.Split(',');
            //bool a = acts.Contains("Add");

            // Check validation Dto
            string title = categoryLogicDto.Title;
            string alias = categoryLogicDto.Alias;
            // Clean Obj
            CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias, false);

            string content = categoryLogicDto.Content;
            string excerpt = categoryLogicDto.Excerpt;
            CleanObjecAndBuildExcerptDto(ref content, ref excerpt);

            // Create Category logic
            Category category = new Category
            {
                Title = title,
                Alias = alias,
                Excerpt = excerpt,
                Content = content,
                ParentId = categoryLogicDto.ParentId,
                Type = categoryLogicDto.Type,
                CreatedUserId = GetUserId(),
                LastSavedUserId = GetUserId()
            };
            await CreateCategory(category, false);

            // Create Seo
            string seoTitle = (categoryLogicDto.SeoTitle != null) ? categoryLogicDto.SeoTitle : title;
            string seoContent = (categoryLogicDto.SeoContent != null) ? categoryLogicDto.SeoContent : excerpt;
            string seoKeyWord = (categoryLogicDto.SeoKeyWord != null) ? categoryLogicDto.SeoKeyWord : title;
            SeoDto seoDto = new SeoDto
            {
                ObjectId = category.Id,
                ObjectType = category.Type,
                SeoTitle = seoTitle,
                SeoContent = seoContent,
                SeoKeyWord = seoKeyWord
            };
            await _seoService.AddSeoLogicAsync(seoDto);

            // Upload thumbnail/Media
            string mediaId = "";
            Media media = new Media();
            if (categoryLogicDto.File != null)
            {
                media = await _mediaService.CreateOrUpdateSingleMediaAsync(
                    categoryLogicDto.File,
                    category.Id,
                    category.Type,
                    attachedThumb,
                    mediaId,
                    true,
                    false
                );
            }

            _uow.SaveChanges();

            return new CategoryLogicVM
            {
                Category = category,
                Media = media
            };
        }
        #endregion Create

        #region Update

        public async Task<CategoryLogicVM> UpdateCategoryLogicAsync(string id, CategoryLogicDto categoryLogicDto)
        {
            try
            {
                string title = categoryLogicDto.Title;
                string alias = categoryLogicDto.Alias;
                // Clean Obj
                CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias, true);

                string content = categoryLogicDto.Content;
                string excerpt = categoryLogicDto.Excerpt;
                CleanObjecAndBuildExcerptDto(ref content, ref excerpt);

                var dbContext = _uow.GetRepository<Category>();
                CategoryInfoVM categoryInfo = _EditCategoryByIdAsync(id);

                Category category = new Category();
                Media media = new Media();
                if (categoryInfo != null && categoryInfo.Category != null)
                {
                    category = categoryInfo.Category;
                    category.Title = title;
                    category.Alias = alias;
                    category.Excerpt = excerpt;
                    category.Content = content;
                    category.ParentId = categoryLogicDto.ParentId;
                    category.LastSavedUserId = GetUserId();
                    category.LastSavedTime = DateTime.UtcNow;

                    // Update single category
                    dbContext.UpdateAsync(category);

                    // Update Seo
                    Seo seoInfo = await _seoService.GetSeoByObjectAsync(category.Id, category.Type);
                    if (
                        seoInfo != null && 
                        (
                            !string.Equals(categoryLogicDto.SeoTitle, seoInfo.SeoTitle) ||
                            !string.Equals(categoryLogicDto.SeoContent, seoInfo.SeoContent) ||
                            !string.Equals(categoryLogicDto.SeoKeyWord, seoInfo.SeoKeyWord)
                        )
                    )
                    {
                        seoInfo.SeoTitle = categoryLogicDto.SeoTitle;
                        seoInfo.SeoContent = categoryLogicDto.SeoContent;
                        seoInfo.SeoKeyWord = categoryLogicDto.SeoKeyWord;
                        seoInfo.LastSavedUserId = GetUserId();
                        seoInfo.LastSavedTime = DateTime.UtcNow;
                        await _seoService.UpdateSeoEntityAsync(seoInfo, false);
                    }

                    // Upload thumbnail/Media
                    media = categoryInfo.Media;
                    if (categoryLogicDto.File != null)
                    {
                        string mediaId = media?.Id;
                        media = await _mediaService.CreateOrUpdateSingleMediaAsync(
                            categoryLogicDto.File,
                            category.Id,
                            category.Type,
                            attachedThumb,
                            mediaId,
                            true,
                            true
                        );
                    }
                    _uow.SaveChanges();
                }

                return new CategoryLogicVM
                {
                    Category = category,
                    Media = media
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion Update


        #region Get
        public List<CategoriesVM> GetListCategoriesByTypeAsync(string type)
        {
            try
            {
                List<Category> tags = new List<Category>();
                var rs = from cat in _uow.GetRepository<Category>().GetEntities(
                            x => x.IsActive == true && x.Type == type
                         ).Select(s1 => new {
                             s1.Id,
                             s1.Title,
                             s1.Alias,
                             s1.Excerpt,
                             s1.ParentId,
                             s1.Type
                         })
                         join med in _uow.GetRepository<Media>().GetEntities(
                             x => x.IsActive == true
                         ).Select(s2 => new {
                             s2.FileId,
                             s2.Title,
                             s2.Alt,
                             s2.Caption,
                             s2.Path,
                             s2.ObjectId,
                             s2.ObjectType,
                             s2.MediaType,
                             s2.AttachedType,
                             s2.Small,
                             s2.Medium,
                             s2.Large
                         })
                            on cat.Id equals med.ObjectId into leftGroup
                         from media in leftGroup.DefaultIfEmpty()
                         select new CategoriesVM
                         {
                            Id = cat.Id,
                            Title = cat.Title,
                            Alias = cat.Alias,
                            Excerpt = cat.Excerpt,
                            ParentId = cat.ParentId,
                            Type = cat.Type,
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

        public CategoryInfoVM EditCategoryByIdAsync(string id)
        {
            return _EditCategoryByIdAsync(id);
        }

        /// <summary>
        /// Get single Category by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private CategoryInfoVM _EditCategoryByIdAsync(string id)
        {
            try
            {
                var rs = from cat in _uow.GetRepository<Category>().GetEntities(
                            x => x.IsActive == true && x.Id == id,
                            o => o.OrderByDescending(a => a.CreatedTime)
                         )
                         join media in _uow.GetRepository<Media>().GetEntities(m => m.IsActive == true)
                            on cat.Id equals media.ObjectId into group1
                         from g1 in group1.DefaultIfEmpty()

                         join seo in _uow.GetRepository<Seo>().GetEntities(s => s.IsActive == true)
                            on id equals seo.ObjectId into group2
                         from g2 in group2.DefaultIfEmpty()
                         select new CategoryInfoVM
                         {
                             Category = cat,
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
        #endregion Get

        #region Delete

        /// <summary>
        /// Delete Category by CategoryId and delete all Object tags relate to deleted id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Category DeleteCategoryAsync(string id)
        {
            try
            {
                Category category = null;
                category = _uow.GetRepository<Category>().GetById(id);

                if (category != null)
                {
                    // Delete single category
                    _uow.GetRepository<Category>().Delete(category);

                    // Delete ObjectTags relate Deleted tagId
                    // await _objectTagService.DeleteAllObjectTagRelateToObjectDeletedAsync(objectId: id, objectType: category.Type, false);
                }
                _uow.SaveChanges();
                return category;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        #endregion Delete

        #region Mapping

        #endregion Mapping


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
                if(!string.Equals(originalAlias, alias))
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
            if(!string.IsNullOrEmpty(excerpt) && !string.IsNullOrWhiteSpace(excerpt))
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
