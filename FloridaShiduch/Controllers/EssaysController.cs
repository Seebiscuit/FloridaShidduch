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
    public class EssaysController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Essays
        public IQueryable<Essay> GetEssays()
        {
            return db.Essays;
        }

        // GET: api/Essays/5
        [ResponseType(typeof(Essay))]
        public async Task<IHttpActionResult> GetEssay(string id)
        {
            Essay essay = await db.Essays.FindAsync(id);
            if (essay == null)
            {
                return NotFound();
            }

            return Ok(essay);
        }

        // PUT: api/Essays/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutEssay(string id, Essay essay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != essay.UserId)
            {
                return BadRequest();
            }

            db.Entry(essay).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EssayExists(id))
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

        // POST: api/Essays
        [ResponseType(typeof(Essay))]
        public async Task<IHttpActionResult> PostEssay(Essay essay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Essays.Add(essay);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EssayExists(User.Identity.GetUserId()))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = User.Identity.GetUserId() }, essay);
        }

        // DELETE: api/Essays/5
        [ResponseType(typeof(Essay))]
        public async Task<IHttpActionResult> DeleteEssay(string id)
        {
            Essay essay = await db.Essays.FindAsync(id);
            if (essay == null)
            {
                return NotFound();
            }

            db.Essays.Remove(essay);
            await db.SaveChangesAsync();

            return Ok(essay);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EssayExists(string id)
        {
            return db.Essays.Count(e => e.UserId == id) > 0;
        }
    }
}