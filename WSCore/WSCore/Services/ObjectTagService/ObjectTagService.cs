using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;

namespace WSCore.Services.ObjectTagService
{
    public class ObjectTagService : BasicService<ObjectTag>, IObjectTagService
    {   
        public ObjectTagService(IUnitOfWork uow) : base(uow) { }

        #region Create
        public async Task<ObjectTag> CreateObjectTagAsync(ObjectTag objectTag)
        {
            try
            {
                // Validation data

                ObjectTag objectTag1 = new ObjectTag
                {
                    ObjId = objectTag.ObjId,
                    ObjName = objectTag.ObjName,
                    ObjType = objectTag.ObjType,
                    TagId = objectTag.TagId
                };

                await _uow.GetRepository<ObjectTag>().AddAsync(objectTag1);
                return objectTag1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Create

        #region Get
        public async Task<List<ObjectTag>> GetObjectTagByTagIdAsync(string tagId)
        {
            try
            {
                var dbContext = _uow.GetRepository<ObjectTag>();
                List<ObjectTag> objectTags = new List<ObjectTag>();
                var rs = await dbContext.GetByAsync(x => x.TagId == tagId);
                return objectTags = rs?.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ObjectTag>> GetObjectTagByObjectIdAndTypeAsync(string objectId, string objectType)
        {
            try
            {
                var dbContext = _uow.GetRepository<ObjectTag>();
                List<ObjectTag> objectTags = new List<ObjectTag>();
                var rs = await dbContext.GetByAsync(x => x.ObjId == objectId && x.ObjType == objectType);
                return objectTags = rs?.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Get

        #region Delete
        public async Task DeleteObjectTagByIdAsync(string tagId)
        {
            try
            {
                var dbContext = _uow.GetRepository<ObjectTag>();
                List<ObjectTag> objectTags = await GetObjectTagByTagIdAsync(tagId);

                 
                // Delete ObjectTag related to this deleted id

                //_uow.SaveChanges();
            }
            catch (Exception ex)
            {

            }

        }

        public async Task DeleteObjectTagByDeleteTagIdAsync(string tagId, bool isSaveChange = false)
        {
            try
            {
                var dbContext = _uow.GetRepository<ObjectTag>();
                List<ObjectTag> objectTags = await GetObjectTagByTagIdAsync(tagId);

                // Delete objectTags related to this tagId
                if(objectTags != null)
                {
                    _uow.GetRepository<ObjectTag>().DeleteRange(objectTags);
                }

                if(isSaveChange)
                    _uow.SaveChanges();
            }
            catch (Exception ex)
            {

            }

        }

        /// <summary>
        /// Delete All ObjectTag relate to ObjectId has been deleted ObjectId[CategoryId/ArticleId]
        /// </summary>
        /// <param name="objectId"></param>
        /// <param name="objectType"></param>
        /// <param name="isSaveChange"></param>
        /// <returns></returns>
        public async Task DeleteObjectTagByDeleteObjectIdAsync(string objectId, string objectType, bool isSaveChange)
        {
            try
            {
                var dbContext = _uow.GetRepository<ObjectTag>();
                List<ObjectTag> objectTags = await GetObjectTagByObjectIdAndTypeAsync(objectId, objectType);

                // Delete objectTags related to this tagId
                if (objectTags != null)
                {
                    _uow.GetRepository<ObjectTag>().DeleteRange(objectTags);
                }

                if (isSaveChange)
                    _uow.SaveChanges();
            }
            catch (Exception ex)
            {

            }
        }
        #endregion Delete

    }
}
