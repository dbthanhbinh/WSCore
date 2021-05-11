using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace WSCore.Common.Business
{
    public class BaseService<T> where T : class
    {
        public async Task<string> BGetAlias() {
            return "dđ";
        }
    }
}
