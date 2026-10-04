using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TracePointAPI.Data;
using TracePointAPI.Models;

namespace TracePointAPI.Controllers;

[ApiController]
[Route("api/suspects")]
public class SuspectsController : ControllerBase
{
    private readonly TracePointContext _context;

    public SuspectsController(TracePointContext context)
    {
        _context = context;
    }

    // GET /api/suspects
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Suspect>>> GetSuspects()
    {
        var suspects = await _context.Suspects.AsNoTracking().ToListAsync();
        return Ok(suspects);
    }

    // GET /api/suspects/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Suspect>> GetSuspect(int id)
    {
        var item = await _context.Suspects.AsNoTracking().FirstOrDefaultAsync(s => s.SuspectID == id);
        if (item is null)
            return NotFound(new { message = $"Suspect {id} was not found." });

        return Ok(item);
    }
}
