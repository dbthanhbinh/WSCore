using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Common.Business;
using WSCore.Controllers.Base;
using WSCore.Model;

namespace WSCore.Services.TagService
{
    public interface ITagService : IBaseService<Tag>
    {
        #region Create
        Task<Tag> AddTagAsync(Tag tagEntity);
        Task<Tag> AddTagLogicAsync(CreateTagModel createTag);
        #endregion Create

        #region Update
        Task<UpdateTagVM> UpdateTagLogicAsync(UpdateTagModel updateTagModel);
        #endregion Update

        #region Get
        string GetTagStartsWithAliasAsync(string alias);
        Task<Tag> GetTagByIdAsync(string id);
        #endregion Get

        #region Delete
        Task DeleteTagByIdAsync(string id);
        #endregion Delete
    }
}
