namespace TracePointAPI.Dtos;

// Shape of one row returned by the Dapper query.
public class InvestigationSummaryDto
{
    public int InvestigationID { get; set; }
    public string SuspectName { get; set; } = string.Empty;
    public string Conclusion { get; set; } = string.Empty;
    public DateTime DateStarted { get; set; }
}
