using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace WSCore.Infrastructure.Repository
{
    public class Repository<T, AContext> : IRepository<T> where T : class where AContext : DbContext
    {
        public readonly AContext _dbContext;
        public DbSet<T> DbSet { get; }

        public Repository(AContext context)
        {
            _dbContext = context ?? throw new ArgumentException(nameof(context));
            DbSet = _dbContext.Set<T>();
        }

        #region Create
        public async Task AddAsync(T entity)
        {
            await DbSet.AddAsync(entity);
        }

        public async Task AddRangeAsync(List<T> ts)
        {
            await DbSet.AddRangeAsync(ts);
        }

        public void AddRange(List<T> ts)
        {
            DbSet.AddRange(ts);
        }
        #endregion Create

        #region Update
        public void UpdateAsync(T entity)
        {
            DbSet.Update(entity);
        }

        public void Update(T entity)
        {
            DbSet.Update(entity);
        }

        public void UpdateRange(List<T> entities)
        {
            DbSet.UpdateRange(entities);
        }
        #endregion Update

        #region Get
        public async Task<T> GetByIdAsync(string id)
        {
            return await DbSet.FindAsync(id);
        }

        public T GetById(string id)
        {
            return DbSet.Find(id);
        }

        public IQueryable<T> GetEntities(Expression<Func<T, bool>> condition = null,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
        string includeProperties = "")
        {
            IQueryable<T> query = DbSet;

            if (condition != null)
            {
                query = query.Where(condition);
            }

            foreach (var includeProperty in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            return query;
        }

        public async virtual Task<IEnumerable<T>> GetByAsync(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>,IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "",
            Expression<Func<T,T>> selectColumns = null,
            int first = 0,
            int offset = 0
        )
        {
            IQueryable<T> query = DbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (offset > 0)
            {
                query = query.Skip(offset);
            }

            if (first > 0)
            {
                query = query.Take(first);
            }

            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }

            if (orderBy != null)
            {
                if (selectColumns != null)
                {
                    return await orderBy(query).Select(selectColumns).ToListAsync();
                }
                return await orderBy(query).ToListAsync();
            }
            else
            {
                if (selectColumns != null)
                {
                    return await query.Select(selectColumns).ToListAsync();
                }
                return await query.ToListAsync();
            }
        }

        #endregion Get

        #region Delete
        public void Delete(T entity)
        {
            DbSet.Remove(entity);
        }

        public void DeleteRange(List<T> entities)
        {
            DbSet.RemoveRange(entities);
        }
        #endregion Delete
    }
}
