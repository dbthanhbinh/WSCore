using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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

                var existedUser = GetExistedUserBy(userDto.Phone);

                if (existedUser)
                    throw new ArgumentNullException("ex");

                string hashedPassword = UserHelper.Hash(userDto.Password);
                User userEntity = new User
                {
                    Phone = userDto.Phone,
                    Email = "email",
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
                    LastSavedUserId = "469cf3e1",
                    RoleId = "469cf3e1",
                    RoleType = "Member"
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

        /*
        public async Task CreateUserAsync(UserDto userDto)
        {
            try
            {
                if (userDto == null)
                    throw new ArgumentNullException("Null");

                var existedUser = GetExistedUserBy(userDto.Phone);

                if (existedUser)
                    throw new ArgumentNullException("ex");

                string hashedPassword = UserHelper.Hash(userDto.Password);
                User userEntity = new User
                {
                    Phone = userDto.Phone,
                    Email = "email",
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
                    LastSavedUserId = "469cf3e1",
                    RoleId = "469cf3e1",
                    RoleType = "Member"
                };


                List<Role> roles = new List<Role>();
                roles.Add(new Role { Title = "Member", Alias = "Member", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                roles.Add(new Role { Title = "Agency", Alias = "Agency", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                roles.Add(new Role { Title = "Editor", Alias = "Editor", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                roles.Add(new Role { Title = "Admin", Alias = "Admin", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                roles.Add(new Role { Title = "SuperAdmin", Alias = "SuperAdmin", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });

                List<Package> packages = new List<Package>();
                packages.Add(new Package { Title = "Bronze", Alias = "Bronze", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                packages.Add(new Package { Title = "Silver", Alias = "Silver", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                packages.Add(new Package { Title = "Gold", Alias = "Gold", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                packages.Add(new Package { Title = "Diamon", Alias = "Diamon", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });

                List<Module> modules = new List<Module>();
                modules.Add(new Module { Title = "User", Alias = "User", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                modules.Add(new Module { Title = "Media", Alias = "Media", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                modules.Add(new Module { Title = "Tag", Alias = "Tag", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                modules.Add(new Module { Title = "Post", Alias = "Post", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                modules.Add(new Module { Title = "Category", Alias = "Category", CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });

                List<PackageModule> packageModules = new List<PackageModule>();
                packageModules.Add(new PackageModule { ModuleId = "28676658", PackageId = "394d0c28", Limit = 10, CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                packageModules.Add(new PackageModule { ModuleId = "73d337a4", PackageId = "394d0c28", Limit = 10, CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                packageModules.Add(new PackageModule { ModuleId = "7d435e92", PackageId = "394d0c28", Limit = 10, CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });
                packageModules.Add(new PackageModule { ModuleId = "c0ce2d3a", PackageId = "394d0c28", Limit = 10, CreatedUserId = "469cf3e1", LastSavedUserId = "469cf3e1" });


                //await _uow.GetRepository<Role>().AddRangeAsync(roles);
                //await _uow.GetRepository<Package>().AddRangeAsync(packages);
                //await _uow.GetRepository<Module>().AddRangeAsync(modules);
                //await _uow.GetRepository<PackageModule>().AddRangeAsync(packageModules);

                // GetPermissions("469cf3e1");

                await _uow.GetRepository<User>().AddAsync(userEntity);
                //await _uow.GetRepository<UserSecret>().AddAsync(userSecret);
                //await _uow.GetRepository<UserProfile>().AddAsync(userProfile);

                _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString(), ex);
            }
        }
        */

        #region Update
        public async Task UpdateAsync(EditUserDto editUserDto)
        {
            if (editUserDto == null)
                throw new ArgumentNullException("Null");

            try
            {
                string modules = editUserDto.Modules;
                List<JSDeserializeObject> objs = JsonConvert.DeserializeObject<List<JSDeserializeObject>>(editUserDto.Modules);

                // userModuleActs
                List<UserModuleAct> userModuleActs = UserModuleActs(GetUserId());

                List<UserModuleAct> lsNew = new List<UserModuleAct>();
                List<UserModuleAct> lsUpdate = new List<UserModuleAct>();
                List<UserModuleAct> lsDel = new List<UserModuleAct>();

                if (objs != null)
                {
                    foreach (JSDeserializeObject obj in objs)
                    {
                        UserModuleAct userModuleAct1 = userModuleActs.Find(s => s.ModuleId == obj.ModuleId && s.PackageId == obj.PackageId);
                        if(userModuleAct1 == null)
                        {
                            UserModuleAct userModuleAct = new UserModuleAct
                            {
                                UserId = GetUserId(),
                                ModuleId = obj.ModuleId,
                                PackageId = obj.PackageId,
                                MemberRole = "Client",
                                Limit = obj.Limit,
                                Acts = obj.Acts,
                                CreatedUserId = GetUserId(),
                                LastSavedUserId = GetUserId()
                            };
                            lsNew.Add(userModuleAct);
                        }
                        else
                        {
                            userModuleAct1.UserId = GetUserId();
                            userModuleAct1.Limit = obj.Limit;
                            userModuleAct1.Acts = obj.Acts;
                            userModuleAct1.LastSavedUserId = GetUserId();
                            userModuleAct1.LastSavedTime = DateTime.UtcNow;
                            lsUpdate.Add(userModuleAct1);
                        }
                    }
                }

                foreach(UserModuleAct userModuleAct1 in userModuleActs)
                {
                    var rs = objs.Find(s => s.ModuleId == userModuleAct1.ModuleId && s.PackageId == userModuleAct1.PackageId);
                    if (rs == null)
                    {  
                        lsDel.Add(userModuleAct1);
                    }
                }

                _uow.GetRepository<UserModuleAct>().UpdateRange(lsUpdate);
                _uow.GetRepository<UserModuleAct>().AddRange(lsNew);
                _uow.GetRepository<UserModuleAct>().DeleteRange(lsDel);
                _uow.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Update

        #region Get
        public async Task<List<User>> GetUsersAsync()
        {
            try
            {
                List<User> users = new List<User>();
                var rs = await _uow.GetRepository<User>().GetByAsync(
                    q => q.IsActive == true,
                    orderBy: o => o.OrderByDescending(v => v.CreatedTime)
                );
                return rs?.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Get Existed user by email , phone
        /// </summary>
        /// <param name="email"></param>
        /// <param name="phone"></param>
        /// <returns></returns>
        private bool GetExistedUserBy(string phone)
        {
            try
            {
                var x = (from u in _uow.GetRepository<User>().GetEntities(x => x.Phone == phone)
                            .Select(s => new { s.Id, s.Email, s.Phone })
                         join
                            us in _uow.GetRepository<UserSecret>().GetEntities().Select(s => new { s.Id, s.UserId }) on u.Id equals us.UserId
                         where u.Phone == phone
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

        public EditUserVM GetEditUserByIdAsync(string userId)
        {
            try
            {
                List<UserModuleAct> userModuleActs = _uow.GetRepository<UserModuleAct>().GetEntities(ua => ua.UserId == userId).ToList();

                var rs = (
                        from u in _uow.GetRepository<User>().GetEntities(
                            x => x.Id == userId && x.IsActive == true
                         )
                         join
                            us in _uow.GetRepository<UserProfile>().GetEntities()
                            on u.Id equals us.UserId
                         where u.Id == userId
                         select new EditUserVM
                         {
                             User = u,
                             UserProfile = us,
                             UserModuleActs = userModuleActs
                         }
                     ).FirstOrDefault();

                return rs;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ExistedUserPermissionVM GetExistedUserById(string userId)
        {
            try
            {
                var x = (from u in _uow.GetRepository<User>().GetEntities(x => x.Id == userId && x.IsActive == true).Select(s => new { s.Id, s.Email, s.Phone })
                         join
                            us in _uow.GetRepository<UserProfile>().GetEntities().Select(s => new { s.RoleId, s.PackageId, s.UserId }) on u.Id equals us.UserId
                         where u.Id == userId
                         select new ExistedUserPermissionVM
                         {
                             Phone = u.Phone,
                             Email = u.Email,
                             UserId = us.UserId,
                             RoleId = us.RoleId,
                             PackageId = us.PackageId
                         }
                     ).FirstOrDefault();

                return x;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private List<ModulesWithPackageIdVM> GetModulesWithPackageId(string packageId)
        {
            try
            {
                var x = (from u in _uow.GetRepository<PackageModule>()
                         .GetEntities(x => x.PackageId == packageId && x.IsActive == true)
                         .Select(s => new { s.Id, s.PackageId, s.ModuleId })
                         join
                            us in _uow.GetRepository<Module>()
                            .GetEntities()
                            .Select(s => new { s.Title, s.Alias, s.Id }) on u.ModuleId equals us.Id
                         where u.PackageId == packageId
                         select new ModulesWithPackageIdVM
                         {
                             PackageModuleId = u.Id,
                             ModuleId = u.ModuleId,
                             PackageId = u.PackageId,
                             ModuleTitle = us.Title,
                             ModuleAlias = us.Alias
                         }
                     ).ToList();

                return x;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Get

        public ClientActVM GetUserPermissions(string userId)
        {
            ExistedUserPermissionVM existedUserPermissionVM = GetExistedUserById(userId);

            List<ModulesWithPackageIdVM> modulesWithPackageIds = new List<ModulesWithPackageIdVM>();

            if (existedUserPermissionVM != null)
            {
                modulesWithPackageIds = GetModulesWithPackageId(existedUserPermissionVM.PackageId);
            }

            // clientAdminModuleActs
            List<UserModuleAct> userModuleActs = UserModuleActs(GetUserId());
            

            // ClientActVM
            string[] otherAdminActs = {}; // List module will effect acts
            ClientActVM clientAct = new ClientActVM
            {
                PackageModules = modulesWithPackageIds,
                ClientTypeRole = existedUserPermissionVM?.PackageId,
                UserModuleActs = userModuleActs,
                ClientOtherActs = otherAdminActs
            };
            return clientAct;
        }

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

        private List<UserModuleAct> UserModuleActs(string userId)
        {
            try
            {
                List<UserModuleAct> userModuleActs = _uow.GetRepository<UserModuleAct>()
                         .GetEntities(x => x.UserId == userId && x.IsActive == true).ToList();

                return userModuleActs;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }


    public class ClientActVM
    {
        public List<ModulesWithPackageIdVM> PackageModules { get; set; }
        public string ClientTypeRole { get; set; } // clien/admin-client
        public List<UserModuleAct> UserModuleActs { get; set; }
        public string[] ClientOtherActs { get; set; }
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

    public class ExistedUserPermissionVM
    {
        public string Phone { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; }
        public string RoleId { get; set; }
        public string PackageId { get; set; }
    }

    public class EditUserVM
    {
        public User User { get; set; }
        public UserProfile UserProfile { get; set; }
        public List<UserModuleAct> UserModuleActs { get; set; }
    }

    public class ModulesWithPackageIdVM
    {
        public string PackageModuleId { get; set; }

        public string ModuleTitle { get; set; }
        public string ModuleAlias { get; set; }
        public string ModuleId { get; set; }

        public string PackageId { get; set; }
    }
}
