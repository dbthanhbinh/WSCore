using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Controllers.Base
{
    public class TagRequest
    {
    }

    public class CreateTagBody
    {
        public string Title { set; get; }
        public string Alias { set; get; }
    }
}
