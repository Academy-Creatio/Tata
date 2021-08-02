using System.Linq;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Tata.Files.cs.DataEventListener
{
	/// <summary>
	/// Listener for Contact entity events.
	/// </summary>
	/// <remarks>
	/// See <see href="https://academy.creatio.com/docs/developer/back-end_development/entity_event_layer/entity_event_layer">documentation</see>
	/// <seealso cref="BaseEntityEventListener" />
	/// </remarks>
	[EntityEventListener(SchemaName = "Contact")]
	class ContactEventListener : BaseEntityEventListener
	{
		#region Methods : Public : OnSave
		public override void OnSaving(object sender, EntityBeforeEventArgs e)
		{
			base.OnSaving(sender, e);
			Entity entity = (Entity)sender;
			entity.Validating += Entity_Validating;
			UserConnection userConnection = entity.UserConnection;
		}

		private void Entity_Validating(object sender, EntityValidationEventArgs e)
		{
			Entity entity = (Entity)sender;
			if (entity.GetTypedOldColumnValue<string>("Name") == "Supervisor")
			{
				EntityValidationMessage evm = new EntityValidationMessage()
				{
					Text = "Supervisor Contact cannot be modified",
					MassageType = Terrasoft.Common.MessageType.Error,
					Column = entity.Schema.Columns.FindByName("Name")
				};
				entity.ValidationMessages.Add(evm);
			}
		}

		public override void OnSaved(object sender, EntityAfterEventArgs e)
		{
			base.OnSaved(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		#endregion

		#region Methods : Public : OnInsert
		public override void OnInserting(object sender, EntityBeforeEventArgs e)
		{
			base.OnInserting(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		public override void OnInserted(object sender, EntityAfterEventArgs e)
		{
			base.OnInserted(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		#endregion

		#region Methods : Public : OnUpdate
		public override void OnUpdating(object sender, EntityBeforeEventArgs e)
		{
			base.OnUpdating(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		public override void OnUpdated(object sender, EntityAfterEventArgs e)
		{
			base.OnUpdated(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		#endregion

		#region Methods : Public : OnDelete
		public override void OnDeleting(object sender, EntityBeforeEventArgs e)
		{
			base.OnDeleting(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		public override void OnDeleted(object sender, EntityAfterEventArgs e)
		{
			base.OnDeleted(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		#endregion
	}
}
