using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Models.Dto
{
    public class SeoDto
    {
        public string ObjectId { set; get; }
        public string ObjectType { set; get; }
        public string SeoTitle { set; get; }
        public string SeoContent { set; get; }
        public string SeoKeyWord { set; get; }
    }
}
