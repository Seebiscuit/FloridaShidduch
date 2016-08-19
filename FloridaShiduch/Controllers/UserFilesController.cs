using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using FloridaShiduch.Models;
using System.Web;
using System.Configuration;
using FloridaShiduch.Helpers;
using System.IO;
using Microsoft.AspNet.Identity;

namespace FloridaShiduch.Controllers
{
    public class UserFilesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/UserFiles
        public IQueryable<UserFile> GetUserFiles()
        {
            return db.UserFiles;
        }

        // GET: api/UserFiles/5
        [ResponseType(typeof(UserFile))]
        public async Task<IHttpActionResult> GetUserFile(string id)
        {
            UserFile userFile = await db.UserFiles.FindAsync(id);
            if (userFile == null)
            {
                return NotFound();
            }

            return Ok(userFile);
        }

        // PUT: api/UserFiles/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUserFile(string id, UserFile userFile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userFile.UserId)
            {
                return BadRequest();
            }

            db.Entry(userFile).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserFileExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/UserFiles
        public async Task<IHttpActionResult> PostUserFile()
        {
            string imageDir = ConfigurationManager.AppSettings["UploadedImageDir"];
            var PATH = HttpContext.Current.Server.MapPath("~/" + imageDir);
            var rootUrl = Request.RequestUri.AbsoluteUri.Replace(Request.RequestUri.AbsolutePath, String.Empty);

            if (Request.Content.IsMimeMultipartContent())
            {
                var streamProvider = new CustomMultipartFormDataStreamProvider(PATH);
                await Request.Content.ReadAsMultipartAsync(streamProvider).ContinueWith(t =>
                {
                    if (t.IsFaulted || t.IsCanceled)
                    {
                        throw new HttpResponseException(HttpStatusCode.InternalServerError);
                    }

                    var files = streamProvider.FileData.Select(i =>
                                {
                                    var info = new FileInfo(i.LocalFileName);
                                    return new UserFile(User.Identity.GetUserId(), info.Name, rootUrl + "/" + imageDir + "/" + info.Name, info.Length / 1024);
                                });

                    db.UserFiles.AddRange(files);
                    db.SaveChangesAsync();
                });

                return Ok();
            }
            else
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted"));
            }
        }

        // DELETE: api/UserFiles/5
        [ResponseType(typeof(UserFile))]
        public async Task<IHttpActionResult> DeleteUserFile(string id)
        {
            UserFile userFile = await db.UserFiles.FindAsync(id);
            if (userFile == null)
            {
                return NotFound();
            }

            db.UserFiles.Remove(userFile);
            await db.SaveChangesAsync();

            return Ok(userFile);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserFileExists(string id)
        {
            return db.UserFiles.Count(e => e.UserId == id) > 0;
        }
    }
}