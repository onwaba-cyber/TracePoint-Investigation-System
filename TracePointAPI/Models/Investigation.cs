namespace TracePointAPI.Models;

public class Investigation
{
    public int InvestigationID { get; set; }
    public int CaseID { get; set; }
    public int SuspectID { get; set; }
    public string Conclusion { get; set; } = string.Empty;
    public DateTime DateStarted { get; set; }

    public Case? Case { get; set; }
    public Suspect? Suspect { get; set; }
}
