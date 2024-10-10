using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/[controller]")]
public class UserRolesController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public UserRolesController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    [HttpGet]
        public async Task<ActionResult<IEnumerable<UserRoles>>> GetUserRoles()
        {
            return await _dbContext.user_roles.ToListAsync();
        }


    [HttpGet("{user_id}/{role_id}")]
    public ActionResult<UserRoles> GetUserRolesById(int user_id, int role_id)
    {
        var userroleGet = _dbContext.user_roles.Find(user_id, role_id);
        if (userroleGet == null)
        {
            return NotFound("ids for user_roles not found or didn't match");
        }
        return userroleGet;
        
    }

   [HttpPost]
    public ActionResult<UserRoles> CreateUserRoles([FromBody] UserRoles userroles)
    {
        _dbContext.user_roles.Add(userroles);
        _dbContext.SaveChanges();
        return CreatedAtAction(nameof(GetUserRolesById), new { user_id = userroles.user_id, role_id = userroles.role_id }, userroles);
    }

    [HttpPut("{user_id}/{role_id}")]
    public IActionResult UpdateUserRoles(int user_id, int role_id, [FromBody] UserRoles updatedUserRole)
    {
        var userrole = _dbContext.user_roles.Find(user_id, role_id);
        if (userrole == null)
        {
            return NotFound("id for user_roles not found or didn't match");
        }

        userrole.role_id = updatedUserRole.role_id;
        _dbContext.SaveChanges();
        return Ok("User_roles updated successfully");
    }

    [HttpDelete("{user_id}/{role_id}")]
    public IActionResult DeletePlCv(int user_id, int role_id)
    {
        var userrole = _dbContext.user_roles.Find(user_id, role_id);
        if (userrole == null)
        {
            return NotFound("id for user_roles not found or id didn't match");
        }

        _dbContext.user_roles.Remove(userrole);
        _dbContext.SaveChanges();
        return Ok("User_roles deleted successfully");
    }

}