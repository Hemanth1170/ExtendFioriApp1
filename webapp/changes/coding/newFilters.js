/***
@controller Name:fin.gl.journalentry.verification.controller.Worklist,
*@viewId:application-adaptationproject-display-component---worklist
*/
/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
function (
	ControllerExtension,
	Filter,
	FilterOperator
) {
	"use strict";

	var APPROVAL_LIMIT = 5;

	return ControllerExtension.extend("customer.app.variant5.newFilters", {
		override: {
			//  override public method of the ListReport controller
			templateBaseExtension: {
				/**
				 * Can be used to add filters. They will be combined via AND with all other filters
				 * sControlId is the ID of the control on which extension logic to be applied.
				 * For each filter the extension must call fnAddFilter(oControllerExtension, oFilter)
				 * oControllerExtension must be the ControllerExtension instance which adds the filter
				 * oFilter must be an instance of sap.ui.model.Filter
				 */
				addFilters: function (fnAddFilter, sControlId) {
					var oComboBox = this.byId("purchaseApprovalComboBox");
					var sSelectedKey = oComboBox.getSelectedKey();
					var oFilter;
					switch(sSelectedKey) {
						case "noApprovalRequired":
							oFilter = new Filter({
								path: "Price",
								operator: FilterOperator.LT,
								value1: APPROVAL_LIMIT
								});
							break;
						case "approvalRequired":
							oFilter = new Filter({
								path: "Price",
								operator: FilterOperator.GE,
								value1: APPROVAL_LIMIT
							});
							break;
						default:
							break;
					}
					if (oFilter){
						fnAddFilter(this, oFilter);
					}
				}
			}
		}
	});
});




	