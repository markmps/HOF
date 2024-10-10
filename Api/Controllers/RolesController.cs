using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/[controller]")]
public class RolesController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public RolesController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet]
        public async Task<ActionResult<IEnumerable<Roles>>> GetRoles()
        {
            return await _dbContext.roles.ToListAsync();
        }


    [HttpGet("{role_id}")]
    public ActionResult<Roles> GetRolesById(int role_id)
    {
        var roleGet = _dbContext.roles.Find(role_id);
        if (roleGet == null)
        {
            return NotFound("ids for user_roles not found or didn't match");
        }
        return roleGet;
        
    }

   [HttpPost]
    public ActionResult<Roles> CreateRoles([FromBody] Roles roles)
    {
        _dbContext.roles.Add(roles);
        _dbContext.SaveChanges();
        return CreatedAtAction(nameof(GetRolesById), new { role_id = roles.role_id }, roles);
    }

    [HttpPut("{role_id}")]
    public IActionResult UpdateRoles(int role_id, [FromBody] Roles updatedRole)
    {
        var role = _dbContext.roles.Find(role_id);
        if (role == null)
        {
            return NotFound("id for user_roles not found or didn't match");
        }

        role.nameofrole = updatedRole.nameofrole;
        _dbContext.SaveChanges();
        return Ok("Roles updated successfully");
    }

    [HttpDelete("{role_id}")]
    public IActionResult DeleteRole(int role_id)
    {
        var role = _dbContext.roles.Find(role_id);
        if (role == null)
        {
            return NotFound("id for user_roles not found or id didn't match");
        }

        _dbContext.roles.Remove(role);
        _dbContext.SaveChanges();
        return Ok("User_roles deleted successfully");
    }

}