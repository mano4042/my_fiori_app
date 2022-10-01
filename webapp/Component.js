sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("emc.hr.payroll.Component",{
        metadata:{
            manifest: "json"
        },
        init: function(){
            // this line will call the base class consructor
            UIComponent.prototype.init.apply(this);
            //Step 1: Inside the manifect.json file add - rootView, routing sections
            //Step 2: Get the router object
            var oRouter = this.getRouter();
            //Step 3: Initialize the router
            oRouter.initialize();
        },
        
        // createContent: function(){
        //     var oView = sap.ui.view({
        //         viewName: "emc.hr.payroll.view.App",
        //         id: 'idAppView',
        //         type: "XML"
        //     }); 
        
        // // step 1: create View1 Object 
        //      var oView1 = sap.ui.view({
        //         viewName: "emc.hr.payroll.view.View1",
        //         id: 'idView1',
        //         type: "XML"
        //     }); 
        // // Step 2: Create View2 Object
        //     var oView2 = sap.ui.view({
        //         viewName: "emc.hr.payroll.view.View2",
        //         id: 'idView2',
        //         type: "XML"
        //     }); 
        // // Step 3: Get the App container Control Object from App.view.xml
        //     var oAppCon = oView.byId("appCon");
        // // Step 4: Inject the View1 and View2 inside the Container
        //     oAppCon.addMasterPage(oView1).addDetailPage(oView2);
        //     return(oView);
        // } 
    });
});