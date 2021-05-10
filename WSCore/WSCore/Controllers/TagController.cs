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

        #region
        [HttpPost("create", Name = "AddTagLogicAsync")]
        public async Task<ActionResult> AddTagLogicAsync(CreateTagBody createTag)
        {
            var rs = await _tagService.AddTagLogicAsync(createTag);
            return Ok(rs);
        }

        #endregion
    }
}
