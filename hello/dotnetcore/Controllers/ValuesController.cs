using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace dotnetcore.Controllers
{
    [Route("/")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET /
        [HttpGet]
        public ActionResult<string> Get()
        {
            return "C# Hello on " + Environment.MachineName;
        }

    }
}
