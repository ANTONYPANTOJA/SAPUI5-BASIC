//@ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
    'logaligroup/sapui5/model/Models',
    'sap/ui/model/resource/ResourceModel',
    './controller/HelloDialog'

    /** 
    *  @param {typeof sap.ui.core.UIComponent} UIComponent
    *  @param {typeof logaligroup.sapui5.model.Models} Models
    *  @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
    */

], function (UIComponent, Models, ResourceModel,HelloDialog) {
    'use strict';
    return UIComponent.extend("logaligroup.sapui5.Component", {

        metadata:{
             manifest: "json"
            // "rootView":{
            //         "viewName": "logaligroup.sapui5.view.App",
            //         "type": "XML",
            //         "async": true,
            //         "id": "app"
            // }
        },

        init: function () {

            // Call the init  function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            //Set data model in the view
            this.setModel(Models.createRecipient());

            //Set i18n model in the view
           // var i18nModel = new ResourceModel({ bundleName: "logaligroup.sapui5.i18n.i18n" });
           // this.setModel(i18nModel, "i18n");

            //Componente centralizado HelloDialog
              this._helloDialog = new HelloDialog(this.getRootControl());

            //Create the views based on the URL/Hash
                this.getRouter().initialize();
        },

         exit : function(){
             this._helloDialog.destroy();
             delete this._helloDialog;

         },
         openHelloDialog : function(){
             this._helloDialog.open();
         }



    });

});