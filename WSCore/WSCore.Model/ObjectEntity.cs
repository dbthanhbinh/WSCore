using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WSCore.Model
{
    public class ObjectEntity : BaseEntity
    {
        [Required]
        [StringLength(11)]
        public string Status { get; set; } = "publish";

        [StringLength(300)]
        public string SeoTitle { get; set; }

        [StringLength(300)]
        public string SeoContent { get; set; }

        [StringLength(300)]
        public string SeoKeyWord { get; set; }
    }
}
