using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WSCore.SimCard.Business;

namespace WSCore.SimCard.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SimCardController : ControllerBase
    {
        private readonly ISimCardService _simCardService;
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<SimCardController> _logger;

        public SimCardController(
            ISimCardService simCardService,
            ILogger<SimCardController> logger)
        {
            _simCardService = simCardService;
            _logger = logger;
        }

        [HttpGet("test", Name = "Test")]
        public IEnumerable<WeatherForecast> Test()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        #region Begin Add
        [HttpGet("add", Name = "AddLogicAsync")]
        public ActionResult AddLogicAsync()
        {
            _simCardService.AddLogicAsync();
            return Ok();
        }
        #endregion End Add

        #region Import
        [HttpGet("import", Name = "ImportLogicAsync")]
        public ActionResult ImportLogicAsync()
        {
            _simCardService.ImportFile();
            return Ok();
        }
        #endregion Import
    }
}
