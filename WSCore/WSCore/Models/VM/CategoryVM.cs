using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Models.VM
{
    public class CategoryVM
    {
        public string Title { set; get; }
        public string Alias { set; get; }
        public string Excerpt { set; get; }
        public string Content { set; get; }
        public string ParentId { set; get; }
        public string Type { set; get; }
        public string SeoTitle { get; set; }
        public string SeoContent { get; set; }
        public string SeoKeyWord { get; set; }
    }

    public class CategoryLogicVM
    {
        public CategoryVM categoryVM { get; set; }
    }
}
