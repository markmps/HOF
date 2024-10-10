using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Translations
{

    [Key]
    public int translation_id {get; set;}

    [ForeignKey("cv")]

    public int cv_id {get; set;}

    [Required]
    public required string nationality { get; set; }

    [Required]

    public required string birthyear {get; set;}

    [Required]
    public required string mainareas {get; set;}

    [Required]
    public required string technicalexperience { get; set; }

    [Required]

    public required string personalcharacteristics {get; set;}

    [Required]
    public required string industryexperience {get; set;}


}