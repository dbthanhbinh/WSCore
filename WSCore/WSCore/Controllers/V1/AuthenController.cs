using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WSCore.Services.AuthorService;
using WSCore.Services.UserService;

namespace WSCore.Controllers.V1
{
    [Route("v1/[controller]")]
    [ApiController]
    public class AuthenController : ControllerBase
    {
        private readonly IAuthenService _authenService;
        public AuthenController(IAuthenService authenService)
        {
            _authenService = authenService;
        }

        #region Login
        [HttpPost("login")]
        public async Task<ActionResult> LoginAsync([FromBody] LoginBody loginBody)
        {
            string phone = loginBody.Phone;
            string password = loginBody.Password;
            var result = await _authenService.Authenticate(phone, password);
            return Ok(new ApiResponse(result));
        }
        #endregion Login
    }
}
