using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json.Serialization;

namespace TalentAgencijaAPP.Models
{
    public class Klijent : Entitet
    {
        [Required]
        public string Ime { get; set; }

        [Required]
        public string Prezime { get; set; }

        public DateTime? DatumRodjenja { get; set; }
        public DateTime? KorisnikOd { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public int AgentSifra { get; set; }  // Foreign key for the agent

        // Navigation properties
        [JsonIgnore]
        [BindNever]
        public Agent? Agent { get; set; }  // Prevent binding and serialization

        [JsonIgnore]
        [BindNever]
        public List<Projekt>? Projekti { get; set; } = new List<Projekt>();  // Prevent binding and serialization
    }
}
