using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WSCore.Models.Dto;
using WSCore.Services.TagService;

namespace WSCore.Controllers.V1
{
    [Route("v1/[controller]")]
    [ApiController]
    public class TagController : BaseController
    {
        private readonly ITagService _tagService;
        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        #region Create
        [HttpPost("tags")]
        public async Task<ActionResult> CreateTag([FromBody] TagDto tagDto)
        {
            if (tagDto == null)
                return BadRequest();
            var rs = await _tagService.CreateTagAsync(tagDto);
            return Ok(new ApiResponse(rs));
        }
        #endregion Create

        #region Update
        [HttpPut("tags/{tagId}")]
        public async Task<ActionResult> UpdateTag([FromBody] UpdateTagModel updateTagModel, string tagId)
        {
            if (updateTagModel == null)
                return BadRequest();

            object rs = null;
            if (ModelState.IsValid) {
                rs = await _tagService.UpdateTagAsync(updateTagModel, tagId);
            }
            return Ok(new ApiResponse(rs));
        }
        #endregion Update

        #region Delete
        [HttpDelete("tags/{id}")]
        public async Task<ActionResult> DeleteTag(string id)
        {
            var rs = await _tagService.DeleteTagByIdAsync(id);
            return Ok(rs);
        }
        #endregion Delete

        #region Get
        [HttpGet("tags")]
        public async Task<ActionResult> GetTags()
        {
            var rs = await _tagService.GetTagsAsync();
            return Ok(new ApiResponse(rs));
        }

        [HttpGet("tags/{alias}")]
        public ActionResult GetTagByAlias(string alias)
        {
            var rs = _tagService.GetTagStartsWithAliasAsync(alias);
            return Ok(new ApiResponse(rs));
        }

        [HttpGet("getByid/{id}")]
        public async Task<ActionResult> GetTagById(string id)
        {
            var rs = await _tagService.GetTagByIdAsync(id);
            return Ok(new ApiResponse(rs));
        }
        #endregion Get
    }
}
