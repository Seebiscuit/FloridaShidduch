using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace FloridaShiduch.Models.Profile
{
    public class Progress
    {
        [Key, ForeignKey("ApplicationUser")]
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [ForeignKey("IncompleteModules")]
        [JsonProperty("incomplete")]
        public bool Incomplete { get; set; }

        public virtual ICollection<ModuleProgress> IncompleteModules { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}