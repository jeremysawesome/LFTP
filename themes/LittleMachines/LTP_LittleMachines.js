(function(document){	

/**
 * First things first, check if the Siberia theme is the base theme
 * this section literally is a copy and paste of the "Siberia" theme.
**/
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
/**
 * end checking for siberia
**/

	//<link href='http://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'>
	// add in roboto font
	var customFont = document.createElement('link');
	customFont.rel = 'stylesheet';
	customFont.type = 'text/css';
	customFont.href = 'http://fonts.googleapis.com/css?family=Roboto:400,700';
	document.head.appendChild(customFont);

	// build a background tag and append to the page
	var background = document.createElement('div');
	background.className = 'background lights-image';
	document.body.appendChild(background);

	// add a second background for grid
	background = document.createElement('div');
	background.className = 'background grid';
	document.body.appendChild(background);

	// change the favicon
	var iconElement = document.querySelectorAll('link[rel="shortcut icon"]')[0];
	iconElement.href = 'http://music.iamlights.com/wp-content/themes/umc_music-iamlights/images/favicon.ico';
	
	// build in the omb graphic
	var ombGraphic = document.createElement('img');
	ombGraphic.id = 'ombGraphic';
	ombGraphic.src = 'http://jeremysawesome.com/LIGHTSForum/themes/LittleMachines/images/officialMessageBoard.png';
	document.querySelectorAll('#branding .main_width')[0].appendChild(ombGraphic);
	
	// there are some quotes that are styled inline, let's remove that styling
	var quoteBlocks = document.querySelectorAll('.ipsBlockquote span');
	for (var i = quoteBlocks.length - 1; i >= 0; i--){
		quoteBlocks[i].removeAttribute('style');
	}
	
	// get all forum rows so we can updated read vs unread icons
	var forumRows = document.querySelectorAll('.ipb_table tr');	
	for(var i = 0; i < forumRows.length; i++){
		if(forumRows[i].className == ''){
			forumRows[i].querySelector('.col_c_icon img').src = 'http://jeremysawesome.com/LIGHTSForum/themes/LittleMachines/images/littleMachinesLogo_orange.png'; 
		}
		else if(forumRows[i].className == 'unread'){
			forumRows[i].querySelector('.forum_marker img').src = 'http://jeremysawesome.com/LIGHTSForum/themes/LittleMachines/images/littleMachinesLogo_orange.png';
		}
	}
	
})(document);

