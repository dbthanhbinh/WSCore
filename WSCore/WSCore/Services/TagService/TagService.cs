using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using WSCore.Common;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;
using WSCore.Models;
using WSCore.Models.Dto;
using WSCore.Models.VM;
using WSCore.Services.ObjectTagService;

namespace WSCore.Services.TagService
{
    public class TagService : BasicService<Tag>, ITagService
    {
        private readonly IObjectTagService _objectTagService;
        public readonly WSContext _dbContext;
        public TagService(
            IUnitOfWork uow,
            IObjectTagService objectTagService
        ) : base(uow, objectTagService) {
            _objectTagService = objectTagService;
        }

        #region Create
        /// <summary>
        /// Create new Tag
        /// </summary>
        /// <param name="tagDto"></param>
        /// <returns></returns>
        public async Task<Tag> CreateTagAsync(TagDto tagDto)
        {
            try
            {
                string title = tagDto.Title;
                string alias = tagDto.Alias;

                // Clean Obj
                CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias, false);
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

        // SP
        public async Task<Tag> CreateTagWithSP(TagDto tagDto)
        {
            try
            {
                string title = tagDto.Title;
                string alias = StringHelper.GenerateSlug(tagDto.Title);

                // Clean Obj
                CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias, false);
                Tag newEntity = new Tag
                {
                    Title = title,
                    Alias = alias,
                    CreatedUserId = GetUserId(),
                    LastSavedUserId = GetUserId()
                };

                //await _uow.GetRepository<Tag>().AddAsync(newEntity);
                //_uow.SaveChanges();

                SqlConnection sqlCon = null;
                String SqlconString = "server=BINHTRINH;database=WSCore;trusted_connection=true;";
                using (sqlCon = new SqlConnection(SqlconString))
                {
                    sqlCon.Open();
                    SqlCommand sql_cmnd = new SqlCommand("usp_insertTag", sqlCon);
                    sql_cmnd.Parameters.Add("@id", SqlDbType.VarChar).Value = newEntity.Id;
                    sql_cmnd.Parameters.Add("@title", SqlDbType.VarChar).Value = newEntity.Title;
                    sql_cmnd.Parameters.Add("@alias", SqlDbType.VarChar).Value = newEntity.Alias;
                    sql_cmnd.Parameters.Add("@createdUserId", SqlDbType.VarChar).Value = newEntity.CreatedUserId;
                    sql_cmnd.Parameters.Add("@lastSavedUserId", SqlDbType.VarChar).Value = newEntity.LastSavedUserId;
                    sql_cmnd.Parameters.Add("@isActive", SqlDbType.VarChar).Value = newEntity.IsActive;
                    sql_cmnd.Parameters.Add("@isDelete", SqlDbType.VarChar).Value = newEntity.IsDelete;
                    sql_cmnd.Parameters.Add("@status", SqlDbType.VarChar).Value = newEntity.Status;
                    sql_cmnd.Parameters.Add("@seoTitle", SqlDbType.VarChar).Value = "";
                    sql_cmnd.Parameters.Add("@seoContent", SqlDbType.VarChar).Value = "";
                    sql_cmnd.Parameters.Add("@seoKeyWord", SqlDbType.VarChar).Value = "";

                    sql_cmnd.CommandType = CommandType.StoredProcedure;
                    sql_cmnd.ExecuteNonQuery();
                    sqlCon.Close();
                }

                return newEntity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion Create

        #region Update
        public async Task<UpdateTagVM> UpdateTagAsync(UpdateTagModel updateTagModel, string tagId)
        {
            try
            {
                string title = updateTagModel.Title;
                string alias = updateTagModel.Alias;
                // validation UpdateTagModel
                // Clean Obj
                CleanObjecAndBuildtTitleAndAliasDto(ref title, ref alias, true);

                var dbContext = _uow.GetRepository<Tag>();
                Tag tag = await dbContext.GetByIdAsync(tagId);
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
                    Tag = tag
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Update

        #region Get
        public async Task<List<Tag>> GetTagsAsync()
        {   
            try
            {
                //List<Tag> rs = new List<Tag>();
                //SqlConnection sqlCon = null;
                //String SqlconString = "server=BINHTRINH;database=WSCore;trusted_connection=true;";
                //using (sqlCon = new SqlConnection(SqlconString))
                //{
                //    sqlCon.Open();
                //    SqlCommand sql_cmnd = new SqlCommand("stpGetAllMembers", sqlCon);
                //    sql_cmnd.CommandType = CommandType.StoredProcedure;
                //    // sql_cmnd.ExecuteNonQuery();

                //    using (var reader = sql_cmnd.ExecuteReader(CommandBehavior.Default))
                //    {
                //        if (reader.HasRows)
                //        {
                //            while (reader.Read())
                //            {
                //                rs.Add(new Tag
                //                {
                //                    Title = Convert.ToString(reader["Title"]),
                //                    Alias = Convert.ToString(reader["alias"])
                //                });
                //            }



                //        }

                //    }


                //    sqlCon.Close();
                //}

                List<Tag> tags = new List<Tag>();
                var rs = await _uow.GetRepository<Tag>().GetByAsync(
                        q => q.IsActive == true,
                        orderBy: o => o.OrderByDescending(v => v.CreatedTime)
                    );
                return tags = rs?.ToList();



                // return rs;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

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
        public async Task<Tag> DeleteTagByIdAsync(string id)
        {
            try
            {
                var dbContext = _uow.GetRepository<Tag>();
                Tag tag = null;
                tag = dbContext.GetById(id);

                if (tag != null)
                {
                    // Delete tag
                    _uow.GetRepository<Tag>().Delete(tag);

                    // Delete ObjectTags relate Deleted tagId
                    await _objectTagService.DeleteAllObjectTagRelateToTagIdDeletedAsync(tagId: id, false);
                }
                _uow.SaveChanges();

                return tag;
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
        protected void CleanObjecAndBuildtTitleAndAliasDto(ref string title, ref string alias, bool isEdit)
        {
            string originalAlias = alias;
            if (title?.Length >= 3)
                title = StringHelper.CleanTagHtmlForTitle(title.ToString().Trim());
            if(alias?.Length >= 3)
                alias = StringHelper.CleanTagHtmlForTitle(alias.ToString().Trim());

            NameAndAliasVM rs = new NameAndAliasVM();
            rs = BGetNameAndAliasVM(title, alias);
            string newAlias = rs.Alias;

            if (isEdit)
            {
                if (!string.Equals(originalAlias, alias))
                {
                    newAlias = BGetNewAliasAsync(rs.Alias, f => f.Alias.StartsWith(rs.Alias), s => s.Alias);
                }
            }
            else
            {
                newAlias = BGetNewAliasAsync(rs.Alias, f => f.Alias.StartsWith(rs.Alias), s => s.Alias);
            }

            title = rs.Name;
            alias = newAlias;
        }
    }
}
