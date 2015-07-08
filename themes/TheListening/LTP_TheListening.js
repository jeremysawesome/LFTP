(function(document, LFTP){

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

	// change background of main grid to purple
	var mainContainer = document.getElementById("grid");
	mainContainer.style.background = "#371164";
	mainContainer.style.setProperty("color", "#371164", "important");

	// add borders and modify width of wrapper
	var ibpwrapper = document.getElementById('ipbwrapper');
	ibpwrapper.style.width = '85%';
	ibpwrapper.style.background = '#000';
	ibpwrapper.style.borderLeft = '5px solid #FCF05D';
	ibpwrapper.style.borderRight = '5px solid #FCF05D';
	ibpwrapper.style.padding = '15px';

	// modify width of header
	document.querySelector('#branding .main_width').style.width = 'inherit';
	var navTabs = document.querySelector('#primary_nav .main_width');
	navTabs.style.width = 'inherit';
	navTabs.style.margin = '0 10px';

	// modify logo
	document.querySelector('#branding img').src = 'http://board.iamlights.com/public/style_images/8__LIGHTS_message_board_header.jpg';

	// get all forum rows so we can updated read vs unread icons
	var forumRows = document.querySelectorAll('.ipb_table tr');	
	for(var i = 0; i < forumRows.length; i++){
		if(forumRows[i].className == ''){
			forumRows[i].querySelector('.col_c_icon img').src = 'http://board.iamlights.com/public/style_images/IamLightsUpdated/f_read.png'; 
		}
		else if(forumRows[i].className == 'unread'){
			forumRows[i].querySelector('.forum_marker img').src = 'http://board.iamlights.com/public/style_images/IamLightsUpdated/f_unread.png';
		}
	}
		
		
	// update forum section headers
	var forumSectionHeaders = document.querySelectorAll('h3.maintitle');
	for(var i = 0; i < forumSectionHeaders.length; i++){
		forumSectionHeaders[i].style.background = '#371164';
		forumSectionHeaders[i].style.color = '#FFF';
	}

	// update the background color
	var forumTables = document.querySelectorAll('.ipsBox_container');
	for(var i = 0; i < forumTables.length; i++){
		forumTables[i].style.background = '#DDD';
	}

	// update the columns - note this probably needs to have less padding, but oh well
	var forumSectionColumns = document.querySelectorAll('tr.header.hide');
	for(var i = 0; i < forumSectionColumns.length; i++){
		forumSectionColumns[i].className = 'header';
		forumSectionColumns[i].style.background = '#FCF05D';
		forumSectionColumns[i].style.color = '#371164';
	}

	// update the forum names
	var forumNames = document.querySelectorAll('.col_c_forum a');
	for(var i = 0; i < forumNames.length; i++){
		forumNames[i].style.color = '#371164';
	}

	// update the last post section
	var lastPostUl = document.querySelectorAll('.last_post');
	for(var j = 0; j < lastPostUl.length; j++){
		var dateLi, titleLi, authorLi;
		// we are inside a ul, get it's list items
		var foundListItems = LFTP.filterElements(lastPostUl[j].childNodes, 'LI');
		
		titleLi = foundListItems[0];
		authorLi = foundListItems[1];
		dateLi = foundListItems[2];
		
		
		// move date to top
		lastPostUl[j].insertBefore(dateLi, titleLi);
		
		// add img to date
		var arrowImg = document.createElement('img');
		arrowImg.src = 'http://board.iamlights.com/public/style_images/IamLightsUpdated/last_post.png';
		
		// move the arrowImg before the date and add a space
		var firstChild = dateLi.firstChild.firstChild;
		dateLi.firstChild.insertBefore(arrowImg, firstChild);
		dateLi.firstChild.insertBefore(document.createTextNode(' '), firstChild);
		
		// add the word in before the title
		var innerHtml = titleLi.innerHTML;
		var inElement = document.createElement('strong');
		inElement.innerText = 'In: ';
		titleLi.innerHTML = "<strong>In: </strong>" + innerHtml;
		
		// make the word "By" bold
		authorLi.innerHTML = authorLi.innerHTML.replace('By', '<strong>By:</strong>');
	}

	// find the side block headers
	var sideBlocks = document.querySelectorAll('.ipsSideBlock h3');
	for(var i = 0; i < sideBlocks.length; i++){
		sideBlocks[i].style.background = '#371164';
		sideBlocks[i].style.color = '#fff';
		sideBlocks[i].style.fontWeight = 'bold';
	}

	var boardStatistics = document.getElementById('board_statistics');
	var boardStatistics_numbers = document.querySelector('#board_stats ul');
	boardStatistics.style.background = '#ddd';
	boardStatistics.style.padding = '15px';
	boardStatistics.style.borderBottom = '4px solid #371164';
	boardStatistics.style.position = 'relative';

	// round the boardStats section, throw in the stat_links
	var boardStats = document.getElementById('board_stats');
	var stat_links = document.getElementById('stat_links');
	boardStats.style.background = '#ddd';
	boardStats.style.padding = '7px';
	boardStats.className = boardStats.className + ' rounded';
	stat_links.style['float'] = 'none';
	boardStats.appendChild(stat_links);

	// create a container for the boardStatistics_numbers section
	var numbersContainer = document.createElement('div');
	numbersContainer.innerHTML = '<h2 style="font-size: 1.1em; font-weight: bold; padding-bottom: 7px;">Our Board Statistics</h2>';
	numbersContainer.id = "boardStatsContainer";
	numbersContainer.appendChild(boardStatistics_numbers);
	boardStatistics.appendChild(numbersContainer);

	// lots of styles for the number container - to position it in the right of the container
	numbersContainer.style.overflow = 'hidden';
	numbersContainer.style.position = 'absolute';
	numbersContainer.style.top = 0;
	numbersContainer.style.right = '40px';
	numbersContainer.style.width = '20%';
	numbersContainer.style.padding = '7px';

	// remove the inline list styling from the numbers
	boardStatistics_numbers.className = boardStatistics_numbers.className.replace('ipsList_inline', '');
	boardStatistics_numbers.style.lineHeight = '2em';

	// loop through the numbers and reverse them (so title comes before number)
	LFTP.filterElements(boardStatistics_numbers.childNodes, 'LI', function(){
		var childLiNodes = this.childNodes;
		
		// reverse the nodes
		for(var j = childLiNodes.length -1; j >= 0; j--){
			this.appendChild(childLiNodes[j]);
		}
	});

	// this section takes care of aligning the span values to the right of the container (so it looks more like a table without all the work)
	var valueSpans = document.querySelectorAll('#boardStatsContainer span');
	for(var i = 0; i < valueSpans.length; i++){
		valueSpans[i].style.display = 'inline-block';
		valueSpans[i].style['float'] = 'right';
	}
})(document, LFTP);