using Google.Cloud.Translate.V3;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]

public class TranslationController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly TranslationServiceClient _translateClient;

    public TranslationController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    _translateClient = TranslationServiceClient.Create();
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Translations>>> GetTranslatedCvs()
        {
            return await _dbContext.cv_translations.ToListAsync();
        }


    [HttpGet("{id}")]
    public ActionResult<Translations> GetTranslationsById(int id)
    {
        var translationsGet = _dbContext.cv_translations.Find(id);
        if (translationsGet == null)
        {
            return NotFound("id for user not found");
        }
        return translationsGet;
        
    }

[HttpGet("cv/{cvId}")]
    public async Task<IActionResult> GetTranslatedCvByCvId(int cvId)
        {
        try
        {
            var translatedcvs = await _dbContext.cv_translations.Where(translationsCv => translationsCv.cv_id == cvId).ToListAsync();
            return Ok(translatedcvs);
        }
        catch (Exception ex)
        {
        return StatusCode(500, $"Internal server error: {ex.Message}");
        }

    }


    [HttpPost]
    public async Task<IActionResult> TranslateCV(int cv_id, string targetLanguage)
    {
        var cv = await _dbContext.cv.FindAsync(cv_id);
        if (cv == null) return NotFound("CV not found");

        var translationSections = new string[]
        {
            cv.nationality,
            cv.birthyear,
            cv.mainareas,
            cv.technicalexperience,
            cv.personalcharacteristics,
            cv.industryexperience
        };

        var translatedSections = new string[translationSections.Length];

        // Her bliver hvert enkelt felt oversat
        for (int i = 0; i < translationSections.Length; i++)
        {
            var translationRequest = new TranslateTextRequest
            {

            Contents = { translationSections[i] },
            TargetLanguageCode = targetLanguage,
            ParentAsLocationName = new Google.Api.Gax.ResourceNames.LocationName("your-api-key", "global")
            };

            var translationResponse = await _translateClient.TranslateTextAsync(translationRequest);
            translatedSections[i] = translationResponse.Translations[0].TranslatedText;
        }

        // 3. Store the translated CV in the database
        var translatedCV = new Translations
        {
            cv_id = cv.cv_id,
            nationality = translatedSections[0],
            birthyear = translatedSections[1],
            mainareas = translatedSections[2],
            technicalexperience = translatedSections[3],
            personalcharacteristics = translatedSections[4],
            industryexperience = translatedSections[5]
        };

        _dbContext.cv_translations.Add(translatedCV);
        await _dbContext.SaveChangesAsync();

        return Ok(new { translatedCV.translation_id, translatedCV });
    }
}
