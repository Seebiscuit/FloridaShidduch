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
using System.Data.Entity;

namespace FloridaShiduch.Controllers
{
    public class ProgressController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Progress/5
        [ResponseType(typeof(IncompleteModule))]
        public async Task<IHttpActionResult> GetIncompleteModule(string id)
        {
            IEnumerable<IncompleteModule> incompleteModule = await db.IncompleteModules.Where(i => i.UserId == id).ToListAsync();
            if (incompleteModule == null)
            {
                return NotFound();
            }

            return Ok(incompleteModule);
        }

        // POST: api/Progress
        [ResponseType(typeof(IncompleteModule))]
        public async Task<IHttpActionResult> PostIncompleteModule(IncompleteModule incompleteModule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.IncompleteModules.Add(incompleteModule);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (IncompleteModuleExists(incompleteModule.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = incompleteModule.UserId }, incompleteModule);
        }

        // DELETE: api/Progress/5
        [ResponseType(typeof(IncompleteModule))]
        public async Task<IHttpActionResult> DeleteIncompleteModule(string id, string module)
        {
            IncompleteModule incompleteModule = await db.IncompleteModules.SingleOrDefaultAsync(i => i.UserId == id && i.Module == module);
            if (incompleteModule == null)
            {
                return NotFound();
            }

            db.IncompleteModules.Remove(incompleteModule);
            await db.SaveChangesAsync();

            return Ok(incompleteModule);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool IncompleteModuleExists(string id)
        {
            return db.IncompleteModules.Count(e => e.UserId == id) > 0;
        }
    }
}