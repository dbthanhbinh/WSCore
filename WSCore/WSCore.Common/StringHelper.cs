using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Text;
using System.Text.RegularExpressions;

namespace WSCore.Common
{
    public static class StringHelper
    {
        private static readonly string Ldquo = "&ldquo;";
        private static readonly string Rdquo = "&rdquo;";
        private static readonly string Mdash = "&mdash;";

        public static bool IsNullOrWhiteSpace(string str)
        {
            return string.IsNullOrWhiteSpace(str);
        }

        public static bool IsNullOrEmpty(string str)
        {
            return string.IsNullOrEmpty(str);
        }

        public static bool IsValidEmail(string email)
        {
            const string validEmailPattern = @"^(?!\.)(""([^""\r\\]|\\[""\r\\])*""|"
                                             + @"([-a-z0-9!#$%&'*+/=?^_`{|}~]|(?<!\.)\.)*)(?<!\.)"
                                             + @"@[a-z0-9][\w\.-]*[a-z0-9]\.[a-z][a-z\.]*[a-z]$";

            return new Regex(validEmailPattern, RegexOptions.IgnoreCase).IsMatch(email);
        }

        public static string GenerateSlug(this string phrase)
        {
            string str = phrase.RemoveDiacritics().ToLower();
            // invalid chars           
            str = Regex.Replace(str, @"[^a-z0-9\s-]", "");
            // convert multiple spaces into one space   
            str = Regex.Replace(str, @"\s+", " ").Trim();
            // cut and trim 
            str = str.Substring(0, str.Length <= 150 ? str.Length : 150).Trim();
            str = Regex.Replace(str, @"\s", "-"); // hyphens   
            return str;
        }

        public static string GenerateAlias(string currentAlias, string replyText)
        {
            if (!IsNullOrEmpty(currentAlias) && !IsNullOrWhiteSpace(currentAlias) && !currentAlias.Equals("null"))
            {
                return GenerateSlug(currentAlias);
            }
            else
                return GenerateSlug(replyText);
        }

        private static string RemoveDiacritics(this string text)
        {
            string stFormD = text.Normalize(NormalizationForm.FormD).ToString().ToLowerInvariant();
            StringBuilder sb = new StringBuilder();
            for (int ich = 0; ich < stFormD.Length; ich++)
            {
                System.Globalization.UnicodeCategory uc = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(stFormD[ich]);
                if (uc != System.Globalization.UnicodeCategory.NonSpacingMark)
                {
                    sb.Append(RemapInternationalCharToAscii(stFormD[ich]));
                }
            }
            return (sb.ToString().Normalize(NormalizationForm.FormD));

        }

        private static string RemapInternationalCharToAscii(char c)
        {
            string s = c.ToString().ToLowerInvariant();
            if ("àåáâäãåą".Contains(s))
            {
                return "a";
            }
            else if ("èéêëę".Contains(s))
            {
                return "e";
            }
            else if ("ìíîïı".Contains(s))
            {
                return "i";
            }
            else if ("òóôõöøőð".Contains(s))
            {
                return "o";
            }
            else if ("ùúûüŭů".Contains(s))
            {
                return "u";
            }
            else if ("çćčĉ".Contains(s))
            {
                return "c";
            }
            else if ("żźž".Contains(s))
            {
                return "z";
            }
            else if ("śşšŝ".Contains(s))
            {
                return "s";
            }
            else if ("ñń".Contains(s))
            {
                return "n";
            }
            else if ("ýÿ".Contains(s))
            {
                return "y";
            }
            else if ("ğĝ".Contains(s))
            {
                return "g";
            }
            else if (c == 'ř')
            {
                return "r";
            }
            else if (c == 'ł')
            {
                return "l";
            }
            else if (c == 'đ')
            {
                return "d";
            }
            else if (c == 'ß')
            {
                return "ss";
            }
            else if (c == 'þ')
            {
                return "th";
            }
            else if (c == 'ĥ')
            {
                return "h";
            }
            else if (c == 'ĵ')
            {
                return "j";
            }
            else
            {
                return s;
            }
        }

        public static string GenerateLimitCharacter(string str, int limit = 65, bool cleanXSS = false)
        {
            if (IsNullOrEmpty(str)) return null;
            if (IsNullOrWhiteSpace(str)) return null;

            if (cleanXSS) str = CleanXSSHtml(str);
            if (str.Length <= limit) return str;
            var currentChar = str[limit];
            if (IsNullOrWhiteSpace(currentChar.ToString()))
            {
                return str.Substring(0, limit);
            }
            else
            {
                var source = str.Substring(0, limit);
                var lastIndex = source.LastIndexOf(" ");
                return str.Substring(0, lastIndex);
            }
        }

        public static string GenerateExcerpt(string excerptStr, string contentStr, int limit = 170)
        {
            if (excerptStr != null)
            {
                return GenerateLimitCharacter(excerptStr, limit, true);
            }
            else
            {
                if (contentStr != null)
                    return GenerateLimitCharacter(contentStr, limit, true);
                else
                    return null;
            }
        }

        public static string CleanWordHtml(string html)
        {
            StringCollection sc = new StringCollection();
            // get rid of unnecessary tag spans (comments and title)
            sc.Add(@"<!--(w|W)+?-->");
            sc.Add(@"<title>(w|W)+?</title>");
            // Get rid of classes and styles
            sc.Add(@"s?class=w+");
            sc.Add(@"s+style='[^']+'");
            // Get rid of unnecessary tags
            // sc.Add(@"<(meta|link|/?o:|/?style|/?div|/?std|/?head|/?html|body|/?body|/?span|![)[^>].*?>");
            sc.Add(@"<.*?>");
            // Get rid of empty paragraph tags
            sc.Add(@"(<[^>]+>)+&nbsp;(</w+>)+");
            // remove bizarre v: element attached to <img> tag
            sc.Add(@"s+v:w+=""[^""]+""");
            // remove extra lines
            sc.Add(@"(nr){2,}");
            foreach (string s in sc)
            {
                html = Regex.Replace(html, s, "", RegexOptions.IgnoreCase);
            }
            return html;
        }

        public static string CleanTagHtmlForTitle(string html)
        {
            StringCollection sc = new StringCollection();
            // get rid of unnecessary tag spans (comments and title)
            sc.Add(@"<!--(w|W)+?-->");
            sc.Add(@"<title>(w|W)+?</title>");
            // Get rid of classes and styles
            sc.Add(@"s?class=w+");
            sc.Add(@"s+style='[^']+'");
            // Get rid of unnecessary tags
            sc.Add(@"</?\w+((\s+\w+(\s*=\s*(?:"".*?""|'.*?'|[^'"">\s]+))?)+\s*|\s*)/?>");
            sc.Add(@"<.*?>");
            // Get rid of empty paragraph tags
            sc.Add(@"(<[^>]+>)+&nbsp;(</w+>)+");
            // remove bizarre v: element attached to <img> tag
            sc.Add(@"s+v:w+=""[^""]+""");
            // remove extra lines
            sc.Add(@"(nr){2,}");
            foreach (string s in sc)
            {
                html = Regex.Replace(html, s, "", RegexOptions.IgnoreCase);
            }
            return html;
        }

        public static string FixEntities(string html)
        {
            NameValueCollection nvc = new NameValueCollection();
            nvc.Add("\"", Ldquo);
            nvc.Add("\"", Rdquo);
            nvc.Add("Ã¢â‚¬â€œ", Mdash);
            foreach (string key in nvc.Keys)
            {
                html = html.Replace(key, nvc[key]);
            }
            return html;
        }

        public static string CleanXSSHtml(string html)
        {
            if (IsNullOrEmpty(html) || IsNullOrWhiteSpace(html)) return null;
            html = CleanWordHtml(html);
            html = FixEntities(html);
            return html;
        }

        public static string FilterInputString(string html)
        {
            if (IsNullOrEmpty(html) || IsNullOrWhiteSpace(html)) return null;
            html = CleanWordHtml(html);
            html = FixEntities(html);
            return html;
        }
    }
}
