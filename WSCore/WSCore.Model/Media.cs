using System;

namespace WSCore.Model
{
    public class Media : BaseEntity
    {
        public Guid FileId { set; get; }
        public string Path { set; get; }
        public Guid ObjectId { get; set; }
        public string ObjectType { get; set; }
        public string Small { set; get; }
        public string Medium { set; get; }
        public string Large { set; get; }
        public string MediaType { set; get; }
    }
}
