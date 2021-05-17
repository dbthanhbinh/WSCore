using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace WSCore.Infrastructure.Repository
{
    public interface IRepository<T> where T : class
    {
        Task AddAsync(T entity);
        void AddRange(List<T> ts);
        Task AddRangeAsync(List<T> ts);

        #region Get
        Task<T> GetByIdAsync(string id);

        IQueryable<T> GetEntities(Expression<Func<T, bool>> condition = null,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        string includeProperties = "");

        Task<IEnumerable<T>> GetByAsync(
        Expression<Func<T, bool>> filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        string includeProperties = "",
        Expression<Func<T, T>> selectColumns = null,
        int first = 0,
        int offset = 0);
        #endregion Get

        #region Delete
        void Delete(T entity);
        #endregion Delete
    }
}
