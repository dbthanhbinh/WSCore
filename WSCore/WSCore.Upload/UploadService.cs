using LazZiya.ImageResize;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using WSCore.Model;

namespace WSCore.Upload
{
    public class UploadService
    {
        private readonly Commons common;
        private string subPathDirectory;
        private string subPathFileUrl;
        public UploadService()
        {
            common = new Commons();
            string uploadedFolder = common.DirectoryUploaded();
            // Create Uploads folder if not exists
            common.CreateDirectoryIfNotExists(uploadedFolder);
            // Create localtion for upload
            string year = DateTime.Now.Year.ToString();
            string month = DateTime.Now.Month.ToString();
            string day = DateTime.Now.Day.ToString();
            subPathDirectory = "\\" + year + "\\" + month + "\\" + day;
            subPathFileUrl = year + "/" + month + "/" + day + "/";
        }

        public class Uploaded
        {
            public string ContentType { get; set; }
            public string FileName { get; set; }
            public long Length { get; set; }

            public Uploaded(string contentType, string fileName, long length)
            {
                ContentType = contentType;
                FileName = fileName;
                Length = length;
            }
        }

        public class UploadedFull
        {
            public Uploaded Uploaded { get; set; }
            public List<Uploaded> ResizeUploaded { get; set; }
        }

        public class UploadedMultiple
        {
            public List<Uploaded> Uploadeds { get; set; }
        }

        public UploadedFull Upload(IFormFile file, string subContainer, string attachedType = Constants.ATTACHED_TYPE_THUMBNAIL)
        {
            try
            {
                if (file == null || string.IsNullOrEmpty(subContainer) || string.IsNullOrWhiteSpace(subContainer)) return null;

                if (file.Length < 1)
                    return null;

                subPathDirectory = String.Concat("\\", subContainer, subPathDirectory);
                subPathFileUrl = String.Concat(subContainer, "/", subPathFileUrl);

                // Create Uploads folder if not exists
                common.CreateDirectoryIfNotExists(subPathDirectory);

                // Check validation file
                if (!common.AllowMimeTypesFile())
                    throw new Exception(Constants.NOT_FOUND_FILE);

                if (!common.CheckFileSize(file.Length))
                    throw new Exception(Constants.FILE_SIZE_TOO_BIG);

                string subName = Path.GetFileNameWithoutExtension(file.FileName);
                string fileName = common.CreateFileName(subPathDirectory, file.FileName);
                //4 set the path where file will be copied
                string filePath = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(subPathDirectory)));

                //5 copy the file to the path
                using (var fileStream = new FileStream(Path.Combine(filePath, fileName), FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }

                Uploaded uploaded = new Uploaded(file.ContentType, fileName, file.Length);

                // This process Resize image
                UploadedFull uploadedFull = new UploadedFull
                {
                    Uploaded = uploaded
                };

                // Resize Image for other thumb
                if (!string.IsNullOrEmpty(attachedType)
                    && !string.IsNullOrWhiteSpace(attachedType)
                    && attachedType == Constants.ATTACHED_TYPE_THUMBNAIL
                    && common.CheckImageTypeForResize(file.FileName))
                {
                    string resizeLargeFolder = subPathDirectory + "\\" + Constants.RESIZE_LAGRE_LABEL;
                    string resizeMediumFolder = subPathDirectory + "\\" + Constants.RESIZE_MEDIUM_LABEL;
                    string resizeSmallFolder = subPathDirectory + "\\" + Constants.RESIZE_SMALL_LABEL;

                    common.CreateDirectoryIfNotExists(resizeLargeFolder);
                    common.CreateDirectoryIfNotExists(resizeMediumFolder);
                    common.CreateDirectoryIfNotExists(resizeSmallFolder);

                    using (var stream = file.OpenReadStream())
                    {
                        var uploadedImage = Image.FromStream(stream);
                        List<Uploaded> uploadeds = new List<Uploaded>();
                        // Returns Image file
                        // For Large
                        var imgLarge = ImageResize.Scale(uploadedImage, Constants.RESIZE_LARGE_WIDTH, Constants.RESIZE_LARGE_HEIGHT);
                        string filePathLarge = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(resizeLargeFolder)));
                        imgLarge.SaveAs($"{filePathLarge}\\{fileName}");
                        string subFilePathLarge = subPathFileUrl + Constants.RESIZE_LAGRE_LABEL + "/" + fileName;
                        Uploaded uploadedLarge = new Uploaded(file.ContentType, fileName, file.Length);
                        uploadeds.Add(uploadedLarge);

                        // For Medium
                        var imgMedium = ImageResize.Scale(uploadedImage, Constants.RESIZE_MEDIUM_WIDTH, Constants.RESIZE_MEDIUM_HEIGHT);
                        string filePathMedium = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(resizeMediumFolder)));
                        imgMedium.SaveAs($"{filePathMedium}\\{fileName}");
                        string subFilePathMedium = subPathFileUrl + Constants.RESIZE_MEDIUM_LABEL + "/" + fileName;
                        Uploaded uploadedMedium = new Uploaded(file.ContentType, fileName, file.Length);
                        uploadeds.Add(uploadedMedium);

                        // For Small
                        var imgSmall = ImageResize.Scale(uploadedImage, Constants.RESIZE_SMALL_WIDTH, Constants.RESIZE_SMALL_HEIGHT);
                        string filePathSmall = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(resizeSmallFolder)));
                        imgSmall.SaveAs($"{filePathSmall}\\{fileName}");
                        string SubFilePathSmall = subPathFileUrl + Constants.RESIZE_SMALL_LABEL + "/" + fileName;
                        Uploaded uploadedSmall = new Uploaded(file.ContentType, fileName, file.Length);
                        uploadeds.Add(uploadedSmall);

                        uploadedFull.ResizeUploaded = uploadeds;
                    }
                }

                return uploadedFull;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Upload multiple file
        /// </summary>
        /// <param name="file"></param>
        /// <param name="subContainer"></param>
        /// <param name="attachedType"></param>
        /// <returns></returns>
        public UploadedMultiple UploadMultiple(List<IFormFile> files, string subContainer)
        {
            try
            {
                if (files == null || string.IsNullOrEmpty(subContainer) || string.IsNullOrWhiteSpace(subContainer)) return null;

                if (files.Count < 1)
                    return null;

                subPathDirectory = String.Concat("\\", subContainer, subPathDirectory);
                subPathFileUrl = String.Concat(subContainer, "/", subPathFileUrl);
                // Create Uploads folder if not exists
                common.CreateDirectoryIfNotExists(subPathDirectory);

                UploadedMultiple uploadeds = new UploadedMultiple();
                foreach (var file in files)
                {
                    // Check validation file
                    if (!common.AllowMimeTypesFile())
                        throw new Exception(Constants.NOT_FOUND_FILE);

                    if (!common.CheckFileSize(file.Length))
                        throw new Exception(Constants.FILE_SIZE_TOO_BIG);

                    string subName = Path.GetFileNameWithoutExtension(file.FileName);
                    string fileName = common.CreateFileName(subPathDirectory, file.FileName);
                    //4 set the path where file will be copied
                    string filePath = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(subPathDirectory)));

                    //5 copy the file to the path
                    using (var fileStream = new FileStream(Path.Combine(filePath, fileName), FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }

                    uploadeds.Uploadeds.Add(new Uploaded(file.ContentType, fileName, file.Length));
                }

                return uploadeds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
