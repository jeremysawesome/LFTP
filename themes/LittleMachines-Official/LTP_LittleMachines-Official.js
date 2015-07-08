(function(document){
	function triggerClick(element){
		var eventName = 'click';
		
		if(element.dispatchEvent){
			var eventClass = 'MouseEvents';
			var event = document.createEvent(eventClass);
			event.initEvent(eventName, true, true);
			event.synthetic = true;
			element.dispatchEvent(event, true);
		}
		else if(element.fireEvent){
			var event = document.createEventObject();
			event.synthetic = true;
			element.fireEvent('on'+eventName, event);
		}
	}
	
	// first check if the siberia skin is selected via the default skin selector
	var selectedTheme = document.querySelectorAll('#new_skin_menucontent li.selected a');
	
	if(selectedTheme.length && selectedTheme[0].getAttribute('data-skinid') === '16') return;
	
	var elementToClick;
	if(selectedTheme.length){
		elementToClick = selectedTheme;
	}
	else{
		elementToClick = document.querySelectorAll('#new_skin_menucontent li a')[0];
	}
	elementToClick.setAttribute('data-skinid', 16);
	triggerClick(elementToClick);
})(document);
