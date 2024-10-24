namespace TalentAgencijaAPP.Models
{
    public class Agent : Entitet
    {
        public string? Ime {  get; set; }
        public string? Prezime { get; set; }
        public DateTime? AgentOd {  get; set; }
        public bool? Verificiran {  get; set; }
    }
}
