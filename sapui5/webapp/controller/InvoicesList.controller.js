//@ts-nocheck
sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    '../model/InvoicesFormatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator' 
], 
/**
 * 
 * @param {typeof sap.ui.core.mvc.Controller  } Controller 
 * @param {typeof sap.ui.model.json.JSONModel } JSONModel 
 */
function(Controller, JSONModel,InvoicesFormatter,Filter,FilterOperator) {
    
    return Controller.extend("logaligroup.sapui5.controller.InvoicesList",{

        formatter: InvoicesFormatter,
        onInit: function(){
            var oViewModel =  new JSONModel({
                    usd: "USD",
                    eur: "EUR"
            });
            this.getView().setModel(oViewModel,"currency");
        },
        onFilterInvoices: function(oEvent){
            const aFilter = [];
            const sQuery  = oEvent.getParameter("query");

            if (sQuery) {
                aFilter.push( new Filter("ProductName", FilterOperator.Contains, sQuery));  
            };

            const oList = this.getView().byId("_IDGenList1");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        }
    });
});