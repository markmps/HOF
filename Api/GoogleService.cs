using Google.Cloud.Translation.V2;

public class TranslationService
{
    private readonly TranslationClient client;

    public TranslationService()
    {
        client = TranslationClient.Create();
    }

    public string TranslateText(string text, string targetLanguage)
    {
        var response = client.TranslateText(text, targetLanguage);
        return response.TranslatedText;
    }
}
