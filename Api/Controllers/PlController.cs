using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace UserJwtService;




[ApiController]
[Route("api/[controller]")]
public class PlController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public PlController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet]
        public async Task<ActionResult<IEnumerable<ProgrammingLanguage>>> GetPls()
        {
            return await _dbContext.programming_language.ToListAsync();
        }


    [HttpGet("{id}")]
    public ActionResult<ProgrammingLanguage> GetPlsById(int pl_id)
    {
        var pls = _dbContext.programming_language.Find(pl_id);
        if (pls == null)
        {
            return NotFound("id for programming language not found");
        }
        return pls;
        
    }

   [HttpPost]
    public ActionResult<ProgrammingLanguage> CreatePl([FromBody] ProgrammingLanguage programming_language)
    {
        _dbContext.programming_language.Add(programming_language);
        _dbContext.SaveChanges();
        return CreatedAtAction(nameof(GetPlsById), new { plid = programming_language.pl_id }, programming_language);
    }

    [HttpPut("{id}")]
    public IActionResult UpdatePl(int pl_id, [FromBody] ProgrammingLanguage updatedPl)
    {
        var pl = _dbContext.programming_language.Find(pl_id);
        if (pl == null)
        {
            return NotFound("id for programming language not found");
        }

        pl.nameofpl = updatedPl.nameofpl;
        _dbContext.SaveChanges();
        return Ok("Programming language updated successfully");
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePlCv(int pl_id)
    {
        var pl = _dbContext.programming_language.Find(pl_id);
        if (pl == null)
        {
            return NotFound("id for programming language not found");
        }

        _dbContext.programming_language.Remove(pl);
        _dbContext.SaveChanges();
        return Ok("Programming language deleted successfully");
    }

}