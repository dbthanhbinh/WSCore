using System;
using System.ComponentModel.DataAnnotations;

namespace WSCore.Model
{
    public class Media : BaseEntity
    {
        [Required]
        [StringLength(8)]
        public string FileId { set; get; }

        [StringLength(300)]
        public string Path { set; get; }

        [StringLength(8)]
        public string ObjectId { get; set; }

        [StringLength(50)]
        public string ObjectType { get; set; }

        [StringLength(300)]
        public string Small { set; get; }

        [StringLength(300)]
        public string Medium { set; get; }

        [StringLength(300)]
        public string Large { set; get; }

        [StringLength(50)]
        public string MediaType { set; get; }
    }
}
