using System;
using System.Threading.Tasks;
using WSCore.Common.Business;
using WSCore.Model;

namespace WSCore.Services.UserService
{
    public interface IUserService :IBaseService<User>
    {
        /// <summary>
        /// Create new user
        /// </summary>
        /// <param name="userDto"></param>
        /// <returns></returns>
        Task CreateUserAsync(UserDto userDto);
    }
}
