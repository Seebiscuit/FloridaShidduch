using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FloridaShiduch.Models.Profile
{
    public class Spouse
    {
        [Key, ForeignKey("ApplicationUser")]
        public string Id { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public int MinFeet { get; set; }
        public int MinInches { get; set; }
        public int MaxFeet { get; set; }
        public int MaxInches { get; set; }
        public bool AllowChildren { get; set; }
        public string TV { get; set; }
        public bool Relocate { get; set; }
        public bool Aliyah { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}