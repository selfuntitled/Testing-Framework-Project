public class MetadataManagementController 
{
    // Method which will return a list of all the metadatata records 
    @AuraEnabled 
    public static List<TestFlowRun__mdt> getAllRecords() 
    {    	
        return [SELECT MasterLabel, Flow_Api_Name__c FROM TestFlowRun__mdt ORDER BY MasterLabel];
    }
    
    @AuraEnabled 
    public static String saveRecord(TestFlowRun__mdt metadataRecord ) {
    	
        try{
            String nameSpacePrefix = '';
            // A unique name for developer name 
            // Replace space with '_'
            String recordDevName = metadataRecord.MasterLabel.replaceAll(' ', '_');
            
            // Set up custom metadata to be created in the org.
            Metadata.CustomMetadata customMetadata =  new Metadata.CustomMetadata();
                      
            if (recordDevName.left(1).isNumeric()) customMetadata.fullName = nameSpacePrefix + 'TestFlowRun__mdt.X' + recordDevName; 
            else customMetadata.fullName = nameSpacePrefix + 'TestFlowRun__mdt.' + recordDevName;
             
            customMetadata.label = metadataRecord.MasterLabel;
           	
            // Add all the field values             
            Metadata.CustomMetadataValue customField = new Metadata.CustomMetadataValue();
            customField.field = 'Flow_Api_Name__c';
            customField.value = metadataRecord.Flow_Api_Name__c;
            customMetadata.values.add(customField);
                             
            System.debug('\n\n\n Created custom metadata record ' + customMetadata );
            Metadata.DeployContainer mdContainer = new Metadata.DeployContainer();
            mdContainer.addMetadata(customMetadata);
            
            // Setup deploy callback, MyDeployCallback implements
            // the Metadata.DeployCallback interface 
            CustomMetadataCallback callback = new CustomMetadataCallback();
        
            // Enqueue custom metadata deployment
            // jobId is the deployment ID
            Id jobId = Metadata.Operations.enqueueDeployment(mdContainer, callback);
            
            return jobId;
            
        } catch(Exception ex){
             
             System.assert(false,ex.getMessage()); 
             return 'Error while creating new button.';
         }
        
    }
    
  
}