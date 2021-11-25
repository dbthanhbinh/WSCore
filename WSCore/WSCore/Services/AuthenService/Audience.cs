using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.Services.AuthorService
{
    public class Audience
    {
        public string Secret { get; set; } = "Y2F0Y2hlciUyMHdvbmclMjBsb3ZlJTIwLm5ldA==";
        public string Iss { get; set; } = "http://www.c-sharpcorner.com/members/catcher-wong";
        public string Aud { get; set; } = "Catcher Wong";
    }
}
