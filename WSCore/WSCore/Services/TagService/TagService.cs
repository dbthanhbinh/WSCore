using System;
using System.Threading.Tasks;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;
using WSCore.Models.Dto;
using WSCore.Models.VM;
using WSCore.Services.ObjectTagService;

namespace WSCore.Services.TagService
{
    public class TagService : BasicService<Tag>, ITagService
    {
        private readonly IObjectTagService _objectTagService;
        public TagService(
            IUnitOfWork uow,
            IObjectTagService objectTagService
        ) : base(uow, objectTagService) {
            _objectTagService = objectTagService;
        }

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

        public async Task<Tag> AddTagLogicAsync(CreateTagModel createTag)
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

        #region Update
        public async Task<UpdateTagVM> UpdateTagLogicAsync(UpdateTagModel updateTagModel)
        {
            try
            {
                // validation UpdateTagModel

                var dbContext = _uow.GetRepository<Tag>();
                Tag tag = await dbContext.GetByIdAsync(updateTagModel.Id);
                if (tag == null)
                    return new UpdateTagVM {
                        Error = 1,
                        ErrorMessage = "NOT_FOUND"
                    };

                NameAndAliasVM rs = BGetNameAndAliasVM(updateTagModel.Title, updateTagModel.Alias);
                tag.Title = rs.Name;
                tag.Alias = rs.Alias;
                tag.LastSavedTime = DateTime.UtcNow;

                dbContext.UpdateAsync(tag);
                _uow.SaveChanges();
                return new UpdateTagVM {
                    Data = tag
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Update

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
                {
                    // Delete tag
                    dbContext.Delete(tag);

                    // Delete ObjectTags relate Deleted tagId
                    await _objectTagService.DeleteObjectTagByDeleteTagIdAsync(id, false);
                }
                _uow.SaveChanges();
            }
            catch (Exception ex)
            {

            }

        }
        #endregion Delete

        #region Public Process
        protected void ProcessUpdateTags(string[] tagIds, string objectId)
        {
            // Get current tags by objectId

            // Add new
            // Update
            // Delete
        }
        #endregion Public Process
    }
}
