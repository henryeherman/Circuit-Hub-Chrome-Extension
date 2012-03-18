/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
var regex = /reportpartnumber/;

// Test the text of the body element against our regular expression.

if (regex.test(document.body.innerHTML)) {
  // The regular expression produced a match, so notify the background page.
  chrome.extension.sendRequest({}, function(response) {});
  var partCell = document.getElementById('reportpartnumber');  
  var partInfos = partCell.parentElement.parentElement.getElementsByTagName('th');
  for(var i=0; i<partInfos.length;i++){
	if (partInfos[i].innerText == 'Manufacturer Part Number') {	 
		cell = partInfos[i].parentElement.getElementsByTagName('td')[0];		
		partid = cell.innerText
		newcell = '<a href="https://circuithub.com/parts/search?q='+partid+'">'+partid+'</a>';
		cell.innerHTML = newcell;
	}
  }
    
} else {
  // No match was found.
}
