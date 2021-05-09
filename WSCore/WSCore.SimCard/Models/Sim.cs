using WSCore.Model;

namespace WSCore.SimCard.Models
{
    public class Sim : BaseEntity
    {
        public string Name { set; get; }
        public string Alias { set; get; }
        public string Content { set; get; }
        public int Price { set; get; }
        public int Discount { set; get; }
    }
}
