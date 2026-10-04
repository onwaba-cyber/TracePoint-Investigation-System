using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TracePointAPI.Data;
using TracePointAPI.Models;

namespace TracePointAPI.Controllers;

[ApiController]
[Route("api/evidence")]
public class EvidenceController : ControllerBase
{
    private readonly TracePointContext _context;

    public EvidenceController(TracePointContext context)
    {
        _context = context;
    }

    // GET /api/evidence
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Evidence>>> GetEvidence()
    {
        var evidence = await _context.Evidence.AsNoTracking().ToListAsync();
        return Ok(evidence);
    }

    // GET /api/evidence/3
    // ROUTING CONSTRAINT: int AND at least 1.
    //   /api/evidence/abc -> 404 (route never matches, action not called)
    //   /api/evidence/0   -> 404 (fails min(1))
    //   /api/evidence/99  -> 404 from the action (valid route, no such row)
    [HttpGet("{id:int:min(1)}")]
    public async Task<ActionResult<Evidence>> GetEvidenceById(int id)
    {
        var item = await _context.Evidence.AsNoTracking().FirstOrDefaultAsync(e => e.EvidenceID == id);
        if (item is null)
            return NotFound(new { message = $"Evidence {id} was not found." });

        return Ok(item);
    }
}
