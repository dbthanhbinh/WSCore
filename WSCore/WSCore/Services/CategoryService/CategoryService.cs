using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WSCore.Common;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;
using WSCore.Models.Dto;
using WSCore.Models.VM;
using WSCore.Services.ObjectTagService;

namespace WSCore.Services.CategoryService
{
    public class CategoryService : BasicService<Category>, ICategoryService
    {
        private readonly IObjectTagService _objectTagService;
        public CategoryService(
            IUnitOfWork uow,
            IObjectTagService objectTagService
        ) : base(uow, objectTagService) {
            _objectTagService = objectTagService;
        }

        #region Create
        /// <summary>
        /// Create single Category
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        private async Task<Category> CreateCategory(Category category)
        {
            try
            {
                await _uow.GetRepository<Category>().AddAsync(category);
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
            // Check validation Dto
            string title = categoryLogicDto.Title;
            string alias = categoryLogicDto.Alias;
            // Clean Obj
            CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias);

            string content = categoryLogicDto.Content;
            string excerpt = categoryLogicDto.Excerpt;
            CleanObjecAndBuildExcerptDto(ref content, ref excerpt);

            // Create Category logic
            Category category = new Category
            {
                Title = title,
                Alias = alias,
                Excerpt = excerpt,
                Content = content
            };
            await CreateCategory(category);

            // Create Tags
            List<string> tagIds = categoryLogicDto.TagIds;
            if(tagIds != null)
            {
                
            }

            _uow.SaveChanges();

            return null;
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
                CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias);

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
                    categoryVM = new CategoryVM {
                        Title = category.Title,
                        Alias = category.Alias,
                        Excerpt = category.Excerpt,
                        Content = category.Content,
                        ParentId = category.ParentId,
                        Type = category.Type,
                        SeoTitle = category.SeoTitle,
                        SeoContent = category.SeoContent,
                        SeoKeyWord = category.SeoKeyWord,
    }
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
        /// Get single Category by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private async Task<Category> GetCategoryByIdAsync(string id)
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
        public async Task DeleteCategoryAsync(string id)
        {
            try
            {
                var dbContext = _uow.GetRepository<Category>();
                Category category = null;
                category = await dbContext.GetByIdAsync(id);

                if (category != null)
                {
                    // Delete single category
                    dbContext.Delete(category);

                    // Delete ObjectTags relate Deleted tagId
                    await _objectTagService.DeleteAllObjectTagRelateToObjectDeletedAsync(objectId: id, objectType: category.Type, false);
                }
                _uow.SaveChanges();
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
        protected void CleanObjecAndBuildtTitleAndAliasDto(ref string title, ref string alias)
        {
            if (title.Length >= 3)
                title = StringHelper.CleanTagHtmlForTitle(title.ToString().Trim());
            if (alias.Length >= 3)
                alias = StringHelper.CleanTagHtmlForTitle(alias.ToString().Trim());

            NameAndAliasVM rs = BGetNameAndAliasVM(title, alias);
            string newAlias = BGetNewAliasAsync(rs.Alias, f => f.Alias.StartsWith(rs.Alias), s => s.Alias);
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
