namespace WSCore.Model
{
    public class Files : BaseEntity
    {
        public string ContentType { set; get; }
        public string FileName { set; get; }
        public long Length { set; get; }
    }
}
