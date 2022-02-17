using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WSCore.Model
{
    public class Menu : BaseEntity
    {
        [Required]
        [StringLength(300)]
        public string Title { set; get; }

        [StringLength(500)]
        public string Excerpt { set; get; }

        [StringLength(11)]
        public string ParentId { set; get; }

        [StringLength(50)]
        public string MenuType { set; get; } // as primary, footer, header

        [StringLength(50)]
        public string CustomType { get; set; } // custom, page, category or post
        
        [StringLength(300)]
        public string CustomUrl { set; get; }
    }
}
