// ==UserScript==
// @name        remove github issues prs count
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
        remove_issues_prs_count();
    });

    function remove_issues_prs_count() {

        // Change the regex if you want to see the issues and PR counts for
        // some repos but not others
        var url_regex = RegExp('.*github.com.*');
        var current_url = window.location.href;

        if (url_regex.test(current_url)){
            var sheet = window.document.styleSheets[0];
            sheet.insertRule('#issues-repo-tab-count { display: none; }');
            sheet.insertRule('#pull-requests-repo-tab-count { display: none; }');
        }
    }
}());
