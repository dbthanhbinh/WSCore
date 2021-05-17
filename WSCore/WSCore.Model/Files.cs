using System.ComponentModel.DataAnnotations;

namespace WSCore.Model
{
    public class Files : BaseEntity
    {
        [StringLength(50)]
        public string ContentType { set; get; }

        [StringLength(300)]
        public string FileName { set; get; }
        public long Length { set; get; }
    }
}
