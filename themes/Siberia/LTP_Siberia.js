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
	var themeOptions = document.querySelectorAll('#new_skin_menucontent li.selected');
	
	// if no skins are selected than assume the siberia theme
	if(!themeOptions.length) return;
	
	// otherwise, if a skin is selected than change the data-skinid to 15 and trigger a click
	var elementToClick = themeOptions[0].children[0];
	elementToClick.setAttribute('data-skinid', 15);
	triggerClick(elementToClick);
})(document);
