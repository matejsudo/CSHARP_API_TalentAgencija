﻿using Microsoft.EntityFrameworkCore;
using TalentAgencijaAPP.Models;

namespace TalentAgencijaAPP.Data
{
    public class TalentAgencijaContext : DbContext
    {
        public TalentAgencijaContext(DbContextOptions<TalentAgencijaContext> opcije) : base(opcije) { }

        public DbSet<Agent> Agenti { get; set; }  
        public DbSet<Klijent> Klijenti { get; set; }
        public DbSet<Projekt> Projekti { get; set; }

    }
}
