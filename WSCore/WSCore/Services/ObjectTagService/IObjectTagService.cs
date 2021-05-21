using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Common.Business;
using WSCore.Model;

namespace WSCore.Services.ObjectTagService
{
    public interface IObjectTagService : IBaseService<ObjectTag>
    {
        #region Create
        Task<ObjectTag> CreateObjectTagAsync(ObjectTag objectTag);
        #endregion Create

        #region Get
        Task<List<ObjectTag>> GetObjectTagByTagIdAsync(string tagId);

        Task<List<ObjectTag>> GetObjectTagByObjectIdAndTypeAsync(string objId, string objectType);
        #endregion Get

        #region Delete
        Task DeleteObjectTagByIdAsync(string id);
        Task DeleteObjectTagByDeleteTagIdAsync(string tagId, bool isSaveChange);

        /// <summary>
        /// Delete All ObjectTag relate to ObjectId has been deleted ObjectId[CategoryId/ArticleId]
        /// </summary>
        /// <param name="objectId"></param>
        /// <param name="objectType"></param>
        /// <param name="isSaveChange"></param>
        /// <returns></returns>
        Task DeleteObjectTagByDeleteObjectIdAsync(string objectId, string objectType, bool isSaveChange);
        #endregion Delete
    }
}
