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
    }
}
