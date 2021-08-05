define("ContactSectionV2", [], function() {
	return {
		entitySchemaName: "Contact",
		messages:{
			/**
			 * Subscribed on: ContactPageV2
			 * @tutorial https://academy.creatio.com/docs/developer/front-end_development/sandbox_component/module_message_exchange 
			 */
			"SectionActionClicked":{
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {
			
			onMyMainButtonClick:function(){
				var tag = arguments[3];
				if(tag ==="CombinedModeActionButtonsCardLeftContainer_Red"){
					
					//Red button is only visible on page, thus there is a Message subscriber
					this.sandbox.publish("SectionActionClicked", null, [this.sandbox.id+"_CardModuleV2"]);
				}
			},
			isActiveRecord: function(){
				if(this.$ActiveRow ){
					return true;
				}else{
					return false;
				}
			},
			getSectionActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuSeparator());
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "action1",
					//"Caption": this.get("Resources.Strings.ActionOneCaption"),
					"Caption": "Action 1",
					"Click": {"bindTo": "onActionClick"}
					//"ImageConfig": this.get("Resources.Images.CreatioSquare"),
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "action2",
					//"Caption": this.get("Resources.Strings.ActionTwoCaption"),
					"Caption": "Action 2",
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
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "PrimaryContactButtonRed",
				"parentName": "CombinedModeActionButtonsCardLeftContainer", //INVISIBLE in section, visible on the page
				"propertyName": "items",
				"values":{
					itemType: this.Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.RED,
					classes: {
						"textClass": ["actions-button-margin-right"],
						"wrapperClass": ["actions-button-margin-right"]
					},
					caption: "Section Red Button",
					hint: "Section red button hint",
					click: {"bindTo": "onMyMainButtonClick"},
					tag: "CombinedModeActionButtonsCardLeftContainer_Red",
					enabled: {"bindTo": "isActiveRecord"}
				}
			},
			{
				"operation": "insert",
				"name": "PrimaryContactButtonGreen",
				"parentName": "SeparateModeActionButtonsLeftContainer", //visible in section and on a page
				"propertyName": "items",
				"values":{
					itemType: this.Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.GREEN,
					classes: {
						textClass: ["actions-button-margin-right"],
						wrapperClass: ["actions-button-margin-right"]
					},
					caption: "Section Green Button",
					hint: "Section red button hint",
					click: {"bindTo": "onMyMainButtonClick"},
					tag: "SeparateModeActionButtonsLeftContainer_Green",
					enabled: {"bindTo": "isActiveRecord"}
				}
			},
		]/**SCHEMA_DIFF*/
	};
});
