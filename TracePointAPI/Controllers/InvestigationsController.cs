using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TracePointAPI.Data;
using TracePointAPI.Dtos;
using TracePointAPI.Models;

namespace TracePointAPI.Controllers;

[ApiController]
[Route("api/investigations")]
public class InvestigationsController : ControllerBase
{
    private readonly TracePointContext _context;

    public InvestigationsController(TracePointContext context)
    {
        _context = context;
    }

    // POST /api/investigations   -> saves with EF Core
    [HttpPost]
    public async Task<ActionResult<Investigation>> CreateInvestigation(CreateInvestigationDto dto)
    {
        // [ApiController] already returned 400 automatically if the DTO validation failed
        // (missing/blank conclusion, suspectID or caseID below 1).

        if (!await _context.Cases.AnyAsync(c => c.CaseID == dto.CaseID))
            return BadRequest(new { message = $"Case {dto.CaseID} does not exist." });

        if (!await _context.Suspects.AnyAsync(s => s.SuspectID == dto.SuspectID))
            return BadRequest(new { message = $"Suspect {dto.SuspectID} does not exist." });

        var investigation = new Investigation
        {
            CaseID = dto.CaseID,
            SuspectID = dto.SuspectID,
            Conclusion = dto.Conclusion.Trim(),
            DateStarted = DateTime.UtcNow   // set by the server, never trusted from the client
        };

        _context.Investigations.Add(investigation);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInvestigation),
                               new { id = investigation.InvestigationID },
                               investigation);
    }

    // GET /api/investigations/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Investigation>> GetInvestigation(int id)
    {
        var item = await _context.Investigations.AsNoTracking()
                                 .FirstOrDefaultAsync(i => i.InvestigationID == id);
        if (item is null)
            return NotFound(new { message = $"Investigation {id} was not found." });

        return Ok(item);
    }

    // GET /api/investigations/summary   -> DAPPER (assignment Part F)
    // Investigations joined with the suspect's name, using raw SQL.
    [HttpGet("summary")]
    public async Task<ActionResult<IEnumerable<InvestigationSummaryDto>>> GetSummary()
    {
        const string sql = @"
            SELECT i.InvestigationID,
                   s.Name AS SuspectName,
                   i.Conclusion,
                   i.DateStarted
            FROM Investigations i
            INNER JOIN Suspects s ON s.SuspectID = i.SuspectID
            ORDER BY i.DateStarted DESC;";

        // Dapper extends IDbConnection. Here it reuses EF Core's connection to the same database.
        var connection = _context.Database.GetDbConnection();
        var rows = await connection.QueryAsync<InvestigationSummaryDto>(sql);

        return Ok(rows);
    }
}
