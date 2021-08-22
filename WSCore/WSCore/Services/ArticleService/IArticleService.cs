using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WSCore.Model;
using WSCore.Models.Dto;
using WSCore.Models.VM;

namespace WSCore.Services.ArticleService
{
    public interface IArticleService : IBasicService<Article>
    {
        Task<ArticleVM> CreateArticleLogicAsync(ArticleDto articleDto);
        Task<EditArticleInfoVM> UpdateArticleLogicAsync(ArticleDto articleDto, string id);
        List<ArticlesVM> GetArticles();
        PagingResponse GetArticlesByTypeWithPagingAsync(string type, int currentPage);
        ArticleInfoVM GetArticleByIdAsync(string id);
        EditArticleInfoVM EditArticleByIdAsync(string id);
        Article DeleteArticleById(string id);
    }
}
