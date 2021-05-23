using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;

namespace WSCore.Services.MediaService
{
    public class MediaService : BasicService<Media>, IMediaService
    {
        public MediaService(
            IUnitOfWork uow
        ) : base(uow){}

        #region Create
        protected async Task<Media> CreateMediaAsync(Media media, bool isSaveChange)
        {
            try
            {
                Media entity = new Media();
                var dbContext = _uow.GetRepository<Media>();
                await dbContext.AddAsync(entity);

                if(isSaveChange)
                    _uow.SaveChanges();

                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected async Task<Media> CreateMediaLogicAsync(Media media, string objectId, string objectType)
        {
            try
            {
                var dbContext = _uow.GetRepository<Media>();
                // Upload media success!

                // 
                string fileId = "";
                string path = ""; // Original media path
                string small = ""; // Small media path
                string medium = ""; // Medium media path
                string large = ""; // Large media path
                string mediaType = "";
                string attachedType = ""; // attached as [thumbnail, photo, attachment]

                Media entity = new Media {
                    FileId = fileId,
                    Title = "",
                    Alt = "",
                    Caption = "",
                    Path = path, // Original media path
                    ObjectId = objectId, // categoryId or postId
                    ObjectType = objectType, // category or post
                    Small = small, // Small media path
                    Medium = medium, // Medium media path
                    Large = large, // Large media path
                    MediaType = mediaType,
                    AttachedType = attachedType
                };
                await CreateMediaAsync(entity, false);

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
    }
}
