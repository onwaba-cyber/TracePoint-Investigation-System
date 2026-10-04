namespace TracePointAPI.Models;

public class Case
{
    public int CaseID { get; set; }
    public string CaseName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "Open";
}
