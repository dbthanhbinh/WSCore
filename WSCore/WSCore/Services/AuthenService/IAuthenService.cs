using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Model;

namespace WSCore.Services.AuthorService
{
    public interface IAuthenService : IBasicService<User>
    {
        Task<UserResVM> Authenticate(string phone, string password);
    }
}
