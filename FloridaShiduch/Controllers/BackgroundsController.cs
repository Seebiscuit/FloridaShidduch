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
    public class BackgroundsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Backgrounds
        public IQueryable<Background> GetBackgrounds()
        {
            return db.Backgrounds;
        }

        // GET: api/Backgrounds/5
        [ResponseType(typeof(Background))]
        public async Task<IHttpActionResult> GetBackground(string id)
        {
            Background background = await db.Backgrounds.FindAsync(id);
            if (background == null)
            {
                return NotFound();
            }

            return Ok(background);
        }

        // PUT: api/Backgrounds/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBackground(string id, Background background)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != background.UserId)
            {
                return BadRequest();
            }

            db.Entry(background).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BackgroundExists(id))
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

        // POST: api/Backgrounds
        [ResponseType(typeof(Background))]
        public async Task<IHttpActionResult> PostBackground(Background background)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Backgrounds.Add(background);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BackgroundExists(background.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = background.UserId }, background);
        }

        // DELETE: api/Backgrounds/5
        [ResponseType(typeof(Background))]
        public async Task<IHttpActionResult> DeleteBackground(string id)
        {
            Background background = await db.Backgrounds.FindAsync(id);
            if (background == null)
            {
                return NotFound();
            }

            db.Backgrounds.Remove(background);
            await db.SaveChangesAsync();

            return Ok(background);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BackgroundExists(string id)
        {
            return db.Backgrounds.Count(e => e.UserId == id) > 0;
        }
    }
}