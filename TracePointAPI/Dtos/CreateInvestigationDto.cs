using System.ComponentModel.DataAnnotations;

namespace TracePointAPI.Dtos;

// What React sends in the POST body. InvestigationID and DateStarted are NOT here on purpose.
public class CreateInvestigationDto
{
    [Range(1, int.MaxValue, ErrorMessage = "Please select a case.")]
    public int CaseID { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Please select a suspect.")]
    public int SuspectID { get; set; }

    [Required(ErrorMessage = "Please enter a conclusion.")]
    [StringLength(2000, ErrorMessage = "The conclusion must be 2000 characters or fewer.")]
    public string Conclusion { get; set; } = string.Empty;
}
