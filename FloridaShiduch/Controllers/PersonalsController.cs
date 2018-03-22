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
    public class PersonalsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Personals
        public IQueryable<Personal> GetPersonals()
        {
            return db.Personals;
        }

        // GET: api/Personals/5
        [ResponseType(typeof(Personal))]
        public async Task<IHttpActionResult> GetPersonal(string id)
        {
            Personal personal = await db.Personals.FindAsync(id);
            if (personal == null)
            {
                return NotFound();
            }

            return Ok(personal);
        }

        // PUT: api/Personals/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPersonal(string id, Personal personal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != personal.UserId)
            {
                return BadRequest();
            }

            db.Entry(personal).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonalExists(id))
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

        // POST: api/Personals
        [ResponseType(typeof(Personal))]
        public async Task<IHttpActionResult> PostPersonal(string id, Personal personal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            personal.UserId = id;

            db.Personals.Add(personal);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PersonalExists(personal.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = User.Identity.GetUserId() }, personal);
        }

        // DELETE: api/Personals/5
        [ResponseType(typeof(Personal))]
        public async Task<IHttpActionResult> DeletePersonal(string id)
        {
            Personal personal = await db.Personals.FindAsync(id);
            if (personal == null)
            {
                return NotFound();
            }

            db.Personals.Remove(personal);
            await db.SaveChangesAsync();

            return Ok(personal);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PersonalExists(string id)
        {
            return db.Personals.Count(e => e.UserId == id) > 0;
        }
    }
}