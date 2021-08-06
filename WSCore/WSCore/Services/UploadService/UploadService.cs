using LazZiya.ImageResize;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;

namespace WSCore.Services.UploadService
{
    public class UploadService : BasicService<Files>, IUploadService
    {
        private Commons common;
        private string subPathDirectory;
        private string subPathFileUrl;
        public UploadService(IUnitOfWork uow) : base (uow)
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

        public Uploaded Upload(IFormFile file, string subContainer, string attachedType = Constants.ATTACHED_TYPE_THUMBNAIL)
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

                string fileName = common.CreateFileName(subPathDirectory, file.FileName);
                //4 set the path where file will be copied
                string filePath = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(subPathDirectory)));

                //5 copy the file to the path
                using (var fileStream = new FileStream(Path.Combine(filePath, fileName), FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }

                Uploaded uploaded = new Uploaded(file.ContentType, fileName, file.Length);
                string subName = Path.GetFileNameWithoutExtension(file.FileName);
                uploaded.OriginalPath = subPathFileUrl + fileName;
                uploaded.SubName = subName;
                               
                // Insert Original file table
                Files file1 = new Files
                {
                    ContentType = uploaded.ContentType,
                    FileName = uploaded.FileName,
                    Length = uploaded.Length,
                    CreatedUserId = GetUserId(),
                    LastSavedUserId = GetUserId()
                };
                _uow.GetRepository<Files>().AddAsync(file1);
                _uow.SaveChanges();

                uploaded.FiledId = file1.Id;

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
                        uploaded.LargePath = subFilePathLarge;


                        // For Medium
                        var imgMedium = ImageResize.Scale(uploadedImage, Constants.RESIZE_MEDIUM_WIDTH, Constants.RESIZE_MEDIUM_HEIGHT);
                        string filePathMedium = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(resizeMediumFolder)));
                        imgMedium.SaveAs($"{filePathMedium}\\{fileName}");
                        string subFilePathMedium = subPathFileUrl + Constants.RESIZE_MEDIUM_LABEL + "/" + fileName;
                        uploaded.MediumPath = subFilePathMedium;

                        // For Small
                        var imgSmall = ImageResize.Scale(uploadedImage, Constants.RESIZE_SMALL_WIDTH, Constants.RESIZE_SMALL_HEIGHT);
                        string filePathSmall = Path.GetFullPath(Path.Combine(common.GetCurrentDirectoryForUpload(resizeSmallFolder)));
                        imgSmall.SaveAs($"{filePathSmall}\\{fileName}");
                        string subFilePathSmall = subPathFileUrl + Constants.RESIZE_SMALL_LABEL + "/" + fileName;
                        uploaded.SmallPath = subFilePathSmall;
                    }
                }

                return uploaded;
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

    public class Uploaded
    {
        public string Id { get; set; }
        public string FiledId { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
        public string SubName { get; set; }
        public long Length { get; set; }
        public string OriginalPath { get; set; }
        public string SmallPath { get; set; }
        public string MediumPath { get; set; }
        public string LargePath { get; set; }

        public Uploaded(){}

        public Uploaded(string contentType, string fileName, long length)
        {
            ContentType = contentType;
            FileName = fileName;
            Length = length;
        }
    }

    public class UploadedMultiple
    {
        public List<Uploaded> Uploadeds { get; set; }
    }
}
