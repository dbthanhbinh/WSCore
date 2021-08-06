using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using WSCore.Model;

namespace WSCore.Services.MediaService
{
    public interface IMediaService : IBasicService<Media>
    {
        /// <summary>
        /// Creation or update media
        /// </summary>
        /// <param name="file"></param>
        /// <param name="objectId"></param>
        /// <param name="objectType"></param>
        /// <param name="attachedType"></param>
        /// <param name="mediaId"></param> (*) this for case update
        /// <param name="isSaveChange"></param>
        /// <param name="isUpdate"></param>  (*) this for case update
        /// <returns></returns>
        Task<Media> CreateOrUpdateSingleMediaAsync(
            IFormFile file,
            string objectId,
            string objectType,
            string attachedType,
            string mediaId = "",
            bool isSaveChange = false,
            bool isUpdate = false
       );
    }
}
