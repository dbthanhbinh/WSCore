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
            string categoryId = "73d337a4";
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

            // Upload thumbnail/Media
            if(categoryLogicDto.File != null)
                await _mediaService.CreateSingleMediaAsync(categoryLogicDto.File, category.Id, controllerObj, attachedThumb, true); //Upload(categoryLogicDto.File, "categories");

            // Create Tags
            List<string> tagIds = categoryLogicDto.TagIds;
            if (tagIds != null)
            {

            }

            _uow.SaveChanges();

            return new CategoryLogicVM
            {
                category = category
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
                Category category = await GetCategoryByIdAsync(id);
                if(category != null)
                {
                    category.Title = title;
                    category.Alias = alias;
                    category.Excerpt = excerpt;
                    category.Content = content;
                    category.ParentId = categoryLogicDto.ParentId;

                    // Update single category
                    dbContext.UpdateAsync(category);

                    // Update tags
                    List<string> tagIds = categoryLogicDto.TagIds;
                    _objectTagService.UpdateObjectTagsInObject(tagIds, objectId: id, objectType: category.Type, "category", false);

                    _uow.SaveChanges();
                }

                return new CategoryLogicVM
                {
                    category = category
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion Update


        #region Get

        public async Task<List<Category>> GetListCategoriesAsync()
        {
            try
            {
                List<Category> tags = new List<Category>();
                var dbContext = _uow.GetRepository<Category>();
                var rs = await dbContext.GetByAsync(
                        q => q.IsActive == true,
                        o => o.OrderByDescending(Category => Category.CreatedTime)
                    );
                return tags = rs?.ToList();
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
        public async Task<Category> GetCategoryByIdAsync(string id)
        {
            try
            {
                var dbContext = _uow.GetRepository<Category>();
                return await dbContext.GetByIdAsync(id);
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
    }
}
