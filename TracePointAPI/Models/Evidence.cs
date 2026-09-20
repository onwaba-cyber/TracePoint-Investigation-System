namespace TracePointAPI.Models;

public class Evidence
{
    public int EvidenceID { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
}
