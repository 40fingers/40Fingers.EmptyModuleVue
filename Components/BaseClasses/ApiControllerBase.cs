using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DotNetNuke.Web.Api;
using FortyFingers.EmptyModuleVue.Data;

namespace FortyFingers.EmptyModuleVue.Components.BaseClasses
{
    public class ApiControllerBase : DnnApiController
    {
        private const string DBCONTEXT_KEY = "EmptyModuleVueContext_Instance";

        public EmptyModuleVueContext DbCtx
        {
            get
            {
                return GetContext();
            }
        }

        /// <summary>
        /// Returns a DbContext object for use with this request. Instanciates a new DbContext when requested in the parameter. When using createNewInstance, you should always dispose your DbContext yourself.
        /// </summary>
        /// <param name="createNewInstance"></param>
        /// <returns></returns>
        protected EmptyModuleVueContext GetContext(bool createNewInstance = false)
        {
            // if a new instance is requested: return one
            if (createNewInstance) return new EmptyModuleVueContext();

            // get a reference to the HttpContext
            var ctx = Request.Properties["MS_HttpContext"] as HttpContextWrapper;

            EmptyModuleVueContext retval = null;
            // se if we have one in the HttpContext already
            if (ctx.Items[DBCONTEXT_KEY] == null)
            {
                retval = new EmptyModuleVueContext();
                // store in HttpContext
                ctx.Items[DBCONTEXT_KEY] = retval;
            }
            else
            {
                // get from HttpContext
                retval = (EmptyModuleVueContext)ctx.Items[DBCONTEXT_KEY];
            }

            return retval;
        }

        protected override void Dispose(bool disposing)
        {
            // get a reference to the HttpContext
            var ctx = Request.Properties["MS_HttpContext"] as HttpContextWrapper;

            // dispose of stored DbContext
            if (ctx.Items[DBCONTEXT_KEY] != null)
            {
                var dbctx = (EmptyModuleVueContext)ctx.Items[DBCONTEXT_KEY];
                dbctx.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}