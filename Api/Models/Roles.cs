using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

public class Roles
{

    [Key]
    public int role_id {get; set;}

    [Required]
    public required string nameofrole {get; set;}

}