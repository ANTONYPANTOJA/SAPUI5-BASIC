// @ts-nocheck
sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast',
    'logaligroup/sapui5/model/Models',
    'sap/ui/model/resource/ResourceModel',
    "sap/ui/core/Fragment",
    "sap/base/Log"


    /**
     *  @param {typeof sap.ui.core.mvc.Controller} Controller
     *  @param {typeof sap.m.MessageToast} MessageToast
     *  @param {typeof logaligroup.sapui5.model.Models} Models
     *  @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     */
], function (Controller, MessageToast, Models, ResourceModel,Fragment,Log){
    return Controller.extend("logaligroup.sapui5.controller.HelloPanel", {

        onInit: function () {
            var oData = {
                recipient: {
                    name: 'World'
                }

            };
            //******************************************************************************************* */
            //Set data model in the view
            //var oModel = new JSONModel(oData);
            //this.getView().setModel(oModel);
            //            this.getView().setModel(Models.createRecipient());
            //******************************************************************************************* */
            //Set i18n model in the view
            //            var i18nModel =  new ResourceModel({ bundleName : "logaligroup.sapui5.i18n.i18n"});
            //            this.getView().setModel(i18nModel,"i18n");

        },

        onBeforeRendering: function(){
            window.message = 'Log message - onBeforeRendering';
            Log.info(window.message);
            Log.error(window.message);
            
        },
        onAfterRendering: function(){
            //debugger;
        },

        onShowHello: function () {
            //alert("Hello Word");
            //            MessageToast.show('Hello Word');
            //******************************************************************************************* */
            //read text from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            //read property from data model
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            MessageToast.show(sMsg);
        },

        onOpenDialog: function () {
        //   const oView = this.getView();
        //      if (!this.byId("helloDialog")) {

        //          Fragment.load({
        //             id: oView.getId(),
        //              name: "logaligroup.sapui5.view.HelloDialog",
        //              controller: this
        //          }).then(function (oDialog) {
        //            oView.addDependent(oDialog);
        //              oDialog.open();
        //         });
        //      }else {
        //         this.byId("helloDialog").open();
        //     }

         this.getOwnerComponent().openHelloDialog();
        }
        //  onCloseDialog: function(){

        //      this.byId("helloDialog").close();
        //  }

    });
});