using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FloridaShiduch.Models.Profile
{
    public class ReligionInfo
    {
        [Key, ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public string ReligiousOrientation { get; set; }
        public string ChassidusType { get; set; }
        public bool BaalTeshuva { get; set; }
        public int BTTime { get; set; }
        public bool MarryCohen { get; set; }
        public int Ethnicity { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}