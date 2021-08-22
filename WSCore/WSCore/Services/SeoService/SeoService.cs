using System;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Model;
using WSCore.Models.Dto;

namespace WSCore.Services.SeoService
{
    public class SeoService : BasicService<Seo>, ISeoService
    {
        public SeoService (
            IUnitOfWork uow
        ) : base(uow) {}

        #region Create
        /// <summary>
        /// Create Seo by logic
        /// </summary>
        /// <param name="seoDto"></param>
        /// <returns></returns>
        public async Task<Seo> AddSeoLogicAsync(SeoDto seoDto)
        {
            try
            {
                Seo newEntity = new Seo
                {
                    ObjectId = seoDto.ObjectId,
                    ObjectType = seoDto.ObjectType,
                    SeoTitle = seoDto.SeoTitle,
                    SeoContent = seoDto.SeoContent,
                    SeoKeyWord = seoDto.SeoKeyWord,
                    CreatedUserId = GetUserId(),
                    LastSavedUserId = GetUserId()
                };
                await _uow.GetRepository<Seo>().AddAsync(newEntity);
                _uow.SaveChanges();
                return newEntity;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Create

        #region Update
        public async Task<Seo> UpdateSeoEntityAsync(Seo seo, bool isSaveChanged)
        {
            try
            {
                var dbContext = _uow.GetRepository<Seo>();
                dbContext.UpdateAsync(seo);
                if (isSaveChanged)
                    _uow.SaveChanges();
                return seo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Seo> UpdateSeoLogicAsync(SeoDto seoDto, string seoId)
        {
            try
            {
                var dbContext = _uow.GetRepository<Seo>();
                Seo seo = await dbContext.GetByIdAsync(seoId);
                if (seo == null)
                {
                    throw new Exception("NOT_FOUND");
                }

                seo.ObjectId = seoDto.ObjectId;
                seo.ObjectType = seoDto.ObjectType;
                seo.SeoTitle = seoDto.SeoTitle;
                seo.SeoContent = seoDto.SeoContent;
                seo.SeoKeyWord = seoDto.SeoKeyWord;
                seo.CreatedUserId = GetUserId();
                seo.LastSavedTime = GetLastSavedTime();

                dbContext.UpdateAsync(seo);
                _uow.SaveChanges();
                return seo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Update

        #region Get
        public async Task<Seo> GetSeoByObjectAsync(string objectId, string objectType)
        {
            try
            {
                var dbContext = _uow.GetRepository<Seo>();
                Seo seo = new Seo();
                var rs = await dbContext.GetByAsync(x => x.ObjectId == objectId && x.ObjectType == objectType);
                if (rs != null)
                    seo = rs?.FirstOrDefault();
                return seo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Get

        #region Delete
        public async Task<Seo> DeleteSeoByIdAsync(string id)
        {
            try
            {
                var dbContext = _uow.GetRepository<Seo>();
                Seo seo = null;
                seo = dbContext.GetById(id);

                if (seo != null)
                {
                    // Delete seo
                    _uow.GetRepository<Seo>().Delete(seo);
                }
                _uow.SaveChanges();

                return seo;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        #endregion Delete

    }
}
