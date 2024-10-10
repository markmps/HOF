using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ProjectDetails
{

    [Key]
    public int pd_id {get; set;}

    [ForeignKey("cv")]

    public int cv_id {get; set;}

    [Required]
    public required string whichfirm { get; set; }

    [Required]

    public required string position {get; set;}

    [Required]
    public required string period { get; set; }

    [Required]

    public required string project {get; set;}

    [Required]
    public required string tools { get; set; }

    [Required]

    public required string description {get; set;}


}