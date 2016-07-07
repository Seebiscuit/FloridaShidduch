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
    public class Spouse
    {
        [Key, ForeignKey("ApplicationUser")]
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("minAge")]
        public int MinAge { get; set; }

        [JsonProperty("maxAge")]
        public int MaxAge { get; set; }

        [JsonProperty("minFeet")]
        public int MinFeet { get; set; }

        [JsonProperty("minInches")]
        public int MinInches { get; set; }

        [JsonProperty("maxFeet")]
        public int MaxFeet { get; set; }

        [JsonProperty("maxInches")]
        public int MaxInches { get; set; }

        [JsonProperty("hebrewEducationLevel")]
        public string HebrewEducationLevel { get; set; }

        [JsonProperty("secularEducationLevel")]
        public string SecularEducationLevel { get; set; }

        [JsonProperty("allowChildren")]
        public bool AllowChildren { get; set; }

        [JsonProperty("tv")]
        public string TV { get; set; }

        [JsonProperty("relocate")]
        public bool Relocate { get; set; }

        [JsonProperty("aliyah")]
        public bool Aliyah { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}