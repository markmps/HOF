using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ProgrammingLanguage
{

    [Key]
    public int pl_id {get; set;}

    [Required]
    public required string nameofpl {get; set;}


}