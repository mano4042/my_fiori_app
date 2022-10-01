sap.ui.define([
    'emc/hr/payroll/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(Controller, Filter, FilterOperator) {
    'use strict';
    return Controller.extend("emc.hr.payroll.controller.View1",{
        onInit:function(){
            //The router oobecr is readly available in Component.js
            // So we are getting the same.
            this.Router = this.getOwnerComponent().getRouter();
            this.Router.getRoute("detail").attachPatternMatched(this.herculis, this);
        },  
        onAdd: function(){
            this.Router.navTo("add");
        },
        herculis: function(oEvent){
            //  debugger;
            // var fruitId = oEvent.getParameter("arguments").fruitId;
            //  var sPath = "/fruits/" + fruitId;
              var sPath = this.extractPath(oEvent);
              var oList = this.getView().byId("idLST");
              //debugger;
              var element={};
              if (oList.getItems().length > 0) { 
                  for (let i = 0; i < oList.getItems().length; i++) {
                   element = oList.getItems()[i];
                  if (element.getBindingContextPath() === sPath) {
                      oList.setSelectedItem(element);
                      break;
                  }
              }
              }
        },
        onNext(){
            // Step 1: get the parent control Object - Container for our view.
            var oAppCon= this.getView().getParent();
            // Step 2: ask the parent to nav to next view.
            oAppCon.to("idView2");
        },

        onNxrPage:function(){
            this.onNext();
        },     

        onSearch:function(oEvent){
            //Step 1: what is that user type in the search field.
            var sSearch = oEvent.getParameter("query");
            if(sSearch ==="" || sSearch === undefined){
                sSearch = oEvent.getParameter("newValue");
            }
            //Step 2: construct the filter object with operator
            var oFilter = new Filter("CATEGORY", FilterOperator.Contains, sSearch);
            // var oFilter2 = new Filter("taste", FilterOperator.Contains, sSearch);
            // var aFilter = [oFilter, oFilter2];
            // var oMaster = new Filter({
            //     filters:aFilter, and:false
            // });
            //Step 3: get the list object
            var oList = this.getView().byId("idLST");
            //Step 4: inject the filter to the list
            oList.getBinding("items").filter(oFilter);
        },
        onFruitSelect: function(oEvent){
            //Step 1: Get the router object 
                //written in onInit fucntion
            //Step 2: Trigger the route
             var oSelectedItem = oEvent.getParameter("listItem");
            // debugger;
            this.Router.navTo("detail",{
                  fruitId: oSelectedItem.getBindingContextPath().split("/")[1]
            });
        },
        OnDelete:function(oEvent){
            // Step 1:find out which item was seleted for deletion 
            var oSeleted = oEvent.getParameter("listItem");
            //Step 2: Get list object
            var oList = oEvent.getSource();
            //Step 3:Remove the item from the list 
            oList.removeItem(oSeleted);
        },
        OnDelete1:function(oEvent){
            var oList = this.getView().byId("idLST");
            var oSelectedItems= oList.getSelectedItems();
            oSelectedItems.forEach(item =>{
                oList.removeItem(item);

            });
        },

        onItemClick:function(){
            //This is my current class object- Which is our controler
             this.onNext();
        },

        onItemClick1:function(){
            //This is my current class object- Which is our controler
             this.onNext();
        }
    });
});