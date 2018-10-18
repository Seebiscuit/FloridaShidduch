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

        // GET: api/References/5
        [ResponseType(typeof(IEnumerable<object>))]
        public async Task<IHttpActionResult> GetReferences()
        {
            IEnumerable<object> reference = await db.References
                .GroupBy(r => r.UserId)
                .Select(r => new { userId = r.Key, references = r })
                .ToListAsync();

            if (reference == null)
            {
                return NotFound();
            }

            return Ok(reference);
        }

        // GET: api/References/5
        [ResponseType(typeof(IEnumerable<Reference>))]
        public async Task<IHttpActionResult> GetReferences(string id)
        {
            IEnumerable<Reference> reference = await db.References.Where(r => r.UserId == id).ToListAsync();
            if (reference == null)
            {
                return NotFound();
            }

            return Ok(reference);
        }

        // PUT: api/References/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutReferences(string id, Reference reference)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (reference.Id == default(int))
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
                if (!ReferenceExists(reference.Id))
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
        public async Task<IHttpActionResult> PostReferences(string id, Reference reference)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            reference.UserId = id;

            db.References.Add(reference);

            await db.SaveChangesAsync();

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ReferenceExists(reference.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { userid = User.Identity.GetUserId() }, reference);
        }

        // DELETE: api/References/5
        [ResponseType(typeof(Reference))]
        public async Task<IHttpActionResult> DeleteReferences(string id)
        {
            IEnumerable<Reference> references = await db.References.Where(r=>r.UserId==id).ToListAsync();
            if (references == null)
            {
                return NotFound();
            }

            foreach (var reference in references)
                db.References.Remove(reference); 
            
            await db.SaveChangesAsync();

            return Ok(references);
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