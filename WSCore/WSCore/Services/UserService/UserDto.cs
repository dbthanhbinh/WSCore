using Newtonsoft.Json;
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
        [StringLength(100)]
        public string FullName { set; get; }
        [Required]
        [StringLength(50)]
        public string Phone { set; get; }
        [Required]
        [StringLength(300)]
        public string Password { set; get; }
        [Required]
        [StringLength(300)]
        public string Repassword { set; get; }

        [Required]
        public bool Iagree { set; get; }
    }

    public class EditUserDto
    {  
        public string Modules { set; get; }
    }


    public class JSDeserializeObject
    {
        [JsonProperty(PropertyName = "itemId")]
        public string ItemId { get; set; }

        [JsonProperty(PropertyName = "moduleId")]
        public string ModuleId { get; set; }

        [JsonProperty(PropertyName = "packageId")]
        public string PackageId { get; set; }

        [JsonProperty(PropertyName = "acts")]
        public string Acts { get; set; }

        [JsonProperty(PropertyName = "limit")]
        public int Limit { get; set; }
    }

    public class UserModuleActVM
    {
        public string Id { get; set; }
        public string PackageId { get; set; }
        public string ModuleId { get; set; } // user/tag/post
        public int Limit { get; set; } // 5/10/15
        public string Acts { get; set; }
    }
}
