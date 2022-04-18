// @ts-nocheck
/* eslint-disable non-undef */
/* QUnit global */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit( function(){
    "use strict";

    sap.ui.require([
        "logaligroup/sapui5/test/integration/NavigationJourney"
    ],function(){
        QUnit.start();
    });
});

/*
sap.ui.require(["logaligroup/sapui5/test/integration/AllJourneys"
], function () {
	QUnit.config.autostart = false;
	QUnit.start();
});
*/