using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Model;
using WSCore.Models.Dto;
using WSCore.Models.VM;

namespace WSCore.Services.ArticleService
{
    public interface IArticleService
    {
        Task<ArticleVM> CreateArticleLogicAsync(ArticleDto articleDto);
        Task<ArticleVM> UpdateArticleLogicAsync(ArticleDto articleDto, string id);
        List<ArticlesVM> GetListArticle();
        Article DeleteArticleById(string id);
    }
}
