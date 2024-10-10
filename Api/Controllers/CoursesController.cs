using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace UserJwtService;



[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public CoursesController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet]
        public async Task<ActionResult<IEnumerable<Courses>>> GetCourses()
        {
            return await _dbContext.courses.ToListAsync();
        }


    [HttpGet("cv/{cvId}")]
    public async Task<IActionResult> GetCoursesByCvId(int cvId)
    {
        try
    {
        var crs = await _dbContext.courses.Where(crs => crs.cv_id == cvId).ToListAsync();
        return Ok(crs);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
    
    }

    [HttpGet("{id}")]
    public ActionResult<Courses> GetCoursesById(int id)
    {
        var coursesGet = _dbContext.courses.Find(id);
        if (coursesGet == null)
        {
            return NotFound("id for courses not found");
        }
        return coursesGet;
        
    }

    [HttpPost]
    public ActionResult<Courses> CreateCourses([FromBody] Courses courses)
    {
        _dbContext.courses.Add(courses);
        _dbContext.SaveChanges();
        return CreatedAtAction(nameof(GetCoursesById), new { id = courses.course_id }, courses);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateCourses(int id, [FromBody] Courses updatedCourses)
    {
        var courses = _dbContext.courses.Find(id);
        if (courses == null)
        {
            return NotFound("id for courses not found");
        }

        courses.year = updatedCourses.year;
        courses.description = updatedCourses.description;
        _dbContext.SaveChanges();
        return Ok("Courses updated successfully");
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProjectDetails(int id)
    {
        var courses = _dbContext.courses.Find(id);
        if (courses == null)
        {
            return NotFound("id for courses not found");
        }

        _dbContext.courses.Remove(courses);
        _dbContext.SaveChanges();
        return Ok("Courses successfully deleted");
    }


}