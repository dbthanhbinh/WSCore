using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace WSCore.Services.UploadService
{
    public interface IUploadService
    {
        Uploaded Upload(IFormFile file, string subContainer, string attachedType = Constants.ATTACHED_TYPE_THUMBNAIL);
        UploadedMultiple UploadMultiple(List<IFormFile> files, string subContainer);
    }
}
