using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Services.UserService
{
    public class UserDto
    {
        [Required]
        [StringLength(50)]
        public string Phone { set; get; }

        [Required]
        [StringLength(100)]
        public string Email { set; get; }

        [Required]
        [StringLength(300)]
        public string Password { set; get; }
    }
}
