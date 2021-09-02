using WSCore.Services;
using WSCore.SimCard.Models;

namespace WSCore.SimCard.Business
{
    public interface ISimCardService : IBasicService<Sim>
    {
        void AddLogicAsync();
        void ImportFile();
    }
}
