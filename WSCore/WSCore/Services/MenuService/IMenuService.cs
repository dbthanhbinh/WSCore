using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Model;
using WSCore.Models.Dto;
using WSCore.Models.VM;

namespace WSCore.Services.MenuService
{
    public interface IMenuService : IBasicService<Menu>
    {
        Task<Menu> CreateMenuAsync(CreateMenuDto createMenuDto, bool isSaveChanged);

        #region Begin Update
        Task<EditMenuVM> UpdateMenuAsync(string menuId, UpdateMenuDto updateMenuDto, bool isSaveChanged);
        #endregion End update

        Task<List<Menu>> GetFilterByMenuTypeAsync(string menuType);
        Task<EditMenuVM> GetEditByIdAsync(string id);
        Task<DeleteMenuVM> DeleteMenuByIdAsync(string id);
    }
}
