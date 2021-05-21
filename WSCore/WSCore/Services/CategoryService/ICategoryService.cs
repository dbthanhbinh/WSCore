using System.Threading.Tasks;
using WSCore.Model;
using WSCore.Models.Dto;
using WSCore.Models.VM;

namespace WSCore.Services.CategoryService
{
    public interface ICategoryService : IBasicService<Category>
    {
        Task<CategoryLogicVM> CreateCategoryLogicAsync(CategoryLogicDto categoryDto);

        #region Delete
        Task DeleteCategoryByIdAsync(string id);
        #endregion Delete
    }
}
