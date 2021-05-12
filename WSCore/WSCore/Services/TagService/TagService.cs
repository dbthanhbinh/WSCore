using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Controllers.Base;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;
using WSCore.Models.VM;

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
                // validation tag name Special character
                // validation tag alias Special character

                NameAndAliasVM rs = BGetNameAndAliasVM(createTag.Title, createTag.Alias);
                string newAlias = BGetNewAliasAsync(rs.Alias, f => f.Alias.StartsWith(rs.Alias), s => s.Alias);

                Tag newEntity = new Tag
                {
                    Title = rs.Name,
                    Alias = newAlias
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
            var newAlias = BGetNewAliasAsync(alias, f => f.Alias.StartsWith(alias), s => s.Alias);
            return newAlias;
        }
    }
}
