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

        #region Update
        public void UpdateObjectTagsInObject(List<string> tagIds, string objectId, string objectType, string objectName, bool isSaveChange)
        {
            try
            {
                List<ObjectTag> objectTagsAdded = new List<ObjectTag>();
                List<ObjectTag> objectTagsDeleted = new List<ObjectTag>();
                ProcessUpdateObjectTagsInObject(tagIds, objectId, objectType, objectName, ref objectTagsAdded, ref objectTagsDeleted);

                // Addnew range
                AddNewRangeAsync(objectTagsAdded, false);

                // Delete range
                DeleteRangeAsync(objectTagsDeleted, false);

                if(isSaveChange)
                    _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private void AddNewRangeAsync(List<ObjectTag> objectTags, bool isSaveChange = false)
        {
            if (objectTags != null)
            {
                _uow.GetRepository<ObjectTag>().AddRange(objectTags);

                if (isSaveChange)
                    _uow.SaveChanges();
            }
        }

        #endregion Update

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

        public async Task<List<ObjectTag>> GetObjectTagByObjectIdAndObjectTypeAsync(string objectId, string objectType)
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

        private void DeleteRangeAsync(List<ObjectTag> objectTags, bool isSaveChange = false)
        {
            if (objectTags != null)
            {
                _uow.GetRepository<ObjectTag>().DeleteRange(objectTags);

                if (isSaveChange)
                    _uow.SaveChanges();
            }
        }

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
                throw ex;
            }

        }

        public async Task DeleteAllObjectTagRelateToTagIdDeletedAsync(string tagId, bool isSaveChange = false)
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
                throw ex;
            }

        }

        /// <summary>
        /// Delete All ObjectTag relate to ObjectId has been deleted ObjectId[CategoryId/ArticleId]
        /// </summary>
        /// <param name="objectId"></param>
        /// <param name="objectType"></param>
        /// <param name="isSaveChange"></param>
        /// <returns></returns>
        public async Task DeleteAllObjectTagRelateToObjectDeletedAsync(string objectId, string objectType, bool isSaveChange)
        {
            try
            {
                var dbContext = _uow.GetRepository<ObjectTag>();
                List<ObjectTag> objectTags = await GetObjectTagByObjectIdAndObjectTypeAsync(objectId, objectType);

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
                throw ex;
            }
        }
        #endregion Delete

        #region Public Process logic
        private void ProcessUpdateObjectTagsInObject(List<string> tagIds, string objectId, string objectType, string objectName, ref List<ObjectTag> objectTagsAdded, ref List<ObjectTag> objectTagsDeleted)
        {   
            try
            {
                // Get current tags by objectId
                Task<List<ObjectTag>> objectTags = GetObjectTagByObjectIdAndObjectTypeAsync(objectId, objectType);

                // Find tags need to deleted
                foreach ( var objectTag in objectTags.Result)
                {
                    if (!tagIds.Contains(objectTag.Id))
                    {
                        ObjectTag objectTag1 = new ObjectTag {
                            ObjId = objectId,
                            ObjName = objectTag.ObjName,
                            ObjType = objectTag.ObjType,
                            TagId = objectTag.Id
                        };
                        objectTagsDeleted.Add(objectTag1);
                    }
                }

                // Find tags need to Added new
                foreach (var tagid in tagIds)
                {
                    var fn = objectTags.Result.Find(f => f.Id == tagid);
                    if (fn == null)
                    {
                        ObjectTag objectTag2 = new ObjectTag
                        {
                            ObjId = objectId,
                            ObjName = objectName,
                            ObjType = objectType,
                            TagId = tagid
                        };

                        objectTagsAdded.Add(objectTag2);
                    }   
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Public Process logic

    }
}
