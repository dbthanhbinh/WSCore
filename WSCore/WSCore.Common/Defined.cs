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

        public static readonly IDictionary<string, string> Posttypes = new Dictionary<string, string>
        {
            {"post", "Post" },
            {"news", "News" }
        };

        public static readonly IDictionary<string, string> Taxonomies = new Dictionary<string, string>
        {
            {"category", "Category" },
            {"newscategory", "News category" }
        };
    }
}
