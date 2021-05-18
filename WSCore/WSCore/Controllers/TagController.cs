using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WSCore.Controllers.Base;
using WSCore.Services.TagService;

namespace WSCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : BaseController
    {
        private readonly ITagService _tagService;
        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        #region Create
        [HttpPost("create", Name = "CreateTagLogic")]
        public async Task<ActionResult> CreateTagLogic([FromBody] CreateTagModel createTagModel)
        {
            if (createTagModel == null)
                return BadRequest();
            var rs = await _tagService.AddTagLogicAsync(createTagModel);
            return Ok(new ApiResponse(rs));
        }
        #endregion Create

        #region Update
        [HttpPut("update", Name = "UpdateTagLogic")]
        public async Task<ActionResult> UpdateTagLogic([FromBody] UpdateTagModel updateTagModel)
        {
            if (updateTagModel == null)
                return BadRequest();

            object rs = null;
            if (ModelState.IsValid) {
                rs = await _tagService.UpdateTagLogicAsync(updateTagModel);
            }
            return Ok(new ApiResponse(rs));
        }
        #endregion Update

        #region Delete
        [HttpDelete("delete/{id}", Name = "DeleteTag")]
        public ActionResult DeleteTag(string id)
        {
            var rs = _tagService.DeleteTagByIdAsync(id);
            return Ok(rs);
        }
        #endregion Delete

        #region Get
        [HttpGet("getTagByAlias/{alias}", Name = "GetTagByAlias")]
        public ActionResult GetTagByAlias(string alias)
        {
            var rs = _tagService.GetTagStartsWithAliasAsync(alias);
            return Ok(new ApiResponse(rs));
        }
        #endregion Get
    }
}
