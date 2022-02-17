using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Model;

namespace WSCore.Models.VM
{
    public class MenuVM
    {
    }

    public class EditMenuVM
    {
        public Menu Menu { get; set; }
    }

    public class DeleteMenuVM : BaseVM
    {
        public Menu Menu { get; set; }
    }
}
