using System.Threading.Tasks;
using WSCore.Common.Business;
using WSCore.Model;
using WSCore.Models.Dto;

namespace WSCore.Services.TagService
{
    public interface ITagService : IBaseService<Tag>
    {
        #region Create
        Task<Tag> AddTagAsync(Tag tagEntity);
        Task<Tag> AddTagLogicAsync(TagDto tagDto);
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
