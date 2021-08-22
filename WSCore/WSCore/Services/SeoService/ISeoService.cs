using System.Threading.Tasks;
using WSCore.Model;
using WSCore.Models.Dto;

namespace WSCore.Services.SeoService
{
    public interface ISeoService : IBasicService<Seo>
    {
        Task<Seo> AddSeoLogicAsync(SeoDto seoDto);
        Task<Seo> UpdateSeoLogicAsync(SeoDto seoDto, string seoId);
        Task<Seo> UpdateSeoEntityAsync(Seo seo, bool isSaveChanged);
        Task<Seo> GetSeoByObjectAsync(string objectId, string objectType);
        Task<Seo> DeleteSeoByIdAsync(string id);
    }
}
