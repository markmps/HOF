// using System;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using Microsoft.IdentityModel.Tokens;



// public class JwtService
// {
//     private readonly string _issuer;
//     private readonly string _audience;
//     private readonly string _secretKey;

//     public JwtService(string issuer, string audience, string secretKey)
//     {
//         _issuer = issuer;
//         _audience = audience;
//         _secretKey = secretKey;
//     }

//     public string GenerateToken(Users user)
//     {
//         var tokenHandler = new JwtSecurityTokenHandler();
//         var key = Encoding.ASCII.GetBytes(_secretKey);
//         var tokenDescriptor = new SecurityTokenDescriptor
//         {
//             Subject = new ClaimsIdentity(new Claim[]
//             {
//                 new Claim(ClaimTypes.Name, user.fullname ),
//                 new Claim(ClaimTypes.Email, user.email),
//                 new Claim(ClaimTypes.HomePhone, user.phonenumber)
//             }),

//             Expires = DateTime.UtcNow.AddDays(7), 
//             Issuer = _issuer,
//             Audience = _audience,
//             SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//         };
//         var token = tokenHandler.CreateToken(tokenDescriptor);
//         return tokenHandler.WriteToken(token);
//     }
// }
