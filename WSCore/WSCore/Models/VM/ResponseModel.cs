using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Models.VM
{
    public class ResponseModel
    {
    }

    public class NameAndAliasVM
    {
        public string Name { get; set; }
        public string Alias { get; set; }
    }

    public class ExcerptAndContentVM
    {
        public string Excerpt { get; set; }
        public string Content { get; set; }
    }
}
