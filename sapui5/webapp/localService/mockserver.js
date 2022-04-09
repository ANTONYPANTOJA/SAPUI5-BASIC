//@ts-nocheck
sap.ui.define([
    'sap/ui/core/util/MockServer',
    'sap/ui/model/json/JSONModel',
    'sap/base/util/UriParameters',
    'sap/base/Log',
], 
/**
 * 
 */
function(MockServer, JSONModel,UriParameters,Log) {
    'use strict';

    var oMockServer,
        _sAppPath = "logaligroup/sapui5/",
        _sJsonFilesPath = _sAppPath + "localService/mockdata";


        var oMockServerInterface = {

            /**Initializes the mock server asynchronously
             * @protected
             * @param {object} oOptionsParameter
             * @returns
             */

            
             init: function(oOptionsParameter){

                var oOptions = oOptionsParameter || {};

                return new Promise(function(fnResolve,fnReject){

                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);

                        oManifestModel.attachRequestCompleted(function(){

                            var oUriParameters = new UriParameters(window.location.href);
                            //Parse manifest for local metadata URI

                            var sJsonFileUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                            var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                            var sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);
                            // ensure  there is a trailing Slash
                            var sMockServerurl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath));

                            //Create a mock Server instance or Stop the existing one the reinitialize
                            if (!oMockServer) {
                                   oMockServer = new MockServer({
                                            rootUri: sMockServerurl
                                   });
                            } else {
                                oMockServer.stop();
                            }

                            //Configure mock Server with the given options or a default of 0.5 s
                            MockServer.config({
                                autoRespond: true,
                                autoRespondAfter:(oOptions.delay || oUriParameters.get("serverDelay") || 500 )
                            });

                            //simulate all requests using mock data
                            oMockServer.simulate(sMetadataUrl,{
                                sMocodataBaseUrk: sJsonFileUrl,
                                bGenerateMissingMockData: true
                            });

                            var aRequests = oMockServer.getRequests();

                            var fnResponse = function(iErrCode,sMessage,aRequest){

                                    aRequest.response(iErrCode,{"Content-Type" : "text/plain;charset=utf-8"},sMessage);
                            };

                            //Simulate metadata errors
                            if (oOptions.metadataError || oUriParameters.get("metadataError")) {
                                aRequests.forEach( function(aEntry){
                                    if (aEntry.path.toString().indexof("$metadata") > -1 ) {
                                        fnResponse(500,"metadata Error",aEntry);
                                    }
                                });
                            }
                            
                            //Simulate Request errors
                            var sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
                            var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                            if (sErrorParam) {
                                    aRequests.forEach( function(aEntry){
                                        fnResponse(iErrorCode,sErrorParam,aEntry);
                                    });
                            };

                            // set requests and start the server

                            oMockServer.setRequests(aRequests);
                            oMockServer.start();

                            Log.info("Running the app with mock data");
                            fnResolve();

                        });

                        oManifestModel.attachRequestFailed(function(){
                            var sError = "Failed to Load the application manifest";
                            Log.error(sError);
                            fnReject( new Error(sError));
                        });

                });
             }

        };

        return oMockServerInterface;
    
});