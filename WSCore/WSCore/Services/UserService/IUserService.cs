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
        Task CreateAsync(UserDto userDto);

        #region Get
        Task<List<User>> GetUsersAsync();
        EditUserVM GetDetailByIdAsync(string userId);
        ExistedUserPermissionVM GetExistedById(string userId);

        ClientActVM GetPermissionsById(string userId);

        #endregion Get

        #region Update
        Task UpdateAsync(EditUserDto editUserDto);
        #endregion Update
    }
}
