using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WSCore.Model
{
    public class PackageModule : BaseEntity
    {
        [Required]
        [StringLength(11)]
        public string UserId { set; get; }

        [Required]
        [StringLength(11)]
        public string PackageId { set; get; }

        [Required]
        [StringLength(11)]
        public string ModuleId { set; get; }

        [Required]
        public int Limit { get; set; }
    }
}
