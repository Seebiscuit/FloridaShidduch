using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using FloridaShiduch.Models;
using System.Data.Entity;
using System.Web;

namespace FloridaShiduch
{
    public class ApplicationUserManager : UserManager<ApplicationUser, string>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser, string> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(
            IdentityFactoryOptions<ApplicationUserManager> options,
            IOwinContext context)
        {
            var manager = new ApplicationUserManager(
                new UserStore<ApplicationUser, ApplicationRole, string,
                    ApplicationUserLogin, ApplicationUserRole,
                    ApplicationUserClaim>(context.Get<ApplicationDbContext>()));

            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireDigit = true,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider =
                    new DataProtectorTokenProvider<ApplicationUser>(
                        dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }


    public class ApplicationRoleManager : RoleManager<ApplicationRole>
    {
        public ApplicationRoleManager(IRoleStore<ApplicationRole, string> roleStore)
            : base(roleStore)
        {
        }

        public static ApplicationRoleManager Create(
            IdentityFactoryOptions<ApplicationRoleManager> options,
            IOwinContext context)
        {
            return new ApplicationRoleManager(
                new ApplicationRoleStore(context.Get<ApplicationDbContext>()));
        }
    }


    public class ApplicationDbInitializer
        : DropCreateDatabaseAlways<ApplicationDbContext>
    {
        public override void InitializeDatabase(ApplicationDbContext context)
        {
            if (context.Database.Exists())
                context.Database.ExecuteSqlCommand(TransactionalBehavior.DoNotEnsureTransaction,
                    string.Format(
                        @"USE [master];
                        DECLARE @kill varchar(1000) = '';  
                        SELECT @kill = @kill + 'kill ' + CONVERT(varchar(5), session_id) + ';'  
                        FROM sys.dm_exec_sessions
                        WHERE database_id  = db_id('{0}')
                        EXEC(@kill);", context.Database.Connection.Database));

            base.InitializeDatabase(context);
        }

        protected override void Seed(ApplicationDbContext context)
        {
            InitializeIdentityForEF(context);
            base.Seed(context);
        }

        //Create User=Admin@Admin.com with password=Admin@123456 in the Admin role        
        public static void InitializeIdentityForEF(ApplicationDbContext db)
        {
            var userManager = HttpContext.Current
                .GetOwinContext().GetUserManager<ApplicationUserManager>();

            var roleManager = HttpContext.Current
                .GetOwinContext().Get<ApplicationRoleManager>();

            // Initial Admin user:
            const string name = "admin@example.com";
            const string password = "Admin@123456";

            const string roleName = "Admin";
            const string roleDescription = "All access pass";

            //Create Role Admin if it does not exist
            var role = roleManager.FindByName(roleName);
            if (role == null)
            {
                role = new ApplicationRole(roleName);

                // Set the new custom property:
                role.Description = roleDescription;
                var roleresult = roleManager.Create(role);
            }

            // Create Admin User:
            var user = userManager.FindByName(name);
            if (user == null)
            {
                user = new ApplicationUser { UserName = name, Email = name };

                var result = userManager.Create(user, password);
                //result = userManager.SetLockoutEnabled(user.Id, false);
            }

            // Add user admin to Role Admin if not already added
            var rolesForUser = userManager.GetRoles(user.Id);
            if (!rolesForUser.Contains(role.Name))
            {
                userManager.AddToRole(user.Id, role.Name);
            }

            InitializeAppUsers(userManager, roleManager);
        }

        public static void InitializeAppUsers(ApplicationUserManager userManager, ApplicationRoleManager roleManager)
        {
            const string password = "Test1234";

            for (int i = 0; i <= 10; i++)
            {
                // Initial  User:
                string username = string.Format("tester{0}@test.com", i);

                // Add a plain vanilla Users Role:
                const string usersRoleName = "Users";
                const string usersRoleDescription = "Plain vanilla User";

                //Create Role Users if it does not exist
                var usersRole = roleManager.FindByName(usersRoleName);
                if (usersRole == null)
                {
                    usersRole = new ApplicationRole(usersRoleName);

                    // Set the new custom property:
                    usersRole.Description = usersRoleDescription;
                    var userRoleresult = roleManager.Create(usersRole);
                }

                // Create  User:
                var user = userManager.FindByName(username);
                if (user == null)
                {
                    user = new ApplicationUser
                    {
                        UserName = username,
                        Email = username
                    };

                    var result = userManager.Create(user, password);
                    result = userManager.SetLockoutEnabled(user.Id, false);
                }

                // Add vanilla user to Role Users if not already added
                var rolesForUser = userManager.GetRoles(user.Id);
                if (!rolesForUser.Contains(usersRole.Name))
                {
                    userManager.AddToRole(user.Id, usersRole.Name);
                }

                if (i > 0)
                {
                    // Populate data for the new user
                    var userDataSeed = new AutoCompleteUserData(user.Id, i);

                    userDataSeed.Save();
                }
            }
        }
    }
}
