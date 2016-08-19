using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Configuration;

namespace FloridaShiduch.Controllers
{
    public class FileController : ApiController
    {
        // POST: api/SaveFile
        public HttpResponseMessage Post(Guid userid)
        {
            string filePath = "";
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                var appSettings = ConfigurationManager.AppSettings;
                string imageDir = appSettings["UploadedImageDir"];

                // Accessor method, expect only one file
                var postedFile = httpRequest.Files[httpRequest.Files.AllKeys.FirstOrDefault()];
                if (postedFile != null)
                {
                    filePath = HttpContext.Current.Server.MapPath(imageDir + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                    return Request.CreateResponse(HttpStatusCode.Created, imageDir.Substring(2).Replace('\\', '/') + postedFile.FileName);
                }
            }

            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        public HttpResponseMessage Post(string url)
        {
            Uri uri = new Uri(url);

            var appSettings = ConfigurationManager.AppSettings;
            string imageDir = appSettings["UploadedImageDir"];

            if (uri.IsFile)
            {
                string filename = System.IO.Path.GetFileName(uri.LocalPath);
                string path = imageDir + filename;
                using (WebClient wc = new WebClient())
                {
                    //wc.DownloadProgressChanged += wc_DownloadProgressChanged;
                    wc.DownloadFile(uri, path);
                }
                return Request.CreateResponse(HttpStatusCode.Created, new { path = path });
            }

            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }

        // PUT: api/SaveFile/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/SaveFile/5
        public void Delete(int id)
        {
        }
    }
}
