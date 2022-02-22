// ==UserScript==
// @name        misc github tweaks
// @namespace   lesteve.github.io
// @include     /https://github.com/.*/
// @version     1
// @grant       none
// ==/UserScript==
// This hides the count of opened issues and PRs count from github pages

(function(){
    'use strict';

    // console.log('Running user script');

    window.addEventListener('load', () => {
        misc_github();
    });

    function misc_github() {
	      // Show all status checks rather than a small window with scroll
        var sheet = window.document.styleSheets[0];
        sheet.insertRule('.merge-status-list { max-height: fit-content !important; }');
    }

}());

