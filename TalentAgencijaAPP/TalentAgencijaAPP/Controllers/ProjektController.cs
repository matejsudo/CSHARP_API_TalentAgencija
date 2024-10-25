using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalentAgencijaAPP.Data;
using TalentAgencijaAPP.Models;

namespace TalentAgencijaAPP.Controllers
{
    /// <summary>
    /// Kontroler za upravljanje projektima.
    /// </summary>
    [ApiController]
    [Route("api/v1/projekti")]
    public class ProjektController : ControllerBase
    {
        private readonly TalentAgencijaContext _context;

        /// <summary>
        /// Konstruktor kontrolera koji inicijalizira kontekst.
        /// </summary>
        /// <param name="context">Kontekst baze podataka.</param>
        public ProjektController(TalentAgencijaContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dohvaća sve projekte.
        /// </summary>
        /// <returns>Lista projekata.</returns>
        [HttpGet]
        public IActionResult Get()
        {
            var projekti = _context.Projekti.Include(p => p.Klijent).ToList();
            return Ok(projekti);
        }

        /// <summary>
        /// Dohvaća projekt prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra projekta.</param>
        /// <returns>Projekt sa zadatom šifrom.</returns>
        [HttpGet("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            var projekt = _context.Projekti.Include(p => p.Klijent).FirstOrDefault(p => p.Sifra == sifra);
            if (projekt == null)
            {
                return NotFound(new { poruka = "Projekt nije pronađen." });
            }
            return Ok(projekt);
        }

        /// <summary>
        /// Dodaje novi projekt.
        /// </summary>
        /// <param name="projekt">Projekt koji treba dodati.</param>
        /// <returns>Stvaranje status koda i novi projekt.</returns>
        [HttpPost]
        public IActionResult Post([FromBody] Projekt projekt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Projekti.Add(projekt);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetBySifra), new { sifra = projekt.Sifra }, projekt);
        }

        /// <summary>
        /// Ažurira postojeći projekt prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra projekta.</param>
        /// <param name="projekt">Ažurirani projekt.</param>
        /// <returns>Status kod 200 ili 400 ako nije uspješno.</returns>
        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, [FromBody] Projekt projekt)
        {
            if (sifra != projekt.Sifra)
            {
                return BadRequest(new { poruka = "Šifra projekta ne odgovara." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var projektIzBaze = _context.Projekti.Find(sifra);
            if (projektIzBaze == null)
            {
                return NotFound(new { poruka = "Projekt nije pronađen." });
            }

            // Update properties
            projektIzBaze.Naziv = projekt.Naziv;
            projektIzBaze.Vrijednost = projekt.Vrijednost;
            projektIzBaze.PocetakProjekta = projekt.PocetakProjekta;
            projektIzBaze.KrajProjekta = projekt.KrajProjekta;
            projektIzBaze.Opis = projekt.Opis;
            projektIzBaze.KlijentId = projekt.KlijentId;

            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promijenjeno" });
        }

        /// <summary>
        /// Briše projekt prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra projekta.</param>
        /// <returns>Status kod 200 ili 404 ako projekt ne postoji.</returns>
        [HttpDelete("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            var projekt = _context.Projekti.Find(sifra);
            if (projekt == null)
            {
                return NotFound(new { poruka = "Projekt nije pronađen." });
            }

            _context.Projekti.Remove(projekt);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno obrisano" });
        }
    }
}
