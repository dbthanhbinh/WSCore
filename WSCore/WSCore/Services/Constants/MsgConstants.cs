using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Services.Constants
{
    public static class MsgConstants
    {
        public static readonly string DONOT_HAVE_PERMISSION = "Don't have permission!";
        public static readonly string DONOT_FOUND_ITEM = "Don't found item!";
        public static readonly string ITEM_HAS_PARENT = "Item has parent, Can't delete!";
        public static readonly string ITEM_HAS_CHILDS = "Item has childs, Can't delete!";
    }
}
