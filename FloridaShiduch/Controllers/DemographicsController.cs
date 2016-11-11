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

namespace FloridaShiduch.Controllers
{
    public class DemographicsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Demographics
        public IQueryable<Demographic> GetDemographics()
        {
            return db.Demographics;
        }

        // GET: api/Demographics/5
        [ResponseType(typeof(Demographic))]
        public async Task<IHttpActionResult> GetDemographic(string id)
        {
            Demographic demographic = await db.Demographics.FindAsync(id);
            if (demographic == null)
            {
                return NotFound();
            }

            return Ok(demographic);
        }

        // PUT: api/Demographics/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutApplicationUser(string id, Demographic demographic)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != demographic.UserId)
            {
                return BadRequest();
            }

            db.Entry(demographic).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicationUserExists(id))
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

        // POST: api/Demographics
        [ResponseType(typeof(Demographic))]
        public async Task<IHttpActionResult> PostApplicationUser(Demographic demographic)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Demographics.Add(demographic);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ApplicationUserExists(demographic.ApplicationUser.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = demographic.ApplicationUser.Id }, demographic);
        }

        // DELETE: api/Demographics/5
        [ResponseType(typeof(Demographic))]
        public async Task<IHttpActionResult> DeleteApplicationUser(string id)
        {
            Demographic demographic = db.Demographics.Find(id);
            if (demographic == null)
            {
                return NotFound();
            }

            db.Demographics.Remove(demographic);
            await db.SaveChangesAsync();

            return Ok(demographic);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ApplicationUserExists(string id)
        {
            return db.Demographics.Count(e => e.UserId == id) > 0;
        }
    }
}