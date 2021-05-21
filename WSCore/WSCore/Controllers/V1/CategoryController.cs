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

        [HttpPost("categories")]
        public async Task<ActionResult> CreateCategory([FromBody] CategoryLogicDto categoryDto)
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

        [HttpGet("categories", Name = "GetCategories")]
        public ActionResult GetCategories()
        {

            return Ok();
        }

        [HttpGet("categories/{id}")]
        public ActionResult GetCategoryById()
        {
            return Ok();
        }
    }
}
