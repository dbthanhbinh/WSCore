using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WSCore.Models.Dto;
using WSCore.Services.MenuService;

namespace WSCore.Controllers.V1
{
    [Route("v1/[controller]")]
    [Authorize]
    [ApiController]
    public class MenusController : BaseController
    {
        private readonly IMenuService _menuService;

        public MenusController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        #region Create new menu
        [HttpPost("menus")]
        public async Task<ActionResult> CreateMenuAsync([FromForm] CreateMenuDto createMenuDto)
        {
            if (createMenuDto == null)
                return BadRequest();
            object rs = null;
            if(ModelState.IsValid)
            {
                rs = await _menuService.CreateMenuAsync(createMenuDto, true);
            }
            return Ok(new ApiResponse(rs));
        }

        #endregion End Create menu

        #region Update
        [HttpPut("menus/{menuId}")]
        public async Task<ActionResult> UpdateMenuAsync([FromForm] UpdateMenuDto updateMenuDto, string menuId)
        {
            if (updateMenuDto == null || menuId == null)
                return BadRequest();

            object rs = null;
            if (ModelState.IsValid)
            {
                rs = await _menuService.UpdateMenuAsync(menuId, updateMenuDto, true);
            }
            return Ok(new ApiResponse(rs));
        }
        #endregion Update

        #region Get menu
        [HttpGet("menus/getFilterByMenuType/{menuType}")]
        public async Task<ActionResult> GetFilterByMenuTypeAsync(string menuType) {
            if (menuType == null)
                return Ok(new ApiResponse(null));

            var rs = await _menuService.GetFilterByMenuTypeAsync(menuType);
            return Ok(new ApiResponse(rs));
        }

        [HttpGet("menus/edit/{menuId}")]
        public async Task<ActionResult> GetEditByIdAsync(string menuId)
        {
            if (menuId == null)
                return Ok(new ApiResponse(null));

            var rs = await _menuService.GetEditByIdAsync(menuId);
            return Ok(new ApiResponse(rs));
        }
        #endregion End get menu

        #region Delete
        [HttpDelete("menus/{menuId}")]
        public ActionResult DeleteMenuByIdAsync(string menuId)
        {
            if (menuId == null)
                return BadRequest();

            var rs = _menuService.DeleteMenuByIdAsync(menuId);
            return Ok(new ApiResponse(rs));
        }
        #endregion Delete

    }
}
