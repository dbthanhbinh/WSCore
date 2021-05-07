using Microsoft.EntityFrameworkCore;
using System;

namespace WSCore.Infrastructure.Repository
{
    public abstract class BaseRepository<T, AContext> where T : class where AContext : DbContext
    {
        public readonly AContext _dbContext;
        public DbSet<T> DbSet { get; }

        public BaseRepository(AContext context)
        {
            _dbContext = context ?? throw new ArgumentException(nameof(context));
            DbSet = _dbContext.Set<T>();
        }
    }
}
