using System;
using System.Collections.Generic;
using System.Text;

namespace WSCore.Model
{
    public class Category : BaseEntity
    {
        public string Title { set; get; }
        public string Alias { set; get; }
        public string Excerpt { set; get; }
        public string Content { set; get; }
        public Guid ParentId { set; get; }
        public string  Type { set; get; }
    }
}
