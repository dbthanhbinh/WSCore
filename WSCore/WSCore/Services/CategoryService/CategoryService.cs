using System;
using System.Threading.Tasks;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;
using WSCore.Models.Dto;
using WSCore.Models.VM;

namespace WSCore.Services.CategoryService
{
    public class CategoryService : BasicService<Category>, ICategoryService
    {
        public CategoryService(IUnitOfWork uow) : base(uow) { }

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

        public async Task<CategoryLogicVM> CreateCategoryLogicAsync(CategoryLogicDto categoryLogicDto)
        {
            // Check validation Dto

            // Create Category logic
            Category category = new Category
            {
                Title = categoryLogicDto.Title,
                Alias = categoryLogicDto.Alias,
                Excerpt = categoryLogicDto.Excerpt,
                Content = categoryLogicDto.Content
            };
            await CreateCategory(category);

            // Create Tags
            string[] tagIds = categoryLogicDto.TagIds;
            if(tagIds != null)
            {
                
            }

            _uow.SaveChanges();

            return null;
        }

        #region Delete
        public async Task DeleteCategoryByIdAsync(string id)
        {
            try
            {
                var dbContext = _uow.GetRepository<Category>();
                Category category = null;
                category = await dbContext.GetByIdAsync(id);

                if (category != null)
                {
                    // Delete tag
                    dbContext.Delete(category);

                    // Delete ObjectTags relate Deleted tagId
                    await _objectTagService.DeleteObjectTagByDeleteTagIdAsync(id, false);
                }
                _uow.SaveChanges();
            }
            catch (Exception ex)
            {

            }

        }
        #endregion Delete
    }
}
