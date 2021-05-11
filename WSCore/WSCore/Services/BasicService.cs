using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Infrastructure.UnitOfWork;

namespace WSCore.Services
{
    public class BasicService<T> where T : class
    {
        public readonly IUnitOfWork _uow;

        public BasicService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public async Task<string> BGetAlias()
        {
            return "dđ";
        }



        public async Task<string> BGetNewAliasAsync(string alias)
        {
            var crUow = _uow.GetRepository<Tag>();
            var crAlias = alias;

            var tag = crUow.GetEntities(f => f.Alias == crAlias).Select(s => s.Title).ToList();
            if (tag == null)
                return crAlias;

            Random rd = new Random();
            var doTag = "";
            do
            {
                crAlias = alias + "-" + rd.Next(1, 10);
                doTag = crUow.GetEntities(f => f.Alias == crAlias).Select(s => s.Title).FirstOrDefault();
            }
            while (doTag != null);

            return crAlias;
        }

    }
}
