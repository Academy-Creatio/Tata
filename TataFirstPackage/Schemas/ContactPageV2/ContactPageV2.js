define("ContactPageV2", [], function() {
	return {
		entitySchemaName: "Contact",
		attributes: {

			"MyEmailAttribute": {
				dependencies: [
					{
						columns: ["Email"],
						methodName: "onEmailChange"
					},
					{
						columns: ["Name"],
						methodName: "onEmailChange"
					}
				]
			},

			"Account":{
				lookupListConfig: {
					columns: ["Web", "Owner"]
				}
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {

			/**
			 * @inheritdoc Terrasoft.BasePageV2#init
			 * @override
			 */
			init: function() {
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#onEntityInitialized
			 * @override
			 */
			 onEntityInitialized: function() {
				this.callParent(arguments);
			 },

			onEmailChange: function(){
				var colName = arguments[1];
				var newEmailValue = this.get(colName);
				this.showInformationDialog(colName+" has changed, new value is: " +newEmailValue);
			},

			/**
			 * @protected
			 * @inheritdoc BaseSchemaViewModel#setValidationConfig
			 * @overridden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("Email", this.emailValidator);
			},
			emailValidator: function(){
				var invalidMessage= "";

				var email = this.$Email;
				var domain = email.split("@")[1];

				if(domain === "gmail.com"){
					invalidMessage ="Invalid Email, gmail is not allowed";
				}else{
					invalidMessage = "";
				}
				return {
					invalidMessage: invalidMessage
				}
			},

			/**
			 * @inheritdoc Terrasoft.BasePageV2#getActions
			 * @overridden
			 */
			 getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuSeparator());
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "action1",
					"Caption": this.get("Resources.Strings.ActionOneCaption"),
					//"Caption": "Action 1",
					"Click": {"bindTo": "onActionClick"},
					"ImageConfig": this.get("Resources.Images.CreatioSquare"),
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "action2",
					"Caption": this.get("Resources.Strings.ActionTwoCaption"),
					//"Caption": "Action 2",
					"Click": {"bindTo": "onActionClick"},
					"Items": this.addSubItems()
				}));
				return actionMenuItems;
			},
			addSubItems: function(){
				var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				collection.addItem(this.getButtonMenuItem({
					// "Caption": this.get("Resources.Strings.SubActionOneCaption"),
					"Caption" : "Sub Action One",
					"Click": {"bindTo": "onActionClick"},
					"Tag": "sub1"
				}));
				collection.addItem(this.getButtonMenuItem({
					// "Caption": this.get("Resources.Strings.SubActionTwoCaption"),
					"Caption": "Sub Action Two",
					"Click": {"bindTo": "onActionClick"},
					"Tag": "sub2"
				}));
				return collection;
			},
			onActionClick: function(){
				var tag = arguments[0];
				this.showInformationDialog("Action clicked with tag: "+tag);
			},
			onMyMainButtonClick: function(){
				var account = this.$Account;
			}
			
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[

//F5
//http://k_krylov:7010/0/Nui/ViewModule.aspx#CardModuleV2/ContactPageV2/edit/4abd319e-cbb6-4b28-b44d-84915be52620

//ConstactSection->Contact
//http://k_krylov:7010/0/Nui/ViewModule.aspx#SectionModuleV2/ContactSectionV2
//http://k_krylov:7010/0/Nui/ViewModule.aspx#CardModuleV2/ContactPageV2/edit/4abd319e-cbb6-4b28-b44d-84915be52620

			{
				"operation": "insert",
				"name": "MyRedButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.RED,
					"classes": {
						"textClass": [
							"actions-button-margin-right"
						],
						"wrapperClass": [
							"actions-button-margin-right"
						]
					},
					"caption": "Page red button",
					"hint": "Red btn hint goes here !!!",
					"click": {
						"bindTo": "onMyMainButtonClick"
					},
					"tag": "LeftContainer_Red"
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "MyGreenButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"classes": {
						"textClass": [
							"actions-button-margin-right"
						],
						"wrapperClass": [
							"actions-button-margin-right"
						]
					},
					"caption": "Page Green button",
					"hint": "Green btn hint goes here !!!",
					"click": {
						"bindTo": "onMyMainButtonClick"
					},
					"tag": "LeftContainer_Green"
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 7
			},


			{
				"operation": "insert",
				"name": "MyRedButton_ContactGeneralInfoBlock",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.RED,
					"classes": {
						"textClass": [
							"actions-button-margin-right"
						],
						"wrapperClass": [
							"actions-button-margin-right"
						]
					},
					"caption": "Page red button",
					"hint": "Red btn hint goes here !!!",
					"click": {
						"bindTo": "onMyMainButtonClick"
					},
					"tag": "LeftContainer_Red",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ContactGeneralInfoBlock"
					},
				},
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"index": 7
			},

			{
				"operation": "insert",
				"name": "Emailc3be07d4-77dd-4e8a-bb85-c46aedad6101",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ContactGeneralInfoBlock"
					},
					"bindTo": "Email"
				},
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "MyEmail",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3,
						"layoutName": "ContactGeneralInfoBlock"
					},
					"bindTo": "Email"
				},
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "merge",
				"name": "JobTabContainer",
				"values": {
					"order": 2
				}
			},
			{
				"operation": "merge",
				"name": "HistoryTab",
				"values": {
					"order": 5
				}
			},
			{
				"operation": "merge",
				"name": "NotesAndFilesTab",
				"values": {
					"order": 6
				}
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 7
				}
			}
		]/**SCHEMA_DIFF*/
	};
});