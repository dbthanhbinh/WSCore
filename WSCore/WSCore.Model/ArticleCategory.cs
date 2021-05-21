using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WSCore.Model
{
    public class ArticleCategory : BaseEntity
    {
        [Required]
        public string ArticleId { set; get; }

        [Required]
        public string CategoryId { set; get; }
    }
}
