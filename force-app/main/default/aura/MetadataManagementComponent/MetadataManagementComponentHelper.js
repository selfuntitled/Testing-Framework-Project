({
	fetchData : function (component) {
		var action = component.get("c.getAllRecords");
        action.setCallback( this, function( response ) {
            var state = response.getState();
            if( state === "SUCCESS") {
                console.log( response.getReturnValue() );
                component.set( "v.data", response.getReturnValue() );
            }
            else if (state === "INCOMPLETE") {
            	alert('Error in the response');
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction( action );
    },
    
    saveRecordAsync: function( component ) 
    {
		console.log("In saveRecordAsync");
        
        let action = component.get("c.saveRecord");
        action.setParam( "metadataRecord", component.get("v.record") );
        component.set( "v.record", {} );
        let ele = component.find( "recordPopup" );
        $A.util.addClass( ele, "slds-hide" );
        
        
        action.setCallback( this, function( response ) {
            var state = response.getState();
            if( state === "SUCCESS") {
                console.log( response.getReturnValue() );
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    mode: 'sticky',
                    message: 'This is a required message',
                    messageTemplate: 'Your request has been submitted. Click {0}  to track the progress.',
                    messageTemplateData: [{
                        url: '/changemgmt/monitorDeploymentsDetails.apexp?asyncId=' + response.getReturnValue(),
                        label: 'Deployment Status',
                        }
                    ]
                });
                toastEvent.fire();
            }
            else if (state === "INCOMPLETE") {
            	alert('Error in the response');
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction( action );
    }
})