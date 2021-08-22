using System.ComponentModel.DataAnnotations;

namespace WSCore.Model
{
    public class Seo : BaseEntity
    {
        [StringLength(11)]
        public string ObjectId { set; get; }
        [StringLength(50)]
        public string ObjectType { set; get; }
        [StringLength(300)]
        public string SeoTitle { get; set; }

        [StringLength(300)]
        public string SeoContent { get; set; }

        [StringLength(300)]
        public string SeoKeyWord { get; set; }
    }
}
