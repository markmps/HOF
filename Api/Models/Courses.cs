using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Courses
{

    [Key]
    public int course_id {get; set;}

    [ForeignKey("cv")]

    public int cv_id {get; set;}

    [Required]
    public required int year { get; set; }

    [Required]

    public required string description {get; set;}


}