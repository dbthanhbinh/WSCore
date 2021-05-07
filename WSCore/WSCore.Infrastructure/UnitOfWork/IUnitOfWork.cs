using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using WSCore.Infrastructure.Repository;

namespace WSCore.Infrastructure.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
        Task SaveChangesAsync();
        Task<int> SaveRangeChangesAsync();
        void SaveChanges();
    }

    public interface IUnitOfWork<AppsContext> : IUnitOfWork where AppsContext : DbContext
    {
        AppsContext Context { get; }
    }
}
