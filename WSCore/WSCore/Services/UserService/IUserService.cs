using System;
using System.Threading.Tasks;
using WSCore.Common.Business;
using WSCore.Model;

namespace WSCore.Services.UserService
{
    public interface IUserService :IBaseService<User>
    {
        Task CreateUserAsync(UserDto userDto);
    }
}
