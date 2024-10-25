using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TalentAgencijaAPP.Models
{
    public class Agent : Entitet
    {
        public string? Ime { get; set; }
        public string? Prezime { get; set; }
        public DateTime? AgentOd { get; set; }
        public bool? Verificiran { get; set; }
        public List<Klijent> Klijenti { get; set; } = new List<Klijent>();
    }
}
