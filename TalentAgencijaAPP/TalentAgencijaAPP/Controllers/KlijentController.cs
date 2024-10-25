using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalentAgencijaAPP.Data;
using TalentAgencijaAPP.Models;

namespace TalentAgencijaAPP.Controllers
{
    /// <summary>
    /// Kontroler za upravljanje klijentima.
    /// </summary>
    [ApiController]
    [Route("api/v1/klijenti")]
    public class KlijentController : ControllerBase
    {
        private readonly TalentAgencijaContext _context;

        /// <summary>
        /// Konstruktor kontrolera koji inicijalizira kontekst.
        /// </summary>
        /// <param name="context">Kontekst baze podataka.</param>
        public KlijentController(TalentAgencijaContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dohvaća sve klijente.
        /// </summary>
        /// <returns>Lista klijenata.</returns>
        [HttpGet]
        public IActionResult Get()
        {
            var klijenti = _context.Klijenti.Include(k => k.Agent).ToList();
            return Ok(klijenti);
        }

        /// <summary>
        /// Dohvaća klijenta prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra klijenta.</param>
        /// <returns>Podaci o klijentu.</returns>
        [HttpGet("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            var klijent = _context.Klijenti.Include(k => k.Agent).FirstOrDefault(k => k.Sifra == sifra);
            if (klijent == null)
            {
                return NotFound(new { poruka = "Klijent nije pronađen." });
            }
            return Ok(klijent);
        }

        /// <summary>
        /// Dodaje novog klijenta.
        /// </summary>
        /// <param name="klijent">Podaci o klijentu.</param>
        /// <returns>Statistika o dodanom klijentu.</returns>
        [HttpPost]
        public IActionResult Post([FromBody] Klijent klijent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Klijenti.Add(klijent);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetBySifra), new { sifra = klijent.Sifra }, klijent);
        }


        /// <summary>
        /// Ažurira postojeće podatke o klijentu.
        /// </summary>
        /// <param name="sifra">Šifra klijenta za ažuriranje.</param>
        /// <param name="klijent">Novi podaci o klijentu.</param>
        /// <returns>Poruka o uspjehu.</returns>
        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, [FromBody] Klijent klijent)
        {
            if (sifra != klijent.Sifra)
            {
                return BadRequest(new { poruka = "Šifra klijenta ne odgovara." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var klijentIzBaze = _context.Klijenti.Find(sifra);
            if (klijentIzBaze == null)
            {
                return NotFound(new { poruka = "Klijent nije pronađen." });
            }

            // Update properties
            klijentIzBaze.Ime = klijent.Ime;
            klijentIzBaze.Prezime = klijent.Prezime;
            klijentIzBaze.DatumRodjenja = klijent.DatumRodjenja;
            klijentIzBaze.KorisnikOd = klijent.KorisnikOd;
            klijentIzBaze.Email = klijent.Email;
            klijentIzBaze.AgentSifra = klijent.AgentSifra;

            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promijenjeno" });
        }

        /// <summary>
        /// Briše klijenta prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra klijenta za brisanje.</param>
        /// <returns>Poruka o uspjehu.</returns>
        [HttpDelete("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            var klijentIzBaze = _context.Klijenti.Find(sifra);
            if (klijentIzBaze == null)
            {
                return NotFound(new { poruka = "Klijent nije pronađen." });
            }

            _context.Klijenti.Remove(klijentIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano" });
        }
    }
}
