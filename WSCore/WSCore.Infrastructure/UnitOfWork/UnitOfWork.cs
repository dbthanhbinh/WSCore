using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WSCore.Infrastructure.Repository;

namespace WSCore.Infrastructure.UnitOfWork
{
    public class UnitOfWork<AContext> : IUnitOfWork where AContext : DbContext
    {
        private readonly AContext _context;
        private Dictionary<Type, object> _repositories;

        public void Dispose()
        {
            _context?.Dispose();
        }

        public UnitOfWork(AContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : class
        {
            if (_repositories == null)
                _repositories = new Dictionary<Type, object>();
            var type = typeof(TEntity);
            if (!_repositories.ContainsKey(type))
                _repositories[type] = new Repository<TEntity, AContext>(_context);

            return (IRepository<TEntity>)_repositories[type];
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<int> SaveRangeChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
