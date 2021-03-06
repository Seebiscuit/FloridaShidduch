﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace FloridaShiduch.Models.Profile
{
    public class MaritalStatus
    {
        [Key]
        [JsonProperty("id")]
        public int Id { get; set; }

        [ForeignKey("ApplicationUser")]
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}