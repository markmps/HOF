using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;



[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public UsersController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }



    [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _dbContext.users.ToListAsync();
        }

    

    [HttpGet("{id}")]
    public ActionResult<Users> GetUsersById(int id)
    {
        var userGet = _dbContext.users.Find(id);
        if (userGet == null)
        {
            return NotFound("id for user not found");
        }
        return userGet;
        
    }

    //case insensitive
    [HttpGet("users/search")]
    public async Task<IActionResult> SearchUsers(string query)
    {
        try
        {
        var lowercaseQuery = query.ToLower();

        var users = await _dbContext.users
            .Where(u => u.fullname.ToLower().Contains(lowercaseQuery)) 
            .ToListAsync();

        return Ok(users);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}




//Case sensitive
//     [HttpGet("users/search")]
//     public async Task<IActionResult> SearchUsers(string query)
//     {
//     try
//     {
//         var users = await _dbContext.users
//             .Where(u => u.fullname.Contains(query)) // Example search logic
//             .ToListAsync();

//         return Ok(users);
//     }
//     catch (Exception ex)
//     {
//         return StatusCode(500, $"Internal server error: {ex.Message}");
//     }
// }


    [HttpPost]
    public ActionResult<Users> CreateUser([FromBody] Users user)
    {
        _dbContext.users.Add(user);
        _dbContext.SaveChanges();
        return CreatedAtAction(nameof(GetUsersById), new { id = user.user_id }, user);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id, [FromBody] Users updatedUser)
    {
        var user = _dbContext.users.Find(id);
        if (user == null)
        {
            return NotFound("id for user not found");
        }

        user.fullname = updatedUser.fullname;
        user.email = updatedUser.email;
        user.password = updatedUser.password;
        user.phonenumber = updatedUser.phonenumber;
        _dbContext.SaveChanges();
        return Ok("User updated successfully");
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        var user = _dbContext.users.Find(id);
        if (user == null)
        {
            return NotFound("id for user not found");
        }

        _dbContext.users.Remove(user);
        _dbContext.SaveChanges();
        return Ok("User successfully deleted");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
        var user = await _dbContext.users.FirstOrDefaultAsync(u => u.email == request.Email && u.password == request.Password);
        if (user == null)
        {
            return Unauthorized();
        }
       
        // var key = Encoding.ASCII.GetBytes(secretKey);

        // // Generate JWT token
        // var tokenHandler = new JwtSecurityTokenHandler(); 
        // var tokenDescriptor = new SecurityTokenDescriptor
        // {
        //     Subject = new ClaimsIdentity(new Claim[]
        //     {
        //         new Claim(ClaimTypes.NameIdentifier, user.user_id),
        //         new Claim(ClaimTypes.Name, user.fullname ),
        //         new Claim(ClaimTypes.Email, user.email),
        //         new Claim(ClaimTypes.HomePhone, user.phonenumber)
        //     }),
        //     Expires = DateTime.UtcNow.AddDays(7), 
        //     SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        // };
        // var token = tokenHandler.CreateToken(tokenDescriptor);
        // var tokenString = tokenHandler.WriteToken(token);

        return Ok(new { user.user_id, user.fullname, user.email, user.phonenumber });
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }

    }

    //Simpelt login der virker.
    // [HttpPost("login")]
    // public async Task<IActionResult> Login([FromBody] LoginRequest request)
    // {
    //     try
    //     {
    //         var user = await _dbContext.users.FirstOrDefaultAsync(u => u.email == request.Email && u.password == request.Password);
    //         if (user == null)
    //         {
    //             return Unauthorized();
    //         }
    //         return Ok(new { user.user_id, user.fullname, user.email }); 
    //     }
    //     catch (Exception ex)
    //     {
    //         return StatusCode(500, $"Internal server error: {ex.Message}");
    //     }
    // }

}

