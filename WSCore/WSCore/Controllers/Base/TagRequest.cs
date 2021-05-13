using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Controllers.Base
{
    public class TagRequest
    {
        [Required]
        [MinLength(3, ErrorMessage = "MIN_LENGTH_INVALID")]
        [MaxLength(50, ErrorMessage = "MAX_LENGTH_INVALID")]
        public string Title { set; get; }
        public string Alias { set; get; }
    }
}
