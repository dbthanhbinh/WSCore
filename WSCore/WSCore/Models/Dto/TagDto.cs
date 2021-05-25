using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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
        public string Id { set; get; }
        [Required]
        [MinLength(3, ErrorMessage = "MIN_LENGTH_INVALID")]
        [MaxLength(50, ErrorMessage = "MAX_LENGTH_INVALID")]
        [RegularExpression(pattern: @"^[a-zA-Z''-'\s]{3,50}$", ErrorMessage = "CHARACTERS_ARE_NOT_ALLOW")]
        public string Title { set; get; }
        public string Alias { set; get; }
    }

    public class UpdateTagVM
    {
        public int Error { set; get; } = 0;
        public string ErrorMessage { set; get; } = null;
        public object Data { set; get; } = null;
    }

}
