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
    public class ModuleProgress
    {
        [Key, Column(Order=0), ForeignKey("ApplicationUser")]
        [JsonProperty("userId")]
        public string UserId { get; set; }
        [Key, Column(Order = 1)]
        [JsonProperty("module")]
        public string Module { get; set; }
        [JsonProperty("status")]
        public bool Status { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}