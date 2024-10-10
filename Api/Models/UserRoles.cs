using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class UserRoles
{

    [Key]
    [ForeignKey("users")]
    public int user_id {get; set;}

    [Key]
    [ForeignKey("roles")]

    public int role_id {get; set;}

}