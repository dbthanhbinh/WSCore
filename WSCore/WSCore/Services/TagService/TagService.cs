using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Controllers.Base;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;

namespace WSCore.Services.TagService
{
    public class TagService : BasicService<Tag>, ITagService
    {
        public TagService(IUnitOfWork uow) : base(uow){}

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

        public async Task<Tag> AddTagLogicAsync(TagRequest createTag)
        {
            try
            {
                Tag newEntity = new Tag
                {
                    Title = createTag.Title,
                    Alias = createTag.Alias
                };
                await _uow.GetRepository<Tag>().AddAsync(newEntity);
                _uow.SaveChanges();
                return newEntity;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<string> GetTagByAliasAsync(string alias)
        {
            var crUow = _uow.GetRepository<Tag>();
            var crAlias = alias;
            
            var tag = crUow.GetEntities(f => f.Alias == crAlias).Select(s => s.Title).ToList();
            if (tag == null)
                return crAlias;

            Random rd = new Random();
            var doTag = "";
            do
            {
                crAlias = alias + "-" + rd.Next(1, 10);
                doTag = crUow.GetEntities(f => f.Alias == crAlias).Select(s => s.Title).FirstOrDefault();
            }
            while (doTag != null);

            return crAlias;
        }
    }
}
