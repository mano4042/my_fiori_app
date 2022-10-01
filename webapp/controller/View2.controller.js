sap.ui.define([
    'emc/hr/payroll/controller/BaseController',
    'sap/ui/core/Fragment',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/m/MessageStrip'
], function(Controller, Filter, FilterOperator, MessageBox, MessageToast, MessageStrip) {
    'use strict';
    return Controller.extend("emc.hr.payroll.controller.View2",{
        onInit:function(){
            //Step 1: Get the Router Object
            this.oRouter = this.getOwnerComponent().getRouter(); 
            //We forcefully pass this pointer to herculis (event handler)
            this.oRouter.getRoute("detail").attachPatternMatched(this.herculis, this);
        },        
        onFilter: function(oEvent){
            //    alert('This is under construction!!!')
            //When user click F4 on the field inside table, that field object we
            // are storing in the temporary object 
            this.selectedField = oEvent.getSource();

            if(!this.oSupplierPopup){
                var that = this;
                this.loadFragment({
                    name: "emc.hr.payroll.fragments.popup",
                    type: "XML",
                    id: "supplier"
                    }).then(function(oSupplier){
                    //Assign the object created by system to our global variable 
                    that.oSupplierPopup = oSupplier;
                    that.oSupplierPopup.setTitle("Select Supplier");
                    that.oSupplierPopup.bindAggregation("items",{
                        path: "/supplier",
                        template: new sap.m.DisplayListItem({
                            label:"{name}",
                            value:'{city}'
                        })
                    });
                    that.oSupplierPopup.open();
                    
                    });
            } else{
                this.oSupplierPopup.open();
            }
             },
             handleConfirm: function(status){
                if(status === "OK"){
                    MessageToast.show(this.readMessage("XMSG_ORDREL","90099"));
                }else{

                }
             },
             onOrder: function(params){
                MessageBox.confirm(this.readMessage("XMSG_CONFIRM"),{
                    title:'Confirmation',
                    onClose: this.handleConfirm.bind(this)
                });
             },

        oCityPopup: null,
        oSupplierPopup: null,
        onSearchPopup: function(){

        },
        onConfirm: function(oEvent){
            var sId = oEvent.getSource().getId();

            if(sId.indexOf("city") !== -1){
                    //1. Read the value which was selected in the popup
                    var oSelectedItem = oEvent.getParameter("selectedItem");
                    var sText = oSelectedItem.getLabel();
                    //2.Place that value to the field INSIDE the TABLE
                    this.selectedField.setValue(sText);
            }else{
                //1. get the table object
                    var oTable = this.getView().byId('idTab');
                //2. read multi select items
                    var oSelectedItems = oEvent.getParameter("selectedItems");
                //3. contruct filter
                    var aFilters= [];
                    for (let index = 0; index < oSelectedItems.length; index++) {
                        const element = oSelectedItems[index];
                        const sText = element.getLabel();
                        aFilters.push(new Filter('name', FilterOperator.EQ, sText));
                    }
                    var oFilter = new Filter({
                        filters: aFilters,
                        and: false
                    });
                //4. pump to binding
                oTable.getBinding("items").filter(oFilter);
                // alert('This is under construction!!!')
            }
        
        },
        selectedField: null,
        onF4Help: function(oEvent){
            //When user click F4 on the field inside table, that field object we
            // are storing in the temporary object  
            this.selectedField = oEvent.getSource();
            //  alert('This is under construction!!!') 
            // IF int_alv IS NOT INITIAL (ABAP)
            if(!this.oCityPopup){
                var that = this;
                this.loadFragment({
                    name: "emc.hr.payroll.fragments.popup",
                    type: "XML",
                    id: "city"
                })
                //Asynchronous - call back and promise                
                .then(function(oPopup){
                    // Assign the object created by system to our global variable 
                    that.oCityPopup = oPopup; 
                    // Change the title
                    that.oCityPopup.setTitle("Select City");
                    that.oCityPopup.bindAggregation("items",{
                        path:"/cities",
                        template: new sap.m.DisplayListItem({
                            label: "{cityName}",
                            value: "{famousFor}"
                        })
                    });
                    that.oCityPopup.setMultiSelect(false);
                    that.oCityPopup.open();
                });
            } else{
                this.oCityPopup.open();
            }
        //    Fragment.load({
        //     name: "emc.hr.payroll.fragments.popup",
        //     type: "XML",
        //     controller: this
        // })
        // // Asynchronous - Call back and promise
        // .then(function(oPopup){
        //     oPopup.open();
        //     // oMyButton is now usable
        // });
        },

        onlinkPress: function(oEvent){
            var sText = oEvent.getSource().getText();
                sText = 'https://google.com?q='+ sText;
                window.open(sText);
        },

        herculis: function(oEvent){
            //  debugger;
             //  var fruitId = oEvent.getParameter("arguments").fruitId;
             // var sPath = "/fruits/" + fruitId;
             var sPath = this.extractPath(oEvent); 
              this.getView().bindElement({
                  path: sPath,
                  parameters:{
                      expand: "To_Supplier"
                  }
                
                });  // Binding with /fruits/4 
        },

        onBack(){
            //Step 1: get the parent control object - Container for our view
            var oAppCon= this.getView().getParent().to("idView1");
        } 
    });
});