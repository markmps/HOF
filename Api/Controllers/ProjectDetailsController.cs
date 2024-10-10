using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace UserJwtService;




[ApiController]
[Route("api/[controller]")]
public class ProjectDetailsController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public ProjectDetailsController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDetails>>> GetProjectDetails()
        {
            return await _dbContext.project_details.ToListAsync();
        }


    [HttpGet("cv/{cvId}")]
    public async Task<IActionResult> GetPdsByCvId(int cvId)
    {
        try
    {
        var pds = await _dbContext.project_details.Where(pd => pd.cv_id == cvId).ToListAsync();
        return Ok(pds);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
    
    }


    [HttpGet("{id}")]
    public ActionResult<ProjectDetails> GetProjectDetailsById(int id)
    {
        var pdGet = _dbContext.project_details.Find(id);
        if (pdGet == null)
        {
            return NotFound("id for project details not found");
        }
        return pdGet;
        
    }

    [HttpPost]
    public ActionResult<ProblemDetails> CreateProjectDetails([FromBody] ProjectDetails pd)
    {
        _dbContext.project_details.Add(pd);
        _dbContext.SaveChanges();
        return CreatedAtAction(nameof(GetProjectDetailsById), new { id = pd.pd_id }, pd);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProjectDetails(int id, [FromBody] ProjectDetails updatedPd)
    {
        var pd = _dbContext.project_details.Find(id);
        if (pd == null)
        {
            return NotFound("id for project details not found");
        }

        pd.whichfirm = updatedPd.whichfirm;
        pd.position = updatedPd.position;
        pd.period = updatedPd.period;
        pd.tools = updatedPd.tools;
        pd.description = updatedPd.description;
        _dbContext.SaveChanges();
        return Ok("Project details updated successfully");
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProjectDetails(int id)
    {
        var pd = _dbContext.project_details.Find(id);
        if (pd == null)
        {
            return NotFound("id for project details not found");
        }

        _dbContext.project_details.Remove(pd);
        _dbContext.SaveChanges();
        return Ok("Project details successfully deleted");
    }


}