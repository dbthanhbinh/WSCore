using System;
using System.Threading.Tasks;
using WSCore.Common.Business;
using WSCore.Controllers.Base;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;

namespace WSCore.Services.TagService
{
    public class TagService : BaseService<Tag>, ITagService
    {
        public readonly IUnitOfWork _uow;

        public TagService(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<Tag> AddTagAsync(Tag tagEntity)
        {
            try
            {
                Tag newEntity = new Tag();

                return newEntity;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Tag> AddTagLogicAsync(CreateTagBody createTag)
        {
            try
            {
                Tag newEntity = new Tag();
                await _uow.GetRepository<Tag>().AddAsync(newEntity);
                _uow.SaveChanges();
                return newEntity;

            } catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
