using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Models.VM
{
    public class BaseVM
    {
        public virtual bool Error { get; set; } = false;
        public virtual string Message { get; set; }
    }

    public class ApiError
    {
        
    }
}
