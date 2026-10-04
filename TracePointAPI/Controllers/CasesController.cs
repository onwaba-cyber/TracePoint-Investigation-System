using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TracePointAPI.Data;
using TracePointAPI.Models;

namespace TracePointAPI.Controllers;

[ApiController]
[Route("api/cases")]
public class CasesController : ControllerBase
{
    private readonly TracePointContext _context;

    public CasesController(TracePointContext context)
    {
        _context = context;
    }

    // GET /api/cases
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Case>>> GetCases()
    {
        var cases = await _context.Cases.AsNoTracking().ToListAsync();
        return Ok(cases);
    }

    // GET /api/cases/1   ({id:int} = routing constraint: only whole numbers match)
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Case>> GetCase(int id)
    {
        var item = await _context.Cases.AsNoTracking().FirstOrDefaultAsync(c => c.CaseID == id);
        if (item is null)
            return NotFound(new { message = $"Case {id} was not found." });

        return Ok(item);
    }
}
