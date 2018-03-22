using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FloridaShiduch.Models.Profile
{
    public class Personal
    {
        [Key, ForeignKey("ApplicationUser")]
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("birthday")]
        public DateTime Birthday { get; set; }

        [JsonProperty("feet")]
        public int Feet { get; set; }

        [JsonProperty("inches")]
        public int Inches { get; set; }

        [JsonProperty("build")]
        public string Build { get; set; }

        [JsonProperty("maritalStatus")]
        public string MaritalStatus { get; set; }

        [JsonProperty("children")]
        public bool Children { get; set; }

        [JsonProperty("childrenNumber")]
        public int ChildrenNumber { get; set; }

        [JsonProperty("pets")]
        public bool Pets { get; set; }

        [JsonProperty("smoke")]
        public bool Smoke { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}