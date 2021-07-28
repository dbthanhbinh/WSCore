using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using WSCore.Model;

namespace WSCore.Services.MediaService
{
    public interface IMediaService : IBasicService<Media>
    {
        Task<Media> CreateSingleMediaAsync(IFormFile file, string objectId, string objectType, string attachedType, bool isSaveChange = false);
    }
}
