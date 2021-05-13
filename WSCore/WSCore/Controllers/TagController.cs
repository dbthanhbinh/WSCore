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

            var rs = await _tagService.AddTagLogicAsync(tagRequest);
            return Ok(rs);
        }
        #endregion Create

        [HttpGet("getTagByAlias/{alias}", Name = "GetTagByAlias")]
        public async Task<ActionResult> GetTagByAlias(string alias)
        {
            var rs = await _tagService.GetTagByAliasAsync(alias);
            return Ok();
        }
    }
}
