// ==UserScript==
// @name	LIGHTS Forum Theme Picker
// @description	Change up the way LIGHTS forum looks!
// @match http://board.iamlights.com/*
// ==/UserScript==
(function(document, unsafeWindow){
	// keep track of the current version
	var currentVersion = 1.0;
	var baseUrl = 'http://jeremysawesome.com/LIGHTSForum/';
	var min = '.min';

	// create an ajax request, simple and easy to use
	function ajax(args){
		// we only support Chrome and Firefox
		var xmlhttp = new XMLHttpRequest();
		
		// callback
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				args.success(xmlhttp.responseText);
			}
		}
		
		args.type = args.type || 'GET';

		xmlhttp.open(args.type, args.url, args.async);
		xmlhttp.send();
	}// function ajax

	// pull a certain type of elements out and return an array of those elements
	function filterElements(elements, tagToGet, callback, nodeType){
		var returnable = [];
		nodeType = nodeType || 1;
		for(var i = 0; i < elements.length; i++){
			var childLi = elements[i];
			if(childLi.nodeType === nodeType && childLi.tagName === tagToGet){
				if(typeof(callback) !== 'undefined'){
					callback.apply(childLi);
				}
			
				returnable.push(childLi);
			}
		}
		
		return returnable
	}// function filterElements
	
	function insertStyles(themeName){
		var styleElement = document.createElement('link');
		styleElement.id = 'LFTP-Style';
		styleElement.type = 'text/css';
		styleElement.rel = 'stylesheet';
		styleElement.href = baseUrl+'themes/'+themeName+'/LTP_'+themeName+min+'.css';
		document.head.appendChild(styleElement);
	}
	
	function insertScripts(themeName){
		var scriptElement = document.createElement('script');
		scriptElement.id = 'LFTP-Script';
		scriptElement.type = 'text/javascript';
		scriptElement.src = baseUrl+'themes/'+themeName+'/LTP_'+themeName+min+'.js';
		document.head.appendChild(scriptElement);
	}
	
	function removeElement(element){
		if(!!element) element.parentNode.removeChild(element);
	}
	
	function removeTheme(){
		removeElement(document.getElementById('LFTP-Script'));
		removeElement(document.getElementById('LFTP-Style'));
	}
	
	function selectTheme(theme){
		if(!!theme['stylesheet']){
			insertStyles(theme['name']);
		}
		if(!!theme['script']){
			insertScripts(theme['name']);
		}
		
		// story the selectedTheme
		selectedTheme = theme;
		store('selectedTheme', theme);
	}
	
	function store(key, value){
		if(arguments.length > 1) {
			// there is more than one argument, store it
			window.localStorage.setItem('themePicker-'+key, JSON.stringify(value));
		}
		else{
			// only one argument, get it
			var item = window.localStorage.getItem('themePicker-'+key);
			if(item === null) return null;
			return JSON.parse(item);
		}
		
	}
	
	function populateThemes(themes){
		var id = 'LFTP-themeSelector';
		
		// remove any exisitng theme containers
		removeElement(document.getElementById(id));
		
		var themeContainer = document.createElement('select');
		themeContainer.id = id;
		for (var theme in themes){
			if(!themes.hasOwnProperty(theme)) continue;
			
			var option = document.createElement('option');
			option.text = theme;
			
			if(selectedTheme['name'] === theme) option.selected = true;
			
			themeContainer.appendChild(option);
		}
		
		document.body.appendChild(themeContainer);
		themeContainer.addEventListener('change', function(){
		
			// store the new theme and refresh the page
			store('selectedTheme', availableThemes[this.options[this.selectedIndex].value]);
			window.location = window.location;
		});
	}
	
	function getCookie(key){
		key = 'LFTP-'+key;
		// split on the key, get the second element, split on ';' get the first element
		var potentialCookie = document.cookie.split(key+'=')[1];
		if(!!potentialCookie){
			return potentialCookie.split(';')[0];
		}
		return null;
	}
	
	function setCookie(key, value, daysToExpire){
		key = 'LFTP-'+key;
		var expires = '';
		if(!!daysToExpire){
			var date = new Date();
			date.setTime(date.getTime()+(daysToExpire*24*60*60*1000));
			expires = '; expires='+date.toGMTString();
		}
		document.cookie = key+'='+value+expires+'; path=/';
	}
	
	// check for theme selection in local storage, if selected insert the CSS and JS for it now
	var selectedTheme = store('selectedTheme') || false;
	if(selectedTheme !== false){ selectTheme(selectedTheme); }
	
	var availableThemes = store('availableThemes') || false;
	if(availableThemes !== false){ populateThemes(availableThemes); }
	
	// only check for an update every day	
	// if the last checked date was yesterday then check again.
	if(getCookie('Checked') === null || selectedTheme === false || availableThemes === false){
	
		// get a list of all themes
		ajax({
			url: baseUrl+'themes.php',
			success: function(themes){
				// parse the json
				themes = JSON.parse(themes || 'null');
				if(themes === 'null') return;
				
				if(selectedTheme === false){
					selectTheme(themes['Themes'][themes['DefaultTheme']]);
				}
				availableThemes = themes['Themes'];
				populateThemes(availableThemes);
				store('availableThemes', availableThemes);
			}
		});
		
		// after everything is styled, check for a new version
		ajax({
			url: baseUrl+'/updatecheck.php',
			success: function(response){
				// parse the json
				response = JSON.parse(response || "null");
				if(response !== 'null' && response['version'] != currentVersion){
					// build a div to display the "new version" message
					var newVersionDiv = document.createElement('div');
					document.body.insertBefore(newVersionDiv, document.body.firstChild);
					newVersionDiv.style.textAlign = 'center';
					newVersionDiv.style.background ='#fff';
					newVersionDiv.style.padding = '10px';
					newVersionDiv.style.margin = '15px 10px';
					newVersionDiv.style.position = 'fixed';
					newVersionDiv.style.width = '97%';
					newVersionDiv.style.border = '2px solid black';
					newVersionDiv.style.zIndex = '900';
					
					
					newVersionDiv.className = 'rounded';
					newVersionDiv.innerHTML = '<h2 style="font-size: 1.5em;">A new version of the LIGHTS Forum Theme Picker is available.</h2><p>Your Current Version: '+currentVersion+' New Version: '+response.version+'</p><p><a href="'+baseUrl+'LIGHTS_Forum_theme_picker.php">Download it here.</a></p>';
				}
			}
		});
		
		// set a cookie that expires in one day
		setCookie('Checked', 1, 1);
	}// if
	
	// expose functions - use unsafeWindow!
	unsafeWindow['LFTP'] = unsafeWindow['LFTP'] || {};
	unsafeWindow['LFTP']['filterElements'] = filterElements;
	unsafeWindow['LFTP']['ajax'] = ajax;
	unsafeWindow['LFTP']['store'] = store;
	unsafeWindow['LFTP']['getCookie'] = getCookie;
	unsafeWindow['LFTP']['setCookie'] = setCookie;
})(document, unsafeWindow);
