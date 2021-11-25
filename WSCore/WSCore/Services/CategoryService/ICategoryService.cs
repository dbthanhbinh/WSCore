using System.Collections.Generic;
using System.Threading.Tasks;
using WSCore.Model;
using WSCore.Models.Dto;
using WSCore.Models.VM;

namespace WSCore.Services.CategoryService
{
    public interface ICategoryService : IBasicService<Category>
    {
        #region Create

        /// <summary>
        /// Create Category with Logic business
        /// </summary>
        /// <param name="categoryLogicDto"></param>
        /// <returns></returns>
        Task<CategoryLogicVM> CreateCategoryLogicAsync(CategoryLogicDto categoryDto);
        #endregion Create

        #region Update
        Task<CategoryInfoVM> UpdateCategoryLogicAsync(string id, CategoryLogicDto categoryLogicDto);
        #endregion Update

        #region Get
        List<CategoriesVM> GetListCategoriesByTypeAsync(string type);
        List<CategoriesVM> GetCategoriesAsync();
        CategoryInfoVM EditCategoryByIdAsync(string id);
        #endregion Get

        #region Delete
        DeleteCategoryVM DeleteCategoryAsync(string id);
        #endregion Delete
    }
}
