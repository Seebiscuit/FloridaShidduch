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
    public class LifestylesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Lifestyles
        public IQueryable<Lifestyle> GetLifestyles()
        {
            return db.Lifestyles;
        }

        // GET: api/Lifestyles/5
        [ResponseType(typeof(Lifestyle))]
        public async Task<IHttpActionResult> GetLifestyle(string id)
        {
            Lifestyle lifestyle = await db.Lifestyles.FindAsync(id);
            if (lifestyle == null)
            {
                return NotFound();
            }

            return Ok(lifestyle);
        }

        // PUT: api/Lifestyles/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutLifestyle(string id, Lifestyle lifestyle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != lifestyle.UserId)
            {
                return BadRequest();
            }

            db.Entry(lifestyle).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LifestyleExists(id))
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

        // POST: api/Lifestyles
        [ResponseType(typeof(Lifestyle))]
        public async Task<IHttpActionResult> PostLifestyle(string id, Lifestyle lifestyle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            lifestyle.UserId = id;

            db.Lifestyles.Add(lifestyle);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (LifestyleExists(User.Identity.GetUserId()))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = User.Identity.GetUserId() }, lifestyle);
        }

        // DELETE: api/Lifestyles/5
        [ResponseType(typeof(Lifestyle))]
        public async Task<IHttpActionResult> DeleteLifestyle(string id)
        {
            Lifestyle lifestyle = await db.Lifestyles.FindAsync(id);
            if (lifestyle == null)
            {
                return NotFound();
            }

            db.Lifestyles.Remove(lifestyle);
            await db.SaveChangesAsync();

            return Ok(lifestyle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LifestyleExists(string id)
        {
            return db.Lifestyles.Count(e => e.UserId == id) > 0;
        }
    }
}