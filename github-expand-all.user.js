// ==UserScript==
// @name        github expand all
// @namespace   lesteve.github.io
// @include     /https://github.com/.*/(issues|pull)/.*/
// @version     1
// @grant       none
// ==/UserScript==


// Register a shortcut to expands all outdated comments. This is useful to
// search text inside old comments thas have been folded because the code has
// been modified after the comment. At the moment the following content is expanded:
// * outdated diffs
// * folded conversations
//   (e.g. https://github.com/scikit-learn/scikit-learn/pull/9012#pullrequestreview-42934289
//   215 items not shown)
// * large diffs, which are hidden by default, e.g. the doc/glossary.rst diff
//   in https://github.com/scikit-learn/scikit-learn/pull/9517/files

(function(){
    'use strict';
    // console.log('github-expand-all.user.js loaded');
    var opened = false;

        function open_outdated_diff_comments() {
        // console.log('Begin open_outdated_diffs');
        var outdated_diff_elements = document.getElementsByClassName("outdated-comment");
        // supporting old github PRs (before "Start Review" feature)
        var legacy_outdated_diff_elements = document.getElementsByClassName("outdated-diff-comment-container");
        // transform HTMLCollection objects into arrays and concatenate
        outdated_diff_elements = Array.from(outdated_diff_elements);
        outdated_diff_elements = outdated_diff_elements.concat(Array.from(legacy_outdated_diff_elements));
        console.log('outdated_diff_elements.length: ' + outdated_diff_elements.length);
        for (var i = 0; i < outdated_diff_elements.length; i++) {
            var element = outdated_diff_elements[i];
            if (!opened) {
                element.classList.add('open');
            }
            else {
                element.classList.remove('open');
            }
        }
        opened = !opened;
        // console.log('Opened: ' + opened);
    }

    function load_hidden_items() {
        var buttons = document.getElementsByClassName('ajax-pagination-btn');
        if (buttons.length != 0){
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].click();
            }
            setTimeout(load_hidden_items, 100);
        } else {
            console.log('Loaded all hidden items');
        }
    }

    function load_large_diffs() {
        var buttons = document.getElementsByClassName('load-diff-button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].click();
        }
        console.log('Loaded ' + buttons.length + ' large diffs');
    }
    document.addEventListener('keydown', function(e) {
        // console.log('Pressed: ' + e.keyCode);
        // console.log('shift: ' + e.shiftKey);
        // console.log('ctrl: ' + e.ctrlKey);
        // console.log('alt: ', e.altKey);
        // console.log('meta: ' + e.metaKey);
        if (e.keyCode == 80 && !e.shiftKey && e.ctrlKey && e.altKey && !e.metaKey) {
            // console.log('Pressed alt-ctrl-p');
            open_outdated_diff_comments();
            load_hidden_items();
            load_large_diffs();
        }
    }, false);
})();
