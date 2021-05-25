using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;

namespace WSCore.Services.UserService
{
    public class UserService : BasicService<User>, IUserService
    {
        public UserService(IUnitOfWork uow) : base(uow) { }

        public async Task CreateUserAsync(UserDto userDto)
        {
            try
            {
                if (userDto == null)
                    throw new ArgumentNullException("Null");

                string hashedPassword = UserHelper.Hash(userDto.Password);
                User userEntity = new User
                {
                    Phone = userDto.Phone,
                    Email = userDto.Email,
                    LoginName = userDto.Phone,
                    CreatedUserId = "469cf3e1",
                    LastSavedUserId = "469cf3e1"
                };

                UserSecret userSecret = new UserSecret
                {
                    Password = hashedPassword,
                    Token = "",
                    UserId = userEntity.Id,
                    CreatedUserId = "469cf3e1",
                    LastSavedUserId = "469cf3e1"
                };

                UserProfile userProfile = new UserProfile
                {
                    UserId = userEntity.Id,
                    CreatedUserId = "469cf3e1",
                    LastSavedUserId = "469cf3e1"
                };

                await _uow.GetRepository<User>().AddAsync(userEntity);
                await _uow.GetRepository<UserSecret>().AddAsync(userSecret);
                await _uow.GetRepository<UserProfile>().AddAsync(userProfile);

                _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString(), ex);
            }
        }


        #region Get
        private async Task<User> GetExistedUserBy(string email, string phone)
        {
            try
            {
                //var result = ""; // await  GetByAsync(s => s.Phone == phone && s.LoginName == loginName, a => a.OrderByDescending(User => User.LastSavedTime), null);
                //if (result != null)
                //    return result.First();
                //else
                    return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Issue with API", ex);
            }
        }
        #endregion Get
    }
}
