using System.Collections.Generic;
using System.Threading.Tasks;

namespace WSCore.Infrastructure.Repository
{
    public interface IRepository<T> where T : class
    {
        Task AddAsync(T entity);
        void AddRange(List<T> ts);
        Task AddRangeAsync(List<T> ts);
    }
}
