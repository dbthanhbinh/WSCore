using System;
using System.Collections.Generic;
using System.Text;

namespace WSCore.Model
{
    public class UserModuleAct : BaseEntity
    {
        public string UserId { get; set; }
        public string ModuleId { get; set; }
        public string PackageId { get; set; }
        public string MemberRole { get; set; }
        public int Limit { get; set; }
        public string Acts { get; set; }
    }
}
