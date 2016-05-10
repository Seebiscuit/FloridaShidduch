using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FloridaShiduch.Models.Profile
{
    public class Family
    {
        [Key, ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public string MotherName { get; set; }
        public bool MotherGer { get; set; }
        public string FatherName { get; set; }
        public bool FatherGer { get; set; }
        public string Shul { get; set; }
        public string MaritalStatus { get; set; }
        public int SibilingsNumber { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}