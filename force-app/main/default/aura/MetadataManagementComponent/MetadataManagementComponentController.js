({
	init : function(component, event, helper) {
        let rowActions = [{ 
            'label': 'Edit', 
            'iconName': 'action:edit', 
            'name': 'edit_record' 
        }]; 
        
        let columns = [
            { label: 'Custom Metadata Type Name', fieldName: 'MasterLabel', type: 'text' }, 
            { label: 'Flow Name', fieldName: 'Flow_Api_Name__c', type: 'text' },
            { type: 'action', typeAttributes: { rowActions: rowActions } }
        ];	
        
        // set the column on component
        component.set( "v.columns", columns );
                
        // Get the data from server side action
        helper.fetchData( component );        
    },
    
    handleNewButtonClick: function( component, event, helper ){
        
        // Initialize the record object
        component.set( "v.record", {} );
        let ele = component.find( "recordPopup" );
        $A.util.removeClass( ele, "slds-hide" );        
    },
    
    handleCancelPopupClick: function( component, event, helper ){
        
        let ele = component.find( "recordPopup" );
        $A.util.addClass( ele, "slds-hide" );
        
    },
    
    // For saving custom metadata record 
    handleSavePopupClick: function( component, event, helper ) {
    	let record = component.get( "v.record" );
        if( record.MasterLabel != null && record.MasterLabel != '' )
        {
            console.log("In handleSavePopupClick");
            helper.saveRecordAsync( component );
        }
        else
            alert( "Please provide Record Label" );
    },
    
    handleRowAction: function ( component, event, helper ) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'edit_record':
                component.set( "v.record", row );
                let ele = component.find( "recordPopup" );
        		$A.util.removeClass( ele, "slds-hide" );
                break;
            case 'delete_record':
                component.set( "v.record", row );
                break;
        }
    }
    
})