using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WSCore.Model
{
    public class Category : ObjectEntity
    {
        [Required]
        [StringLength(300)]
        public string Title { set; get; }

        [StringLength(300)]
        public string Alias { set; get; }

        [StringLength(500)]
        public string Excerpt { set; get; }
        public string Content { set; get; }

        [StringLength(11)]
        public string ParentId { set; get; }

        [StringLength(50)]
        public string  Type { set; get; }
    }
}
