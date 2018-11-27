using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Microsoft.AspNet.Identity;

namespace FloridaShiduch.Models.Profile
{
    public class OccupationType
    {
        public OccupationType()
        {
            UserId = HttpContext.Current.User.Identity.GetUserId();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("userId")]
        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}