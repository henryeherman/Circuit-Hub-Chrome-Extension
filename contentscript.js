/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */

console.log('Circuit Hub Extentsion Being Called');
var digikey_str = /digikey/
var mouser_str = /mouser/
var newark_str = /newark/
var circuithub_search = 'https://circuithub.com/parts/search?mpn='
var circuithub_img = '<img src="'+chrome.extension.getURL("logo-19.png")+'" alt="Circuithub" />'

console.log('URL::'+document.URL);
if (digikey_str.test(document.URL))
{
    console.log('We are on digikey!');
    // Test the text of the body element against our regular expression.
    var regex = /reportpartnumber/;
    if (regex.test(document.body.innerHTML)) {
      // The regular expression produced a match, so notify the background page.
      chrome.extension.sendRequest({}, function(response) {});
      var partCell = document.getElementById('reportpartnumber');  
      var partInfos = partCell.parentElement.parentElement.getElementsByTagName('th');
      for(var i=0; i<partInfos.length;i++){
        if (partInfos[i].innerText == 'Manufacturer Part Number') {	 
            var cell = partInfos[i].parentElement.getElementsByTagName('td')[0];
            var partid = cell.innerText
            console.log('Found part#'+partid);
            var newcell = '<a href="'+ circuithub_search+partid+'">'+partid+circuithub_img+'</a>';
            cell.innerHTML = newcell;
        }
      } 
    } 
    
} else if (mouser_str.test(document.URL)){
    console.log('We are on Mouser!');
    var partInfos = document.getElementById('product-desc').getElementsByTagName('td'); 
    for(var i=0; i<partInfos.length;i++){
        if (partInfos[i].hasAttribute('itemprop')) {
            if(partInfos[i].getAttribute('itemprop')=='ProductID') {                   
               var partid=partInfos[i].innerText;
               console.log('Found part#'+partid);
               partInfos[i].innerHTML= '<a href="'+circuithub_search+partid+'">'+partInfos[i].innerHTML+circuithub_img+'</a>';
            }
        }
    }
} else if (newark_str.test(document.URL)){
    console.log('We are on Newark!');
    partInfos=document.getElementsByClassName('pd_details')[0];
    cell = partInfos.children[partInfos.children.length-1]
    var partid=cell.innerText;
    console.log('Found part#'+partid);
    cell.innerHTML='<a href='+circuithub_search+partid+'">'+cell.innerHTML+circuithub_img+'</a>';
}