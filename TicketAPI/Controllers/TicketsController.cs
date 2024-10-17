using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketAPI.Models;
using TicketAPI.Data;

namespace TicketAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly TicketDbContext _context;

        public TicketsController(TicketDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetAllTickets(int pageNumber = 1, int pageSize = 10)
        {
            var totalTickets = await _context.Tickets.CountAsync();
            var tickets = await _context.Tickets
                .OrderBy(t => t.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            Response.Headers["X-Total-Count"] = totalTickets.ToString();
            Response.Headers["X-Current-Page"] = pageNumber.ToString();
            Response.Headers["X-Page-Size"] = pageSize.ToString();


            return Ok(tickets);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null) return NotFound();
            return ticket;
        }

        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            ticket.DateCreated = DateTime.Now;
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, Ticket ticket)
        {
            if (id != ticket.Id) return BadRequest();

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null) return NotFound();

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TicketExists(int id)
        {
            return _context.Tickets.Any(e => e.Id == id);
        }
    }
}
