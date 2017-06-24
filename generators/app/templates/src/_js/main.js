'use strict';
/**
 * Some useful packages (you can install by using npm)
 * 2. slick-carousel (pre-installed) = Simple, easy, responsive carousel (buggy centerMode - variableWidth - lazyMode)
 * 3. jquery-match-height (pre-installed) = Use this to match the height of elements. Either use this or Equalizer from Foundation
 * 4. bootstrap-select (pre-installed) = if you need custom dropdown
 *
 * IMPORTANT:
 * To import async-ly, you need to wrap your codes in require.ensure([], () => { });
 * It's best not to async plugins, to leverage browser cache
 * Ref: https://webpack.js.org/guides/code-splitting/
 *  
 * NOTES:
 * This boilerplate uses CDN/external for jQuery package. Configured in gulp/webpack.js. 
 * This to prevent the needs of jQuery from node_modules
 */

///////////////
// Libraries //
///////////////
import ssm from 'simplestatemanager';
import mh from 'jquery-match-height';
import JSON5 from 'json5';

/////////////
// Plugins //
/////////////

////////////////
// Components //
////////////////
<% if (vue) { %>import App from './components/App.vue';
import Test from './components/Test.vue';<%}%>

// Setting Webpack public path dynamically so that it loads the partials
// from the folder where the main.js is located
var bundleSrc = $('[src$="/main.js"]').attr("src");
__webpack_public_path__ = bundleSrc.substr(0, bundleSrc.lastIndexOf("/") + 1);

$(() => {
    /////////////////////////////
    // Match Height Customized //
    /////////////////////////////
    require('./partials/custom-matchheight');

    ///////////////////////////
    // Async require example //
    ///////////////////////////
    if( true ) {
        require.ensure([], () => {
            require('./partials/partial')($);
        }, "partials");    
    }
    
    <% if (vue) { %>new Vue({
	  el: '#app',
	  components: { 
	  	'app-cool': App,
	  	'test-cool': Test
	  } 
	});<%}%>
});
