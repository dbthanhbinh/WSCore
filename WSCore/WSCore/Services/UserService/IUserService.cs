using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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

        #region Get
        Task<List<User>> GetUsersAsync();
        EditUserVM GetEditUserByIdAsync(string userId);
        ExistedUserPermissionVM GetExistedUserById(string userId);

        ClientActVM GetUserPermissions(string userId);

        #endregion Get

        #region Update
        Task UpdateAsync(EditUserDto editUserDto);
        #endregion Update
    }
}
