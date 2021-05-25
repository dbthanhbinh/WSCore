using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WSCore.Model
{
    public class User : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Email { set; get; }

        [Required]
        [StringLength(50)]
        public string Phone { set; get; }

        [StringLength(50)]
        public string FullName { set; get; }

        [Required]
        [StringLength(250)]
        public string LoginName { set; get; }

        [Required]
        public bool IsConfirmed { set; get; } = false;
    }
}
