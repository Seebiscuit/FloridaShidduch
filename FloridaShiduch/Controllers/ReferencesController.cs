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
using FloridaShiduch.Models.Profile;
using Microsoft.AspNet.Identity;

namespace FloridaShiduch.Controllers
{
    public class ReferencesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/References
        public IQueryable<Reference> GetReferences()
        {
            return db.References;
        }

        // GET: api/References/5
        [ResponseType(typeof(Reference))]
        public async Task<IHttpActionResult> GetReference(int id)
        {
            Reference reference = await db.References.FindAsync(id);
            if (reference == null)
            {
                return NotFound();
            }

            return Ok(reference);
        }

        // PUT: api/References/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutReference(int id, Reference reference)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reference.Id)
            {
                return BadRequest();
            }

            db.Entry(reference).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReferenceExists(id))
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

        // POST: api/References
        [ResponseType(typeof(Reference))]
        public async Task<IHttpActionResult> PostReference(string id, Reference reference)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            reference.UserId = id;

            db.References.Add(reference);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = User.Identity.GetUserId() }, reference);
        }

        // DELETE: api/References/5
        [ResponseType(typeof(Reference))]
        public async Task<IHttpActionResult> DeleteReference(int id)
        {
            Reference reference = await db.References.FindAsync(id);
            if (reference == null)
            {
                return NotFound();
            }

            db.References.Remove(reference);
            await db.SaveChangesAsync();

            return Ok(reference);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReferenceExists(int id)
        {
            return db.References.Count(e => e.Id == id) > 0;
        }
    }
}