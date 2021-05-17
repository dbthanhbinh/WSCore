using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<ActionResult> CreateTagLogic(TagRequest tagRequest)
        {
            if (tagRequest == null)
                return BadRequest();
            Guid myuuid = Guid.NewGuid();
            var rs = await _tagService.AddTagLogicAsync(tagRequest);
            return Ok(rs);
        }
        #endregion Create

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
            return Ok(rs);
        }
        #endregion Get
    }
}
