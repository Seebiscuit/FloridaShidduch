using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FloridaShiduch.Models.Profile
{
    public class MaritalStatus
    {
        [Key, ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public string Status { get; set; }
        public bool Kids { get; set; }
        public int KidsNumber { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}