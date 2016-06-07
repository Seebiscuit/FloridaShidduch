﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FloridaShiduch.Models.Profile
{
    public class Lifestyle
    {
        [Key, ForeignKey("ApplicationUser")]
        public string Id { get; set; }
        public string Profession { get; set; }
        public string JobDescription { get; set; }
        public string TV { get; set; }
        public string HomeMovies { get; set; }
        public string Movies { get; set; }
        public string HebrewEducationLevel { get; set; }
        public string SecularEducationLevel { get; set; }
        public string CollegeName { get; set; }
        public string DegreeName { get; set; }
        public string IsraelStudy { get; set; }
        public string IsraelStudyDuration { get; set; }
        public string YeshivaName { get; set; }

        public int? NativeLanguageId { get; set; }
        public int? SpokenLanguageId { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        [ForeignKey("NativeLanguageId")]
        public virtual Language NativeLanguage { get; set; }

        [ForeignKey("SpokenLanguageId")]
        public virtual Language SpokenLanguage { get; set; }
    }
}