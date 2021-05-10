using System;
using System.Collections.Generic;
using System.Text;

namespace WSCore.Model
{
    public class Tag : BaseEntity
    {
        public string Title { set; get; }
        public string Alias { set; get; }
    }
}
