using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FloridaShiduch.Models
{
    public class ImageString
    {
        [JsonProperty("image")]
        public string Image { get; set; }
    }
}