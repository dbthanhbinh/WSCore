using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Model;

namespace WSCore.Models.Dto
{
    public class TagDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "MIN_LENGTH_INVALID")]
        [MaxLength(50, ErrorMessage = "MAX_LENGTH_INVALID")]
        public string Title { set; get; }
        public string Alias { set; get; }
    }

    public class UpdateTagModel
    {       
        [Required]
        public string Title { set; get; }
        public string Alias { set; get; }
    }

    public class UpdateTagVM
    {
        public Tag Tag { set; get; } = null;
    }

}
