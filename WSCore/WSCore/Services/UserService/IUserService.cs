using System.Threading.Tasks;
using WSCore.Model;

namespace WSCore.Services.UserService
{
    public interface IUserService
    {
        /// <summary>
        /// Create new user
        /// </summary>
        /// <param name="userDto"></param>
        /// <returns></returns>
        Task CreateUserAsync(UserDto userDto);
        ExistedUserPermissionVM GetExistedUserById(string userId);

        ClientActVM GetUserPermissions(string userId);

        #region Update
        Task UpdateAsync(EditUserDto editUserDto);
        #endregion Update
    }
}
