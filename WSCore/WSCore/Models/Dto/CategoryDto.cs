using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Models.Dto
{
    public class CategoryDto
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
        public string Type { set; get; }

        [StringLength(300)]
        public string SeoTitle { get; set; }

        [StringLength(300)]
        public string SeoContent { get; set; }

        [StringLength(300)]
        public string SeoKeyWord { get; set; }
    }

    public class CategoryLogicDto : CategoryDto
    {
        public List<string> TagIds { set; get; }
    }
}
