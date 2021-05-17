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
        Task<Tag> AddTagAsync(Tag tagEntity);
        Task<Tag> AddTagLogicAsync(TagRequest createTag);
        string GetTagStartsWithAliasAsync(string alias);

        Task<Tag> GetTagByIdAsync(string id);
        Task DeleteTagByIdAsync(string id);
    }
}
