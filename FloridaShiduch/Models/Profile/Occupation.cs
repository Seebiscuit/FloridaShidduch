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
    public class Occupation
    {
        [Key, ForeignKey("ApplicationUser")]
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("hebrewEducationLevel")]
        public string HebrewEducationLevel { get; set; }

        [JsonProperty("yeshiva")]
        public string Yeshiva { get; set; }

        [JsonProperty("yeshivaLocation")]
        public string YeshivaLocation { get; set; }

        [JsonProperty("israelStudy")]
        public string IsraelStudy { get; set; }

        [JsonProperty("isrealDuration")]
        public string IsrealDuration { get; set; }

        [JsonProperty("secularEducationLevel")]
        public string SecularEducationLevel { get; set; }

        [JsonProperty("college")]
        public string College { get; set; }

        [JsonProperty("degree")]
        public string Degree { get; set; }

        [JsonProperty("companyName")]
        public string CompanyName { get; set; }

        [JsonProperty("jobTitle")]
        public string JobTitle { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}