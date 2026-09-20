using Microsoft.EntityFrameworkCore;
using TracePointAPI.Models;

namespace TracePointAPI.Data;

public class TracePointContext : DbContext
{
    public TracePointContext(DbContextOptions<TracePointContext> options) : base(options) { }

    public DbSet<Case> Cases => Set<Case>();
    public DbSet<Suspect> Suspects => Set<Suspect>();
    public DbSet<Evidence> Evidence => Set<Evidence>();
    public DbSet<Investigation> Investigations => Set<Investigation>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Case>().HasData(new Case
        {
            CaseID = 1,
            CaseName = "The Missing Prototype",
            Description = "A technology company has reported that an experimental prototype disappeared from its research laboratory between 22:00 and 00:00. Only three employees had legitimate access to the area.",
            Status = "Open"
        });

        modelBuilder.Entity<Suspect>().HasData(
            new Suspect { SuspectID = 1, Name = "Alex Morgan", Occupation = "Software Developer",
                Description = "Developed the software used by the prototype and had access to the laboratory." },
            new Suspect { SuspectID = 2, Name = "Jamie Smith", Occupation = "Security Officer",
                Description = "Responsible for security at the building on the night of the incident." },
            new Suspect { SuspectID = 3, Name = "Taylor Williams", Occupation = "Research Assistant",
                Description = "Worked with the research team and had access to the laboratory during working hours." });

        modelBuilder.Entity<Evidence>().HasData(
            new Evidence { EvidenceID = 1, Title = "Security Access Log", Location = "Security Office",
                Description = "Jamie Smith's access card was used to enter the research laboratory at 23:41." },
            new Evidence { EvidenceID = 2, Title = "CCTV Report", Location = "Research Laboratory",
                Description = "CCTV footage shows a person entering the laboratory at approximately 23:43. The person's face cannot be clearly identified." },
            new Evidence { EvidenceID = 3, Title = "Fingerprint Report", Location = "Research Laboratory",
                Description = "A partial fingerprint was found on the prototype storage cabinet. The fingerprint belongs to a person who regularly works in the laboratory." },
            new Evidence { EvidenceID = 4, Title = "Email Message", Location = "Archive Room",
                Description = "An email sent shortly before the incident states: \"The prototype must be moved before tomorrow's demonstration.\"" },
            new Evidence { EvidenceID = 5, Title = "Photograph", Location = "Research Laboratory",
                Description = "A photograph taken after the incident shows that the prototype cabinet was open and the laboratory lights were switched off." });
    }
}
