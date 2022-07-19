using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WSCore.Model
{
    public class UserSecret : BaseEntity
    {
        [Required]
        [StringLength(300)]
        public string Password { set; get; }

        [Required]
        [StringLength(300)]
        public string Token { set; get; }

        [Required]
        public string UserId { set; get; }
    }
}
