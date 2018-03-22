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
    public class Background
    {
        [Key, ForeignKey("ApplicationUser")]
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("bornJewish")]
        public bool BornJewish { get; set; }

        [JsonProperty("conversionInfo")]
        public string ConversionInfo { get; set; }

        [JsonProperty("baalTeshuva")]
        public bool BaalTeshuva { get; set; }

        [JsonProperty("btTime")]
        public int BTTime { get; set; }

        [JsonProperty("isKohen")]
        public bool IsKohen { get; set; }

        [JsonProperty("marryCohen")]
        public bool MarryCohen { get; set; }

        [JsonProperty("ethnicity")]
        public string Ethnicity { get; set; }

        [JsonProperty("observance")]
        public string Observance { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}