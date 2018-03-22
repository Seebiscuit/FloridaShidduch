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
    public class Lifestyle
    {
        [Key, ForeignKey("ApplicationUser")]
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("learnFrequency")]
        public string LearnFrequency { get; set; }

        [JsonProperty("shulFrequency")]
        public string ShulFrequency { get; set; }

        [JsonProperty("kashrus")]
        public string Kashrus { get; set; }

        [JsonProperty("skirtLength")]
        public string SkirtLength { get; set; }

        [JsonProperty("sleeveLength")]
        public string SleeveLength { get; set; }

        [JsonProperty("hairCovering")]
        public string HairCovering { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}