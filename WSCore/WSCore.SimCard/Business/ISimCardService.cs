using WSCore.Common.Business;
using WSCore.SimCard.Models;

namespace WSCore.SimCard.Business
{
    public interface ISimCardService : IBaseService<Sim>
    {
        void AddLogicAsync();
        void ImportFile();
    }
}
