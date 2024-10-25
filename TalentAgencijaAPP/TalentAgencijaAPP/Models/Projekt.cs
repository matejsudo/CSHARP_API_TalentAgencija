using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json.Serialization;

namespace TalentAgencijaAPP.Models
{
    public class Projekt : Entitet
    {
        [Required]
        public string Naziv { get; set; }

        public decimal Vrijednost { get; set; }
        public DateTime? PocetakProjekta { get; set; }
        public DateTime? KrajProjekta { get; set; }
        public string Opis { get; set; }

        [Required]
        public int KlijentId { get; set; }

        [JsonIgnore]
        [BindNever]
        public Klijent? Klijent { get; set; }  // Prevent binding and serialization
    }
}
