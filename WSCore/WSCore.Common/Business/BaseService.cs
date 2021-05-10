using System;
using System.Collections.Generic;
using System.Text;
using WSCore.Infrastructure.UnitOfWork;

namespace WSCore.Common.Business
{
    public class BaseService<T> where T : class
    {
        public readonly IUnitOfWork _uow;

        public BaseService(IUnitOfWork uow)
        {
            _uow = uow;
        }
    }
}
