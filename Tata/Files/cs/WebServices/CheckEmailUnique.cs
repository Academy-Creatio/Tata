using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Terrasoft.Core;
using Terrasoft.Core.DB;
using Terrasoft.Web.Common;

namespace Tata.WebServices
{
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class CheckEmailUnique : BaseService
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
		public bool CheckByEmail(string email)
		{
			UserConnection userConnection = UserConnection ?? SystemUserConnection;

			Select select = new Select(userConnection)
				.Column(Func.Count("Id"))
				.From("Contact")
				.Where("Email").IsEqual(Column.Parameter(email)) as Select;

			//var count = select.ExecuteScalar<int>();

			return select.ExecuteScalar<int>() > 0 ? false : true;
		}

		

		#endregion

		#region Methods : Private

		#endregion
	}
}



