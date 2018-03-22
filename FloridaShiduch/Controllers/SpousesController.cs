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
    public class SpousesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Spouses
        public IQueryable<Spouse> GetSpouses()
        {
            return db.Spouses;
        }

        // GET: api/Spouses/5
        [ResponseType(typeof(Spouse))]
        public async Task<IHttpActionResult> GetSpouse(string id)
        {
            Spouse spouse = await db.Spouses.FindAsync(id);
            if (spouse == null)
            {
                return NotFound();
            }

            return Ok(spouse);
        }

        // PUT: api/Spouses/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutSpouse(string id, Spouse spouse)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != spouse.UserId)
            {
                return BadRequest();
            }

            db.Entry(spouse).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpouseExists(id))
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

        // POST: api/Spouses
        [ResponseType(typeof(Spouse))]
        public async Task<IHttpActionResult> PostSpouse(string id, Spouse spouse)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            spouse.UserId = id;

            db.Spouses.Add(spouse);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SpouseExists(User.Identity.GetUserId()))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = User.Identity.GetUserId() }, spouse);
        }

        // DELETE: api/Spouses/5
        [ResponseType(typeof(Spouse))]
        public async Task<IHttpActionResult> DeleteSpouse(string id)
        {
            Spouse spouse = await db.Spouses.FindAsync(id);
            if (spouse == null)
            {
                return NotFound();
            }

            db.Spouses.Remove(spouse);
            await db.SaveChangesAsync();

            return Ok(spouse);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SpouseExists(string id)
        {
            return db.Spouses.Count(e => e.UserId == id) > 0;
        }
    }
}