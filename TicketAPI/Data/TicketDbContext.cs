using Microsoft.EntityFrameworkCore;
using TicketAPI.Models; 

namespace TicketAPI.Data
{
    public class TicketDbContext : DbContext
    {
        public TicketDbContext(DbContextOptions<TicketDbContext> options) : base(options) { }

        public DbSet<Ticket> Tickets { get; set; } 
    }
}
