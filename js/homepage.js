// JavaScript Document
$(document).ready(function(){
	//get train list
	getTrainList();
	//get current time
	getCurrentTime();	
});

/* ------------- get the current time---------- */
function getCurrentTime(){
	setTimeout("getCurrentTime()", 1000);
	var currentDate = new Date();
	var currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
	$('#trainCurrentTime').html(currentTime);
}

/* ------------- get the train list from json---------- */
function getTrainList(){
	 $.getJSON( "trainList.json", function( data ) {
		 var items = [];
		 data.trainList.sort(compare);		 
		 $.each( data.trainList, function( key, val ) { 
		   items.push('<div class="trainList">'+
						'<div class="trainListNumber">'+ parseInt(key + 1) +'</div>'+
						'<div class="trainListName">'+ val.stationName +'</div>'+
						'<div class="trainListTime">'+ val.timeDelay +' mins</div>'+
						'</div>');
		 });	  
		 $( "<div>", {
		   html: items.join( "" )
		 }).appendTo( "#trainListContainer" );
	   });
	   
	   //function to compare the time value
	   function compare(a,b) {
		 if (a.timeDelay < b.timeDelay)
		   return -1;
		 if (a.timeDelay > b.timeDelay)
		   return 1;
		 return 0;
	   }
}