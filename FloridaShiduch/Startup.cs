﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using FloridaShiduch.Models;

[assembly: OwinStartup(typeof(FloridaShiduch.Startup))]

namespace FloridaShiduch
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app); 
        }
    }
}
