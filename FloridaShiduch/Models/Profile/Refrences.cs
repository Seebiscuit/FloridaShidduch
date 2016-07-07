using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FloridaShiduch.Models.Profile
{
    public class Reference
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public int Rank{ get; set; }
        public string Name { get; set; }
        public string CityAndState { get; set; }
        public string Phone { get; set; }
        public string Relationship { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}