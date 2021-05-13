using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WSCore.Model
{
    public class Tag : BaseEntity
    {
        [Required]
        public string Title { set; get; }
        public string Alias { set; get; }
    }
}
