//@ts-nocheck
sap.ui.define([
    "logaligroup/sapui5/localService/mockserver",
    'sap/ui/test/opaQunit',
    './pages/HelloPanel'

], function(mockserver,opaQunit) {
    'use strict';
    
    QUnit.module("Navigation");


    opaQunit("Should open the Hello Dialog", function(Given,When,Then){

        //Initialize MockServer
        mockserver.init();

        //Arrays

        Given.iStartMyUIComponent({

            ComponentConfig: {
                name: "logaligroup.sapui5" 
            }
        });

        //Actions
        When.onTheAppPage.iSayHelloDialogButton();

        // Assertions
        Then.onTheAppPage.iSeeTheHelloDialog();

        //Cleanup
        Then.iTeardownMyApp();
    });
});