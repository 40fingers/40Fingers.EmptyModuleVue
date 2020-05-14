﻿using FortyFingers.EmptyModuleVue.Components;
using FortyFingers.EmptyModuleVue.Data;
using Newtonsoft.Json;

namespace FortyFingers.EmptyModuleVue.Services.ViewModels
{
    [JsonObject(MemberSerialization.OptIn)]
    public class ItemViewModel
    {
        public ItemViewModel(Item t)
        {
            Id = t.Id;
            Name = t.ItemName;
            Description = t.ItemDescription;
            AssignedUser = t.AssignedUserId;
        }

        public ItemViewModel(Item t, string editUrl)
        {
            Id = t.Id;
            Name = t.ItemName;
            Description = t.ItemDescription;
            EditUrl = editUrl;
        }


        public ItemViewModel() { }

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("assignedUser")]
        public int? AssignedUser { get; set; }

        [JsonProperty("editUrl")]
        public string EditUrl { get; }
    }
}