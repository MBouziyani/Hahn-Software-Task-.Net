using System;
using System.ComponentModel.DataAnnotations;

namespace TicketAPI.Models
{
    
    public class Ticket
    {
        public int Id { get; set; }

        [Required]
        public required string Description { get; set; } = string.Empty; 

        [Required]
        public required TicketStatus Status { get; set; } 

        public DateTime DateCreated { get; set; }
    }
}
