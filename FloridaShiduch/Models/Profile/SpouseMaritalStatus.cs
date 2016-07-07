using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FloridaShiduch.Models.Profile
{
    public class SpouseMaritalStatus
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public string Status { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}