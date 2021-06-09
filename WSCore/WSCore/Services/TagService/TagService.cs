using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Threading.Tasks;
using WSCore.Common;
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

        /// <summary>
        /// Create Tag by logic
        /// </summary>
        /// <param name="tagDto"></param>
        /// <returns></returns>
        public async Task<Tag> AddTagLogicAsync(TagDto tagDto)
        {
            try
            {
                string title = tagDto.Title;
                string alias = tagDto.Alias;

                // Clean Obj
                CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias);

                Tag newEntity = new Tag
                {
                    Title = title,
                    Alias = alias,
                    CreatedUserId = GetUserId(),
                    LastSavedUserId = GetUserId()
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
                string title = updateTagModel.Title;
                string alias = updateTagModel.Alias;
                // validation UpdateTagModel
                // Clean Obj

                CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias);

                var dbContext = _uow.GetRepository<Tag>();
                Tag tag = await dbContext.GetByIdAsync(updateTagModel.Id);
                if (tag == null)
                {
                    throw new Exception("NOT_FOUND");
                }

                tag.Title = title;
                tag.Alias = alias;
                tag.LastSavedTime = GetLastSavedTime();

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
                    await _objectTagService.DeleteAllObjectTagRelateToTagIdDeletedAsync(tagId: id, false);
                }
                _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        #endregion Delete

        protected void CleanObjectDto(ref TagDto tagDto)
        {
            Type t = tagDto.GetType();
            foreach (PropertyInfo prop in t.GetProperties()) //Iterating through properties
            {
                var field = prop.Name;
                var fieldValue = prop.GetValue(tagDto, new object[] { });

                if (field == "Title")
                {
                    tagDto.Title = StringHelper.CleanTagHtmlForTitle(fieldValue.ToString().Trim());
                }
                if (field == "Alias")
                {
                    tagDto.Alias = StringHelper.CleanTagHtmlForTitle(fieldValue.ToString().Trim());
                }
            }

            NameAndAliasVM rs = BGetNameAndAliasVM(tagDto.Title, tagDto.Alias);
            string newAlias = BGetNewAliasAsync(rs.Alias, f => f.Alias.StartsWith(rs.Alias), s => s.Alias);
            tagDto.Title = rs.Name;
            tagDto.Alias = newAlias;
        }

        /// <summary>
        /// Clean html tags and build frienly alias from title or not
        /// </summary>
        /// <param name="title"></param>
        /// <param name="alias"></param>
        protected void CleanObjecAndBuildtTitleAndAliasDto(ref string title, ref string alias)
        {
            if(title.Length >= 3)
                title = StringHelper.CleanTagHtmlForTitle(title.ToString().Trim());
            if(alias.Length >= 3)
                alias = StringHelper.CleanTagHtmlForTitle(alias.ToString().Trim());

            NameAndAliasVM rs = BGetNameAndAliasVM(title, alias);
            string newAlias = BGetNewAliasAsync(rs.Alias, f => f.Alias.StartsWith(rs.Alias), s => s.Alias);
            title = rs.Name;
            alias = newAlias;
        }
    }
}
