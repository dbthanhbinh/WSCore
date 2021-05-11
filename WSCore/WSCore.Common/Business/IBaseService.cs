﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Common.Business
{
    public interface IBaseService<T> where T : class
    {
        Task<string> BGetAlias();
    }
}
