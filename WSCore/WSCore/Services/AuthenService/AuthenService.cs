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
using WSCore.Services.UserService;

namespace WSCore.Services.AuthorService
{
    public class AuthenService : BasicService<User>, IAuthenService
    {
        private readonly IUserService _userService;
        public AuthenService(
            IUnitOfWork uow,
            IUserService userService
        ) : base(uow, userService) {
            _userService = userService;
        }

        public async Task<UserResVM> Authenticate(string phone, string password)
        {
            try
            {
                AuthenVM user = GetValidUserBy(new AuthenRequest { 
                    Phone = phone,
                    Password = password
                });

                // check account found and verify password
                if (user == null || user.Password == null || !UserHelper.Verify(password, user.Password))
                {
                    // authentication failed
                    return new UserResVM
                    {
                        LoggedProfile = null,
                        Token = null
                    };
                }
                else
                {
                    // authentication successful so generate jwt token
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes("Y2F0Y2hlciUyMHdvbmclMjBsb3ZlJTIwLm5ldA==");
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.Sid, user.UserId.ToString()),
                            new Claim(ClaimTypes.Name, user.LoginName.ToString()),
                            new Claim(ClaimTypes.Email, user.Email.ToString()),
                            new Claim(ClaimTypes.Role, "SupperAdmin"),
                            new Claim(ClaimTypes.MobilePhone, user.Phone.ToString()),
                            new Claim("LoginName", user.LoginName.ToString()),
                            new Claim("UserId", user.UserId.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddDays(2),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    var jwtSecurityToken = tokenHandler.WriteToken(token);
                    user.Password = null;

                    // Get user permissions
                    // ClientActVM userPermissions = _userService.GetUserPermissions(user?.UserId);
                    ClientActVM userPermissions = new ClientActVM();
                    return new UserResVM
                    {
                        LoggedProfile = user,
                        Token = jwtSecurityToken,
                        LoggedPermissions = userPermissions
                    };
                }
            }
            catch (Exception ex)
            {
                // _logger.LogError(ex.InnerException.Message.ToString());
                throw ex;
            }
        }

        private AuthenVM GetValidUserBy(AuthenRequest authRequest)
        {
            try
            {
                string hashedPassword = UserHelper.Hash(authRequest.Password);
                var user = from us in _uow.GetRepository<User>().GetEntities(
                    u => u.IsActive == true && u.LoginName == authRequest.Phone
                 ).Select(s1 => new
                 {
                     s1.Id,
                     s1.Phone,
                     s1.Email,
                     s1.LoginName,
                     s1.IsConfirmed
                 })
                join usr in _uow.GetRepository<UserSecret>().GetEntities(
                    x => x.IsActive == true
                ).Select(s2 => new
                {
                    s2.UserId,
                    s2.Password
                }) on us.Id equals usr.UserId into group1
                from g1 in group1.DefaultIfEmpty()
                join usp in _uow.GetRepository<UserProfile>().GetEntities(
                    x2 => x2.IsActive == true
                ).Select(s3 => new
                {
                    s3.FullName,
                    s3.UserId,
                    s3.Address
                }) on us.Id equals usp.UserId into group2
                from g2 in group2.DefaultIfEmpty()
                select new AuthenVM
                {
                    UserId = us.Id,
                    Phone = us.Phone,
                    Email = us.Email,
                    LoginName = us.LoginName,
                    IsConfirmed = us.IsConfirmed,
                    FullName = g2.FullName,
                    Address = g2.Address,
                    Password = g1.Password
                };
                var re = user?.FirstOrDefault();
                return re;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
