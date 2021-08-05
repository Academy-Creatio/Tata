using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Threading;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Process;
using Terrasoft.Web.Common;

namespace Tata.WebServices
{
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class DemoWebService : BaseService
	{
		#region Properties
		private SystemUserConnection _systemUserConnection;
		private SystemUserConnection SystemUserConnection
		{
			get
			{
				return _systemUserConnection ?? (_systemUserConnection = (SystemUserConnection)AppConnection.SystemUserConnection);
			}
		}
		#endregion

		#region Methods : REST
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json)]
		public string PostExample(MyInputDataModel input)
		{
			UserConnection userConnection = UserConnection ?? SystemUserConnection;
			const string tableName = "Contact";
			EntitySchema contactSchema = UserConnection.EntitySchemaManager.GetInstanceByName(tableName);
			Entity contact = contactSchema.CreateEntity(UserConnection);
			contact.SetDefColumnValues();

			Guid _id = Guid.NewGuid();
			contact.SetColumnValue("Id", _id);
			contact.SetColumnValue("Name", input.Name);
			contact.SetColumnValue("Email", input.Email);
			contact.SetColumnValue("Age", input.Age);

			contact.Save();

			IProcessEngine processEngine = userConnection.ProcessEngine;
			var inputParams = new Dictionary<string, string>
			{
				{"RecordId",_id.ToString()}
			};
			//Mae sure process has Run following elements in the background unchecked to get the results
			//otherwise the process runs in a separate thread and never returnss
			ProcessDescriptor processDescriptor = processEngine.ProcessExecutor.Execute(
				 "Process_9264360", inputParams, new string[] {"result"});
			IReadOnlyDictionary<string, object> results = processDescriptor.ResultParameterValues; //iterate over collection to find the result
			

			contact.FetchFromDB(_id);
			var typeid = contact.GetTypedColumnValue<Guid>("TypeId");

			return typeid.ToString();
		}

		[OperationContract]
		[WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, 
			BodyStyle = WebMessageBodyStyle.Bare, ResponseFormat = WebMessageFormat.Json,
			UriTemplate ="GetContactById/{id}"
			)]
		public MyDataModel GetExample(string id)
		{
			//http://k_krylov:7010/0/rest/DemoWebService/GetExample
			//http://k_krylov:7010/0/rest/DemoWebService/GetContactById/410006e1-ca4e-4502-a9ec-e54d922d2c00
			UserConnection userConnection = UserConnection ?? SystemUserConnection;

			const string tableName = "Contact";
			EntitySchema contactSchema = UserConnection.EntitySchemaManager.GetInstanceByName(tableName);
			Entity contact = contactSchema.CreateEntity(UserConnection);
			contact.FetchFromDB(id);

			if(contact != null)
			{
				var response = new MyDataModel
				{
					Name = contact.GetTypedColumnValue<string>("Name"),
					Email = contact.GetTypedColumnValue<string>("Email"),
					Age = contact.GetTypedColumnValue<int>("Age")
				};
				return response;
			}

			return new MyDataModel();
		}

		#endregion

		#region Methods : Private

		#endregion
	}

	[DataContract]
	public class MyDataModel
	{
		[DataMember(Name="name")]
		public string Name { get; set; }

		[DataMember(Name = "email")]
		public string Email { get; set; }

		[DataMember(Name = "age")]
		public int Age { get; set; }

	}


	[DataContract]
	public class MyInputDataModel
	{
		[DataMember(Name = "name")]
		public string Name { get; set; }

		[DataMember(Name = "email")]
		public string Email { get; set; }

		[DataMember(Name = "age")]
		public int Age { get; set; }

	}


}



