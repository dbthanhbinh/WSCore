using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Model;
using WSCore.Services.UserService;

namespace WSCore.Services.AuthorService
{
    public class AuthenResVM
    {
        public string UserId { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string LoginName { get; set; }
        public bool IsConfirmed { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string RoleType { get; set; }
    }

    public class AuthenVM : AuthenResVM
    {
        public virtual string Password { get; set; }
    }

    public class UserVM
    {
        public AuthenVM AuthVM { get; set; }
        public string Token { get; set; }
    }

    public class UserResVM
    {
        public AuthenResVM LoggedProfile { get; set; }
        public string Token { get; set; }
        public ClientActVM LoggedPermissions { get; set; }
    }
}
