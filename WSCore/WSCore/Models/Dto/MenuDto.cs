using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Models.Dto
{
    public class MenuDto
    {
    }

    public class CreateMenuDto
    {
        [Required]
        [StringLength(300)]
        public string Title { set; get; }

        [StringLength(500)]
        public string Excerpt { set; get; }
                
        [StringLength(11)]
        public string ParentId { set; get; }

        [StringLength(50)]
        public string CustomType { set; get; }

        [StringLength(50)]
        public string MenuType { set; get; }

        [StringLength(300)]
        public string CustomUrl { set; get; }
    }

    public class UpdateMenuDto
    {
        [StringLength(300)]
        public string Title { set; get; }

        [StringLength(500)]
        public string Excerpt { set; get; }

        [StringLength(11)]
        public string ParentId { set; get; }

        [StringLength(300)]
        public string CustomUrl { set; get; }
    }
}
