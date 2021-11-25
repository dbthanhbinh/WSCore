using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Services.AuthorService
{
    public class AuthenRequest
    {
        public string Phone { set; get; }
        public string Password { set; get; }
    }

    public class LoginBody
    {
        public string Phone { set; get; }
        public string Password { set; get; }
    }
}
