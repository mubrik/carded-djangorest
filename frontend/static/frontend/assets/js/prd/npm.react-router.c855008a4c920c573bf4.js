(self.webpackChunkcarded_react=self.webpackChunkcarded_react||[]).push([[617],{16550:function(t,n,e){"use strict";e.d(n,{l_:function(){return g},AW:function(){return w},F0:function(){return h},rs:function(){return k},s6:function(){return f},LX:function(){return C},k6:function(){return U},TH:function(){return b},UO:function(){return R}});var r=e(93552),o=e(67294),i=(e(45697),e(59731)),a=e(42554),u=e(2177),c=e(22122),p=e(39658),s=e.n(p),l=(e(59864),e(19756),e(8679),function(t){var n=(0,a.Z)();return n.displayName="Router-History",n}()),f=function(t){var n=(0,a.Z)();return n.displayName="Router",n}(),h=function(t){function n(n){var e;return(e=t.call(this,n)||this).state={location:n.history.location},e._isMounted=!1,e._pendingLocation=null,n.staticContext||(e.unlisten=n.history.listen((function(t){e._isMounted?e.setState({location:t}):e._pendingLocation=t}))),e}(0,r.Z)(n,t),n.computeRootMatch=function(t){return{path:"/",url:"/",params:{},isExact:"/"===t}};var e=n.prototype;return e.componentDidMount=function(){this._isMounted=!0,this._pendingLocation&&this.setState({location:this._pendingLocation})},e.componentWillUnmount=function(){this.unlisten&&this.unlisten()},e.render=function(){return o.createElement(f.Provider,{value:{history:this.props.history,location:this.state.location,match:n.computeRootMatch(this.state.location.pathname),staticContext:this.props.staticContext}},o.createElement(l.Provider,{children:this.props.children||null,value:this.props.history}))},n}(o.Component);o.Component;var m=function(t){function n(){return t.apply(this,arguments)||this}(0,r.Z)(n,t);var e=n.prototype;return e.componentDidMount=function(){this.props.onMount&&this.props.onMount.call(this,this)},e.componentDidUpdate=function(t){this.props.onUpdate&&this.props.onUpdate.call(this,this,t)},e.componentWillUnmount=function(){this.props.onUnmount&&this.props.onUnmount.call(this,this)},e.render=function(){return null},n}(o.Component),d={},v=0;function y(t,n){return void 0===t&&(t="/"),void 0===n&&(n={}),"/"===t?t:function(t){if(d[t])return d[t];var n=s().compile(t);return v<1e4&&(d[t]=n,v++),n}(t)(n,{pretty:!0})}function g(t){var n=t.computedMatch,e=t.to,r=t.push,a=void 0!==r&&r;return o.createElement(f.Consumer,null,(function(t){t||(0,u.Z)(!1);var r=t.history,p=t.staticContext,s=a?r.push:r.replace,l=(0,i.ob)(n?"string"==typeof e?y(e,n.params):(0,c.Z)({},e,{pathname:y(e.pathname,n.params)}):e);return p?(s(l),null):o.createElement(m,{onMount:function(){s(l)},onUpdate:function(t,n){var e=(0,i.ob)(n.to);(0,i.Hp)(e,(0,c.Z)({},l,{key:e.key}))||s(l)},to:e})}))}var x={},E=0;function C(t,n){void 0===n&&(n={}),("string"==typeof n||Array.isArray(n))&&(n={path:n});var e=n,r=e.path,o=e.exact,i=void 0!==o&&o,a=e.strict,u=void 0!==a&&a,c=e.sensitive,p=void 0!==c&&c;return[].concat(r).reduce((function(n,e){if(!e&&""!==e)return null;if(n)return n;var r=function(t,n){var e=""+n.end+n.strict+n.sensitive,r=x[e]||(x[e]={});if(r[t])return r[t];var o=[],i={regexp:s()(t,o,n),keys:o};return E<1e4&&(r[t]=i,E++),i}(e,{end:i,strict:u,sensitive:p}),o=r.regexp,a=r.keys,c=o.exec(t);if(!c)return null;var l=c[0],f=c.slice(1),h=t===l;return i&&!h?null:{path:e,url:"/"===e&&""===l?"/":l,isExact:h,params:a.reduce((function(t,n,e){return t[n.name]=f[e],t}),{})}}),null)}var w=function(t){function n(){return t.apply(this,arguments)||this}return(0,r.Z)(n,t),n.prototype.render=function(){var t=this;return o.createElement(f.Consumer,null,(function(n){n||(0,u.Z)(!1);var e=t.props.location||n.location,r=t.props.computedMatch?t.props.computedMatch:t.props.path?C(e.pathname,t.props):n.match,i=(0,c.Z)({},n,{location:e,match:r}),a=t.props,p=a.children,s=a.component,l=a.render;return Array.isArray(p)&&0===p.length&&(p=null),o.createElement(f.Provider,{value:i},i.match?p?"function"==typeof p?p(i):p:s?o.createElement(s,i):l?l(i):null:"function"==typeof p?p(i):null)}))},n}(o.Component);o.Component;var k=function(t){function n(){return t.apply(this,arguments)||this}return(0,r.Z)(n,t),n.prototype.render=function(){var t=this;return o.createElement(f.Consumer,null,(function(n){n||(0,u.Z)(!1);var e,r,i=t.props.location||n.location;return o.Children.forEach(t.props.children,(function(t){if(null==r&&o.isValidElement(t)){e=t;var a=t.props.path||t.props.from;r=a?C(i.pathname,(0,c.Z)({},t.props,{path:a})):n.match}})),r?o.cloneElement(e,{location:i,computedMatch:r}):null}))},n}(o.Component),M=o.useContext;function U(){return M(l)}function b(){return M(f).location}function R(){var t=M(f).match;return t?t.params:{}}},76585:function(t){t.exports=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)}},39658:function(t,n,e){var r=e(76585);t.exports=function t(n,e,o){return r(e)||(o=e||o,e=[]),o=o||{},n instanceof RegExp?function(t,n){var e=t.source.match(/\((?!\?)/g);if(e)for(var r=0;r<e.length;r++)n.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return s(t,n)}(n,e):r(n)?function(n,e,r){for(var o=[],i=0;i<n.length;i++)o.push(t(n[i],e,r).source);return s(new RegExp("(?:"+o.join("|")+")",l(r)),e)}(n,e,o):function(t,n,e){return f(i(t,e),n,e)}(n,e,o)},t.exports.parse=i,t.exports.compile=function(t,n){return u(i(t,n),n)},t.exports.tokensToFunction=u,t.exports.tokensToRegExp=f;var o=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function i(t,n){for(var e,r=[],i=0,a=0,u="",s=n&&n.delimiter||"/";null!=(e=o.exec(t));){var l=e[0],f=e[1],h=e.index;if(u+=t.slice(a,h),a=h+l.length,f)u+=f[1];else{var m=t[a],d=e[2],v=e[3],y=e[4],g=e[5],x=e[6],E=e[7];u&&(r.push(u),u="");var C=null!=d&&null!=m&&m!==d,w="+"===x||"*"===x,k="?"===x||"*"===x,M=e[2]||s,U=y||g;r.push({name:v||i++,prefix:d||"",delimiter:M,optional:k,repeat:w,partial:C,asterisk:!!E,pattern:U?p(U):E?".*":"[^"+c(M)+"]+?"})}}return a<t.length&&(u+=t.substr(a)),u&&r.push(u),r}function a(t){return encodeURI(t).replace(/[\/?#]/g,(function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()}))}function u(t,n){for(var e=new Array(t.length),o=0;o<t.length;o++)"object"==typeof t[o]&&(e[o]=new RegExp("^(?:"+t[o].pattern+")$",l(n)));return function(n,o){for(var i="",u=n||{},c=(o||{}).pretty?a:encodeURIComponent,p=0;p<t.length;p++){var s=t[p];if("string"!=typeof s){var l,f=u[s.name];if(null==f){if(s.optional){s.partial&&(i+=s.prefix);continue}throw new TypeError('Expected "'+s.name+'" to be defined')}if(r(f)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but received `'+JSON.stringify(f)+"`");if(0===f.length){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var h=0;h<f.length;h++){if(l=c(f[h]),!e[p].test(l))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'", but received `'+JSON.stringify(l)+"`");i+=(0===h?s.prefix:s.delimiter)+l}}else{if(l=s.asterisk?encodeURI(f).replace(/[?#]/g,(function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})):c(f),!e[p].test(l))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but received "'+l+'"');i+=s.prefix+l}}else i+=s}return i}}function c(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function p(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function s(t,n){return t.keys=n,t}function l(t){return t&&t.sensitive?"":"i"}function f(t,n,e){r(n)||(e=n||e,n=[]);for(var o=(e=e||{}).strict,i=!1!==e.end,a="",u=0;u<t.length;u++){var p=t[u];if("string"==typeof p)a+=c(p);else{var f=c(p.prefix),h="(?:"+p.pattern+")";n.push(p),p.repeat&&(h+="(?:"+f+h+")*"),a+=h=p.optional?p.partial?f+"("+h+")?":"(?:"+f+"("+h+"))?":f+"("+h+")"}}var m=c(e.delimiter||"/"),d=a.slice(-m.length)===m;return o||(a=(d?a.slice(0,-m.length):a)+"(?:"+m+"(?=$))?"),a+=i?"$":o&&d?"":"(?="+m+"|$)",s(new RegExp("^"+a,l(e)),n)}}}]);
//# sourceMappingURL=npm.react-router.3255e3cea2d414891c43cf659ec9dcb8.js.map