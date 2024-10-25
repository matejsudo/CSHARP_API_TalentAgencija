using Microsoft.AspNetCore.Mvc;
using TalentAgencijaAPP.Data;
using TalentAgencijaAPP.Models;

namespace TalentAgencijaAPP.Controllers
{
    [ApiController]
    [Route("api/v1/agenti")]
    public class AgentController : ControllerBase
    {
        private readonly TalentAgencijaContext _context;

        public AgentController(TalentAgencijaContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dohvaća sve agente.
        /// </summary>
        /// <returns>Lista agenata.</returns>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Agenti);
        }

        /// <summary>
        /// Dohvaća agenta prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra agenta.</param>
        /// <returns>Podaci o agentu.</returns>
        [HttpGet("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Agenti.Find(sifra));
        }

        /// <summary>
        /// Dodaje novog agenta.
        /// </summary>
        /// <param name="agent">Podaci o agentu.</param>
        /// <returns>Statistika o dodanom agentu.</returns>
        [HttpPost]
        public IActionResult Post(Agent agent)
        {
            _context.Agenti.Add(agent);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, agent);
        }

        /// <summary>
        /// Ažurira postojeće podatke o agentu.
        /// </summary>
        /// <param name="sifra">Šifra agenta za ažuriranje.</param>
        /// <param name="agent">Novi podaci o agentu.</param>
        /// <returns>Poruka o uspjehu.</returns>
        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, Agent agent)
        {
            var agentIzBaze = _context.Agenti.Find(sifra);

            agentIzBaze.Ime = agent.Ime;
            agentIzBaze.Prezime = agent.Prezime;
            agentIzBaze.AgentOd = agent.AgentOd;
            agentIzBaze.Verificiran = agent.Verificiran;

            _context.Agenti.Update(agentIzBaze);
            _context.SaveChanges();

            return Ok(new { poruka = "Uspješno promjenjeno" });
        }

        /// <summary>
        /// Briše agenta prema šifri.
        /// </summary>
        /// <param name="sifra">Šifra agenta za brisanje.</param>
        /// <returns>Poruka o uspjehu.</returns>
        [HttpDelete("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            var agentIzBaze = _context.Agenti.Find(sifra);
            _context.Agenti.Remove(agentIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano" });
        }
    }
}
