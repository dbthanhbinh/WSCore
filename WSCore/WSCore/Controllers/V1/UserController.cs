using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WSCore.Services.UserService;

namespace WSCore.Controllers.V1
{
    [Route("v1/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("users")]
        public async Task<ActionResult> CreateUser([FromBody] UserDto userDto)
        {
            if (userDto == null)
                return BadRequest();
            object rs = null;
            if (ModelState.IsValid)
            {
                rs = _userService.CreateUserAsync(userDto);
            }
            return Ok(new ApiResponse(rs));
        }
    }
}
