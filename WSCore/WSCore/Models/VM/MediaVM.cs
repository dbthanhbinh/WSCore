using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Models.VM
{
    public class MediaVM
    {
    }

    public class MediasVM
    {
        public string Id { set; get; }
        public string FileId { set; get; }
        public string Title { set; get; }
        public string Alt { set; get; }
        public string Caption { set; get; }
        public string Path { set; get; }
        public string ObjectId { get; set; }
        public string ObjectType { get; set; }
        public string Small { set; get; }
        public string Medium { set; get; }
        public string Large { set; get; }
        public string MediaType { set; get; }
        public string AttachedType { set; get; }
    }
}
