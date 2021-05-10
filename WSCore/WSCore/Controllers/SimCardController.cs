using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using WSCore.Common;

namespace WSCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SimCardController : BaseController
    {
        private readonly IConfiguration _config;
        private readonly string ServiceName;
        private readonly string ServiceUrl;
        public SimCardController(
            IConfiguration config
           )
        {
            _config = config;
            ServiceName = _config.GetSection("ApiResources:SimCard:Name").Value;
            ServiceUrl = _config.GetSection("ApiResources:SimCard:Url").Value;
        }

        #region Test
        [HttpGet("test", Name = "test")]
        public ActionResult test()
        {
            string url = ServiceUrl + "SimCard/test";
            var result = BasicCall.SendGetAsync(url);
            return Ok(result);
        }
        #endregion Test

        #region Begin Add
        [HttpGet("add", Name = "AddLogicAsync")]
        public ActionResult AddLogicAsync()
        {
            string url = ServiceUrl + "SimCard/add";
            var result = BasicCall.SendGetAsync(url);
            return Ok(result);
        }

        #endregion End Add

    }
}
