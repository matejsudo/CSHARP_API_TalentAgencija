using System.ComponentModel.DataAnnotations;

namespace TalentAgencijaAPP.Models
{
    public abstract class Entitet
    {
        [Key]
        public int Sifra {  get; set; }
    }
}
