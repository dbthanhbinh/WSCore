using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WSCore.Model
{
    public class Role : BaseEntity
    {
        [Required]
        [StringLength(250)]
        public string Title { set; get; }

        [Required]
        [StringLength(250)]
        public string Alias { set; get; }
    }
}
