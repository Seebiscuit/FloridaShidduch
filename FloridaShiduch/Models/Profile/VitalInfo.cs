using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FloridaShiduch.Models.Profile
{
    public class VitalInfo
    {
        [Key, ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public double Height { get; set; }
        public string Build { get; set; }
        public string HairColor { get; set; }
        public string EyeColor { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}