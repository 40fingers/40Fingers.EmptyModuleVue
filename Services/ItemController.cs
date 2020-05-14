using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using DotNetNuke.Common;
using DotNetNuke.Web.Api;
using DotNetNuke.Security;
using System.Threading;
using DotNetNuke.UI.Modules;
using DotNetNuke.Common.Utilities;
using System.Collections.Generic;
using FortyFingers.EmptyModuleVue.Components.BaseClasses;
using FortyFingers.EmptyModuleVue.Data;
using FortyFingers.EmptyModuleVue.Services.ViewModels;
using Newtonsoft.Json.Linq;

namespace FortyFingers.EmptyModuleVue.Services
{
    [SupportedModules("40F EmptyModuleVue")]
    [DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.View)]
    public class ItemController : ApiControllerBase
    {
        public ItemController() { }

        public HttpResponseMessage Delete(int itemId)
        {
            var item = DbCtx.Items.FirstOrDefault(i => i.Id == itemId);
            if (item != null)
            {
                DbCtx.Items.Remove(item);
                DbCtx.SaveChanges();
            }

            return Request.CreateResponse(System.Net.HttpStatusCode.NoContent);
        }

        public HttpResponseMessage Get(int itemId)
        {
            var itemVm = new ItemViewModel(DbCtx.Items.FirstOrDefault(i => i.Id == itemId));

            return Request.CreateResponse(itemVm);
        }

        public HttpResponseMessage GetList()
        {
            List<ItemViewModel> retval = new List<ItemViewModel>();
            List <Item>  items;

            if (Globals.IsEditMode())
            {
                items = DbCtx.Items.Where(i => i.ModuleId == ActiveModule.ModuleID)
                       .ToList();

                items.ForEach(i => retval.Add(new ItemViewModel(i, GetEditUrl(i.Id))));
            }
            else
            {
                items = DbCtx.Items.Where(i => i.ModuleId == ActiveModule.ModuleID)
                       .ToList();

                items.ForEach(i => retval.Add(new ItemViewModel(i, "")));
            }

            return Request.CreateResponse(retval);
        }

        protected string GetEditUrl(int id)
        {
            string editUrl = Globals.NavigateURL("Edit", string.Format("mid={0}", ActiveModule.ModuleID), string.Format("tid={0}", id));

            if (PortalSettings.EnablePopUps)
            {
                editUrl = UrlUtils.PopUpUrl(editUrl, PortalSettings, false, false, 550, 950);
            }
            return editUrl;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public HttpResponseMessage Upsert(ItemViewModel item)
        {
            if (item.Id > 0)
            {
                var t = Update(item);
                return Request.CreateResponse(System.Net.HttpStatusCode.NoContent);
            }
            else
            {
                var t = Create(item);
                return Request.CreateResponse(t.Id);
            }

        }

        private Item Create(ItemViewModel item)
        {
            Item t = new Item
            {
                ItemName = item.Name,
                ItemDescription = item.Description,
                AssignedUserId = item.AssignedUser,
                ModuleId = ActiveModule.ModuleID,
                CreatedByUserId = UserInfo.UserID,
                LastModifiedByUserId = UserInfo.UserID,
                CreatedOnDate = DateTime.UtcNow,
                LastModifiedOnDate = DateTime.UtcNow
            };
            DbCtx.Items.Add(t);
            DbCtx.SaveChanges();

            return t;
        }

        private Item Update(ItemViewModel item)
        {

            var t = DbCtx.Items.FirstOrDefault(i => i.Id == item.Id);
            if (t != null)
            {
                t.ItemName = item.Name;
                t.ItemDescription = item.Description;
                t.AssignedUserId = item.AssignedUser;
                t.LastModifiedByUserId = UserInfo.UserID;
                t.LastModifiedOnDate = DateTime.UtcNow;
            }
            DbCtx.SaveChanges();

            return t;
        }
    }
}