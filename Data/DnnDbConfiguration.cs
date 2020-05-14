using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Web;
using FortyFingers.EmptyModuleVue.Components;

namespace FortyFingers.EmptyModuleVue.Data
{
    public class DnnDbConfiguration : DbConfiguration
    {
        public DnnDbConfiguration()
        {
            SetExecutionStrategy("System.Data.SqlClient", () => new SqlAzureExecutionStrategy());
            SetDefaultConnectionFactory(new SqlConnectionFactory(DataProviderHelper.ConnectionString));
            //SetDefaultConnectionFactory(new LocalDbConnectionFactory("v11.0"));
        }
    }
}