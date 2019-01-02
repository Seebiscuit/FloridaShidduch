using System.Web;
using System.Web.Optimization;

namespace FloridaShiduch
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/main").Include(
                        "~/Scripts/dist/main.min.js"));

            bundles.Add(new StyleBundle("~/bundle/css/main").Include(
                        "~/content/styles/styles.css"));
        }
    }
}
