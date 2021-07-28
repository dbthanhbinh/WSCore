using System;
using System.Collections.Generic;
using System.Text;

namespace WSCore.Services.UploadService
{
    public static class Constants
    {
        public static bool Required { get { return true; } }
        public static int MinLength { get { return 3; } }
        public static int MaxLength { get { return 255; } }

        // Configs for Posttypes
        public const string CATEGORY_OBJECTTYPE_LABEL = "category";
        public const string ARTICLE_OBJECTTYPE_LABEL = "article";
        // Config length for Seo
        public static int TitleSeoLength { get { return 70; } }
        public static int DescriptionSeoLength { get { return 150; } }

        // Configs for file service
        public const string ATTACHED_TYPE_THUMBNAIL = "thumbnail";
        public const long MAX_FILE_SIZE = 10485760;
        public const long MIN_FILE_SIZE = 0;
        public const string UPLOADED = "ClientApp/public/Uploads";
        public const string NOT_FOUND_FILE = "Please select file to upload.";
        public const string FILE_TYPE_NOt_ALLOW = "The file type is not allow.";
        public const string FILE_SIZE_TOO_BIG = "The file size is too big.";
        public const string RESIZE_LAGRE_LABEL = "large";
        public const string RESIZE_MEDIUM_LABEL = "medium";
        public const string RESIZE_SMALL_LABEL = "small";
        public static string[] ImageTypes = { ".jpg", ".png", ".gif", ".jpeg" };

        public static int RESIZE_LARGE_WIDTH = 1024;
        public static int RESIZE_LARGE_HEIGHT = 1024;

        public static int RESIZE_MEDIUM_WIDTH = 500;
        public static int RESIZE_MEDIUM_HEIGHT = 500;

        public static int RESIZE_SMALL_WIDTH = 300;
        public static int RESIZE_SMALL_HEIGHT = 300;

        public static readonly IDictionary<string, string> ImageMimeDictionary = new Dictionary<string, string>
        {
            { ".bmp", "image/bmp" },
            { ".dib", "image/bmp" },
            { ".gif", "image/gif" },
            { ".svg", "image/svg+xml" },
            { ".jpe", "image/jpeg" },
            { ".jpeg", "image/jpeg" },
            { ".jpg", "image/jpeg" },
            { ".png", "image/png" },
            { ".pnz", "image/png" }
        };
    }
}
