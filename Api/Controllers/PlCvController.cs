using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/[controller]")]
public class PlCvController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public PlCvController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet]
        public async Task<ActionResult<IEnumerable<PlCv>>> GetPlCvs()
        {
            return await _dbContext.pl_cv.ToListAsync();
        }


    [HttpGet("{pl_id}/{cv_id}")]
    public ActionResult<PlCv> GetPlCvsById(int pl_id, int cv_id)
    {
        var todo = _dbContext.pl_cv.Find(pl_id, cv_id);
        if (todo == null)
        {
            return NotFound("ids for pl_cv not found or didn't match");
        }
        return todo;
        
    }

   [HttpPost]
    public ActionResult<PlCv> CreatePlCv([FromBody] PlCv plcv)
    {
        _dbContext.pl_cv.Add(plcv);
        _dbContext.SaveChanges();
        return CreatedAtAction(nameof(GetPlCvsById), new { plid = plcv.pl_id, cvid = plcv.cv_id }, plcv);
    }

    [HttpPut("{pl_id}/{cv_id}")]
    public IActionResult UpdatePlCv(int pl_id, int cv_id, [FromBody] PlCv updatedPlCv)
    {
        var plcv = _dbContext.pl_cv.Find(pl_id, cv_id);
        if (plcv == null)
        {
            return NotFound("id for pl_cv not found or didn't match");
        }

        plcv.yearsofexperience = updatedPlCv.yearsofexperience;
        plcv.level = updatedPlCv.level;
        plcv.lastused = updatedPlCv.lastused;
        _dbContext.SaveChanges();
        return Ok("Pl_Cv updated successfully");
    }

    [HttpDelete("{pl_id}/{cv_id}")]
    public IActionResult DeletePlCv(int pl_id, int cv_id)
    {
        var plCv = _dbContext.pl_cv.Find(pl_id, cv_id);
        if (plCv == null)
        {
            return NotFound("id for pl_cv not found or id didn't match");
        }

        _dbContext.pl_cv.Remove(plCv);
        _dbContext.SaveChanges();
        return Ok("Pl_Cv deleted successfully");
    }

}