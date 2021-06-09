using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Services.Constants
{
    public class LevelPermission
    {
        public int MaxLimit { get; set; }
        public string[] Action { get; set; }
    }

    public class LevelAction
    {
        public string[] Action { get; set; }
    }

    public class UserConstants
    {
        public static string[] ManageLevel = { "SupperAdmin", "Admin", "Editor" }; // Site permission
        public static string[] MemberLevel = { "Agency", "Member" };
        public static string[] AgencyLevel = { "Client" };

        public static readonly IDictionary<string, string> Modules = new Dictionary<string, string>
        {
            { "MD64f680", "User" },
            { "MD64f681", "Media" },
            { "MD64f682", "Tag" },
            { "MD64f683", "Post" },
            { "MD64f684", "Category" }
        };

        public static readonly IDictionary<string, string> Packages = new Dictionary<string, string>
        {
            { "PG64f680", "Bronze" },
            { "PG64f681", "Silver" },
            { "PG64f682", "Gold" },
            { "PG64f683", "Diamon" }
        };

        public static readonly IDictionary<string, string> PackageModules = new Dictionary<string, string>
        {
            { "PG64f680", "MD64f680" },
            { "PG64f681", "MD64f681" },
            { "PG64f682", "MD64f682" },
            { "PG64f683", "MD64f683" }
        };



        public static readonly IDictionary<string, string> ClientRole = new Dictionary<string, string>
        {
            { "admin", "Admin" },
            { "client", "Client" }
        };
    }
}
