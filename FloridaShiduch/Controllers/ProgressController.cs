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
using FloridShiduch.Attributes;

namespace FloridaShiduch.Controllers
{
    [CamelCaseControllerConfigAttribute()]
    public class ProgressController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Progress/5
        [ResponseType(typeof(ModuleProgress))]
        public async Task<IHttpActionResult> GetModuleProgress(string id)
        {
            IEnumerable<ModuleProgress> moduleProgress = await db.ModulesProgress.Where(i => i.UserId == id).ToListAsync();
            if (moduleProgress == null)
            {
                return NotFound();
            }

            return Ok(moduleProgress);
        }

        // PUT: api/Progress/5
        [HttpPost]
        [HttpPut]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutModuleProgress(string id, ModuleProgress moduleProgress)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (db.ModulesProgress.AsNoTracking().SingleOrDefault(m => m.UserId == id && m.Module == moduleProgress.Module) != null)
                db.Entry(moduleProgress).State = EntityState.Modified;
            else
                db.ModulesProgress.Add(moduleProgress);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ModuleProgressExists(id, moduleProgress.Module))
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

        // DELETE: api/Progress/5?module=
        [ResponseType(typeof(ModuleProgress))]
        public async Task<IHttpActionResult> DeleteModuleProgress(string id, [FromUri] string module)
        {
            ModuleProgress moduleProgress = await db.ModulesProgress.SingleOrDefaultAsync(i => i.UserId == id && i.Module == module);
            if (moduleProgress == null)
            {
                return NotFound();
            }

            db.ModulesProgress.Remove(moduleProgress);
            await db.SaveChangesAsync();

            return Ok(moduleProgress);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ModuleProgressExists(string id, string module)
        {
            return db.ModulesProgress.Count(e => e.UserId == id && e.Module == module) > 0;
        }
    }
}