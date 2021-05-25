using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;

namespace WSCore.Services.UserService
{
    public class UserService : BasicService<User>, IUserService
    {
        public UserService(IUnitOfWork uow) : base(uow) { }

        /// <summary>
        /// Create new user
        /// </summary>
        /// <param name="userDto"></param>
        /// <returns></returns>
        public async Task CreateUserAsync(UserDto userDto)
        {
            try
            {
                if (userDto == null)
                    throw new ArgumentNullException("Null");

                var existedUser = await GetExistedUserBy(userDto.Email, userDto.Phone);

                if (existedUser != null)
                    throw new ArgumentNullException("ex");

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
        /// <summary>
        /// Get Existed user by email , phone
        /// </summary>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <returns></returns>
        private async Task<User> GetExistedUserBy(string email, string phone)
        {
            try
            {
                //var user = _uow.GetRepository<User>().GetEntities(x => x.Phone == phone && x.Email == email).FirstOrDefault();
                var x = (from u in _uow.GetRepository<User>().GetEntities(x => x.Phone == phone && x.Email == email).Select(s => new { s.Id, s.Email, s.Phone })
                         join
                            us in _uow.GetRepository<UserSecret>().GetEntities().Select(s => new { s.Id, s.UserId, s.Password }) on u.Id equals us.UserId
                         where u.Email == email && u.Phone == phone
                         select new {
                             u.Phone,
                             u.Email,
                             us.UserId,
                             us.Password
                         }
                     ).FirstOrDefault();

                return null;
            }
            catch (Exception ex)
            {
                throw new Exception("Issue with API", ex);
            }
        }
        #endregion Get


        /// <summary>
        /// Login
        /// </summary>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public async Task<User> Login(string email, string phone, string password)
        {
            try
            {
                string hashedPassword = UserHelper.Hash(password);
                //var user = _uow.GetRepository<User>()
                //    .GetByFilter(u => u.Phone == loginReq.Phone && UserHelper.Verify(u.Password, hashed_password))
                //    .FirstOrDefault();
                var user = await GetExistedUserBy(email, phone);

                // UserHelper.Verify(loginReq.Password, hashed_password)
                // return null if user not found
                if (user == null)
                    return null;

                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("Y2F0Y2hlciUyMHdvbmclMjBsb3ZlJTIwLm5ldA==");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                            new Claim(ClaimTypes.Sid, user.Id.ToString()),
                            new Claim(ClaimTypes.Name, user.FullName.ToString()),
                            new Claim(ClaimTypes.Email, user.Email.ToString()),
                            new Claim(ClaimTypes.Role, "SupperAdmin"),
                            new Claim(ClaimTypes.MobilePhone, user.Phone.ToString()),
                            new Claim("LoginName", user.LoginName.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(2),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtSecurityToken = tokenHandler.WriteToken(token);

                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
