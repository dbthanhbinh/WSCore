using System.Text.RegularExpressions;

namespace WSCore.Common
{
    public class ValidationHelper
    {
        public static Regex r = new Regex(@"[~`!@#$%^&*()+=|\{}':;.,<>/?[\]""_-]");
    }
}
