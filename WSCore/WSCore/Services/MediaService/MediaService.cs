using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;
using WSCore.Services.UploadService;

namespace WSCore.Services.MediaService
{
    public class MediaService : BasicService<Media>, IMediaService
    {
        private readonly IUploadService _uploadService;
        public MediaService(
            IUnitOfWork uow,
            IUploadService uploadService
        ) : base(uow, uploadService) {
            _uploadService = uploadService;
        }

        #region Create
        protected async Task<Media> CreateMediaAsync(Media media, bool isSaveChange)
        {
            try
            {
                var dbContext = _uow.GetRepository<Media>();
                await dbContext.AddAsync(media);

                if(isSaveChange)
                    _uow.SaveChanges();

                return media;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// Create media for post/page/category/user ...
        /// </summary>
        /// <param name="file">File to Upload</param>
        /// <param name="objectId">Like: postId, categoryId, articleId</param>
        /// <param name="objectType">Like: category, post, article</param>
        /// <param name="attachedType">Like: thumbnail, attachment, photos</param>
        /// <returns></returns>
        public async Task<Media> CreateSingleMediaAsync(IFormFile file, string objectId, string objectType, string attachedType, bool isSaveChange = false)
        {
            try
            {
                UploadedFull uploadedFull = Upload(file, objectType, attachedType);

                Uploaded uploaded = new Uploaded();
                uploaded = uploadedFull.Uploaded;

                // Upload media success!
                string fileId = uploaded?.Id;
                string fileName = uploaded?.FileName;
                string path = uploaded?.OriginalPath; // Original media path
                string small = uploaded?.SmallPath; // Small media path
                string medium = uploaded?.MediumPath; // Medium media path
                string large = uploaded.LargePath; // Large media path
                string mediaType = uploaded.ContentType;

                Media entity = new Media {
                    FileId = fileId,
                    Title = fileName,
                    Alt = fileName,
                    Caption = fileName,
                    Path = path, // Original media path
                    ObjectId = objectId, // categoryId or postId
                    ObjectType = objectType, // category or post
                    Small = small, // Small media path
                    Medium = medium, // Medium media path
                    Large = large, // Large media path
                    MediaType = mediaType,
                    AttachedType = attachedType,
                    CreatedUserId = GetUserId(),
                    LastSavedUserId = GetUserId()
                };
                await CreateMediaAsync(entity, false);

                if(isSaveChange)
                    _uow.SaveChanges();

                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Create

        #region Update
        protected void UpdateMediaAsync(Media media, bool isSaveChange)
        {
            try
            {
                var dbContext = _uow.GetRepository<Media>();
                dbContext.AddAsync(media);
                if (isSaveChange)
                    _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Update

        #region Upload media
        protected UploadedFull Upload(IFormFile file, string subContainer, string attachedType)
        {   
            try
            {
                UploadedFull uploadedFull = new UploadedFull();
                uploadedFull = _uploadService.Upload(file, subContainer, attachedType);
                return uploadedFull;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Upload media
    }
}
