//@ts-nocheck
sap.ui.define([
    'logaligroup/sapui5/model/InvoicesFormatter',
    'sap/ui/model/resource/ResourceModel'
/**
    @param { typeof sap.ui.model.resource.ResourceModel } ResourceModel
*/    
], function(InvoicesFormatter, ResourceModel) {

    QUnit.module("Invoices Status",{
        beforeEach: function(){
            this._oResourceModel =  new ResourceModel({
                bundleUrl: sap.ui.require.toUrl("logaligroup/sapui5" ) + "/i18n/i18n.properties" });
        },
        afterEach: function(){
            this._oResourceModel.destroy();
        }
    });

    QUnit.test("Shold Return the invoices Status",function(assert){

        let oModel = this.stub();
        oModel.withArgs("i18n").returns(this._oResourceModel);
        
        let oViewStub = {
            getModel : oModel
        };

        let oControllerStub = {
            getView: this.stub().returns(oViewStub)
        };

        let fnIsolatedFormater = InvoicesFormatter.invoiceStatus.bind(oControllerStub);

        //Asert
        assert.strictEqual(fnIsolatedFormater("A"),"New","The invoices status for A is correct");
        assert.strictEqual(fnIsolatedFormater("B"),"In Progress","The invoices status for B is correct");
        assert.strictEqual(fnIsolatedFormater("C"),"Done","The invoices status for C is correct");

    });
});