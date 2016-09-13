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
    public class DescriptionsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Descriptions
        public IQueryable<Description> GetDescriptions()
        {
            return db.Descriptions;
        }

        // GET: api/Descriptions/5
        [ResponseType(typeof(Description))]
        public async Task<IHttpActionResult> GetDescription(string id)
        {
            Description description = await db.Descriptions.FindAsync(id);
            if (description == null)
            {
                return NotFound();
            }

            return Ok(description);
        }

        // PUT: api/Descriptions/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDescription(string id, Description description)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != description.UserId)
            {
                return BadRequest();
            }

            db.Entry(description).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DescriptionExists(id))
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

        // POST: api/Descriptions
        [ResponseType(typeof(Description))]
        public async Task<IHttpActionResult> PostDescription(Description description)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Descriptions.Add(description);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DescriptionExists(User.Identity.GetUserId()))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = User.Identity.GetUserId() }, description);
        }

        // DELETE: api/Descriptions/5
        [ResponseType(typeof(Description))]
        public async Task<IHttpActionResult> DeleteDescription(string id)
        {
            Description description = await db.Descriptions.FindAsync(id);
            if (description == null)
            {
                return NotFound();
            }

            db.Descriptions.Remove(description);
            await db.SaveChangesAsync();

            return Ok(description);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DescriptionExists(string id)
        {
            return db.Descriptions.Count(e => e.UserId == id) > 0;
        }
    }
}