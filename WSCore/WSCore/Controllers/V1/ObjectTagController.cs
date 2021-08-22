using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WSCore.Services.ObjectTagService;

namespace WSCore.Controllers.V1
{
    [Route("v1/[controller]")]
    [ApiController]
    public class ObjectTagController : BaseController
    {
        private readonly IObjectTagService _objectTagService;
        public ObjectTagController(IObjectTagService objectTagService)
        {
            _objectTagService = objectTagService;
        }

        #region Get
        [HttpGet("objecttags/{objectType}/{objectId}")]
        public async Task<ActionResult> GetListObjectTagsByObjectId(string objectId, string objectType)
        {
            var rs = await _objectTagService.GetObjectTagByObjectIdAndObjectTypeAsync(objectId, objectType);
            return Ok(new ApiResponse(rs));
        }
        #endregion Get
    }
}
