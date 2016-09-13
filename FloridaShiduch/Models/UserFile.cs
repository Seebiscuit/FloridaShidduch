using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace FloridaShiduch.Models
{
    public class UserFile
    {
        [Key]
        [JsonProperty("id")]
        public int id { get; set; }

        [ForeignKey("ApplicationUser")]
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("path")]
        public string Path { get; set; }

        [JsonProperty("size")]
        public long Size { get; set; }

        public UserFile(string id, string n, string p, long s)
        {
            UserId = id;
            Name = n;
            Path = p;
            Size = s;
        }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}