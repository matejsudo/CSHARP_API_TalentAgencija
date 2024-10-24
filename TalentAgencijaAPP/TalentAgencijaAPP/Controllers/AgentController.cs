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

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Agenti);
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            return Ok(_context.Agenti.Find(sifra));
        }

        [HttpPost]
        public IActionResult Post(Agent agent)
        {
            _context.Agenti.Add(agent);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, agent);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Agent agent)
        {
            var agentIzBaze = _context.Agenti.Find(sifra);

            agentIzBaze.Ime = agent.Ime;
            agentIzBaze.Prezime = agent.Prezime;
            agentIzBaze.AgentOd = agent.AgentOd;
            agentIzBaze.Verificiran = agent.Verificiran;

            _context.Agenti.Update(agentIzBaze);
            _context.SaveChanges();

            return Ok(new {poruka = "Uspješno promjenjeno"});
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var agentIzBaze = _context.Agenti.Find(sifra);
            _context.Agenti.Remove(agentIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano" });
        }

    }
}
