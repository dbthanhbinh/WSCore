using System.Collections.Generic;
using System.Threading.Tasks;
using WSCore.Model;
using WSCore.Models.Dto;

namespace WSCore.Services.TagService
{
    public interface ITagService : IBasicService<Tag>
    {
        #region Create
        Task<Tag> CreateTagAsync(TagDto tagDto);
        #endregion Create

        #region Update
        Task<UpdateTagVM> UpdateTagAsync(UpdateTagModel updateTagModel, string tagId);
        #endregion Update

        #region Get
        Task<List<Tag>> GetTagsAsync();
        string GetTagStartsWithAliasAsync(string alias);
        Task<Tag> GetTagByIdAsync(string id);
        #endregion Get

        #region Delete
        Task<Tag> DeleteTagByIdAsync(string id);
        #endregion Delete
    }
}
