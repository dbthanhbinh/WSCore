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
using WSCore.Services.UploadService;
using WSCore.Services.MediaService;
using System.Linq;

namespace WSCore.Services.CategoryService
{
    public class CategoryService : BasicService<Category>, ICategoryService
    {
        private readonly IObjectTagService _objectTagService;
        private readonly IUserService _userService;
        private readonly IMediaService _mediaService;
        
        public CategoryService(
            IUnitOfWork uow,
            IUserService userService,
            IObjectTagService objectTagService,
            IMediaService mediaService
        ) : base(uow, userService, objectTagService, mediaService) {
            _objectTagService = objectTagService;
            _userService = userService;
            _mediaService = mediaService;
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
                CreatedUserId = GetUserId(),
                LastSavedUserId = GetUserId()
            };
            await CreateCategory(category, false);

            string mediaId = "";
            // Upload thumbnail/Media
            Media media = new Media();
            if (categoryLogicDto.File != null)
            {
                media = await _mediaService.CreateOrUpdateSingleMediaAsync(
                    categoryLogicDto.File,
                    category.Id, controllerObj,
                    attachedThumb,
                    mediaId,
                    true,
                    false
                );
            }

            // Create Tags
            List<string> tagIds = categoryLogicDto.TagIds;
            if (tagIds != null)
            {

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
                CategoryInfoVM categoryInfo = GetCategoryByIdAsync(id);

                Category category = new Category();
                Media media = new Media();
                if (categoryInfo != null)
                {
                    category = categoryInfo.Category;
                    category.Title = title;
                    category.Alias = alias;
                    category.Excerpt = excerpt;
                    category.Content = content;
                    category.SeoTitle = categoryLogicDto.SeoTitle;
                    category.SeoContent = categoryLogicDto.SeoContent;
                    category.SeoKeyWord = categoryLogicDto.SeoKeyWord;
                    category.ParentId = categoryLogicDto.ParentId;
                    category.LastSavedUserId = GetUserId();
                    category.LastSavedTime = DateTime.UtcNow;

                    // Update single category
                    dbContext.UpdateAsync(category);

                    // Update tags
                    List<string> tagIds = categoryLogicDto.TagIds;
                    _objectTagService.UpdateObjectTagsInObject(tagIds, objectId: id, objectType: category.Type, "category", false);

                    media = categoryInfo.Media;
                    // Upload thumbnail/Media
                    if (categoryLogicDto.File != null)
                    {
                        string mediaId = media?.Id;
                        media = await _mediaService.CreateOrUpdateSingleMediaAsync(
                            categoryLogicDto.File,
                            category.Id, controllerObj,
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

        public List<CategoriesVM> GetListCategoriesAsync()
        {
            try
            {
                List<Category> tags = new List<Category>();
                var dbContext = _uow.GetRepository<Category>();
                var dbContext2 = _uow.GetRepository<Media>();

                var rs = from cat in dbContext.GetEntities(x => x.IsActive == true)
                         join med in dbContext2.GetEntities(x => x.IsActive == true)
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

        /// <summary>
        /// Get single Category by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public CategoryInfoVM GetCategoryByIdAsync(string id)
        {
            try
            {
                var dbContext = _uow.GetRepository<Category>();
                var dbContext2 = _uow.GetRepository<Media>();

                var rs = from cat in dbContext.GetEntities(x => x.IsActive == true && x.Id == id, o => o.OrderByDescending(a => a.CreatedTime))
                         join media in dbContext2.GetEntities(m => m.IsActive == true)
                         on cat.Id equals media.ObjectId into relatedMedia
                         from a in relatedMedia.DefaultIfEmpty()
                         select new CategoryInfoVM
                         {
                             Category = cat,
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
