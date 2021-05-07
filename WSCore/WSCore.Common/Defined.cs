using System;
using System.Collections.Generic;

namespace WSCore.Common
{
    public static class Defined
    {
        public static readonly IDictionary<string, string> Status = new Dictionary<string, string>
        {
            {"pendding", "Pendding" },
            {"publish", "Publish" },
            {"Draft", "Draft" },
            {"cron", "Cron" }
        };
    }
}
