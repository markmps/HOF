using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace UserJwtService;


[ApiController]
[Route("api/[controller]")]
public class CvController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public CvController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cvs>>> GetCvs()
        {
            return await _dbContext.cv.ToListAsync();
        }


    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetCvsByUserId(int userId)
        {
        try
        {
            var cvs = await _dbContext.cv.Where(cv => cv.user_id == userId).ToListAsync();
            return Ok(cvs);
        }
        catch (Exception ex)
        {
        return StatusCode(500, $"Internal server error: {ex.Message}");
        }

    }

    [HttpGet("{id}")]
    public ActionResult<Cvs> GetCvsById(int id)
    {
        var cvGet = _dbContext.cv.Find(id);
        if (cvGet == null)
        {
            return NotFound("id for cv not found");
        }
        return cvGet;
        
    }

    [HttpPost]
    public ActionResult<Cvs> CreateCv([FromBody] Cvs cv)
    {
        _dbContext.cv.Add(cv);
        _dbContext.SaveChanges();
        return CreatedAtAction(nameof(GetCvsById), new { id = cv.cv_id }, cv);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateCv(int id, [FromBody] Cvs updatedCv)
    {
        var cv = _dbContext.cv.Find(id);
        if (cv == null)
        {
            return NotFound("id for cv not found");
        }

        cv.nationality = updatedCv.nationality;
        cv.birthyear = updatedCv.birthyear;
        cv.mainareas = updatedCv.mainareas;
        cv.technicalexperience = updatedCv.technicalexperience;
        cv.personalcharacteristics = updatedCv.personalcharacteristics;
        cv.industryexperience = updatedCv.industryexperience;
        _dbContext.SaveChanges();
        return Ok("Cv updated succesfully");
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteCv(int id)
    {
        var cv = _dbContext.cv.Find(id);
        if (cv == null)
        {
            return NotFound("id for cv not found");
        }

        _dbContext.cv.Remove(cv);
        _dbContext.SaveChanges();
        return Ok("Cv deleted successfully");
    }


    


}