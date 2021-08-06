using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using WSCore.Common;
using WSCore.Infrastructure.UnitOfWork;
using WSCore.Models.VM;
using WSCore.Services.ObjectTagService;
using WSCore.Services.UserService;
using WSCore.Services.UploadService;
using WSCore.Services.MediaService;

namespace WSCore.Services
{
    public class BasicService<T> where T : class
    {
        public readonly string userId = "469cf3e1";
        protected string controllerObj = "";
        protected readonly string attachedThumb = "thumbnail";
        protected readonly string attachedAttachment = "attachment";
        protected readonly string attachedPhotos = "photos";

        public readonly IUnitOfWork _uow;

        public BasicService(IUnitOfWork uow)
        {
            _uow = uow;

            GetPermissions(userId);
        }

        public BasicService(IUnitOfWork uow, IUserService userService)
        {
            _uow = uow;

            GetPermissions(userId);
        }

        public BasicService(IUnitOfWork uow, IUploadService uploadService)
        {
            _uow = uow;

            GetPermissions(userId);
        }

        public BasicService(IUnitOfWork uow, IObjectTagService objectTagService)
        {
            _uow = uow;

            GetPermissions(userId);
        }

        public BasicService(IUnitOfWork uow, IUserService userService, IObjectTagService objectTagService)
        {
            _uow = uow;

            GetPermissions(userId);
        }

        public BasicService(IUnitOfWork uow, IUserService userService, IObjectTagService objectTagService, IMediaService mediaService)
        {
            _uow = uow;

            GetPermissions(userId);
        }

        protected string GetUserId()
        {
            return userId;
        }

        protected bool GetPermissions(string userId)
        {
            return true;
        }

        protected DateTime GetLastSavedTime()
        {
            return DateTime.UtcNow;
        }

        public string BGetNewAliasAsync(
            string alias,
            Expression<Func<T, bool>> condition = null,
            Expression<Func<T, string>> selectedFields = null
        )
        {
            try
            {
                if(string.IsNullOrEmpty(alias) || condition == null || selectedFields == null)
                {
                    return "Error";
                }

                var crUow = _uow.GetRepository<T>();
                var newAlias = alias;
                var currentList = crUow.GetEntities(condition).Select(selectedFields).ToList();
                if (currentList.Count < 1)
                    return newAlias;

                Random rd = new Random();
                var hasItem = "";
                do
                {   
                    int idx = BLastIndexOf(newAlias);
                    string originalStr = newAlias.Substring(0, idx+1);
                    string lastStr = BSubstringToEnd(newAlias, idx);
                    int rs = 0;
                    bool isNumber = int.TryParse(lastStr, out rs);
                    if (isNumber)
                    {
                        rs += 1;
                        newAlias = originalStr + rs;
                    }
                    else
                    {
                        rs += 1;
                        newAlias = newAlias + "-" + rs;
                    }
                    hasItem = currentList.Where(w => w.Contains(newAlias)).FirstOrDefault();
                }
                while (hasItem != null);
                return newAlias;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        protected int BLastIndexOf(string str)
        {
            if (str == null)
                return -1;
            int idx = str.LastIndexOf(@"-");
            return idx;
        }

        protected string BSubstringToEnd(string str, int pos)
        {
            if (str == null || pos < 0 || pos >= str.Length)
                return null;
            string rs = str.Substring(pos+1);
            return rs;
        }

        protected NameAndAliasVM BGetNameAndAliasVM(string name, string alias)
        {
            if(string.IsNullOrEmpty(alias) || string.IsNullOrWhiteSpace(alias))
            {
                alias = StringHelper.GenerateSlug(name);
            }
            alias = StringHelper.GenerateSlug(alias);
            NameAndAliasVM obj = new NameAndAliasVM { 
                Name = name,
                Alias = alias
            };
            return obj;
        }

        protected ExcerptAndContentVM BGetExcerptAndContentVM(string content, string excerpt)
        {
            if (content != null)
                content = StringHelper.CleanXSSHtml(content);
            if (excerpt != null)
                excerpt = StringHelper.CleanXSSHtml(excerpt);

            if (content != null && excerpt == null)
                excerpt = StringHelper.GenerateExcerpt(excerpt, content);

            return new ExcerptAndContentVM
            {
                Excerpt = excerpt,
                Content = content
            };
        }

        #region Delete entity
        public async Task DeleteEntityByIdAsync(string id, bool isSaveChange)
        {
            try
            {
                var dbContext = _uow.GetRepository<T>();
                var entity = await dbContext.GetByIdAsync(id);
                if (entity != null)
                {
                    // Delete tag
                    dbContext.Delete(entity);
                }

                if(isSaveChange)
                    _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        #endregion Delete entity
    }
}
