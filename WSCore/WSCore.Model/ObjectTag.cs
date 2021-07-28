using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WSCore.Model
{
    public class ObjectTag : BaseEntity
    {
        [Required]
        public string ObjId { set; get; }

        [Required]
        public string ObjName { set; get; } // Category||Post

        [Required]
        public string ObjType { set; get; } // category||post||article|news

        [Required]
        public string TagId { set; get; }
    }
}
