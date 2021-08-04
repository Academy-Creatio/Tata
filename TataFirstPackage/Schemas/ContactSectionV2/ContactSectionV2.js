define("ContactSectionV2", [], function() {
	return {
		entitySchemaName: "Contact",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {
			
			onMyMainButtonClick:function(){
				var tag = arguments[3];
			},
			
			isActiveRecord: function(){
				if(this.$ActiveRow ){
					return true;
				}else{
					return false;
				}
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
					tag: "ActionButtonsContainer_Red",
					enabled: {"bindTo": "isActiveRecord"}
				}
			},
		]/**SCHEMA_DIFF*/
	};
});
