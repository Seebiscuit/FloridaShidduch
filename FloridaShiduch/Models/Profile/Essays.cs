using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace FloridaShiduch.Models.Profile
{
    public class Essay
    {
        [Key, ForeignKey("ApplicationUser")]
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [Column(TypeName = "text")]
        [JsonProperty("character")]
        public string Character { get; set; }

        [Column(TypeName = "text")]
        [JsonProperty("spouseCharacter")]
        public string SpouseCharacter { get; set; }

        [Column(TypeName = "text")]
        [JsonProperty("specialInterests")]
        public string SpecialInterests { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}