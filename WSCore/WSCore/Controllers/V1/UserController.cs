using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
        public ActionResult Create([FromBody] UserDto userDto)
        {
            if (userDto == null)
                return BadRequest();
            object rs = null;
            if (ModelState.IsValid)
            {
                rs = _userService.CreateAsync(userDto);
            }
            return Ok(new ApiResponse(rs));
        }

        [HttpPut("users")]
        public ActionResult UpdateAsync([FromBody] EditUserDto editUserDto)
        {
            if (editUserDto == null)
                return BadRequest();

            object rs = null;
            if (ModelState.IsValid)
            {
                rs = _userService.UpdateAsync(editUserDto);
            }
            return Ok(new ApiResponse(rs));
        }

        #region Get
        [HttpGet("users")]
        public async Task<ActionResult> GetUsers()
        {
            var rs = await _userService.GetUsersAsync();
            return Ok(new ApiResponse(rs));
        }

        [HttpGet("users/{userId}")]
        public ActionResult GetDetailById(string userId)
        {
            if (userId == null)
                return BadRequest();
            object rs = null;

            rs = _userService.GetDetailByIdAsync(userId);
            return Ok(new ApiResponse(rs));
        }

        [HttpGet("permissions/{userId}")]
        public ActionResult GetPermissionById(string userId)
        {
            if (userId == null)
                return BadRequest();
            object rs = null;
            rs = _userService.GetPermissionsById(userId);
            return Ok(new ApiResponse(rs));
        }
        #endregion Get
    }
}
