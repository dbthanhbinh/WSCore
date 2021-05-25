using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WSCore.Model
{
    public class UserProfile : BaseEntity
    {
        public string FullName { set; get; }
        public string Address { set; get; }
        public string Ward { set; get; }
        public string District { set; get; }
        public string City { set; get; }
        public string Descriptions { set; get; }
        public string Avatar { set; get; }
        public string Banner { set; get; }

        [Required]
        public string UserId { set; get; }
    }
}
