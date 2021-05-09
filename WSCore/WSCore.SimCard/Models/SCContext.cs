using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WSCore.SimCard.Models
{
    public class SCContext : DbContext
    {
        public SCContext(DbContextOptions<SCContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder) { }
        DbSet<Sim> Sims { get; set; }
    }
}
