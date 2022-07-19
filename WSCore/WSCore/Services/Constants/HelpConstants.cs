using System.Collections.Generic;

namespace WSCore.Services.Constants
{
    public class HelpConstants
    {
        public static readonly IDictionary<string, string> UserActions = new Dictionary<string, string>
        {
            { "READONLY", "Read only" },
            { "ONLYME", "Only me" },
            { "OTHER", "Other" },
            { "ADD", "Add" },
            { "EDIT", "Edit" },
            { "DELETE", "Delete" }
        };
    }
}
