using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;
using WSCore.Models.Dto;
using WSCore.Models.VM;
using WSCore.Services.Constants;
using WSCore.Services.UserService;

namespace WSCore.Services.MenuService
{
    public class MenuService : BasicService<Menu>, IMenuService
    {
        public MenuService(
            IUnitOfWork uow,
            IUserService userService
        ) : base(uow, userService) {}

        public async Task<Menu> CreateMenuAsync(CreateMenuDto createMenuDto, bool isSaveChanged)
        {
            try
            {
                Menu newEntity = new Menu
                {
                    Title = createMenuDto.Title,
                    Excerpt = createMenuDto.Excerpt,
                    ParentId = createMenuDto.ParentId,
                    CustomType = createMenuDto.CustomType,
                    MenuType = createMenuDto.MenuType,
                    CustomUrl = createMenuDto.CustomUrl,
                    CreatedUserId = GetUserId(),
                    LastSavedUserId = GetUserId()
                };
                await _uow.GetRepository<Menu>().AddAsync(newEntity);
                if (isSaveChanged)
                {
                    await _uow.SaveChangesAsync();
                }
                return newEntity;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        #region Begin update
        public async Task<EditMenuVM> UpdateMenuAsync(string menuId, UpdateMenuDto updateMenuDto, bool isSaveChanged)
        {
            try
            {
                Menu menuEntity = await _GetMenuById(menuId);
                if (menuEntity == null)
                {
                    return new EditMenuVM
                    {
                        Menu = new Menu()
                    };
                }
            
                menuEntity.Title = updateMenuDto.Title;
                menuEntity.Excerpt = updateMenuDto.Excerpt;
                menuEntity.ParentId = updateMenuDto.ParentId;
                menuEntity.CustomUrl = updateMenuDto.CustomUrl;

                _uow.GetRepository<Menu>().UpdateAsync(menuEntity);
                if (isSaveChanged)
                {
                    await _uow.SaveChangesAsync();
                }
                return new EditMenuVM {
                    Menu = menuEntity
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion End update

        #region Get menu
        public async Task<List<Menu>> GetFilterByMenuTypeAsync(string menuType)
        {
            try
            {
                var rs = await _uow.GetRepository<Menu>().GetByAsync(x => x.MenuType == menuType && x.IsActive == true);
                return rs?.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<EditMenuVM> GetEditByIdAsync(string id)
        {
            try
            {
                var rs = await _GetMenuById(id);
                return new EditMenuVM { 
                    Menu = rs??null
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task<Menu> _GetMenuById(string menuId)
        {
            try
            {
                Menu menuEntity = new Menu();
                if (menuId == null)
                    return menuEntity;
                var rs = await _uow.GetRepository<Menu>().GetByAsync(x => x.Id == menuId && x.IsActive == true);
                return menuEntity = rs?.FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion End get menu

        #region Delete
        public async Task<DeleteMenuVM> DeleteMenuByIdAsync(string id)
        {
            try
            {
                Menu menu = null;
                menu = _uow.GetRepository<Menu>().GetById(id);
                // Check Not allow delete if menu = null
                if(menu == null)
                {
                    return new DeleteMenuVM
                    {
                        Error = true,
                        Message = MsgConstants.DONOT_FOUND_ITEM
                    };
                }

                // Check permission allow delete
                bool hasPermission = this.CheckPermission("category", "Delete");
                if (!hasPermission)
                {
                    return new DeleteMenuVM
                    {
                        Error = true,
                        Message = MsgConstants.DONOT_HAVE_PERMISSION
                    };
                }

                // Check Item has childs and Not allow delete
                var hasChild = await _uow.GetRepository<Menu>().GetByAsync(x => x.ParentId == menu.Id && x.IsActive == true);
                if (hasChild.Count() > 1)
                {
                    return new DeleteMenuVM
                    {
                        Error = true,
                        Message = MsgConstants.ITEM_HAS_CHILDS
                    };
                }

                // Delete single
                _uow.GetRepository<Menu>().Delete(menu);
                _uow.SaveChanges();

                return new DeleteMenuVM
                {
                    Menu = menu
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        #endregion End Delete

    }
}
