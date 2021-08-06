using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Model;

namespace WSCore.Models.VM
{
    public class ArticleVM
    {
        public Article Article { get; set; }
        public Media Media { get; set; }
    }

    public class ArticlesVM
    {
        public string Id { set; get; }
        public string Title { set; get; }
        public string Alias { set; get; }
        public string Excerpt { set; get; }
        public string ParentId { set; get; }
        public string Type { set; get; }
        public MediasVM Media { get; set; }
    }

    public class ArticleInfoVM
    {
        public Article Article { get; set; }
        public Media Media { get; set; }
    }
}
