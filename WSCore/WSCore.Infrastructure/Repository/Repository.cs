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
    }
}
