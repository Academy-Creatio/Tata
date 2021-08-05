define("ContactPageV2", ["ServiceHelper", "ProcessModuleUtilities"], 
function(ServiceHelper, ProcessModuleUtilities) {
	return {
		entitySchemaName: "Contact",
		messages:{
			/**
			 * Published on: ContactSectionV2
			 * @tutorial https://academy.creatio.com/docs/developer/front-end_development/sandbox_component/module_message_exchange
			 */
			 "SectionActionClicked":{
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
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
				this.subscribeToMessages();
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
					"Caption": "doESQ",
					"Click": {"bindTo": "onActionClick"},
					"Tag": "sub2"
				}));
				return collection;
			},
			onActionClick: function(){
				
				var tag = arguments[0];
				if(tag === "sub2"){
					this.doESQ();
					return;
				}
				this.showInformationDialog("Action clicked with tag: "+tag);
			},
			onMyMainButtonClick: function(){
				var account = this.$Account;
			},
			
			/**
			 * Section this.sandbox.id = "SectionModuleV2_ContactSectionV2" + "_CardModuleV2"
			 * Page this.sandbox.id    = "SectionModuleV2_ContactSectionV2_CardModuleV2"
			 */
			subscribeToMessages: function(){
				this.sandbox.subscribe(
					"SectionActionClicked",
					function(){this.onSectionMessageReceived();},
					this,
					[this.sandbox.id]
				)
			},
			onSectionMessageReceived: function(){
				
				//Payload
				var serviceData = {
					"input":{
						"name": "Kirill Krylov 2nd attempt",
						"email": "kirill.krylov@gmail.com",
						"age": 40
					}	
				};

				// Calling the web service and processing the results.
				// Can only execute/send POST requests
				// http://k_krylov:7010/0/rest/CustomExample/PostMethodName
				ServiceHelper.callService(
					"DemoWebService", //CS - ClassName
					"PostExample",    //CS - Method
					function(response) 
					{
						var result = response.PostExampleResult;
						this.showInformationDialog(result);
					}, 
					serviceData, 
					this
				);
			},


			startProcess: function(){
				var id = this.$Id;
				var scope = this;
				var args = {
					sysProcessName: "PROCESS_CODE",
					parameters:{
						contactId: id
					}
					//callback: scope.onProcessCompleted(),
					//scope: scope
				}
				ProcessModuleUtilities.executeProcess(args);
			},

			/**
			 * Creation of query instance with "Contact" root schema. 
			 * @tutorial https://academy.creatio.com/docs/developer/front-end_development/crud_operations_in_configuration_schema/filters_handling
			 */
			doESQ: function(){
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Contact"
				});

				esq.addColumn("Name");
				esq.addColumn("Email");
				esq.addColumn("Country.Name", "CountryName");

				var esqFirstFilter = esq.createColumnIsNullFilter("Country");
				esq.filters.add("esqFirstFilter", esqFirstFilter);

				// Select all contacts, date of birth of which fall at the period from 1.01.1970 to 1.01.1980.
				var dateFrom = new Date(1970, 0, 1, 0, 0, 0, 0);
				var dateTo = new Date(1990, 0, 1, 0, 0, 0, 0);
				var esqSecondFilter = esq.createColumnBetweenFilterWithParameters("BirthDate", dateFrom, dateTo);

				// Add created filters to query collection. 
				esq.filters.add("esqSecondFilter", esqSecondFilter);


				// This collection will include objects, i.e. query results, filtered by two filters.
				esq.getEntityCollection(function (result) {
					if (result.success) {
						result.collection.each(function (item) {
							// Processing of collection items.
							var message = item.$Name+" "+item.$CountryName;
							this.showInformationDialog(message);
						});
					}
				}, this);
			},


			// 1. Validate Email is unique
			// 2. Validate Sum of unpaid invoices does not exceed 1000
			/* If you only need to perform one async method, use this
			asyncValidate: function(callback, scope) 
			{
				this.callParent([
					function(response){
						if (response.success){
							this.checkEmailIsUnique(callback, scope || this);
						}
						else {
							callback.call(scope || this, response);
						}
					}, 
					this
				]);
			},
			*/


			/** Validates model values. Sends validate results to callback function.
			 * Using Terrasoft.chain allows us to execute multiple methods.
			 * For example first we validate checkEmailIsUnique and when the result comes back
			 * chain moves to checkEmailIsUnique.
			 * Terrasoft.chain will execute async methods synchronously
			 * @inheritdoc Terrasoft.BaseEntityV2#asyncValidate 
			 * @overridden
			 * @param {Function} callback Callback-function.
			 * @param {Object} scope Execution context.
			 */
			asyncValidate: function(callback, scope) {
				this.callParent([function(response) {
					if (!this.validateResponse(response)) {
						return;
					}
					this.Terrasoft.chain(
						function(next) {
							this.checkEmailIsUnique(function(response) {
								if (this.validateResponse(response)) {
									next();
								}
							}, this);
						},
						function(next) {
							this.checkEmailIsUniqueServer(function(response) {
								if (this.validateResponse(response)) {
									next();
								}
							}, this);
						},
						function(next) {
							callback.call(scope, response);
							next();
						}, this);
				}, this]);
			},


			checkEmailIsUnique: function (callback, scope) 
			{
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "Contact" });
				esq.addColumn("Email", "Email");
				
				var esqFirstFilter = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Email", this.$Email
				);
				
				var esqSecondFilter = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.NOT_EQUAL, "Id", this.$Id
				);

				esq.filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				esq.filters.add("esqFirstFilter", esqFirstFilter);
				esq.filters.add("esqSecondFilter", esqSecondFilter);

				esq.getEntityCollection(function (result) {
					if (result.success && result.collection.getCount()>0) {
						if (callback) {
							callback.call(scope, {
									success: false,
									message: "Email has to be unique, checked with UI"
								}
							);
						}
					}
					else {
						if (callback) {
							callback.call(scope, 
								{success: true}
							);
						}
					}
				}, 
				this);
			},
			checkEmailIsUniqueServer: function (callback, scope) {
				
				//Payload
				var serviceData = {
					"email": this.$Email
				};

				ServiceHelper.callService(
					"CheckEmailUnique", //CS - ClassName
					"CheckByEmail", //CS Method
					function(response) 
					{
						var result = response.CheckByEmailResult;
						if(result === false){
							if (callback) {
								callback.call(scope, {
										success: false,
										message: "Email has to be unique, checked with WebService"
									}
								);
							}
						}
						else{
							if (callback) {
								callback.call(scope, 
									{success: true}
								);
							}
						}
						
					}, 
					serviceData, 
					this
				);
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