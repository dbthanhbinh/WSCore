﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Models.Dto
{
    public class ArticleDto
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
        public string CategoryId { set; get; }

        [StringLength(50)]
        public string Type { set; get; }

        public virtual string SeoTitle { set; get; }
        public virtual string SeoContent { set; get; }
        public virtual string SeoKeyWord { set; get; }

        public virtual IFormFile File { get; set; }
        public virtual string TagIds { set; get; }
    }
}
