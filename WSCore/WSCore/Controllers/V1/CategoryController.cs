using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WSCore.Models.Dto;
using WSCore.Services.CategoryService;

namespace WSCore.Controllers.V1
{
    [Route("v1/[controller]")]
    [ApiController]
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _categoryService;
            
        public CategoryController(ICategoryService categoryService) {
            _categoryService = categoryService;
        }

        [HttpGet("categories")]
        public ActionResult GetCategories()
        {
            var rs = _categoryService.GetListCategoriesAsync();
            return Ok(new ApiResponse(rs));
        }

        [HttpGet("categories/{categoryId}")]
        public ActionResult GetCategoryById(string categoryId)
        {
            var rs = _categoryService.GetCategoryByIdAsync(categoryId);
            return Ok(new ApiResponse(rs));
        }

        [HttpPost("categories")]
        public async Task<ActionResult> CreateCategory([FromForm] CategoryLogicDto categoryDto)
        {
            if (categoryDto == null)
                return BadRequest();
            object rs = null;
            if (ModelState.IsValid)
            {
                rs = await _categoryService.CreateCategoryLogicAsync(categoryDto);
            }
            return Ok(new ApiResponse(rs));
        }

        [HttpPut("categories/{categoryId}")]
        public async Task<ActionResult> UpdateCategory([FromForm] CategoryLogicDto categoryDto, string categoryId)
        {
            if (categoryDto == null)
                return BadRequest();
            object rs = null;
            if (ModelState.IsValid)
            {
                rs = await _categoryService.UpdateCategoryLogicAsync(categoryId, categoryDto);
            }
            return Ok(new ApiResponse(rs));
        }

        [HttpDelete("categories/{categoryId}")]
        public ActionResult DeleteCategoryById(string categoryId)
        {
            var rs = _categoryService.DeleteCategoryAsync(categoryId);
            return Ok(new ApiResponse(rs));
        }
    }
}
