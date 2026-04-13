Account pe field hai: Latest_Opportunity_Date__c

Requirement:
Account ke andar:

Latest (MAX) Opportunity CloseDate store karo

public static void Opportunity(List<Opportunity> oppList , Map<Id,Opportunity> oppOldMap){

    Set<Id> accIds = new Set<Id>();

    if(oppList != null){
    for(Opportunity opp :oppList ){
        if(opp.AccountId != null){
            accIds.add(opp.AccountId);
        }
    }

    if(oppOldMap != null){
    for(Opportunity opp : oppOldMap.values() ){
        if(opp.AccountId != null){
            accIds.add(opp.AccountId);
        }
    }}
    
    Map<Id, Date> oppDetails = new Map<Id, Date>();

    for(AggregateResult re :[
        SELECT CloseDate , MAX(CloseDate) date
        FROM Opportunity 
        WHERE AccountId IN : accIds
        GROUP BY AccountId 
        ORDER BY DESC
    ]){
       oppDetails.put((Id) ar.get(AccountId) , (Date) ar.get(date)) 
    }

    List<Account> accdetails = new List<Account>();

    for(Id accId : accIds){
         
         Account acc =  new Account(Id = AccountId);

         acc.Latest_Opportunity_Date__c = oppDetails.containsKey(accId)? oppDetails.get(accId) : 0;

         accdetails.add(acc);

    }

    if(!accdetails.isEmpty()){
        update accdetails;
    }

}