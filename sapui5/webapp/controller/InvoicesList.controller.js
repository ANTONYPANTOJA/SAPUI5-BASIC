//@ts-nocheck
sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    '../model/InvoicesFormatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/ui/core/UIComponent' 
], 
/**
 * 
 * @param {typeof sap.ui.core.mvc.Controller  } Controller 
 * @param {typeof sap.ui.model.json.JSONModel } JSONModel 
 */
function(Controller, JSONModel,InvoicesFormatter,Filter,FilterOperator,UIComponent) {
    
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
        },
        navigateToDetails: function(oEvent){
            //Obtener el item seleccionado
            const oItem = oEvent.getSource();
             //Determinar el link de navegation
             const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Details",{
//pasar el path con los datos
                invoicePath: window.encodeURIComponent(oItem.getBindingContext("northwind").getPath().substr(1))

            });
        
        }
    });
});