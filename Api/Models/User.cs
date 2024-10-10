using System.ComponentModel.DataAnnotations;


public class Users
{

    [Key]
    public int user_id { get; set; }

    [Required]
    public required string fullname { get; set; }

    [Required]

    public required string email {get; set;}

    [Required]
    public required string password {get; set;}
    
    [Required]
    public int phonenumber {get; set; }
}