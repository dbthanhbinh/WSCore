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

        #region Create
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
                    Alias = newAlias,
                    CreatedUserId = "469cf3e1",
                    LastSavedUserId = "469cf3e1"
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
        #endregion Create

        #region Get
        public async Task<Tag> GetTagByIdAsync(string id)
        {
            try
            {
                var dbContext = _uow.GetRepository<Tag>();
                Tag tag = new Tag();
                var rs = await dbContext.GetByIdAsync(id);
                if (rs != null)
                    tag = rs;
                return tag;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public string GetTagStartsWithAliasAsync(string alias)
        {
            var newAlias = BGetNewAliasAsync(alias, f => f.Alias.StartsWith(alias), s => s.Alias);
            return newAlias;
        }
        #endregion Get

        #region Delete
        public async Task DeleteTagByIdAsync(string id)
        {
            try
            {
                var dbContext = _uow.GetRepository<Tag>();
                Tag tag = null;
                tag = await dbContext.GetByIdAsync(id);
                if (tag != null)
                    dbContext.Delete(tag);

                _uow.SaveChanges();
            }
            catch (Exception ex)
            {

            }

        }
        #endregion Delete
    }
}
