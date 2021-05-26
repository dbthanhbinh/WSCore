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

                var existedUser = GetExistedUserBy(userDto.Email, userDto.Phone);

                if (existedUser)
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
        private bool GetExistedUserBy(string email, string phone)
        {
            try
            {
                var x = (from u in _uow.GetRepository<User>().GetEntities(x => x.Phone == phone && x.Email == email).Select(s => new { s.Id, s.Email, s.Phone })
                         join
                            us in _uow.GetRepository<UserSecret>().GetEntities().Select(s => new { s.Id, s.UserId }) on u.Id equals us.UserId
                         where u.Email == email && u.Phone == phone
                         select new {
                             u.Phone,
                             u.Email,
                             us.UserId
                         }
                     ).FirstOrDefault();

                return x != null;
            }
            catch (Exception ex)
            {
                throw ex;
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
        public UserLoggedInVM Login(string email, string phone, string password)
        {
            try
            {
                UserLoggedInVM userLoggedIn = VerifyLoginUser(email, phone, password);

                if (userLoggedIn == null)
                    return null;

                // Authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("Y2F0Y2hlciUyMHdvbmclMjBsb3ZlJTIwLm5ldA==");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                            new Claim(ClaimTypes.Sid, userLoggedIn.Id.ToString()),
                            new Claim(ClaimTypes.Email, userLoggedIn.Email.ToString()),
                            new Claim(ClaimTypes.Role, "SupperAdmin"),
                            new Claim(ClaimTypes.MobilePhone, userLoggedIn.Phone.ToString()),
                            new Claim("LoginName", userLoggedIn.LoginName.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(2),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtSecurityToken = tokenHandler.WriteToken(token);
                return userLoggedIn;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private UserLoggedInVM VerifyLoginUser(string email, string phone, string password)
        {
            try
            {
                string hashedPassword = UserHelper.Hash(password);
                UserLoggedInVM loggedIn = (from u in _uow.GetRepository<User>()
                                           .GetEntities(x => x.Phone == phone && x.Email == email)
                                           .Select(s => new { s.Id, s.Email, s.Phone, s.LoginName })
                                         join
                                            us in _uow.GetRepository<UserSecret>()
                                            .GetEntities(usr => UserHelper.Verify(usr.Password, hashedPassword))
                                            .Select(s => new { s.UserId, s.Token }) on u.Id equals us.UserId
                                         where u.Email == email && u.Phone == phone
                                         select new UserLoggedInVM
                                         {
                                             Id = u.Id,
                                             Phone = u.Phone,
                                             Email = u.Email,
                                             LoginName = u.LoginName,
                                             UserId = us.UserId,
                                             Token = us.Token
                                         }
                                     ).FirstOrDefault();

                if (loggedIn != null)
                    return loggedIn;
                return new UserLoggedInVM {};
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }

    public class UserLoggedInVM
    {
        public string Id { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string LoginName { get; set; }
        public string UserId { get; set; }
        public string Token { get; set; }
    }

    public class UserCreatedVM
    {
        public string Id { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string LoginName { get; set; }
        public string UserId { get; set; }
        public string Token { get; set; }
    }
}
