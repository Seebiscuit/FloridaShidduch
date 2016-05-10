using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using FloridaShiduch.Models.Profile;

namespace FloridaShiduch.Models
{
    // Must be expressed in terms of our custom types:
    public partial class ApplicationDbContext
        : IdentityDbContext<ApplicationUser, ApplicationRole,
        string, ApplicationUserLogin, ApplicationUserRole, ApplicationUserClaim>
    {
        public ApplicationDbContext()
            : base("DefaultConnection")
        {
        }

        static ApplicationDbContext()
        {
            Database.SetInitializer<ApplicationDbContext>(new ApplicationDbInitializer());
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public DbSet<Lifestyle> Lifestyles { get; set; }
        public DbSet<CountryName> CountryNames { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Description> Descriptions { get; set; }
        public DbSet<Family> Familys { get; set; }
        public DbSet<MaritalStatus> MaritalStatuses { get; set; }
        public DbSet<Reference> References { get; set; }
        public DbSet<ReligionInfo> ReligionInfo { get; set; }
        public DbSet<RelocationInfo> RelocationInfo { get; set; }
        public DbSet<VitalInfo> VitalInfo { get; set; }
    }
}