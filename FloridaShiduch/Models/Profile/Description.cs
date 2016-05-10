using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FloridaShiduch.Models.Profile
{
    public class Description
    {
        [Key, ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public string PersonalDescription { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}