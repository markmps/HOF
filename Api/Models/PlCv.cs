using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


public class PlCv
{

    [Key]
    [ForeignKey("programming_language")]
    public int pl_id {get; set;}

    [Key]
    [ForeignKey("cv")]

    public int cv_id {get; set;}

    [Required]
    public required string yearsofexperience { get; set; }

    [Required]

    public required string level {get; set;}

    [Required]
    public required string lastused {get; set;}


}