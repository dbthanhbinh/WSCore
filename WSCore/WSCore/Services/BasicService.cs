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
using WSCore.Services.SeoService;

namespace WSCore.Services
{
    public class BasicService<T> where T : class
    {
        public readonly string userId = "a45180e5";
        protected string controllerObj = "";
        protected readonly string attachedThumb = "thumbnail";
        protected readonly string attachedAttachment = "attachment";
        protected readonly string attachedPhotos = "photos";

        protected int toTalPages = 0;
        protected int page = 1;
        protected int pageSize = 2;
        protected int takeNumber = 2; // pageSize
        protected int skipIdx = 0;

        public readonly IUnitOfWork _uow;
        private readonly IUserService _userService;

        public BasicService(IUnitOfWork uow)
        {
            _uow = uow;

            GetPermissions(userId);
        }

        public BasicService(IUnitOfWork uow, IUserService userService)
        {
            _uow = uow;
            _userService = userService;
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
            _userService = userService;
            GetPermissions(userId);
        }

        public BasicService(
            IUnitOfWork uow,
            IUserService userService,
            IObjectTagService objectTagService,
            IMediaService mediaService,
            ISeoService seoService
        )
        {
            _uow = uow;
            _userService = userService;
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

        protected bool CheckPermission(string moduleName, string action)
        {
            // Check user permissions
            //ClientActVM userPermissions = _userService.GetPermissionsById(userId);
            //if (userPermissions != null)
            //{
            //    var packageModuleItem = userPermissions?.PackageModules.Find(
            //            s => s.UserId == userId &&
            //                s.ModuleAlias == moduleName
            //        );
            //    var userModuleActItem = userPermissions?.UserModuleActs.Find(
            //            s1 => s1.UserId == userId &&
            //                    s1.ModuleId == packageModuleItem.ModuleId &&
            //                    s1.PackageId == packageModuleItem.PackageId
            //        );

            //    var acts = userModuleActItem?.Acts;
            //    var act = acts?.Split(',');
            //    return act.Contains(action);
            //}
            //else
                return false;
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

    public class BasePagingResponse
    {
        public int TotalRecords { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public bool IsPaging { get; set; }

        public BasePagingResponse(int totalPages, int totalRecords, int currentPage, int pageSize, bool isPaging)
        {
            TotalPages = totalPages;
            TotalRecords = totalRecords;
            CurrentPage = currentPage;
            PageSize = pageSize;
            IsPaging = isPaging;
        }
    }

    public class PagingResponse
    {
        public BasePagingResponse Paging { get; set; }
        public object Data { get; set; }

        public PagingResponse(object data, int toTalPages, int totalRecords, int currentPage, int pageSize)
        {
            Paging = new BasePagingResponse(toTalPages, totalRecords, currentPage, pageSize, true);
            Data = data;
        }
    }
}
