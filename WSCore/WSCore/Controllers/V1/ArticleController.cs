using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WSCore.Models.Dto;
using WSCore.Services.ArticleService;

namespace WSCore.Controllers.V1
{
    [Route("v1/[controller]")]
    [ApiController]
    public class ArticleController : BaseController
    {
        private readonly IArticleService _articleService;

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        #region Create
        [HttpPost("articles")]
        public async Task<ActionResult> CreateArticle([FromForm] ArticleDto articleDto)
        {
            if (articleDto == null)
                return BadRequest();
            object rs = null;
            if (ModelState.IsValid)
            {
                rs = await _articleService.CreateArticleLogicAsync(articleDto);
            }
            return Ok(new ApiResponse(rs));
        }
        #endregion Create

        #region Update
        [HttpPut("articles/{id}")]
        public async Task<ActionResult> UpdateArticle([FromForm] ArticleDto articleDto, string id)
        {
            if (articleDto == null)
                return BadRequest();
            object rs = null;
            if (ModelState.IsValid)
            {
                rs = await _articleService.UpdateArticleLogicAsync(articleDto, id);
            }
            return Ok(new ApiResponse(rs));
        }
        #endregion Update

        #region Get
        [HttpGet("articles/{type}/{page}")]
        public ActionResult GetArticlesByType(string type, int page)
        {
            var rs = _articleService.GetArticlesByTypeWithPagingAsync(type, page);
            return Ok(new ApiResponse(rs));
        }

        [HttpGet("articles/edit/{articleId}")]
        public ActionResult GetArticleById(string articleId)
        {
            var rs = _articleService.EditArticleByIdAsync(articleId);
            return Ok(new ApiResponse(rs));
        }

        #endregion Get

        #region Delete
        [HttpDelete("articles/{id}")]
        public ActionResult DeleteArticleById(string id)
        {
            var rs = _articleService.DeleteArticleById(id);
            return Ok(new ApiResponse(rs));
        }
        #endregion Delete

        #region Library
        #endregion Library
    }
}
