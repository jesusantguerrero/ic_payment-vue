/*!
 * Vue.js v2.4.0
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Vue=e()}(this,function(){"use strict";function t(t){return void 0===t||null===t}function e(t){return void 0!==t&&null!==t}function n(t){return!0===t}function r(t){return!1===t}function i(t){return"string"==typeof t||"number"==typeof t}function o(t){return null!==t&&"object"==typeof t}function a(t){return"[object Object]"===di.call(t)}function s(t){return"[object RegExp]"===di.call(t)}function c(t){var e=parseFloat(t);return e>=0&&Math.floor(e)===e&&isFinite(t)}function u(t){return null==t?"":"object"==typeof t?JSON.stringify(t,null,2):String(t)}function l(t){var e=parseFloat(t);return isNaN(e)?t:e}function f(t,e){for(var n=Object.create(null),r=t.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return e?function(t){return n[t.toLowerCase()]}:function(t){return n[t]}}function p(t,e){if(t.length){var n=t.indexOf(e);if(n>-1)return t.splice(n,1)}}function d(t,e){return mi.call(t,e)}function v(t){var e=Object.create(null);return function(n){return e[n]||(e[n]=t(n))}}function h(t,e){function n(n){var r=arguments.length;return r?r>1?t.apply(e,arguments):t.call(e,n):t.call(e)}return n._length=t.length,n}function m(t,e){e=e||0;for(var n=t.length-e,r=new Array(n);n--;)r[n]=t[n+e];return r}function y(t,e){for(var n in e)t[n]=e[n];return t}function g(t){for(var e={},n=0;n<t.length;n++)t[n]&&y(e,t[n]);return e}function _(t,e,n){}function b(t,e){var n=o(t),r=o(e);if(!n||!r)return!n&&!r&&String(t)===String(e);try{return JSON.stringify(t)===JSON.stringify(e)}catch(n){return t===e}}function $(t,e){for(var n=0;n<t.length;n++)if(b(t[n],e))return n;return-1}function C(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}function w(t){var e=(t+"").charCodeAt(0);return 36===e||95===e}function x(t,e,n,r){Object.defineProperty(t,e,{value:n,enumerable:!!r,writable:!0,configurable:!0})}function A(t){if(!Ti.test(t)){var e=t.split(".");return function(t){for(var n=0;n<e.length;n++){if(!t)return;t=t[e[n]]}return t}}}function k(t,e,n){if(Oi.errorHandler)Oi.errorHandler.call(null,t,e,n);else{if(!Ni||"undefined"==typeof console)throw t;console.error(t)}}function O(t){return"function"==typeof t&&/native code/.test(t.toString())}function S(t){Zi.target&&Yi.push(Zi.target),Zi.target=t}function T(){Zi.target=Yi.pop()}function E(t,e,n){t.__proto__=e}function j(t,e,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];x(t,o,e[o])}}function N(t,e){if(o(t)){var n;return d(t,"__ob__")&&t.__ob__ instanceof no?n=t.__ob__:eo.shouldConvert&&!Ki()&&(Array.isArray(t)||a(t))&&Object.isExtensible(t)&&!t._isVue&&(n=new no(t)),e&&n&&n.vmCount++,n}}function L(t,e,n,r,i){var o=new Zi,a=Object.getOwnPropertyDescriptor(t,e);if(!a||!1!==a.configurable){var s=a&&a.get,c=a&&a.set,u=!i&&N(n);Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var e=s?s.call(t):n;return Zi.target&&(o.depend(),u&&u.dep.depend(),Array.isArray(e)&&D(e)),e},set:function(e){var r=s?s.call(t):n;e===r||e!==e&&r!==r||(c?c.call(t,e):n=e,u=!i&&N(e),o.notify())}})}}function I(t,e,n){if(Array.isArray(t)&&c(e))return t.length=Math.max(t.length,e),t.splice(e,1,n),n;if(d(t,e))return t[e]=n,n;var r=t.__ob__;return t._isVue||r&&r.vmCount?n:r?(L(r.value,e,n),r.dep.notify(),n):(t[e]=n,n)}function M(t,e){if(Array.isArray(t)&&c(e))t.splice(e,1);else{var n=t.__ob__;t._isVue||n&&n.vmCount||d(t,e)&&(delete t[e],n&&n.dep.notify())}}function D(t){for(var e=void 0,n=0,r=t.length;n<r;n++)(e=t[n])&&e.__ob__&&e.__ob__.dep.depend(),Array.isArray(e)&&D(e)}function P(t,e){if(!e)return t;for(var n,r,i,o=Object.keys(e),s=0;s<o.length;s++)r=t[n=o[s]],i=e[n],d(t,n)?a(r)&&a(i)&&P(r,i):I(t,n,i);return t}function F(t,e,n){return n?t||e?function(){var r="function"==typeof e?e.call(n):e,i="function"==typeof t?t.call(n):void 0;return r?P(r,i):i}:void 0:e?t?function(){return P("function"==typeof e?e.call(this):e,t.call(this))}:e:t}function R(t,e){return e?t?t.concat(e):Array.isArray(e)?e:[e]:t}function H(t,e){var n=Object.create(t||null);return e?y(n,e):n}function B(t){var e=t.props;if(e){var n,r,i={};if(Array.isArray(e))for(n=e.length;n--;)"string"==typeof(r=e[n])&&(i[gi(r)]={type:null});else if(a(e))for(var o in e)r=e[o],i[gi(o)]=a(r)?r:{type:r};t.props=i}}function U(t){var e=t.inject;if(Array.isArray(e))for(var n=t.inject={},r=0;r<e.length;r++)n[e[r]]=e[r]}function V(t){var e=t.directives;if(e)for(var n in e){var r=e[n];"function"==typeof r&&(e[n]={bind:r,update:r})}}function z(t,e,n){function r(r){var i=ro[r]||io;c[r]=i(t[r],e[r],n,r)}"function"==typeof e&&(e=e.options),B(e),U(e),V(e);var i=e.extends;if(i&&(t=z(t,i,n)),e.mixins)for(var o=0,a=e.mixins.length;o<a;o++)t=z(t,e.mixins[o],n);var s,c={};for(s in t)r(s);for(s in e)d(t,s)||r(s);return c}function K(t,e,n,r){if("string"==typeof n){var i=t[e];if(d(i,n))return i[n];var o=gi(n);if(d(i,o))return i[o];var a=_i(o);if(d(i,a))return i[a];var s=i[n]||i[o]||i[a];return s}}function J(t,e,n,r){var i=e[t],o=!d(n,t),a=n[t];if(G(Boolean,i.type)&&(o&&!d(i,"default")?a=!1:G(String,i.type)||""!==a&&a!==$i(t)||(a=!0)),void 0===a){a=q(r,i,t);var s=eo.shouldConvert;eo.shouldConvert=!0,N(a),eo.shouldConvert=s}return a}function q(t,e,n){if(d(e,"default")){var r=e.default;return t&&t.$options.propsData&&void 0===t.$options.propsData[n]&&void 0!==t._props[n]?t._props[n]:"function"==typeof r&&"Function"!==W(e.type)?r.call(t):r}}function W(t){var e=t&&t.toString().match(/^\s*function (\w+)/);return e?e[1]:""}function G(t,e){if(!Array.isArray(e))return W(e)===W(t);for(var n=0,r=e.length;n<r;n++)if(W(e[n])===W(t))return!0;return!1}function Z(t){return new oo(void 0,void 0,void 0,String(t))}function Y(t){var e=new oo(t.tag,t.data,t.children,t.text,t.elm,t.context,t.componentOptions,t.asyncFactory);return e.ns=t.ns,e.isStatic=t.isStatic,e.key=t.key,e.isComment=t.isComment,e.isCloned=!0,e}function Q(t){for(var e=t.length,n=new Array(e),r=0;r<e;r++)n[r]=Y(t[r]);return n}function X(t){function e(){var t=arguments,n=e.fns;if(!Array.isArray(n))return n.apply(null,arguments);for(var r=n.slice(),i=0;i<r.length;i++)r[i].apply(null,t)}return e.fns=t,e}function tt(e,n,r,i,o){var a,s,c,u;for(a in e)s=e[a],c=n[a],u=uo(a),t(s)||(t(c)?(t(s.fns)&&(s=e[a]=X(s)),r(u.name,s,u.once,u.capture,u.passive)):s!==c&&(c.fns=s,e[a]=c));for(a in n)t(e[a])&&i((u=uo(a)).name,n[a],u.capture)}function et(r,i,o){function a(){o.apply(this,arguments),p(s.fns,a)}var s,c=r[i];t(c)?s=X([a]):e(c.fns)&&n(c.merged)?(s=c).fns.push(a):s=X([c,a]),s.merged=!0,r[i]=s}function nt(n,r,i){var o=r.options.props;if(!t(o)){var a={},s=n.attrs,c=n.props;if(e(s)||e(c))for(var u in o){var l=$i(u);rt(a,c,u,l,!0)||rt(a,s,u,l,!1)}return a}}function rt(t,n,r,i,o){if(e(n)){if(d(n,r))return t[r]=n[r],o||delete n[r],!0;if(d(n,i))return t[r]=n[i],o||delete n[i],!0}return!1}function it(t){for(var e=0;e<t.length;e++)if(Array.isArray(t[e]))return Array.prototype.concat.apply([],t);return t}function ot(t){return i(t)?[Z(t)]:Array.isArray(t)?st(t):void 0}function at(t){return e(t)&&e(t.text)&&r(t.isComment)}function st(r,o){var a,s,c,u=[];for(a=0;a<r.length;a++)t(s=r[a])||"boolean"==typeof s||(c=u[u.length-1],Array.isArray(s)?u.push.apply(u,st(s,(o||"")+"_"+a)):i(s)?at(c)?c.text+=String(s):""!==s&&u.push(Z(s)):at(s)&&at(c)?u[u.length-1]=Z(c.text+s.text):(n(r._isVList)&&e(s.tag)&&t(s.key)&&e(o)&&(s.key="__vlist"+o+"_"+a+"__"),u.push(s)));return u}function ct(t,e){return t.__esModule&&t.default&&(t=t.default),o(t)?e.extend(t):t}function ut(t,e,n,r,i){var o=co();return o.asyncFactory=t,o.asyncMeta={data:e,context:n,children:r,tag:i},o}function lt(r,i,a){if(n(r.error)&&e(r.errorComp))return r.errorComp;if(e(r.resolved))return r.resolved;if(n(r.loading)&&e(r.loadingComp))return r.loadingComp;if(!e(r.contexts)){var s=r.contexts=[a],c=!0,u=function(){for(var t=0,e=s.length;t<e;t++)s[t].$forceUpdate()},l=C(function(t){r.resolved=ct(t,i),c||u()}),f=C(function(t){e(r.errorComp)&&(r.error=!0,u())}),p=r(l,f);return o(p)&&("function"==typeof p.then?t(r.resolved)&&p.then(l,f):e(p.component)&&"function"==typeof p.component.then&&(p.component.then(l,f),e(p.error)&&(r.errorComp=ct(p.error,i)),e(p.loading)&&(r.loadingComp=ct(p.loading,i),0===p.delay?r.loading=!0:setTimeout(function(){t(r.resolved)&&t(r.error)&&(r.loading=!0,u())},p.delay||200)),e(p.timeout)&&setTimeout(function(){t(r.resolved)&&f(null)},p.timeout))),c=!1,r.loading?r.loadingComp:r.resolved}r.contexts.push(a)}function ft(t){if(Array.isArray(t))for(var n=0;n<t.length;n++){var r=t[n];if(e(r)&&e(r.componentOptions))return r}}function pt(t){t._events=Object.create(null),t._hasHookEvent=!1;var e=t.$options._parentListeners;e&&ht(t,e)}function dt(t,e,n){n?so.$once(t,e):so.$on(t,e)}function vt(t,e){so.$off(t,e)}function ht(t,e,n){so=t,tt(e,n||{},dt,vt,t)}function mt(t,e){var n={};if(!t)return n;for(var r=[],i=0,o=t.length;i<o;i++){var a=t[i];if(a.context!==e&&a.functionalContext!==e||!a.data||null==a.data.slot)r.push(a);else{var s=a.data.slot,c=n[s]||(n[s]=[]);"template"===a.tag?c.push.apply(c,a.children):c.push(a)}}return r.every(yt)||(n.default=r),n}function yt(t){return t.isComment||" "===t.text}function gt(t,e){e=e||{};for(var n=0;n<t.length;n++)Array.isArray(t[n])?gt(t[n],e):e[t[n].key]=t[n].fn;return e}function _t(t){var e=t.$options,n=e.parent;if(n&&!e.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(t)}t.$parent=n,t.$root=n?n.$root:t,t.$children=[],t.$refs={},t._watcher=null,t._inactive=null,t._directInactive=!1,t._isMounted=!1,t._isDestroyed=!1,t._isBeingDestroyed=!1}function bt(t,e,n){t.$el=e,t.$options.render||(t.$options.render=co),At(t,"beforeMount");var r;return r=function(){t._update(t._render(),n)},t._watcher=new _o(t,r,_),n=!1,null==t.$vnode&&(t._isMounted=!0,At(t,"mounted")),t}function $t(t,e,n,r,i){var o=!!(i||t.$options._renderChildren||r.data.scopedSlots||t.$scopedSlots!==Si);if(t.$options._parentVnode=r,t.$vnode=r,t._vnode&&(t._vnode.parent=r),t.$options._renderChildren=i,t.$attrs=r.data&&r.data.attrs,t.$listeners=n,e&&t.$options.props){eo.shouldConvert=!1;for(var a=t._props,s=t.$options._propKeys||[],c=0;c<s.length;c++){var u=s[c];a[u]=J(u,t.$options.props,e,t)}eo.shouldConvert=!0,t.$options.propsData=e}if(n){var l=t.$options._parentListeners;t.$options._parentListeners=n,ht(t,n,l)}o&&(t.$slots=mt(i,r.context),t.$forceUpdate())}function Ct(t){for(;t&&(t=t.$parent);)if(t._inactive)return!0;return!1}function wt(t,e){if(e){if(t._directInactive=!1,Ct(t))return}else if(t._directInactive)return;if(t._inactive||null===t._inactive){t._inactive=!1;for(var n=0;n<t.$children.length;n++)wt(t.$children[n]);At(t,"activated")}}function xt(t,e){if(!(e&&(t._directInactive=!0,Ct(t))||t._inactive)){t._inactive=!0;for(var n=0;n<t.$children.length;n++)xt(t.$children[n]);At(t,"deactivated")}}function At(t,e){var n=t.$options[e];if(n)for(var r=0,i=n.length;r<i;r++)try{n[r].call(t)}catch(n){k(n,t,e+" hook")}t._hasHookEvent&&t.$emit("hook:"+e)}function kt(){yo=fo.length=po.length=0,vo={},ho=mo=!1}function Ot(){mo=!0;var t,e;for(fo.sort(function(t,e){return t.id-e.id}),yo=0;yo<fo.length;yo++)e=(t=fo[yo]).id,vo[e]=null,t.run();var n=po.slice(),r=fo.slice();kt(),Et(n),St(r),Ji&&Oi.devtools&&Ji.emit("flush")}function St(t){for(var e=t.length;e--;){var n=t[e],r=n.vm;r._watcher===n&&r._isMounted&&At(r,"updated")}}function Tt(t){t._inactive=!1,po.push(t)}function Et(t){for(var e=0;e<t.length;e++)t[e]._inactive=!0,wt(t[e],!0)}function jt(t){var e=t.id;if(null==vo[e]){if(vo[e]=!0,mo){for(var n=fo.length-1;n>yo&&fo[n].id>t.id;)n--;fo.splice(n+1,0,t)}else fo.push(t);ho||(ho=!0,Wi(Ot))}}function Nt(t){bo.clear(),Lt(t,bo)}function Lt(t,e){var n,r,i=Array.isArray(t);if((i||o(t))&&Object.isExtensible(t)){if(t.__ob__){var a=t.__ob__.dep.id;if(e.has(a))return;e.add(a)}if(i)for(n=t.length;n--;)Lt(t[n],e);else for(n=(r=Object.keys(t)).length;n--;)Lt(t[r[n]],e)}}function It(t,e,n){$o.get=function(){return this[e][n]},$o.set=function(t){this[e][n]=t},Object.defineProperty(t,n,$o)}function Mt(t){t._watchers=[];var e=t.$options;e.props&&Dt(t,e.props),e.methods&&Ut(t,e.methods),e.data?Pt(t):N(t._data={},!0),e.computed&&Rt(t,e.computed),e.watch&&e.watch!==Hi&&Vt(t,e.watch)}function Dt(t,e){var n=t.$options.propsData||{},r=t._props={},i=t.$options._propKeys=[],o=!t.$parent;eo.shouldConvert=o;for(var a in e)!function(o){i.push(o);var a=J(o,e,n,t);L(r,o,a),o in t||It(t,"_props",o)}(a);eo.shouldConvert=!0}function Pt(t){var e=t.$options.data;a(e=t._data="function"==typeof e?Ft(e,t):e||{})||(e={});for(var n=Object.keys(e),r=t.$options.props,i=(t.$options.methods,n.length);i--;){var o=n[i];r&&d(r,o)||w(o)||It(t,"_data",o)}N(e,!0)}function Ft(t,e){try{return t.call(e)}catch(t){return k(t,e,"data()"),{}}}function Rt(t,e){var n=t._computedWatchers=Object.create(null);for(var r in e){var i=e[r],o="function"==typeof i?i:i.get;n[r]=new _o(t,o,_,Co),r in t||Ht(t,r,i)}}function Ht(t,e,n){"function"==typeof n?($o.get=Bt(e),$o.set=_):($o.get=n.get?!1!==n.cache?Bt(e):n.get:_,$o.set=n.set?n.set:_),Object.defineProperty(t,e,$o)}function Bt(t){return function(){var e=this._computedWatchers&&this._computedWatchers[t];if(e)return e.dirty&&e.evaluate(),Zi.target&&e.depend(),e.value}}function Ut(t,e){t.$options.props;for(var n in e)t[n]=null==e[n]?_:h(e[n],t)}function Vt(t,e){for(var n in e){var r=e[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)zt(t,n,r[i]);else zt(t,n,r)}}function zt(t,e,n,r){return a(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=t[n]),t.$watch(e,n,r)}function Kt(t){var e=t.$options.provide;e&&(t._provided="function"==typeof e?e.call(t):e)}function Jt(t){var e=qt(t.$options.inject,t);e&&(eo.shouldConvert=!1,Object.keys(e).forEach(function(n){L(t,n,e[n])}),eo.shouldConvert=!0)}function qt(t,e){if(t){for(var n=Object.create(null),r=qi?Reflect.ownKeys(t):Object.keys(t),i=0;i<r.length;i++)for(var o=r[i],a=t[o],s=e;s;){if(s._provided&&a in s._provided){n[o]=s._provided[a];break}s=s.$parent}return n}}function Wt(t,n,r,i,o){var a={},s=t.options.props;if(e(s))for(var c in s)a[c]=J(c,s,n||{});else e(r.attrs)&&Gt(a,r.attrs),e(r.props)&&Gt(a,r.props);var u=Object.create(i),l=t.options.render.call(null,function(t,e,n,r){return ee(u,t,e,n,r,!0)},{data:r,props:a,children:o,parent:i,listeners:r.on||{},injections:qt(t.options.inject,i),slots:function(){return mt(o,i)}});return l instanceof oo&&(l.functionalContext=i,l.functionalOptions=t.options,r.slot&&((l.data||(l.data={})).slot=r.slot)),l}function Gt(t,e){for(var n in e)t[gi(n)]=e[n]}function Zt(r,i,a,s,c){if(!t(r)){var u=a.$options._base;if(o(r)&&(r=u.extend(r)),"function"==typeof r){var l;if(t(r.cid)&&(l=r,void 0===(r=lt(l,u,a))))return ut(l,i,a,s,c);i=i||{},me(r),e(i.model)&&te(r.options,i);var f=nt(i,r,c);if(n(r.options.functional))return Wt(r,f,i,a,s);var p=i.on;if(n(r.options.abstract)){var d=i.slot;i={},d&&(i.slot=d)}Qt(i);var v=r.options.name||c;return new oo("vue-component-"+r.cid+(v?"-"+v:""),i,void 0,void 0,void 0,a,{Ctor:r,propsData:f,listeners:p,tag:c,children:s},l)}}}function Yt(t,n,r,i){var o=t.componentOptions,a={_isComponent:!0,parent:n,propsData:o.propsData,_componentTag:o.tag,_parentVnode:t,_parentListeners:o.listeners,_renderChildren:o.children,_parentElm:r||null,_refElm:i||null},s=t.data.inlineTemplate;return e(s)&&(a.render=s.render,a.staticRenderFns=s.staticRenderFns),new o.Ctor(a)}function Qt(t){t.hook||(t.hook={});for(var e=0;e<xo.length;e++){var n=xo[e],r=t.hook[n],i=wo[n];t.hook[n]=r?Xt(i,r):i}}function Xt(t,e){return function(n,r,i,o){t(n,r,i,o),e(n,r,i,o)}}function te(t,n){var r=t.model&&t.model.prop||"value",i=t.model&&t.model.event||"input";(n.props||(n.props={}))[r]=n.model.value;var o=n.on||(n.on={});e(o[i])?o[i]=[n.model.callback].concat(o[i]):o[i]=n.model.callback}function ee(t,e,r,o,a,s){return(Array.isArray(r)||i(r))&&(a=o,o=r,r=void 0),n(s)&&(a=ko),ne(t,e,r,o,a)}function ne(t,n,r,i,o){if(e(r)&&e(r.__ob__))return co();if(e(r)&&e(r.is)&&(n=r.is),!n)return co();Array.isArray(i)&&"function"==typeof i[0]&&((r=r||{}).scopedSlots={default:i[0]},i.length=0),o===ko?i=ot(i):o===Ao&&(i=it(i));var a,s;if("string"==typeof n){var c;s=Oi.getTagNamespace(n),a=Oi.isReservedTag(n)?new oo(Oi.parsePlatformTagName(n),r,i,void 0,void 0,t):e(c=K(t.$options,"components",n))?Zt(c,r,t,i,n):new oo(n,r,i,void 0,void 0,t)}else a=Zt(n,r,t,i);return e(a)?(s&&re(a,s),a):co()}function re(n,r){if(n.ns=r,"foreignObject"!==n.tag&&e(n.children))for(var i=0,o=n.children.length;i<o;i++){var a=n.children[i];e(a.tag)&&t(a.ns)&&re(a,r)}}function ie(t,n){var r,i,a,s,c;if(Array.isArray(t)||"string"==typeof t)for(r=new Array(t.length),i=0,a=t.length;i<a;i++)r[i]=n(t[i],i);else if("number"==typeof t)for(r=new Array(t),i=0;i<t;i++)r[i]=n(i+1,i);else if(o(t))for(s=Object.keys(t),r=new Array(s.length),i=0,a=s.length;i<a;i++)c=s[i],r[i]=n(t[c],c,i);return e(r)&&(r._isVList=!0),r}function oe(t,e,n,r){var i=this.$scopedSlots[t];if(i)return n=n||{},r&&(n=y(y({},r),n)),i(n)||e;var o=this.$slots[t];return o||e}function ae(t){return K(this.$options,"filters",t,!0)||wi}function se(t,e,n){var r=Oi.keyCodes[e]||n;return Array.isArray(r)?-1===r.indexOf(t):r!==t}function ce(t,e,n,r,i){if(n)if(o(n)){Array.isArray(n)&&(n=g(n));var a;for(var s in n)!function(o){if("class"===o||"style"===o||hi(o))a=t;else{var s=t.attrs&&t.attrs.type;a=r||Oi.mustUseProp(e,s,o)?t.domProps||(t.domProps={}):t.attrs||(t.attrs={})}o in a||(a[o]=n[o],i&&((t.on||(t.on={}))["update:"+o]=function(t){n[o]=t}))}(s)}else;return t}function ue(t,e){var n=this._staticTrees[t];return n&&!e?Array.isArray(n)?Q(n):Y(n):(n=this._staticTrees[t]=this.$options.staticRenderFns[t].call(this._renderProxy),fe(n,"__static__"+t,!1),n)}function le(t,e,n){return fe(t,"__once__"+e+(n?"_"+n:""),!0),t}function fe(t,e,n){if(Array.isArray(t))for(var r=0;r<t.length;r++)t[r]&&"string"!=typeof t[r]&&pe(t[r],e+"_"+r,n);else pe(t,e,n)}function pe(t,e,n){t.isStatic=!0,t.key=e,t.isOnce=n}function de(t,e){if(e)if(a(e)){var n=t.on=t.on?y({},t.on):{};for(var r in e){var i=n[r],o=e[r];n[r]=i?[].concat(o,i):o}}else;return t}function ve(t){t._vnode=null,t._staticTrees=null;var e=t.$vnode=t.$options._parentVnode,n=e&&e.context;t.$slots=mt(t.$options._renderChildren,n),t.$scopedSlots=Si,t._c=function(e,n,r,i){return ee(t,e,n,r,i,!1)},t.$createElement=function(e,n,r,i){return ee(t,e,n,r,i,!0)};var r=e&&e.data;L(t,"$attrs",r&&r.attrs,null,!0),L(t,"$listeners",r&&r.on,null,!0)}function he(t,e){var n=t.$options=Object.create(t.constructor.options);n.parent=e.parent,n.propsData=e.propsData,n._parentVnode=e._parentVnode,n._parentListeners=e._parentListeners,n._renderChildren=e._renderChildren,n._componentTag=e._componentTag,n._parentElm=e._parentElm,n._refElm=e._refElm,e.render&&(n.render=e.render,n.staticRenderFns=e.staticRenderFns)}function me(t){var e=t.options;if(t.super){var n=me(t.super);if(n!==t.superOptions){t.superOptions=n;var r=ye(t);r&&y(t.extendOptions,r),(e=t.options=z(n,t.extendOptions)).name&&(e.components[e.name]=t)}}return e}function ye(t){var e,n=t.options,r=t.extendOptions,i=t.sealedOptions;for(var o in n)n[o]!==i[o]&&(e||(e={}),e[o]=ge(n[o],r[o],i[o]));return e}function ge(t,e,n){if(Array.isArray(t)){var r=[];n=Array.isArray(n)?n:[n],e=Array.isArray(e)?e:[e];for(var i=0;i<t.length;i++)(e.indexOf(t[i])>=0||n.indexOf(t[i])<0)&&r.push(t[i]);return r}return t}function _e(t){this._init(t)}function be(t){t.use=function(t){var e=this._installedPlugins||(this._installedPlugins=[]);if(e.indexOf(t)>-1)return this;var n=m(arguments,1);return n.unshift(this),"function"==typeof t.install?t.install.apply(t,n):"function"==typeof t&&t.apply(null,n),e.push(t),this}}function $e(t){t.mixin=function(t){return this.options=z(this.options,t),this}}function Ce(t){t.cid=0;var e=1;t.extend=function(t){t=t||{};var n=this,r=n.cid,i=t._Ctor||(t._Ctor={});if(i[r])return i[r];var o=t.name||n.options.name,a=function(t){this._init(t)};return a.prototype=Object.create(n.prototype),a.prototype.constructor=a,a.cid=e++,a.options=z(n.options,t),a.super=n,a.options.props&&we(a),a.options.computed&&xe(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,Ai.forEach(function(t){a[t]=n[t]}),o&&(a.options.components[o]=a),a.superOptions=n.options,a.extendOptions=t,a.sealedOptions=y({},a.options),i[r]=a,a}}function we(t){var e=t.options.props;for(var n in e)It(t.prototype,"_props",n)}function xe(t){var e=t.options.computed;for(var n in e)Ht(t.prototype,n,e[n])}function Ae(t){Ai.forEach(function(e){t[e]=function(t,n){return n?("component"===e&&a(n)&&(n.name=n.name||t,n=this.options._base.extend(n)),"directive"===e&&"function"==typeof n&&(n={bind:n,update:n}),this.options[e+"s"][t]=n,n):this.options[e+"s"][t]}})}function ke(t){return t&&(t.Ctor.options.name||t.tag)}function Oe(t,e){return Array.isArray(t)?t.indexOf(e)>-1:"string"==typeof t?t.split(",").indexOf(e)>-1:!!s(t)&&t.test(e)}function Se(t,e,n){for(var r in t){var i=t[r];if(i){var o=ke(i.componentOptions);o&&!n(o)&&(i!==e&&Te(i),t[r]=null)}}}function Te(t){t&&t.componentInstance.$destroy()}function Ee(t){for(var n=t.data,r=t,i=t;e(i.componentInstance);)(i=i.componentInstance._vnode).data&&(n=je(i.data,n));for(;e(r=r.parent);)r.data&&(n=je(n,r.data));return Ne(n.staticClass,n.class)}function je(t,n){return{staticClass:Le(t.staticClass,n.staticClass),class:e(t.class)?[t.class,n.class]:n.class}}function Ne(t,n){return e(t)||e(n)?Le(t,Ie(n)):""}function Le(t,e){return t?e?t+" "+e:t:e||""}function Ie(t){return Array.isArray(t)?Me(t):o(t)?De(t):"string"==typeof t?t:""}function Me(t){for(var n,r="",i=0,o=t.length;i<o;i++)e(n=Ie(t[i]))&&""!==n&&(r&&(r+=" "),r+=n);return r}function De(t){var e="";for(var n in t)t[n]&&(e&&(e+=" "),e+=n);return e}function Pe(t){return Zo(t)?"svg":"math"===t?"math":void 0}function Fe(t){if("string"==typeof t){var e=document.querySelector(t);return e||document.createElement("div")}return t}function Re(t,e){var n=t.data.ref;if(n){var r=t.context,i=t.componentInstance||t.elm,o=r.$refs;e?Array.isArray(o[n])?p(o[n],i):o[n]===i&&(o[n]=void 0):t.data.refInFor?Array.isArray(o[n])?o[n].indexOf(i)<0&&o[n].push(i):o[n]=[i]:o[n]=i}}function He(r,i){return r.key===i.key&&(r.tag===i.tag&&r.isComment===i.isComment&&e(r.data)===e(i.data)&&Be(r,i)||n(r.isAsyncPlaceholder)&&r.asyncFactory===i.asyncFactory&&t(i.asyncFactory.error))}function Be(t,n){if("input"!==t.tag)return!0;var r;return(e(r=t.data)&&e(r=r.attrs)&&r.type)===(e(r=n.data)&&e(r=r.attrs)&&r.type)}function Ue(t,n,r){var i,o,a={};for(i=n;i<=r;++i)e(o=t[i].key)&&(a[o]=i);return a}function Ve(t,e){(t.data.directives||e.data.directives)&&ze(t,e)}function ze(t,e){var n,r,i,o=t===ea,a=e===ea,s=Ke(t.data.directives,t.context),c=Ke(e.data.directives,e.context),u=[],l=[];for(n in c)r=s[n],i=c[n],r?(i.oldValue=r.value,qe(i,"update",e,t),i.def&&i.def.componentUpdated&&l.push(i)):(qe(i,"bind",e,t),i.def&&i.def.inserted&&u.push(i));if(u.length){var f=function(){for(var n=0;n<u.length;n++)qe(u[n],"inserted",e,t)};o?et(e.data.hook||(e.data.hook={}),"insert",f):f()}if(l.length&&et(e.data.hook||(e.data.hook={}),"postpatch",function(){for(var n=0;n<l.length;n++)qe(l[n],"componentUpdated",e,t)}),!o)for(n in s)c[n]||qe(s[n],"unbind",t,t,a)}function Ke(t,e){var n=Object.create(null);if(!t)return n;var r,i;for(r=0;r<t.length;r++)(i=t[r]).modifiers||(i.modifiers=ia),n[Je(i)]=i,i.def=K(e.$options,"directives",i.name,!0);return n}function Je(t){return t.rawName||t.name+"."+Object.keys(t.modifiers||{}).join(".")}function qe(t,e,n,r,i){var o=t.def&&t.def[e];if(o)try{o(n.elm,t,n,r,i)}catch(r){k(r,n.context,"directive "+t.name+" "+e+" hook")}}function We(n,r){var i=r.componentOptions;if(!(e(i)&&!1===i.Ctor.options.inheritAttrs||t(n.data.attrs)&&t(r.data.attrs))){var o,a,s=r.elm,c=n.data.attrs||{},u=r.data.attrs||{};e(u.__ob__)&&(u=r.data.attrs=y({},u));for(o in u)a=u[o],c[o]!==a&&Ge(s,o,a);Mi&&u.value!==c.value&&Ge(s,"value",u.value);for(o in c)t(u[o])&&(Ko(o)?s.removeAttributeNS(zo,Jo(o)):Uo(o)||s.removeAttribute(o))}}function Ge(t,e,n){Vo(e)?qo(n)?t.removeAttribute(e):t.setAttribute(e,e):Uo(e)?t.setAttribute(e,qo(n)||"false"===n?"false":"true"):Ko(e)?qo(n)?t.removeAttributeNS(zo,Jo(e)):t.setAttributeNS(zo,e,n):qo(n)?t.removeAttribute(e):t.setAttribute(e,n)}function Ze(n,r){var i=r.elm,o=r.data,a=n.data;if(!(t(o.staticClass)&&t(o.class)&&(t(a)||t(a.staticClass)&&t(a.class)))){var s=Ee(r),c=i._transitionClasses;e(c)&&(s=Le(s,Ie(c))),s!==i._prevClass&&(i.setAttribute("class",s),i._prevClass=s)}}function Ye(t){function e(){(a||(a=[])).push(t.slice(v,i).trim()),v=i+1}var n,r,i,o,a,s=!1,c=!1,u=!1,l=!1,f=0,p=0,d=0,v=0;for(i=0;i<t.length;i++)if(r=n,n=t.charCodeAt(i),s)39===n&&92!==r&&(s=!1);else if(c)34===n&&92!==r&&(c=!1);else if(u)96===n&&92!==r&&(u=!1);else if(l)47===n&&92!==r&&(l=!1);else if(124!==n||124===t.charCodeAt(i+1)||124===t.charCodeAt(i-1)||f||p||d){switch(n){case 34:c=!0;break;case 39:s=!0;break;case 96:u=!0;break;case 40:d++;break;case 41:d--;break;case 91:p++;break;case 93:p--;break;case 123:f++;break;case 125:f--}if(47===n){for(var h=i-1,m=void 0;h>=0&&" "===(m=t.charAt(h));h--);m&&ca.test(m)||(l=!0)}}else void 0===o?(v=i+1,o=t.slice(0,i).trim()):e();if(void 0===o?o=t.slice(0,i).trim():0!==v&&e(),a)for(i=0;i<a.length;i++)o=Qe(o,a[i]);return o}function Qe(t,e){var n=e.indexOf("(");return n<0?'_f("'+e+'")('+t+")":'_f("'+e.slice(0,n)+'")('+t+","+e.slice(n+1)}function Xe(t){console.error("[Vue compiler]: "+t)}function tn(t,e){return t?t.map(function(t){return t[e]}).filter(function(t){return t}):[]}function en(t,e,n){(t.props||(t.props=[])).push({name:e,value:n})}function nn(t,e,n){(t.attrs||(t.attrs=[])).push({name:e,value:n})}function rn(t,e,n,r,i,o){(t.directives||(t.directives=[])).push({name:e,rawName:n,value:r,arg:i,modifiers:o})}function on(t,e,n,r,i,o){r&&r.capture&&(delete r.capture,e="!"+e),r&&r.once&&(delete r.once,e="~"+e),r&&r.passive&&(delete r.passive,e="&"+e);var a;r&&r.native?(delete r.native,a=t.nativeEvents||(t.nativeEvents={})):a=t.events||(t.events={});var s={value:n,modifiers:r},c=a[e];Array.isArray(c)?i?c.unshift(s):c.push(s):a[e]=c?i?[s,c]:[c,s]:s}function an(t,e,n){var r=sn(t,":"+e)||sn(t,"v-bind:"+e);if(null!=r)return Ye(r);if(!1!==n){var i=sn(t,e);if(null!=i)return JSON.stringify(i)}}function sn(t,e){var n;if(null!=(n=t.attrsMap[e]))for(var r=t.attrsList,i=0,o=r.length;i<o;i++)if(r[i].name===e){r.splice(i,1);break}return n}function cn(t,e,n){var r=n||{},i=r.number,o="$$v";r.trim&&(o="(typeof $$v === 'string'? $$v.trim(): $$v)"),i&&(o="_n("+o+")");var a=un(e,o);t.model={value:"("+e+")",expression:'"'+e+'"',callback:"function ($$v) {"+a+"}"}}function un(t,e){var n=ln(t);return null===n.idx?t+"="+e:"$set("+n.exp+", "+n.idx+", "+e+")"}function ln(t){if(jo=t,Eo=jo.length,Lo=Io=Mo=0,t.indexOf("[")<0||t.lastIndexOf("]")<Eo-1)return{exp:t,idx:null};for(;!pn();)dn(No=fn())?hn(No):91===No&&vn(No);return{exp:t.substring(0,Io),idx:t.substring(Io+1,Mo)}}function fn(){return jo.charCodeAt(++Lo)}function pn(){return Lo>=Eo}function dn(t){return 34===t||39===t}function vn(t){var e=1;for(Io=Lo;!pn();)if(t=fn(),dn(t))hn(t);else if(91===t&&e++,93===t&&e--,0===e){Mo=Lo;break}}function hn(t){for(var e=t;!pn()&&(t=fn())!==e;);}function mn(t,e,n){var r=n&&n.number,i=an(t,"value")||"null",o=an(t,"true-value")||"true",a=an(t,"false-value")||"false";en(t,"checked","Array.isArray("+e+")?_i("+e+","+i+")>-1"+("true"===o?":("+e+")":":_q("+e+","+o+")")),on(t,la,"var $$a="+e+",$$el=$event.target,$$c=$$el.checked?("+o+"):("+a+");if(Array.isArray($$a)){var $$v="+(r?"_n("+i+")":i)+",$$i=_i($$a,$$v);if($$c){$$i<0&&("+e+"=$$a.concat($$v))}else{$$i>-1&&("+e+"=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{"+un(e,"$$c")+"}",null,!0)}function yn(t,e,n){var r=n&&n.number,i=an(t,"value")||"null";en(t,"checked","_q("+e+","+(i=r?"_n("+i+")":i)+")"),on(t,la,un(e,i),null,!0)}function gn(t,e,n){var r="var $$selectedVal = "+('Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return '+(n&&n.number?"_n(val)":"val")+"})")+";";on(t,"change",r=r+" "+un(e,"$event.target.multiple ? $$selectedVal : $$selectedVal[0]"),null,!0)}function _n(t,e,n){var r=t.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=!o&&"range"!==r,u=o?"change":"range"===r?ua:"input",l="$event.target.value";s&&(l="$event.target.value.trim()"),a&&(l="_n("+l+")");var f=un(e,l);c&&(f="if($event.target.composing)return;"+f),en(t,"value","("+e+")"),on(t,u,f,null,!0),(s||a)&&on(t,"blur","$forceUpdate()")}function bn(t){var n;e(t[ua])&&(t[n=Ii?"change":"input"]=[].concat(t[ua],t[n]||[]),delete t[ua]),e(t[la])&&(t[n=Ri?"click":"change"]=[].concat(t[la],t[n]||[]),delete t[la])}function $n(t,e,n,r,i){if(n){var o=e,a=Po;e=function(n){null!==(1===arguments.length?o(n):o.apply(null,arguments))&&Cn(t,e,r,a)}}Po.addEventListener(t,e,Bi?{capture:r,passive:i}:r)}function Cn(t,e,n,r){(r||Po).removeEventListener(t,e,n)}function wn(n,r){var i=e(r.componentOptions),o=i?n.data.nativeOn:n.data.on,a=i?r.data.nativeOn:r.data.on;t(o)&&t(a)||(a=a||{},o=o||{},Po=r.elm,bn(a),tt(a,o,$n,Cn,r.context))}function xn(n,r){if(!t(n.data.domProps)||!t(r.data.domProps)){var i,o,a=r.elm,s=n.data.domProps||{},c=r.data.domProps||{};e(c.__ob__)&&(c=r.data.domProps=y({},c));for(i in s)t(c[i])&&(a[i]="");for(i in c)if(o=c[i],"textContent"!==i&&"innerHTML"!==i||(r.children&&(r.children.length=0),o!==s[i]))if("value"===i){a._value=o;var u=t(o)?"":String(o);An(a,r,u)&&(a.value=u)}else a[i]=o}}function An(t,e,n){return!t.composing&&("option"===e.tag||kn(t,n)||On(t,n))}function kn(t,e){return document.activeElement!==t&&t.value!==e}function On(t,n){var r=t.value,i=t._vModifiers;return e(i)&&i.number?l(r)!==l(n):e(i)&&i.trim?r.trim()!==n.trim():r!==n}function Sn(t){var e=Tn(t.style);return t.staticStyle?y(t.staticStyle,e):e}function Tn(t){return Array.isArray(t)?g(t):"string"==typeof t?da(t):t}function En(t,e){var n,r={};if(e)for(var i=t;i.componentInstance;)(i=i.componentInstance._vnode).data&&(n=Sn(i.data))&&y(r,n);(n=Sn(t.data))&&y(r,n);for(var o=t;o=o.parent;)o.data&&(n=Sn(o.data))&&y(r,n);return r}function jn(n,r){var i=r.data,o=n.data;if(!(t(i.staticStyle)&&t(i.style)&&t(o.staticStyle)&&t(o.style))){var a,s,c=r.elm,u=o.staticStyle,l=o.normalizedStyle||o.style||{},f=u||l,p=Tn(r.data.style)||{};r.data.normalizedStyle=e(p.__ob__)?y({},p):p;var d=En(r,!0);for(s in f)t(d[s])&&ma(c,s,"");for(s in d)(a=d[s])!==f[s]&&ma(c,s,null==a?"":a)}}function Nn(t,e){if(e&&(e=e.trim()))if(t.classList)e.indexOf(" ")>-1?e.split(/\s+/).forEach(function(e){return t.classList.add(e)}):t.classList.add(e);else{var n=" "+(t.getAttribute("class")||"")+" ";n.indexOf(" "+e+" ")<0&&t.setAttribute("class",(n+e).trim())}}function Ln(t,e){if(e&&(e=e.trim()))if(t.classList)e.indexOf(" ")>-1?e.split(/\s+/).forEach(function(e){return t.classList.remove(e)}):t.classList.remove(e),t.classList.length||t.removeAttribute("class");else{for(var n=" "+(t.getAttribute("class")||"")+" ",r=" "+e+" ";n.indexOf(r)>=0;)n=n.replace(r," ");(n=n.trim())?t.setAttribute("class",n):t.removeAttribute("class")}}function In(t){if(t){if("object"==typeof t){var e={};return!1!==t.css&&y(e,ba(t.name||"v")),y(e,t),e}return"string"==typeof t?ba(t):void 0}}function Mn(t){Sa(function(){Sa(t)})}function Dn(t,e){var n=t._transitionClasses||(t._transitionClasses=[]);n.indexOf(e)<0&&(n.push(e),Nn(t,e))}function Pn(t,e){t._transitionClasses&&p(t._transitionClasses,e),Ln(t,e)}function Fn(t,e,n){var r=Rn(t,e),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===Ca?Aa:Oa,c=0,u=function(){t.removeEventListener(s,l),n()},l=function(e){e.target===t&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),t.addEventListener(s,l)}function Rn(t,e){var n,r=window.getComputedStyle(t),i=r[xa+"Delay"].split(", "),o=r[xa+"Duration"].split(", "),a=Hn(i,o),s=r[ka+"Delay"].split(", "),c=r[ka+"Duration"].split(", "),u=Hn(s,c),l=0,f=0;return e===Ca?a>0&&(n=Ca,l=a,f=o.length):e===wa?u>0&&(n=wa,l=u,f=c.length):f=(n=(l=Math.max(a,u))>0?a>u?Ca:wa:null)?n===Ca?o.length:c.length:0,{type:n,timeout:l,propCount:f,hasTransform:n===Ca&&Ta.test(r[xa+"Property"])}}function Hn(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max.apply(null,e.map(function(e,n){return Bn(e)+Bn(t[n])}))}function Bn(t){return 1e3*Number(t.slice(0,-1))}function Un(n,r){var i=n.elm;e(i._leaveCb)&&(i._leaveCb.cancelled=!0,i._leaveCb());var a=In(n.data.transition);if(!t(a)&&!e(i._enterCb)&&1===i.nodeType){for(var s=a.css,c=a.type,u=a.enterClass,f=a.enterToClass,p=a.enterActiveClass,d=a.appearClass,v=a.appearToClass,h=a.appearActiveClass,m=a.beforeEnter,y=a.enter,g=a.afterEnter,_=a.enterCancelled,b=a.beforeAppear,$=a.appear,w=a.afterAppear,x=a.appearCancelled,A=a.duration,k=lo,O=lo.$vnode;O&&O.parent;)k=(O=O.parent).context;var S=!k._isMounted||!n.isRootInsert;if(!S||$||""===$){var T=S&&d?d:u,E=S&&h?h:p,j=S&&v?v:f,N=S?b||m:m,L=S&&"function"==typeof $?$:y,I=S?w||g:g,M=S?x||_:_,D=l(o(A)?A.enter:A),P=!1!==s&&!Mi,F=Kn(L),R=i._enterCb=C(function(){P&&(Pn(i,j),Pn(i,E)),R.cancelled?(P&&Pn(i,T),M&&M(i)):I&&I(i),i._enterCb=null});n.data.show||et(n.data.hook||(n.data.hook={}),"insert",function(){var t=i.parentNode,e=t&&t._pending&&t._pending[n.key];e&&e.tag===n.tag&&e.elm._leaveCb&&e.elm._leaveCb(),L&&L(i,R)}),N&&N(i),P&&(Dn(i,T),Dn(i,E),Mn(function(){Dn(i,j),Pn(i,T),R.cancelled||F||(zn(D)?setTimeout(R,D):Fn(i,c,R))})),n.data.show&&(r&&r(),L&&L(i,R)),P||F||R()}}}function Vn(n,r){function i(){x.cancelled||(n.data.show||((a.parentNode._pending||(a.parentNode._pending={}))[n.key]=n),v&&v(a),b&&(Dn(a,f),Dn(a,d),Mn(function(){Dn(a,p),Pn(a,f),x.cancelled||$||(zn(w)?setTimeout(x,w):Fn(a,u,x))})),h&&h(a,x),b||$||x())}var a=n.elm;e(a._enterCb)&&(a._enterCb.cancelled=!0,a._enterCb());var s=In(n.data.transition);if(t(s))return r();if(!e(a._leaveCb)&&1===a.nodeType){var c=s.css,u=s.type,f=s.leaveClass,p=s.leaveToClass,d=s.leaveActiveClass,v=s.beforeLeave,h=s.leave,m=s.afterLeave,y=s.leaveCancelled,g=s.delayLeave,_=s.duration,b=!1!==c&&!Mi,$=Kn(h),w=l(o(_)?_.leave:_),x=a._leaveCb=C(function(){a.parentNode&&a.parentNode._pending&&(a.parentNode._pending[n.key]=null),b&&(Pn(a,p),Pn(a,d)),x.cancelled?(b&&Pn(a,f),y&&y(a)):(r(),m&&m(a)),a._leaveCb=null});g?g(i):i()}}function zn(t){return"number"==typeof t&&!isNaN(t)}function Kn(n){if(t(n))return!1;var r=n.fns;return e(r)?Kn(Array.isArray(r)?r[0]:r):(n._length||n.length)>1}function Jn(t,e){!0!==e.data.show&&Un(e)}function qn(t,e,n){var r=e.value,i=t.multiple;if(!i||Array.isArray(r)){for(var o,a,s=0,c=t.options.length;s<c;s++)if(a=t.options[s],i)o=$(r,Gn(a))>-1,a.selected!==o&&(a.selected=o);else if(b(Gn(a),r))return void(t.selectedIndex!==s&&(t.selectedIndex=s));i||(t.selectedIndex=-1)}}function Wn(t,e){for(var n=0,r=e.length;n<r;n++)if(b(Gn(e[n]),t))return!1;return!0}function Gn(t){return"_value"in t?t._value:t.value}function Zn(t){t.target.composing=!0}function Yn(t){t.target.composing&&(t.target.composing=!1,Qn(t.target,"input"))}function Qn(t,e){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0),t.dispatchEvent(n)}function Xn(t){return!t.componentInstance||t.data&&t.data.transition?t:Xn(t.componentInstance._vnode)}function tr(t){var e=t&&t.componentOptions;return e&&e.Ctor.options.abstract?tr(ft(e.children)):t}function er(t){var e={},n=t.$options;for(var r in n.propsData)e[r]=t[r];var i=n._parentListeners;for(var o in i)e[gi(o)]=i[o];return e}function nr(t,e){if(/\d-keep-alive$/.test(e.tag))return t("keep-alive",{props:e.componentOptions.propsData})}function rr(t){for(;t=t.parent;)if(t.data.transition)return!0}function ir(t,e){return e.key===t.key&&e.tag===t.tag}function or(t){return t.isComment&&t.asyncFactory}function ar(t){t.elm._moveCb&&t.elm._moveCb(),t.elm._enterCb&&t.elm._enterCb()}function sr(t){t.data.newPos=t.elm.getBoundingClientRect()}function cr(t){var e=t.data.pos,n=t.data.newPos,r=e.left-n.left,i=e.top-n.top;if(r||i){t.data.moved=!0;var o=t.elm.style;o.transform=o.WebkitTransform="translate("+r+"px,"+i+"px)",o.transitionDuration="0s"}}function ur(t,e){var n=e?Ba(e):Ra;if(n.test(t)){for(var r,i,o=[],a=n.lastIndex=0;r=n.exec(t);){(i=r.index)>a&&o.push(JSON.stringify(t.slice(a,i)));var s=Ye(r[1].trim());o.push("_s("+s+")"),a=i+r[0].length}return a<t.length&&o.push(JSON.stringify(t.slice(a))),o.join("+")}}function lr(t,e){var n=e?Cs:$s;return t.replace(n,function(t){return bs[t]})}function fr(t,e){function n(e){l+=e,t=t.substring(e)}function r(t,n,r){var i,s;if(null==n&&(n=l),null==r&&(r=l),t&&(s=t.toLowerCase()),t)for(i=a.length-1;i>=0&&a[i].lowerCasedTag!==s;i--);else i=0;if(i>=0){for(var c=a.length-1;c>=i;c--)e.end&&e.end(a[c].tag,n,r);a.length=i,o=i&&a[i-1].tag}else"br"===s?e.start&&e.start(t,[],!0,n,r):"p"===s&&(e.start&&e.start(t,[],!1,n,r),e.end&&e.end(t,n,r))}for(var i,o,a=[],s=e.expectHTML,c=e.isUnaryTag||Ci,u=e.canBeLeftOpenTag||Ci,l=0;t;){if(i=t,o&&gs(o)){var f=0,p=o.toLowerCase(),d=_s[p]||(_s[p]=new RegExp("([\\s\\S]*?)(</"+p+"[^>]*>)","i")),v=t.replace(d,function(t,n,r){return f=r.length,gs(p)||"noscript"===p||(n=n.replace(/<!--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),xs(p,n)&&(n=n.slice(1)),e.chars&&e.chars(n),""});l+=t.length-v.length,t=v,r(p,l-f,l)}else{xs(o,t)&&n(1);var h=t.indexOf("<");if(0===h){if(os.test(t)){var m=t.indexOf("--\x3e");if(m>=0){e.shouldKeepComment&&e.comment(t.substring(4,m)),n(m+3);continue}}if(as.test(t)){var y=t.indexOf("]>");if(y>=0){n(y+2);continue}}var g=t.match(is);if(g){n(g[0].length);continue}var _=t.match(rs);if(_){var b=l;n(_[0].length),r(_[1],b,l);continue}var $=function(){var e=t.match(es);if(e){var r={tagName:e[1],attrs:[],start:l};n(e[0].length);for(var i,o;!(i=t.match(ns))&&(o=t.match(Qa));)n(o[0].length),r.attrs.push(o);if(i)return r.unarySlash=i[1],n(i[0].length),r.end=l,r}}();if($){!function(t){var n=t.tagName,i=t.unarySlash;s&&("p"===o&&Ja(n)&&r(o),u(n)&&o===n&&r(n));for(var l=c(n)||!!i,f=t.attrs.length,p=new Array(f),d=0;d<f;d++){var v=t.attrs[d];ss&&-1===v[0].indexOf('""')&&(""===v[3]&&delete v[3],""===v[4]&&delete v[4],""===v[5]&&delete v[5]);var h=v[3]||v[4]||v[5]||"";p[d]={name:v[1],value:lr(h,e.shouldDecodeNewlines)}}l||(a.push({tag:n,lowerCasedTag:n.toLowerCase(),attrs:p}),o=n),e.start&&e.start(n,p,l,t.start,t.end)}($);continue}}var C=void 0,w=void 0,x=void 0;if(h>=0){for(w=t.slice(h);!(rs.test(w)||es.test(w)||os.test(w)||as.test(w)||(x=w.indexOf("<",1))<0);)h+=x,w=t.slice(h);C=t.substring(0,h),n(h)}h<0&&(C=t,t=""),e.chars&&C&&e.chars(C)}if(t===i){e.chars&&e.chars(t);break}}r()}function pr(t,e){function n(t){t.pre&&(s=!1),ds(t.tag)&&(c=!1)}cs=e.warn||Xe,ds=e.isPreTag||Ci,vs=e.mustUseProp||Ci,hs=e.getTagNamespace||Ci,ls=tn(e.modules,"transformNode"),fs=tn(e.modules,"preTransformNode"),ps=tn(e.modules,"postTransformNode"),us=e.delimiters;var r,i,o=[],a=!1!==e.preserveWhitespace,s=!1,c=!1;return fr(t,{warn:cs,expectHTML:e.expectHTML,isUnaryTag:e.isUnaryTag,canBeLeftOpenTag:e.canBeLeftOpenTag,shouldDecodeNewlines:e.shouldDecodeNewlines,shouldKeepComment:e.comments,start:function(t,a,u){function l(t){}var f=i&&i.ns||hs(t);Ii&&"svg"===f&&(a=jr(a));var p={type:1,tag:t,attrsList:a,attrsMap:Sr(a),parent:i,children:[]};f&&(p.ns=f),Er(p)&&!Ki()&&(p.forbidden=!0);for(var d=0;d<fs.length;d++)fs[d](p,e);if(s||(dr(p),p.pre&&(s=!0)),ds(p.tag)&&(c=!0),s)vr(p);else{yr(p),gr(p),Cr(p),hr(p),p.plain=!p.key&&!a.length,mr(p),wr(p),xr(p);for(var v=0;v<ls.length;v++)ls[v](p,e);Ar(p)}if(r?o.length||r.if&&(p.elseif||p.else)&&(l(),$r(r,{exp:p.elseif,block:p})):(r=p,l()),i&&!p.forbidden)if(p.elseif||p.else)_r(p,i);else if(p.slotScope){i.plain=!1;var h=p.slotTarget||'"default"';(i.scopedSlots||(i.scopedSlots={}))[h]=p}else i.children.push(p),p.parent=i;u?n(p):(i=p,o.push(p));for(var m=0;m<ps.length;m++)ps[m](p,e)},end:function(){var t=o[o.length-1],e=t.children[t.children.length-1];e&&3===e.type&&" "===e.text&&!c&&t.children.pop(),o.length-=1,i=o[o.length-1],n(t)},chars:function(t){if(i&&(!Ii||"textarea"!==i.tag||i.attrsMap.placeholder!==t)){var e=i.children;if(t=c||t.trim()?Tr(i)?t:Ns(t):a&&e.length?" ":""){var n;!s&&" "!==t&&(n=ur(t,us))?e.push({type:2,expression:n,text:t}):" "===t&&e.length&&" "===e[e.length-1].text||e.push({type:3,text:t})}}},comment:function(t){i.children.push({type:3,text:t,isComment:!0})}}),r}function dr(t){null!=sn(t,"v-pre")&&(t.pre=!0)}function vr(t){var e=t.attrsList.length;if(e)for(var n=t.attrs=new Array(e),r=0;r<e;r++)n[r]={name:t.attrsList[r].name,value:JSON.stringify(t.attrsList[r].value)};else t.pre||(t.plain=!0)}function hr(t){var e=an(t,"key");e&&(t.key=e)}function mr(t){var e=an(t,"ref");e&&(t.ref=e,t.refInFor=kr(t))}function yr(t){var e;if(e=sn(t,"v-for")){var n=e.match(Os);if(!n)return;t.for=n[2].trim();var r=n[1].trim(),i=r.match(Ss);i?(t.alias=i[1].trim(),t.iterator1=i[2].trim(),i[3]&&(t.iterator2=i[3].trim())):t.alias=r}}function gr(t){var e=sn(t,"v-if");if(e)t.if=e,$r(t,{exp:e,block:t});else{null!=sn(t,"v-else")&&(t.else=!0);var n=sn(t,"v-else-if");n&&(t.elseif=n)}}function _r(t,e){var n=br(e.children);n&&n.if&&$r(n,{exp:t.elseif,block:t})}function br(t){for(var e=t.length;e--;){if(1===t[e].type)return t[e];t.pop()}}function $r(t,e){t.ifConditions||(t.ifConditions=[]),t.ifConditions.push(e)}function Cr(t){null!=sn(t,"v-once")&&(t.once=!0)}function wr(t){if("slot"===t.tag)t.slotName=an(t,"name");else{var e=an(t,"slot");e&&(t.slotTarget='""'===e?'"default"':e),"template"===t.tag&&(t.slotScope=sn(t,"scope"))}}function xr(t){var e;(e=an(t,"is"))&&(t.component=e),null!=sn(t,"inline-template")&&(t.inlineTemplate=!0)}function Ar(t){var e,n,r,i,o,a,s,c=t.attrsList;for(e=0,n=c.length;e<n;e++)if(r=i=c[e].name,o=c[e].value,ks.test(r))if(t.hasBindings=!0,(a=Or(r))&&(r=r.replace(js,"")),Es.test(r))r=r.replace(Es,""),o=Ye(o),s=!1,a&&(a.prop&&(s=!0,"innerHtml"===(r=gi(r))&&(r="innerHTML")),a.camel&&(r=gi(r)),a.sync&&on(t,"update:"+gi(r),un(o,"$event"))),t.component||!s&&!vs(t.tag,t.attrsMap.type,r)?nn(t,r,o):en(t,r,o);else if(As.test(r))on(t,r=r.replace(As,""),o,a,!1,cs);else{var u=(r=r.replace(ks,"")).match(Ts),l=u&&u[1];l&&(r=r.slice(0,-(l.length+1))),rn(t,r,i,o,l,a)}else nn(t,r,JSON.stringify(o))}function kr(t){for(var e=t;e;){if(void 0!==e.for)return!0;e=e.parent}return!1}function Or(t){var e=t.match(js);if(e){var n={};return e.forEach(function(t){n[t.slice(1)]=!0}),n}}function Sr(t){for(var e={},n=0,r=t.length;n<r;n++)e[t[n].name]=t[n].value;return e}function Tr(t){return"script"===t.tag||"style"===t.tag}function Er(t){return"style"===t.tag||"script"===t.tag&&(!t.attrsMap.type||"text/javascript"===t.attrsMap.type)}function jr(t){for(var e=[],n=0;n<t.length;n++){var r=t[n];Ls.test(r.name)||(r.name=r.name.replace(Is,""),e.push(r))}return e}function Nr(t,e){t&&(ms=Ms(e.staticKeys||""),ys=e.isReservedTag||Ci,Lr(t),Ir(t,!1))}function Lr(t){if(t.static=Mr(t),1===t.type){if(!ys(t.tag)&&"slot"!==t.tag&&null==t.attrsMap["inline-template"])return;for(var e=0,n=t.children.length;e<n;e++){var r=t.children[e];Lr(r),r.static||(t.static=!1)}if(t.ifConditions)for(var i=1,o=t.ifConditions.length;i<o;i++){var a=t.ifConditions[i].block;Lr(a),a.static||(t.static=!1)}}}function Ir(t,e){if(1===t.type){if((t.static||t.once)&&(t.staticInFor=e),t.static&&t.children.length&&(1!==t.children.length||3!==t.children[0].type))return void(t.staticRoot=!0);if(t.staticRoot=!1,t.children)for(var n=0,r=t.children.length;n<r;n++)Ir(t.children[n],e||!!t.for);if(t.ifConditions)for(var i=1,o=t.ifConditions.length;i<o;i++)Ir(t.ifConditions[i].block,e)}}function Mr(t){return 2!==t.type&&(3===t.type||!(!t.pre&&(t.hasBindings||t.if||t.for||vi(t.tag)||!ys(t.tag)||Dr(t)||!Object.keys(t).every(ms))))}function Dr(t){for(;t.parent;){if("template"!==(t=t.parent).tag)return!1;if(t.for)return!0}return!1}function Pr(t,e,n){var r=e?"nativeOn:{":"on:{";for(var i in t){var o=t[i];r+='"'+i+'":'+Fr(i,o)+","}return r.slice(0,-1)+"}"}function Fr(t,e){if(!e)return"function(){}";if(Array.isArray(e))return"["+e.map(function(e){return Fr(t,e)}).join(",")+"]";var n=Ps.test(e.value),r=Ds.test(e.value);if(e.modifiers){var i="",o="",a=[];for(var s in e.modifiers)Hs[s]?(o+=Hs[s],Fs[s]&&a.push(s)):a.push(s);return a.length&&(i+=Rr(a)),o&&(i+=o),"function($event){"+i+(n?e.value+"($event)":r?"("+e.value+")($event)":e.value)+"}"}return n||r?e.value:"function($event){"+e.value+"}"}function Rr(t){return"if(!('button' in $event)&&"+t.map(Hr).join("&&")+")return null;"}function Hr(t){var e=parseInt(t,10);if(e)return"$event.keyCode!=="+e;var n=Fs[t];return"_k($event.keyCode,"+JSON.stringify(t)+(n?","+JSON.stringify(n):"")+")"}function Br(t,e){var n=new Us(e);return{render:"with(this){return "+(t?Ur(t,n):'_c("div")')+"}",staticRenderFns:n.staticRenderFns}}function Ur(t,e){if(t.staticRoot&&!t.staticProcessed)return Vr(t,e);if(t.once&&!t.onceProcessed)return zr(t,e);if(t.for&&!t.forProcessed)return qr(t,e);if(t.if&&!t.ifProcessed)return Kr(t,e);if("template"!==t.tag||t.slotTarget){if("slot"===t.tag)return ai(t,e);var n;if(t.component)n=si(t.component,t,e);else{var r=t.plain?void 0:Wr(t,e),i=t.inlineTemplate?null:ti(t,e,!0);n="_c('"+t.tag+"'"+(r?","+r:"")+(i?","+i:"")+")"}for(var o=0;o<e.transforms.length;o++)n=e.transforms[o](t,n);return n}return ti(t,e)||"void 0"}function Vr(t,e){return t.staticProcessed=!0,e.staticRenderFns.push("with(this){return "+Ur(t,e)+"}"),"_m("+(e.staticRenderFns.length-1)+(t.staticInFor?",true":"")+")"}function zr(t,e){if(t.onceProcessed=!0,t.if&&!t.ifProcessed)return Kr(t,e);if(t.staticInFor){for(var n="",r=t.parent;r;){if(r.for){n=r.key;break}r=r.parent}return n?"_o("+Ur(t,e)+","+e.onceId+++(n?","+n:"")+")":Ur(t,e)}return Vr(t,e)}function Kr(t,e,n,r){return t.ifProcessed=!0,Jr(t.ifConditions.slice(),e,n,r)}function Jr(t,e,n,r){function i(t){return n?n(t,e):t.once?zr(t,e):Ur(t,e)}if(!t.length)return r||"_e()";var o=t.shift();return o.exp?"("+o.exp+")?"+i(o.block)+":"+Jr(t,e,n,r):""+i(o.block)}function qr(t,e,n,r){var i=t.for,o=t.alias,a=t.iterator1?","+t.iterator1:"",s=t.iterator2?","+t.iterator2:"";return t.forProcessed=!0,(r||"_l")+"(("+i+"),function("+o+a+s+"){return "+(n||Ur)(t,e)+"})"}function Wr(t,e){var n="{",r=Gr(t,e);r&&(n+=r+","),t.key&&(n+="key:"+t.key+","),t.ref&&(n+="ref:"+t.ref+","),t.refInFor&&(n+="refInFor:true,"),t.pre&&(n+="pre:true,"),t.component&&(n+='tag:"'+t.tag+'",');for(var i=0;i<e.dataGenFns.length;i++)n+=e.dataGenFns[i](t);if(t.attrs&&(n+="attrs:{"+ci(t.attrs)+"},"),t.props&&(n+="domProps:{"+ci(t.props)+"},"),t.events&&(n+=Pr(t.events,!1,e.warn)+","),t.nativeEvents&&(n+=Pr(t.nativeEvents,!0,e.warn)+","),t.slotTarget&&(n+="slot:"+t.slotTarget+","),t.scopedSlots&&(n+=Yr(t.scopedSlots,e)+","),t.model&&(n+="model:{value:"+t.model.value+",callback:"+t.model.callback+",expression:"+t.model.expression+"},"),t.inlineTemplate){var o=Zr(t,e);o&&(n+=o+",")}return n=n.replace(/,$/,"")+"}",t.wrapData&&(n=t.wrapData(n)),t.wrapListeners&&(n=t.wrapListeners(n)),n}function Gr(t,e){var n=t.directives;if(n){var r,i,o,a,s="directives:[",c=!1;for(r=0,i=n.length;r<i;r++){o=n[r],a=!0;var u=e.directives[o.name];u&&(a=!!u(t,o,e.warn)),a&&(c=!0,s+='{name:"'+o.name+'",rawName:"'+o.rawName+'"'+(o.value?",value:("+o.value+"),expression:"+JSON.stringify(o.value):"")+(o.arg?',arg:"'+o.arg+'"':"")+(o.modifiers?",modifiers:"+JSON.stringify(o.modifiers):"")+"},")}return c?s.slice(0,-1)+"]":void 0}}function Zr(t,e){var n=t.children[0];if(1===n.type){var r=Br(n,e.options);return"inlineTemplate:{render:function(){"+r.render+"},staticRenderFns:["+r.staticRenderFns.map(function(t){return"function(){"+t+"}"}).join(",")+"]}"}}function Yr(t,e){return"scopedSlots:_u(["+Object.keys(t).map(function(n){return Qr(n,t[n],e)}).join(",")+"])"}function Qr(t,e,n){return e.for&&!e.forProcessed?Xr(t,e,n):"{key:"+t+",fn:function("+String(e.attrsMap.scope)+"){return "+("template"===e.tag?ti(e,n)||"void 0":Ur(e,n))+"}}"}function Xr(t,e,n){var r=e.for,i=e.alias,o=e.iterator1?","+e.iterator1:"",a=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,"_l(("+r+"),function("+i+o+a+"){return "+Qr(t,e,n)+"})"}function ti(t,e,n,r,i){var o=t.children;if(o.length){var a=o[0];if(1===o.length&&a.for&&"template"!==a.tag&&"slot"!==a.tag)return(r||Ur)(a,e);var s=n?ei(o,e.maybeComponent):0,c=i||ri;return"["+o.map(function(t){return c(t,e)}).join(",")+"]"+(s?","+s:"")}}function ei(t,e){for(var n=0,r=0;r<t.length;r++){var i=t[r];if(1===i.type){if(ni(i)||i.ifConditions&&i.ifConditions.some(function(t){return ni(t.block)})){n=2;break}(e(i)||i.ifConditions&&i.ifConditions.some(function(t){return e(t.block)}))&&(n=1)}}return n}function ni(t){return void 0!==t.for||"template"===t.tag||"slot"===t.tag}function ri(t,e){return 1===t.type?Ur(t,e):3===t.type&&t.isComment?oi(t):ii(t)}function ii(t){return"_v("+(2===t.type?t.expression:ui(JSON.stringify(t.text)))+")"}function oi(t){return"_e('"+t.text+"')"}function ai(t,e){var n=t.slotName||'"default"',r=ti(t,e),i="_t("+n+(r?","+r:""),o=t.attrs&&"{"+t.attrs.map(function(t){return gi(t.name)+":"+t.value}).join(",")+"}",a=t.attrsMap["v-bind"];return!o&&!a||r||(i+=",null"),o&&(i+=","+o),a&&(i+=(o?"":",null")+","+a),i+")"}function si(t,e,n){var r=e.inlineTemplate?null:ti(e,n,!0);return"_c("+t+","+Wr(e,n)+(r?","+r:"")+")"}function ci(t){for(var e="",n=0;n<t.length;n++){var r=t[n];e+='"'+r.name+'":'+ui(r.value)+","}return e.slice(0,-1)}function ui(t){return t.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}function li(t,e){try{return new Function(t)}catch(n){return e.push({err:n,code:t}),_}}function fi(t){var e=Object.create(null);return function(n,r,i){var o=(r=r||{}).delimiters?String(r.delimiters)+n:n;if(e[o])return e[o];var a=t(n,r),s={},c=[];return s.render=li(a.render,c),s.staticRenderFns=a.staticRenderFns.map(function(t){return li(t,c)}),e[o]=s}}function pi(t){if(t.outerHTML)return t.outerHTML;var e=document.createElement("div");return e.appendChild(t.cloneNode(!0)),e.innerHTML}var di=Object.prototype.toString,vi=f("slot,component",!0),hi=f("key,ref,slot,is"),mi=Object.prototype.hasOwnProperty,yi=/-(\w)/g,gi=v(function(t){return t.replace(yi,function(t,e){return e?e.toUpperCase():""})}),_i=v(function(t){return t.charAt(0).toUpperCase()+t.slice(1)}),bi=/([^-])([A-Z])/g,$i=v(function(t){return t.replace(bi,"$1-$2").replace(bi,"$1-$2").toLowerCase()}),Ci=function(t,e,n){return!1},wi=function(t){return t},xi="data-server-rendered",Ai=["component","directive","filter"],ki=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated"],Oi={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:Ci,isReservedAttr:Ci,isUnknownElement:Ci,getTagNamespace:_,parsePlatformTagName:wi,mustUseProp:Ci,_lifecycleHooks:ki},Si=Object.freeze({}),Ti=/[^\w.$]/,Ei=_,ji="__proto__"in{},Ni="undefined"!=typeof window,Li=Ni&&window.navigator.userAgent.toLowerCase(),Ii=Li&&/msie|trident/.test(Li),Mi=Li&&Li.indexOf("msie 9.0")>0,Di=Li&&Li.indexOf("edge/")>0,Pi=Li&&Li.indexOf("android")>0,Fi=Li&&/iphone|ipad|ipod|ios/.test(Li),Ri=Li&&/chrome\/\d+/.test(Li)&&!Di,Hi={}.watch,Bi=!1;if(Ni)try{var Ui={};Object.defineProperty(Ui,"passive",{get:function(){Bi=!0}}),window.addEventListener("test-passive",null,Ui)}catch(t){}var Vi,zi,Ki=function(){return void 0===Vi&&(Vi=!Ni&&"undefined"!=typeof global&&"server"===global.process.env.VUE_ENV),Vi},Ji=Ni&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,qi="undefined"!=typeof Symbol&&O(Symbol)&&"undefined"!=typeof Reflect&&O(Reflect.ownKeys),Wi=function(){function t(){r=!1;var t=n.slice(0);n.length=0;for(var e=0;e<t.length;e++)t[e]()}var e,n=[],r=!1;if("undefined"!=typeof Promise&&O(Promise)){var i=Promise.resolve(),o=function(t){console.error(t)};e=function(){i.then(t).catch(o),Fi&&setTimeout(_)}}else if("undefined"==typeof MutationObserver||!O(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())e=function(){setTimeout(t,0)};else{var a=1,s=new MutationObserver(t),c=document.createTextNode(String(a));s.observe(c,{characterData:!0}),e=function(){a=(a+1)%2,c.data=String(a)}}return function(t,i){var o;if(n.push(function(){if(t)try{t.call(i)}catch(t){k(t,i,"nextTick")}else o&&o(i)}),r||(r=!0,e()),!t&&"undefined"!=typeof Promise)return new Promise(function(t,e){o=t})}}();zi="undefined"!=typeof Set&&O(Set)?Set:function(){function t(){this.set=Object.create(null)}return t.prototype.has=function(t){return!0===this.set[t]},t.prototype.add=function(t){this.set[t]=!0},t.prototype.clear=function(){this.set=Object.create(null)},t}();var Gi=0,Zi=function(){this.id=Gi++,this.subs=[]};Zi.prototype.addSub=function(t){this.subs.push(t)},Zi.prototype.removeSub=function(t){p(this.subs,t)},Zi.prototype.depend=function(){Zi.target&&Zi.target.addDep(this)},Zi.prototype.notify=function(){for(var t=this.subs.slice(),e=0,n=t.length;e<n;e++)t[e].update()},Zi.target=null;var Yi=[],Qi=Array.prototype,Xi=Object.create(Qi);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(t){var e=Qi[t];x(Xi,t,function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];var i,o=e.apply(this,n),a=this.__ob__;switch(t){case"push":case"unshift":i=n;break;case"splice":i=n.slice(2)}return i&&a.observeArray(i),a.dep.notify(),o})});var to=Object.getOwnPropertyNames(Xi),eo={shouldConvert:!0},no=function(t){this.value=t,this.dep=new Zi,this.vmCount=0,x(t,"__ob__",this),Array.isArray(t)?((ji?E:j)(t,Xi,to),this.observeArray(t)):this.walk(t)};no.prototype.walk=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)L(t,e[n],t[e[n]])},no.prototype.observeArray=function(t){for(var e=0,n=t.length;e<n;e++)N(t[e])};var ro=Oi.optionMergeStrategies;ro.data=function(t,e,n){return n?F(t,e,n):e&&"function"!=typeof e?t:F.call(this,t,e)},ki.forEach(function(t){ro[t]=R}),Ai.forEach(function(t){ro[t+"s"]=H}),ro.watch=function(t,e){if(t===Hi&&(t=void 0),e===Hi&&(e=void 0),!e)return Object.create(t||null);if(!t)return e;var n={};y(n,t);for(var r in e){var i=n[r],o=e[r];i&&!Array.isArray(i)&&(i=[i]),n[r]=i?i.concat(o):Array.isArray(o)?o:[o]}return n},ro.props=ro.methods=ro.inject=ro.computed=function(t,e){if(!e)return Object.create(t||null);if(!t)return e;var n=Object.create(null);return y(n,t),y(n,e),n},ro.provide=F;var io=function(t,e){return void 0===e?t:e},oo=function(t,e,n,r,i,o,a,s){this.tag=t,this.data=e,this.children=n,this.text=r,this.elm=i,this.ns=void 0,this.context=o,this.functionalContext=void 0,this.key=e&&e.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},ao={child:{}};ao.child.get=function(){return this.componentInstance},Object.defineProperties(oo.prototype,ao);var so,co=function(t){void 0===t&&(t="");var e=new oo;return e.text=t,e.isComment=!0,e},uo=v(function(t){var e="&"===t.charAt(0),n="~"===(t=e?t.slice(1):t).charAt(0),r="!"===(t=n?t.slice(1):t).charAt(0);return t=r?t.slice(1):t,{name:t,once:n,capture:r,passive:e}}),lo=null,fo=[],po=[],vo={},ho=!1,mo=!1,yo=0,go=0,_o=function(t,e,n,r){this.vm=t,t._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++go,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new zi,this.newDepIds=new zi,this.expression="","function"==typeof e?this.getter=e:(this.getter=A(e),this.getter||(this.getter=function(){})),this.value=this.lazy?void 0:this.get()};_o.prototype.get=function(){S(this);var t,e=this.vm;try{t=this.getter.call(e,e)}catch(t){if(!this.user)throw t;k(t,e,'getter for watcher "'+this.expression+'"')}finally{this.deep&&Nt(t),T(),this.cleanupDeps()}return t},_o.prototype.addDep=function(t){var e=t.id;this.newDepIds.has(e)||(this.newDepIds.add(e),this.newDeps.push(t),this.depIds.has(e)||t.addSub(this))},_o.prototype.cleanupDeps=function(){for(var t=this,e=this.deps.length;e--;){var n=t.deps[e];t.newDepIds.has(n.id)||n.removeSub(t)}var r=this.depIds;this.depIds=this.newDepIds,this.newDepIds=r,this.newDepIds.clear(),r=this.deps,this.deps=this.newDeps,this.newDeps=r,this.newDeps.length=0},_o.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():jt(this)},_o.prototype.run=function(){if(this.active){var t=this.get();if(t!==this.value||o(t)||this.deep){var e=this.value;if(this.value=t,this.user)try{this.cb.call(this.vm,t,e)}catch(t){k(t,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,t,e)}}},_o.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},_o.prototype.depend=function(){for(var t=this,e=this.deps.length;e--;)t.deps[e].depend()},_o.prototype.teardown=function(){var t=this;if(this.active){this.vm._isBeingDestroyed||p(this.vm._watchers,this);for(var e=this.deps.length;e--;)t.deps[e].removeSub(t);this.active=!1}};var bo=new zi,$o={enumerable:!0,configurable:!0,get:_,set:_},Co={lazy:!0},wo={init:function(t,e,n,r){if(!t.componentInstance||t.componentInstance._isDestroyed)(t.componentInstance=Yt(t,lo,n,r)).$mount(e?t.elm:void 0,e);else if(t.data.keepAlive){var i=t;wo.prepatch(i,i)}},prepatch:function(t,e){var n=e.componentOptions;$t(e.componentInstance=t.componentInstance,n.propsData,n.listeners,e,n.children)},insert:function(t){var e=t.context,n=t.componentInstance;n._isMounted||(n._isMounted=!0,At(n,"mounted")),t.data.keepAlive&&(e._isMounted?Tt(n):wt(n,!0))},destroy:function(t){var e=t.componentInstance;e._isDestroyed||(t.data.keepAlive?xt(e,!0):e.$destroy())}},xo=Object.keys(wo),Ao=1,ko=2,Oo=0;!function(t){t.prototype._init=function(t){var e=this;e._uid=Oo++,e._isVue=!0,t&&t._isComponent?he(e,t):e.$options=z(me(e.constructor),t||{},e),e._renderProxy=e,e._self=e,_t(e),pt(e),ve(e),At(e,"beforeCreate"),Jt(e),Mt(e),Kt(e),At(e,"created"),e.$options.el&&e.$mount(e.$options.el)}}(_e),function(t){var e={};e.get=function(){return this._data};var n={};n.get=function(){return this._props},Object.defineProperty(t.prototype,"$data",e),Object.defineProperty(t.prototype,"$props",n),t.prototype.$set=I,t.prototype.$delete=M,t.prototype.$watch=function(t,e,n){var r=this;if(a(e))return zt(r,t,e,n);(n=n||{}).user=!0;var i=new _o(r,t,e,n);return n.immediate&&e.call(r,i.value),function(){i.teardown()}}}(_e),function(t){var e=/^hook:/;t.prototype.$on=function(t,n){var r=this,i=this;if(Array.isArray(t))for(var o=0,a=t.length;o<a;o++)r.$on(t[o],n);else(i._events[t]||(i._events[t]=[])).push(n),e.test(t)&&(i._hasHookEvent=!0);return i},t.prototype.$once=function(t,e){function n(){r.$off(t,n),e.apply(r,arguments)}var r=this;return n.fn=e,r.$on(t,n),r},t.prototype.$off=function(t,e){var n=this,r=this;if(!arguments.length)return r._events=Object.create(null),r;if(Array.isArray(t)){for(var i=0,o=t.length;i<o;i++)n.$off(t[i],e);return r}var a=r._events[t];if(!a)return r;if(1===arguments.length)return r._events[t]=null,r;for(var s,c=a.length;c--;)if((s=a[c])===e||s.fn===e){a.splice(c,1);break}return r},t.prototype.$emit=function(t){var e=this,n=e._events[t];if(n){n=n.length>1?m(n):n;for(var r=m(arguments,1),i=0,o=n.length;i<o;i++)try{n[i].apply(e,r)}catch(n){k(n,e,'event handler for "'+t+'"')}}return e}}(_e),function(t){t.prototype._update=function(t,e){var n=this;n._isMounted&&At(n,"beforeUpdate");var r=n.$el,i=n._vnode,o=lo;lo=n,n._vnode=t,i?n.$el=n.__patch__(i,t):(n.$el=n.__patch__(n.$el,t,e,!1,n.$options._parentElm,n.$options._refElm),n.$options._parentElm=n.$options._refElm=null),lo=o,r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},t.prototype.$forceUpdate=function(){var t=this;t._watcher&&t._watcher.update()},t.prototype.$destroy=function(){var t=this;if(!t._isBeingDestroyed){At(t,"beforeDestroy"),t._isBeingDestroyed=!0;var e=t.$parent;!e||e._isBeingDestroyed||t.$options.abstract||p(e.$children,t),t._watcher&&t._watcher.teardown();for(var n=t._watchers.length;n--;)t._watchers[n].teardown();t._data.__ob__&&t._data.__ob__.vmCount--,t._isDestroyed=!0,t.__patch__(t._vnode,null),At(t,"destroyed"),t.$off(),t.$el&&(t.$el.__vue__=null)}}}(_e),function(t){t.prototype.$nextTick=function(t){return Wi(t,this)},t.prototype._render=function(){var t=this,e=t.$options,n=e.render,r=e.staticRenderFns,i=e._parentVnode;if(t._isMounted)for(var o in t.$slots)t.$slots[o]=Q(t.$slots[o]);t.$scopedSlots=i&&i.data.scopedSlots||Si,r&&!t._staticTrees&&(t._staticTrees=[]),t.$vnode=i;var a;try{a=n.call(t._renderProxy,t.$createElement)}catch(e){k(e,t,"render function"),a=t._vnode}return a instanceof oo||(a=co()),a.parent=i,a},t.prototype._o=le,t.prototype._n=l,t.prototype._s=u,t.prototype._l=ie,t.prototype._t=oe,t.prototype._q=b,t.prototype._i=$,t.prototype._m=ue,t.prototype._f=ae,t.prototype._k=se,t.prototype._b=ce,t.prototype._v=Z,t.prototype._e=co,t.prototype._u=gt,t.prototype._g=de}(_e);var So=[String,RegExp,Array],To={KeepAlive:{name:"keep-alive",abstract:!0,props:{include:So,exclude:So},created:function(){this.cache=Object.create(null)},destroyed:function(){var t=this;for(var e in t.cache)Te(t.cache[e])},watch:{include:function(t){Se(this.cache,this._vnode,function(e){return Oe(t,e)})},exclude:function(t){Se(this.cache,this._vnode,function(e){return!Oe(t,e)})}},render:function(){var t=ft(this.$slots.default),e=t&&t.componentOptions;if(e){var n=ke(e);if(n&&(this.include&&!Oe(this.include,n)||this.exclude&&Oe(this.exclude,n)))return t;var r=null==t.key?e.Ctor.cid+(e.tag?"::"+e.tag:""):t.key;this.cache[r]?t.componentInstance=this.cache[r].componentInstance:this.cache[r]=t,t.data.keepAlive=!0}return t}}};!function(t){var e={};e.get=function(){return Oi},Object.defineProperty(t,"config",e),t.util={warn:Ei,extend:y,mergeOptions:z,defineReactive:L},t.set=I,t.delete=M,t.nextTick=Wi,t.options=Object.create(null),Ai.forEach(function(e){t.options[e+"s"]=Object.create(null)}),t.options._base=t,y(t.options.components,To),be(t),$e(t),Ce(t),Ae(t)}(_e),Object.defineProperty(_e.prototype,"$isServer",{get:Ki}),Object.defineProperty(_e.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),_e.version="2.4.0";var Eo,jo,No,Lo,Io,Mo,Do,Po,Fo,Ro=f("style,class"),Ho=f("input,textarea,option,select"),Bo=function(t,e,n){return"value"===n&&Ho(t)&&"button"!==e||"selected"===n&&"option"===t||"checked"===n&&"input"===t||"muted"===n&&"video"===t},Uo=f("contenteditable,draggable,spellcheck"),Vo=f("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),zo="http://www.w3.org/1999/xlink",Ko=function(t){return":"===t.charAt(5)&&"xlink"===t.slice(0,5)},Jo=function(t){return Ko(t)?t.slice(6,t.length):""},qo=function(t){return null==t||!1===t},Wo={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},Go=f("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),Zo=f("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Yo=function(t){return Go(t)||Zo(t)},Qo=Object.create(null),Xo=Object.freeze({createElement:function(t,e){var n=document.createElement(t);return"select"!==t?n:(e.data&&e.data.attrs&&void 0!==e.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n)},createElementNS:function(t,e){return document.createElementNS(Wo[t],e)},createTextNode:function(t){return document.createTextNode(t)},createComment:function(t){return document.createComment(t)},insertBefore:function(t,e,n){t.insertBefore(e,n)},removeChild:function(t,e){t.removeChild(e)},appendChild:function(t,e){t.appendChild(e)},parentNode:function(t){return t.parentNode},nextSibling:function(t){return t.nextSibling},tagName:function(t){return t.tagName},setTextContent:function(t,e){t.textContent=e},setAttribute:function(t,e,n){t.setAttribute(e,n)}}),ta={create:function(t,e){Re(e)},update:function(t,e){t.data.ref!==e.data.ref&&(Re(t,!0),Re(e))},destroy:function(t){Re(t,!0)}},ea=new oo("",{},[]),na=["create","activate","update","remove","destroy"],ra={create:Ve,update:Ve,destroy:function(t){Ve(t,ea)}},ia=Object.create(null),oa=[ta,ra],aa={create:We,update:We},sa={create:Ze,update:Ze},ca=/[\w).+\-_$\]]/,ua="__r",la="__c",fa={create:wn,update:wn},pa={create:xn,update:xn},da=v(function(t){var e={},n=/;(?![^(]*\))/g,r=/:(.+)/;return t.split(n).forEach(function(t){if(t){var n=t.split(r);n.length>1&&(e[n[0].trim()]=n[1].trim())}}),e}),va=/^--/,ha=/\s*!important$/,ma=function(t,e,n){if(va.test(e))t.style.setProperty(e,n);else if(ha.test(n))t.style.setProperty(e,n.replace(ha,""),"important");else{var r=ga(e);if(Array.isArray(n))for(var i=0,o=n.length;i<o;i++)t.style[r]=n[i];else t.style[r]=n}},ya=["Webkit","Moz","ms"],ga=v(function(t){if(Fo=Fo||document.createElement("div").style,"filter"!==(t=gi(t))&&t in Fo)return t;for(var e=t.charAt(0).toUpperCase()+t.slice(1),n=0;n<ya.length;n++){var r=ya[n]+e;if(r in Fo)return r}}),_a={create:jn,update:jn},ba=v(function(t){return{enterClass:t+"-enter",enterToClass:t+"-enter-to",enterActiveClass:t+"-enter-active",leaveClass:t+"-leave",leaveToClass:t+"-leave-to",leaveActiveClass:t+"-leave-active"}}),$a=Ni&&!Mi,Ca="transition",wa="animation",xa="transition",Aa="transitionend",ka="animation",Oa="animationend";$a&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(xa="WebkitTransition",Aa="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(ka="WebkitAnimation",Oa="webkitAnimationEnd"));var Sa=Ni&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout,Ta=/\b(transform|all)(,|$)/,Ea=function(r){function o(t){return new oo(E.tagName(t).toLowerCase(),{},[],void 0,t)}function a(t,e){function n(){0==--n.listeners&&s(t)}return n.listeners=e,n}function s(t){var n=E.parentNode(t);e(n)&&E.removeChild(n,t)}function c(t,r,i,o,a){if(t.isRootInsert=!a,!u(t,r,i,o)){var s=t.data,c=t.children,l=t.tag;e(l)?(t.elm=t.ns?E.createElementNS(t.ns,l):E.createElement(l,t),y(t),v(t,c,r),e(s)&&m(t,r),d(i,t.elm,o)):n(t.isComment)?(t.elm=E.createComment(t.text),d(i,t.elm,o)):(t.elm=E.createTextNode(t.text),d(i,t.elm,o))}}function u(t,r,i,o){var a=t.data;if(e(a)){var s=e(t.componentInstance)&&a.keepAlive;if(e(a=a.hook)&&e(a=a.init)&&a(t,!1,i,o),e(t.componentInstance))return l(t,r),n(s)&&p(t,r,i,o),!0}}function l(t,n){e(t.data.pendingInsert)&&(n.push.apply(n,t.data.pendingInsert),t.data.pendingInsert=null),t.elm=t.componentInstance.$el,h(t)?(m(t,n),y(t)):(Re(t),n.push(t))}function p(t,n,r,i){for(var o,a=t;a.componentInstance;)if(a=a.componentInstance._vnode,e(o=a.data)&&e(o=o.transition)){for(o=0;o<S.activate.length;++o)S.activate[o](ea,a);n.push(a);break}d(r,t.elm,i)}function d(t,n,r){e(t)&&(e(r)?r.parentNode===t&&E.insertBefore(t,n,r):E.appendChild(t,n))}function v(t,e,n){if(Array.isArray(e))for(var r=0;r<e.length;++r)c(e[r],n,t.elm,null,!0);else i(t.text)&&E.appendChild(t.elm,E.createTextNode(t.text))}function h(t){for(;t.componentInstance;)t=t.componentInstance._vnode;return e(t.tag)}function m(t,n){for(var r=0;r<S.create.length;++r)S.create[r](ea,t);e(k=t.data.hook)&&(e(k.create)&&k.create(ea,t),e(k.insert)&&n.push(t))}function y(t){for(var n,r=t;r;)e(n=r.context)&&e(n=n.$options._scopeId)&&E.setAttribute(t.elm,n,""),r=r.parent;e(n=lo)&&n!==t.context&&e(n=n.$options._scopeId)&&E.setAttribute(t.elm,n,"")}function g(t,e,n,r,i,o){for(;r<=i;++r)c(n[r],o,t,e)}function _(t){var n,r,i=t.data;if(e(i))for(e(n=i.hook)&&e(n=n.destroy)&&n(t),n=0;n<S.destroy.length;++n)S.destroy[n](t);if(e(n=t.children))for(r=0;r<t.children.length;++r)_(t.children[r])}function b(t,n,r,i){for(;r<=i;++r){var o=n[r];e(o)&&(e(o.tag)?($(o),_(o)):s(o.elm))}}function $(t,n){if(e(n)||e(t.data)){var r,i=S.remove.length+1;for(e(n)?n.listeners+=i:n=a(t.elm,i),e(r=t.componentInstance)&&e(r=r._vnode)&&e(r.data)&&$(r,n),r=0;r<S.remove.length;++r)S.remove[r](t,n);e(r=t.data.hook)&&e(r=r.remove)?r(t,n):n()}else s(t.elm)}function C(n,r,i,o,a){for(var s,u,l,f=0,p=0,d=r.length-1,v=r[0],h=r[d],m=i.length-1,y=i[0],_=i[m],$=!a;f<=d&&p<=m;)t(v)?v=r[++f]:t(h)?h=r[--d]:He(v,y)?(w(v,y,o),v=r[++f],y=i[++p]):He(h,_)?(w(h,_,o),h=r[--d],_=i[--m]):He(v,_)?(w(v,_,o),$&&E.insertBefore(n,v.elm,E.nextSibling(h.elm)),v=r[++f],_=i[--m]):He(h,y)?(w(h,y,o),$&&E.insertBefore(n,h.elm,v.elm),h=r[--d],y=i[++p]):(t(s)&&(s=Ue(r,f,d)),t(u=e(y.key)?s[y.key]:null)?(c(y,o,n,v.elm),y=i[++p]):He(l=r[u],y)?(w(l,y,o),r[u]=void 0,$&&E.insertBefore(n,l.elm,v.elm),y=i[++p]):(c(y,o,n,v.elm),y=i[++p]));f>d?g(n,t(i[m+1])?null:i[m+1].elm,i,p,m,o):p>m&&b(n,r,f,d)}function w(r,i,o,a){if(r!==i){var s=i.elm=r.elm;if(n(r.isAsyncPlaceholder))e(i.asyncFactory.resolved)?A(r.elm,i,o):i.isAsyncPlaceholder=!0;else if(n(i.isStatic)&&n(r.isStatic)&&i.key===r.key&&(n(i.isCloned)||n(i.isOnce)))i.componentInstance=r.componentInstance;else{var c,u=i.data;e(u)&&e(c=u.hook)&&e(c=c.prepatch)&&c(r,i);var l=r.children,f=i.children;if(e(u)&&h(i)){for(c=0;c<S.update.length;++c)S.update[c](r,i);e(c=u.hook)&&e(c=c.update)&&c(r,i)}t(i.text)?e(l)&&e(f)?l!==f&&C(s,l,f,o,a):e(f)?(e(r.text)&&E.setTextContent(s,""),g(s,null,f,0,f.length-1,o)):e(l)?b(s,l,0,l.length-1):e(r.text)&&E.setTextContent(s,""):r.text!==i.text&&E.setTextContent(s,i.text),e(u)&&e(c=u.hook)&&e(c=c.postpatch)&&c(r,i)}}}function x(t,r,i){if(n(i)&&e(t.parent))t.parent.data.pendingInsert=r;else for(var o=0;o<r.length;++o)r[o].data.hook.insert(r[o])}function A(t,r,i){if(n(r.isComment)&&e(r.asyncFactory))return r.elm=t,r.isAsyncPlaceholder=!0,!0;r.elm=t;var o=r.tag,a=r.data,s=r.children;if(e(a)&&(e(k=a.hook)&&e(k=k.init)&&k(r,!0),e(k=r.componentInstance)))return l(r,i),!0;if(e(o)){if(e(s))if(t.hasChildNodes()){for(var c=!0,u=t.firstChild,f=0;f<s.length;f++){if(!u||!A(u,s[f],i)){c=!1;break}u=u.nextSibling}if(!c||u)return!1}else v(r,s,i);if(e(a))for(var p in a)if(!j(p)){m(r,i);break}}else t.data!==r.text&&(t.data=r.text);return!0}var k,O,S={},T=r.modules,E=r.nodeOps;for(k=0;k<na.length;++k)for(S[na[k]]=[],O=0;O<T.length;++O)e(T[O][na[k]])&&S[na[k]].push(T[O][na[k]]);var j=f("attrs,style,class,staticClass,staticStyle,key");return function(r,i,a,s,u,l){if(!t(i)){var f=!1,p=[];if(t(r))f=!0,c(i,p,u,l);else{var d=e(r.nodeType);if(!d&&He(r,i))w(r,i,p,s);else{if(d){if(1===r.nodeType&&r.hasAttribute(xi)&&(r.removeAttribute(xi),a=!0),n(a)&&A(r,i,p))return x(i,p,!0),r;r=o(r)}var v=r.elm,m=E.parentNode(v);if(c(i,p,v._leaveCb?null:m,E.nextSibling(v)),e(i.parent)){for(var y=i.parent;y;)y.elm=i.elm,y=y.parent;if(h(i))for(var g=0;g<S.create.length;++g)S.create[g](ea,i.parent)}e(m)?b(m,[r],0,0):e(r.tag)&&_(r)}}return x(i,p,f),i.elm}e(r)&&_(r)}}({nodeOps:Xo,modules:[aa,sa,fa,pa,_a,Ni?{create:Jn,activate:Jn,remove:function(t,e){!0!==t.data.show?Vn(t,e):e()}}:{}].concat(oa)}),ja=f("text,number,password,search,email,tel,url");Mi&&document.addEventListener("selectionchange",function(){var t=document.activeElement;t&&t.vmodel&&Qn(t,"input")});var Na={model:{inserted:function(t,e,n){if("select"===n.tag){var r=function(){qn(t,e,n.context)};r(),(Ii||Di)&&setTimeout(r,0)}else("textarea"===n.tag||ja(t.type))&&(t._vModifiers=e.modifiers,e.modifiers.lazy||(t.addEventListener("change",Yn),Pi||(t.addEventListener("compositionstart",Zn),t.addEventListener("compositionend",Yn)),Mi&&(t.vmodel=!0)))},componentUpdated:function(t,e,n){"select"===n.tag&&(qn(t,e,n.context),(t.multiple?e.value.some(function(e){return Wn(e,t.options)}):e.value!==e.oldValue&&Wn(e.value,t.options))&&Qn(t,"change"))}},show:{bind:function(t,e,n){var r=e.value,i=(n=Xn(n)).data&&n.data.transition,o=t.__vOriginalDisplay="none"===t.style.display?"":t.style.display;r&&i&&!Mi?(n.data.show=!0,Un(n,function(){t.style.display=o})):t.style.display=r?o:"none"},update:function(t,e,n){var r=e.value;r!==e.oldValue&&((n=Xn(n)).data&&n.data.transition&&!Mi?(n.data.show=!0,r?Un(n,function(){t.style.display=t.__vOriginalDisplay}):Vn(n,function(){t.style.display="none"})):t.style.display=r?t.__vOriginalDisplay:"none")},unbind:function(t,e,n,r,i){i||(t.style.display=t.__vOriginalDisplay)}}},La={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]},Ia={name:"transition",props:La,abstract:!0,render:function(t){var e=this,n=this.$options._renderChildren;if(n&&(n=n.filter(function(t){return t.tag||or(t)})).length){var r=this.mode,o=n[0];if(rr(this.$vnode))return o;var a=tr(o);if(!a)return o;if(this._leaving)return nr(t,o);var s="__transition-"+this._uid+"-";a.key=null==a.key?a.isComment?s+"comment":s+a.tag:i(a.key)?0===String(a.key).indexOf(s)?a.key:s+a.key:a.key;var c=(a.data||(a.data={})).transition=er(this),u=this._vnode,l=tr(u);if(a.data.directives&&a.data.directives.some(function(t){return"show"===t.name})&&(a.data.show=!0),l&&l.data&&!ir(a,l)&&!or(l)){var f=l&&(l.data.transition=y({},c));if("out-in"===r)return this._leaving=!0,et(f,"afterLeave",function(){e._leaving=!1,e.$forceUpdate()}),nr(t,o);if("in-out"===r){if(or(a))return u;var p,d=function(){p()};et(c,"afterEnter",d),et(c,"enterCancelled",d),et(f,"delayLeave",function(t){p=t})}}return o}}},Ma=y({tag:String,moveClass:String},La);delete Ma.mode;var Da={Transition:Ia,TransitionGroup:{props:Ma,render:function(t){for(var e=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=er(this),s=0;s<i.length;s++){var c=i[s];c.tag&&null!=c.key&&0!==String(c.key).indexOf("__vlist")&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var u=[],l=[],f=0;f<r.length;f++){var p=r[f];p.data.transition=a,p.data.pos=p.elm.getBoundingClientRect(),n[p.key]?u.push(p):l.push(p)}this.kept=t(e,null,u),this.removed=l}return t(e,null,o)},beforeUpdate:function(){this.__patch__(this._vnode,this.kept,!1,!0),this._vnode=this.kept},updated:function(){var t=this.prevChildren,e=this.moveClass||(this.name||"v")+"-move";if(t.length&&this.hasMove(t[0].elm,e)){t.forEach(ar),t.forEach(sr),t.forEach(cr);document.body.offsetHeight;t.forEach(function(t){if(t.data.moved){var n=t.elm,r=n.style;Dn(n,e),r.transform=r.WebkitTransform=r.transitionDuration="",n.addEventListener(Aa,n._moveCb=function t(r){r&&!/transform$/.test(r.propertyName)||(n.removeEventListener(Aa,t),n._moveCb=null,Pn(n,e))})}})}},methods:{hasMove:function(t,e){if(!$a)return!1;if(this._hasMove)return this._hasMove;var n=t.cloneNode();t._transitionClasses&&t._transitionClasses.forEach(function(t){Ln(n,t)}),Nn(n,e),n.style.display="none",this.$el.appendChild(n);var r=Rn(n);return this.$el.removeChild(n),this._hasMove=r.hasTransform}}}};_e.config.mustUseProp=Bo,_e.config.isReservedTag=Yo,_e.config.isReservedAttr=Ro,_e.config.getTagNamespace=Pe,_e.config.isUnknownElement=function(t){if(!Ni)return!0;if(Yo(t))return!1;if(t=t.toLowerCase(),null!=Qo[t])return Qo[t];var e=document.createElement(t);return t.indexOf("-")>-1?Qo[t]=e.constructor===window.HTMLUnknownElement||e.constructor===window.HTMLElement:Qo[t]=/HTMLUnknownElement/.test(e.toString())},y(_e.options.directives,Na),y(_e.options.components,Da),_e.prototype.__patch__=Ni?Ea:_,_e.prototype.$mount=function(t,e){return t=t&&Ni?Fe(t):void 0,bt(this,t,e)},setTimeout(function(){Oi.devtools&&Ji&&Ji.emit("init",_e)},0);var Pa,Fa=!!Ni&&function(t,e){var n=document.createElement("div");return n.innerHTML='<div a="'+t+'"/>',n.innerHTML.indexOf(e)>0}("\n","&#10;"),Ra=/\{\{((?:.|\n)+?)\}\}/g,Ha=/[-.*+?^${}()|[\]\/\\]/g,Ba=v(function(t){var e=t[0].replace(Ha,"\\$&"),n=t[1].replace(Ha,"\\$&");return new RegExp(e+"((?:.|\\n)+?)"+n,"g")}),Ua=[{staticKeys:["staticClass"],transformNode:function(t,e){e.warn;var n=sn(t,"class");n&&(t.staticClass=JSON.stringify(n));var r=an(t,"class",!1);r&&(t.classBinding=r)},genData:function(t){var e="";return t.staticClass&&(e+="staticClass:"+t.staticClass+","),t.classBinding&&(e+="class:"+t.classBinding+","),e}},{staticKeys:["staticStyle"],transformNode:function(t,e){e.warn;var n=sn(t,"style");n&&(t.staticStyle=JSON.stringify(da(n)));var r=an(t,"style",!1);r&&(t.styleBinding=r)},genData:function(t){var e="";return t.staticStyle&&(e+="staticStyle:"+t.staticStyle+","),t.styleBinding&&(e+="style:("+t.styleBinding+"),"),e}}],Va={model:function(t,e,n){Do=n;var r=e.value,i=e.modifiers,o=t.tag,a=t.attrsMap.type;if(t.component)return cn(t,r,i),!1;if("select"===o)gn(t,r,i);else if("input"===o&&"checkbox"===a)mn(t,r,i);else if("input"===o&&"radio"===a)yn(t,r,i);else if("input"===o||"textarea"===o)_n(t,r,i);else if(!Oi.isReservedTag(o))return cn(t,r,i),!1;return!0},text:function(t,e){e.value&&en(t,"textContent","_s("+e.value+")")},html:function(t,e){e.value&&en(t,"innerHTML","_s("+e.value+")")}},za=f("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),Ka=f("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),Ja=f("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),qa={expectHTML:!0,modules:Ua,directives:Va,isPreTag:function(t){return"pre"===t},isUnaryTag:za,mustUseProp:Bo,canBeLeftOpenTag:Ka,isReservedTag:Yo,getTagNamespace:Pe,staticKeys:function(t){return t.reduce(function(t,e){return t.concat(e.staticKeys||[])},[]).join(",")}(Ua)},Wa={decode:function(t){return Pa=Pa||document.createElement("div"),Pa.innerHTML=t,Pa.textContent}},Ga=/([^\s"'<>/=]+)/,Za=/(?:=)/,Ya=[/"([^"]*)"+/.source,/'([^']*)'+/.source,/([^\s"'=<>`]+)/.source],Qa=new RegExp("^\\s*"+Ga.source+"(?:\\s*("+Za.source+")\\s*(?:"+Ya.join("|")+"))?"),Xa="[a-zA-Z_][\\w\\-\\.]*",ts="((?:"+Xa+"\\:)?"+Xa+")",es=new RegExp("^<"+ts),ns=/^\s*(\/?)>/,rs=new RegExp("^<\\/"+ts+"[^>]*>"),is=/^<!DOCTYPE [^>]+>/i,os=/^<!--/,as=/^<!\[/,ss=!1;"x".replace(/x(.)?/g,function(t,e){ss=""===e});var cs,us,ls,fs,ps,ds,vs,hs,ms,ys,gs=f("script,style,textarea",!0),_s={},bs={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n"},$s=/&(?:lt|gt|quot|amp);/g,Cs=/&(?:lt|gt|quot|amp|#10);/g,ws=f("pre,textarea",!0),xs=function(t,e){return t&&ws(t)&&"\n"===e[0]},As=/^@|^v-on:/,ks=/^v-|^@|^:/,Os=/(.*?)\s+(?:in|of)\s+(.*)/,Ss=/\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/,Ts=/:(.*)$/,Es=/^:|^v-bind:/,js=/\.[^.]+/g,Ns=v(Wa.decode),Ls=/^xmlns:NS\d+/,Is=/^NS\d+:/,Ms=v(function(t){return f("type,tag,attrsList,attrsMap,plain,parent,children,attrs"+(t?","+t:""))}),Ds=/^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,Ps=/^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,Fs={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},Rs=function(t){return"if("+t+")return null;"},Hs={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:Rs("$event.target !== $event.currentTarget"),ctrl:Rs("!$event.ctrlKey"),shift:Rs("!$event.shiftKey"),alt:Rs("!$event.altKey"),meta:Rs("!$event.metaKey"),left:Rs("'button' in $event && $event.button !== 0"),middle:Rs("'button' in $event && $event.button !== 1"),right:Rs("'button' in $event && $event.button !== 2")},Bs={on:function(t,e){t.wrapListeners=function(t){return"_g("+t+","+e.value+")"}},bind:function(t,e){t.wrapData=function(n){return"_b("+n+",'"+t.tag+"',"+e.value+","+(e.modifiers&&e.modifiers.prop?"true":"false")+(e.modifiers&&e.modifiers.sync?",true":"")+")"}},cloak:_},Us=function(t){this.options=t,this.warn=t.warn||Xe,this.transforms=tn(t.modules,"transformCode"),this.dataGenFns=tn(t.modules,"genData"),this.directives=y(y({},Bs),t.directives);var e=t.isReservedTag||Ci;this.maybeComponent=function(t){return!e(t.tag)},this.onceId=0,this.staticRenderFns=[]},Vs=function(t){return function(e){function n(n,r){var i=Object.create(e),o=[],a=[];if(i.warn=function(t,e){(e?a:o).push(t)},r){r.modules&&(i.modules=(e.modules||[]).concat(r.modules)),r.directives&&(i.directives=y(Object.create(e.directives),r.directives));for(var s in r)"modules"!==s&&"directives"!==s&&(i[s]=r[s])}var c=t(n,i);return c.errors=o,c.tips=a,c}return{compile:n,compileToFunctions:fi(n)}}}(function(t,e){var n=pr(t.trim(),e);Nr(n,e);var r=Br(n,e);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}})(qa).compileToFunctions,zs=v(function(t){var e=Fe(t);return e&&e.innerHTML}),Ks=_e.prototype.$mount;return _e.prototype.$mount=function(t,e){if((t=t&&Fe(t))===document.body||t===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=zs(r));else{if(!r.nodeType)return this;r=r.innerHTML}else t&&(r=pi(t));if(r){var i=Vs(r,{shouldDecodeNewlines:Fa,delimiters:n.delimiters,comments:n.comments},this),o=i.render,a=i.staticRenderFns;n.render=o,n.staticRenderFns=a}}return Ks.call(this,t,e)},_e.compile=Vs,_e});
/* axios v0.16.2 | (c) 2017 by Matt Zabriskie */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.axios=t():e.axios=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function r(e){var t=new s(e),n=i(s.prototype.request,t);return o.extend(n,s.prototype,t),o.extend(n,t),n}var o=n(2),i=n(3),s=n(5),u=n(6),a=r(u);a.Axios=s,a.create=function(e){return r(o.merge(u,e))},a.Cancel=n(23),a.CancelToken=n(24),a.isCancel=n(20),a.all=function(e){return Promise.all(e)},a.spread=n(25),e.exports=a,e.exports.default=a},function(e,t,n){"use strict";function r(e){return"[object Array]"===R.call(e)}function o(e){return"[object ArrayBuffer]"===R.call(e)}function i(e){return"undefined"!=typeof FormData&&e instanceof FormData}function s(e){var t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer}function u(e){return"string"==typeof e}function a(e){return"number"==typeof e}function c(e){return"undefined"==typeof e}function f(e){return null!==e&&"object"==typeof e}function p(e){return"[object Date]"===R.call(e)}function d(e){return"[object File]"===R.call(e)}function l(e){return"[object Blob]"===R.call(e)}function h(e){return"[object Function]"===R.call(e)}function m(e){return f(e)&&h(e.pipe)}function y(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams}function w(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function v(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function g(e,t){if(null!==e&&"undefined"!=typeof e)if("object"==typeof e||r(e)||(e=[e]),r(e))for(var n=0,o=e.length;n<o;n++)t.call(null,e[n],n,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function x(){function e(e,n){"object"==typeof t[n]&&"object"==typeof e?t[n]=x(t[n],e):t[n]=e}for(var t={},n=0,r=arguments.length;n<r;n++)g(arguments[n],e);return t}function b(e,t,n){return g(t,function(t,r){n&&"function"==typeof t?e[r]=E(t,n):e[r]=t}),e}var E=n(3),C=n(4),R=Object.prototype.toString;e.exports={isArray:r,isArrayBuffer:o,isBuffer:C,isFormData:i,isArrayBufferView:s,isString:u,isNumber:a,isObject:f,isUndefined:c,isDate:p,isFile:d,isBlob:l,isFunction:h,isStream:m,isURLSearchParams:y,isStandardBrowserEnv:v,forEach:g,merge:x,extend:b,trim:w}},function(e,t){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function r(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
e.exports=function(e){return null!=e&&(n(e)||r(e)||!!e._isBuffer)}},function(e,t,n){"use strict";function r(e){this.defaults=e,this.interceptors={request:new s,response:new s}}var o=n(6),i=n(2),s=n(17),u=n(18),a=n(21),c=n(22);r.prototype.request=function(e){"string"==typeof e&&(e=i.merge({url:arguments[0]},arguments[1])),e=i.merge(o,this.defaults,{method:"get"},e),e.method=e.method.toLowerCase(),e.baseURL&&!a(e.url)&&(e.url=c(e.baseURL,e.url));var t=[u,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},i.forEach(["delete","get","head","options"],function(e){r.prototype[e]=function(t,n){return this.request(i.merge(n||{},{method:e,url:t}))}}),i.forEach(["post","put","patch"],function(e){r.prototype[e]=function(t,n,r){return this.request(i.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=r},function(e,t,n){"use strict";function r(e,t){!i.isUndefined(e)&&i.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function o(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(8):"undefined"!=typeof process&&(e=n(8)),e}var i=n(2),s=n(7),u={"Content-Type":"application/x-www-form-urlencoded"},a={adapter:o(),transformRequest:[function(e,t){return s(t,"Content-Type"),i.isFormData(e)||i.isArrayBuffer(e)||i.isBuffer(e)||i.isStream(e)||i.isFile(e)||i.isBlob(e)?e:i.isArrayBufferView(e)?e.buffer:i.isURLSearchParams(e)?(r(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):i.isObject(e)?(r(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};a.headers={common:{Accept:"application/json, text/plain, */*"}},i.forEach(["delete","get","head"],function(e){a.headers[e]={}}),i.forEach(["post","put","patch"],function(e){a.headers[e]=i.merge(u)}),e.exports=a},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(2),o=n(9),i=n(12),s=n(13),u=n(14),a=n(10),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(15);e.exports=function(e){return new Promise(function(t,f){var p=e.data,d=e.headers;r.isFormData(p)&&delete d["Content-Type"];var l=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in l||u(e.url)||(l=new window.XDomainRequest,h="onload",m=!0,l.onprogress=function(){},l.ontimeout=function(){}),e.auth){var y=e.auth.username||"",w=e.auth.password||"";d.Authorization="Basic "+c(y+":"+w)}if(l.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),l.timeout=e.timeout,l[h]=function(){if(l&&(4===l.readyState||m)&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in l?s(l.getAllResponseHeaders()):null,r=e.responseType&&"text"!==e.responseType?l.response:l.responseText,i={data:r,status:1223===l.status?204:l.status,statusText:1223===l.status?"No Content":l.statusText,headers:n,config:e,request:l};o(t,f,i),l=null}},l.onerror=function(){f(a("Network Error",e,null,l)),l=null},l.ontimeout=function(){f(a("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",l)),l=null},r.isStandardBrowserEnv()){var v=n(16),g=(e.withCredentials||u(e.url))&&e.xsrfCookieName?v.read(e.xsrfCookieName):void 0;g&&(d[e.xsrfHeaderName]=g)}if("setRequestHeader"in l&&r.forEach(d,function(e,t){"undefined"==typeof p&&"content-type"===t.toLowerCase()?delete d[t]:l.setRequestHeader(t,e)}),e.withCredentials&&(l.withCredentials=!0),e.responseType)try{l.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&l.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){l&&(l.abort(),f(e),l=null)}),void 0===p&&(p=null),l.send(p)})}},function(e,t,n){"use strict";var r=n(10);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";var r=n(11);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},function(e,t){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},function(e,t,n){"use strict";function r(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var o=n(2);e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(o.isURLSearchParams(t))i=t.toString();else{var s=[];o.forEach(t,function(e,t){null!==e&&"undefined"!=typeof e&&(o.isArray(e)&&(t+="[]"),o.isArray(e)||(e=[e]),o.forEach(e,function(e){o.isDate(e)?e=e.toISOString():o.isObject(e)&&(e=JSON.stringify(e)),s.push(r(t)+"="+r(e))}))}),i=s.join("&")}return i&&(e+=(e.indexOf("?")===-1?"?":"&")+i),e}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e){var t,n,o,i={};return e?(r.forEach(e.split("\n"),function(e){o=e.indexOf(":"),t=r.trim(e.substr(0,o)).toLowerCase(),n=r.trim(e.substr(o+1)),t&&(i[t]=i[t]?i[t]+", "+n:n)}),i):i}},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){function e(e){var t=e;return n&&(o.setAttribute("href",t),t=o.href),o.setAttribute("href",t),{href:o.href,protocol:o.protocol?o.protocol.replace(/:$/,""):"",host:o.host,search:o.search?o.search.replace(/^\?/,""):"",hash:o.hash?o.hash.replace(/^#/,""):"",hostname:o.hostname,port:o.port,pathname:"/"===o.pathname.charAt(0)?o.pathname:"/"+o.pathname}}var t,n=/(msie|trident)/i.test(navigator.userAgent),o=document.createElement("a");return t=e(window.location.href),function(n){var o=r.isString(n)?e(n):n;return o.protocol===t.protocol&&o.host===t.host}}():function(){return function(){return!0}}()},function(e,t){"use strict";function n(){this.message="String contains an invalid character"}function r(e){for(var t,r,i=String(e),s="",u=0,a=o;i.charAt(0|u)||(a="=",u%1);s+=a.charAt(63&t>>8-u%1*8)){if(r=i.charCodeAt(u+=.75),r>255)throw new n;t=t<<8|r}return s}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",e.exports=r},function(e,t,n){"use strict";var r=n(2);e.exports=r.isStandardBrowserEnv()?function(){return{write:function(e,t,n,o,i,s){var u=[];u.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&u.push("expires="+new Date(n).toGMTString()),r.isString(o)&&u.push("path="+o),r.isString(i)&&u.push("domain="+i),s===!0&&u.push("secure"),document.cookie=u.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(e,t,n){"use strict";function r(){this.handlers=[]}var o=n(2);r.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},r.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},r.prototype.forEach=function(e){o.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=r},function(e,t,n){"use strict";function r(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var o=n(2),i=n(19),s=n(20),u=n(6);e.exports=function(e){r(e),e.headers=e.headers||{},e.data=i(e.data,e.headers,e.transformRequest),e.headers=o.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),o.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]});var t=e.adapter||u.adapter;return t(e).then(function(t){return r(e),t.data=i(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(r(e),t&&t.response&&(t.response.data=i(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(2);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,n){"use strict";function r(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new o(e),t(n.reason))})}var o=n(23);r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.source=function(){var e,t=new r(function(t){e=t});return{token:t,cancel:e}},e.exports=r},function(e,t){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}])});
//# sourceMappingURL=axios.min.map
/*
* bootstrap-table - v1.11.1 - 2017-02-22
* https://github.com/wenzhixin/bootstrap-table
* Copyright (c) 2017 zhixin wen
* Licensed MIT License
*/
!function(a){"use strict";var b=null,c=function(a){var b=arguments,c=!0,d=1;return a=a.replace(/%s/g,function(){var a=b[d++];return"undefined"==typeof a?(c=!1,""):a}),c?a:""},d=function(b,c,d,e){var f="";return a.each(b,function(a,b){return b[c]===e?(f=b[d],!1):!0}),f},e=function(b,c){var d=-1;return a.each(b,function(a,b){return b.field===c?(d=a,!1):!0}),d},f=function(b){var c,d,e,f=0,g=[];for(c=0;c<b[0].length;c++)f+=b[0][c].colspan||1;for(c=0;c<b.length;c++)for(g[c]=[],d=0;f>d;d++)g[c][d]=!1;for(c=0;c<b.length;c++)for(d=0;d<b[c].length;d++){var h=b[c][d],i=h.rowspan||1,j=h.colspan||1,k=a.inArray(!1,g[c]);for(1===j&&(h.fieldIndex=k,"undefined"==typeof h.field&&(h.field=k)),e=0;i>e;e++)g[c+e][k]=!0;for(e=0;j>e;e++)g[c][k+e]=!0}},g=function(){if(null===b){var c,d,e=a("<p/>").addClass("fixed-table-scroll-inner"),f=a("<div/>").addClass("fixed-table-scroll-outer");f.append(e),a("body").append(f),c=e[0].offsetWidth,f.css("overflow","scroll"),d=e[0].offsetWidth,c===d&&(d=f[0].clientWidth),f.remove(),b=c-d}return b},h=function(b,d,e,f){var g=d;if("string"==typeof d){var h=d.split(".");h.length>1?(g=window,a.each(h,function(a,b){g=g[b]})):g=window[d]}return"object"==typeof g?g:"function"==typeof g?g.apply(b,e||[]):!g&&"string"==typeof d&&c.apply(this,[d].concat(e))?c.apply(this,[d].concat(e)):f},i=function(b,c,d){var e=Object.getOwnPropertyNames(b),f=Object.getOwnPropertyNames(c),g="";if(d&&e.length!==f.length)return!1;for(var h=0;h<e.length;h++)if(g=e[h],a.inArray(g,f)>-1&&b[g]!==c[g])return!1;return!0},j=function(a){return"string"==typeof a?a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/`/g,"&#x60;"):a},k=function(a){for(var b in a){var c=b.split(/(?=[A-Z])/).join("-").toLowerCase();c!==b&&(a[c]=a[b],delete a[b])}return a},l=function(a,b,c){var d=a;if("string"!=typeof b||a.hasOwnProperty(b))return c?j(a[b]):a[b];var e=b.split(".");for(var f in e)e.hasOwnProperty(f)&&(d=d&&d[e[f]]);return c?j(d):d},m=function(){return!!(navigator.userAgent.indexOf("MSIE ")>0||navigator.userAgent.match(/Trident.*rv\:11\./))},n=function(){Object.keys||(Object.keys=function(){var a=Object.prototype.hasOwnProperty,b=!{toString:null}.propertyIsEnumerable("toString"),c=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],d=c.length;return function(e){if("object"!=typeof e&&("function"!=typeof e||null===e))throw new TypeError("Object.keys called on non-object");var f,g,h=[];for(f in e)a.call(e,f)&&h.push(f);if(b)for(g=0;d>g;g++)a.call(e,c[g])&&h.push(c[g]);return h}}())},o=function(b,c){this.options=c,this.$el=a(b),this.$el_=this.$el.clone(),this.timeoutId_=0,this.timeoutFooter_=0,this.init()};o.DEFAULTS={classes:"table table-hover",sortClass:void 0,locale:void 0,height:void 0,undefinedText:"-",sortName:void 0,sortOrder:"asc",sortStable:!1,striped:!1,columns:[[]],data:[],totalField:"total",dataField:"rows",method:"get",url:void 0,ajax:void 0,cache:!0,contentType:"application/json",dataType:"json",ajaxOptions:{},queryParams:function(a){return a},queryParamsType:"limit",responseHandler:function(a){return a},pagination:!1,onlyInfoPagination:!1,paginationLoop:!0,sidePagination:"client",totalRows:0,pageNumber:1,pageSize:10,pageList:[10,25,50,100],paginationHAlign:"right",paginationVAlign:"bottom",paginationDetailHAlign:"left",paginationPreText:"&lsaquo;",paginationNextText:"&rsaquo;",search:!1,searchOnEnterKey:!1,strictSearch:!1,searchAlign:"right",selectItemName:"btSelectItem",showHeader:!0,showFooter:!1,showColumns:!1,showPaginationSwitch:!1,showRefresh:!1,showToggle:!1,buttonsAlign:"right",smartDisplay:!0,escape:!1,minimumCountColumns:1,idField:void 0,uniqueId:void 0,cardView:!1,detailView:!1,detailFormatter:function(){return""},trimOnSearch:!0,clickToSelect:!1,singleSelect:!1,toolbar:void 0,toolbarAlign:"left",checkboxHeader:!0,sortable:!0,silentSort:!0,maintainSelected:!1,searchTimeOut:500,searchText:"",iconSize:void 0,buttonsClass:"default",iconsPrefix:"glyphicon",icons:{paginationSwitchDown:"glyphicon-collapse-down icon-chevron-down",paginationSwitchUp:"glyphicon-collapse-up icon-chevron-up",refresh:"glyphicon-refresh icon-refresh",toggle:"glyphicon-list-alt icon-list-alt",columns:"glyphicon-th icon-th",detailOpen:"glyphicon-plus icon-plus",detailClose:"glyphicon-minus icon-minus"},customSearch:a.noop,customSort:a.noop,rowStyle:function(){return{}},rowAttributes:function(){return{}},footerStyle:function(){return{}},onAll:function(){return!1},onClickCell:function(){return!1},onDblClickCell:function(){return!1},onClickRow:function(){return!1},onDblClickRow:function(){return!1},onSort:function(){return!1},onCheck:function(){return!1},onUncheck:function(){return!1},onCheckAll:function(){return!1},onUncheckAll:function(){return!1},onCheckSome:function(){return!1},onUncheckSome:function(){return!1},onLoadSuccess:function(){return!1},onLoadError:function(){return!1},onColumnSwitch:function(){return!1},onPageChange:function(){return!1},onSearch:function(){return!1},onToggle:function(){return!1},onPreBody:function(){return!1},onPostBody:function(){return!1},onPostHeader:function(){return!1},onExpandRow:function(){return!1},onCollapseRow:function(){return!1},onRefreshOptions:function(){return!1},onRefresh:function(){return!1},onResetView:function(){return!1}},o.LOCALES={},o.LOCALES["en-US"]=o.LOCALES.en={formatLoadingMessage:function(){return"Loading, please wait..."},formatRecordsPerPage:function(a){return c("%s rows per page",a)},formatShowingRows:function(a,b,d){return c("Showing %s to %s of %s rows",a,b,d)},formatDetailPagination:function(a){return c("Showing %s rows",a)},formatSearch:function(){return"Search"},formatNoMatches:function(){return"No matching records found"},formatPaginationSwitch:function(){return"Hide/Show pagination"},formatRefresh:function(){return"Refresh"},formatToggle:function(){return"Toggle"},formatColumns:function(){return"Columns"},formatAllRows:function(){return"All"}},a.extend(o.DEFAULTS,o.LOCALES["en-US"]),o.COLUMN_DEFAULTS={radio:!1,checkbox:!1,checkboxEnabled:!0,field:void 0,title:void 0,titleTooltip:void 0,"class":void 0,align:void 0,halign:void 0,falign:void 0,valign:void 0,width:void 0,sortable:!1,order:"asc",visible:!0,switchable:!0,clickToSelect:!0,formatter:void 0,footerFormatter:void 0,events:void 0,sorter:void 0,sortName:void 0,cellStyle:void 0,searchable:!0,searchFormatter:!0,cardVisible:!0,escape:!1},o.EVENTS={"all.bs.table":"onAll","click-cell.bs.table":"onClickCell","dbl-click-cell.bs.table":"onDblClickCell","click-row.bs.table":"onClickRow","dbl-click-row.bs.table":"onDblClickRow","sort.bs.table":"onSort","check.bs.table":"onCheck","uncheck.bs.table":"onUncheck","check-all.bs.table":"onCheckAll","uncheck-all.bs.table":"onUncheckAll","check-some.bs.table":"onCheckSome","uncheck-some.bs.table":"onUncheckSome","load-success.bs.table":"onLoadSuccess","load-error.bs.table":"onLoadError","column-switch.bs.table":"onColumnSwitch","page-change.bs.table":"onPageChange","search.bs.table":"onSearch","toggle.bs.table":"onToggle","pre-body.bs.table":"onPreBody","post-body.bs.table":"onPostBody","post-header.bs.table":"onPostHeader","expand-row.bs.table":"onExpandRow","collapse-row.bs.table":"onCollapseRow","refresh-options.bs.table":"onRefreshOptions","reset-view.bs.table":"onResetView","refresh.bs.table":"onRefresh"},o.prototype.init=function(){this.initLocale(),this.initContainer(),this.initTable(),this.initHeader(),this.initData(),this.initHiddenRows(),this.initFooter(),this.initToolbar(),this.initPagination(),this.initBody(),this.initSearchText(),this.initServer()},o.prototype.initLocale=function(){if(this.options.locale){var b=this.options.locale.split(/-|_/);b[0].toLowerCase(),b[1]&&b[1].toUpperCase(),a.fn.bootstrapTable.locales[this.options.locale]?a.extend(this.options,a.fn.bootstrapTable.locales[this.options.locale]):a.fn.bootstrapTable.locales[b.join("-")]?a.extend(this.options,a.fn.bootstrapTable.locales[b.join("-")]):a.fn.bootstrapTable.locales[b[0]]&&a.extend(this.options,a.fn.bootstrapTable.locales[b[0]])}},o.prototype.initContainer=function(){this.$container=a(['<div class="bootstrap-table">','<div class="fixed-table-toolbar"></div>',"top"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?'<div class="fixed-table-pagination" style="clear: both;"></div>':"",'<div class="fixed-table-container">','<div class="fixed-table-header"><table></table></div>','<div class="fixed-table-body">','<div class="fixed-table-loading">',this.options.formatLoadingMessage(),"</div>","</div>",'<div class="fixed-table-footer"><table><tr></tr></table></div>',"bottom"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?'<div class="fixed-table-pagination"></div>':"","</div>","</div>"].join("")),this.$container.insertAfter(this.$el),this.$tableContainer=this.$container.find(".fixed-table-container"),this.$tableHeader=this.$container.find(".fixed-table-header"),this.$tableBody=this.$container.find(".fixed-table-body"),this.$tableLoading=this.$container.find(".fixed-table-loading"),this.$tableFooter=this.$container.find(".fixed-table-footer"),this.$toolbar=this.$container.find(".fixed-table-toolbar"),this.$pagination=this.$container.find(".fixed-table-pagination"),this.$tableBody.append(this.$el),this.$container.after('<div class="clearfix"></div>'),this.$el.addClass(this.options.classes),this.options.striped&&this.$el.addClass("table-striped"),-1!==a.inArray("table-no-bordered",this.options.classes.split(" "))&&this.$tableContainer.addClass("table-no-bordered")},o.prototype.initTable=function(){var b=this,c=[],d=[];if(this.$header=this.$el.find(">thead"),this.$header.length||(this.$header=a("<thead></thead>").appendTo(this.$el)),this.$header.find("tr").each(function(){var b=[];a(this).find("th").each(function(){"undefined"!=typeof a(this).data("field")&&a(this).data("field",a(this).data("field")+""),b.push(a.extend({},{title:a(this).html(),"class":a(this).attr("class"),titleTooltip:a(this).attr("title"),rowspan:a(this).attr("rowspan")?+a(this).attr("rowspan"):void 0,colspan:a(this).attr("colspan")?+a(this).attr("colspan"):void 0},a(this).data()))}),c.push(b)}),a.isArray(this.options.columns[0])||(this.options.columns=[this.options.columns]),this.options.columns=a.extend(!0,[],c,this.options.columns),this.columns=[],f(this.options.columns),a.each(this.options.columns,function(c,d){a.each(d,function(d,e){e=a.extend({},o.COLUMN_DEFAULTS,e),"undefined"!=typeof e.fieldIndex&&(b.columns[e.fieldIndex]=e),b.options.columns[c][d]=e})}),!this.options.data.length){var e=[];this.$el.find(">tbody>tr").each(function(c){var f={};f._id=a(this).attr("id"),f._class=a(this).attr("class"),f._data=k(a(this).data()),a(this).find(">td").each(function(d){for(var g,h,i=a(this),j=+i.attr("colspan")||1,l=+i.attr("rowspan")||1;e[c]&&e[c][d];d++);for(g=d;d+j>g;g++)for(h=c;c+l>h;h++)e[h]||(e[h]=[]),e[h][g]=!0;var m=b.columns[d].field;f[m]=a(this).html(),f["_"+m+"_id"]=a(this).attr("id"),f["_"+m+"_class"]=a(this).attr("class"),f["_"+m+"_rowspan"]=a(this).attr("rowspan"),f["_"+m+"_colspan"]=a(this).attr("colspan"),f["_"+m+"_title"]=a(this).attr("title"),f["_"+m+"_data"]=k(a(this).data())}),d.push(f)}),this.options.data=d,d.length&&(this.fromHtml=!0)}},o.prototype.initHeader=function(){var b=this,d={},e=[];this.header={fields:[],styles:[],classes:[],formatters:[],events:[],sorters:[],sortNames:[],cellStyles:[],searchables:[]},a.each(this.options.columns,function(f,g){e.push("<tr>"),0===f&&!b.options.cardView&&b.options.detailView&&e.push(c('<th class="detail" rowspan="%s"><div class="fht-cell"></div></th>',b.options.columns.length)),a.each(g,function(a,f){var g="",h="",i="",k="",l=c(' class="%s"',f["class"]),m=(b.options.sortOrder||f.order,"px"),n=f.width;if(void 0===f.width||b.options.cardView||"string"==typeof f.width&&-1!==f.width.indexOf("%")&&(m="%"),f.width&&"string"==typeof f.width&&(n=f.width.replace("%","").replace("px","")),h=c("text-align: %s; ",f.halign?f.halign:f.align),i=c("text-align: %s; ",f.align),k=c("vertical-align: %s; ",f.valign),k+=c("width: %s; ",!f.checkbox&&!f.radio||n?n?n+m:void 0:"36px"),"undefined"!=typeof f.fieldIndex){if(b.header.fields[f.fieldIndex]=f.field,b.header.styles[f.fieldIndex]=i+k,b.header.classes[f.fieldIndex]=l,b.header.formatters[f.fieldIndex]=f.formatter,b.header.events[f.fieldIndex]=f.events,b.header.sorters[f.fieldIndex]=f.sorter,b.header.sortNames[f.fieldIndex]=f.sortName,b.header.cellStyles[f.fieldIndex]=f.cellStyle,b.header.searchables[f.fieldIndex]=f.searchable,!f.visible)return;if(b.options.cardView&&!f.cardVisible)return;d[f.field]=f}e.push("<th"+c(' title="%s"',f.titleTooltip),f.checkbox||f.radio?c(' class="bs-checkbox %s"',f["class"]||""):l,c(' style="%s"',h+k),c(' rowspan="%s"',f.rowspan),c(' colspan="%s"',f.colspan),c(' data-field="%s"',f.field),">"),e.push(c('<div class="th-inner %s">',b.options.sortable&&f.sortable?"sortable both":"")),g=b.options.escape?j(f.title):f.title,f.checkbox&&(!b.options.singleSelect&&b.options.checkboxHeader&&(g='<input name="btSelectAll" type="checkbox" />'),b.header.stateField=f.field),f.radio&&(g="",b.header.stateField=f.field,b.options.singleSelect=!0),e.push(g),e.push("</div>"),e.push('<div class="fht-cell"></div>'),e.push("</div>"),e.push("</th>")}),e.push("</tr>")}),this.$header.html(e.join("")),this.$header.find("th[data-field]").each(function(){a(this).data(d[a(this).data("field")])}),this.$container.off("click",".th-inner").on("click",".th-inner",function(c){var d=a(this);return b.options.detailView&&d.closest(".bootstrap-table")[0]!==b.$container[0]?!1:void(b.options.sortable&&d.parent().data().sortable&&b.onSort(c))}),this.$header.children().children().off("keypress").on("keypress",function(c){if(b.options.sortable&&a(this).data().sortable){var d=c.keyCode||c.which;13==d&&b.onSort(c)}}),a(window).off("resize.bootstrap-table"),!this.options.showHeader||this.options.cardView?(this.$header.hide(),this.$tableHeader.hide(),this.$tableLoading.css("top",0)):(this.$header.show(),this.$tableHeader.show(),this.$tableLoading.css("top",this.$header.outerHeight()+1),this.getCaret(),a(window).on("resize.bootstrap-table",a.proxy(this.resetWidth,this))),this.$selectAll=this.$header.find('[name="btSelectAll"]'),this.$selectAll.off("click").on("click",function(){var c=a(this).prop("checked");b[c?"checkAll":"uncheckAll"](),b.updateSelected()})},o.prototype.initFooter=function(){!this.options.showFooter||this.options.cardView?this.$tableFooter.hide():this.$tableFooter.show()},o.prototype.initData=function(a,b){this.data="append"===b?this.data.concat(a):"prepend"===b?[].concat(a).concat(this.data):a||this.options.data,this.options.data="append"===b?this.options.data.concat(a):"prepend"===b?[].concat(a).concat(this.options.data):this.data,"server"!==this.options.sidePagination&&this.initSort()},o.prototype.initSort=function(){var b=this,d=this.options.sortName,e="desc"===this.options.sortOrder?-1:1,f=a.inArray(this.options.sortName,this.header.fields),g=0;return this.options.customSort!==a.noop?void this.options.customSort.apply(this,[this.options.sortName,this.options.sortOrder]):void(-1!==f&&(this.options.sortStable&&a.each(this.data,function(a,b){b.hasOwnProperty("_position")||(b._position=a)}),this.data.sort(function(c,g){b.header.sortNames[f]&&(d=b.header.sortNames[f]);var i=l(c,d,b.options.escape),j=l(g,d,b.options.escape),k=h(b.header,b.header.sorters[f],[i,j]);return void 0!==k?e*k:((void 0===i||null===i)&&(i=""),(void 0===j||null===j)&&(j=""),b.options.sortStable&&i===j&&(i=c._position,j=g._position),a.isNumeric(i)&&a.isNumeric(j)?(i=parseFloat(i),j=parseFloat(j),j>i?-1*e:e):i===j?0:("string"!=typeof i&&(i=i.toString()),-1===i.localeCompare(j)?-1*e:e))}),void 0!==this.options.sortClass&&(clearTimeout(g),g=setTimeout(function(){b.$el.removeClass(b.options.sortClass);var a=b.$header.find(c('[data-field="%s"]',b.options.sortName).index()+1);b.$el.find(c("tr td:nth-child(%s)",a)).addClass(b.options.sortClass)},250))))},o.prototype.onSort=function(b){var c="keypress"===b.type?a(b.currentTarget):a(b.currentTarget).parent(),d=this.$header.find("th").eq(c.index());return this.$header.add(this.$header_).find("span.order").remove(),this.options.sortName===c.data("field")?this.options.sortOrder="asc"===this.options.sortOrder?"desc":"asc":(this.options.sortName=c.data("field"),this.options.sortOrder="asc"===c.data("order")?"desc":"asc"),this.trigger("sort",this.options.sortName,this.options.sortOrder),c.add(d).data("order",this.options.sortOrder),this.getCaret(),"server"===this.options.sidePagination?void this.initServer(this.options.silentSort):(this.initSort(),void this.initBody())},o.prototype.initToolbar=function(){var b,d,e=this,f=[],g=0,i=0;this.$toolbar.find(".bs-bars").children().length&&a("body").append(a(this.options.toolbar)),this.$toolbar.html(""),("string"==typeof this.options.toolbar||"object"==typeof this.options.toolbar)&&a(c('<div class="bs-bars pull-%s"></div>',this.options.toolbarAlign)).appendTo(this.$toolbar).append(a(this.options.toolbar)),f=[c('<div class="columns columns-%s btn-group pull-%s">',this.options.buttonsAlign,this.options.buttonsAlign)],"string"==typeof this.options.icons&&(this.options.icons=h(null,this.options.icons)),this.options.showPaginationSwitch&&f.push(c('<button class="btn'+c(" btn-%s",this.options.buttonsClass)+c(" btn-%s",this.options.iconSize)+'" type="button" name="paginationSwitch" aria-label="pagination Switch" title="%s">',this.options.formatPaginationSwitch()),c('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.paginationSwitchDown),"</button>"),this.options.showRefresh&&f.push(c('<button class="btn'+c(" btn-%s",this.options.buttonsClass)+c(" btn-%s",this.options.iconSize)+'" type="button" name="refresh" aria-label="refresh" title="%s">',this.options.formatRefresh()),c('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.refresh),"</button>"),this.options.showToggle&&f.push(c('<button class="btn'+c(" btn-%s",this.options.buttonsClass)+c(" btn-%s",this.options.iconSize)+'" type="button" name="toggle" aria-label="toggle" title="%s">',this.options.formatToggle()),c('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.toggle),"</button>"),this.options.showColumns&&(f.push(c('<div class="keep-open btn-group" title="%s">',this.options.formatColumns()),'<button type="button" aria-label="columns" class="btn'+c(" btn-%s",this.options.buttonsClass)+c(" btn-%s",this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">',c('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.columns),' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'),a.each(this.columns,function(a,b){if(!(b.radio||b.checkbox||e.options.cardView&&!b.cardVisible)){var d=b.visible?' checked="checked"':"";b.switchable&&(f.push(c('<li role="menuitem"><label><input type="checkbox" data-field="%s" value="%s"%s> %s</label></li>',b.field,a,d,b.title)),i++)}}),f.push("</ul>","</div>")),f.push("</div>"),(this.showToolbar||f.length>2)&&this.$toolbar.append(f.join("")),this.options.showPaginationSwitch&&this.$toolbar.find('button[name="paginationSwitch"]').off("click").on("click",a.proxy(this.togglePagination,this)),this.options.showRefresh&&this.$toolbar.find('button[name="refresh"]').off("click").on("click",a.proxy(this.refresh,this)),this.options.showToggle&&this.$toolbar.find('button[name="toggle"]').off("click").on("click",function(){e.toggleView()}),this.options.showColumns&&(b=this.$toolbar.find(".keep-open"),i<=this.options.minimumCountColumns&&b.find("input").prop("disabled",!0),b.find("li").off("click").on("click",function(a){a.stopImmediatePropagation()}),b.find("input").off("click").on("click",function(){var b=a(this);e.toggleColumn(a(this).val(),b.prop("checked"),!1),e.trigger("column-switch",a(this).data("field"),b.prop("checked"))})),this.options.search&&(f=[],f.push('<div class="pull-'+this.options.searchAlign+' search">',c('<input class="form-control'+c(" input-%s",this.options.iconSize)+'" type="text" placeholder="%s">',this.options.formatSearch()),"</div>"),this.$toolbar.append(f.join("")),d=this.$toolbar.find(".search input"),d.off("keyup drop blur").on("keyup drop blur",function(b){e.options.searchOnEnterKey&&13!==b.keyCode||a.inArray(b.keyCode,[37,38,39,40])>-1||(clearTimeout(g),g=setTimeout(function(){e.onSearch(b)},e.options.searchTimeOut))}),m()&&d.off("mouseup").on("mouseup",function(a){clearTimeout(g),g=setTimeout(function(){e.onSearch(a)},e.options.searchTimeOut)}))},o.prototype.onSearch=function(b){var c=a.trim(a(b.currentTarget).val());this.options.trimOnSearch&&a(b.currentTarget).val()!==c&&a(b.currentTarget).val(c),c!==this.searchText&&(this.searchText=c,this.options.searchText=c,this.options.pageNumber=1,this.initSearch(),this.updatePagination(),this.trigger("search",c))},o.prototype.initSearch=function(){var b=this;if("server"!==this.options.sidePagination){if(this.options.customSearch!==a.noop)return void this.options.customSearch.apply(this,[this.searchText]);var c=this.searchText&&(this.options.escape?j(this.searchText):this.searchText).toLowerCase(),d=a.isEmptyObject(this.filterColumns)?null:this.filterColumns;this.data=d?a.grep(this.options.data,function(b){for(var c in d)if(a.isArray(d[c])&&-1===a.inArray(b[c],d[c])||!a.isArray(d[c])&&b[c]!==d[c])return!1;return!0}):this.options.data,this.data=c?a.grep(this.data,function(d,f){for(var g=0;g<b.header.fields.length;g++)if(b.header.searchables[g]){var i,j=a.isNumeric(b.header.fields[g])?parseInt(b.header.fields[g],10):b.header.fields[g],k=b.columns[e(b.columns,j)];if("string"==typeof j){i=d;for(var l=j.split("."),m=0;m<l.length;m++)i=i[l[m]];k&&k.searchFormatter&&(i=h(k,b.header.formatters[g],[i,d,f],i))}else i=d[j];if("string"==typeof i||"number"==typeof i)if(b.options.strictSearch){if((i+"").toLowerCase()===c)return!0}else if(-1!==(i+"").toLowerCase().indexOf(c))return!0}return!1}):this.data}},o.prototype.initPagination=function(){if(!this.options.pagination)return void this.$pagination.hide();this.$pagination.show();var b,d,e,f,g,h,i,j,k,l=this,m=[],n=!1,o=this.getData(),p=this.options.pageList;if("server"!==this.options.sidePagination&&(this.options.totalRows=o.length),this.totalPages=0,this.options.totalRows){if(this.options.pageSize===this.options.formatAllRows())this.options.pageSize=this.options.totalRows,n=!0;else if(this.options.pageSize===this.options.totalRows){var q="string"==typeof this.options.pageList?this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").toLowerCase().split(","):this.options.pageList;a.inArray(this.options.formatAllRows().toLowerCase(),q)>-1&&(n=!0)}this.totalPages=~~((this.options.totalRows-1)/this.options.pageSize)+1,this.options.totalPages=this.totalPages}if(this.totalPages>0&&this.options.pageNumber>this.totalPages&&(this.options.pageNumber=this.totalPages),this.pageFrom=(this.options.pageNumber-1)*this.options.pageSize+1,this.pageTo=this.options.pageNumber*this.options.pageSize,this.pageTo>this.options.totalRows&&(this.pageTo=this.options.totalRows),m.push('<div class="pull-'+this.options.paginationDetailHAlign+' pagination-detail">','<span class="pagination-info">',this.options.onlyInfoPagination?this.options.formatDetailPagination(this.options.totalRows):this.options.formatShowingRows(this.pageFrom,this.pageTo,this.options.totalRows),"</span>"),!this.options.onlyInfoPagination){m.push('<span class="page-list">');var r=[c('<span class="btn-group %s">',"top"===this.options.paginationVAlign||"both"===this.options.paginationVAlign?"dropdown":"dropup"),'<button type="button" class="btn'+c(" btn-%s",this.options.buttonsClass)+c(" btn-%s",this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">','<span class="page-size">',n?this.options.formatAllRows():this.options.pageSize,"</span>",' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'];if("string"==typeof this.options.pageList){var s=this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").split(",");p=[],a.each(s,function(a,b){p.push(b.toUpperCase()===l.options.formatAllRows().toUpperCase()?l.options.formatAllRows():+b)})}for(a.each(p,function(a,b){if(!l.options.smartDisplay||0===a||p[a-1]<l.options.totalRows){var d;d=n?b===l.options.formatAllRows()?' class="active"':"":b===l.options.pageSize?' class="active"':"",r.push(c('<li role="menuitem"%s><a href="#">%s</a></li>',d,b))}}),r.push("</ul></span>"),m.push(this.options.formatRecordsPerPage(r.join(""))),m.push("</span>"),m.push("</div>",'<div class="pull-'+this.options.paginationHAlign+' pagination">','<ul class="pagination'+c(" pagination-%s",this.options.iconSize)+'">','<li class="page-pre"><a href="#">'+this.options.paginationPreText+"</a></li>"),this.totalPages<5?(d=1,e=this.totalPages):(d=this.options.pageNumber-2,e=d+4,1>d&&(d=1,e=5),e>this.totalPages&&(e=this.totalPages,d=e-4)),this.totalPages>=6&&(this.options.pageNumber>=3&&(m.push('<li class="page-first'+(1===this.options.pageNumber?" active":"")+'">','<a href="#">',1,"</a>","</li>"),d++),this.options.pageNumber>=4&&(4==this.options.pageNumber||6==this.totalPages||7==this.totalPages?d--:m.push('<li class="page-first-separator disabled">','<a href="#">...</a>',"</li>"),e--)),this.totalPages>=7&&this.options.pageNumber>=this.totalPages-2&&d--,6==this.totalPages?this.options.pageNumber>=this.totalPages-2&&e++:this.totalPages>=7&&(7==this.totalPages||this.options.pageNumber>=this.totalPages-3)&&e++,b=d;e>=b;b++)m.push('<li class="page-number'+(b===this.options.pageNumber?" active":"")+'">','<a href="#">',b,"</a>","</li>");this.totalPages>=8&&this.options.pageNumber<=this.totalPages-4&&m.push('<li class="page-last-separator disabled">','<a href="#">...</a>',"</li>"),this.totalPages>=6&&this.options.pageNumber<=this.totalPages-3&&m.push('<li class="page-last'+(this.totalPages===this.options.pageNumber?" active":"")+'">','<a href="#">',this.totalPages,"</a>","</li>"),m.push('<li class="page-next"><a href="#">'+this.options.paginationNextText+"</a></li>","</ul>","</div>")}this.$pagination.html(m.join("")),this.options.onlyInfoPagination||(f=this.$pagination.find(".page-list a"),g=this.$pagination.find(".page-first"),h=this.$pagination.find(".page-pre"),i=this.$pagination.find(".page-next"),j=this.$pagination.find(".page-last"),k=this.$pagination.find(".page-number"),this.options.smartDisplay&&(this.totalPages<=1&&this.$pagination.find("div.pagination").hide(),(p.length<2||this.options.totalRows<=p[0])&&this.$pagination.find("span.page-list").hide(),this.$pagination[this.getData().length?"show":"hide"]()),this.options.paginationLoop||(1===this.options.pageNumber&&h.addClass("disabled"),this.options.pageNumber===this.totalPages&&i.addClass("disabled")),n&&(this.options.pageSize=this.options.formatAllRows()),f.off("click").on("click",a.proxy(this.onPageListChange,this)),g.off("click").on("click",a.proxy(this.onPageFirst,this)),h.off("click").on("click",a.proxy(this.onPagePre,this)),i.off("click").on("click",a.proxy(this.onPageNext,this)),j.off("click").on("click",a.proxy(this.onPageLast,this)),k.off("click").on("click",a.proxy(this.onPageNumber,this)))},o.prototype.updatePagination=function(b){b&&a(b.currentTarget).hasClass("disabled")||(this.options.maintainSelected||this.resetRows(),this.initPagination(),"server"===this.options.sidePagination?this.initServer():this.initBody(),this.trigger("page-change",this.options.pageNumber,this.options.pageSize))},o.prototype.onPageListChange=function(b){var c=a(b.currentTarget);return c.parent().addClass("active").siblings().removeClass("active"),this.options.pageSize=c.text().toUpperCase()===this.options.formatAllRows().toUpperCase()?this.options.formatAllRows():+c.text(),this.$toolbar.find(".page-size").text(this.options.pageSize),this.updatePagination(b),!1},o.prototype.onPageFirst=function(a){return this.options.pageNumber=1,this.updatePagination(a),!1},o.prototype.onPagePre=function(a){return this.options.pageNumber-1===0?this.options.pageNumber=this.options.totalPages:this.options.pageNumber--,this.updatePagination(a),!1},o.prototype.onPageNext=function(a){return this.options.pageNumber+1>this.options.totalPages?this.options.pageNumber=1:this.options.pageNumber++,this.updatePagination(a),!1},o.prototype.onPageLast=function(a){return this.options.pageNumber=this.totalPages,this.updatePagination(a),!1},o.prototype.onPageNumber=function(b){return this.options.pageNumber!==+a(b.currentTarget).text()?(this.options.pageNumber=+a(b.currentTarget).text(),this.updatePagination(b),!1):void 0},o.prototype.initRow=function(b,e){var f,g=this,i=[],k={},m=[],n="",o={},p=[];if(!(a.inArray(b,this.hiddenRows)>-1)){if(k=h(this.options,this.options.rowStyle,[b,e],k),k&&k.css)for(f in k.css)m.push(f+": "+k.css[f]);if(o=h(this.options,this.options.rowAttributes,[b,e],o))for(f in o)p.push(c('%s="%s"',f,j(o[f])));return b._data&&!a.isEmptyObject(b._data)&&a.each(b._data,function(a,b){"index"!==a&&(n+=c(' data-%s="%s"',a,b))}),i.push("<tr",c(" %s",p.join(" ")),c(' id="%s"',a.isArray(b)?void 0:b._id),c(' class="%s"',k.classes||(a.isArray(b)?void 0:b._class)),c(' data-index="%s"',e),c(' data-uniqueid="%s"',b[this.options.uniqueId]),c("%s",n),">"),this.options.cardView&&i.push(c('<td colspan="%s"><div class="card-views">',this.header.fields.length)),!this.options.cardView&&this.options.detailView&&i.push("<td>",'<a class="detail-icon" href="#">',c('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.detailOpen),"</a>","</td>"),a.each(this.header.fields,function(f,n){var o="",p=l(b,n,g.options.escape),q="",r="",s={},t="",u=g.header.classes[f],v="",w="",x="",y="",z=g.columns[f];if(!(g.fromHtml&&"undefined"==typeof p||!z.visible||g.options.cardView&&!z.cardVisible)){if(z.escape&&(p=j(p)),k=c('style="%s"',m.concat(g.header.styles[f]).join("; ")),b["_"+n+"_id"]&&(t=c(' id="%s"',b["_"+n+"_id"])),b["_"+n+"_class"]&&(u=c(' class="%s"',b["_"+n+"_class"])),b["_"+n+"_rowspan"]&&(w=c(' rowspan="%s"',b["_"+n+"_rowspan"])),b["_"+n+"_colspan"]&&(x=c(' colspan="%s"',b["_"+n+"_colspan"])),b["_"+n+"_title"]&&(y=c(' title="%s"',b["_"+n+"_title"])),s=h(g.header,g.header.cellStyles[f],[p,b,e,n],s),s.classes&&(u=c(' class="%s"',s.classes)),s.css){var A=[];for(var B in s.css)A.push(B+": "+s.css[B]);k=c('style="%s"',A.concat(g.header.styles[f]).join("; "))}q=h(z,g.header.formatters[f],[p,b,e],p),b["_"+n+"_data"]&&!a.isEmptyObject(b["_"+n+"_data"])&&a.each(b["_"+n+"_data"],function(a,b){"index"!==a&&(v+=c(' data-%s="%s"',a,b))}),z.checkbox||z.radio?(r=z.checkbox?"checkbox":r,r=z.radio?"radio":r,o=[c(g.options.cardView?'<div class="card-view %s">':'<td class="bs-checkbox %s">',z["class"]||""),"<input"+c(' data-index="%s"',e)+c(' name="%s"',g.options.selectItemName)+c(' type="%s"',r)+c(' value="%s"',b[g.options.idField])+c(' checked="%s"',q===!0||p||q&&q.checked?"checked":void 0)+c(' disabled="%s"',!z.checkboxEnabled||q&&q.disabled?"disabled":void 0)+" />",g.header.formatters[f]&&"string"==typeof q?q:"",g.options.cardView?"</div>":"</td>"].join(""),b[g.header.stateField]=q===!0||q&&q.checked):(q="undefined"==typeof q||null===q?g.options.undefinedText:q,o=g.options.cardView?['<div class="card-view">',g.options.showHeader?c('<span class="title" %s>%s</span>',k,d(g.columns,"field","title",n)):"",c('<span class="value">%s</span>',q),"</div>"].join(""):[c("<td%s %s %s %s %s %s %s>",t,u,k,v,w,x,y),q,"</td>"].join(""),g.options.cardView&&g.options.smartDisplay&&""===q&&(o='<div class="card-view"></div>')),i.push(o)}}),this.options.cardView&&i.push("</div></td>"),i.push("</tr>"),i.join(" ")}},o.prototype.initBody=function(b){var d=this,f=this.getData();this.trigger("pre-body",f),this.$body=this.$el.find(">tbody"),this.$body.length||(this.$body=a("<tbody></tbody>").appendTo(this.$el)),this.options.pagination&&"server"!==this.options.sidePagination||(this.pageFrom=1,this.pageTo=f.length);for(var g,i=a(document.createDocumentFragment()),j=this.pageFrom-1;j<this.pageTo;j++){
var k=f[j],m=this.initRow(k,j,f,i);g=g||!!m,m&&m!==!0&&i.append(m)}g||i.append('<tr class="no-records-found">'+c('<td colspan="%s">%s</td>',this.$header.find("th").length,this.options.formatNoMatches())+"</tr>"),this.$body.html(i),b||this.scrollTo(0),this.$body.find("> tr[data-index] > td").off("click dblclick").on("click dblclick",function(b){var f=a(this),g=f.parent(),h=d.data[g.data("index")],i=f[0].cellIndex,j=d.getVisibleFields(),k=j[d.options.detailView&&!d.options.cardView?i-1:i],m=d.columns[e(d.columns,k)],n=l(h,k,d.options.escape);if(!f.find(".detail-icon").length&&(d.trigger("click"===b.type?"click-cell":"dbl-click-cell",k,n,h,f),d.trigger("click"===b.type?"click-row":"dbl-click-row",h,g,k),"click"===b.type&&d.options.clickToSelect&&m.clickToSelect)){var o=g.find(c('[name="%s"]',d.options.selectItemName));o.length&&o[0].click()}}),this.$body.find("> tr[data-index] > td > .detail-icon").off("click").on("click",function(){var b=a(this),e=b.parent().parent(),g=e.data("index"),i=f[g];if(e.next().is("tr.detail-view"))b.find("i").attr("class",c("%s %s",d.options.iconsPrefix,d.options.icons.detailOpen)),d.trigger("collapse-row",g,i),e.next().remove();else{b.find("i").attr("class",c("%s %s",d.options.iconsPrefix,d.options.icons.detailClose)),e.after(c('<tr class="detail-view"><td colspan="%s"></td></tr>',e.find("td").length));var j=e.next().find("td"),k=h(d.options,d.options.detailFormatter,[g,i,j],"");1===j.length&&j.append(k),d.trigger("expand-row",g,i,j)}return d.resetView(),!1}),this.$selectItem=this.$body.find(c('[name="%s"]',this.options.selectItemName)),this.$selectItem.off("click").on("click",function(b){b.stopImmediatePropagation();var c=a(this),e=c.prop("checked"),f=d.data[c.data("index")];d.options.maintainSelected&&a(this).is(":radio")&&a.each(d.options.data,function(a,b){b[d.header.stateField]=!1}),f[d.header.stateField]=e,d.options.singleSelect&&(d.$selectItem.not(this).each(function(){d.data[a(this).data("index")][d.header.stateField]=!1}),d.$selectItem.filter(":checked").not(this).prop("checked",!1)),d.updateSelected(),d.trigger(e?"check":"uncheck",f,c)}),a.each(this.header.events,function(b,c){if(c){"string"==typeof c&&(c=h(null,c));var e=d.header.fields[b],f=a.inArray(e,d.getVisibleFields());d.options.detailView&&!d.options.cardView&&(f+=1);for(var g in c)d.$body.find(">tr:not(.no-records-found)").each(function(){var b=a(this),h=b.find(d.options.cardView?".card-view":"td").eq(f),i=g.indexOf(" "),j=g.substring(0,i),k=g.substring(i+1),l=c[g];h.find(k).off(j).on(j,function(a){var c=b.data("index"),f=d.data[c],g=f[e];l.apply(this,[a,g,f,c])})})}}),this.updateSelected(),this.resetView(),this.trigger("post-body",f)},o.prototype.initServer=function(b,c,d){var e,f=this,g={},i={searchText:this.searchText,sortName:this.options.sortName,sortOrder:this.options.sortOrder};this.options.pagination&&(i.pageSize=this.options.pageSize===this.options.formatAllRows()?this.options.totalRows:this.options.pageSize,i.pageNumber=this.options.pageNumber),(d||this.options.url||this.options.ajax)&&("limit"===this.options.queryParamsType&&(i={search:i.searchText,sort:i.sortName,order:i.sortOrder},this.options.pagination&&(i.offset=this.options.pageSize===this.options.formatAllRows()?0:this.options.pageSize*(this.options.pageNumber-1),i.limit=this.options.pageSize===this.options.formatAllRows()?this.options.totalRows:this.options.pageSize)),a.isEmptyObject(this.filterColumnsPartial)||(i.filter=JSON.stringify(this.filterColumnsPartial,null)),g=h(this.options,this.options.queryParams,[i],g),a.extend(g,c||{}),g!==!1&&(b||this.$tableLoading.show(),e=a.extend({},h(null,this.options.ajaxOptions),{type:this.options.method,url:d||this.options.url,data:"application/json"===this.options.contentType&&"post"===this.options.method?JSON.stringify(g):g,cache:this.options.cache,contentType:this.options.contentType,dataType:this.options.dataType,success:function(a){a=h(f.options,f.options.responseHandler,[a],a),f.load(a),f.trigger("load-success",a),b||f.$tableLoading.hide()},error:function(a){f.trigger("load-error",a.status,a),b||f.$tableLoading.hide()}}),this.options.ajax?h(this,this.options.ajax,[e],null):(this._xhr&&4!==this._xhr.readyState&&this._xhr.abort(),this._xhr=a.ajax(e))))},o.prototype.initSearchText=function(){if(this.options.search&&""!==this.options.searchText){var a=this.$toolbar.find(".search input");a.val(this.options.searchText),this.onSearch({currentTarget:a})}},o.prototype.getCaret=function(){var b=this;a.each(this.$header.find("th"),function(c,d){a(d).find(".sortable").removeClass("desc asc").addClass(a(d).data("field")===b.options.sortName?b.options.sortOrder:"both")})},o.prototype.updateSelected=function(){var b=this.$selectItem.filter(":enabled").length&&this.$selectItem.filter(":enabled").length===this.$selectItem.filter(":enabled").filter(":checked").length;this.$selectAll.add(this.$selectAll_).prop("checked",b),this.$selectItem.each(function(){a(this).closest("tr")[a(this).prop("checked")?"addClass":"removeClass"]("selected")})},o.prototype.updateRows=function(){var b=this;this.$selectItem.each(function(){b.data[a(this).data("index")][b.header.stateField]=a(this).prop("checked")})},o.prototype.resetRows=function(){var b=this;a.each(this.data,function(a,c){b.$selectAll.prop("checked",!1),b.$selectItem.prop("checked",!1),b.header.stateField&&(c[b.header.stateField]=!1)}),this.initHiddenRows()},o.prototype.trigger=function(b){var c=Array.prototype.slice.call(arguments,1);b+=".bs.table",this.options[o.EVENTS[b]].apply(this.options,c),this.$el.trigger(a.Event(b),c),this.options.onAll(b,c),this.$el.trigger(a.Event("all.bs.table"),[b,c])},o.prototype.resetHeader=function(){clearTimeout(this.timeoutId_),this.timeoutId_=setTimeout(a.proxy(this.fitHeader,this),this.$el.is(":hidden")?100:0)},o.prototype.fitHeader=function(){var b,d,e,f,h=this;if(h.$el.is(":hidden"))return void(h.timeoutId_=setTimeout(a.proxy(h.fitHeader,h),100));if(b=this.$tableBody.get(0),d=b.scrollWidth>b.clientWidth&&b.scrollHeight>b.clientHeight+this.$header.outerHeight()?g():0,this.$el.css("margin-top",-this.$header.outerHeight()),e=a(":focus"),e.length>0){var i=e.parents("th");if(i.length>0){var j=i.attr("data-field");if(void 0!==j){var k=this.$header.find("[data-field='"+j+"']");k.length>0&&k.find(":input").addClass("focus-temp")}}}this.$header_=this.$header.clone(!0,!0),this.$selectAll_=this.$header_.find('[name="btSelectAll"]'),this.$tableHeader.css({"margin-right":d}).find("table").css("width",this.$el.outerWidth()).html("").attr("class",this.$el.attr("class")).append(this.$header_),f=a(".focus-temp:visible:eq(0)"),f.length>0&&(f.focus(),this.$header.find(".focus-temp").removeClass("focus-temp")),this.$header.find("th[data-field]").each(function(){h.$header_.find(c('th[data-field="%s"]',a(this).data("field"))).data(a(this).data())});var l=this.getVisibleFields(),m=this.$header_.find("th");this.$body.find(">tr:first-child:not(.no-records-found) > *").each(function(b){var d=a(this),e=b;h.options.detailView&&!h.options.cardView&&(0===b&&h.$header_.find("th.detail").find(".fht-cell").width(d.innerWidth()),e=b-1);var f=h.$header_.find(c('th[data-field="%s"]',l[e]));f.length>1&&(f=a(m[d[0].cellIndex])),f.find(".fht-cell").width(d.innerWidth())}),this.$tableBody.off("scroll").on("scroll",function(){h.$tableHeader.scrollLeft(a(this).scrollLeft()),h.options.showFooter&&!h.options.cardView&&h.$tableFooter.scrollLeft(a(this).scrollLeft())}),h.trigger("post-header")},o.prototype.resetFooter=function(){var b=this,d=b.getData(),e=[];this.options.showFooter&&!this.options.cardView&&(!this.options.cardView&&this.options.detailView&&e.push('<td><div class="th-inner">&nbsp;</div><div class="fht-cell"></div></td>'),a.each(this.columns,function(a,f){var g,i="",j="",k=[],l={},m=c(' class="%s"',f["class"]);if(f.visible&&(!b.options.cardView||f.cardVisible)){if(i=c("text-align: %s; ",f.falign?f.falign:f.align),j=c("vertical-align: %s; ",f.valign),l=h(null,b.options.footerStyle),l&&l.css)for(g in l.css)k.push(g+": "+l.css[g]);e.push("<td",m,c(' style="%s"',i+j+k.concat().join("; ")),">"),e.push('<div class="th-inner">'),e.push(h(f,f.footerFormatter,[d],"&nbsp;")||"&nbsp;"),e.push("</div>"),e.push('<div class="fht-cell"></div>'),e.push("</div>"),e.push("</td>")}}),this.$tableFooter.find("tr").html(e.join("")),this.$tableFooter.show(),clearTimeout(this.timeoutFooter_),this.timeoutFooter_=setTimeout(a.proxy(this.fitFooter,this),this.$el.is(":hidden")?100:0))},o.prototype.fitFooter=function(){var b,c,d;return clearTimeout(this.timeoutFooter_),this.$el.is(":hidden")?void(this.timeoutFooter_=setTimeout(a.proxy(this.fitFooter,this),100)):(c=this.$el.css("width"),d=c>this.$tableBody.width()?g():0,this.$tableFooter.css({"margin-right":d}).find("table").css("width",c).attr("class",this.$el.attr("class")),b=this.$tableFooter.find("td"),void this.$body.find(">tr:first-child:not(.no-records-found) > *").each(function(c){var d=a(this);b.eq(c).find(".fht-cell").width(d.innerWidth())}))},o.prototype.toggleColumn=function(a,b,d){if(-1!==a&&(this.columns[a].visible=b,this.initHeader(),this.initSearch(),this.initPagination(),this.initBody(),this.options.showColumns)){var e=this.$toolbar.find(".keep-open input").prop("disabled",!1);d&&e.filter(c('[value="%s"]',a)).prop("checked",b),e.filter(":checked").length<=this.options.minimumCountColumns&&e.filter(":checked").prop("disabled",!0)}},o.prototype.getVisibleFields=function(){var b=this,c=[];return a.each(this.header.fields,function(a,d){var f=b.columns[e(b.columns,d)];f.visible&&c.push(d)}),c},o.prototype.resetView=function(a){var b=0;if(a&&a.height&&(this.options.height=a.height),this.$selectAll.prop("checked",this.$selectItem.length>0&&this.$selectItem.length===this.$selectItem.filter(":checked").length),this.options.height){var c=this.$toolbar.outerHeight(!0),d=this.$pagination.outerHeight(!0),e=this.options.height-c-d;this.$tableContainer.css("height",e+"px")}return this.options.cardView?(this.$el.css("margin-top","0"),this.$tableContainer.css("padding-bottom","0"),void this.$tableFooter.hide()):(this.options.showHeader&&this.options.height?(this.$tableHeader.show(),this.resetHeader(),b+=this.$header.outerHeight()):(this.$tableHeader.hide(),this.trigger("post-header")),this.options.showFooter&&(this.resetFooter(),this.options.height&&(b+=this.$tableFooter.outerHeight()+1)),this.getCaret(),this.$tableContainer.css("padding-bottom",b+"px"),void this.trigger("reset-view"))},o.prototype.getData=function(b){return!this.searchText&&a.isEmptyObject(this.filterColumns)&&a.isEmptyObject(this.filterColumnsPartial)?b?this.options.data.slice(this.pageFrom-1,this.pageTo):this.options.data:b?this.data.slice(this.pageFrom-1,this.pageTo):this.data},o.prototype.load=function(b){var c=!1;"server"===this.options.sidePagination?(this.options.totalRows=b[this.options.totalField],c=b.fixedScroll,b=b[this.options.dataField]):a.isArray(b)||(c=b.fixedScroll,b=b.data),this.initData(b),this.initSearch(),this.initPagination(),this.initBody(c)},o.prototype.append=function(a){this.initData(a,"append"),this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0)},o.prototype.prepend=function(a){this.initData(a,"prepend"),this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0)},o.prototype.remove=function(b){var c,d,e=this.options.data.length;if(b.hasOwnProperty("field")&&b.hasOwnProperty("values")){for(c=e-1;c>=0;c--)d=this.options.data[c],d.hasOwnProperty(b.field)&&-1!==a.inArray(d[b.field],b.values)&&(this.options.data.splice(c,1),"server"===this.options.sidePagination&&(this.options.totalRows-=1));e!==this.options.data.length&&(this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0))}},o.prototype.removeAll=function(){this.options.data.length>0&&(this.options.data.splice(0,this.options.data.length),this.initSearch(),this.initPagination(),this.initBody(!0))},o.prototype.getRowByUniqueId=function(a){var b,c,d,e=this.options.uniqueId,f=this.options.data.length,g=null;for(b=f-1;b>=0;b--){if(c=this.options.data[b],c.hasOwnProperty(e))d=c[e];else{if(!c._data.hasOwnProperty(e))continue;d=c._data[e]}if("string"==typeof d?a=a.toString():"number"==typeof d&&(Number(d)===d&&d%1===0?a=parseInt(a):d===Number(d)&&0!==d&&(a=parseFloat(a))),d===a){g=c;break}}return g},o.prototype.removeByUniqueId=function(a){var b=this.options.data.length,c=this.getRowByUniqueId(a);c&&this.options.data.splice(this.options.data.indexOf(c),1),b!==this.options.data.length&&(this.initSearch(),this.initPagination(),this.initBody(!0))},o.prototype.updateByUniqueId=function(b){var c=this,d=a.isArray(b)?b:[b];a.each(d,function(b,d){var e;d.hasOwnProperty("id")&&d.hasOwnProperty("row")&&(e=a.inArray(c.getRowByUniqueId(d.id),c.options.data),-1!==e&&a.extend(c.options.data[e],d.row))}),this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0)},o.prototype.insertRow=function(a){a.hasOwnProperty("index")&&a.hasOwnProperty("row")&&(this.data.splice(a.index,0,a.row),this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0))},o.prototype.updateRow=function(b){var c=this,d=a.isArray(b)?b:[b];a.each(d,function(b,d){d.hasOwnProperty("index")&&d.hasOwnProperty("row")&&a.extend(c.options.data[d.index],d.row)}),this.initSearch(),this.initPagination(),this.initSort(),this.initBody(!0)},o.prototype.initHiddenRows=function(){this.hiddenRows=[]},o.prototype.showRow=function(a){this.toggleRow(a,!0)},o.prototype.hideRow=function(a){this.toggleRow(a,!1)},o.prototype.toggleRow=function(b,c){var d,e;b.hasOwnProperty("index")?d=this.getData()[b.index]:b.hasOwnProperty("uniqueId")&&(d=this.getRowByUniqueId(b.uniqueId)),d&&(e=a.inArray(d,this.hiddenRows),c||-1!==e?c&&e>-1&&this.hiddenRows.splice(e,1):this.hiddenRows.push(d),this.initBody(!0))},o.prototype.getHiddenRows=function(){var b=this,c=this.getData(),d=[];return a.each(c,function(c,e){a.inArray(e,b.hiddenRows)>-1&&d.push(e)}),this.hiddenRows=d,d},o.prototype.mergeCells=function(b){var c,d,e,f=b.index,g=a.inArray(b.field,this.getVisibleFields()),h=b.rowspan||1,i=b.colspan||1,j=this.$body.find(">tr");if(this.options.detailView&&!this.options.cardView&&(g+=1),e=j.eq(f).find(">td").eq(g),!(0>f||0>g||f>=this.data.length)){for(c=f;f+h>c;c++)for(d=g;g+i>d;d++)j.eq(c).find(">td").eq(d).hide();e.attr("rowspan",h).attr("colspan",i).show()}},o.prototype.updateCell=function(a){a.hasOwnProperty("index")&&a.hasOwnProperty("field")&&a.hasOwnProperty("value")&&(this.data[a.index][a.field]=a.value,a.reinit!==!1&&(this.initSort(),this.initBody(!0)))},o.prototype.getOptions=function(){return this.options},o.prototype.getSelections=function(){var b=this;return a.grep(this.options.data,function(a){return a[b.header.stateField]===!0})},o.prototype.getAllSelections=function(){var b=this;return a.grep(this.options.data,function(a){return a[b.header.stateField]})},o.prototype.checkAll=function(){this.checkAll_(!0)},o.prototype.uncheckAll=function(){this.checkAll_(!1)},o.prototype.checkInvert=function(){var b=this,c=b.$selectItem.filter(":enabled"),d=c.filter(":checked");c.each(function(){a(this).prop("checked",!a(this).prop("checked"))}),b.updateRows(),b.updateSelected(),b.trigger("uncheck-some",d),d=b.getSelections(),b.trigger("check-some",d)},o.prototype.checkAll_=function(a){var b;a||(b=this.getSelections()),this.$selectAll.add(this.$selectAll_).prop("checked",a),this.$selectItem.filter(":enabled").prop("checked",a),this.updateRows(),a&&(b=this.getSelections()),this.trigger(a?"check-all":"uncheck-all",b)},o.prototype.check=function(a){this.check_(!0,a)},o.prototype.uncheck=function(a){this.check_(!1,a)},o.prototype.check_=function(a,b){var d=this.$selectItem.filter(c('[data-index="%s"]',b)).prop("checked",a);this.data[b][this.header.stateField]=a,this.updateSelected(),this.trigger(a?"check":"uncheck",this.data[b],d)},o.prototype.checkBy=function(a){this.checkBy_(!0,a)},o.prototype.uncheckBy=function(a){this.checkBy_(!1,a)},o.prototype.checkBy_=function(b,d){if(d.hasOwnProperty("field")&&d.hasOwnProperty("values")){var e=this,f=[];a.each(this.options.data,function(g,h){if(!h.hasOwnProperty(d.field))return!1;if(-1!==a.inArray(h[d.field],d.values)){var i=e.$selectItem.filter(":enabled").filter(c('[data-index="%s"]',g)).prop("checked",b);h[e.header.stateField]=b,f.push(h),e.trigger(b?"check":"uncheck",h,i)}}),this.updateSelected(),this.trigger(b?"check-some":"uncheck-some",f)}},o.prototype.destroy=function(){this.$el.insertBefore(this.$container),a(this.options.toolbar).insertBefore(this.$el),this.$container.next().remove(),this.$container.remove(),this.$el.html(this.$el_.html()).css("margin-top","0").attr("class",this.$el_.attr("class")||"")},o.prototype.showLoading=function(){this.$tableLoading.show()},o.prototype.hideLoading=function(){this.$tableLoading.hide()},o.prototype.togglePagination=function(){this.options.pagination=!this.options.pagination;var a=this.$toolbar.find('button[name="paginationSwitch"] i');this.options.pagination?a.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchDown):a.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchUp),this.updatePagination()},o.prototype.refresh=function(a){a&&a.url&&(this.options.url=a.url),a&&a.pageNumber&&(this.options.pageNumber=a.pageNumber),a&&a.pageSize&&(this.options.pageSize=a.pageSize),this.initServer(a&&a.silent,a&&a.query,a&&a.url),this.trigger("refresh",a)},o.prototype.resetWidth=function(){this.options.showHeader&&this.options.height&&this.fitHeader(),this.options.showFooter&&this.fitFooter()},o.prototype.showColumn=function(a){this.toggleColumn(e(this.columns,a),!0,!0)},o.prototype.hideColumn=function(a){this.toggleColumn(e(this.columns,a),!1,!0)},o.prototype.getHiddenColumns=function(){return a.grep(this.columns,function(a){return!a.visible})},o.prototype.getVisibleColumns=function(){return a.grep(this.columns,function(a){return a.visible})},o.prototype.toggleAllColumns=function(b){if(a.each(this.columns,function(a){this.columns[a].visible=b}),this.initHeader(),this.initSearch(),this.initPagination(),this.initBody(),this.options.showColumns){var c=this.$toolbar.find(".keep-open input").prop("disabled",!1);c.filter(":checked").length<=this.options.minimumCountColumns&&c.filter(":checked").prop("disabled",!0)}},o.prototype.showAllColumns=function(){this.toggleAllColumns(!0)},o.prototype.hideAllColumns=function(){this.toggleAllColumns(!1)},o.prototype.filterBy=function(b){this.filterColumns=a.isEmptyObject(b)?{}:b,this.options.pageNumber=1,this.initSearch(),this.updatePagination()},o.prototype.scrollTo=function(a){return"string"==typeof a&&(a="bottom"===a?this.$tableBody[0].scrollHeight:0),"number"==typeof a&&this.$tableBody.scrollTop(a),"undefined"==typeof a?this.$tableBody.scrollTop():void 0},o.prototype.getScrollPosition=function(){return this.scrollTo()},o.prototype.selectPage=function(a){a>0&&a<=this.options.totalPages&&(this.options.pageNumber=a,this.updatePagination())},o.prototype.prevPage=function(){this.options.pageNumber>1&&(this.options.pageNumber--,this.updatePagination())},o.prototype.nextPage=function(){this.options.pageNumber<this.options.totalPages&&(this.options.pageNumber++,this.updatePagination())},o.prototype.toggleView=function(){this.options.cardView=!this.options.cardView,this.initHeader(),this.initBody(),this.trigger("toggle",this.options.cardView)},o.prototype.refreshOptions=function(b){i(this.options,b,!0)||(this.options=a.extend(this.options,b),this.trigger("refresh-options",this.options),this.destroy(),this.init())},o.prototype.resetSearch=function(a){var b=this.$toolbar.find(".search input");b.val(a||""),this.onSearch({currentTarget:b})},o.prototype.expandRow_=function(a,b){var d=this.$body.find(c('> tr[data-index="%s"]',b));d.next().is("tr.detail-view")===(a?!1:!0)&&d.find("> td > .detail-icon").click()},o.prototype.expandRow=function(a){this.expandRow_(!0,a)},o.prototype.collapseRow=function(a){this.expandRow_(!1,a)},o.prototype.expandAllRows=function(b){if(b){var d=this.$body.find(c('> tr[data-index="%s"]',0)),e=this,f=null,g=!1,h=-1;if(d.next().is("tr.detail-view")?d.next().next().is("tr.detail-view")||(d.next().find(".detail-icon").click(),g=!0):(d.find("> td > .detail-icon").click(),g=!0),g)try{h=setInterval(function(){f=e.$body.find("tr.detail-view").last().find(".detail-icon"),f.length>0?f.click():clearInterval(h)},1)}catch(i){clearInterval(h)}}else for(var j=this.$body.children(),k=0;k<j.length;k++)this.expandRow_(!0,a(j[k]).data("index"))},o.prototype.collapseAllRows=function(b){if(b)this.expandRow_(!1,0);else for(var c=this.$body.children(),d=0;d<c.length;d++)this.expandRow_(!1,a(c[d]).data("index"))},o.prototype.updateFormatText=function(a,b){this.options[c("format%s",a)]&&("string"==typeof b?this.options[c("format%s",a)]=function(){return b}:"function"==typeof b&&(this.options[c("format%s",a)]=b)),this.initToolbar(),this.initPagination(),this.initBody()};var p=["getOptions","getSelections","getAllSelections","getData","load","append","prepend","remove","removeAll","insertRow","updateRow","updateCell","updateByUniqueId","removeByUniqueId","getRowByUniqueId","showRow","hideRow","getHiddenRows","mergeCells","checkAll","uncheckAll","checkInvert","check","uncheck","checkBy","uncheckBy","refresh","resetView","resetWidth","destroy","showLoading","hideLoading","showColumn","hideColumn","getHiddenColumns","getVisibleColumns","showAllColumns","hideAllColumns","filterBy","scrollTo","getScrollPosition","selectPage","prevPage","nextPage","togglePagination","toggleView","refreshOptions","resetSearch","expandRow","collapseRow","expandAllRows","collapseAllRows","updateFormatText"];a.fn.bootstrapTable=function(b){var c,d=Array.prototype.slice.call(arguments,1);return this.each(function(){var e=a(this),f=e.data("bootstrap.table"),g=a.extend({},o.DEFAULTS,e.data(),"object"==typeof b&&b);if("string"==typeof b){if(a.inArray(b,p)<0)throw new Error("Unknown method: "+b);if(!f)return;c=f[b].apply(f,d),"destroy"===b&&e.removeData("bootstrap.table")}f||e.data("bootstrap.table",f=new o(this,g))}),"undefined"==typeof c?this:c},a.fn.bootstrapTable.Constructor=o,a.fn.bootstrapTable.defaults=o.DEFAULTS,a.fn.bootstrapTable.columnDefaults=o.COLUMN_DEFAULTS,a.fn.bootstrapTable.locales=o.LOCALES,a.fn.bootstrapTable.methods=p,a.fn.bootstrapTable.utils={sprintf:c,getFieldIndex:e,compareObjects:i,calculateObjectValue:h,getItemField:l,objectKeys:n,isIEBrowser:m},a(function(){a('[data-toggle="table"]').bootstrapTable()})}(jQuery);
/*
* bootstrap-table - v1.11.1 - 2017-02-22
* https://github.com/wenzhixin/bootstrap-table
* Copyright (c) 2017 zhixin wen
* Licensed MIT License
*/
!function(a){"use strict";a.fn.bootstrapTable.locales["es-SP"]={formatLoadingMessage:function(){return"Cargando, por favor espera..."},formatRecordsPerPage:function(a){return a+" registros por p&#225;gina."},formatShowingRows:function(a,b,c){return a+" - "+b+" de "+c+" registros."},formatSearch:function(){return"Buscar"},formatNoMatches:function(){return"No se han encontrado registros."},formatRefresh:function(){return"Actualizar"},formatToggle:function(){return"Alternar"},formatColumns:function(){return"Columnas"},formatAllRows:function(){return"Todo"}},a.extend(a.fn.bootstrapTable.defaults,a.fn.bootstrapTable.locales["es-SP"])}(jQuery);
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Sweetalert2=t()}(this,function(){"use strict";var e={title:"",titleText:"",text:"",html:"",type:null,customClass:"",target:"body",animation:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,showConfirmButton:!0,showCancelButton:!1,preConfirm:null,confirmButtonText:"OK",confirmButtonColor:"#3085d6",confirmButtonClass:null,cancelButtonText:"Cancel",cancelButtonColor:"#aaa",cancelButtonClass:null,buttonsStyling:!0,reverseButtons:!1,focusCancel:!1,showCloseButton:!1,showLoaderOnConfirm:!1,imageUrl:null,imageWidth:null,imageHeight:null,imageClass:null,timer:null,width:500,padding:20,background:"#fff",input:null,inputPlaceholder:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputClass:null,inputAttributes:{},inputValidator:null,progressSteps:[],currentProgressStep:null,progressStepsDistance:"40px",onOpen:null,onClose:null,useRejections:!0},t=function(e){var t={};for(var n in e)t[e[n]]="swal2-"+e[n];return t},n=t(["container","shown","iosfix","modal","overlay","fade","show","hide","noanimation","close","title","content","buttonswrapper","confirm","cancel","icon","image","input","file","range","select","radio","checkbox","textarea","inputerror","validationerror","progresssteps","activeprogressstep","progresscircle","progressline","loading","styled"]),o=t(["success","warning","info","question","error"]),r=function(e,t){(e=String(e).replace(/[^0-9a-f]/gi,"")).length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;for(var n="#",o=0;o<3;o++){var r=parseInt(e.substr(2*o,2),16);n+=("00"+(r=Math.round(Math.min(Math.max(0,r+r*t),255)).toString(16))).substr(r.length)}return n},i=function(e){var t=[];for(var n in e)-1===t.indexOf(e[n])&&t.push(e[n]);return t},a={previousWindowKeyDown:null,previousActiveElement:null,previousBodyPadding:null},l=function(e){if("undefined"!=typeof document){var t=document.createElement("div");t.className=n.container,t.innerHTML=s;var o=document.querySelector(e.target);o||(console.warn("SweetAlert2: Can't find the target \""+e.target+'"'),o=document.body),o.appendChild(t);var r=c(),i=A(r,n.input),a=A(r,n.file),l=r.querySelector("."+n.range+" input"),u=r.querySelector("."+n.range+" output"),d=A(r,n.select),p=r.querySelector("."+n.checkbox+" input"),f=A(r,n.textarea);return i.oninput=function(){$.resetValidationError()},i.onkeydown=function(t){setTimeout(function(){13===t.keyCode&&e.allowEnterKey&&(t.stopPropagation(),$.clickConfirm())},0)},a.onchange=function(){$.resetValidationError()},l.oninput=function(){$.resetValidationError(),u.value=l.value},l.onchange=function(){$.resetValidationError(),l.previousSibling.value=l.value},d.onchange=function(){$.resetValidationError()},p.onchange=function(){$.resetValidationError()},f.oninput=function(){$.resetValidationError()},r}console.error("SweetAlert2 requires document to initialize")},s=('\n <div role="dialog" aria-labelledby="'+n.title+'" aria-describedby="'+n.content+'" class="'+n.modal+'" tabindex="-1">\n   <ul class="'+n.progresssteps+'"></ul>\n   <div class="'+n.icon+" "+o.error+'">\n     <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n   </div>\n   <div class="'+n.icon+" "+o.question+'">?</div>\n   <div class="'+n.icon+" "+o.warning+'">!</div>\n   <div class="'+n.icon+" "+o.info+'">i</div>\n   <div class="'+n.icon+" "+o.success+'">\n     <div class="swal2-success-circular-line-left"></div>\n     <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n     <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n     <div class="swal2-success-circular-line-right"></div>\n   </div>\n   <img class="'+n.image+'">\n   <h2 class="'+n.title+'" id="'+n.title+'"></h2>\n   <div id="'+n.content+'" class="'+n.content+'"></div>\n   <input class="'+n.input+'">\n   <input type="file" class="'+n.file+'">\n   <div class="'+n.range+'">\n     <output></output>\n     <input type="range">\n   </div>\n   <select class="'+n.select+'"></select>\n   <div class="'+n.radio+'"></div>\n   <label for="'+n.checkbox+'" class="'+n.checkbox+'">\n     <input type="checkbox">\n   </label>\n   <textarea class="'+n.textarea+'"></textarea>\n   <div class="'+n.validationerror+'"></div>\n   <div class="'+n.buttonswrapper+'">\n     <button type="button" class="'+n.confirm+'">OK</button>\n     <button type="button" class="'+n.cancel+'">Cancel</button>\n   </div>\n   <button type="button" class="'+n.close+'" aria-label="Close this dialog">&times;</button>\n </div>\n').replace(/(^|\n)\s*/g,""),u=function(){return document.body.querySelector("."+n.container)},c=function(){return u()?u().querySelector("."+n.modal):null},d=function(){return c().querySelectorAll("."+n.icon)},p=function(e){return u()?u().querySelector("."+e):null},f=function(){return p(n.title)},m=function(){return p(n.content)},v=function(){return p(n.image)},h=function(){return p(n.buttonswrapper)},g=function(){return p(n.progresssteps)},y=function(){return p(n.validationerror)},b=function(){return p(n.confirm)},w=function(){return p(n.cancel)},C=function(){return p(n.close)},k=function(e){var t=[b(),w()];e&&t.reverse();var n=t.concat(Array.prototype.slice.call(c().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, *[tabindex]:not([tabindex="-1"])')));return i(n)},x=function(e,t){return!!e.classList&&e.classList.contains(t)},S=function(e){if(e.focus(),"file"!==e.type){var t=e.value;e.value="",e.value=t}},E=function(e,t){e&&t&&t.split(/\s+/).filter(Boolean).forEach(function(t){e.classList.add(t)})},B=function(e,t){e&&t&&t.split(/\s+/).filter(Boolean).forEach(function(t){e.classList.remove(t)})},A=function(e,t){for(var n=0;n<e.childNodes.length;n++)if(x(e.childNodes[n],t))return e.childNodes[n]},P=function(e,t){t||(t="block"),e.style.opacity="",e.style.display=t},T=function(e){e.style.opacity="",e.style.display="none"},L=function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},M=function(e){return e.offsetWidth||e.offsetHeight||e.getClientRects().length},q=function(e,t){e.style.removeProperty?e.style.removeProperty(t):e.style.removeAttribute(t)},V=function(e){if(!M(e))return!1;if("function"==typeof MouseEvent){var t=new MouseEvent("click",{view:window,bubbles:!1,cancelable:!0});e.dispatchEvent(t)}else if(document.createEvent){var n=document.createEvent("MouseEvents");n.initEvent("click",!1,!1),e.dispatchEvent(n)}else document.createEventObject?e.fireEvent("onclick"):"function"==typeof e.onclick&&e.onclick()},O=function(){var e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd oanimationend",msAnimation:"MSAnimationEnd",animation:"animationend"};for(var n in t)if(t.hasOwnProperty(n)&&void 0!==e.style[n])return t[n];return!1}(),H=function(){if(window.onkeydown=a.previousWindowKeyDown,a.previousActiveElement&&a.previousActiveElement.focus){var e=window.scrollX,t=window.scrollY;a.previousActiveElement.focus(),e&&t&&window.scrollTo(e,t)}},N=function(){if("ontouchstart"in window||navigator.msMaxTouchPoints)return 0;var e=document.createElement("div");e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t},j=function(e,t){var n=void 0;return function(){var o=function(){n=null,e()};clearTimeout(n),n=setTimeout(o,t)}},R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},K=I({},e),D=[],W=void 0,U=function(t){var r=c()||l(t);for(var i in t)e.hasOwnProperty(i)||"extraParams"===i||console.warn('SweetAlert2: Unknown parameter "'+i+'"');r.style.width="number"==typeof t.width?t.width+"px":t.width,r.style.padding=t.padding+"px",r.style.background=t.background;for(var a=r.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"),s=0;s<a.length;s++)a[s].style.background=t.background;var u=f(),p=m(),y=h(),k=b(),x=w(),S=C();if(t.titleText?u.innerText=t.titleText:u.innerHTML=t.title.split("\n").join("<br>"),t.text||t.html){if("object"===R(t.html))if(p.innerHTML="",0 in t.html)for(var A=0;A in t.html;A++)p.appendChild(t.html[A].cloneNode(!0));else p.appendChild(t.html.cloneNode(!0));else t.html?p.innerHTML=t.html:t.text&&(p.textContent=t.text);P(p)}else T(p);t.showCloseButton?P(S):T(S),r.className=n.modal,t.customClass&&E(r,t.customClass);var M=g(),V=parseInt(null===t.currentProgressStep?$.getQueueStep():t.currentProgressStep,10);t.progressSteps.length?(P(M),L(M),V>=t.progressSteps.length&&console.warn("SweetAlert2: Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),t.progressSteps.forEach(function(e,o){var r=document.createElement("li");if(E(r,n.progresscircle),r.innerHTML=e,o===V&&E(r,n.activeprogressstep),M.appendChild(r),o!==t.progressSteps.length-1){var i=document.createElement("li");E(i,n.progressline),i.style.width=t.progressStepsDistance,M.appendChild(i)}})):T(M);for(var O=d(),H=0;H<O.length;H++)T(O[H]);if(t.type){var N=!1;for(var j in o)if(t.type===j){N=!0;break}if(!N)return console.error("SweetAlert2: Unknown alert type: "+t.type),!1;var I=r.querySelector("."+n.icon+"."+o[t.type]);if(P(I),t.animation)switch(t.type){case"success":E(I,"swal2-animate-success-icon"),E(I.querySelector(".swal2-success-line-tip"),"swal2-animate-success-line-tip"),E(I.querySelector(".swal2-success-line-long"),"swal2-animate-success-line-long");break;case"error":E(I,"swal2-animate-error-icon"),E(I.querySelector(".swal2-x-mark"),"swal2-animate-x-mark")}}var K=v();t.imageUrl?(K.setAttribute("src",t.imageUrl),P(K),t.imageWidth?K.setAttribute("width",t.imageWidth):K.removeAttribute("width"),t.imageHeight?K.setAttribute("height",t.imageHeight):K.removeAttribute("height"),K.className=n.image,t.imageClass&&E(K,t.imageClass)):T(K),t.showCancelButton?x.style.display="inline-block":T(x),t.showConfirmButton?q(k,"display"):T(k),t.showConfirmButton||t.showCancelButton?P(y):T(y),k.innerHTML=t.confirmButtonText,x.innerHTML=t.cancelButtonText,t.buttonsStyling&&(k.style.backgroundColor=t.confirmButtonColor,x.style.backgroundColor=t.cancelButtonColor),k.className=n.confirm,E(k,t.confirmButtonClass),x.className=n.cancel,E(x,t.cancelButtonClass),t.buttonsStyling?(E(k,n.styled),E(x,n.styled)):(B(k,n.styled),B(x,n.styled),k.style.backgroundColor=k.style.borderLeftColor=k.style.borderRightColor="",x.style.backgroundColor=x.style.borderLeftColor=x.style.borderRightColor=""),!0===t.animation?B(r,n.noanimation):E(r,n.noanimation)},z=function(e,t){var o=u(),r=c();e?(E(r,n.show),E(o,n.fade),B(r,n.hide)):B(r,n.fade),P(r),o.style.overflowY="hidden",O&&!x(r,n.noanimation)?r.addEventListener(O,function e(){r.removeEventListener(O,e),o.style.overflowY="auto"}):o.style.overflowY="auto",E(document.documentElement,n.shown),E(document.body,n.shown),E(o,n.shown),Z(),Y(),a.previousActiveElement=document.activeElement,null!==t&&"function"==typeof t&&setTimeout(function(){t(r)})},Z=function(){null===a.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(a.previousBodyPadding=document.body.style.paddingRight,document.body.style.paddingRight=N()+"px")},Q=function(){null!==a.previousBodyPadding&&(document.body.style.paddingRight=a.previousBodyPadding,a.previousBodyPadding=null)},Y=function(){if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream&&!x(document.body,n.iosfix)){var e=document.body.scrollTop;document.body.style.top=-1*e+"px",E(document.body,n.iosfix)}},_=function(){if(x(document.body,n.iosfix)){var e=parseInt(document.body.style.top,10);B(document.body,n.iosfix),document.body.style.top="",document.body.scrollTop=-1*e}},$=function e(){for(var t=arguments.length,o=Array(t),i=0;i<t;i++)o[i]=arguments[i];if(void 0===o[0])return console.error("SweetAlert2 expects at least 1 attribute!"),!1;var l=I({},K);switch(R(o[0])){case"string":l.title=o[0],l.html=o[1],l.type=o[2];break;case"object":I(l,o[0]),l.extraParams=o[0].extraParams,"email"===l.input&&null===l.inputValidator&&(l.inputValidator=function(e){return new Promise(function(t,n){/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(e)?t():n("Invalid email address")})}),"url"===l.input&&null===l.inputValidator&&(l.inputValidator=function(e){return new Promise(function(t,n){/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/.test(e)?t():n("Invalid URL")})});break;default:return console.error('SweetAlert2: Unexpected type of argument! Expected "string" or "object", got '+R(o[0])),!1}U(l);var s=u(),d=c();return new Promise(function(t,o){l.timer&&(d.timeout=setTimeout(function(){e.closeModal(l.onClose),l.useRejections?o("timer"):t({dismiss:"timer"})},l.timer));var i=function(e){if(!(e=e||l.input))return null;switch(e){case"select":case"textarea":case"file":return A(d,n[e]);case"checkbox":return d.querySelector("."+n.checkbox+" input");case"radio":return d.querySelector("."+n.radio+" input:checked")||d.querySelector("."+n.radio+" input:first-child");case"range":return d.querySelector("."+n.range+" input");default:return A(d,n.input)}},p=function(){var e=i();if(!e)return null;switch(l.input){case"checkbox":return e.checked?1:0;case"radio":return e.checked?e.value:null;case"file":return e.files.length?e.files[0]:null;default:return l.inputAutoTrim?e.value.trim():e.value}};l.input&&setTimeout(function(){var e=i();e&&S(e)},0);for(var x=function(n){l.showLoaderOnConfirm&&e.showLoading(),l.preConfirm?l.preConfirm(n,l.extraParams).then(function(o){e.closeModal(l.onClose),t(o||n)},function(t){e.hideLoading(),t&&e.showValidationError(t)}):(e.closeModal(l.onClose),t(l.useRejections?n:{value:n}))},L=function(n){var i=n||window.event,a=i.target||i.srcElement,s=b(),u=w(),c=s&&(s===a||s.contains(a)),d=u&&(u===a||u.contains(a));switch(i.type){case"mouseover":case"mouseup":l.buttonsStyling&&(c?s.style.backgroundColor=r(l.confirmButtonColor,-.1):d&&(u.style.backgroundColor=r(l.cancelButtonColor,-.1)));break;case"mouseout":l.buttonsStyling&&(c?s.style.backgroundColor=l.confirmButtonColor:d&&(u.style.backgroundColor=l.cancelButtonColor));break;case"mousedown":l.buttonsStyling&&(c?s.style.backgroundColor=r(l.confirmButtonColor,-.2):d&&(u.style.backgroundColor=r(l.cancelButtonColor,-.2)));break;case"click":if(c&&e.isVisible())if(e.disableButtons(),l.input){var f=p();l.inputValidator?(e.disableInput(),l.inputValidator(f,l.extraParams).then(function(){e.enableButtons(),e.enableInput(),x(f)},function(t){e.enableButtons(),e.enableInput(),t&&e.showValidationError(t)})):x(f)}else x(!0);else d&&e.isVisible()&&(e.disableButtons(),e.closeModal(l.onClose),l.useRejections?o("cancel"):t({dismiss:"cancel"}))}},q=d.querySelectorAll("button"),O=0;O<q.length;O++)q[O].onclick=L,q[O].onmouseover=L,q[O].onmouseout=L,q[O].onmousedown=L;C().onclick=function(){e.closeModal(l.onClose),l.useRejections?o("close"):t({dismiss:"close"})},s.onclick=function(n){n.target===s&&l.allowOutsideClick&&(e.closeModal(l.onClose),l.useRejections?o("overlay"):t({dismiss:"overlay"}))};var H=h(),N=b(),I=w();l.reverseButtons?N.parentNode.insertBefore(I,N):N.parentNode.insertBefore(N,I);var K=function(e,t){for(var n=k(l.focusCancel),o=0;o<n.length;o++){(e+=t)===n.length?e=0:-1===e&&(e=n.length-1);var r=n[e];if(M(r))return r.focus()}},D=function(n){var r=n||window.event,i=r.keyCode||r.which;if(-1!==[9,13,32,27,37,38,39,40].indexOf(i)){for(var a=r.target||r.srcElement,s=k(l.focusCancel),u=-1,c=0;c<s.length;c++)if(a===s[c]){u=c;break}9===i?(r.shiftKey?K(u,-1):K(u,1),r.stopPropagation(),r.preventDefault()):37===i||38===i||39===i||40===i?document.activeElement===N&&M(I)?I.focus():document.activeElement===I&&M(N)&&N.focus():13===i||32===i?-1===u&&l.allowEnterKey&&(V(l.focusCancel?I:N),r.stopPropagation(),r.preventDefault()):27===i&&!0===l.allowEscapeKey&&(e.closeModal(l.onClose),l.useRejections?o("esc"):t({dismiss:"esc"}))}};window.onkeydown&&window.onkeydown.toString()===D.toString()||(a.previousWindowKeyDown=window.onkeydown,window.onkeydown=D),l.buttonsStyling&&(N.style.borderLeftColor=l.confirmButtonColor,N.style.borderRightColor=l.confirmButtonColor),e.hideLoading=e.disableLoading=function(){l.showConfirmButton||(T(N),l.showCancelButton||T(h())),B(H,n.loading),B(d,n.loading),N.disabled=!1,I.disabled=!1},e.getTitle=function(){return f()},e.getContent=function(){return m()},e.getInput=function(){return i()},e.getImage=function(){return v()},e.getButtonsWrapper=function(){return h()},e.getConfirmButton=function(){return b()},e.getCancelButton=function(){return w()},e.enableButtons=function(){N.disabled=!1,I.disabled=!1},e.disableButtons=function(){N.disabled=!0,I.disabled=!0},e.enableConfirmButton=function(){N.disabled=!1},e.disableConfirmButton=function(){N.disabled=!0},e.enableInput=function(){var e=i();if(!e)return!1;if("radio"===e.type)for(var t=e.parentNode.parentNode.querySelectorAll("input"),n=0;n<t.length;n++)t[n].disabled=!1;else e.disabled=!1},e.disableInput=function(){var e=i();if(!e)return!1;if(e&&"radio"===e.type)for(var t=e.parentNode.parentNode.querySelectorAll("input"),n=0;n<t.length;n++)t[n].disabled=!0;else e.disabled=!0},e.recalculateHeight=j(function(){var e=c();if(e){var t=e.style.display;e.style.minHeight="",P(e),e.style.minHeight=e.scrollHeight+1+"px",e.style.display=t}},50),e.showValidationError=function(e){var t=y();t.innerHTML=e,P(t);var o=i();o&&(S(o),E(o,n.inputerror))},e.resetValidationError=function(){var t=y();T(t),e.recalculateHeight();var o=i();o&&B(o,n.inputerror)},e.getProgressSteps=function(){return l.progressSteps},e.setProgressSteps=function(e){l.progressSteps=e,U(l)},e.showProgressSteps=function(){P(g())},e.hideProgressSteps=function(){T(g())},e.enableButtons(),e.hideLoading(),e.resetValidationError();for(var Z=["input","file","range","select","radio","checkbox","textarea"],Q=void 0,Y=0;Y<Z.length;Y++){var _=n[Z[Y]],$=A(d,_);if(Q=i(Z[Y])){for(var J in Q.attributes)if(Q.attributes.hasOwnProperty(J)){var X=Q.attributes[J].name;"type"!==X&&"value"!==X&&Q.removeAttribute(X)}for(var F in l.inputAttributes)Q.setAttribute(F,l.inputAttributes[F])}$.className=_,l.inputClass&&E($,l.inputClass),T($)}var G=void 0;switch(l.input){case"text":case"email":case"password":case"number":case"tel":case"url":(Q=A(d,n.input)).value=l.inputValue,Q.placeholder=l.inputPlaceholder,Q.type=l.input,P(Q);break;case"file":(Q=A(d,n.file)).placeholder=l.inputPlaceholder,Q.type=l.input,P(Q);break;case"range":var ee=A(d,n.range),te=ee.querySelector("input"),ne=ee.querySelector("output");te.value=l.inputValue,te.type=l.input,ne.value=l.inputValue,P(ee);break;case"select":var oe=A(d,n.select);if(oe.innerHTML="",l.inputPlaceholder){var re=document.createElement("option");re.innerHTML=l.inputPlaceholder,re.value="",re.disabled=!0,re.selected=!0,oe.appendChild(re)}G=function(e){for(var t in e){var n=document.createElement("option");n.value=t,n.innerHTML=e[t],l.inputValue===t&&(n.selected=!0),oe.appendChild(n)}P(oe),oe.focus()};break;case"radio":var ie=A(d,n.radio);ie.innerHTML="",G=function(e){for(var t in e){var o=document.createElement("input"),r=document.createElement("label"),i=document.createElement("span");o.type="radio",o.name=n.radio,o.value=t,l.inputValue===t&&(o.checked=!0),i.innerHTML=e[t],r.appendChild(o),r.appendChild(i),r.for=o.id,ie.appendChild(r)}P(ie);var a=ie.querySelectorAll("input");a.length&&a[0].focus()};break;case"checkbox":var ae=A(d,n.checkbox),le=i("checkbox");le.type="checkbox",le.value=1,le.id=n.checkbox,le.checked=Boolean(l.inputValue);var se=ae.getElementsByTagName("span");se.length&&ae.removeChild(se[0]),(se=document.createElement("span")).innerHTML=l.inputPlaceholder,ae.appendChild(se),P(ae);break;case"textarea":var ue=A(d,n.textarea);ue.value=l.inputValue,ue.placeholder=l.inputPlaceholder,P(ue);break;case null:break;default:console.error('SweetAlert2: Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'+l.input+'"')}"select"!==l.input&&"radio"!==l.input||(l.inputOptions instanceof Promise?(e.showLoading(),l.inputOptions.then(function(t){e.hideLoading(),G(t)})):"object"===R(l.inputOptions)?G(l.inputOptions):console.error("SweetAlert2: Unexpected type of inputOptions! Expected object or Promise, got "+R(l.inputOptions))),z(l.animation,l.onOpen),l.allowEnterKey?K(-1,1):document.activeElement&&document.activeElement.blur(),u().scrollTop=0,"undefined"==typeof MutationObserver||W||(W=new MutationObserver(e.recalculateHeight)).observe(d,{childList:!0,characterData:!0,subtree:!0})})};return $.isVisible=function(){return!!c()},$.queue=function(e){D=e;var t=function(){D=[],document.body.removeAttribute("data-swal2-queue-step")},n=[];return new Promise(function(e,o){!function r(i,a){i<D.length?(document.body.setAttribute("data-swal2-queue-step",i),$(D[i]).then(function(e){n.push(e),r(i+1,a)},function(e){t(),o(e)})):(t(),e(n))}(0)})},$.getQueueStep=function(){return document.body.getAttribute("data-swal2-queue-step")},$.insertQueueStep=function(e,t){return t&&t<D.length?D.splice(t,0,e):D.push(e)},$.deleteQueueStep=function(e){void 0!==D[e]&&D.splice(e,1)},$.close=$.closeModal=function(e){var t=u(),o=c();if(o){B(o,n.show),E(o,n.hide),clearTimeout(o.timeout),H();var r=function(){t.parentNode&&t.parentNode.removeChild(t),B(document.documentElement,n.shown),B(document.body,n.shown),Q(),_()};O&&!x(o,n.noanimation)?o.addEventListener(O,function e(){o.removeEventListener(O,e),x(o,n.hide)&&r()}):r(),null!==e&&"function"==typeof e&&setTimeout(function(){e(o)})}},$.clickConfirm=function(){return b().click()},$.clickCancel=function(){return w().click()},$.showLoading=$.enableLoading=function(){var e=c();e||$("");var t=h(),o=b(),r=w();P(t),P(o,"inline-block"),E(t,n.loading),E(e,n.loading),o.disabled=!0,r.disabled=!0},$.setDefaults=function(t){if(!t||"object"!==(void 0===t?"undefined":R(t)))return console.error("SweetAlert2: the argument for setDefaults() is required and has to be a object");for(var n in t)e.hasOwnProperty(n)||"extraParams"===n||(console.warn('SweetAlert2: Unknown parameter "'+n+'"'),delete t[n]);I(K,t)},$.resetDefaults=function(){K=I({},e)},$.noop=function(){},$.version="6.6.5",$.default=$,$}),window.Sweetalert2&&(window.sweetAlert=window.swal=window.Sweetalert2);
var activo      = '<i class="material-icons">fiber_smart_record</i> Activo'; 
var noActivo    = '<i class="material-icons">remove_circle_outline</i> No Activo';
var suspendido  = '<i class="material-icons">report_problem</i> Suspendido';
var enCorte     = '<i class="material-icons">signal_wifi_off</i> En Corte';
var mora        = '<i class="material-icons">timer</i> Mora';
var exonerado   = '<i class="material-icons">local_offer</i> Exonerado';
var filtros     = [[activo,noActivo],activo,noActivo];
var estadosiconos = {
  'activo' : {text: activo,class: 'done'},
  'no activo': {text: noActivo, class: 'error'},
  'en corte':  {text: enCorte,class: 'en-corte'},
  'mora': {text: mora, class: 'mora'},
  'suspendido': {text: suspendido,class: 'suspendido'},
  'exonerado': {text: exonerado,class: 'exonerado'}
}
var estados = ['activo','no activo','en corte','mora','suspendido','exonerado'];
var selectState = "<select>"
estados.forEach(function(estado) {
  selectState += "<option value='"+estado+"'>"+estado+"</value>"
  }, this);
selectState +="<select>"

// My Objects
 
var clientTable = {

  init: function(page){
    var self = this;
    this.el = $('#t-clients');
    this.el.bootstrapTable()
    this.el.find('tbody').css({display:"table-row-group"});
    self.el.addClass('innertable');
    if(page){
      self.el.bootstrapTable('selectPage',page);
    }
    clientTable.detectClicks();
    this.el.on('all.bs.table', function (name,param) {
       clientTable.changeStates();
    });
  },

  getSelectedRow: function(){
    var self = this;
    return self.el.bootstrapTable('getSelections')[0]
  },

  getId: function(){
    var self = this;
    return $.map(self.el.bootstrapTable('getSelections'),function(row){
      return row.id;
    });
  },

  refresh: function(content,callback){
    var options = clientTable.el.bootstrapTable('getOptions');

    clientTable.el.bootstrapTable('destroy');
    clientTable.el.find('tbody').html(content);
    clientTable.init(options.pageNumber);
    if(callback)
       callback;
  },

  detectClicks: function(){
    var btnGetDetails     = $("#get-details");
    var btnNewContract    = $("#client-new-contract");
    var btnGoNewContract  = $("#go-new-contract");

    this.el.on('check.bs.table',function(){
      var id = clientTable.getId()
      btnGetDetails.attr('href',BASE_URL + 'process/details/'+ id);
      btnNewContract.attr('href',BASE_URL + 'process/newcontract/'+ id);
      
      // buscador
      if(btnGoNewContract){
        if(btnGoNewContract.text().toLowerCase() == "ir a pagos"){
          btnGoNewContract.attr('href',BASE_URL + 'process/details/'+ id + "/pagos");
        }else{
          btnGoNewContract.attr('href',BASE_URL + 'process/newcontract/'+ id);
        }
      }
    });

    this.el.on('uncheck.bs.table',function(){
      btnGetDetails.attr('href','#');
      btnNewContract.attr('href','#');
      btnGoNewContract.attr('href','#');
    }); 
  },

  changeStates: function () {
    $(".estado-cliente").on('click',function(e){
      e.stopImmediatePropagation();
      var select = $(selectState);
      var $this = $(this);
      var state;
      var id = $this.parent().find('.id_cliente').text().trim();
      $this.html(select);
      select.focus();

      select.on('change blur',function(e){ 
        state = select.val()
        $this.html(estadosiconos[state].text)
        $this.removeClass(" done error en-corte exonerado mora suspendido");
        $this.addClass(estadosiconos[state].class);
        Clients.updateState({'id':id,'estado':state});
      });

      select.on('click',function(e){ 
        e.stopImmediatePropagation();
        
      })
    })
  }
 
}
 window.getHeight = function () {
    var h =  450;
    return h;
  }
var serviceTable = {
  init: function(page){
    var self = this;
    this.el = $('#t-services');
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    if(page){
      self.el.bootstrapTable('selectPage',page);
    }
    self.el.addClass('innertable');

  },

  getSelectedRow: function(){
    var self = this;
    return self.el.bootstrapTable('getSelections')[0]
  },

  getId: function(){
    var self = this;
    return $.map(self.el.bootstrapTable('getSelections'),function(row){
      return row.id;
    });
  },

  refresh: function(content,callback){
    var options = serviceTable.el.bootstrapTable('getOptions');

    serviceTable.el.bootstrapTable('destroy');
    serviceTable.el.find('tbody').html(content);
    serviceTable.init(options.pageNumber);
    if(callback)
       callback;
  }

}
var contractTable = {
  init: function(){
    var self = this;
    this.el = $('#t-contracts');
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    self.el.addClass('innertable');
    contractTable.detectClicks();
  },

  getSelectedRow: function(){
    var self = this;
    return self.el.bootstrapTable('getSelections')[0]
  },

  getId: function(){
    var self = this;
    return $.map(self.el.bootstrapTable('getSelections'),function(row){
      return row.id;
    });
  },

  refresh: function(content,callback){
    contractTable.el.bootstrapTable('destroy');
    contractTable.el.find('tbody').html(content);
    contractTable.init();
    if(callback)
       callback();
  },

  detectClicks: function(){
    
    var btnPayView     = $("#btn-pay-view");
    var btnSeeInDetail = $("#btn-see-in-detail");
    var btnSeeContract = $("#btn-see-contract");

    this.el.on('check.bs.table',function(){
      var row= contractTable.getSelectedRow();
      btnPayView.attr('href',BASE_URL + 'process/details/'+ row.id_cliente + "/pagos");
      btnSeeInDetail.attr('href',BASE_URL + 'process/details/'+ row.id_cliente);
      btnSeeContract.attr('href',BASE_URL + 'process/getrequirements/' + row.id + '/contrato');
    });

    this.el.on('uncheck.bs.table',function(){
      btnPayView.attr('href','#');
      btnSeeInDetail.attr('href','#');
      btnSeeContract.attr('href','#');
    }); 
  }
}
var userTable = {
  init: function(page){
    this.el = $('#t-users');
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    this.el.addClass('innertable');

    if(page){
      this.el.bootstrapTable('selectPage',page);
    }
  },

  getSelectedRow: function(){
    var self = this;
    return self.el.bootstrapTable('getSelections')[0]
  },

  getId: function(){
    var self = this;
    return $.map(self.el.bootstrapTable('getSelections'),function(row){
      return row.id;
    });
  },

  getRow: function(id){
    var data = this.el.bootstrapTable('getRowByUniqueId',id);
    return data;
  },

  refresh: function(content,callback){
    var options = userTable.el.bootstrapTable('getOptions');

    userTable.el.bootstrapTable('destroy');
    userTable.el.find('tbody').html(content);
    userTable.init(options.pageNumber);
    if(callback)
       callback();
  },   
}

var cajaTable = {
  init: function(page){
    this.el = $("#caja");
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    this.el.addClass('innertable');
    
    if(page){
      this.el.bootstrapTable('selectPage',page);
    }
  },

  getSelectedRow: function(){
    var self = this;
    return self.el.bootstrapTable('getSelections')[0]
  },

  refresh: function(content,callback){
    var options = cajaTable.el.bootstrapTable('getOptions');
    
    cajaTable.el.bootstrapTable('destroy');
    cajaTable.el.find('tbody').html(content);
    cajaTable.init(options.PageNumber);
    if(callback)
       callback();
  }   
}


var paymentTable = {
  init: function(page,row){
    this.el = $('#t-pagos');
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    this.el.addClass('innertable');
    this.detailBox = $('#payment-detail-box');
    this.detailBox.hide()
    
    if(page,row){
      var id = row.id_contrato;
      if(id == paymentTable.getRow().id_contrato)
        this.el.bootstrapTable('selectPage',page);
    }

    this.el.on('dbl-click-row.bs.table',function(event,row,$el,field){
      //  Payments.getOne(row.id, Payments.edit);
    });

    this.el.on('click-row.bs.table',function(event,row,$el,field){
      event.stopImmediatePropagation();
      var self = paymentTable;
      $(".payment-mode").removeClass("selected");
      if(!$el.hasClass('selected') && row.estado == "no pagado"){
        self.detailBox.show();
        self.detailBox.collapse();
      }else{
         self.detailBox.hide();
      }
      console.log(row.estado)
    })

    paymentTable.clickEvents();
    this.el.on('all.bs.table',function(name,args){
      paymentTable.clickEvents()
    })
  },

  getSelectedRow: function(){
    var self = this;
    return self.el.bootstrapTable('getSelections')[0]
  },

  getId: function(){
    var self = this;
    return $.map(self.el.bootstrapTable('getSelections'),function(row){
      return row.id;
    });
  },

  getRow: function(id){
    var data = this.el.bootstrapTable('getData');
    return data[0];

  },

  refresh: function(content,callback){
    var options = paymentTable.el.bootstrapTable('getOptions');
    var row     = paymentTable.getRow();

    paymentTable.el.bootstrapTable('destroy');
    paymentTable.el.find('tbody').html(content);
    paymentTable.init(options.pageNumber, row);
    if(callback)
       callback();
  },  
  
  filter: function(value, type){
    if(type == 'estado'){
      this.el.bootstrapTable('filterBy',{
        estado: value
      });
    }else{
      hoy = moment().format("YYYY-MM-DD")
      this.el.bootstrapTable('filterBy',{
        fecha_limite: []
      });

    }
    
  },

  clickEvents: function(){
    $(".payment-advanced").on('click',function(e) {
      e.preventDefault()
      e.stopImmediatePropagation();
      console.log('yo si funciono')
      var id = $(this).attr('data-id-pago').trim();
      if (id) {
        Payments.getOne(id, Payments.receiveForEdit);
      }
    });

    $(".payment-delete").on('click',function(e) {
      e.preventDefault()
      e.stopImmediatePropagation();
      var id = $(this).attr('data-id-pago').trim();
      if (id) {
         swal({
          title: 'Está Seguro?',
          text: "Seguro de que quiere deshacer este pago?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          'cancelButtonText': 'Cancelar'
        }).then(function(){
          Payments.removePayment(id);
        });
      }
    });

  }
}

var detailsContractTable = {
  init: function(page){
    this.el = $("#d-contracts");
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    this.el.addClass('innertable');
    
    if(page){
      this.el.bootstrapTable('selectPage',page);
    }
  },

  getSelectedRow: function(){
    var self = this;
    return self.el.bootstrapTable('getSelections')[0]
  },

  refresh: function(content,callback){
    var options = detailsContractTable.el.bootstrapTable('getOptions');
    detailsContractTable.el.bootstrapTable('destroy');
    detailsContractTable.el.find('tbody').html(content);
    detailsContractTable.init(options.pageNumber);
    if(callback)
       callback();
  }   
}


var bus = new Vue()

var extraTable = {
  init: function(page,row){
    this.el = $('#t-extras');
    this.el.bootstrapTable();
    this.el.find('tbody').css({display:"table-row-group"});
    this.el.addClass('innertable');
    this.detailBox = $('#payment-detail-box');
    this.detailBox.hide()
    
    if(page,row){
      var id = row.id_contrato;
      if(id == extraTable.getRow().id_contrato)
        this.el.bootstrapTable('selectPage',page);
    }

    this.el.on('dbl-click-row.bs.table',function(event,row,$el,field){
      //  Payments.getOne(row.id, Payments.edit);
    });

    this.el.on('click-row.bs.table',function(event,row,$el,field){
      event.stopImmediatePropagation();
      var self = extraTable;
      $(".payment-mode").removeClass("selected");
      
      if(!$el.hasClass('selected')){
        bus.$emit('row-selected',row);
      }
    })

    extraTable.clickEvents();
    this.el.on('all.bs.table',function(name,args){
      extraTable.clickEvents()
    })
  },

  getSelectedRow: function(){
    var self = this;
    return self.el.bootstrapTable('getSelections')[0]
  },

  getId: function(){
    var self = this;
    return $.map(self.el.bootstrapTable('getSelections'),function(row){
      return row.id;
    });
  },

  getRow: function(id){
    var data = this.el.bootstrapTable('getData');
    return data[0];

  },

  refresh: function(content,callback){
    var options = extraTable.el.bootstrapTable('getOptions');
    var row     = extraTable.getRow();

    extraTable.el.bootstrapTable('destroy');
    extraTable.el.find('tbody').html(content);
    extraTable.init(options.pageNumber, row);
    if(callback)
       callback();
  },  
  
  filter: function(value, type){
    if(type == 'estado'){
      this.el.bootstrapTable('filterBy',{
        estado: value
      });
    }else{
      hoy = moment().format("YYYY-MM-DD")
      this.el.bootstrapTable('filterBy',{
        fecha_limite: []
      });

    }
    
  },

  clickEvents: function(){
    $(".payment-advanced").on('click',function(e) {
      e.preventDefault()
      e.stopImmediatePropagation();
      console.log('yo si funciono')
      var id = $(this).attr('data-id-pago').trim();
      if (id) {
        Payments.getOne(id, Payments.receiveForEdit);
      }
    });

    $(".extra-delete").on('click',function(e) {
      e.preventDefault()
      e.stopImmediatePropagation();
      var id = $(this).attr('data-id-extra').trim();
      if (id) {
         swal({
          title: 'Está Seguro?',
          text: "Seguro de que quiere deshacer servicio extra?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          'cancelButtonText': 'Cancelar'
        }).then(function(){
          Extras.remove(id);
        });
      }
    });

  }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZ1ZS5taW4uanMiLCJheGlvcy5taW4uanMiLCJib290c3RyYXAtdGFibGUubWluLmpzIiwiYm9vdHN0cmFwLXRhYmxlLWVzLVNQLm1pbi5qcyIsInN3ZWV0YWxlcnQyLm1pbi5qcyIsImNsaWVudFRhYmxlLmpzIiwic2VydmljZVRhYmxlLmpzIiwiY29udHJhY3RUYWJsZS5qcyIsImFkbWluVGFibGVzLmpzIiwicGF5bWVudFRhYmxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImZvb3QuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBWdWUuanMgdjIuNC4wXG4gKiAoYykgMjAxNC0yMDE3IEV2YW4gWW91XG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cbiFmdW5jdGlvbih0LGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGUpOnQuVnVlPWUoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7cmV0dXJuIHZvaWQgMD09PXR8fG51bGw9PT10fWZ1bmN0aW9uIGUodCl7cmV0dXJuIHZvaWQgMCE9PXQmJm51bGwhPT10fWZ1bmN0aW9uIG4odCl7cmV0dXJuITA9PT10fWZ1bmN0aW9uIHIodCl7cmV0dXJuITE9PT10fWZ1bmN0aW9uIGkodCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHR8fFwibnVtYmVyXCI9PXR5cGVvZiB0fWZ1bmN0aW9uIG8odCl7cmV0dXJuIG51bGwhPT10JiZcIm9iamVjdFwiPT10eXBlb2YgdH1mdW5jdGlvbiBhKHQpe3JldHVyblwiW29iamVjdCBPYmplY3RdXCI9PT1kaS5jYWxsKHQpfWZ1bmN0aW9uIHModCl7cmV0dXJuXCJbb2JqZWN0IFJlZ0V4cF1cIj09PWRpLmNhbGwodCl9ZnVuY3Rpb24gYyh0KXt2YXIgZT1wYXJzZUZsb2F0KHQpO3JldHVybiBlPj0wJiZNYXRoLmZsb29yKGUpPT09ZSYmaXNGaW5pdGUodCl9ZnVuY3Rpb24gdSh0KXtyZXR1cm4gbnVsbD09dD9cIlwiOlwib2JqZWN0XCI9PXR5cGVvZiB0P0pTT04uc3RyaW5naWZ5KHQsbnVsbCwyKTpTdHJpbmcodCl9ZnVuY3Rpb24gbCh0KXt2YXIgZT1wYXJzZUZsb2F0KHQpO3JldHVybiBpc05hTihlKT90OmV9ZnVuY3Rpb24gZih0LGUpe2Zvcih2YXIgbj1PYmplY3QuY3JlYXRlKG51bGwpLHI9dC5zcGxpdChcIixcIiksaT0wO2k8ci5sZW5ndGg7aSsrKW5bcltpXV09ITA7cmV0dXJuIGU/ZnVuY3Rpb24odCl7cmV0dXJuIG5bdC50b0xvd2VyQ2FzZSgpXX06ZnVuY3Rpb24odCl7cmV0dXJuIG5bdF19fWZ1bmN0aW9uIHAodCxlKXtpZih0Lmxlbmd0aCl7dmFyIG49dC5pbmRleE9mKGUpO2lmKG4+LTEpcmV0dXJuIHQuc3BsaWNlKG4sMSl9fWZ1bmN0aW9uIGQodCxlKXtyZXR1cm4gbWkuY2FsbCh0LGUpfWZ1bmN0aW9uIHYodCl7dmFyIGU9T2JqZWN0LmNyZWF0ZShudWxsKTtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIGVbbl18fChlW25dPXQobikpfX1mdW5jdGlvbiBoKHQsZSl7ZnVuY3Rpb24gbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO3JldHVybiByP3I+MT90LmFwcGx5KGUsYXJndW1lbnRzKTp0LmNhbGwoZSxuKTp0LmNhbGwoZSl9cmV0dXJuIG4uX2xlbmd0aD10Lmxlbmd0aCxufWZ1bmN0aW9uIG0odCxlKXtlPWV8fDA7Zm9yKHZhciBuPXQubGVuZ3RoLWUscj1uZXcgQXJyYXkobik7bi0tOylyW25dPXRbbitlXTtyZXR1cm4gcn1mdW5jdGlvbiB5KHQsZSl7Zm9yKHZhciBuIGluIGUpdFtuXT1lW25dO3JldHVybiB0fWZ1bmN0aW9uIGcodCl7Zm9yKHZhciBlPXt9LG49MDtuPHQubGVuZ3RoO24rKyl0W25dJiZ5KGUsdFtuXSk7cmV0dXJuIGV9ZnVuY3Rpb24gXyh0LGUsbil7fWZ1bmN0aW9uIGIodCxlKXt2YXIgbj1vKHQpLHI9byhlKTtpZighbnx8IXIpcmV0dXJuIW4mJiFyJiZTdHJpbmcodCk9PT1TdHJpbmcoZSk7dHJ5e3JldHVybiBKU09OLnN0cmluZ2lmeSh0KT09PUpTT04uc3RyaW5naWZ5KGUpfWNhdGNoKG4pe3JldHVybiB0PT09ZX19ZnVuY3Rpb24gJCh0LGUpe2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKWlmKGIodFtuXSxlKSlyZXR1cm4gbjtyZXR1cm4tMX1mdW5jdGlvbiBDKHQpe3ZhciBlPSExO3JldHVybiBmdW5jdGlvbigpe2V8fChlPSEwLHQuYXBwbHkodGhpcyxhcmd1bWVudHMpKX19ZnVuY3Rpb24gdyh0KXt2YXIgZT0odCtcIlwiKS5jaGFyQ29kZUF0KDApO3JldHVybiAzNj09PWV8fDk1PT09ZX1mdW5jdGlvbiB4KHQsZSxuLHIpe09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LGUse3ZhbHVlOm4sZW51bWVyYWJsZTohIXIsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfSl9ZnVuY3Rpb24gQSh0KXtpZighVGkudGVzdCh0KSl7dmFyIGU9dC5zcGxpdChcIi5cIik7cmV0dXJuIGZ1bmN0aW9uKHQpe2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7bisrKXtpZighdClyZXR1cm47dD10W2Vbbl1dfXJldHVybiB0fX19ZnVuY3Rpb24gayh0LGUsbil7aWYoT2kuZXJyb3JIYW5kbGVyKU9pLmVycm9ySGFuZGxlci5jYWxsKG51bGwsdCxlLG4pO2Vsc2V7aWYoIU5pfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgY29uc29sZSl0aHJvdyB0O2NvbnNvbGUuZXJyb3IodCl9fWZ1bmN0aW9uIE8odCl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdCYmL25hdGl2ZSBjb2RlLy50ZXN0KHQudG9TdHJpbmcoKSl9ZnVuY3Rpb24gUyh0KXtaaS50YXJnZXQmJllpLnB1c2goWmkudGFyZ2V0KSxaaS50YXJnZXQ9dH1mdW5jdGlvbiBUKCl7WmkudGFyZ2V0PVlpLnBvcCgpfWZ1bmN0aW9uIEUodCxlLG4pe3QuX19wcm90b19fPWV9ZnVuY3Rpb24gaih0LGUsbil7Zm9yKHZhciByPTAsaT1uLmxlbmd0aDtyPGk7cisrKXt2YXIgbz1uW3JdO3godCxvLGVbb10pfX1mdW5jdGlvbiBOKHQsZSl7aWYobyh0KSl7dmFyIG47cmV0dXJuIGQodCxcIl9fb2JfX1wiKSYmdC5fX29iX18gaW5zdGFuY2VvZiBubz9uPXQuX19vYl9fOmVvLnNob3VsZENvbnZlcnQmJiFLaSgpJiYoQXJyYXkuaXNBcnJheSh0KXx8YSh0KSkmJk9iamVjdC5pc0V4dGVuc2libGUodCkmJiF0Ll9pc1Z1ZSYmKG49bmV3IG5vKHQpKSxlJiZuJiZuLnZtQ291bnQrKyxufX1mdW5jdGlvbiBMKHQsZSxuLHIsaSl7dmFyIG89bmV3IFppLGE9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LGUpO2lmKCFhfHwhMSE9PWEuY29uZmlndXJhYmxlKXt2YXIgcz1hJiZhLmdldCxjPWEmJmEuc2V0LHU9IWkmJk4obik7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsZSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7dmFyIGU9cz9zLmNhbGwodCk6bjtyZXR1cm4gWmkudGFyZ2V0JiYoby5kZXBlbmQoKSx1JiZ1LmRlcC5kZXBlbmQoKSxBcnJheS5pc0FycmF5KGUpJiZEKGUpKSxlfSxzZXQ6ZnVuY3Rpb24oZSl7dmFyIHI9cz9zLmNhbGwodCk6bjtlPT09cnx8ZSE9PWUmJnIhPT1yfHwoYz9jLmNhbGwodCxlKTpuPWUsdT0haSYmTihlKSxvLm5vdGlmeSgpKX19KX19ZnVuY3Rpb24gSSh0LGUsbil7aWYoQXJyYXkuaXNBcnJheSh0KSYmYyhlKSlyZXR1cm4gdC5sZW5ndGg9TWF0aC5tYXgodC5sZW5ndGgsZSksdC5zcGxpY2UoZSwxLG4pLG47aWYoZCh0LGUpKXJldHVybiB0W2VdPW4sbjt2YXIgcj10Ll9fb2JfXztyZXR1cm4gdC5faXNWdWV8fHImJnIudm1Db3VudD9uOnI/KEwoci52YWx1ZSxlLG4pLHIuZGVwLm5vdGlmeSgpLG4pOih0W2VdPW4sbil9ZnVuY3Rpb24gTSh0LGUpe2lmKEFycmF5LmlzQXJyYXkodCkmJmMoZSkpdC5zcGxpY2UoZSwxKTtlbHNle3ZhciBuPXQuX19vYl9fO3QuX2lzVnVlfHxuJiZuLnZtQ291bnR8fGQodCxlKSYmKGRlbGV0ZSB0W2VdLG4mJm4uZGVwLm5vdGlmeSgpKX19ZnVuY3Rpb24gRCh0KXtmb3IodmFyIGU9dm9pZCAwLG49MCxyPXQubGVuZ3RoO248cjtuKyspKGU9dFtuXSkmJmUuX19vYl9fJiZlLl9fb2JfXy5kZXAuZGVwZW5kKCksQXJyYXkuaXNBcnJheShlKSYmRChlKX1mdW5jdGlvbiBQKHQsZSl7aWYoIWUpcmV0dXJuIHQ7Zm9yKHZhciBuLHIsaSxvPU9iamVjdC5rZXlzKGUpLHM9MDtzPG8ubGVuZ3RoO3MrKylyPXRbbj1vW3NdXSxpPWVbbl0sZCh0LG4pP2EocikmJmEoaSkmJlAocixpKTpJKHQsbixpKTtyZXR1cm4gdH1mdW5jdGlvbiBGKHQsZSxuKXtyZXR1cm4gbj90fHxlP2Z1bmN0aW9uKCl7dmFyIHI9XCJmdW5jdGlvblwiPT10eXBlb2YgZT9lLmNhbGwobik6ZSxpPVwiZnVuY3Rpb25cIj09dHlwZW9mIHQ/dC5jYWxsKG4pOnZvaWQgMDtyZXR1cm4gcj9QKHIsaSk6aX06dm9pZCAwOmU/dD9mdW5jdGlvbigpe3JldHVybiBQKFwiZnVuY3Rpb25cIj09dHlwZW9mIGU/ZS5jYWxsKHRoaXMpOmUsdC5jYWxsKHRoaXMpKX06ZTp0fWZ1bmN0aW9uIFIodCxlKXtyZXR1cm4gZT90P3QuY29uY2F0KGUpOkFycmF5LmlzQXJyYXkoZSk/ZTpbZV06dH1mdW5jdGlvbiBIKHQsZSl7dmFyIG49T2JqZWN0LmNyZWF0ZSh0fHxudWxsKTtyZXR1cm4gZT95KG4sZSk6bn1mdW5jdGlvbiBCKHQpe3ZhciBlPXQucHJvcHM7aWYoZSl7dmFyIG4scixpPXt9O2lmKEFycmF5LmlzQXJyYXkoZSkpZm9yKG49ZS5sZW5ndGg7bi0tOylcInN0cmluZ1wiPT10eXBlb2Yocj1lW25dKSYmKGlbZ2kocildPXt0eXBlOm51bGx9KTtlbHNlIGlmKGEoZSkpZm9yKHZhciBvIGluIGUpcj1lW29dLGlbZ2kobyldPWEocik/cjp7dHlwZTpyfTt0LnByb3BzPWl9fWZ1bmN0aW9uIFUodCl7dmFyIGU9dC5pbmplY3Q7aWYoQXJyYXkuaXNBcnJheShlKSlmb3IodmFyIG49dC5pbmplY3Q9e30scj0wO3I8ZS5sZW5ndGg7cisrKW5bZVtyXV09ZVtyXX1mdW5jdGlvbiBWKHQpe3ZhciBlPXQuZGlyZWN0aXZlcztpZihlKWZvcih2YXIgbiBpbiBlKXt2YXIgcj1lW25dO1wiZnVuY3Rpb25cIj09dHlwZW9mIHImJihlW25dPXtiaW5kOnIsdXBkYXRlOnJ9KX19ZnVuY3Rpb24geih0LGUsbil7ZnVuY3Rpb24gcihyKXt2YXIgaT1yb1tyXXx8aW87Y1tyXT1pKHRbcl0sZVtyXSxuLHIpfVwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihlPWUub3B0aW9ucyksQihlKSxVKGUpLFYoZSk7dmFyIGk9ZS5leHRlbmRzO2lmKGkmJih0PXoodCxpLG4pKSxlLm1peGlucylmb3IodmFyIG89MCxhPWUubWl4aW5zLmxlbmd0aDtvPGE7bysrKXQ9eih0LGUubWl4aW5zW29dLG4pO3ZhciBzLGM9e307Zm9yKHMgaW4gdClyKHMpO2ZvcihzIGluIGUpZCh0LHMpfHxyKHMpO3JldHVybiBjfWZ1bmN0aW9uIEsodCxlLG4scil7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG4pe3ZhciBpPXRbZV07aWYoZChpLG4pKXJldHVybiBpW25dO3ZhciBvPWdpKG4pO2lmKGQoaSxvKSlyZXR1cm4gaVtvXTt2YXIgYT1faShvKTtpZihkKGksYSkpcmV0dXJuIGlbYV07dmFyIHM9aVtuXXx8aVtvXXx8aVthXTtyZXR1cm4gc319ZnVuY3Rpb24gSih0LGUsbixyKXt2YXIgaT1lW3RdLG89IWQobix0KSxhPW5bdF07aWYoRyhCb29sZWFuLGkudHlwZSkmJihvJiYhZChpLFwiZGVmYXVsdFwiKT9hPSExOkcoU3RyaW5nLGkudHlwZSl8fFwiXCIhPT1hJiZhIT09JGkodCl8fChhPSEwKSksdm9pZCAwPT09YSl7YT1xKHIsaSx0KTt2YXIgcz1lby5zaG91bGRDb252ZXJ0O2VvLnNob3VsZENvbnZlcnQ9ITAsTihhKSxlby5zaG91bGRDb252ZXJ0PXN9cmV0dXJuIGF9ZnVuY3Rpb24gcSh0LGUsbil7aWYoZChlLFwiZGVmYXVsdFwiKSl7dmFyIHI9ZS5kZWZhdWx0O3JldHVybiB0JiZ0LiRvcHRpb25zLnByb3BzRGF0YSYmdm9pZCAwPT09dC4kb3B0aW9ucy5wcm9wc0RhdGFbbl0mJnZvaWQgMCE9PXQuX3Byb3BzW25dP3QuX3Byb3BzW25dOlwiZnVuY3Rpb25cIj09dHlwZW9mIHImJlwiRnVuY3Rpb25cIiE9PVcoZS50eXBlKT9yLmNhbGwodCk6cn19ZnVuY3Rpb24gVyh0KXt2YXIgZT10JiZ0LnRvU3RyaW5nKCkubWF0Y2goL15cXHMqZnVuY3Rpb24gKFxcdyspLyk7cmV0dXJuIGU/ZVsxXTpcIlwifWZ1bmN0aW9uIEcodCxlKXtpZighQXJyYXkuaXNBcnJheShlKSlyZXR1cm4gVyhlKT09PVcodCk7Zm9yKHZhciBuPTAscj1lLmxlbmd0aDtuPHI7bisrKWlmKFcoZVtuXSk9PT1XKHQpKXJldHVybiEwO3JldHVybiExfWZ1bmN0aW9uIFoodCl7cmV0dXJuIG5ldyBvbyh2b2lkIDAsdm9pZCAwLHZvaWQgMCxTdHJpbmcodCkpfWZ1bmN0aW9uIFkodCl7dmFyIGU9bmV3IG9vKHQudGFnLHQuZGF0YSx0LmNoaWxkcmVuLHQudGV4dCx0LmVsbSx0LmNvbnRleHQsdC5jb21wb25lbnRPcHRpb25zLHQuYXN5bmNGYWN0b3J5KTtyZXR1cm4gZS5ucz10Lm5zLGUuaXNTdGF0aWM9dC5pc1N0YXRpYyxlLmtleT10LmtleSxlLmlzQ29tbWVudD10LmlzQ29tbWVudCxlLmlzQ2xvbmVkPSEwLGV9ZnVuY3Rpb24gUSh0KXtmb3IodmFyIGU9dC5sZW5ndGgsbj1uZXcgQXJyYXkoZSkscj0wO3I8ZTtyKyspbltyXT1ZKHRbcl0pO3JldHVybiBufWZ1bmN0aW9uIFgodCl7ZnVuY3Rpb24gZSgpe3ZhciB0PWFyZ3VtZW50cyxuPWUuZm5zO2lmKCFBcnJheS5pc0FycmF5KG4pKXJldHVybiBuLmFwcGx5KG51bGwsYXJndW1lbnRzKTtmb3IodmFyIHI9bi5zbGljZSgpLGk9MDtpPHIubGVuZ3RoO2krKylyW2ldLmFwcGx5KG51bGwsdCl9cmV0dXJuIGUuZm5zPXQsZX1mdW5jdGlvbiB0dChlLG4scixpLG8pe3ZhciBhLHMsYyx1O2ZvcihhIGluIGUpcz1lW2FdLGM9blthXSx1PXVvKGEpLHQocyl8fCh0KGMpPyh0KHMuZm5zKSYmKHM9ZVthXT1YKHMpKSxyKHUubmFtZSxzLHUub25jZSx1LmNhcHR1cmUsdS5wYXNzaXZlKSk6cyE9PWMmJihjLmZucz1zLGVbYV09YykpO2ZvcihhIGluIG4pdChlW2FdKSYmaSgodT11byhhKSkubmFtZSxuW2FdLHUuY2FwdHVyZSl9ZnVuY3Rpb24gZXQocixpLG8pe2Z1bmN0aW9uIGEoKXtvLmFwcGx5KHRoaXMsYXJndW1lbnRzKSxwKHMuZm5zLGEpfXZhciBzLGM9cltpXTt0KGMpP3M9WChbYV0pOmUoYy5mbnMpJiZuKGMubWVyZ2VkKT8ocz1jKS5mbnMucHVzaChhKTpzPVgoW2MsYV0pLHMubWVyZ2VkPSEwLHJbaV09c31mdW5jdGlvbiBudChuLHIsaSl7dmFyIG89ci5vcHRpb25zLnByb3BzO2lmKCF0KG8pKXt2YXIgYT17fSxzPW4uYXR0cnMsYz1uLnByb3BzO2lmKGUocyl8fGUoYykpZm9yKHZhciB1IGluIG8pe3ZhciBsPSRpKHUpO3J0KGEsYyx1LGwsITApfHxydChhLHMsdSxsLCExKX1yZXR1cm4gYX19ZnVuY3Rpb24gcnQodCxuLHIsaSxvKXtpZihlKG4pKXtpZihkKG4scikpcmV0dXJuIHRbcl09bltyXSxvfHxkZWxldGUgbltyXSwhMDtpZihkKG4saSkpcmV0dXJuIHRbcl09bltpXSxvfHxkZWxldGUgbltpXSwhMH1yZXR1cm4hMX1mdW5jdGlvbiBpdCh0KXtmb3IodmFyIGU9MDtlPHQubGVuZ3RoO2UrKylpZihBcnJheS5pc0FycmF5KHRbZV0pKXJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLHQpO3JldHVybiB0fWZ1bmN0aW9uIG90KHQpe3JldHVybiBpKHQpP1taKHQpXTpBcnJheS5pc0FycmF5KHQpP3N0KHQpOnZvaWQgMH1mdW5jdGlvbiBhdCh0KXtyZXR1cm4gZSh0KSYmZSh0LnRleHQpJiZyKHQuaXNDb21tZW50KX1mdW5jdGlvbiBzdChyLG8pe3ZhciBhLHMsYyx1PVtdO2ZvcihhPTA7YTxyLmxlbmd0aDthKyspdChzPXJbYV0pfHxcImJvb2xlYW5cIj09dHlwZW9mIHN8fChjPXVbdS5sZW5ndGgtMV0sQXJyYXkuaXNBcnJheShzKT91LnB1c2guYXBwbHkodSxzdChzLChvfHxcIlwiKStcIl9cIithKSk6aShzKT9hdChjKT9jLnRleHQrPVN0cmluZyhzKTpcIlwiIT09cyYmdS5wdXNoKFoocykpOmF0KHMpJiZhdChjKT91W3UubGVuZ3RoLTFdPVooYy50ZXh0K3MudGV4dCk6KG4oci5faXNWTGlzdCkmJmUocy50YWcpJiZ0KHMua2V5KSYmZShvKSYmKHMua2V5PVwiX192bGlzdFwiK28rXCJfXCIrYStcIl9fXCIpLHUucHVzaChzKSkpO3JldHVybiB1fWZ1bmN0aW9uIGN0KHQsZSl7cmV0dXJuIHQuX19lc01vZHVsZSYmdC5kZWZhdWx0JiYodD10LmRlZmF1bHQpLG8odCk/ZS5leHRlbmQodCk6dH1mdW5jdGlvbiB1dCh0LGUsbixyLGkpe3ZhciBvPWNvKCk7cmV0dXJuIG8uYXN5bmNGYWN0b3J5PXQsby5hc3luY01ldGE9e2RhdGE6ZSxjb250ZXh0Om4sY2hpbGRyZW46cix0YWc6aX0sb31mdW5jdGlvbiBsdChyLGksYSl7aWYobihyLmVycm9yKSYmZShyLmVycm9yQ29tcCkpcmV0dXJuIHIuZXJyb3JDb21wO2lmKGUoci5yZXNvbHZlZCkpcmV0dXJuIHIucmVzb2x2ZWQ7aWYobihyLmxvYWRpbmcpJiZlKHIubG9hZGluZ0NvbXApKXJldHVybiByLmxvYWRpbmdDb21wO2lmKCFlKHIuY29udGV4dHMpKXt2YXIgcz1yLmNvbnRleHRzPVthXSxjPSEwLHU9ZnVuY3Rpb24oKXtmb3IodmFyIHQ9MCxlPXMubGVuZ3RoO3Q8ZTt0Kyspc1t0XS4kZm9yY2VVcGRhdGUoKX0sbD1DKGZ1bmN0aW9uKHQpe3IucmVzb2x2ZWQ9Y3QodCxpKSxjfHx1KCl9KSxmPUMoZnVuY3Rpb24odCl7ZShyLmVycm9yQ29tcCkmJihyLmVycm9yPSEwLHUoKSl9KSxwPXIobCxmKTtyZXR1cm4gbyhwKSYmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHAudGhlbj90KHIucmVzb2x2ZWQpJiZwLnRoZW4obCxmKTplKHAuY29tcG9uZW50KSYmXCJmdW5jdGlvblwiPT10eXBlb2YgcC5jb21wb25lbnQudGhlbiYmKHAuY29tcG9uZW50LnRoZW4obCxmKSxlKHAuZXJyb3IpJiYoci5lcnJvckNvbXA9Y3QocC5lcnJvcixpKSksZShwLmxvYWRpbmcpJiYoci5sb2FkaW5nQ29tcD1jdChwLmxvYWRpbmcsaSksMD09PXAuZGVsYXk/ci5sb2FkaW5nPSEwOnNldFRpbWVvdXQoZnVuY3Rpb24oKXt0KHIucmVzb2x2ZWQpJiZ0KHIuZXJyb3IpJiYoci5sb2FkaW5nPSEwLHUoKSl9LHAuZGVsYXl8fDIwMCkpLGUocC50aW1lb3V0KSYmc2V0VGltZW91dChmdW5jdGlvbigpe3Qoci5yZXNvbHZlZCkmJmYobnVsbCl9LHAudGltZW91dCkpKSxjPSExLHIubG9hZGluZz9yLmxvYWRpbmdDb21wOnIucmVzb2x2ZWR9ci5jb250ZXh0cy5wdXNoKGEpfWZ1bmN0aW9uIGZ0KHQpe2lmKEFycmF5LmlzQXJyYXkodCkpZm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciByPXRbbl07aWYoZShyKSYmZShyLmNvbXBvbmVudE9wdGlvbnMpKXJldHVybiByfX1mdW5jdGlvbiBwdCh0KXt0Ll9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSx0Ll9oYXNIb29rRXZlbnQ9ITE7dmFyIGU9dC4kb3B0aW9ucy5fcGFyZW50TGlzdGVuZXJzO2UmJmh0KHQsZSl9ZnVuY3Rpb24gZHQodCxlLG4pe24/c28uJG9uY2UodCxlKTpzby4kb24odCxlKX1mdW5jdGlvbiB2dCh0LGUpe3NvLiRvZmYodCxlKX1mdW5jdGlvbiBodCh0LGUsbil7c289dCx0dChlLG58fHt9LGR0LHZ0LHQpfWZ1bmN0aW9uIG10KHQsZSl7dmFyIG49e307aWYoIXQpcmV0dXJuIG47Zm9yKHZhciByPVtdLGk9MCxvPXQubGVuZ3RoO2k8bztpKyspe3ZhciBhPXRbaV07aWYoYS5jb250ZXh0IT09ZSYmYS5mdW5jdGlvbmFsQ29udGV4dCE9PWV8fCFhLmRhdGF8fG51bGw9PWEuZGF0YS5zbG90KXIucHVzaChhKTtlbHNle3ZhciBzPWEuZGF0YS5zbG90LGM9bltzXXx8KG5bc109W10pO1widGVtcGxhdGVcIj09PWEudGFnP2MucHVzaC5hcHBseShjLGEuY2hpbGRyZW4pOmMucHVzaChhKX19cmV0dXJuIHIuZXZlcnkoeXQpfHwobi5kZWZhdWx0PXIpLG59ZnVuY3Rpb24geXQodCl7cmV0dXJuIHQuaXNDb21tZW50fHxcIiBcIj09PXQudGV4dH1mdW5jdGlvbiBndCh0LGUpe2U9ZXx8e307Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspQXJyYXkuaXNBcnJheSh0W25dKT9ndCh0W25dLGUpOmVbdFtuXS5rZXldPXRbbl0uZm47cmV0dXJuIGV9ZnVuY3Rpb24gX3QodCl7dmFyIGU9dC4kb3B0aW9ucyxuPWUucGFyZW50O2lmKG4mJiFlLmFic3RyYWN0KXtmb3IoO24uJG9wdGlvbnMuYWJzdHJhY3QmJm4uJHBhcmVudDspbj1uLiRwYXJlbnQ7bi4kY2hpbGRyZW4ucHVzaCh0KX10LiRwYXJlbnQ9bix0LiRyb290PW4/bi4kcm9vdDp0LHQuJGNoaWxkcmVuPVtdLHQuJHJlZnM9e30sdC5fd2F0Y2hlcj1udWxsLHQuX2luYWN0aXZlPW51bGwsdC5fZGlyZWN0SW5hY3RpdmU9ITEsdC5faXNNb3VudGVkPSExLHQuX2lzRGVzdHJveWVkPSExLHQuX2lzQmVpbmdEZXN0cm95ZWQ9ITF9ZnVuY3Rpb24gYnQodCxlLG4pe3QuJGVsPWUsdC4kb3B0aW9ucy5yZW5kZXJ8fCh0LiRvcHRpb25zLnJlbmRlcj1jbyksQXQodCxcImJlZm9yZU1vdW50XCIpO3ZhciByO3JldHVybiByPWZ1bmN0aW9uKCl7dC5fdXBkYXRlKHQuX3JlbmRlcigpLG4pfSx0Ll93YXRjaGVyPW5ldyBfbyh0LHIsXyksbj0hMSxudWxsPT10LiR2bm9kZSYmKHQuX2lzTW91bnRlZD0hMCxBdCh0LFwibW91bnRlZFwiKSksdH1mdW5jdGlvbiAkdCh0LGUsbixyLGkpe3ZhciBvPSEhKGl8fHQuJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVufHxyLmRhdGEuc2NvcGVkU2xvdHN8fHQuJHNjb3BlZFNsb3RzIT09U2kpO2lmKHQuJG9wdGlvbnMuX3BhcmVudFZub2RlPXIsdC4kdm5vZGU9cix0Ll92bm9kZSYmKHQuX3Zub2RlLnBhcmVudD1yKSx0LiRvcHRpb25zLl9yZW5kZXJDaGlsZHJlbj1pLHQuJGF0dHJzPXIuZGF0YSYmci5kYXRhLmF0dHJzLHQuJGxpc3RlbmVycz1uLGUmJnQuJG9wdGlvbnMucHJvcHMpe2VvLnNob3VsZENvbnZlcnQ9ITE7Zm9yKHZhciBhPXQuX3Byb3BzLHM9dC4kb3B0aW9ucy5fcHJvcEtleXN8fFtdLGM9MDtjPHMubGVuZ3RoO2MrKyl7dmFyIHU9c1tjXTthW3VdPUoodSx0LiRvcHRpb25zLnByb3BzLGUsdCl9ZW8uc2hvdWxkQ29udmVydD0hMCx0LiRvcHRpb25zLnByb3BzRGF0YT1lfWlmKG4pe3ZhciBsPXQuJG9wdGlvbnMuX3BhcmVudExpc3RlbmVyczt0LiRvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnM9bixodCh0LG4sbCl9byYmKHQuJHNsb3RzPW10KGksci5jb250ZXh0KSx0LiRmb3JjZVVwZGF0ZSgpKX1mdW5jdGlvbiBDdCh0KXtmb3IoO3QmJih0PXQuJHBhcmVudCk7KWlmKHQuX2luYWN0aXZlKXJldHVybiEwO3JldHVybiExfWZ1bmN0aW9uIHd0KHQsZSl7aWYoZSl7aWYodC5fZGlyZWN0SW5hY3RpdmU9ITEsQ3QodCkpcmV0dXJufWVsc2UgaWYodC5fZGlyZWN0SW5hY3RpdmUpcmV0dXJuO2lmKHQuX2luYWN0aXZlfHxudWxsPT09dC5faW5hY3RpdmUpe3QuX2luYWN0aXZlPSExO2Zvcih2YXIgbj0wO248dC4kY2hpbGRyZW4ubGVuZ3RoO24rKyl3dCh0LiRjaGlsZHJlbltuXSk7QXQodCxcImFjdGl2YXRlZFwiKX19ZnVuY3Rpb24geHQodCxlKXtpZighKGUmJih0Ll9kaXJlY3RJbmFjdGl2ZT0hMCxDdCh0KSl8fHQuX2luYWN0aXZlKSl7dC5faW5hY3RpdmU9ITA7Zm9yKHZhciBuPTA7bjx0LiRjaGlsZHJlbi5sZW5ndGg7bisrKXh0KHQuJGNoaWxkcmVuW25dKTtBdCh0LFwiZGVhY3RpdmF0ZWRcIil9fWZ1bmN0aW9uIEF0KHQsZSl7dmFyIG49dC4kb3B0aW9uc1tlXTtpZihuKWZvcih2YXIgcj0wLGk9bi5sZW5ndGg7cjxpO3IrKyl0cnl7bltyXS5jYWxsKHQpfWNhdGNoKG4pe2sobix0LGUrXCIgaG9va1wiKX10Ll9oYXNIb29rRXZlbnQmJnQuJGVtaXQoXCJob29rOlwiK2UpfWZ1bmN0aW9uIGt0KCl7eW89Zm8ubGVuZ3RoPXBvLmxlbmd0aD0wLHZvPXt9LGhvPW1vPSExfWZ1bmN0aW9uIE90KCl7bW89ITA7dmFyIHQsZTtmb3IoZm8uc29ydChmdW5jdGlvbih0LGUpe3JldHVybiB0LmlkLWUuaWR9KSx5bz0wO3lvPGZvLmxlbmd0aDt5bysrKWU9KHQ9Zm9beW9dKS5pZCx2b1tlXT1udWxsLHQucnVuKCk7dmFyIG49cG8uc2xpY2UoKSxyPWZvLnNsaWNlKCk7a3QoKSxFdChuKSxTdChyKSxKaSYmT2kuZGV2dG9vbHMmJkppLmVtaXQoXCJmbHVzaFwiKX1mdW5jdGlvbiBTdCh0KXtmb3IodmFyIGU9dC5sZW5ndGg7ZS0tOyl7dmFyIG49dFtlXSxyPW4udm07ci5fd2F0Y2hlcj09PW4mJnIuX2lzTW91bnRlZCYmQXQocixcInVwZGF0ZWRcIil9fWZ1bmN0aW9uIFR0KHQpe3QuX2luYWN0aXZlPSExLHBvLnB1c2godCl9ZnVuY3Rpb24gRXQodCl7Zm9yKHZhciBlPTA7ZTx0Lmxlbmd0aDtlKyspdFtlXS5faW5hY3RpdmU9ITAsd3QodFtlXSwhMCl9ZnVuY3Rpb24ganQodCl7dmFyIGU9dC5pZDtpZihudWxsPT12b1tlXSl7aWYodm9bZV09ITAsbW8pe2Zvcih2YXIgbj1mby5sZW5ndGgtMTtuPnlvJiZmb1tuXS5pZD50LmlkOyluLS07Zm8uc3BsaWNlKG4rMSwwLHQpfWVsc2UgZm8ucHVzaCh0KTtob3x8KGhvPSEwLFdpKE90KSl9fWZ1bmN0aW9uIE50KHQpe2JvLmNsZWFyKCksTHQodCxibyl9ZnVuY3Rpb24gTHQodCxlKXt2YXIgbixyLGk9QXJyYXkuaXNBcnJheSh0KTtpZigoaXx8byh0KSkmJk9iamVjdC5pc0V4dGVuc2libGUodCkpe2lmKHQuX19vYl9fKXt2YXIgYT10Ll9fb2JfXy5kZXAuaWQ7aWYoZS5oYXMoYSkpcmV0dXJuO2UuYWRkKGEpfWlmKGkpZm9yKG49dC5sZW5ndGg7bi0tOylMdCh0W25dLGUpO2Vsc2UgZm9yKG49KHI9T2JqZWN0LmtleXModCkpLmxlbmd0aDtuLS07KUx0KHRbcltuXV0sZSl9fWZ1bmN0aW9uIEl0KHQsZSxuKXskby5nZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1tlXVtuXX0sJG8uc2V0PWZ1bmN0aW9uKHQpe3RoaXNbZV1bbl09dH0sT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbiwkbyl9ZnVuY3Rpb24gTXQodCl7dC5fd2F0Y2hlcnM9W107dmFyIGU9dC4kb3B0aW9ucztlLnByb3BzJiZEdCh0LGUucHJvcHMpLGUubWV0aG9kcyYmVXQodCxlLm1ldGhvZHMpLGUuZGF0YT9QdCh0KTpOKHQuX2RhdGE9e30sITApLGUuY29tcHV0ZWQmJlJ0KHQsZS5jb21wdXRlZCksZS53YXRjaCYmZS53YXRjaCE9PUhpJiZWdCh0LGUud2F0Y2gpfWZ1bmN0aW9uIER0KHQsZSl7dmFyIG49dC4kb3B0aW9ucy5wcm9wc0RhdGF8fHt9LHI9dC5fcHJvcHM9e30saT10LiRvcHRpb25zLl9wcm9wS2V5cz1bXSxvPSF0LiRwYXJlbnQ7ZW8uc2hvdWxkQ29udmVydD1vO2Zvcih2YXIgYSBpbiBlKSFmdW5jdGlvbihvKXtpLnB1c2gobyk7dmFyIGE9SihvLGUsbix0KTtMKHIsbyxhKSxvIGluIHR8fEl0KHQsXCJfcHJvcHNcIixvKX0oYSk7ZW8uc2hvdWxkQ29udmVydD0hMH1mdW5jdGlvbiBQdCh0KXt2YXIgZT10LiRvcHRpb25zLmRhdGE7YShlPXQuX2RhdGE9XCJmdW5jdGlvblwiPT10eXBlb2YgZT9GdChlLHQpOmV8fHt9KXx8KGU9e30pO2Zvcih2YXIgbj1PYmplY3Qua2V5cyhlKSxyPXQuJG9wdGlvbnMucHJvcHMsaT0odC4kb3B0aW9ucy5tZXRob2RzLG4ubGVuZ3RoKTtpLS07KXt2YXIgbz1uW2ldO3ImJmQocixvKXx8dyhvKXx8SXQodCxcIl9kYXRhXCIsbyl9TihlLCEwKX1mdW5jdGlvbiBGdCh0LGUpe3RyeXtyZXR1cm4gdC5jYWxsKGUpfWNhdGNoKHQpe3JldHVybiBrKHQsZSxcImRhdGEoKVwiKSx7fX19ZnVuY3Rpb24gUnQodCxlKXt2YXIgbj10Ll9jb21wdXRlZFdhdGNoZXJzPU9iamVjdC5jcmVhdGUobnVsbCk7Zm9yKHZhciByIGluIGUpe3ZhciBpPWVbcl0sbz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpP2k6aS5nZXQ7bltyXT1uZXcgX28odCxvLF8sQ28pLHIgaW4gdHx8SHQodCxyLGkpfX1mdW5jdGlvbiBIdCh0LGUsbil7XCJmdW5jdGlvblwiPT10eXBlb2Ygbj8oJG8uZ2V0PUJ0KGUpLCRvLnNldD1fKTooJG8uZ2V0PW4uZ2V0PyExIT09bi5jYWNoZT9CdChlKTpuLmdldDpfLCRvLnNldD1uLnNldD9uLnNldDpfKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxlLCRvKX1mdW5jdGlvbiBCdCh0KXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgZT10aGlzLl9jb21wdXRlZFdhdGNoZXJzJiZ0aGlzLl9jb21wdXRlZFdhdGNoZXJzW3RdO2lmKGUpcmV0dXJuIGUuZGlydHkmJmUuZXZhbHVhdGUoKSxaaS50YXJnZXQmJmUuZGVwZW5kKCksZS52YWx1ZX19ZnVuY3Rpb24gVXQodCxlKXt0LiRvcHRpb25zLnByb3BzO2Zvcih2YXIgbiBpbiBlKXRbbl09bnVsbD09ZVtuXT9fOmgoZVtuXSx0KX1mdW5jdGlvbiBWdCh0LGUpe2Zvcih2YXIgbiBpbiBlKXt2YXIgcj1lW25dO2lmKEFycmF5LmlzQXJyYXkocikpZm9yKHZhciBpPTA7aTxyLmxlbmd0aDtpKyspenQodCxuLHJbaV0pO2Vsc2UgenQodCxuLHIpfX1mdW5jdGlvbiB6dCh0LGUsbixyKXtyZXR1cm4gYShuKSYmKHI9bixuPW4uaGFuZGxlciksXCJzdHJpbmdcIj09dHlwZW9mIG4mJihuPXRbbl0pLHQuJHdhdGNoKGUsbixyKX1mdW5jdGlvbiBLdCh0KXt2YXIgZT10LiRvcHRpb25zLnByb3ZpZGU7ZSYmKHQuX3Byb3ZpZGVkPVwiZnVuY3Rpb25cIj09dHlwZW9mIGU/ZS5jYWxsKHQpOmUpfWZ1bmN0aW9uIEp0KHQpe3ZhciBlPXF0KHQuJG9wdGlvbnMuaW5qZWN0LHQpO2UmJihlby5zaG91bGRDb252ZXJ0PSExLE9iamVjdC5rZXlzKGUpLmZvckVhY2goZnVuY3Rpb24obil7TCh0LG4sZVtuXSl9KSxlby5zaG91bGRDb252ZXJ0PSEwKX1mdW5jdGlvbiBxdCh0LGUpe2lmKHQpe2Zvcih2YXIgbj1PYmplY3QuY3JlYXRlKG51bGwpLHI9cWk/UmVmbGVjdC5vd25LZXlzKHQpOk9iamVjdC5rZXlzKHQpLGk9MDtpPHIubGVuZ3RoO2krKylmb3IodmFyIG89cltpXSxhPXRbb10scz1lO3M7KXtpZihzLl9wcm92aWRlZCYmYSBpbiBzLl9wcm92aWRlZCl7bltvXT1zLl9wcm92aWRlZFthXTticmVha31zPXMuJHBhcmVudH1yZXR1cm4gbn19ZnVuY3Rpb24gV3QodCxuLHIsaSxvKXt2YXIgYT17fSxzPXQub3B0aW9ucy5wcm9wcztpZihlKHMpKWZvcih2YXIgYyBpbiBzKWFbY109SihjLHMsbnx8e30pO2Vsc2UgZShyLmF0dHJzKSYmR3QoYSxyLmF0dHJzKSxlKHIucHJvcHMpJiZHdChhLHIucHJvcHMpO3ZhciB1PU9iamVjdC5jcmVhdGUoaSksbD10Lm9wdGlvbnMucmVuZGVyLmNhbGwobnVsbCxmdW5jdGlvbih0LGUsbixyKXtyZXR1cm4gZWUodSx0LGUsbixyLCEwKX0se2RhdGE6cixwcm9wczphLGNoaWxkcmVuOm8scGFyZW50OmksbGlzdGVuZXJzOnIub258fHt9LGluamVjdGlvbnM6cXQodC5vcHRpb25zLmluamVjdCxpKSxzbG90czpmdW5jdGlvbigpe3JldHVybiBtdChvLGkpfX0pO3JldHVybiBsIGluc3RhbmNlb2Ygb28mJihsLmZ1bmN0aW9uYWxDb250ZXh0PWksbC5mdW5jdGlvbmFsT3B0aW9ucz10Lm9wdGlvbnMsci5zbG90JiYoKGwuZGF0YXx8KGwuZGF0YT17fSkpLnNsb3Q9ci5zbG90KSksbH1mdW5jdGlvbiBHdCh0LGUpe2Zvcih2YXIgbiBpbiBlKXRbZ2kobildPWVbbl19ZnVuY3Rpb24gWnQocixpLGEscyxjKXtpZighdChyKSl7dmFyIHU9YS4kb3B0aW9ucy5fYmFzZTtpZihvKHIpJiYocj11LmV4dGVuZChyKSksXCJmdW5jdGlvblwiPT10eXBlb2Ygcil7dmFyIGw7aWYodChyLmNpZCkmJihsPXIsdm9pZCAwPT09KHI9bHQobCx1LGEpKSkpcmV0dXJuIHV0KGwsaSxhLHMsYyk7aT1pfHx7fSxtZShyKSxlKGkubW9kZWwpJiZ0ZShyLm9wdGlvbnMsaSk7dmFyIGY9bnQoaSxyLGMpO2lmKG4oci5vcHRpb25zLmZ1bmN0aW9uYWwpKXJldHVybiBXdChyLGYsaSxhLHMpO3ZhciBwPWkub247aWYobihyLm9wdGlvbnMuYWJzdHJhY3QpKXt2YXIgZD1pLnNsb3Q7aT17fSxkJiYoaS5zbG90PWQpfVF0KGkpO3ZhciB2PXIub3B0aW9ucy5uYW1lfHxjO3JldHVybiBuZXcgb28oXCJ2dWUtY29tcG9uZW50LVwiK3IuY2lkKyh2P1wiLVwiK3Y6XCJcIiksaSx2b2lkIDAsdm9pZCAwLHZvaWQgMCxhLHtDdG9yOnIscHJvcHNEYXRhOmYsbGlzdGVuZXJzOnAsdGFnOmMsY2hpbGRyZW46c30sbCl9fX1mdW5jdGlvbiBZdCh0LG4scixpKXt2YXIgbz10LmNvbXBvbmVudE9wdGlvbnMsYT17X2lzQ29tcG9uZW50OiEwLHBhcmVudDpuLHByb3BzRGF0YTpvLnByb3BzRGF0YSxfY29tcG9uZW50VGFnOm8udGFnLF9wYXJlbnRWbm9kZTp0LF9wYXJlbnRMaXN0ZW5lcnM6by5saXN0ZW5lcnMsX3JlbmRlckNoaWxkcmVuOm8uY2hpbGRyZW4sX3BhcmVudEVsbTpyfHxudWxsLF9yZWZFbG06aXx8bnVsbH0scz10LmRhdGEuaW5saW5lVGVtcGxhdGU7cmV0dXJuIGUocykmJihhLnJlbmRlcj1zLnJlbmRlcixhLnN0YXRpY1JlbmRlckZucz1zLnN0YXRpY1JlbmRlckZucyksbmV3IG8uQ3RvcihhKX1mdW5jdGlvbiBRdCh0KXt0Lmhvb2t8fCh0Lmhvb2s9e30pO2Zvcih2YXIgZT0wO2U8eG8ubGVuZ3RoO2UrKyl7dmFyIG49eG9bZV0scj10Lmhvb2tbbl0saT13b1tuXTt0Lmhvb2tbbl09cj9YdChpLHIpOml9fWZ1bmN0aW9uIFh0KHQsZSl7cmV0dXJuIGZ1bmN0aW9uKG4scixpLG8pe3QobixyLGksbyksZShuLHIsaSxvKX19ZnVuY3Rpb24gdGUodCxuKXt2YXIgcj10Lm1vZGVsJiZ0Lm1vZGVsLnByb3B8fFwidmFsdWVcIixpPXQubW9kZWwmJnQubW9kZWwuZXZlbnR8fFwiaW5wdXRcIjsobi5wcm9wc3x8KG4ucHJvcHM9e30pKVtyXT1uLm1vZGVsLnZhbHVlO3ZhciBvPW4ub258fChuLm9uPXt9KTtlKG9baV0pP29baV09W24ubW9kZWwuY2FsbGJhY2tdLmNvbmNhdChvW2ldKTpvW2ldPW4ubW9kZWwuY2FsbGJhY2t9ZnVuY3Rpb24gZWUodCxlLHIsbyxhLHMpe3JldHVybihBcnJheS5pc0FycmF5KHIpfHxpKHIpKSYmKGE9byxvPXIscj12b2lkIDApLG4ocykmJihhPWtvKSxuZSh0LGUscixvLGEpfWZ1bmN0aW9uIG5lKHQsbixyLGksbyl7aWYoZShyKSYmZShyLl9fb2JfXykpcmV0dXJuIGNvKCk7aWYoZShyKSYmZShyLmlzKSYmKG49ci5pcyksIW4pcmV0dXJuIGNvKCk7QXJyYXkuaXNBcnJheShpKSYmXCJmdW5jdGlvblwiPT10eXBlb2YgaVswXSYmKChyPXJ8fHt9KS5zY29wZWRTbG90cz17ZGVmYXVsdDppWzBdfSxpLmxlbmd0aD0wKSxvPT09a28/aT1vdChpKTpvPT09QW8mJihpPWl0KGkpKTt2YXIgYSxzO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBuKXt2YXIgYztzPU9pLmdldFRhZ05hbWVzcGFjZShuKSxhPU9pLmlzUmVzZXJ2ZWRUYWcobik/bmV3IG9vKE9pLnBhcnNlUGxhdGZvcm1UYWdOYW1lKG4pLHIsaSx2b2lkIDAsdm9pZCAwLHQpOmUoYz1LKHQuJG9wdGlvbnMsXCJjb21wb25lbnRzXCIsbikpP1p0KGMscix0LGksbik6bmV3IG9vKG4scixpLHZvaWQgMCx2b2lkIDAsdCl9ZWxzZSBhPVp0KG4scix0LGkpO3JldHVybiBlKGEpPyhzJiZyZShhLHMpLGEpOmNvKCl9ZnVuY3Rpb24gcmUobixyKXtpZihuLm5zPXIsXCJmb3JlaWduT2JqZWN0XCIhPT1uLnRhZyYmZShuLmNoaWxkcmVuKSlmb3IodmFyIGk9MCxvPW4uY2hpbGRyZW4ubGVuZ3RoO2k8bztpKyspe3ZhciBhPW4uY2hpbGRyZW5baV07ZShhLnRhZykmJnQoYS5ucykmJnJlKGEscil9fWZ1bmN0aW9uIGllKHQsbil7dmFyIHIsaSxhLHMsYztpZihBcnJheS5pc0FycmF5KHQpfHxcInN0cmluZ1wiPT10eXBlb2YgdClmb3Iocj1uZXcgQXJyYXkodC5sZW5ndGgpLGk9MCxhPXQubGVuZ3RoO2k8YTtpKyspcltpXT1uKHRbaV0saSk7ZWxzZSBpZihcIm51bWJlclwiPT10eXBlb2YgdClmb3Iocj1uZXcgQXJyYXkodCksaT0wO2k8dDtpKyspcltpXT1uKGkrMSxpKTtlbHNlIGlmKG8odCkpZm9yKHM9T2JqZWN0LmtleXModCkscj1uZXcgQXJyYXkocy5sZW5ndGgpLGk9MCxhPXMubGVuZ3RoO2k8YTtpKyspYz1zW2ldLHJbaV09bih0W2NdLGMsaSk7cmV0dXJuIGUocikmJihyLl9pc1ZMaXN0PSEwKSxyfWZ1bmN0aW9uIG9lKHQsZSxuLHIpe3ZhciBpPXRoaXMuJHNjb3BlZFNsb3RzW3RdO2lmKGkpcmV0dXJuIG49bnx8e30sciYmKG49eSh5KHt9LHIpLG4pKSxpKG4pfHxlO3ZhciBvPXRoaXMuJHNsb3RzW3RdO3JldHVybiBvfHxlfWZ1bmN0aW9uIGFlKHQpe3JldHVybiBLKHRoaXMuJG9wdGlvbnMsXCJmaWx0ZXJzXCIsdCwhMCl8fHdpfWZ1bmN0aW9uIHNlKHQsZSxuKXt2YXIgcj1PaS5rZXlDb2Rlc1tlXXx8bjtyZXR1cm4gQXJyYXkuaXNBcnJheShyKT8tMT09PXIuaW5kZXhPZih0KTpyIT09dH1mdW5jdGlvbiBjZSh0LGUsbixyLGkpe2lmKG4paWYobyhuKSl7QXJyYXkuaXNBcnJheShuKSYmKG49ZyhuKSk7dmFyIGE7Zm9yKHZhciBzIGluIG4pIWZ1bmN0aW9uKG8pe2lmKFwiY2xhc3NcIj09PW98fFwic3R5bGVcIj09PW98fGhpKG8pKWE9dDtlbHNle3ZhciBzPXQuYXR0cnMmJnQuYXR0cnMudHlwZTthPXJ8fE9pLm11c3RVc2VQcm9wKGUscyxvKT90LmRvbVByb3BzfHwodC5kb21Qcm9wcz17fSk6dC5hdHRyc3x8KHQuYXR0cnM9e30pfW8gaW4gYXx8KGFbb109bltvXSxpJiYoKHQub258fCh0Lm9uPXt9KSlbXCJ1cGRhdGU6XCIrb109ZnVuY3Rpb24odCl7bltvXT10fSkpfShzKX1lbHNlO3JldHVybiB0fWZ1bmN0aW9uIHVlKHQsZSl7dmFyIG49dGhpcy5fc3RhdGljVHJlZXNbdF07cmV0dXJuIG4mJiFlP0FycmF5LmlzQXJyYXkobik/UShuKTpZKG4pOihuPXRoaXMuX3N0YXRpY1RyZWVzW3RdPXRoaXMuJG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zW3RdLmNhbGwodGhpcy5fcmVuZGVyUHJveHkpLGZlKG4sXCJfX3N0YXRpY19fXCIrdCwhMSksbil9ZnVuY3Rpb24gbGUodCxlLG4pe3JldHVybiBmZSh0LFwiX19vbmNlX19cIitlKyhuP1wiX1wiK246XCJcIiksITApLHR9ZnVuY3Rpb24gZmUodCxlLG4pe2lmKEFycmF5LmlzQXJyYXkodCkpZm9yKHZhciByPTA7cjx0Lmxlbmd0aDtyKyspdFtyXSYmXCJzdHJpbmdcIiE9dHlwZW9mIHRbcl0mJnBlKHRbcl0sZStcIl9cIityLG4pO2Vsc2UgcGUodCxlLG4pfWZ1bmN0aW9uIHBlKHQsZSxuKXt0LmlzU3RhdGljPSEwLHQua2V5PWUsdC5pc09uY2U9bn1mdW5jdGlvbiBkZSh0LGUpe2lmKGUpaWYoYShlKSl7dmFyIG49dC5vbj10Lm9uP3koe30sdC5vbik6e307Zm9yKHZhciByIGluIGUpe3ZhciBpPW5bcl0sbz1lW3JdO25bcl09aT9bXS5jb25jYXQobyxpKTpvfX1lbHNlO3JldHVybiB0fWZ1bmN0aW9uIHZlKHQpe3QuX3Zub2RlPW51bGwsdC5fc3RhdGljVHJlZXM9bnVsbDt2YXIgZT10LiR2bm9kZT10LiRvcHRpb25zLl9wYXJlbnRWbm9kZSxuPWUmJmUuY29udGV4dDt0LiRzbG90cz1tdCh0LiRvcHRpb25zLl9yZW5kZXJDaGlsZHJlbixuKSx0LiRzY29wZWRTbG90cz1TaSx0Ll9jPWZ1bmN0aW9uKGUsbixyLGkpe3JldHVybiBlZSh0LGUsbixyLGksITEpfSx0LiRjcmVhdGVFbGVtZW50PWZ1bmN0aW9uKGUsbixyLGkpe3JldHVybiBlZSh0LGUsbixyLGksITApfTt2YXIgcj1lJiZlLmRhdGE7TCh0LFwiJGF0dHJzXCIsciYmci5hdHRycyxudWxsLCEwKSxMKHQsXCIkbGlzdGVuZXJzXCIsciYmci5vbixudWxsLCEwKX1mdW5jdGlvbiBoZSh0LGUpe3ZhciBuPXQuJG9wdGlvbnM9T2JqZWN0LmNyZWF0ZSh0LmNvbnN0cnVjdG9yLm9wdGlvbnMpO24ucGFyZW50PWUucGFyZW50LG4ucHJvcHNEYXRhPWUucHJvcHNEYXRhLG4uX3BhcmVudFZub2RlPWUuX3BhcmVudFZub2RlLG4uX3BhcmVudExpc3RlbmVycz1lLl9wYXJlbnRMaXN0ZW5lcnMsbi5fcmVuZGVyQ2hpbGRyZW49ZS5fcmVuZGVyQ2hpbGRyZW4sbi5fY29tcG9uZW50VGFnPWUuX2NvbXBvbmVudFRhZyxuLl9wYXJlbnRFbG09ZS5fcGFyZW50RWxtLG4uX3JlZkVsbT1lLl9yZWZFbG0sZS5yZW5kZXImJihuLnJlbmRlcj1lLnJlbmRlcixuLnN0YXRpY1JlbmRlckZucz1lLnN0YXRpY1JlbmRlckZucyl9ZnVuY3Rpb24gbWUodCl7dmFyIGU9dC5vcHRpb25zO2lmKHQuc3VwZXIpe3ZhciBuPW1lKHQuc3VwZXIpO2lmKG4hPT10LnN1cGVyT3B0aW9ucyl7dC5zdXBlck9wdGlvbnM9bjt2YXIgcj15ZSh0KTtyJiZ5KHQuZXh0ZW5kT3B0aW9ucyxyKSwoZT10Lm9wdGlvbnM9eihuLHQuZXh0ZW5kT3B0aW9ucykpLm5hbWUmJihlLmNvbXBvbmVudHNbZS5uYW1lXT10KX19cmV0dXJuIGV9ZnVuY3Rpb24geWUodCl7dmFyIGUsbj10Lm9wdGlvbnMscj10LmV4dGVuZE9wdGlvbnMsaT10LnNlYWxlZE9wdGlvbnM7Zm9yKHZhciBvIGluIG4pbltvXSE9PWlbb10mJihlfHwoZT17fSksZVtvXT1nZShuW29dLHJbb10saVtvXSkpO3JldHVybiBlfWZ1bmN0aW9uIGdlKHQsZSxuKXtpZihBcnJheS5pc0FycmF5KHQpKXt2YXIgcj1bXTtuPUFycmF5LmlzQXJyYXkobik/bjpbbl0sZT1BcnJheS5pc0FycmF5KGUpP2U6W2VdO2Zvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSsrKShlLmluZGV4T2YodFtpXSk+PTB8fG4uaW5kZXhPZih0W2ldKTwwKSYmci5wdXNoKHRbaV0pO3JldHVybiByfXJldHVybiB0fWZ1bmN0aW9uIF9lKHQpe3RoaXMuX2luaXQodCl9ZnVuY3Rpb24gYmUodCl7dC51c2U9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5faW5zdGFsbGVkUGx1Z2luc3x8KHRoaXMuX2luc3RhbGxlZFBsdWdpbnM9W10pO2lmKGUuaW5kZXhPZih0KT4tMSlyZXR1cm4gdGhpczt2YXIgbj1tKGFyZ3VtZW50cywxKTtyZXR1cm4gbi51bnNoaWZ0KHRoaXMpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHQuaW5zdGFsbD90Lmluc3RhbGwuYXBwbHkodCxuKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiB0JiZ0LmFwcGx5KG51bGwsbiksZS5wdXNoKHQpLHRoaXN9fWZ1bmN0aW9uICRlKHQpe3QubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMub3B0aW9ucz16KHRoaXMub3B0aW9ucyx0KSx0aGlzfX1mdW5jdGlvbiBDZSh0KXt0LmNpZD0wO3ZhciBlPTE7dC5leHRlbmQ9ZnVuY3Rpb24odCl7dD10fHx7fTt2YXIgbj10aGlzLHI9bi5jaWQsaT10Ll9DdG9yfHwodC5fQ3Rvcj17fSk7aWYoaVtyXSlyZXR1cm4gaVtyXTt2YXIgbz10Lm5hbWV8fG4ub3B0aW9ucy5uYW1lLGE9ZnVuY3Rpb24odCl7dGhpcy5faW5pdCh0KX07cmV0dXJuIGEucHJvdG90eXBlPU9iamVjdC5jcmVhdGUobi5wcm90b3R5cGUpLGEucHJvdG90eXBlLmNvbnN0cnVjdG9yPWEsYS5jaWQ9ZSsrLGEub3B0aW9ucz16KG4ub3B0aW9ucyx0KSxhLnN1cGVyPW4sYS5vcHRpb25zLnByb3BzJiZ3ZShhKSxhLm9wdGlvbnMuY29tcHV0ZWQmJnhlKGEpLGEuZXh0ZW5kPW4uZXh0ZW5kLGEubWl4aW49bi5taXhpbixhLnVzZT1uLnVzZSxBaS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2FbdF09blt0XX0pLG8mJihhLm9wdGlvbnMuY29tcG9uZW50c1tvXT1hKSxhLnN1cGVyT3B0aW9ucz1uLm9wdGlvbnMsYS5leHRlbmRPcHRpb25zPXQsYS5zZWFsZWRPcHRpb25zPXkoe30sYS5vcHRpb25zKSxpW3JdPWEsYX19ZnVuY3Rpb24gd2UodCl7dmFyIGU9dC5vcHRpb25zLnByb3BzO2Zvcih2YXIgbiBpbiBlKUl0KHQucHJvdG90eXBlLFwiX3Byb3BzXCIsbil9ZnVuY3Rpb24geGUodCl7dmFyIGU9dC5vcHRpb25zLmNvbXB1dGVkO2Zvcih2YXIgbiBpbiBlKUh0KHQucHJvdG90eXBlLG4sZVtuXSl9ZnVuY3Rpb24gQWUodCl7QWkuZm9yRWFjaChmdW5jdGlvbihlKXt0W2VdPWZ1bmN0aW9uKHQsbil7cmV0dXJuIG4/KFwiY29tcG9uZW50XCI9PT1lJiZhKG4pJiYobi5uYW1lPW4ubmFtZXx8dCxuPXRoaXMub3B0aW9ucy5fYmFzZS5leHRlbmQobikpLFwiZGlyZWN0aXZlXCI9PT1lJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiYobj17YmluZDpuLHVwZGF0ZTpufSksdGhpcy5vcHRpb25zW2UrXCJzXCJdW3RdPW4sbik6dGhpcy5vcHRpb25zW2UrXCJzXCJdW3RdfX0pfWZ1bmN0aW9uIGtlKHQpe3JldHVybiB0JiYodC5DdG9yLm9wdGlvbnMubmFtZXx8dC50YWcpfWZ1bmN0aW9uIE9lKHQsZSl7cmV0dXJuIEFycmF5LmlzQXJyYXkodCk/dC5pbmRleE9mKGUpPi0xOlwic3RyaW5nXCI9PXR5cGVvZiB0P3Quc3BsaXQoXCIsXCIpLmluZGV4T2YoZSk+LTE6ISFzKHQpJiZ0LnRlc3QoZSl9ZnVuY3Rpb24gU2UodCxlLG4pe2Zvcih2YXIgciBpbiB0KXt2YXIgaT10W3JdO2lmKGkpe3ZhciBvPWtlKGkuY29tcG9uZW50T3B0aW9ucyk7byYmIW4obykmJihpIT09ZSYmVGUoaSksdFtyXT1udWxsKX19fWZ1bmN0aW9uIFRlKHQpe3QmJnQuY29tcG9uZW50SW5zdGFuY2UuJGRlc3Ryb3koKX1mdW5jdGlvbiBFZSh0KXtmb3IodmFyIG49dC5kYXRhLHI9dCxpPXQ7ZShpLmNvbXBvbmVudEluc3RhbmNlKTspKGk9aS5jb21wb25lbnRJbnN0YW5jZS5fdm5vZGUpLmRhdGEmJihuPWplKGkuZGF0YSxuKSk7Zm9yKDtlKHI9ci5wYXJlbnQpOylyLmRhdGEmJihuPWplKG4sci5kYXRhKSk7cmV0dXJuIE5lKG4uc3RhdGljQ2xhc3Msbi5jbGFzcyl9ZnVuY3Rpb24gamUodCxuKXtyZXR1cm57c3RhdGljQ2xhc3M6TGUodC5zdGF0aWNDbGFzcyxuLnN0YXRpY0NsYXNzKSxjbGFzczplKHQuY2xhc3MpP1t0LmNsYXNzLG4uY2xhc3NdOm4uY2xhc3N9fWZ1bmN0aW9uIE5lKHQsbil7cmV0dXJuIGUodCl8fGUobik/TGUodCxJZShuKSk6XCJcIn1mdW5jdGlvbiBMZSh0LGUpe3JldHVybiB0P2U/dCtcIiBcIitlOnQ6ZXx8XCJcIn1mdW5jdGlvbiBJZSh0KXtyZXR1cm4gQXJyYXkuaXNBcnJheSh0KT9NZSh0KTpvKHQpP0RlKHQpOlwic3RyaW5nXCI9PXR5cGVvZiB0P3Q6XCJcIn1mdW5jdGlvbiBNZSh0KXtmb3IodmFyIG4scj1cIlwiLGk9MCxvPXQubGVuZ3RoO2k8bztpKyspZShuPUllKHRbaV0pKSYmXCJcIiE9PW4mJihyJiYocis9XCIgXCIpLHIrPW4pO3JldHVybiByfWZ1bmN0aW9uIERlKHQpe3ZhciBlPVwiXCI7Zm9yKHZhciBuIGluIHQpdFtuXSYmKGUmJihlKz1cIiBcIiksZSs9bik7cmV0dXJuIGV9ZnVuY3Rpb24gUGUodCl7cmV0dXJuIFpvKHQpP1wic3ZnXCI6XCJtYXRoXCI9PT10P1wibWF0aFwiOnZvaWQgMH1mdW5jdGlvbiBGZSh0KXtpZihcInN0cmluZ1wiPT10eXBlb2YgdCl7dmFyIGU9ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0KTtyZXR1cm4gZXx8ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKX1yZXR1cm4gdH1mdW5jdGlvbiBSZSh0LGUpe3ZhciBuPXQuZGF0YS5yZWY7aWYobil7dmFyIHI9dC5jb250ZXh0LGk9dC5jb21wb25lbnRJbnN0YW5jZXx8dC5lbG0sbz1yLiRyZWZzO2U/QXJyYXkuaXNBcnJheShvW25dKT9wKG9bbl0saSk6b1tuXT09PWkmJihvW25dPXZvaWQgMCk6dC5kYXRhLnJlZkluRm9yP0FycmF5LmlzQXJyYXkob1tuXSk/b1tuXS5pbmRleE9mKGkpPDAmJm9bbl0ucHVzaChpKTpvW25dPVtpXTpvW25dPWl9fWZ1bmN0aW9uIEhlKHIsaSl7cmV0dXJuIHIua2V5PT09aS5rZXkmJihyLnRhZz09PWkudGFnJiZyLmlzQ29tbWVudD09PWkuaXNDb21tZW50JiZlKHIuZGF0YSk9PT1lKGkuZGF0YSkmJkJlKHIsaSl8fG4oci5pc0FzeW5jUGxhY2Vob2xkZXIpJiZyLmFzeW5jRmFjdG9yeT09PWkuYXN5bmNGYWN0b3J5JiZ0KGkuYXN5bmNGYWN0b3J5LmVycm9yKSl9ZnVuY3Rpb24gQmUodCxuKXtpZihcImlucHV0XCIhPT10LnRhZylyZXR1cm4hMDt2YXIgcjtyZXR1cm4oZShyPXQuZGF0YSkmJmUocj1yLmF0dHJzKSYmci50eXBlKT09PShlKHI9bi5kYXRhKSYmZShyPXIuYXR0cnMpJiZyLnR5cGUpfWZ1bmN0aW9uIFVlKHQsbixyKXt2YXIgaSxvLGE9e307Zm9yKGk9bjtpPD1yOysraSllKG89dFtpXS5rZXkpJiYoYVtvXT1pKTtyZXR1cm4gYX1mdW5jdGlvbiBWZSh0LGUpeyh0LmRhdGEuZGlyZWN0aXZlc3x8ZS5kYXRhLmRpcmVjdGl2ZXMpJiZ6ZSh0LGUpfWZ1bmN0aW9uIHplKHQsZSl7dmFyIG4scixpLG89dD09PWVhLGE9ZT09PWVhLHM9S2UodC5kYXRhLmRpcmVjdGl2ZXMsdC5jb250ZXh0KSxjPUtlKGUuZGF0YS5kaXJlY3RpdmVzLGUuY29udGV4dCksdT1bXSxsPVtdO2ZvcihuIGluIGMpcj1zW25dLGk9Y1tuXSxyPyhpLm9sZFZhbHVlPXIudmFsdWUscWUoaSxcInVwZGF0ZVwiLGUsdCksaS5kZWYmJmkuZGVmLmNvbXBvbmVudFVwZGF0ZWQmJmwucHVzaChpKSk6KHFlKGksXCJiaW5kXCIsZSx0KSxpLmRlZiYmaS5kZWYuaW5zZXJ0ZWQmJnUucHVzaChpKSk7aWYodS5sZW5ndGgpe3ZhciBmPWZ1bmN0aW9uKCl7Zm9yKHZhciBuPTA7bjx1Lmxlbmd0aDtuKyspcWUodVtuXSxcImluc2VydGVkXCIsZSx0KX07bz9ldChlLmRhdGEuaG9va3x8KGUuZGF0YS5ob29rPXt9KSxcImluc2VydFwiLGYpOmYoKX1pZihsLmxlbmd0aCYmZXQoZS5kYXRhLmhvb2t8fChlLmRhdGEuaG9vaz17fSksXCJwb3N0cGF0Y2hcIixmdW5jdGlvbigpe2Zvcih2YXIgbj0wO248bC5sZW5ndGg7bisrKXFlKGxbbl0sXCJjb21wb25lbnRVcGRhdGVkXCIsZSx0KX0pLCFvKWZvcihuIGluIHMpY1tuXXx8cWUoc1tuXSxcInVuYmluZFwiLHQsdCxhKX1mdW5jdGlvbiBLZSh0LGUpe3ZhciBuPU9iamVjdC5jcmVhdGUobnVsbCk7aWYoIXQpcmV0dXJuIG47dmFyIHIsaTtmb3Iocj0wO3I8dC5sZW5ndGg7cisrKShpPXRbcl0pLm1vZGlmaWVyc3x8KGkubW9kaWZpZXJzPWlhKSxuW0plKGkpXT1pLGkuZGVmPUsoZS4kb3B0aW9ucyxcImRpcmVjdGl2ZXNcIixpLm5hbWUsITApO3JldHVybiBufWZ1bmN0aW9uIEplKHQpe3JldHVybiB0LnJhd05hbWV8fHQubmFtZStcIi5cIitPYmplY3Qua2V5cyh0Lm1vZGlmaWVyc3x8e30pLmpvaW4oXCIuXCIpfWZ1bmN0aW9uIHFlKHQsZSxuLHIsaSl7dmFyIG89dC5kZWYmJnQuZGVmW2VdO2lmKG8pdHJ5e28obi5lbG0sdCxuLHIsaSl9Y2F0Y2gocil7ayhyLG4uY29udGV4dCxcImRpcmVjdGl2ZSBcIit0Lm5hbWUrXCIgXCIrZStcIiBob29rXCIpfX1mdW5jdGlvbiBXZShuLHIpe3ZhciBpPXIuY29tcG9uZW50T3B0aW9ucztpZighKGUoaSkmJiExPT09aS5DdG9yLm9wdGlvbnMuaW5oZXJpdEF0dHJzfHx0KG4uZGF0YS5hdHRycykmJnQoci5kYXRhLmF0dHJzKSkpe3ZhciBvLGEscz1yLmVsbSxjPW4uZGF0YS5hdHRyc3x8e30sdT1yLmRhdGEuYXR0cnN8fHt9O2UodS5fX29iX18pJiYodT1yLmRhdGEuYXR0cnM9eSh7fSx1KSk7Zm9yKG8gaW4gdSlhPXVbb10sY1tvXSE9PWEmJkdlKHMsbyxhKTtNaSYmdS52YWx1ZSE9PWMudmFsdWUmJkdlKHMsXCJ2YWx1ZVwiLHUudmFsdWUpO2ZvcihvIGluIGMpdCh1W29dKSYmKEtvKG8pP3MucmVtb3ZlQXR0cmlidXRlTlMoem8sSm8obykpOlVvKG8pfHxzLnJlbW92ZUF0dHJpYnV0ZShvKSl9fWZ1bmN0aW9uIEdlKHQsZSxuKXtWbyhlKT9xbyhuKT90LnJlbW92ZUF0dHJpYnV0ZShlKTp0LnNldEF0dHJpYnV0ZShlLGUpOlVvKGUpP3Quc2V0QXR0cmlidXRlKGUscW8obil8fFwiZmFsc2VcIj09PW4/XCJmYWxzZVwiOlwidHJ1ZVwiKTpLbyhlKT9xbyhuKT90LnJlbW92ZUF0dHJpYnV0ZU5TKHpvLEpvKGUpKTp0LnNldEF0dHJpYnV0ZU5TKHpvLGUsbik6cW8obik/dC5yZW1vdmVBdHRyaWJ1dGUoZSk6dC5zZXRBdHRyaWJ1dGUoZSxuKX1mdW5jdGlvbiBaZShuLHIpe3ZhciBpPXIuZWxtLG89ci5kYXRhLGE9bi5kYXRhO2lmKCEodChvLnN0YXRpY0NsYXNzKSYmdChvLmNsYXNzKSYmKHQoYSl8fHQoYS5zdGF0aWNDbGFzcykmJnQoYS5jbGFzcykpKSl7dmFyIHM9RWUociksYz1pLl90cmFuc2l0aW9uQ2xhc3NlcztlKGMpJiYocz1MZShzLEllKGMpKSkscyE9PWkuX3ByZXZDbGFzcyYmKGkuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixzKSxpLl9wcmV2Q2xhc3M9cyl9fWZ1bmN0aW9uIFllKHQpe2Z1bmN0aW9uIGUoKXsoYXx8KGE9W10pKS5wdXNoKHQuc2xpY2UodixpKS50cmltKCkpLHY9aSsxfXZhciBuLHIsaSxvLGEscz0hMSxjPSExLHU9ITEsbD0hMSxmPTAscD0wLGQ9MCx2PTA7Zm9yKGk9MDtpPHQubGVuZ3RoO2krKylpZihyPW4sbj10LmNoYXJDb2RlQXQoaSkscykzOT09PW4mJjkyIT09ciYmKHM9ITEpO2Vsc2UgaWYoYykzND09PW4mJjkyIT09ciYmKGM9ITEpO2Vsc2UgaWYodSk5Nj09PW4mJjkyIT09ciYmKHU9ITEpO2Vsc2UgaWYobCk0Nz09PW4mJjkyIT09ciYmKGw9ITEpO2Vsc2UgaWYoMTI0IT09bnx8MTI0PT09dC5jaGFyQ29kZUF0KGkrMSl8fDEyND09PXQuY2hhckNvZGVBdChpLTEpfHxmfHxwfHxkKXtzd2l0Y2gobil7Y2FzZSAzNDpjPSEwO2JyZWFrO2Nhc2UgMzk6cz0hMDticmVhaztjYXNlIDk2OnU9ITA7YnJlYWs7Y2FzZSA0MDpkKys7YnJlYWs7Y2FzZSA0MTpkLS07YnJlYWs7Y2FzZSA5MTpwKys7YnJlYWs7Y2FzZSA5MzpwLS07YnJlYWs7Y2FzZSAxMjM6ZisrO2JyZWFrO2Nhc2UgMTI1OmYtLX1pZig0Nz09PW4pe2Zvcih2YXIgaD1pLTEsbT12b2lkIDA7aD49MCYmXCIgXCI9PT0obT10LmNoYXJBdChoKSk7aC0tKTttJiZjYS50ZXN0KG0pfHwobD0hMCl9fWVsc2Ugdm9pZCAwPT09bz8odj1pKzEsbz10LnNsaWNlKDAsaSkudHJpbSgpKTplKCk7aWYodm9pZCAwPT09bz9vPXQuc2xpY2UoMCxpKS50cmltKCk6MCE9PXYmJmUoKSxhKWZvcihpPTA7aTxhLmxlbmd0aDtpKyspbz1RZShvLGFbaV0pO3JldHVybiBvfWZ1bmN0aW9uIFFlKHQsZSl7dmFyIG49ZS5pbmRleE9mKFwiKFwiKTtyZXR1cm4gbjwwPydfZihcIicrZSsnXCIpKCcrdCtcIilcIjonX2YoXCInK2Uuc2xpY2UoMCxuKSsnXCIpKCcrdCtcIixcIitlLnNsaWNlKG4rMSl9ZnVuY3Rpb24gWGUodCl7Y29uc29sZS5lcnJvcihcIltWdWUgY29tcGlsZXJdOiBcIit0KX1mdW5jdGlvbiB0bih0LGUpe3JldHVybiB0P3QubWFwKGZ1bmN0aW9uKHQpe3JldHVybiB0W2VdfSkuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiB0fSk6W119ZnVuY3Rpb24gZW4odCxlLG4peyh0LnByb3BzfHwodC5wcm9wcz1bXSkpLnB1c2goe25hbWU6ZSx2YWx1ZTpufSl9ZnVuY3Rpb24gbm4odCxlLG4peyh0LmF0dHJzfHwodC5hdHRycz1bXSkpLnB1c2goe25hbWU6ZSx2YWx1ZTpufSl9ZnVuY3Rpb24gcm4odCxlLG4scixpLG8peyh0LmRpcmVjdGl2ZXN8fCh0LmRpcmVjdGl2ZXM9W10pKS5wdXNoKHtuYW1lOmUscmF3TmFtZTpuLHZhbHVlOnIsYXJnOmksbW9kaWZpZXJzOm99KX1mdW5jdGlvbiBvbih0LGUsbixyLGksbyl7ciYmci5jYXB0dXJlJiYoZGVsZXRlIHIuY2FwdHVyZSxlPVwiIVwiK2UpLHImJnIub25jZSYmKGRlbGV0ZSByLm9uY2UsZT1cIn5cIitlKSxyJiZyLnBhc3NpdmUmJihkZWxldGUgci5wYXNzaXZlLGU9XCImXCIrZSk7dmFyIGE7ciYmci5uYXRpdmU/KGRlbGV0ZSByLm5hdGl2ZSxhPXQubmF0aXZlRXZlbnRzfHwodC5uYXRpdmVFdmVudHM9e30pKTphPXQuZXZlbnRzfHwodC5ldmVudHM9e30pO3ZhciBzPXt2YWx1ZTpuLG1vZGlmaWVyczpyfSxjPWFbZV07QXJyYXkuaXNBcnJheShjKT9pP2MudW5zaGlmdChzKTpjLnB1c2gocyk6YVtlXT1jP2k/W3MsY106W2Msc106c31mdW5jdGlvbiBhbih0LGUsbil7dmFyIHI9c24odCxcIjpcIitlKXx8c24odCxcInYtYmluZDpcIitlKTtpZihudWxsIT1yKXJldHVybiBZZShyKTtpZighMSE9PW4pe3ZhciBpPXNuKHQsZSk7aWYobnVsbCE9aSlyZXR1cm4gSlNPTi5zdHJpbmdpZnkoaSl9fWZ1bmN0aW9uIHNuKHQsZSl7dmFyIG47aWYobnVsbCE9KG49dC5hdHRyc01hcFtlXSkpZm9yKHZhciByPXQuYXR0cnNMaXN0LGk9MCxvPXIubGVuZ3RoO2k8bztpKyspaWYocltpXS5uYW1lPT09ZSl7ci5zcGxpY2UoaSwxKTticmVha31yZXR1cm4gbn1mdW5jdGlvbiBjbih0LGUsbil7dmFyIHI9bnx8e30saT1yLm51bWJlcixvPVwiJCR2XCI7ci50cmltJiYobz1cIih0eXBlb2YgJCR2ID09PSAnc3RyaW5nJz8gJCR2LnRyaW0oKTogJCR2KVwiKSxpJiYobz1cIl9uKFwiK28rXCIpXCIpO3ZhciBhPXVuKGUsbyk7dC5tb2RlbD17dmFsdWU6XCIoXCIrZStcIilcIixleHByZXNzaW9uOidcIicrZSsnXCInLGNhbGxiYWNrOlwiZnVuY3Rpb24gKCQkdikge1wiK2ErXCJ9XCJ9fWZ1bmN0aW9uIHVuKHQsZSl7dmFyIG49bG4odCk7cmV0dXJuIG51bGw9PT1uLmlkeD90K1wiPVwiK2U6XCIkc2V0KFwiK24uZXhwK1wiLCBcIituLmlkeCtcIiwgXCIrZStcIilcIn1mdW5jdGlvbiBsbih0KXtpZihqbz10LEVvPWpvLmxlbmd0aCxMbz1Jbz1Nbz0wLHQuaW5kZXhPZihcIltcIik8MHx8dC5sYXN0SW5kZXhPZihcIl1cIik8RW8tMSlyZXR1cm57ZXhwOnQsaWR4Om51bGx9O2Zvcig7IXBuKCk7KWRuKE5vPWZuKCkpP2huKE5vKTo5MT09PU5vJiZ2bihObyk7cmV0dXJue2V4cDp0LnN1YnN0cmluZygwLElvKSxpZHg6dC5zdWJzdHJpbmcoSW8rMSxNbyl9fWZ1bmN0aW9uIGZuKCl7cmV0dXJuIGpvLmNoYXJDb2RlQXQoKytMbyl9ZnVuY3Rpb24gcG4oKXtyZXR1cm4gTG8+PUVvfWZ1bmN0aW9uIGRuKHQpe3JldHVybiAzND09PXR8fDM5PT09dH1mdW5jdGlvbiB2bih0KXt2YXIgZT0xO2ZvcihJbz1MbzshcG4oKTspaWYodD1mbigpLGRuKHQpKWhuKHQpO2Vsc2UgaWYoOTE9PT10JiZlKyssOTM9PT10JiZlLS0sMD09PWUpe01vPUxvO2JyZWFrfX1mdW5jdGlvbiBobih0KXtmb3IodmFyIGU9dDshcG4oKSYmKHQ9Zm4oKSkhPT1lOyk7fWZ1bmN0aW9uIG1uKHQsZSxuKXt2YXIgcj1uJiZuLm51bWJlcixpPWFuKHQsXCJ2YWx1ZVwiKXx8XCJudWxsXCIsbz1hbih0LFwidHJ1ZS12YWx1ZVwiKXx8XCJ0cnVlXCIsYT1hbih0LFwiZmFsc2UtdmFsdWVcIil8fFwiZmFsc2VcIjtlbih0LFwiY2hlY2tlZFwiLFwiQXJyYXkuaXNBcnJheShcIitlK1wiKT9faShcIitlK1wiLFwiK2krXCIpPi0xXCIrKFwidHJ1ZVwiPT09bz9cIjooXCIrZStcIilcIjpcIjpfcShcIitlK1wiLFwiK28rXCIpXCIpKSxvbih0LGxhLFwidmFyICQkYT1cIitlK1wiLCQkZWw9JGV2ZW50LnRhcmdldCwkJGM9JCRlbC5jaGVja2VkPyhcIitvK1wiKTooXCIrYStcIik7aWYoQXJyYXkuaXNBcnJheSgkJGEpKXt2YXIgJCR2PVwiKyhyP1wiX24oXCIraStcIilcIjppKStcIiwkJGk9X2koJCRhLCQkdik7aWYoJCRjKXskJGk8MCYmKFwiK2UrXCI9JCRhLmNvbmNhdCgkJHYpKX1lbHNleyQkaT4tMSYmKFwiK2UrXCI9JCRhLnNsaWNlKDAsJCRpKS5jb25jYXQoJCRhLnNsaWNlKCQkaSsxKSkpfX1lbHNle1wiK3VuKGUsXCIkJGNcIikrXCJ9XCIsbnVsbCwhMCl9ZnVuY3Rpb24geW4odCxlLG4pe3ZhciByPW4mJm4ubnVtYmVyLGk9YW4odCxcInZhbHVlXCIpfHxcIm51bGxcIjtlbih0LFwiY2hlY2tlZFwiLFwiX3EoXCIrZStcIixcIisoaT1yP1wiX24oXCIraStcIilcIjppKStcIilcIiksb24odCxsYSx1bihlLGkpLG51bGwsITApfWZ1bmN0aW9uIGduKHQsZSxuKXt2YXIgcj1cInZhciAkJHNlbGVjdGVkVmFsID0gXCIrKCdBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoJGV2ZW50LnRhcmdldC5vcHRpb25zLGZ1bmN0aW9uKG8pe3JldHVybiBvLnNlbGVjdGVkfSkubWFwKGZ1bmN0aW9uKG8pe3ZhciB2YWwgPSBcIl92YWx1ZVwiIGluIG8gPyBvLl92YWx1ZSA6IG8udmFsdWU7cmV0dXJuICcrKG4mJm4ubnVtYmVyP1wiX24odmFsKVwiOlwidmFsXCIpK1wifSlcIikrXCI7XCI7b24odCxcImNoYW5nZVwiLHI9citcIiBcIit1bihlLFwiJGV2ZW50LnRhcmdldC5tdWx0aXBsZSA/ICQkc2VsZWN0ZWRWYWwgOiAkJHNlbGVjdGVkVmFsWzBdXCIpLG51bGwsITApfWZ1bmN0aW9uIF9uKHQsZSxuKXt2YXIgcj10LmF0dHJzTWFwLnR5cGUsaT1ufHx7fSxvPWkubGF6eSxhPWkubnVtYmVyLHM9aS50cmltLGM9IW8mJlwicmFuZ2VcIiE9PXIsdT1vP1wiY2hhbmdlXCI6XCJyYW5nZVwiPT09cj91YTpcImlucHV0XCIsbD1cIiRldmVudC50YXJnZXQudmFsdWVcIjtzJiYobD1cIiRldmVudC50YXJnZXQudmFsdWUudHJpbSgpXCIpLGEmJihsPVwiX24oXCIrbCtcIilcIik7dmFyIGY9dW4oZSxsKTtjJiYoZj1cImlmKCRldmVudC50YXJnZXQuY29tcG9zaW5nKXJldHVybjtcIitmKSxlbih0LFwidmFsdWVcIixcIihcIitlK1wiKVwiKSxvbih0LHUsZixudWxsLCEwKSwoc3x8YSkmJm9uKHQsXCJibHVyXCIsXCIkZm9yY2VVcGRhdGUoKVwiKX1mdW5jdGlvbiBibih0KXt2YXIgbjtlKHRbdWFdKSYmKHRbbj1JaT9cImNoYW5nZVwiOlwiaW5wdXRcIl09W10uY29uY2F0KHRbdWFdLHRbbl18fFtdKSxkZWxldGUgdFt1YV0pLGUodFtsYV0pJiYodFtuPVJpP1wiY2xpY2tcIjpcImNoYW5nZVwiXT1bXS5jb25jYXQodFtsYV0sdFtuXXx8W10pLGRlbGV0ZSB0W2xhXSl9ZnVuY3Rpb24gJG4odCxlLG4scixpKXtpZihuKXt2YXIgbz1lLGE9UG87ZT1mdW5jdGlvbihuKXtudWxsIT09KDE9PT1hcmd1bWVudHMubGVuZ3RoP28obik6by5hcHBseShudWxsLGFyZ3VtZW50cykpJiZDbih0LGUscixhKX19UG8uYWRkRXZlbnRMaXN0ZW5lcih0LGUsQmk/e2NhcHR1cmU6cixwYXNzaXZlOml9OnIpfWZ1bmN0aW9uIENuKHQsZSxuLHIpeyhyfHxQbykucmVtb3ZlRXZlbnRMaXN0ZW5lcih0LGUsbil9ZnVuY3Rpb24gd24obixyKXt2YXIgaT1lKHIuY29tcG9uZW50T3B0aW9ucyksbz1pP24uZGF0YS5uYXRpdmVPbjpuLmRhdGEub24sYT1pP3IuZGF0YS5uYXRpdmVPbjpyLmRhdGEub247dChvKSYmdChhKXx8KGE9YXx8e30sbz1vfHx7fSxQbz1yLmVsbSxibihhKSx0dChhLG8sJG4sQ24sci5jb250ZXh0KSl9ZnVuY3Rpb24geG4obixyKXtpZighdChuLmRhdGEuZG9tUHJvcHMpfHwhdChyLmRhdGEuZG9tUHJvcHMpKXt2YXIgaSxvLGE9ci5lbG0scz1uLmRhdGEuZG9tUHJvcHN8fHt9LGM9ci5kYXRhLmRvbVByb3BzfHx7fTtlKGMuX19vYl9fKSYmKGM9ci5kYXRhLmRvbVByb3BzPXkoe30sYykpO2ZvcihpIGluIHMpdChjW2ldKSYmKGFbaV09XCJcIik7Zm9yKGkgaW4gYylpZihvPWNbaV0sXCJ0ZXh0Q29udGVudFwiIT09aSYmXCJpbm5lckhUTUxcIiE9PWl8fChyLmNoaWxkcmVuJiYoci5jaGlsZHJlbi5sZW5ndGg9MCksbyE9PXNbaV0pKWlmKFwidmFsdWVcIj09PWkpe2EuX3ZhbHVlPW87dmFyIHU9dChvKT9cIlwiOlN0cmluZyhvKTtBbihhLHIsdSkmJihhLnZhbHVlPXUpfWVsc2UgYVtpXT1vfX1mdW5jdGlvbiBBbih0LGUsbil7cmV0dXJuIXQuY29tcG9zaW5nJiYoXCJvcHRpb25cIj09PWUudGFnfHxrbih0LG4pfHxPbih0LG4pKX1mdW5jdGlvbiBrbih0LGUpe3JldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50IT09dCYmdC52YWx1ZSE9PWV9ZnVuY3Rpb24gT24odCxuKXt2YXIgcj10LnZhbHVlLGk9dC5fdk1vZGlmaWVycztyZXR1cm4gZShpKSYmaS5udW1iZXI/bChyKSE9PWwobik6ZShpKSYmaS50cmltP3IudHJpbSgpIT09bi50cmltKCk6ciE9PW59ZnVuY3Rpb24gU24odCl7dmFyIGU9VG4odC5zdHlsZSk7cmV0dXJuIHQuc3RhdGljU3R5bGU/eSh0LnN0YXRpY1N0eWxlLGUpOmV9ZnVuY3Rpb24gVG4odCl7cmV0dXJuIEFycmF5LmlzQXJyYXkodCk/Zyh0KTpcInN0cmluZ1wiPT10eXBlb2YgdD9kYSh0KTp0fWZ1bmN0aW9uIEVuKHQsZSl7dmFyIG4scj17fTtpZihlKWZvcih2YXIgaT10O2kuY29tcG9uZW50SW5zdGFuY2U7KShpPWkuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlKS5kYXRhJiYobj1TbihpLmRhdGEpKSYmeShyLG4pOyhuPVNuKHQuZGF0YSkpJiZ5KHIsbik7Zm9yKHZhciBvPXQ7bz1vLnBhcmVudDspby5kYXRhJiYobj1TbihvLmRhdGEpKSYmeShyLG4pO3JldHVybiByfWZ1bmN0aW9uIGpuKG4scil7dmFyIGk9ci5kYXRhLG89bi5kYXRhO2lmKCEodChpLnN0YXRpY1N0eWxlKSYmdChpLnN0eWxlKSYmdChvLnN0YXRpY1N0eWxlKSYmdChvLnN0eWxlKSkpe3ZhciBhLHMsYz1yLmVsbSx1PW8uc3RhdGljU3R5bGUsbD1vLm5vcm1hbGl6ZWRTdHlsZXx8by5zdHlsZXx8e30sZj11fHxsLHA9VG4oci5kYXRhLnN0eWxlKXx8e307ci5kYXRhLm5vcm1hbGl6ZWRTdHlsZT1lKHAuX19vYl9fKT95KHt9LHApOnA7dmFyIGQ9RW4ociwhMCk7Zm9yKHMgaW4gZil0KGRbc10pJiZtYShjLHMsXCJcIik7Zm9yKHMgaW4gZCkoYT1kW3NdKSE9PWZbc10mJm1hKGMscyxudWxsPT1hP1wiXCI6YSl9fWZ1bmN0aW9uIE5uKHQsZSl7aWYoZSYmKGU9ZS50cmltKCkpKWlmKHQuY2xhc3NMaXN0KWUuaW5kZXhPZihcIiBcIik+LTE/ZS5zcGxpdCgvXFxzKy8pLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIHQuY2xhc3NMaXN0LmFkZChlKX0pOnQuY2xhc3NMaXN0LmFkZChlKTtlbHNle3ZhciBuPVwiIFwiKyh0LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfHxcIlwiKStcIiBcIjtuLmluZGV4T2YoXCIgXCIrZStcIiBcIik8MCYmdC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLChuK2UpLnRyaW0oKSl9fWZ1bmN0aW9uIExuKHQsZSl7aWYoZSYmKGU9ZS50cmltKCkpKWlmKHQuY2xhc3NMaXN0KWUuaW5kZXhPZihcIiBcIik+LTE/ZS5zcGxpdCgvXFxzKy8pLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIHQuY2xhc3NMaXN0LnJlbW92ZShlKX0pOnQuY2xhc3NMaXN0LnJlbW92ZShlKSx0LmNsYXNzTGlzdC5sZW5ndGh8fHQucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7ZWxzZXtmb3IodmFyIG49XCIgXCIrKHQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIil8fFwiXCIpK1wiIFwiLHI9XCIgXCIrZStcIiBcIjtuLmluZGV4T2Yocik+PTA7KW49bi5yZXBsYWNlKHIsXCIgXCIpOyhuPW4udHJpbSgpKT90LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsbik6dC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKX19ZnVuY3Rpb24gSW4odCl7aWYodCl7aWYoXCJvYmplY3RcIj09dHlwZW9mIHQpe3ZhciBlPXt9O3JldHVybiExIT09dC5jc3MmJnkoZSxiYSh0Lm5hbWV8fFwidlwiKSkseShlLHQpLGV9cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHQ/YmEodCk6dm9pZCAwfX1mdW5jdGlvbiBNbih0KXtTYShmdW5jdGlvbigpe1NhKHQpfSl9ZnVuY3Rpb24gRG4odCxlKXt2YXIgbj10Ll90cmFuc2l0aW9uQ2xhc3Nlc3x8KHQuX3RyYW5zaXRpb25DbGFzc2VzPVtdKTtuLmluZGV4T2YoZSk8MCYmKG4ucHVzaChlKSxObih0LGUpKX1mdW5jdGlvbiBQbih0LGUpe3QuX3RyYW5zaXRpb25DbGFzc2VzJiZwKHQuX3RyYW5zaXRpb25DbGFzc2VzLGUpLExuKHQsZSl9ZnVuY3Rpb24gRm4odCxlLG4pe3ZhciByPVJuKHQsZSksaT1yLnR5cGUsbz1yLnRpbWVvdXQsYT1yLnByb3BDb3VudDtpZighaSlyZXR1cm4gbigpO3ZhciBzPWk9PT1DYT9BYTpPYSxjPTAsdT1mdW5jdGlvbigpe3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihzLGwpLG4oKX0sbD1mdW5jdGlvbihlKXtlLnRhcmdldD09PXQmJisrYz49YSYmdSgpfTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YzxhJiZ1KCl9LG8rMSksdC5hZGRFdmVudExpc3RlbmVyKHMsbCl9ZnVuY3Rpb24gUm4odCxlKXt2YXIgbixyPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHQpLGk9clt4YStcIkRlbGF5XCJdLnNwbGl0KFwiLCBcIiksbz1yW3hhK1wiRHVyYXRpb25cIl0uc3BsaXQoXCIsIFwiKSxhPUhuKGksbykscz1yW2thK1wiRGVsYXlcIl0uc3BsaXQoXCIsIFwiKSxjPXJba2ErXCJEdXJhdGlvblwiXS5zcGxpdChcIiwgXCIpLHU9SG4ocyxjKSxsPTAsZj0wO3JldHVybiBlPT09Q2E/YT4wJiYobj1DYSxsPWEsZj1vLmxlbmd0aCk6ZT09PXdhP3U+MCYmKG49d2EsbD11LGY9Yy5sZW5ndGgpOmY9KG49KGw9TWF0aC5tYXgoYSx1KSk+MD9hPnU/Q2E6d2E6bnVsbCk/bj09PUNhP28ubGVuZ3RoOmMubGVuZ3RoOjAse3R5cGU6bix0aW1lb3V0OmwscHJvcENvdW50OmYsaGFzVHJhbnNmb3JtOm49PT1DYSYmVGEudGVzdChyW3hhK1wiUHJvcGVydHlcIl0pfX1mdW5jdGlvbiBIbih0LGUpe2Zvcig7dC5sZW5ndGg8ZS5sZW5ndGg7KXQ9dC5jb25jYXQodCk7cmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsZS5tYXAoZnVuY3Rpb24oZSxuKXtyZXR1cm4gQm4oZSkrQm4odFtuXSl9KSl9ZnVuY3Rpb24gQm4odCl7cmV0dXJuIDFlMypOdW1iZXIodC5zbGljZSgwLC0xKSl9ZnVuY3Rpb24gVW4obixyKXt2YXIgaT1uLmVsbTtlKGkuX2xlYXZlQ2IpJiYoaS5fbGVhdmVDYi5jYW5jZWxsZWQ9ITAsaS5fbGVhdmVDYigpKTt2YXIgYT1JbihuLmRhdGEudHJhbnNpdGlvbik7aWYoIXQoYSkmJiFlKGkuX2VudGVyQ2IpJiYxPT09aS5ub2RlVHlwZSl7Zm9yKHZhciBzPWEuY3NzLGM9YS50eXBlLHU9YS5lbnRlckNsYXNzLGY9YS5lbnRlclRvQ2xhc3MscD1hLmVudGVyQWN0aXZlQ2xhc3MsZD1hLmFwcGVhckNsYXNzLHY9YS5hcHBlYXJUb0NsYXNzLGg9YS5hcHBlYXJBY3RpdmVDbGFzcyxtPWEuYmVmb3JlRW50ZXIseT1hLmVudGVyLGc9YS5hZnRlckVudGVyLF89YS5lbnRlckNhbmNlbGxlZCxiPWEuYmVmb3JlQXBwZWFyLCQ9YS5hcHBlYXIsdz1hLmFmdGVyQXBwZWFyLHg9YS5hcHBlYXJDYW5jZWxsZWQsQT1hLmR1cmF0aW9uLGs9bG8sTz1sby4kdm5vZGU7TyYmTy5wYXJlbnQ7KWs9KE89Ty5wYXJlbnQpLmNvbnRleHQ7dmFyIFM9IWsuX2lzTW91bnRlZHx8IW4uaXNSb290SW5zZXJ0O2lmKCFTfHwkfHxcIlwiPT09JCl7dmFyIFQ9UyYmZD9kOnUsRT1TJiZoP2g6cCxqPVMmJnY/djpmLE49Uz9ifHxtOm0sTD1TJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiAkPyQ6eSxJPVM/d3x8ZzpnLE09Uz94fHxfOl8sRD1sKG8oQSk/QS5lbnRlcjpBKSxQPSExIT09cyYmIU1pLEY9S24oTCksUj1pLl9lbnRlckNiPUMoZnVuY3Rpb24oKXtQJiYoUG4oaSxqKSxQbihpLEUpKSxSLmNhbmNlbGxlZD8oUCYmUG4oaSxUKSxNJiZNKGkpKTpJJiZJKGkpLGkuX2VudGVyQ2I9bnVsbH0pO24uZGF0YS5zaG93fHxldChuLmRhdGEuaG9va3x8KG4uZGF0YS5ob29rPXt9KSxcImluc2VydFwiLGZ1bmN0aW9uKCl7dmFyIHQ9aS5wYXJlbnROb2RlLGU9dCYmdC5fcGVuZGluZyYmdC5fcGVuZGluZ1tuLmtleV07ZSYmZS50YWc9PT1uLnRhZyYmZS5lbG0uX2xlYXZlQ2ImJmUuZWxtLl9sZWF2ZUNiKCksTCYmTChpLFIpfSksTiYmTihpKSxQJiYoRG4oaSxUKSxEbihpLEUpLE1uKGZ1bmN0aW9uKCl7RG4oaSxqKSxQbihpLFQpLFIuY2FuY2VsbGVkfHxGfHwoem4oRCk/c2V0VGltZW91dChSLEQpOkZuKGksYyxSKSl9KSksbi5kYXRhLnNob3cmJihyJiZyKCksTCYmTChpLFIpKSxQfHxGfHxSKCl9fX1mdW5jdGlvbiBWbihuLHIpe2Z1bmN0aW9uIGkoKXt4LmNhbmNlbGxlZHx8KG4uZGF0YS5zaG93fHwoKGEucGFyZW50Tm9kZS5fcGVuZGluZ3x8KGEucGFyZW50Tm9kZS5fcGVuZGluZz17fSkpW24ua2V5XT1uKSx2JiZ2KGEpLGImJihEbihhLGYpLERuKGEsZCksTW4oZnVuY3Rpb24oKXtEbihhLHApLFBuKGEsZikseC5jYW5jZWxsZWR8fCR8fCh6bih3KT9zZXRUaW1lb3V0KHgsdyk6Rm4oYSx1LHgpKX0pKSxoJiZoKGEseCksYnx8JHx8eCgpKX12YXIgYT1uLmVsbTtlKGEuX2VudGVyQ2IpJiYoYS5fZW50ZXJDYi5jYW5jZWxsZWQ9ITAsYS5fZW50ZXJDYigpKTt2YXIgcz1JbihuLmRhdGEudHJhbnNpdGlvbik7aWYodChzKSlyZXR1cm4gcigpO2lmKCFlKGEuX2xlYXZlQ2IpJiYxPT09YS5ub2RlVHlwZSl7dmFyIGM9cy5jc3MsdT1zLnR5cGUsZj1zLmxlYXZlQ2xhc3MscD1zLmxlYXZlVG9DbGFzcyxkPXMubGVhdmVBY3RpdmVDbGFzcyx2PXMuYmVmb3JlTGVhdmUsaD1zLmxlYXZlLG09cy5hZnRlckxlYXZlLHk9cy5sZWF2ZUNhbmNlbGxlZCxnPXMuZGVsYXlMZWF2ZSxfPXMuZHVyYXRpb24sYj0hMSE9PWMmJiFNaSwkPUtuKGgpLHc9bChvKF8pP18ubGVhdmU6XykseD1hLl9sZWF2ZUNiPUMoZnVuY3Rpb24oKXthLnBhcmVudE5vZGUmJmEucGFyZW50Tm9kZS5fcGVuZGluZyYmKGEucGFyZW50Tm9kZS5fcGVuZGluZ1tuLmtleV09bnVsbCksYiYmKFBuKGEscCksUG4oYSxkKSkseC5jYW5jZWxsZWQ/KGImJlBuKGEsZikseSYmeShhKSk6KHIoKSxtJiZtKGEpKSxhLl9sZWF2ZUNiPW51bGx9KTtnP2coaSk6aSgpfX1mdW5jdGlvbiB6bih0KXtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgdCYmIWlzTmFOKHQpfWZ1bmN0aW9uIEtuKG4pe2lmKHQobikpcmV0dXJuITE7dmFyIHI9bi5mbnM7cmV0dXJuIGUocik/S24oQXJyYXkuaXNBcnJheShyKT9yWzBdOnIpOihuLl9sZW5ndGh8fG4ubGVuZ3RoKT4xfWZ1bmN0aW9uIEpuKHQsZSl7ITAhPT1lLmRhdGEuc2hvdyYmVW4oZSl9ZnVuY3Rpb24gcW4odCxlLG4pe3ZhciByPWUudmFsdWUsaT10Lm11bHRpcGxlO2lmKCFpfHxBcnJheS5pc0FycmF5KHIpKXtmb3IodmFyIG8sYSxzPTAsYz10Lm9wdGlvbnMubGVuZ3RoO3M8YztzKyspaWYoYT10Lm9wdGlvbnNbc10saSlvPSQocixHbihhKSk+LTEsYS5zZWxlY3RlZCE9PW8mJihhLnNlbGVjdGVkPW8pO2Vsc2UgaWYoYihHbihhKSxyKSlyZXR1cm4gdm9pZCh0LnNlbGVjdGVkSW5kZXghPT1zJiYodC5zZWxlY3RlZEluZGV4PXMpKTtpfHwodC5zZWxlY3RlZEluZGV4PS0xKX19ZnVuY3Rpb24gV24odCxlKXtmb3IodmFyIG49MCxyPWUubGVuZ3RoO248cjtuKyspaWYoYihHbihlW25dKSx0KSlyZXR1cm4hMTtyZXR1cm4hMH1mdW5jdGlvbiBHbih0KXtyZXR1cm5cIl92YWx1ZVwiaW4gdD90Ll92YWx1ZTp0LnZhbHVlfWZ1bmN0aW9uIFpuKHQpe3QudGFyZ2V0LmNvbXBvc2luZz0hMH1mdW5jdGlvbiBZbih0KXt0LnRhcmdldC5jb21wb3NpbmcmJih0LnRhcmdldC5jb21wb3Npbmc9ITEsUW4odC50YXJnZXQsXCJpbnB1dFwiKSl9ZnVuY3Rpb24gUW4odCxlKXt2YXIgbj1kb2N1bWVudC5jcmVhdGVFdmVudChcIkhUTUxFdmVudHNcIik7bi5pbml0RXZlbnQoZSwhMCwhMCksdC5kaXNwYXRjaEV2ZW50KG4pfWZ1bmN0aW9uIFhuKHQpe3JldHVybiF0LmNvbXBvbmVudEluc3RhbmNlfHx0LmRhdGEmJnQuZGF0YS50cmFuc2l0aW9uP3Q6WG4odC5jb21wb25lbnRJbnN0YW5jZS5fdm5vZGUpfWZ1bmN0aW9uIHRyKHQpe3ZhciBlPXQmJnQuY29tcG9uZW50T3B0aW9ucztyZXR1cm4gZSYmZS5DdG9yLm9wdGlvbnMuYWJzdHJhY3Q/dHIoZnQoZS5jaGlsZHJlbikpOnR9ZnVuY3Rpb24gZXIodCl7dmFyIGU9e30sbj10LiRvcHRpb25zO2Zvcih2YXIgciBpbiBuLnByb3BzRGF0YSllW3JdPXRbcl07dmFyIGk9bi5fcGFyZW50TGlzdGVuZXJzO2Zvcih2YXIgbyBpbiBpKWVbZ2kobyldPWlbb107cmV0dXJuIGV9ZnVuY3Rpb24gbnIodCxlKXtpZigvXFxkLWtlZXAtYWxpdmUkLy50ZXN0KGUudGFnKSlyZXR1cm4gdChcImtlZXAtYWxpdmVcIix7cHJvcHM6ZS5jb21wb25lbnRPcHRpb25zLnByb3BzRGF0YX0pfWZ1bmN0aW9uIHJyKHQpe2Zvcig7dD10LnBhcmVudDspaWYodC5kYXRhLnRyYW5zaXRpb24pcmV0dXJuITB9ZnVuY3Rpb24gaXIodCxlKXtyZXR1cm4gZS5rZXk9PT10LmtleSYmZS50YWc9PT10LnRhZ31mdW5jdGlvbiBvcih0KXtyZXR1cm4gdC5pc0NvbW1lbnQmJnQuYXN5bmNGYWN0b3J5fWZ1bmN0aW9uIGFyKHQpe3QuZWxtLl9tb3ZlQ2ImJnQuZWxtLl9tb3ZlQ2IoKSx0LmVsbS5fZW50ZXJDYiYmdC5lbG0uX2VudGVyQ2IoKX1mdW5jdGlvbiBzcih0KXt0LmRhdGEubmV3UG9zPXQuZWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpfWZ1bmN0aW9uIGNyKHQpe3ZhciBlPXQuZGF0YS5wb3Msbj10LmRhdGEubmV3UG9zLHI9ZS5sZWZ0LW4ubGVmdCxpPWUudG9wLW4udG9wO2lmKHJ8fGkpe3QuZGF0YS5tb3ZlZD0hMDt2YXIgbz10LmVsbS5zdHlsZTtvLnRyYW5zZm9ybT1vLldlYmtpdFRyYW5zZm9ybT1cInRyYW5zbGF0ZShcIityK1wicHgsXCIraStcInB4KVwiLG8udHJhbnNpdGlvbkR1cmF0aW9uPVwiMHNcIn19ZnVuY3Rpb24gdXIodCxlKXt2YXIgbj1lP0JhKGUpOlJhO2lmKG4udGVzdCh0KSl7Zm9yKHZhciByLGksbz1bXSxhPW4ubGFzdEluZGV4PTA7cj1uLmV4ZWModCk7KXsoaT1yLmluZGV4KT5hJiZvLnB1c2goSlNPTi5zdHJpbmdpZnkodC5zbGljZShhLGkpKSk7dmFyIHM9WWUoclsxXS50cmltKCkpO28ucHVzaChcIl9zKFwiK3MrXCIpXCIpLGE9aStyWzBdLmxlbmd0aH1yZXR1cm4gYTx0Lmxlbmd0aCYmby5wdXNoKEpTT04uc3RyaW5naWZ5KHQuc2xpY2UoYSkpKSxvLmpvaW4oXCIrXCIpfX1mdW5jdGlvbiBscih0LGUpe3ZhciBuPWU/Q3M6JHM7cmV0dXJuIHQucmVwbGFjZShuLGZ1bmN0aW9uKHQpe3JldHVybiBic1t0XX0pfWZ1bmN0aW9uIGZyKHQsZSl7ZnVuY3Rpb24gbihlKXtsKz1lLHQ9dC5zdWJzdHJpbmcoZSl9ZnVuY3Rpb24gcih0LG4scil7dmFyIGkscztpZihudWxsPT1uJiYobj1sKSxudWxsPT1yJiYocj1sKSx0JiYocz10LnRvTG93ZXJDYXNlKCkpLHQpZm9yKGk9YS5sZW5ndGgtMTtpPj0wJiZhW2ldLmxvd2VyQ2FzZWRUYWchPT1zO2ktLSk7ZWxzZSBpPTA7aWYoaT49MCl7Zm9yKHZhciBjPWEubGVuZ3RoLTE7Yz49aTtjLS0pZS5lbmQmJmUuZW5kKGFbY10udGFnLG4scik7YS5sZW5ndGg9aSxvPWkmJmFbaS0xXS50YWd9ZWxzZVwiYnJcIj09PXM/ZS5zdGFydCYmZS5zdGFydCh0LFtdLCEwLG4scik6XCJwXCI9PT1zJiYoZS5zdGFydCYmZS5zdGFydCh0LFtdLCExLG4sciksZS5lbmQmJmUuZW5kKHQsbixyKSl9Zm9yKHZhciBpLG8sYT1bXSxzPWUuZXhwZWN0SFRNTCxjPWUuaXNVbmFyeVRhZ3x8Q2ksdT1lLmNhbkJlTGVmdE9wZW5UYWd8fENpLGw9MDt0Oyl7aWYoaT10LG8mJmdzKG8pKXt2YXIgZj0wLHA9by50b0xvd2VyQ2FzZSgpLGQ9X3NbcF18fChfc1twXT1uZXcgUmVnRXhwKFwiKFtcXFxcc1xcXFxTXSo/KSg8L1wiK3ArXCJbXj5dKj4pXCIsXCJpXCIpKSx2PXQucmVwbGFjZShkLGZ1bmN0aW9uKHQsbixyKXtyZXR1cm4gZj1yLmxlbmd0aCxncyhwKXx8XCJub3NjcmlwdFwiPT09cHx8KG49bi5yZXBsYWNlKC88IS0tKFtcXHNcXFNdKj8pLS0+L2csXCIkMVwiKS5yZXBsYWNlKC88IVxcW0NEQVRBXFxbKFtcXHNcXFNdKj8pXV0+L2csXCIkMVwiKSkseHMocCxuKSYmKG49bi5zbGljZSgxKSksZS5jaGFycyYmZS5jaGFycyhuKSxcIlwifSk7bCs9dC5sZW5ndGgtdi5sZW5ndGgsdD12LHIocCxsLWYsbCl9ZWxzZXt4cyhvLHQpJiZuKDEpO3ZhciBoPXQuaW5kZXhPZihcIjxcIik7aWYoMD09PWgpe2lmKG9zLnRlc3QodCkpe3ZhciBtPXQuaW5kZXhPZihcIi0tXFx4M2VcIik7aWYobT49MCl7ZS5zaG91bGRLZWVwQ29tbWVudCYmZS5jb21tZW50KHQuc3Vic3RyaW5nKDQsbSkpLG4obSszKTtjb250aW51ZX19aWYoYXMudGVzdCh0KSl7dmFyIHk9dC5pbmRleE9mKFwiXT5cIik7aWYoeT49MCl7bih5KzIpO2NvbnRpbnVlfX12YXIgZz10Lm1hdGNoKGlzKTtpZihnKXtuKGdbMF0ubGVuZ3RoKTtjb250aW51ZX12YXIgXz10Lm1hdGNoKHJzKTtpZihfKXt2YXIgYj1sO24oX1swXS5sZW5ndGgpLHIoX1sxXSxiLGwpO2NvbnRpbnVlfXZhciAkPWZ1bmN0aW9uKCl7dmFyIGU9dC5tYXRjaChlcyk7aWYoZSl7dmFyIHI9e3RhZ05hbWU6ZVsxXSxhdHRyczpbXSxzdGFydDpsfTtuKGVbMF0ubGVuZ3RoKTtmb3IodmFyIGksbzshKGk9dC5tYXRjaChucykpJiYobz10Lm1hdGNoKFFhKSk7KW4ob1swXS5sZW5ndGgpLHIuYXR0cnMucHVzaChvKTtpZihpKXJldHVybiByLnVuYXJ5U2xhc2g9aVsxXSxuKGlbMF0ubGVuZ3RoKSxyLmVuZD1sLHJ9fSgpO2lmKCQpeyFmdW5jdGlvbih0KXt2YXIgbj10LnRhZ05hbWUsaT10LnVuYXJ5U2xhc2g7cyYmKFwicFwiPT09byYmSmEobikmJnIobyksdShuKSYmbz09PW4mJnIobikpO2Zvcih2YXIgbD1jKG4pfHwhIWksZj10LmF0dHJzLmxlbmd0aCxwPW5ldyBBcnJheShmKSxkPTA7ZDxmO2QrKyl7dmFyIHY9dC5hdHRyc1tkXTtzcyYmLTE9PT12WzBdLmluZGV4T2YoJ1wiXCInKSYmKFwiXCI9PT12WzNdJiZkZWxldGUgdlszXSxcIlwiPT09dls0XSYmZGVsZXRlIHZbNF0sXCJcIj09PXZbNV0mJmRlbGV0ZSB2WzVdKTt2YXIgaD12WzNdfHx2WzRdfHx2WzVdfHxcIlwiO3BbZF09e25hbWU6dlsxXSx2YWx1ZTpscihoLGUuc2hvdWxkRGVjb2RlTmV3bGluZXMpfX1sfHwoYS5wdXNoKHt0YWc6bixsb3dlckNhc2VkVGFnOm4udG9Mb3dlckNhc2UoKSxhdHRyczpwfSksbz1uKSxlLnN0YXJ0JiZlLnN0YXJ0KG4scCxsLHQuc3RhcnQsdC5lbmQpfSgkKTtjb250aW51ZX19dmFyIEM9dm9pZCAwLHc9dm9pZCAwLHg9dm9pZCAwO2lmKGg+PTApe2Zvcih3PXQuc2xpY2UoaCk7IShycy50ZXN0KHcpfHxlcy50ZXN0KHcpfHxvcy50ZXN0KHcpfHxhcy50ZXN0KHcpfHwoeD13LmluZGV4T2YoXCI8XCIsMSkpPDApOyloKz14LHc9dC5zbGljZShoKTtDPXQuc3Vic3RyaW5nKDAsaCksbihoKX1oPDAmJihDPXQsdD1cIlwiKSxlLmNoYXJzJiZDJiZlLmNoYXJzKEMpfWlmKHQ9PT1pKXtlLmNoYXJzJiZlLmNoYXJzKHQpO2JyZWFrfX1yKCl9ZnVuY3Rpb24gcHIodCxlKXtmdW5jdGlvbiBuKHQpe3QucHJlJiYocz0hMSksZHModC50YWcpJiYoYz0hMSl9Y3M9ZS53YXJufHxYZSxkcz1lLmlzUHJlVGFnfHxDaSx2cz1lLm11c3RVc2VQcm9wfHxDaSxocz1lLmdldFRhZ05hbWVzcGFjZXx8Q2ksbHM9dG4oZS5tb2R1bGVzLFwidHJhbnNmb3JtTm9kZVwiKSxmcz10bihlLm1vZHVsZXMsXCJwcmVUcmFuc2Zvcm1Ob2RlXCIpLHBzPXRuKGUubW9kdWxlcyxcInBvc3RUcmFuc2Zvcm1Ob2RlXCIpLHVzPWUuZGVsaW1pdGVyczt2YXIgcixpLG89W10sYT0hMSE9PWUucHJlc2VydmVXaGl0ZXNwYWNlLHM9ITEsYz0hMTtyZXR1cm4gZnIodCx7d2FybjpjcyxleHBlY3RIVE1MOmUuZXhwZWN0SFRNTCxpc1VuYXJ5VGFnOmUuaXNVbmFyeVRhZyxjYW5CZUxlZnRPcGVuVGFnOmUuY2FuQmVMZWZ0T3BlblRhZyxzaG91bGREZWNvZGVOZXdsaW5lczplLnNob3VsZERlY29kZU5ld2xpbmVzLHNob3VsZEtlZXBDb21tZW50OmUuY29tbWVudHMsc3RhcnQ6ZnVuY3Rpb24odCxhLHUpe2Z1bmN0aW9uIGwodCl7fXZhciBmPWkmJmkubnN8fGhzKHQpO0lpJiZcInN2Z1wiPT09ZiYmKGE9anIoYSkpO3ZhciBwPXt0eXBlOjEsdGFnOnQsYXR0cnNMaXN0OmEsYXR0cnNNYXA6U3IoYSkscGFyZW50OmksY2hpbGRyZW46W119O2YmJihwLm5zPWYpLEVyKHApJiYhS2koKSYmKHAuZm9yYmlkZGVuPSEwKTtmb3IodmFyIGQ9MDtkPGZzLmxlbmd0aDtkKyspZnNbZF0ocCxlKTtpZihzfHwoZHIocCkscC5wcmUmJihzPSEwKSksZHMocC50YWcpJiYoYz0hMCkscyl2cihwKTtlbHNle3lyKHApLGdyKHApLENyKHApLGhyKHApLHAucGxhaW49IXAua2V5JiYhYS5sZW5ndGgsbXIocCksd3IocCkseHIocCk7Zm9yKHZhciB2PTA7djxscy5sZW5ndGg7disrKWxzW3ZdKHAsZSk7QXIocCl9aWYocj9vLmxlbmd0aHx8ci5pZiYmKHAuZWxzZWlmfHxwLmVsc2UpJiYobCgpLCRyKHIse2V4cDpwLmVsc2VpZixibG9jazpwfSkpOihyPXAsbCgpKSxpJiYhcC5mb3JiaWRkZW4paWYocC5lbHNlaWZ8fHAuZWxzZSlfcihwLGkpO2Vsc2UgaWYocC5zbG90U2NvcGUpe2kucGxhaW49ITE7dmFyIGg9cC5zbG90VGFyZ2V0fHwnXCJkZWZhdWx0XCInOyhpLnNjb3BlZFNsb3RzfHwoaS5zY29wZWRTbG90cz17fSkpW2hdPXB9ZWxzZSBpLmNoaWxkcmVuLnB1c2gocCkscC5wYXJlbnQ9aTt1P24ocCk6KGk9cCxvLnB1c2gocCkpO2Zvcih2YXIgbT0wO208cHMubGVuZ3RoO20rKylwc1ttXShwLGUpfSxlbmQ6ZnVuY3Rpb24oKXt2YXIgdD1vW28ubGVuZ3RoLTFdLGU9dC5jaGlsZHJlblt0LmNoaWxkcmVuLmxlbmd0aC0xXTtlJiYzPT09ZS50eXBlJiZcIiBcIj09PWUudGV4dCYmIWMmJnQuY2hpbGRyZW4ucG9wKCksby5sZW5ndGgtPTEsaT1vW28ubGVuZ3RoLTFdLG4odCl9LGNoYXJzOmZ1bmN0aW9uKHQpe2lmKGkmJighSWl8fFwidGV4dGFyZWFcIiE9PWkudGFnfHxpLmF0dHJzTWFwLnBsYWNlaG9sZGVyIT09dCkpe3ZhciBlPWkuY2hpbGRyZW47aWYodD1jfHx0LnRyaW0oKT9UcihpKT90Ok5zKHQpOmEmJmUubGVuZ3RoP1wiIFwiOlwiXCIpe3ZhciBuOyFzJiZcIiBcIiE9PXQmJihuPXVyKHQsdXMpKT9lLnB1c2goe3R5cGU6MixleHByZXNzaW9uOm4sdGV4dDp0fSk6XCIgXCI9PT10JiZlLmxlbmd0aCYmXCIgXCI9PT1lW2UubGVuZ3RoLTFdLnRleHR8fGUucHVzaCh7dHlwZTozLHRleHQ6dH0pfX19LGNvbW1lbnQ6ZnVuY3Rpb24odCl7aS5jaGlsZHJlbi5wdXNoKHt0eXBlOjMsdGV4dDp0LGlzQ29tbWVudDohMH0pfX0pLHJ9ZnVuY3Rpb24gZHIodCl7bnVsbCE9c24odCxcInYtcHJlXCIpJiYodC5wcmU9ITApfWZ1bmN0aW9uIHZyKHQpe3ZhciBlPXQuYXR0cnNMaXN0Lmxlbmd0aDtpZihlKWZvcih2YXIgbj10LmF0dHJzPW5ldyBBcnJheShlKSxyPTA7cjxlO3IrKyluW3JdPXtuYW1lOnQuYXR0cnNMaXN0W3JdLm5hbWUsdmFsdWU6SlNPTi5zdHJpbmdpZnkodC5hdHRyc0xpc3Rbcl0udmFsdWUpfTtlbHNlIHQucHJlfHwodC5wbGFpbj0hMCl9ZnVuY3Rpb24gaHIodCl7dmFyIGU9YW4odCxcImtleVwiKTtlJiYodC5rZXk9ZSl9ZnVuY3Rpb24gbXIodCl7dmFyIGU9YW4odCxcInJlZlwiKTtlJiYodC5yZWY9ZSx0LnJlZkluRm9yPWtyKHQpKX1mdW5jdGlvbiB5cih0KXt2YXIgZTtpZihlPXNuKHQsXCJ2LWZvclwiKSl7dmFyIG49ZS5tYXRjaChPcyk7aWYoIW4pcmV0dXJuO3QuZm9yPW5bMl0udHJpbSgpO3ZhciByPW5bMV0udHJpbSgpLGk9ci5tYXRjaChTcyk7aT8odC5hbGlhcz1pWzFdLnRyaW0oKSx0Lml0ZXJhdG9yMT1pWzJdLnRyaW0oKSxpWzNdJiYodC5pdGVyYXRvcjI9aVszXS50cmltKCkpKTp0LmFsaWFzPXJ9fWZ1bmN0aW9uIGdyKHQpe3ZhciBlPXNuKHQsXCJ2LWlmXCIpO2lmKGUpdC5pZj1lLCRyKHQse2V4cDplLGJsb2NrOnR9KTtlbHNle251bGwhPXNuKHQsXCJ2LWVsc2VcIikmJih0LmVsc2U9ITApO3ZhciBuPXNuKHQsXCJ2LWVsc2UtaWZcIik7biYmKHQuZWxzZWlmPW4pfX1mdW5jdGlvbiBfcih0LGUpe3ZhciBuPWJyKGUuY2hpbGRyZW4pO24mJm4uaWYmJiRyKG4se2V4cDp0LmVsc2VpZixibG9jazp0fSl9ZnVuY3Rpb24gYnIodCl7Zm9yKHZhciBlPXQubGVuZ3RoO2UtLTspe2lmKDE9PT10W2VdLnR5cGUpcmV0dXJuIHRbZV07dC5wb3AoKX19ZnVuY3Rpb24gJHIodCxlKXt0LmlmQ29uZGl0aW9uc3x8KHQuaWZDb25kaXRpb25zPVtdKSx0LmlmQ29uZGl0aW9ucy5wdXNoKGUpfWZ1bmN0aW9uIENyKHQpe251bGwhPXNuKHQsXCJ2LW9uY2VcIikmJih0Lm9uY2U9ITApfWZ1bmN0aW9uIHdyKHQpe2lmKFwic2xvdFwiPT09dC50YWcpdC5zbG90TmFtZT1hbih0LFwibmFtZVwiKTtlbHNle3ZhciBlPWFuKHQsXCJzbG90XCIpO2UmJih0LnNsb3RUYXJnZXQ9J1wiXCInPT09ZT8nXCJkZWZhdWx0XCInOmUpLFwidGVtcGxhdGVcIj09PXQudGFnJiYodC5zbG90U2NvcGU9c24odCxcInNjb3BlXCIpKX19ZnVuY3Rpb24geHIodCl7dmFyIGU7KGU9YW4odCxcImlzXCIpKSYmKHQuY29tcG9uZW50PWUpLG51bGwhPXNuKHQsXCJpbmxpbmUtdGVtcGxhdGVcIikmJih0LmlubGluZVRlbXBsYXRlPSEwKX1mdW5jdGlvbiBBcih0KXt2YXIgZSxuLHIsaSxvLGEscyxjPXQuYXR0cnNMaXN0O2ZvcihlPTAsbj1jLmxlbmd0aDtlPG47ZSsrKWlmKHI9aT1jW2VdLm5hbWUsbz1jW2VdLnZhbHVlLGtzLnRlc3QocikpaWYodC5oYXNCaW5kaW5ncz0hMCwoYT1PcihyKSkmJihyPXIucmVwbGFjZShqcyxcIlwiKSksRXMudGVzdChyKSlyPXIucmVwbGFjZShFcyxcIlwiKSxvPVllKG8pLHM9ITEsYSYmKGEucHJvcCYmKHM9ITAsXCJpbm5lckh0bWxcIj09PShyPWdpKHIpKSYmKHI9XCJpbm5lckhUTUxcIikpLGEuY2FtZWwmJihyPWdpKHIpKSxhLnN5bmMmJm9uKHQsXCJ1cGRhdGU6XCIrZ2kociksdW4obyxcIiRldmVudFwiKSkpLHQuY29tcG9uZW50fHwhcyYmIXZzKHQudGFnLHQuYXR0cnNNYXAudHlwZSxyKT9ubih0LHIsbyk6ZW4odCxyLG8pO2Vsc2UgaWYoQXMudGVzdChyKSlvbih0LHI9ci5yZXBsYWNlKEFzLFwiXCIpLG8sYSwhMSxjcyk7ZWxzZXt2YXIgdT0ocj1yLnJlcGxhY2Uoa3MsXCJcIikpLm1hdGNoKFRzKSxsPXUmJnVbMV07bCYmKHI9ci5zbGljZSgwLC0obC5sZW5ndGgrMSkpKSxybih0LHIsaSxvLGwsYSl9ZWxzZSBubih0LHIsSlNPTi5zdHJpbmdpZnkobykpfWZ1bmN0aW9uIGtyKHQpe2Zvcih2YXIgZT10O2U7KXtpZih2b2lkIDAhPT1lLmZvcilyZXR1cm4hMDtlPWUucGFyZW50fXJldHVybiExfWZ1bmN0aW9uIE9yKHQpe3ZhciBlPXQubWF0Y2goanMpO2lmKGUpe3ZhciBuPXt9O3JldHVybiBlLmZvckVhY2goZnVuY3Rpb24odCl7blt0LnNsaWNlKDEpXT0hMH0pLG59fWZ1bmN0aW9uIFNyKHQpe2Zvcih2YXIgZT17fSxuPTAscj10Lmxlbmd0aDtuPHI7bisrKWVbdFtuXS5uYW1lXT10W25dLnZhbHVlO3JldHVybiBlfWZ1bmN0aW9uIFRyKHQpe3JldHVyblwic2NyaXB0XCI9PT10LnRhZ3x8XCJzdHlsZVwiPT09dC50YWd9ZnVuY3Rpb24gRXIodCl7cmV0dXJuXCJzdHlsZVwiPT09dC50YWd8fFwic2NyaXB0XCI9PT10LnRhZyYmKCF0LmF0dHJzTWFwLnR5cGV8fFwidGV4dC9qYXZhc2NyaXB0XCI9PT10LmF0dHJzTWFwLnR5cGUpfWZ1bmN0aW9uIGpyKHQpe2Zvcih2YXIgZT1bXSxuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciByPXRbbl07THMudGVzdChyLm5hbWUpfHwoci5uYW1lPXIubmFtZS5yZXBsYWNlKElzLFwiXCIpLGUucHVzaChyKSl9cmV0dXJuIGV9ZnVuY3Rpb24gTnIodCxlKXt0JiYobXM9TXMoZS5zdGF0aWNLZXlzfHxcIlwiKSx5cz1lLmlzUmVzZXJ2ZWRUYWd8fENpLExyKHQpLElyKHQsITEpKX1mdW5jdGlvbiBMcih0KXtpZih0LnN0YXRpYz1Ncih0KSwxPT09dC50eXBlKXtpZigheXModC50YWcpJiZcInNsb3RcIiE9PXQudGFnJiZudWxsPT10LmF0dHJzTWFwW1wiaW5saW5lLXRlbXBsYXRlXCJdKXJldHVybjtmb3IodmFyIGU9MCxuPXQuY2hpbGRyZW4ubGVuZ3RoO2U8bjtlKyspe3ZhciByPXQuY2hpbGRyZW5bZV07THIociksci5zdGF0aWN8fCh0LnN0YXRpYz0hMSl9aWYodC5pZkNvbmRpdGlvbnMpZm9yKHZhciBpPTEsbz10LmlmQ29uZGl0aW9ucy5sZW5ndGg7aTxvO2krKyl7dmFyIGE9dC5pZkNvbmRpdGlvbnNbaV0uYmxvY2s7THIoYSksYS5zdGF0aWN8fCh0LnN0YXRpYz0hMSl9fX1mdW5jdGlvbiBJcih0LGUpe2lmKDE9PT10LnR5cGUpe2lmKCh0LnN0YXRpY3x8dC5vbmNlKSYmKHQuc3RhdGljSW5Gb3I9ZSksdC5zdGF0aWMmJnQuY2hpbGRyZW4ubGVuZ3RoJiYoMSE9PXQuY2hpbGRyZW4ubGVuZ3RofHwzIT09dC5jaGlsZHJlblswXS50eXBlKSlyZXR1cm4gdm9pZCh0LnN0YXRpY1Jvb3Q9ITApO2lmKHQuc3RhdGljUm9vdD0hMSx0LmNoaWxkcmVuKWZvcih2YXIgbj0wLHI9dC5jaGlsZHJlbi5sZW5ndGg7bjxyO24rKylJcih0LmNoaWxkcmVuW25dLGV8fCEhdC5mb3IpO2lmKHQuaWZDb25kaXRpb25zKWZvcih2YXIgaT0xLG89dC5pZkNvbmRpdGlvbnMubGVuZ3RoO2k8bztpKyspSXIodC5pZkNvbmRpdGlvbnNbaV0uYmxvY2ssZSl9fWZ1bmN0aW9uIE1yKHQpe3JldHVybiAyIT09dC50eXBlJiYoMz09PXQudHlwZXx8ISghdC5wcmUmJih0Lmhhc0JpbmRpbmdzfHx0LmlmfHx0LmZvcnx8dmkodC50YWcpfHwheXModC50YWcpfHxEcih0KXx8IU9iamVjdC5rZXlzKHQpLmV2ZXJ5KG1zKSkpKX1mdW5jdGlvbiBEcih0KXtmb3IoO3QucGFyZW50Oyl7aWYoXCJ0ZW1wbGF0ZVwiIT09KHQ9dC5wYXJlbnQpLnRhZylyZXR1cm4hMTtpZih0LmZvcilyZXR1cm4hMH1yZXR1cm4hMX1mdW5jdGlvbiBQcih0LGUsbil7dmFyIHI9ZT9cIm5hdGl2ZU9uOntcIjpcIm9uOntcIjtmb3IodmFyIGkgaW4gdCl7dmFyIG89dFtpXTtyKz0nXCInK2krJ1wiOicrRnIoaSxvKStcIixcIn1yZXR1cm4gci5zbGljZSgwLC0xKStcIn1cIn1mdW5jdGlvbiBGcih0LGUpe2lmKCFlKXJldHVyblwiZnVuY3Rpb24oKXt9XCI7aWYoQXJyYXkuaXNBcnJheShlKSlyZXR1cm5cIltcIitlLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gRnIodCxlKX0pLmpvaW4oXCIsXCIpK1wiXVwiO3ZhciBuPVBzLnRlc3QoZS52YWx1ZSkscj1Ecy50ZXN0KGUudmFsdWUpO2lmKGUubW9kaWZpZXJzKXt2YXIgaT1cIlwiLG89XCJcIixhPVtdO2Zvcih2YXIgcyBpbiBlLm1vZGlmaWVycylIc1tzXT8obys9SHNbc10sRnNbc10mJmEucHVzaChzKSk6YS5wdXNoKHMpO3JldHVybiBhLmxlbmd0aCYmKGkrPVJyKGEpKSxvJiYoaSs9byksXCJmdW5jdGlvbigkZXZlbnQpe1wiK2krKG4/ZS52YWx1ZStcIigkZXZlbnQpXCI6cj9cIihcIitlLnZhbHVlK1wiKSgkZXZlbnQpXCI6ZS52YWx1ZSkrXCJ9XCJ9cmV0dXJuIG58fHI/ZS52YWx1ZTpcImZ1bmN0aW9uKCRldmVudCl7XCIrZS52YWx1ZStcIn1cIn1mdW5jdGlvbiBScih0KXtyZXR1cm5cImlmKCEoJ2J1dHRvbicgaW4gJGV2ZW50KSYmXCIrdC5tYXAoSHIpLmpvaW4oXCImJlwiKStcIilyZXR1cm4gbnVsbDtcIn1mdW5jdGlvbiBIcih0KXt2YXIgZT1wYXJzZUludCh0LDEwKTtpZihlKXJldHVyblwiJGV2ZW50LmtleUNvZGUhPT1cIitlO3ZhciBuPUZzW3RdO3JldHVyblwiX2soJGV2ZW50LmtleUNvZGUsXCIrSlNPTi5zdHJpbmdpZnkodCkrKG4/XCIsXCIrSlNPTi5zdHJpbmdpZnkobik6XCJcIikrXCIpXCJ9ZnVuY3Rpb24gQnIodCxlKXt2YXIgbj1uZXcgVXMoZSk7cmV0dXJue3JlbmRlcjpcIndpdGgodGhpcyl7cmV0dXJuIFwiKyh0P1VyKHQsbik6J19jKFwiZGl2XCIpJykrXCJ9XCIsc3RhdGljUmVuZGVyRm5zOm4uc3RhdGljUmVuZGVyRm5zfX1mdW5jdGlvbiBVcih0LGUpe2lmKHQuc3RhdGljUm9vdCYmIXQuc3RhdGljUHJvY2Vzc2VkKXJldHVybiBWcih0LGUpO2lmKHQub25jZSYmIXQub25jZVByb2Nlc3NlZClyZXR1cm4genIodCxlKTtpZih0LmZvciYmIXQuZm9yUHJvY2Vzc2VkKXJldHVybiBxcih0LGUpO2lmKHQuaWYmJiF0LmlmUHJvY2Vzc2VkKXJldHVybiBLcih0LGUpO2lmKFwidGVtcGxhdGVcIiE9PXQudGFnfHx0LnNsb3RUYXJnZXQpe2lmKFwic2xvdFwiPT09dC50YWcpcmV0dXJuIGFpKHQsZSk7dmFyIG47aWYodC5jb21wb25lbnQpbj1zaSh0LmNvbXBvbmVudCx0LGUpO2Vsc2V7dmFyIHI9dC5wbGFpbj92b2lkIDA6V3IodCxlKSxpPXQuaW5saW5lVGVtcGxhdGU/bnVsbDp0aSh0LGUsITApO249XCJfYygnXCIrdC50YWcrXCInXCIrKHI/XCIsXCIrcjpcIlwiKSsoaT9cIixcIitpOlwiXCIpK1wiKVwifWZvcih2YXIgbz0wO288ZS50cmFuc2Zvcm1zLmxlbmd0aDtvKyspbj1lLnRyYW5zZm9ybXNbb10odCxuKTtyZXR1cm4gbn1yZXR1cm4gdGkodCxlKXx8XCJ2b2lkIDBcIn1mdW5jdGlvbiBWcih0LGUpe3JldHVybiB0LnN0YXRpY1Byb2Nlc3NlZD0hMCxlLnN0YXRpY1JlbmRlckZucy5wdXNoKFwid2l0aCh0aGlzKXtyZXR1cm4gXCIrVXIodCxlKStcIn1cIiksXCJfbShcIisoZS5zdGF0aWNSZW5kZXJGbnMubGVuZ3RoLTEpKyh0LnN0YXRpY0luRm9yP1wiLHRydWVcIjpcIlwiKStcIilcIn1mdW5jdGlvbiB6cih0LGUpe2lmKHQub25jZVByb2Nlc3NlZD0hMCx0LmlmJiYhdC5pZlByb2Nlc3NlZClyZXR1cm4gS3IodCxlKTtpZih0LnN0YXRpY0luRm9yKXtmb3IodmFyIG49XCJcIixyPXQucGFyZW50O3I7KXtpZihyLmZvcil7bj1yLmtleTticmVha31yPXIucGFyZW50fXJldHVybiBuP1wiX28oXCIrVXIodCxlKStcIixcIitlLm9uY2VJZCsrKyhuP1wiLFwiK246XCJcIikrXCIpXCI6VXIodCxlKX1yZXR1cm4gVnIodCxlKX1mdW5jdGlvbiBLcih0LGUsbixyKXtyZXR1cm4gdC5pZlByb2Nlc3NlZD0hMCxKcih0LmlmQ29uZGl0aW9ucy5zbGljZSgpLGUsbixyKX1mdW5jdGlvbiBKcih0LGUsbixyKXtmdW5jdGlvbiBpKHQpe3JldHVybiBuP24odCxlKTp0Lm9uY2U/enIodCxlKTpVcih0LGUpfWlmKCF0Lmxlbmd0aClyZXR1cm4gcnx8XCJfZSgpXCI7dmFyIG89dC5zaGlmdCgpO3JldHVybiBvLmV4cD9cIihcIitvLmV4cCtcIik/XCIraShvLmJsb2NrKStcIjpcIitKcih0LGUsbixyKTpcIlwiK2koby5ibG9jayl9ZnVuY3Rpb24gcXIodCxlLG4scil7dmFyIGk9dC5mb3Isbz10LmFsaWFzLGE9dC5pdGVyYXRvcjE/XCIsXCIrdC5pdGVyYXRvcjE6XCJcIixzPXQuaXRlcmF0b3IyP1wiLFwiK3QuaXRlcmF0b3IyOlwiXCI7cmV0dXJuIHQuZm9yUHJvY2Vzc2VkPSEwLChyfHxcIl9sXCIpK1wiKChcIitpK1wiKSxmdW5jdGlvbihcIitvK2ErcytcIil7cmV0dXJuIFwiKyhufHxVcikodCxlKStcIn0pXCJ9ZnVuY3Rpb24gV3IodCxlKXt2YXIgbj1cIntcIixyPUdyKHQsZSk7ciYmKG4rPXIrXCIsXCIpLHQua2V5JiYobis9XCJrZXk6XCIrdC5rZXkrXCIsXCIpLHQucmVmJiYobis9XCJyZWY6XCIrdC5yZWYrXCIsXCIpLHQucmVmSW5Gb3ImJihuKz1cInJlZkluRm9yOnRydWUsXCIpLHQucHJlJiYobis9XCJwcmU6dHJ1ZSxcIiksdC5jb21wb25lbnQmJihuKz0ndGFnOlwiJyt0LnRhZysnXCIsJyk7Zm9yKHZhciBpPTA7aTxlLmRhdGFHZW5GbnMubGVuZ3RoO2krKyluKz1lLmRhdGFHZW5GbnNbaV0odCk7aWYodC5hdHRycyYmKG4rPVwiYXR0cnM6e1wiK2NpKHQuYXR0cnMpK1wifSxcIiksdC5wcm9wcyYmKG4rPVwiZG9tUHJvcHM6e1wiK2NpKHQucHJvcHMpK1wifSxcIiksdC5ldmVudHMmJihuKz1Qcih0LmV2ZW50cywhMSxlLndhcm4pK1wiLFwiKSx0Lm5hdGl2ZUV2ZW50cyYmKG4rPVByKHQubmF0aXZlRXZlbnRzLCEwLGUud2FybikrXCIsXCIpLHQuc2xvdFRhcmdldCYmKG4rPVwic2xvdDpcIit0LnNsb3RUYXJnZXQrXCIsXCIpLHQuc2NvcGVkU2xvdHMmJihuKz1Zcih0LnNjb3BlZFNsb3RzLGUpK1wiLFwiKSx0Lm1vZGVsJiYobis9XCJtb2RlbDp7dmFsdWU6XCIrdC5tb2RlbC52YWx1ZStcIixjYWxsYmFjazpcIit0Lm1vZGVsLmNhbGxiYWNrK1wiLGV4cHJlc3Npb246XCIrdC5tb2RlbC5leHByZXNzaW9uK1wifSxcIiksdC5pbmxpbmVUZW1wbGF0ZSl7dmFyIG89WnIodCxlKTtvJiYobis9bytcIixcIil9cmV0dXJuIG49bi5yZXBsYWNlKC8sJC8sXCJcIikrXCJ9XCIsdC53cmFwRGF0YSYmKG49dC53cmFwRGF0YShuKSksdC53cmFwTGlzdGVuZXJzJiYobj10LndyYXBMaXN0ZW5lcnMobikpLG59ZnVuY3Rpb24gR3IodCxlKXt2YXIgbj10LmRpcmVjdGl2ZXM7aWYobil7dmFyIHIsaSxvLGEscz1cImRpcmVjdGl2ZXM6W1wiLGM9ITE7Zm9yKHI9MCxpPW4ubGVuZ3RoO3I8aTtyKyspe289bltyXSxhPSEwO3ZhciB1PWUuZGlyZWN0aXZlc1tvLm5hbWVdO3UmJihhPSEhdSh0LG8sZS53YXJuKSksYSYmKGM9ITAscys9J3tuYW1lOlwiJytvLm5hbWUrJ1wiLHJhd05hbWU6XCInK28ucmF3TmFtZSsnXCInKyhvLnZhbHVlP1wiLHZhbHVlOihcIitvLnZhbHVlK1wiKSxleHByZXNzaW9uOlwiK0pTT04uc3RyaW5naWZ5KG8udmFsdWUpOlwiXCIpKyhvLmFyZz8nLGFyZzpcIicrby5hcmcrJ1wiJzpcIlwiKSsoby5tb2RpZmllcnM/XCIsbW9kaWZpZXJzOlwiK0pTT04uc3RyaW5naWZ5KG8ubW9kaWZpZXJzKTpcIlwiKStcIn0sXCIpfXJldHVybiBjP3Muc2xpY2UoMCwtMSkrXCJdXCI6dm9pZCAwfX1mdW5jdGlvbiBacih0LGUpe3ZhciBuPXQuY2hpbGRyZW5bMF07aWYoMT09PW4udHlwZSl7dmFyIHI9QnIobixlLm9wdGlvbnMpO3JldHVyblwiaW5saW5lVGVtcGxhdGU6e3JlbmRlcjpmdW5jdGlvbigpe1wiK3IucmVuZGVyK1wifSxzdGF0aWNSZW5kZXJGbnM6W1wiK3Iuc3RhdGljUmVuZGVyRm5zLm1hcChmdW5jdGlvbih0KXtyZXR1cm5cImZ1bmN0aW9uKCl7XCIrdCtcIn1cIn0pLmpvaW4oXCIsXCIpK1wiXX1cIn19ZnVuY3Rpb24gWXIodCxlKXtyZXR1cm5cInNjb3BlZFNsb3RzOl91KFtcIitPYmplY3Qua2V5cyh0KS5tYXAoZnVuY3Rpb24obil7cmV0dXJuIFFyKG4sdFtuXSxlKX0pLmpvaW4oXCIsXCIpK1wiXSlcIn1mdW5jdGlvbiBRcih0LGUsbil7cmV0dXJuIGUuZm9yJiYhZS5mb3JQcm9jZXNzZWQ/WHIodCxlLG4pOlwie2tleTpcIit0K1wiLGZuOmZ1bmN0aW9uKFwiK1N0cmluZyhlLmF0dHJzTWFwLnNjb3BlKStcIil7cmV0dXJuIFwiKyhcInRlbXBsYXRlXCI9PT1lLnRhZz90aShlLG4pfHxcInZvaWQgMFwiOlVyKGUsbikpK1wifX1cIn1mdW5jdGlvbiBYcih0LGUsbil7dmFyIHI9ZS5mb3IsaT1lLmFsaWFzLG89ZS5pdGVyYXRvcjE/XCIsXCIrZS5pdGVyYXRvcjE6XCJcIixhPWUuaXRlcmF0b3IyP1wiLFwiK2UuaXRlcmF0b3IyOlwiXCI7cmV0dXJuIGUuZm9yUHJvY2Vzc2VkPSEwLFwiX2woKFwiK3IrXCIpLGZ1bmN0aW9uKFwiK2krbythK1wiKXtyZXR1cm4gXCIrUXIodCxlLG4pK1wifSlcIn1mdW5jdGlvbiB0aSh0LGUsbixyLGkpe3ZhciBvPXQuY2hpbGRyZW47aWYoby5sZW5ndGgpe3ZhciBhPW9bMF07aWYoMT09PW8ubGVuZ3RoJiZhLmZvciYmXCJ0ZW1wbGF0ZVwiIT09YS50YWcmJlwic2xvdFwiIT09YS50YWcpcmV0dXJuKHJ8fFVyKShhLGUpO3ZhciBzPW4/ZWkobyxlLm1heWJlQ29tcG9uZW50KTowLGM9aXx8cmk7cmV0dXJuXCJbXCIrby5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIGModCxlKX0pLmpvaW4oXCIsXCIpK1wiXVwiKyhzP1wiLFwiK3M6XCJcIil9fWZ1bmN0aW9uIGVpKHQsZSl7Zm9yKHZhciBuPTAscj0wO3I8dC5sZW5ndGg7cisrKXt2YXIgaT10W3JdO2lmKDE9PT1pLnR5cGUpe2lmKG5pKGkpfHxpLmlmQ29uZGl0aW9ucyYmaS5pZkNvbmRpdGlvbnMuc29tZShmdW5jdGlvbih0KXtyZXR1cm4gbmkodC5ibG9jayl9KSl7bj0yO2JyZWFrfShlKGkpfHxpLmlmQ29uZGl0aW9ucyYmaS5pZkNvbmRpdGlvbnMuc29tZShmdW5jdGlvbih0KXtyZXR1cm4gZSh0LmJsb2NrKX0pKSYmKG49MSl9fXJldHVybiBufWZ1bmN0aW9uIG5pKHQpe3JldHVybiB2b2lkIDAhPT10LmZvcnx8XCJ0ZW1wbGF0ZVwiPT09dC50YWd8fFwic2xvdFwiPT09dC50YWd9ZnVuY3Rpb24gcmkodCxlKXtyZXR1cm4gMT09PXQudHlwZT9Vcih0LGUpOjM9PT10LnR5cGUmJnQuaXNDb21tZW50P29pKHQpOmlpKHQpfWZ1bmN0aW9uIGlpKHQpe3JldHVyblwiX3YoXCIrKDI9PT10LnR5cGU/dC5leHByZXNzaW9uOnVpKEpTT04uc3RyaW5naWZ5KHQudGV4dCkpKStcIilcIn1mdW5jdGlvbiBvaSh0KXtyZXR1cm5cIl9lKCdcIit0LnRleHQrXCInKVwifWZ1bmN0aW9uIGFpKHQsZSl7dmFyIG49dC5zbG90TmFtZXx8J1wiZGVmYXVsdFwiJyxyPXRpKHQsZSksaT1cIl90KFwiK24rKHI/XCIsXCIrcjpcIlwiKSxvPXQuYXR0cnMmJlwie1wiK3QuYXR0cnMubWFwKGZ1bmN0aW9uKHQpe3JldHVybiBnaSh0Lm5hbWUpK1wiOlwiK3QudmFsdWV9KS5qb2luKFwiLFwiKStcIn1cIixhPXQuYXR0cnNNYXBbXCJ2LWJpbmRcIl07cmV0dXJuIW8mJiFhfHxyfHwoaSs9XCIsbnVsbFwiKSxvJiYoaSs9XCIsXCIrbyksYSYmKGkrPShvP1wiXCI6XCIsbnVsbFwiKStcIixcIithKSxpK1wiKVwifWZ1bmN0aW9uIHNpKHQsZSxuKXt2YXIgcj1lLmlubGluZVRlbXBsYXRlP251bGw6dGkoZSxuLCEwKTtyZXR1cm5cIl9jKFwiK3QrXCIsXCIrV3IoZSxuKSsocj9cIixcIityOlwiXCIpK1wiKVwifWZ1bmN0aW9uIGNpKHQpe2Zvcih2YXIgZT1cIlwiLG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIHI9dFtuXTtlKz0nXCInK3IubmFtZSsnXCI6Jyt1aShyLnZhbHVlKStcIixcIn1yZXR1cm4gZS5zbGljZSgwLC0xKX1mdW5jdGlvbiB1aSh0KXtyZXR1cm4gdC5yZXBsYWNlKC9cXHUyMDI4L2csXCJcXFxcdTIwMjhcIikucmVwbGFjZSgvXFx1MjAyOS9nLFwiXFxcXHUyMDI5XCIpfWZ1bmN0aW9uIGxpKHQsZSl7dHJ5e3JldHVybiBuZXcgRnVuY3Rpb24odCl9Y2F0Y2gobil7cmV0dXJuIGUucHVzaCh7ZXJyOm4sY29kZTp0fSksX319ZnVuY3Rpb24gZmkodCl7dmFyIGU9T2JqZWN0LmNyZWF0ZShudWxsKTtyZXR1cm4gZnVuY3Rpb24obixyLGkpe3ZhciBvPShyPXJ8fHt9KS5kZWxpbWl0ZXJzP1N0cmluZyhyLmRlbGltaXRlcnMpK246bjtpZihlW29dKXJldHVybiBlW29dO3ZhciBhPXQobixyKSxzPXt9LGM9W107cmV0dXJuIHMucmVuZGVyPWxpKGEucmVuZGVyLGMpLHMuc3RhdGljUmVuZGVyRm5zPWEuc3RhdGljUmVuZGVyRm5zLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gbGkodCxjKX0pLGVbb109c319ZnVuY3Rpb24gcGkodCl7aWYodC5vdXRlckhUTUwpcmV0dXJuIHQub3V0ZXJIVE1MO3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuIGUuYXBwZW5kQ2hpbGQodC5jbG9uZU5vZGUoITApKSxlLmlubmVySFRNTH12YXIgZGk9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyx2aT1mKFwic2xvdCxjb21wb25lbnRcIiwhMCksaGk9ZihcImtleSxyZWYsc2xvdCxpc1wiKSxtaT1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LHlpPS8tKFxcdykvZyxnaT12KGZ1bmN0aW9uKHQpe3JldHVybiB0LnJlcGxhY2UoeWksZnVuY3Rpb24odCxlKXtyZXR1cm4gZT9lLnRvVXBwZXJDYXNlKCk6XCJcIn0pfSksX2k9dihmdW5jdGlvbih0KXtyZXR1cm4gdC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSt0LnNsaWNlKDEpfSksYmk9LyhbXi1dKShbQS1aXSkvZywkaT12KGZ1bmN0aW9uKHQpe3JldHVybiB0LnJlcGxhY2UoYmksXCIkMS0kMlwiKS5yZXBsYWNlKGJpLFwiJDEtJDJcIikudG9Mb3dlckNhc2UoKX0pLENpPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4hMX0sd2k9ZnVuY3Rpb24odCl7cmV0dXJuIHR9LHhpPVwiZGF0YS1zZXJ2ZXItcmVuZGVyZWRcIixBaT1bXCJjb21wb25lbnRcIixcImRpcmVjdGl2ZVwiLFwiZmlsdGVyXCJdLGtpPVtcImJlZm9yZUNyZWF0ZVwiLFwiY3JlYXRlZFwiLFwiYmVmb3JlTW91bnRcIixcIm1vdW50ZWRcIixcImJlZm9yZVVwZGF0ZVwiLFwidXBkYXRlZFwiLFwiYmVmb3JlRGVzdHJveVwiLFwiZGVzdHJveWVkXCIsXCJhY3RpdmF0ZWRcIixcImRlYWN0aXZhdGVkXCJdLE9pPXtvcHRpb25NZXJnZVN0cmF0ZWdpZXM6T2JqZWN0LmNyZWF0ZShudWxsKSxzaWxlbnQ6ITEscHJvZHVjdGlvblRpcDohMSxkZXZ0b29sczohMSxwZXJmb3JtYW5jZTohMSxlcnJvckhhbmRsZXI6bnVsbCx3YXJuSGFuZGxlcjpudWxsLGlnbm9yZWRFbGVtZW50czpbXSxrZXlDb2RlczpPYmplY3QuY3JlYXRlKG51bGwpLGlzUmVzZXJ2ZWRUYWc6Q2ksaXNSZXNlcnZlZEF0dHI6Q2ksaXNVbmtub3duRWxlbWVudDpDaSxnZXRUYWdOYW1lc3BhY2U6XyxwYXJzZVBsYXRmb3JtVGFnTmFtZTp3aSxtdXN0VXNlUHJvcDpDaSxfbGlmZWN5Y2xlSG9va3M6a2l9LFNpPU9iamVjdC5mcmVlemUoe30pLFRpPS9bXlxcdy4kXS8sRWk9XyxqaT1cIl9fcHJvdG9fX1wiaW57fSxOaT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93LExpPU5pJiZ3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLElpPUxpJiYvbXNpZXx0cmlkZW50Ly50ZXN0KExpKSxNaT1MaSYmTGkuaW5kZXhPZihcIm1zaWUgOS4wXCIpPjAsRGk9TGkmJkxpLmluZGV4T2YoXCJlZGdlL1wiKT4wLFBpPUxpJiZMaS5pbmRleE9mKFwiYW5kcm9pZFwiKT4wLEZpPUxpJiYvaXBob25lfGlwYWR8aXBvZHxpb3MvLnRlc3QoTGkpLFJpPUxpJiYvY2hyb21lXFwvXFxkKy8udGVzdChMaSkmJiFEaSxIaT17fS53YXRjaCxCaT0hMTtpZihOaSl0cnl7dmFyIFVpPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShVaSxcInBhc3NpdmVcIix7Z2V0OmZ1bmN0aW9uKCl7Qmk9ITB9fSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0LXBhc3NpdmVcIixudWxsLFVpKX1jYXRjaCh0KXt9dmFyIFZpLHppLEtpPWZ1bmN0aW9uKCl7cmV0dXJuIHZvaWQgMD09PVZpJiYoVmk9IU5pJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsJiZcInNlcnZlclwiPT09Z2xvYmFsLnByb2Nlc3MuZW52LlZVRV9FTlYpLFZpfSxKaT1OaSYmd2luZG93Ll9fVlVFX0RFVlRPT0xTX0dMT0JBTF9IT09LX18scWk9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmTyhTeW1ib2wpJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgUmVmbGVjdCYmTyhSZWZsZWN0Lm93bktleXMpLFdpPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe3I9ITE7dmFyIHQ9bi5zbGljZSgwKTtuLmxlbmd0aD0wO2Zvcih2YXIgZT0wO2U8dC5sZW5ndGg7ZSsrKXRbZV0oKX12YXIgZSxuPVtdLHI9ITE7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFByb21pc2UmJk8oUHJvbWlzZSkpe3ZhciBpPVByb21pc2UucmVzb2x2ZSgpLG89ZnVuY3Rpb24odCl7Y29uc29sZS5lcnJvcih0KX07ZT1mdW5jdGlvbigpe2kudGhlbih0KS5jYXRjaChvKSxGaSYmc2V0VGltZW91dChfKX19ZWxzZSBpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgTXV0YXRpb25PYnNlcnZlcnx8IU8oTXV0YXRpb25PYnNlcnZlcikmJlwiW29iamVjdCBNdXRhdGlvbk9ic2VydmVyQ29uc3RydWN0b3JdXCIhPT1NdXRhdGlvbk9ic2VydmVyLnRvU3RyaW5nKCkpZT1mdW5jdGlvbigpe3NldFRpbWVvdXQodCwwKX07ZWxzZXt2YXIgYT0xLHM9bmV3IE11dGF0aW9uT2JzZXJ2ZXIodCksYz1kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcoYSkpO3Mub2JzZXJ2ZShjLHtjaGFyYWN0ZXJEYXRhOiEwfSksZT1mdW5jdGlvbigpe2E9KGErMSklMixjLmRhdGE9U3RyaW5nKGEpfX1yZXR1cm4gZnVuY3Rpb24odCxpKXt2YXIgbztpZihuLnB1c2goZnVuY3Rpb24oKXtpZih0KXRyeXt0LmNhbGwoaSl9Y2F0Y2godCl7ayh0LGksXCJuZXh0VGlja1wiKX1lbHNlIG8mJm8oaSl9KSxyfHwocj0hMCxlKCkpLCF0JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgUHJvbWlzZSlyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24odCxlKXtvPXR9KX19KCk7emk9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFNldCYmTyhTZXQpP1NldDpmdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXt0aGlzLnNldD1PYmplY3QuY3JlYXRlKG51bGwpfXJldHVybiB0LnByb3RvdHlwZS5oYXM9ZnVuY3Rpb24odCl7cmV0dXJuITA9PT10aGlzLnNldFt0XX0sdC5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3RoaXMuc2V0W3RdPSEwfSx0LnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuc2V0PU9iamVjdC5jcmVhdGUobnVsbCl9LHR9KCk7dmFyIEdpPTAsWmk9ZnVuY3Rpb24oKXt0aGlzLmlkPUdpKyssdGhpcy5zdWJzPVtdfTtaaS5wcm90b3R5cGUuYWRkU3ViPWZ1bmN0aW9uKHQpe3RoaXMuc3Vicy5wdXNoKHQpfSxaaS5wcm90b3R5cGUucmVtb3ZlU3ViPWZ1bmN0aW9uKHQpe3AodGhpcy5zdWJzLHQpfSxaaS5wcm90b3R5cGUuZGVwZW5kPWZ1bmN0aW9uKCl7WmkudGFyZ2V0JiZaaS50YXJnZXQuYWRkRGVwKHRoaXMpfSxaaS5wcm90b3R5cGUubm90aWZ5PWZ1bmN0aW9uKCl7Zm9yKHZhciB0PXRoaXMuc3Vicy5zbGljZSgpLGU9MCxuPXQubGVuZ3RoO2U8bjtlKyspdFtlXS51cGRhdGUoKX0sWmkudGFyZ2V0PW51bGw7dmFyIFlpPVtdLFFpPUFycmF5LnByb3RvdHlwZSxYaT1PYmplY3QuY3JlYXRlKFFpKTtbXCJwdXNoXCIsXCJwb3BcIixcInNoaWZ0XCIsXCJ1bnNoaWZ0XCIsXCJzcGxpY2VcIixcInNvcnRcIixcInJldmVyc2VcIl0uZm9yRWFjaChmdW5jdGlvbih0KXt2YXIgZT1RaVt0XTt4KFhpLHQsZnVuY3Rpb24oKXtmb3IodmFyIG49W10scj1hcmd1bWVudHMubGVuZ3RoO3ItLTspbltyXT1hcmd1bWVudHNbcl07dmFyIGksbz1lLmFwcGx5KHRoaXMsbiksYT10aGlzLl9fb2JfXztzd2l0Y2godCl7Y2FzZVwicHVzaFwiOmNhc2VcInVuc2hpZnRcIjppPW47YnJlYWs7Y2FzZVwic3BsaWNlXCI6aT1uLnNsaWNlKDIpfXJldHVybiBpJiZhLm9ic2VydmVBcnJheShpKSxhLmRlcC5ub3RpZnkoKSxvfSl9KTt2YXIgdG89T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoWGkpLGVvPXtzaG91bGRDb252ZXJ0OiEwfSxubz1mdW5jdGlvbih0KXt0aGlzLnZhbHVlPXQsdGhpcy5kZXA9bmV3IFppLHRoaXMudm1Db3VudD0wLHgodCxcIl9fb2JfX1wiLHRoaXMpLEFycmF5LmlzQXJyYXkodCk/KChqaT9FOmopKHQsWGksdG8pLHRoaXMub2JzZXJ2ZUFycmF5KHQpKTp0aGlzLndhbGsodCl9O25vLnByb3RvdHlwZS53YWxrPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZT1PYmplY3Qua2V5cyh0KSxuPTA7bjxlLmxlbmd0aDtuKyspTCh0LGVbbl0sdFtlW25dXSl9LG5vLnByb3RvdHlwZS5vYnNlcnZlQXJyYXk9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTAsbj10Lmxlbmd0aDtlPG47ZSsrKU4odFtlXSl9O3ZhciBybz1PaS5vcHRpb25NZXJnZVN0cmF0ZWdpZXM7cm8uZGF0YT1mdW5jdGlvbih0LGUsbil7cmV0dXJuIG4/Rih0LGUsbik6ZSYmXCJmdW5jdGlvblwiIT10eXBlb2YgZT90OkYuY2FsbCh0aGlzLHQsZSl9LGtpLmZvckVhY2goZnVuY3Rpb24odCl7cm9bdF09Un0pLEFpLmZvckVhY2goZnVuY3Rpb24odCl7cm9bdCtcInNcIl09SH0pLHJvLndhdGNoPWZ1bmN0aW9uKHQsZSl7aWYodD09PUhpJiYodD12b2lkIDApLGU9PT1IaSYmKGU9dm9pZCAwKSwhZSlyZXR1cm4gT2JqZWN0LmNyZWF0ZSh0fHxudWxsKTtpZighdClyZXR1cm4gZTt2YXIgbj17fTt5KG4sdCk7Zm9yKHZhciByIGluIGUpe3ZhciBpPW5bcl0sbz1lW3JdO2kmJiFBcnJheS5pc0FycmF5KGkpJiYoaT1baV0pLG5bcl09aT9pLmNvbmNhdChvKTpBcnJheS5pc0FycmF5KG8pP286W29dfXJldHVybiBufSxyby5wcm9wcz1yby5tZXRob2RzPXJvLmluamVjdD1yby5jb21wdXRlZD1mdW5jdGlvbih0LGUpe2lmKCFlKXJldHVybiBPYmplY3QuY3JlYXRlKHR8fG51bGwpO2lmKCF0KXJldHVybiBlO3ZhciBuPU9iamVjdC5jcmVhdGUobnVsbCk7cmV0dXJuIHkobix0KSx5KG4sZSksbn0scm8ucHJvdmlkZT1GO3ZhciBpbz1mdW5jdGlvbih0LGUpe3JldHVybiB2b2lkIDA9PT1lP3Q6ZX0sb289ZnVuY3Rpb24odCxlLG4scixpLG8sYSxzKXt0aGlzLnRhZz10LHRoaXMuZGF0YT1lLHRoaXMuY2hpbGRyZW49bix0aGlzLnRleHQ9cix0aGlzLmVsbT1pLHRoaXMubnM9dm9pZCAwLHRoaXMuY29udGV4dD1vLHRoaXMuZnVuY3Rpb25hbENvbnRleHQ9dm9pZCAwLHRoaXMua2V5PWUmJmUua2V5LHRoaXMuY29tcG9uZW50T3B0aW9ucz1hLHRoaXMuY29tcG9uZW50SW5zdGFuY2U9dm9pZCAwLHRoaXMucGFyZW50PXZvaWQgMCx0aGlzLnJhdz0hMSx0aGlzLmlzU3RhdGljPSExLHRoaXMuaXNSb290SW5zZXJ0PSEwLHRoaXMuaXNDb21tZW50PSExLHRoaXMuaXNDbG9uZWQ9ITEsdGhpcy5pc09uY2U9ITEsdGhpcy5hc3luY0ZhY3Rvcnk9cyx0aGlzLmFzeW5jTWV0YT12b2lkIDAsdGhpcy5pc0FzeW5jUGxhY2Vob2xkZXI9ITF9LGFvPXtjaGlsZDp7fX07YW8uY2hpbGQuZ2V0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29tcG9uZW50SW5zdGFuY2V9LE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG9vLnByb3RvdHlwZSxhbyk7dmFyIHNvLGNvPWZ1bmN0aW9uKHQpe3ZvaWQgMD09PXQmJih0PVwiXCIpO3ZhciBlPW5ldyBvbztyZXR1cm4gZS50ZXh0PXQsZS5pc0NvbW1lbnQ9ITAsZX0sdW89dihmdW5jdGlvbih0KXt2YXIgZT1cIiZcIj09PXQuY2hhckF0KDApLG49XCJ+XCI9PT0odD1lP3Quc2xpY2UoMSk6dCkuY2hhckF0KDApLHI9XCIhXCI9PT0odD1uP3Quc2xpY2UoMSk6dCkuY2hhckF0KDApO3JldHVybiB0PXI/dC5zbGljZSgxKTp0LHtuYW1lOnQsb25jZTpuLGNhcHR1cmU6cixwYXNzaXZlOmV9fSksbG89bnVsbCxmbz1bXSxwbz1bXSx2bz17fSxobz0hMSxtbz0hMSx5bz0wLGdvPTAsX289ZnVuY3Rpb24odCxlLG4scil7dGhpcy52bT10LHQuX3dhdGNoZXJzLnB1c2godGhpcykscj8odGhpcy5kZWVwPSEhci5kZWVwLHRoaXMudXNlcj0hIXIudXNlcix0aGlzLmxhenk9ISFyLmxhenksdGhpcy5zeW5jPSEhci5zeW5jKTp0aGlzLmRlZXA9dGhpcy51c2VyPXRoaXMubGF6eT10aGlzLnN5bmM9ITEsdGhpcy5jYj1uLHRoaXMuaWQ9Kytnbyx0aGlzLmFjdGl2ZT0hMCx0aGlzLmRpcnR5PXRoaXMubGF6eSx0aGlzLmRlcHM9W10sdGhpcy5uZXdEZXBzPVtdLHRoaXMuZGVwSWRzPW5ldyB6aSx0aGlzLm5ld0RlcElkcz1uZXcgemksdGhpcy5leHByZXNzaW9uPVwiXCIsXCJmdW5jdGlvblwiPT10eXBlb2YgZT90aGlzLmdldHRlcj1lOih0aGlzLmdldHRlcj1BKGUpLHRoaXMuZ2V0dGVyfHwodGhpcy5nZXR0ZXI9ZnVuY3Rpb24oKXt9KSksdGhpcy52YWx1ZT10aGlzLmxhenk/dm9pZCAwOnRoaXMuZ2V0KCl9O19vLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oKXtTKHRoaXMpO3ZhciB0LGU9dGhpcy52bTt0cnl7dD10aGlzLmdldHRlci5jYWxsKGUsZSl9Y2F0Y2godCl7aWYoIXRoaXMudXNlcil0aHJvdyB0O2sodCxlLCdnZXR0ZXIgZm9yIHdhdGNoZXIgXCInK3RoaXMuZXhwcmVzc2lvbisnXCInKX1maW5hbGx5e3RoaXMuZGVlcCYmTnQodCksVCgpLHRoaXMuY2xlYW51cERlcHMoKX1yZXR1cm4gdH0sX28ucHJvdG90eXBlLmFkZERlcD1mdW5jdGlvbih0KXt2YXIgZT10LmlkO3RoaXMubmV3RGVwSWRzLmhhcyhlKXx8KHRoaXMubmV3RGVwSWRzLmFkZChlKSx0aGlzLm5ld0RlcHMucHVzaCh0KSx0aGlzLmRlcElkcy5oYXMoZSl8fHQuYWRkU3ViKHRoaXMpKX0sX28ucHJvdG90eXBlLmNsZWFudXBEZXBzPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PXRoaXMsZT10aGlzLmRlcHMubGVuZ3RoO2UtLTspe3ZhciBuPXQuZGVwc1tlXTt0Lm5ld0RlcElkcy5oYXMobi5pZCl8fG4ucmVtb3ZlU3ViKHQpfXZhciByPXRoaXMuZGVwSWRzO3RoaXMuZGVwSWRzPXRoaXMubmV3RGVwSWRzLHRoaXMubmV3RGVwSWRzPXIsdGhpcy5uZXdEZXBJZHMuY2xlYXIoKSxyPXRoaXMuZGVwcyx0aGlzLmRlcHM9dGhpcy5uZXdEZXBzLHRoaXMubmV3RGVwcz1yLHRoaXMubmV3RGVwcy5sZW5ndGg9MH0sX28ucHJvdG90eXBlLnVwZGF0ZT1mdW5jdGlvbigpe3RoaXMubGF6eT90aGlzLmRpcnR5PSEwOnRoaXMuc3luYz90aGlzLnJ1bigpOmp0KHRoaXMpfSxfby5wcm90b3R5cGUucnVuPWZ1bmN0aW9uKCl7aWYodGhpcy5hY3RpdmUpe3ZhciB0PXRoaXMuZ2V0KCk7aWYodCE9PXRoaXMudmFsdWV8fG8odCl8fHRoaXMuZGVlcCl7dmFyIGU9dGhpcy52YWx1ZTtpZih0aGlzLnZhbHVlPXQsdGhpcy51c2VyKXRyeXt0aGlzLmNiLmNhbGwodGhpcy52bSx0LGUpfWNhdGNoKHQpe2sodCx0aGlzLnZtLCdjYWxsYmFjayBmb3Igd2F0Y2hlciBcIicrdGhpcy5leHByZXNzaW9uKydcIicpfWVsc2UgdGhpcy5jYi5jYWxsKHRoaXMudm0sdCxlKX19fSxfby5wcm90b3R5cGUuZXZhbHVhdGU9ZnVuY3Rpb24oKXt0aGlzLnZhbHVlPXRoaXMuZ2V0KCksdGhpcy5kaXJ0eT0hMX0sX28ucHJvdG90eXBlLmRlcGVuZD1mdW5jdGlvbigpe2Zvcih2YXIgdD10aGlzLGU9dGhpcy5kZXBzLmxlbmd0aDtlLS07KXQuZGVwc1tlXS5kZXBlbmQoKX0sX28ucHJvdG90eXBlLnRlYXJkb3duPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztpZih0aGlzLmFjdGl2ZSl7dGhpcy52bS5faXNCZWluZ0Rlc3Ryb3llZHx8cCh0aGlzLnZtLl93YXRjaGVycyx0aGlzKTtmb3IodmFyIGU9dGhpcy5kZXBzLmxlbmd0aDtlLS07KXQuZGVwc1tlXS5yZW1vdmVTdWIodCk7dGhpcy5hY3RpdmU9ITF9fTt2YXIgYm89bmV3IHppLCRvPXtlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCxnZXQ6XyxzZXQ6X30sQ289e2xhenk6ITB9LHdvPXtpbml0OmZ1bmN0aW9uKHQsZSxuLHIpe2lmKCF0LmNvbXBvbmVudEluc3RhbmNlfHx0LmNvbXBvbmVudEluc3RhbmNlLl9pc0Rlc3Ryb3llZCkodC5jb21wb25lbnRJbnN0YW5jZT1ZdCh0LGxvLG4scikpLiRtb3VudChlP3QuZWxtOnZvaWQgMCxlKTtlbHNlIGlmKHQuZGF0YS5rZWVwQWxpdmUpe3ZhciBpPXQ7d28ucHJlcGF0Y2goaSxpKX19LHByZXBhdGNoOmZ1bmN0aW9uKHQsZSl7dmFyIG49ZS5jb21wb25lbnRPcHRpb25zOyR0KGUuY29tcG9uZW50SW5zdGFuY2U9dC5jb21wb25lbnRJbnN0YW5jZSxuLnByb3BzRGF0YSxuLmxpc3RlbmVycyxlLG4uY2hpbGRyZW4pfSxpbnNlcnQ6ZnVuY3Rpb24odCl7dmFyIGU9dC5jb250ZXh0LG49dC5jb21wb25lbnRJbnN0YW5jZTtuLl9pc01vdW50ZWR8fChuLl9pc01vdW50ZWQ9ITAsQXQobixcIm1vdW50ZWRcIikpLHQuZGF0YS5rZWVwQWxpdmUmJihlLl9pc01vdW50ZWQ/VHQobik6d3QobiwhMCkpfSxkZXN0cm95OmZ1bmN0aW9uKHQpe3ZhciBlPXQuY29tcG9uZW50SW5zdGFuY2U7ZS5faXNEZXN0cm95ZWR8fCh0LmRhdGEua2VlcEFsaXZlP3h0KGUsITApOmUuJGRlc3Ryb3koKSl9fSx4bz1PYmplY3Qua2V5cyh3byksQW89MSxrbz0yLE9vPTA7IWZ1bmN0aW9uKHQpe3QucHJvdG90eXBlLl9pbml0PWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXM7ZS5fdWlkPU9vKyssZS5faXNWdWU9ITAsdCYmdC5faXNDb21wb25lbnQ/aGUoZSx0KTplLiRvcHRpb25zPXoobWUoZS5jb25zdHJ1Y3RvciksdHx8e30sZSksZS5fcmVuZGVyUHJveHk9ZSxlLl9zZWxmPWUsX3QoZSkscHQoZSksdmUoZSksQXQoZSxcImJlZm9yZUNyZWF0ZVwiKSxKdChlKSxNdChlKSxLdChlKSxBdChlLFwiY3JlYXRlZFwiKSxlLiRvcHRpb25zLmVsJiZlLiRtb3VudChlLiRvcHRpb25zLmVsKX19KF9lKSxmdW5jdGlvbih0KXt2YXIgZT17fTtlLmdldD1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9kYXRhfTt2YXIgbj17fTtuLmdldD1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9wcm9wc30sT2JqZWN0LmRlZmluZVByb3BlcnR5KHQucHJvdG90eXBlLFwiJGRhdGFcIixlKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodC5wcm90b3R5cGUsXCIkcHJvcHNcIixuKSx0LnByb3RvdHlwZS4kc2V0PUksdC5wcm90b3R5cGUuJGRlbGV0ZT1NLHQucHJvdG90eXBlLiR3YXRjaD1mdW5jdGlvbih0LGUsbil7dmFyIHI9dGhpcztpZihhKGUpKXJldHVybiB6dChyLHQsZSxuKTsobj1ufHx7fSkudXNlcj0hMDt2YXIgaT1uZXcgX28ocix0LGUsbik7cmV0dXJuIG4uaW1tZWRpYXRlJiZlLmNhbGwocixpLnZhbHVlKSxmdW5jdGlvbigpe2kudGVhcmRvd24oKX19fShfZSksZnVuY3Rpb24odCl7dmFyIGU9L15ob29rOi87dC5wcm90b3R5cGUuJG9uPWZ1bmN0aW9uKHQsbil7dmFyIHI9dGhpcyxpPXRoaXM7aWYoQXJyYXkuaXNBcnJheSh0KSlmb3IodmFyIG89MCxhPXQubGVuZ3RoO288YTtvKyspci4kb24odFtvXSxuKTtlbHNlKGkuX2V2ZW50c1t0XXx8KGkuX2V2ZW50c1t0XT1bXSkpLnB1c2gobiksZS50ZXN0KHQpJiYoaS5faGFzSG9va0V2ZW50PSEwKTtyZXR1cm4gaX0sdC5wcm90b3R5cGUuJG9uY2U9ZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBuKCl7ci4kb2ZmKHQsbiksZS5hcHBseShyLGFyZ3VtZW50cyl9dmFyIHI9dGhpcztyZXR1cm4gbi5mbj1lLHIuJG9uKHQsbikscn0sdC5wcm90b3R5cGUuJG9mZj1mdW5jdGlvbih0LGUpe3ZhciBuPXRoaXMscj10aGlzO2lmKCFhcmd1bWVudHMubGVuZ3RoKXJldHVybiByLl9ldmVudHM9T2JqZWN0LmNyZWF0ZShudWxsKSxyO2lmKEFycmF5LmlzQXJyYXkodCkpe2Zvcih2YXIgaT0wLG89dC5sZW5ndGg7aTxvO2krKyluLiRvZmYodFtpXSxlKTtyZXR1cm4gcn12YXIgYT1yLl9ldmVudHNbdF07aWYoIWEpcmV0dXJuIHI7aWYoMT09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIHIuX2V2ZW50c1t0XT1udWxsLHI7Zm9yKHZhciBzLGM9YS5sZW5ndGg7Yy0tOylpZigocz1hW2NdKT09PWV8fHMuZm49PT1lKXthLnNwbGljZShjLDEpO2JyZWFrfXJldHVybiByfSx0LnByb3RvdHlwZS4kZW1pdD1mdW5jdGlvbih0KXt2YXIgZT10aGlzLG49ZS5fZXZlbnRzW3RdO2lmKG4pe249bi5sZW5ndGg+MT9tKG4pOm47Zm9yKHZhciByPW0oYXJndW1lbnRzLDEpLGk9MCxvPW4ubGVuZ3RoO2k8bztpKyspdHJ5e25baV0uYXBwbHkoZSxyKX1jYXRjaChuKXtrKG4sZSwnZXZlbnQgaGFuZGxlciBmb3IgXCInK3QrJ1wiJyl9fXJldHVybiBlfX0oX2UpLGZ1bmN0aW9uKHQpe3QucHJvdG90eXBlLl91cGRhdGU9ZnVuY3Rpb24odCxlKXt2YXIgbj10aGlzO24uX2lzTW91bnRlZCYmQXQobixcImJlZm9yZVVwZGF0ZVwiKTt2YXIgcj1uLiRlbCxpPW4uX3Zub2RlLG89bG87bG89bixuLl92bm9kZT10LGk/bi4kZWw9bi5fX3BhdGNoX18oaSx0KToobi4kZWw9bi5fX3BhdGNoX18obi4kZWwsdCxlLCExLG4uJG9wdGlvbnMuX3BhcmVudEVsbSxuLiRvcHRpb25zLl9yZWZFbG0pLG4uJG9wdGlvbnMuX3BhcmVudEVsbT1uLiRvcHRpb25zLl9yZWZFbG09bnVsbCksbG89byxyJiYoci5fX3Z1ZV9fPW51bGwpLG4uJGVsJiYobi4kZWwuX192dWVfXz1uKSxuLiR2bm9kZSYmbi4kcGFyZW50JiZuLiR2bm9kZT09PW4uJHBhcmVudC5fdm5vZGUmJihuLiRwYXJlbnQuJGVsPW4uJGVsKX0sdC5wcm90b3R5cGUuJGZvcmNlVXBkYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0Ll93YXRjaGVyJiZ0Ll93YXRjaGVyLnVwZGF0ZSgpfSx0LnByb3RvdHlwZS4kZGVzdHJveT1mdW5jdGlvbigpe3ZhciB0PXRoaXM7aWYoIXQuX2lzQmVpbmdEZXN0cm95ZWQpe0F0KHQsXCJiZWZvcmVEZXN0cm95XCIpLHQuX2lzQmVpbmdEZXN0cm95ZWQ9ITA7dmFyIGU9dC4kcGFyZW50OyFlfHxlLl9pc0JlaW5nRGVzdHJveWVkfHx0LiRvcHRpb25zLmFic3RyYWN0fHxwKGUuJGNoaWxkcmVuLHQpLHQuX3dhdGNoZXImJnQuX3dhdGNoZXIudGVhcmRvd24oKTtmb3IodmFyIG49dC5fd2F0Y2hlcnMubGVuZ3RoO24tLTspdC5fd2F0Y2hlcnNbbl0udGVhcmRvd24oKTt0Ll9kYXRhLl9fb2JfXyYmdC5fZGF0YS5fX29iX18udm1Db3VudC0tLHQuX2lzRGVzdHJveWVkPSEwLHQuX19wYXRjaF9fKHQuX3Zub2RlLG51bGwpLEF0KHQsXCJkZXN0cm95ZWRcIiksdC4kb2ZmKCksdC4kZWwmJih0LiRlbC5fX3Z1ZV9fPW51bGwpfX19KF9lKSxmdW5jdGlvbih0KXt0LnByb3RvdHlwZS4kbmV4dFRpY2s9ZnVuY3Rpb24odCl7cmV0dXJuIFdpKHQsdGhpcyl9LHQucHJvdG90eXBlLl9yZW5kZXI9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLGU9dC4kb3B0aW9ucyxuPWUucmVuZGVyLHI9ZS5zdGF0aWNSZW5kZXJGbnMsaT1lLl9wYXJlbnRWbm9kZTtpZih0Ll9pc01vdW50ZWQpZm9yKHZhciBvIGluIHQuJHNsb3RzKXQuJHNsb3RzW29dPVEodC4kc2xvdHNbb10pO3QuJHNjb3BlZFNsb3RzPWkmJmkuZGF0YS5zY29wZWRTbG90c3x8U2ksciYmIXQuX3N0YXRpY1RyZWVzJiYodC5fc3RhdGljVHJlZXM9W10pLHQuJHZub2RlPWk7dmFyIGE7dHJ5e2E9bi5jYWxsKHQuX3JlbmRlclByb3h5LHQuJGNyZWF0ZUVsZW1lbnQpfWNhdGNoKGUpe2soZSx0LFwicmVuZGVyIGZ1bmN0aW9uXCIpLGE9dC5fdm5vZGV9cmV0dXJuIGEgaW5zdGFuY2VvZiBvb3x8KGE9Y28oKSksYS5wYXJlbnQ9aSxhfSx0LnByb3RvdHlwZS5fbz1sZSx0LnByb3RvdHlwZS5fbj1sLHQucHJvdG90eXBlLl9zPXUsdC5wcm90b3R5cGUuX2w9aWUsdC5wcm90b3R5cGUuX3Q9b2UsdC5wcm90b3R5cGUuX3E9Yix0LnByb3RvdHlwZS5faT0kLHQucHJvdG90eXBlLl9tPXVlLHQucHJvdG90eXBlLl9mPWFlLHQucHJvdG90eXBlLl9rPXNlLHQucHJvdG90eXBlLl9iPWNlLHQucHJvdG90eXBlLl92PVosdC5wcm90b3R5cGUuX2U9Y28sdC5wcm90b3R5cGUuX3U9Z3QsdC5wcm90b3R5cGUuX2c9ZGV9KF9lKTt2YXIgU289W1N0cmluZyxSZWdFeHAsQXJyYXldLFRvPXtLZWVwQWxpdmU6e25hbWU6XCJrZWVwLWFsaXZlXCIsYWJzdHJhY3Q6ITAscHJvcHM6e2luY2x1ZGU6U28sZXhjbHVkZTpTb30sY3JlYXRlZDpmdW5jdGlvbigpe3RoaXMuY2FjaGU9T2JqZWN0LmNyZWF0ZShudWxsKX0sZGVzdHJveWVkOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcztmb3IodmFyIGUgaW4gdC5jYWNoZSlUZSh0LmNhY2hlW2VdKX0sd2F0Y2g6e2luY2x1ZGU6ZnVuY3Rpb24odCl7U2UodGhpcy5jYWNoZSx0aGlzLl92bm9kZSxmdW5jdGlvbihlKXtyZXR1cm4gT2UodCxlKX0pfSxleGNsdWRlOmZ1bmN0aW9uKHQpe1NlKHRoaXMuY2FjaGUsdGhpcy5fdm5vZGUsZnVuY3Rpb24oZSl7cmV0dXJuIU9lKHQsZSl9KX19LHJlbmRlcjpmdW5jdGlvbigpe3ZhciB0PWZ0KHRoaXMuJHNsb3RzLmRlZmF1bHQpLGU9dCYmdC5jb21wb25lbnRPcHRpb25zO2lmKGUpe3ZhciBuPWtlKGUpO2lmKG4mJih0aGlzLmluY2x1ZGUmJiFPZSh0aGlzLmluY2x1ZGUsbil8fHRoaXMuZXhjbHVkZSYmT2UodGhpcy5leGNsdWRlLG4pKSlyZXR1cm4gdDt2YXIgcj1udWxsPT10LmtleT9lLkN0b3IuY2lkKyhlLnRhZz9cIjo6XCIrZS50YWc6XCJcIik6dC5rZXk7dGhpcy5jYWNoZVtyXT90LmNvbXBvbmVudEluc3RhbmNlPXRoaXMuY2FjaGVbcl0uY29tcG9uZW50SW5zdGFuY2U6dGhpcy5jYWNoZVtyXT10LHQuZGF0YS5rZWVwQWxpdmU9ITB9cmV0dXJuIHR9fX07IWZ1bmN0aW9uKHQpe3ZhciBlPXt9O2UuZ2V0PWZ1bmN0aW9uKCl7cmV0dXJuIE9pfSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcImNvbmZpZ1wiLGUpLHQudXRpbD17d2FybjpFaSxleHRlbmQ6eSxtZXJnZU9wdGlvbnM6eixkZWZpbmVSZWFjdGl2ZTpMfSx0LnNldD1JLHQuZGVsZXRlPU0sdC5uZXh0VGljaz1XaSx0Lm9wdGlvbnM9T2JqZWN0LmNyZWF0ZShudWxsKSxBaS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3Qub3B0aW9uc1tlK1wic1wiXT1PYmplY3QuY3JlYXRlKG51bGwpfSksdC5vcHRpb25zLl9iYXNlPXQseSh0Lm9wdGlvbnMuY29tcG9uZW50cyxUbyksYmUodCksJGUodCksQ2UodCksQWUodCl9KF9lKSxPYmplY3QuZGVmaW5lUHJvcGVydHkoX2UucHJvdG90eXBlLFwiJGlzU2VydmVyXCIse2dldDpLaX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfZS5wcm90b3R5cGUsXCIkc3NyQ29udGV4dFwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR9fSksX2UudmVyc2lvbj1cIjIuNC4wXCI7dmFyIEVvLGpvLE5vLExvLElvLE1vLERvLFBvLEZvLFJvPWYoXCJzdHlsZSxjbGFzc1wiKSxIbz1mKFwiaW5wdXQsdGV4dGFyZWEsb3B0aW9uLHNlbGVjdFwiKSxCbz1mdW5jdGlvbih0LGUsbil7cmV0dXJuXCJ2YWx1ZVwiPT09biYmSG8odCkmJlwiYnV0dG9uXCIhPT1lfHxcInNlbGVjdGVkXCI9PT1uJiZcIm9wdGlvblwiPT09dHx8XCJjaGVja2VkXCI9PT1uJiZcImlucHV0XCI9PT10fHxcIm11dGVkXCI9PT1uJiZcInZpZGVvXCI9PT10fSxVbz1mKFwiY29udGVudGVkaXRhYmxlLGRyYWdnYWJsZSxzcGVsbGNoZWNrXCIpLFZvPWYoXCJhbGxvd2Z1bGxzY3JlZW4sYXN5bmMsYXV0b2ZvY3VzLGF1dG9wbGF5LGNoZWNrZWQsY29tcGFjdCxjb250cm9scyxkZWNsYXJlLGRlZmF1bHQsZGVmYXVsdGNoZWNrZWQsZGVmYXVsdG11dGVkLGRlZmF1bHRzZWxlY3RlZCxkZWZlcixkaXNhYmxlZCxlbmFibGVkLGZvcm1ub3ZhbGlkYXRlLGhpZGRlbixpbmRldGVybWluYXRlLGluZXJ0LGlzbWFwLGl0ZW1zY29wZSxsb29wLG11bHRpcGxlLG11dGVkLG5vaHJlZixub3Jlc2l6ZSxub3NoYWRlLG5vdmFsaWRhdGUsbm93cmFwLG9wZW4scGF1c2VvbmV4aXQscmVhZG9ubHkscmVxdWlyZWQscmV2ZXJzZWQsc2NvcGVkLHNlYW1sZXNzLHNlbGVjdGVkLHNvcnRhYmxlLHRyYW5zbGF0ZSx0cnVlc3BlZWQsdHlwZW11c3RtYXRjaCx2aXNpYmxlXCIpLHpvPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLEtvPWZ1bmN0aW9uKHQpe3JldHVyblwiOlwiPT09dC5jaGFyQXQoNSkmJlwieGxpbmtcIj09PXQuc2xpY2UoMCw1KX0sSm89ZnVuY3Rpb24odCl7cmV0dXJuIEtvKHQpP3Quc2xpY2UoNix0Lmxlbmd0aCk6XCJcIn0scW89ZnVuY3Rpb24odCl7cmV0dXJuIG51bGw9PXR8fCExPT09dH0sV289e3N2ZzpcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsbWF0aDpcImh0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUxcIn0sR289ZihcImh0bWwsYm9keSxiYXNlLGhlYWQsbGluayxtZXRhLHN0eWxlLHRpdGxlLGFkZHJlc3MsYXJ0aWNsZSxhc2lkZSxmb290ZXIsaGVhZGVyLGgxLGgyLGgzLGg0LGg1LGg2LGhncm91cCxuYXYsc2VjdGlvbixkaXYsZGQsZGwsZHQsZmlnY2FwdGlvbixmaWd1cmUscGljdHVyZSxocixpbWcsbGksbWFpbixvbCxwLHByZSx1bCxhLGIsYWJicixiZGksYmRvLGJyLGNpdGUsY29kZSxkYXRhLGRmbixlbSxpLGtiZCxtYXJrLHEscnAscnQscnRjLHJ1YnkscyxzYW1wLHNtYWxsLHNwYW4sc3Ryb25nLHN1YixzdXAsdGltZSx1LHZhcix3YnIsYXJlYSxhdWRpbyxtYXAsdHJhY2ssdmlkZW8sZW1iZWQsb2JqZWN0LHBhcmFtLHNvdXJjZSxjYW52YXMsc2NyaXB0LG5vc2NyaXB0LGRlbCxpbnMsY2FwdGlvbixjb2wsY29sZ3JvdXAsdGFibGUsdGhlYWQsdGJvZHksdGQsdGgsdHIsYnV0dG9uLGRhdGFsaXN0LGZpZWxkc2V0LGZvcm0saW5wdXQsbGFiZWwsbGVnZW5kLG1ldGVyLG9wdGdyb3VwLG9wdGlvbixvdXRwdXQscHJvZ3Jlc3Msc2VsZWN0LHRleHRhcmVhLGRldGFpbHMsZGlhbG9nLG1lbnUsbWVudWl0ZW0sc3VtbWFyeSxjb250ZW50LGVsZW1lbnQsc2hhZG93LHRlbXBsYXRlLGJsb2NrcXVvdGUsaWZyYW1lLHRmb290XCIpLFpvPWYoXCJzdmcsYW5pbWF0ZSxjaXJjbGUsY2xpcHBhdGgsY3Vyc29yLGRlZnMsZGVzYyxlbGxpcHNlLGZpbHRlcixmb250LWZhY2UsZm9yZWlnbk9iamVjdCxnLGdseXBoLGltYWdlLGxpbmUsbWFya2VyLG1hc2ssbWlzc2luZy1nbHlwaCxwYXRoLHBhdHRlcm4scG9seWdvbixwb2x5bGluZSxyZWN0LHN3aXRjaCxzeW1ib2wsdGV4dCx0ZXh0cGF0aCx0c3Bhbix1c2Usdmlld1wiLCEwKSxZbz1mdW5jdGlvbih0KXtyZXR1cm4gR28odCl8fFpvKHQpfSxRbz1PYmplY3QuY3JlYXRlKG51bGwpLFhvPU9iamVjdC5mcmVlemUoe2NyZWF0ZUVsZW1lbnQ6ZnVuY3Rpb24odCxlKXt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KHQpO3JldHVyblwic2VsZWN0XCIhPT10P246KGUuZGF0YSYmZS5kYXRhLmF0dHJzJiZ2b2lkIDAhPT1lLmRhdGEuYXR0cnMubXVsdGlwbGUmJm4uc2V0QXR0cmlidXRlKFwibXVsdGlwbGVcIixcIm11bHRpcGxlXCIpLG4pfSxjcmVhdGVFbGVtZW50TlM6ZnVuY3Rpb24odCxlKXtyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFdvW3RdLGUpfSxjcmVhdGVUZXh0Tm9kZTpmdW5jdGlvbih0KXtyZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodCl9LGNyZWF0ZUNvbW1lbnQ6ZnVuY3Rpb24odCl7cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQodCl9LGluc2VydEJlZm9yZTpmdW5jdGlvbih0LGUsbil7dC5pbnNlcnRCZWZvcmUoZSxuKX0scmVtb3ZlQ2hpbGQ6ZnVuY3Rpb24odCxlKXt0LnJlbW92ZUNoaWxkKGUpfSxhcHBlbmRDaGlsZDpmdW5jdGlvbih0LGUpe3QuYXBwZW5kQ2hpbGQoZSl9LHBhcmVudE5vZGU6ZnVuY3Rpb24odCl7cmV0dXJuIHQucGFyZW50Tm9kZX0sbmV4dFNpYmxpbmc6ZnVuY3Rpb24odCl7cmV0dXJuIHQubmV4dFNpYmxpbmd9LHRhZ05hbWU6ZnVuY3Rpb24odCl7cmV0dXJuIHQudGFnTmFtZX0sc2V0VGV4dENvbnRlbnQ6ZnVuY3Rpb24odCxlKXt0LnRleHRDb250ZW50PWV9LHNldEF0dHJpYnV0ZTpmdW5jdGlvbih0LGUsbil7dC5zZXRBdHRyaWJ1dGUoZSxuKX19KSx0YT17Y3JlYXRlOmZ1bmN0aW9uKHQsZSl7UmUoZSl9LHVwZGF0ZTpmdW5jdGlvbih0LGUpe3QuZGF0YS5yZWYhPT1lLmRhdGEucmVmJiYoUmUodCwhMCksUmUoZSkpfSxkZXN0cm95OmZ1bmN0aW9uKHQpe1JlKHQsITApfX0sZWE9bmV3IG9vKFwiXCIse30sW10pLG5hPVtcImNyZWF0ZVwiLFwiYWN0aXZhdGVcIixcInVwZGF0ZVwiLFwicmVtb3ZlXCIsXCJkZXN0cm95XCJdLHJhPXtjcmVhdGU6VmUsdXBkYXRlOlZlLGRlc3Ryb3k6ZnVuY3Rpb24odCl7VmUodCxlYSl9fSxpYT1PYmplY3QuY3JlYXRlKG51bGwpLG9hPVt0YSxyYV0sYWE9e2NyZWF0ZTpXZSx1cGRhdGU6V2V9LHNhPXtjcmVhdGU6WmUsdXBkYXRlOlplfSxjYT0vW1xcdykuK1xcLV8kXFxdXS8sdWE9XCJfX3JcIixsYT1cIl9fY1wiLGZhPXtjcmVhdGU6d24sdXBkYXRlOndufSxwYT17Y3JlYXRlOnhuLHVwZGF0ZTp4bn0sZGE9dihmdW5jdGlvbih0KXt2YXIgZT17fSxuPS87KD8hW14oXSpcXCkpL2cscj0vOiguKykvO3JldHVybiB0LnNwbGl0KG4pLmZvckVhY2goZnVuY3Rpb24odCl7aWYodCl7dmFyIG49dC5zcGxpdChyKTtuLmxlbmd0aD4xJiYoZVtuWzBdLnRyaW0oKV09blsxXS50cmltKCkpfX0pLGV9KSx2YT0vXi0tLyxoYT0vXFxzKiFpbXBvcnRhbnQkLyxtYT1mdW5jdGlvbih0LGUsbil7aWYodmEudGVzdChlKSl0LnN0eWxlLnNldFByb3BlcnR5KGUsbik7ZWxzZSBpZihoYS50ZXN0KG4pKXQuc3R5bGUuc2V0UHJvcGVydHkoZSxuLnJlcGxhY2UoaGEsXCJcIiksXCJpbXBvcnRhbnRcIik7ZWxzZXt2YXIgcj1nYShlKTtpZihBcnJheS5pc0FycmF5KG4pKWZvcih2YXIgaT0wLG89bi5sZW5ndGg7aTxvO2krKyl0LnN0eWxlW3JdPW5baV07ZWxzZSB0LnN0eWxlW3JdPW59fSx5YT1bXCJXZWJraXRcIixcIk1velwiLFwibXNcIl0sZ2E9dihmdW5jdGlvbih0KXtpZihGbz1Gb3x8ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKS5zdHlsZSxcImZpbHRlclwiIT09KHQ9Z2kodCkpJiZ0IGluIEZvKXJldHVybiB0O2Zvcih2YXIgZT10LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK3Quc2xpY2UoMSksbj0wO248eWEubGVuZ3RoO24rKyl7dmFyIHI9eWFbbl0rZTtpZihyIGluIEZvKXJldHVybiByfX0pLF9hPXtjcmVhdGU6am4sdXBkYXRlOmpufSxiYT12KGZ1bmN0aW9uKHQpe3JldHVybntlbnRlckNsYXNzOnQrXCItZW50ZXJcIixlbnRlclRvQ2xhc3M6dCtcIi1lbnRlci10b1wiLGVudGVyQWN0aXZlQ2xhc3M6dCtcIi1lbnRlci1hY3RpdmVcIixsZWF2ZUNsYXNzOnQrXCItbGVhdmVcIixsZWF2ZVRvQ2xhc3M6dCtcIi1sZWF2ZS10b1wiLGxlYXZlQWN0aXZlQ2xhc3M6dCtcIi1sZWF2ZS1hY3RpdmVcIn19KSwkYT1OaSYmIU1pLENhPVwidHJhbnNpdGlvblwiLHdhPVwiYW5pbWF0aW9uXCIseGE9XCJ0cmFuc2l0aW9uXCIsQWE9XCJ0cmFuc2l0aW9uZW5kXCIsa2E9XCJhbmltYXRpb25cIixPYT1cImFuaW1hdGlvbmVuZFwiOyRhJiYodm9pZCAwPT09d2luZG93Lm9udHJhbnNpdGlvbmVuZCYmdm9pZCAwIT09d2luZG93Lm9ud2Via2l0dHJhbnNpdGlvbmVuZCYmKHhhPVwiV2Via2l0VHJhbnNpdGlvblwiLEFhPVwid2Via2l0VHJhbnNpdGlvbkVuZFwiKSx2b2lkIDA9PT13aW5kb3cub25hbmltYXRpb25lbmQmJnZvaWQgMCE9PXdpbmRvdy5vbndlYmtpdGFuaW1hdGlvbmVuZCYmKGthPVwiV2Via2l0QW5pbWF0aW9uXCIsT2E9XCJ3ZWJraXRBbmltYXRpb25FbmRcIikpO3ZhciBTYT1OaSYmd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZT93aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQod2luZG93KTpzZXRUaW1lb3V0LFRhPS9cXGIodHJhbnNmb3JtfGFsbCkoLHwkKS8sRWE9ZnVuY3Rpb24ocil7ZnVuY3Rpb24gbyh0KXtyZXR1cm4gbmV3IG9vKEUudGFnTmFtZSh0KS50b0xvd2VyQ2FzZSgpLHt9LFtdLHZvaWQgMCx0KX1mdW5jdGlvbiBhKHQsZSl7ZnVuY3Rpb24gbigpezA9PS0tbi5saXN0ZW5lcnMmJnModCl9cmV0dXJuIG4ubGlzdGVuZXJzPWUsbn1mdW5jdGlvbiBzKHQpe3ZhciBuPUUucGFyZW50Tm9kZSh0KTtlKG4pJiZFLnJlbW92ZUNoaWxkKG4sdCl9ZnVuY3Rpb24gYyh0LHIsaSxvLGEpe2lmKHQuaXNSb290SW5zZXJ0PSFhLCF1KHQscixpLG8pKXt2YXIgcz10LmRhdGEsYz10LmNoaWxkcmVuLGw9dC50YWc7ZShsKT8odC5lbG09dC5ucz9FLmNyZWF0ZUVsZW1lbnROUyh0Lm5zLGwpOkUuY3JlYXRlRWxlbWVudChsLHQpLHkodCksdih0LGMsciksZShzKSYmbSh0LHIpLGQoaSx0LmVsbSxvKSk6bih0LmlzQ29tbWVudCk/KHQuZWxtPUUuY3JlYXRlQ29tbWVudCh0LnRleHQpLGQoaSx0LmVsbSxvKSk6KHQuZWxtPUUuY3JlYXRlVGV4dE5vZGUodC50ZXh0KSxkKGksdC5lbG0sbykpfX1mdW5jdGlvbiB1KHQscixpLG8pe3ZhciBhPXQuZGF0YTtpZihlKGEpKXt2YXIgcz1lKHQuY29tcG9uZW50SW5zdGFuY2UpJiZhLmtlZXBBbGl2ZTtpZihlKGE9YS5ob29rKSYmZShhPWEuaW5pdCkmJmEodCwhMSxpLG8pLGUodC5jb21wb25lbnRJbnN0YW5jZSkpcmV0dXJuIGwodCxyKSxuKHMpJiZwKHQscixpLG8pLCEwfX1mdW5jdGlvbiBsKHQsbil7ZSh0LmRhdGEucGVuZGluZ0luc2VydCkmJihuLnB1c2guYXBwbHkobix0LmRhdGEucGVuZGluZ0luc2VydCksdC5kYXRhLnBlbmRpbmdJbnNlcnQ9bnVsbCksdC5lbG09dC5jb21wb25lbnRJbnN0YW5jZS4kZWwsaCh0KT8obSh0LG4pLHkodCkpOihSZSh0KSxuLnB1c2godCkpfWZ1bmN0aW9uIHAodCxuLHIsaSl7Zm9yKHZhciBvLGE9dDthLmNvbXBvbmVudEluc3RhbmNlOylpZihhPWEuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlLGUobz1hLmRhdGEpJiZlKG89by50cmFuc2l0aW9uKSl7Zm9yKG89MDtvPFMuYWN0aXZhdGUubGVuZ3RoOysrbylTLmFjdGl2YXRlW29dKGVhLGEpO24ucHVzaChhKTticmVha31kKHIsdC5lbG0saSl9ZnVuY3Rpb24gZCh0LG4scil7ZSh0KSYmKGUocik/ci5wYXJlbnROb2RlPT09dCYmRS5pbnNlcnRCZWZvcmUodCxuLHIpOkUuYXBwZW5kQ2hpbGQodCxuKSl9ZnVuY3Rpb24gdih0LGUsbil7aWYoQXJyYXkuaXNBcnJheShlKSlmb3IodmFyIHI9MDtyPGUubGVuZ3RoOysrciljKGVbcl0sbix0LmVsbSxudWxsLCEwKTtlbHNlIGkodC50ZXh0KSYmRS5hcHBlbmRDaGlsZCh0LmVsbSxFLmNyZWF0ZVRleHROb2RlKHQudGV4dCkpfWZ1bmN0aW9uIGgodCl7Zm9yKDt0LmNvbXBvbmVudEluc3RhbmNlOyl0PXQuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlO3JldHVybiBlKHQudGFnKX1mdW5jdGlvbiBtKHQsbil7Zm9yKHZhciByPTA7cjxTLmNyZWF0ZS5sZW5ndGg7KytyKVMuY3JlYXRlW3JdKGVhLHQpO2Uoaz10LmRhdGEuaG9vaykmJihlKGsuY3JlYXRlKSYmay5jcmVhdGUoZWEsdCksZShrLmluc2VydCkmJm4ucHVzaCh0KSl9ZnVuY3Rpb24geSh0KXtmb3IodmFyIG4scj10O3I7KWUobj1yLmNvbnRleHQpJiZlKG49bi4kb3B0aW9ucy5fc2NvcGVJZCkmJkUuc2V0QXR0cmlidXRlKHQuZWxtLG4sXCJcIikscj1yLnBhcmVudDtlKG49bG8pJiZuIT09dC5jb250ZXh0JiZlKG49bi4kb3B0aW9ucy5fc2NvcGVJZCkmJkUuc2V0QXR0cmlidXRlKHQuZWxtLG4sXCJcIil9ZnVuY3Rpb24gZyh0LGUsbixyLGksbyl7Zm9yKDtyPD1pOysrciljKG5bcl0sbyx0LGUpfWZ1bmN0aW9uIF8odCl7dmFyIG4scixpPXQuZGF0YTtpZihlKGkpKWZvcihlKG49aS5ob29rKSYmZShuPW4uZGVzdHJveSkmJm4odCksbj0wO248Uy5kZXN0cm95Lmxlbmd0aDsrK24pUy5kZXN0cm95W25dKHQpO2lmKGUobj10LmNoaWxkcmVuKSlmb3Iocj0wO3I8dC5jaGlsZHJlbi5sZW5ndGg7KytyKV8odC5jaGlsZHJlbltyXSl9ZnVuY3Rpb24gYih0LG4scixpKXtmb3IoO3I8PWk7KytyKXt2YXIgbz1uW3JdO2UobykmJihlKG8udGFnKT8oJChvKSxfKG8pKTpzKG8uZWxtKSl9fWZ1bmN0aW9uICQodCxuKXtpZihlKG4pfHxlKHQuZGF0YSkpe3ZhciByLGk9Uy5yZW1vdmUubGVuZ3RoKzE7Zm9yKGUobik/bi5saXN0ZW5lcnMrPWk6bj1hKHQuZWxtLGkpLGUocj10LmNvbXBvbmVudEluc3RhbmNlKSYmZShyPXIuX3Zub2RlKSYmZShyLmRhdGEpJiYkKHIsbikscj0wO3I8Uy5yZW1vdmUubGVuZ3RoOysrcilTLnJlbW92ZVtyXSh0LG4pO2Uocj10LmRhdGEuaG9vaykmJmUocj1yLnJlbW92ZSk/cih0LG4pOm4oKX1lbHNlIHModC5lbG0pfWZ1bmN0aW9uIEMobixyLGksbyxhKXtmb3IodmFyIHMsdSxsLGY9MCxwPTAsZD1yLmxlbmd0aC0xLHY9clswXSxoPXJbZF0sbT1pLmxlbmd0aC0xLHk9aVswXSxfPWlbbV0sJD0hYTtmPD1kJiZwPD1tOyl0KHYpP3Y9clsrK2ZdOnQoaCk/aD1yWy0tZF06SGUodix5KT8odyh2LHksbyksdj1yWysrZl0seT1pWysrcF0pOkhlKGgsXyk/KHcoaCxfLG8pLGg9clstLWRdLF89aVstLW1dKTpIZSh2LF8pPyh3KHYsXyxvKSwkJiZFLmluc2VydEJlZm9yZShuLHYuZWxtLEUubmV4dFNpYmxpbmcoaC5lbG0pKSx2PXJbKytmXSxfPWlbLS1tXSk6SGUoaCx5KT8odyhoLHksbyksJCYmRS5pbnNlcnRCZWZvcmUobixoLmVsbSx2LmVsbSksaD1yWy0tZF0seT1pWysrcF0pOih0KHMpJiYocz1VZShyLGYsZCkpLHQodT1lKHkua2V5KT9zW3kua2V5XTpudWxsKT8oYyh5LG8sbix2LmVsbSkseT1pWysrcF0pOkhlKGw9clt1XSx5KT8odyhsLHksbyksclt1XT12b2lkIDAsJCYmRS5pbnNlcnRCZWZvcmUobixsLmVsbSx2LmVsbSkseT1pWysrcF0pOihjKHksbyxuLHYuZWxtKSx5PWlbKytwXSkpO2Y+ZD9nKG4sdChpW20rMV0pP251bGw6aVttKzFdLmVsbSxpLHAsbSxvKTpwPm0mJmIobixyLGYsZCl9ZnVuY3Rpb24gdyhyLGksbyxhKXtpZihyIT09aSl7dmFyIHM9aS5lbG09ci5lbG07aWYobihyLmlzQXN5bmNQbGFjZWhvbGRlcikpZShpLmFzeW5jRmFjdG9yeS5yZXNvbHZlZCk/QShyLmVsbSxpLG8pOmkuaXNBc3luY1BsYWNlaG9sZGVyPSEwO2Vsc2UgaWYobihpLmlzU3RhdGljKSYmbihyLmlzU3RhdGljKSYmaS5rZXk9PT1yLmtleSYmKG4oaS5pc0Nsb25lZCl8fG4oaS5pc09uY2UpKSlpLmNvbXBvbmVudEluc3RhbmNlPXIuY29tcG9uZW50SW5zdGFuY2U7ZWxzZXt2YXIgYyx1PWkuZGF0YTtlKHUpJiZlKGM9dS5ob29rKSYmZShjPWMucHJlcGF0Y2gpJiZjKHIsaSk7dmFyIGw9ci5jaGlsZHJlbixmPWkuY2hpbGRyZW47aWYoZSh1KSYmaChpKSl7Zm9yKGM9MDtjPFMudXBkYXRlLmxlbmd0aDsrK2MpUy51cGRhdGVbY10ocixpKTtlKGM9dS5ob29rKSYmZShjPWMudXBkYXRlKSYmYyhyLGkpfXQoaS50ZXh0KT9lKGwpJiZlKGYpP2whPT1mJiZDKHMsbCxmLG8sYSk6ZShmKT8oZShyLnRleHQpJiZFLnNldFRleHRDb250ZW50KHMsXCJcIiksZyhzLG51bGwsZiwwLGYubGVuZ3RoLTEsbykpOmUobCk/YihzLGwsMCxsLmxlbmd0aC0xKTplKHIudGV4dCkmJkUuc2V0VGV4dENvbnRlbnQocyxcIlwiKTpyLnRleHQhPT1pLnRleHQmJkUuc2V0VGV4dENvbnRlbnQocyxpLnRleHQpLGUodSkmJmUoYz11Lmhvb2spJiZlKGM9Yy5wb3N0cGF0Y2gpJiZjKHIsaSl9fX1mdW5jdGlvbiB4KHQscixpKXtpZihuKGkpJiZlKHQucGFyZW50KSl0LnBhcmVudC5kYXRhLnBlbmRpbmdJbnNlcnQ9cjtlbHNlIGZvcih2YXIgbz0wO288ci5sZW5ndGg7KytvKXJbb10uZGF0YS5ob29rLmluc2VydChyW29dKX1mdW5jdGlvbiBBKHQscixpKXtpZihuKHIuaXNDb21tZW50KSYmZShyLmFzeW5jRmFjdG9yeSkpcmV0dXJuIHIuZWxtPXQsci5pc0FzeW5jUGxhY2Vob2xkZXI9ITAsITA7ci5lbG09dDt2YXIgbz1yLnRhZyxhPXIuZGF0YSxzPXIuY2hpbGRyZW47aWYoZShhKSYmKGUoaz1hLmhvb2spJiZlKGs9ay5pbml0KSYmayhyLCEwKSxlKGs9ci5jb21wb25lbnRJbnN0YW5jZSkpKXJldHVybiBsKHIsaSksITA7aWYoZShvKSl7aWYoZShzKSlpZih0Lmhhc0NoaWxkTm9kZXMoKSl7Zm9yKHZhciBjPSEwLHU9dC5maXJzdENoaWxkLGY9MDtmPHMubGVuZ3RoO2YrKyl7aWYoIXV8fCFBKHUsc1tmXSxpKSl7Yz0hMTticmVha311PXUubmV4dFNpYmxpbmd9aWYoIWN8fHUpcmV0dXJuITF9ZWxzZSB2KHIscyxpKTtpZihlKGEpKWZvcih2YXIgcCBpbiBhKWlmKCFqKHApKXttKHIsaSk7YnJlYWt9fWVsc2UgdC5kYXRhIT09ci50ZXh0JiYodC5kYXRhPXIudGV4dCk7cmV0dXJuITB9dmFyIGssTyxTPXt9LFQ9ci5tb2R1bGVzLEU9ci5ub2RlT3BzO2ZvcihrPTA7azxuYS5sZW5ndGg7KytrKWZvcihTW25hW2tdXT1bXSxPPTA7TzxULmxlbmd0aDsrK08pZShUW09dW25hW2tdXSkmJlNbbmFba11dLnB1c2goVFtPXVtuYVtrXV0pO3ZhciBqPWYoXCJhdHRycyxzdHlsZSxjbGFzcyxzdGF0aWNDbGFzcyxzdGF0aWNTdHlsZSxrZXlcIik7cmV0dXJuIGZ1bmN0aW9uKHIsaSxhLHMsdSxsKXtpZighdChpKSl7dmFyIGY9ITEscD1bXTtpZih0KHIpKWY9ITAsYyhpLHAsdSxsKTtlbHNle3ZhciBkPWUoci5ub2RlVHlwZSk7aWYoIWQmJkhlKHIsaSkpdyhyLGkscCxzKTtlbHNle2lmKGQpe2lmKDE9PT1yLm5vZGVUeXBlJiZyLmhhc0F0dHJpYnV0ZSh4aSkmJihyLnJlbW92ZUF0dHJpYnV0ZSh4aSksYT0hMCksbihhKSYmQShyLGkscCkpcmV0dXJuIHgoaSxwLCEwKSxyO3I9byhyKX12YXIgdj1yLmVsbSxtPUUucGFyZW50Tm9kZSh2KTtpZihjKGkscCx2Ll9sZWF2ZUNiP251bGw6bSxFLm5leHRTaWJsaW5nKHYpKSxlKGkucGFyZW50KSl7Zm9yKHZhciB5PWkucGFyZW50O3k7KXkuZWxtPWkuZWxtLHk9eS5wYXJlbnQ7aWYoaChpKSlmb3IodmFyIGc9MDtnPFMuY3JlYXRlLmxlbmd0aDsrK2cpUy5jcmVhdGVbZ10oZWEsaS5wYXJlbnQpfWUobSk/YihtLFtyXSwwLDApOmUoci50YWcpJiZfKHIpfX1yZXR1cm4geChpLHAsZiksaS5lbG19ZShyKSYmXyhyKX19KHtub2RlT3BzOlhvLG1vZHVsZXM6W2FhLHNhLGZhLHBhLF9hLE5pP3tjcmVhdGU6Sm4sYWN0aXZhdGU6Sm4scmVtb3ZlOmZ1bmN0aW9uKHQsZSl7ITAhPT10LmRhdGEuc2hvdz9Wbih0LGUpOmUoKX19Ont9XS5jb25jYXQob2EpfSksamE9ZihcInRleHQsbnVtYmVyLHBhc3N3b3JkLHNlYXJjaCxlbWFpbCx0ZWwsdXJsXCIpO01pJiZkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2VsZWN0aW9uY2hhbmdlXCIsZnVuY3Rpb24oKXt2YXIgdD1kb2N1bWVudC5hY3RpdmVFbGVtZW50O3QmJnQudm1vZGVsJiZRbih0LFwiaW5wdXRcIil9KTt2YXIgTmE9e21vZGVsOntpbnNlcnRlZDpmdW5jdGlvbih0LGUsbil7aWYoXCJzZWxlY3RcIj09PW4udGFnKXt2YXIgcj1mdW5jdGlvbigpe3FuKHQsZSxuLmNvbnRleHQpfTtyKCksKElpfHxEaSkmJnNldFRpbWVvdXQociwwKX1lbHNlKFwidGV4dGFyZWFcIj09PW4udGFnfHxqYSh0LnR5cGUpKSYmKHQuX3ZNb2RpZmllcnM9ZS5tb2RpZmllcnMsZS5tb2RpZmllcnMubGF6eXx8KHQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLFluKSxQaXx8KHQuYWRkRXZlbnRMaXN0ZW5lcihcImNvbXBvc2l0aW9uc3RhcnRcIixabiksdC5hZGRFdmVudExpc3RlbmVyKFwiY29tcG9zaXRpb25lbmRcIixZbikpLE1pJiYodC52bW9kZWw9ITApKSl9LGNvbXBvbmVudFVwZGF0ZWQ6ZnVuY3Rpb24odCxlLG4pe1wic2VsZWN0XCI9PT1uLnRhZyYmKHFuKHQsZSxuLmNvbnRleHQpLCh0Lm11bHRpcGxlP2UudmFsdWUuc29tZShmdW5jdGlvbihlKXtyZXR1cm4gV24oZSx0Lm9wdGlvbnMpfSk6ZS52YWx1ZSE9PWUub2xkVmFsdWUmJlduKGUudmFsdWUsdC5vcHRpb25zKSkmJlFuKHQsXCJjaGFuZ2VcIikpfX0sc2hvdzp7YmluZDpmdW5jdGlvbih0LGUsbil7dmFyIHI9ZS52YWx1ZSxpPShuPVhuKG4pKS5kYXRhJiZuLmRhdGEudHJhbnNpdGlvbixvPXQuX192T3JpZ2luYWxEaXNwbGF5PVwibm9uZVwiPT09dC5zdHlsZS5kaXNwbGF5P1wiXCI6dC5zdHlsZS5kaXNwbGF5O3ImJmkmJiFNaT8obi5kYXRhLnNob3c9ITAsVW4obixmdW5jdGlvbigpe3Quc3R5bGUuZGlzcGxheT1vfSkpOnQuc3R5bGUuZGlzcGxheT1yP286XCJub25lXCJ9LHVwZGF0ZTpmdW5jdGlvbih0LGUsbil7dmFyIHI9ZS52YWx1ZTtyIT09ZS5vbGRWYWx1ZSYmKChuPVhuKG4pKS5kYXRhJiZuLmRhdGEudHJhbnNpdGlvbiYmIU1pPyhuLmRhdGEuc2hvdz0hMCxyP1VuKG4sZnVuY3Rpb24oKXt0LnN0eWxlLmRpc3BsYXk9dC5fX3ZPcmlnaW5hbERpc3BsYXl9KTpWbihuLGZ1bmN0aW9uKCl7dC5zdHlsZS5kaXNwbGF5PVwibm9uZVwifSkpOnQuc3R5bGUuZGlzcGxheT1yP3QuX192T3JpZ2luYWxEaXNwbGF5Olwibm9uZVwiKX0sdW5iaW5kOmZ1bmN0aW9uKHQsZSxuLHIsaSl7aXx8KHQuc3R5bGUuZGlzcGxheT10Ll9fdk9yaWdpbmFsRGlzcGxheSl9fX0sTGE9e25hbWU6U3RyaW5nLGFwcGVhcjpCb29sZWFuLGNzczpCb29sZWFuLG1vZGU6U3RyaW5nLHR5cGU6U3RyaW5nLGVudGVyQ2xhc3M6U3RyaW5nLGxlYXZlQ2xhc3M6U3RyaW5nLGVudGVyVG9DbGFzczpTdHJpbmcsbGVhdmVUb0NsYXNzOlN0cmluZyxlbnRlckFjdGl2ZUNsYXNzOlN0cmluZyxsZWF2ZUFjdGl2ZUNsYXNzOlN0cmluZyxhcHBlYXJDbGFzczpTdHJpbmcsYXBwZWFyQWN0aXZlQ2xhc3M6U3RyaW5nLGFwcGVhclRvQ2xhc3M6U3RyaW5nLGR1cmF0aW9uOltOdW1iZXIsU3RyaW5nLE9iamVjdF19LElhPXtuYW1lOlwidHJhbnNpdGlvblwiLHByb3BzOkxhLGFic3RyYWN0OiEwLHJlbmRlcjpmdW5jdGlvbih0KXt2YXIgZT10aGlzLG49dGhpcy4kb3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW47aWYobiYmKG49bi5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQudGFnfHxvcih0KX0pKS5sZW5ndGgpe3ZhciByPXRoaXMubW9kZSxvPW5bMF07aWYocnIodGhpcy4kdm5vZGUpKXJldHVybiBvO3ZhciBhPXRyKG8pO2lmKCFhKXJldHVybiBvO2lmKHRoaXMuX2xlYXZpbmcpcmV0dXJuIG5yKHQsbyk7dmFyIHM9XCJfX3RyYW5zaXRpb24tXCIrdGhpcy5fdWlkK1wiLVwiO2Eua2V5PW51bGw9PWEua2V5P2EuaXNDb21tZW50P3MrXCJjb21tZW50XCI6cythLnRhZzppKGEua2V5KT8wPT09U3RyaW5nKGEua2V5KS5pbmRleE9mKHMpP2Eua2V5OnMrYS5rZXk6YS5rZXk7dmFyIGM9KGEuZGF0YXx8KGEuZGF0YT17fSkpLnRyYW5zaXRpb249ZXIodGhpcyksdT10aGlzLl92bm9kZSxsPXRyKHUpO2lmKGEuZGF0YS5kaXJlY3RpdmVzJiZhLmRhdGEuZGlyZWN0aXZlcy5zb21lKGZ1bmN0aW9uKHQpe3JldHVyblwic2hvd1wiPT09dC5uYW1lfSkmJihhLmRhdGEuc2hvdz0hMCksbCYmbC5kYXRhJiYhaXIoYSxsKSYmIW9yKGwpKXt2YXIgZj1sJiYobC5kYXRhLnRyYW5zaXRpb249eSh7fSxjKSk7aWYoXCJvdXQtaW5cIj09PXIpcmV0dXJuIHRoaXMuX2xlYXZpbmc9ITAsZXQoZixcImFmdGVyTGVhdmVcIixmdW5jdGlvbigpe2UuX2xlYXZpbmc9ITEsZS4kZm9yY2VVcGRhdGUoKX0pLG5yKHQsbyk7aWYoXCJpbi1vdXRcIj09PXIpe2lmKG9yKGEpKXJldHVybiB1O3ZhciBwLGQ9ZnVuY3Rpb24oKXtwKCl9O2V0KGMsXCJhZnRlckVudGVyXCIsZCksZXQoYyxcImVudGVyQ2FuY2VsbGVkXCIsZCksZXQoZixcImRlbGF5TGVhdmVcIixmdW5jdGlvbih0KXtwPXR9KX19cmV0dXJuIG99fX0sTWE9eSh7dGFnOlN0cmluZyxtb3ZlQ2xhc3M6U3RyaW5nfSxMYSk7ZGVsZXRlIE1hLm1vZGU7dmFyIERhPXtUcmFuc2l0aW9uOklhLFRyYW5zaXRpb25Hcm91cDp7cHJvcHM6TWEscmVuZGVyOmZ1bmN0aW9uKHQpe2Zvcih2YXIgZT10aGlzLnRhZ3x8dGhpcy4kdm5vZGUuZGF0YS50YWd8fFwic3BhblwiLG49T2JqZWN0LmNyZWF0ZShudWxsKSxyPXRoaXMucHJldkNoaWxkcmVuPXRoaXMuY2hpbGRyZW4saT10aGlzLiRzbG90cy5kZWZhdWx0fHxbXSxvPXRoaXMuY2hpbGRyZW49W10sYT1lcih0aGlzKSxzPTA7czxpLmxlbmd0aDtzKyspe3ZhciBjPWlbc107Yy50YWcmJm51bGwhPWMua2V5JiYwIT09U3RyaW5nKGMua2V5KS5pbmRleE9mKFwiX192bGlzdFwiKSYmKG8ucHVzaChjKSxuW2Mua2V5XT1jLChjLmRhdGF8fChjLmRhdGE9e30pKS50cmFuc2l0aW9uPWEpfWlmKHIpe2Zvcih2YXIgdT1bXSxsPVtdLGY9MDtmPHIubGVuZ3RoO2YrKyl7dmFyIHA9cltmXTtwLmRhdGEudHJhbnNpdGlvbj1hLHAuZGF0YS5wb3M9cC5lbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbltwLmtleV0/dS5wdXNoKHApOmwucHVzaChwKX10aGlzLmtlcHQ9dChlLG51bGwsdSksdGhpcy5yZW1vdmVkPWx9cmV0dXJuIHQoZSxudWxsLG8pfSxiZWZvcmVVcGRhdGU6ZnVuY3Rpb24oKXt0aGlzLl9fcGF0Y2hfXyh0aGlzLl92bm9kZSx0aGlzLmtlcHQsITEsITApLHRoaXMuX3Zub2RlPXRoaXMua2VwdH0sdXBkYXRlZDpmdW5jdGlvbigpe3ZhciB0PXRoaXMucHJldkNoaWxkcmVuLGU9dGhpcy5tb3ZlQ2xhc3N8fCh0aGlzLm5hbWV8fFwidlwiKStcIi1tb3ZlXCI7aWYodC5sZW5ndGgmJnRoaXMuaGFzTW92ZSh0WzBdLmVsbSxlKSl7dC5mb3JFYWNoKGFyKSx0LmZvckVhY2goc3IpLHQuZm9yRWFjaChjcik7ZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQ7dC5mb3JFYWNoKGZ1bmN0aW9uKHQpe2lmKHQuZGF0YS5tb3ZlZCl7dmFyIG49dC5lbG0scj1uLnN0eWxlO0RuKG4sZSksci50cmFuc2Zvcm09ci5XZWJraXRUcmFuc2Zvcm09ci50cmFuc2l0aW9uRHVyYXRpb249XCJcIixuLmFkZEV2ZW50TGlzdGVuZXIoQWEsbi5fbW92ZUNiPWZ1bmN0aW9uIHQocil7ciYmIS90cmFuc2Zvcm0kLy50ZXN0KHIucHJvcGVydHlOYW1lKXx8KG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihBYSx0KSxuLl9tb3ZlQ2I9bnVsbCxQbihuLGUpKX0pfX0pfX0sbWV0aG9kczp7aGFzTW92ZTpmdW5jdGlvbih0LGUpe2lmKCEkYSlyZXR1cm4hMTtpZih0aGlzLl9oYXNNb3ZlKXJldHVybiB0aGlzLl9oYXNNb3ZlO3ZhciBuPXQuY2xvbmVOb2RlKCk7dC5fdHJhbnNpdGlvbkNsYXNzZXMmJnQuX3RyYW5zaXRpb25DbGFzc2VzLmZvckVhY2goZnVuY3Rpb24odCl7TG4obix0KX0pLE5uKG4sZSksbi5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLHRoaXMuJGVsLmFwcGVuZENoaWxkKG4pO3ZhciByPVJuKG4pO3JldHVybiB0aGlzLiRlbC5yZW1vdmVDaGlsZChuKSx0aGlzLl9oYXNNb3ZlPXIuaGFzVHJhbnNmb3JtfX19fTtfZS5jb25maWcubXVzdFVzZVByb3A9Qm8sX2UuY29uZmlnLmlzUmVzZXJ2ZWRUYWc9WW8sX2UuY29uZmlnLmlzUmVzZXJ2ZWRBdHRyPVJvLF9lLmNvbmZpZy5nZXRUYWdOYW1lc3BhY2U9UGUsX2UuY29uZmlnLmlzVW5rbm93bkVsZW1lbnQ9ZnVuY3Rpb24odCl7aWYoIU5pKXJldHVybiEwO2lmKFlvKHQpKXJldHVybiExO2lmKHQ9dC50b0xvd2VyQ2FzZSgpLG51bGwhPVFvW3RdKXJldHVybiBRb1t0XTt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KHQpO3JldHVybiB0LmluZGV4T2YoXCItXCIpPi0xP1FvW3RdPWUuY29uc3RydWN0b3I9PT13aW5kb3cuSFRNTFVua25vd25FbGVtZW50fHxlLmNvbnN0cnVjdG9yPT09d2luZG93LkhUTUxFbGVtZW50OlFvW3RdPS9IVE1MVW5rbm93bkVsZW1lbnQvLnRlc3QoZS50b1N0cmluZygpKX0seShfZS5vcHRpb25zLmRpcmVjdGl2ZXMsTmEpLHkoX2Uub3B0aW9ucy5jb21wb25lbnRzLERhKSxfZS5wcm90b3R5cGUuX19wYXRjaF9fPU5pP0VhOl8sX2UucHJvdG90eXBlLiRtb3VudD1mdW5jdGlvbih0LGUpe3JldHVybiB0PXQmJk5pP0ZlKHQpOnZvaWQgMCxidCh0aGlzLHQsZSl9LHNldFRpbWVvdXQoZnVuY3Rpb24oKXtPaS5kZXZ0b29scyYmSmkmJkppLmVtaXQoXCJpbml0XCIsX2UpfSwwKTt2YXIgUGEsRmE9ISFOaSYmZnVuY3Rpb24odCxlKXt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBuLmlubmVySFRNTD0nPGRpdiBhPVwiJyt0KydcIi8+JyxuLmlubmVySFRNTC5pbmRleE9mKGUpPjB9KFwiXFxuXCIsXCImIzEwO1wiKSxSYT0vXFx7XFx7KCg/Oi58XFxuKSs/KVxcfVxcfS9nLEhhPS9bLS4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2csQmE9dihmdW5jdGlvbih0KXt2YXIgZT10WzBdLnJlcGxhY2UoSGEsXCJcXFxcJCZcIiksbj10WzFdLnJlcGxhY2UoSGEsXCJcXFxcJCZcIik7cmV0dXJuIG5ldyBSZWdFeHAoZStcIigoPzoufFxcXFxuKSs/KVwiK24sXCJnXCIpfSksVWE9W3tzdGF0aWNLZXlzOltcInN0YXRpY0NsYXNzXCJdLHRyYW5zZm9ybU5vZGU6ZnVuY3Rpb24odCxlKXtlLndhcm47dmFyIG49c24odCxcImNsYXNzXCIpO24mJih0LnN0YXRpY0NsYXNzPUpTT04uc3RyaW5naWZ5KG4pKTt2YXIgcj1hbih0LFwiY2xhc3NcIiwhMSk7ciYmKHQuY2xhc3NCaW5kaW5nPXIpfSxnZW5EYXRhOmZ1bmN0aW9uKHQpe3ZhciBlPVwiXCI7cmV0dXJuIHQuc3RhdGljQ2xhc3MmJihlKz1cInN0YXRpY0NsYXNzOlwiK3Quc3RhdGljQ2xhc3MrXCIsXCIpLHQuY2xhc3NCaW5kaW5nJiYoZSs9XCJjbGFzczpcIit0LmNsYXNzQmluZGluZytcIixcIiksZX19LHtzdGF0aWNLZXlzOltcInN0YXRpY1N0eWxlXCJdLHRyYW5zZm9ybU5vZGU6ZnVuY3Rpb24odCxlKXtlLndhcm47dmFyIG49c24odCxcInN0eWxlXCIpO24mJih0LnN0YXRpY1N0eWxlPUpTT04uc3RyaW5naWZ5KGRhKG4pKSk7dmFyIHI9YW4odCxcInN0eWxlXCIsITEpO3ImJih0LnN0eWxlQmluZGluZz1yKX0sZ2VuRGF0YTpmdW5jdGlvbih0KXt2YXIgZT1cIlwiO3JldHVybiB0LnN0YXRpY1N0eWxlJiYoZSs9XCJzdGF0aWNTdHlsZTpcIit0LnN0YXRpY1N0eWxlK1wiLFwiKSx0LnN0eWxlQmluZGluZyYmKGUrPVwic3R5bGU6KFwiK3Quc3R5bGVCaW5kaW5nK1wiKSxcIiksZX19XSxWYT17bW9kZWw6ZnVuY3Rpb24odCxlLG4pe0RvPW47dmFyIHI9ZS52YWx1ZSxpPWUubW9kaWZpZXJzLG89dC50YWcsYT10LmF0dHJzTWFwLnR5cGU7aWYodC5jb21wb25lbnQpcmV0dXJuIGNuKHQscixpKSwhMTtpZihcInNlbGVjdFwiPT09bylnbih0LHIsaSk7ZWxzZSBpZihcImlucHV0XCI9PT1vJiZcImNoZWNrYm94XCI9PT1hKW1uKHQscixpKTtlbHNlIGlmKFwiaW5wdXRcIj09PW8mJlwicmFkaW9cIj09PWEpeW4odCxyLGkpO2Vsc2UgaWYoXCJpbnB1dFwiPT09b3x8XCJ0ZXh0YXJlYVwiPT09bylfbih0LHIsaSk7ZWxzZSBpZighT2kuaXNSZXNlcnZlZFRhZyhvKSlyZXR1cm4gY24odCxyLGkpLCExO3JldHVybiEwfSx0ZXh0OmZ1bmN0aW9uKHQsZSl7ZS52YWx1ZSYmZW4odCxcInRleHRDb250ZW50XCIsXCJfcyhcIitlLnZhbHVlK1wiKVwiKX0saHRtbDpmdW5jdGlvbih0LGUpe2UudmFsdWUmJmVuKHQsXCJpbm5lckhUTUxcIixcIl9zKFwiK2UudmFsdWUrXCIpXCIpfX0semE9ZihcImFyZWEsYmFzZSxicixjb2wsZW1iZWQsZnJhbWUsaHIsaW1nLGlucHV0LGlzaW5kZXgsa2V5Z2VuLGxpbmssbWV0YSxwYXJhbSxzb3VyY2UsdHJhY2ssd2JyXCIpLEthPWYoXCJjb2xncm91cCxkZCxkdCxsaSxvcHRpb25zLHAsdGQsdGZvb3QsdGgsdGhlYWQsdHIsc291cmNlXCIpLEphPWYoXCJhZGRyZXNzLGFydGljbGUsYXNpZGUsYmFzZSxibG9ja3F1b3RlLGJvZHksY2FwdGlvbixjb2wsY29sZ3JvdXAsZGQsZGV0YWlscyxkaWFsb2csZGl2LGRsLGR0LGZpZWxkc2V0LGZpZ2NhcHRpb24sZmlndXJlLGZvb3Rlcixmb3JtLGgxLGgyLGgzLGg0LGg1LGg2LGhlYWQsaGVhZGVyLGhncm91cCxocixodG1sLGxlZ2VuZCxsaSxtZW51aXRlbSxtZXRhLG9wdGdyb3VwLG9wdGlvbixwYXJhbSxycCxydCxzb3VyY2Usc3R5bGUsc3VtbWFyeSx0Ym9keSx0ZCx0Zm9vdCx0aCx0aGVhZCx0aXRsZSx0cix0cmFja1wiKSxxYT17ZXhwZWN0SFRNTDohMCxtb2R1bGVzOlVhLGRpcmVjdGl2ZXM6VmEsaXNQcmVUYWc6ZnVuY3Rpb24odCl7cmV0dXJuXCJwcmVcIj09PXR9LGlzVW5hcnlUYWc6emEsbXVzdFVzZVByb3A6Qm8sY2FuQmVMZWZ0T3BlblRhZzpLYSxpc1Jlc2VydmVkVGFnOllvLGdldFRhZ05hbWVzcGFjZTpQZSxzdGF0aWNLZXlzOmZ1bmN0aW9uKHQpe3JldHVybiB0LnJlZHVjZShmdW5jdGlvbih0LGUpe3JldHVybiB0LmNvbmNhdChlLnN0YXRpY0tleXN8fFtdKX0sW10pLmpvaW4oXCIsXCIpfShVYSl9LFdhPXtkZWNvZGU6ZnVuY3Rpb24odCl7cmV0dXJuIFBhPVBhfHxkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFBhLmlubmVySFRNTD10LFBhLnRleHRDb250ZW50fX0sR2E9LyhbXlxcc1wiJzw+Lz1dKykvLFphPS8oPzo9KS8sWWE9Wy9cIihbXlwiXSopXCIrLy5zb3VyY2UsLycoW14nXSopJysvLnNvdXJjZSwvKFteXFxzXCInPTw+YF0rKS8uc291cmNlXSxRYT1uZXcgUmVnRXhwKFwiXlxcXFxzKlwiK0dhLnNvdXJjZStcIig/OlxcXFxzKihcIitaYS5zb3VyY2UrXCIpXFxcXHMqKD86XCIrWWEuam9pbihcInxcIikrXCIpKT9cIiksWGE9XCJbYS16QS1aX11bXFxcXHdcXFxcLVxcXFwuXSpcIix0cz1cIigoPzpcIitYYStcIlxcXFw6KT9cIitYYStcIilcIixlcz1uZXcgUmVnRXhwKFwiXjxcIit0cyksbnM9L15cXHMqKFxcLz8pPi8scnM9bmV3IFJlZ0V4cChcIl48XFxcXC9cIit0cytcIltePl0qPlwiKSxpcz0vXjwhRE9DVFlQRSBbXj5dKz4vaSxvcz0vXjwhLS0vLGFzPS9ePCFcXFsvLHNzPSExO1wieFwiLnJlcGxhY2UoL3goLik/L2csZnVuY3Rpb24odCxlKXtzcz1cIlwiPT09ZX0pO3ZhciBjcyx1cyxscyxmcyxwcyxkcyx2cyxocyxtcyx5cyxncz1mKFwic2NyaXB0LHN0eWxlLHRleHRhcmVhXCIsITApLF9zPXt9LGJzPXtcIiZsdDtcIjpcIjxcIixcIiZndDtcIjpcIj5cIixcIiZxdW90O1wiOidcIicsXCImYW1wO1wiOlwiJlwiLFwiJiMxMDtcIjpcIlxcblwifSwkcz0vJig/Omx0fGd0fHF1b3R8YW1wKTsvZyxDcz0vJig/Omx0fGd0fHF1b3R8YW1wfCMxMCk7L2csd3M9ZihcInByZSx0ZXh0YXJlYVwiLCEwKSx4cz1mdW5jdGlvbih0LGUpe3JldHVybiB0JiZ3cyh0KSYmXCJcXG5cIj09PWVbMF19LEFzPS9eQHxedi1vbjovLGtzPS9edi18XkB8XjovLE9zPS8oLio/KVxccysoPzppbnxvZilcXHMrKC4qKS8sU3M9L1xcKChcXHtbXn1dKlxcfXxbXixdKiksKFteLF0qKSg/OiwoW14sXSopKT9cXCkvLFRzPS86KC4qKSQvLEVzPS9eOnxedi1iaW5kOi8sanM9L1xcLlteLl0rL2csTnM9dihXYS5kZWNvZGUpLExzPS9eeG1sbnM6TlNcXGQrLyxJcz0vXk5TXFxkKzovLE1zPXYoZnVuY3Rpb24odCl7cmV0dXJuIGYoXCJ0eXBlLHRhZyxhdHRyc0xpc3QsYXR0cnNNYXAscGxhaW4scGFyZW50LGNoaWxkcmVuLGF0dHJzXCIrKHQ/XCIsXCIrdDpcIlwiKSl9KSxEcz0vXlxccyooW1xcdyRfXSt8XFwoW14pXSo/XFwpKVxccyo9PnxeZnVuY3Rpb25cXHMqXFwoLyxQcz0vXlxccypbQS1aYS16XyRdW1xcdyRdKig/OlxcLltBLVphLXpfJF1bXFx3JF0qfFxcWycuKj8nXXxcXFtcIi4qP1wiXXxcXFtcXGQrXXxcXFtbQS1aYS16XyRdW1xcdyRdKl0pKlxccyokLyxGcz17ZXNjOjI3LHRhYjo5LGVudGVyOjEzLHNwYWNlOjMyLHVwOjM4LGxlZnQ6MzcscmlnaHQ6MzksZG93bjo0MCxkZWxldGU6WzgsNDZdfSxScz1mdW5jdGlvbih0KXtyZXR1cm5cImlmKFwiK3QrXCIpcmV0dXJuIG51bGw7XCJ9LEhzPXtzdG9wOlwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiLHByZXZlbnQ6XCIkZXZlbnQucHJldmVudERlZmF1bHQoKTtcIixzZWxmOlJzKFwiJGV2ZW50LnRhcmdldCAhPT0gJGV2ZW50LmN1cnJlbnRUYXJnZXRcIiksY3RybDpScyhcIiEkZXZlbnQuY3RybEtleVwiKSxzaGlmdDpScyhcIiEkZXZlbnQuc2hpZnRLZXlcIiksYWx0OlJzKFwiISRldmVudC5hbHRLZXlcIiksbWV0YTpScyhcIiEkZXZlbnQubWV0YUtleVwiKSxsZWZ0OlJzKFwiJ2J1dHRvbicgaW4gJGV2ZW50ICYmICRldmVudC5idXR0b24gIT09IDBcIiksbWlkZGxlOlJzKFwiJ2J1dHRvbicgaW4gJGV2ZW50ICYmICRldmVudC5idXR0b24gIT09IDFcIikscmlnaHQ6UnMoXCInYnV0dG9uJyBpbiAkZXZlbnQgJiYgJGV2ZW50LmJ1dHRvbiAhPT0gMlwiKX0sQnM9e29uOmZ1bmN0aW9uKHQsZSl7dC53cmFwTGlzdGVuZXJzPWZ1bmN0aW9uKHQpe3JldHVyblwiX2coXCIrdCtcIixcIitlLnZhbHVlK1wiKVwifX0sYmluZDpmdW5jdGlvbih0LGUpe3Qud3JhcERhdGE9ZnVuY3Rpb24obil7cmV0dXJuXCJfYihcIituK1wiLCdcIit0LnRhZytcIicsXCIrZS52YWx1ZStcIixcIisoZS5tb2RpZmllcnMmJmUubW9kaWZpZXJzLnByb3A/XCJ0cnVlXCI6XCJmYWxzZVwiKSsoZS5tb2RpZmllcnMmJmUubW9kaWZpZXJzLnN5bmM/XCIsdHJ1ZVwiOlwiXCIpK1wiKVwifX0sY2xvYWs6X30sVXM9ZnVuY3Rpb24odCl7dGhpcy5vcHRpb25zPXQsdGhpcy53YXJuPXQud2Fybnx8WGUsdGhpcy50cmFuc2Zvcm1zPXRuKHQubW9kdWxlcyxcInRyYW5zZm9ybUNvZGVcIiksdGhpcy5kYXRhR2VuRm5zPXRuKHQubW9kdWxlcyxcImdlbkRhdGFcIiksdGhpcy5kaXJlY3RpdmVzPXkoeSh7fSxCcyksdC5kaXJlY3RpdmVzKTt2YXIgZT10LmlzUmVzZXJ2ZWRUYWd8fENpO3RoaXMubWF5YmVDb21wb25lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIWUodC50YWcpfSx0aGlzLm9uY2VJZD0wLHRoaXMuc3RhdGljUmVuZGVyRm5zPVtdfSxWcz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gbihuLHIpe3ZhciBpPU9iamVjdC5jcmVhdGUoZSksbz1bXSxhPVtdO2lmKGkud2Fybj1mdW5jdGlvbih0LGUpeyhlP2E6bykucHVzaCh0KX0scil7ci5tb2R1bGVzJiYoaS5tb2R1bGVzPShlLm1vZHVsZXN8fFtdKS5jb25jYXQoci5tb2R1bGVzKSksci5kaXJlY3RpdmVzJiYoaS5kaXJlY3RpdmVzPXkoT2JqZWN0LmNyZWF0ZShlLmRpcmVjdGl2ZXMpLHIuZGlyZWN0aXZlcykpO2Zvcih2YXIgcyBpbiByKVwibW9kdWxlc1wiIT09cyYmXCJkaXJlY3RpdmVzXCIhPT1zJiYoaVtzXT1yW3NdKX12YXIgYz10KG4saSk7cmV0dXJuIGMuZXJyb3JzPW8sYy50aXBzPWEsY31yZXR1cm57Y29tcGlsZTpuLGNvbXBpbGVUb0Z1bmN0aW9uczpmaShuKX19fShmdW5jdGlvbih0LGUpe3ZhciBuPXByKHQudHJpbSgpLGUpO05yKG4sZSk7dmFyIHI9QnIobixlKTtyZXR1cm57YXN0Om4scmVuZGVyOnIucmVuZGVyLHN0YXRpY1JlbmRlckZuczpyLnN0YXRpY1JlbmRlckZuc319KShxYSkuY29tcGlsZVRvRnVuY3Rpb25zLHpzPXYoZnVuY3Rpb24odCl7dmFyIGU9RmUodCk7cmV0dXJuIGUmJmUuaW5uZXJIVE1MfSksS3M9X2UucHJvdG90eXBlLiRtb3VudDtyZXR1cm4gX2UucHJvdG90eXBlLiRtb3VudD1mdW5jdGlvbih0LGUpe2lmKCh0PXQmJkZlKHQpKT09PWRvY3VtZW50LmJvZHl8fHQ9PT1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpcmV0dXJuIHRoaXM7dmFyIG49dGhpcy4kb3B0aW9ucztpZighbi5yZW5kZXIpe3ZhciByPW4udGVtcGxhdGU7aWYocilpZihcInN0cmluZ1wiPT10eXBlb2YgcilcIiNcIj09PXIuY2hhckF0KDApJiYocj16cyhyKSk7ZWxzZXtpZighci5ub2RlVHlwZSlyZXR1cm4gdGhpcztyPXIuaW5uZXJIVE1MfWVsc2UgdCYmKHI9cGkodCkpO2lmKHIpe3ZhciBpPVZzKHIse3Nob3VsZERlY29kZU5ld2xpbmVzOkZhLGRlbGltaXRlcnM6bi5kZWxpbWl0ZXJzLGNvbW1lbnRzOm4uY29tbWVudHN9LHRoaXMpLG89aS5yZW5kZXIsYT1pLnN0YXRpY1JlbmRlckZucztuLnJlbmRlcj1vLG4uc3RhdGljUmVuZGVyRm5zPWF9fXJldHVybiBLcy5jYWxsKHRoaXMsdCxlKX0sX2UuY29tcGlsZT1WcyxfZX0pOyIsIi8qIGF4aW9zIHYwLjE2LjIgfCAoYykgMjAxNyBieSBNYXR0IFphYnJpc2tpZSAqL1xuIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0cy5heGlvcz10KCk6ZS5heGlvcz10KCl9KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17ZXhwb3J0czp7fSxpZDpyLGxvYWRlZDohMX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sb2FkZWQ9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LnA9XCJcIix0KDApfShbZnVuY3Rpb24oZSx0LG4pe2UuZXhwb3J0cz1uKDEpfSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXt2YXIgdD1uZXcgcyhlKSxuPWkocy5wcm90b3R5cGUucmVxdWVzdCx0KTtyZXR1cm4gby5leHRlbmQobixzLnByb3RvdHlwZSx0KSxvLmV4dGVuZChuLHQpLG59dmFyIG89bigyKSxpPW4oMykscz1uKDUpLHU9big2KSxhPXIodSk7YS5BeGlvcz1zLGEuY3JlYXRlPWZ1bmN0aW9uKGUpe3JldHVybiByKG8ubWVyZ2UodSxlKSl9LGEuQ2FuY2VsPW4oMjMpLGEuQ2FuY2VsVG9rZW49bigyNCksYS5pc0NhbmNlbD1uKDIwKSxhLmFsbD1mdW5jdGlvbihlKXtyZXR1cm4gUHJvbWlzZS5hbGwoZSl9LGEuc3ByZWFkPW4oMjUpLGUuZXhwb3J0cz1hLGUuZXhwb3J0cy5kZWZhdWx0PWF9LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PVIuY2FsbChlKX1mdW5jdGlvbiBvKGUpe3JldHVyblwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PVIuY2FsbChlKX1mdW5jdGlvbiBpKGUpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiBGb3JtRGF0YSYmZSBpbnN0YW5jZW9mIEZvcm1EYXRhfWZ1bmN0aW9uIHMoZSl7dmFyIHQ7cmV0dXJuIHQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEFycmF5QnVmZmVyJiZBcnJheUJ1ZmZlci5pc1ZpZXc/QXJyYXlCdWZmZXIuaXNWaWV3KGUpOmUmJmUuYnVmZmVyJiZlLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyfWZ1bmN0aW9uIHUoZSl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIGV9ZnVuY3Rpb24gYShlKXtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgZX1mdW5jdGlvbiBjKGUpe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBlfWZ1bmN0aW9uIGYoZSl7cmV0dXJuIG51bGwhPT1lJiZcIm9iamVjdFwiPT10eXBlb2YgZX1mdW5jdGlvbiBwKGUpe3JldHVyblwiW29iamVjdCBEYXRlXVwiPT09Ui5jYWxsKGUpfWZ1bmN0aW9uIGQoZSl7cmV0dXJuXCJbb2JqZWN0IEZpbGVdXCI9PT1SLmNhbGwoZSl9ZnVuY3Rpb24gbChlKXtyZXR1cm5cIltvYmplY3QgQmxvYl1cIj09PVIuY2FsbChlKX1mdW5jdGlvbiBoKGUpe3JldHVyblwiW29iamVjdCBGdW5jdGlvbl1cIj09PVIuY2FsbChlKX1mdW5jdGlvbiBtKGUpe3JldHVybiBmKGUpJiZoKGUucGlwZSl9ZnVuY3Rpb24geShlKXtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2YgVVJMU2VhcmNoUGFyYW1zJiZlIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zfWZ1bmN0aW9uIHcoZSl7cmV0dXJuIGUucmVwbGFjZSgvXlxccyovLFwiXCIpLnJlcGxhY2UoL1xccyokLyxcIlwiKX1mdW5jdGlvbiB2KCl7cmV0dXJuKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBuYXZpZ2F0b3J8fFwiUmVhY3ROYXRpdmVcIiE9PW5hdmlnYXRvci5wcm9kdWN0KSYmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBkb2N1bWVudCl9ZnVuY3Rpb24gZyhlLHQpe2lmKG51bGwhPT1lJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgZSlpZihcIm9iamVjdFwiPT10eXBlb2YgZXx8cihlKXx8KGU9W2VdKSxyKGUpKWZvcih2YXIgbj0wLG89ZS5sZW5ndGg7bjxvO24rKyl0LmNhbGwobnVsbCxlW25dLG4sZSk7ZWxzZSBmb3IodmFyIGkgaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxpKSYmdC5jYWxsKG51bGwsZVtpXSxpLGUpfWZ1bmN0aW9uIHgoKXtmdW5jdGlvbiBlKGUsbil7XCJvYmplY3RcIj09dHlwZW9mIHRbbl0mJlwib2JqZWN0XCI9PXR5cGVvZiBlP3Rbbl09eCh0W25dLGUpOnRbbl09ZX1mb3IodmFyIHQ9e30sbj0wLHI9YXJndW1lbnRzLmxlbmd0aDtuPHI7bisrKWcoYXJndW1lbnRzW25dLGUpO3JldHVybiB0fWZ1bmN0aW9uIGIoZSx0LG4pe3JldHVybiBnKHQsZnVuY3Rpb24odCxyKXtuJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0P2Vbcl09RSh0LG4pOmVbcl09dH0pLGV9dmFyIEU9bigzKSxDPW4oNCksUj1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO2UuZXhwb3J0cz17aXNBcnJheTpyLGlzQXJyYXlCdWZmZXI6byxpc0J1ZmZlcjpDLGlzRm9ybURhdGE6aSxpc0FycmF5QnVmZmVyVmlldzpzLGlzU3RyaW5nOnUsaXNOdW1iZXI6YSxpc09iamVjdDpmLGlzVW5kZWZpbmVkOmMsaXNEYXRlOnAsaXNGaWxlOmQsaXNCbG9iOmwsaXNGdW5jdGlvbjpoLGlzU3RyZWFtOm0saXNVUkxTZWFyY2hQYXJhbXM6eSxpc1N0YW5kYXJkQnJvd3NlckVudjp2LGZvckVhY2g6ZyxtZXJnZTp4LGV4dGVuZDpiLHRyaW06d319LGZ1bmN0aW9uKGUsdCl7XCJ1c2Ugc3RyaWN0XCI7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPW5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKSxyPTA7cjxuLmxlbmd0aDtyKyspbltyXT1hcmd1bWVudHNbcl07cmV0dXJuIGUuYXBwbHkodCxuKX19fSxmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSl7cmV0dXJuISFlLmNvbnN0cnVjdG9yJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmNvbnN0cnVjdG9yLmlzQnVmZmVyJiZlLmNvbnN0cnVjdG9yLmlzQnVmZmVyKGUpfWZ1bmN0aW9uIHIoZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZS5yZWFkRmxvYXRMRSYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5zbGljZSYmbihlLnNsaWNlKDAsMCkpfS8qIVxuXHQgKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG5cdCAqXG5cdCAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuXHQgKiBAbGljZW5zZSAgTUlUXG5cdCAqL1xuZS5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBudWxsIT1lJiYobihlKXx8cihlKXx8ISFlLl9pc0J1ZmZlcil9fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXt0aGlzLmRlZmF1bHRzPWUsdGhpcy5pbnRlcmNlcHRvcnM9e3JlcXVlc3Q6bmV3IHMscmVzcG9uc2U6bmV3IHN9fXZhciBvPW4oNiksaT1uKDIpLHM9bigxNyksdT1uKDE4KSxhPW4oMjEpLGM9bigyMik7ci5wcm90b3R5cGUucmVxdWVzdD1mdW5jdGlvbihlKXtcInN0cmluZ1wiPT10eXBlb2YgZSYmKGU9aS5tZXJnZSh7dXJsOmFyZ3VtZW50c1swXX0sYXJndW1lbnRzWzFdKSksZT1pLm1lcmdlKG8sdGhpcy5kZWZhdWx0cyx7bWV0aG9kOlwiZ2V0XCJ9LGUpLGUubWV0aG9kPWUubWV0aG9kLnRvTG93ZXJDYXNlKCksZS5iYXNlVVJMJiYhYShlLnVybCkmJihlLnVybD1jKGUuYmFzZVVSTCxlLnVybCkpO3ZhciB0PVt1LHZvaWQgMF0sbj1Qcm9taXNlLnJlc29sdmUoZSk7Zm9yKHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbihlKXt0LnVuc2hpZnQoZS5mdWxmaWxsZWQsZS5yZWplY3RlZCl9KSx0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3QucHVzaChlLmZ1bGZpbGxlZCxlLnJlamVjdGVkKX0pO3QubGVuZ3RoOyluPW4udGhlbih0LnNoaWZ0KCksdC5zaGlmdCgpKTtyZXR1cm4gbn0saS5mb3JFYWNoKFtcImRlbGV0ZVwiLFwiZ2V0XCIsXCJoZWFkXCIsXCJvcHRpb25zXCJdLGZ1bmN0aW9uKGUpe3IucHJvdG90eXBlW2VdPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHRoaXMucmVxdWVzdChpLm1lcmdlKG58fHt9LHttZXRob2Q6ZSx1cmw6dH0pKX19KSxpLmZvckVhY2goW1wicG9zdFwiLFwicHV0XCIsXCJwYXRjaFwiXSxmdW5jdGlvbihlKXtyLnByb3RvdHlwZVtlXT1mdW5jdGlvbih0LG4scil7cmV0dXJuIHRoaXMucmVxdWVzdChpLm1lcmdlKHJ8fHt9LHttZXRob2Q6ZSx1cmw6dCxkYXRhOm59KSl9fSksZS5leHBvcnRzPXJ9LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUsdCl7IWkuaXNVbmRlZmluZWQoZSkmJmkuaXNVbmRlZmluZWQoZVtcIkNvbnRlbnQtVHlwZVwiXSkmJihlW1wiQ29udGVudC1UeXBlXCJdPXQpfWZ1bmN0aW9uIG8oKXt2YXIgZTtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2YgWE1MSHR0cFJlcXVlc3Q/ZT1uKDgpOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBwcm9jZXNzJiYoZT1uKDgpKSxlfXZhciBpPW4oMikscz1uKDcpLHU9e1wiQ29udGVudC1UeXBlXCI6XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIn0sYT17YWRhcHRlcjpvKCksdHJhbnNmb3JtUmVxdWVzdDpbZnVuY3Rpb24oZSx0KXtyZXR1cm4gcyh0LFwiQ29udGVudC1UeXBlXCIpLGkuaXNGb3JtRGF0YShlKXx8aS5pc0FycmF5QnVmZmVyKGUpfHxpLmlzQnVmZmVyKGUpfHxpLmlzU3RyZWFtKGUpfHxpLmlzRmlsZShlKXx8aS5pc0Jsb2IoZSk/ZTppLmlzQXJyYXlCdWZmZXJWaWV3KGUpP2UuYnVmZmVyOmkuaXNVUkxTZWFyY2hQYXJhbXMoZSk/KHIodCxcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04XCIpLGUudG9TdHJpbmcoKSk6aS5pc09iamVjdChlKT8ocih0LFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04XCIpLEpTT04uc3RyaW5naWZ5KGUpKTplfV0sdHJhbnNmb3JtUmVzcG9uc2U6W2Z1bmN0aW9uKGUpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXRyeXtlPUpTT04ucGFyc2UoZSl9Y2F0Y2goZSl7fXJldHVybiBlfV0sdGltZW91dDowLHhzcmZDb29raWVOYW1lOlwiWFNSRi1UT0tFTlwiLHhzcmZIZWFkZXJOYW1lOlwiWC1YU1JGLVRPS0VOXCIsbWF4Q29udGVudExlbmd0aDotMSx2YWxpZGF0ZVN0YXR1czpmdW5jdGlvbihlKXtyZXR1cm4gZT49MjAwJiZlPDMwMH19O2EuaGVhZGVycz17Y29tbW9uOntBY2NlcHQ6XCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLypcIn19LGkuZm9yRWFjaChbXCJkZWxldGVcIixcImdldFwiLFwiaGVhZFwiXSxmdW5jdGlvbihlKXthLmhlYWRlcnNbZV09e319KSxpLmZvckVhY2goW1wicG9zdFwiLFwicHV0XCIsXCJwYXRjaFwiXSxmdW5jdGlvbihlKXthLmhlYWRlcnNbZV09aS5tZXJnZSh1KX0pLGUuZXhwb3J0cz1hfSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigyKTtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0KXtyLmZvckVhY2goZSxmdW5jdGlvbihuLHIpe3IhPT10JiZyLnRvVXBwZXJDYXNlKCk9PT10LnRvVXBwZXJDYXNlKCkmJihlW3RdPW4sZGVsZXRlIGVbcl0pfSl9fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigyKSxvPW4oOSksaT1uKDEyKSxzPW4oMTMpLHU9bigxNCksYT1uKDEwKSxjPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5idG9hJiZ3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdyl8fG4oMTUpO2UuZXhwb3J0cz1mdW5jdGlvbihlKXtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24odCxmKXt2YXIgcD1lLmRhdGEsZD1lLmhlYWRlcnM7ci5pc0Zvcm1EYXRhKHApJiZkZWxldGUgZFtcIkNvbnRlbnQtVHlwZVwiXTt2YXIgbD1uZXcgWE1MSHR0cFJlcXVlc3QsaD1cIm9ucmVhZHlzdGF0ZWNoYW5nZVwiLG09ITE7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIHdpbmRvd3x8IXdpbmRvdy5YRG9tYWluUmVxdWVzdHx8XCJ3aXRoQ3JlZGVudGlhbHNcImluIGx8fHUoZS51cmwpfHwobD1uZXcgd2luZG93LlhEb21haW5SZXF1ZXN0LGg9XCJvbmxvYWRcIixtPSEwLGwub25wcm9ncmVzcz1mdW5jdGlvbigpe30sbC5vbnRpbWVvdXQ9ZnVuY3Rpb24oKXt9KSxlLmF1dGgpe3ZhciB5PWUuYXV0aC51c2VybmFtZXx8XCJcIix3PWUuYXV0aC5wYXNzd29yZHx8XCJcIjtkLkF1dGhvcml6YXRpb249XCJCYXNpYyBcIitjKHkrXCI6XCIrdyl9aWYobC5vcGVuKGUubWV0aG9kLnRvVXBwZXJDYXNlKCksaShlLnVybCxlLnBhcmFtcyxlLnBhcmFtc1NlcmlhbGl6ZXIpLCEwKSxsLnRpbWVvdXQ9ZS50aW1lb3V0LGxbaF09ZnVuY3Rpb24oKXtpZihsJiYoND09PWwucmVhZHlTdGF0ZXx8bSkmJigwIT09bC5zdGF0dXN8fGwucmVzcG9uc2VVUkwmJjA9PT1sLnJlc3BvbnNlVVJMLmluZGV4T2YoXCJmaWxlOlwiKSkpe3ZhciBuPVwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzXCJpbiBsP3MobC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk6bnVsbCxyPWUucmVzcG9uc2VUeXBlJiZcInRleHRcIiE9PWUucmVzcG9uc2VUeXBlP2wucmVzcG9uc2U6bC5yZXNwb25zZVRleHQsaT17ZGF0YTpyLHN0YXR1czoxMjIzPT09bC5zdGF0dXM/MjA0Omwuc3RhdHVzLHN0YXR1c1RleHQ6MTIyMz09PWwuc3RhdHVzP1wiTm8gQ29udGVudFwiOmwuc3RhdHVzVGV4dCxoZWFkZXJzOm4sY29uZmlnOmUscmVxdWVzdDpsfTtvKHQsZixpKSxsPW51bGx9fSxsLm9uZXJyb3I9ZnVuY3Rpb24oKXtmKGEoXCJOZXR3b3JrIEVycm9yXCIsZSxudWxsLGwpKSxsPW51bGx9LGwub250aW1lb3V0PWZ1bmN0aW9uKCl7ZihhKFwidGltZW91dCBvZiBcIitlLnRpbWVvdXQrXCJtcyBleGNlZWRlZFwiLGUsXCJFQ09OTkFCT1JURURcIixsKSksbD1udWxsfSxyLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpe3ZhciB2PW4oMTYpLGc9KGUud2l0aENyZWRlbnRpYWxzfHx1KGUudXJsKSkmJmUueHNyZkNvb2tpZU5hbWU/di5yZWFkKGUueHNyZkNvb2tpZU5hbWUpOnZvaWQgMDtnJiYoZFtlLnhzcmZIZWFkZXJOYW1lXT1nKX1pZihcInNldFJlcXVlc3RIZWFkZXJcImluIGwmJnIuZm9yRWFjaChkLGZ1bmN0aW9uKGUsdCl7XCJ1bmRlZmluZWRcIj09dHlwZW9mIHAmJlwiY29udGVudC10eXBlXCI9PT10LnRvTG93ZXJDYXNlKCk/ZGVsZXRlIGRbdF06bC5zZXRSZXF1ZXN0SGVhZGVyKHQsZSl9KSxlLndpdGhDcmVkZW50aWFscyYmKGwud2l0aENyZWRlbnRpYWxzPSEwKSxlLnJlc3BvbnNlVHlwZSl0cnl7bC5yZXNwb25zZVR5cGU9ZS5yZXNwb25zZVR5cGV9Y2F0Y2godCl7aWYoXCJqc29uXCIhPT1lLnJlc3BvbnNlVHlwZSl0aHJvdyB0fVwiZnVuY3Rpb25cIj09dHlwZW9mIGUub25Eb3dubG9hZFByb2dyZXNzJiZsLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLGUub25Eb3dubG9hZFByb2dyZXNzKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLm9uVXBsb2FkUHJvZ3Jlc3MmJmwudXBsb2FkJiZsLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKFwicHJvZ3Jlc3NcIixlLm9uVXBsb2FkUHJvZ3Jlc3MpLGUuY2FuY2VsVG9rZW4mJmUuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uKGUpe2wmJihsLmFib3J0KCksZihlKSxsPW51bGwpfSksdm9pZCAwPT09cCYmKHA9bnVsbCksbC5zZW5kKHApfSl9fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigxMCk7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuKXt2YXIgbz1uLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztuLnN0YXR1cyYmbyYmIW8obi5zdGF0dXMpP3QocihcIlJlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgXCIrbi5zdGF0dXMsbi5jb25maWcsbnVsbCxuLnJlcXVlc3QsbikpOmUobil9fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigxMSk7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLG8saSl7dmFyIHM9bmV3IEVycm9yKGUpO3JldHVybiByKHMsdCxuLG8saSl9fSxmdW5jdGlvbihlLHQpe1widXNlIHN0cmljdFwiO2UuZXhwb3J0cz1mdW5jdGlvbihlLHQsbixyLG8pe3JldHVybiBlLmNvbmZpZz10LG4mJihlLmNvZGU9biksZS5yZXF1ZXN0PXIsZS5yZXNwb25zZT1vLGV9fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGUpLnJlcGxhY2UoLyU0MC9naSxcIkBcIikucmVwbGFjZSgvJTNBL2dpLFwiOlwiKS5yZXBsYWNlKC8lMjQvZyxcIiRcIikucmVwbGFjZSgvJTJDL2dpLFwiLFwiKS5yZXBsYWNlKC8lMjAvZyxcIitcIikucmVwbGFjZSgvJTVCL2dpLFwiW1wiKS5yZXBsYWNlKC8lNUQvZ2ksXCJdXCIpfXZhciBvPW4oMik7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuKXtpZighdClyZXR1cm4gZTt2YXIgaTtpZihuKWk9bih0KTtlbHNlIGlmKG8uaXNVUkxTZWFyY2hQYXJhbXModCkpaT10LnRvU3RyaW5nKCk7ZWxzZXt2YXIgcz1bXTtvLmZvckVhY2godCxmdW5jdGlvbihlLHQpe251bGwhPT1lJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgZSYmKG8uaXNBcnJheShlKSYmKHQrPVwiW11cIiksby5pc0FycmF5KGUpfHwoZT1bZV0pLG8uZm9yRWFjaChlLGZ1bmN0aW9uKGUpe28uaXNEYXRlKGUpP2U9ZS50b0lTT1N0cmluZygpOm8uaXNPYmplY3QoZSkmJihlPUpTT04uc3RyaW5naWZ5KGUpKSxzLnB1c2gocih0KStcIj1cIityKGUpKX0pKX0pLGk9cy5qb2luKFwiJlwiKX1yZXR1cm4gaSYmKGUrPShlLmluZGV4T2YoXCI/XCIpPT09LTE/XCI/XCI6XCImXCIpK2kpLGV9fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigyKTtlLmV4cG9ydHM9ZnVuY3Rpb24oZSl7dmFyIHQsbixvLGk9e307cmV0dXJuIGU/KHIuZm9yRWFjaChlLnNwbGl0KFwiXFxuXCIpLGZ1bmN0aW9uKGUpe289ZS5pbmRleE9mKFwiOlwiKSx0PXIudHJpbShlLnN1YnN0cigwLG8pKS50b0xvd2VyQ2FzZSgpLG49ci50cmltKGUuc3Vic3RyKG8rMSkpLHQmJihpW3RdPWlbdF0/aVt0XStcIiwgXCIrbjpuKX0pLGkpOml9fSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigyKTtlLmV4cG9ydHM9ci5pc1N0YW5kYXJkQnJvd3NlckVudigpP2Z1bmN0aW9uKCl7ZnVuY3Rpb24gZShlKXt2YXIgdD1lO3JldHVybiBuJiYoby5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsdCksdD1vLmhyZWYpLG8uc2V0QXR0cmlidXRlKFwiaHJlZlwiLHQpLHtocmVmOm8uaHJlZixwcm90b2NvbDpvLnByb3RvY29sP28ucHJvdG9jb2wucmVwbGFjZSgvOiQvLFwiXCIpOlwiXCIsaG9zdDpvLmhvc3Qsc2VhcmNoOm8uc2VhcmNoP28uc2VhcmNoLnJlcGxhY2UoL15cXD8vLFwiXCIpOlwiXCIsaGFzaDpvLmhhc2g/by5oYXNoLnJlcGxhY2UoL14jLyxcIlwiKTpcIlwiLGhvc3RuYW1lOm8uaG9zdG5hbWUscG9ydDpvLnBvcnQscGF0aG5hbWU6XCIvXCI9PT1vLnBhdGhuYW1lLmNoYXJBdCgwKT9vLnBhdGhuYW1lOlwiL1wiK28ucGF0aG5hbWV9fXZhciB0LG49Lyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO3JldHVybiB0PWUod2luZG93LmxvY2F0aW9uLmhyZWYpLGZ1bmN0aW9uKG4pe3ZhciBvPXIuaXNTdHJpbmcobik/ZShuKTpuO3JldHVybiBvLnByb3RvY29sPT09dC5wcm90b2NvbCYmby5ob3N0PT09dC5ob3N0fX0oKTpmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiEwfX0oKX0sZnVuY3Rpb24oZSx0KXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKCl7dGhpcy5tZXNzYWdlPVwiU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyXCJ9ZnVuY3Rpb24gcihlKXtmb3IodmFyIHQscixpPVN0cmluZyhlKSxzPVwiXCIsdT0wLGE9bztpLmNoYXJBdCgwfHUpfHwoYT1cIj1cIix1JTEpO3MrPWEuY2hhckF0KDYzJnQ+PjgtdSUxKjgpKXtpZihyPWkuY2hhckNvZGVBdCh1Kz0uNzUpLHI+MjU1KXRocm93IG5ldyBuO3Q9dDw8OHxyfXJldHVybiBzfXZhciBvPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtuLnByb3RvdHlwZT1uZXcgRXJyb3Isbi5wcm90b3R5cGUuY29kZT01LG4ucHJvdG90eXBlLm5hbWU9XCJJbnZhbGlkQ2hhcmFjdGVyRXJyb3JcIixlLmV4cG9ydHM9cn0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMik7ZS5leHBvcnRzPXIuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKT9mdW5jdGlvbigpe3JldHVybnt3cml0ZTpmdW5jdGlvbihlLHQsbixvLGkscyl7dmFyIHU9W107dS5wdXNoKGUrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KHQpKSxyLmlzTnVtYmVyKG4pJiZ1LnB1c2goXCJleHBpcmVzPVwiK25ldyBEYXRlKG4pLnRvR01UU3RyaW5nKCkpLHIuaXNTdHJpbmcobykmJnUucHVzaChcInBhdGg9XCIrbyksci5pc1N0cmluZyhpKSYmdS5wdXNoKFwiZG9tYWluPVwiK2kpLHM9PT0hMCYmdS5wdXNoKFwic2VjdXJlXCIpLGRvY3VtZW50LmNvb2tpZT11LmpvaW4oXCI7IFwiKX0scmVhZDpmdW5jdGlvbihlKXt2YXIgdD1kb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cChcIihefDtcXFxccyopKFwiK2UrXCIpPShbXjtdKilcIikpO3JldHVybiB0P2RlY29kZVVSSUNvbXBvbmVudCh0WzNdKTpudWxsfSxyZW1vdmU6ZnVuY3Rpb24oZSl7dGhpcy53cml0ZShlLFwiXCIsRGF0ZS5ub3coKS04NjRlNSl9fX0oKTpmdW5jdGlvbigpe3JldHVybnt3cml0ZTpmdW5jdGlvbigpe30scmVhZDpmdW5jdGlvbigpe3JldHVybiBudWxsfSxyZW1vdmU6ZnVuY3Rpb24oKXt9fX0oKX0sZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoKXt0aGlzLmhhbmRsZXJzPVtdfXZhciBvPW4oMik7ci5wcm90b3R5cGUudXNlPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuaGFuZGxlcnMucHVzaCh7ZnVsZmlsbGVkOmUscmVqZWN0ZWQ6dH0pLHRoaXMuaGFuZGxlcnMubGVuZ3RoLTF9LHIucHJvdG90eXBlLmVqZWN0PWZ1bmN0aW9uKGUpe3RoaXMuaGFuZGxlcnNbZV0mJih0aGlzLmhhbmRsZXJzW2VdPW51bGwpfSxyLnByb3RvdHlwZS5mb3JFYWNoPWZ1bmN0aW9uKGUpe28uZm9yRWFjaCh0aGlzLmhhbmRsZXJzLGZ1bmN0aW9uKHQpe251bGwhPT10JiZlKHQpfSl9LGUuZXhwb3J0cz1yfSxmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtlLmNhbmNlbFRva2VuJiZlLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKX12YXIgbz1uKDIpLGk9bigxOSkscz1uKDIwKSx1PW4oNik7ZS5leHBvcnRzPWZ1bmN0aW9uKGUpe3IoZSksZS5oZWFkZXJzPWUuaGVhZGVyc3x8e30sZS5kYXRhPWkoZS5kYXRhLGUuaGVhZGVycyxlLnRyYW5zZm9ybVJlcXVlc3QpLGUuaGVhZGVycz1vLm1lcmdlKGUuaGVhZGVycy5jb21tb258fHt9LGUuaGVhZGVyc1tlLm1ldGhvZF18fHt9LGUuaGVhZGVyc3x8e30pLG8uZm9yRWFjaChbXCJkZWxldGVcIixcImdldFwiLFwiaGVhZFwiLFwicG9zdFwiLFwicHV0XCIsXCJwYXRjaFwiLFwiY29tbW9uXCJdLGZ1bmN0aW9uKHQpe2RlbGV0ZSBlLmhlYWRlcnNbdF19KTt2YXIgdD1lLmFkYXB0ZXJ8fHUuYWRhcHRlcjtyZXR1cm4gdChlKS50aGVuKGZ1bmN0aW9uKHQpe3JldHVybiByKGUpLHQuZGF0YT1pKHQuZGF0YSx0LmhlYWRlcnMsZS50cmFuc2Zvcm1SZXNwb25zZSksdH0sZnVuY3Rpb24odCl7cmV0dXJuIHModCl8fChyKGUpLHQmJnQucmVzcG9uc2UmJih0LnJlc3BvbnNlLmRhdGE9aSh0LnJlc3BvbnNlLmRhdGEsdC5yZXNwb25zZS5oZWFkZXJzLGUudHJhbnNmb3JtUmVzcG9uc2UpKSksUHJvbWlzZS5yZWplY3QodCl9KX19LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDIpO2UuZXhwb3J0cz1mdW5jdGlvbihlLHQsbil7cmV0dXJuIHIuZm9yRWFjaChuLGZ1bmN0aW9uKG4pe2U9bihlLHQpfSksZX19LGZ1bmN0aW9uKGUsdCl7XCJ1c2Ugc3RyaWN0XCI7ZS5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiEoIWV8fCFlLl9fQ0FOQ0VMX18pfX0sZnVuY3Rpb24oZSx0KXtcInVzZSBzdHJpY3RcIjtlLmV4cG9ydHM9ZnVuY3Rpb24oZSl7cmV0dXJuL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KGUpfX0sZnVuY3Rpb24oZSx0KXtcInVzZSBzdHJpY3RcIjtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdD9lLnJlcGxhY2UoL1xcLyskLyxcIlwiKStcIi9cIit0LnJlcGxhY2UoL15cXC8rLyxcIlwiKTplfX0sZnVuY3Rpb24oZSx0KXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKGUpe3RoaXMubWVzc2FnZT1lfW4ucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJDYW5jZWxcIisodGhpcy5tZXNzYWdlP1wiOiBcIit0aGlzLm1lc3NhZ2U6XCJcIil9LG4ucHJvdG90eXBlLl9fQ0FOQ0VMX189ITAsZS5leHBvcnRzPW59LGZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpdGhyb3cgbmV3IFR5cGVFcnJvcihcImV4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi5cIik7dmFyIHQ7dGhpcy5wcm9taXNlPW5ldyBQcm9taXNlKGZ1bmN0aW9uKGUpe3Q9ZX0pO3ZhciBuPXRoaXM7ZShmdW5jdGlvbihlKXtuLnJlYXNvbnx8KG4ucmVhc29uPW5ldyBvKGUpLHQobi5yZWFzb24pKX0pfXZhciBvPW4oMjMpO3IucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQ9ZnVuY3Rpb24oKXtpZih0aGlzLnJlYXNvbil0aHJvdyB0aGlzLnJlYXNvbn0sci5zb3VyY2U9ZnVuY3Rpb24oKXt2YXIgZSx0PW5ldyByKGZ1bmN0aW9uKHQpe2U9dH0pO3JldHVybnt0b2tlbjp0LGNhbmNlbDplfX0sZS5leHBvcnRzPXJ9LGZ1bmN0aW9uKGUsdCl7XCJ1c2Ugc3RyaWN0XCI7ZS5leHBvcnRzPWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gZS5hcHBseShudWxsLHQpfX19XSl9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF4aW9zLm1pbi5tYXAiLCIvKlxuKiBib290c3RyYXAtdGFibGUgLSB2MS4xMS4xIC0gMjAxNy0wMi0yMlxuKiBodHRwczovL2dpdGh1Yi5jb20vd2VuemhpeGluL2Jvb3RzdHJhcC10YWJsZVxuKiBDb3B5cmlnaHQgKGMpIDIwMTcgemhpeGluIHdlblxuKiBMaWNlbnNlZCBNSVQgTGljZW5zZVxuKi9cbiFmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjt2YXIgYj1udWxsLGM9ZnVuY3Rpb24oYSl7dmFyIGI9YXJndW1lbnRzLGM9ITAsZD0xO3JldHVybiBhPWEucmVwbGFjZSgvJXMvZyxmdW5jdGlvbigpe3ZhciBhPWJbZCsrXTtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYT8oYz0hMSxcIlwiKTphfSksYz9hOlwiXCJ9LGQ9ZnVuY3Rpb24oYixjLGQsZSl7dmFyIGY9XCJcIjtyZXR1cm4gYS5lYWNoKGIsZnVuY3Rpb24oYSxiKXtyZXR1cm4gYltjXT09PWU/KGY9YltkXSwhMSk6ITB9KSxmfSxlPWZ1bmN0aW9uKGIsYyl7dmFyIGQ9LTE7cmV0dXJuIGEuZWFjaChiLGZ1bmN0aW9uKGEsYil7cmV0dXJuIGIuZmllbGQ9PT1jPyhkPWEsITEpOiEwfSksZH0sZj1mdW5jdGlvbihiKXt2YXIgYyxkLGUsZj0wLGc9W107Zm9yKGM9MDtjPGJbMF0ubGVuZ3RoO2MrKylmKz1iWzBdW2NdLmNvbHNwYW58fDE7Zm9yKGM9MDtjPGIubGVuZ3RoO2MrKylmb3IoZ1tjXT1bXSxkPTA7Zj5kO2QrKylnW2NdW2RdPSExO2ZvcihjPTA7YzxiLmxlbmd0aDtjKyspZm9yKGQ9MDtkPGJbY10ubGVuZ3RoO2QrKyl7dmFyIGg9YltjXVtkXSxpPWgucm93c3Bhbnx8MSxqPWguY29sc3Bhbnx8MSxrPWEuaW5BcnJheSghMSxnW2NdKTtmb3IoMT09PWomJihoLmZpZWxkSW5kZXg9ayxcInVuZGVmaW5lZFwiPT10eXBlb2YgaC5maWVsZCYmKGguZmllbGQ9aykpLGU9MDtpPmU7ZSsrKWdbYytlXVtrXT0hMDtmb3IoZT0wO2o+ZTtlKyspZ1tjXVtrK2VdPSEwfX0sZz1mdW5jdGlvbigpe2lmKG51bGw9PT1iKXt2YXIgYyxkLGU9YShcIjxwLz5cIikuYWRkQ2xhc3MoXCJmaXhlZC10YWJsZS1zY3JvbGwtaW5uZXJcIiksZj1hKFwiPGRpdi8+XCIpLmFkZENsYXNzKFwiZml4ZWQtdGFibGUtc2Nyb2xsLW91dGVyXCIpO2YuYXBwZW5kKGUpLGEoXCJib2R5XCIpLmFwcGVuZChmKSxjPWVbMF0ub2Zmc2V0V2lkdGgsZi5jc3MoXCJvdmVyZmxvd1wiLFwic2Nyb2xsXCIpLGQ9ZVswXS5vZmZzZXRXaWR0aCxjPT09ZCYmKGQ9ZlswXS5jbGllbnRXaWR0aCksZi5yZW1vdmUoKSxiPWMtZH1yZXR1cm4gYn0saD1mdW5jdGlvbihiLGQsZSxmKXt2YXIgZz1kO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBkKXt2YXIgaD1kLnNwbGl0KFwiLlwiKTtoLmxlbmd0aD4xPyhnPXdpbmRvdyxhLmVhY2goaCxmdW5jdGlvbihhLGIpe2c9Z1tiXX0pKTpnPXdpbmRvd1tkXX1yZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgZz9nOlwiZnVuY3Rpb25cIj09dHlwZW9mIGc/Zy5hcHBseShiLGV8fFtdKTohZyYmXCJzdHJpbmdcIj09dHlwZW9mIGQmJmMuYXBwbHkodGhpcyxbZF0uY29uY2F0KGUpKT9jLmFwcGx5KHRoaXMsW2RdLmNvbmNhdChlKSk6Zn0saT1mdW5jdGlvbihiLGMsZCl7dmFyIGU9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYiksZj1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjKSxnPVwiXCI7aWYoZCYmZS5sZW5ndGghPT1mLmxlbmd0aClyZXR1cm4hMTtmb3IodmFyIGg9MDtoPGUubGVuZ3RoO2grKylpZihnPWVbaF0sYS5pbkFycmF5KGcsZik+LTEmJmJbZ10hPT1jW2ddKXJldHVybiExO3JldHVybiEwfSxqPWZ1bmN0aW9uKGEpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBhP2EucmVwbGFjZSgvJi9nLFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csXCImZ3Q7XCIpLnJlcGxhY2UoL1wiL2csXCImcXVvdDtcIikucmVwbGFjZSgvJy9nLFwiJiMwMzk7XCIpLnJlcGxhY2UoL2AvZyxcIiYjeDYwO1wiKTphfSxrPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYiBpbiBhKXt2YXIgYz1iLnNwbGl0KC8oPz1bQS1aXSkvKS5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO2MhPT1iJiYoYVtjXT1hW2JdLGRlbGV0ZSBhW2JdKX1yZXR1cm4gYX0sbD1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9YTtpZihcInN0cmluZ1wiIT10eXBlb2YgYnx8YS5oYXNPd25Qcm9wZXJ0eShiKSlyZXR1cm4gYz9qKGFbYl0pOmFbYl07dmFyIGU9Yi5zcGxpdChcIi5cIik7Zm9yKHZhciBmIGluIGUpZS5oYXNPd25Qcm9wZXJ0eShmKSYmKGQ9ZCYmZFtlW2ZdXSk7cmV0dXJuIGM/aihkKTpkfSxtPWZ1bmN0aW9uKCl7cmV0dXJuISEobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRSBcIik+MHx8bmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvVHJpZGVudC4qcnZcXDoxMVxcLi8pKX0sbj1mdW5jdGlvbigpe09iamVjdC5rZXlzfHwoT2JqZWN0LmtleXM9ZnVuY3Rpb24oKXt2YXIgYT1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LGI9IXt0b1N0cmluZzpudWxsfS5wcm9wZXJ0eUlzRW51bWVyYWJsZShcInRvU3RyaW5nXCIpLGM9W1widG9TdHJpbmdcIixcInRvTG9jYWxlU3RyaW5nXCIsXCJ2YWx1ZU9mXCIsXCJoYXNPd25Qcm9wZXJ0eVwiLFwiaXNQcm90b3R5cGVPZlwiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImNvbnN0cnVjdG9yXCJdLGQ9Yy5sZW5ndGg7cmV0dXJuIGZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBlJiYoXCJmdW5jdGlvblwiIT10eXBlb2YgZXx8bnVsbD09PWUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qua2V5cyBjYWxsZWQgb24gbm9uLW9iamVjdFwiKTt2YXIgZixnLGg9W107Zm9yKGYgaW4gZSlhLmNhbGwoZSxmKSYmaC5wdXNoKGYpO2lmKGIpZm9yKGc9MDtkPmc7ZysrKWEuY2FsbChlLGNbZ10pJiZoLnB1c2goY1tnXSk7cmV0dXJuIGh9fSgpKX0sbz1mdW5jdGlvbihiLGMpe3RoaXMub3B0aW9ucz1jLHRoaXMuJGVsPWEoYiksdGhpcy4kZWxfPXRoaXMuJGVsLmNsb25lKCksdGhpcy50aW1lb3V0SWRfPTAsdGhpcy50aW1lb3V0Rm9vdGVyXz0wLHRoaXMuaW5pdCgpfTtvLkRFRkFVTFRTPXtjbGFzc2VzOlwidGFibGUgdGFibGUtaG92ZXJcIixzb3J0Q2xhc3M6dm9pZCAwLGxvY2FsZTp2b2lkIDAsaGVpZ2h0OnZvaWQgMCx1bmRlZmluZWRUZXh0OlwiLVwiLHNvcnROYW1lOnZvaWQgMCxzb3J0T3JkZXI6XCJhc2NcIixzb3J0U3RhYmxlOiExLHN0cmlwZWQ6ITEsY29sdW1uczpbW11dLGRhdGE6W10sdG90YWxGaWVsZDpcInRvdGFsXCIsZGF0YUZpZWxkOlwicm93c1wiLG1ldGhvZDpcImdldFwiLHVybDp2b2lkIDAsYWpheDp2b2lkIDAsY2FjaGU6ITAsY29udGVudFR5cGU6XCJhcHBsaWNhdGlvbi9qc29uXCIsZGF0YVR5cGU6XCJqc29uXCIsYWpheE9wdGlvbnM6e30scXVlcnlQYXJhbXM6ZnVuY3Rpb24oYSl7cmV0dXJuIGF9LHF1ZXJ5UGFyYW1zVHlwZTpcImxpbWl0XCIscmVzcG9uc2VIYW5kbGVyOmZ1bmN0aW9uKGEpe3JldHVybiBhfSxwYWdpbmF0aW9uOiExLG9ubHlJbmZvUGFnaW5hdGlvbjohMSxwYWdpbmF0aW9uTG9vcDohMCxzaWRlUGFnaW5hdGlvbjpcImNsaWVudFwiLHRvdGFsUm93czowLHBhZ2VOdW1iZXI6MSxwYWdlU2l6ZToxMCxwYWdlTGlzdDpbMTAsMjUsNTAsMTAwXSxwYWdpbmF0aW9uSEFsaWduOlwicmlnaHRcIixwYWdpbmF0aW9uVkFsaWduOlwiYm90dG9tXCIscGFnaW5hdGlvbkRldGFpbEhBbGlnbjpcImxlZnRcIixwYWdpbmF0aW9uUHJlVGV4dDpcIiZsc2FxdW87XCIscGFnaW5hdGlvbk5leHRUZXh0OlwiJnJzYXF1bztcIixzZWFyY2g6ITEsc2VhcmNoT25FbnRlcktleTohMSxzdHJpY3RTZWFyY2g6ITEsc2VhcmNoQWxpZ246XCJyaWdodFwiLHNlbGVjdEl0ZW1OYW1lOlwiYnRTZWxlY3RJdGVtXCIsc2hvd0hlYWRlcjohMCxzaG93Rm9vdGVyOiExLHNob3dDb2x1bW5zOiExLHNob3dQYWdpbmF0aW9uU3dpdGNoOiExLHNob3dSZWZyZXNoOiExLHNob3dUb2dnbGU6ITEsYnV0dG9uc0FsaWduOlwicmlnaHRcIixzbWFydERpc3BsYXk6ITAsZXNjYXBlOiExLG1pbmltdW1Db3VudENvbHVtbnM6MSxpZEZpZWxkOnZvaWQgMCx1bmlxdWVJZDp2b2lkIDAsY2FyZFZpZXc6ITEsZGV0YWlsVmlldzohMSxkZXRhaWxGb3JtYXR0ZXI6ZnVuY3Rpb24oKXtyZXR1cm5cIlwifSx0cmltT25TZWFyY2g6ITAsY2xpY2tUb1NlbGVjdDohMSxzaW5nbGVTZWxlY3Q6ITEsdG9vbGJhcjp2b2lkIDAsdG9vbGJhckFsaWduOlwibGVmdFwiLGNoZWNrYm94SGVhZGVyOiEwLHNvcnRhYmxlOiEwLHNpbGVudFNvcnQ6ITAsbWFpbnRhaW5TZWxlY3RlZDohMSxzZWFyY2hUaW1lT3V0OjUwMCxzZWFyY2hUZXh0OlwiXCIsaWNvblNpemU6dm9pZCAwLGJ1dHRvbnNDbGFzczpcImRlZmF1bHRcIixpY29uc1ByZWZpeDpcImdseXBoaWNvblwiLGljb25zOntwYWdpbmF0aW9uU3dpdGNoRG93bjpcImdseXBoaWNvbi1jb2xsYXBzZS1kb3duIGljb24tY2hldnJvbi1kb3duXCIscGFnaW5hdGlvblN3aXRjaFVwOlwiZ2x5cGhpY29uLWNvbGxhcHNlLXVwIGljb24tY2hldnJvbi11cFwiLHJlZnJlc2g6XCJnbHlwaGljb24tcmVmcmVzaCBpY29uLXJlZnJlc2hcIix0b2dnbGU6XCJnbHlwaGljb24tbGlzdC1hbHQgaWNvbi1saXN0LWFsdFwiLGNvbHVtbnM6XCJnbHlwaGljb24tdGggaWNvbi10aFwiLGRldGFpbE9wZW46XCJnbHlwaGljb24tcGx1cyBpY29uLXBsdXNcIixkZXRhaWxDbG9zZTpcImdseXBoaWNvbi1taW51cyBpY29uLW1pbnVzXCJ9LGN1c3RvbVNlYXJjaDphLm5vb3AsY3VzdG9tU29ydDphLm5vb3Ascm93U3R5bGU6ZnVuY3Rpb24oKXtyZXR1cm57fX0scm93QXR0cmlidXRlczpmdW5jdGlvbigpe3JldHVybnt9fSxmb290ZXJTdHlsZTpmdW5jdGlvbigpe3JldHVybnt9fSxvbkFsbDpmdW5jdGlvbigpe3JldHVybiExfSxvbkNsaWNrQ2VsbDpmdW5jdGlvbigpe3JldHVybiExfSxvbkRibENsaWNrQ2VsbDpmdW5jdGlvbigpe3JldHVybiExfSxvbkNsaWNrUm93OmZ1bmN0aW9uKCl7cmV0dXJuITF9LG9uRGJsQ2xpY2tSb3c6ZnVuY3Rpb24oKXtyZXR1cm4hMX0sb25Tb3J0OmZ1bmN0aW9uKCl7cmV0dXJuITF9LG9uQ2hlY2s6ZnVuY3Rpb24oKXtyZXR1cm4hMX0sb25VbmNoZWNrOmZ1bmN0aW9uKCl7cmV0dXJuITF9LG9uQ2hlY2tBbGw6ZnVuY3Rpb24oKXtyZXR1cm4hMX0sb25VbmNoZWNrQWxsOmZ1bmN0aW9uKCl7cmV0dXJuITF9LG9uQ2hlY2tTb21lOmZ1bmN0aW9uKCl7cmV0dXJuITF9LG9uVW5jaGVja1NvbWU6ZnVuY3Rpb24oKXtyZXR1cm4hMX0sb25Mb2FkU3VjY2VzczpmdW5jdGlvbigpe3JldHVybiExfSxvbkxvYWRFcnJvcjpmdW5jdGlvbigpe3JldHVybiExfSxvbkNvbHVtblN3aXRjaDpmdW5jdGlvbigpe3JldHVybiExfSxvblBhZ2VDaGFuZ2U6ZnVuY3Rpb24oKXtyZXR1cm4hMX0sb25TZWFyY2g6ZnVuY3Rpb24oKXtyZXR1cm4hMX0sb25Ub2dnbGU6ZnVuY3Rpb24oKXtyZXR1cm4hMX0sb25QcmVCb2R5OmZ1bmN0aW9uKCl7cmV0dXJuITF9LG9uUG9zdEJvZHk6ZnVuY3Rpb24oKXtyZXR1cm4hMX0sb25Qb3N0SGVhZGVyOmZ1bmN0aW9uKCl7cmV0dXJuITF9LG9uRXhwYW5kUm93OmZ1bmN0aW9uKCl7cmV0dXJuITF9LG9uQ29sbGFwc2VSb3c6ZnVuY3Rpb24oKXtyZXR1cm4hMX0sb25SZWZyZXNoT3B0aW9uczpmdW5jdGlvbigpe3JldHVybiExfSxvblJlZnJlc2g6ZnVuY3Rpb24oKXtyZXR1cm4hMX0sb25SZXNldFZpZXc6ZnVuY3Rpb24oKXtyZXR1cm4hMX19LG8uTE9DQUxFUz17fSxvLkxPQ0FMRVNbXCJlbi1VU1wiXT1vLkxPQ0FMRVMuZW49e2Zvcm1hdExvYWRpbmdNZXNzYWdlOmZ1bmN0aW9uKCl7cmV0dXJuXCJMb2FkaW5nLCBwbGVhc2Ugd2FpdC4uLlwifSxmb3JtYXRSZWNvcmRzUGVyUGFnZTpmdW5jdGlvbihhKXtyZXR1cm4gYyhcIiVzIHJvd3MgcGVyIHBhZ2VcIixhKX0sZm9ybWF0U2hvd2luZ1Jvd3M6ZnVuY3Rpb24oYSxiLGQpe3JldHVybiBjKFwiU2hvd2luZyAlcyB0byAlcyBvZiAlcyByb3dzXCIsYSxiLGQpfSxmb3JtYXREZXRhaWxQYWdpbmF0aW9uOmZ1bmN0aW9uKGEpe3JldHVybiBjKFwiU2hvd2luZyAlcyByb3dzXCIsYSl9LGZvcm1hdFNlYXJjaDpmdW5jdGlvbigpe3JldHVyblwiU2VhcmNoXCJ9LGZvcm1hdE5vTWF0Y2hlczpmdW5jdGlvbigpe3JldHVyblwiTm8gbWF0Y2hpbmcgcmVjb3JkcyBmb3VuZFwifSxmb3JtYXRQYWdpbmF0aW9uU3dpdGNoOmZ1bmN0aW9uKCl7cmV0dXJuXCJIaWRlL1Nob3cgcGFnaW5hdGlvblwifSxmb3JtYXRSZWZyZXNoOmZ1bmN0aW9uKCl7cmV0dXJuXCJSZWZyZXNoXCJ9LGZvcm1hdFRvZ2dsZTpmdW5jdGlvbigpe3JldHVyblwiVG9nZ2xlXCJ9LGZvcm1hdENvbHVtbnM6ZnVuY3Rpb24oKXtyZXR1cm5cIkNvbHVtbnNcIn0sZm9ybWF0QWxsUm93czpmdW5jdGlvbigpe3JldHVyblwiQWxsXCJ9fSxhLmV4dGVuZChvLkRFRkFVTFRTLG8uTE9DQUxFU1tcImVuLVVTXCJdKSxvLkNPTFVNTl9ERUZBVUxUUz17cmFkaW86ITEsY2hlY2tib3g6ITEsY2hlY2tib3hFbmFibGVkOiEwLGZpZWxkOnZvaWQgMCx0aXRsZTp2b2lkIDAsdGl0bGVUb29sdGlwOnZvaWQgMCxcImNsYXNzXCI6dm9pZCAwLGFsaWduOnZvaWQgMCxoYWxpZ246dm9pZCAwLGZhbGlnbjp2b2lkIDAsdmFsaWduOnZvaWQgMCx3aWR0aDp2b2lkIDAsc29ydGFibGU6ITEsb3JkZXI6XCJhc2NcIix2aXNpYmxlOiEwLHN3aXRjaGFibGU6ITAsY2xpY2tUb1NlbGVjdDohMCxmb3JtYXR0ZXI6dm9pZCAwLGZvb3RlckZvcm1hdHRlcjp2b2lkIDAsZXZlbnRzOnZvaWQgMCxzb3J0ZXI6dm9pZCAwLHNvcnROYW1lOnZvaWQgMCxjZWxsU3R5bGU6dm9pZCAwLHNlYXJjaGFibGU6ITAsc2VhcmNoRm9ybWF0dGVyOiEwLGNhcmRWaXNpYmxlOiEwLGVzY2FwZTohMX0sby5FVkVOVFM9e1wiYWxsLmJzLnRhYmxlXCI6XCJvbkFsbFwiLFwiY2xpY2stY2VsbC5icy50YWJsZVwiOlwib25DbGlja0NlbGxcIixcImRibC1jbGljay1jZWxsLmJzLnRhYmxlXCI6XCJvbkRibENsaWNrQ2VsbFwiLFwiY2xpY2stcm93LmJzLnRhYmxlXCI6XCJvbkNsaWNrUm93XCIsXCJkYmwtY2xpY2stcm93LmJzLnRhYmxlXCI6XCJvbkRibENsaWNrUm93XCIsXCJzb3J0LmJzLnRhYmxlXCI6XCJvblNvcnRcIixcImNoZWNrLmJzLnRhYmxlXCI6XCJvbkNoZWNrXCIsXCJ1bmNoZWNrLmJzLnRhYmxlXCI6XCJvblVuY2hlY2tcIixcImNoZWNrLWFsbC5icy50YWJsZVwiOlwib25DaGVja0FsbFwiLFwidW5jaGVjay1hbGwuYnMudGFibGVcIjpcIm9uVW5jaGVja0FsbFwiLFwiY2hlY2stc29tZS5icy50YWJsZVwiOlwib25DaGVja1NvbWVcIixcInVuY2hlY2stc29tZS5icy50YWJsZVwiOlwib25VbmNoZWNrU29tZVwiLFwibG9hZC1zdWNjZXNzLmJzLnRhYmxlXCI6XCJvbkxvYWRTdWNjZXNzXCIsXCJsb2FkLWVycm9yLmJzLnRhYmxlXCI6XCJvbkxvYWRFcnJvclwiLFwiY29sdW1uLXN3aXRjaC5icy50YWJsZVwiOlwib25Db2x1bW5Td2l0Y2hcIixcInBhZ2UtY2hhbmdlLmJzLnRhYmxlXCI6XCJvblBhZ2VDaGFuZ2VcIixcInNlYXJjaC5icy50YWJsZVwiOlwib25TZWFyY2hcIixcInRvZ2dsZS5icy50YWJsZVwiOlwib25Ub2dnbGVcIixcInByZS1ib2R5LmJzLnRhYmxlXCI6XCJvblByZUJvZHlcIixcInBvc3QtYm9keS5icy50YWJsZVwiOlwib25Qb3N0Qm9keVwiLFwicG9zdC1oZWFkZXIuYnMudGFibGVcIjpcIm9uUG9zdEhlYWRlclwiLFwiZXhwYW5kLXJvdy5icy50YWJsZVwiOlwib25FeHBhbmRSb3dcIixcImNvbGxhcHNlLXJvdy5icy50YWJsZVwiOlwib25Db2xsYXBzZVJvd1wiLFwicmVmcmVzaC1vcHRpb25zLmJzLnRhYmxlXCI6XCJvblJlZnJlc2hPcHRpb25zXCIsXCJyZXNldC12aWV3LmJzLnRhYmxlXCI6XCJvblJlc2V0Vmlld1wiLFwicmVmcmVzaC5icy50YWJsZVwiOlwib25SZWZyZXNoXCJ9LG8ucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXt0aGlzLmluaXRMb2NhbGUoKSx0aGlzLmluaXRDb250YWluZXIoKSx0aGlzLmluaXRUYWJsZSgpLHRoaXMuaW5pdEhlYWRlcigpLHRoaXMuaW5pdERhdGEoKSx0aGlzLmluaXRIaWRkZW5Sb3dzKCksdGhpcy5pbml0Rm9vdGVyKCksdGhpcy5pbml0VG9vbGJhcigpLHRoaXMuaW5pdFBhZ2luYXRpb24oKSx0aGlzLmluaXRCb2R5KCksdGhpcy5pbml0U2VhcmNoVGV4dCgpLHRoaXMuaW5pdFNlcnZlcigpfSxvLnByb3RvdHlwZS5pbml0TG9jYWxlPWZ1bmN0aW9uKCl7aWYodGhpcy5vcHRpb25zLmxvY2FsZSl7dmFyIGI9dGhpcy5vcHRpb25zLmxvY2FsZS5zcGxpdCgvLXxfLyk7YlswXS50b0xvd2VyQ2FzZSgpLGJbMV0mJmJbMV0udG9VcHBlckNhc2UoKSxhLmZuLmJvb3RzdHJhcFRhYmxlLmxvY2FsZXNbdGhpcy5vcHRpb25zLmxvY2FsZV0/YS5leHRlbmQodGhpcy5vcHRpb25zLGEuZm4uYm9vdHN0cmFwVGFibGUubG9jYWxlc1t0aGlzLm9wdGlvbnMubG9jYWxlXSk6YS5mbi5ib290c3RyYXBUYWJsZS5sb2NhbGVzW2Iuam9pbihcIi1cIildP2EuZXh0ZW5kKHRoaXMub3B0aW9ucyxhLmZuLmJvb3RzdHJhcFRhYmxlLmxvY2FsZXNbYi5qb2luKFwiLVwiKV0pOmEuZm4uYm9vdHN0cmFwVGFibGUubG9jYWxlc1tiWzBdXSYmYS5leHRlbmQodGhpcy5vcHRpb25zLGEuZm4uYm9vdHN0cmFwVGFibGUubG9jYWxlc1tiWzBdXSl9fSxvLnByb3RvdHlwZS5pbml0Q29udGFpbmVyPWZ1bmN0aW9uKCl7dGhpcy4kY29udGFpbmVyPWEoWyc8ZGl2IGNsYXNzPVwiYm9vdHN0cmFwLXRhYmxlXCI+JywnPGRpdiBjbGFzcz1cImZpeGVkLXRhYmxlLXRvb2xiYXJcIj48L2Rpdj4nLFwidG9wXCI9PT10aGlzLm9wdGlvbnMucGFnaW5hdGlvblZBbGlnbnx8XCJib3RoXCI9PT10aGlzLm9wdGlvbnMucGFnaW5hdGlvblZBbGlnbj8nPGRpdiBjbGFzcz1cImZpeGVkLXRhYmxlLXBhZ2luYXRpb25cIiBzdHlsZT1cImNsZWFyOiBib3RoO1wiPjwvZGl2Pic6XCJcIiwnPGRpdiBjbGFzcz1cImZpeGVkLXRhYmxlLWNvbnRhaW5lclwiPicsJzxkaXYgY2xhc3M9XCJmaXhlZC10YWJsZS1oZWFkZXJcIj48dGFibGU+PC90YWJsZT48L2Rpdj4nLCc8ZGl2IGNsYXNzPVwiZml4ZWQtdGFibGUtYm9keVwiPicsJzxkaXYgY2xhc3M9XCJmaXhlZC10YWJsZS1sb2FkaW5nXCI+Jyx0aGlzLm9wdGlvbnMuZm9ybWF0TG9hZGluZ01lc3NhZ2UoKSxcIjwvZGl2PlwiLFwiPC9kaXY+XCIsJzxkaXYgY2xhc3M9XCJmaXhlZC10YWJsZS1mb290ZXJcIj48dGFibGU+PHRyPjwvdHI+PC90YWJsZT48L2Rpdj4nLFwiYm90dG9tXCI9PT10aGlzLm9wdGlvbnMucGFnaW5hdGlvblZBbGlnbnx8XCJib3RoXCI9PT10aGlzLm9wdGlvbnMucGFnaW5hdGlvblZBbGlnbj8nPGRpdiBjbGFzcz1cImZpeGVkLXRhYmxlLXBhZ2luYXRpb25cIj48L2Rpdj4nOlwiXCIsXCI8L2Rpdj5cIixcIjwvZGl2PlwiXS5qb2luKFwiXCIpKSx0aGlzLiRjb250YWluZXIuaW5zZXJ0QWZ0ZXIodGhpcy4kZWwpLHRoaXMuJHRhYmxlQ29udGFpbmVyPXRoaXMuJGNvbnRhaW5lci5maW5kKFwiLmZpeGVkLXRhYmxlLWNvbnRhaW5lclwiKSx0aGlzLiR0YWJsZUhlYWRlcj10aGlzLiRjb250YWluZXIuZmluZChcIi5maXhlZC10YWJsZS1oZWFkZXJcIiksdGhpcy4kdGFibGVCb2R5PXRoaXMuJGNvbnRhaW5lci5maW5kKFwiLmZpeGVkLXRhYmxlLWJvZHlcIiksdGhpcy4kdGFibGVMb2FkaW5nPXRoaXMuJGNvbnRhaW5lci5maW5kKFwiLmZpeGVkLXRhYmxlLWxvYWRpbmdcIiksdGhpcy4kdGFibGVGb290ZXI9dGhpcy4kY29udGFpbmVyLmZpbmQoXCIuZml4ZWQtdGFibGUtZm9vdGVyXCIpLHRoaXMuJHRvb2xiYXI9dGhpcy4kY29udGFpbmVyLmZpbmQoXCIuZml4ZWQtdGFibGUtdG9vbGJhclwiKSx0aGlzLiRwYWdpbmF0aW9uPXRoaXMuJGNvbnRhaW5lci5maW5kKFwiLmZpeGVkLXRhYmxlLXBhZ2luYXRpb25cIiksdGhpcy4kdGFibGVCb2R5LmFwcGVuZCh0aGlzLiRlbCksdGhpcy4kY29udGFpbmVyLmFmdGVyKCc8ZGl2IGNsYXNzPVwiY2xlYXJmaXhcIj48L2Rpdj4nKSx0aGlzLiRlbC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMuY2xhc3NlcyksdGhpcy5vcHRpb25zLnN0cmlwZWQmJnRoaXMuJGVsLmFkZENsYXNzKFwidGFibGUtc3RyaXBlZFwiKSwtMSE9PWEuaW5BcnJheShcInRhYmxlLW5vLWJvcmRlcmVkXCIsdGhpcy5vcHRpb25zLmNsYXNzZXMuc3BsaXQoXCIgXCIpKSYmdGhpcy4kdGFibGVDb250YWluZXIuYWRkQ2xhc3MoXCJ0YWJsZS1uby1ib3JkZXJlZFwiKX0sby5wcm90b3R5cGUuaW5pdFRhYmxlPWZ1bmN0aW9uKCl7dmFyIGI9dGhpcyxjPVtdLGQ9W107aWYodGhpcy4kaGVhZGVyPXRoaXMuJGVsLmZpbmQoXCI+dGhlYWRcIiksdGhpcy4kaGVhZGVyLmxlbmd0aHx8KHRoaXMuJGhlYWRlcj1hKFwiPHRoZWFkPjwvdGhlYWQ+XCIpLmFwcGVuZFRvKHRoaXMuJGVsKSksdGhpcy4kaGVhZGVyLmZpbmQoXCJ0clwiKS5lYWNoKGZ1bmN0aW9uKCl7dmFyIGI9W107YSh0aGlzKS5maW5kKFwidGhcIikuZWFjaChmdW5jdGlvbigpe1widW5kZWZpbmVkXCIhPXR5cGVvZiBhKHRoaXMpLmRhdGEoXCJmaWVsZFwiKSYmYSh0aGlzKS5kYXRhKFwiZmllbGRcIixhKHRoaXMpLmRhdGEoXCJmaWVsZFwiKStcIlwiKSxiLnB1c2goYS5leHRlbmQoe30se3RpdGxlOmEodGhpcykuaHRtbCgpLFwiY2xhc3NcIjphKHRoaXMpLmF0dHIoXCJjbGFzc1wiKSx0aXRsZVRvb2x0aXA6YSh0aGlzKS5hdHRyKFwidGl0bGVcIikscm93c3BhbjphKHRoaXMpLmF0dHIoXCJyb3dzcGFuXCIpPythKHRoaXMpLmF0dHIoXCJyb3dzcGFuXCIpOnZvaWQgMCxjb2xzcGFuOmEodGhpcykuYXR0cihcImNvbHNwYW5cIik/K2EodGhpcykuYXR0cihcImNvbHNwYW5cIik6dm9pZCAwfSxhKHRoaXMpLmRhdGEoKSkpfSksYy5wdXNoKGIpfSksYS5pc0FycmF5KHRoaXMub3B0aW9ucy5jb2x1bW5zWzBdKXx8KHRoaXMub3B0aW9ucy5jb2x1bW5zPVt0aGlzLm9wdGlvbnMuY29sdW1uc10pLHRoaXMub3B0aW9ucy5jb2x1bW5zPWEuZXh0ZW5kKCEwLFtdLGMsdGhpcy5vcHRpb25zLmNvbHVtbnMpLHRoaXMuY29sdW1ucz1bXSxmKHRoaXMub3B0aW9ucy5jb2x1bW5zKSxhLmVhY2godGhpcy5vcHRpb25zLmNvbHVtbnMsZnVuY3Rpb24oYyxkKXthLmVhY2goZCxmdW5jdGlvbihkLGUpe2U9YS5leHRlbmQoe30sby5DT0xVTU5fREVGQVVMVFMsZSksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGUuZmllbGRJbmRleCYmKGIuY29sdW1uc1tlLmZpZWxkSW5kZXhdPWUpLGIub3B0aW9ucy5jb2x1bW5zW2NdW2RdPWV9KX0pLCF0aGlzLm9wdGlvbnMuZGF0YS5sZW5ndGgpe3ZhciBlPVtdO3RoaXMuJGVsLmZpbmQoXCI+dGJvZHk+dHJcIikuZWFjaChmdW5jdGlvbihjKXt2YXIgZj17fTtmLl9pZD1hKHRoaXMpLmF0dHIoXCJpZFwiKSxmLl9jbGFzcz1hKHRoaXMpLmF0dHIoXCJjbGFzc1wiKSxmLl9kYXRhPWsoYSh0aGlzKS5kYXRhKCkpLGEodGhpcykuZmluZChcIj50ZFwiKS5lYWNoKGZ1bmN0aW9uKGQpe2Zvcih2YXIgZyxoLGk9YSh0aGlzKSxqPStpLmF0dHIoXCJjb2xzcGFuXCIpfHwxLGw9K2kuYXR0cihcInJvd3NwYW5cIil8fDE7ZVtjXSYmZVtjXVtkXTtkKyspO2ZvcihnPWQ7ZCtqPmc7ZysrKWZvcihoPWM7YytsPmg7aCsrKWVbaF18fChlW2hdPVtdKSxlW2hdW2ddPSEwO3ZhciBtPWIuY29sdW1uc1tkXS5maWVsZDtmW21dPWEodGhpcykuaHRtbCgpLGZbXCJfXCIrbStcIl9pZFwiXT1hKHRoaXMpLmF0dHIoXCJpZFwiKSxmW1wiX1wiK20rXCJfY2xhc3NcIl09YSh0aGlzKS5hdHRyKFwiY2xhc3NcIiksZltcIl9cIittK1wiX3Jvd3NwYW5cIl09YSh0aGlzKS5hdHRyKFwicm93c3BhblwiKSxmW1wiX1wiK20rXCJfY29sc3BhblwiXT1hKHRoaXMpLmF0dHIoXCJjb2xzcGFuXCIpLGZbXCJfXCIrbStcIl90aXRsZVwiXT1hKHRoaXMpLmF0dHIoXCJ0aXRsZVwiKSxmW1wiX1wiK20rXCJfZGF0YVwiXT1rKGEodGhpcykuZGF0YSgpKX0pLGQucHVzaChmKX0pLHRoaXMub3B0aW9ucy5kYXRhPWQsZC5sZW5ndGgmJih0aGlzLmZyb21IdG1sPSEwKX19LG8ucHJvdG90eXBlLmluaXRIZWFkZXI9ZnVuY3Rpb24oKXt2YXIgYj10aGlzLGQ9e30sZT1bXTt0aGlzLmhlYWRlcj17ZmllbGRzOltdLHN0eWxlczpbXSxjbGFzc2VzOltdLGZvcm1hdHRlcnM6W10sZXZlbnRzOltdLHNvcnRlcnM6W10sc29ydE5hbWVzOltdLGNlbGxTdHlsZXM6W10sc2VhcmNoYWJsZXM6W119LGEuZWFjaCh0aGlzLm9wdGlvbnMuY29sdW1ucyxmdW5jdGlvbihmLGcpe2UucHVzaChcIjx0cj5cIiksMD09PWYmJiFiLm9wdGlvbnMuY2FyZFZpZXcmJmIub3B0aW9ucy5kZXRhaWxWaWV3JiZlLnB1c2goYygnPHRoIGNsYXNzPVwiZGV0YWlsXCIgcm93c3Bhbj1cIiVzXCI+PGRpdiBjbGFzcz1cImZodC1jZWxsXCI+PC9kaXY+PC90aD4nLGIub3B0aW9ucy5jb2x1bW5zLmxlbmd0aCkpLGEuZWFjaChnLGZ1bmN0aW9uKGEsZil7dmFyIGc9XCJcIixoPVwiXCIsaT1cIlwiLGs9XCJcIixsPWMoJyBjbGFzcz1cIiVzXCInLGZbXCJjbGFzc1wiXSksbT0oYi5vcHRpb25zLnNvcnRPcmRlcnx8Zi5vcmRlcixcInB4XCIpLG49Zi53aWR0aDtpZih2b2lkIDA9PT1mLndpZHRofHxiLm9wdGlvbnMuY2FyZFZpZXd8fFwic3RyaW5nXCI9PXR5cGVvZiBmLndpZHRoJiYtMSE9PWYud2lkdGguaW5kZXhPZihcIiVcIikmJihtPVwiJVwiKSxmLndpZHRoJiZcInN0cmluZ1wiPT10eXBlb2YgZi53aWR0aCYmKG49Zi53aWR0aC5yZXBsYWNlKFwiJVwiLFwiXCIpLnJlcGxhY2UoXCJweFwiLFwiXCIpKSxoPWMoXCJ0ZXh0LWFsaWduOiAlczsgXCIsZi5oYWxpZ24/Zi5oYWxpZ246Zi5hbGlnbiksaT1jKFwidGV4dC1hbGlnbjogJXM7IFwiLGYuYWxpZ24pLGs9YyhcInZlcnRpY2FsLWFsaWduOiAlczsgXCIsZi52YWxpZ24pLGsrPWMoXCJ3aWR0aDogJXM7IFwiLCFmLmNoZWNrYm94JiYhZi5yYWRpb3x8bj9uP24rbTp2b2lkIDA6XCIzNnB4XCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBmLmZpZWxkSW5kZXgpe2lmKGIuaGVhZGVyLmZpZWxkc1tmLmZpZWxkSW5kZXhdPWYuZmllbGQsYi5oZWFkZXIuc3R5bGVzW2YuZmllbGRJbmRleF09aStrLGIuaGVhZGVyLmNsYXNzZXNbZi5maWVsZEluZGV4XT1sLGIuaGVhZGVyLmZvcm1hdHRlcnNbZi5maWVsZEluZGV4XT1mLmZvcm1hdHRlcixiLmhlYWRlci5ldmVudHNbZi5maWVsZEluZGV4XT1mLmV2ZW50cyxiLmhlYWRlci5zb3J0ZXJzW2YuZmllbGRJbmRleF09Zi5zb3J0ZXIsYi5oZWFkZXIuc29ydE5hbWVzW2YuZmllbGRJbmRleF09Zi5zb3J0TmFtZSxiLmhlYWRlci5jZWxsU3R5bGVzW2YuZmllbGRJbmRleF09Zi5jZWxsU3R5bGUsYi5oZWFkZXIuc2VhcmNoYWJsZXNbZi5maWVsZEluZGV4XT1mLnNlYXJjaGFibGUsIWYudmlzaWJsZSlyZXR1cm47aWYoYi5vcHRpb25zLmNhcmRWaWV3JiYhZi5jYXJkVmlzaWJsZSlyZXR1cm47ZFtmLmZpZWxkXT1mfWUucHVzaChcIjx0aFwiK2MoJyB0aXRsZT1cIiVzXCInLGYudGl0bGVUb29sdGlwKSxmLmNoZWNrYm94fHxmLnJhZGlvP2MoJyBjbGFzcz1cImJzLWNoZWNrYm94ICVzXCInLGZbXCJjbGFzc1wiXXx8XCJcIik6bCxjKCcgc3R5bGU9XCIlc1wiJyxoK2spLGMoJyByb3dzcGFuPVwiJXNcIicsZi5yb3dzcGFuKSxjKCcgY29sc3Bhbj1cIiVzXCInLGYuY29sc3BhbiksYygnIGRhdGEtZmllbGQ9XCIlc1wiJyxmLmZpZWxkKSxcIj5cIiksZS5wdXNoKGMoJzxkaXYgY2xhc3M9XCJ0aC1pbm5lciAlc1wiPicsYi5vcHRpb25zLnNvcnRhYmxlJiZmLnNvcnRhYmxlP1wic29ydGFibGUgYm90aFwiOlwiXCIpKSxnPWIub3B0aW9ucy5lc2NhcGU/aihmLnRpdGxlKTpmLnRpdGxlLGYuY2hlY2tib3gmJighYi5vcHRpb25zLnNpbmdsZVNlbGVjdCYmYi5vcHRpb25zLmNoZWNrYm94SGVhZGVyJiYoZz0nPGlucHV0IG5hbWU9XCJidFNlbGVjdEFsbFwiIHR5cGU9XCJjaGVja2JveFwiIC8+JyksYi5oZWFkZXIuc3RhdGVGaWVsZD1mLmZpZWxkKSxmLnJhZGlvJiYoZz1cIlwiLGIuaGVhZGVyLnN0YXRlRmllbGQ9Zi5maWVsZCxiLm9wdGlvbnMuc2luZ2xlU2VsZWN0PSEwKSxlLnB1c2goZyksZS5wdXNoKFwiPC9kaXY+XCIpLGUucHVzaCgnPGRpdiBjbGFzcz1cImZodC1jZWxsXCI+PC9kaXY+JyksZS5wdXNoKFwiPC9kaXY+XCIpLGUucHVzaChcIjwvdGg+XCIpfSksZS5wdXNoKFwiPC90cj5cIil9KSx0aGlzLiRoZWFkZXIuaHRtbChlLmpvaW4oXCJcIikpLHRoaXMuJGhlYWRlci5maW5kKFwidGhbZGF0YS1maWVsZF1cIikuZWFjaChmdW5jdGlvbigpe2EodGhpcykuZGF0YShkW2EodGhpcykuZGF0YShcImZpZWxkXCIpXSl9KSx0aGlzLiRjb250YWluZXIub2ZmKFwiY2xpY2tcIixcIi50aC1pbm5lclwiKS5vbihcImNsaWNrXCIsXCIudGgtaW5uZXJcIixmdW5jdGlvbihjKXt2YXIgZD1hKHRoaXMpO3JldHVybiBiLm9wdGlvbnMuZGV0YWlsVmlldyYmZC5jbG9zZXN0KFwiLmJvb3RzdHJhcC10YWJsZVwiKVswXSE9PWIuJGNvbnRhaW5lclswXT8hMTp2b2lkKGIub3B0aW9ucy5zb3J0YWJsZSYmZC5wYXJlbnQoKS5kYXRhKCkuc29ydGFibGUmJmIub25Tb3J0KGMpKX0pLHRoaXMuJGhlYWRlci5jaGlsZHJlbigpLmNoaWxkcmVuKCkub2ZmKFwia2V5cHJlc3NcIikub24oXCJrZXlwcmVzc1wiLGZ1bmN0aW9uKGMpe2lmKGIub3B0aW9ucy5zb3J0YWJsZSYmYSh0aGlzKS5kYXRhKCkuc29ydGFibGUpe3ZhciBkPWMua2V5Q29kZXx8Yy53aGljaDsxMz09ZCYmYi5vblNvcnQoYyl9fSksYSh3aW5kb3cpLm9mZihcInJlc2l6ZS5ib290c3RyYXAtdGFibGVcIiksIXRoaXMub3B0aW9ucy5zaG93SGVhZGVyfHx0aGlzLm9wdGlvbnMuY2FyZFZpZXc/KHRoaXMuJGhlYWRlci5oaWRlKCksdGhpcy4kdGFibGVIZWFkZXIuaGlkZSgpLHRoaXMuJHRhYmxlTG9hZGluZy5jc3MoXCJ0b3BcIiwwKSk6KHRoaXMuJGhlYWRlci5zaG93KCksdGhpcy4kdGFibGVIZWFkZXIuc2hvdygpLHRoaXMuJHRhYmxlTG9hZGluZy5jc3MoXCJ0b3BcIix0aGlzLiRoZWFkZXIub3V0ZXJIZWlnaHQoKSsxKSx0aGlzLmdldENhcmV0KCksYSh3aW5kb3cpLm9uKFwicmVzaXplLmJvb3RzdHJhcC10YWJsZVwiLGEucHJveHkodGhpcy5yZXNldFdpZHRoLHRoaXMpKSksdGhpcy4kc2VsZWN0QWxsPXRoaXMuJGhlYWRlci5maW5kKCdbbmFtZT1cImJ0U2VsZWN0QWxsXCJdJyksdGhpcy4kc2VsZWN0QWxsLm9mZihcImNsaWNrXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe3ZhciBjPWEodGhpcykucHJvcChcImNoZWNrZWRcIik7YltjP1wiY2hlY2tBbGxcIjpcInVuY2hlY2tBbGxcIl0oKSxiLnVwZGF0ZVNlbGVjdGVkKCl9KX0sby5wcm90b3R5cGUuaW5pdEZvb3Rlcj1mdW5jdGlvbigpeyF0aGlzLm9wdGlvbnMuc2hvd0Zvb3Rlcnx8dGhpcy5vcHRpb25zLmNhcmRWaWV3P3RoaXMuJHRhYmxlRm9vdGVyLmhpZGUoKTp0aGlzLiR0YWJsZUZvb3Rlci5zaG93KCl9LG8ucHJvdG90eXBlLmluaXREYXRhPWZ1bmN0aW9uKGEsYil7dGhpcy5kYXRhPVwiYXBwZW5kXCI9PT1iP3RoaXMuZGF0YS5jb25jYXQoYSk6XCJwcmVwZW5kXCI9PT1iP1tdLmNvbmNhdChhKS5jb25jYXQodGhpcy5kYXRhKTphfHx0aGlzLm9wdGlvbnMuZGF0YSx0aGlzLm9wdGlvbnMuZGF0YT1cImFwcGVuZFwiPT09Yj90aGlzLm9wdGlvbnMuZGF0YS5jb25jYXQoYSk6XCJwcmVwZW5kXCI9PT1iP1tdLmNvbmNhdChhKS5jb25jYXQodGhpcy5vcHRpb25zLmRhdGEpOnRoaXMuZGF0YSxcInNlcnZlclwiIT09dGhpcy5vcHRpb25zLnNpZGVQYWdpbmF0aW9uJiZ0aGlzLmluaXRTb3J0KCl9LG8ucHJvdG90eXBlLmluaXRTb3J0PWZ1bmN0aW9uKCl7dmFyIGI9dGhpcyxkPXRoaXMub3B0aW9ucy5zb3J0TmFtZSxlPVwiZGVzY1wiPT09dGhpcy5vcHRpb25zLnNvcnRPcmRlcj8tMToxLGY9YS5pbkFycmF5KHRoaXMub3B0aW9ucy5zb3J0TmFtZSx0aGlzLmhlYWRlci5maWVsZHMpLGc9MDtyZXR1cm4gdGhpcy5vcHRpb25zLmN1c3RvbVNvcnQhPT1hLm5vb3A/dm9pZCB0aGlzLm9wdGlvbnMuY3VzdG9tU29ydC5hcHBseSh0aGlzLFt0aGlzLm9wdGlvbnMuc29ydE5hbWUsdGhpcy5vcHRpb25zLnNvcnRPcmRlcl0pOnZvaWQoLTEhPT1mJiYodGhpcy5vcHRpb25zLnNvcnRTdGFibGUmJmEuZWFjaCh0aGlzLmRhdGEsZnVuY3Rpb24oYSxiKXtiLmhhc093blByb3BlcnR5KFwiX3Bvc2l0aW9uXCIpfHwoYi5fcG9zaXRpb249YSl9KSx0aGlzLmRhdGEuc29ydChmdW5jdGlvbihjLGcpe2IuaGVhZGVyLnNvcnROYW1lc1tmXSYmKGQ9Yi5oZWFkZXIuc29ydE5hbWVzW2ZdKTt2YXIgaT1sKGMsZCxiLm9wdGlvbnMuZXNjYXBlKSxqPWwoZyxkLGIub3B0aW9ucy5lc2NhcGUpLGs9aChiLmhlYWRlcixiLmhlYWRlci5zb3J0ZXJzW2ZdLFtpLGpdKTtyZXR1cm4gdm9pZCAwIT09az9lKms6KCh2b2lkIDA9PT1pfHxudWxsPT09aSkmJihpPVwiXCIpLCh2b2lkIDA9PT1qfHxudWxsPT09aikmJihqPVwiXCIpLGIub3B0aW9ucy5zb3J0U3RhYmxlJiZpPT09aiYmKGk9Yy5fcG9zaXRpb24saj1nLl9wb3NpdGlvbiksYS5pc051bWVyaWMoaSkmJmEuaXNOdW1lcmljKGopPyhpPXBhcnNlRmxvYXQoaSksaj1wYXJzZUZsb2F0KGopLGo+aT8tMSplOmUpOmk9PT1qPzA6KFwic3RyaW5nXCIhPXR5cGVvZiBpJiYoaT1pLnRvU3RyaW5nKCkpLC0xPT09aS5sb2NhbGVDb21wYXJlKGopPy0xKmU6ZSkpfSksdm9pZCAwIT09dGhpcy5vcHRpb25zLnNvcnRDbGFzcyYmKGNsZWFyVGltZW91dChnKSxnPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtiLiRlbC5yZW1vdmVDbGFzcyhiLm9wdGlvbnMuc29ydENsYXNzKTt2YXIgYT1iLiRoZWFkZXIuZmluZChjKCdbZGF0YS1maWVsZD1cIiVzXCJdJyxiLm9wdGlvbnMuc29ydE5hbWUpLmluZGV4KCkrMSk7Yi4kZWwuZmluZChjKFwidHIgdGQ6bnRoLWNoaWxkKCVzKVwiLGEpKS5hZGRDbGFzcyhiLm9wdGlvbnMuc29ydENsYXNzKX0sMjUwKSkpKX0sby5wcm90b3R5cGUub25Tb3J0PWZ1bmN0aW9uKGIpe3ZhciBjPVwia2V5cHJlc3NcIj09PWIudHlwZT9hKGIuY3VycmVudFRhcmdldCk6YShiLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgpLGQ9dGhpcy4kaGVhZGVyLmZpbmQoXCJ0aFwiKS5lcShjLmluZGV4KCkpO3JldHVybiB0aGlzLiRoZWFkZXIuYWRkKHRoaXMuJGhlYWRlcl8pLmZpbmQoXCJzcGFuLm9yZGVyXCIpLnJlbW92ZSgpLHRoaXMub3B0aW9ucy5zb3J0TmFtZT09PWMuZGF0YShcImZpZWxkXCIpP3RoaXMub3B0aW9ucy5zb3J0T3JkZXI9XCJhc2NcIj09PXRoaXMub3B0aW9ucy5zb3J0T3JkZXI/XCJkZXNjXCI6XCJhc2NcIjoodGhpcy5vcHRpb25zLnNvcnROYW1lPWMuZGF0YShcImZpZWxkXCIpLHRoaXMub3B0aW9ucy5zb3J0T3JkZXI9XCJhc2NcIj09PWMuZGF0YShcIm9yZGVyXCIpP1wiZGVzY1wiOlwiYXNjXCIpLHRoaXMudHJpZ2dlcihcInNvcnRcIix0aGlzLm9wdGlvbnMuc29ydE5hbWUsdGhpcy5vcHRpb25zLnNvcnRPcmRlciksYy5hZGQoZCkuZGF0YShcIm9yZGVyXCIsdGhpcy5vcHRpb25zLnNvcnRPcmRlciksdGhpcy5nZXRDYXJldCgpLFwic2VydmVyXCI9PT10aGlzLm9wdGlvbnMuc2lkZVBhZ2luYXRpb24/dm9pZCB0aGlzLmluaXRTZXJ2ZXIodGhpcy5vcHRpb25zLnNpbGVudFNvcnQpOih0aGlzLmluaXRTb3J0KCksdm9pZCB0aGlzLmluaXRCb2R5KCkpfSxvLnByb3RvdHlwZS5pbml0VG9vbGJhcj1mdW5jdGlvbigpe3ZhciBiLGQsZT10aGlzLGY9W10sZz0wLGk9MDt0aGlzLiR0b29sYmFyLmZpbmQoXCIuYnMtYmFyc1wiKS5jaGlsZHJlbigpLmxlbmd0aCYmYShcImJvZHlcIikuYXBwZW5kKGEodGhpcy5vcHRpb25zLnRvb2xiYXIpKSx0aGlzLiR0b29sYmFyLmh0bWwoXCJcIiksKFwic3RyaW5nXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMudG9vbGJhcnx8XCJvYmplY3RcIj09dHlwZW9mIHRoaXMub3B0aW9ucy50b29sYmFyKSYmYShjKCc8ZGl2IGNsYXNzPVwiYnMtYmFycyBwdWxsLSVzXCI+PC9kaXY+Jyx0aGlzLm9wdGlvbnMudG9vbGJhckFsaWduKSkuYXBwZW5kVG8odGhpcy4kdG9vbGJhcikuYXBwZW5kKGEodGhpcy5vcHRpb25zLnRvb2xiYXIpKSxmPVtjKCc8ZGl2IGNsYXNzPVwiY29sdW1ucyBjb2x1bW5zLSVzIGJ0bi1ncm91cCBwdWxsLSVzXCI+Jyx0aGlzLm9wdGlvbnMuYnV0dG9uc0FsaWduLHRoaXMub3B0aW9ucy5idXR0b25zQWxpZ24pXSxcInN0cmluZ1wiPT10eXBlb2YgdGhpcy5vcHRpb25zLmljb25zJiYodGhpcy5vcHRpb25zLmljb25zPWgobnVsbCx0aGlzLm9wdGlvbnMuaWNvbnMpKSx0aGlzLm9wdGlvbnMuc2hvd1BhZ2luYXRpb25Td2l0Y2gmJmYucHVzaChjKCc8YnV0dG9uIGNsYXNzPVwiYnRuJytjKFwiIGJ0bi0lc1wiLHRoaXMub3B0aW9ucy5idXR0b25zQ2xhc3MpK2MoXCIgYnRuLSVzXCIsdGhpcy5vcHRpb25zLmljb25TaXplKSsnXCIgdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJwYWdpbmF0aW9uU3dpdGNoXCIgYXJpYS1sYWJlbD1cInBhZ2luYXRpb24gU3dpdGNoXCIgdGl0bGU9XCIlc1wiPicsdGhpcy5vcHRpb25zLmZvcm1hdFBhZ2luYXRpb25Td2l0Y2goKSksYygnPGkgY2xhc3M9XCIlcyAlc1wiPjwvaT4nLHRoaXMub3B0aW9ucy5pY29uc1ByZWZpeCx0aGlzLm9wdGlvbnMuaWNvbnMucGFnaW5hdGlvblN3aXRjaERvd24pLFwiPC9idXR0b24+XCIpLHRoaXMub3B0aW9ucy5zaG93UmVmcmVzaCYmZi5wdXNoKGMoJzxidXR0b24gY2xhc3M9XCJidG4nK2MoXCIgYnRuLSVzXCIsdGhpcy5vcHRpb25zLmJ1dHRvbnNDbGFzcykrYyhcIiBidG4tJXNcIix0aGlzLm9wdGlvbnMuaWNvblNpemUpKydcIiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cInJlZnJlc2hcIiBhcmlhLWxhYmVsPVwicmVmcmVzaFwiIHRpdGxlPVwiJXNcIj4nLHRoaXMub3B0aW9ucy5mb3JtYXRSZWZyZXNoKCkpLGMoJzxpIGNsYXNzPVwiJXMgJXNcIj48L2k+Jyx0aGlzLm9wdGlvbnMuaWNvbnNQcmVmaXgsdGhpcy5vcHRpb25zLmljb25zLnJlZnJlc2gpLFwiPC9idXR0b24+XCIpLHRoaXMub3B0aW9ucy5zaG93VG9nZ2xlJiZmLnB1c2goYygnPGJ1dHRvbiBjbGFzcz1cImJ0bicrYyhcIiBidG4tJXNcIix0aGlzLm9wdGlvbnMuYnV0dG9uc0NsYXNzKStjKFwiIGJ0bi0lc1wiLHRoaXMub3B0aW9ucy5pY29uU2l6ZSkrJ1wiIHR5cGU9XCJidXR0b25cIiBuYW1lPVwidG9nZ2xlXCIgYXJpYS1sYWJlbD1cInRvZ2dsZVwiIHRpdGxlPVwiJXNcIj4nLHRoaXMub3B0aW9ucy5mb3JtYXRUb2dnbGUoKSksYygnPGkgY2xhc3M9XCIlcyAlc1wiPjwvaT4nLHRoaXMub3B0aW9ucy5pY29uc1ByZWZpeCx0aGlzLm9wdGlvbnMuaWNvbnMudG9nZ2xlKSxcIjwvYnV0dG9uPlwiKSx0aGlzLm9wdGlvbnMuc2hvd0NvbHVtbnMmJihmLnB1c2goYygnPGRpdiBjbGFzcz1cImtlZXAtb3BlbiBidG4tZ3JvdXBcIiB0aXRsZT1cIiVzXCI+Jyx0aGlzLm9wdGlvbnMuZm9ybWF0Q29sdW1ucygpKSwnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cImNvbHVtbnNcIiBjbGFzcz1cImJ0bicrYyhcIiBidG4tJXNcIix0aGlzLm9wdGlvbnMuYnV0dG9uc0NsYXNzKStjKFwiIGJ0bi0lc1wiLHRoaXMub3B0aW9ucy5pY29uU2l6ZSkrJyBkcm9wZG93bi10b2dnbGVcIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCI+JyxjKCc8aSBjbGFzcz1cIiVzICVzXCI+PC9pPicsdGhpcy5vcHRpb25zLmljb25zUHJlZml4LHRoaXMub3B0aW9ucy5pY29ucy5jb2x1bW5zKSwnIDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+JyxcIjwvYnV0dG9uPlwiLCc8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgcm9sZT1cIm1lbnVcIj4nKSxhLmVhY2godGhpcy5jb2x1bW5zLGZ1bmN0aW9uKGEsYil7aWYoIShiLnJhZGlvfHxiLmNoZWNrYm94fHxlLm9wdGlvbnMuY2FyZFZpZXcmJiFiLmNhcmRWaXNpYmxlKSl7dmFyIGQ9Yi52aXNpYmxlPycgY2hlY2tlZD1cImNoZWNrZWRcIic6XCJcIjtiLnN3aXRjaGFibGUmJihmLnB1c2goYygnPGxpIHJvbGU9XCJtZW51aXRlbVwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgZGF0YS1maWVsZD1cIiVzXCIgdmFsdWU9XCIlc1wiJXM+ICVzPC9sYWJlbD48L2xpPicsYi5maWVsZCxhLGQsYi50aXRsZSkpLGkrKyl9fSksZi5wdXNoKFwiPC91bD5cIixcIjwvZGl2PlwiKSksZi5wdXNoKFwiPC9kaXY+XCIpLCh0aGlzLnNob3dUb29sYmFyfHxmLmxlbmd0aD4yKSYmdGhpcy4kdG9vbGJhci5hcHBlbmQoZi5qb2luKFwiXCIpKSx0aGlzLm9wdGlvbnMuc2hvd1BhZ2luYXRpb25Td2l0Y2gmJnRoaXMuJHRvb2xiYXIuZmluZCgnYnV0dG9uW25hbWU9XCJwYWdpbmF0aW9uU3dpdGNoXCJdJykub2ZmKFwiY2xpY2tcIikub24oXCJjbGlja1wiLGEucHJveHkodGhpcy50b2dnbGVQYWdpbmF0aW9uLHRoaXMpKSx0aGlzLm9wdGlvbnMuc2hvd1JlZnJlc2gmJnRoaXMuJHRvb2xiYXIuZmluZCgnYnV0dG9uW25hbWU9XCJyZWZyZXNoXCJdJykub2ZmKFwiY2xpY2tcIikub24oXCJjbGlja1wiLGEucHJveHkodGhpcy5yZWZyZXNoLHRoaXMpKSx0aGlzLm9wdGlvbnMuc2hvd1RvZ2dsZSYmdGhpcy4kdG9vbGJhci5maW5kKCdidXR0b25bbmFtZT1cInRvZ2dsZVwiXScpLm9mZihcImNsaWNrXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe2UudG9nZ2xlVmlldygpfSksdGhpcy5vcHRpb25zLnNob3dDb2x1bW5zJiYoYj10aGlzLiR0b29sYmFyLmZpbmQoXCIua2VlcC1vcGVuXCIpLGk8PXRoaXMub3B0aW9ucy5taW5pbXVtQ291bnRDb2x1bW5zJiZiLmZpbmQoXCJpbnB1dFwiKS5wcm9wKFwiZGlzYWJsZWRcIiwhMCksYi5maW5kKFwibGlcIikub2ZmKFwiY2xpY2tcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKGEpe2Euc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCl9KSxiLmZpbmQoXCJpbnB1dFwiKS5vZmYoXCJjbGlja1wiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXt2YXIgYj1hKHRoaXMpO2UudG9nZ2xlQ29sdW1uKGEodGhpcykudmFsKCksYi5wcm9wKFwiY2hlY2tlZFwiKSwhMSksZS50cmlnZ2VyKFwiY29sdW1uLXN3aXRjaFwiLGEodGhpcykuZGF0YShcImZpZWxkXCIpLGIucHJvcChcImNoZWNrZWRcIikpfSkpLHRoaXMub3B0aW9ucy5zZWFyY2gmJihmPVtdLGYucHVzaCgnPGRpdiBjbGFzcz1cInB1bGwtJyt0aGlzLm9wdGlvbnMuc2VhcmNoQWxpZ24rJyBzZWFyY2hcIj4nLGMoJzxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbCcrYyhcIiBpbnB1dC0lc1wiLHRoaXMub3B0aW9ucy5pY29uU2l6ZSkrJ1wiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCIlc1wiPicsdGhpcy5vcHRpb25zLmZvcm1hdFNlYXJjaCgpKSxcIjwvZGl2PlwiKSx0aGlzLiR0b29sYmFyLmFwcGVuZChmLmpvaW4oXCJcIikpLGQ9dGhpcy4kdG9vbGJhci5maW5kKFwiLnNlYXJjaCBpbnB1dFwiKSxkLm9mZihcImtleXVwIGRyb3AgYmx1clwiKS5vbihcImtleXVwIGRyb3AgYmx1clwiLGZ1bmN0aW9uKGIpe2Uub3B0aW9ucy5zZWFyY2hPbkVudGVyS2V5JiYxMyE9PWIua2V5Q29kZXx8YS5pbkFycmF5KGIua2V5Q29kZSxbMzcsMzgsMzksNDBdKT4tMXx8KGNsZWFyVGltZW91dChnKSxnPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtlLm9uU2VhcmNoKGIpfSxlLm9wdGlvbnMuc2VhcmNoVGltZU91dCkpfSksbSgpJiZkLm9mZihcIm1vdXNldXBcIikub24oXCJtb3VzZXVwXCIsZnVuY3Rpb24oYSl7Y2xlYXJUaW1lb3V0KGcpLGc9c2V0VGltZW91dChmdW5jdGlvbigpe2Uub25TZWFyY2goYSl9LGUub3B0aW9ucy5zZWFyY2hUaW1lT3V0KX0pKX0sby5wcm90b3R5cGUub25TZWFyY2g9ZnVuY3Rpb24oYil7dmFyIGM9YS50cmltKGEoYi5jdXJyZW50VGFyZ2V0KS52YWwoKSk7dGhpcy5vcHRpb25zLnRyaW1PblNlYXJjaCYmYShiLmN1cnJlbnRUYXJnZXQpLnZhbCgpIT09YyYmYShiLmN1cnJlbnRUYXJnZXQpLnZhbChjKSxjIT09dGhpcy5zZWFyY2hUZXh0JiYodGhpcy5zZWFyY2hUZXh0PWMsdGhpcy5vcHRpb25zLnNlYXJjaFRleHQ9Yyx0aGlzLm9wdGlvbnMucGFnZU51bWJlcj0xLHRoaXMuaW5pdFNlYXJjaCgpLHRoaXMudXBkYXRlUGFnaW5hdGlvbigpLHRoaXMudHJpZ2dlcihcInNlYXJjaFwiLGMpKX0sby5wcm90b3R5cGUuaW5pdFNlYXJjaD1mdW5jdGlvbigpe3ZhciBiPXRoaXM7aWYoXCJzZXJ2ZXJcIiE9PXRoaXMub3B0aW9ucy5zaWRlUGFnaW5hdGlvbil7aWYodGhpcy5vcHRpb25zLmN1c3RvbVNlYXJjaCE9PWEubm9vcClyZXR1cm4gdm9pZCB0aGlzLm9wdGlvbnMuY3VzdG9tU2VhcmNoLmFwcGx5KHRoaXMsW3RoaXMuc2VhcmNoVGV4dF0pO3ZhciBjPXRoaXMuc2VhcmNoVGV4dCYmKHRoaXMub3B0aW9ucy5lc2NhcGU/aih0aGlzLnNlYXJjaFRleHQpOnRoaXMuc2VhcmNoVGV4dCkudG9Mb3dlckNhc2UoKSxkPWEuaXNFbXB0eU9iamVjdCh0aGlzLmZpbHRlckNvbHVtbnMpP251bGw6dGhpcy5maWx0ZXJDb2x1bW5zO3RoaXMuZGF0YT1kP2EuZ3JlcCh0aGlzLm9wdGlvbnMuZGF0YSxmdW5jdGlvbihiKXtmb3IodmFyIGMgaW4gZClpZihhLmlzQXJyYXkoZFtjXSkmJi0xPT09YS5pbkFycmF5KGJbY10sZFtjXSl8fCFhLmlzQXJyYXkoZFtjXSkmJmJbY10hPT1kW2NdKXJldHVybiExO3JldHVybiEwfSk6dGhpcy5vcHRpb25zLmRhdGEsdGhpcy5kYXRhPWM/YS5ncmVwKHRoaXMuZGF0YSxmdW5jdGlvbihkLGYpe2Zvcih2YXIgZz0wO2c8Yi5oZWFkZXIuZmllbGRzLmxlbmd0aDtnKyspaWYoYi5oZWFkZXIuc2VhcmNoYWJsZXNbZ10pe3ZhciBpLGo9YS5pc051bWVyaWMoYi5oZWFkZXIuZmllbGRzW2ddKT9wYXJzZUludChiLmhlYWRlci5maWVsZHNbZ10sMTApOmIuaGVhZGVyLmZpZWxkc1tnXSxrPWIuY29sdW1uc1tlKGIuY29sdW1ucyxqKV07aWYoXCJzdHJpbmdcIj09dHlwZW9mIGope2k9ZDtmb3IodmFyIGw9ai5zcGxpdChcIi5cIiksbT0wO208bC5sZW5ndGg7bSsrKWk9aVtsW21dXTtrJiZrLnNlYXJjaEZvcm1hdHRlciYmKGk9aChrLGIuaGVhZGVyLmZvcm1hdHRlcnNbZ10sW2ksZCxmXSxpKSl9ZWxzZSBpPWRbal07aWYoXCJzdHJpbmdcIj09dHlwZW9mIGl8fFwibnVtYmVyXCI9PXR5cGVvZiBpKWlmKGIub3B0aW9ucy5zdHJpY3RTZWFyY2gpe2lmKChpK1wiXCIpLnRvTG93ZXJDYXNlKCk9PT1jKXJldHVybiEwfWVsc2UgaWYoLTEhPT0oaStcIlwiKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYykpcmV0dXJuITB9cmV0dXJuITF9KTp0aGlzLmRhdGF9fSxvLnByb3RvdHlwZS5pbml0UGFnaW5hdGlvbj1mdW5jdGlvbigpe2lmKCF0aGlzLm9wdGlvbnMucGFnaW5hdGlvbilyZXR1cm4gdm9pZCB0aGlzLiRwYWdpbmF0aW9uLmhpZGUoKTt0aGlzLiRwYWdpbmF0aW9uLnNob3coKTt2YXIgYixkLGUsZixnLGgsaSxqLGssbD10aGlzLG09W10sbj0hMSxvPXRoaXMuZ2V0RGF0YSgpLHA9dGhpcy5vcHRpb25zLnBhZ2VMaXN0O2lmKFwic2VydmVyXCIhPT10aGlzLm9wdGlvbnMuc2lkZVBhZ2luYXRpb24mJih0aGlzLm9wdGlvbnMudG90YWxSb3dzPW8ubGVuZ3RoKSx0aGlzLnRvdGFsUGFnZXM9MCx0aGlzLm9wdGlvbnMudG90YWxSb3dzKXtpZih0aGlzLm9wdGlvbnMucGFnZVNpemU9PT10aGlzLm9wdGlvbnMuZm9ybWF0QWxsUm93cygpKXRoaXMub3B0aW9ucy5wYWdlU2l6ZT10aGlzLm9wdGlvbnMudG90YWxSb3dzLG49ITA7ZWxzZSBpZih0aGlzLm9wdGlvbnMucGFnZVNpemU9PT10aGlzLm9wdGlvbnMudG90YWxSb3dzKXt2YXIgcT1cInN0cmluZ1wiPT10eXBlb2YgdGhpcy5vcHRpb25zLnBhZ2VMaXN0P3RoaXMub3B0aW9ucy5wYWdlTGlzdC5yZXBsYWNlKFwiW1wiLFwiXCIpLnJlcGxhY2UoXCJdXCIsXCJcIikucmVwbGFjZSgvIC9nLFwiXCIpLnRvTG93ZXJDYXNlKCkuc3BsaXQoXCIsXCIpOnRoaXMub3B0aW9ucy5wYWdlTGlzdDthLmluQXJyYXkodGhpcy5vcHRpb25zLmZvcm1hdEFsbFJvd3MoKS50b0xvd2VyQ2FzZSgpLHEpPi0xJiYobj0hMCl9dGhpcy50b3RhbFBhZ2VzPX5+KCh0aGlzLm9wdGlvbnMudG90YWxSb3dzLTEpL3RoaXMub3B0aW9ucy5wYWdlU2l6ZSkrMSx0aGlzLm9wdGlvbnMudG90YWxQYWdlcz10aGlzLnRvdGFsUGFnZXN9aWYodGhpcy50b3RhbFBhZ2VzPjAmJnRoaXMub3B0aW9ucy5wYWdlTnVtYmVyPnRoaXMudG90YWxQYWdlcyYmKHRoaXMub3B0aW9ucy5wYWdlTnVtYmVyPXRoaXMudG90YWxQYWdlcyksdGhpcy5wYWdlRnJvbT0odGhpcy5vcHRpb25zLnBhZ2VOdW1iZXItMSkqdGhpcy5vcHRpb25zLnBhZ2VTaXplKzEsdGhpcy5wYWdlVG89dGhpcy5vcHRpb25zLnBhZ2VOdW1iZXIqdGhpcy5vcHRpb25zLnBhZ2VTaXplLHRoaXMucGFnZVRvPnRoaXMub3B0aW9ucy50b3RhbFJvd3MmJih0aGlzLnBhZ2VUbz10aGlzLm9wdGlvbnMudG90YWxSb3dzKSxtLnB1c2goJzxkaXYgY2xhc3M9XCJwdWxsLScrdGhpcy5vcHRpb25zLnBhZ2luYXRpb25EZXRhaWxIQWxpZ24rJyBwYWdpbmF0aW9uLWRldGFpbFwiPicsJzxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbi1pbmZvXCI+Jyx0aGlzLm9wdGlvbnMub25seUluZm9QYWdpbmF0aW9uP3RoaXMub3B0aW9ucy5mb3JtYXREZXRhaWxQYWdpbmF0aW9uKHRoaXMub3B0aW9ucy50b3RhbFJvd3MpOnRoaXMub3B0aW9ucy5mb3JtYXRTaG93aW5nUm93cyh0aGlzLnBhZ2VGcm9tLHRoaXMucGFnZVRvLHRoaXMub3B0aW9ucy50b3RhbFJvd3MpLFwiPC9zcGFuPlwiKSwhdGhpcy5vcHRpb25zLm9ubHlJbmZvUGFnaW5hdGlvbil7bS5wdXNoKCc8c3BhbiBjbGFzcz1cInBhZ2UtbGlzdFwiPicpO3ZhciByPVtjKCc8c3BhbiBjbGFzcz1cImJ0bi1ncm91cCAlc1wiPicsXCJ0b3BcIj09PXRoaXMub3B0aW9ucy5wYWdpbmF0aW9uVkFsaWdufHxcImJvdGhcIj09PXRoaXMub3B0aW9ucy5wYWdpbmF0aW9uVkFsaWduP1wiZHJvcGRvd25cIjpcImRyb3B1cFwiKSwnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4nK2MoXCIgYnRuLSVzXCIsdGhpcy5vcHRpb25zLmJ1dHRvbnNDbGFzcykrYyhcIiBidG4tJXNcIix0aGlzLm9wdGlvbnMuaWNvblNpemUpKycgZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiPicsJzxzcGFuIGNsYXNzPVwicGFnZS1zaXplXCI+JyxuP3RoaXMub3B0aW9ucy5mb3JtYXRBbGxSb3dzKCk6dGhpcy5vcHRpb25zLnBhZ2VTaXplLFwiPC9zcGFuPlwiLCcgPHNwYW4gY2xhc3M9XCJjYXJldFwiPjwvc3Bhbj4nLFwiPC9idXR0b24+XCIsJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiByb2xlPVwibWVudVwiPiddO2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0aGlzLm9wdGlvbnMucGFnZUxpc3Qpe3ZhciBzPXRoaXMub3B0aW9ucy5wYWdlTGlzdC5yZXBsYWNlKFwiW1wiLFwiXCIpLnJlcGxhY2UoXCJdXCIsXCJcIikucmVwbGFjZSgvIC9nLFwiXCIpLnNwbGl0KFwiLFwiKTtwPVtdLGEuZWFjaChzLGZ1bmN0aW9uKGEsYil7cC5wdXNoKGIudG9VcHBlckNhc2UoKT09PWwub3B0aW9ucy5mb3JtYXRBbGxSb3dzKCkudG9VcHBlckNhc2UoKT9sLm9wdGlvbnMuZm9ybWF0QWxsUm93cygpOitiKX0pfWZvcihhLmVhY2gocCxmdW5jdGlvbihhLGIpe2lmKCFsLm9wdGlvbnMuc21hcnREaXNwbGF5fHwwPT09YXx8cFthLTFdPGwub3B0aW9ucy50b3RhbFJvd3Mpe3ZhciBkO2Q9bj9iPT09bC5vcHRpb25zLmZvcm1hdEFsbFJvd3MoKT8nIGNsYXNzPVwiYWN0aXZlXCInOlwiXCI6Yj09PWwub3B0aW9ucy5wYWdlU2l6ZT8nIGNsYXNzPVwiYWN0aXZlXCInOlwiXCIsci5wdXNoKGMoJzxsaSByb2xlPVwibWVudWl0ZW1cIiVzPjxhIGhyZWY9XCIjXCI+JXM8L2E+PC9saT4nLGQsYikpfX0pLHIucHVzaChcIjwvdWw+PC9zcGFuPlwiKSxtLnB1c2godGhpcy5vcHRpb25zLmZvcm1hdFJlY29yZHNQZXJQYWdlKHIuam9pbihcIlwiKSkpLG0ucHVzaChcIjwvc3Bhbj5cIiksbS5wdXNoKFwiPC9kaXY+XCIsJzxkaXYgY2xhc3M9XCJwdWxsLScrdGhpcy5vcHRpb25zLnBhZ2luYXRpb25IQWxpZ24rJyBwYWdpbmF0aW9uXCI+JywnPHVsIGNsYXNzPVwicGFnaW5hdGlvbicrYyhcIiBwYWdpbmF0aW9uLSVzXCIsdGhpcy5vcHRpb25zLmljb25TaXplKSsnXCI+JywnPGxpIGNsYXNzPVwicGFnZS1wcmVcIj48YSBocmVmPVwiI1wiPicrdGhpcy5vcHRpb25zLnBhZ2luYXRpb25QcmVUZXh0K1wiPC9hPjwvbGk+XCIpLHRoaXMudG90YWxQYWdlczw1PyhkPTEsZT10aGlzLnRvdGFsUGFnZXMpOihkPXRoaXMub3B0aW9ucy5wYWdlTnVtYmVyLTIsZT1kKzQsMT5kJiYoZD0xLGU9NSksZT50aGlzLnRvdGFsUGFnZXMmJihlPXRoaXMudG90YWxQYWdlcyxkPWUtNCkpLHRoaXMudG90YWxQYWdlcz49NiYmKHRoaXMub3B0aW9ucy5wYWdlTnVtYmVyPj0zJiYobS5wdXNoKCc8bGkgY2xhc3M9XCJwYWdlLWZpcnN0JysoMT09PXRoaXMub3B0aW9ucy5wYWdlTnVtYmVyP1wiIGFjdGl2ZVwiOlwiXCIpKydcIj4nLCc8YSBocmVmPVwiI1wiPicsMSxcIjwvYT5cIixcIjwvbGk+XCIpLGQrKyksdGhpcy5vcHRpb25zLnBhZ2VOdW1iZXI+PTQmJig0PT10aGlzLm9wdGlvbnMucGFnZU51bWJlcnx8Nj09dGhpcy50b3RhbFBhZ2VzfHw3PT10aGlzLnRvdGFsUGFnZXM/ZC0tOm0ucHVzaCgnPGxpIGNsYXNzPVwicGFnZS1maXJzdC1zZXBhcmF0b3IgZGlzYWJsZWRcIj4nLCc8YSBocmVmPVwiI1wiPi4uLjwvYT4nLFwiPC9saT5cIiksZS0tKSksdGhpcy50b3RhbFBhZ2VzPj03JiZ0aGlzLm9wdGlvbnMucGFnZU51bWJlcj49dGhpcy50b3RhbFBhZ2VzLTImJmQtLSw2PT10aGlzLnRvdGFsUGFnZXM/dGhpcy5vcHRpb25zLnBhZ2VOdW1iZXI+PXRoaXMudG90YWxQYWdlcy0yJiZlKys6dGhpcy50b3RhbFBhZ2VzPj03JiYoNz09dGhpcy50b3RhbFBhZ2VzfHx0aGlzLm9wdGlvbnMucGFnZU51bWJlcj49dGhpcy50b3RhbFBhZ2VzLTMpJiZlKyssYj1kO2U+PWI7YisrKW0ucHVzaCgnPGxpIGNsYXNzPVwicGFnZS1udW1iZXInKyhiPT09dGhpcy5vcHRpb25zLnBhZ2VOdW1iZXI/XCIgYWN0aXZlXCI6XCJcIikrJ1wiPicsJzxhIGhyZWY9XCIjXCI+JyxiLFwiPC9hPlwiLFwiPC9saT5cIik7dGhpcy50b3RhbFBhZ2VzPj04JiZ0aGlzLm9wdGlvbnMucGFnZU51bWJlcjw9dGhpcy50b3RhbFBhZ2VzLTQmJm0ucHVzaCgnPGxpIGNsYXNzPVwicGFnZS1sYXN0LXNlcGFyYXRvciBkaXNhYmxlZFwiPicsJzxhIGhyZWY9XCIjXCI+Li4uPC9hPicsXCI8L2xpPlwiKSx0aGlzLnRvdGFsUGFnZXM+PTYmJnRoaXMub3B0aW9ucy5wYWdlTnVtYmVyPD10aGlzLnRvdGFsUGFnZXMtMyYmbS5wdXNoKCc8bGkgY2xhc3M9XCJwYWdlLWxhc3QnKyh0aGlzLnRvdGFsUGFnZXM9PT10aGlzLm9wdGlvbnMucGFnZU51bWJlcj9cIiBhY3RpdmVcIjpcIlwiKSsnXCI+JywnPGEgaHJlZj1cIiNcIj4nLHRoaXMudG90YWxQYWdlcyxcIjwvYT5cIixcIjwvbGk+XCIpLG0ucHVzaCgnPGxpIGNsYXNzPVwicGFnZS1uZXh0XCI+PGEgaHJlZj1cIiNcIj4nK3RoaXMub3B0aW9ucy5wYWdpbmF0aW9uTmV4dFRleHQrXCI8L2E+PC9saT5cIixcIjwvdWw+XCIsXCI8L2Rpdj5cIil9dGhpcy4kcGFnaW5hdGlvbi5odG1sKG0uam9pbihcIlwiKSksdGhpcy5vcHRpb25zLm9ubHlJbmZvUGFnaW5hdGlvbnx8KGY9dGhpcy4kcGFnaW5hdGlvbi5maW5kKFwiLnBhZ2UtbGlzdCBhXCIpLGc9dGhpcy4kcGFnaW5hdGlvbi5maW5kKFwiLnBhZ2UtZmlyc3RcIiksaD10aGlzLiRwYWdpbmF0aW9uLmZpbmQoXCIucGFnZS1wcmVcIiksaT10aGlzLiRwYWdpbmF0aW9uLmZpbmQoXCIucGFnZS1uZXh0XCIpLGo9dGhpcy4kcGFnaW5hdGlvbi5maW5kKFwiLnBhZ2UtbGFzdFwiKSxrPXRoaXMuJHBhZ2luYXRpb24uZmluZChcIi5wYWdlLW51bWJlclwiKSx0aGlzLm9wdGlvbnMuc21hcnREaXNwbGF5JiYodGhpcy50b3RhbFBhZ2VzPD0xJiZ0aGlzLiRwYWdpbmF0aW9uLmZpbmQoXCJkaXYucGFnaW5hdGlvblwiKS5oaWRlKCksKHAubGVuZ3RoPDJ8fHRoaXMub3B0aW9ucy50b3RhbFJvd3M8PXBbMF0pJiZ0aGlzLiRwYWdpbmF0aW9uLmZpbmQoXCJzcGFuLnBhZ2UtbGlzdFwiKS5oaWRlKCksdGhpcy4kcGFnaW5hdGlvblt0aGlzLmdldERhdGEoKS5sZW5ndGg/XCJzaG93XCI6XCJoaWRlXCJdKCkpLHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uTG9vcHx8KDE9PT10aGlzLm9wdGlvbnMucGFnZU51bWJlciYmaC5hZGRDbGFzcyhcImRpc2FibGVkXCIpLHRoaXMub3B0aW9ucy5wYWdlTnVtYmVyPT09dGhpcy50b3RhbFBhZ2VzJiZpLmFkZENsYXNzKFwiZGlzYWJsZWRcIikpLG4mJih0aGlzLm9wdGlvbnMucGFnZVNpemU9dGhpcy5vcHRpb25zLmZvcm1hdEFsbFJvd3MoKSksZi5vZmYoXCJjbGlja1wiKS5vbihcImNsaWNrXCIsYS5wcm94eSh0aGlzLm9uUGFnZUxpc3RDaGFuZ2UsdGhpcykpLGcub2ZmKFwiY2xpY2tcIikub24oXCJjbGlja1wiLGEucHJveHkodGhpcy5vblBhZ2VGaXJzdCx0aGlzKSksaC5vZmYoXCJjbGlja1wiKS5vbihcImNsaWNrXCIsYS5wcm94eSh0aGlzLm9uUGFnZVByZSx0aGlzKSksaS5vZmYoXCJjbGlja1wiKS5vbihcImNsaWNrXCIsYS5wcm94eSh0aGlzLm9uUGFnZU5leHQsdGhpcykpLGoub2ZmKFwiY2xpY2tcIikub24oXCJjbGlja1wiLGEucHJveHkodGhpcy5vblBhZ2VMYXN0LHRoaXMpKSxrLm9mZihcImNsaWNrXCIpLm9uKFwiY2xpY2tcIixhLnByb3h5KHRoaXMub25QYWdlTnVtYmVyLHRoaXMpKSl9LG8ucHJvdG90eXBlLnVwZGF0ZVBhZ2luYXRpb249ZnVuY3Rpb24oYil7YiYmYShiLmN1cnJlbnRUYXJnZXQpLmhhc0NsYXNzKFwiZGlzYWJsZWRcIil8fCh0aGlzLm9wdGlvbnMubWFpbnRhaW5TZWxlY3RlZHx8dGhpcy5yZXNldFJvd3MoKSx0aGlzLmluaXRQYWdpbmF0aW9uKCksXCJzZXJ2ZXJcIj09PXRoaXMub3B0aW9ucy5zaWRlUGFnaW5hdGlvbj90aGlzLmluaXRTZXJ2ZXIoKTp0aGlzLmluaXRCb2R5KCksdGhpcy50cmlnZ2VyKFwicGFnZS1jaGFuZ2VcIix0aGlzLm9wdGlvbnMucGFnZU51bWJlcix0aGlzLm9wdGlvbnMucGFnZVNpemUpKX0sby5wcm90b3R5cGUub25QYWdlTGlzdENoYW5nZT1mdW5jdGlvbihiKXt2YXIgYz1hKGIuY3VycmVudFRhcmdldCk7cmV0dXJuIGMucGFyZW50KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKSx0aGlzLm9wdGlvbnMucGFnZVNpemU9Yy50ZXh0KCkudG9VcHBlckNhc2UoKT09PXRoaXMub3B0aW9ucy5mb3JtYXRBbGxSb3dzKCkudG9VcHBlckNhc2UoKT90aGlzLm9wdGlvbnMuZm9ybWF0QWxsUm93cygpOitjLnRleHQoKSx0aGlzLiR0b29sYmFyLmZpbmQoXCIucGFnZS1zaXplXCIpLnRleHQodGhpcy5vcHRpb25zLnBhZ2VTaXplKSx0aGlzLnVwZGF0ZVBhZ2luYXRpb24oYiksITF9LG8ucHJvdG90eXBlLm9uUGFnZUZpcnN0PWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLm9wdGlvbnMucGFnZU51bWJlcj0xLHRoaXMudXBkYXRlUGFnaW5hdGlvbihhKSwhMX0sby5wcm90b3R5cGUub25QYWdlUHJlPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLm9wdGlvbnMucGFnZU51bWJlci0xPT09MD90aGlzLm9wdGlvbnMucGFnZU51bWJlcj10aGlzLm9wdGlvbnMudG90YWxQYWdlczp0aGlzLm9wdGlvbnMucGFnZU51bWJlci0tLHRoaXMudXBkYXRlUGFnaW5hdGlvbihhKSwhMX0sby5wcm90b3R5cGUub25QYWdlTmV4dD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5vcHRpb25zLnBhZ2VOdW1iZXIrMT50aGlzLm9wdGlvbnMudG90YWxQYWdlcz90aGlzLm9wdGlvbnMucGFnZU51bWJlcj0xOnRoaXMub3B0aW9ucy5wYWdlTnVtYmVyKyssdGhpcy51cGRhdGVQYWdpbmF0aW9uKGEpLCExfSxvLnByb3RvdHlwZS5vblBhZ2VMYXN0PWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLm9wdGlvbnMucGFnZU51bWJlcj10aGlzLnRvdGFsUGFnZXMsdGhpcy51cGRhdGVQYWdpbmF0aW9uKGEpLCExfSxvLnByb3RvdHlwZS5vblBhZ2VOdW1iZXI9ZnVuY3Rpb24oYil7cmV0dXJuIHRoaXMub3B0aW9ucy5wYWdlTnVtYmVyIT09K2EoYi5jdXJyZW50VGFyZ2V0KS50ZXh0KCk/KHRoaXMub3B0aW9ucy5wYWdlTnVtYmVyPSthKGIuY3VycmVudFRhcmdldCkudGV4dCgpLHRoaXMudXBkYXRlUGFnaW5hdGlvbihiKSwhMSk6dm9pZCAwfSxvLnByb3RvdHlwZS5pbml0Um93PWZ1bmN0aW9uKGIsZSl7dmFyIGYsZz10aGlzLGk9W10saz17fSxtPVtdLG49XCJcIixvPXt9LHA9W107aWYoIShhLmluQXJyYXkoYix0aGlzLmhpZGRlblJvd3MpPi0xKSl7aWYoaz1oKHRoaXMub3B0aW9ucyx0aGlzLm9wdGlvbnMucm93U3R5bGUsW2IsZV0sayksayYmay5jc3MpZm9yKGYgaW4gay5jc3MpbS5wdXNoKGYrXCI6IFwiK2suY3NzW2ZdKTtpZihvPWgodGhpcy5vcHRpb25zLHRoaXMub3B0aW9ucy5yb3dBdHRyaWJ1dGVzLFtiLGVdLG8pKWZvcihmIGluIG8pcC5wdXNoKGMoJyVzPVwiJXNcIicsZixqKG9bZl0pKSk7cmV0dXJuIGIuX2RhdGEmJiFhLmlzRW1wdHlPYmplY3QoYi5fZGF0YSkmJmEuZWFjaChiLl9kYXRhLGZ1bmN0aW9uKGEsYil7XCJpbmRleFwiIT09YSYmKG4rPWMoJyBkYXRhLSVzPVwiJXNcIicsYSxiKSl9KSxpLnB1c2goXCI8dHJcIixjKFwiICVzXCIscC5qb2luKFwiIFwiKSksYygnIGlkPVwiJXNcIicsYS5pc0FycmF5KGIpP3ZvaWQgMDpiLl9pZCksYygnIGNsYXNzPVwiJXNcIicsay5jbGFzc2VzfHwoYS5pc0FycmF5KGIpP3ZvaWQgMDpiLl9jbGFzcykpLGMoJyBkYXRhLWluZGV4PVwiJXNcIicsZSksYygnIGRhdGEtdW5pcXVlaWQ9XCIlc1wiJyxiW3RoaXMub3B0aW9ucy51bmlxdWVJZF0pLGMoXCIlc1wiLG4pLFwiPlwiKSx0aGlzLm9wdGlvbnMuY2FyZFZpZXcmJmkucHVzaChjKCc8dGQgY29sc3Bhbj1cIiVzXCI+PGRpdiBjbGFzcz1cImNhcmQtdmlld3NcIj4nLHRoaXMuaGVhZGVyLmZpZWxkcy5sZW5ndGgpKSwhdGhpcy5vcHRpb25zLmNhcmRWaWV3JiZ0aGlzLm9wdGlvbnMuZGV0YWlsVmlldyYmaS5wdXNoKFwiPHRkPlwiLCc8YSBjbGFzcz1cImRldGFpbC1pY29uXCIgaHJlZj1cIiNcIj4nLGMoJzxpIGNsYXNzPVwiJXMgJXNcIj48L2k+Jyx0aGlzLm9wdGlvbnMuaWNvbnNQcmVmaXgsdGhpcy5vcHRpb25zLmljb25zLmRldGFpbE9wZW4pLFwiPC9hPlwiLFwiPC90ZD5cIiksYS5lYWNoKHRoaXMuaGVhZGVyLmZpZWxkcyxmdW5jdGlvbihmLG4pe3ZhciBvPVwiXCIscD1sKGIsbixnLm9wdGlvbnMuZXNjYXBlKSxxPVwiXCIscj1cIlwiLHM9e30sdD1cIlwiLHU9Zy5oZWFkZXIuY2xhc3Nlc1tmXSx2PVwiXCIsdz1cIlwiLHg9XCJcIix5PVwiXCIsej1nLmNvbHVtbnNbZl07aWYoIShnLmZyb21IdG1sJiZcInVuZGVmaW5lZFwiPT10eXBlb2YgcHx8IXoudmlzaWJsZXx8Zy5vcHRpb25zLmNhcmRWaWV3JiYhei5jYXJkVmlzaWJsZSkpe2lmKHouZXNjYXBlJiYocD1qKHApKSxrPWMoJ3N0eWxlPVwiJXNcIicsbS5jb25jYXQoZy5oZWFkZXIuc3R5bGVzW2ZdKS5qb2luKFwiOyBcIikpLGJbXCJfXCIrbitcIl9pZFwiXSYmKHQ9YygnIGlkPVwiJXNcIicsYltcIl9cIituK1wiX2lkXCJdKSksYltcIl9cIituK1wiX2NsYXNzXCJdJiYodT1jKCcgY2xhc3M9XCIlc1wiJyxiW1wiX1wiK24rXCJfY2xhc3NcIl0pKSxiW1wiX1wiK24rXCJfcm93c3BhblwiXSYmKHc9YygnIHJvd3NwYW49XCIlc1wiJyxiW1wiX1wiK24rXCJfcm93c3BhblwiXSkpLGJbXCJfXCIrbitcIl9jb2xzcGFuXCJdJiYoeD1jKCcgY29sc3Bhbj1cIiVzXCInLGJbXCJfXCIrbitcIl9jb2xzcGFuXCJdKSksYltcIl9cIituK1wiX3RpdGxlXCJdJiYoeT1jKCcgdGl0bGU9XCIlc1wiJyxiW1wiX1wiK24rXCJfdGl0bGVcIl0pKSxzPWgoZy5oZWFkZXIsZy5oZWFkZXIuY2VsbFN0eWxlc1tmXSxbcCxiLGUsbl0scykscy5jbGFzc2VzJiYodT1jKCcgY2xhc3M9XCIlc1wiJyxzLmNsYXNzZXMpKSxzLmNzcyl7dmFyIEE9W107Zm9yKHZhciBCIGluIHMuY3NzKUEucHVzaChCK1wiOiBcIitzLmNzc1tCXSk7az1jKCdzdHlsZT1cIiVzXCInLEEuY29uY2F0KGcuaGVhZGVyLnN0eWxlc1tmXSkuam9pbihcIjsgXCIpKX1xPWgoeixnLmhlYWRlci5mb3JtYXR0ZXJzW2ZdLFtwLGIsZV0scCksYltcIl9cIituK1wiX2RhdGFcIl0mJiFhLmlzRW1wdHlPYmplY3QoYltcIl9cIituK1wiX2RhdGFcIl0pJiZhLmVhY2goYltcIl9cIituK1wiX2RhdGFcIl0sZnVuY3Rpb24oYSxiKXtcImluZGV4XCIhPT1hJiYodis9YygnIGRhdGEtJXM9XCIlc1wiJyxhLGIpKX0pLHouY2hlY2tib3h8fHoucmFkaW8/KHI9ei5jaGVja2JveD9cImNoZWNrYm94XCI6cixyPXoucmFkaW8/XCJyYWRpb1wiOnIsbz1bYyhnLm9wdGlvbnMuY2FyZFZpZXc/JzxkaXYgY2xhc3M9XCJjYXJkLXZpZXcgJXNcIj4nOic8dGQgY2xhc3M9XCJicy1jaGVja2JveCAlc1wiPicseltcImNsYXNzXCJdfHxcIlwiKSxcIjxpbnB1dFwiK2MoJyBkYXRhLWluZGV4PVwiJXNcIicsZSkrYygnIG5hbWU9XCIlc1wiJyxnLm9wdGlvbnMuc2VsZWN0SXRlbU5hbWUpK2MoJyB0eXBlPVwiJXNcIicscikrYygnIHZhbHVlPVwiJXNcIicsYltnLm9wdGlvbnMuaWRGaWVsZF0pK2MoJyBjaGVja2VkPVwiJXNcIicscT09PSEwfHxwfHxxJiZxLmNoZWNrZWQ/XCJjaGVja2VkXCI6dm9pZCAwKStjKCcgZGlzYWJsZWQ9XCIlc1wiJywhei5jaGVja2JveEVuYWJsZWR8fHEmJnEuZGlzYWJsZWQ/XCJkaXNhYmxlZFwiOnZvaWQgMCkrXCIgLz5cIixnLmhlYWRlci5mb3JtYXR0ZXJzW2ZdJiZcInN0cmluZ1wiPT10eXBlb2YgcT9xOlwiXCIsZy5vcHRpb25zLmNhcmRWaWV3P1wiPC9kaXY+XCI6XCI8L3RkPlwiXS5qb2luKFwiXCIpLGJbZy5oZWFkZXIuc3RhdGVGaWVsZF09cT09PSEwfHxxJiZxLmNoZWNrZWQpOihxPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBxfHxudWxsPT09cT9nLm9wdGlvbnMudW5kZWZpbmVkVGV4dDpxLG89Zy5vcHRpb25zLmNhcmRWaWV3P1snPGRpdiBjbGFzcz1cImNhcmQtdmlld1wiPicsZy5vcHRpb25zLnNob3dIZWFkZXI/YygnPHNwYW4gY2xhc3M9XCJ0aXRsZVwiICVzPiVzPC9zcGFuPicsayxkKGcuY29sdW1ucyxcImZpZWxkXCIsXCJ0aXRsZVwiLG4pKTpcIlwiLGMoJzxzcGFuIGNsYXNzPVwidmFsdWVcIj4lczwvc3Bhbj4nLHEpLFwiPC9kaXY+XCJdLmpvaW4oXCJcIik6W2MoXCI8dGQlcyAlcyAlcyAlcyAlcyAlcyAlcz5cIix0LHUsayx2LHcseCx5KSxxLFwiPC90ZD5cIl0uam9pbihcIlwiKSxnLm9wdGlvbnMuY2FyZFZpZXcmJmcub3B0aW9ucy5zbWFydERpc3BsYXkmJlwiXCI9PT1xJiYobz0nPGRpdiBjbGFzcz1cImNhcmQtdmlld1wiPjwvZGl2PicpKSxpLnB1c2gobyl9fSksdGhpcy5vcHRpb25zLmNhcmRWaWV3JiZpLnB1c2goXCI8L2Rpdj48L3RkPlwiKSxpLnB1c2goXCI8L3RyPlwiKSxpLmpvaW4oXCIgXCIpfX0sby5wcm90b3R5cGUuaW5pdEJvZHk9ZnVuY3Rpb24oYil7dmFyIGQ9dGhpcyxmPXRoaXMuZ2V0RGF0YSgpO3RoaXMudHJpZ2dlcihcInByZS1ib2R5XCIsZiksdGhpcy4kYm9keT10aGlzLiRlbC5maW5kKFwiPnRib2R5XCIpLHRoaXMuJGJvZHkubGVuZ3RofHwodGhpcy4kYm9keT1hKFwiPHRib2R5PjwvdGJvZHk+XCIpLmFwcGVuZFRvKHRoaXMuJGVsKSksdGhpcy5vcHRpb25zLnBhZ2luYXRpb24mJlwic2VydmVyXCIhPT10aGlzLm9wdGlvbnMuc2lkZVBhZ2luYXRpb258fCh0aGlzLnBhZ2VGcm9tPTEsdGhpcy5wYWdlVG89Zi5sZW5ndGgpO2Zvcih2YXIgZyxpPWEoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKSxqPXRoaXMucGFnZUZyb20tMTtqPHRoaXMucGFnZVRvO2orKyl7XG52YXIgaz1mW2pdLG09dGhpcy5pbml0Um93KGssaixmLGkpO2c9Z3x8ISFtLG0mJm0hPT0hMCYmaS5hcHBlbmQobSl9Z3x8aS5hcHBlbmQoJzx0ciBjbGFzcz1cIm5vLXJlY29yZHMtZm91bmRcIj4nK2MoJzx0ZCBjb2xzcGFuPVwiJXNcIj4lczwvdGQ+Jyx0aGlzLiRoZWFkZXIuZmluZChcInRoXCIpLmxlbmd0aCx0aGlzLm9wdGlvbnMuZm9ybWF0Tm9NYXRjaGVzKCkpK1wiPC90cj5cIiksdGhpcy4kYm9keS5odG1sKGkpLGJ8fHRoaXMuc2Nyb2xsVG8oMCksdGhpcy4kYm9keS5maW5kKFwiPiB0cltkYXRhLWluZGV4XSA+IHRkXCIpLm9mZihcImNsaWNrIGRibGNsaWNrXCIpLm9uKFwiY2xpY2sgZGJsY2xpY2tcIixmdW5jdGlvbihiKXt2YXIgZj1hKHRoaXMpLGc9Zi5wYXJlbnQoKSxoPWQuZGF0YVtnLmRhdGEoXCJpbmRleFwiKV0saT1mWzBdLmNlbGxJbmRleCxqPWQuZ2V0VmlzaWJsZUZpZWxkcygpLGs9altkLm9wdGlvbnMuZGV0YWlsVmlldyYmIWQub3B0aW9ucy5jYXJkVmlldz9pLTE6aV0sbT1kLmNvbHVtbnNbZShkLmNvbHVtbnMsayldLG49bChoLGssZC5vcHRpb25zLmVzY2FwZSk7aWYoIWYuZmluZChcIi5kZXRhaWwtaWNvblwiKS5sZW5ndGgmJihkLnRyaWdnZXIoXCJjbGlja1wiPT09Yi50eXBlP1wiY2xpY2stY2VsbFwiOlwiZGJsLWNsaWNrLWNlbGxcIixrLG4saCxmKSxkLnRyaWdnZXIoXCJjbGlja1wiPT09Yi50eXBlP1wiY2xpY2stcm93XCI6XCJkYmwtY2xpY2stcm93XCIsaCxnLGspLFwiY2xpY2tcIj09PWIudHlwZSYmZC5vcHRpb25zLmNsaWNrVG9TZWxlY3QmJm0uY2xpY2tUb1NlbGVjdCkpe3ZhciBvPWcuZmluZChjKCdbbmFtZT1cIiVzXCJdJyxkLm9wdGlvbnMuc2VsZWN0SXRlbU5hbWUpKTtvLmxlbmd0aCYmb1swXS5jbGljaygpfX0pLHRoaXMuJGJvZHkuZmluZChcIj4gdHJbZGF0YS1pbmRleF0gPiB0ZCA+IC5kZXRhaWwtaWNvblwiKS5vZmYoXCJjbGlja1wiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXt2YXIgYj1hKHRoaXMpLGU9Yi5wYXJlbnQoKS5wYXJlbnQoKSxnPWUuZGF0YShcImluZGV4XCIpLGk9ZltnXTtpZihlLm5leHQoKS5pcyhcInRyLmRldGFpbC12aWV3XCIpKWIuZmluZChcImlcIikuYXR0cihcImNsYXNzXCIsYyhcIiVzICVzXCIsZC5vcHRpb25zLmljb25zUHJlZml4LGQub3B0aW9ucy5pY29ucy5kZXRhaWxPcGVuKSksZC50cmlnZ2VyKFwiY29sbGFwc2Utcm93XCIsZyxpKSxlLm5leHQoKS5yZW1vdmUoKTtlbHNle2IuZmluZChcImlcIikuYXR0cihcImNsYXNzXCIsYyhcIiVzICVzXCIsZC5vcHRpb25zLmljb25zUHJlZml4LGQub3B0aW9ucy5pY29ucy5kZXRhaWxDbG9zZSkpLGUuYWZ0ZXIoYygnPHRyIGNsYXNzPVwiZGV0YWlsLXZpZXdcIj48dGQgY29sc3Bhbj1cIiVzXCI+PC90ZD48L3RyPicsZS5maW5kKFwidGRcIikubGVuZ3RoKSk7dmFyIGo9ZS5uZXh0KCkuZmluZChcInRkXCIpLGs9aChkLm9wdGlvbnMsZC5vcHRpb25zLmRldGFpbEZvcm1hdHRlcixbZyxpLGpdLFwiXCIpOzE9PT1qLmxlbmd0aCYmai5hcHBlbmQoayksZC50cmlnZ2VyKFwiZXhwYW5kLXJvd1wiLGcsaSxqKX1yZXR1cm4gZC5yZXNldFZpZXcoKSwhMX0pLHRoaXMuJHNlbGVjdEl0ZW09dGhpcy4kYm9keS5maW5kKGMoJ1tuYW1lPVwiJXNcIl0nLHRoaXMub3B0aW9ucy5zZWxlY3RJdGVtTmFtZSkpLHRoaXMuJHNlbGVjdEl0ZW0ub2ZmKFwiY2xpY2tcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKGIpe2Iuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7dmFyIGM9YSh0aGlzKSxlPWMucHJvcChcImNoZWNrZWRcIiksZj1kLmRhdGFbYy5kYXRhKFwiaW5kZXhcIildO2Qub3B0aW9ucy5tYWludGFpblNlbGVjdGVkJiZhKHRoaXMpLmlzKFwiOnJhZGlvXCIpJiZhLmVhY2goZC5vcHRpb25zLmRhdGEsZnVuY3Rpb24oYSxiKXtiW2QuaGVhZGVyLnN0YXRlRmllbGRdPSExfSksZltkLmhlYWRlci5zdGF0ZUZpZWxkXT1lLGQub3B0aW9ucy5zaW5nbGVTZWxlY3QmJihkLiRzZWxlY3RJdGVtLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uKCl7ZC5kYXRhW2EodGhpcykuZGF0YShcImluZGV4XCIpXVtkLmhlYWRlci5zdGF0ZUZpZWxkXT0hMX0pLGQuJHNlbGVjdEl0ZW0uZmlsdGVyKFwiOmNoZWNrZWRcIikubm90KHRoaXMpLnByb3AoXCJjaGVja2VkXCIsITEpKSxkLnVwZGF0ZVNlbGVjdGVkKCksZC50cmlnZ2VyKGU/XCJjaGVja1wiOlwidW5jaGVja1wiLGYsYyl9KSxhLmVhY2godGhpcy5oZWFkZXIuZXZlbnRzLGZ1bmN0aW9uKGIsYyl7aWYoYyl7XCJzdHJpbmdcIj09dHlwZW9mIGMmJihjPWgobnVsbCxjKSk7dmFyIGU9ZC5oZWFkZXIuZmllbGRzW2JdLGY9YS5pbkFycmF5KGUsZC5nZXRWaXNpYmxlRmllbGRzKCkpO2Qub3B0aW9ucy5kZXRhaWxWaWV3JiYhZC5vcHRpb25zLmNhcmRWaWV3JiYoZis9MSk7Zm9yKHZhciBnIGluIGMpZC4kYm9keS5maW5kKFwiPnRyOm5vdCgubm8tcmVjb3Jkcy1mb3VuZClcIikuZWFjaChmdW5jdGlvbigpe3ZhciBiPWEodGhpcyksaD1iLmZpbmQoZC5vcHRpb25zLmNhcmRWaWV3P1wiLmNhcmQtdmlld1wiOlwidGRcIikuZXEoZiksaT1nLmluZGV4T2YoXCIgXCIpLGo9Zy5zdWJzdHJpbmcoMCxpKSxrPWcuc3Vic3RyaW5nKGkrMSksbD1jW2ddO2guZmluZChrKS5vZmYoaikub24oaixmdW5jdGlvbihhKXt2YXIgYz1iLmRhdGEoXCJpbmRleFwiKSxmPWQuZGF0YVtjXSxnPWZbZV07bC5hcHBseSh0aGlzLFthLGcsZixjXSl9KX0pfX0pLHRoaXMudXBkYXRlU2VsZWN0ZWQoKSx0aGlzLnJlc2V0VmlldygpLHRoaXMudHJpZ2dlcihcInBvc3QtYm9keVwiLGYpfSxvLnByb3RvdHlwZS5pbml0U2VydmVyPWZ1bmN0aW9uKGIsYyxkKXt2YXIgZSxmPXRoaXMsZz17fSxpPXtzZWFyY2hUZXh0OnRoaXMuc2VhcmNoVGV4dCxzb3J0TmFtZTp0aGlzLm9wdGlvbnMuc29ydE5hbWUsc29ydE9yZGVyOnRoaXMub3B0aW9ucy5zb3J0T3JkZXJ9O3RoaXMub3B0aW9ucy5wYWdpbmF0aW9uJiYoaS5wYWdlU2l6ZT10aGlzLm9wdGlvbnMucGFnZVNpemU9PT10aGlzLm9wdGlvbnMuZm9ybWF0QWxsUm93cygpP3RoaXMub3B0aW9ucy50b3RhbFJvd3M6dGhpcy5vcHRpb25zLnBhZ2VTaXplLGkucGFnZU51bWJlcj10aGlzLm9wdGlvbnMucGFnZU51bWJlciksKGR8fHRoaXMub3B0aW9ucy51cmx8fHRoaXMub3B0aW9ucy5hamF4KSYmKFwibGltaXRcIj09PXRoaXMub3B0aW9ucy5xdWVyeVBhcmFtc1R5cGUmJihpPXtzZWFyY2g6aS5zZWFyY2hUZXh0LHNvcnQ6aS5zb3J0TmFtZSxvcmRlcjppLnNvcnRPcmRlcn0sdGhpcy5vcHRpb25zLnBhZ2luYXRpb24mJihpLm9mZnNldD10aGlzLm9wdGlvbnMucGFnZVNpemU9PT10aGlzLm9wdGlvbnMuZm9ybWF0QWxsUm93cygpPzA6dGhpcy5vcHRpb25zLnBhZ2VTaXplKih0aGlzLm9wdGlvbnMucGFnZU51bWJlci0xKSxpLmxpbWl0PXRoaXMub3B0aW9ucy5wYWdlU2l6ZT09PXRoaXMub3B0aW9ucy5mb3JtYXRBbGxSb3dzKCk/dGhpcy5vcHRpb25zLnRvdGFsUm93czp0aGlzLm9wdGlvbnMucGFnZVNpemUpKSxhLmlzRW1wdHlPYmplY3QodGhpcy5maWx0ZXJDb2x1bW5zUGFydGlhbCl8fChpLmZpbHRlcj1KU09OLnN0cmluZ2lmeSh0aGlzLmZpbHRlckNvbHVtbnNQYXJ0aWFsLG51bGwpKSxnPWgodGhpcy5vcHRpb25zLHRoaXMub3B0aW9ucy5xdWVyeVBhcmFtcyxbaV0sZyksYS5leHRlbmQoZyxjfHx7fSksZyE9PSExJiYoYnx8dGhpcy4kdGFibGVMb2FkaW5nLnNob3coKSxlPWEuZXh0ZW5kKHt9LGgobnVsbCx0aGlzLm9wdGlvbnMuYWpheE9wdGlvbnMpLHt0eXBlOnRoaXMub3B0aW9ucy5tZXRob2QsdXJsOmR8fHRoaXMub3B0aW9ucy51cmwsZGF0YTpcImFwcGxpY2F0aW9uL2pzb25cIj09PXRoaXMub3B0aW9ucy5jb250ZW50VHlwZSYmXCJwb3N0XCI9PT10aGlzLm9wdGlvbnMubWV0aG9kP0pTT04uc3RyaW5naWZ5KGcpOmcsY2FjaGU6dGhpcy5vcHRpb25zLmNhY2hlLGNvbnRlbnRUeXBlOnRoaXMub3B0aW9ucy5jb250ZW50VHlwZSxkYXRhVHlwZTp0aGlzLm9wdGlvbnMuZGF0YVR5cGUsc3VjY2VzczpmdW5jdGlvbihhKXthPWgoZi5vcHRpb25zLGYub3B0aW9ucy5yZXNwb25zZUhhbmRsZXIsW2FdLGEpLGYubG9hZChhKSxmLnRyaWdnZXIoXCJsb2FkLXN1Y2Nlc3NcIixhKSxifHxmLiR0YWJsZUxvYWRpbmcuaGlkZSgpfSxlcnJvcjpmdW5jdGlvbihhKXtmLnRyaWdnZXIoXCJsb2FkLWVycm9yXCIsYS5zdGF0dXMsYSksYnx8Zi4kdGFibGVMb2FkaW5nLmhpZGUoKX19KSx0aGlzLm9wdGlvbnMuYWpheD9oKHRoaXMsdGhpcy5vcHRpb25zLmFqYXgsW2VdLG51bGwpOih0aGlzLl94aHImJjQhPT10aGlzLl94aHIucmVhZHlTdGF0ZSYmdGhpcy5feGhyLmFib3J0KCksdGhpcy5feGhyPWEuYWpheChlKSkpKX0sby5wcm90b3R5cGUuaW5pdFNlYXJjaFRleHQ9ZnVuY3Rpb24oKXtpZih0aGlzLm9wdGlvbnMuc2VhcmNoJiZcIlwiIT09dGhpcy5vcHRpb25zLnNlYXJjaFRleHQpe3ZhciBhPXRoaXMuJHRvb2xiYXIuZmluZChcIi5zZWFyY2ggaW5wdXRcIik7YS52YWwodGhpcy5vcHRpb25zLnNlYXJjaFRleHQpLHRoaXMub25TZWFyY2goe2N1cnJlbnRUYXJnZXQ6YX0pfX0sby5wcm90b3R5cGUuZ2V0Q2FyZXQ9ZnVuY3Rpb24oKXt2YXIgYj10aGlzO2EuZWFjaCh0aGlzLiRoZWFkZXIuZmluZChcInRoXCIpLGZ1bmN0aW9uKGMsZCl7YShkKS5maW5kKFwiLnNvcnRhYmxlXCIpLnJlbW92ZUNsYXNzKFwiZGVzYyBhc2NcIikuYWRkQ2xhc3MoYShkKS5kYXRhKFwiZmllbGRcIik9PT1iLm9wdGlvbnMuc29ydE5hbWU/Yi5vcHRpb25zLnNvcnRPcmRlcjpcImJvdGhcIil9KX0sby5wcm90b3R5cGUudXBkYXRlU2VsZWN0ZWQ9ZnVuY3Rpb24oKXt2YXIgYj10aGlzLiRzZWxlY3RJdGVtLmZpbHRlcihcIjplbmFibGVkXCIpLmxlbmd0aCYmdGhpcy4kc2VsZWN0SXRlbS5maWx0ZXIoXCI6ZW5hYmxlZFwiKS5sZW5ndGg9PT10aGlzLiRzZWxlY3RJdGVtLmZpbHRlcihcIjplbmFibGVkXCIpLmZpbHRlcihcIjpjaGVja2VkXCIpLmxlbmd0aDt0aGlzLiRzZWxlY3RBbGwuYWRkKHRoaXMuJHNlbGVjdEFsbF8pLnByb3AoXCJjaGVja2VkXCIsYiksdGhpcy4kc2VsZWN0SXRlbS5lYWNoKGZ1bmN0aW9uKCl7YSh0aGlzKS5jbG9zZXN0KFwidHJcIilbYSh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiKT9cImFkZENsYXNzXCI6XCJyZW1vdmVDbGFzc1wiXShcInNlbGVjdGVkXCIpfSl9LG8ucHJvdG90eXBlLnVwZGF0ZVJvd3M9ZnVuY3Rpb24oKXt2YXIgYj10aGlzO3RoaXMuJHNlbGVjdEl0ZW0uZWFjaChmdW5jdGlvbigpe2IuZGF0YVthKHRoaXMpLmRhdGEoXCJpbmRleFwiKV1bYi5oZWFkZXIuc3RhdGVGaWVsZF09YSh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiKX0pfSxvLnByb3RvdHlwZS5yZXNldFJvd3M9ZnVuY3Rpb24oKXt2YXIgYj10aGlzO2EuZWFjaCh0aGlzLmRhdGEsZnVuY3Rpb24oYSxjKXtiLiRzZWxlY3RBbGwucHJvcChcImNoZWNrZWRcIiwhMSksYi4kc2VsZWN0SXRlbS5wcm9wKFwiY2hlY2tlZFwiLCExKSxiLmhlYWRlci5zdGF0ZUZpZWxkJiYoY1tiLmhlYWRlci5zdGF0ZUZpZWxkXT0hMSl9KSx0aGlzLmluaXRIaWRkZW5Sb3dzKCl9LG8ucHJvdG90eXBlLnRyaWdnZXI9ZnVuY3Rpb24oYil7dmFyIGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO2IrPVwiLmJzLnRhYmxlXCIsdGhpcy5vcHRpb25zW28uRVZFTlRTW2JdXS5hcHBseSh0aGlzLm9wdGlvbnMsYyksdGhpcy4kZWwudHJpZ2dlcihhLkV2ZW50KGIpLGMpLHRoaXMub3B0aW9ucy5vbkFsbChiLGMpLHRoaXMuJGVsLnRyaWdnZXIoYS5FdmVudChcImFsbC5icy50YWJsZVwiKSxbYixjXSl9LG8ucHJvdG90eXBlLnJlc2V0SGVhZGVyPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkXyksdGhpcy50aW1lb3V0SWRfPXNldFRpbWVvdXQoYS5wcm94eSh0aGlzLmZpdEhlYWRlcix0aGlzKSx0aGlzLiRlbC5pcyhcIjpoaWRkZW5cIik/MTAwOjApfSxvLnByb3RvdHlwZS5maXRIZWFkZXI9ZnVuY3Rpb24oKXt2YXIgYixkLGUsZixoPXRoaXM7aWYoaC4kZWwuaXMoXCI6aGlkZGVuXCIpKXJldHVybiB2b2lkKGgudGltZW91dElkXz1zZXRUaW1lb3V0KGEucHJveHkoaC5maXRIZWFkZXIsaCksMTAwKSk7aWYoYj10aGlzLiR0YWJsZUJvZHkuZ2V0KDApLGQ9Yi5zY3JvbGxXaWR0aD5iLmNsaWVudFdpZHRoJiZiLnNjcm9sbEhlaWdodD5iLmNsaWVudEhlaWdodCt0aGlzLiRoZWFkZXIub3V0ZXJIZWlnaHQoKT9nKCk6MCx0aGlzLiRlbC5jc3MoXCJtYXJnaW4tdG9wXCIsLXRoaXMuJGhlYWRlci5vdXRlckhlaWdodCgpKSxlPWEoXCI6Zm9jdXNcIiksZS5sZW5ndGg+MCl7dmFyIGk9ZS5wYXJlbnRzKFwidGhcIik7aWYoaS5sZW5ndGg+MCl7dmFyIGo9aS5hdHRyKFwiZGF0YS1maWVsZFwiKTtpZih2b2lkIDAhPT1qKXt2YXIgaz10aGlzLiRoZWFkZXIuZmluZChcIltkYXRhLWZpZWxkPSdcIitqK1wiJ11cIik7ay5sZW5ndGg+MCYmay5maW5kKFwiOmlucHV0XCIpLmFkZENsYXNzKFwiZm9jdXMtdGVtcFwiKX19fXRoaXMuJGhlYWRlcl89dGhpcy4kaGVhZGVyLmNsb25lKCEwLCEwKSx0aGlzLiRzZWxlY3RBbGxfPXRoaXMuJGhlYWRlcl8uZmluZCgnW25hbWU9XCJidFNlbGVjdEFsbFwiXScpLHRoaXMuJHRhYmxlSGVhZGVyLmNzcyh7XCJtYXJnaW4tcmlnaHRcIjpkfSkuZmluZChcInRhYmxlXCIpLmNzcyhcIndpZHRoXCIsdGhpcy4kZWwub3V0ZXJXaWR0aCgpKS5odG1sKFwiXCIpLmF0dHIoXCJjbGFzc1wiLHRoaXMuJGVsLmF0dHIoXCJjbGFzc1wiKSkuYXBwZW5kKHRoaXMuJGhlYWRlcl8pLGY9YShcIi5mb2N1cy10ZW1wOnZpc2libGU6ZXEoMClcIiksZi5sZW5ndGg+MCYmKGYuZm9jdXMoKSx0aGlzLiRoZWFkZXIuZmluZChcIi5mb2N1cy10ZW1wXCIpLnJlbW92ZUNsYXNzKFwiZm9jdXMtdGVtcFwiKSksdGhpcy4kaGVhZGVyLmZpbmQoXCJ0aFtkYXRhLWZpZWxkXVwiKS5lYWNoKGZ1bmN0aW9uKCl7aC4kaGVhZGVyXy5maW5kKGMoJ3RoW2RhdGEtZmllbGQ9XCIlc1wiXScsYSh0aGlzKS5kYXRhKFwiZmllbGRcIikpKS5kYXRhKGEodGhpcykuZGF0YSgpKX0pO3ZhciBsPXRoaXMuZ2V0VmlzaWJsZUZpZWxkcygpLG09dGhpcy4kaGVhZGVyXy5maW5kKFwidGhcIik7dGhpcy4kYm9keS5maW5kKFwiPnRyOmZpcnN0LWNoaWxkOm5vdCgubm8tcmVjb3Jkcy1mb3VuZCkgPiAqXCIpLmVhY2goZnVuY3Rpb24oYil7dmFyIGQ9YSh0aGlzKSxlPWI7aC5vcHRpb25zLmRldGFpbFZpZXcmJiFoLm9wdGlvbnMuY2FyZFZpZXcmJigwPT09YiYmaC4kaGVhZGVyXy5maW5kKFwidGguZGV0YWlsXCIpLmZpbmQoXCIuZmh0LWNlbGxcIikud2lkdGgoZC5pbm5lcldpZHRoKCkpLGU9Yi0xKTt2YXIgZj1oLiRoZWFkZXJfLmZpbmQoYygndGhbZGF0YS1maWVsZD1cIiVzXCJdJyxsW2VdKSk7Zi5sZW5ndGg+MSYmKGY9YShtW2RbMF0uY2VsbEluZGV4XSkpLGYuZmluZChcIi5maHQtY2VsbFwiKS53aWR0aChkLmlubmVyV2lkdGgoKSl9KSx0aGlzLiR0YWJsZUJvZHkub2ZmKFwic2Nyb2xsXCIpLm9uKFwic2Nyb2xsXCIsZnVuY3Rpb24oKXtoLiR0YWJsZUhlYWRlci5zY3JvbGxMZWZ0KGEodGhpcykuc2Nyb2xsTGVmdCgpKSxoLm9wdGlvbnMuc2hvd0Zvb3RlciYmIWgub3B0aW9ucy5jYXJkVmlldyYmaC4kdGFibGVGb290ZXIuc2Nyb2xsTGVmdChhKHRoaXMpLnNjcm9sbExlZnQoKSl9KSxoLnRyaWdnZXIoXCJwb3N0LWhlYWRlclwiKX0sby5wcm90b3R5cGUucmVzZXRGb290ZXI9ZnVuY3Rpb24oKXt2YXIgYj10aGlzLGQ9Yi5nZXREYXRhKCksZT1bXTt0aGlzLm9wdGlvbnMuc2hvd0Zvb3RlciYmIXRoaXMub3B0aW9ucy5jYXJkVmlldyYmKCF0aGlzLm9wdGlvbnMuY2FyZFZpZXcmJnRoaXMub3B0aW9ucy5kZXRhaWxWaWV3JiZlLnB1c2goJzx0ZD48ZGl2IGNsYXNzPVwidGgtaW5uZXJcIj4mbmJzcDs8L2Rpdj48ZGl2IGNsYXNzPVwiZmh0LWNlbGxcIj48L2Rpdj48L3RkPicpLGEuZWFjaCh0aGlzLmNvbHVtbnMsZnVuY3Rpb24oYSxmKXt2YXIgZyxpPVwiXCIsaj1cIlwiLGs9W10sbD17fSxtPWMoJyBjbGFzcz1cIiVzXCInLGZbXCJjbGFzc1wiXSk7aWYoZi52aXNpYmxlJiYoIWIub3B0aW9ucy5jYXJkVmlld3x8Zi5jYXJkVmlzaWJsZSkpe2lmKGk9YyhcInRleHQtYWxpZ246ICVzOyBcIixmLmZhbGlnbj9mLmZhbGlnbjpmLmFsaWduKSxqPWMoXCJ2ZXJ0aWNhbC1hbGlnbjogJXM7IFwiLGYudmFsaWduKSxsPWgobnVsbCxiLm9wdGlvbnMuZm9vdGVyU3R5bGUpLGwmJmwuY3NzKWZvcihnIGluIGwuY3NzKWsucHVzaChnK1wiOiBcIitsLmNzc1tnXSk7ZS5wdXNoKFwiPHRkXCIsbSxjKCcgc3R5bGU9XCIlc1wiJyxpK2oray5jb25jYXQoKS5qb2luKFwiOyBcIikpLFwiPlwiKSxlLnB1c2goJzxkaXYgY2xhc3M9XCJ0aC1pbm5lclwiPicpLGUucHVzaChoKGYsZi5mb290ZXJGb3JtYXR0ZXIsW2RdLFwiJm5ic3A7XCIpfHxcIiZuYnNwO1wiKSxlLnB1c2goXCI8L2Rpdj5cIiksZS5wdXNoKCc8ZGl2IGNsYXNzPVwiZmh0LWNlbGxcIj48L2Rpdj4nKSxlLnB1c2goXCI8L2Rpdj5cIiksZS5wdXNoKFwiPC90ZD5cIil9fSksdGhpcy4kdGFibGVGb290ZXIuZmluZChcInRyXCIpLmh0bWwoZS5qb2luKFwiXCIpKSx0aGlzLiR0YWJsZUZvb3Rlci5zaG93KCksY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dEZvb3Rlcl8pLHRoaXMudGltZW91dEZvb3Rlcl89c2V0VGltZW91dChhLnByb3h5KHRoaXMuZml0Rm9vdGVyLHRoaXMpLHRoaXMuJGVsLmlzKFwiOmhpZGRlblwiKT8xMDA6MCkpfSxvLnByb3RvdHlwZS5maXRGb290ZXI9ZnVuY3Rpb24oKXt2YXIgYixjLGQ7cmV0dXJuIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRGb290ZXJfKSx0aGlzLiRlbC5pcyhcIjpoaWRkZW5cIik/dm9pZCh0aGlzLnRpbWVvdXRGb290ZXJfPXNldFRpbWVvdXQoYS5wcm94eSh0aGlzLmZpdEZvb3Rlcix0aGlzKSwxMDApKTooYz10aGlzLiRlbC5jc3MoXCJ3aWR0aFwiKSxkPWM+dGhpcy4kdGFibGVCb2R5LndpZHRoKCk/ZygpOjAsdGhpcy4kdGFibGVGb290ZXIuY3NzKHtcIm1hcmdpbi1yaWdodFwiOmR9KS5maW5kKFwidGFibGVcIikuY3NzKFwid2lkdGhcIixjKS5hdHRyKFwiY2xhc3NcIix0aGlzLiRlbC5hdHRyKFwiY2xhc3NcIikpLGI9dGhpcy4kdGFibGVGb290ZXIuZmluZChcInRkXCIpLHZvaWQgdGhpcy4kYm9keS5maW5kKFwiPnRyOmZpcnN0LWNoaWxkOm5vdCgubm8tcmVjb3Jkcy1mb3VuZCkgPiAqXCIpLmVhY2goZnVuY3Rpb24oYyl7dmFyIGQ9YSh0aGlzKTtiLmVxKGMpLmZpbmQoXCIuZmh0LWNlbGxcIikud2lkdGgoZC5pbm5lcldpZHRoKCkpfSkpfSxvLnByb3RvdHlwZS50b2dnbGVDb2x1bW49ZnVuY3Rpb24oYSxiLGQpe2lmKC0xIT09YSYmKHRoaXMuY29sdW1uc1thXS52aXNpYmxlPWIsdGhpcy5pbml0SGVhZGVyKCksdGhpcy5pbml0U2VhcmNoKCksdGhpcy5pbml0UGFnaW5hdGlvbigpLHRoaXMuaW5pdEJvZHkoKSx0aGlzLm9wdGlvbnMuc2hvd0NvbHVtbnMpKXt2YXIgZT10aGlzLiR0b29sYmFyLmZpbmQoXCIua2VlcC1vcGVuIGlucHV0XCIpLnByb3AoXCJkaXNhYmxlZFwiLCExKTtkJiZlLmZpbHRlcihjKCdbdmFsdWU9XCIlc1wiXScsYSkpLnByb3AoXCJjaGVja2VkXCIsYiksZS5maWx0ZXIoXCI6Y2hlY2tlZFwiKS5sZW5ndGg8PXRoaXMub3B0aW9ucy5taW5pbXVtQ291bnRDb2x1bW5zJiZlLmZpbHRlcihcIjpjaGVja2VkXCIpLnByb3AoXCJkaXNhYmxlZFwiLCEwKX19LG8ucHJvdG90eXBlLmdldFZpc2libGVGaWVsZHM9ZnVuY3Rpb24oKXt2YXIgYj10aGlzLGM9W107cmV0dXJuIGEuZWFjaCh0aGlzLmhlYWRlci5maWVsZHMsZnVuY3Rpb24oYSxkKXt2YXIgZj1iLmNvbHVtbnNbZShiLmNvbHVtbnMsZCldO2YudmlzaWJsZSYmYy5wdXNoKGQpfSksY30sby5wcm90b3R5cGUucmVzZXRWaWV3PWZ1bmN0aW9uKGEpe3ZhciBiPTA7aWYoYSYmYS5oZWlnaHQmJih0aGlzLm9wdGlvbnMuaGVpZ2h0PWEuaGVpZ2h0KSx0aGlzLiRzZWxlY3RBbGwucHJvcChcImNoZWNrZWRcIix0aGlzLiRzZWxlY3RJdGVtLmxlbmd0aD4wJiZ0aGlzLiRzZWxlY3RJdGVtLmxlbmd0aD09PXRoaXMuJHNlbGVjdEl0ZW0uZmlsdGVyKFwiOmNoZWNrZWRcIikubGVuZ3RoKSx0aGlzLm9wdGlvbnMuaGVpZ2h0KXt2YXIgYz10aGlzLiR0b29sYmFyLm91dGVySGVpZ2h0KCEwKSxkPXRoaXMuJHBhZ2luYXRpb24ub3V0ZXJIZWlnaHQoITApLGU9dGhpcy5vcHRpb25zLmhlaWdodC1jLWQ7dGhpcy4kdGFibGVDb250YWluZXIuY3NzKFwiaGVpZ2h0XCIsZStcInB4XCIpfXJldHVybiB0aGlzLm9wdGlvbnMuY2FyZFZpZXc/KHRoaXMuJGVsLmNzcyhcIm1hcmdpbi10b3BcIixcIjBcIiksdGhpcy4kdGFibGVDb250YWluZXIuY3NzKFwicGFkZGluZy1ib3R0b21cIixcIjBcIiksdm9pZCB0aGlzLiR0YWJsZUZvb3Rlci5oaWRlKCkpOih0aGlzLm9wdGlvbnMuc2hvd0hlYWRlciYmdGhpcy5vcHRpb25zLmhlaWdodD8odGhpcy4kdGFibGVIZWFkZXIuc2hvdygpLHRoaXMucmVzZXRIZWFkZXIoKSxiKz10aGlzLiRoZWFkZXIub3V0ZXJIZWlnaHQoKSk6KHRoaXMuJHRhYmxlSGVhZGVyLmhpZGUoKSx0aGlzLnRyaWdnZXIoXCJwb3N0LWhlYWRlclwiKSksdGhpcy5vcHRpb25zLnNob3dGb290ZXImJih0aGlzLnJlc2V0Rm9vdGVyKCksdGhpcy5vcHRpb25zLmhlaWdodCYmKGIrPXRoaXMuJHRhYmxlRm9vdGVyLm91dGVySGVpZ2h0KCkrMSkpLHRoaXMuZ2V0Q2FyZXQoKSx0aGlzLiR0YWJsZUNvbnRhaW5lci5jc3MoXCJwYWRkaW5nLWJvdHRvbVwiLGIrXCJweFwiKSx2b2lkIHRoaXMudHJpZ2dlcihcInJlc2V0LXZpZXdcIikpfSxvLnByb3RvdHlwZS5nZXREYXRhPWZ1bmN0aW9uKGIpe3JldHVybiF0aGlzLnNlYXJjaFRleHQmJmEuaXNFbXB0eU9iamVjdCh0aGlzLmZpbHRlckNvbHVtbnMpJiZhLmlzRW1wdHlPYmplY3QodGhpcy5maWx0ZXJDb2x1bW5zUGFydGlhbCk/Yj90aGlzLm9wdGlvbnMuZGF0YS5zbGljZSh0aGlzLnBhZ2VGcm9tLTEsdGhpcy5wYWdlVG8pOnRoaXMub3B0aW9ucy5kYXRhOmI/dGhpcy5kYXRhLnNsaWNlKHRoaXMucGFnZUZyb20tMSx0aGlzLnBhZ2VUbyk6dGhpcy5kYXRhfSxvLnByb3RvdHlwZS5sb2FkPWZ1bmN0aW9uKGIpe3ZhciBjPSExO1wic2VydmVyXCI9PT10aGlzLm9wdGlvbnMuc2lkZVBhZ2luYXRpb24/KHRoaXMub3B0aW9ucy50b3RhbFJvd3M9Ylt0aGlzLm9wdGlvbnMudG90YWxGaWVsZF0sYz1iLmZpeGVkU2Nyb2xsLGI9Ylt0aGlzLm9wdGlvbnMuZGF0YUZpZWxkXSk6YS5pc0FycmF5KGIpfHwoYz1iLmZpeGVkU2Nyb2xsLGI9Yi5kYXRhKSx0aGlzLmluaXREYXRhKGIpLHRoaXMuaW5pdFNlYXJjaCgpLHRoaXMuaW5pdFBhZ2luYXRpb24oKSx0aGlzLmluaXRCb2R5KGMpfSxvLnByb3RvdHlwZS5hcHBlbmQ9ZnVuY3Rpb24oYSl7dGhpcy5pbml0RGF0YShhLFwiYXBwZW5kXCIpLHRoaXMuaW5pdFNlYXJjaCgpLHRoaXMuaW5pdFBhZ2luYXRpb24oKSx0aGlzLmluaXRTb3J0KCksdGhpcy5pbml0Qm9keSghMCl9LG8ucHJvdG90eXBlLnByZXBlbmQ9ZnVuY3Rpb24oYSl7dGhpcy5pbml0RGF0YShhLFwicHJlcGVuZFwiKSx0aGlzLmluaXRTZWFyY2goKSx0aGlzLmluaXRQYWdpbmF0aW9uKCksdGhpcy5pbml0U29ydCgpLHRoaXMuaW5pdEJvZHkoITApfSxvLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24oYil7dmFyIGMsZCxlPXRoaXMub3B0aW9ucy5kYXRhLmxlbmd0aDtpZihiLmhhc093blByb3BlcnR5KFwiZmllbGRcIikmJmIuaGFzT3duUHJvcGVydHkoXCJ2YWx1ZXNcIikpe2ZvcihjPWUtMTtjPj0wO2MtLSlkPXRoaXMub3B0aW9ucy5kYXRhW2NdLGQuaGFzT3duUHJvcGVydHkoYi5maWVsZCkmJi0xIT09YS5pbkFycmF5KGRbYi5maWVsZF0sYi52YWx1ZXMpJiYodGhpcy5vcHRpb25zLmRhdGEuc3BsaWNlKGMsMSksXCJzZXJ2ZXJcIj09PXRoaXMub3B0aW9ucy5zaWRlUGFnaW5hdGlvbiYmKHRoaXMub3B0aW9ucy50b3RhbFJvd3MtPTEpKTtlIT09dGhpcy5vcHRpb25zLmRhdGEubGVuZ3RoJiYodGhpcy5pbml0U2VhcmNoKCksdGhpcy5pbml0UGFnaW5hdGlvbigpLHRoaXMuaW5pdFNvcnQoKSx0aGlzLmluaXRCb2R5KCEwKSl9fSxvLnByb3RvdHlwZS5yZW1vdmVBbGw9ZnVuY3Rpb24oKXt0aGlzLm9wdGlvbnMuZGF0YS5sZW5ndGg+MCYmKHRoaXMub3B0aW9ucy5kYXRhLnNwbGljZSgwLHRoaXMub3B0aW9ucy5kYXRhLmxlbmd0aCksdGhpcy5pbml0U2VhcmNoKCksdGhpcy5pbml0UGFnaW5hdGlvbigpLHRoaXMuaW5pdEJvZHkoITApKX0sby5wcm90b3R5cGUuZ2V0Um93QnlVbmlxdWVJZD1mdW5jdGlvbihhKXt2YXIgYixjLGQsZT10aGlzLm9wdGlvbnMudW5pcXVlSWQsZj10aGlzLm9wdGlvbnMuZGF0YS5sZW5ndGgsZz1udWxsO2ZvcihiPWYtMTtiPj0wO2ItLSl7aWYoYz10aGlzLm9wdGlvbnMuZGF0YVtiXSxjLmhhc093blByb3BlcnR5KGUpKWQ9Y1tlXTtlbHNle2lmKCFjLl9kYXRhLmhhc093blByb3BlcnR5KGUpKWNvbnRpbnVlO2Q9Yy5fZGF0YVtlXX1pZihcInN0cmluZ1wiPT10eXBlb2YgZD9hPWEudG9TdHJpbmcoKTpcIm51bWJlclwiPT10eXBlb2YgZCYmKE51bWJlcihkKT09PWQmJmQlMT09PTA/YT1wYXJzZUludChhKTpkPT09TnVtYmVyKGQpJiYwIT09ZCYmKGE9cGFyc2VGbG9hdChhKSkpLGQ9PT1hKXtnPWM7YnJlYWt9fXJldHVybiBnfSxvLnByb3RvdHlwZS5yZW1vdmVCeVVuaXF1ZUlkPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMub3B0aW9ucy5kYXRhLmxlbmd0aCxjPXRoaXMuZ2V0Um93QnlVbmlxdWVJZChhKTtjJiZ0aGlzLm9wdGlvbnMuZGF0YS5zcGxpY2UodGhpcy5vcHRpb25zLmRhdGEuaW5kZXhPZihjKSwxKSxiIT09dGhpcy5vcHRpb25zLmRhdGEubGVuZ3RoJiYodGhpcy5pbml0U2VhcmNoKCksdGhpcy5pbml0UGFnaW5hdGlvbigpLHRoaXMuaW5pdEJvZHkoITApKX0sby5wcm90b3R5cGUudXBkYXRlQnlVbmlxdWVJZD1mdW5jdGlvbihiKXt2YXIgYz10aGlzLGQ9YS5pc0FycmF5KGIpP2I6W2JdO2EuZWFjaChkLGZ1bmN0aW9uKGIsZCl7dmFyIGU7ZC5oYXNPd25Qcm9wZXJ0eShcImlkXCIpJiZkLmhhc093blByb3BlcnR5KFwicm93XCIpJiYoZT1hLmluQXJyYXkoYy5nZXRSb3dCeVVuaXF1ZUlkKGQuaWQpLGMub3B0aW9ucy5kYXRhKSwtMSE9PWUmJmEuZXh0ZW5kKGMub3B0aW9ucy5kYXRhW2VdLGQucm93KSl9KSx0aGlzLmluaXRTZWFyY2goKSx0aGlzLmluaXRQYWdpbmF0aW9uKCksdGhpcy5pbml0U29ydCgpLHRoaXMuaW5pdEJvZHkoITApfSxvLnByb3RvdHlwZS5pbnNlcnRSb3c9ZnVuY3Rpb24oYSl7YS5oYXNPd25Qcm9wZXJ0eShcImluZGV4XCIpJiZhLmhhc093blByb3BlcnR5KFwicm93XCIpJiYodGhpcy5kYXRhLnNwbGljZShhLmluZGV4LDAsYS5yb3cpLHRoaXMuaW5pdFNlYXJjaCgpLHRoaXMuaW5pdFBhZ2luYXRpb24oKSx0aGlzLmluaXRTb3J0KCksdGhpcy5pbml0Qm9keSghMCkpfSxvLnByb3RvdHlwZS51cGRhdGVSb3c9ZnVuY3Rpb24oYil7dmFyIGM9dGhpcyxkPWEuaXNBcnJheShiKT9iOltiXTthLmVhY2goZCxmdW5jdGlvbihiLGQpe2QuaGFzT3duUHJvcGVydHkoXCJpbmRleFwiKSYmZC5oYXNPd25Qcm9wZXJ0eShcInJvd1wiKSYmYS5leHRlbmQoYy5vcHRpb25zLmRhdGFbZC5pbmRleF0sZC5yb3cpfSksdGhpcy5pbml0U2VhcmNoKCksdGhpcy5pbml0UGFnaW5hdGlvbigpLHRoaXMuaW5pdFNvcnQoKSx0aGlzLmluaXRCb2R5KCEwKX0sby5wcm90b3R5cGUuaW5pdEhpZGRlblJvd3M9ZnVuY3Rpb24oKXt0aGlzLmhpZGRlblJvd3M9W119LG8ucHJvdG90eXBlLnNob3dSb3c9ZnVuY3Rpb24oYSl7dGhpcy50b2dnbGVSb3coYSwhMCl9LG8ucHJvdG90eXBlLmhpZGVSb3c9ZnVuY3Rpb24oYSl7dGhpcy50b2dnbGVSb3coYSwhMSl9LG8ucHJvdG90eXBlLnRvZ2dsZVJvdz1mdW5jdGlvbihiLGMpe3ZhciBkLGU7Yi5oYXNPd25Qcm9wZXJ0eShcImluZGV4XCIpP2Q9dGhpcy5nZXREYXRhKClbYi5pbmRleF06Yi5oYXNPd25Qcm9wZXJ0eShcInVuaXF1ZUlkXCIpJiYoZD10aGlzLmdldFJvd0J5VW5pcXVlSWQoYi51bmlxdWVJZCkpLGQmJihlPWEuaW5BcnJheShkLHRoaXMuaGlkZGVuUm93cyksY3x8LTEhPT1lP2MmJmU+LTEmJnRoaXMuaGlkZGVuUm93cy5zcGxpY2UoZSwxKTp0aGlzLmhpZGRlblJvd3MucHVzaChkKSx0aGlzLmluaXRCb2R5KCEwKSl9LG8ucHJvdG90eXBlLmdldEhpZGRlblJvd3M9ZnVuY3Rpb24oKXt2YXIgYj10aGlzLGM9dGhpcy5nZXREYXRhKCksZD1bXTtyZXR1cm4gYS5lYWNoKGMsZnVuY3Rpb24oYyxlKXthLmluQXJyYXkoZSxiLmhpZGRlblJvd3MpPi0xJiZkLnB1c2goZSl9KSx0aGlzLmhpZGRlblJvd3M9ZCxkfSxvLnByb3RvdHlwZS5tZXJnZUNlbGxzPWZ1bmN0aW9uKGIpe3ZhciBjLGQsZSxmPWIuaW5kZXgsZz1hLmluQXJyYXkoYi5maWVsZCx0aGlzLmdldFZpc2libGVGaWVsZHMoKSksaD1iLnJvd3NwYW58fDEsaT1iLmNvbHNwYW58fDEsaj10aGlzLiRib2R5LmZpbmQoXCI+dHJcIik7aWYodGhpcy5vcHRpb25zLmRldGFpbFZpZXcmJiF0aGlzLm9wdGlvbnMuY2FyZFZpZXcmJihnKz0xKSxlPWouZXEoZikuZmluZChcIj50ZFwiKS5lcShnKSwhKDA+Znx8MD5nfHxmPj10aGlzLmRhdGEubGVuZ3RoKSl7Zm9yKGM9ZjtmK2g+YztjKyspZm9yKGQ9ZztnK2k+ZDtkKyspai5lcShjKS5maW5kKFwiPnRkXCIpLmVxKGQpLmhpZGUoKTtlLmF0dHIoXCJyb3dzcGFuXCIsaCkuYXR0cihcImNvbHNwYW5cIixpKS5zaG93KCl9fSxvLnByb3RvdHlwZS51cGRhdGVDZWxsPWZ1bmN0aW9uKGEpe2EuaGFzT3duUHJvcGVydHkoXCJpbmRleFwiKSYmYS5oYXNPd25Qcm9wZXJ0eShcImZpZWxkXCIpJiZhLmhhc093blByb3BlcnR5KFwidmFsdWVcIikmJih0aGlzLmRhdGFbYS5pbmRleF1bYS5maWVsZF09YS52YWx1ZSxhLnJlaW5pdCE9PSExJiYodGhpcy5pbml0U29ydCgpLHRoaXMuaW5pdEJvZHkoITApKSl9LG8ucHJvdG90eXBlLmdldE9wdGlvbnM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5vcHRpb25zfSxvLnByb3RvdHlwZS5nZXRTZWxlY3Rpb25zPWZ1bmN0aW9uKCl7dmFyIGI9dGhpcztyZXR1cm4gYS5ncmVwKHRoaXMub3B0aW9ucy5kYXRhLGZ1bmN0aW9uKGEpe3JldHVybiBhW2IuaGVhZGVyLnN0YXRlRmllbGRdPT09ITB9KX0sby5wcm90b3R5cGUuZ2V0QWxsU2VsZWN0aW9ucz1mdW5jdGlvbigpe3ZhciBiPXRoaXM7cmV0dXJuIGEuZ3JlcCh0aGlzLm9wdGlvbnMuZGF0YSxmdW5jdGlvbihhKXtyZXR1cm4gYVtiLmhlYWRlci5zdGF0ZUZpZWxkXX0pfSxvLnByb3RvdHlwZS5jaGVja0FsbD1mdW5jdGlvbigpe3RoaXMuY2hlY2tBbGxfKCEwKX0sby5wcm90b3R5cGUudW5jaGVja0FsbD1mdW5jdGlvbigpe3RoaXMuY2hlY2tBbGxfKCExKX0sby5wcm90b3R5cGUuY2hlY2tJbnZlcnQ9ZnVuY3Rpb24oKXt2YXIgYj10aGlzLGM9Yi4kc2VsZWN0SXRlbS5maWx0ZXIoXCI6ZW5hYmxlZFwiKSxkPWMuZmlsdGVyKFwiOmNoZWNrZWRcIik7Yy5lYWNoKGZ1bmN0aW9uKCl7YSh0aGlzKS5wcm9wKFwiY2hlY2tlZFwiLCFhKHRoaXMpLnByb3AoXCJjaGVja2VkXCIpKX0pLGIudXBkYXRlUm93cygpLGIudXBkYXRlU2VsZWN0ZWQoKSxiLnRyaWdnZXIoXCJ1bmNoZWNrLXNvbWVcIixkKSxkPWIuZ2V0U2VsZWN0aW9ucygpLGIudHJpZ2dlcihcImNoZWNrLXNvbWVcIixkKX0sby5wcm90b3R5cGUuY2hlY2tBbGxfPWZ1bmN0aW9uKGEpe3ZhciBiO2F8fChiPXRoaXMuZ2V0U2VsZWN0aW9ucygpKSx0aGlzLiRzZWxlY3RBbGwuYWRkKHRoaXMuJHNlbGVjdEFsbF8pLnByb3AoXCJjaGVja2VkXCIsYSksdGhpcy4kc2VsZWN0SXRlbS5maWx0ZXIoXCI6ZW5hYmxlZFwiKS5wcm9wKFwiY2hlY2tlZFwiLGEpLHRoaXMudXBkYXRlUm93cygpLGEmJihiPXRoaXMuZ2V0U2VsZWN0aW9ucygpKSx0aGlzLnRyaWdnZXIoYT9cImNoZWNrLWFsbFwiOlwidW5jaGVjay1hbGxcIixiKX0sby5wcm90b3R5cGUuY2hlY2s9ZnVuY3Rpb24oYSl7dGhpcy5jaGVja18oITAsYSl9LG8ucHJvdG90eXBlLnVuY2hlY2s9ZnVuY3Rpb24oYSl7dGhpcy5jaGVja18oITEsYSl9LG8ucHJvdG90eXBlLmNoZWNrXz1mdW5jdGlvbihhLGIpe3ZhciBkPXRoaXMuJHNlbGVjdEl0ZW0uZmlsdGVyKGMoJ1tkYXRhLWluZGV4PVwiJXNcIl0nLGIpKS5wcm9wKFwiY2hlY2tlZFwiLGEpO3RoaXMuZGF0YVtiXVt0aGlzLmhlYWRlci5zdGF0ZUZpZWxkXT1hLHRoaXMudXBkYXRlU2VsZWN0ZWQoKSx0aGlzLnRyaWdnZXIoYT9cImNoZWNrXCI6XCJ1bmNoZWNrXCIsdGhpcy5kYXRhW2JdLGQpfSxvLnByb3RvdHlwZS5jaGVja0J5PWZ1bmN0aW9uKGEpe3RoaXMuY2hlY2tCeV8oITAsYSl9LG8ucHJvdG90eXBlLnVuY2hlY2tCeT1mdW5jdGlvbihhKXt0aGlzLmNoZWNrQnlfKCExLGEpfSxvLnByb3RvdHlwZS5jaGVja0J5Xz1mdW5jdGlvbihiLGQpe2lmKGQuaGFzT3duUHJvcGVydHkoXCJmaWVsZFwiKSYmZC5oYXNPd25Qcm9wZXJ0eShcInZhbHVlc1wiKSl7dmFyIGU9dGhpcyxmPVtdO2EuZWFjaCh0aGlzLm9wdGlvbnMuZGF0YSxmdW5jdGlvbihnLGgpe2lmKCFoLmhhc093blByb3BlcnR5KGQuZmllbGQpKXJldHVybiExO2lmKC0xIT09YS5pbkFycmF5KGhbZC5maWVsZF0sZC52YWx1ZXMpKXt2YXIgaT1lLiRzZWxlY3RJdGVtLmZpbHRlcihcIjplbmFibGVkXCIpLmZpbHRlcihjKCdbZGF0YS1pbmRleD1cIiVzXCJdJyxnKSkucHJvcChcImNoZWNrZWRcIixiKTtoW2UuaGVhZGVyLnN0YXRlRmllbGRdPWIsZi5wdXNoKGgpLGUudHJpZ2dlcihiP1wiY2hlY2tcIjpcInVuY2hlY2tcIixoLGkpfX0pLHRoaXMudXBkYXRlU2VsZWN0ZWQoKSx0aGlzLnRyaWdnZXIoYj9cImNoZWNrLXNvbWVcIjpcInVuY2hlY2stc29tZVwiLGYpfX0sby5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMuJGVsLmluc2VydEJlZm9yZSh0aGlzLiRjb250YWluZXIpLGEodGhpcy5vcHRpb25zLnRvb2xiYXIpLmluc2VydEJlZm9yZSh0aGlzLiRlbCksdGhpcy4kY29udGFpbmVyLm5leHQoKS5yZW1vdmUoKSx0aGlzLiRjb250YWluZXIucmVtb3ZlKCksdGhpcy4kZWwuaHRtbCh0aGlzLiRlbF8uaHRtbCgpKS5jc3MoXCJtYXJnaW4tdG9wXCIsXCIwXCIpLmF0dHIoXCJjbGFzc1wiLHRoaXMuJGVsXy5hdHRyKFwiY2xhc3NcIil8fFwiXCIpfSxvLnByb3RvdHlwZS5zaG93TG9hZGluZz1mdW5jdGlvbigpe3RoaXMuJHRhYmxlTG9hZGluZy5zaG93KCl9LG8ucHJvdG90eXBlLmhpZGVMb2FkaW5nPWZ1bmN0aW9uKCl7dGhpcy4kdGFibGVMb2FkaW5nLmhpZGUoKX0sby5wcm90b3R5cGUudG9nZ2xlUGFnaW5hdGlvbj1mdW5jdGlvbigpe3RoaXMub3B0aW9ucy5wYWdpbmF0aW9uPSF0aGlzLm9wdGlvbnMucGFnaW5hdGlvbjt2YXIgYT10aGlzLiR0b29sYmFyLmZpbmQoJ2J1dHRvbltuYW1lPVwicGFnaW5hdGlvblN3aXRjaFwiXSBpJyk7dGhpcy5vcHRpb25zLnBhZ2luYXRpb24/YS5hdHRyKFwiY2xhc3NcIix0aGlzLm9wdGlvbnMuaWNvbnNQcmVmaXgrXCIgXCIrdGhpcy5vcHRpb25zLmljb25zLnBhZ2luYXRpb25Td2l0Y2hEb3duKTphLmF0dHIoXCJjbGFzc1wiLHRoaXMub3B0aW9ucy5pY29uc1ByZWZpeCtcIiBcIit0aGlzLm9wdGlvbnMuaWNvbnMucGFnaW5hdGlvblN3aXRjaFVwKSx0aGlzLnVwZGF0ZVBhZ2luYXRpb24oKX0sby5wcm90b3R5cGUucmVmcmVzaD1mdW5jdGlvbihhKXthJiZhLnVybCYmKHRoaXMub3B0aW9ucy51cmw9YS51cmwpLGEmJmEucGFnZU51bWJlciYmKHRoaXMub3B0aW9ucy5wYWdlTnVtYmVyPWEucGFnZU51bWJlciksYSYmYS5wYWdlU2l6ZSYmKHRoaXMub3B0aW9ucy5wYWdlU2l6ZT1hLnBhZ2VTaXplKSx0aGlzLmluaXRTZXJ2ZXIoYSYmYS5zaWxlbnQsYSYmYS5xdWVyeSxhJiZhLnVybCksdGhpcy50cmlnZ2VyKFwicmVmcmVzaFwiLGEpfSxvLnByb3RvdHlwZS5yZXNldFdpZHRoPWZ1bmN0aW9uKCl7dGhpcy5vcHRpb25zLnNob3dIZWFkZXImJnRoaXMub3B0aW9ucy5oZWlnaHQmJnRoaXMuZml0SGVhZGVyKCksdGhpcy5vcHRpb25zLnNob3dGb290ZXImJnRoaXMuZml0Rm9vdGVyKCl9LG8ucHJvdG90eXBlLnNob3dDb2x1bW49ZnVuY3Rpb24oYSl7dGhpcy50b2dnbGVDb2x1bW4oZSh0aGlzLmNvbHVtbnMsYSksITAsITApfSxvLnByb3RvdHlwZS5oaWRlQ29sdW1uPWZ1bmN0aW9uKGEpe3RoaXMudG9nZ2xlQ29sdW1uKGUodGhpcy5jb2x1bW5zLGEpLCExLCEwKX0sby5wcm90b3R5cGUuZ2V0SGlkZGVuQ29sdW1ucz1mdW5jdGlvbigpe3JldHVybiBhLmdyZXAodGhpcy5jb2x1bW5zLGZ1bmN0aW9uKGEpe3JldHVybiFhLnZpc2libGV9KX0sby5wcm90b3R5cGUuZ2V0VmlzaWJsZUNvbHVtbnM9ZnVuY3Rpb24oKXtyZXR1cm4gYS5ncmVwKHRoaXMuY29sdW1ucyxmdW5jdGlvbihhKXtyZXR1cm4gYS52aXNpYmxlfSl9LG8ucHJvdG90eXBlLnRvZ2dsZUFsbENvbHVtbnM9ZnVuY3Rpb24oYil7aWYoYS5lYWNoKHRoaXMuY29sdW1ucyxmdW5jdGlvbihhKXt0aGlzLmNvbHVtbnNbYV0udmlzaWJsZT1ifSksdGhpcy5pbml0SGVhZGVyKCksdGhpcy5pbml0U2VhcmNoKCksdGhpcy5pbml0UGFnaW5hdGlvbigpLHRoaXMuaW5pdEJvZHkoKSx0aGlzLm9wdGlvbnMuc2hvd0NvbHVtbnMpe3ZhciBjPXRoaXMuJHRvb2xiYXIuZmluZChcIi5rZWVwLW9wZW4gaW5wdXRcIikucHJvcChcImRpc2FibGVkXCIsITEpO2MuZmlsdGVyKFwiOmNoZWNrZWRcIikubGVuZ3RoPD10aGlzLm9wdGlvbnMubWluaW11bUNvdW50Q29sdW1ucyYmYy5maWx0ZXIoXCI6Y2hlY2tlZFwiKS5wcm9wKFwiZGlzYWJsZWRcIiwhMCl9fSxvLnByb3RvdHlwZS5zaG93QWxsQ29sdW1ucz1mdW5jdGlvbigpe3RoaXMudG9nZ2xlQWxsQ29sdW1ucyghMCl9LG8ucHJvdG90eXBlLmhpZGVBbGxDb2x1bW5zPWZ1bmN0aW9uKCl7dGhpcy50b2dnbGVBbGxDb2x1bW5zKCExKX0sby5wcm90b3R5cGUuZmlsdGVyQnk9ZnVuY3Rpb24oYil7dGhpcy5maWx0ZXJDb2x1bW5zPWEuaXNFbXB0eU9iamVjdChiKT97fTpiLHRoaXMub3B0aW9ucy5wYWdlTnVtYmVyPTEsdGhpcy5pbml0U2VhcmNoKCksdGhpcy51cGRhdGVQYWdpbmF0aW9uKCl9LG8ucHJvdG90eXBlLnNjcm9sbFRvPWZ1bmN0aW9uKGEpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBhJiYoYT1cImJvdHRvbVwiPT09YT90aGlzLiR0YWJsZUJvZHlbMF0uc2Nyb2xsSGVpZ2h0OjApLFwibnVtYmVyXCI9PXR5cGVvZiBhJiZ0aGlzLiR0YWJsZUJvZHkuc2Nyb2xsVG9wKGEpLFwidW5kZWZpbmVkXCI9PXR5cGVvZiBhP3RoaXMuJHRhYmxlQm9keS5zY3JvbGxUb3AoKTp2b2lkIDB9LG8ucHJvdG90eXBlLmdldFNjcm9sbFBvc2l0aW9uPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2Nyb2xsVG8oKX0sby5wcm90b3R5cGUuc2VsZWN0UGFnZT1mdW5jdGlvbihhKXthPjAmJmE8PXRoaXMub3B0aW9ucy50b3RhbFBhZ2VzJiYodGhpcy5vcHRpb25zLnBhZ2VOdW1iZXI9YSx0aGlzLnVwZGF0ZVBhZ2luYXRpb24oKSl9LG8ucHJvdG90eXBlLnByZXZQYWdlPWZ1bmN0aW9uKCl7dGhpcy5vcHRpb25zLnBhZ2VOdW1iZXI+MSYmKHRoaXMub3B0aW9ucy5wYWdlTnVtYmVyLS0sdGhpcy51cGRhdGVQYWdpbmF0aW9uKCkpfSxvLnByb3RvdHlwZS5uZXh0UGFnZT1mdW5jdGlvbigpe3RoaXMub3B0aW9ucy5wYWdlTnVtYmVyPHRoaXMub3B0aW9ucy50b3RhbFBhZ2VzJiYodGhpcy5vcHRpb25zLnBhZ2VOdW1iZXIrKyx0aGlzLnVwZGF0ZVBhZ2luYXRpb24oKSl9LG8ucHJvdG90eXBlLnRvZ2dsZVZpZXc9ZnVuY3Rpb24oKXt0aGlzLm9wdGlvbnMuY2FyZFZpZXc9IXRoaXMub3B0aW9ucy5jYXJkVmlldyx0aGlzLmluaXRIZWFkZXIoKSx0aGlzLmluaXRCb2R5KCksdGhpcy50cmlnZ2VyKFwidG9nZ2xlXCIsdGhpcy5vcHRpb25zLmNhcmRWaWV3KX0sby5wcm90b3R5cGUucmVmcmVzaE9wdGlvbnM9ZnVuY3Rpb24oYil7aSh0aGlzLm9wdGlvbnMsYiwhMCl8fCh0aGlzLm9wdGlvbnM9YS5leHRlbmQodGhpcy5vcHRpb25zLGIpLHRoaXMudHJpZ2dlcihcInJlZnJlc2gtb3B0aW9uc1wiLHRoaXMub3B0aW9ucyksdGhpcy5kZXN0cm95KCksdGhpcy5pbml0KCkpfSxvLnByb3RvdHlwZS5yZXNldFNlYXJjaD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLiR0b29sYmFyLmZpbmQoXCIuc2VhcmNoIGlucHV0XCIpO2IudmFsKGF8fFwiXCIpLHRoaXMub25TZWFyY2goe2N1cnJlbnRUYXJnZXQ6Yn0pfSxvLnByb3RvdHlwZS5leHBhbmRSb3dfPWZ1bmN0aW9uKGEsYil7dmFyIGQ9dGhpcy4kYm9keS5maW5kKGMoJz4gdHJbZGF0YS1pbmRleD1cIiVzXCJdJyxiKSk7ZC5uZXh0KCkuaXMoXCJ0ci5kZXRhaWwtdmlld1wiKT09PShhPyExOiEwKSYmZC5maW5kKFwiPiB0ZCA+IC5kZXRhaWwtaWNvblwiKS5jbGljaygpfSxvLnByb3RvdHlwZS5leHBhbmRSb3c9ZnVuY3Rpb24oYSl7dGhpcy5leHBhbmRSb3dfKCEwLGEpfSxvLnByb3RvdHlwZS5jb2xsYXBzZVJvdz1mdW5jdGlvbihhKXt0aGlzLmV4cGFuZFJvd18oITEsYSl9LG8ucHJvdG90eXBlLmV4cGFuZEFsbFJvd3M9ZnVuY3Rpb24oYil7aWYoYil7dmFyIGQ9dGhpcy4kYm9keS5maW5kKGMoJz4gdHJbZGF0YS1pbmRleD1cIiVzXCJdJywwKSksZT10aGlzLGY9bnVsbCxnPSExLGg9LTE7aWYoZC5uZXh0KCkuaXMoXCJ0ci5kZXRhaWwtdmlld1wiKT9kLm5leHQoKS5uZXh0KCkuaXMoXCJ0ci5kZXRhaWwtdmlld1wiKXx8KGQubmV4dCgpLmZpbmQoXCIuZGV0YWlsLWljb25cIikuY2xpY2soKSxnPSEwKTooZC5maW5kKFwiPiB0ZCA+IC5kZXRhaWwtaWNvblwiKS5jbGljaygpLGc9ITApLGcpdHJ5e2g9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtmPWUuJGJvZHkuZmluZChcInRyLmRldGFpbC12aWV3XCIpLmxhc3QoKS5maW5kKFwiLmRldGFpbC1pY29uXCIpLGYubGVuZ3RoPjA/Zi5jbGljaygpOmNsZWFySW50ZXJ2YWwoaCl9LDEpfWNhdGNoKGkpe2NsZWFySW50ZXJ2YWwoaCl9fWVsc2UgZm9yKHZhciBqPXRoaXMuJGJvZHkuY2hpbGRyZW4oKSxrPTA7azxqLmxlbmd0aDtrKyspdGhpcy5leHBhbmRSb3dfKCEwLGEoaltrXSkuZGF0YShcImluZGV4XCIpKX0sby5wcm90b3R5cGUuY29sbGFwc2VBbGxSb3dzPWZ1bmN0aW9uKGIpe2lmKGIpdGhpcy5leHBhbmRSb3dfKCExLDApO2Vsc2UgZm9yKHZhciBjPXRoaXMuJGJvZHkuY2hpbGRyZW4oKSxkPTA7ZDxjLmxlbmd0aDtkKyspdGhpcy5leHBhbmRSb3dfKCExLGEoY1tkXSkuZGF0YShcImluZGV4XCIpKX0sby5wcm90b3R5cGUudXBkYXRlRm9ybWF0VGV4dD1mdW5jdGlvbihhLGIpe3RoaXMub3B0aW9uc1tjKFwiZm9ybWF0JXNcIixhKV0mJihcInN0cmluZ1wiPT10eXBlb2YgYj90aGlzLm9wdGlvbnNbYyhcImZvcm1hdCVzXCIsYSldPWZ1bmN0aW9uKCl7cmV0dXJuIGJ9OlwiZnVuY3Rpb25cIj09dHlwZW9mIGImJih0aGlzLm9wdGlvbnNbYyhcImZvcm1hdCVzXCIsYSldPWIpKSx0aGlzLmluaXRUb29sYmFyKCksdGhpcy5pbml0UGFnaW5hdGlvbigpLHRoaXMuaW5pdEJvZHkoKX07dmFyIHA9W1wiZ2V0T3B0aW9uc1wiLFwiZ2V0U2VsZWN0aW9uc1wiLFwiZ2V0QWxsU2VsZWN0aW9uc1wiLFwiZ2V0RGF0YVwiLFwibG9hZFwiLFwiYXBwZW5kXCIsXCJwcmVwZW5kXCIsXCJyZW1vdmVcIixcInJlbW92ZUFsbFwiLFwiaW5zZXJ0Um93XCIsXCJ1cGRhdGVSb3dcIixcInVwZGF0ZUNlbGxcIixcInVwZGF0ZUJ5VW5pcXVlSWRcIixcInJlbW92ZUJ5VW5pcXVlSWRcIixcImdldFJvd0J5VW5pcXVlSWRcIixcInNob3dSb3dcIixcImhpZGVSb3dcIixcImdldEhpZGRlblJvd3NcIixcIm1lcmdlQ2VsbHNcIixcImNoZWNrQWxsXCIsXCJ1bmNoZWNrQWxsXCIsXCJjaGVja0ludmVydFwiLFwiY2hlY2tcIixcInVuY2hlY2tcIixcImNoZWNrQnlcIixcInVuY2hlY2tCeVwiLFwicmVmcmVzaFwiLFwicmVzZXRWaWV3XCIsXCJyZXNldFdpZHRoXCIsXCJkZXN0cm95XCIsXCJzaG93TG9hZGluZ1wiLFwiaGlkZUxvYWRpbmdcIixcInNob3dDb2x1bW5cIixcImhpZGVDb2x1bW5cIixcImdldEhpZGRlbkNvbHVtbnNcIixcImdldFZpc2libGVDb2x1bW5zXCIsXCJzaG93QWxsQ29sdW1uc1wiLFwiaGlkZUFsbENvbHVtbnNcIixcImZpbHRlckJ5XCIsXCJzY3JvbGxUb1wiLFwiZ2V0U2Nyb2xsUG9zaXRpb25cIixcInNlbGVjdFBhZ2VcIixcInByZXZQYWdlXCIsXCJuZXh0UGFnZVwiLFwidG9nZ2xlUGFnaW5hdGlvblwiLFwidG9nZ2xlVmlld1wiLFwicmVmcmVzaE9wdGlvbnNcIixcInJlc2V0U2VhcmNoXCIsXCJleHBhbmRSb3dcIixcImNvbGxhcHNlUm93XCIsXCJleHBhbmRBbGxSb3dzXCIsXCJjb2xsYXBzZUFsbFJvd3NcIixcInVwZGF0ZUZvcm1hdFRleHRcIl07YS5mbi5ib290c3RyYXBUYWJsZT1mdW5jdGlvbihiKXt2YXIgYyxkPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU9YSh0aGlzKSxmPWUuZGF0YShcImJvb3RzdHJhcC50YWJsZVwiKSxnPWEuZXh0ZW5kKHt9LG8uREVGQVVMVFMsZS5kYXRhKCksXCJvYmplY3RcIj09dHlwZW9mIGImJmIpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBiKXtpZihhLmluQXJyYXkoYixwKTwwKXRocm93IG5ldyBFcnJvcihcIlVua25vd24gbWV0aG9kOiBcIitiKTtpZighZilyZXR1cm47Yz1mW2JdLmFwcGx5KGYsZCksXCJkZXN0cm95XCI9PT1iJiZlLnJlbW92ZURhdGEoXCJib290c3RyYXAudGFibGVcIil9Znx8ZS5kYXRhKFwiYm9vdHN0cmFwLnRhYmxlXCIsZj1uZXcgbyh0aGlzLGcpKX0pLFwidW5kZWZpbmVkXCI9PXR5cGVvZiBjP3RoaXM6Y30sYS5mbi5ib290c3RyYXBUYWJsZS5Db25zdHJ1Y3Rvcj1vLGEuZm4uYm9vdHN0cmFwVGFibGUuZGVmYXVsdHM9by5ERUZBVUxUUyxhLmZuLmJvb3RzdHJhcFRhYmxlLmNvbHVtbkRlZmF1bHRzPW8uQ09MVU1OX0RFRkFVTFRTLGEuZm4uYm9vdHN0cmFwVGFibGUubG9jYWxlcz1vLkxPQ0FMRVMsYS5mbi5ib290c3RyYXBUYWJsZS5tZXRob2RzPXAsYS5mbi5ib290c3RyYXBUYWJsZS51dGlscz17c3ByaW50ZjpjLGdldEZpZWxkSW5kZXg6ZSxjb21wYXJlT2JqZWN0czppLGNhbGN1bGF0ZU9iamVjdFZhbHVlOmgsZ2V0SXRlbUZpZWxkOmwsb2JqZWN0S2V5czpuLGlzSUVCcm93c2VyOm19LGEoZnVuY3Rpb24oKXthKCdbZGF0YS10b2dnbGU9XCJ0YWJsZVwiXScpLmJvb3RzdHJhcFRhYmxlKCl9KX0oalF1ZXJ5KTsiLCIvKlxuKiBib290c3RyYXAtdGFibGUgLSB2MS4xMS4xIC0gMjAxNy0wMi0yMlxuKiBodHRwczovL2dpdGh1Yi5jb20vd2VuemhpeGluL2Jvb3RzdHJhcC10YWJsZVxuKiBDb3B5cmlnaHQgKGMpIDIwMTcgemhpeGluIHdlblxuKiBMaWNlbnNlZCBNSVQgTGljZW5zZVxuKi9cbiFmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjthLmZuLmJvb3RzdHJhcFRhYmxlLmxvY2FsZXNbXCJlcy1TUFwiXT17Zm9ybWF0TG9hZGluZ01lc3NhZ2U6ZnVuY3Rpb24oKXtyZXR1cm5cIkNhcmdhbmRvLCBwb3IgZmF2b3IgZXNwZXJhLi4uXCJ9LGZvcm1hdFJlY29yZHNQZXJQYWdlOmZ1bmN0aW9uKGEpe3JldHVybiBhK1wiIHJlZ2lzdHJvcyBwb3IgcCYjMjI1O2dpbmEuXCJ9LGZvcm1hdFNob3dpbmdSb3dzOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gYStcIiAtIFwiK2IrXCIgZGUgXCIrYytcIiByZWdpc3Ryb3MuXCJ9LGZvcm1hdFNlYXJjaDpmdW5jdGlvbigpe3JldHVyblwiQnVzY2FyXCJ9LGZvcm1hdE5vTWF0Y2hlczpmdW5jdGlvbigpe3JldHVyblwiTm8gc2UgaGFuIGVuY29udHJhZG8gcmVnaXN0cm9zLlwifSxmb3JtYXRSZWZyZXNoOmZ1bmN0aW9uKCl7cmV0dXJuXCJBY3R1YWxpemFyXCJ9LGZvcm1hdFRvZ2dsZTpmdW5jdGlvbigpe3JldHVyblwiQWx0ZXJuYXJcIn0sZm9ybWF0Q29sdW1uczpmdW5jdGlvbigpe3JldHVyblwiQ29sdW1uYXNcIn0sZm9ybWF0QWxsUm93czpmdW5jdGlvbigpe3JldHVyblwiVG9kb1wifX0sYS5leHRlbmQoYS5mbi5ib290c3RyYXBUYWJsZS5kZWZhdWx0cyxhLmZuLmJvb3RzdHJhcFRhYmxlLmxvY2FsZXNbXCJlcy1TUFwiXSl9KGpRdWVyeSk7IiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6ZS5Td2VldGFsZXJ0Mj10KCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgZT17dGl0bGU6XCJcIix0aXRsZVRleHQ6XCJcIix0ZXh0OlwiXCIsaHRtbDpcIlwiLHR5cGU6bnVsbCxjdXN0b21DbGFzczpcIlwiLHRhcmdldDpcImJvZHlcIixhbmltYXRpb246ITAsYWxsb3dPdXRzaWRlQ2xpY2s6ITAsYWxsb3dFc2NhcGVLZXk6ITAsYWxsb3dFbnRlcktleTohMCxzaG93Q29uZmlybUJ1dHRvbjohMCxzaG93Q2FuY2VsQnV0dG9uOiExLHByZUNvbmZpcm06bnVsbCxjb25maXJtQnV0dG9uVGV4dDpcIk9LXCIsY29uZmlybUJ1dHRvbkNvbG9yOlwiIzMwODVkNlwiLGNvbmZpcm1CdXR0b25DbGFzczpudWxsLGNhbmNlbEJ1dHRvblRleHQ6XCJDYW5jZWxcIixjYW5jZWxCdXR0b25Db2xvcjpcIiNhYWFcIixjYW5jZWxCdXR0b25DbGFzczpudWxsLGJ1dHRvbnNTdHlsaW5nOiEwLHJldmVyc2VCdXR0b25zOiExLGZvY3VzQ2FuY2VsOiExLHNob3dDbG9zZUJ1dHRvbjohMSxzaG93TG9hZGVyT25Db25maXJtOiExLGltYWdlVXJsOm51bGwsaW1hZ2VXaWR0aDpudWxsLGltYWdlSGVpZ2h0Om51bGwsaW1hZ2VDbGFzczpudWxsLHRpbWVyOm51bGwsd2lkdGg6NTAwLHBhZGRpbmc6MjAsYmFja2dyb3VuZDpcIiNmZmZcIixpbnB1dDpudWxsLGlucHV0UGxhY2Vob2xkZXI6XCJcIixpbnB1dFZhbHVlOlwiXCIsaW5wdXRPcHRpb25zOnt9LGlucHV0QXV0b1RyaW06ITAsaW5wdXRDbGFzczpudWxsLGlucHV0QXR0cmlidXRlczp7fSxpbnB1dFZhbGlkYXRvcjpudWxsLHByb2dyZXNzU3RlcHM6W10sY3VycmVudFByb2dyZXNzU3RlcDpudWxsLHByb2dyZXNzU3RlcHNEaXN0YW5jZTpcIjQwcHhcIixvbk9wZW46bnVsbCxvbkNsb3NlOm51bGwsdXNlUmVqZWN0aW9uczohMH0sdD1mdW5jdGlvbihlKXt2YXIgdD17fTtmb3IodmFyIG4gaW4gZSl0W2Vbbl1dPVwic3dhbDItXCIrZVtuXTtyZXR1cm4gdH0sbj10KFtcImNvbnRhaW5lclwiLFwic2hvd25cIixcImlvc2ZpeFwiLFwibW9kYWxcIixcIm92ZXJsYXlcIixcImZhZGVcIixcInNob3dcIixcImhpZGVcIixcIm5vYW5pbWF0aW9uXCIsXCJjbG9zZVwiLFwidGl0bGVcIixcImNvbnRlbnRcIixcImJ1dHRvbnN3cmFwcGVyXCIsXCJjb25maXJtXCIsXCJjYW5jZWxcIixcImljb25cIixcImltYWdlXCIsXCJpbnB1dFwiLFwiZmlsZVwiLFwicmFuZ2VcIixcInNlbGVjdFwiLFwicmFkaW9cIixcImNoZWNrYm94XCIsXCJ0ZXh0YXJlYVwiLFwiaW5wdXRlcnJvclwiLFwidmFsaWRhdGlvbmVycm9yXCIsXCJwcm9ncmVzc3N0ZXBzXCIsXCJhY3RpdmVwcm9ncmVzc3N0ZXBcIixcInByb2dyZXNzY2lyY2xlXCIsXCJwcm9ncmVzc2xpbmVcIixcImxvYWRpbmdcIixcInN0eWxlZFwiXSksbz10KFtcInN1Y2Nlc3NcIixcIndhcm5pbmdcIixcImluZm9cIixcInF1ZXN0aW9uXCIsXCJlcnJvclwiXSkscj1mdW5jdGlvbihlLHQpeyhlPVN0cmluZyhlKS5yZXBsYWNlKC9bXjAtOWEtZl0vZ2ksXCJcIikpLmxlbmd0aDw2JiYoZT1lWzBdK2VbMF0rZVsxXStlWzFdK2VbMl0rZVsyXSksdD10fHwwO2Zvcih2YXIgbj1cIiNcIixvPTA7bzwzO28rKyl7dmFyIHI9cGFyc2VJbnQoZS5zdWJzdHIoMipvLDIpLDE2KTtuKz0oXCIwMFwiKyhyPU1hdGgucm91bmQoTWF0aC5taW4oTWF0aC5tYXgoMCxyK3IqdCksMjU1KSkudG9TdHJpbmcoMTYpKSkuc3Vic3RyKHIubGVuZ3RoKX1yZXR1cm4gbn0saT1mdW5jdGlvbihlKXt2YXIgdD1bXTtmb3IodmFyIG4gaW4gZSktMT09PXQuaW5kZXhPZihlW25dKSYmdC5wdXNoKGVbbl0pO3JldHVybiB0fSxhPXtwcmV2aW91c1dpbmRvd0tleURvd246bnVsbCxwcmV2aW91c0FjdGl2ZUVsZW1lbnQ6bnVsbCxwcmV2aW91c0JvZHlQYWRkaW5nOm51bGx9LGw9ZnVuY3Rpb24oZSl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGRvY3VtZW50KXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3QuY2xhc3NOYW1lPW4uY29udGFpbmVyLHQuaW5uZXJIVE1MPXM7dmFyIG89ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlLnRhcmdldCk7b3x8KGNvbnNvbGUud2FybihcIlN3ZWV0QWxlcnQyOiBDYW4ndCBmaW5kIHRoZSB0YXJnZXQgXFxcIlwiK2UudGFyZ2V0KydcIicpLG89ZG9jdW1lbnQuYm9keSksby5hcHBlbmRDaGlsZCh0KTt2YXIgcj1jKCksaT1BKHIsbi5pbnB1dCksYT1BKHIsbi5maWxlKSxsPXIucXVlcnlTZWxlY3RvcihcIi5cIituLnJhbmdlK1wiIGlucHV0XCIpLHU9ci5xdWVyeVNlbGVjdG9yKFwiLlwiK24ucmFuZ2UrXCIgb3V0cHV0XCIpLGQ9QShyLG4uc2VsZWN0KSxwPXIucXVlcnlTZWxlY3RvcihcIi5cIituLmNoZWNrYm94K1wiIGlucHV0XCIpLGY9QShyLG4udGV4dGFyZWEpO3JldHVybiBpLm9uaW5wdXQ9ZnVuY3Rpb24oKXskLnJlc2V0VmFsaWRhdGlvbkVycm9yKCl9LGkub25rZXlkb3duPWZ1bmN0aW9uKHQpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXsxMz09PXQua2V5Q29kZSYmZS5hbGxvd0VudGVyS2V5JiYodC5zdG9wUHJvcGFnYXRpb24oKSwkLmNsaWNrQ29uZmlybSgpKX0sMCl9LGEub25jaGFuZ2U9ZnVuY3Rpb24oKXskLnJlc2V0VmFsaWRhdGlvbkVycm9yKCl9LGwub25pbnB1dD1mdW5jdGlvbigpeyQucmVzZXRWYWxpZGF0aW9uRXJyb3IoKSx1LnZhbHVlPWwudmFsdWV9LGwub25jaGFuZ2U9ZnVuY3Rpb24oKXskLnJlc2V0VmFsaWRhdGlvbkVycm9yKCksbC5wcmV2aW91c1NpYmxpbmcudmFsdWU9bC52YWx1ZX0sZC5vbmNoYW5nZT1mdW5jdGlvbigpeyQucmVzZXRWYWxpZGF0aW9uRXJyb3IoKX0scC5vbmNoYW5nZT1mdW5jdGlvbigpeyQucmVzZXRWYWxpZGF0aW9uRXJyb3IoKX0sZi5vbmlucHV0PWZ1bmN0aW9uKCl7JC5yZXNldFZhbGlkYXRpb25FcnJvcigpfSxyfWNvbnNvbGUuZXJyb3IoXCJTd2VldEFsZXJ0MiByZXF1aXJlcyBkb2N1bWVudCB0byBpbml0aWFsaXplXCIpfSxzPSgnXFxuIDxkaXYgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cIicrbi50aXRsZSsnXCIgYXJpYS1kZXNjcmliZWRieT1cIicrbi5jb250ZW50KydcIiBjbGFzcz1cIicrbi5tb2RhbCsnXCIgdGFiaW5kZXg9XCItMVwiPlxcbiAgIDx1bCBjbGFzcz1cIicrbi5wcm9ncmVzc3N0ZXBzKydcIj48L3VsPlxcbiAgIDxkaXYgY2xhc3M9XCInK24uaWNvbitcIiBcIitvLmVycm9yKydcIj5cXG4gICAgIDxzcGFuIGNsYXNzPVwic3dhbDIteC1tYXJrXCI+PHNwYW4gY2xhc3M9XCJzd2FsMi14LW1hcmstbGluZS1sZWZ0XCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwic3dhbDIteC1tYXJrLWxpbmUtcmlnaHRcIj48L3NwYW4+PC9zcGFuPlxcbiAgIDwvZGl2PlxcbiAgIDxkaXYgY2xhc3M9XCInK24uaWNvbitcIiBcIitvLnF1ZXN0aW9uKydcIj4/PC9kaXY+XFxuICAgPGRpdiBjbGFzcz1cIicrbi5pY29uK1wiIFwiK28ud2FybmluZysnXCI+ITwvZGl2PlxcbiAgIDxkaXYgY2xhc3M9XCInK24uaWNvbitcIiBcIitvLmluZm8rJ1wiPmk8L2Rpdj5cXG4gICA8ZGl2IGNsYXNzPVwiJytuLmljb24rXCIgXCIrby5zdWNjZXNzKydcIj5cXG4gICAgIDxkaXYgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmUtbGVmdFwiPjwvZGl2PlxcbiAgICAgPHNwYW4gY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWxpbmUtdGlwXCI+PC9zcGFuPiA8c3BhbiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtbGluZS1sb25nXCI+PC9zcGFuPlxcbiAgICAgPGRpdiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtcmluZ1wiPjwvZGl2PiA8ZGl2IGNsYXNzPVwic3dhbDItc3VjY2Vzcy1maXhcIj48L2Rpdj5cXG4gICAgIDxkaXYgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmUtcmlnaHRcIj48L2Rpdj5cXG4gICA8L2Rpdj5cXG4gICA8aW1nIGNsYXNzPVwiJytuLmltYWdlKydcIj5cXG4gICA8aDIgY2xhc3M9XCInK24udGl0bGUrJ1wiIGlkPVwiJytuLnRpdGxlKydcIj48L2gyPlxcbiAgIDxkaXYgaWQ9XCInK24uY29udGVudCsnXCIgY2xhc3M9XCInK24uY29udGVudCsnXCI+PC9kaXY+XFxuICAgPGlucHV0IGNsYXNzPVwiJytuLmlucHV0KydcIj5cXG4gICA8aW5wdXQgdHlwZT1cImZpbGVcIiBjbGFzcz1cIicrbi5maWxlKydcIj5cXG4gICA8ZGl2IGNsYXNzPVwiJytuLnJhbmdlKydcIj5cXG4gICAgIDxvdXRwdXQ+PC9vdXRwdXQ+XFxuICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCI+XFxuICAgPC9kaXY+XFxuICAgPHNlbGVjdCBjbGFzcz1cIicrbi5zZWxlY3QrJ1wiPjwvc2VsZWN0PlxcbiAgIDxkaXYgY2xhc3M9XCInK24ucmFkaW8rJ1wiPjwvZGl2PlxcbiAgIDxsYWJlbCBmb3I9XCInK24uY2hlY2tib3grJ1wiIGNsYXNzPVwiJytuLmNoZWNrYm94KydcIj5cXG4gICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj5cXG4gICA8L2xhYmVsPlxcbiAgIDx0ZXh0YXJlYSBjbGFzcz1cIicrbi50ZXh0YXJlYSsnXCI+PC90ZXh0YXJlYT5cXG4gICA8ZGl2IGNsYXNzPVwiJytuLnZhbGlkYXRpb25lcnJvcisnXCI+PC9kaXY+XFxuICAgPGRpdiBjbGFzcz1cIicrbi5idXR0b25zd3JhcHBlcisnXCI+XFxuICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIicrbi5jb25maXJtKydcIj5PSzwvYnV0dG9uPlxcbiAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCInK24uY2FuY2VsKydcIj5DYW5jZWw8L2J1dHRvbj5cXG4gICA8L2Rpdj5cXG4gICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIicrbi5jbG9zZSsnXCIgYXJpYS1sYWJlbD1cIkNsb3NlIHRoaXMgZGlhbG9nXCI+JnRpbWVzOzwvYnV0dG9uPlxcbiA8L2Rpdj5cXG4nKS5yZXBsYWNlKC8oXnxcXG4pXFxzKi9nLFwiXCIpLHU9ZnVuY3Rpb24oKXtyZXR1cm4gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiLlwiK24uY29udGFpbmVyKX0sYz1mdW5jdGlvbigpe3JldHVybiB1KCk/dSgpLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrbi5tb2RhbCk6bnVsbH0sZD1mdW5jdGlvbigpe3JldHVybiBjKCkucXVlcnlTZWxlY3RvckFsbChcIi5cIituLmljb24pfSxwPWZ1bmN0aW9uKGUpe3JldHVybiB1KCk/dSgpLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrZSk6bnVsbH0sZj1mdW5jdGlvbigpe3JldHVybiBwKG4udGl0bGUpfSxtPWZ1bmN0aW9uKCl7cmV0dXJuIHAobi5jb250ZW50KX0sdj1mdW5jdGlvbigpe3JldHVybiBwKG4uaW1hZ2UpfSxoPWZ1bmN0aW9uKCl7cmV0dXJuIHAobi5idXR0b25zd3JhcHBlcil9LGc9ZnVuY3Rpb24oKXtyZXR1cm4gcChuLnByb2dyZXNzc3RlcHMpfSx5PWZ1bmN0aW9uKCl7cmV0dXJuIHAobi52YWxpZGF0aW9uZXJyb3IpfSxiPWZ1bmN0aW9uKCl7cmV0dXJuIHAobi5jb25maXJtKX0sdz1mdW5jdGlvbigpe3JldHVybiBwKG4uY2FuY2VsKX0sQz1mdW5jdGlvbigpe3JldHVybiBwKG4uY2xvc2UpfSxrPWZ1bmN0aW9uKGUpe3ZhciB0PVtiKCksdygpXTtlJiZ0LnJldmVyc2UoKTt2YXIgbj10LmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjKCkucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uLCBpbnB1dDpub3QoW3R5cGU9aGlkZGVuXSksIHRleHRhcmVhLCBzZWxlY3QsIGEsICpbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknKSkpO3JldHVybiBpKG4pfSx4PWZ1bmN0aW9uKGUsdCl7cmV0dXJuISFlLmNsYXNzTGlzdCYmZS5jbGFzc0xpc3QuY29udGFpbnModCl9LFM9ZnVuY3Rpb24oZSl7aWYoZS5mb2N1cygpLFwiZmlsZVwiIT09ZS50eXBlKXt2YXIgdD1lLnZhbHVlO2UudmFsdWU9XCJcIixlLnZhbHVlPXR9fSxFPWZ1bmN0aW9uKGUsdCl7ZSYmdCYmdC5zcGxpdCgvXFxzKy8pLmZpbHRlcihCb29sZWFuKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2UuY2xhc3NMaXN0LmFkZCh0KX0pfSxCPWZ1bmN0aW9uKGUsdCl7ZSYmdCYmdC5zcGxpdCgvXFxzKy8pLmZpbHRlcihCb29sZWFuKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe2UuY2xhc3NMaXN0LnJlbW92ZSh0KX0pfSxBPWZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuPTA7bjxlLmNoaWxkTm9kZXMubGVuZ3RoO24rKylpZih4KGUuY2hpbGROb2Rlc1tuXSx0KSlyZXR1cm4gZS5jaGlsZE5vZGVzW25dfSxQPWZ1bmN0aW9uKGUsdCl7dHx8KHQ9XCJibG9ja1wiKSxlLnN0eWxlLm9wYWNpdHk9XCJcIixlLnN0eWxlLmRpc3BsYXk9dH0sVD1mdW5jdGlvbihlKXtlLnN0eWxlLm9wYWNpdHk9XCJcIixlLnN0eWxlLmRpc3BsYXk9XCJub25lXCJ9LEw9ZnVuY3Rpb24oZSl7Zm9yKDtlLmZpcnN0Q2hpbGQ7KWUucmVtb3ZlQ2hpbGQoZS5maXJzdENoaWxkKX0sTT1mdW5jdGlvbihlKXtyZXR1cm4gZS5vZmZzZXRXaWR0aHx8ZS5vZmZzZXRIZWlnaHR8fGUuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGh9LHE9ZnVuY3Rpb24oZSx0KXtlLnN0eWxlLnJlbW92ZVByb3BlcnR5P2Uuc3R5bGUucmVtb3ZlUHJvcGVydHkodCk6ZS5zdHlsZS5yZW1vdmVBdHRyaWJ1dGUodCl9LFY9ZnVuY3Rpb24oZSl7aWYoIU0oZSkpcmV0dXJuITE7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgTW91c2VFdmVudCl7dmFyIHQ9bmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiLHt2aWV3OndpbmRvdyxidWJibGVzOiExLGNhbmNlbGFibGU6ITB9KTtlLmRpc3BhdGNoRXZlbnQodCl9ZWxzZSBpZihkb2N1bWVudC5jcmVhdGVFdmVudCl7dmFyIG49ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50c1wiKTtuLmluaXRFdmVudChcImNsaWNrXCIsITEsITEpLGUuZGlzcGF0Y2hFdmVudChuKX1lbHNlIGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0P2UuZmlyZUV2ZW50KFwib25jbGlja1wiKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLm9uY2xpY2smJmUub25jbGljaygpfSxPPWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSx0PXtXZWJraXRBbmltYXRpb246XCJ3ZWJraXRBbmltYXRpb25FbmRcIixPQW5pbWF0aW9uOlwib0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kXCIsbXNBbmltYXRpb246XCJNU0FuaW1hdGlvbkVuZFwiLGFuaW1hdGlvbjpcImFuaW1hdGlvbmVuZFwifTtmb3IodmFyIG4gaW4gdClpZih0Lmhhc093blByb3BlcnR5KG4pJiZ2b2lkIDAhPT1lLnN0eWxlW25dKXJldHVybiB0W25dO3JldHVybiExfSgpLEg9ZnVuY3Rpb24oKXtpZih3aW5kb3cub25rZXlkb3duPWEucHJldmlvdXNXaW5kb3dLZXlEb3duLGEucHJldmlvdXNBY3RpdmVFbGVtZW50JiZhLnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cyl7dmFyIGU9d2luZG93LnNjcm9sbFgsdD13aW5kb3cuc2Nyb2xsWTthLnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cygpLGUmJnQmJndpbmRvdy5zY3JvbGxUbyhlLHQpfX0sTj1mdW5jdGlvbigpe2lmKFwib250b3VjaHN0YXJ0XCJpbiB3aW5kb3d8fG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzKXJldHVybiAwO3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5zdHlsZS53aWR0aD1cIjUwcHhcIixlLnN0eWxlLmhlaWdodD1cIjUwcHhcIixlLnN0eWxlLm92ZXJmbG93PVwic2Nyb2xsXCIsZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlKTt2YXIgdD1lLm9mZnNldFdpZHRoLWUuY2xpZW50V2lkdGg7cmV0dXJuIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZSksdH0saj1mdW5jdGlvbihlLHQpe3ZhciBuPXZvaWQgMDtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgbz1mdW5jdGlvbigpe249bnVsbCxlKCl9O2NsZWFyVGltZW91dChuKSxuPXNldFRpbWVvdXQobyx0KX19LFI9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX0sST1PYmplY3QuYXNzaWdufHxmdW5jdGlvbihlKXtmb3IodmFyIHQ9MTt0PGFyZ3VtZW50cy5sZW5ndGg7dCsrKXt2YXIgbj1hcmd1bWVudHNbdF07Zm9yKHZhciBvIGluIG4pT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG4sbykmJihlW29dPW5bb10pfXJldHVybiBlfSxLPUkoe30sZSksRD1bXSxXPXZvaWQgMCxVPWZ1bmN0aW9uKHQpe3ZhciByPWMoKXx8bCh0KTtmb3IodmFyIGkgaW4gdCllLmhhc093blByb3BlcnR5KGkpfHxcImV4dHJhUGFyYW1zXCI9PT1pfHxjb25zb2xlLndhcm4oJ1N3ZWV0QWxlcnQyOiBVbmtub3duIHBhcmFtZXRlciBcIicraSsnXCInKTtyLnN0eWxlLndpZHRoPVwibnVtYmVyXCI9PXR5cGVvZiB0LndpZHRoP3Qud2lkdGgrXCJweFwiOnQud2lkdGgsci5zdHlsZS5wYWRkaW5nPXQucGFkZGluZytcInB4XCIsci5zdHlsZS5iYWNrZ3JvdW5kPXQuYmFja2dyb3VuZDtmb3IodmFyIGE9ci5xdWVyeVNlbGVjdG9yQWxsKFwiW2NsYXNzXj1zd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmVdLCAuc3dhbDItc3VjY2Vzcy1maXhcIikscz0wO3M8YS5sZW5ndGg7cysrKWFbc10uc3R5bGUuYmFja2dyb3VuZD10LmJhY2tncm91bmQ7dmFyIHU9ZigpLHA9bSgpLHk9aCgpLGs9YigpLHg9dygpLFM9QygpO2lmKHQudGl0bGVUZXh0P3UuaW5uZXJUZXh0PXQudGl0bGVUZXh0OnUuaW5uZXJIVE1MPXQudGl0bGUuc3BsaXQoXCJcXG5cIikuam9pbihcIjxicj5cIiksdC50ZXh0fHx0Lmh0bWwpe2lmKFwib2JqZWN0XCI9PT1SKHQuaHRtbCkpaWYocC5pbm5lckhUTUw9XCJcIiwwIGluIHQuaHRtbClmb3IodmFyIEE9MDtBIGluIHQuaHRtbDtBKyspcC5hcHBlbmRDaGlsZCh0Lmh0bWxbQV0uY2xvbmVOb2RlKCEwKSk7ZWxzZSBwLmFwcGVuZENoaWxkKHQuaHRtbC5jbG9uZU5vZGUoITApKTtlbHNlIHQuaHRtbD9wLmlubmVySFRNTD10Lmh0bWw6dC50ZXh0JiYocC50ZXh0Q29udGVudD10LnRleHQpO1AocCl9ZWxzZSBUKHApO3Quc2hvd0Nsb3NlQnV0dG9uP1AoUyk6VChTKSxyLmNsYXNzTmFtZT1uLm1vZGFsLHQuY3VzdG9tQ2xhc3MmJkUocix0LmN1c3RvbUNsYXNzKTt2YXIgTT1nKCksVj1wYXJzZUludChudWxsPT09dC5jdXJyZW50UHJvZ3Jlc3NTdGVwPyQuZ2V0UXVldWVTdGVwKCk6dC5jdXJyZW50UHJvZ3Jlc3NTdGVwLDEwKTt0LnByb2dyZXNzU3RlcHMubGVuZ3RoPyhQKE0pLEwoTSksVj49dC5wcm9ncmVzc1N0ZXBzLmxlbmd0aCYmY29uc29sZS53YXJuKFwiU3dlZXRBbGVydDI6IEludmFsaWQgY3VycmVudFByb2dyZXNzU3RlcCBwYXJhbWV0ZXIsIGl0IHNob3VsZCBiZSBsZXNzIHRoYW4gcHJvZ3Jlc3NTdGVwcy5sZW5ndGggKGN1cnJlbnRQcm9ncmVzc1N0ZXAgbGlrZSBKUyBhcnJheXMgc3RhcnRzIGZyb20gMClcIiksdC5wcm9ncmVzc1N0ZXBzLmZvckVhY2goZnVuY3Rpb24oZSxvKXt2YXIgcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7aWYoRShyLG4ucHJvZ3Jlc3NjaXJjbGUpLHIuaW5uZXJIVE1MPWUsbz09PVYmJkUocixuLmFjdGl2ZXByb2dyZXNzc3RlcCksTS5hcHBlbmRDaGlsZChyKSxvIT09dC5wcm9ncmVzc1N0ZXBzLmxlbmd0aC0xKXt2YXIgaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7RShpLG4ucHJvZ3Jlc3NsaW5lKSxpLnN0eWxlLndpZHRoPXQucHJvZ3Jlc3NTdGVwc0Rpc3RhbmNlLE0uYXBwZW5kQ2hpbGQoaSl9fSkpOlQoTSk7Zm9yKHZhciBPPWQoKSxIPTA7SDxPLmxlbmd0aDtIKyspVChPW0hdKTtpZih0LnR5cGUpe3ZhciBOPSExO2Zvcih2YXIgaiBpbiBvKWlmKHQudHlwZT09PWope049ITA7YnJlYWt9aWYoIU4pcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCJTd2VldEFsZXJ0MjogVW5rbm93biBhbGVydCB0eXBlOiBcIit0LnR5cGUpLCExO3ZhciBJPXIucXVlcnlTZWxlY3RvcihcIi5cIituLmljb24rXCIuXCIrb1t0LnR5cGVdKTtpZihQKEkpLHQuYW5pbWF0aW9uKXN3aXRjaCh0LnR5cGUpe2Nhc2VcInN1Y2Nlc3NcIjpFKEksXCJzd2FsMi1hbmltYXRlLXN1Y2Nlc3MtaWNvblwiKSxFKEkucXVlcnlTZWxlY3RvcihcIi5zd2FsMi1zdWNjZXNzLWxpbmUtdGlwXCIpLFwic3dhbDItYW5pbWF0ZS1zdWNjZXNzLWxpbmUtdGlwXCIpLEUoSS5xdWVyeVNlbGVjdG9yKFwiLnN3YWwyLXN1Y2Nlc3MtbGluZS1sb25nXCIpLFwic3dhbDItYW5pbWF0ZS1zdWNjZXNzLWxpbmUtbG9uZ1wiKTticmVhaztjYXNlXCJlcnJvclwiOkUoSSxcInN3YWwyLWFuaW1hdGUtZXJyb3ItaWNvblwiKSxFKEkucXVlcnlTZWxlY3RvcihcIi5zd2FsMi14LW1hcmtcIiksXCJzd2FsMi1hbmltYXRlLXgtbWFya1wiKX19dmFyIEs9digpO3QuaW1hZ2VVcmw/KEsuc2V0QXR0cmlidXRlKFwic3JjXCIsdC5pbWFnZVVybCksUChLKSx0LmltYWdlV2lkdGg/Sy5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLHQuaW1hZ2VXaWR0aCk6Sy5yZW1vdmVBdHRyaWJ1dGUoXCJ3aWR0aFwiKSx0LmltYWdlSGVpZ2h0P0suc2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIsdC5pbWFnZUhlaWdodCk6Sy5yZW1vdmVBdHRyaWJ1dGUoXCJoZWlnaHRcIiksSy5jbGFzc05hbWU9bi5pbWFnZSx0LmltYWdlQ2xhc3MmJkUoSyx0LmltYWdlQ2xhc3MpKTpUKEspLHQuc2hvd0NhbmNlbEJ1dHRvbj94LnN0eWxlLmRpc3BsYXk9XCJpbmxpbmUtYmxvY2tcIjpUKHgpLHQuc2hvd0NvbmZpcm1CdXR0b24/cShrLFwiZGlzcGxheVwiKTpUKGspLHQuc2hvd0NvbmZpcm1CdXR0b258fHQuc2hvd0NhbmNlbEJ1dHRvbj9QKHkpOlQoeSksay5pbm5lckhUTUw9dC5jb25maXJtQnV0dG9uVGV4dCx4LmlubmVySFRNTD10LmNhbmNlbEJ1dHRvblRleHQsdC5idXR0b25zU3R5bGluZyYmKGsuc3R5bGUuYmFja2dyb3VuZENvbG9yPXQuY29uZmlybUJ1dHRvbkNvbG9yLHguc3R5bGUuYmFja2dyb3VuZENvbG9yPXQuY2FuY2VsQnV0dG9uQ29sb3IpLGsuY2xhc3NOYW1lPW4uY29uZmlybSxFKGssdC5jb25maXJtQnV0dG9uQ2xhc3MpLHguY2xhc3NOYW1lPW4uY2FuY2VsLEUoeCx0LmNhbmNlbEJ1dHRvbkNsYXNzKSx0LmJ1dHRvbnNTdHlsaW5nPyhFKGssbi5zdHlsZWQpLEUoeCxuLnN0eWxlZCkpOihCKGssbi5zdHlsZWQpLEIoeCxuLnN0eWxlZCksay5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9ay5zdHlsZS5ib3JkZXJMZWZ0Q29sb3I9ay5zdHlsZS5ib3JkZXJSaWdodENvbG9yPVwiXCIseC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9eC5zdHlsZS5ib3JkZXJMZWZ0Q29sb3I9eC5zdHlsZS5ib3JkZXJSaWdodENvbG9yPVwiXCIpLCEwPT09dC5hbmltYXRpb24/QihyLG4ubm9hbmltYXRpb24pOkUocixuLm5vYW5pbWF0aW9uKX0sej1mdW5jdGlvbihlLHQpe3ZhciBvPXUoKSxyPWMoKTtlPyhFKHIsbi5zaG93KSxFKG8sbi5mYWRlKSxCKHIsbi5oaWRlKSk6QihyLG4uZmFkZSksUChyKSxvLnN0eWxlLm92ZXJmbG93WT1cImhpZGRlblwiLE8mJiF4KHIsbi5ub2FuaW1hdGlvbik/ci5hZGRFdmVudExpc3RlbmVyKE8sZnVuY3Rpb24gZSgpe3IucmVtb3ZlRXZlbnRMaXN0ZW5lcihPLGUpLG8uc3R5bGUub3ZlcmZsb3dZPVwiYXV0b1wifSk6by5zdHlsZS5vdmVyZmxvd1k9XCJhdXRvXCIsRShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsbi5zaG93biksRShkb2N1bWVudC5ib2R5LG4uc2hvd24pLEUobyxuLnNob3duKSxaKCksWSgpLGEucHJldmlvdXNBY3RpdmVFbGVtZW50PWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQsbnVsbCE9PXQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHQmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXt0KHIpfSl9LFo9ZnVuY3Rpb24oKXtudWxsPT09YS5wcmV2aW91c0JvZHlQYWRkaW5nJiZkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodD53aW5kb3cuaW5uZXJIZWlnaHQmJihhLnByZXZpb3VzQm9keVBhZGRpbmc9ZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQsZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9TigpK1wicHhcIil9LFE9ZnVuY3Rpb24oKXtudWxsIT09YS5wcmV2aW91c0JvZHlQYWRkaW5nJiYoZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9YS5wcmV2aW91c0JvZHlQYWRkaW5nLGEucHJldmlvdXNCb2R5UGFkZGluZz1udWxsKX0sWT1mdW5jdGlvbigpe2lmKC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpJiYhd2luZG93Lk1TU3RyZWFtJiYheChkb2N1bWVudC5ib2R5LG4uaW9zZml4KSl7dmFyIGU9ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7ZG9jdW1lbnQuYm9keS5zdHlsZS50b3A9LTEqZStcInB4XCIsRShkb2N1bWVudC5ib2R5LG4uaW9zZml4KX19LF89ZnVuY3Rpb24oKXtpZih4KGRvY3VtZW50LmJvZHksbi5pb3NmaXgpKXt2YXIgZT1wYXJzZUludChkb2N1bWVudC5ib2R5LnN0eWxlLnRvcCwxMCk7Qihkb2N1bWVudC5ib2R5LG4uaW9zZml4KSxkb2N1bWVudC5ib2R5LnN0eWxlLnRvcD1cIlwiLGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wPS0xKmV9fSwkPWZ1bmN0aW9uIGUoKXtmb3IodmFyIHQ9YXJndW1lbnRzLmxlbmd0aCxvPUFycmF5KHQpLGk9MDtpPHQ7aSsrKW9baV09YXJndW1lbnRzW2ldO2lmKHZvaWQgMD09PW9bMF0pcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCJTd2VldEFsZXJ0MiBleHBlY3RzIGF0IGxlYXN0IDEgYXR0cmlidXRlIVwiKSwhMTt2YXIgbD1JKHt9LEspO3N3aXRjaChSKG9bMF0pKXtjYXNlXCJzdHJpbmdcIjpsLnRpdGxlPW9bMF0sbC5odG1sPW9bMV0sbC50eXBlPW9bMl07YnJlYWs7Y2FzZVwib2JqZWN0XCI6SShsLG9bMF0pLGwuZXh0cmFQYXJhbXM9b1swXS5leHRyYVBhcmFtcyxcImVtYWlsXCI9PT1sLmlucHV0JiZudWxsPT09bC5pbnB1dFZhbGlkYXRvciYmKGwuaW5wdXRWYWxpZGF0b3I9ZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHQsbil7L15bYS16QS1aMC05LitfLV0rQFthLXpBLVowLTkuLV0rXFwuW2EtekEtWl17Miw2fSQvLnRlc3QoZSk/dCgpOm4oXCJJbnZhbGlkIGVtYWlsIGFkZHJlc3NcIil9KX0pLFwidXJsXCI9PT1sLmlucHV0JiZudWxsPT09bC5pbnB1dFZhbGlkYXRvciYmKGwuaW5wdXRWYWxpZGF0b3I9ZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHQsbil7L15odHRwcz86XFwvXFwvKHd3d1xcLik/Wy1hLXpBLVowLTlAOiUuXyt+Iz1dezIsMjU2fVxcLlthLXpdezIsNn1cXGIoWy1hLXpBLVowLTlAOiVfKy5+Iz8mLy89XSopJC8udGVzdChlKT90KCk6bihcIkludmFsaWQgVVJMXCIpfSl9KTticmVhaztkZWZhdWx0OnJldHVybiBjb25zb2xlLmVycm9yKCdTd2VldEFsZXJ0MjogVW5leHBlY3RlZCB0eXBlIG9mIGFyZ3VtZW50ISBFeHBlY3RlZCBcInN0cmluZ1wiIG9yIFwib2JqZWN0XCIsIGdvdCAnK1Iob1swXSkpLCExfVUobCk7dmFyIHM9dSgpLGQ9YygpO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbih0LG8pe2wudGltZXImJihkLnRpbWVvdXQ9c2V0VGltZW91dChmdW5jdGlvbigpe2UuY2xvc2VNb2RhbChsLm9uQ2xvc2UpLGwudXNlUmVqZWN0aW9ucz9vKFwidGltZXJcIik6dCh7ZGlzbWlzczpcInRpbWVyXCJ9KX0sbC50aW1lcikpO3ZhciBpPWZ1bmN0aW9uKGUpe2lmKCEoZT1lfHxsLmlucHV0KSlyZXR1cm4gbnVsbDtzd2l0Y2goZSl7Y2FzZVwic2VsZWN0XCI6Y2FzZVwidGV4dGFyZWFcIjpjYXNlXCJmaWxlXCI6cmV0dXJuIEEoZCxuW2VdKTtjYXNlXCJjaGVja2JveFwiOnJldHVybiBkLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrbi5jaGVja2JveCtcIiBpbnB1dFwiKTtjYXNlXCJyYWRpb1wiOnJldHVybiBkLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrbi5yYWRpbytcIiBpbnB1dDpjaGVja2VkXCIpfHxkLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrbi5yYWRpbytcIiBpbnB1dDpmaXJzdC1jaGlsZFwiKTtjYXNlXCJyYW5nZVwiOnJldHVybiBkLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrbi5yYW5nZStcIiBpbnB1dFwiKTtkZWZhdWx0OnJldHVybiBBKGQsbi5pbnB1dCl9fSxwPWZ1bmN0aW9uKCl7dmFyIGU9aSgpO2lmKCFlKXJldHVybiBudWxsO3N3aXRjaChsLmlucHV0KXtjYXNlXCJjaGVja2JveFwiOnJldHVybiBlLmNoZWNrZWQ/MTowO2Nhc2VcInJhZGlvXCI6cmV0dXJuIGUuY2hlY2tlZD9lLnZhbHVlOm51bGw7Y2FzZVwiZmlsZVwiOnJldHVybiBlLmZpbGVzLmxlbmd0aD9lLmZpbGVzWzBdOm51bGw7ZGVmYXVsdDpyZXR1cm4gbC5pbnB1dEF1dG9UcmltP2UudmFsdWUudHJpbSgpOmUudmFsdWV9fTtsLmlucHV0JiZzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dmFyIGU9aSgpO2UmJlMoZSl9LDApO2Zvcih2YXIgeD1mdW5jdGlvbihuKXtsLnNob3dMb2FkZXJPbkNvbmZpcm0mJmUuc2hvd0xvYWRpbmcoKSxsLnByZUNvbmZpcm0/bC5wcmVDb25maXJtKG4sbC5leHRyYVBhcmFtcykudGhlbihmdW5jdGlvbihvKXtlLmNsb3NlTW9kYWwobC5vbkNsb3NlKSx0KG98fG4pfSxmdW5jdGlvbih0KXtlLmhpZGVMb2FkaW5nKCksdCYmZS5zaG93VmFsaWRhdGlvbkVycm9yKHQpfSk6KGUuY2xvc2VNb2RhbChsLm9uQ2xvc2UpLHQobC51c2VSZWplY3Rpb25zP246e3ZhbHVlOm59KSl9LEw9ZnVuY3Rpb24obil7dmFyIGk9bnx8d2luZG93LmV2ZW50LGE9aS50YXJnZXR8fGkuc3JjRWxlbWVudCxzPWIoKSx1PXcoKSxjPXMmJihzPT09YXx8cy5jb250YWlucyhhKSksZD11JiYodT09PWF8fHUuY29udGFpbnMoYSkpO3N3aXRjaChpLnR5cGUpe2Nhc2VcIm1vdXNlb3ZlclwiOmNhc2VcIm1vdXNldXBcIjpsLmJ1dHRvbnNTdHlsaW5nJiYoYz9zLnN0eWxlLmJhY2tncm91bmRDb2xvcj1yKGwuY29uZmlybUJ1dHRvbkNvbG9yLC0uMSk6ZCYmKHUuc3R5bGUuYmFja2dyb3VuZENvbG9yPXIobC5jYW5jZWxCdXR0b25Db2xvciwtLjEpKSk7YnJlYWs7Y2FzZVwibW91c2VvdXRcIjpsLmJ1dHRvbnNTdHlsaW5nJiYoYz9zLnN0eWxlLmJhY2tncm91bmRDb2xvcj1sLmNvbmZpcm1CdXR0b25Db2xvcjpkJiYodS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9bC5jYW5jZWxCdXR0b25Db2xvcikpO2JyZWFrO2Nhc2VcIm1vdXNlZG93blwiOmwuYnV0dG9uc1N0eWxpbmcmJihjP3Muc3R5bGUuYmFja2dyb3VuZENvbG9yPXIobC5jb25maXJtQnV0dG9uQ29sb3IsLS4yKTpkJiYodS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9cihsLmNhbmNlbEJ1dHRvbkNvbG9yLC0uMikpKTticmVhaztjYXNlXCJjbGlja1wiOmlmKGMmJmUuaXNWaXNpYmxlKCkpaWYoZS5kaXNhYmxlQnV0dG9ucygpLGwuaW5wdXQpe3ZhciBmPXAoKTtsLmlucHV0VmFsaWRhdG9yPyhlLmRpc2FibGVJbnB1dCgpLGwuaW5wdXRWYWxpZGF0b3IoZixsLmV4dHJhUGFyYW1zKS50aGVuKGZ1bmN0aW9uKCl7ZS5lbmFibGVCdXR0b25zKCksZS5lbmFibGVJbnB1dCgpLHgoZil9LGZ1bmN0aW9uKHQpe2UuZW5hYmxlQnV0dG9ucygpLGUuZW5hYmxlSW5wdXQoKSx0JiZlLnNob3dWYWxpZGF0aW9uRXJyb3IodCl9KSk6eChmKX1lbHNlIHgoITApO2Vsc2UgZCYmZS5pc1Zpc2libGUoKSYmKGUuZGlzYWJsZUJ1dHRvbnMoKSxlLmNsb3NlTW9kYWwobC5vbkNsb3NlKSxsLnVzZVJlamVjdGlvbnM/byhcImNhbmNlbFwiKTp0KHtkaXNtaXNzOlwiY2FuY2VsXCJ9KSl9fSxxPWQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKSxPPTA7TzxxLmxlbmd0aDtPKyspcVtPXS5vbmNsaWNrPUwscVtPXS5vbm1vdXNlb3Zlcj1MLHFbT10ub25tb3VzZW91dD1MLHFbT10ub25tb3VzZWRvd249TDtDKCkub25jbGljaz1mdW5jdGlvbigpe2UuY2xvc2VNb2RhbChsLm9uQ2xvc2UpLGwudXNlUmVqZWN0aW9ucz9vKFwiY2xvc2VcIik6dCh7ZGlzbWlzczpcImNsb3NlXCJ9KX0scy5vbmNsaWNrPWZ1bmN0aW9uKG4pe24udGFyZ2V0PT09cyYmbC5hbGxvd091dHNpZGVDbGljayYmKGUuY2xvc2VNb2RhbChsLm9uQ2xvc2UpLGwudXNlUmVqZWN0aW9ucz9vKFwib3ZlcmxheVwiKTp0KHtkaXNtaXNzOlwib3ZlcmxheVwifSkpfTt2YXIgSD1oKCksTj1iKCksST13KCk7bC5yZXZlcnNlQnV0dG9ucz9OLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKEksTik6Ti5wYXJlbnROb2RlLmluc2VydEJlZm9yZShOLEkpO3ZhciBLPWZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuPWsobC5mb2N1c0NhbmNlbCksbz0wO288bi5sZW5ndGg7bysrKXsoZSs9dCk9PT1uLmxlbmd0aD9lPTA6LTE9PT1lJiYoZT1uLmxlbmd0aC0xKTt2YXIgcj1uW2VdO2lmKE0ocikpcmV0dXJuIHIuZm9jdXMoKX19LEQ9ZnVuY3Rpb24obil7dmFyIHI9bnx8d2luZG93LmV2ZW50LGk9ci5rZXlDb2RlfHxyLndoaWNoO2lmKC0xIT09WzksMTMsMzIsMjcsMzcsMzgsMzksNDBdLmluZGV4T2YoaSkpe2Zvcih2YXIgYT1yLnRhcmdldHx8ci5zcmNFbGVtZW50LHM9ayhsLmZvY3VzQ2FuY2VsKSx1PS0xLGM9MDtjPHMubGVuZ3RoO2MrKylpZihhPT09c1tjXSl7dT1jO2JyZWFrfTk9PT1pPyhyLnNoaWZ0S2V5P0sodSwtMSk6Syh1LDEpLHIuc3RvcFByb3BhZ2F0aW9uKCksci5wcmV2ZW50RGVmYXVsdCgpKTozNz09PWl8fDM4PT09aXx8Mzk9PT1pfHw0MD09PWk/ZG9jdW1lbnQuYWN0aXZlRWxlbWVudD09PU4mJk0oSSk/SS5mb2N1cygpOmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ9PT1JJiZNKE4pJiZOLmZvY3VzKCk6MTM9PT1pfHwzMj09PWk/LTE9PT11JiZsLmFsbG93RW50ZXJLZXkmJihWKGwuZm9jdXNDYW5jZWw/STpOKSxyLnN0b3BQcm9wYWdhdGlvbigpLHIucHJldmVudERlZmF1bHQoKSk6Mjc9PT1pJiYhMD09PWwuYWxsb3dFc2NhcGVLZXkmJihlLmNsb3NlTW9kYWwobC5vbkNsb3NlKSxsLnVzZVJlamVjdGlvbnM/byhcImVzY1wiKTp0KHtkaXNtaXNzOlwiZXNjXCJ9KSl9fTt3aW5kb3cub25rZXlkb3duJiZ3aW5kb3cub25rZXlkb3duLnRvU3RyaW5nKCk9PT1ELnRvU3RyaW5nKCl8fChhLnByZXZpb3VzV2luZG93S2V5RG93bj13aW5kb3cub25rZXlkb3duLHdpbmRvdy5vbmtleWRvd249RCksbC5idXR0b25zU3R5bGluZyYmKE4uc3R5bGUuYm9yZGVyTGVmdENvbG9yPWwuY29uZmlybUJ1dHRvbkNvbG9yLE4uc3R5bGUuYm9yZGVyUmlnaHRDb2xvcj1sLmNvbmZpcm1CdXR0b25Db2xvciksZS5oaWRlTG9hZGluZz1lLmRpc2FibGVMb2FkaW5nPWZ1bmN0aW9uKCl7bC5zaG93Q29uZmlybUJ1dHRvbnx8KFQoTiksbC5zaG93Q2FuY2VsQnV0dG9ufHxUKGgoKSkpLEIoSCxuLmxvYWRpbmcpLEIoZCxuLmxvYWRpbmcpLE4uZGlzYWJsZWQ9ITEsSS5kaXNhYmxlZD0hMX0sZS5nZXRUaXRsZT1mdW5jdGlvbigpe3JldHVybiBmKCl9LGUuZ2V0Q29udGVudD1mdW5jdGlvbigpe3JldHVybiBtKCl9LGUuZ2V0SW5wdXQ9ZnVuY3Rpb24oKXtyZXR1cm4gaSgpfSxlLmdldEltYWdlPWZ1bmN0aW9uKCl7cmV0dXJuIHYoKX0sZS5nZXRCdXR0b25zV3JhcHBlcj1mdW5jdGlvbigpe3JldHVybiBoKCl9LGUuZ2V0Q29uZmlybUJ1dHRvbj1mdW5jdGlvbigpe3JldHVybiBiKCl9LGUuZ2V0Q2FuY2VsQnV0dG9uPWZ1bmN0aW9uKCl7cmV0dXJuIHcoKX0sZS5lbmFibGVCdXR0b25zPWZ1bmN0aW9uKCl7Ti5kaXNhYmxlZD0hMSxJLmRpc2FibGVkPSExfSxlLmRpc2FibGVCdXR0b25zPWZ1bmN0aW9uKCl7Ti5kaXNhYmxlZD0hMCxJLmRpc2FibGVkPSEwfSxlLmVuYWJsZUNvbmZpcm1CdXR0b249ZnVuY3Rpb24oKXtOLmRpc2FibGVkPSExfSxlLmRpc2FibGVDb25maXJtQnV0dG9uPWZ1bmN0aW9uKCl7Ti5kaXNhYmxlZD0hMH0sZS5lbmFibGVJbnB1dD1mdW5jdGlvbigpe3ZhciBlPWkoKTtpZighZSlyZXR1cm4hMTtpZihcInJhZGlvXCI9PT1lLnR5cGUpZm9yKHZhciB0PWUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKSxuPTA7bjx0Lmxlbmd0aDtuKyspdFtuXS5kaXNhYmxlZD0hMTtlbHNlIGUuZGlzYWJsZWQ9ITF9LGUuZGlzYWJsZUlucHV0PWZ1bmN0aW9uKCl7dmFyIGU9aSgpO2lmKCFlKXJldHVybiExO2lmKGUmJlwicmFkaW9cIj09PWUudHlwZSlmb3IodmFyIHQ9ZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpLG49MDtuPHQubGVuZ3RoO24rKyl0W25dLmRpc2FibGVkPSEwO2Vsc2UgZS5kaXNhYmxlZD0hMH0sZS5yZWNhbGN1bGF0ZUhlaWdodD1qKGZ1bmN0aW9uKCl7dmFyIGU9YygpO2lmKGUpe3ZhciB0PWUuc3R5bGUuZGlzcGxheTtlLnN0eWxlLm1pbkhlaWdodD1cIlwiLFAoZSksZS5zdHlsZS5taW5IZWlnaHQ9ZS5zY3JvbGxIZWlnaHQrMStcInB4XCIsZS5zdHlsZS5kaXNwbGF5PXR9fSw1MCksZS5zaG93VmFsaWRhdGlvbkVycm9yPWZ1bmN0aW9uKGUpe3ZhciB0PXkoKTt0LmlubmVySFRNTD1lLFAodCk7dmFyIG89aSgpO28mJihTKG8pLEUobyxuLmlucHV0ZXJyb3IpKX0sZS5yZXNldFZhbGlkYXRpb25FcnJvcj1mdW5jdGlvbigpe3ZhciB0PXkoKTtUKHQpLGUucmVjYWxjdWxhdGVIZWlnaHQoKTt2YXIgbz1pKCk7byYmQihvLG4uaW5wdXRlcnJvcil9LGUuZ2V0UHJvZ3Jlc3NTdGVwcz1mdW5jdGlvbigpe3JldHVybiBsLnByb2dyZXNzU3RlcHN9LGUuc2V0UHJvZ3Jlc3NTdGVwcz1mdW5jdGlvbihlKXtsLnByb2dyZXNzU3RlcHM9ZSxVKGwpfSxlLnNob3dQcm9ncmVzc1N0ZXBzPWZ1bmN0aW9uKCl7UChnKCkpfSxlLmhpZGVQcm9ncmVzc1N0ZXBzPWZ1bmN0aW9uKCl7VChnKCkpfSxlLmVuYWJsZUJ1dHRvbnMoKSxlLmhpZGVMb2FkaW5nKCksZS5yZXNldFZhbGlkYXRpb25FcnJvcigpO2Zvcih2YXIgWj1bXCJpbnB1dFwiLFwiZmlsZVwiLFwicmFuZ2VcIixcInNlbGVjdFwiLFwicmFkaW9cIixcImNoZWNrYm94XCIsXCJ0ZXh0YXJlYVwiXSxRPXZvaWQgMCxZPTA7WTxaLmxlbmd0aDtZKyspe3ZhciBfPW5bWltZXV0sJD1BKGQsXyk7aWYoUT1pKFpbWV0pKXtmb3IodmFyIEogaW4gUS5hdHRyaWJ1dGVzKWlmKFEuYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShKKSl7dmFyIFg9US5hdHRyaWJ1dGVzW0pdLm5hbWU7XCJ0eXBlXCIhPT1YJiZcInZhbHVlXCIhPT1YJiZRLnJlbW92ZUF0dHJpYnV0ZShYKX1mb3IodmFyIEYgaW4gbC5pbnB1dEF0dHJpYnV0ZXMpUS5zZXRBdHRyaWJ1dGUoRixsLmlucHV0QXR0cmlidXRlc1tGXSl9JC5jbGFzc05hbWU9XyxsLmlucHV0Q2xhc3MmJkUoJCxsLmlucHV0Q2xhc3MpLFQoJCl9dmFyIEc9dm9pZCAwO3N3aXRjaChsLmlucHV0KXtjYXNlXCJ0ZXh0XCI6Y2FzZVwiZW1haWxcIjpjYXNlXCJwYXNzd29yZFwiOmNhc2VcIm51bWJlclwiOmNhc2VcInRlbFwiOmNhc2VcInVybFwiOihRPUEoZCxuLmlucHV0KSkudmFsdWU9bC5pbnB1dFZhbHVlLFEucGxhY2Vob2xkZXI9bC5pbnB1dFBsYWNlaG9sZGVyLFEudHlwZT1sLmlucHV0LFAoUSk7YnJlYWs7Y2FzZVwiZmlsZVwiOihRPUEoZCxuLmZpbGUpKS5wbGFjZWhvbGRlcj1sLmlucHV0UGxhY2Vob2xkZXIsUS50eXBlPWwuaW5wdXQsUChRKTticmVhaztjYXNlXCJyYW5nZVwiOnZhciBlZT1BKGQsbi5yYW5nZSksdGU9ZWUucXVlcnlTZWxlY3RvcihcImlucHV0XCIpLG5lPWVlLnF1ZXJ5U2VsZWN0b3IoXCJvdXRwdXRcIik7dGUudmFsdWU9bC5pbnB1dFZhbHVlLHRlLnR5cGU9bC5pbnB1dCxuZS52YWx1ZT1sLmlucHV0VmFsdWUsUChlZSk7YnJlYWs7Y2FzZVwic2VsZWN0XCI6dmFyIG9lPUEoZCxuLnNlbGVjdCk7aWYob2UuaW5uZXJIVE1MPVwiXCIsbC5pbnB1dFBsYWNlaG9sZGVyKXt2YXIgcmU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtyZS5pbm5lckhUTUw9bC5pbnB1dFBsYWNlaG9sZGVyLHJlLnZhbHVlPVwiXCIscmUuZGlzYWJsZWQ9ITAscmUuc2VsZWN0ZWQ9ITAsb2UuYXBwZW5kQ2hpbGQocmUpfUc9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0IGluIGUpe3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7bi52YWx1ZT10LG4uaW5uZXJIVE1MPWVbdF0sbC5pbnB1dFZhbHVlPT09dCYmKG4uc2VsZWN0ZWQ9ITApLG9lLmFwcGVuZENoaWxkKG4pfVAob2UpLG9lLmZvY3VzKCl9O2JyZWFrO2Nhc2VcInJhZGlvXCI6dmFyIGllPUEoZCxuLnJhZGlvKTtpZS5pbm5lckhUTUw9XCJcIixHPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdCBpbiBlKXt2YXIgbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIikscj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiksaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtvLnR5cGU9XCJyYWRpb1wiLG8ubmFtZT1uLnJhZGlvLG8udmFsdWU9dCxsLmlucHV0VmFsdWU9PT10JiYoby5jaGVja2VkPSEwKSxpLmlubmVySFRNTD1lW3RdLHIuYXBwZW5kQ2hpbGQobyksci5hcHBlbmRDaGlsZChpKSxyLmZvcj1vLmlkLGllLmFwcGVuZENoaWxkKHIpfVAoaWUpO3ZhciBhPWllLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTthLmxlbmd0aCYmYVswXS5mb2N1cygpfTticmVhaztjYXNlXCJjaGVja2JveFwiOnZhciBhZT1BKGQsbi5jaGVja2JveCksbGU9aShcImNoZWNrYm94XCIpO2xlLnR5cGU9XCJjaGVja2JveFwiLGxlLnZhbHVlPTEsbGUuaWQ9bi5jaGVja2JveCxsZS5jaGVja2VkPUJvb2xlYW4obC5pbnB1dFZhbHVlKTt2YXIgc2U9YWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzcGFuXCIpO3NlLmxlbmd0aCYmYWUucmVtb3ZlQ2hpbGQoc2VbMF0pLChzZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSkuaW5uZXJIVE1MPWwuaW5wdXRQbGFjZWhvbGRlcixhZS5hcHBlbmRDaGlsZChzZSksUChhZSk7YnJlYWs7Y2FzZVwidGV4dGFyZWFcIjp2YXIgdWU9QShkLG4udGV4dGFyZWEpO3VlLnZhbHVlPWwuaW5wdXRWYWx1ZSx1ZS5wbGFjZWhvbGRlcj1sLmlucHV0UGxhY2Vob2xkZXIsUCh1ZSk7YnJlYWs7Y2FzZSBudWxsOmJyZWFrO2RlZmF1bHQ6Y29uc29sZS5lcnJvcignU3dlZXRBbGVydDI6IFVuZXhwZWN0ZWQgdHlwZSBvZiBpbnB1dCEgRXhwZWN0ZWQgXCJ0ZXh0XCIsIFwiZW1haWxcIiwgXCJwYXNzd29yZFwiLCBcIm51bWJlclwiLCBcInRlbFwiLCBcInNlbGVjdFwiLCBcInJhZGlvXCIsIFwiY2hlY2tib3hcIiwgXCJ0ZXh0YXJlYVwiLCBcImZpbGVcIiBvciBcInVybFwiLCBnb3QgXCInK2wuaW5wdXQrJ1wiJyl9XCJzZWxlY3RcIiE9PWwuaW5wdXQmJlwicmFkaW9cIiE9PWwuaW5wdXR8fChsLmlucHV0T3B0aW9ucyBpbnN0YW5jZW9mIFByb21pc2U/KGUuc2hvd0xvYWRpbmcoKSxsLmlucHV0T3B0aW9ucy50aGVuKGZ1bmN0aW9uKHQpe2UuaGlkZUxvYWRpbmcoKSxHKHQpfSkpOlwib2JqZWN0XCI9PT1SKGwuaW5wdXRPcHRpb25zKT9HKGwuaW5wdXRPcHRpb25zKTpjb25zb2xlLmVycm9yKFwiU3dlZXRBbGVydDI6IFVuZXhwZWN0ZWQgdHlwZSBvZiBpbnB1dE9wdGlvbnMhIEV4cGVjdGVkIG9iamVjdCBvciBQcm9taXNlLCBnb3QgXCIrUihsLmlucHV0T3B0aW9ucykpKSx6KGwuYW5pbWF0aW9uLGwub25PcGVuKSxsLmFsbG93RW50ZXJLZXk/SygtMSwxKTpkb2N1bWVudC5hY3RpdmVFbGVtZW50JiZkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKSx1KCkuc2Nyb2xsVG9wPTAsXCJ1bmRlZmluZWRcIj09dHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXJ8fFd8fChXPW5ldyBNdXRhdGlvbk9ic2VydmVyKGUucmVjYWxjdWxhdGVIZWlnaHQpKS5vYnNlcnZlKGQse2NoaWxkTGlzdDohMCxjaGFyYWN0ZXJEYXRhOiEwLHN1YnRyZWU6ITB9KX0pfTtyZXR1cm4gJC5pc1Zpc2libGU9ZnVuY3Rpb24oKXtyZXR1cm4hIWMoKX0sJC5xdWV1ZT1mdW5jdGlvbihlKXtEPWU7dmFyIHQ9ZnVuY3Rpb24oKXtEPVtdLGRvY3VtZW50LmJvZHkucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1zd2FsMi1xdWV1ZS1zdGVwXCIpfSxuPVtdO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihlLG8peyFmdW5jdGlvbiByKGksYSl7aTxELmxlbmd0aD8oZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN3YWwyLXF1ZXVlLXN0ZXBcIixpKSwkKERbaV0pLnRoZW4oZnVuY3Rpb24oZSl7bi5wdXNoKGUpLHIoaSsxLGEpfSxmdW5jdGlvbihlKXt0KCksbyhlKX0pKToodCgpLGUobikpfSgwKX0pfSwkLmdldFF1ZXVlU3RlcD1mdW5jdGlvbigpe3JldHVybiBkb2N1bWVudC5ib2R5LmdldEF0dHJpYnV0ZShcImRhdGEtc3dhbDItcXVldWUtc3RlcFwiKX0sJC5pbnNlcnRRdWV1ZVN0ZXA9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdCYmdDxELmxlbmd0aD9ELnNwbGljZSh0LDAsZSk6RC5wdXNoKGUpfSwkLmRlbGV0ZVF1ZXVlU3RlcD1mdW5jdGlvbihlKXt2b2lkIDAhPT1EW2VdJiZELnNwbGljZShlLDEpfSwkLmNsb3NlPSQuY2xvc2VNb2RhbD1mdW5jdGlvbihlKXt2YXIgdD11KCksbz1jKCk7aWYobyl7QihvLG4uc2hvdyksRShvLG4uaGlkZSksY2xlYXJUaW1lb3V0KG8udGltZW91dCksSCgpO3ZhciByPWZ1bmN0aW9uKCl7dC5wYXJlbnROb2RlJiZ0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodCksQihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsbi5zaG93biksQihkb2N1bWVudC5ib2R5LG4uc2hvd24pLFEoKSxfKCl9O08mJiF4KG8sbi5ub2FuaW1hdGlvbik/by5hZGRFdmVudExpc3RlbmVyKE8sZnVuY3Rpb24gZSgpe28ucmVtb3ZlRXZlbnRMaXN0ZW5lcihPLGUpLHgobyxuLmhpZGUpJiZyKCl9KTpyKCksbnVsbCE9PWUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKG8pfSl9fSwkLmNsaWNrQ29uZmlybT1mdW5jdGlvbigpe3JldHVybiBiKCkuY2xpY2soKX0sJC5jbGlja0NhbmNlbD1mdW5jdGlvbigpe3JldHVybiB3KCkuY2xpY2soKX0sJC5zaG93TG9hZGluZz0kLmVuYWJsZUxvYWRpbmc9ZnVuY3Rpb24oKXt2YXIgZT1jKCk7ZXx8JChcIlwiKTt2YXIgdD1oKCksbz1iKCkscj13KCk7UCh0KSxQKG8sXCJpbmxpbmUtYmxvY2tcIiksRSh0LG4ubG9hZGluZyksRShlLG4ubG9hZGluZyksby5kaXNhYmxlZD0hMCxyLmRpc2FibGVkPSEwfSwkLnNldERlZmF1bHRzPWZ1bmN0aW9uKHQpe2lmKCF0fHxcIm9iamVjdFwiIT09KHZvaWQgMD09PXQ/XCJ1bmRlZmluZWRcIjpSKHQpKSlyZXR1cm4gY29uc29sZS5lcnJvcihcIlN3ZWV0QWxlcnQyOiB0aGUgYXJndW1lbnQgZm9yIHNldERlZmF1bHRzKCkgaXMgcmVxdWlyZWQgYW5kIGhhcyB0byBiZSBhIG9iamVjdFwiKTtmb3IodmFyIG4gaW4gdCllLmhhc093blByb3BlcnR5KG4pfHxcImV4dHJhUGFyYW1zXCI9PT1ufHwoY29uc29sZS53YXJuKCdTd2VldEFsZXJ0MjogVW5rbm93biBwYXJhbWV0ZXIgXCInK24rJ1wiJyksZGVsZXRlIHRbbl0pO0koSyx0KX0sJC5yZXNldERlZmF1bHRzPWZ1bmN0aW9uKCl7Sz1JKHt9LGUpfSwkLm5vb3A9ZnVuY3Rpb24oKXt9LCQudmVyc2lvbj1cIjYuNi41XCIsJC5kZWZhdWx0PSQsJH0pLHdpbmRvdy5Td2VldGFsZXJ0MiYmKHdpbmRvdy5zd2VldEFsZXJ0PXdpbmRvdy5zd2FsPXdpbmRvdy5Td2VldGFsZXJ0Mik7IiwidmFyIGFjdGl2byAgICAgID0gJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5maWJlcl9zbWFydF9yZWNvcmQ8L2k+IEFjdGl2byc7IFxyXG52YXIgbm9BY3Rpdm8gICAgPSAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPnJlbW92ZV9jaXJjbGVfb3V0bGluZTwvaT4gTm8gQWN0aXZvJztcclxudmFyIHN1c3BlbmRpZG8gID0gJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5yZXBvcnRfcHJvYmxlbTwvaT4gU3VzcGVuZGlkbyc7XHJcbnZhciBlbkNvcnRlICAgICA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+c2lnbmFsX3dpZmlfb2ZmPC9pPiBFbiBDb3J0ZSc7XHJcbnZhciBtb3JhICAgICAgICA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+dGltZXI8L2k+IE1vcmEnO1xyXG52YXIgZXhvbmVyYWRvICAgPSAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmxvY2FsX29mZmVyPC9pPiBFeG9uZXJhZG8nO1xyXG52YXIgZmlsdHJvcyAgICAgPSBbW2FjdGl2byxub0FjdGl2b10sYWN0aXZvLG5vQWN0aXZvXTtcclxudmFyIGVzdGFkb3NpY29ub3MgPSB7XHJcbiAgJ2FjdGl2bycgOiB7dGV4dDogYWN0aXZvLGNsYXNzOiAnZG9uZSd9LFxyXG4gICdubyBhY3Rpdm8nOiB7dGV4dDogbm9BY3Rpdm8sIGNsYXNzOiAnZXJyb3InfSxcclxuICAnZW4gY29ydGUnOiAge3RleHQ6IGVuQ29ydGUsY2xhc3M6ICdlbi1jb3J0ZSd9LFxyXG4gICdtb3JhJzoge3RleHQ6IG1vcmEsIGNsYXNzOiAnbW9yYSd9LFxyXG4gICdzdXNwZW5kaWRvJzoge3RleHQ6IHN1c3BlbmRpZG8sY2xhc3M6ICdzdXNwZW5kaWRvJ30sXHJcbiAgJ2V4b25lcmFkbyc6IHt0ZXh0OiBleG9uZXJhZG8sY2xhc3M6ICdleG9uZXJhZG8nfVxyXG59XHJcbnZhciBlc3RhZG9zID0gWydhY3Rpdm8nLCdubyBhY3Rpdm8nLCdlbiBjb3J0ZScsJ21vcmEnLCdzdXNwZW5kaWRvJywnZXhvbmVyYWRvJ107XHJcbnZhciBzZWxlY3RTdGF0ZSA9IFwiPHNlbGVjdD5cIlxyXG5lc3RhZG9zLmZvckVhY2goZnVuY3Rpb24oZXN0YWRvKSB7XHJcbiAgc2VsZWN0U3RhdGUgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIitlc3RhZG8rXCInPlwiK2VzdGFkbytcIjwvdmFsdWU+XCJcclxuICB9LCB0aGlzKTtcclxuc2VsZWN0U3RhdGUgKz1cIjxzZWxlY3Q+XCJcclxuXHJcbi8vIE15IE9iamVjdHNcclxuIFxyXG52YXIgY2xpZW50VGFibGUgPSB7XHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uKHBhZ2Upe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5lbCA9ICQoJyN0LWNsaWVudHMnKTtcclxuICAgIHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoKVxyXG4gICAgdGhpcy5lbC5maW5kKCd0Ym9keScpLmNzcyh7ZGlzcGxheTpcInRhYmxlLXJvdy1ncm91cFwifSk7XHJcbiAgICBzZWxmLmVsLmFkZENsYXNzKCdpbm5lcnRhYmxlJyk7XHJcbiAgICBpZihwYWdlKXtcclxuICAgICAgc2VsZi5lbC5ib290c3RyYXBUYWJsZSgnc2VsZWN0UGFnZScscGFnZSk7XHJcbiAgICB9XHJcbiAgICBjbGllbnRUYWJsZS5kZXRlY3RDbGlja3MoKTtcclxuICAgIHRoaXMuZWwub24oJ2FsbC5icy50YWJsZScsIGZ1bmN0aW9uIChuYW1lLHBhcmFtKSB7XHJcbiAgICAgICBjbGllbnRUYWJsZS5jaGFuZ2VTdGF0ZXMoKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGdldFNlbGVjdGVkUm93OiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYuZWwuYm9vdHN0cmFwVGFibGUoJ2dldFNlbGVjdGlvbnMnKVswXVxyXG4gIH0sXHJcblxyXG4gIGdldElkOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuICQubWFwKHNlbGYuZWwuYm9vdHN0cmFwVGFibGUoJ2dldFNlbGVjdGlvbnMnKSxmdW5jdGlvbihyb3cpe1xyXG4gICAgICByZXR1cm4gcm93LmlkO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgcmVmcmVzaDogZnVuY3Rpb24oY29udGVudCxjYWxsYmFjayl7XHJcbiAgICB2YXIgb3B0aW9ucyA9IGNsaWVudFRhYmxlLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRPcHRpb25zJyk7XHJcblxyXG4gICAgY2xpZW50VGFibGUuZWwuYm9vdHN0cmFwVGFibGUoJ2Rlc3Ryb3knKTtcclxuICAgIGNsaWVudFRhYmxlLmVsLmZpbmQoJ3Rib2R5JykuaHRtbChjb250ZW50KTtcclxuICAgIGNsaWVudFRhYmxlLmluaXQob3B0aW9ucy5wYWdlTnVtYmVyKTtcclxuICAgIGlmKGNhbGxiYWNrKVxyXG4gICAgICAgY2FsbGJhY2s7XHJcbiAgfSxcclxuXHJcbiAgZGV0ZWN0Q2xpY2tzOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGJ0bkdldERldGFpbHMgICAgID0gJChcIiNnZXQtZGV0YWlsc1wiKTtcclxuICAgIHZhciBidG5OZXdDb250cmFjdCAgICA9ICQoXCIjY2xpZW50LW5ldy1jb250cmFjdFwiKTtcclxuICAgIHZhciBidG5Hb05ld0NvbnRyYWN0ICA9ICQoXCIjZ28tbmV3LWNvbnRyYWN0XCIpO1xyXG5cclxuICAgIHRoaXMuZWwub24oJ2NoZWNrLmJzLnRhYmxlJyxmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgaWQgPSBjbGllbnRUYWJsZS5nZXRJZCgpXHJcbiAgICAgIGJ0bkdldERldGFpbHMuYXR0cignaHJlZicsQkFTRV9VUkwgKyAncHJvY2Vzcy9kZXRhaWxzLycrIGlkKTtcclxuICAgICAgYnRuTmV3Q29udHJhY3QuYXR0cignaHJlZicsQkFTRV9VUkwgKyAncHJvY2Vzcy9uZXdjb250cmFjdC8nKyBpZCk7XHJcbiAgICAgIFxyXG4gICAgICAvLyBidXNjYWRvclxyXG4gICAgICBpZihidG5Hb05ld0NvbnRyYWN0KXtcclxuICAgICAgICBpZihidG5Hb05ld0NvbnRyYWN0LnRleHQoKS50b0xvd2VyQ2FzZSgpID09IFwiaXIgYSBwYWdvc1wiKXtcclxuICAgICAgICAgIGJ0bkdvTmV3Q29udHJhY3QuYXR0cignaHJlZicsQkFTRV9VUkwgKyAncHJvY2Vzcy9kZXRhaWxzLycrIGlkICsgXCIvcGFnb3NcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBidG5Hb05ld0NvbnRyYWN0LmF0dHIoJ2hyZWYnLEJBU0VfVVJMICsgJ3Byb2Nlc3MvbmV3Y29udHJhY3QvJysgaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5lbC5vbigndW5jaGVjay5icy50YWJsZScsZnVuY3Rpb24oKXtcclxuICAgICAgYnRuR2V0RGV0YWlscy5hdHRyKCdocmVmJywnIycpO1xyXG4gICAgICBidG5OZXdDb250cmFjdC5hdHRyKCdocmVmJywnIycpO1xyXG4gICAgICBidG5Hb05ld0NvbnRyYWN0LmF0dHIoJ2hyZWYnLCcjJyk7XHJcbiAgICB9KTsgXHJcbiAgfSxcclxuXHJcbiAgY2hhbmdlU3RhdGVzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKFwiLmVzdGFkby1jbGllbnRlXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBzZWxlY3QgPSAkKHNlbGVjdFN0YXRlKTtcclxuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgdmFyIHN0YXRlO1xyXG4gICAgICB2YXIgaWQgPSAkdGhpcy5wYXJlbnQoKS5maW5kKCcuaWRfY2xpZW50ZScpLnRleHQoKS50cmltKCk7XHJcbiAgICAgICR0aGlzLmh0bWwoc2VsZWN0KTtcclxuICAgICAgc2VsZWN0LmZvY3VzKCk7XHJcblxyXG4gICAgICBzZWxlY3Qub24oJ2NoYW5nZSBibHVyJyxmdW5jdGlvbihlKXsgXHJcbiAgICAgICAgc3RhdGUgPSBzZWxlY3QudmFsKClcclxuICAgICAgICAkdGhpcy5odG1sKGVzdGFkb3NpY29ub3Nbc3RhdGVdLnRleHQpXHJcbiAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoXCIgZG9uZSBlcnJvciBlbi1jb3J0ZSBleG9uZXJhZG8gbW9yYSBzdXNwZW5kaWRvXCIpO1xyXG4gICAgICAgICR0aGlzLmFkZENsYXNzKGVzdGFkb3NpY29ub3Nbc3RhdGVdLmNsYXNzKTtcclxuICAgICAgICBDbGllbnRzLnVwZGF0ZVN0YXRlKHsnaWQnOmlkLCdlc3RhZG8nOnN0YXRlfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc2VsZWN0Lm9uKCdjbGljaycsZnVuY3Rpb24oZSl7IFxyXG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuIFxyXG59XHJcbiB3aW5kb3cuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGggPSAgNDUwO1xyXG4gICAgcmV0dXJuIGg7XHJcbiAgfSIsInZhciBzZXJ2aWNlVGFibGUgPSB7XHJcbiAgaW5pdDogZnVuY3Rpb24ocGFnZSl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB0aGlzLmVsID0gJCgnI3Qtc2VydmljZXMnKTtcclxuICAgIHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoKTtcclxuICAgIHRoaXMuZWwuZmluZCgndGJvZHknKS5jc3Moe2Rpc3BsYXk6XCJ0YWJsZS1yb3ctZ3JvdXBcIn0pO1xyXG4gICAgaWYocGFnZSl7XHJcbiAgICAgIHNlbGYuZWwuYm9vdHN0cmFwVGFibGUoJ3NlbGVjdFBhZ2UnLHBhZ2UpO1xyXG4gICAgfVxyXG4gICAgc2VsZi5lbC5hZGRDbGFzcygnaW5uZXJ0YWJsZScpO1xyXG5cclxuICB9LFxyXG5cclxuICBnZXRTZWxlY3RlZFJvdzogZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBzZWxmLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRTZWxlY3Rpb25zJylbMF1cclxuICB9LFxyXG5cclxuICBnZXRJZDogZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiAkLm1hcChzZWxmLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRTZWxlY3Rpb25zJyksZnVuY3Rpb24ocm93KXtcclxuICAgICAgcmV0dXJuIHJvdy5pZDtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIHJlZnJlc2g6IGZ1bmN0aW9uKGNvbnRlbnQsY2FsbGJhY2spe1xyXG4gICAgdmFyIG9wdGlvbnMgPSBzZXJ2aWNlVGFibGUuZWwuYm9vdHN0cmFwVGFibGUoJ2dldE9wdGlvbnMnKTtcclxuXHJcbiAgICBzZXJ2aWNlVGFibGUuZWwuYm9vdHN0cmFwVGFibGUoJ2Rlc3Ryb3knKTtcclxuICAgIHNlcnZpY2VUYWJsZS5lbC5maW5kKCd0Ym9keScpLmh0bWwoY29udGVudCk7XHJcbiAgICBzZXJ2aWNlVGFibGUuaW5pdChvcHRpb25zLnBhZ2VOdW1iZXIpO1xyXG4gICAgaWYoY2FsbGJhY2spXHJcbiAgICAgICBjYWxsYmFjaztcclxuICB9XHJcblxyXG59IiwidmFyIGNvbnRyYWN0VGFibGUgPSB7XHJcbiAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMuZWwgPSAkKCcjdC1jb250cmFjdHMnKTtcclxuICAgIHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoKTtcclxuICAgIHRoaXMuZWwuZmluZCgndGJvZHknKS5jc3Moe2Rpc3BsYXk6XCJ0YWJsZS1yb3ctZ3JvdXBcIn0pO1xyXG4gICAgc2VsZi5lbC5hZGRDbGFzcygnaW5uZXJ0YWJsZScpO1xyXG4gICAgY29udHJhY3RUYWJsZS5kZXRlY3RDbGlja3MoKTtcclxuICB9LFxyXG5cclxuICBnZXRTZWxlY3RlZFJvdzogZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBzZWxmLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRTZWxlY3Rpb25zJylbMF1cclxuICB9LFxyXG5cclxuICBnZXRJZDogZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiAkLm1hcChzZWxmLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRTZWxlY3Rpb25zJyksZnVuY3Rpb24ocm93KXtcclxuICAgICAgcmV0dXJuIHJvdy5pZDtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIHJlZnJlc2g6IGZ1bmN0aW9uKGNvbnRlbnQsY2FsbGJhY2spe1xyXG4gICAgY29udHJhY3RUYWJsZS5lbC5ib290c3RyYXBUYWJsZSgnZGVzdHJveScpO1xyXG4gICAgY29udHJhY3RUYWJsZS5lbC5maW5kKCd0Ym9keScpLmh0bWwoY29udGVudCk7XHJcbiAgICBjb250cmFjdFRhYmxlLmluaXQoKTtcclxuICAgIGlmKGNhbGxiYWNrKVxyXG4gICAgICAgY2FsbGJhY2soKTtcclxuICB9LFxyXG5cclxuICBkZXRlY3RDbGlja3M6IGZ1bmN0aW9uKCl7XHJcbiAgICBcclxuICAgIHZhciBidG5QYXlWaWV3ICAgICA9ICQoXCIjYnRuLXBheS12aWV3XCIpO1xyXG4gICAgdmFyIGJ0blNlZUluRGV0YWlsID0gJChcIiNidG4tc2VlLWluLWRldGFpbFwiKTtcclxuICAgIHZhciBidG5TZWVDb250cmFjdCA9ICQoXCIjYnRuLXNlZS1jb250cmFjdFwiKTtcclxuXHJcbiAgICB0aGlzLmVsLm9uKCdjaGVjay5icy50YWJsZScsZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHJvdz0gY29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICBidG5QYXlWaWV3LmF0dHIoJ2hyZWYnLEJBU0VfVVJMICsgJ3Byb2Nlc3MvZGV0YWlscy8nKyByb3cuaWRfY2xpZW50ZSArIFwiL3BhZ29zXCIpO1xyXG4gICAgICBidG5TZWVJbkRldGFpbC5hdHRyKCdocmVmJyxCQVNFX1VSTCArICdwcm9jZXNzL2RldGFpbHMvJysgcm93LmlkX2NsaWVudGUpO1xyXG4gICAgICBidG5TZWVDb250cmFjdC5hdHRyKCdocmVmJyxCQVNFX1VSTCArICdwcm9jZXNzL2dldHJlcXVpcmVtZW50cy8nICsgcm93LmlkICsgJy9jb250cmF0bycpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5lbC5vbigndW5jaGVjay5icy50YWJsZScsZnVuY3Rpb24oKXtcclxuICAgICAgYnRuUGF5Vmlldy5hdHRyKCdocmVmJywnIycpO1xyXG4gICAgICBidG5TZWVJbkRldGFpbC5hdHRyKCdocmVmJywnIycpO1xyXG4gICAgICBidG5TZWVDb250cmFjdC5hdHRyKCdocmVmJywnIycpO1xyXG4gICAgfSk7IFxyXG4gIH1cclxufSIsInZhciB1c2VyVGFibGUgPSB7XHJcbiAgaW5pdDogZnVuY3Rpb24ocGFnZSl7XHJcbiAgICB0aGlzLmVsID0gJCgnI3QtdXNlcnMnKTtcclxuICAgIHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoKTtcclxuICAgIHRoaXMuZWwuZmluZCgndGJvZHknKS5jc3Moe2Rpc3BsYXk6XCJ0YWJsZS1yb3ctZ3JvdXBcIn0pO1xyXG4gICAgdGhpcy5lbC5hZGRDbGFzcygnaW5uZXJ0YWJsZScpO1xyXG5cclxuICAgIGlmKHBhZ2Upe1xyXG4gICAgICB0aGlzLmVsLmJvb3RzdHJhcFRhYmxlKCdzZWxlY3RQYWdlJyxwYWdlKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRTZWxlY3RlZFJvdzogZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBzZWxmLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRTZWxlY3Rpb25zJylbMF1cclxuICB9LFxyXG5cclxuICBnZXRJZDogZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiAkLm1hcChzZWxmLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRTZWxlY3Rpb25zJyksZnVuY3Rpb24ocm93KXtcclxuICAgICAgcmV0dXJuIHJvdy5pZDtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGdldFJvdzogZnVuY3Rpb24oaWQpe1xyXG4gICAgdmFyIGRhdGEgPSB0aGlzLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRSb3dCeVVuaXF1ZUlkJyxpZCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9LFxyXG5cclxuICByZWZyZXNoOiBmdW5jdGlvbihjb250ZW50LGNhbGxiYWNrKXtcclxuICAgIHZhciBvcHRpb25zID0gdXNlclRhYmxlLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRPcHRpb25zJyk7XHJcblxyXG4gICAgdXNlclRhYmxlLmVsLmJvb3RzdHJhcFRhYmxlKCdkZXN0cm95Jyk7XHJcbiAgICB1c2VyVGFibGUuZWwuZmluZCgndGJvZHknKS5odG1sKGNvbnRlbnQpO1xyXG4gICAgdXNlclRhYmxlLmluaXQob3B0aW9ucy5wYWdlTnVtYmVyKTtcclxuICAgIGlmKGNhbGxiYWNrKVxyXG4gICAgICAgY2FsbGJhY2soKTtcclxuICB9LCAgIFxyXG59XHJcblxyXG52YXIgY2FqYVRhYmxlID0ge1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBhZ2Upe1xyXG4gICAgdGhpcy5lbCA9ICQoXCIjY2FqYVwiKTtcclxuICAgIHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoKTtcclxuICAgIHRoaXMuZWwuZmluZCgndGJvZHknKS5jc3Moe2Rpc3BsYXk6XCJ0YWJsZS1yb3ctZ3JvdXBcIn0pO1xyXG4gICAgdGhpcy5lbC5hZGRDbGFzcygnaW5uZXJ0YWJsZScpO1xyXG4gICAgXHJcbiAgICBpZihwYWdlKXtcclxuICAgICAgdGhpcy5lbC5ib290c3RyYXBUYWJsZSgnc2VsZWN0UGFnZScscGFnZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0U2VsZWN0ZWRSb3c6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gc2VsZi5lbC5ib290c3RyYXBUYWJsZSgnZ2V0U2VsZWN0aW9ucycpWzBdXHJcbiAgfSxcclxuXHJcbiAgcmVmcmVzaDogZnVuY3Rpb24oY29udGVudCxjYWxsYmFjayl7XHJcbiAgICB2YXIgb3B0aW9ucyA9IGNhamFUYWJsZS5lbC5ib290c3RyYXBUYWJsZSgnZ2V0T3B0aW9ucycpO1xyXG4gICAgXHJcbiAgICBjYWphVGFibGUuZWwuYm9vdHN0cmFwVGFibGUoJ2Rlc3Ryb3knKTtcclxuICAgIGNhamFUYWJsZS5lbC5maW5kKCd0Ym9keScpLmh0bWwoY29udGVudCk7XHJcbiAgICBjYWphVGFibGUuaW5pdChvcHRpb25zLlBhZ2VOdW1iZXIpO1xyXG4gICAgaWYoY2FsbGJhY2spXHJcbiAgICAgICBjYWxsYmFjaygpO1xyXG4gIH0gICBcclxufVxyXG5cclxuIiwidmFyIHBheW1lbnRUYWJsZSA9IHtcclxuICBpbml0OiBmdW5jdGlvbihwYWdlLHJvdyl7XHJcbiAgICB0aGlzLmVsID0gJCgnI3QtcGFnb3MnKTtcclxuICAgIHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoKTtcclxuICAgIHRoaXMuZWwuZmluZCgndGJvZHknKS5jc3Moe2Rpc3BsYXk6XCJ0YWJsZS1yb3ctZ3JvdXBcIn0pO1xyXG4gICAgdGhpcy5lbC5hZGRDbGFzcygnaW5uZXJ0YWJsZScpO1xyXG4gICAgdGhpcy5kZXRhaWxCb3ggPSAkKCcjcGF5bWVudC1kZXRhaWwtYm94Jyk7XHJcbiAgICB0aGlzLmRldGFpbEJveC5oaWRlKClcclxuICAgIFxyXG4gICAgaWYocGFnZSxyb3cpe1xyXG4gICAgICB2YXIgaWQgPSByb3cuaWRfY29udHJhdG87XHJcbiAgICAgIGlmKGlkID09IHBheW1lbnRUYWJsZS5nZXRSb3coKS5pZF9jb250cmF0bylcclxuICAgICAgICB0aGlzLmVsLmJvb3RzdHJhcFRhYmxlKCdzZWxlY3RQYWdlJyxwYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsLm9uKCdkYmwtY2xpY2stcm93LmJzLnRhYmxlJyxmdW5jdGlvbihldmVudCxyb3csJGVsLGZpZWxkKXtcclxuICAgICAgLy8gIFBheW1lbnRzLmdldE9uZShyb3cuaWQsIFBheW1lbnRzLmVkaXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5lbC5vbignY2xpY2stcm93LmJzLnRhYmxlJyxmdW5jdGlvbihldmVudCxyb3csJGVsLGZpZWxkKXtcclxuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBzZWxmID0gcGF5bWVudFRhYmxlO1xyXG4gICAgICAkKFwiLnBheW1lbnQtbW9kZVwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xyXG4gICAgICBpZighJGVsLmhhc0NsYXNzKCdzZWxlY3RlZCcpICYmIHJvdy5lc3RhZG8gPT0gXCJubyBwYWdhZG9cIil7XHJcbiAgICAgICAgc2VsZi5kZXRhaWxCb3guc2hvdygpO1xyXG4gICAgICAgIHNlbGYuZGV0YWlsQm94LmNvbGxhcHNlKCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgICBzZWxmLmRldGFpbEJveC5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2cocm93LmVzdGFkbylcclxuICAgIH0pXHJcblxyXG4gICAgcGF5bWVudFRhYmxlLmNsaWNrRXZlbnRzKCk7XHJcbiAgICB0aGlzLmVsLm9uKCdhbGwuYnMudGFibGUnLGZ1bmN0aW9uKG5hbWUsYXJncyl7XHJcbiAgICAgIHBheW1lbnRUYWJsZS5jbGlja0V2ZW50cygpXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIGdldFNlbGVjdGVkUm93OiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHNlbGYuZWwuYm9vdHN0cmFwVGFibGUoJ2dldFNlbGVjdGlvbnMnKVswXVxyXG4gIH0sXHJcblxyXG4gIGdldElkOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuICQubWFwKHNlbGYuZWwuYm9vdHN0cmFwVGFibGUoJ2dldFNlbGVjdGlvbnMnKSxmdW5jdGlvbihyb3cpe1xyXG4gICAgICByZXR1cm4gcm93LmlkO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0Um93OiBmdW5jdGlvbihpZCl7XHJcbiAgICB2YXIgZGF0YSA9IHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoJ2dldERhdGEnKTtcclxuICAgIHJldHVybiBkYXRhWzBdO1xyXG5cclxuICB9LFxyXG5cclxuICByZWZyZXNoOiBmdW5jdGlvbihjb250ZW50LGNhbGxiYWNrKXtcclxuICAgIHZhciBvcHRpb25zID0gcGF5bWVudFRhYmxlLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRPcHRpb25zJyk7XHJcbiAgICB2YXIgcm93ICAgICA9IHBheW1lbnRUYWJsZS5nZXRSb3coKTtcclxuXHJcbiAgICBwYXltZW50VGFibGUuZWwuYm9vdHN0cmFwVGFibGUoJ2Rlc3Ryb3knKTtcclxuICAgIHBheW1lbnRUYWJsZS5lbC5maW5kKCd0Ym9keScpLmh0bWwoY29udGVudCk7XHJcbiAgICBwYXltZW50VGFibGUuaW5pdChvcHRpb25zLnBhZ2VOdW1iZXIsIHJvdyk7XHJcbiAgICBpZihjYWxsYmFjaylcclxuICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgfSwgIFxyXG4gIFxyXG4gIGZpbHRlcjogZnVuY3Rpb24odmFsdWUsIHR5cGUpe1xyXG4gICAgaWYodHlwZSA9PSAnZXN0YWRvJyl7XHJcbiAgICAgIHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoJ2ZpbHRlckJ5Jyx7XHJcbiAgICAgICAgZXN0YWRvOiB2YWx1ZVxyXG4gICAgICB9KTtcclxuICAgIH1lbHNle1xyXG4gICAgICBob3kgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpXHJcbiAgICAgIHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoJ2ZpbHRlckJ5Jyx7XHJcbiAgICAgICAgZmVjaGFfbGltaXRlOiBbXVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICB9LFxyXG5cclxuICBjbGlja0V2ZW50czogZnVuY3Rpb24oKXtcclxuICAgICQoXCIucGF5bWVudC1hZHZhbmNlZFwiKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd5byBzaSBmdW5jaW9ubycpXHJcbiAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignZGF0YS1pZC1wYWdvJykudHJpbSgpO1xyXG4gICAgICBpZiAoaWQpIHtcclxuICAgICAgICBQYXltZW50cy5nZXRPbmUoaWQsIFBheW1lbnRzLnJlY2VpdmVGb3JFZGl0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5wYXltZW50LWRlbGV0ZVwiKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignZGF0YS1pZC1wYWdvJykudHJpbSgpO1xyXG4gICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgc3dhbCh7XHJcbiAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgdGV4dDogXCJTZWd1cm8gZGUgcXVlIHF1aWVyZSBkZXNoYWNlciBlc3RlIHBhZ28/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgICdjYW5jZWxCdXR0b25UZXh0JzogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgIFBheW1lbnRzLnJlbW92ZVBheW1lbnQoaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG59XHJcblxyXG52YXIgZGV0YWlsc0NvbnRyYWN0VGFibGUgPSB7XHJcbiAgaW5pdDogZnVuY3Rpb24ocGFnZSl7XHJcbiAgICB0aGlzLmVsID0gJChcIiNkLWNvbnRyYWN0c1wiKTtcclxuICAgIHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoKTtcclxuICAgIHRoaXMuZWwuZmluZCgndGJvZHknKS5jc3Moe2Rpc3BsYXk6XCJ0YWJsZS1yb3ctZ3JvdXBcIn0pO1xyXG4gICAgdGhpcy5lbC5hZGRDbGFzcygnaW5uZXJ0YWJsZScpO1xyXG4gICAgXHJcbiAgICBpZihwYWdlKXtcclxuICAgICAgdGhpcy5lbC5ib290c3RyYXBUYWJsZSgnc2VsZWN0UGFnZScscGFnZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0U2VsZWN0ZWRSb3c6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gc2VsZi5lbC5ib290c3RyYXBUYWJsZSgnZ2V0U2VsZWN0aW9ucycpWzBdXHJcbiAgfSxcclxuXHJcbiAgcmVmcmVzaDogZnVuY3Rpb24oY29udGVudCxjYWxsYmFjayl7XHJcbiAgICB2YXIgb3B0aW9ucyA9IGRldGFpbHNDb250cmFjdFRhYmxlLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRPcHRpb25zJyk7XHJcbiAgICBkZXRhaWxzQ29udHJhY3RUYWJsZS5lbC5ib290c3RyYXBUYWJsZSgnZGVzdHJveScpO1xyXG4gICAgZGV0YWlsc0NvbnRyYWN0VGFibGUuZWwuZmluZCgndGJvZHknKS5odG1sKGNvbnRlbnQpO1xyXG4gICAgZGV0YWlsc0NvbnRyYWN0VGFibGUuaW5pdChvcHRpb25zLnBhZ2VOdW1iZXIpO1xyXG4gICAgaWYoY2FsbGJhY2spXHJcbiAgICAgICBjYWxsYmFjaygpO1xyXG4gIH0gICBcclxufVxyXG5cclxuXHJcbnZhciBidXMgPSBuZXcgVnVlKClcclxuXHJcbnZhciBleHRyYVRhYmxlID0ge1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBhZ2Uscm93KXtcclxuICAgIHRoaXMuZWwgPSAkKCcjdC1leHRyYXMnKTtcclxuICAgIHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoKTtcclxuICAgIHRoaXMuZWwuZmluZCgndGJvZHknKS5jc3Moe2Rpc3BsYXk6XCJ0YWJsZS1yb3ctZ3JvdXBcIn0pO1xyXG4gICAgdGhpcy5lbC5hZGRDbGFzcygnaW5uZXJ0YWJsZScpO1xyXG4gICAgdGhpcy5kZXRhaWxCb3ggPSAkKCcjcGF5bWVudC1kZXRhaWwtYm94Jyk7XHJcbiAgICB0aGlzLmRldGFpbEJveC5oaWRlKClcclxuICAgIFxyXG4gICAgaWYocGFnZSxyb3cpe1xyXG4gICAgICB2YXIgaWQgPSByb3cuaWRfY29udHJhdG87XHJcbiAgICAgIGlmKGlkID09IGV4dHJhVGFibGUuZ2V0Um93KCkuaWRfY29udHJhdG8pXHJcbiAgICAgICAgdGhpcy5lbC5ib290c3RyYXBUYWJsZSgnc2VsZWN0UGFnZScscGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbC5vbignZGJsLWNsaWNrLXJvdy5icy50YWJsZScsZnVuY3Rpb24oZXZlbnQscm93LCRlbCxmaWVsZCl7XHJcbiAgICAgIC8vICBQYXltZW50cy5nZXRPbmUocm93LmlkLCBQYXltZW50cy5lZGl0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZWwub24oJ2NsaWNrLXJvdy5icy50YWJsZScsZnVuY3Rpb24oZXZlbnQscm93LCRlbCxmaWVsZCl7XHJcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgc2VsZiA9IGV4dHJhVGFibGU7XHJcbiAgICAgICQoXCIucGF5bWVudC1tb2RlXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgIFxyXG4gICAgICBpZighJGVsLmhhc0NsYXNzKCdzZWxlY3RlZCcpKXtcclxuICAgICAgICBidXMuJGVtaXQoJ3Jvdy1zZWxlY3RlZCcscm93KTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBleHRyYVRhYmxlLmNsaWNrRXZlbnRzKCk7XHJcbiAgICB0aGlzLmVsLm9uKCdhbGwuYnMudGFibGUnLGZ1bmN0aW9uKG5hbWUsYXJncyl7XHJcbiAgICAgIGV4dHJhVGFibGUuY2xpY2tFdmVudHMoKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBnZXRTZWxlY3RlZFJvdzogZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiBzZWxmLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRTZWxlY3Rpb25zJylbMF1cclxuICB9LFxyXG5cclxuICBnZXRJZDogZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHJldHVybiAkLm1hcChzZWxmLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXRTZWxlY3Rpb25zJyksZnVuY3Rpb24ocm93KXtcclxuICAgICAgcmV0dXJuIHJvdy5pZDtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGdldFJvdzogZnVuY3Rpb24oaWQpe1xyXG4gICAgdmFyIGRhdGEgPSB0aGlzLmVsLmJvb3RzdHJhcFRhYmxlKCdnZXREYXRhJyk7XHJcbiAgICByZXR1cm4gZGF0YVswXTtcclxuXHJcbiAgfSxcclxuXHJcbiAgcmVmcmVzaDogZnVuY3Rpb24oY29udGVudCxjYWxsYmFjayl7XHJcbiAgICB2YXIgb3B0aW9ucyA9IGV4dHJhVGFibGUuZWwuYm9vdHN0cmFwVGFibGUoJ2dldE9wdGlvbnMnKTtcclxuICAgIHZhciByb3cgICAgID0gZXh0cmFUYWJsZS5nZXRSb3coKTtcclxuXHJcbiAgICBleHRyYVRhYmxlLmVsLmJvb3RzdHJhcFRhYmxlKCdkZXN0cm95Jyk7XHJcbiAgICBleHRyYVRhYmxlLmVsLmZpbmQoJ3Rib2R5JykuaHRtbChjb250ZW50KTtcclxuICAgIGV4dHJhVGFibGUuaW5pdChvcHRpb25zLnBhZ2VOdW1iZXIsIHJvdyk7XHJcbiAgICBpZihjYWxsYmFjaylcclxuICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgfSwgIFxyXG4gIFxyXG4gIGZpbHRlcjogZnVuY3Rpb24odmFsdWUsIHR5cGUpe1xyXG4gICAgaWYodHlwZSA9PSAnZXN0YWRvJyl7XHJcbiAgICAgIHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoJ2ZpbHRlckJ5Jyx7XHJcbiAgICAgICAgZXN0YWRvOiB2YWx1ZVxyXG4gICAgICB9KTtcclxuICAgIH1lbHNle1xyXG4gICAgICBob3kgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpXHJcbiAgICAgIHRoaXMuZWwuYm9vdHN0cmFwVGFibGUoJ2ZpbHRlckJ5Jyx7XHJcbiAgICAgICAgZmVjaGFfbGltaXRlOiBbXVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICB9LFxyXG5cclxuICBjbGlja0V2ZW50czogZnVuY3Rpb24oKXtcclxuICAgICQoXCIucGF5bWVudC1hZHZhbmNlZFwiKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd5byBzaSBmdW5jaW9ubycpXHJcbiAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignZGF0YS1pZC1wYWdvJykudHJpbSgpO1xyXG4gICAgICBpZiAoaWQpIHtcclxuICAgICAgICBQYXltZW50cy5nZXRPbmUoaWQsIFBheW1lbnRzLnJlY2VpdmVGb3JFZGl0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5leHRyYS1kZWxldGVcIikub24oJ2NsaWNrJyxmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQtZXh0cmEnKS50cmltKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIlNlZ3VybyBkZSBxdWUgcXVpZXJlIGRlc2hhY2VyIHNlcnZpY2lvIGV4dHJhP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICAnY2FuY2VsQnV0dG9uVGV4dCc6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBFeHRyYXMucmVtb3ZlKGlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxufSJdfQ==

var BASE_URL = window.location.origin + "/";
if(BASE_URL.includes("localhost") || BASE_URL.includes('ngrok.io')){
  BASE_URL += 'icpayment/';
}

var MESSAGE_SUCCESS = '<i class="material-icons">done_all</i>';
var MESSAGE_ERROR   = '<i class="material-icons">error_outline</i>';
var MESSAGE_INFO    = '<i class="material-icons">info_outline</i>';
var SUMMER_SKY      = '#1FA1D0'

/**
 * Connect And Send
 * Conecta al servidor via ajax y muestra el mensaje de respuesta
 * @param {string} url Url a donde se va a mandar la el formulario, sin la base_url
 * @param {boolean} is_message Si se espera un mensaje o no como respuesta 
 * @param {callback} recognizeElements Funcion para reconocer los elementos autogenerados
 * @param {?callback} action callback que recibe los datos desde el servidor para hacer algo con ellos
 * @param {string} form formulario a ser enviado al servidor
 * @param {callback} callback funcion a ser ejecutada despues que todo se cumpla, como get users
 * @param {function} loading function for loading
 * @return {void}
 */

function connectAndSend(url,is_message,recognizeElements,action,form,callback,loading){
  if(!loading) loading = lineLoad
  var connect = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); 
    connect.onreadystatechange = function() {
        
        if (connect.readyState == 4 && connect.status == 200) {
          if(loading)loading(true);
          if (action != null)  {
              action(connect.responseText,recognizeElements);          
          }
          else{
            if(is_message){
              displayMessage(connect.responseText);                            
            }              
          }
          if(callback != null)callback();
        } 

        else if (connect.readyState != 4) {
          if(loading)loading(false);      
        }
    }

    connect.open("POST",BASE_URL + url, true);
    connect.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    connect.send(form);
}
/********************************************************
*         Funciones de mensajes y notificaciones                            
*                                                       *
********************************************************/
/**
 * Display Message
 * Muestra una notificacion del resultado de la consulta
 * @param {string} message string to be displayed 
 * @return {void}
 */

function displayMessage(message){
  var color = "rgba(102,187,106,1)";
  var toast,span;

    if(message.includes(MESSAGE_ERROR)){
      color = "rgba(244,67,54,1)";
    }else if(message.includes(MESSAGE_INFO)){
      color = "rgba(2,136,209,1)";
    }

    toast = $(".toast")
    span = toast.find("span").html(message);
    span.css({background:color});
    toast.css({display:"flex"});
    
    toast.animate({opacity:"1"},500,function(){
      setTimeout(function() {
        toast.animate({opacity:"0"});
        toast.css({display:"none"});
      }, 2000);
    });
}

function displayAlert(title,message,type){
  if(!title) title = "Revise";
  if(!message) message = "Asegurate de llenar todos los campos"
  if(!type) type = "error"
  swal({
      title: title,
      text: message,
      type: type,
      confirmButtonClass: 'btn',
      buttonsStyling: false
    });
}

/********************************************************
*        fucniones para Llenar tablas                                        
*                                                       *
********************************************************/

/**
 * Llena la tabla actual con los datos que vienen del servidor
 * @param {string} $content El html con los datos a ser mostrados, vienen siempre desde el servidor
 * @param {function} callback El callback para reconocer a los nuevos items
 * @return {void}
 */
function fillCurrentTable($content,callback,tableID){
  var $table
  $("html").removeClass("gr__icpayment-soft_com")
  if(tableID != undefined){
    $table = $('#'+tableID + " tbody");
  }else{
    $table = $('[class*="t-"] tbody');
  }
  $table.html($content);
  if(callback) callback();
}

/**
 * Llena la tabla clientes utilizando la funcion fillCurrentTable pasandole la tabla clientes como valor
 * @return {void}
 */
function fillClientTable($content,callback){
  fillCurrentTable($content,callback,"t-clients");
}

/**
 * Llena la tabla caja utilizando la funcion fillCurrentTable pasandole la tabla clientes como valor
 * @return {void}
 */
function fillCajaTable($content,callback){
  fillCurrentTable($content,callback,"caja");
  if(callback)callback();
}
/**
 * Llena la Lista de pagos/notificaciones con los datos que vienen del servidor
 * @param {string} $content El html con los datos a ser mostrados, vienen siempre desde el servidor
 * @param {function} callback El callback para reconocer a los nuevos items
 * @return {void}
 */

function fillPaymentsList($content,callback){
  var $container = $(".list-nextpayments");
  $container.html($content);
}

function fillAveriasList($content,callback){
  var $container = $("#averias-list");
  $container.html($content);
  callback();
}

function fillInstallationsList($content,callback){
  var $container = $("#installations-list");
  $container.html($content);
  callback();
}

function makeContractList(response,callback){
  if(response != "nada"){
    
    var contracts = JSON.parse(response);
    var value,service,equipment,eMac,router,rMac,code;
    var selectContract = $("#extra-client-contract");
    var element = "<option value=''>--Selecciona--</option>";
    var cliente = contracts.cliente;
    var contractId = contractTable.getId();

    for (var i = 0; i < contracts.contratos.length; i++) {
      value     = contracts.contratos[i]["id_contrato"];
      service   = contracts.contratos[i]["servicio"];
      equipment = contracts.contratos[i]["nombre_equipo"];
      router    = contracts.contratos[i]["router"];
      eMac      = contracts.contratos[i]["mac_equipo"];
      rMac      = contracts.contratos[i]["mac_router"];
      code     = contracts.contratos[i]["codigo"];
      element += "<option value='" + value + "' data-service='"+service+"'  data-equipment='"+equipment+"'  data-e-mac='"+eMac+"'";
      element += " data-router='"+router+"'  data-r-mac='"+rMac+"' data-code='"+code+"'>";
      element += value +"</option>";  
    }
    selectContract.html(element);
    selectContract.val(contractId).change();
    $("#extra-client-name").val(cliente['nombres'] + " " + cliente['apellidos']);

  }else{
    displayMessage(MESSAGE_ERROR + " Este cliente no existe revise su cedula por favor");
  } 
}

function clearTbody(objecId){
  $(objecId).html("");
}

function fillClientFields(response,callback){
  if(response != "nada"){ 
    var cliente = JSON.parse(response);
    $("#averias-client-id").val(cliente['id_cliente']);
    $("#a-client").val(cliente['nombres'] + " " + cliente['apellidos'])
  }else{
    displayMessage(MESSAGE_ERROR + " Este cliente no existe revise su cedula por favor");
  }
}

function makePaymentList(response,callback){
  var selectPayUntil = $('#select-pay-until');
  selectPayUntil.html(response);
  selectPayUntil.parent().removeClass('hide');
  selectPayUntil.change();
  if(callback)callback();
}


/**
 * isEmpty
 * Verifica si los valores dados estan vacios o son nulos 
 * @param {Array. < string} values
 * @return {boolean}
 */
function isEmpty(values,is_num){
  for(var i = 0 ; i < values.length ; i++){
    if (values[i] == null || values[i] == ""){
      return true;
    } 
  }
  return false;
}


function updateSaldo(money){
  money = "RD$ "+ CurrencyFormat(money)
  $(".current-saldo").text(money);
}
function updateCount($content){
  $(".total-rows").html($content);
}
// +-----------------------------------------------------------------------------------------------------------------------------+
// |                                                     User passwords validations                                              |
// |                                                                                                                             |
// +-----------------------------------------------------------------------------------------------------------------------------+
//

function validateModal($modalId){
  var $userPassword = $($modalId+' .password');
  var $userPasswordConfirm = $($modalId+' .password-confirm');
  var $saveButton = $($modalId+' .save');
  
  $userPasswordConfirm.on('blur keyup',function(){
    validateTwo($userPassword,$userPasswordConfirm,$saveButton);
  });
  $saveButton.on('click',clearForm($modalId));
}

function validateTwo($firstObject,$secondObject,$button){
    if($secondObject.val() == $firstObject.val() && $secondObject.val() != ""){
      replaceClass($firstObject.parent(),"has-error","has-success");
      replaceClass($secondObject.parent(),"has-error","has-success");
      $button.removeAttr("disabled","");

    }else{
       replaceClass($firstObject.parent(),"has-success","has-error");
       replaceClass($secondObject.parent(),"has-success","has-error");
       $button.attr("disabled","");
    }
}

function validateThis(){
  var $userPassword = $('.password');
  var $userPasswordConfirm = $('.password-confirm');
  var $saveButton = $('.save');
  
  $userPassword.on('blur keyup',function(){
    validateTwo($userPassword,$userPasswordConfirm,$saveButton);
  });
  $userPasswordConfirm.on('blur keyup',function(){
    validateTwo($userPassword,$userPasswordConfirm,$saveButton);
  });
}

function clearForm(modalId){
  $(modalId + " input").val("");
}

function deleteValidation($inputElement, text, $buttonToActive){
  var innerText;
  this.text = text;
  var self  = this;
  $inputElement.on("keyup",function(e){
    e.stopImmediatePropagation();
    innerText = $(this).val() 
    if(innerText.toLowerCase() == self.text.toLowerCase()){
      $buttonToActive.removeAttr("disabled");

    }else{
      $buttonToActive.attr("disabled","");
    }
  })
}

// +-----------------------------------------------------------------------------------------------------------------------------+
// |                                                     Funciones de utileria                                                   |
// |                                                                                                                             |
// +-----------------------------------------------------------------------------------------------------------------------------+
//


function replaceClass($object,oldClass,newClass){
   $object.addClass(newClass);
   $object.removeClass(oldClass)
}

function makeServiceCardClickable(){
    var serviceCard      = $(".service-card");
    var btnPrintContract = $('#btn-print-requirement');

    serviceCard.on('click',function(e){
      e.stopImmediatePropagation();
      var $this       = $(this);
      var service_id  = $this.attr('data-id'); 
      var payment     = $this.attr('data-payment');
      var realLink    = btnPrintContract.attr('data-href')
      
      serviceCard.removeClass('selected');
      $this.addClass('selected');
      btnPrintContract.attr("href",realLink + "/" + service_id);
      $('#contract-client-payment').val(payment)
    })
}
/********************************************************
*                          Verify Rows                            
*                                                       *
********************************************************/


function verifyContractStatus(){
  $(".td-estado").each(function(i,value){
    var $this = $(this);
    var text = $this.text().trim();
    if(text == "activo"){
      $this.css({color:"green"})
    }else if(text == "saldado"){
      $this.parents("tr").css({background:"rgba(22,255,0,.3)",color:"#555"});
    }
  });
}

function verifyClientStatus(){
   $("td").each(function(i,value){
    var $this = $(this);
    var text = $this.text().trim();
    if(text == "no activo"){
      $this.css({color:"rgba(200,0,0,.7)"})
    }else if(text == "activo"){
      $this.css({color:"green"});
    }
  });
}

/********************************************************
*                       Loaders                            
*                                                       *
********************************************************/

function heavyLoad(stop){
  if(!stop){
    var html = '<div class="heavy-loader active">'
        html +=   '<div class="circle-load"></div>'
        html +=   '<div class="message">Preparando los datos</div>'
        html += '</div>'
    $("body").append(html)
    $("body").css({overflow:"hidden"});
    var message = $(".heavy-loader .message");
    setTimeout(function(){
      message.text("Configurando...");
    },4000)
    setTimeout(function(){
      message.text("Casi Terminamos ...");
    },8000)
    setTimeout(function(){
      message.text("Terminando el proceso ...");
      removeLoader();
    },15000)
  }else{
    removeLoader();
  }

  function removeLoader(){
    var loader = $(".heavy-loader");
    loader.remove();
    $("body").css({overflow:"auto"});
  }
}

function lineLoad(stop) {
  if(!stop){
     $(".loader").css({
      display: "block"
      });
  }else{
    $(".loader").css({display: "none"});
  }
}
// funciones de bootstrap
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

function validatePassword(password){
  var expression = '';
  var has_lowercase = false;
  var has_uppercase = false;
  var has_digit = '/*\d';

  if(password.length > 8) alert("mayor a 8")
  if(/\d/.test(password))alert("tiene digito")
  if(/[a-z]/.test(password))alert("tiene minisculas")
  if(/[A-Z]/.test(password)) alert('tiene mayusculas')
}
$(function(){
  var currentPage = $("title").text().split(" ");
  currentPage   = currentPage[4].toLowerCase().trim();
  if(currentPage == "administrador") {
    newUserForm();
  }
  getDate();
  adminFunctions();
  userInfoTip();
  makeServiceCardClickable();
  detailsFunctions();
  notificationFunctions();
  newContractFunctions();
  checkWindowSize();
  $(window).on('resize',function(){
    checkWindowSize();
  })
  
/**
 * Get Date:
 * Obtiene la fecha actual al segundo y la muestra en la pantalla de inicio
 * @return {void}
 */
function getDate(){
  var $day = $('.day');
  var $monthYear = $('.month-year');
  var $dayWeek = $('.dayweek');
  var $Hora = $('.hour span');
  var date,day,month,year,sHour;
  var days = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
  var months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  setInterval(updateHour,1000);

  function updateHour(){
    date = new Date();
    sDate = date.toString()
    $day.text(date.getDate());
    $monthYear.text("De " + months[date.getMonth()] + " de " + date.getFullYear());
    $dayWeek.text(days[date.getDay()]);
    
    sHour = moment().format('LTS');
     $Hora.html(sHour);
  }
}

/**
 * Admin Functions:
 * se encarga de el movimiento de los paneles en la pantalla 'administrador'
 * @return {void}
 */

function adminFunctions(){
  $('#company-section').animate({left:"0"},200)
  $('.administrador .aside-buttons a').on('click',function(e){
    e.preventDefault();
    var $this = $(this);
    var cardName = $this.attr('href').slice(1);
    if(cardName != null){
      $('.company-details').animate({left:"-110%"},200)
      $('#'+cardName+'.company-details').animate({left:"0"},200)
    }  
  })

  if($("#acount-section").length > 0){
    $('#acount-section').animate({left:"0"},200)
  }
}

/**
 * new User Form:
 * vaida las contraseñas en los formularios de los usuarios
 * @return {void}
 */
function newUserForm(){
  validateModal("#new-user-modal");
  validateModal("#update-user-modal");
}

/**
 * User Info Tip
 * hace un toggle en la visibilidad de la info del usuario
 * @return {void}
 */
function userInfoTip(){
  var infoTip = $(".user-info-tip");
  var profilePicture = $(".profile-picture");
  var btnMore = $(".btn-more");

  btnMore.on('click',function(e){
    infoTip.toggleClass("visible");
  });
}
});

function newContractFunctions(){
  var btnPrintContract = $("#btn-print-contract");
  var document = $(".note-item");
  var radioActivateContract = $("#radio-new-contract");
  var radioDisableContract = $("#radio-just-requirement");
  var contractControls = $(".contract-controls");
  var requirementControls = $(".requirement-controls");

  radioActivateContract.parents("label").on('click',function(){
   activateContractMode(); 

  });

  radioDisableContract.parents("label").on('click',function(){
    disableContractMode()
  });

  function activateContractMode($btn){
    radioDisableContract
      .removeAttr("checked","")
      .html("")
    radioActivateContract
      .attr("checked","")
      .html("&#10004;")
    document.removeClass("print-requirement");
    contractControls.removeClass("hide")
    requirementControls.addClass("hide")
    
  }

  function disableContractMode($btn){
    radioActivateContract
      .removeAttr("checked","")
      .html("")
    radioDisableContract
      .attr("checked","")
      .html("&#10004;")
    document.addClass("print-requirement");
    requirementControls.removeClass("hide")
    contractControls.addClass("hide")
  }
}

/********************************************************
*                          Modals Functions                            
*                                                       *
********************************************************/


$('#search-client-modal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  clientTable.init();
  var title = button.find('.section-title').text();
  if(!title) title = "Buscar Cliente"
  if(title.toLowerCase().trim() == "registrar pago"){
    buttonText = "ir a Pagos"
  }else{
    buttonText = "Nuevo Contrato"
  }
  
  var modal = $(this)
  modal.find('.modal-title').text(title)
  modal.find('.modal-footer .save').text(buttonText)
  modal.find('tbody').html('')
})



/********************************************************
*              other functions                            
*                                                       *
********************************************************/

function detailsFunctions(){
  var smallButtonsSelect = $('.btn-small');

  $('[role="tab"]').on('click',function(){
    var href = $(this).attr("href")
    if(href == "#payments" ||href == "#detalles_de_pago" || href == "#descuento" || href == "#month-and-date" || href == "#reconnect-service") {
      $(".payment-controls").addClass("visible");
    }else{
      $(".payment-controls").removeClass("visible");
    }

    if(href == "#contracts"){
      $(".contract-controls").addClass("visible")
    }else{
      $(".contract-controls")
    }


    getTabControls($(this));
  });

  $('.btn-small').on('click',function(){
    smallButtonsSelect.removeClass('selected');
    $(this).addClass('selected');
  })
}

function getTabControls($this){
  var controls = $this.attr("aria-controls");
  $(".dynamic-controls").text(controls);
}

function notificationFunctions(){
  var btnAverias      = $("#btn-see-averias");
  var btnPagos        = $("#btn-see-pagos");
  var btnCajaChica    = $('#btn-see-caja');
  var btnDeudores     = $("#btn-see-deudores")
  var btnDayIncomes   = $("#btn-see-day-incomes")
  var layoutContainer = $(".layout-container");

  btnAverias.on('click',function(){
    layoutContainer.animate({left:"-100%"},200);
  });

  btnPagos.on('click',function(){
    layoutContainer.animate({left:"0"},200);
  });

  btnDeudores.on('click',function(){
    layoutContainer.animate({left:"-200%"},200);
  });

   btnDayIncomes.on('click',function(){
    layoutContainer.animate({left:"-300%"},200);
  });
}

$("#select-extra-service").on('change',function(){
  var $this = $(("#select-extra-service :selected"));
  var cost = $this.attr("data-payment");
  
  $("#extra-service-cost").val(cost)
});

$("#extra-client-contract").on('change',function(){
  var $this = $(("#extra-client-contract :selected"));
  
  $("#extra-contract-service").val($this.attr("data-service"));
  $("#extra-equipo").val($this.attr("data-equipment"));
  $("#extra-router").val($this.attr("data-router"));
  $("#extra-e-mac").val($this.attr("data-e-mac"));
  $("#extra-r-mac").val($this.attr("data-r-mac"));
  $("#extra-code").val($this.attr("data-code"));
});

$(".columns-right").removeClass("pull-right");

$("#select-contract-code").on('change',function(){
  var $this = $(("#select-contract-code :selected"));
  $("#contract-ip").val($this.attr("data-ip-final"));
  $("#u-contract-ip").val($this.attr("data-ip-final"));
 
});

function checkWindowSize() {
  var width = window.screen.availWidth;
  var brandName = document.querySelector('.brand span');
  
  if(width <= 1100){
    brandName.textContent = "P";
  }else{
    brandName.textContent = "Payment";
  }
}

$(window).scroll(function () {
  position = $(window).scrollTop()
  movableNav = $('.aside-nav-container, .aside-wide-left')

  if(position >= 50){
    movableNav.addClass('moved')
  }else{
    movableNav.removeClass('moved')
  }
})
var Users = {
  add: function () {
    var form, nick, password, name, lastname, dni, type, is_empty;

    nick      = $("#user-nickname").val();
    password  = $("#user-password").val();
    name      = $("#user-name").val();
    lastname  = $("#user-lastname").val();
    dni       = getVal($("#user-dni"));
    type      = $("#user-type").val();

    var is_empty = isEmpty([nick, password, name, lastname, dni, type]);
    if (!is_empty) {
      form = 'nickname=' + nick + "&password=" + password + "&name=" + name + "&lastname=" + lastname;
      form += "&dni=" + dni + "&type=" + type;
      connectAndSend("user/addnew", true, initAdminHandlers, null, form, Users.getAll);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  update: function () {
    var form, nick, password, name, lastname, dni, type;

    nick     = $("#e-nickname").val();
    name     = $("#e-name").val();
    lastname = $("#e-lastname").val();
    dni      = $("#e-dni").val();
    type     = $("#e-type").val();

    var is_empty = isEmpty([nick, name, lastname, dni, type]);
    if (!is_empty) {
      form = 'nickname=' + nick + "&name=" + name + "&lastname=" + lastname;
      form += "&dni=" + dni + "&type=" + type;
      connectAndSend("user/update", true, initAdminHandlers, null, form, Users.getAll);
    } else {
       displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  getAll: function () {
    var form = "table=users";
    connectAndSend('user/getusers', false, initAdminHandlers, userTable.refresh, form, null);
  },

  delete: function (id) {
    var form = "user_id=" + id;
    connectAndSend('user/deleteuser', true, initAdminHandlers, null, form, Users.getAll);
  },

  confirmPassword: function(userId,currentPassword) {
    var form = 'user_id='+ userId +'&current_password=' + currentPassword;
    connectAndSend('user/confirm_password', false, false, processConfirmData, form, null, null);
    
    function processConfirmData(response) {
      var newPassword         = $("#acount-new-password");
      var newPasswordConfirm  = $("#acount-confirm-new-password");
      
      if (response == 1) {      
        newPassword.removeAttr('disabled');
        newPasswordConfirm.removeAttr('disabled');
        validateThis();
      }else{
        newPassword.attr('disabled',true);
        newPasswordConfirm.attr('disabled',true);
      }
    }
  },

  updatePassword: function(userId,currentPassword,newPassword){
    var form = 'user_id='+ userId  + "&current_password="+ currentPassword +'&new_password=' + newPassword;
    connectAndSend('user/update_password', false, false, Users.passwordChanged, form, null,heavyLoad);
  },

  passwordChanged: function(response){
    if(response==1){
      displayMessage(MESSAGE_SUCCESS + 'Contraseña Cambiada con exito')
      setTimeout(function(){
        window.location.href = BASE_URL + 'app/logout'
      },3000)      
    }else{
      displayMessage(MESSAGE_ERROR + ' Error al cambiar de contraseña, revise la contraseña actual')
    }
      
  }
}

var Clients = {
  add: function () {
     var form, nombres, apellidos, cedula, celular, provincia, sector, calle, casa, telefono,
       lugarTrabajo, telTrabajo, ingresos, fechaRegistro, estado;

    nombres       = $("#client-name").val();
    apellidos     = $("#client-lastname").val();
    cedula        = getVal($("#client-dni"));
    celular       = getVal($("#client-phone"));
    provincia     = $("#client-provincia").val();
    sector        = $("#client-sector").val();
    calle         = $("#client-street").val();
    casa          = $('#client-house').val();
    telefono      = getVal($('#client-telephone'));
    lugarTrabajo  = $('#client-job').val();
    telTrabajo    = getVal($('#client-job-telephone'));
    ingresos      = $('#client-salary').val();
    fechaRegistro = moment().format("YYYY-MM-DD");;
    estado        = "no activo";

    var is_empty = isEmpty([nombres, apellidos, cedula, celular, provincia, sector, calle, casa, telefono]);
    if (!is_empty) {
      form = 'nombres=' + nombres + "&apellidos=" + apellidos + "&cedula=" + cedula + "&celular=" + celular;
      form += "&provincia=" + provincia + "&sector=" + sector + "&calle=" + calle + "&casa=" + casa + "&telefono=" + telefono;
      form += "&lugar_trabajo=" + lugarTrabajo + "&tel_trabajo=" + telTrabajo + "&ingresos=" + ingresos + "&fecha_registro=" + fechaRegistro;
      form += "&estado=" + estado + "&tabla=clientes";

      connectAndSend("process/add", true, initClientHandlers, null, form, Clients.getAll);

    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  getAll: function () {
    var form = "tabla=clientes";
    connectAndSend('process/getall', false, initClientHandlers, clientTable.refresh, form, null);
  },

  getOne: function (id, receiver) {
    form = "tabla=clientes&id=" + id;
    connectAndSend("process/getone", false, initClientHandlers, receiver, form, null)
  },

  receiveForEdit: function (content) {
    var client        = JSON.parse(content);
    this.id            = client['id_cliente'];
    var $nombres      = $("#u-client-name");
    var $apellidos    = $("#u-client-lastname");
    var $cedula       = $("#u-client-dni");
    var $celular      = $("#u-client-phone");
    var $provincia    = $("#u-client-provincia");
    var $sector       = $("#u-client-sector");
    var $calle        = $("#u-client-street");
    var $casa         = $('#u-client-house');
    var $telefono     = $('#u-client-telephone');
    var $lugarTrabajo = $('#u-client-job');
    var $telTrabajo   = $('#u-client-job-telephone');
    var $ingresos     = $('#u-client-salary');

    $nombres.val(client['nombres']);
    $apellidos.val(client['apellidos'])
    $cedula.val(client['cedula'])
    $celular.val(client['celular'])
    $provincia.val(client['provincia'])
    $sector.val(client['sector'])
    $calle.val(client['calle'])
    $casa.val(client['casa'])
    $telefono.val(client['telefono'])
    $lugarTrabajo.val(client['lugar_trabajo'])
    $telTrabajo.val(client['tel_trabajo'])
    $ingresos.val(client['salario'])

    $("#update-client-modal").modal();
    $("#btn-update-client").on('click', function () {
      updateClient();
    });

    function updateClient() {
      var is_empty = isEmpty([$nombres.val(), $apellidos.val(), $cedula.val(), $celular.val(), $provincia.val(), $sector.val(), $calle.val(),
        $casa.val(), $telefono.val()
      ]);

      if (!is_empty) {
        form = 'id=' + id + '&nombres=' + $nombres.val() + "&apellidos=" + $apellidos.val() + "&cedula=" + getVal($cedula);
        form += "&celular=" + getVal($celular) + "&provincia=" + $provincia.val() + "&sector=" + $sector.val() + "&calle=" + $calle.val();
        form += "&casa=" + $casa.val() + "&telefono=" + getVal($telefono) + "&lugar_trabajo=" + $lugarTrabajo.val() + "&tel_trabajo =";
        form += getVal($telTrabajo) + "&tabla=clientes";
        form += "&ingresos=" + $ingresos.val();

        connectAndSend("process/update", true, initClientHandlers, null, form, Clients.getAll);

      } else {
        displayAlert("Revise", "LLene todos los campos por favor", "error");
      }
    }
  },

  saveObservations: function () {
    var form, observations,idCliente;
 
    observations = $("#text-observations").val();
    idCliente    = $("#detail-client-id").val();
 
    form = 'observaciones=' + observations + "&tabla=observaciones&id_cliente=" + idCliente;
    connectAndSend("process/update", true, null, null, form, null)
  },
  
  updateState: function (client) {
    form = 'data='+ JSON.stringify(client)+ '&module=clientes&action=update';
      connectAndSend('process/getjson',true,null,null,form, null);
  }
}

var Generals = {
  deleteRow: function (id, tabla) {
    var form = "tabla=" + tabla + "&id=" + id;
    var handlers, callback;
    switch (tabla) {
      case 'clientes':
        callback = Clients.getAll;
        break;
      case 'servicios':
        callback = Services.getAll;
        break;
    }
    connectAndSend('process/delete', true,null, null, form, callback);
  },
  /**
   * Search manda un mensaje al servidor de los valores a buscar
   * @param {string} text el valor a ser buscado
   * @param {string} dbTable nombre de la tabla donde se desea consultar en la base de datos
   * @param {function} fillTableFunction funcion de llenado de tabla donde se mostraran los resultados 
   * @param {function} handlerFunction funcion reinicio de los elementos en los handlers 
   */
  
  search: function (text, dbTable, fillTableFunction, handlerFunction) {
    if (handlerFunction == undefined) handlerFunction = initClientHandlers;
    if (fillTableFunction == undefined) fillTableFunction = fillCurrentTable;
    var word = text;
    if (word != null || word != "") {
      var form = "tabla=" + dbTable + "&word=" + word;
      connectAndSend('process/search', false, handlerFunction, fillTableFunction, form, null);
    }
  },

  count_table: function (table) {
    var form = "tabla=" + table;
    var updateFunction = updateCount;
    if (table == 'caja') updateFunction = updateCajaCount
    connectAndSend('process/count', false, null, updateFunction, form, null);
  }
}

var Services = {
  add: function () {
    var form, name, description, payment, type;

    name        = $("#service-name").val();
    description = $("#service-description").val();
    payment     = $("#service-monthly-payment").val();
    type        = $("#service-type").val();

    var is_empty = isEmpty([name, description, payment, type]);
    if (!is_empty) {
      form = 'nombre=' + name + "&descripcion=" + description + "&mensualidad=" + payment + "&tipo=" + type;
      form += "&tabla=servicios";
      connectAndSend("process/add", true, null, null, form, Services.getAll);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  getAll: function () {
    var form = "tabla=servicios";
    connectAndSend('process/getall', false, null, serviceTable.refresh, form, null);
  },

  update: function () {
    var form, id, name, description, payment, type;

    id          = $('#u-service-id').val();
    name        = $('#u-service-name').val();
    description = $('#u-service-description').val();
    payment     = $('#u-service-monthly-payment').val();
    type        = $('#u-service-type').val();

    var is_empty = isEmpty([id, name, description, payment, type]);
    if (!is_empty) {
      form = 'id_servicio=' + id + "&nombre=" + name + "&descripcion=" + description + "&mensualidad=" + payment;
      form += "&tipo=" + type + "&tabla=servicios";
      connectAndSend("process/update", true, null, null, form, Services.getAll,heavyLoad);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  }
}

var Contracts = {
  add: function addNewContract() {
    var form, table, client_id, user_id, service_id, code, contract_date, payment, duration,
      equipment, eMac, router, rMac, total, nextPayment, model, ip;

    client_id     = $("#contract-client-id").val();
    user_id       = $("#contract-user-id").val();
    service_id    = $(".service-card.selected").attr('data-id');
    contract_date = $('#contract-client-date').val();
    duration      = $('#contract-client-months').val();
    equipment     = $('#contract-equipment').val();
    eMac          = $('#contract-e-mac').val();
    router        = $('#contract-router').val();
    rMac          = $('#contract-r-mac').val();
    model         = $('#contract-equipment-model').val();
    ip            = $('#contract-ip').val();
    code          = $("#select-contract-code").val();

    payment = $("#contract-client-payment").val();
    nextPayment = moment(contract_date).add(1, 'months').format('YYYY-MM-DD');

    var is_empty = isEmpty([client_id, user_id, service_id, contract_date, duration]);
    if (!is_empty) {
      total = (Number(duration) + 1) * Number(payment);
      form = 'id_empleado=' + user_id + "&id_cliente=" + client_id + "&id_servicio=" + service_id + "&codigo=" + code + "&fecha=" + contract_date;
      form += "&duracion=" + duration + "&monto_total=" + total + "&monto_pagado=0&ultimo_pago=null";
      form += "&mensualidad=" + payment + "&proximo_pago=" + nextPayment + "&estado=activo&tabla=contratos";
      form += "&nombre_equipo=" + equipment + "&mac_equipo=" + eMac + "&router=" + router + "&mac_router=" + rMac;
      form += "&modelo=" + model + "&ip=" + ip;
      connectAndSend("process/add", null, null, Contracts.getLast, form, null);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  extend: function(idContrato) {
    var form;
    form = 'id_contrato=' + idContrator;
    connectAndSend("process/extend", true, null, null, form, null);
  },

  getAll: function() {
    var form = "tabla=contratos";
    connectAndSend('process/getall', false, null, contractTable.refresh, form, null);
  },

  getLast: function(data) {
    data = JSON.parse(data);
    console.log(data);
    console.log(data.mensaje);
    displayMessage(data.mensaje)
    $("#btn-save-contract").attr("disabled", "");
    $("#btn-print-contract").removeAttr("disabled");
    if(data.tabla_pagos){
      makePaymentList(data.tabla_pagos);
    }
  },

  callExtra: function() {
    var row = contractTable.getSelectedRow();
    if (row) {
      $("#extra-client-dni").val(row.cedula);
      Contracts.getAllOfClient(row.cedula);
      $('#add-extra-modal').modal();
    } else {
       displayAlert("Revise", "Seleccione el conrato primero", "error");
    }
  },

  cancel: function() {
    var row        = contractTable.getSelectedRow()
    var is_penalty = false;
    var reason     = $("#cancelation-reason").val();
    var checked    = $("#check-penalty:checked").length;
    var form, fecha;
    if(row.id){
      if (checked > 0) {
        is_penalty = true;
      }
      fecha = moment().format("YYYY-MM-DD");
      form = 'id_contrato=' + row.id + '&fecha=' + fecha + '&id_cliente=' + row.id_cliente;
      form += "&motivo=" + reason + "&penalidad=" + is_penalty;
      connectAndSend('process/cancel', true, null, null, form, Contracts.getAll);
    }else{
      displayMessage(MESSAGE_ERROR +" No hay contrato seleccionado");
    }
  },

  getOne: function(id_contrato, receiver) {
    form = "tabla=contratos&id_contrato=" + id_contrato;
    connectAndSend("process/getone", false, null, receiver, form, null)
  },

  recieve: function(content) {
    var contract    = JSON.parse(content);
    this.id_contrato = contract['id_contrato'];
    var $equipo     = $("#u-contract-equipment");
    var $macEquipo  = $("#u-contract-e-mac");
    var $router     = $("#u-contract-router");
    var $macRouter  = $("#u-contract-r-mac");
    var $modelo     = $("#u-contract-modelo");
    var $codigo     = $("#select-contract-code");
    var $isChangeIp = $("#check-change-ip");
    var $ip         = $("#u-contract-ip");

    $equipo.val(contract['nombre_equipo']);
    $macEquipo.val(contract['mac_equipo']);
    $router.val(contract['router']);
    $macRouter.val(contract['mac_router']);
    $modelo.val(contract['modelo']);
    $ip.val(contract['ip']);

    // $("#update-contract-modal select").val('')
    $("#update-contract-modal").modal();
    $("#update-contract").on('click', function (e) {
      e.stopImmediatePropagation();
      updateContract(id_contrato);
    });

    function updateContract(id_contrato) {
      var checked = $("#check-change-ip:checked").length;
      form = 'id_contrato=' + id_contrato + '&nombre_equipo=' + $equipo.val() + "&mac_equipo=" + $macEquipo.val();
      form += "&router=" + $router.val() + "&mac_router=" + $macRouter.val();
      form += "&modelo=" + $modelo.val();
      form += "&tabla=contratos";
      if (checked > 0) {
        form += "&ip=" + $ip.val() + "&codigo=" + $codigo.val();
      }
      connectAndSend("process/update", true, null, null, form, Contracts.getAll);
    }
  },

  getIpList: function () {
    var section_id = $("#select-contract-sector").val();
    var form = "id_seccion=" + section_id + "&tabla=ip_list";
    connectAndSend("process/getall", false, null, makeIpList, form, null);

    function makeIpList(content) {
      $("#select-contract-code").html(content);
    }
  },

  btnExtraPressed: function ($this) {
    var buttonId = $this.text().trim().toLowerCase();

    switch (buttonId) {
      case "mejorar":
        Contracts.upgrade();
        break;
      case "extender":
        Contracts.extend();
        break;
      case "guardar":
        Contracts.addExtra();
        break;
    }
  },

  upgrade: function () {
    var form, contractId, selectedService, serviceId, amount;

    contractId = $("#extra-client-contract").val();
    selectedService = $(".service-card.selected");
    serviceId = selectedService.attr("data-id");
    amount = selectedService.attr("data-payment");

    var is_empty = isEmpty([contractId, serviceId, amount]);
    if (!is_empty) {
      form = 'id_contrato=' + contractId + "&id_servicio=" + serviceId + "&cuota=" + amount;
      connectAndSend('process/upgrade', true, initGlobalHandlers, null, form, Contracts.getAll)
    } else {
      displayAlert("Revise", "asegurate de llenar todos los datos y seleccionar el servicio", "info");
    }
  },

  reconnect: function () {
    var form, contractId, selectedService, serviceId, duration, date,send, is_empty,info;

    contractId = $("#select-contract").val();
    selectedService = $(".service-card.selected");
    serviceId = selectedService.attr("data-id");
    duration  = $("#reconnection-months").val();
    date = $("#reconnection-date").val()

    is_empty = isEmpty([contractId,serviceId,date,duration]);
    console.log("service id" + serviceId + " duration " + duration + " date" + date + " contract "+ contractId )
    if(!is_empty){
      info = {
        'id_contrato': contractId,
        'fecha': date,
        'id_servicio': serviceId,
        'duracion': duration
      }
      form = "data=" + JSON.stringify(info);
      send = axios.post(BASE_URL + "contract/reconnect",form);
      send.then(function(res){
        displayMessage(res.data.mensaje);
        Payments.getAll();
        $("#btn-reconnect").removeAttr("disabled");
        $(".reconnect-caller").removeClass('visible');
        
      })
      send.catch(function(err){
        console.log(err);
      })
    }else{
      swal("Llene todos los campos")
    }
  },

  addExtra: function () {
    var form, contractId, extraService, serviceCost, equipment, eMac, router, rMac,paymentMode;

    contractId = $("#extra-client-contract").val();
    serviceCost = $("#extra-service-cost").val();
    extraService = $("#select-extra-service").val();
    equipment = $("#extra-equipo").val();
    eMac = $("#extra-e-mac").val();
    router = $("#extra-router").val();
    rMac = $("#extra-r-mac").val();
    paymentMode = $("#select-payment-mode").val();

    var is_empty = isEmpty([contractId, extraService, serviceCost,paymentMode]);
    if (!is_empty) {
      form = 'id_contrato=' + contractId + "&costo_servicio=" + serviceCost + "&nombre_servicio=" + extraService;
      form += '&nombre_equipo=' + equipment + "&mac_equipo=" + eMac + "&router=" + router + "&mac_router=" + rMac;
      form += '&modo_pago=' + paymentMode;
      connectAndSend('process/addextra', true, initGlobalHandlers, null, form, Contracts.getAll);
    } else {
      displayAlert("revise", "asegurate de llenar todos los datos y seleccionar el servicio", "info");
    }
  },

  extend: function () {
    var form, contractId, duration;
    contractId = $("#extra-client-contract").val();
    duration = $("#extra-extension-months").val();

    var is_empty = isEmpty([duration, contractId]);
    if (!is_empty) {
      form = 'id_contrato=' + contractId + "&duracion=" + duration;
      connectAndSend('process/extend_contract', true, initGlobalHandlers, null, form, Contracts.getAll)
    } else {
      displayAlert("revise", "asegurate de llenar todos los datos y seleccionar el servicio", "info");
    }
  },

  getAllOfClient: function(dni) {
    var form = "dni=" + dni;
    connectAndSend("process/data_for_extra", false, null, makeContractList, form, null);
  },

  // Note: lo siento, de aqui en adelante uso axios, es mucho mas comodo
  suspend: function (id_contrato) {
    form = "data=" + JSON.stringify({id_contrato:id_contrato})
    var send = axios.post(BASE_URL + 'contract/suspend',form);
    send.then(function(res){
      var data = res.data
      displayMessage(data.mensaje);
      Contracts.getAll();
    })
    send.catch(function(error){
      console.log(error);
    })
  }
}

var Payments = {
  getAll: function () {
    var id = $("#select-contract").val();
    if (id != null) {
      var form = "tabla=pagos&id=" + id;
      connectAndSend('process/getall', false, null, paymentTable.refresh, form, Payments.contractRefresh);
    }
  },

  update: function (id) {
      var date = moment().format("YYYY-MM-DD");
      var id_contrato = $("#select-contract").val();
      var form = "tabla=pagos&id=" + id + "&estado=pagado&fecha_pago=" + date + "&id_contrato=" + id_contrato;
      connectAndSend('process/update', true, null, null, form, Payments.getAll);
  },

  saveAbonos: function () {
    var form, observations, abono$inputAbono,$textAbono,contractId;

    $textAbono   = $('#text-abono-detail');
    observations = $textAbono.val();
    contractId   = $("#select-contract").val();
    $inputAbono  = $("#input-abono");
    abono        = $inputAbono.val();

    form = 'observaciones=' + observations + "&abonos=" + abono;
    form += "&contrato_abono="+contractId+"&tabla=abonos";
    connectAndSend("process/update", true, null, null, form, Payments.getAll)
    $inputAbono.val('')
  },

  saveExtra: function () {
    var send = axios.post(BASE_URL + 'process/')
  },

  updateUntil: function(contractId,lastPaymentId){
    var id_contrato = $("#select-contract").val();
    var form = "tabla=pagos_al_dia&id_ultimo_pago=" + lastPaymentId + "&estado=pagado&id_contrato=" + contractId;
    var handlers, callback;
    connectAndSend('process/update', true, null, null, form, null, heavyLoad);
  },
    
  removePayment: function (id) {
    var form = "tabla=deshacer_pago&id_pago=" + id;
    connectAndSend('process/update', true, null, null, form, Payments.getAll);
  },

  contractRefresh: function(){
    var id_cliente = $('#detail-client-id').val()
    var form = "tabla=contratos_cliente&id=" + id_cliente;
    connectAndSend('process/getall', false, null, detailsContractTable.refresh, form, null);
  },

  getOne: function(id_pago, receiver) {
    form = "tabla=pagos&id_pago=" + id_pago;
    connectAndSend("process/getone", false, null, receiver, form, null)
  },

  receiveForEdit: function(content){
    var pago          = JSON.parse(content);
    this.id_contrato  = pago['id_contrato'];
    this.id_pago     = pago['id_pago']
    var $concepto     = $("#payment-concept");
    var $fechaLimite  = $("#payment-limit-date");
    var $cuota        = $("#payment-cuota");
    var $mora         = $("#payment-mora");
    var $extra        = $("#payment-extra");
    var $total        = $("#payment-total");
    var $descuento    = $("#payment-discount-amount");
    var $razon        = $("#payment-discount-reason");
    var $modal        = $("#advanced-payment");

    $concepto.val(pago['concepto']);
    $fechaLimite.val(pago['fecha_limite']);
    $cuota.val(pago['cuota']);
    $mora.val(pago['mora']);
    $extra.val(pago['monto_extra']);
    $total.val(pago['total']);
    interactiveSum();

    $modal.modal();
    $modal.on('hide.bs.modal',function(){
      $modal.find('input').val('')
    });
    $("#btn-apply-discount").on('click', function (e) {
      e.stopImmediatePropagation();
      swal({
          title: 'Está Seguro?',
          text: "Seguro de que quiere aplicar este descuento de " + $descuento.val() + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function(){
          applyDiscount(id_pago);
          $modal.hide();
          $modal.modal('hide');
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
 
        });
    });

    function applyDiscount(id_pago) {
      var date = moment().format("YYYY-MM-DD");
      form = 'id_pago=' + id_pago + '&id_contrato=' + id_contrato + "&cuota=" + $cuota.val();
      form += "&mora=" + $mora.val() + "&monto_extra=" + $extra.val();
      form += "&total=" + $total.val() + '&descuento=' + $descuento.val() + '&razon_descuento=' +$razon.val() + '&fecha_pago=' + date ;
      form += "&tabla=discount_pagos";
      connectAndSend("process/update", true, null, null, form, Payments.getAll);
      $modal.hide();
    }

    function interactiveSum(){
      $('.payment-sumandos').on('keyup',function(){
        $cuota.val(pago['cuota'] - $descuento.val());
        var suma = Number($cuota.val()) + Number($mora.val()) + Number($extra.val());
        $total.val(Number(suma))
      })
    }
  },

  edit: function(content){
    var pago          = JSON.parse(content);
    this.id_contrato  = pago['id_contrato'];
    this.id_pago      = pago['id_pago']
    var $modal        = $('#edit-payment-modal') 
    console.log(pago)

    $modal.modal();

    $modal.on('hide.bs.modal',function(){
      $modal.find('input').val('')
    });

    $("#btn-save-edited-payment").on('click', function (e) {
      e.stopImmediatePropagation();
      swal({
          title: 'Está Seguro?',
          text: "Seguro de que quiere aplicar este descuento de " + $descuento.val() + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function(){
          applyDiscount(id_pago);
          $modal.hide();
          $modal.modal('hide');
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
 
        });
    });

    // function applyDiscount(id_pago) {
    //   var date = moment().format("YYYY-MM-DD");
    //   form = 'id_pago=' + id_pago + '&id_contrato=' + id_contrato + "&cuota=" + $cuota.val();
    //   form += "&mora=" + $mora.val() + "&monto_extra=" + $extra.val();
    //   form += "&total=" + $total.val() + '&descuento=' + $descuento.val() + '&razon_descuento=' +$razon.val() + '&fecha_pago=' + date ;
    //   form += "&tabla=discount_pagos";
    //   connectAndSend("process/update", true, null, null, form, Payments.getAll);
    //   $modal.hide();
    // }

    // function interactiveSum(){
    //   $('.payment-sumandos').on('keyup',function(){
    //     $cuota.val(pago['cuota'] - $descuento.val());
    //     var suma = Number($cuota.val()) + Number($mora.val()) + Number($extra.val());
    //     $total.val(Number(suma))
    //   })
    // }
  }
  
}

var Damages = {
  add: function () {
    var form, idCliente, description;
    idCliente = $("#averias-client-id").val();
    description = $("#a-description").val();

    var is_empty = isEmpty([idCliente, description]);
    if (!is_empty) {
      form = 'id_cliente=' + idCliente + "&descripcion=" + description + "&tabla=averias";
      connectAndSend("process/add", true, initGlobalHandlers, null, form, Damages.getAll);
    } else {
       displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
    $('#new-averia-modal').find('input,textarea').val("");
  },

  getAll: function () {
    var status = $("#averias-view-mode").val();
    $(".presentado").text(status);
    var form = "tabla=averias&estado=" + status;
    connectAndSend('process/getall', false, initGlobalHandlers, fillAveriasList, form, null);
  },

  update: function ($id_averia) {
    var form = "tabla=averias&id_averia=" + $id_averia;
    connectAndSend('process/update', true, initGlobalHandlers, null, form, Damages.getAll);
  }
}

var Installations = {
  getAll: function () {
    var status = $("#installations-view-mode").val();
    var form = "tabla=instalaciones&estado=" + status;
    connectAndSend('process/getall', false, initGlobalHandlers, fillInstallationsList, form, null);
  },

  update: function ($id_pago) {
    var form = "tabla=instalaciones&id_pago=" + $id_pago;
    connectAndSend('process/update', true, initGlobalHandlers, null, form, Installations.getAll);
  }
}

var Caja = {
  add: function () {
    var form, amount, description, is_empty;

    amount = $("#caja-a-amount").val();
    description = $("#caja-a-description").val();
    form = "entrada=" + amount + "&descripcion=" + description + "&tabla=caja";
    is_empty = isEmpty([amount, description]);
    if (!is_empty) {
      connectAndSend('process/add', true, null, null, form, Caja.getAll);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  retire: function () {
    var form, amount, description, is_empty;

    amount = $("#caja-r-amount").val();
    description = $("#caja-r-description").val();
    form = "salida=" + amount + "&descripcion=" + description;
    is_empty = isEmpty([amount, description]);
    if (!is_empty) {
       connectAndSend('process/retire', true, null, null, form, Caja.getAll);
    } else {
      displayAlert("Revise", "LLene todos los campos por favor", "error");
    }
  },

  getAll: function () {
    var form = "tabla=caja";
    connectAndSend('process/getAll', false, null, cajaTable.refresh, form, Caja.getSaldo);
  },

  getSaldo: function () {
    var form = "tabla=caja";
    connectAndSend('process/getone', false, null, updateSaldo, form, null)
  },

  search: function () {
    var $dateSearch = $("#caja-date");
    var $userSearch = $("#caja-user");
    var date = ($dateSearch.val()) ? $dateSearch.val() : '%';
    var userId = ($userSearch.val()) ? $userSearch.val() : '%';

    var form = "tabla=caja&id_empleado=" + userId + "&fecha=" + date;
    connectAndSend('process/search', false, null, cajaTable.refresh, form, null);
  }
}

var Company = {
  update: function () {
    var form,
    companyName = $("#company-name").val(),
    companyStatement = $("#company-statement").val(),
    companyPhone1 = getVal($("#company-phone1")),
    companyDirection = $("#company-direction").val(),
    companyDescription = $("#company-description").val(),
    companyPhone2 = getVal($("#company-phone2"))

    form = 'nombre=' + companyName + '&lema=' + companyStatement + '&descripcion=' + companyDescription + "&direccion="
    form += companyDirection + "&telefono1=" + companyPhone1 + "&telefonos=" + companyPhone2 + "&tabla=empresa";
    connectAndSend('process/update', true, null, null, form, null);
  }
}

var Settings = {
  update: function () {
    var form,
    settingsCargoMora = $("#settings-mora").val(),
    settingsFechaCorte = $("#settings-fecha-corte").val(),
    settingsAperturaCaja = $("#settings-apertura-caja").val(),
    settingsPenalizacionCancelacion = $("#settings-penalizacion-cancelacion").val(),
    settingsMesesPorDefecto = $("#settings-meses-por-defecto").val(),
    settingsSplitDay = $("#settings-split-day").val();

    form = 'cargo_mora=' + settingsCargoMora + '&fecha_corte=' + settingsFechaCorte + '&apertura_caja=' + settingsAperturaCaja;
    form += '&penalizacion_cancelacion=' + settingsPenalizacionCancelacion + '&meses_por_defecto=' + settingsMesesPorDefecto;
    form += '&split_day=' + settingsSplitDay + '&tabla=settings';
    connectAndSend('process/update', true, null, null, form, null);
  }
}

var Sections = { 
  add: function() {
    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      animation: false,
      progressSteps: ['1', '2', '3']
    })

    var steps = [{
        title: 'Nombre del sector'
      },
      'Codigo del Sector',
    ]

    swal.queue(steps).then(function (result) {
      swal.resetDefaults()
      save(result)
    });

    function save(result){
      var form;
      var nombre = result[0];
      var codigoArea = result[1],

      form = "nombre="+nombre+"&codigo_area="+codigoArea;
      form += "&tabla=secciones"
     
      return new Promise(function(resolve){
         if(connectAndSend('process/add', true, false, null, form,Sections.getAll,heavyLoad)){
           return resolve();
         }
      })
    }
  },

  getIps: function() {
    var id = $("#select-sector").val();
    if (id != null) {
      var form = "tabla=ips&id=" + id;
      connectAndSend('process/getall', false, null, Sections.reorderTable, form,null);
    }
  },

  reorderTable: function(content){
    var table = $("#t-sections");
    table.bootstrapTable('destroy');
    $("#t-sections tbody").html(content);
    table.bootstrapTable();
    table.find('tbody').css({display:"table-row-group"});
  },

  getAll: function() {
      var form = "tabla=secciones";
      connectAndSend('process/getall', false, null, fillSelect, form,heavyLoad);

    function fillSelect(content){
      $("#select-sector").html(content);
    }
  },

  init: function(){
    var $table = $("#t-sections");
    var $btnPrint = $("#btn-print-sections");
    var $selectState = $("#filter-sections");
    

    $selectState.on('change',function(){
      var filter = $(this).val()
      if(filter.includes("]"))
        filter = ['ocupado','disponible']
      console.log(filter)

      $table.bootstrapTable('filterBy',{
        estado:  filter
      })
    })

    $btnPrint.on('click', function(){
      print();
    })

  }
}

var Extras = {
  remove: function (id) {
    var id_cliente, send;
    
    id_cliente = $('#detail-client-id').val()
    form = "data=" + JSON.stringify({id: id,id_cliente: id_cliente});
    send = axios.post(BASE_URL + 'extra/delete_extra', form);
    send.then(function(res){
      var data = res.data;
      displayMessage(data.mensaje);
      extraTable.refresh(data.extras);
    });
    
    send.catch(function(error){
      console.log(error);
    });

  }
}
  var currentPage = $("title").text().split(" ");
  currentPage = currentPage[4].toLowerCase().trim();
  var ran = false;
  
  function initComponents(){
    switch (currentPage) {
      case "home":
        initClientHandlers();
        break;
      case "administrador":
        initAdminHandlers();
        break;
      case "clientes":
        initClientHandlers();
        break;
      case "servicios":
        initServicesHandlers();
        break;
      case "nuevo_contrato":
        initContractHandlers();
        Contracts.getIpList();
        break;
      case "detalles":
        initPaymentsHandlers();
        detailHandlers();
        break;
      case "contratos":
        initContractHandlers();
        initClientHandlers();
        break;
      case "cuenta":
        acountHandlers();
        break;
      case "secciones":
        sectionHandlers();
        break;
    }

    initCajaHandlers();
    initGlobalHandlers();
  }

  // **************************************************     globals handlers       *****************************
  function initGlobalHandlers() {
    var averiaClientDni = $("#a-client-dni");
    if (currentPage == 'notificaciones') {
        Generals.count_table("averias");

      $("#averias-view-mode").on('change', function (e) {
        e.stopImmediatePropagation();
        Damages.getAll();
      });

       $("#installations-view-mode").on('change', function (e) {
        e.stopImmediatePropagation();
        Installations.getAll();
      });

      $('tbody').css({display:"table-row-group"});
    }

    if (currentPage == 'contratos') {
     initContractHandlers();
    }

    $("#btn-save-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      Damages.add();
    });

    averiaClientDni.on('keyup', function (e) {
      if (isComplete(averiaClientDni)) {
        var dni = getVal(averiaClientDni);
        Clients.getOne(dni,fillClientFields)
      }else{
        $('#a-client').val('');
      }
    });

    $(".btn-update-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      var id_averia = $(this).parents('.averia-item').find('.code')
      id_averia = id_averia.text().trim();
      Damages.update(id_averia);
    });
    
    $(".btn-update-installation").on('click', function (e) {
      e.stopImmediatePropagation();
      var id_pago = $(this).parents('.averia-item').find('.code');
      id_pago = id_pago.text().trim();
      Installations.update(id_pago);
    });

    $("#extra-controls").on('click',function(e){
      e.stopImmediatePropagation();
      Contracts.btnExtraPressed($(this));
    });

    $("#extra-client-dni").on('keydown',function(e){
      var key = e.which;
      var dni = $(this).val()
      if(key == 13){
        Contracts.getAllOfClient(dni);
      }
    });

  }

  //***************************************************     admin handlers          ***************************** */
  function initAdminHandlers() {
    userTable.init();
    $("#btn-save-user").on('click', function (e) {
      e.stopImmediatePropagation();
      Users.add();
    });

    $("#btn-update-user").on('click', function (e) {
      e.stopImmediatePropagation();
      Users.update();
    });

    $(".delete-user").on('click', function (e) {
      e.preventDefault();
      var $row = $(this).parents("tr");
      var id = $row.find('.user-id').text().trim();
      var row = userTable.getRow(id);
      swal({
          title: 'Está Seguro?',
          text: "Desea Eliminar al Usuario " + row.nombres +" "+ row.apellidos + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function(){
           Users.delete(id);
        });
    });

    $(".edit-user").on('click', function (e) {
      e.preventDefault();
      var id  = $(this).attr('data-user-id');
      var row = userTable.getRow(id);
      

      $("#e-nickname").val(row.nick);
      $("#e-name").val(row.nombres);
      $("#e-lastname").val(row.apellidos);
      $("#e-dni").val(row.cedula);
      $("#e-type").val(row.tipo_codigo);
      $('#update-user-modal').modal();
    });

    $("#update-company-data").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      Company.update();
    });

    $("#btn-update-settings").on('click',function(e){
        e.preventDefault();
        Settings.update();
    });

    // some globals handlers

    $("#btn-save-averia").on('click', function (e) {
      e.stopImmediatePropagation();
      Damages.add()
    });

  }
  //***************************************************     Init caja          ***************************** */
  
  function initCajaHandlers() {
    if (currentPage == 'administrador') {
      cajaTable.init();
    }



    var btnAddMoney     = $("#btn-add-money");
    var btnRetireMoney  = $("#btn-retire-money");
    var userSearch      = $("#caja-user");
    var dateSearch      = $("#caja-date");

    btnAddMoney.on('click', function (e) {
      e.stopImmediatePropagation();
      Caja.add();
    });

    btnRetireMoney.on('click', function (e) {
      e.stopImmediatePropagation();
      Caja.retire();
    });

    dateSearch.on('change',function(e){
      e.stopImmediatePropagation();
      Caja.search();
    });

    userSearch.on('change',function(e){
      e.stopImmediatePropagation();
      Caja.search();
    });
  }

  //***************************************************  Init client Handlers      ***************************** */
  function initClientHandlers() {
    if (currentPage == 'clientes') {
      clientTable.init();
    }

    $("#btn-save-client").on('click', function (e) {
      e.stopImmediatePropagation();
      Clients.add();
    });

    $("#update-client").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var id = clientTable.getId();
      if (id) {
        Clients.getOne(id, Clients.receiveForEdit);
      }
    });

    $("#client-searcher").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      Generals.search(text, "clientes", clientTable.refresh);
    });

    $("#client-searcher-newcontract").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      if (!isEmpty([text])) {
        Generals.search(text, "clientes", clientTable.refresh);
      } else {
        clearTbody(".lobby-results");
      }
    });

    $("#delete-client").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var row = clientTable.getSelectedRow();
      if (row) {
        swal({
          title: 'Está Seguro?',
          text: "Desea Eliminar al(la) Cliente " + row.nombres + " " + row.apellidos + "?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function(){
           Generals.deleteRow(row.id, "clientes")
        });
      }
    });

  }
  //***************************************************  Init Services Handlers    ***************************** */
  function initServicesHandlers() {
    serviceTable.init();

    $("#btn-save-service").on('click', function (e) {
      e.stopImmediatePropagation();
      Services.add();
    });

    $("#delete-service").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var id = serviceTable.getId();
      if (id) {
        swal({
          title: 'Está Seguro?',
          text: "Desea Eliminar  el Servicio?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function(){
           Generals.deleteRow(id, "servicios");
        });
      }
    });

    $("#edit-service").on('click', function (e) {
      e.preventDefault();
      var row = serviceTable.getSelectedRow();

      $('#u-service-id').val(row.id);
      $('#u-service-name').val(row.nombre);
      $('#u-service-description').val(row.descripcion);
      $('#u-service-monthly-payment').val(Number(row.mensualidad.replace("RD$ ",'')));
      $('#u-service-type').val(row.tipo);
      $('#update-service-modal').modal();

    });

    $("#btn-update-service").on('click', function (e) {
      e.stopImmediatePropagation();
      Services.update();
    });

    $("#service-searcher").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      Generals.search(text, "servicios", serviceTable.refresh,initServicesHandlers);
    });


  }
  //***************************************************  Init Contract Handlers    ***************************** */
  function initContractHandlers() {
    contractTable.init();
    Contracts.getAll();
    
    $("#btn-save-contract").on('click', function (e) {
      e.stopImmediatePropagation();
      Contracts.add();
    });

    $("#btn-add-extra").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      Contracts.callExtra();
    });
    var cont = 0;

    $("#contract-searcher").on('keyup', function (e) {
      e.stopImmediatePropagation();
      var text = $(this).val();
      Generals.search(text, "v_contratos", contractTable.refresh,null);
    });

    $("#btn-cancel-contract").on('click', function (e) {
      e.preventDefault();
      var row = contractTable.getSelectedRow();
      if (row) {
        $(".cancel-name").text(row.cliente);
        var $inputElement   = $(".confirmed-data");
        var $buttonToActive = $("#cancel-permanently");

        deleteValidation($inputElement,row.cliente, $buttonToActive);
        $("#cancel-print").attr("href",BASE_URL + 'process/getcancelcontract/'+ row.id_cliente + "/" + row.id);

        $("#cancel-contract-modal").modal();
        $buttonToActive.on('click', function (e) {
          e.stopImmediatePropagation();
          Contracts.cancel()
          $buttonToActive.attr('disable');
        })

        $inputElement.val('');
        $buttonToActive.attr('disabled', '');
      }else{
        swal("Debes seleccionar un contrato")
      }
    });

    $("#btn-suspend-contract").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
       var row = contractTable.getSelectedRow();
       if (row) {
        swal({
          title: 'Está Seguro?',
          text: "Desea Suspender el contrato de " + row.cliente +" ?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Estoy Seguro!',
          cancelButtonText: 'Cancelar'
        }).then(function(){
           Contracts.suspend(row.id);
        });
       }else{
         swal("Debe seleccionar un contrato")
       }

    });

    $("#btn-update-contract").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var id = contractTable.getId();
      if (id) {
        Contracts.getOne(id, Contracts.recieve);
      }
    });

    $("#select-contract-sector").on('change',function(e){
      e.stopImmediatePropagation();
      Contracts.getIpList();
    })

    $('#select-pay-until').on('change', function(e){
      e.stopImmediatePropagation();
      var $this         = $('#select-pay-until :selected');
      var contractId    = $this.attr('data-contract');
      var lastPaymentId = $(this).val();
      Payments.updateUntil(contractId,lastPaymentId);
    });

  }
  //***************************************************  Init Payments  Handlers   ***************************** */
  
  function initPaymentsHandlers() {
    paymentTable.init();
    extraTable.init();
    if (!ran) {
      Payments.getAll();
      ran = true;
    }

    $("#btn-pay").on('click', function (e) {
      e.stopImmediatePropagation();
      var id = paymentTable.getId();
      if(id) {
        Payments.update(id);
        update_mode(id);
      }else{
        // TODO: MESSAGE Select a payment
      }
    }); 

    $("#select-contract").on('change', function (e) {
      e.stopImmediatePropagation();
      Payments.getAll();
    });

    $("#btn-reconnect").on('click',function(e) {
      e.stopImmediatePropagation()
      Contracts.reconnect()
    })

    $("#payment-detail-box").collapse()

    function update_mode(id){
      var mode = $('.payment-mode.selected').text();
      var extraInfo = {id: id.toString(),module:'pagos'}
      var form = 'data='+JSON.stringify({tipo: mode})+'&extra_info='+JSON.stringify(extraInfo);

      var send = axios.post( BASE_URL + 'process/axiosupdate',form)
      send.then(function(response){
        //TODO: something whith that / algo con esto
      });
      send.catch(function(){
        console.log(error);
      });
    }
  }
  //***************************************************      detail Handlers       ***************************** */
  function detailHandlers() {
    $("#btn-save-observations").on('click', function (e) {
      e.stopImmediatePropagation();
      Payments.saveAbonos();
    });

    $('#btn-save-real-observations').on('click',function(e){
      e.stopImmediatePropagation();
      Clients.saveObservations();
    })

    detailsContractTable.init();

  }

  function acountHandlers(){
    var $userId          = $("#acount-user-id")
    var $currentPassword = $("#acount-current-password")
    var $btnUpdateUser    = $("#update-user-data");
    var $newPassword      = $("#acount-new-password");

    $("#acount-current-password").on('keyup',function(e){
      e.stopImmediatePropagation();    
      Users.confirmPassword($userId.val(),$currentPassword.val());
    });

    $btnUpdateUser.on('click',function(e){
      e.preventDefault()
      e.stopImmediatePropagation();
      Users.updatePassword($userId.val(),$currentPassword.val(),$newPassword.val())
    })
  }

  function sectionHandlers() {
    if (!ran) {
      Sections.init()
      Sections.getIps();
      ran = true;
    }

    $("#btn-add-section").on('click', function (e) {
      e.stopImmediatePropagation();
      Sections.add();
    });

     $("#select-sector").on('change', function (e) {
      e.stopImmediatePropagation();
      Sections.getIps();
    });
  }

  $(function () {
    initComponents()
  });
var ran = false;

function loginHandlers() {

  $("#send-credentials").on('click', function (e) {
    e.stopImmediatePropagation();
    Session.login();
  });

  $("#user-input").on('keydown', function (e) {
    e.stopImmediatePropagation();
    loginLibrary.sendToLogin(e)
  })

  $("#password-input").on('keydown', function (e) {
    e.stopImmediatePropagation();
    loginLibrary.sendToLogin(e)
  })

  $("a[href]").on('click', function () {
    loginLibrary.loading();
    var $this = $(this);
    try {
      var target = $this.attr('target');
      setTimeout(function () {
        $(".loader").css({
          display: "none"
        });
      }, 3000)
    }catch (error) {
      throw error
    }
  })
}

var Session = {
  login: function() {
    var user     = $("#user-input").val();
    var password = $("#password-input").val();
    var is_empty = isEmpty([user, password])
    if (!is_empty) {
      var form = 'user=' + user + '&password=' + password;
      connectAndSend('app/login', false, false, Session.processLoginData, form, null, loginLibrary.loading)
    } else {
      displayMessage(MESSAGE_ERROR + " LLene todos los campos indicados para ingresar")
    }
  },

  processLoginData: function(response) {
    if (response == true) {
      window.location.href = BASE_URL + 'app/admin/';
    } else {
      $(".loader").css({
        display: "none"
      });
      displayMessage(MESSAGE_INFO + " Usuario y Contraseña no validos")
    }
  }
}

var loginLibrary = {
  loading: function(stop) {
    if(!stop){
       $(".loader").css({
        display: "block"
        });
    }else{
      $(".loader").css({display: "none"});
    }
  },
  
  sendToLogin: function(e) {
    key = e.which
    if (key == 13) {
      Session.login();
    }
  }
}

$(function () {
  loginHandlers();
})
  function isCurrentPage(pageName){
    if(getCurrentPage() == pageName){
      return true
    }  
    return false;
  }

  function getCurrentPage(){
    var currentPage = $("title").text().split(" ");
    currentPage = currentPage[4].toLowerCase().trim();
    return currentPage;
  }

  if(isCurrentPage("cierre") || isCurrentPage("cierre2")){
    cierreCajaFunctions();
  }

  if(isCurrentPage("reportes")){
    var script = document.createElement("script");
    script.src = BASE_URL + "assets/js/min/reportes.min.js?version=4.0.22";
    $("body").append(script);
  }

  function cierreCajaFunctions(){
    var totales = {
          total1: 0,
          total5: 0,
          total10: 0,
          total20: 0,
          total25: 0,
          total50: 0,
          total100: 0,
          total200: 0,
          total500: 0,
          total1000: 0,
          total2000: 0
        }

    var gasto   = {
        'fecha': '',
        'descripcion': '',
        'monto': '',
      }
    var gastos  = [{fecha: now(),descripcion:"hola",monto: 2000, id_gasto: 1}]
    var autor   = $('#autor-cierre').text().trim()

    var appCierre = new Vue({
      el: '#app-cierre',
      data: {
        isHide: false,
        fecha: now(),
        data_cierre:{
          autor: autor,
          pagos_facturas: 0,
          pagos_extras: 0,
          pagos_efectivo: 0,
          pagos_banco: 0,
          total_ingresos: 0,
          efectivo_caja: 0,
          total_descuadre: 0,
          total_gastos: 0,
          banco: 0
        },
        conteo:totales,
        suma: 0,
        gasto: gasto,
        gastos: gastos
      },

      mounted: function() {
        this.getGastos();
        this.setIngresos();
      },

      created: function(){
        $('.will-load').css({visibility:"visible"})
      },

      filters: {
        currencyFormat: function(number){
          return CurrencyFormat(number);
        }
      },

      methods:{
        changeTotal: function(e){
          var unit = e.srcElement.attributes['data-unit'].value
          var cantidad = e.srcElement.value
          var total = cantidad * unit
          totales['total'+ unit] = cantidad * unit * 1.00    
        }, 

        addGasto: function(e) {
          var gasto = this.gasto;
          gasto.fecha = now();
          form = 'data='+ JSON.stringify(gasto);
          var send = axios.post( BASE_URL + 'caja/add_gasto',form)
          send.then(function(response){
            var data = response.data
            displayMessage(data.mensaje)
            appCierre.fillGastos(data.gastos,"normal")
            appCierre.setGastoTotal(data.total_gastos)
          });
          send.catch(function(){
            console.log(error);
          });
        },

        fillGastos: function(gastos_servidor,mode){
          if(mode == "group"){
            if(gastos_servidor != null || gastos_servidor.length > 0){
              console.log([gastos_servidor]);
              appCierre.gastos = gastos_servidor;
            }else{
              appCierre.gastos = [];
            }
          }else{
            appCierre.gastos.push(JSON.parse(gastos_servidor)[0]);
          }
        },

        setGastoTotal: function(totalGastos){
          this.data_cierre.total_gastos = totalGastos
        },

        getGasto: function(e){
          var gasto = this.gasto;
          form = 'data='+ JSON.stringify(gasto);
          connectAndSend('caja/get_gasto',false,null,appCierre.fillGastos,form,null, null);
        },

        deleteGasto: function(e){
          console.log(e);
          var caller = e.target;
          if(caller.localname == "i"){
            caller = caller.parentElement;
          }
          var id = caller.attributes['data-id'].value
          swal({
            title: 'Está Seguro?',
            text: "Seguro de que quiere eliminar este gasto?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Estoy Seguro!',
            cancelButtonText: 'Cancelar'
          }).then(function(){
            form = 'data='+ JSON.stringify({id: id, fecha:now()})
            var send = axios.post(BASE_URL + 'caja/delete_gasto',form)
            send.then(function(response){
              var data = response.data
              displayMessage(data.mensaje)
              appCierre.fillGastos(data.gastos,"group")
              appCierre.setGastoTotal(data.total_gastos) 
            });
            send.catch(function(error){

            });
          });      
        },

        getGastos: function(){
          var data = {fecha: now()}
          form = 'data='+ JSON.stringify(data)
          var send = axios.post( BASE_URL + 'caja/get_gastos',form)
          send.then(function(response){
            var data = response.data
            displayMessage(data.mensaje)
            appCierre.fillGastos(data.gastos,"group")
            appCierre.setGastoTotal(data.total_gastos)
          });
          send.catch(function(){
            console.log(error);
          })
        },

        setIngresos: function(){
          var form = 'data=' + JSON.stringify({fecha: now()})
          var self = this.data_cierre;
          var send = axios.post( BASE_URL + 'caja/get_ingresos',form)
          send.then(function(response){
            var data = response.data
            self.pagos_facturas = data.pagos_facturas;
            self.pagos_extras = data.pagos_extras;
            self.pagos_efectivo = data.pagos_efectivo;
            self.pagos_banco = data.pagos_banco;
            self.total_ingresos = parseFloat(data.pagos_facturas) + parseFloat(self.pagos_extras);
            self.total_descuadre = - self.pagos_efectivo + self.efectivo_caja;
          });
          send.catch(function(){
            console.log(error);
          })
        },

        cerrarCaja: function(){
          var self   = this;
          var cierre = this.data_cierre;
          window.cierre = cierre;
          if(cierre.total_descuadre != 0){
            swal({
              title: 'Está Seguro?',
              text: "Hay un descuadre en la caja, quiere hacer el cierre de todos modos?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Si',
              cancelButtonText: 'No'
            }).then(function(){
              self.cerrar(cierre)
            })
          }else{
            self.cerrar(cierre);
          }
        },

        cerrar: function(cierre){
          
          cierre.fecha = now();
          form = 'data='+ JSON.stringify(cierre);
          var send = axios.post( BASE_URL + 'caja/add_cierre',form)
          send.then(function(response){
            var data = response.data
            displayMessage(data.mensaje)
            self.isHide = true;
            appSummaryView.isHide = false;
            appSummaryView.cierre = cierre;
            $("#app-cierre").addClass('hide');
            $(".top-nav").addClass('hide');
            $("#print-view").css({visibility: "visible"})
            
          });
          send.catch(function(){
            console.log(error);
          });
        }
      },

      computed:{
        getTotal: function(e){
          var t = totales;
          var self = this.data_cierre;
          var suma = sumar([t.total1,t.total5,t.total10, t.total20, t.total25, t.total50, t.total100, t.total200, t.total500, t.total1000, t.total2000]);
          this.suma = suma;
          self.efectivo_caja = suma.toFixed(2);
          self.total_descuadre = parseFloat(-self.pagos_efectivo) + parseFloat(self.efectivo_caja);
          self.banco = parseFloat(self.pagos_banco) + parseFloat(self.pagos_efectivo) - parseFloat(self.total_gastos) + parseFloat(self.total_descuadre)
          return this.suma;
        },

        decimals: function(){
          var fields = ["pagos_facturas","pagos_extra","pagos_efectivo","pagos_banco","total_ingresos","efectivo_caja","total_descuadre","total_gasto","banco"];
          fields.forEach(function(field) {
            this.data_cierre[field] = this.data_cierre[field].toFixed(2)
          }, this);
        }
      }
    })

    window.appCierre = appCierre;
    function sumar (valores){
      var suma = 0;
      for (var i = 0; i < valores.length; i++) {
        suma += parseFloat(valores[i]); 
      }
      return suma;
    }

    function now(){
      return moment().format("YYYY-MM-DD");
    }
  }
  Vue.component('summary-print-view',{
    template: '\
    <div class="print-container">\
      <div class="__header">\
      <h2 class="__title t-center"> {{title}}</h2>\
      </div>\
      <div class="__body">\
      <printeable></printeable>\
      </div>\
    <div>\
    \
    ',
    props:['somevalue'],
    methods:{
      goBack: function(){
        appSummaryView.isHide = true;
        window.appCierre.isHide = false;
        self.isHide = true;
        $(".top-nav").removeClass('hide');
        $("#app-cierre").removeClass('hide');
      }
    },
    data: function(){
      return {
        back: {link:"somelink",text:"volver a cierre"},
        foward: {link: BASE_URL + "app/logout",text:"cerrar session"},
        title:"Resumen de cierre de hoy",

      }
    }
  })

  var appSummaryView = new Vue({
    el: "#print-view",
    data: {
      isHide: true,
      back: {link:"somelink",text:"volver a cierre"},
      foward: {link: BASE_URL + "app/logout",text:"cerrar session"},
      cierre:{
          autor: '',
          pagos_facturas: 0,
          pagos_extras: 0,
          pagos_efectivo: 0,
          pagos_banco: 0,
          total_ingresos: 0,
          efectivo_caja: 0,
          total_descuadre: 0,
          total_gastos: 0,
          banco: 0
        }
    },
    filters: {
      currencyFormat: function(number){
        return "RD$ "+ CurrencyFormat(number);
      },

      spanishDateFormat: function(date){
        moment.locale('es-DO');
        return moment(date).format('dddd DD [de] MMMM [del] YYYY')
      }
    },
    methods:{
      goBack: function(){
        appSummaryView.isHide = true;
        window.appCierre.isHide = false;
        self.isHide = true;
        $(".top-nav").removeClass('hide');
        $("#app-cierre").removeClass('hide');
      },
      print: function(){
        print()
      }
    }
  })
var listExtras = '';
var reciboReset = {
  id_pago: 0,
  id_contrato: 0,
  id_servicio: 0,
  id_empleado: 0,
  fecha_pago : '',
  concepto : 'extra',
  detalles_extra : '',
  cuota: '',
  mora : '',
  monto_extra: '',
  total: '',
  estado: '',
  fecha_limite: '',
  complete_date : '',
  descuento: '',
  razon_descuento: '',
  deuda: '',
  abono_a: '',
  tipo: '',
  generado: ''
}

var appPagoExtra = new Vue({
  el: "#app-pago-extra",
  data: {
    recibo:{
       id_pago: 0,
       id_contrato: 0,
       id_servicio: 0,
       id_empleado: 0,
       fecha_pago : 'dd/mm/yyyy',
       concepto : 'extra',
       detalles_extra : '',
       cuota: '',
       mora : '',
       monto_extra: '',
       total: '',
       estado: '',
       fecha_limite: '',
       complete_date : '',
       descuento: '',
       razon_descuento: '',
       deuda: '',
       abono_a: '',
       tipo: '',
       generado: ''
    },

    visible: false,
    extra:{
      "controls": '',
      "id_extra": '',
      "id_servicio": '',
      "checkbox": '',
      "fecha": '',
      "concepto": '',
      "ultimo_pago": '',
      "monto_pagado": '',
      "monto_total": '',
      "estado": ''
    },
    firstControls: {
      hide: false
    },
  },
  filters: {

  },
  computed: {
    url_recibo: function () {
      return BASE_URL + 'process/getrecibo/' + this.recibo.id_pago;
    },

    hide_recibo: function () {
      if(this.recibo.estado == "pagado"){
        return false
      }
       return this.hide_recibo = true;
      
    }
  },

  methods:{

    goBack: function () {
      extraTable.el.parents(".bootstrap-table").removeClass("hide");
      this.visible = false
      this.extra = {concepto: ''}
      extraTable.refresh(listExtras);
    },

    generatePayment: function () {
      var form = 'data=' + JSON.stringify(this.extra);
      var send = axios.post( BASE_URL + 'extra/generate_extra_payment',form);
      send.then(function(res){
        var data = res.data;
        displayMessage(data.mensaje);
        selectExtraPayment.html(data.pagos).change();
      });
      send.catch(function(){
        
      })
    },

    getPayment: function (id_pago) {
      var form = "data=" + JSON.stringify({id_pago: id_pago});
      var self = this
      var send = axios.post( BASE_URL + 'extra/get_payment',form);
      send.then(function(res){
        var data = res.data 
        if(data.recibo){
          self.recibo = data.recibo
        }
      })
    },

    applyPayment: function () {
      var self = this
      var recibo = this.recibo
      var info = {
        id_extra: recibo.id_extra,
        id_pago: recibo.id_pago
      }

      var data = {
        concepto: 'extra -', 
        detalles_extra: recibo.detalles_extra,
        fecha_pago: recibo.fecha_pago,
        cuota: recibo.cuota,
        total: recibo.cuota,
        estado: 'pagado',
        tipo: recibo.tipo,
        generado: true
      }

      var form = 'data='+ JSON.stringify(data) + '&info='+ JSON.stringify(info)
      var send = axios.post(BASE_URL + 'extra/apply_payment',form)
      send.then(function (res) {
        var data = res.data
        listExtras = data.extras;
        self.getPayments(self.extra.id_extra);
        displayMessage(data.mensaje);
      })
      send.catch(function(error){
        console.log(error);
      })
    },
    
    getPayments: function (id_extra) {
      var self = this;
      var form = "data="+ JSON.stringify({id_extra: id_extra})
      var send = axios.post(BASE_URL + 'extra/get_extra_payment_of', form)
      send.then(function(res){
        var data = res.data;
        if(!data.pagos){
          self.recibo = reciboReset
        }
        selectExtraPayment.html(data.pagos).change()

      })
    },

    deletePayment: function () {
      var self = this;
      var recibo = this.recibo
      var data = {
        'id_extra': recibo.id_extra,
        'id_pago': recibo.id_pago
      }

      var form = 'data='+ JSON.stringify(data)
      var send = axios.post(BASE_URL + 'extra/delete_payment',form)
      send.then(function (res) {
        var data = res.data
        displayMessage(data.mensaje);
        self.getPayments(self.extra.id_extra);
      })
      send.catch(function(error){
        console.log(error);
      })
    }
  }

});


bus.$on('row-selected',function (row) {
  extraTable.el.parents(".bootstrap-table").addClass("hide");
  appPagoExtra.visible = true
  appPagoExtra.extra = row
  listExtras = extraTable.el.find('tbody').html();
  appPagoExtra.getPayments(row.id_extra);
})

var selectExtraPayment = $("#select-extra-payment");
selectExtraPayment.on('change',function(){
  var id_pago = selectExtraPayment.val()
  appPagoExtra.getPayment(id_pago)
})
/*! AdminLTE app.js
* ================
* Main JS application file for AdminLTE v2. This file
* should be included in all pages. It controls some layout
* options and implements exclusive AdminLTE plugins.
*
* @Author  Almsaeed Studio
* @Support <https://www.almsaeedstudio.com>
* @Email   <abdullah@almsaeedstudio.com>
* @version 2.4.0
* @repository git://github.com/almasaeed2010/AdminLTE.git
* @license MIT <http://opensource.org/licenses/MIT>
*/
if("undefined"==typeof jQuery)throw new Error("AdminLTE requires jQuery");+function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var h=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new g(h))}if("string"==typeof b){if(void 0===f[b])throw new Error("No method named "+b);f[b]()}})}var c="lte.layout",d={slimscroll:!0,resetHeight:!0},e={wrapper:".wrapper",contentWrapper:".content-wrapper",layoutBoxed:".layout-boxed",mainFooter:".main-footer",mainHeader:".main-header",sidebar:".sidebar",controlSidebar:".control-sidebar",fixed:".fixed",sidebarMenu:".sidebar-menu",logo:".main-header .logo"},f={fixed:"fixed",holdTransition:"hold-transition"},g=function(a){this.options=a,this.bindedResize=!1,this.activate()};g.prototype.activate=function(){this.fix(),this.fixSidebar(),a("body").removeClass(f.holdTransition),this.options.resetHeight&&a("body, html, "+e.wrapper).css({height:"auto","min-height":"100%"}),this.bindedResize||(a(window).resize(function(){this.fix(),this.fixSidebar(),a(e.logo+", "+e.sidebar).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){this.fix(),this.fixSidebar()}.bind(this))}.bind(this)),this.bindedResize=!0),a(e.sidebarMenu).on("expanded.tree",function(){this.fix(),this.fixSidebar()}.bind(this)),a(e.sidebarMenu).on("collapsed.tree",function(){this.fix(),this.fixSidebar()}.bind(this))},g.prototype.fix=function(){a(e.layoutBoxed+" > "+e.wrapper).css("overflow","hidden");var b=a(e.mainFooter).outerHeight()||0,c=a(e.mainHeader).outerHeight()+b,d=a(window).height(),g=a(e.sidebar).height()||0;if(a("body").hasClass(f.fixed))a(e.contentWrapper).css("min-height",d-b);else{var h;d>=g?(a(e.contentWrapper).css("min-height",d-c),h=d-c):(a(e.contentWrapper).css("min-height",g),h=g);var i=a(e.controlSidebar);void 0!==i&&i.height()>h&&a(e.contentWrapper).css("min-height",i.height())}},g.prototype.fixSidebar=function(){if(!a("body").hasClass(f.fixed))return void(void 0!==a.fn.slimScroll&&a(e.sidebar).slimScroll({destroy:!0}).height("auto"));this.options.slimscroll&&void 0!==a.fn.slimScroll&&(a(e.sidebar).slimScroll({destroy:!0}).height("auto"),a(e.sidebar).slimScroll({height:a(window).height()-a(e.mainHeader).height()+"px",color:"rgba(0,0,0,0.2)",size:"3px"}))};var h=a.fn.layout;a.fn.layout=b,a.fn.layout.Constuctor=g,a.fn.layout.noConflict=function(){return a.fn.layout=h,this},a(window).on("load",function(){b.call(a("body"))})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var g=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new h(g))}"toggle"==b&&f.toggle()})}var c="lte.pushmenu",d={collapseScreenSize:767,expandOnHover:!1,expandTransitionDelay:200},e={collapsed:".sidebar-collapse",open:".sidebar-open",mainSidebar:".main-sidebar",contentWrapper:".content-wrapper",searchInput:".sidebar-form .form-control",button:'[data-toggle="push-menu"]',mini:".sidebar-mini",expanded:".sidebar-expanded-on-hover",layoutFixed:".fixed"},f={collapsed:"sidebar-collapse",open:"sidebar-open",mini:"sidebar-mini",expanded:"sidebar-expanded-on-hover",expandFeature:"sidebar-mini-expand-feature",layoutFixed:"fixed"},g={expanded:"expanded.pushMenu",collapsed:"collapsed.pushMenu"},h=function(a){this.options=a,this.init()};h.prototype.init=function(){(this.options.expandOnHover||a("body").is(e.mini+e.layoutFixed))&&(this.expandOnHover(),a("body").addClass(f.expandFeature)),a(e.contentWrapper).click(function(){a(window).width()<=this.options.collapseScreenSize&&a("body").hasClass(f.open)&&this.close()}.bind(this)),a(e.searchInput).click(function(a){a.stopPropagation()})},h.prototype.toggle=function(){var b=a(window).width(),c=!a("body").hasClass(f.collapsed);b<=this.options.collapseScreenSize&&(c=a("body").hasClass(f.open)),c?this.close():this.open()},h.prototype.open=function(){a(window).width()>this.options.collapseScreenSize?a("body").removeClass(f.collapsed).trigger(a.Event(g.expanded)):a("body").addClass(f.open).trigger(a.Event(g.expanded))},h.prototype.close=function(){a(window).width()>this.options.collapseScreenSize?a("body").addClass(f.collapsed).trigger(a.Event(g.collapsed)):a("body").removeClass(f.open+" "+f.collapsed).trigger(a.Event(g.collapsed))},h.prototype.expandOnHover=function(){a(e.mainSidebar).hover(function(){a("body").is(e.mini+e.collapsed)&&a(window).width()>this.options.collapseScreenSize&&this.expand()}.bind(this),function(){a("body").is(e.expanded)&&this.collapse()}.bind(this))},h.prototype.expand=function(){setTimeout(function(){a("body").removeClass(f.collapsed).addClass(f.expanded)},this.options.expandTransitionDelay)},h.prototype.collapse=function(){setTimeout(function(){a("body").removeClass(f.expanded).addClass(f.collapsed)},this.options.expandTransitionDelay)};var i=a.fn.pushMenu;a.fn.pushMenu=b,a.fn.pushMenu.Constructor=h,a.fn.pushMenu.noConflict=function(){return a.fn.pushMenu=i,this},a(document).on("click",e.button,function(c){c.preventDefault(),b.call(a(this),"toggle")}),a(window).on("load",function(){b.call(a(e.button))})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this);if(!e.data(c)){var f=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,new h(e,f))}})}var c="lte.tree",d={animationSpeed:500,accordion:!0,followLink:!1,trigger:".treeview a"},e={tree:".tree",treeview:".treeview",treeviewMenu:".treeview-menu",open:".menu-open, .active",li:"li",data:'[data-widget="tree"]',active:".active"},f={open:"menu-open",tree:"tree"},g={collapsed:"collapsed.tree",expanded:"expanded.tree"},h=function(b,c){this.element=b,this.options=c,a(this.element).addClass(f.tree),a(e.treeview+e.active,this.element).addClass(f.open),this._setUpListeners()};h.prototype.toggle=function(a,b){var c=a.next(e.treeviewMenu),d=a.parent(),g=d.hasClass(f.open);d.is(e.treeview)&&(this.options.followLink&&"#"!=a.attr("href")||b.preventDefault(),g?this.collapse(c,d):this.expand(c,d))},h.prototype.expand=function(b,c){var d=a.Event(g.expanded);if(this.options.accordion){var h=c.siblings(e.open),i=h.children(e.treeviewMenu);this.collapse(i,h)}c.addClass(f.open),b.slideDown(this.options.animationSpeed,function(){a(this.element).trigger(d)}.bind(this))},h.prototype.collapse=function(b,c){var d=a.Event(g.collapsed);b.find(e.open).removeClass(f.open),c.removeClass(f.open),b.slideUp(this.options.animationSpeed,function(){b.find(e.open+" > "+e.treeview).slideUp(),a(this.element).trigger(d)}.bind(this))},h.prototype._setUpListeners=function(){var b=this;a(this.element).on("click",this.options.trigger,function(c){b.toggle(a(this),c)})};var i=a.fn.tree;a.fn.tree=b,a.fn.tree.Constructor=h,a.fn.tree.noConflict=function(){return a.fn.tree=i,this},a(window).on("load",function(){a(e.data).each(function(){b.call(a(this))})})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var g=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new h(e,g))}"string"==typeof b&&f.toggle()})}var c="lte.controlsidebar",d={slide:!0},e={sidebar:".control-sidebar",data:'[data-toggle="control-sidebar"]',open:".control-sidebar-open",bg:".control-sidebar-bg",wrapper:".wrapper",content:".content-wrapper",boxed:".layout-boxed"},f={open:"control-sidebar-open",fixed:"fixed"},g={collapsed:"collapsed.controlsidebar",expanded:"expanded.controlsidebar"},h=function(a,b){this.element=a,this.options=b,this.hasBindedResize=!1,this.init()};h.prototype.init=function(){a(this.element).is(e.data)||a(this).on("click",this.toggle),this.fix(),a(window).resize(function(){this.fix()}.bind(this))},h.prototype.toggle=function(b){b&&b.preventDefault(),this.fix(),a(e.sidebar).is(e.open)||a("body").is(e.open)?this.collapse():this.expand()},h.prototype.expand=function(){this.options.slide?a(e.sidebar).addClass(f.open):a("body").addClass(f.open),a(this.element).trigger(a.Event(g.expanded))},h.prototype.collapse=function(){a("body, "+e.sidebar).removeClass(f.open),a(this.element).trigger(a.Event(g.collapsed))},h.prototype.fix=function(){a("body").is(e.boxed)&&this._fixForBoxed(a(e.bg))},h.prototype._fixForBoxed=function(b){b.css({position:"absolute",height:a(e.wrapper).height()})};var i=a.fn.controlSidebar;a.fn.controlSidebar=b,a.fn.controlSidebar.Constructor=h,a.fn.controlSidebar.noConflict=function(){return a.fn.controlSidebar=i,this},a(document).on("click",e.data,function(c){c&&c.preventDefault(),b.call(a(this),"toggle")})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var g=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new h(e,g))}if("string"==typeof b){if(void 0===f[b])throw new Error("No method named "+b);f[b]()}})}var c="lte.boxwidget",d={animationSpeed:500,collapseTrigger:'[data-widget="collapse"]',removeTrigger:'[data-widget="remove"]',collapseIcon:"fa-minus",expandIcon:"fa-plus",removeIcon:"fa-times"},e={data:".box",collapsed:".collapsed-box",body:".box-body",footer:".box-footer",tools:".box-tools"},f={collapsed:"collapsed-box"},g={collapsed:"collapsed.boxwidget",expanded:"expanded.boxwidget",removed:"removed.boxwidget"},h=function(a,b){this.element=a,this.options=b,this._setUpListeners()};h.prototype.toggle=function(){a(this.element).is(e.collapsed)?this.expand():this.collapse()},h.prototype.expand=function(){var b=a.Event(g.expanded),c=this.options.collapseIcon,d=this.options.expandIcon;a(this.element).removeClass(f.collapsed),a(this.element).find(e.tools).find("."+d).removeClass(d).addClass(c),a(this.element).find(e.body+", "+e.footer).slideDown(this.options.animationSpeed,function(){a(this.element).trigger(b)}.bind(this))},h.prototype.collapse=function(){var b=a.Event(g.collapsed),c=this.options.collapseIcon,d=this.options.expandIcon;a(this.element).find(e.tools).find("."+c).removeClass(c).addClass(d),a(this.element).find(e.body+", "+e.footer).slideUp(this.options.animationSpeed,function(){a(this.element).addClass(f.collapsed),a(this.element).trigger(b)}.bind(this))},h.prototype.remove=function(){var b=a.Event(g.removed);a(this.element).slideUp(this.options.animationSpeed,function(){a(this.element).trigger(b),a(this.element).remove()}.bind(this))},h.prototype._setUpListeners=function(){var b=this;a(this.element).on("click",this.options.collapseTrigger,function(a){a&&a.preventDefault(),b.toggle()}),a(this.element).on("click",this.options.removeTrigger,function(a){a&&a.preventDefault(),b.remove()})};var i=a.fn.boxWidget;a.fn.boxWidget=b,a.fn.boxWidget.Constructor=h,a.fn.boxWidget.noConflict=function(){return a.fn.boxWidget=i,this},a(window).on("load",function(){a(e.data).each(function(){b.call(a(this))})})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var e=a(this),f=e.data(c);if(!f){var h=a.extend({},d,e.data(),"object"==typeof b&&b);e.data(c,f=new g(e,h))}if("string"==typeof f){if(void 0===f[b])throw new Error("No method named "+b);f[b]()}})}var c="lte.todolist",d={iCheck:!1,onCheck:function(){},onUnCheck:function(){}},e={data:'[data-widget="todo-list"]'},f={done:"done"},g=function(a,b){this.element=a,this.options=b,this._setUpListeners()};g.prototype.toggle=function(a){if(a.parents(e.li).first().toggleClass(f.done),!a.prop("checked"))return void this.unCheck(a);this.check(a)},g.prototype.check=function(a){this.options.onCheck.call(a)},g.prototype.unCheck=function(a){this.options.onUnCheck.call(a)},g.prototype._setUpListeners=function(){var b=this;a(this.element).on("change ifChanged","input:checkbox",function(){b.toggle(a(this))})};var h=a.fn.todoList;a.fn.todoList=b,a.fn.todoList.Constructor=g,a.fn.todoList.noConflict=function(){return a.fn.todoList=h,this},a(window).on("load",function(){a(e.data).each(function(){b.call(a(this))})})}(jQuery),function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data(c);e||d.data(c,e=new f(d)),"string"==typeof b&&e.toggle(d)})}var c="lte.directchat",d={data:'[data-widget="chat-pane-toggle"]',box:".direct-chat"},e={open:"direct-chat-contacts-open"},f=function(a){this.element=a};f.prototype.toggle=function(a){a.parents(d.box).first().toggleClass(e.open)};var g=a.fn.directChat;a.fn.directChat=b,a.fn.directChat.Constructor=f,a.fn.directChat.noConflict=function(){return a.fn.directChat=g,this},a(document).on("click",d.data,function(c){c&&c.preventDefault(),b.call(a(this),"toggle")})}(jQuery);
/**
* @license Input Mask plugin for jquery
* http://github.com/RobinHerbots/jquery.inputmask
* Copyright (c) 2010 - 2014 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 0.0.0
*/
(function ($) {
    if ($.fn.inputmask === undefined) {
        //helper functions    
        function isInputEventSupported(eventName) {
            var el = document.createElement('input'),
            eventName = 'on' + eventName,
            isSupported = (eventName in el);
            if (!isSupported) {
                el.setAttribute(eventName, 'return;');
                isSupported = typeof el[eventName] == 'function';
            }
            el = null;
            return isSupported;
        }
        function resolveAlias(aliasStr, options, opts) {
            var aliasDefinition = opts.aliases[aliasStr];
            if (aliasDefinition) {
                if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts); //alias is another alias
                $.extend(true, opts, aliasDefinition);  //merge alias definition in the options
                $.extend(true, opts, options);  //reapply extra given options
                return true;
            }
            return false;
        }
        function generateMaskSets(opts) {
            var ms = [];
            var genmasks = []; //used to keep track of the masks that where processed, to avoid duplicates
            function getMaskTemplate(mask) {
                if (opts.numericInput) {
                    mask = mask.split('').reverse().join('');
                }
                var escaped = false, outCount = 0, greedy = opts.greedy, repeat = opts.repeat;
                if (repeat == "*") greedy = false;
                //if (greedy == true && opts.placeholder == "") opts.placeholder = " ";
                if (mask.length == 1 && greedy == false && repeat != 0) { opts.placeholder = ""; } //hide placeholder with single non-greedy mask
                var singleMask = $.map(mask.split(""), function (element, index) {
                    var outElem = [];
                    if (element == opts.escapeChar) {
                        escaped = true;
                    }
                    else if ((element != opts.optionalmarker.start && element != opts.optionalmarker.end) || escaped) {
                        var maskdef = opts.definitions[element];
                        if (maskdef && !escaped) {
                            for (var i = 0; i < maskdef.cardinality; i++) {
                                outElem.push(opts.placeholder.charAt((outCount + i) % opts.placeholder.length));
                            }
                        } else {
                            outElem.push(element);
                            escaped = false;
                        }
                        outCount += outElem.length;
                        return outElem;
                    }
                });

                //allocate repetitions
                var repeatedMask = singleMask.slice();
                for (var i = 1; i < repeat && greedy; i++) {
                    repeatedMask = repeatedMask.concat(singleMask.slice());
                }

                return { "mask": repeatedMask, "repeat": repeat, "greedy": greedy };
            }
            //test definition => {fn: RegExp/function, cardinality: int, optionality: bool, newBlockMarker: bool, offset: int, casing: null/upper/lower, def: definitionSymbol}
            function getTestingChain(mask) {
                if (opts.numericInput) {
                    mask = mask.split('').reverse().join('');
                }
                var isOptional = false, escaped = false;
                var newBlockMarker = false; //indicates wheter the begin/ending of a block should be indicated

                return $.map(mask.split(""), function (element, index) {
                    var outElem = [];

                    if (element == opts.escapeChar) {
                        escaped = true;
                    } else if (element == opts.optionalmarker.start && !escaped) {
                        isOptional = true;
                        newBlockMarker = true;
                    }
                    else if (element == opts.optionalmarker.end && !escaped) {
                        isOptional = false;
                        newBlockMarker = true;
                    }
                    else {
                        var maskdef = opts.definitions[element];
                        if (maskdef && !escaped) {
                            var prevalidators = maskdef["prevalidator"], prevalidatorsL = prevalidators ? prevalidators.length : 0;
                            for (var i = 1; i < maskdef.cardinality; i++) {
                                var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator["validator"], cardinality = prevalidator["cardinality"];
                                outElem.push({ fn: validator ? typeof validator == 'string' ? new RegExp(validator) : new function () { this.test = validator; } : new RegExp("."), cardinality: cardinality ? cardinality : 1, optionality: isOptional, newBlockMarker: isOptional == true ? newBlockMarker : false, offset: 0, casing: maskdef["casing"], def: maskdef["definitionSymbol"] || element });
                                if (isOptional == true) //reset newBlockMarker
                                    newBlockMarker = false;
                            }
                            outElem.push({ fn: maskdef.validator ? typeof maskdef.validator == 'string' ? new RegExp(maskdef.validator) : new function () { this.test = maskdef.validator; } : new RegExp("."), cardinality: maskdef.cardinality, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: maskdef["casing"], def: maskdef["definitionSymbol"] || element });
                        } else {
                            outElem.push({ fn: null, cardinality: 0, optionality: isOptional, newBlockMarker: newBlockMarker, offset: 0, casing: null, def: element });
                            escaped = false;
                        }
                        //reset newBlockMarker
                        newBlockMarker = false;
                        return outElem;
                    }
                });
            }
            function markOptional(maskPart) { //needed for the clearOptionalTail functionality
                return opts.optionalmarker.start + maskPart + opts.optionalmarker.end;
            }
            function splitFirstOptionalEndPart(maskPart) {
                var optionalStartMarkers = 0, optionalEndMarkers = 0, mpl = maskPart.length;
                for (var i = 0; i < mpl; i++) {
                    if (maskPart.charAt(i) == opts.optionalmarker.start) {
                        optionalStartMarkers++;
                    }
                    if (maskPart.charAt(i) == opts.optionalmarker.end) {
                        optionalEndMarkers++;
                    }
                    if (optionalStartMarkers > 0 && optionalStartMarkers == optionalEndMarkers)
                        break;
                }
                var maskParts = [maskPart.substring(0, i)];
                if (i < mpl) {
                    maskParts.push(maskPart.substring(i + 1, mpl));
                }
                return maskParts;
            }
            function splitFirstOptionalStartPart(maskPart) {
                var mpl = maskPart.length;
                for (var i = 0; i < mpl; i++) {
                    if (maskPart.charAt(i) == opts.optionalmarker.start) {
                        break;
                    }
                }
                var maskParts = [maskPart.substring(0, i)];
                if (i < mpl) {
                    maskParts.push(maskPart.substring(i + 1, mpl));
                }
                return maskParts;
            }
            function generateMask(maskPrefix, maskPart, metadata) {
                var maskParts = splitFirstOptionalEndPart(maskPart);
                var newMask, maskTemplate;

                var masks = splitFirstOptionalStartPart(maskParts[0]);
                if (masks.length > 1) {
                    newMask = maskPrefix + masks[0] + markOptional(masks[1]) + (maskParts.length > 1 ? maskParts[1] : "");
                    if ($.inArray(newMask, genmasks) == -1 && newMask != "") {
                        genmasks.push(newMask);
                        maskTemplate = getMaskTemplate(newMask);
                        ms.push({
                            "mask": newMask,
                            "_buffer": maskTemplate["mask"],
                            "buffer": maskTemplate["mask"].slice(),
                            "tests": getTestingChain(newMask),
                            "lastValidPosition": -1,
                            "greedy": maskTemplate["greedy"],
                            "repeat": maskTemplate["repeat"],
                            "metadata": metadata
                        });
                    }
                    newMask = maskPrefix + masks[0] + (maskParts.length > 1 ? maskParts[1] : "");
                    if ($.inArray(newMask, genmasks) == -1 && newMask != "") {
                        genmasks.push(newMask);
                        maskTemplate = getMaskTemplate(newMask);
                        ms.push({
                            "mask": newMask,
                            "_buffer": maskTemplate["mask"],
                            "buffer": maskTemplate["mask"].slice(),
                            "tests": getTestingChain(newMask),
                            "lastValidPosition": -1,
                            "greedy": maskTemplate["greedy"],
                            "repeat": maskTemplate["repeat"],
                            "metadata": metadata
                        });
                    }
                    if (splitFirstOptionalStartPart(masks[1]).length > 1) { //optional contains another optional
                        generateMask(maskPrefix + masks[0], masks[1] + maskParts[1], metadata);
                    }
                    if (maskParts.length > 1 && splitFirstOptionalStartPart(maskParts[1]).length > 1) {
                        generateMask(maskPrefix + masks[0] + markOptional(masks[1]), maskParts[1], metadata);
                        generateMask(maskPrefix + masks[0], maskParts[1], metadata);
                    }
                }
                else {
                    newMask = maskPrefix + maskParts;
                    if ($.inArray(newMask, genmasks) == -1 && newMask != "") {
                        genmasks.push(newMask);
                        maskTemplate = getMaskTemplate(newMask);
                        ms.push({
                            "mask": newMask,
                            "_buffer": maskTemplate["mask"],
                            "buffer": maskTemplate["mask"].slice(),
                            "tests": getTestingChain(newMask),
                            "lastValidPosition": -1,
                            "greedy": maskTemplate["greedy"],
                            "repeat": maskTemplate["repeat"],
                            "metadata": metadata
                        });
                    }
                }

            }

            if ($.isFunction(opts.mask)) { //allow mask to be a preprocessing fn - should return a valid mask
                opts.mask = opts.mask.call(this, opts);
            }
            if ($.isArray(opts.mask)) {
                $.each(opts.mask, function (ndx, msk) {
                    if (msk["mask"] != undefined) {
                        generateMask("", msk["mask"].toString(), msk);
                    } else
                        generateMask("", msk.toString());
                });
            } else generateMask("", opts.mask.toString());

            return opts.greedy ? ms : ms.sort(function (a, b) { return a["mask"].length - b["mask"].length; });
        }

        var msie10 = navigator.userAgent.match(new RegExp("msie 10", "i")) !== null,
            iphone = navigator.userAgent.match(new RegExp("iphone", "i")) !== null,
            android = navigator.userAgent.match(new RegExp("android.*safari.*", "i")) !== null,
            androidchrome = navigator.userAgent.match(new RegExp("android.*chrome.*", "i")) !== null,
            pasteEvent = isInputEventSupported('paste') ? 'paste' : isInputEventSupported('input') ? 'input' : "propertychange";


        //masking scope
        //actionObj definition see below
        function maskScope(masksets, activeMasksetIndex, opts, actionObj) {
            var isRTL = false,
                valueOnFocus = getActiveBuffer().join(''),
                $el, chromeValueOnInput,
                skipKeyPressEvent = false, //Safari 5.1.x - modal dialog fires keypress twice workaround
                skipInputEvent = false, //skip when triggered from within inputmask
                ignorable = false;


            //maskset helperfunctions

            function getActiveMaskSet() {
                return masksets[activeMasksetIndex];
            }

            function getActiveTests() {
                return getActiveMaskSet()['tests'];
            }

            function getActiveBufferTemplate() {
                return getActiveMaskSet()['_buffer'];
            }

            function getActiveBuffer() {
                return getActiveMaskSet()['buffer'];
            }

            function isValid(pos, c, strict) { //strict true ~ no correction or autofill
                strict = strict === true; //always set a value to strict to prevent possible strange behavior in the extensions 

                function _isValid(position, activeMaskset, c, strict) {
                    var testPos = determineTestPosition(position), loopend = c ? 1 : 0, chrs = '', buffer = activeMaskset["buffer"];
                    for (var i = activeMaskset['tests'][testPos].cardinality; i > loopend; i--) {
                        chrs += getBufferElement(buffer, testPos - (i - 1));
                    }

                    if (c) {
                        chrs += c;
                    }

                    //return is false or a json object => { pos: ??, c: ??} or true
                    return activeMaskset['tests'][testPos].fn != null ?
                        activeMaskset['tests'][testPos].fn.test(chrs, buffer, position, strict, opts)
                        : (c == getBufferElement(activeMaskset['_buffer'], position, true) || c == opts.skipOptionalPartCharacter) ?
                            { "refresh": true, c: getBufferElement(activeMaskset['_buffer'], position, true), pos: position }
                            : false;
                }

                function PostProcessResults(maskForwards, results) {
                    var hasValidActual = false;
                    $.each(results, function (ndx, rslt) {
                        hasValidActual = $.inArray(rslt["activeMasksetIndex"], maskForwards) == -1 && rslt["result"] !== false;
                        if (hasValidActual) return false;
                    });
                    if (hasValidActual) { //strip maskforwards
                        results = $.map(results, function (rslt, ndx) {
                            if ($.inArray(rslt["activeMasksetIndex"], maskForwards) == -1) {
                                return rslt;
                            } else {
                                masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = actualLVP;
                            }
                        });
                    } else { //keep maskforwards with the least forward
                        var lowestPos = -1, lowestIndex = -1, rsltValid;
                        $.each(results, function (ndx, rslt) {
                            if ($.inArray(rslt["activeMasksetIndex"], maskForwards) != -1 && rslt["result"] !== false & (lowestPos == -1 || lowestPos > rslt["result"]["pos"])) {
                                lowestPos = rslt["result"]["pos"];
                                lowestIndex = rslt["activeMasksetIndex"];
                            }
                        });
                        results = $.map(results, function (rslt, ndx) {
                            if ($.inArray(rslt["activeMasksetIndex"], maskForwards) != -1) {
                                if (rslt["result"]["pos"] == lowestPos) {
                                    return rslt;
                                } else if (rslt["result"] !== false) {
                                    for (var i = pos; i < lowestPos; i++) {
                                        rsltValid = _isValid(i, masksets[rslt["activeMasksetIndex"]], masksets[lowestIndex]["buffer"][i], true);
                                        if (rsltValid === false) {
                                            masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = lowestPos - 1;
                                            break;
                                        } else {
                                            setBufferElement(masksets[rslt["activeMasksetIndex"]]["buffer"], i, masksets[lowestIndex]["buffer"][i], true);
                                            masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = i;
                                        }
                                    }
                                    //also check check for the lowestpos with the new input
                                    rsltValid = _isValid(lowestPos, masksets[rslt["activeMasksetIndex"]], c, true);
                                    if (rsltValid !== false) {
                                        setBufferElement(masksets[rslt["activeMasksetIndex"]]["buffer"], lowestPos, c, true);
                                        masksets[rslt["activeMasksetIndex"]]["lastValidPosition"] = lowestPos;
                                    }
                                    //console.log("ndx " + rslt["activeMasksetIndex"] + " validate " + masksets[rslt["activeMasksetIndex"]]["buffer"].join('') + " lv " + masksets[rslt["activeMasksetIndex"]]['lastValidPosition']);
                                    return rslt;
                                }
                            }
                        });
                    }
                    return results;
                }

                if (strict) {
                    var result = _isValid(pos, getActiveMaskSet(), c, strict); //only check validity in current mask when validating strict
                    if (result === true) {
                        result = { "pos": pos }; //always take a possible corrected maskposition into account
                    }
                    return result;
                }

                var results = [], result = false, currentActiveMasksetIndex = activeMasksetIndex,
                    actualBuffer = getActiveBuffer().slice(), actualLVP = getActiveMaskSet()["lastValidPosition"],
                    actualPrevious = seekPrevious(pos),
                    maskForwards = [];
                $.each(masksets, function (index, value) {
                    if (typeof (value) == "object") {
                        activeMasksetIndex = index;

                        var maskPos = pos;
                        var lvp = getActiveMaskSet()['lastValidPosition'],
                            rsltValid;
                        if (lvp == actualLVP) {
                            if ((maskPos - actualLVP) > 1) {
                                for (var i = lvp == -1 ? 0 : lvp; i < maskPos; i++) {
                                    rsltValid = _isValid(i, getActiveMaskSet(), actualBuffer[i], true);
                                    if (rsltValid === false) {
                                        break;
                                    } else {
                                        setBufferElement(getActiveBuffer(), i, actualBuffer[i], true);
                                        if (rsltValid === true) {
                                            rsltValid = { "pos": i }; //always take a possible corrected maskposition into account
                                        }
                                        var newValidPosition = rsltValid.pos || i;
                                        if (getActiveMaskSet()['lastValidPosition'] < newValidPosition)
                                            getActiveMaskSet()['lastValidPosition'] = newValidPosition; //set new position from isValid
                                    }
                                }
                            }
                            //does the input match on a further position?
                            if (!isMask(maskPos) && !_isValid(maskPos, getActiveMaskSet(), c, strict)) {
                                var maxForward = seekNext(maskPos) - maskPos;
                                for (var fw = 0; fw < maxForward; fw++) {
                                    if (_isValid(++maskPos, getActiveMaskSet(), c, strict) !== false)
                                        break;
                                }
                                maskForwards.push(activeMasksetIndex);
                                //console.log('maskforward ' + activeMasksetIndex + " pos " + pos + " maskPos " + maskPos);
                            }
                        }

                        if (getActiveMaskSet()['lastValidPosition'] >= actualLVP || activeMasksetIndex == currentActiveMasksetIndex) {
                            if (maskPos >= 0 && maskPos < getMaskLength()) {
                                result = _isValid(maskPos, getActiveMaskSet(), c, strict);
                                if (result !== false) {
                                    if (result === true) {
                                        result = { "pos": maskPos }; //always take a possible corrected maskposition into account
                                    }
                                    var newValidPosition = result.pos || maskPos;
                                    if (getActiveMaskSet()['lastValidPosition'] < newValidPosition)
                                        getActiveMaskSet()['lastValidPosition'] = newValidPosition; //set new position from isValid
                                }
                                //console.log("pos " + pos + " ndx " + activeMasksetIndex + " validate " + getActiveBuffer().join('') + " lv " + getActiveMaskSet()['lastValidPosition']);
                                results.push({ "activeMasksetIndex": index, "result": result });
                            }
                        }
                    }
                });
                activeMasksetIndex = currentActiveMasksetIndex; //reset activeMasksetIndex

                return PostProcessResults(maskForwards, results); //return results of the multiple mask validations
            }

            function determineActiveMasksetIndex() {
                var currentMasksetIndex = activeMasksetIndex,
                    highestValid = { "activeMasksetIndex": 0, "lastValidPosition": -1, "next": -1 };
                $.each(masksets, function (index, value) {
                    if (typeof (value) == "object") {
                        activeMasksetIndex = index;
                        if (getActiveMaskSet()['lastValidPosition'] > highestValid['lastValidPosition']) {
                            highestValid["activeMasksetIndex"] = index;
                            highestValid["lastValidPosition"] = getActiveMaskSet()['lastValidPosition'];
                            highestValid["next"] = seekNext(getActiveMaskSet()['lastValidPosition']);
                        } else if (getActiveMaskSet()['lastValidPosition'] == highestValid['lastValidPosition'] &&
                            (highestValid['next'] == -1 || highestValid['next'] > seekNext(getActiveMaskSet()['lastValidPosition']))) {
                            highestValid["activeMasksetIndex"] = index;
                            highestValid["lastValidPosition"] = getActiveMaskSet()['lastValidPosition'];
                            highestValid["next"] = seekNext(getActiveMaskSet()['lastValidPosition']);
                        }
                    }
                });

                activeMasksetIndex = highestValid["lastValidPosition"] != -1 && masksets[currentMasksetIndex]["lastValidPosition"] == highestValid["lastValidPosition"] ? currentMasksetIndex : highestValid["activeMasksetIndex"];
                if (currentMasksetIndex != activeMasksetIndex) {
                    clearBuffer(getActiveBuffer(), seekNext(highestValid["lastValidPosition"]), getMaskLength());
                    getActiveMaskSet()["writeOutBuffer"] = true;
                }
                $el.data('_inputmask')['activeMasksetIndex'] = activeMasksetIndex; //store the activeMasksetIndex
            }

            function isMask(pos) {
                var testPos = determineTestPosition(pos);
                var test = getActiveTests()[testPos];

                return test != undefined ? test.fn : false;
            }

            function determineTestPosition(pos) {
                return pos % getActiveTests().length;
            }

            function getMaskLength() {
                return opts.getMaskLength(getActiveBufferTemplate(), getActiveMaskSet()['greedy'], getActiveMaskSet()['repeat'], getActiveBuffer(), opts);
            }

            //pos: from position

            function seekNext(pos) {
                var maskL = getMaskLength();
                if (pos >= maskL) return maskL;
                var position = pos;
                while (++position < maskL && !isMask(position)) {
                }
                return position;
            }

            //pos: from position

            function seekPrevious(pos) {
                var position = pos;
                if (position <= 0) return 0;

                while (--position > 0 && !isMask(position)) {
                }
                return position;
            }

            function setBufferElement(buffer, position, element, autoPrepare) {
                if (autoPrepare) position = prepareBuffer(buffer, position);

                var test = getActiveTests()[determineTestPosition(position)];
                var elem = element;
                if (elem != undefined && test != undefined) {
                    switch (test.casing) {
                        case "upper":
                            elem = element.toUpperCase();
                            break;
                        case "lower":
                            elem = element.toLowerCase();
                            break;
                    }
                }

                buffer[position] = elem;
            }

            function getBufferElement(buffer, position, autoPrepare) {
                if (autoPrepare) position = prepareBuffer(buffer, position);
                return buffer[position];
            }

            //needed to handle the non-greedy mask repetitions

            function prepareBuffer(buffer, position) {
                var j;
                while (buffer[position] == undefined && buffer.length < getMaskLength()) {
                    j = 0;
                    while (getActiveBufferTemplate()[j] !== undefined) { //add a new buffer
                        buffer.push(getActiveBufferTemplate()[j++]);
                    }
                }

                return position;
            }

            function writeBuffer(input, buffer, caretPos) {
                input._valueSet(buffer.join(''));
                if (caretPos != undefined) {
                    caret(input, caretPos);
                }
            }

            function clearBuffer(buffer, start, end, stripNomasks) {
                for (var i = start, maskL = getMaskLength() ; i < end && i < maskL; i++) {
                    if (stripNomasks === true) {
                        if (!isMask(i))
                            setBufferElement(buffer, i, "");
                    } else
                        setBufferElement(buffer, i, getBufferElement(getActiveBufferTemplate().slice(), i, true));
                }
            }

            function setReTargetPlaceHolder(buffer, pos) {
                var testPos = determineTestPosition(pos);
                setBufferElement(buffer, pos, getBufferElement(getActiveBufferTemplate(), testPos));
            }

            function getPlaceHolder(pos) {
                return opts.placeholder.charAt(pos % opts.placeholder.length);
            }

            function checkVal(input, writeOut, strict, nptvl, intelliCheck) {
                var inputValue = nptvl != undefined ? nptvl.slice() : truncateInput(input._valueGet()).split('');

                $.each(masksets, function (ndx, ms) {
                    if (typeof (ms) == "object") {
                        ms["buffer"] = ms["_buffer"].slice();
                        ms["lastValidPosition"] = -1;
                        ms["p"] = -1;
                    }
                });
                if (strict !== true) activeMasksetIndex = 0;
                if (writeOut) input._valueSet(""); //initial clear
                var ml = getMaskLength();
                $.each(inputValue, function (ndx, charCode) {
                    if (intelliCheck === true) {
                        var p = getActiveMaskSet()["p"], lvp = p == -1 ? p : seekPrevious(p),
                            pos = lvp == -1 ? ndx : seekNext(lvp);
                        if ($.inArray(charCode, getActiveBufferTemplate().slice(lvp + 1, pos)) == -1) {
                            keypressEvent.call(input, undefined, true, charCode.charCodeAt(0), writeOut, strict, ndx);
                        }
                    } else {
                        keypressEvent.call(input, undefined, true, charCode.charCodeAt(0), writeOut, strict, ndx);
                    }
                });

                if (strict === true && getActiveMaskSet()["p"] != -1) {
                    getActiveMaskSet()["lastValidPosition"] = seekPrevious(getActiveMaskSet()["p"]);
                }
            }

            function escapeRegex(str) {
                return $.inputmask.escapeRegex.call(this, str);
            }

            function truncateInput(inputValue) {
                return inputValue.replace(new RegExp("(" + escapeRegex(getActiveBufferTemplate().join('')) + ")*$"), "");
            }

            function clearOptionalTail(input) {
                var buffer = getActiveBuffer(), tmpBuffer = buffer.slice(), testPos, pos;
                for (var pos = tmpBuffer.length - 1; pos >= 0; pos--) {
                    var testPos = determineTestPosition(pos);
                    if (getActiveTests()[testPos].optionality) {
                        if (!isMask(pos) || !isValid(pos, buffer[pos], true))
                            tmpBuffer.pop();
                        else break;
                    } else break;
                }
                writeBuffer(input, tmpBuffer);
            }

            function unmaskedvalue($input, skipDatepickerCheck) {
                if (getActiveTests() && (skipDatepickerCheck === true || !$input.hasClass('hasDatepicker'))) {
                    //checkVal(input, false, true);
                    var umValue = $.map(getActiveBuffer(), function (element, index) {
                        return isMask(index) && isValid(index, element, true) ? element : null;
                    });
                    var unmaskedValue = (isRTL ? umValue.reverse() : umValue).join('');
                    return opts.onUnMask != undefined ? opts.onUnMask.call(this, getActiveBuffer().join(''), unmaskedValue) : unmaskedValue;
                } else {
                    return $input[0]._valueGet();
                }
            }

            function TranslatePosition(pos) {
                if (isRTL && typeof pos == 'number' && (!opts.greedy || opts.placeholder != "")) {
                    var bffrLght = getActiveBuffer().length;
                    pos = bffrLght - pos;
                }
                return pos;
            }

            function caret(input, begin, end) {
                var npt = input.jquery && input.length > 0 ? input[0] : input, range;
                if (typeof begin == 'number') {
                    begin = TranslatePosition(begin);
                    end = TranslatePosition(end);
                    if (!$(input).is(':visible')) {
                        return;
                    }
                    end = (typeof end == 'number') ? end : begin;
                    npt.scrollLeft = npt.scrollWidth;
                    if (opts.insertMode == false && begin == end) end++; //set visualization for insert/overwrite mode
                    if (npt.setSelectionRange) {
                        npt.selectionStart = begin;
                        npt.selectionEnd = android ? begin : end;

                    } else if (npt.createTextRange) {
                        range = npt.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', begin);
                        range.select();
                    }
                } else {
                    if (!$(input).is(':visible')) {
                        return { "begin": 0, "end": 0 };
                    }
                    if (npt.setSelectionRange) {
                        begin = npt.selectionStart;
                        end = npt.selectionEnd;
                    } else if (document.selection && document.selection.createRange) {
                        range = document.selection.createRange();
                        begin = 0 - range.duplicate().moveStart('character', -100000);
                        end = begin + range.text.length;
                    }
                    begin = TranslatePosition(begin);
                    end = TranslatePosition(end);
                    return { "begin": begin, "end": end };
                }
            }

            function isComplete(buffer) { //return true / false / undefined (repeat *)
                if (opts.repeat == "*") return undefined;
                var complete = false, highestValidPosition = 0, currentActiveMasksetIndex = activeMasksetIndex;
                $.each(masksets, function (ndx, ms) {
                    if (typeof (ms) == "object") {
                        activeMasksetIndex = ndx;
                        var aml = seekPrevious(getMaskLength());
                        if (ms["lastValidPosition"] >= highestValidPosition && ms["lastValidPosition"] == aml) {
                            var msComplete = true;
                            for (var i = 0; i <= aml; i++) {
                                var mask = isMask(i), testPos = determineTestPosition(i);
                                if ((mask && (buffer[i] == undefined || buffer[i] == getPlaceHolder(i))) || (!mask && buffer[i] != getActiveBufferTemplate()[testPos])) {
                                    msComplete = false;
                                    break;
                                }
                            }
                            complete = complete || msComplete;
                            if (complete) //break loop
                                return false;
                        }
                        highestValidPosition = ms["lastValidPosition"];
                    }
                });
                activeMasksetIndex = currentActiveMasksetIndex; //reset activeMaskset
                return complete;
            }

            function isSelection(begin, end) {
                return isRTL ? (begin - end) > 1 || ((begin - end) == 1 && opts.insertMode) :
                    (end - begin) > 1 || ((end - begin) == 1 && opts.insertMode);
            }


            //private functions
            function installEventRuler(npt) {
                var events = $._data(npt).events;

                $.each(events, function (eventType, eventHandlers) {
                    $.each(eventHandlers, function (ndx, eventHandler) {
                        if (eventHandler.namespace == "inputmask") {
                            if (eventHandler.type != "setvalue") {
                                var handler = eventHandler.handler;
                                eventHandler.handler = function (e) {
                                    if (this.readOnly || this.disabled)
                                        e.preventDefault;
                                    else
                                        return handler.apply(this, arguments);
                                };
                            }
                        }
                    });
                });
            }

            function patchValueProperty(npt) {
                var valueProperty;
                if (Object.getOwnPropertyDescriptor)
                    valueProperty = Object.getOwnPropertyDescriptor(npt, "value");
                if (valueProperty && valueProperty.get) {
                    if (!npt._valueGet) {
                        var valueGet = valueProperty.get;
                        var valueSet = valueProperty.set;
                        npt._valueGet = function () {
                            return isRTL ? valueGet.call(this).split('').reverse().join('') : valueGet.call(this);
                        };
                        npt._valueSet = function (value) {
                            valueSet.call(this, isRTL ? value.split('').reverse().join('') : value);
                        };

                        Object.defineProperty(npt, "value", {
                            get: function () {
                                var $self = $(this), inputData = $(this).data('_inputmask'), masksets = inputData['masksets'],
                                    activeMasksetIndex = inputData['activeMasksetIndex'];
                                return inputData && inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : valueGet.call(this) != masksets[activeMasksetIndex]['_buffer'].join('') ? valueGet.call(this) : '';
                            },
                            set: function (value) {
                                valueSet.call(this, value);
                                $(this).triggerHandler('setvalue.inputmask');
                            }
                        });
                    }
                } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                    if (!npt._valueGet) {
                        var valueGet = npt.__lookupGetter__("value");
                        var valueSet = npt.__lookupSetter__("value");
                        npt._valueGet = function () {
                            return isRTL ? valueGet.call(this).split('').reverse().join('') : valueGet.call(this);
                        };
                        npt._valueSet = function (value) {
                            valueSet.call(this, isRTL ? value.split('').reverse().join('') : value);
                        };

                        npt.__defineGetter__("value", function () {
                            var $self = $(this), inputData = $(this).data('_inputmask'), masksets = inputData['masksets'],
                                activeMasksetIndex = inputData['activeMasksetIndex'];
                            return inputData && inputData['opts'].autoUnmask ? $self.inputmask('unmaskedvalue') : valueGet.call(this) != masksets[activeMasksetIndex]['_buffer'].join('') ? valueGet.call(this) : '';
                        });
                        npt.__defineSetter__("value", function (value) {
                            valueSet.call(this, value);
                            $(this).triggerHandler('setvalue.inputmask');
                        });
                    }
                } else {
                    if (!npt._valueGet) {
                        npt._valueGet = function () { return isRTL ? this.value.split('').reverse().join('') : this.value; };
                        npt._valueSet = function (value) { this.value = isRTL ? value.split('').reverse().join('') : value; };
                    }
                    if ($.valHooks.text == undefined || $.valHooks.text.inputmaskpatch != true) {
                        var valueGet = $.valHooks.text && $.valHooks.text.get ? $.valHooks.text.get : function (elem) { return elem.value; };
                        var valueSet = $.valHooks.text && $.valHooks.text.set ? $.valHooks.text.set : function (elem, value) {
                            elem.value = value;
                            return elem;
                        };

                        jQuery.extend($.valHooks, {
                            text: {
                                get: function (elem) {
                                    var $elem = $(elem);
                                    if ($elem.data('_inputmask')) {
                                        if ($elem.data('_inputmask')['opts'].autoUnmask)
                                            return $elem.inputmask('unmaskedvalue');
                                        else {
                                            var result = valueGet(elem),
                                                inputData = $elem.data('_inputmask'), masksets = inputData['masksets'],
                                                activeMasksetIndex = inputData['activeMasksetIndex'];
                                            return result != masksets[activeMasksetIndex]['_buffer'].join('') ? result : '';
                                        }
                                    } else return valueGet(elem);
                                },
                                set: function (elem, value) {
                                    var $elem = $(elem);
                                    var result = valueSet(elem, value);
                                    if ($elem.data('_inputmask')) $elem.triggerHandler('setvalue.inputmask');
                                    return result;
                                },
                                inputmaskpatch: true
                            }
                        });
                    }
                }
            }

            //shift chars to left from start to end and put c at end position if defined

            function shiftL(start, end, c, maskJumps) {
                var buffer = getActiveBuffer();
                if (maskJumps !== false) //jumping over nonmask position
                    while (!isMask(start) && start - 1 >= 0) start--;
                for (var i = start; i < end && i < getMaskLength() ; i++) {
                    if (isMask(i)) {
                        setReTargetPlaceHolder(buffer, i);
                        var j = seekNext(i);
                        var p = getBufferElement(buffer, j);
                        if (p != getPlaceHolder(j)) {
                            if (j < getMaskLength() && isValid(i, p, true) !== false && getActiveTests()[determineTestPosition(i)].def == getActiveTests()[determineTestPosition(j)].def) {
                                setBufferElement(buffer, i, p, true);
                            } else {
                                if (isMask(i))
                                    break;
                            }
                        }
                    } else {
                        setReTargetPlaceHolder(buffer, i);
                    }
                }
                if (c != undefined)
                    setBufferElement(buffer, seekPrevious(end), c);

                if (getActiveMaskSet()["greedy"] == false) {
                    var trbuffer = truncateInput(buffer.join('')).split('');
                    buffer.length = trbuffer.length;
                    for (var i = 0, bl = buffer.length; i < bl; i++) {
                        buffer[i] = trbuffer[i];
                    }
                    if (buffer.length == 0) getActiveMaskSet()["buffer"] = getActiveBufferTemplate().slice();
                }
                return start; //return the used start position
            }

            function shiftR(start, end, c) {
                var buffer = getActiveBuffer();
                if (getBufferElement(buffer, start, true) != getPlaceHolder(start)) {
                    for (var i = seekPrevious(end) ; i > start && i >= 0; i--) {
                        if (isMask(i)) {
                            var j = seekPrevious(i);
                            var t = getBufferElement(buffer, j);
                            if (t != getPlaceHolder(j)) {
                                if (isValid(j, t, true) !== false && getActiveTests()[determineTestPosition(i)].def == getActiveTests()[determineTestPosition(j)].def) {
                                    setBufferElement(buffer, i, t, true);
                                    setReTargetPlaceHolder(buffer, j);
                                } //else break;
                            }
                        } else
                            setReTargetPlaceHolder(buffer, i);
                    }
                }
                if (c != undefined && getBufferElement(buffer, start) == getPlaceHolder(start))
                    setBufferElement(buffer, start, c);
                var lengthBefore = buffer.length;
                if (getActiveMaskSet()["greedy"] == false) {
                    var trbuffer = truncateInput(buffer.join('')).split('');
                    buffer.length = trbuffer.length;
                    for (var i = 0, bl = buffer.length; i < bl; i++) {
                        buffer[i] = trbuffer[i];
                    }
                    if (buffer.length == 0) getActiveMaskSet()["buffer"] = getActiveBufferTemplate().slice();
                }
                return end - (lengthBefore - buffer.length); //return new start position
            }

            function HandleRemove(input, k, pos) {
                if (opts.numericInput || isRTL) {
                    switch (k) {
                        case opts.keyCode.BACKSPACE:
                            k = opts.keyCode.DELETE;
                            break;
                        case opts.keyCode.DELETE:
                            k = opts.keyCode.BACKSPACE;
                            break;
                    }
                    if (isRTL) {
                        var pend = pos.end;
                        pos.end = pos.begin;
                        pos.begin = pend;
                    }
                }

                var isSelection = true;
                if (pos.begin == pos.end) {
                    var posBegin = k == opts.keyCode.BACKSPACE ? pos.begin - 1 : pos.begin;
                    if (opts.isNumeric && opts.radixPoint != "" && getActiveBuffer()[posBegin] == opts.radixPoint) {
                        pos.begin = (getActiveBuffer().length - 1 == posBegin) /* radixPoint is latest? delete it */ ? pos.begin : k == opts.keyCode.BACKSPACE ? posBegin : seekNext(posBegin);
                        pos.end = pos.begin;
                    }
                    isSelection = false;
                    if (k == opts.keyCode.BACKSPACE)
                        pos.begin--;
                    else if (k == opts.keyCode.DELETE)
                        pos.end++;
                } else if (pos.end - pos.begin == 1 && !opts.insertMode) {
                    isSelection = false;
                    if (k == opts.keyCode.BACKSPACE)
                        pos.begin--;
                }

                clearBuffer(getActiveBuffer(), pos.begin, pos.end);

                var ml = getMaskLength();
                if (opts.greedy == false) {
                    shiftL(pos.begin, ml, undefined, !isRTL && (k == opts.keyCode.BACKSPACE && !isSelection));
                } else {
                    var newpos = pos.begin;
                    for (var i = pos.begin; i < pos.end; i++) { //seeknext to skip placeholders at start in selection
                        if (isMask(i) || !isSelection)
                            newpos = shiftL(pos.begin, ml, undefined, !isRTL && (k == opts.keyCode.BACKSPACE && !isSelection));
                    }
                    if (!isSelection) pos.begin = newpos;
                }
                var firstMaskPos = seekNext(-1);
                clearBuffer(getActiveBuffer(), pos.begin, pos.end, true);
                checkVal(input, false, masksets[1] == undefined || firstMaskPos >= pos.end, getActiveBuffer());
                if (getActiveMaskSet()['lastValidPosition'] < firstMaskPos) {
                    getActiveMaskSet()["lastValidPosition"] = -1;
                    getActiveMaskSet()["p"] = firstMaskPos;
                } else {
                    getActiveMaskSet()["p"] = pos.begin;
                }
            }

            function keydownEvent(e) {
                //Safari 5.1.x - modal dialog fires keypress twice workaround
                skipKeyPressEvent = false;
                var input = this, $input = $(input), k = e.keyCode, pos = caret(input);

                //backspace, delete, and escape get special treatment
                if (k == opts.keyCode.BACKSPACE || k == opts.keyCode.DELETE || (iphone && k == 127) || e.ctrlKey && k == 88) { //backspace/delete
                    e.preventDefault(); //stop default action but allow propagation
                    if (k == 88) valueOnFocus = getActiveBuffer().join('');
                    HandleRemove(input, k, pos);
                    determineActiveMasksetIndex();
                    writeBuffer(input, getActiveBuffer(), getActiveMaskSet()["p"]);
                    if (input._valueGet() == getActiveBufferTemplate().join(''))
                        $input.trigger('cleared');

                    if (opts.showTooltip) { //update tooltip
                        $input.prop("title", getActiveMaskSet()["mask"]);
                    }
                } else if (k == opts.keyCode.END || k == opts.keyCode.PAGE_DOWN) { //when END or PAGE_DOWN pressed set position at lastmatch
                    setTimeout(function () {
                        var caretPos = seekNext(getActiveMaskSet()["lastValidPosition"]);
                        if (!opts.insertMode && caretPos == getMaskLength() && !e.shiftKey) caretPos--;
                        caret(input, e.shiftKey ? pos.begin : caretPos, caretPos);
                    }, 0);
                } else if ((k == opts.keyCode.HOME && !e.shiftKey) || k == opts.keyCode.PAGE_UP) { //Home or page_up
                    caret(input, 0, e.shiftKey ? pos.begin : 0);
                } else if (k == opts.keyCode.ESCAPE || (k == 90 && e.ctrlKey)) { //escape && undo
                    checkVal(input, true, false, valueOnFocus.split(''));
                    $input.click();
                } else if (k == opts.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) { //insert
                    opts.insertMode = !opts.insertMode;
                    caret(input, !opts.insertMode && pos.begin == getMaskLength() ? pos.begin - 1 : pos.begin);
                } else if (opts.insertMode == false && !e.shiftKey) {
                    if (k == opts.keyCode.RIGHT) {
                        setTimeout(function () {
                            var caretPos = caret(input);
                            caret(input, caretPos.begin);
                        }, 0);
                    } else if (k == opts.keyCode.LEFT) {
                        setTimeout(function () {
                            var caretPos = caret(input);
                            caret(input, caretPos.begin - 1);
                        }, 0);
                    }
                }

                var currentCaretPos = caret(input);
                if (opts.onKeyDown.call(this, e, getActiveBuffer(), opts) === true) //extra stuff to execute on keydown
                    caret(input, currentCaretPos.begin, currentCaretPos.end);
                ignorable = $.inArray(k, opts.ignorables) != -1;
            }


            function keypressEvent(e, checkval, k, writeOut, strict, ndx) {
                //Safari 5.1.x - modal dialog fires keypress twice workaround
                if (k == undefined && skipKeyPressEvent) return false;
                skipKeyPressEvent = true;

                var input = this, $input = $(input);

                e = e || window.event;
                var k = checkval ? k : (e.which || e.charCode || e.keyCode);

                if (checkval !== true && (!(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable))) {
                    return true;
                } else {
                    if (k) {
                        //special treat the decimal separator
                        if (checkval !== true && k == 46 && e.shiftKey == false && opts.radixPoint == ",") k = 44;

                        var pos, results, result, c = String.fromCharCode(k);
                        if (checkval) {
                            var pcaret = strict ? ndx : getActiveMaskSet()["lastValidPosition"] + 1;
                            pos = { begin: pcaret, end: pcaret };
                        } else {
                            pos = caret(input);
                        }

                        //should we clear a possible selection??
                        var isSlctn = isSelection(pos.begin, pos.end), redetermineLVP = false,
                            initialIndex = activeMasksetIndex;
                        if (isSlctn) {
                            activeMasksetIndex = initialIndex;
                            $.each(masksets, function (ndx, lmnt) { //init undobuffer for recovery when not valid
                                if (typeof (lmnt) == "object") {
                                    activeMasksetIndex = ndx;
                                    getActiveMaskSet()["undoBuffer"] = getActiveBuffer().join('');
                                }
                            });
                            HandleRemove(input, opts.keyCode.DELETE, pos);
                            if (!opts.insertMode) { //preserve some space
                                $.each(masksets, function (ndx, lmnt) {
                                    if (typeof (lmnt) == "object") {
                                        activeMasksetIndex = ndx;
                                        shiftR(pos.begin, getMaskLength());
                                        getActiveMaskSet()["lastValidPosition"] = seekNext(getActiveMaskSet()["lastValidPosition"]);
                                    }
                                });
                            }
                            activeMasksetIndex = initialIndex; //restore index
                        }

                        var radixPosition = getActiveBuffer().join('').indexOf(opts.radixPoint);
                        if (opts.isNumeric && checkval !== true && radixPosition != -1) {
                            if (opts.greedy && pos.begin <= radixPosition) {
                                pos.begin = seekPrevious(pos.begin);
                                pos.end = pos.begin;
                            } else if (c == opts.radixPoint) {
                                pos.begin = radixPosition;
                                pos.end = pos.begin;
                            }
                        }


                        var p = pos.begin;
                        results = isValid(p, c, strict);
                        if (strict === true) results = [{ "activeMasksetIndex": activeMasksetIndex, "result": results }];
                        var minimalForwardPosition = -1;
                        $.each(results, function (index, result) {
                            activeMasksetIndex = result["activeMasksetIndex"];
                            getActiveMaskSet()["writeOutBuffer"] = true;
                            var np = result["result"];
                            if (np !== false) {
                                var refresh = false, buffer = getActiveBuffer();
                                if (np !== true) {
                                    refresh = np["refresh"]; //only rewrite buffer from isValid
                                    p = np.pos != undefined ? np.pos : p; //set new position from isValid
                                    c = np.c != undefined ? np.c : c; //set new char from isValid
                                }
                                if (refresh !== true) {
                                    if (opts.insertMode == true) {
                                        var lastUnmaskedPosition = getMaskLength();
                                        var bfrClone = buffer.slice();
                                        while (getBufferElement(bfrClone, lastUnmaskedPosition, true) != getPlaceHolder(lastUnmaskedPosition) && lastUnmaskedPosition >= p) {
                                            lastUnmaskedPosition = lastUnmaskedPosition == 0 ? -1 : seekPrevious(lastUnmaskedPosition);
                                        }
                                        if (lastUnmaskedPosition >= p) {
                                            shiftR(p, getMaskLength(), c);
                                            //shift the lvp if needed
                                            var lvp = getActiveMaskSet()["lastValidPosition"], nlvp = seekNext(lvp);
                                            if (nlvp != getMaskLength() && lvp >= p && (getBufferElement(getActiveBuffer(), nlvp, true) != getPlaceHolder(nlvp))) {
                                                getActiveMaskSet()["lastValidPosition"] = nlvp;
                                            }
                                        } else getActiveMaskSet()["writeOutBuffer"] = false;
                                    } else setBufferElement(buffer, p, c, true);
                                    if (minimalForwardPosition == -1 || minimalForwardPosition > seekNext(p)) {
                                        minimalForwardPosition = seekNext(p);
                                    }
                                } else if (!strict) {
                                    var nextPos = p < getMaskLength() ? p + 1 : p;
                                    if (minimalForwardPosition == -1 || minimalForwardPosition > nextPos) {
                                        minimalForwardPosition = nextPos;
                                    }
                                }
                                if (minimalForwardPosition > getActiveMaskSet()["p"])
                                    getActiveMaskSet()["p"] = minimalForwardPosition; //needed for checkval strict 
                            }
                        });

                        if (strict !== true) {
                            activeMasksetIndex = initialIndex;
                            determineActiveMasksetIndex();
                        }
                        if (writeOut !== false) {
                            $.each(results, function (ndx, rslt) {
                                if (rslt["activeMasksetIndex"] == activeMasksetIndex) {
                                    result = rslt;
                                    return false;
                                }
                            });
                            if (result != undefined) {
                                var self = this;
                                setTimeout(function () { opts.onKeyValidation.call(self, result["result"], opts); }, 0);
                                if (getActiveMaskSet()["writeOutBuffer"] && result["result"] !== false) {
                                    var buffer = getActiveBuffer();

                                    var newCaretPosition;
                                    if (checkval) {
                                        newCaretPosition = undefined;
                                    } else if (opts.numericInput) {
                                        if (p > radixPosition) {
                                            newCaretPosition = seekPrevious(minimalForwardPosition);
                                        } else if (c == opts.radixPoint) {
                                            newCaretPosition = minimalForwardPosition - 1;
                                        } else newCaretPosition = seekPrevious(minimalForwardPosition - 1);
                                    } else {
                                        newCaretPosition = minimalForwardPosition;
                                    }

                                    writeBuffer(input, buffer, newCaretPosition);
                                    if (checkval !== true) {
                                        setTimeout(function () { //timeout needed for IE
                                            if (isComplete(buffer) === true)
                                                $input.trigger("complete");
                                            skipInputEvent = true;
                                            $input.trigger("input");
                                        }, 0);
                                    }
                                } else if (isSlctn) {
                                    getActiveMaskSet()["buffer"] = getActiveMaskSet()["undoBuffer"].split('');
                                }
                            }
                        }

                        if (opts.showTooltip) { //update tooltip
                            $input.prop("title", getActiveMaskSet()["mask"]);
                        }

                        //needed for IE8 and below
                        if (e) e.preventDefault ? e.preventDefault() : e.returnValue = false;
                    }
                }
            }

            function keyupEvent(e) {
                var $input = $(this), input = this, k = e.keyCode, buffer = getActiveBuffer();

                if (androidchrome && k == opts.keyCode.BACKSPACE) {
                    if (chromeValueOnInput == input._valueGet())
                        keydownEvent.call(this, e);
                }

                opts.onKeyUp.call(this, e, buffer, opts); //extra stuff to execute on keyup
                if (k == opts.keyCode.TAB && opts.showMaskOnFocus) {
                    if ($input.hasClass('focus.inputmask') && input._valueGet().length == 0) {
                        buffer = getActiveBufferTemplate().slice();
                        writeBuffer(input, buffer);
                        caret(input, 0);
                        valueOnFocus = getActiveBuffer().join('');
                    } else {
                        writeBuffer(input, buffer);
                        if (buffer.join('') == getActiveBufferTemplate().join('') && $.inArray(opts.radixPoint, buffer) != -1) {
                            caret(input, TranslatePosition(0));
                            $input.click();
                        } else
                            caret(input, TranslatePosition(0), TranslatePosition(getMaskLength()));
                    }
                }
            }

            function inputEvent(e) {
                if (skipInputEvent === true) {
                    skipInputEvent = false;
                    return true;
                }
                var input = this, $input = $(input);

                chromeValueOnInput = getActiveBuffer().join('');
                checkVal(input, false, false);
                writeBuffer(input, getActiveBuffer());
                if (isComplete(getActiveBuffer()) === true)
                    $input.trigger("complete");
                $input.click();
            }

            function mask(el) {
                $el = $(el);
                if ($el.is(":input")) {
                    //store tests & original buffer in the input element - used to get the unmasked value
                    $el.data('_inputmask', {
                        'masksets': masksets,
                        'activeMasksetIndex': activeMasksetIndex,
                        'opts': opts,
                        'isRTL': false
                    });

                    //show tooltip
                    if (opts.showTooltip) {
                        $el.prop("title", getActiveMaskSet()["mask"]);
                    }

                    //correct greedy setting if needed
                    getActiveMaskSet()['greedy'] = getActiveMaskSet()['greedy'] ? getActiveMaskSet()['greedy'] : getActiveMaskSet()['repeat'] == 0;

                    //handle maxlength attribute
                    if ($el.attr("maxLength") != null) //only when the attribute is set
                    {
                        var maxLength = $el.prop('maxLength');
                        if (maxLength > -1) { //handle *-repeat
                            $.each(masksets, function (ndx, ms) {
                                if (typeof (ms) == "object") {
                                    if (ms["repeat"] == "*") {
                                        ms["repeat"] = maxLength;
                                    }
                                }
                            });
                        }
                        if (getMaskLength() >= maxLength && maxLength > -1) { //FF sets no defined max length to -1 
                            if (maxLength < getActiveBufferTemplate().length) getActiveBufferTemplate().length = maxLength;
                            if (getActiveMaskSet()['greedy'] == false) {
                                getActiveMaskSet()['repeat'] = Math.round(maxLength / getActiveBufferTemplate().length);
                            }
                            $el.prop('maxLength', getMaskLength() * 2);
                        }
                    }

                    patchValueProperty(el);

                    if (opts.numericInput) opts.isNumeric = opts.numericInput;
                    if (el.dir == "rtl" || (opts.numericInput && opts.rightAlignNumerics) || (opts.isNumeric && opts.rightAlignNumerics))
                        $el.css("text-align", "right");

                    if (el.dir == "rtl" || opts.numericInput) {
                        el.dir = "ltr";
                        $el.removeAttr("dir");
                        var inputData = $el.data('_inputmask');
                        inputData['isRTL'] = true;
                        $el.data('_inputmask', inputData);
                        isRTL = true;
                    }

                    //unbind all events - to make sure that no other mask will interfere when re-masking
                    $el.unbind(".inputmask");
                    $el.removeClass('focus.inputmask');
                    //bind events
                    $el.closest('form').bind("submit", function () { //trigger change on submit if any
                        if (valueOnFocus != getActiveBuffer().join('')) {
                            $el.change();
                        }
                    }).bind('reset', function () {
                        setTimeout(function () {
                            $el.trigger("setvalue");
                        }, 0);
                    });
                    $el.bind("mouseenter.inputmask", function () {
                        var $input = $(this), input = this;
                        if (!$input.hasClass('focus.inputmask') && opts.showMaskOnHover) {
                            if (input._valueGet() != getActiveBuffer().join('')) {
                                writeBuffer(input, getActiveBuffer());
                            }
                        }
                    }).bind("blur.inputmask", function () {
                        var $input = $(this), input = this, nptValue = input._valueGet(), buffer = getActiveBuffer();
                        $input.removeClass('focus.inputmask');
                        if (valueOnFocus != getActiveBuffer().join('')) {
                            $input.change();
                        }
                        if (opts.clearMaskOnLostFocus && nptValue != '') {
                            if (nptValue == getActiveBufferTemplate().join(''))
                                input._valueSet('');
                            else { //clearout optional tail of the mask
                                clearOptionalTail(input);
                            }
                        }
                        if (isComplete(buffer) === false) {
                            $input.trigger("incomplete");
                            if (opts.clearIncomplete) {
                                $.each(masksets, function (ndx, ms) {
                                    if (typeof (ms) == "object") {
                                        ms["buffer"] = ms["_buffer"].slice();
                                        ms["lastValidPosition"] = -1;
                                    }
                                });
                                activeMasksetIndex = 0;
                                if (opts.clearMaskOnLostFocus)
                                    input._valueSet('');
                                else {
                                    buffer = getActiveBufferTemplate().slice();
                                    writeBuffer(input, buffer);
                                }
                            }
                        }
                    }).bind("focus.inputmask", function () {
                        var $input = $(this), input = this, nptValue = input._valueGet();
                        if (opts.showMaskOnFocus && !$input.hasClass('focus.inputmask') && (!opts.showMaskOnHover || (opts.showMaskOnHover && nptValue == ''))) {
                            if (input._valueGet() != getActiveBuffer().join('')) {
                                writeBuffer(input, getActiveBuffer(), seekNext(getActiveMaskSet()["lastValidPosition"]));
                            }
                        }
                        $input.addClass('focus.inputmask');
                        valueOnFocus = getActiveBuffer().join('');
                    }).bind("mouseleave.inputmask", function () {
                        var $input = $(this), input = this;
                        if (opts.clearMaskOnLostFocus) {
                            if (!$input.hasClass('focus.inputmask') && input._valueGet() != $input.attr("placeholder")) {
                                if (input._valueGet() == getActiveBufferTemplate().join('') || input._valueGet() == '')
                                    input._valueSet('');
                                else { //clearout optional tail of the mask
                                    clearOptionalTail(input);
                                }
                            }
                        }
                    }).bind("click.inputmask", function () {
                        var input = this;
                        setTimeout(function () {
                            var selectedCaret = caret(input), buffer = getActiveBuffer();
                            if (selectedCaret.begin == selectedCaret.end) {
                                var clickPosition = isRTL ? TranslatePosition(selectedCaret.begin) : selectedCaret.begin,
                                    lvp = getActiveMaskSet()["lastValidPosition"],
                                    lastPosition;
                                if (opts.isNumeric) {
                                    lastPosition = opts.skipRadixDance === false && opts.radixPoint != "" && $.inArray(opts.radixPoint, buffer) != -1 ?
                                        (opts.numericInput ? seekNext($.inArray(opts.radixPoint, buffer)) : $.inArray(opts.radixPoint, buffer)) :
                                        seekNext(lvp);
                                } else {
                                    lastPosition = seekNext(lvp);
                                }
                                if (clickPosition < lastPosition) {
                                    if (isMask(clickPosition))
                                        caret(input, clickPosition);
                                    else caret(input, seekNext(clickPosition));
                                } else
                                    caret(input, lastPosition);
                            }
                        }, 0);
                    }).bind('dblclick.inputmask', function () {
                        var input = this;
                        setTimeout(function () {
                            caret(input, 0, seekNext(getActiveMaskSet()["lastValidPosition"]));
                        }, 0);
                    }).bind(pasteEvent + ".inputmask dragdrop.inputmask drop.inputmask", function (e) {
                        if (skipInputEvent === true) {
                            skipInputEvent = false;
                            return true;
                        }
                        var input = this, $input = $(input);

                        //paste event for IE8 and lower I guess ;-)
                        if (e.type == "propertychange" && input._valueGet().length <= getMaskLength()) {
                            return true;
                        }
                        setTimeout(function () {
                            var pasteValue = opts.onBeforePaste != undefined ? opts.onBeforePaste.call(this, input._valueGet()) : input._valueGet();
                            checkVal(input, true, false, pasteValue.split(''), true);
                            if (isComplete(getActiveBuffer()) === true)
                                $input.trigger("complete");
                            $input.click();
                        }, 0);
                    }).bind('setvalue.inputmask', function () {
                        var input = this;
                        checkVal(input, true);
                        valueOnFocus = getActiveBuffer().join('');
                        if (input._valueGet() == getActiveBufferTemplate().join(''))
                            input._valueSet('');
                    }).bind('complete.inputmask', opts.oncomplete
                    ).bind('incomplete.inputmask', opts.onincomplete
                    ).bind('cleared.inputmask', opts.oncleared
                    ).bind("keyup.inputmask", keyupEvent);

                    if (androidchrome) {
                        $el.bind("input.inputmask", inputEvent);
                    } else {
                        $el.bind("keydown.inputmask", keydownEvent
                        ).bind("keypress.inputmask", keypressEvent);
                    }

                    if (msie10)
                        $el.bind("input.inputmask", inputEvent);

                    //apply mask
                    checkVal(el, true, false);
                    valueOnFocus = getActiveBuffer().join('');
                    // Wrap document.activeElement in a try/catch block since IE9 throw "Unspecified error" if document.activeElement is undefined when we are in an IFrame.
                    var activeElement;
                    try {
                        activeElement = document.activeElement;
                    } catch (e) {
                    }
                    if (activeElement === el) { //position the caret when in focus
                        $el.addClass('focus.inputmask');
                        caret(el, seekNext(getActiveMaskSet()["lastValidPosition"]));
                    } else if (opts.clearMaskOnLostFocus) {
                        if (getActiveBuffer().join('') == getActiveBufferTemplate().join('')) {
                            el._valueSet('');
                        } else {
                            clearOptionalTail(el);
                        }
                    } else {
                        writeBuffer(el, getActiveBuffer());
                    }

                    installEventRuler(el);
                }
            }

            //action object
            if (actionObj != undefined) {
                switch (actionObj["action"]) {
                    case "isComplete":
                        return isComplete(actionObj["buffer"]);
                    case "unmaskedvalue":
                        isRTL = actionObj["$input"].data('_inputmask')['isRTL'];
                        return unmaskedvalue(actionObj["$input"], actionObj["skipDatepickerCheck"]);
                    case "mask":
                        mask(actionObj["el"]);
                        break;
                    case "format":
                        $el = $({});
                        $el.data('_inputmask', {
                            'masksets': masksets,
                            'activeMasksetIndex': activeMasksetIndex,
                            'opts': opts,
                            'isRTL': opts.numericInput
                        });
                        if (opts.numericInput) {
                            opts.isNumeric = opts.numericInput;
                            isRTL = true;
                        }

                        checkVal($el, false, false, actionObj["value"].split(''), true);
                        return getActiveBuffer().join('');
                }
            }
        }
        $.inputmask = {
            //options default
            defaults: {
                placeholder: "_",
                optionalmarker: { start: "[", end: "]" },
                quantifiermarker: { start: "{", end: "}" },
                groupmarker: { start: "(", end: ")" },
                escapeChar: "\\",
                mask: null,
                oncomplete: $.noop, //executes when the mask is complete
                onincomplete: $.noop, //executes when the mask is incomplete and focus is lost
                oncleared: $.noop, //executes when the mask is cleared
                repeat: 0, //repetitions of the mask: * ~ forever, otherwise specify an integer
                greedy: true, //true: allocated buffer for the mask and repetitions - false: allocate only if needed
                autoUnmask: false, //automatically unmask when retrieving the value with $.fn.val or value if the browser supports __lookupGetter__ or getOwnPropertyDescriptor
                clearMaskOnLostFocus: true,
                insertMode: true, //insert the input or overwrite the input
                clearIncomplete: false, //clear the incomplete input on blur
                aliases: {}, //aliases definitions => see jquery.inputmask.extensions.js
                onKeyUp: $.noop, //override to implement autocomplete on certain keys for example
                onKeyDown: $.noop, //override to implement autocomplete on certain keys for example
                onBeforePaste: undefined, //executes before masking the pasted value to allow preprocessing of the pasted value.  args => pastedValue => return processedValue
                onUnMask: undefined, //executes after unmasking to allow postprocessing of the unmaskedvalue.  args => maskedValue, unmaskedValue
                showMaskOnFocus: true, //show the mask-placeholder when the input has focus
                showMaskOnHover: true, //show the mask-placeholder when hovering the empty input
                onKeyValidation: $.noop, //executes on every key-press with the result of isValid. Params: result, opts
                skipOptionalPartCharacter: " ", //a character which can be used to skip an optional part of a mask
                showTooltip: false, //show the activemask as tooltip
                numericInput: false, //numericInput input direction style (input shifts to the left while holding the caret position)
                //numeric basic properties
                isNumeric: false, //enable numeric features
                radixPoint: "", //".", // | ","
                skipRadixDance: false, //disable radixpoint caret positioning
                rightAlignNumerics: true, //align numerics to the right
                //numeric basic properties
                definitions: {
                    '9': {
                        validator: "[0-9]",
                        cardinality: 1
                    },
                    'a': {
                        validator: "[A-Za-z\u0410-\u044F\u0401\u0451]",
                        cardinality: 1
                    },
                    '*': {
                        validator: "[A-Za-z\u0410-\u044F\u0401\u04510-9]",
                        cardinality: 1
                    }
                },
                keyCode: {
                    ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108,
                    NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91
                },
                //specify keycodes which should not be considered in the keypress event, otherwise the preventDefault will stop their default behavior especially in FF
                ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
                getMaskLength: function (buffer, greedy, repeat, currentBuffer, opts) {
                    var calculatedLength = buffer.length;
                    if (!greedy) {
                        if (repeat == "*") {
                            calculatedLength = currentBuffer.length + 1;
                        } else if (repeat > 1) {
                            calculatedLength += (buffer.length * (repeat - 1));
                        }
                    }
                    return calculatedLength;
                }
            },
            escapeRegex: function (str) {
                var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
                return str.replace(new RegExp('(\\' + specials.join('|\\') + ')', 'gim'), '\\$1');
            },
            format: function (value, options) {
                var opts = $.extend(true, {}, $.inputmask.defaults, options);
                resolveAlias(opts.alias, options, opts);
                return maskScope(generateMaskSets(opts), 0, opts, { "action": "format", "value": value });
            }
        };

        $.fn.inputmask = function (fn, options) {
            var opts = $.extend(true, {}, $.inputmask.defaults, options),
                masksets,
                activeMasksetIndex = 0;

            if (typeof fn === "string") {
                switch (fn) {
                    case "mask":
                        //resolve possible aliases given by options
                        resolveAlias(opts.alias, options, opts);
                        masksets = generateMaskSets(opts);
                        if (masksets.length == 0) { return this; }

                        return this.each(function () {
                            maskScope($.extend(true, {}, masksets), 0, opts, { "action": "mask", "el": this });
                        });
                    case "unmaskedvalue":
                        var $input = $(this), input = this;
                        if ($input.data('_inputmask')) {
                            masksets = $input.data('_inputmask')['masksets'];
                            activeMasksetIndex = $input.data('_inputmask')['activeMasksetIndex'];
                            opts = $input.data('_inputmask')['opts'];
                            return maskScope(masksets, activeMasksetIndex, opts, { "action": "unmaskedvalue", "$input": $input });
                        } else return $input.val();
                    case "remove":
                        return this.each(function () {
                            var $input = $(this), input = this;
                            if ($input.data('_inputmask')) {
                                masksets = $input.data('_inputmask')['masksets'];
                                activeMasksetIndex = $input.data('_inputmask')['activeMasksetIndex'];
                                opts = $input.data('_inputmask')['opts'];
                                //writeout the unmaskedvalue
                                input._valueSet(maskScope(masksets, activeMasksetIndex, opts, { "action": "unmaskedvalue", "$input": $input, "skipDatepickerCheck": true }));
                                //clear data
                                $input.removeData('_inputmask');
                                //unbind all events
                                $input.unbind(".inputmask");
                                $input.removeClass('focus.inputmask');
                                //restore the value property
                                var valueProperty;
                                if (Object.getOwnPropertyDescriptor)
                                    valueProperty = Object.getOwnPropertyDescriptor(input, "value");
                                if (valueProperty && valueProperty.get) {
                                    if (input._valueGet) {
                                        Object.defineProperty(input, "value", {
                                            get: input._valueGet,
                                            set: input._valueSet
                                        });
                                    }
                                } else if (document.__lookupGetter__ && input.__lookupGetter__("value")) {
                                    if (input._valueGet) {
                                        input.__defineGetter__("value", input._valueGet);
                                        input.__defineSetter__("value", input._valueSet);
                                    }
                                }
                                try { //try catch needed for IE7 as it does not supports deleting fns
                                    delete input._valueGet;
                                    delete input._valueSet;
                                } catch (e) {
                                    input._valueGet = undefined;
                                    input._valueSet = undefined;

                                }
                            }
                        });
                        break;
                    case "getemptymask": //return the default (empty) mask value, usefull for setting the default value in validation
                        if (this.data('_inputmask')) {
                            masksets = this.data('_inputmask')['masksets'];
                            activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
                            return masksets[activeMasksetIndex]['_buffer'].join('');
                        }
                        else return "";
                    case "hasMaskedValue": //check wheter the returned value is masked or not; currently only works reliable when using jquery.val fn to retrieve the value 
                        return this.data('_inputmask') ? !this.data('_inputmask')['opts'].autoUnmask : false;
                    case "isComplete":
                        masksets = this.data('_inputmask')['masksets'];
                        activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
                        opts = this.data('_inputmask')['opts'];
                        return maskScope(masksets, activeMasksetIndex, opts, { "action": "isComplete", "buffer": this[0]._valueGet().split('') });
                    case "getmetadata": //return mask metadata if exists
                        if (this.data('_inputmask')) {
                            masksets = this.data('_inputmask')['masksets'];
                            activeMasksetIndex = this.data('_inputmask')['activeMasksetIndex'];
                            return masksets[activeMasksetIndex]['metadata'];
                        }
                        else return undefined;
                    default:
                        //check if the fn is an alias
                        if (!resolveAlias(fn, options, opts)) {
                            //maybe fn is a mask so we try
                            //set mask
                            opts.mask = fn;
                        }
                        masksets = generateMaskSets(opts);
                        if (masksets.length == 0) { return this; }
                        return this.each(function () {
                            maskScope($.extend(true, {}, masksets), activeMasksetIndex, opts, { "action": "mask", "el": this });
                        });

                        break;
                }
            } else if (typeof fn == "object") {
                opts = $.extend(true, {}, $.inputmask.defaults, fn);

                resolveAlias(opts.alias, fn, opts); //resolve aliases
                masksets = generateMaskSets(opts);
                if (masksets.length == 0) { return this; }
                return this.each(function () {
                    maskScope($.extend(true, {}, masksets), activeMasksetIndex, opts, { "action": "mask", "el": this });
                });
            } else if (fn == undefined) {
                //look for data-inputmask atribute - the attribute should only contain optipns
                return this.each(function () {
                    var attrOptions = $(this).attr("data-inputmask");
                    if (attrOptions && attrOptions != "") {
                        try {
                            attrOptions = attrOptions.replace(new RegExp("'", "g"), '"');
                            var dataoptions = $.parseJSON("{" + attrOptions + "}");
                            $.extend(true, dataoptions, options);
                            opts = $.extend(true, {}, $.inputmask.defaults, dataoptions);
                            resolveAlias(opts.alias, dataoptions, opts);
                            opts.alias = undefined;
                            $(this).inputmask(opts);
                        } catch (ex) { } //need a more relax parseJSON
                    }
                });
            }
        };
    }
})(jQuery);

/*! iCheck v1.0.1 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
(function(h){function F(a,b,d){var c=a[0],e=/er/.test(d)?m:/bl/.test(d)?s:l,f=d==H?{checked:c[l],disabled:c[s],indeterminate:"true"==a.attr(m)||"false"==a.attr(w)}:c[e];if(/^(ch|di|in)/.test(d)&&!f)D(a,e);else if(/^(un|en|de)/.test(d)&&f)t(a,e);else if(d==H)for(e in f)f[e]?D(a,e,!0):t(a,e,!0);else if(!b||"toggle"==d){if(!b)a[p]("ifClicked");f?c[n]!==u&&t(a,e):D(a,e)}}function D(a,b,d){var c=a[0],e=a.parent(),f=b==l,A=b==m,B=b==s,K=A?w:f?E:"enabled",p=k(a,K+x(c[n])),N=k(a,b+x(c[n]));if(!0!==c[b]){if(!d&&
b==l&&c[n]==u&&c.name){var C=a.closest("form"),r='input[name="'+c.name+'"]',r=C.length?C.find(r):h(r);r.each(function(){this!==c&&h(this).data(q)&&t(h(this),b)})}A?(c[b]=!0,c[l]&&t(a,l,"force")):(d||(c[b]=!0),f&&c[m]&&t(a,m,!1));L(a,f,b,d)}c[s]&&k(a,y,!0)&&e.find("."+I).css(y,"default");e[v](N||k(a,b)||"");B?e.attr("aria-disabled","true"):e.attr("aria-checked",A?"mixed":"true");e[z](p||k(a,K)||"")}function t(a,b,d){var c=a[0],e=a.parent(),f=b==l,h=b==m,q=b==s,p=h?w:f?E:"enabled",t=k(a,p+x(c[n])),
u=k(a,b+x(c[n]));if(!1!==c[b]){if(h||!d||"force"==d)c[b]=!1;L(a,f,p,d)}!c[s]&&k(a,y,!0)&&e.find("."+I).css(y,"pointer");e[z](u||k(a,b)||"");q?e.attr("aria-disabled","false"):e.attr("aria-checked","false");e[v](t||k(a,p)||"")}function M(a,b){if(a.data(q)){a.parent().html(a.attr("style",a.data(q).s||""));if(b)a[p](b);a.off(".i").unwrap();h(G+'[for="'+a[0].id+'"]').add(a.closest(G)).off(".i")}}function k(a,b,d){if(a.data(q))return a.data(q).o[b+(d?"":"Class")]}function x(a){return a.charAt(0).toUpperCase()+
a.slice(1)}function L(a,b,d,c){if(!c){if(b)a[p]("ifToggled");a[p]("ifChanged")[p]("if"+x(d))}}var q="iCheck",I=q+"-helper",u="radio",l="checked",E="un"+l,s="disabled",w="determinate",m="in"+w,H="update",n="type",v="addClass",z="removeClass",p="trigger",G="label",y="cursor",J=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);h.fn[q]=function(a,b){var d='input[type="checkbox"], input[type="'+u+'"]',c=h(),e=function(a){a.each(function(){var a=h(this);c=a.is(d)?
c.add(a):c.add(a.find(d))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a))return a=a.toLowerCase(),e(this),c.each(function(){var c=h(this);"destroy"==a?M(c,"ifDestroyed"):F(c,!0,a);h.isFunction(b)&&b()});if("object"!=typeof a&&a)return this;var f=h.extend({checkedClass:l,disabledClass:s,indeterminateClass:m,labelHover:!0,aria:!1},a),k=f.handle,B=f.hoverClass||"hover",x=f.focusClass||"focus",w=f.activeClass||"active",y=!!f.labelHover,C=f.labelHoverClass||
"hover",r=(""+f.increaseArea).replace("%","")|0;if("checkbox"==k||k==u)d='input[type="'+k+'"]';-50>r&&(r=-50);e(this);return c.each(function(){var a=h(this);M(a);var c=this,b=c.id,e=-r+"%",d=100+2*r+"%",d={position:"absolute",top:e,left:e,display:"block",width:d,height:d,margin:0,padding:0,background:"#fff",border:0,opacity:0},e=J?{position:"absolute",visibility:"hidden"}:r?d:{position:"absolute",opacity:0},k="checkbox"==c[n]?f.checkboxClass||"icheckbox":f.radioClass||"i"+u,m=h(G+'[for="'+b+'"]').add(a.closest(G)),
A=!!f.aria,E=q+"-"+Math.random().toString(36).replace("0.",""),g='<div class="'+k+'" '+(A?'role="'+c[n]+'" ':"");m.length&&A&&m.each(function(){g+='aria-labelledby="';this.id?g+=this.id:(this.id=E,g+=E);g+='"'});g=a.wrap(g+"/>")[p]("ifCreated").parent().append(f.insert);d=h('<ins class="'+I+'"/>').css(d).appendTo(g);a.data(q,{o:f,s:a.attr("style")}).css(e);f.inheritClass&&g[v](c.className||"");f.inheritID&&b&&g.attr("id",q+"-"+b);"static"==g.css("position")&&g.css("position","relative");F(a,!0,H);
if(m.length)m.on("click.i mouseover.i mouseout.i touchbegin.i touchend.i",function(b){var d=b[n],e=h(this);if(!c[s]){if("click"==d){if(h(b.target).is("a"))return;F(a,!1,!0)}else y&&(/ut|nd/.test(d)?(g[z](B),e[z](C)):(g[v](B),e[v](C)));if(J)b.stopPropagation();else return!1}});a.on("click.i focus.i blur.i keyup.i keydown.i keypress.i",function(b){var d=b[n];b=b.keyCode;if("click"==d)return!1;if("keydown"==d&&32==b)return c[n]==u&&c[l]||(c[l]?t(a,l):D(a,l)),!1;if("keyup"==d&&c[n]==u)!c[l]&&D(a,l);else if(/us|ur/.test(d))g["blur"==
d?z:v](x)});d.on("click mousedown mouseup mouseover mouseout touchbegin.i touchend.i",function(b){var d=b[n],e=/wn|up/.test(d)?w:B;if(!c[s]){if("click"==d)F(a,!1,!0);else{if(/wn|er|in/.test(d))g[v](e);else g[z](e+" "+w);if(m.length&&y&&e==B)m[/ut|nd/.test(d)?z:v](C)}if(J)b.stopPropagation();else return!1}})})}})(window.jQuery||window.Zepto);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbHMuanMiLCJmdW5jdGlvbnMuanMiLCJiYXNlLmpzIiwiY29udHJvbGxlcnMuanMiLCJhamF4LmpzIiwiYWpheDIuanMiLCJjaWVycmVDYWphLmpzIiwiZXh0cmFzLmpzIiwiYWRtaW5sdGUubWluLmpzIiwianF1ZXJ5LmlucHV0bWFzay5qcyIsImljaGVjay5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNTdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMWxEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImZvb3QyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBCQVNFX1VSTCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBcIi9cIjtcclxuaWYoQkFTRV9VUkwuaW5jbHVkZXMoXCJsb2NhbGhvc3RcIikgfHwgQkFTRV9VUkwuaW5jbHVkZXMoJ25ncm9rLmlvJykpe1xyXG4gIEJBU0VfVVJMICs9ICdpY3BheW1lbnQvJztcclxufVxyXG5cclxudmFyIE1FU1NBR0VfU1VDQ0VTUyA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZG9uZV9hbGw8L2k+JztcclxudmFyIE1FU1NBR0VfRVJST1IgICA9ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZXJyb3Jfb3V0bGluZTwvaT4nO1xyXG52YXIgTUVTU0FHRV9JTkZPICAgID0gJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5pbmZvX291dGxpbmU8L2k+JztcclxudmFyIFNVTU1FUl9TS1kgICAgICA9ICcjMUZBMUQwJ1xyXG5cclxuLyoqXHJcbiAqIENvbm5lY3QgQW5kIFNlbmRcclxuICogQ29uZWN0YSBhbCBzZXJ2aWRvciB2aWEgYWpheCB5IG11ZXN0cmEgZWwgbWVuc2FqZSBkZSByZXNwdWVzdGFcclxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBVcmwgYSBkb25kZSBzZSB2YSBhIG1hbmRhciBsYSBlbCBmb3JtdWxhcmlvLCBzaW4gbGEgYmFzZV91cmxcclxuICogQHBhcmFtIHtib29sZWFufSBpc19tZXNzYWdlIFNpIHNlIGVzcGVyYSB1biBtZW5zYWplIG8gbm8gY29tbyByZXNwdWVzdGEgXHJcbiAqIEBwYXJhbSB7Y2FsbGJhY2t9IHJlY29nbml6ZUVsZW1lbnRzIEZ1bmNpb24gcGFyYSByZWNvbm9jZXIgbG9zIGVsZW1lbnRvcyBhdXRvZ2VuZXJhZG9zXHJcbiAqIEBwYXJhbSB7P2NhbGxiYWNrfSBhY3Rpb24gY2FsbGJhY2sgcXVlIHJlY2liZSBsb3MgZGF0b3MgZGVzZGUgZWwgc2Vydmlkb3IgcGFyYSBoYWNlciBhbGdvIGNvbiBlbGxvc1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybSBmb3JtdWxhcmlvIGEgc2VyIGVudmlhZG8gYWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtjYWxsYmFja30gY2FsbGJhY2sgZnVuY2lvbiBhIHNlciBlamVjdXRhZGEgZGVzcHVlcyBxdWUgdG9kbyBzZSBjdW1wbGEsIGNvbW8gZ2V0IHVzZXJzXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGxvYWRpbmcgZnVuY3Rpb24gZm9yIGxvYWRpbmdcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBjb25uZWN0QW5kU2VuZCh1cmwsaXNfbWVzc2FnZSxyZWNvZ25pemVFbGVtZW50cyxhY3Rpb24sZm9ybSxjYWxsYmFjayxsb2FkaW5nKXtcclxuICBpZighbG9hZGluZykgbG9hZGluZyA9IGxpbmVMb2FkXHJcbiAgdmFyIGNvbm5lY3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPyBuZXcgWE1MSHR0cFJlcXVlc3QoKSA6IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyBcclxuICAgIGNvbm5lY3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNvbm5lY3QucmVhZHlTdGF0ZSA9PSA0ICYmIGNvbm5lY3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgaWYobG9hZGluZylsb2FkaW5nKHRydWUpO1xyXG4gICAgICAgICAgaWYgKGFjdGlvbiAhPSBudWxsKSAge1xyXG4gICAgICAgICAgICAgIGFjdGlvbihjb25uZWN0LnJlc3BvbnNlVGV4dCxyZWNvZ25pemVFbGVtZW50cyk7ICAgICAgICAgIFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgaWYoaXNfbWVzc2FnZSl7XHJcbiAgICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoY29ubmVjdC5yZXNwb25zZVRleHQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZihjYWxsYmFjayAhPSBudWxsKWNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSBcclxuXHJcbiAgICAgICAgZWxzZSBpZiAoY29ubmVjdC5yZWFkeVN0YXRlICE9IDQpIHtcclxuICAgICAgICAgIGlmKGxvYWRpbmcpbG9hZGluZyhmYWxzZSk7ICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbm5lY3Qub3BlbihcIlBPU1RcIixCQVNFX1VSTCArIHVybCwgdHJ1ZSk7XHJcbiAgICBjb25uZWN0LnNldFJlcXVlc3RIZWFkZXIoXCJjb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbiAgICBjb25uZWN0LnNlbmQoZm9ybSk7XHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogICAgICAgICBGdW5jaW9uZXMgZGUgbWVuc2FqZXMgeSBub3RpZmljYWNpb25lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4vKipcclxuICogRGlzcGxheSBNZXNzYWdlXHJcbiAqIE11ZXN0cmEgdW5hIG5vdGlmaWNhY2lvbiBkZWwgcmVzdWx0YWRvIGRlIGxhIGNvbnN1bHRhXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIHN0cmluZyB0byBiZSBkaXNwbGF5ZWQgXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZGlzcGxheU1lc3NhZ2UobWVzc2FnZSl7XHJcbiAgdmFyIGNvbG9yID0gXCJyZ2JhKDEwMiwxODcsMTA2LDEpXCI7XHJcbiAgdmFyIHRvYXN0LHNwYW47XHJcblxyXG4gICAgaWYobWVzc2FnZS5pbmNsdWRlcyhNRVNTQUdFX0VSUk9SKSl7XHJcbiAgICAgIGNvbG9yID0gXCJyZ2JhKDI0NCw2Nyw1NCwxKVwiO1xyXG4gICAgfWVsc2UgaWYobWVzc2FnZS5pbmNsdWRlcyhNRVNTQUdFX0lORk8pKXtcclxuICAgICAgY29sb3IgPSBcInJnYmEoMiwxMzYsMjA5LDEpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgdG9hc3QgPSAkKFwiLnRvYXN0XCIpXHJcbiAgICBzcGFuID0gdG9hc3QuZmluZChcInNwYW5cIikuaHRtbChtZXNzYWdlKTtcclxuICAgIHNwYW4uY3NzKHtiYWNrZ3JvdW5kOmNvbG9yfSk7XHJcbiAgICB0b2FzdC5jc3Moe2Rpc3BsYXk6XCJmbGV4XCJ9KTtcclxuICAgIFxyXG4gICAgdG9hc3QuYW5pbWF0ZSh7b3BhY2l0eTpcIjFcIn0sNTAwLGZ1bmN0aW9uKCl7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdG9hc3QuYW5pbWF0ZSh7b3BhY2l0eTpcIjBcIn0pO1xyXG4gICAgICAgIHRvYXN0LmNzcyh7ZGlzcGxheTpcIm5vbmVcIn0pO1xyXG4gICAgICB9LCAyMDAwKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5QWxlcnQodGl0bGUsbWVzc2FnZSx0eXBlKXtcclxuICBpZighdGl0bGUpIHRpdGxlID0gXCJSZXZpc2VcIjtcclxuICBpZighbWVzc2FnZSkgbWVzc2FnZSA9IFwiQXNlZ3VyYXRlIGRlIGxsZW5hciB0b2RvcyBsb3MgY2FtcG9zXCJcclxuICBpZighdHlwZSkgdHlwZSA9IFwiZXJyb3JcIlxyXG4gIHN3YWwoe1xyXG4gICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgIHRleHQ6IG1lc3NhZ2UsXHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25DbGFzczogJ2J0bicsXHJcbiAgICAgIGJ1dHRvbnNTdHlsaW5nOiBmYWxzZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICBmdWNuaW9uZXMgcGFyYSBMbGVuYXIgdGFibGFzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogTGxlbmEgbGEgdGFibGEgYWN0dWFsIGNvbiBsb3MgZGF0b3MgcXVlIHZpZW5lbiBkZWwgc2Vydmlkb3JcclxuICogQHBhcmFtIHtzdHJpbmd9ICRjb250ZW50IEVsIGh0bWwgY29uIGxvcyBkYXRvcyBhIHNlciBtb3N0cmFkb3MsIHZpZW5lbiBzaWVtcHJlIGRlc2RlIGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIEVsIGNhbGxiYWNrIHBhcmEgcmVjb25vY2VyIGEgbG9zIG51ZXZvcyBpdGVtc1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZnVuY3Rpb24gZmlsbEN1cnJlbnRUYWJsZSgkY29udGVudCxjYWxsYmFjayx0YWJsZUlEKXtcclxuICB2YXIgJHRhYmxlXHJcbiAgJChcImh0bWxcIikucmVtb3ZlQ2xhc3MoXCJncl9faWNwYXltZW50LXNvZnRfY29tXCIpXHJcbiAgaWYodGFibGVJRCAhPSB1bmRlZmluZWQpe1xyXG4gICAgJHRhYmxlID0gJCgnIycrdGFibGVJRCArIFwiIHRib2R5XCIpO1xyXG4gIH1lbHNle1xyXG4gICAgJHRhYmxlID0gJCgnW2NsYXNzKj1cInQtXCJdIHRib2R5Jyk7XHJcbiAgfVxyXG4gICR0YWJsZS5odG1sKCRjb250ZW50KTtcclxuICBpZihjYWxsYmFjaykgY2FsbGJhY2soKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExsZW5hIGxhIHRhYmxhIGNsaWVudGVzIHV0aWxpemFuZG8gbGEgZnVuY2lvbiBmaWxsQ3VycmVudFRhYmxlIHBhc2FuZG9sZSBsYSB0YWJsYSBjbGllbnRlcyBjb21vIHZhbG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ2xpZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2spe1xyXG4gIGZpbGxDdXJyZW50VGFibGUoJGNvbnRlbnQsY2FsbGJhY2ssXCJ0LWNsaWVudHNcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMbGVuYSBsYSB0YWJsYSBjYWphIHV0aWxpemFuZG8gbGEgZnVuY2lvbiBmaWxsQ3VycmVudFRhYmxlIHBhc2FuZG9sZSBsYSB0YWJsYSBjbGllbnRlcyBjb21vIHZhbG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBmaWxsQ2FqYVRhYmxlKCRjb250ZW50LGNhbGxiYWNrKXtcclxuICBmaWxsQ3VycmVudFRhYmxlKCRjb250ZW50LGNhbGxiYWNrLFwiY2FqYVwiKTtcclxuICBpZihjYWxsYmFjayljYWxsYmFjaygpO1xyXG59XHJcbi8qKlxyXG4gKiBMbGVuYSBsYSBMaXN0YSBkZSBwYWdvcy9ub3RpZmljYWNpb25lcyBjb24gbG9zIGRhdG9zIHF1ZSB2aWVuZW4gZGVsIHNlcnZpZG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSAkY29udGVudCBFbCBodG1sIGNvbiBsb3MgZGF0b3MgYSBzZXIgbW9zdHJhZG9zLCB2aWVuZW4gc2llbXByZSBkZXNkZSBlbCBzZXJ2aWRvclxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBFbCBjYWxsYmFjayBwYXJhIHJlY29ub2NlciBhIGxvcyBudWV2b3MgaXRlbXNcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBmaWxsUGF5bWVudHNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIubGlzdC1uZXh0cGF5bWVudHNcIik7XHJcbiAgJGNvbnRhaW5lci5odG1sKCRjb250ZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsbEF2ZXJpYXNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIjYXZlcmlhcy1saXN0XCIpO1xyXG4gICRjb250YWluZXIuaHRtbCgkY29udGVudCk7XHJcbiAgY2FsbGJhY2soKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsbEluc3RhbGxhdGlvbnNMaXN0KCRjb250ZW50LGNhbGxiYWNrKXtcclxuICB2YXIgJGNvbnRhaW5lciA9ICQoXCIjaW5zdGFsbGF0aW9ucy1saXN0XCIpO1xyXG4gICRjb250YWluZXIuaHRtbCgkY29udGVudCk7XHJcbiAgY2FsbGJhY2soKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUNvbnRyYWN0TGlzdChyZXNwb25zZSxjYWxsYmFjayl7XHJcbiAgaWYocmVzcG9uc2UgIT0gXCJuYWRhXCIpe1xyXG4gICAgXHJcbiAgICB2YXIgY29udHJhY3RzID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHJcbiAgICB2YXIgdmFsdWUsc2VydmljZSxlcXVpcG1lbnQsZU1hYyxyb3V0ZXIsck1hYyxjb2RlO1xyXG4gICAgdmFyIHNlbGVjdENvbnRyYWN0ID0gJChcIiNleHRyYS1jbGllbnQtY29udHJhY3RcIik7XHJcbiAgICB2YXIgZWxlbWVudCA9IFwiPG9wdGlvbiB2YWx1ZT0nJz4tLVNlbGVjY2lvbmEtLTwvb3B0aW9uPlwiO1xyXG4gICAgdmFyIGNsaWVudGUgPSBjb250cmFjdHMuY2xpZW50ZTtcclxuICAgIHZhciBjb250cmFjdElkID0gY29udHJhY3RUYWJsZS5nZXRJZCgpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udHJhY3RzLmNvbnRyYXRvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YWx1ZSAgICAgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wiaWRfY29udHJhdG9cIl07XHJcbiAgICAgIHNlcnZpY2UgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJzZXJ2aWNpb1wiXTtcclxuICAgICAgZXF1aXBtZW50ID0gY29udHJhY3RzLmNvbnRyYXRvc1tpXVtcIm5vbWJyZV9lcXVpcG9cIl07XHJcbiAgICAgIHJvdXRlciAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJyb3V0ZXJcIl07XHJcbiAgICAgIGVNYWMgICAgICA9IGNvbnRyYWN0cy5jb250cmF0b3NbaV1bXCJtYWNfZXF1aXBvXCJdO1xyXG4gICAgICByTWFjICAgICAgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wibWFjX3JvdXRlclwiXTtcclxuICAgICAgY29kZSAgICAgPSBjb250cmFjdHMuY29udHJhdG9zW2ldW1wiY29kaWdvXCJdO1xyXG4gICAgICBlbGVtZW50ICs9IFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyB2YWx1ZSArIFwiJyBkYXRhLXNlcnZpY2U9J1wiK3NlcnZpY2UrXCInICBkYXRhLWVxdWlwbWVudD0nXCIrZXF1aXBtZW50K1wiJyAgZGF0YS1lLW1hYz0nXCIrZU1hYytcIidcIjtcclxuICAgICAgZWxlbWVudCArPSBcIiBkYXRhLXJvdXRlcj0nXCIrcm91dGVyK1wiJyAgZGF0YS1yLW1hYz0nXCIrck1hYytcIicgZGF0YS1jb2RlPSdcIitjb2RlK1wiJz5cIjtcclxuICAgICAgZWxlbWVudCArPSB2YWx1ZSArXCI8L29wdGlvbj5cIjsgIFxyXG4gICAgfVxyXG4gICAgc2VsZWN0Q29udHJhY3QuaHRtbChlbGVtZW50KTtcclxuICAgIHNlbGVjdENvbnRyYWN0LnZhbChjb250cmFjdElkKS5jaGFuZ2UoKTtcclxuICAgICQoXCIjZXh0cmEtY2xpZW50LW5hbWVcIikudmFsKGNsaWVudGVbJ25vbWJyZXMnXSArIFwiIFwiICsgY2xpZW50ZVsnYXBlbGxpZG9zJ10pO1xyXG5cclxuICB9ZWxzZXtcclxuICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfRVJST1IgKyBcIiBFc3RlIGNsaWVudGUgbm8gZXhpc3RlIHJldmlzZSBzdSBjZWR1bGEgcG9yIGZhdm9yXCIpO1xyXG4gIH0gXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyVGJvZHkob2JqZWNJZCl7XHJcbiAgJChvYmplY0lkKS5odG1sKFwiXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWxsQ2xpZW50RmllbGRzKHJlc3BvbnNlLGNhbGxiYWNrKXtcclxuICBpZihyZXNwb25zZSAhPSBcIm5hZGFcIil7IFxyXG4gICAgdmFyIGNsaWVudGUgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcclxuICAgICQoXCIjYXZlcmlhcy1jbGllbnQtaWRcIikudmFsKGNsaWVudGVbJ2lkX2NsaWVudGUnXSk7XHJcbiAgICAkKFwiI2EtY2xpZW50XCIpLnZhbChjbGllbnRlWydub21icmVzJ10gKyBcIiBcIiArIGNsaWVudGVbJ2FwZWxsaWRvcyddKVxyXG4gIH1lbHNle1xyXG4gICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArIFwiIEVzdGUgY2xpZW50ZSBubyBleGlzdGUgcmV2aXNlIHN1IGNlZHVsYSBwb3IgZmF2b3JcIik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlUGF5bWVudExpc3QocmVzcG9uc2UsY2FsbGJhY2spe1xyXG4gIHZhciBzZWxlY3RQYXlVbnRpbCA9ICQoJyNzZWxlY3QtcGF5LXVudGlsJyk7XHJcbiAgc2VsZWN0UGF5VW50aWwuaHRtbChyZXNwb25zZSk7XHJcbiAgc2VsZWN0UGF5VW50aWwucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICBzZWxlY3RQYXlVbnRpbC5jaGFuZ2UoKTtcclxuICBpZihjYWxsYmFjayljYWxsYmFjaygpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIGlzRW1wdHlcclxuICogVmVyaWZpY2Egc2kgbG9zIHZhbG9yZXMgZGFkb3MgZXN0YW4gdmFjaW9zIG8gc29uIG51bG9zIFxyXG4gKiBAcGFyYW0ge0FycmF5LiA8IHN0cmluZ30gdmFsdWVzXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBpc0VtcHR5KHZhbHVlcyxpc19udW0pe1xyXG4gIGZvcih2YXIgaSA9IDAgOyBpIDwgdmFsdWVzLmxlbmd0aCA7IGkrKyl7XHJcbiAgICBpZiAodmFsdWVzW2ldID09IG51bGwgfHwgdmFsdWVzW2ldID09IFwiXCIpe1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gXHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNhbGRvKG1vbmV5KXtcclxuICBtb25leSA9IFwiUkQkIFwiKyBDdXJyZW5jeUZvcm1hdChtb25leSlcclxuICAkKFwiLmN1cnJlbnQtc2FsZG9cIikudGV4dChtb25leSk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlQ291bnQoJGNvbnRlbnQpe1xyXG4gICQoXCIudG90YWwtcm93c1wiKS5odG1sKCRjb250ZW50KTtcclxufVxyXG4vLyArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXHJcbi8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZXIgcGFzc3dvcmRzIHZhbGlkYXRpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuLy8gfCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxyXG4vLyArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rXHJcbi8vXHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZU1vZGFsKCRtb2RhbElkKXtcclxuICB2YXIgJHVzZXJQYXNzd29yZCA9ICQoJG1vZGFsSWQrJyAucGFzc3dvcmQnKTtcclxuICB2YXIgJHVzZXJQYXNzd29yZENvbmZpcm0gPSAkKCRtb2RhbElkKycgLnBhc3N3b3JkLWNvbmZpcm0nKTtcclxuICB2YXIgJHNhdmVCdXR0b24gPSAkKCRtb2RhbElkKycgLnNhdmUnKTtcclxuICBcclxuICAkdXNlclBhc3N3b3JkQ29uZmlybS5vbignYmx1ciBrZXl1cCcsZnVuY3Rpb24oKXtcclxuICAgIHZhbGlkYXRlVHdvKCR1c2VyUGFzc3dvcmQsJHVzZXJQYXNzd29yZENvbmZpcm0sJHNhdmVCdXR0b24pO1xyXG4gIH0pO1xyXG4gICRzYXZlQnV0dG9uLm9uKCdjbGljaycsY2xlYXJGb3JtKCRtb2RhbElkKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZhbGlkYXRlVHdvKCRmaXJzdE9iamVjdCwkc2Vjb25kT2JqZWN0LCRidXR0b24pe1xyXG4gICAgaWYoJHNlY29uZE9iamVjdC52YWwoKSA9PSAkZmlyc3RPYmplY3QudmFsKCkgJiYgJHNlY29uZE9iamVjdC52YWwoKSAhPSBcIlwiKXtcclxuICAgICAgcmVwbGFjZUNsYXNzKCRmaXJzdE9iamVjdC5wYXJlbnQoKSxcImhhcy1lcnJvclwiLFwiaGFzLXN1Y2Nlc3NcIik7XHJcbiAgICAgIHJlcGxhY2VDbGFzcygkc2Vjb25kT2JqZWN0LnBhcmVudCgpLFwiaGFzLWVycm9yXCIsXCJoYXMtc3VjY2Vzc1wiKTtcclxuICAgICAgJGJ1dHRvbi5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIixcIlwiKTtcclxuXHJcbiAgICB9ZWxzZXtcclxuICAgICAgIHJlcGxhY2VDbGFzcygkZmlyc3RPYmplY3QucGFyZW50KCksXCJoYXMtc3VjY2Vzc1wiLFwiaGFzLWVycm9yXCIpO1xyXG4gICAgICAgcmVwbGFjZUNsYXNzKCRzZWNvbmRPYmplY3QucGFyZW50KCksXCJoYXMtc3VjY2Vzc1wiLFwiaGFzLWVycm9yXCIpO1xyXG4gICAgICAgJGJ1dHRvbi5hdHRyKFwiZGlzYWJsZWRcIixcIlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVUaGlzKCl7XHJcbiAgdmFyICR1c2VyUGFzc3dvcmQgPSAkKCcucGFzc3dvcmQnKTtcclxuICB2YXIgJHVzZXJQYXNzd29yZENvbmZpcm0gPSAkKCcucGFzc3dvcmQtY29uZmlybScpO1xyXG4gIHZhciAkc2F2ZUJ1dHRvbiA9ICQoJy5zYXZlJyk7XHJcbiAgXHJcbiAgJHVzZXJQYXNzd29yZC5vbignYmx1ciBrZXl1cCcsZnVuY3Rpb24oKXtcclxuICAgIHZhbGlkYXRlVHdvKCR1c2VyUGFzc3dvcmQsJHVzZXJQYXNzd29yZENvbmZpcm0sJHNhdmVCdXR0b24pO1xyXG4gIH0pO1xyXG4gICR1c2VyUGFzc3dvcmRDb25maXJtLm9uKCdibHVyIGtleXVwJyxmdW5jdGlvbigpe1xyXG4gICAgdmFsaWRhdGVUd28oJHVzZXJQYXNzd29yZCwkdXNlclBhc3N3b3JkQ29uZmlybSwkc2F2ZUJ1dHRvbik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyRm9ybShtb2RhbElkKXtcclxuICAkKG1vZGFsSWQgKyBcIiBpbnB1dFwiKS52YWwoXCJcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVZhbGlkYXRpb24oJGlucHV0RWxlbWVudCwgdGV4dCwgJGJ1dHRvblRvQWN0aXZlKXtcclxuICB2YXIgaW5uZXJUZXh0O1xyXG4gIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgdmFyIHNlbGYgID0gdGhpcztcclxuICAkaW5wdXRFbGVtZW50Lm9uKFwia2V5dXBcIixmdW5jdGlvbihlKXtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBpbm5lclRleHQgPSAkKHRoaXMpLnZhbCgpIFxyXG4gICAgaWYoaW5uZXJUZXh0LnRvTG93ZXJDYXNlKCkgPT0gc2VsZi50ZXh0LnRvTG93ZXJDYXNlKCkpe1xyXG4gICAgICAkYnV0dG9uVG9BY3RpdmUucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG5cclxuICAgIH1lbHNle1xyXG4gICAgICAkYnV0dG9uVG9BY3RpdmUuYXR0cihcImRpc2FibGVkXCIsXCJcIik7XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuLy8gKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xyXG4vLyB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdW5jaW9uZXMgZGUgdXRpbGVyaWEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8XHJcbi8vIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcclxuLy8gKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xyXG4vL1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJlcGxhY2VDbGFzcygkb2JqZWN0LG9sZENsYXNzLG5ld0NsYXNzKXtcclxuICAgJG9iamVjdC5hZGRDbGFzcyhuZXdDbGFzcyk7XHJcbiAgICRvYmplY3QucmVtb3ZlQ2xhc3Mob2xkQ2xhc3MpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VTZXJ2aWNlQ2FyZENsaWNrYWJsZSgpe1xyXG4gICAgdmFyIHNlcnZpY2VDYXJkICAgICAgPSAkKFwiLnNlcnZpY2UtY2FyZFwiKTtcclxuICAgIHZhciBidG5QcmludENvbnRyYWN0ID0gJCgnI2J0bi1wcmludC1yZXF1aXJlbWVudCcpO1xyXG5cclxuICAgIHNlcnZpY2VDYXJkLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciAkdGhpcyAgICAgICA9ICQodGhpcyk7XHJcbiAgICAgIHZhciBzZXJ2aWNlX2lkICA9ICR0aGlzLmF0dHIoJ2RhdGEtaWQnKTsgXHJcbiAgICAgIHZhciBwYXltZW50ICAgICA9ICR0aGlzLmF0dHIoJ2RhdGEtcGF5bWVudCcpO1xyXG4gICAgICB2YXIgcmVhbExpbmsgICAgPSBidG5QcmludENvbnRyYWN0LmF0dHIoJ2RhdGEtaHJlZicpXHJcbiAgICAgIFxyXG4gICAgICBzZXJ2aWNlQ2FyZC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICAgJHRoaXMuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgICAgIGJ0blByaW50Q29udHJhY3QuYXR0cihcImhyZWZcIixyZWFsTGluayArIFwiL1wiICsgc2VydmljZV9pZCk7XHJcbiAgICAgICQoJyNjb250cmFjdC1jbGllbnQtcGF5bWVudCcpLnZhbChwYXltZW50KVxyXG4gICAgfSlcclxufVxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgVmVyaWZ5IFJvd3MgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG5mdW5jdGlvbiB2ZXJpZnlDb250cmFjdFN0YXR1cygpe1xyXG4gICQoXCIudGQtZXN0YWRvXCIpLmVhY2goZnVuY3Rpb24oaSx2YWx1ZSl7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgdmFyIHRleHQgPSAkdGhpcy50ZXh0KCkudHJpbSgpO1xyXG4gICAgaWYodGV4dCA9PSBcImFjdGl2b1wiKXtcclxuICAgICAgJHRoaXMuY3NzKHtjb2xvcjpcImdyZWVuXCJ9KVxyXG4gICAgfWVsc2UgaWYodGV4dCA9PSBcInNhbGRhZG9cIil7XHJcbiAgICAgICR0aGlzLnBhcmVudHMoXCJ0clwiKS5jc3Moe2JhY2tncm91bmQ6XCJyZ2JhKDIyLDI1NSwwLC4zKVwiLGNvbG9yOlwiIzU1NVwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlcmlmeUNsaWVudFN0YXR1cygpe1xyXG4gICAkKFwidGRcIikuZWFjaChmdW5jdGlvbihpLHZhbHVlKXtcclxuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICB2YXIgdGV4dCA9ICR0aGlzLnRleHQoKS50cmltKCk7XHJcbiAgICBpZih0ZXh0ID09IFwibm8gYWN0aXZvXCIpe1xyXG4gICAgICAkdGhpcy5jc3Moe2NvbG9yOlwicmdiYSgyMDAsMCwwLC43KVwifSlcclxuICAgIH1lbHNlIGlmKHRleHQgPT0gXCJhY3Rpdm9cIil7XHJcbiAgICAgICR0aGlzLmNzcyh7Y29sb3I6XCJncmVlblwifSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qICAgICAgICAgICAgICAgICAgICAgICBMb2FkZXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5mdW5jdGlvbiBoZWF2eUxvYWQoc3RvcCl7XHJcbiAgaWYoIXN0b3Ape1xyXG4gICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cImhlYXZ5LWxvYWRlciBhY3RpdmVcIj4nXHJcbiAgICAgICAgaHRtbCArPSAgICc8ZGl2IGNsYXNzPVwiY2lyY2xlLWxvYWRcIj48L2Rpdj4nXHJcbiAgICAgICAgaHRtbCArPSAgICc8ZGl2IGNsYXNzPVwibWVzc2FnZVwiPlByZXBhcmFuZG8gbG9zIGRhdG9zPC9kaXY+J1xyXG4gICAgICAgIGh0bWwgKz0gJzwvZGl2PidcclxuICAgICQoXCJib2R5XCIpLmFwcGVuZChodG1sKVxyXG4gICAgJChcImJvZHlcIikuY3NzKHtvdmVyZmxvdzpcImhpZGRlblwifSk7XHJcbiAgICB2YXIgbWVzc2FnZSA9ICQoXCIuaGVhdnktbG9hZGVyIC5tZXNzYWdlXCIpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBtZXNzYWdlLnRleHQoXCJDb25maWd1cmFuZG8uLi5cIik7XHJcbiAgICB9LDQwMDApXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIG1lc3NhZ2UudGV4dChcIkNhc2kgVGVybWluYW1vcyAuLi5cIik7XHJcbiAgICB9LDgwMDApXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIG1lc3NhZ2UudGV4dChcIlRlcm1pbmFuZG8gZWwgcHJvY2VzbyAuLi5cIik7XHJcbiAgICAgIHJlbW92ZUxvYWRlcigpO1xyXG4gICAgfSwxNTAwMClcclxuICB9ZWxzZXtcclxuICAgIHJlbW92ZUxvYWRlcigpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlTG9hZGVyKCl7XHJcbiAgICB2YXIgbG9hZGVyID0gJChcIi5oZWF2eS1sb2FkZXJcIik7XHJcbiAgICBsb2FkZXIucmVtb3ZlKCk7XHJcbiAgICAkKFwiYm9keVwiKS5jc3Moe292ZXJmbG93OlwiYXV0b1wifSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaW5lTG9hZChzdG9wKSB7XHJcbiAgaWYoIXN0b3Ape1xyXG4gICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxyXG4gICAgICB9KTtcclxuICB9ZWxzZXtcclxuICAgICQoXCIubG9hZGVyXCIpLmNzcyh7ZGlzcGxheTogXCJub25lXCJ9KTtcclxuICB9XHJcbn0iLCIvLyBmdW5jaW9uZXMgZGUgYm9vdHN0cmFwXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKClcclxufSk7XHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZVBhc3N3b3JkKHBhc3N3b3JkKXtcclxuICB2YXIgZXhwcmVzc2lvbiA9ICcnO1xyXG4gIHZhciBoYXNfbG93ZXJjYXNlID0gZmFsc2U7XHJcbiAgdmFyIGhhc191cHBlcmNhc2UgPSBmYWxzZTtcclxuICB2YXIgaGFzX2RpZ2l0ID0gJy8qXFxkJztcclxuXHJcbiAgaWYocGFzc3dvcmQubGVuZ3RoID4gOCkgYWxlcnQoXCJtYXlvciBhIDhcIilcclxuICBpZigvXFxkLy50ZXN0KHBhc3N3b3JkKSlhbGVydChcInRpZW5lIGRpZ2l0b1wiKVxyXG4gIGlmKC9bYS16XS8udGVzdChwYXNzd29yZCkpYWxlcnQoXCJ0aWVuZSBtaW5pc2N1bGFzXCIpXHJcbiAgaWYoL1tBLVpdLy50ZXN0KHBhc3N3b3JkKSkgYWxlcnQoJ3RpZW5lIG1heXVzY3VsYXMnKVxyXG59IiwiJChmdW5jdGlvbigpe1xyXG4gIHZhciBjdXJyZW50UGFnZSA9ICQoXCJ0aXRsZVwiKS50ZXh0KCkuc3BsaXQoXCIgXCIpO1xyXG4gIGN1cnJlbnRQYWdlICAgPSBjdXJyZW50UGFnZVs0XS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICBpZihjdXJyZW50UGFnZSA9PSBcImFkbWluaXN0cmFkb3JcIikge1xyXG4gICAgbmV3VXNlckZvcm0oKTtcclxuICB9XHJcbiAgZ2V0RGF0ZSgpO1xyXG4gIGFkbWluRnVuY3Rpb25zKCk7XHJcbiAgdXNlckluZm9UaXAoKTtcclxuICBtYWtlU2VydmljZUNhcmRDbGlja2FibGUoKTtcclxuICBkZXRhaWxzRnVuY3Rpb25zKCk7XHJcbiAgbm90aWZpY2F0aW9uRnVuY3Rpb25zKCk7XHJcbiAgbmV3Q29udHJhY3RGdW5jdGlvbnMoKTtcclxuICBjaGVja1dpbmRvd1NpemUoKTtcclxuICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsZnVuY3Rpb24oKXtcclxuICAgIGNoZWNrV2luZG93U2l6ZSgpO1xyXG4gIH0pXHJcbiAgXHJcbi8qKlxyXG4gKiBHZXQgRGF0ZTpcclxuICogT2J0aWVuZSBsYSBmZWNoYSBhY3R1YWwgYWwgc2VndW5kbyB5IGxhIG11ZXN0cmEgZW4gbGEgcGFudGFsbGEgZGUgaW5pY2lvXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXREYXRlKCl7XHJcbiAgdmFyICRkYXkgPSAkKCcuZGF5Jyk7XHJcbiAgdmFyICRtb250aFllYXIgPSAkKCcubW9udGgteWVhcicpO1xyXG4gIHZhciAkZGF5V2VlayA9ICQoJy5kYXl3ZWVrJyk7XHJcbiAgdmFyICRIb3JhID0gJCgnLmhvdXIgc3BhbicpO1xyXG4gIHZhciBkYXRlLGRheSxtb250aCx5ZWFyLHNIb3VyO1xyXG4gIHZhciBkYXlzID0gW1wiRG9taW5nb1wiLFwiTHVuZXNcIixcIk1hcnRlc1wiLFwiTWllcmNvbGVzXCIsXCJKdWV2ZXNcIixcIlZpZXJuZXNcIixcIlNhYmFkb1wiXTtcclxuICB2YXIgbW9udGhzID0gW1wiRW5lcm9cIixcIkZlYnJlcm9cIixcIk1hcnpvXCIsXCJBYnJpbFwiLFwiTWF5b1wiLFwiSnVuaW9cIixcIkp1bGlvXCIsXCJBZ29zdG9cIixcIlNlcHRpZW1icmVcIixcIk9jdHVicmVcIixcIk5vdmllbWJyZVwiLFwiRGljaWVtYnJlXCJdO1xyXG5cclxuICBzZXRJbnRlcnZhbCh1cGRhdGVIb3VyLDEwMDApO1xyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVIb3VyKCl7XHJcbiAgICBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIHNEYXRlID0gZGF0ZS50b1N0cmluZygpXHJcbiAgICAkZGF5LnRleHQoZGF0ZS5nZXREYXRlKCkpO1xyXG4gICAgJG1vbnRoWWVhci50ZXh0KFwiRGUgXCIgKyBtb250aHNbZGF0ZS5nZXRNb250aCgpXSArIFwiIGRlIFwiICsgZGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgICRkYXlXZWVrLnRleHQoZGF5c1tkYXRlLmdldERheSgpXSk7XHJcbiAgICBcclxuICAgIHNIb3VyID0gbW9tZW50KCkuZm9ybWF0KCdMVFMnKTtcclxuICAgICAkSG9yYS5odG1sKHNIb3VyKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZG1pbiBGdW5jdGlvbnM6XHJcbiAqIHNlIGVuY2FyZ2EgZGUgZWwgbW92aW1pZW50byBkZSBsb3MgcGFuZWxlcyBlbiBsYSBwYW50YWxsYSAnYWRtaW5pc3RyYWRvcidcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblxyXG5mdW5jdGlvbiBhZG1pbkZ1bmN0aW9ucygpe1xyXG4gICQoJyNjb21wYW55LXNlY3Rpb24nKS5hbmltYXRlKHtsZWZ0OlwiMFwifSwyMDApXHJcbiAgJCgnLmFkbWluaXN0cmFkb3IgLmFzaWRlLWJ1dHRvbnMgYScpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgdmFyIGNhcmROYW1lID0gJHRoaXMuYXR0cignaHJlZicpLnNsaWNlKDEpO1xyXG4gICAgaWYoY2FyZE5hbWUgIT0gbnVsbCl7XHJcbiAgICAgICQoJy5jb21wYW55LWRldGFpbHMnKS5hbmltYXRlKHtsZWZ0OlwiLTExMCVcIn0sMjAwKVxyXG4gICAgICAkKCcjJytjYXJkTmFtZSsnLmNvbXBhbnktZGV0YWlscycpLmFuaW1hdGUoe2xlZnQ6XCIwXCJ9LDIwMClcclxuICAgIH0gIFxyXG4gIH0pXHJcblxyXG4gIGlmKCQoXCIjYWNvdW50LXNlY3Rpb25cIikubGVuZ3RoID4gMCl7XHJcbiAgICAkKCcjYWNvdW50LXNlY3Rpb24nKS5hbmltYXRlKHtsZWZ0OlwiMFwifSwyMDApXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogbmV3IFVzZXIgRm9ybTpcclxuICogdmFpZGEgbGFzIGNvbnRyYXNlw7FhcyBlbiBsb3MgZm9ybXVsYXJpb3MgZGUgbG9zIHVzdWFyaW9zXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5mdW5jdGlvbiBuZXdVc2VyRm9ybSgpe1xyXG4gIHZhbGlkYXRlTW9kYWwoXCIjbmV3LXVzZXItbW9kYWxcIik7XHJcbiAgdmFsaWRhdGVNb2RhbChcIiN1cGRhdGUtdXNlci1tb2RhbFwiKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZXIgSW5mbyBUaXBcclxuICogaGFjZSB1biB0b2dnbGUgZW4gbGEgdmlzaWJpbGlkYWQgZGUgbGEgaW5mbyBkZWwgdXN1YXJpb1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZnVuY3Rpb24gdXNlckluZm9UaXAoKXtcclxuICB2YXIgaW5mb1RpcCA9ICQoXCIudXNlci1pbmZvLXRpcFwiKTtcclxuICB2YXIgcHJvZmlsZVBpY3R1cmUgPSAkKFwiLnByb2ZpbGUtcGljdHVyZVwiKTtcclxuICB2YXIgYnRuTW9yZSA9ICQoXCIuYnRuLW1vcmVcIik7XHJcblxyXG4gIGJ0bk1vcmUub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgIGluZm9UaXAudG9nZ2xlQ2xhc3MoXCJ2aXNpYmxlXCIpO1xyXG4gIH0pO1xyXG59XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gbmV3Q29udHJhY3RGdW5jdGlvbnMoKXtcclxuICB2YXIgYnRuUHJpbnRDb250cmFjdCA9ICQoXCIjYnRuLXByaW50LWNvbnRyYWN0XCIpO1xyXG4gIHZhciBkb2N1bWVudCA9ICQoXCIubm90ZS1pdGVtXCIpO1xyXG4gIHZhciByYWRpb0FjdGl2YXRlQ29udHJhY3QgPSAkKFwiI3JhZGlvLW5ldy1jb250cmFjdFwiKTtcclxuICB2YXIgcmFkaW9EaXNhYmxlQ29udHJhY3QgPSAkKFwiI3JhZGlvLWp1c3QtcmVxdWlyZW1lbnRcIik7XHJcbiAgdmFyIGNvbnRyYWN0Q29udHJvbHMgPSAkKFwiLmNvbnRyYWN0LWNvbnRyb2xzXCIpO1xyXG4gIHZhciByZXF1aXJlbWVudENvbnRyb2xzID0gJChcIi5yZXF1aXJlbWVudC1jb250cm9sc1wiKTtcclxuXHJcbiAgcmFkaW9BY3RpdmF0ZUNvbnRyYWN0LnBhcmVudHMoXCJsYWJlbFwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgIGFjdGl2YXRlQ29udHJhY3RNb2RlKCk7IFxyXG5cclxuICB9KTtcclxuXHJcbiAgcmFkaW9EaXNhYmxlQ29udHJhY3QucGFyZW50cyhcImxhYmVsXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGRpc2FibGVDb250cmFjdE1vZGUoKVxyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBhY3RpdmF0ZUNvbnRyYWN0TW9kZSgkYnRuKXtcclxuICAgIHJhZGlvRGlzYWJsZUNvbnRyYWN0XHJcbiAgICAgIC5yZW1vdmVBdHRyKFwiY2hlY2tlZFwiLFwiXCIpXHJcbiAgICAgIC5odG1sKFwiXCIpXHJcbiAgICByYWRpb0FjdGl2YXRlQ29udHJhY3RcclxuICAgICAgLmF0dHIoXCJjaGVja2VkXCIsXCJcIilcclxuICAgICAgLmh0bWwoXCImIzEwMDA0O1wiKVxyXG4gICAgZG9jdW1lbnQucmVtb3ZlQ2xhc3MoXCJwcmludC1yZXF1aXJlbWVudFwiKTtcclxuICAgIGNvbnRyYWN0Q29udHJvbHMucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpXHJcbiAgICByZXF1aXJlbWVudENvbnRyb2xzLmFkZENsYXNzKFwiaGlkZVwiKVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkaXNhYmxlQ29udHJhY3RNb2RlKCRidG4pe1xyXG4gICAgcmFkaW9BY3RpdmF0ZUNvbnRyYWN0XHJcbiAgICAgIC5yZW1vdmVBdHRyKFwiY2hlY2tlZFwiLFwiXCIpXHJcbiAgICAgIC5odG1sKFwiXCIpXHJcbiAgICByYWRpb0Rpc2FibGVDb250cmFjdFxyXG4gICAgICAuYXR0cihcImNoZWNrZWRcIixcIlwiKVxyXG4gICAgICAuaHRtbChcIiYjMTAwMDQ7XCIpXHJcbiAgICBkb2N1bWVudC5hZGRDbGFzcyhcInByaW50LXJlcXVpcmVtZW50XCIpO1xyXG4gICAgcmVxdWlyZW1lbnRDb250cm9scy5yZW1vdmVDbGFzcyhcImhpZGVcIilcclxuICAgIGNvbnRyYWN0Q29udHJvbHMuYWRkQ2xhc3MoXCJoaWRlXCIpXHJcbiAgfVxyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kYWxzIEZ1bmN0aW9ucyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbiQoJyNzZWFyY2gtY2xpZW50LW1vZGFsJykub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICB2YXIgYnV0dG9uID0gJChldmVudC5yZWxhdGVkVGFyZ2V0KTtcclxuICBjbGllbnRUYWJsZS5pbml0KCk7XHJcbiAgdmFyIHRpdGxlID0gYnV0dG9uLmZpbmQoJy5zZWN0aW9uLXRpdGxlJykudGV4dCgpO1xyXG4gIGlmKCF0aXRsZSkgdGl0bGUgPSBcIkJ1c2NhciBDbGllbnRlXCJcclxuICBpZih0aXRsZS50b0xvd2VyQ2FzZSgpLnRyaW0oKSA9PSBcInJlZ2lzdHJhciBwYWdvXCIpe1xyXG4gICAgYnV0dG9uVGV4dCA9IFwiaXIgYSBQYWdvc1wiXHJcbiAgfWVsc2V7XHJcbiAgICBidXR0b25UZXh0ID0gXCJOdWV2byBDb250cmF0b1wiXHJcbiAgfVxyXG4gIFxyXG4gIHZhciBtb2RhbCA9ICQodGhpcylcclxuICBtb2RhbC5maW5kKCcubW9kYWwtdGl0bGUnKS50ZXh0KHRpdGxlKVxyXG4gIG1vZGFsLmZpbmQoJy5tb2RhbC1mb290ZXIgLnNhdmUnKS50ZXh0KGJ1dHRvblRleHQpXHJcbiAgbW9kYWwuZmluZCgndGJvZHknKS5odG1sKCcnKVxyXG59KVxyXG5cclxuXHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuKiAgICAgICAgICAgICAgb3RoZXIgZnVuY3Rpb25zICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4qICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5mdW5jdGlvbiBkZXRhaWxzRnVuY3Rpb25zKCl7XHJcbiAgdmFyIHNtYWxsQnV0dG9uc1NlbGVjdCA9ICQoJy5idG4tc21hbGwnKTtcclxuXHJcbiAgJCgnW3JvbGU9XCJ0YWJcIl0nKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIilcclxuICAgIGlmKGhyZWYgPT0gXCIjcGF5bWVudHNcIiB8fGhyZWYgPT0gXCIjZGV0YWxsZXNfZGVfcGFnb1wiIHx8IGhyZWYgPT0gXCIjZGVzY3VlbnRvXCIgfHwgaHJlZiA9PSBcIiNtb250aC1hbmQtZGF0ZVwiIHx8IGhyZWYgPT0gXCIjcmVjb25uZWN0LXNlcnZpY2VcIikge1xyXG4gICAgICAkKFwiLnBheW1lbnQtY29udHJvbHNcIikuYWRkQ2xhc3MoXCJ2aXNpYmxlXCIpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICQoXCIucGF5bWVudC1jb250cm9sc1wiKS5yZW1vdmVDbGFzcyhcInZpc2libGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoaHJlZiA9PSBcIiNjb250cmFjdHNcIil7XHJcbiAgICAgICQoXCIuY29udHJhY3QtY29udHJvbHNcIikuYWRkQ2xhc3MoXCJ2aXNpYmxlXCIpXHJcbiAgICB9ZWxzZXtcclxuICAgICAgJChcIi5jb250cmFjdC1jb250cm9sc1wiKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRUYWJDb250cm9scygkKHRoaXMpKTtcclxuICB9KTtcclxuXHJcbiAgJCgnLmJ0bi1zbWFsbCcpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIHNtYWxsQnV0dG9uc1NlbGVjdC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcbiAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VGFiQ29udHJvbHMoJHRoaXMpe1xyXG4gIHZhciBjb250cm9scyA9ICR0aGlzLmF0dHIoXCJhcmlhLWNvbnRyb2xzXCIpO1xyXG4gICQoXCIuZHluYW1pYy1jb250cm9sc1wiKS50ZXh0KGNvbnRyb2xzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbm90aWZpY2F0aW9uRnVuY3Rpb25zKCl7XHJcbiAgdmFyIGJ0bkF2ZXJpYXMgICAgICA9ICQoXCIjYnRuLXNlZS1hdmVyaWFzXCIpO1xyXG4gIHZhciBidG5QYWdvcyAgICAgICAgPSAkKFwiI2J0bi1zZWUtcGFnb3NcIik7XHJcbiAgdmFyIGJ0bkNhamFDaGljYSAgICA9ICQoJyNidG4tc2VlLWNhamEnKTtcclxuICB2YXIgYnRuRGV1ZG9yZXMgICAgID0gJChcIiNidG4tc2VlLWRldWRvcmVzXCIpXHJcbiAgdmFyIGJ0bkRheUluY29tZXMgICA9ICQoXCIjYnRuLXNlZS1kYXktaW5jb21lc1wiKVxyXG4gIHZhciBsYXlvdXRDb250YWluZXIgPSAkKFwiLmxheW91dC1jb250YWluZXJcIik7XHJcblxyXG4gIGJ0bkF2ZXJpYXMub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgbGF5b3V0Q29udGFpbmVyLmFuaW1hdGUoe2xlZnQ6XCItMTAwJVwifSwyMDApO1xyXG4gIH0pO1xyXG5cclxuICBidG5QYWdvcy5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7bGVmdDpcIjBcIn0sMjAwKTtcclxuICB9KTtcclxuXHJcbiAgYnRuRGV1ZG9yZXMub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgbGF5b3V0Q29udGFpbmVyLmFuaW1hdGUoe2xlZnQ6XCItMjAwJVwifSwyMDApO1xyXG4gIH0pO1xyXG5cclxuICAgYnRuRGF5SW5jb21lcy5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICBsYXlvdXRDb250YWluZXIuYW5pbWF0ZSh7bGVmdDpcIi0zMDAlXCJ9LDIwMCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbiQoXCIjc2VsZWN0LWV4dHJhLXNlcnZpY2VcIikub24oJ2NoYW5nZScsZnVuY3Rpb24oKXtcclxuICB2YXIgJHRoaXMgPSAkKChcIiNzZWxlY3QtZXh0cmEtc2VydmljZSA6c2VsZWN0ZWRcIikpO1xyXG4gIHZhciBjb3N0ID0gJHRoaXMuYXR0cihcImRhdGEtcGF5bWVudFwiKTtcclxuICBcclxuICAkKFwiI2V4dHJhLXNlcnZpY2UtY29zdFwiKS52YWwoY29zdClcclxufSk7XHJcblxyXG4kKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS5vbignY2hhbmdlJyxmdW5jdGlvbigpe1xyXG4gIHZhciAkdGhpcyA9ICQoKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdCA6c2VsZWN0ZWRcIikpO1xyXG4gIFxyXG4gICQoXCIjZXh0cmEtY29udHJhY3Qtc2VydmljZVwiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtc2VydmljZVwiKSk7XHJcbiAgJChcIiNleHRyYS1lcXVpcG9cIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWVxdWlwbWVudFwiKSk7XHJcbiAgJChcIiNleHRyYS1yb3V0ZXJcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLXJvdXRlclwiKSk7XHJcbiAgJChcIiNleHRyYS1lLW1hY1wiKS52YWwoJHRoaXMuYXR0cihcImRhdGEtZS1tYWNcIikpO1xyXG4gICQoXCIjZXh0cmEtci1tYWNcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLXItbWFjXCIpKTtcclxuICAkKFwiI2V4dHJhLWNvZGVcIikudmFsKCR0aGlzLmF0dHIoXCJkYXRhLWNvZGVcIikpO1xyXG59KTtcclxuXHJcbiQoXCIuY29sdW1ucy1yaWdodFwiKS5yZW1vdmVDbGFzcyhcInB1bGwtcmlnaHRcIik7XHJcblxyXG4kKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKCl7XHJcbiAgdmFyICR0aGlzID0gJCgoXCIjc2VsZWN0LWNvbnRyYWN0LWNvZGUgOnNlbGVjdGVkXCIpKTtcclxuICAkKFwiI2NvbnRyYWN0LWlwXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1pcC1maW5hbFwiKSk7XHJcbiAgJChcIiN1LWNvbnRyYWN0LWlwXCIpLnZhbCgkdGhpcy5hdHRyKFwiZGF0YS1pcC1maW5hbFwiKSk7XHJcbiBcclxufSk7XHJcblxyXG5mdW5jdGlvbiBjaGVja1dpbmRvd1NpemUoKSB7XHJcbiAgdmFyIHdpZHRoID0gd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoO1xyXG4gIHZhciBicmFuZE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnJhbmQgc3BhbicpO1xyXG4gIFxyXG4gIGlmKHdpZHRoIDw9IDExMDApe1xyXG4gICAgYnJhbmROYW1lLnRleHRDb250ZW50ID0gXCJQXCI7XHJcbiAgfWVsc2V7XHJcbiAgICBicmFuZE5hbWUudGV4dENvbnRlbnQgPSBcIlBheW1lbnRcIjtcclxuICB9XHJcbn1cclxuXHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gIHBvc2l0aW9uID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpXHJcbiAgbW92YWJsZU5hdiA9ICQoJy5hc2lkZS1uYXYtY29udGFpbmVyLCAuYXNpZGUtd2lkZS1sZWZ0JylcclxuXHJcbiAgaWYocG9zaXRpb24gPj0gNTApe1xyXG4gICAgbW92YWJsZU5hdi5hZGRDbGFzcygnbW92ZWQnKVxyXG4gIH1lbHNle1xyXG4gICAgbW92YWJsZU5hdi5yZW1vdmVDbGFzcygnbW92ZWQnKVxyXG4gIH1cclxufSkiLCJ2YXIgVXNlcnMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgbmljaywgcGFzc3dvcmQsIG5hbWUsIGxhc3RuYW1lLCBkbmksIHR5cGUsIGlzX2VtcHR5O1xyXG5cclxuICAgIG5pY2sgICAgICA9ICQoXCIjdXNlci1uaWNrbmFtZVwiKS52YWwoKTtcclxuICAgIHBhc3N3b3JkICA9ICQoXCIjdXNlci1wYXNzd29yZFwiKS52YWwoKTtcclxuICAgIG5hbWUgICAgICA9ICQoXCIjdXNlci1uYW1lXCIpLnZhbCgpO1xyXG4gICAgbGFzdG5hbWUgID0gJChcIiN1c2VyLWxhc3RuYW1lXCIpLnZhbCgpO1xyXG4gICAgZG5pICAgICAgID0gZ2V0VmFsKCQoXCIjdXNlci1kbmlcIikpO1xyXG4gICAgdHlwZSAgICAgID0gJChcIiN1c2VyLXR5cGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbbmljaywgcGFzc3dvcmQsIG5hbWUsIGxhc3RuYW1lLCBkbmksIHR5cGVdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICduaWNrbmFtZT0nICsgbmljayArIFwiJnBhc3N3b3JkPVwiICsgcGFzc3dvcmQgKyBcIiZuYW1lPVwiICsgbmFtZSArIFwiJmxhc3RuYW1lPVwiICsgbGFzdG5hbWU7XHJcbiAgICAgIGZvcm0gKz0gXCImZG5pPVwiICsgZG5pICsgXCImdHlwZT1cIiArIHR5cGU7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwidXNlci9hZGRuZXdcIiwgdHJ1ZSwgaW5pdEFkbWluSGFuZGxlcnMsIG51bGwsIGZvcm0sIFVzZXJzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIG5pY2ssIHBhc3N3b3JkLCBuYW1lLCBsYXN0bmFtZSwgZG5pLCB0eXBlO1xyXG5cclxuICAgIG5pY2sgICAgID0gJChcIiNlLW5pY2tuYW1lXCIpLnZhbCgpO1xyXG4gICAgbmFtZSAgICAgPSAkKFwiI2UtbmFtZVwiKS52YWwoKTtcclxuICAgIGxhc3RuYW1lID0gJChcIiNlLWxhc3RuYW1lXCIpLnZhbCgpO1xyXG4gICAgZG5pICAgICAgPSAkKFwiI2UtZG5pXCIpLnZhbCgpO1xyXG4gICAgdHlwZSAgICAgPSAkKFwiI2UtdHlwZVwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtuaWNrLCBuYW1lLCBsYXN0bmFtZSwgZG5pLCB0eXBlXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnbmlja25hbWU9JyArIG5pY2sgKyBcIiZuYW1lPVwiICsgbmFtZSArIFwiJmxhc3RuYW1lPVwiICsgbGFzdG5hbWU7XHJcbiAgICAgIGZvcm0gKz0gXCImZG5pPVwiICsgZG5pICsgXCImdHlwZT1cIiArIHR5cGU7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwidXNlci91cGRhdGVcIiwgdHJ1ZSwgaW5pdEFkbWluSGFuZGxlcnMsIG51bGwsIGZvcm0sIFVzZXJzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsZT11c2Vyc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3VzZXIvZ2V0dXNlcnMnLCBmYWxzZSwgaW5pdEFkbWluSGFuZGxlcnMsIHVzZXJUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBkZWxldGU6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInVzZXJfaWQ9XCIgKyBpZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL2RlbGV0ZXVzZXInLCB0cnVlLCBpbml0QWRtaW5IYW5kbGVycywgbnVsbCwgZm9ybSwgVXNlcnMuZ2V0QWxsKTtcclxuICB9LFxyXG5cclxuICBjb25maXJtUGFzc3dvcmQ6IGZ1bmN0aW9uKHVzZXJJZCxjdXJyZW50UGFzc3dvcmQpIHtcclxuICAgIHZhciBmb3JtID0gJ3VzZXJfaWQ9JysgdXNlcklkICsnJmN1cnJlbnRfcGFzc3dvcmQ9JyArIGN1cnJlbnRQYXNzd29yZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL2NvbmZpcm1fcGFzc3dvcmQnLCBmYWxzZSwgZmFsc2UsIHByb2Nlc3NDb25maXJtRGF0YSwgZm9ybSwgbnVsbCwgbnVsbCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHByb2Nlc3NDb25maXJtRGF0YShyZXNwb25zZSkge1xyXG4gICAgICB2YXIgbmV3UGFzc3dvcmQgICAgICAgICA9ICQoXCIjYWNvdW50LW5ldy1wYXNzd29yZFwiKTtcclxuICAgICAgdmFyIG5ld1Bhc3N3b3JkQ29uZmlybSAgPSAkKFwiI2Fjb3VudC1jb25maXJtLW5ldy1wYXNzd29yZFwiKTtcclxuICAgICAgXHJcbiAgICAgIGlmIChyZXNwb25zZSA9PSAxKSB7ICAgICAgXHJcbiAgICAgICAgbmV3UGFzc3dvcmQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICBuZXdQYXNzd29yZENvbmZpcm0ucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICB2YWxpZGF0ZVRoaXMoKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgbmV3UGFzc3dvcmQuYXR0cignZGlzYWJsZWQnLHRydWUpO1xyXG4gICAgICAgIG5ld1Bhc3N3b3JkQ29uZmlybS5hdHRyKCdkaXNhYmxlZCcsdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGVQYXNzd29yZDogZnVuY3Rpb24odXNlcklkLGN1cnJlbnRQYXNzd29yZCxuZXdQYXNzd29yZCl7XHJcbiAgICB2YXIgZm9ybSA9ICd1c2VyX2lkPScrIHVzZXJJZCAgKyBcIiZjdXJyZW50X3Bhc3N3b3JkPVwiKyBjdXJyZW50UGFzc3dvcmQgKycmbmV3X3Bhc3N3b3JkPScgKyBuZXdQYXNzd29yZDtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCd1c2VyL3VwZGF0ZV9wYXNzd29yZCcsIGZhbHNlLCBmYWxzZSwgVXNlcnMucGFzc3dvcmRDaGFuZ2VkLCBmb3JtLCBudWxsLGhlYXZ5TG9hZCk7XHJcbiAgfSxcclxuXHJcbiAgcGFzc3dvcmRDaGFuZ2VkOiBmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICBpZihyZXNwb25zZT09MSl7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfU1VDQ0VTUyArICdDb250cmFzZcOxYSBDYW1iaWFkYSBjb24gZXhpdG8nKVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBCQVNFX1VSTCArICdhcHAvbG9nb3V0J1xyXG4gICAgICB9LDMwMDApICAgICAgXHJcbiAgICB9ZWxzZXtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArICcgRXJyb3IgYWwgY2FtYmlhciBkZSBjb250cmFzZcOxYSwgcmV2aXNlIGxhIGNvbnRyYXNlw7FhIGFjdHVhbCcpXHJcbiAgICB9XHJcbiAgICAgIFxyXG4gIH1cclxufVxyXG5cclxudmFyIENsaWVudHMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgdmFyIGZvcm0sIG5vbWJyZXMsIGFwZWxsaWRvcywgY2VkdWxhLCBjZWx1bGFyLCBwcm92aW5jaWEsIHNlY3RvciwgY2FsbGUsIGNhc2EsIHRlbGVmb25vLFxyXG4gICAgICAgbHVnYXJUcmFiYWpvLCB0ZWxUcmFiYWpvLCBpbmdyZXNvcywgZmVjaGFSZWdpc3RybywgZXN0YWRvO1xyXG5cclxuICAgIG5vbWJyZXMgICAgICAgPSAkKFwiI2NsaWVudC1uYW1lXCIpLnZhbCgpO1xyXG4gICAgYXBlbGxpZG9zICAgICA9ICQoXCIjY2xpZW50LWxhc3RuYW1lXCIpLnZhbCgpO1xyXG4gICAgY2VkdWxhICAgICAgICA9IGdldFZhbCgkKFwiI2NsaWVudC1kbmlcIikpO1xyXG4gICAgY2VsdWxhciAgICAgICA9IGdldFZhbCgkKFwiI2NsaWVudC1waG9uZVwiKSk7XHJcbiAgICBwcm92aW5jaWEgICAgID0gJChcIiNjbGllbnQtcHJvdmluY2lhXCIpLnZhbCgpO1xyXG4gICAgc2VjdG9yICAgICAgICA9ICQoXCIjY2xpZW50LXNlY3RvclwiKS52YWwoKTtcclxuICAgIGNhbGxlICAgICAgICAgPSAkKFwiI2NsaWVudC1zdHJlZXRcIikudmFsKCk7XHJcbiAgICBjYXNhICAgICAgICAgID0gJCgnI2NsaWVudC1ob3VzZScpLnZhbCgpO1xyXG4gICAgdGVsZWZvbm8gICAgICA9IGdldFZhbCgkKCcjY2xpZW50LXRlbGVwaG9uZScpKTtcclxuICAgIGx1Z2FyVHJhYmFqbyAgPSAkKCcjY2xpZW50LWpvYicpLnZhbCgpO1xyXG4gICAgdGVsVHJhYmFqbyAgICA9IGdldFZhbCgkKCcjY2xpZW50LWpvYi10ZWxlcGhvbmUnKSk7XHJcbiAgICBpbmdyZXNvcyAgICAgID0gJCgnI2NsaWVudC1zYWxhcnknKS52YWwoKTtcclxuICAgIGZlY2hhUmVnaXN0cm8gPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpOztcclxuICAgIGVzdGFkbyAgICAgICAgPSBcIm5vIGFjdGl2b1wiO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW25vbWJyZXMsIGFwZWxsaWRvcywgY2VkdWxhLCBjZWx1bGFyLCBwcm92aW5jaWEsIHNlY3RvciwgY2FsbGUsIGNhc2EsIHRlbGVmb25vXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnbm9tYnJlcz0nICsgbm9tYnJlcyArIFwiJmFwZWxsaWRvcz1cIiArIGFwZWxsaWRvcyArIFwiJmNlZHVsYT1cIiArIGNlZHVsYSArIFwiJmNlbHVsYXI9XCIgKyBjZWx1bGFyO1xyXG4gICAgICBmb3JtICs9IFwiJnByb3ZpbmNpYT1cIiArIHByb3ZpbmNpYSArIFwiJnNlY3Rvcj1cIiArIHNlY3RvciArIFwiJmNhbGxlPVwiICsgY2FsbGUgKyBcIiZjYXNhPVwiICsgY2FzYSArIFwiJnRlbGVmb25vPVwiICsgdGVsZWZvbm87XHJcbiAgICAgIGZvcm0gKz0gXCImbHVnYXJfdHJhYmFqbz1cIiArIGx1Z2FyVHJhYmFqbyArIFwiJnRlbF90cmFiYWpvPVwiICsgdGVsVHJhYmFqbyArIFwiJmluZ3Jlc29zPVwiICsgaW5ncmVzb3MgKyBcIiZmZWNoYV9yZWdpc3Rybz1cIiArIGZlY2hhUmVnaXN0cm87XHJcbiAgICAgIGZvcm0gKz0gXCImZXN0YWRvPVwiICsgZXN0YWRvICsgXCImdGFibGE9Y2xpZW50ZXNcIjtcclxuXHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9hZGRcIiwgdHJ1ZSwgaW5pdENsaWVudEhhbmRsZXJzLCBudWxsLCBmb3JtLCBDbGllbnRzLmdldEFsbCk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1jbGllbnRlc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIGluaXRDbGllbnRIYW5kbGVycywgY2xpZW50VGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0T25lOiBmdW5jdGlvbiAoaWQsIHJlY2VpdmVyKSB7XHJcbiAgICBmb3JtID0gXCJ0YWJsYT1jbGllbnRlcyZpZD1cIiArIGlkO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2dldG9uZVwiLCBmYWxzZSwgaW5pdENsaWVudEhhbmRsZXJzLCByZWNlaXZlciwgZm9ybSwgbnVsbClcclxuICB9LFxyXG5cclxuICByZWNlaXZlRm9yRWRpdDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgIHZhciBjbGllbnQgICAgICAgID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgIHRoaXMuaWQgICAgICAgICAgICA9IGNsaWVudFsnaWRfY2xpZW50ZSddO1xyXG4gICAgdmFyICRub21icmVzICAgICAgPSAkKFwiI3UtY2xpZW50LW5hbWVcIik7XHJcbiAgICB2YXIgJGFwZWxsaWRvcyAgICA9ICQoXCIjdS1jbGllbnQtbGFzdG5hbWVcIik7XHJcbiAgICB2YXIgJGNlZHVsYSAgICAgICA9ICQoXCIjdS1jbGllbnQtZG5pXCIpO1xyXG4gICAgdmFyICRjZWx1bGFyICAgICAgPSAkKFwiI3UtY2xpZW50LXBob25lXCIpO1xyXG4gICAgdmFyICRwcm92aW5jaWEgICAgPSAkKFwiI3UtY2xpZW50LXByb3ZpbmNpYVwiKTtcclxuICAgIHZhciAkc2VjdG9yICAgICAgID0gJChcIiN1LWNsaWVudC1zZWN0b3JcIik7XHJcbiAgICB2YXIgJGNhbGxlICAgICAgICA9ICQoXCIjdS1jbGllbnQtc3RyZWV0XCIpO1xyXG4gICAgdmFyICRjYXNhICAgICAgICAgPSAkKCcjdS1jbGllbnQtaG91c2UnKTtcclxuICAgIHZhciAkdGVsZWZvbm8gICAgID0gJCgnI3UtY2xpZW50LXRlbGVwaG9uZScpO1xyXG4gICAgdmFyICRsdWdhclRyYWJham8gPSAkKCcjdS1jbGllbnQtam9iJyk7XHJcbiAgICB2YXIgJHRlbFRyYWJham8gICA9ICQoJyN1LWNsaWVudC1qb2ItdGVsZXBob25lJyk7XHJcbiAgICB2YXIgJGluZ3Jlc29zICAgICA9ICQoJyN1LWNsaWVudC1zYWxhcnknKTtcclxuXHJcbiAgICAkbm9tYnJlcy52YWwoY2xpZW50Wydub21icmVzJ10pO1xyXG4gICAgJGFwZWxsaWRvcy52YWwoY2xpZW50WydhcGVsbGlkb3MnXSlcclxuICAgICRjZWR1bGEudmFsKGNsaWVudFsnY2VkdWxhJ10pXHJcbiAgICAkY2VsdWxhci52YWwoY2xpZW50WydjZWx1bGFyJ10pXHJcbiAgICAkcHJvdmluY2lhLnZhbChjbGllbnRbJ3Byb3ZpbmNpYSddKVxyXG4gICAgJHNlY3Rvci52YWwoY2xpZW50WydzZWN0b3InXSlcclxuICAgICRjYWxsZS52YWwoY2xpZW50WydjYWxsZSddKVxyXG4gICAgJGNhc2EudmFsKGNsaWVudFsnY2FzYSddKVxyXG4gICAgJHRlbGVmb25vLnZhbChjbGllbnRbJ3RlbGVmb25vJ10pXHJcbiAgICAkbHVnYXJUcmFiYWpvLnZhbChjbGllbnRbJ2x1Z2FyX3RyYWJham8nXSlcclxuICAgICR0ZWxUcmFiYWpvLnZhbChjbGllbnRbJ3RlbF90cmFiYWpvJ10pXHJcbiAgICAkaW5ncmVzb3MudmFsKGNsaWVudFsnc2FsYXJpbyddKVxyXG5cclxuICAgICQoXCIjdXBkYXRlLWNsaWVudC1tb2RhbFwiKS5tb2RhbCgpO1xyXG4gICAgJChcIiNidG4tdXBkYXRlLWNsaWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHVwZGF0ZUNsaWVudCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlQ2xpZW50KCkge1xyXG4gICAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFskbm9tYnJlcy52YWwoKSwgJGFwZWxsaWRvcy52YWwoKSwgJGNlZHVsYS52YWwoKSwgJGNlbHVsYXIudmFsKCksICRwcm92aW5jaWEudmFsKCksICRzZWN0b3IudmFsKCksICRjYWxsZS52YWwoKSxcclxuICAgICAgICAkY2FzYS52YWwoKSwgJHRlbGVmb25vLnZhbCgpXHJcbiAgICAgIF0pO1xyXG5cclxuICAgICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICAgIGZvcm0gPSAnaWQ9JyArIGlkICsgJyZub21icmVzPScgKyAkbm9tYnJlcy52YWwoKSArIFwiJmFwZWxsaWRvcz1cIiArICRhcGVsbGlkb3MudmFsKCkgKyBcIiZjZWR1bGE9XCIgKyBnZXRWYWwoJGNlZHVsYSk7XHJcbiAgICAgICAgZm9ybSArPSBcIiZjZWx1bGFyPVwiICsgZ2V0VmFsKCRjZWx1bGFyKSArIFwiJnByb3ZpbmNpYT1cIiArICRwcm92aW5jaWEudmFsKCkgKyBcIiZzZWN0b3I9XCIgKyAkc2VjdG9yLnZhbCgpICsgXCImY2FsbGU9XCIgKyAkY2FsbGUudmFsKCk7XHJcbiAgICAgICAgZm9ybSArPSBcIiZjYXNhPVwiICsgJGNhc2EudmFsKCkgKyBcIiZ0ZWxlZm9ubz1cIiArIGdldFZhbCgkdGVsZWZvbm8pICsgXCImbHVnYXJfdHJhYmFqbz1cIiArICRsdWdhclRyYWJham8udmFsKCkgKyBcIiZ0ZWxfdHJhYmFqbyA9XCI7XHJcbiAgICAgICAgZm9ybSArPSBnZXRWYWwoJHRlbFRyYWJham8pICsgXCImdGFibGE9Y2xpZW50ZXNcIjtcclxuICAgICAgICBmb3JtICs9IFwiJmluZ3Jlc29zPVwiICsgJGluZ3Jlc29zLnZhbCgpO1xyXG5cclxuICAgICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIGluaXRDbGllbnRIYW5kbGVycywgbnVsbCwgZm9ybSwgQ2xpZW50cy5nZXRBbGwpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc2F2ZU9ic2VydmF0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0sIG9ic2VydmF0aW9ucyxpZENsaWVudGU7XHJcbiBcclxuICAgIG9ic2VydmF0aW9ucyA9ICQoXCIjdGV4dC1vYnNlcnZhdGlvbnNcIikudmFsKCk7XHJcbiAgICBpZENsaWVudGUgICAgPSAkKFwiI2RldGFpbC1jbGllbnQtaWRcIikudmFsKCk7XHJcbiBcclxuICAgIGZvcm0gPSAnb2JzZXJ2YWNpb25lcz0nICsgb2JzZXJ2YXRpb25zICsgXCImdGFibGE9b2JzZXJ2YWNpb25lcyZpZF9jbGllbnRlPVwiICsgaWRDbGllbnRlO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL3VwZGF0ZVwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcbiAgXHJcbiAgdXBkYXRlU3RhdGU6IGZ1bmN0aW9uIChjbGllbnQpIHtcclxuICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShjbGllbnQpKyAnJm1vZHVsZT1jbGllbnRlcyZhY3Rpb249dXBkYXRlJztcclxuICAgICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0anNvbicsdHJ1ZSxudWxsLG51bGwsZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgR2VuZXJhbHMgPSB7XHJcbiAgZGVsZXRlUm93OiBmdW5jdGlvbiAoaWQsIHRhYmxhKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9XCIgKyB0YWJsYSArIFwiJmlkPVwiICsgaWQ7XHJcbiAgICB2YXIgaGFuZGxlcnMsIGNhbGxiYWNrO1xyXG4gICAgc3dpdGNoICh0YWJsYSkge1xyXG4gICAgICBjYXNlICdjbGllbnRlcyc6XHJcbiAgICAgICAgY2FsbGJhY2sgPSBDbGllbnRzLmdldEFsbDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc2VydmljaW9zJzpcclxuICAgICAgICBjYWxsYmFjayA9IFNlcnZpY2VzLmdldEFsbDtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2RlbGV0ZScsIHRydWUsbnVsbCwgbnVsbCwgZm9ybSwgY2FsbGJhY2spO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogU2VhcmNoIG1hbmRhIHVuIG1lbnNhamUgYWwgc2Vydmlkb3IgZGUgbG9zIHZhbG9yZXMgYSBidXNjYXJcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBlbCB2YWxvciBhIHNlciBidXNjYWRvXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRiVGFibGUgbm9tYnJlIGRlIGxhIHRhYmxhIGRvbmRlIHNlIGRlc2VhIGNvbnN1bHRhciBlbiBsYSBiYXNlIGRlIGRhdG9zXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZmlsbFRhYmxlRnVuY3Rpb24gZnVuY2lvbiBkZSBsbGVuYWRvIGRlIHRhYmxhIGRvbmRlIHNlIG1vc3RyYXJhbiBsb3MgcmVzdWx0YWRvcyBcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBoYW5kbGVyRnVuY3Rpb24gZnVuY2lvbiByZWluaWNpbyBkZSBsb3MgZWxlbWVudG9zIGVuIGxvcyBoYW5kbGVycyBcclxuICAgKi9cclxuICBcclxuICBzZWFyY2g6IGZ1bmN0aW9uICh0ZXh0LCBkYlRhYmxlLCBmaWxsVGFibGVGdW5jdGlvbiwgaGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgICBpZiAoaGFuZGxlckZ1bmN0aW9uID09IHVuZGVmaW5lZCkgaGFuZGxlckZ1bmN0aW9uID0gaW5pdENsaWVudEhhbmRsZXJzO1xyXG4gICAgaWYgKGZpbGxUYWJsZUZ1bmN0aW9uID09IHVuZGVmaW5lZCkgZmlsbFRhYmxlRnVuY3Rpb24gPSBmaWxsQ3VycmVudFRhYmxlO1xyXG4gICAgdmFyIHdvcmQgPSB0ZXh0O1xyXG4gICAgaWYgKHdvcmQgIT0gbnVsbCB8fCB3b3JkICE9IFwiXCIpIHtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPVwiICsgZGJUYWJsZSArIFwiJndvcmQ9XCIgKyB3b3JkO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9zZWFyY2gnLCBmYWxzZSwgaGFuZGxlckZ1bmN0aW9uLCBmaWxsVGFibGVGdW5jdGlvbiwgZm9ybSwgbnVsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY291bnRfdGFibGU6IGZ1bmN0aW9uICh0YWJsZSkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPVwiICsgdGFibGU7XHJcbiAgICB2YXIgdXBkYXRlRnVuY3Rpb24gPSB1cGRhdGVDb3VudDtcclxuICAgIGlmICh0YWJsZSA9PSAnY2FqYScpIHVwZGF0ZUZ1bmN0aW9uID0gdXBkYXRlQ2FqYUNvdW50XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9jb3VudCcsIGZhbHNlLCBudWxsLCB1cGRhdGVGdW5jdGlvbiwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgU2VydmljZXMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgbmFtZSwgZGVzY3JpcHRpb24sIHBheW1lbnQsIHR5cGU7XHJcblxyXG4gICAgbmFtZSAgICAgICAgPSAkKFwiI3NlcnZpY2UtbmFtZVwiKS52YWwoKTtcclxuICAgIGRlc2NyaXB0aW9uID0gJChcIiNzZXJ2aWNlLWRlc2NyaXB0aW9uXCIpLnZhbCgpO1xyXG4gICAgcGF5bWVudCAgICAgPSAkKFwiI3NlcnZpY2UtbW9udGhseS1wYXltZW50XCIpLnZhbCgpO1xyXG4gICAgdHlwZSAgICAgICAgPSAkKFwiI3NlcnZpY2UtdHlwZVwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtuYW1lLCBkZXNjcmlwdGlvbiwgcGF5bWVudCwgdHlwZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ25vbWJyZT0nICsgbmFtZSArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb24gKyBcIiZtZW5zdWFsaWRhZD1cIiArIHBheW1lbnQgKyBcIiZ0aXBvPVwiICsgdHlwZTtcclxuICAgICAgZm9ybSArPSBcIiZ0YWJsYT1zZXJ2aWNpb3NcIjtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2FkZFwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBTZXJ2aWNlcy5nZXRBbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1zZXJ2aWNpb3NcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBzZXJ2aWNlVGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgaWQsIG5hbWUsIGRlc2NyaXB0aW9uLCBwYXltZW50LCB0eXBlO1xyXG5cclxuICAgIGlkICAgICAgICAgID0gJCgnI3Utc2VydmljZS1pZCcpLnZhbCgpO1xyXG4gICAgbmFtZSAgICAgICAgPSAkKCcjdS1zZXJ2aWNlLW5hbWUnKS52YWwoKTtcclxuICAgIGRlc2NyaXB0aW9uID0gJCgnI3Utc2VydmljZS1kZXNjcmlwdGlvbicpLnZhbCgpO1xyXG4gICAgcGF5bWVudCAgICAgPSAkKCcjdS1zZXJ2aWNlLW1vbnRobHktcGF5bWVudCcpLnZhbCgpO1xyXG4gICAgdHlwZSAgICAgICAgPSAkKCcjdS1zZXJ2aWNlLXR5cGUnKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtpZCwgbmFtZSwgZGVzY3JpcHRpb24sIHBheW1lbnQsIHR5cGVdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9zZXJ2aWNpbz0nICsgaWQgKyBcIiZub21icmU9XCIgKyBuYW1lICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbiArIFwiJm1lbnN1YWxpZGFkPVwiICsgcGF5bWVudDtcclxuICAgICAgZm9ybSArPSBcIiZ0aXBvPVwiICsgdHlwZSArIFwiJnRhYmxhPXNlcnZpY2lvc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFNlcnZpY2VzLmdldEFsbCxoZWF2eUxvYWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiTExlbmUgdG9kb3MgbG9zIGNhbXBvcyBwb3IgZmF2b3JcIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbnZhciBDb250cmFjdHMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiBhZGROZXdDb250cmFjdCgpIHtcclxuICAgIHZhciBmb3JtLCB0YWJsZSwgY2xpZW50X2lkLCB1c2VyX2lkLCBzZXJ2aWNlX2lkLCBjb2RlLCBjb250cmFjdF9kYXRlLCBwYXltZW50LCBkdXJhdGlvbixcclxuICAgICAgZXF1aXBtZW50LCBlTWFjLCByb3V0ZXIsIHJNYWMsIHRvdGFsLCBuZXh0UGF5bWVudCwgbW9kZWwsIGlwO1xyXG5cclxuICAgIGNsaWVudF9pZCAgICAgPSAkKFwiI2NvbnRyYWN0LWNsaWVudC1pZFwiKS52YWwoKTtcclxuICAgIHVzZXJfaWQgICAgICAgPSAkKFwiI2NvbnRyYWN0LXVzZXItaWRcIikudmFsKCk7XHJcbiAgICBzZXJ2aWNlX2lkICAgID0gJChcIi5zZXJ2aWNlLWNhcmQuc2VsZWN0ZWRcIikuYXR0cignZGF0YS1pZCcpO1xyXG4gICAgY29udHJhY3RfZGF0ZSA9ICQoJyNjb250cmFjdC1jbGllbnQtZGF0ZScpLnZhbCgpO1xyXG4gICAgZHVyYXRpb24gICAgICA9ICQoJyNjb250cmFjdC1jbGllbnQtbW9udGhzJykudmFsKCk7XHJcbiAgICBlcXVpcG1lbnQgICAgID0gJCgnI2NvbnRyYWN0LWVxdWlwbWVudCcpLnZhbCgpO1xyXG4gICAgZU1hYyAgICAgICAgICA9ICQoJyNjb250cmFjdC1lLW1hYycpLnZhbCgpO1xyXG4gICAgcm91dGVyICAgICAgICA9ICQoJyNjb250cmFjdC1yb3V0ZXInKS52YWwoKTtcclxuICAgIHJNYWMgICAgICAgICAgPSAkKCcjY29udHJhY3Qtci1tYWMnKS52YWwoKTtcclxuICAgIG1vZGVsICAgICAgICAgPSAkKCcjY29udHJhY3QtZXF1aXBtZW50LW1vZGVsJykudmFsKCk7XHJcbiAgICBpcCAgICAgICAgICAgID0gJCgnI2NvbnRyYWN0LWlwJykudmFsKCk7XHJcbiAgICBjb2RlICAgICAgICAgID0gJChcIiNzZWxlY3QtY29udHJhY3QtY29kZVwiKS52YWwoKTtcclxuXHJcbiAgICBwYXltZW50ID0gJChcIiNjb250cmFjdC1jbGllbnQtcGF5bWVudFwiKS52YWwoKTtcclxuICAgIG5leHRQYXltZW50ID0gbW9tZW50KGNvbnRyYWN0X2RhdGUpLmFkZCgxLCAnbW9udGhzJykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY2xpZW50X2lkLCB1c2VyX2lkLCBzZXJ2aWNlX2lkLCBjb250cmFjdF9kYXRlLCBkdXJhdGlvbl0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICB0b3RhbCA9IChOdW1iZXIoZHVyYXRpb24pICsgMSkgKiBOdW1iZXIocGF5bWVudCk7XHJcbiAgICAgIGZvcm0gPSAnaWRfZW1wbGVhZG89JyArIHVzZXJfaWQgKyBcIiZpZF9jbGllbnRlPVwiICsgY2xpZW50X2lkICsgXCImaWRfc2VydmljaW89XCIgKyBzZXJ2aWNlX2lkICsgXCImY29kaWdvPVwiICsgY29kZSArIFwiJmZlY2hhPVwiICsgY29udHJhY3RfZGF0ZTtcclxuICAgICAgZm9ybSArPSBcIiZkdXJhY2lvbj1cIiArIGR1cmF0aW9uICsgXCImbW9udG9fdG90YWw9XCIgKyB0b3RhbCArIFwiJm1vbnRvX3BhZ2Fkbz0wJnVsdGltb19wYWdvPW51bGxcIjtcclxuICAgICAgZm9ybSArPSBcIiZtZW5zdWFsaWRhZD1cIiArIHBheW1lbnQgKyBcIiZwcm94aW1vX3BhZ289XCIgKyBuZXh0UGF5bWVudCArIFwiJmVzdGFkbz1hY3Rpdm8mdGFibGE9Y29udHJhdG9zXCI7XHJcbiAgICAgIGZvcm0gKz0gXCImbm9tYnJlX2VxdWlwbz1cIiArIGVxdWlwbWVudCArIFwiJm1hY19lcXVpcG89XCIgKyBlTWFjICsgXCImcm91dGVyPVwiICsgcm91dGVyICsgXCImbWFjX3JvdXRlcj1cIiArIHJNYWM7XHJcbiAgICAgIGZvcm0gKz0gXCImbW9kZWxvPVwiICsgbW9kZWwgKyBcIiZpcD1cIiArIGlwO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvYWRkXCIsIG51bGwsIG51bGwsIENvbnRyYWN0cy5nZXRMYXN0LCBmb3JtLCBudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZXh0ZW5kOiBmdW5jdGlvbihpZENvbnRyYXRvKSB7XHJcbiAgICB2YXIgZm9ybTtcclxuICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGlkQ29udHJhdG9yO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2V4dGVuZFwiLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNvbnRyYXRvc1wiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0YWxsJywgZmFsc2UsIG51bGwsIGNvbnRyYWN0VGFibGUucmVmcmVzaCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0TGFzdDogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEubWVuc2FqZSk7XHJcbiAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpXHJcbiAgICAkKFwiI2J0bi1zYXZlLWNvbnRyYWN0XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgICQoXCIjYnRuLXByaW50LWNvbnRyYWN0XCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgIGlmKGRhdGEudGFibGFfcGFnb3Mpe1xyXG4gICAgICBtYWtlUGF5bWVudExpc3QoZGF0YS50YWJsYV9wYWdvcyk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY2FsbEV4dHJhOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciByb3cgPSBjb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KCk7XHJcbiAgICBpZiAocm93KSB7XHJcbiAgICAgICQoXCIjZXh0cmEtY2xpZW50LWRuaVwiKS52YWwocm93LmNlZHVsYSk7XHJcbiAgICAgIENvbnRyYWN0cy5nZXRBbGxPZkNsaWVudChyb3cuY2VkdWxhKTtcclxuICAgICAgJCgnI2FkZC1leHRyYS1tb2RhbCcpLm1vZGFsKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgZGlzcGxheUFsZXJ0KFwiUmV2aXNlXCIsIFwiU2VsZWNjaW9uZSBlbCBjb25yYXRvIHByaW1lcm9cIiwgXCJlcnJvclwiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjYW5jZWw6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJvdyAgICAgICAgPSBjb250cmFjdFRhYmxlLmdldFNlbGVjdGVkUm93KClcclxuICAgIHZhciBpc19wZW5hbHR5ID0gZmFsc2U7XHJcbiAgICB2YXIgcmVhc29uICAgICA9ICQoXCIjY2FuY2VsYXRpb24tcmVhc29uXCIpLnZhbCgpO1xyXG4gICAgdmFyIGNoZWNrZWQgICAgPSAkKFwiI2NoZWNrLXBlbmFsdHk6Y2hlY2tlZFwiKS5sZW5ndGg7XHJcbiAgICB2YXIgZm9ybSwgZmVjaGE7XHJcbiAgICBpZihyb3cuaWQpe1xyXG4gICAgICBpZiAoY2hlY2tlZCA+IDApIHtcclxuICAgICAgICBpc19wZW5hbHR5ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBmZWNoYSA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIHJvdy5pZCArICcmZmVjaGE9JyArIGZlY2hhICsgJyZpZF9jbGllbnRlPScgKyByb3cuaWRfY2xpZW50ZTtcclxuICAgICAgZm9ybSArPSBcIiZtb3Rpdm89XCIgKyByZWFzb24gKyBcIiZwZW5hbGlkYWQ9XCIgKyBpc19wZW5hbHR5O1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9jYW5jZWwnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBDb250cmFjdHMuZ2V0QWxsKTtcclxuICAgIH1lbHNle1xyXG4gICAgICBkaXNwbGF5TWVzc2FnZShNRVNTQUdFX0VSUk9SICtcIiBObyBoYXkgY29udHJhdG8gc2VsZWNjaW9uYWRvXCIpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldE9uZTogZnVuY3Rpb24oaWRfY29udHJhdG8sIHJlY2VpdmVyKSB7XHJcbiAgICBmb3JtID0gXCJ0YWJsYT1jb250cmF0b3MmaWRfY29udHJhdG89XCIgKyBpZF9jb250cmF0bztcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRvbmVcIiwgZmFsc2UsIG51bGwsIHJlY2VpdmVyLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHJlY2lldmU6IGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuICAgIHZhciBjb250cmFjdCAgICA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICB0aGlzLmlkX2NvbnRyYXRvID0gY29udHJhY3RbJ2lkX2NvbnRyYXRvJ107XHJcbiAgICB2YXIgJGVxdWlwbyAgICAgPSAkKFwiI3UtY29udHJhY3QtZXF1aXBtZW50XCIpO1xyXG4gICAgdmFyICRtYWNFcXVpcG8gID0gJChcIiN1LWNvbnRyYWN0LWUtbWFjXCIpO1xyXG4gICAgdmFyICRyb3V0ZXIgICAgID0gJChcIiN1LWNvbnRyYWN0LXJvdXRlclwiKTtcclxuICAgIHZhciAkbWFjUm91dGVyICA9ICQoXCIjdS1jb250cmFjdC1yLW1hY1wiKTtcclxuICAgIHZhciAkbW9kZWxvICAgICA9ICQoXCIjdS1jb250cmFjdC1tb2RlbG9cIik7XHJcbiAgICB2YXIgJGNvZGlnbyAgICAgPSAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpO1xyXG4gICAgdmFyICRpc0NoYW5nZUlwID0gJChcIiNjaGVjay1jaGFuZ2UtaXBcIik7XHJcbiAgICB2YXIgJGlwICAgICAgICAgPSAkKFwiI3UtY29udHJhY3QtaXBcIik7XHJcblxyXG4gICAgJGVxdWlwby52YWwoY29udHJhY3RbJ25vbWJyZV9lcXVpcG8nXSk7XHJcbiAgICAkbWFjRXF1aXBvLnZhbChjb250cmFjdFsnbWFjX2VxdWlwbyddKTtcclxuICAgICRyb3V0ZXIudmFsKGNvbnRyYWN0Wydyb3V0ZXInXSk7XHJcbiAgICAkbWFjUm91dGVyLnZhbChjb250cmFjdFsnbWFjX3JvdXRlciddKTtcclxuICAgICRtb2RlbG8udmFsKGNvbnRyYWN0Wydtb2RlbG8nXSk7XHJcbiAgICAkaXAudmFsKGNvbnRyYWN0WydpcCddKTtcclxuXHJcbiAgICAvLyAkKFwiI3VwZGF0ZS1jb250cmFjdC1tb2RhbCBzZWxlY3RcIikudmFsKCcnKVxyXG4gICAgJChcIiN1cGRhdGUtY29udHJhY3QtbW9kYWxcIikubW9kYWwoKTtcclxuICAgICQoXCIjdXBkYXRlLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHVwZGF0ZUNvbnRyYWN0KGlkX2NvbnRyYXRvKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRyYWN0KGlkX2NvbnRyYXRvKSB7XHJcbiAgICAgIHZhciBjaGVja2VkID0gJChcIiNjaGVjay1jaGFuZ2UtaXA6Y2hlY2tlZFwiKS5sZW5ndGg7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGlkX2NvbnRyYXRvICsgJyZub21icmVfZXF1aXBvPScgKyAkZXF1aXBvLnZhbCgpICsgXCImbWFjX2VxdWlwbz1cIiArICRtYWNFcXVpcG8udmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImcm91dGVyPVwiICsgJHJvdXRlci52YWwoKSArIFwiJm1hY19yb3V0ZXI9XCIgKyAkbWFjUm91dGVyLnZhbCgpO1xyXG4gICAgICBmb3JtICs9IFwiJm1vZGVsbz1cIiArICRtb2RlbG8udmFsKCk7XHJcbiAgICAgIGZvcm0gKz0gXCImdGFibGE9Y29udHJhdG9zXCI7XHJcbiAgICAgIGlmIChjaGVja2VkID4gMCkge1xyXG4gICAgICAgIGZvcm0gKz0gXCImaXA9XCIgKyAkaXAudmFsKCkgKyBcIiZjb2RpZ289XCIgKyAkY29kaWdvLnZhbCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0SXBMaXN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VjdGlvbl9pZCA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0LXNlY3RvclwiKS52YWwoKTtcclxuICAgIHZhciBmb3JtID0gXCJpZF9zZWNjaW9uPVwiICsgc2VjdGlvbl9pZCArIFwiJnRhYmxhPWlwX2xpc3RcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRhbGxcIiwgZmFsc2UsIG51bGwsIG1ha2VJcExpc3QsIGZvcm0sIG51bGwpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1ha2VJcExpc3QoY29udGVudCkge1xyXG4gICAgICAkKFwiI3NlbGVjdC1jb250cmFjdC1jb2RlXCIpLmh0bWwoY29udGVudCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYnRuRXh0cmFQcmVzc2VkOiBmdW5jdGlvbiAoJHRoaXMpIHtcclxuICAgIHZhciBidXR0b25JZCA9ICR0aGlzLnRleHQoKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBzd2l0Y2ggKGJ1dHRvbklkKSB7XHJcbiAgICAgIGNhc2UgXCJtZWpvcmFyXCI6XHJcbiAgICAgICAgQ29udHJhY3RzLnVwZ3JhZGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImV4dGVuZGVyXCI6XHJcbiAgICAgICAgQ29udHJhY3RzLmV4dGVuZCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZ3VhcmRhclwiOlxyXG4gICAgICAgIENvbnRyYWN0cy5hZGRFeHRyYSgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHVwZ3JhZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBzZWxlY3RlZFNlcnZpY2UsIHNlcnZpY2VJZCwgYW1vdW50O1xyXG5cclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIHNlbGVjdGVkU2VydmljZSA9ICQoXCIuc2VydmljZS1jYXJkLnNlbGVjdGVkXCIpO1xyXG4gICAgc2VydmljZUlkID0gc2VsZWN0ZWRTZXJ2aWNlLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG4gICAgYW1vdW50ID0gc2VsZWN0ZWRTZXJ2aWNlLmF0dHIoXCJkYXRhLXBheW1lbnRcIik7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY29udHJhY3RJZCwgc2VydmljZUlkLCBhbW91bnRdKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgZm9ybSA9ICdpZF9jb250cmF0bz0nICsgY29udHJhY3RJZCArIFwiJmlkX3NlcnZpY2lvPVwiICsgc2VydmljZUlkICsgXCImY3VvdGE9XCIgKyBhbW91bnQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZ3JhZGUnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZWNvbm5lY3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBzZWxlY3RlZFNlcnZpY2UsIHNlcnZpY2VJZCwgZHVyYXRpb24sIGRhdGUsc2VuZCwgaXNfZW1wdHksaW5mbztcclxuXHJcbiAgICBjb250cmFjdElkID0gJChcIiNzZWxlY3QtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICBzZWxlY3RlZFNlcnZpY2UgPSAkKFwiLnNlcnZpY2UtY2FyZC5zZWxlY3RlZFwiKTtcclxuICAgIHNlcnZpY2VJZCA9IHNlbGVjdGVkU2VydmljZS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgIGR1cmF0aW9uICA9ICQoXCIjcmVjb25uZWN0aW9uLW1vbnRoc1wiKS52YWwoKTtcclxuICAgIGRhdGUgPSAkKFwiI3JlY29ubmVjdGlvbi1kYXRlXCIpLnZhbCgpXHJcblxyXG4gICAgaXNfZW1wdHkgPSBpc0VtcHR5KFtjb250cmFjdElkLHNlcnZpY2VJZCxkYXRlLGR1cmF0aW9uXSk7XHJcbiAgICBjb25zb2xlLmxvZyhcInNlcnZpY2UgaWRcIiArIHNlcnZpY2VJZCArIFwiIGR1cmF0aW9uIFwiICsgZHVyYXRpb24gKyBcIiBkYXRlXCIgKyBkYXRlICsgXCIgY29udHJhY3QgXCIrIGNvbnRyYWN0SWQgKVxyXG4gICAgaWYoIWlzX2VtcHR5KXtcclxuICAgICAgaW5mbyA9IHtcclxuICAgICAgICAnaWRfY29udHJhdG8nOiBjb250cmFjdElkLFxyXG4gICAgICAgICdmZWNoYSc6IGRhdGUsXHJcbiAgICAgICAgJ2lkX3NlcnZpY2lvJzogc2VydmljZUlkLFxyXG4gICAgICAgICdkdXJhY2lvbic6IGR1cmF0aW9uXHJcbiAgICAgIH1cclxuICAgICAgZm9ybSA9IFwiZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KGluZm8pO1xyXG4gICAgICBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArIFwiY29udHJhY3QvcmVjb25uZWN0XCIsZm9ybSk7XHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIGRpc3BsYXlNZXNzYWdlKHJlcy5kYXRhLm1lbnNhamUpO1xyXG4gICAgICAgIFBheW1lbnRzLmdldEFsbCgpO1xyXG4gICAgICAgICQoXCIjYnRuLXJlY29ubmVjdFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgJChcIi5yZWNvbm5lY3QtY2FsbGVyXCIpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgXHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KVxyXG4gICAgfWVsc2V7XHJcbiAgICAgIHN3YWwoXCJMbGVuZSB0b2RvcyBsb3MgY2FtcG9zXCIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgYWRkRXh0cmE6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBleHRyYVNlcnZpY2UsIHNlcnZpY2VDb3N0LCBlcXVpcG1lbnQsIGVNYWMsIHJvdXRlciwgck1hYyxwYXltZW50TW9kZTtcclxuXHJcbiAgICBjb250cmFjdElkID0gJChcIiNleHRyYS1jbGllbnQtY29udHJhY3RcIikudmFsKCk7XHJcbiAgICBzZXJ2aWNlQ29zdCA9ICQoXCIjZXh0cmEtc2VydmljZS1jb3N0XCIpLnZhbCgpO1xyXG4gICAgZXh0cmFTZXJ2aWNlID0gJChcIiNzZWxlY3QtZXh0cmEtc2VydmljZVwiKS52YWwoKTtcclxuICAgIGVxdWlwbWVudCA9ICQoXCIjZXh0cmEtZXF1aXBvXCIpLnZhbCgpO1xyXG4gICAgZU1hYyA9ICQoXCIjZXh0cmEtZS1tYWNcIikudmFsKCk7XHJcbiAgICByb3V0ZXIgPSAkKFwiI2V4dHJhLXJvdXRlclwiKS52YWwoKTtcclxuICAgIHJNYWMgPSAkKFwiI2V4dHJhLXItbWFjXCIpLnZhbCgpO1xyXG4gICAgcGF5bWVudE1vZGUgPSAkKFwiI3NlbGVjdC1wYXltZW50LW1vZGVcIikudmFsKCk7XHJcblxyXG4gICAgdmFyIGlzX2VtcHR5ID0gaXNFbXB0eShbY29udHJhY3RJZCwgZXh0cmFTZXJ2aWNlLCBzZXJ2aWNlQ29zdCxwYXltZW50TW9kZV0pO1xyXG4gICAgaWYgKCFpc19lbXB0eSkge1xyXG4gICAgICBmb3JtID0gJ2lkX2NvbnRyYXRvPScgKyBjb250cmFjdElkICsgXCImY29zdG9fc2VydmljaW89XCIgKyBzZXJ2aWNlQ29zdCArIFwiJm5vbWJyZV9zZXJ2aWNpbz1cIiArIGV4dHJhU2VydmljZTtcclxuICAgICAgZm9ybSArPSAnJm5vbWJyZV9lcXVpcG89JyArIGVxdWlwbWVudCArIFwiJm1hY19lcXVpcG89XCIgKyBlTWFjICsgXCImcm91dGVyPVwiICsgcm91dGVyICsgXCImbWFjX3JvdXRlcj1cIiArIHJNYWM7XHJcbiAgICAgIGZvcm0gKz0gJyZtb2RvX3BhZ289JyArIHBheW1lbnRNb2RlO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9hZGRleHRyYScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgQ29udHJhY3RzLmdldEFsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBleHRlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBjb250cmFjdElkLCBkdXJhdGlvbjtcclxuICAgIGNvbnRyYWN0SWQgPSAkKFwiI2V4dHJhLWNsaWVudC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIGR1cmF0aW9uID0gJChcIiNleHRyYS1leHRlbnNpb24tbW9udGhzXCIpLnZhbCgpO1xyXG5cclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW2R1cmF0aW9uLCBjb250cmFjdElkXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfY29udHJhdG89JyArIGNvbnRyYWN0SWQgKyBcIiZkdXJhY2lvbj1cIiArIGR1cmF0aW9uO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9leHRlbmRfY29udHJhY3QnLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIENvbnRyYWN0cy5nZXRBbGwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkaXNwbGF5QWxlcnQoXCJyZXZpc2VcIiwgXCJhc2VndXJhdGUgZGUgbGxlbmFyIHRvZG9zIGxvcyBkYXRvcyB5IHNlbGVjY2lvbmFyIGVsIHNlcnZpY2lvXCIsIFwiaW5mb1wiKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRBbGxPZkNsaWVudDogZnVuY3Rpb24oZG5pKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwiZG5pPVwiICsgZG5pO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2RhdGFfZm9yX2V4dHJhXCIsIGZhbHNlLCBudWxsLCBtYWtlQ29udHJhY3RMaXN0LCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICAvLyBOb3RlOiBsbyBzaWVudG8sIGRlIGFxdWkgZW4gYWRlbGFudGUgdXNvIGF4aW9zLCBlcyBtdWNobyBtYXMgY29tb2RvXHJcbiAgc3VzcGVuZDogZnVuY3Rpb24gKGlkX2NvbnRyYXRvKSB7XHJcbiAgICBmb3JtID0gXCJkYXRhPVwiICsgSlNPTi5zdHJpbmdpZnkoe2lkX2NvbnRyYXRvOmlkX2NvbnRyYXRvfSlcclxuICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdjb250cmFjdC9zdXNwZW5kJyxmb3JtKTtcclxuICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSk7XHJcbiAgICAgIENvbnRyYWN0cy5nZXRBbGwoKTtcclxuICAgIH0pXHJcbiAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbnZhciBQYXltZW50cyA9IHtcclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpZCA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgaWYgKGlkICE9IG51bGwpIHtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPXBhZ29zJmlkPVwiICsgaWQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBwYXltZW50VGFibGUucmVmcmVzaCwgZm9ybSwgUGF5bWVudHMuY29udHJhY3RSZWZyZXNoKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGU6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICB2YXIgZGF0ZSA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICAgIHZhciBpZF9jb250cmF0byA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9cGFnb3MmaWQ9XCIgKyBpZCArIFwiJmVzdGFkbz1wYWdhZG8mZmVjaGFfcGFnbz1cIiArIGRhdGUgKyBcIiZpZF9jb250cmF0bz1cIiArIGlkX2NvbnRyYXRvO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpO1xyXG4gIH0sXHJcblxyXG4gIHNhdmVBYm9ub3M6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmb3JtLCBvYnNlcnZhdGlvbnMsIGFib25vJGlucHV0QWJvbm8sJHRleHRBYm9ubyxjb250cmFjdElkO1xyXG5cclxuICAgICR0ZXh0QWJvbm8gICA9ICQoJyN0ZXh0LWFib25vLWRldGFpbCcpO1xyXG4gICAgb2JzZXJ2YXRpb25zID0gJHRleHRBYm9uby52YWwoKTtcclxuICAgIGNvbnRyYWN0SWQgICA9ICQoXCIjc2VsZWN0LWNvbnRyYWN0XCIpLnZhbCgpO1xyXG4gICAgJGlucHV0QWJvbm8gID0gJChcIiNpbnB1dC1hYm9ub1wiKTtcclxuICAgIGFib25vICAgICAgICA9ICRpbnB1dEFib25vLnZhbCgpO1xyXG5cclxuICAgIGZvcm0gPSAnb2JzZXJ2YWNpb25lcz0nICsgb2JzZXJ2YXRpb25zICsgXCImYWJvbm9zPVwiICsgYWJvbm87XHJcbiAgICBmb3JtICs9IFwiJmNvbnRyYXRvX2Fib25vPVwiK2NvbnRyYWN0SWQrXCImdGFibGE9YWJvbm9zXCI7XHJcbiAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFBheW1lbnRzLmdldEFsbClcclxuICAgICRpbnB1dEFib25vLnZhbCgnJylcclxuICB9LFxyXG5cclxuICBzYXZlRXh0cmE6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdwcm9jZXNzLycpXHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlVW50aWw6IGZ1bmN0aW9uKGNvbnRyYWN0SWQsbGFzdFBheW1lbnRJZCl7XHJcbiAgICB2YXIgaWRfY29udHJhdG8gPSAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS52YWwoKTtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1wYWdvc19hbF9kaWEmaWRfdWx0aW1vX3BhZ289XCIgKyBsYXN0UGF5bWVudElkICsgXCImZXN0YWRvPXBhZ2FkbyZpZF9jb250cmF0bz1cIiArIGNvbnRyYWN0SWQ7XHJcbiAgICB2YXIgaGFuZGxlcnMsIGNhbGxiYWNrO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgbnVsbCwgaGVhdnlMb2FkKTtcclxuICB9LFxyXG4gICAgXHJcbiAgcmVtb3ZlUGF5bWVudDogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9ZGVzaGFjZXJfcGFnbyZpZF9wYWdvPVwiICsgaWQ7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy91cGRhdGUnLCB0cnVlLCBudWxsLCBudWxsLCBmb3JtLCBQYXltZW50cy5nZXRBbGwpO1xyXG4gIH0sXHJcblxyXG4gIGNvbnRyYWN0UmVmcmVzaDogZnVuY3Rpb24oKXtcclxuICAgIHZhciBpZF9jbGllbnRlID0gJCgnI2RldGFpbC1jbGllbnQtaWQnKS52YWwoKVxyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNvbnRyYXRvc19jbGllbnRlJmlkPVwiICsgaWRfY2xpZW50ZTtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBkZXRhaWxzQ29udHJhY3RUYWJsZS5yZWZyZXNoLCBmb3JtLCBudWxsKTtcclxuICB9LFxyXG5cclxuICBnZXRPbmU6IGZ1bmN0aW9uKGlkX3BhZ28sIHJlY2VpdmVyKSB7XHJcbiAgICBmb3JtID0gXCJ0YWJsYT1wYWdvcyZpZF9wYWdvPVwiICsgaWRfcGFnbztcclxuICAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy9nZXRvbmVcIiwgZmFsc2UsIG51bGwsIHJlY2VpdmVyLCBmb3JtLCBudWxsKVxyXG4gIH0sXHJcblxyXG4gIHJlY2VpdmVGb3JFZGl0OiBmdW5jdGlvbihjb250ZW50KXtcclxuICAgIHZhciBwYWdvICAgICAgICAgID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgIHRoaXMuaWRfY29udHJhdG8gID0gcGFnb1snaWRfY29udHJhdG8nXTtcclxuICAgIHRoaXMuaWRfcGFnbyAgICAgPSBwYWdvWydpZF9wYWdvJ11cclxuICAgIHZhciAkY29uY2VwdG8gICAgID0gJChcIiNwYXltZW50LWNvbmNlcHRcIik7XHJcbiAgICB2YXIgJGZlY2hhTGltaXRlICA9ICQoXCIjcGF5bWVudC1saW1pdC1kYXRlXCIpO1xyXG4gICAgdmFyICRjdW90YSAgICAgICAgPSAkKFwiI3BheW1lbnQtY3VvdGFcIik7XHJcbiAgICB2YXIgJG1vcmEgICAgICAgICA9ICQoXCIjcGF5bWVudC1tb3JhXCIpO1xyXG4gICAgdmFyICRleHRyYSAgICAgICAgPSAkKFwiI3BheW1lbnQtZXh0cmFcIik7XHJcbiAgICB2YXIgJHRvdGFsICAgICAgICA9ICQoXCIjcGF5bWVudC10b3RhbFwiKTtcclxuICAgIHZhciAkZGVzY3VlbnRvICAgID0gJChcIiNwYXltZW50LWRpc2NvdW50LWFtb3VudFwiKTtcclxuICAgIHZhciAkcmF6b24gICAgICAgID0gJChcIiNwYXltZW50LWRpc2NvdW50LXJlYXNvblwiKTtcclxuICAgIHZhciAkbW9kYWwgICAgICAgID0gJChcIiNhZHZhbmNlZC1wYXltZW50XCIpO1xyXG5cclxuICAgICRjb25jZXB0by52YWwocGFnb1snY29uY2VwdG8nXSk7XHJcbiAgICAkZmVjaGFMaW1pdGUudmFsKHBhZ29bJ2ZlY2hhX2xpbWl0ZSddKTtcclxuICAgICRjdW90YS52YWwocGFnb1snY3VvdGEnXSk7XHJcbiAgICAkbW9yYS52YWwocGFnb1snbW9yYSddKTtcclxuICAgICRleHRyYS52YWwocGFnb1snbW9udG9fZXh0cmEnXSk7XHJcbiAgICAkdG90YWwudmFsKHBhZ29bJ3RvdGFsJ10pO1xyXG4gICAgaW50ZXJhY3RpdmVTdW0oKTtcclxuXHJcbiAgICAkbW9kYWwubW9kYWwoKTtcclxuICAgICRtb2RhbC5vbignaGlkZS5icy5tb2RhbCcsZnVuY3Rpb24oKXtcclxuICAgICAgJG1vZGFsLmZpbmQoJ2lucHV0JykudmFsKCcnKVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI2J0bi1hcHBseS1kaXNjb3VudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIlNlZ3VybyBkZSBxdWUgcXVpZXJlIGFwbGljYXIgZXN0ZSBkZXNjdWVudG8gZGUgXCIgKyAkZGVzY3VlbnRvLnZhbCgpICsgXCI/XCIsXHJcbiAgICAgICAgICB0eXBlOiAnd2FybmluZycsXHJcbiAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBhcHBseURpc2NvdW50KGlkX3BhZ28pO1xyXG4gICAgICAgICAgJG1vZGFsLmhpZGUoKTtcclxuICAgICAgICAgICRtb2RhbC5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XHJcbiAgICAgICAgICAkKCcubW9kYWwtYmFja2Ryb3AnKS5yZW1vdmUoKTtcclxuIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwbHlEaXNjb3VudChpZF9wYWdvKSB7XHJcbiAgICAgIHZhciBkYXRlID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgICAgZm9ybSA9ICdpZF9wYWdvPScgKyBpZF9wYWdvICsgJyZpZF9jb250cmF0bz0nICsgaWRfY29udHJhdG8gKyBcIiZjdW90YT1cIiArICRjdW90YS52YWwoKTtcclxuICAgICAgZm9ybSArPSBcIiZtb3JhPVwiICsgJG1vcmEudmFsKCkgKyBcIiZtb250b19leHRyYT1cIiArICRleHRyYS52YWwoKTtcclxuICAgICAgZm9ybSArPSBcIiZ0b3RhbD1cIiArICR0b3RhbC52YWwoKSArICcmZGVzY3VlbnRvPScgKyAkZGVzY3VlbnRvLnZhbCgpICsgJyZyYXpvbl9kZXNjdWVudG89JyArJHJhem9uLnZhbCgpICsgJyZmZWNoYV9wYWdvPScgKyBkYXRlIDtcclxuICAgICAgZm9ybSArPSBcIiZ0YWJsYT1kaXNjb3VudF9wYWdvc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZChcInByb2Nlc3MvdXBkYXRlXCIsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIFBheW1lbnRzLmdldEFsbCk7XHJcbiAgICAgICRtb2RhbC5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW50ZXJhY3RpdmVTdW0oKXtcclxuICAgICAgJCgnLnBheW1lbnQtc3VtYW5kb3MnKS5vbigna2V5dXAnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJGN1b3RhLnZhbChwYWdvWydjdW90YSddIC0gJGRlc2N1ZW50by52YWwoKSk7XHJcbiAgICAgICAgdmFyIHN1bWEgPSBOdW1iZXIoJGN1b3RhLnZhbCgpKSArIE51bWJlcigkbW9yYS52YWwoKSkgKyBOdW1iZXIoJGV4dHJhLnZhbCgpKTtcclxuICAgICAgICAkdG90YWwudmFsKE51bWJlcihzdW1hKSlcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBlZGl0OiBmdW5jdGlvbihjb250ZW50KXtcclxuICAgIHZhciBwYWdvICAgICAgICAgID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgIHRoaXMuaWRfY29udHJhdG8gID0gcGFnb1snaWRfY29udHJhdG8nXTtcclxuICAgIHRoaXMuaWRfcGFnbyAgICAgID0gcGFnb1snaWRfcGFnbyddXHJcbiAgICB2YXIgJG1vZGFsICAgICAgICA9ICQoJyNlZGl0LXBheW1lbnQtbW9kYWwnKSBcclxuICAgIGNvbnNvbGUubG9nKHBhZ28pXHJcblxyXG4gICAgJG1vZGFsLm1vZGFsKCk7XHJcblxyXG4gICAgJG1vZGFsLm9uKCdoaWRlLmJzLm1vZGFsJyxmdW5jdGlvbigpe1xyXG4gICAgICAkbW9kYWwuZmluZCgnaW5wdXQnKS52YWwoJycpXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWVkaXRlZC1wYXltZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiU2VndXJvIGRlIHF1ZSBxdWllcmUgYXBsaWNhciBlc3RlIGRlc2N1ZW50byBkZSBcIiArICRkZXNjdWVudG8udmFsKCkgKyBcIj9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybyEnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGFwcGx5RGlzY291bnQoaWRfcGFnbyk7XHJcbiAgICAgICAgICAkbW9kYWwuaGlkZSgpO1xyXG4gICAgICAgICAgJG1vZGFsLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4nKTtcclxuICAgICAgICAgICQoJy5tb2RhbC1iYWNrZHJvcCcpLnJlbW92ZSgpO1xyXG4gXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBmdW5jdGlvbiBhcHBseURpc2NvdW50KGlkX3BhZ28pIHtcclxuICAgIC8vICAgdmFyIGRhdGUgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgLy8gICBmb3JtID0gJ2lkX3BhZ289JyArIGlkX3BhZ28gKyAnJmlkX2NvbnRyYXRvPScgKyBpZF9jb250cmF0byArIFwiJmN1b3RhPVwiICsgJGN1b3RhLnZhbCgpO1xyXG4gICAgLy8gICBmb3JtICs9IFwiJm1vcmE9XCIgKyAkbW9yYS52YWwoKSArIFwiJm1vbnRvX2V4dHJhPVwiICsgJGV4dHJhLnZhbCgpO1xyXG4gICAgLy8gICBmb3JtICs9IFwiJnRvdGFsPVwiICsgJHRvdGFsLnZhbCgpICsgJyZkZXNjdWVudG89JyArICRkZXNjdWVudG8udmFsKCkgKyAnJnJhem9uX2Rlc2N1ZW50bz0nICskcmF6b24udmFsKCkgKyAnJmZlY2hhX3BhZ289JyArIGRhdGUgO1xyXG4gICAgLy8gICBmb3JtICs9IFwiJnRhYmxhPWRpc2NvdW50X3BhZ29zXCI7XHJcbiAgICAvLyAgIGNvbm5lY3RBbmRTZW5kKFwicHJvY2Vzcy91cGRhdGVcIiwgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgUGF5bWVudHMuZ2V0QWxsKTtcclxuICAgIC8vICAgJG1vZGFsLmhpZGUoKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBmdW5jdGlvbiBpbnRlcmFjdGl2ZVN1bSgpe1xyXG4gICAgLy8gICAkKCcucGF5bWVudC1zdW1hbmRvcycpLm9uKCdrZXl1cCcsZnVuY3Rpb24oKXtcclxuICAgIC8vICAgICAkY3VvdGEudmFsKHBhZ29bJ2N1b3RhJ10gLSAkZGVzY3VlbnRvLnZhbCgpKTtcclxuICAgIC8vICAgICB2YXIgc3VtYSA9IE51bWJlcigkY3VvdGEudmFsKCkpICsgTnVtYmVyKCRtb3JhLnZhbCgpKSArIE51bWJlcigkZXh0cmEudmFsKCkpO1xyXG4gICAgLy8gICAgICR0b3RhbC52YWwoTnVtYmVyKHN1bWEpKVxyXG4gICAgLy8gICB9KVxyXG4gICAgLy8gfVxyXG4gIH1cclxuICBcclxufVxyXG5cclxudmFyIERhbWFnZXMgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgaWRDbGllbnRlLCBkZXNjcmlwdGlvbjtcclxuICAgIGlkQ2xpZW50ZSA9ICQoXCIjYXZlcmlhcy1jbGllbnQtaWRcIikudmFsKCk7XHJcbiAgICBkZXNjcmlwdGlvbiA9ICQoXCIjYS1kZXNjcmlwdGlvblwiKS52YWwoKTtcclxuXHJcbiAgICB2YXIgaXNfZW1wdHkgPSBpc0VtcHR5KFtpZENsaWVudGUsIGRlc2NyaXB0aW9uXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGZvcm0gPSAnaWRfY2xpZW50ZT0nICsgaWRDbGllbnRlICsgXCImZGVzY3JpcGNpb249XCIgKyBkZXNjcmlwdGlvbiArIFwiJnRhYmxhPWF2ZXJpYXNcIjtcclxuICAgICAgY29ubmVjdEFuZFNlbmQoXCJwcm9jZXNzL2FkZFwiLCB0cnVlLCBpbml0R2xvYmFsSGFuZGxlcnMsIG51bGwsIGZvcm0sIERhbWFnZXMuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICBkaXNwbGF5QWxlcnQoXCJSZXZpc2VcIiwgXCJMTGVuZSB0b2RvcyBsb3MgY2FtcG9zIHBvciBmYXZvclwiLCBcImVycm9yXCIpO1xyXG4gICAgfVxyXG4gICAgJCgnI25ldy1hdmVyaWEtbW9kYWwnKS5maW5kKCdpbnB1dCx0ZXh0YXJlYScpLnZhbChcIlwiKTtcclxuICB9LFxyXG5cclxuICBnZXRBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGF0dXMgPSAkKFwiI2F2ZXJpYXMtdmlldy1tb2RlXCIpLnZhbCgpO1xyXG4gICAgJChcIi5wcmVzZW50YWRvXCIpLnRleHQoc3RhdHVzKTtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1hdmVyaWFzJmVzdGFkbz1cIiArIHN0YXR1cztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBpbml0R2xvYmFsSGFuZGxlcnMsIGZpbGxBdmVyaWFzTGlzdCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoJGlkX2F2ZXJpYSkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWF2ZXJpYXMmaWRfYXZlcmlhPVwiICsgJGlkX2F2ZXJpYTtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgRGFtYWdlcy5nZXRBbGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIEluc3RhbGxhdGlvbnMgPSB7XHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhdHVzID0gJChcIiNpbnN0YWxsYXRpb25zLXZpZXctbW9kZVwiKS52YWwoKTtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1pbnN0YWxhY2lvbmVzJmVzdGFkbz1cIiArIHN0YXR1cztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBpbml0R2xvYmFsSGFuZGxlcnMsIGZpbGxJbnN0YWxsYXRpb25zTGlzdCwgZm9ybSwgbnVsbCk7XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoJGlkX3BhZ28pIHtcclxuICAgIHZhciBmb3JtID0gXCJ0YWJsYT1pbnN0YWxhY2lvbmVzJmlkX3BhZ289XCIgKyAkaWRfcGFnbztcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3VwZGF0ZScsIHRydWUsIGluaXRHbG9iYWxIYW5kbGVycywgbnVsbCwgZm9ybSwgSW5zdGFsbGF0aW9ucy5nZXRBbGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIENhamEgPSB7XHJcbiAgYWRkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgYW1vdW50LCBkZXNjcmlwdGlvbiwgaXNfZW1wdHk7XHJcblxyXG4gICAgYW1vdW50ID0gJChcIiNjYWphLWEtYW1vdW50XCIpLnZhbCgpO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKFwiI2NhamEtYS1kZXNjcmlwdGlvblwiKS52YWwoKTtcclxuICAgIGZvcm0gPSBcImVudHJhZGE9XCIgKyBhbW91bnQgKyBcIiZkZXNjcmlwY2lvbj1cIiArIGRlc2NyaXB0aW9uICsgXCImdGFibGE9Y2FqYVwiO1xyXG4gICAgaXNfZW1wdHkgPSBpc0VtcHR5KFthbW91bnQsIGRlc2NyaXB0aW9uXSk7XHJcbiAgICBpZiAoIWlzX2VtcHR5KSB7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2FkZCcsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIENhamEuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcmV0aXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSwgYW1vdW50LCBkZXNjcmlwdGlvbiwgaXNfZW1wdHk7XHJcblxyXG4gICAgYW1vdW50ID0gJChcIiNjYWphLXItYW1vdW50XCIpLnZhbCgpO1xyXG4gICAgZGVzY3JpcHRpb24gPSAkKFwiI2NhamEtci1kZXNjcmlwdGlvblwiKS52YWwoKTtcclxuICAgIGZvcm0gPSBcInNhbGlkYT1cIiArIGFtb3VudCArIFwiJmRlc2NyaXBjaW9uPVwiICsgZGVzY3JpcHRpb247XHJcbiAgICBpc19lbXB0eSA9IGlzRW1wdHkoW2Ftb3VudCwgZGVzY3JpcHRpb25dKTtcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL3JldGlyZScsIHRydWUsIG51bGwsIG51bGwsIGZvcm0sIENhamEuZ2V0QWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRpc3BsYXlBbGVydChcIlJldmlzZVwiLCBcIkxMZW5lIHRvZG9zIGxvcyBjYW1wb3MgcG9yIGZhdm9yXCIsIFwiZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSA9IFwidGFibGE9Y2FqYVwiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvZ2V0QWxsJywgZmFsc2UsIG51bGwsIGNhamFUYWJsZS5yZWZyZXNoLCBmb3JtLCBDYWphLmdldFNhbGRvKTtcclxuICB9LFxyXG5cclxuICBnZXRTYWxkbzogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNhamFcIjtcclxuICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldG9uZScsIGZhbHNlLCBudWxsLCB1cGRhdGVTYWxkbywgZm9ybSwgbnVsbClcclxuICB9LFxyXG5cclxuICBzZWFyY2g6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciAkZGF0ZVNlYXJjaCA9ICQoXCIjY2FqYS1kYXRlXCIpO1xyXG4gICAgdmFyICR1c2VyU2VhcmNoID0gJChcIiNjYWphLXVzZXJcIik7XHJcbiAgICB2YXIgZGF0ZSA9ICgkZGF0ZVNlYXJjaC52YWwoKSkgPyAkZGF0ZVNlYXJjaC52YWwoKSA6ICclJztcclxuICAgIHZhciB1c2VySWQgPSAoJHVzZXJTZWFyY2gudmFsKCkpID8gJHVzZXJTZWFyY2gudmFsKCkgOiAnJSc7XHJcblxyXG4gICAgdmFyIGZvcm0gPSBcInRhYmxhPWNhamEmaWRfZW1wbGVhZG89XCIgKyB1c2VySWQgKyBcIiZmZWNoYT1cIiArIGRhdGU7XHJcbiAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9zZWFyY2gnLCBmYWxzZSwgbnVsbCwgY2FqYVRhYmxlLnJlZnJlc2gsIGZvcm0sIG51bGwpO1xyXG4gIH1cclxufVxyXG5cclxudmFyIENvbXBhbnkgPSB7XHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSxcclxuICAgIGNvbXBhbnlOYW1lID0gJChcIiNjb21wYW55LW5hbWVcIikudmFsKCksXHJcbiAgICBjb21wYW55U3RhdGVtZW50ID0gJChcIiNjb21wYW55LXN0YXRlbWVudFwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlQaG9uZTEgPSBnZXRWYWwoJChcIiNjb21wYW55LXBob25lMVwiKSksXHJcbiAgICBjb21wYW55RGlyZWN0aW9uID0gJChcIiNjb21wYW55LWRpcmVjdGlvblwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlEZXNjcmlwdGlvbiA9ICQoXCIjY29tcGFueS1kZXNjcmlwdGlvblwiKS52YWwoKSxcclxuICAgIGNvbXBhbnlQaG9uZTIgPSBnZXRWYWwoJChcIiNjb21wYW55LXBob25lMlwiKSlcclxuXHJcbiAgICBmb3JtID0gJ25vbWJyZT0nICsgY29tcGFueU5hbWUgKyAnJmxlbWE9JyArIGNvbXBhbnlTdGF0ZW1lbnQgKyAnJmRlc2NyaXBjaW9uPScgKyBjb21wYW55RGVzY3JpcHRpb24gKyBcIiZkaXJlY2Npb249XCJcclxuICAgIGZvcm0gKz0gY29tcGFueURpcmVjdGlvbiArIFwiJnRlbGVmb25vMT1cIiArIGNvbXBhbnlQaG9uZTEgKyBcIiZ0ZWxlZm9ub3M9XCIgKyBjb21wYW55UGhvbmUyICsgXCImdGFibGE9ZW1wcmVzYVwiO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgU2V0dGluZ3MgPSB7XHJcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZm9ybSxcclxuICAgIHNldHRpbmdzQ2FyZ29Nb3JhID0gJChcIiNzZXR0aW5ncy1tb3JhXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NGZWNoYUNvcnRlID0gJChcIiNzZXR0aW5ncy1mZWNoYS1jb3J0ZVwiKS52YWwoKSxcclxuICAgIHNldHRpbmdzQXBlcnR1cmFDYWphID0gJChcIiNzZXR0aW5ncy1hcGVydHVyYS1jYWphXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NQZW5hbGl6YWNpb25DYW5jZWxhY2lvbiA9ICQoXCIjc2V0dGluZ3MtcGVuYWxpemFjaW9uLWNhbmNlbGFjaW9uXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NNZXNlc1BvckRlZmVjdG8gPSAkKFwiI3NldHRpbmdzLW1lc2VzLXBvci1kZWZlY3RvXCIpLnZhbCgpLFxyXG4gICAgc2V0dGluZ3NTcGxpdERheSA9ICQoXCIjc2V0dGluZ3Mtc3BsaXQtZGF5XCIpLnZhbCgpO1xyXG5cclxuICAgIGZvcm0gPSAnY2FyZ29fbW9yYT0nICsgc2V0dGluZ3NDYXJnb01vcmEgKyAnJmZlY2hhX2NvcnRlPScgKyBzZXR0aW5nc0ZlY2hhQ29ydGUgKyAnJmFwZXJ0dXJhX2NhamE9JyArIHNldHRpbmdzQXBlcnR1cmFDYWphO1xyXG4gICAgZm9ybSArPSAnJnBlbmFsaXphY2lvbl9jYW5jZWxhY2lvbj0nICsgc2V0dGluZ3NQZW5hbGl6YWNpb25DYW5jZWxhY2lvbiArICcmbWVzZXNfcG9yX2RlZmVjdG89JyArIHNldHRpbmdzTWVzZXNQb3JEZWZlY3RvO1xyXG4gICAgZm9ybSArPSAnJnNwbGl0X2RheT0nICsgc2V0dGluZ3NTcGxpdERheSArICcmdGFibGE9c2V0dGluZ3MnO1xyXG4gICAgY29ubmVjdEFuZFNlbmQoJ3Byb2Nlc3MvdXBkYXRlJywgdHJ1ZSwgbnVsbCwgbnVsbCwgZm9ybSwgbnVsbCk7XHJcbiAgfVxyXG59XHJcblxyXG52YXIgU2VjdGlvbnMgPSB7IFxyXG4gIGFkZDogZnVuY3Rpb24oKSB7XHJcbiAgICBzd2FsLnNldERlZmF1bHRzKHtcclxuICAgICAgaW5wdXQ6ICd0ZXh0JyxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdOZXh0ICZyYXJyOycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICAgIHByb2dyZXNzU3RlcHM6IFsnMScsICcyJywgJzMnXVxyXG4gICAgfSlcclxuXHJcbiAgICB2YXIgc3RlcHMgPSBbe1xyXG4gICAgICAgIHRpdGxlOiAnTm9tYnJlIGRlbCBzZWN0b3InXHJcbiAgICAgIH0sXHJcbiAgICAgICdDb2RpZ28gZGVsIFNlY3RvcicsXHJcbiAgICBdXHJcblxyXG4gICAgc3dhbC5xdWV1ZShzdGVwcykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgIHN3YWwucmVzZXREZWZhdWx0cygpXHJcbiAgICAgIHNhdmUocmVzdWx0KVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc2F2ZShyZXN1bHQpe1xyXG4gICAgICB2YXIgZm9ybTtcclxuICAgICAgdmFyIG5vbWJyZSA9IHJlc3VsdFswXTtcclxuICAgICAgdmFyIGNvZGlnb0FyZWEgPSByZXN1bHRbMV0sXHJcblxyXG4gICAgICBmb3JtID0gXCJub21icmU9XCIrbm9tYnJlK1wiJmNvZGlnb19hcmVhPVwiK2NvZGlnb0FyZWE7XHJcbiAgICAgIGZvcm0gKz0gXCImdGFibGE9c2VjY2lvbmVzXCJcclxuICAgICBcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpe1xyXG4gICAgICAgICBpZihjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9hZGQnLCB0cnVlLCBmYWxzZSwgbnVsbCwgZm9ybSxTZWN0aW9ucy5nZXRBbGwsaGVhdnlMb2FkKSl7XHJcbiAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldElwczogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaWQgPSAkKFwiI3NlbGVjdC1zZWN0b3JcIikudmFsKCk7XHJcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xyXG4gICAgICB2YXIgZm9ybSA9IFwidGFibGE9aXBzJmlkPVwiICsgaWQ7XHJcbiAgICAgIGNvbm5lY3RBbmRTZW5kKCdwcm9jZXNzL2dldGFsbCcsIGZhbHNlLCBudWxsLCBTZWN0aW9ucy5yZW9yZGVyVGFibGUsIGZvcm0sbnVsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcmVvcmRlclRhYmxlOiBmdW5jdGlvbihjb250ZW50KXtcclxuICAgIHZhciB0YWJsZSA9ICQoXCIjdC1zZWN0aW9uc1wiKTtcclxuICAgIHRhYmxlLmJvb3RzdHJhcFRhYmxlKCdkZXN0cm95Jyk7XHJcbiAgICAkKFwiI3Qtc2VjdGlvbnMgdGJvZHlcIikuaHRtbChjb250ZW50KTtcclxuICAgIHRhYmxlLmJvb3RzdHJhcFRhYmxlKCk7XHJcbiAgICB0YWJsZS5maW5kKCd0Ym9keScpLmNzcyh7ZGlzcGxheTpcInRhYmxlLXJvdy1ncm91cFwifSk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0QWxsOiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGZvcm0gPSBcInRhYmxhPXNlY2Npb25lc1wiO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgncHJvY2Vzcy9nZXRhbGwnLCBmYWxzZSwgbnVsbCwgZmlsbFNlbGVjdCwgZm9ybSxoZWF2eUxvYWQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZpbGxTZWxlY3QoY29udGVudCl7XHJcbiAgICAgICQoXCIjc2VsZWN0LXNlY3RvclwiKS5odG1sKGNvbnRlbnQpO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgJHRhYmxlID0gJChcIiN0LXNlY3Rpb25zXCIpO1xyXG4gICAgdmFyICRidG5QcmludCA9ICQoXCIjYnRuLXByaW50LXNlY3Rpb25zXCIpO1xyXG4gICAgdmFyICRzZWxlY3RTdGF0ZSA9ICQoXCIjZmlsdGVyLXNlY3Rpb25zXCIpO1xyXG4gICAgXHJcblxyXG4gICAgJHNlbGVjdFN0YXRlLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBmaWx0ZXIgPSAkKHRoaXMpLnZhbCgpXHJcbiAgICAgIGlmKGZpbHRlci5pbmNsdWRlcyhcIl1cIikpXHJcbiAgICAgICAgZmlsdGVyID0gWydvY3VwYWRvJywnZGlzcG9uaWJsZSddXHJcbiAgICAgIGNvbnNvbGUubG9nKGZpbHRlcilcclxuXHJcbiAgICAgICR0YWJsZS5ib290c3RyYXBUYWJsZSgnZmlsdGVyQnknLHtcclxuICAgICAgICBlc3RhZG86ICBmaWx0ZXJcclxuICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgJGJ0blByaW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIHByaW50KCk7XHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn1cclxuXHJcbnZhciBFeHRyYXMgPSB7XHJcbiAgcmVtb3ZlOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgIHZhciBpZF9jbGllbnRlLCBzZW5kO1xyXG4gICAgXHJcbiAgICBpZF9jbGllbnRlID0gJCgnI2RldGFpbC1jbGllbnQtaWQnKS52YWwoKVxyXG4gICAgZm9ybSA9IFwiZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KHtpZDogaWQsaWRfY2xpZW50ZTogaWRfY2xpZW50ZX0pO1xyXG4gICAgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAnZXh0cmEvZGVsZXRlX2V4dHJhJywgZm9ybSk7XHJcbiAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YTtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgZXh0cmFUYWJsZS5yZWZyZXNoKGRhdGEuZXh0cmFzKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSk7XHJcblxyXG4gIH1cclxufSIsIiAgdmFyIGN1cnJlbnRQYWdlID0gJChcInRpdGxlXCIpLnRleHQoKS5zcGxpdChcIiBcIik7XHJcbiAgY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZVs0XS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICB2YXIgcmFuID0gZmFsc2U7XHJcbiAgXHJcbiAgZnVuY3Rpb24gaW5pdENvbXBvbmVudHMoKXtcclxuICAgIHN3aXRjaCAoY3VycmVudFBhZ2UpIHtcclxuICAgICAgY2FzZSBcImhvbWVcIjpcclxuICAgICAgICBpbml0Q2xpZW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImFkbWluaXN0cmFkb3JcIjpcclxuICAgICAgICBpbml0QWRtaW5IYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiY2xpZW50ZXNcIjpcclxuICAgICAgICBpbml0Q2xpZW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNlcnZpY2lvc1wiOlxyXG4gICAgICAgIGluaXRTZXJ2aWNlc0hhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJudWV2b19jb250cmF0b1wiOlxyXG4gICAgICAgIGluaXRDb250cmFjdEhhbmRsZXJzKCk7XHJcbiAgICAgICAgQ29udHJhY3RzLmdldElwTGlzdCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZGV0YWxsZXNcIjpcclxuICAgICAgICBpbml0UGF5bWVudHNIYW5kbGVycygpO1xyXG4gICAgICAgIGRldGFpbEhhbmRsZXJzKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJjb250cmF0b3NcIjpcclxuICAgICAgICBpbml0Q29udHJhY3RIYW5kbGVycygpO1xyXG4gICAgICAgIGluaXRDbGllbnRIYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiY3VlbnRhXCI6XHJcbiAgICAgICAgYWNvdW50SGFuZGxlcnMoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNlY2Npb25lc1wiOlxyXG4gICAgICAgIHNlY3Rpb25IYW5kbGVycygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDYWphSGFuZGxlcnMoKTtcclxuICAgIGluaXRHbG9iYWxIYW5kbGVycygpO1xyXG4gIH1cclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogICAgIGdsb2JhbHMgaGFuZGxlcnMgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICBmdW5jdGlvbiBpbml0R2xvYmFsSGFuZGxlcnMoKSB7XHJcbiAgICB2YXIgYXZlcmlhQ2xpZW50RG5pID0gJChcIiNhLWNsaWVudC1kbmlcIik7XHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT0gJ25vdGlmaWNhY2lvbmVzJykge1xyXG4gICAgICAgIEdlbmVyYWxzLmNvdW50X3RhYmxlKFwiYXZlcmlhc1wiKTtcclxuXHJcbiAgICAgICQoXCIjYXZlcmlhcy12aWV3LW1vZGVcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBEYW1hZ2VzLmdldEFsbCgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICAkKFwiI2luc3RhbGxhdGlvbnMtdmlldy1tb2RlXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgSW5zdGFsbGF0aW9ucy5nZXRBbGwoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCd0Ym9keScpLmNzcyh7ZGlzcGxheTpcInRhYmxlLXJvdy1ncm91cFwifSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGN1cnJlbnRQYWdlID09ICdjb250cmF0b3MnKSB7XHJcbiAgICAgaW5pdENvbnRyYWN0SGFuZGxlcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLWF2ZXJpYVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBEYW1hZ2VzLmFkZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYXZlcmlhQ2xpZW50RG5pLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGlmIChpc0NvbXBsZXRlKGF2ZXJpYUNsaWVudERuaSkpIHtcclxuICAgICAgICB2YXIgZG5pID0gZ2V0VmFsKGF2ZXJpYUNsaWVudERuaSk7XHJcbiAgICAgICAgQ2xpZW50cy5nZXRPbmUoZG5pLGZpbGxDbGllbnRGaWVsZHMpXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgICQoJyNhLWNsaWVudCcpLnZhbCgnJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIuYnRuLXVwZGF0ZS1hdmVyaWFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkX2F2ZXJpYSA9ICQodGhpcykucGFyZW50cygnLmF2ZXJpYS1pdGVtJykuZmluZCgnLmNvZGUnKVxyXG4gICAgICBpZF9hdmVyaWEgPSBpZF9hdmVyaWEudGV4dCgpLnRyaW0oKTtcclxuICAgICAgRGFtYWdlcy51cGRhdGUoaWRfYXZlcmlhKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKFwiLmJ0bi11cGRhdGUtaW5zdGFsbGF0aW9uXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBpZF9wYWdvID0gJCh0aGlzKS5wYXJlbnRzKCcuYXZlcmlhLWl0ZW0nKS5maW5kKCcuY29kZScpO1xyXG4gICAgICBpZF9wYWdvID0gaWRfcGFnby50ZXh0KCkudHJpbSgpO1xyXG4gICAgICBJbnN0YWxsYXRpb25zLnVwZGF0ZShpZF9wYWdvKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZXh0cmEtY29udHJvbHNcIikub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ29udHJhY3RzLmJ0bkV4dHJhUHJlc3NlZCgkKHRoaXMpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZXh0cmEtY2xpZW50LWRuaVwiKS5vbigna2V5ZG93bicsZnVuY3Rpb24oZSl7XHJcbiAgICAgIHZhciBrZXkgPSBlLndoaWNoO1xyXG4gICAgICB2YXIgZG5pID0gJCh0aGlzKS52YWwoKVxyXG4gICAgICBpZihrZXkgPT0gMTMpe1xyXG4gICAgICAgIENvbnRyYWN0cy5nZXRBbGxPZkNsaWVudChkbmkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgYWRtaW4gaGFuZGxlcnMgICAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBmdW5jdGlvbiBpbml0QWRtaW5IYW5kbGVycygpIHtcclxuICAgIHVzZXJUYWJsZS5pbml0KCk7XHJcbiAgICAkKFwiI2J0bi1zYXZlLXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgVXNlcnMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi11cGRhdGUtdXNlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBVc2Vycy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIuZGVsZXRlLXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgJHJvdyA9ICQodGhpcykucGFyZW50cyhcInRyXCIpO1xyXG4gICAgICB2YXIgaWQgPSAkcm93LmZpbmQoJy51c2VyLWlkJykudGV4dCgpLnRyaW0oKTtcclxuICAgICAgdmFyIHJvdyA9IHVzZXJUYWJsZS5nZXRSb3coaWQpO1xyXG4gICAgICBzd2FsKHtcclxuICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICB0ZXh0OiBcIkRlc2VhIEVsaW1pbmFyIGFsIFVzdWFyaW8gXCIgKyByb3cubm9tYnJlcyArXCIgXCIrIHJvdy5hcGVsbGlkb3MgKyBcIj9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybyEnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICBVc2Vycy5kZWxldGUoaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5lZGl0LXVzZXJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgaWQgID0gJCh0aGlzKS5hdHRyKCdkYXRhLXVzZXItaWQnKTtcclxuICAgICAgdmFyIHJvdyA9IHVzZXJUYWJsZS5nZXRSb3coaWQpO1xyXG4gICAgICBcclxuXHJcbiAgICAgICQoXCIjZS1uaWNrbmFtZVwiKS52YWwocm93Lm5pY2spO1xyXG4gICAgICAkKFwiI2UtbmFtZVwiKS52YWwocm93Lm5vbWJyZXMpO1xyXG4gICAgICAkKFwiI2UtbGFzdG5hbWVcIikudmFsKHJvdy5hcGVsbGlkb3MpO1xyXG4gICAgICAkKFwiI2UtZG5pXCIpLnZhbChyb3cuY2VkdWxhKTtcclxuICAgICAgJChcIiNlLXR5cGVcIikudmFsKHJvdy50aXBvX2NvZGlnbyk7XHJcbiAgICAgICQoJyN1cGRhdGUtdXNlci1tb2RhbCcpLm1vZGFsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3VwZGF0ZS1jb21wYW55LWRhdGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb21wYW55LnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tdXBkYXRlLXNldHRpbmdzXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIFNldHRpbmdzLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gc29tZSBnbG9iYWxzIGhhbmRsZXJzXHJcblxyXG4gICAgJChcIiNidG4tc2F2ZS1hdmVyaWFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgRGFtYWdlcy5hZGQoKVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgICAgSW5pdCBjYWphICAgICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgXHJcbiAgZnVuY3Rpb24gaW5pdENhamFIYW5kbGVycygpIHtcclxuICAgIGlmIChjdXJyZW50UGFnZSA9PSAnYWRtaW5pc3RyYWRvcicpIHtcclxuICAgICAgY2FqYVRhYmxlLmluaXQoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHZhciBidG5BZGRNb25leSAgICAgPSAkKFwiI2J0bi1hZGQtbW9uZXlcIik7XHJcbiAgICB2YXIgYnRuUmV0aXJlTW9uZXkgID0gJChcIiNidG4tcmV0aXJlLW1vbmV5XCIpO1xyXG4gICAgdmFyIHVzZXJTZWFyY2ggICAgICA9ICQoXCIjY2FqYS11c2VyXCIpO1xyXG4gICAgdmFyIGRhdGVTZWFyY2ggICAgICA9ICQoXCIjY2FqYS1kYXRlXCIpO1xyXG5cclxuICAgIGJ0bkFkZE1vbmV5Lm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENhamEuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBidG5SZXRpcmVNb25leS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDYWphLnJldGlyZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGF0ZVNlYXJjaC5vbignY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ2FqYS5zZWFyY2goKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHVzZXJTZWFyY2gub24oJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENhamEuc2VhcmNoKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBJbml0IGNsaWVudCBIYW5kbGVycyAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgZnVuY3Rpb24gaW5pdENsaWVudEhhbmRsZXJzKCkge1xyXG4gICAgaWYgKGN1cnJlbnRQYWdlID09ICdjbGllbnRlcycpIHtcclxuICAgICAgY2xpZW50VGFibGUuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLXNhdmUtY2xpZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIENsaWVudHMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3VwZGF0ZS1jbGllbnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBjbGllbnRUYWJsZS5nZXRJZCgpO1xyXG4gICAgICBpZiAoaWQpIHtcclxuICAgICAgICBDbGllbnRzLmdldE9uZShpZCwgQ2xpZW50cy5yZWNlaXZlRm9yRWRpdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjY2xpZW50LXNlYXJjaGVyXCIpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgR2VuZXJhbHMuc2VhcmNoKHRleHQsIFwiY2xpZW50ZXNcIiwgY2xpZW50VGFibGUucmVmcmVzaCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2NsaWVudC1zZWFyY2hlci1uZXdjb250cmFjdFwiKS5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgdGV4dCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgIGlmICghaXNFbXB0eShbdGV4dF0pKSB7XHJcbiAgICAgICAgR2VuZXJhbHMuc2VhcmNoKHRleHQsIFwiY2xpZW50ZXNcIiwgY2xpZW50VGFibGUucmVmcmVzaCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xlYXJUYm9keShcIi5sb2JieS1yZXN1bHRzXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2RlbGV0ZS1jbGllbnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgcm93ID0gY2xpZW50VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgRWxpbWluYXIgYWwobGEpIENsaWVudGUgXCIgKyByb3cubm9tYnJlcyArIFwiIFwiICsgcm93LmFwZWxsaWRvcyArIFwiP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgIEdlbmVyYWxzLmRlbGV0ZVJvdyhyb3cuaWQsIFwiY2xpZW50ZXNcIilcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgSW5pdCBTZXJ2aWNlcyBIYW5kbGVycyAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gIGZ1bmN0aW9uIGluaXRTZXJ2aWNlc0hhbmRsZXJzKCkge1xyXG4gICAgc2VydmljZVRhYmxlLmluaXQoKTtcclxuXHJcbiAgICAkKFwiI2J0bi1zYXZlLXNlcnZpY2VcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VydmljZXMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2RlbGV0ZS1zZXJ2aWNlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gc2VydmljZVRhYmxlLmdldElkKCk7XHJcbiAgICAgIGlmIChpZCkge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgRWxpbWluYXIgIGVsIFNlcnZpY2lvP1wiLFxyXG4gICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnRXN0b3kgU2VndXJvIScsXHJcbiAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsYXInXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgIEdlbmVyYWxzLmRlbGV0ZVJvdyhpZCwgXCJzZXJ2aWNpb3NcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZWRpdC1zZXJ2aWNlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyIHJvdyA9IHNlcnZpY2VUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG5cclxuICAgICAgJCgnI3Utc2VydmljZS1pZCcpLnZhbChyb3cuaWQpO1xyXG4gICAgICAkKCcjdS1zZXJ2aWNlLW5hbWUnKS52YWwocm93Lm5vbWJyZSk7XHJcbiAgICAgICQoJyN1LXNlcnZpY2UtZGVzY3JpcHRpb24nKS52YWwocm93LmRlc2NyaXBjaW9uKTtcclxuICAgICAgJCgnI3Utc2VydmljZS1tb250aGx5LXBheW1lbnQnKS52YWwoTnVtYmVyKHJvdy5tZW5zdWFsaWRhZC5yZXBsYWNlKFwiUkQkIFwiLCcnKSkpO1xyXG4gICAgICAkKCcjdS1zZXJ2aWNlLXR5cGUnKS52YWwocm93LnRpcG8pO1xyXG4gICAgICAkKCcjdXBkYXRlLXNlcnZpY2UtbW9kYWwnKS5tb2RhbCgpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYnRuLXVwZGF0ZS1zZXJ2aWNlXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFNlcnZpY2VzLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNzZXJ2aWNlLXNlYXJjaGVyXCIpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgR2VuZXJhbHMuc2VhcmNoKHRleHQsIFwic2VydmljaW9zXCIsIHNlcnZpY2VUYWJsZS5yZWZyZXNoLGluaXRTZXJ2aWNlc0hhbmRsZXJzKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgfVxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBJbml0IENvbnRyYWN0IEhhbmRsZXJzICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgZnVuY3Rpb24gaW5pdENvbnRyYWN0SGFuZGxlcnMoKSB7XHJcbiAgICBjb250cmFjdFRhYmxlLmluaXQoKTtcclxuICAgIENvbnRyYWN0cy5nZXRBbGwoKTtcclxuICAgIFxyXG4gICAgJChcIiNidG4tc2F2ZS1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb250cmFjdHMuYWRkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1hZGQtZXh0cmFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDb250cmFjdHMuY2FsbEV4dHJhKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBjb250ID0gMDtcclxuXHJcbiAgICAkKFwiI2NvbnRyYWN0LXNlYXJjaGVyXCIpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciB0ZXh0ID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgR2VuZXJhbHMuc2VhcmNoKHRleHQsIFwidl9jb250cmF0b3NcIiwgY29udHJhY3RUYWJsZS5yZWZyZXNoLG51bGwpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tY2FuY2VsLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyIHJvdyA9IGNvbnRyYWN0VGFibGUuZ2V0U2VsZWN0ZWRSb3coKTtcclxuICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgICQoXCIuY2FuY2VsLW5hbWVcIikudGV4dChyb3cuY2xpZW50ZSk7XHJcbiAgICAgICAgdmFyICRpbnB1dEVsZW1lbnQgICA9ICQoXCIuY29uZmlybWVkLWRhdGFcIik7XHJcbiAgICAgICAgdmFyICRidXR0b25Ub0FjdGl2ZSA9ICQoXCIjY2FuY2VsLXBlcm1hbmVudGx5XCIpO1xyXG5cclxuICAgICAgICBkZWxldGVWYWxpZGF0aW9uKCRpbnB1dEVsZW1lbnQscm93LmNsaWVudGUsICRidXR0b25Ub0FjdGl2ZSk7XHJcbiAgICAgICAgJChcIiNjYW5jZWwtcHJpbnRcIikuYXR0cihcImhyZWZcIixCQVNFX1VSTCArICdwcm9jZXNzL2dldGNhbmNlbGNvbnRyYWN0LycrIHJvdy5pZF9jbGllbnRlICsgXCIvXCIgKyByb3cuaWQpO1xyXG5cclxuICAgICAgICAkKFwiI2NhbmNlbC1jb250cmFjdC1tb2RhbFwiKS5tb2RhbCgpO1xyXG4gICAgICAgICRidXR0b25Ub0FjdGl2ZS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIENvbnRyYWN0cy5jYW5jZWwoKVxyXG4gICAgICAgICAgJGJ1dHRvblRvQWN0aXZlLmF0dHIoJ2Rpc2FibGUnKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkaW5wdXRFbGVtZW50LnZhbCgnJyk7XHJcbiAgICAgICAgJGJ1dHRvblRvQWN0aXZlLmF0dHIoJ2Rpc2FibGVkJywgJycpO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBzd2FsKFwiRGViZXMgc2VsZWNjaW9uYXIgdW4gY29udHJhdG9cIilcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tc3VzcGVuZC1jb250cmFjdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICB2YXIgcm93ID0gY29udHJhY3RUYWJsZS5nZXRTZWxlY3RlZFJvdygpO1xyXG4gICAgICAgaWYgKHJvdykge1xyXG4gICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgdGl0bGU6ICdFc3TDoSBTZWd1cm8/JyxcclxuICAgICAgICAgIHRleHQ6IFwiRGVzZWEgU3VzcGVuZGVyIGVsIGNvbnRyYXRvIGRlIFwiICsgcm93LmNsaWVudGUgK1wiID9cIixcclxuICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0VzdG95IFNlZ3VybyEnLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICBDb250cmFjdHMuc3VzcGVuZChyb3cuaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgfWVsc2V7XHJcbiAgICAgICAgIHN3YWwoXCJEZWJlIHNlbGVjY2lvbmFyIHVuIGNvbnRyYXRvXCIpXHJcbiAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNidG4tdXBkYXRlLWNvbnRyYWN0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGlkID0gY29udHJhY3RUYWJsZS5nZXRJZCgpO1xyXG4gICAgICBpZiAoaWQpIHtcclxuICAgICAgICBDb250cmFjdHMuZ2V0T25lKGlkLCBDb250cmFjdHMucmVjaWV2ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjc2VsZWN0LWNvbnRyYWN0LXNlY3RvclwiKS5vbignY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgQ29udHJhY3RzLmdldElwTGlzdCgpO1xyXG4gICAgfSlcclxuXHJcbiAgICAkKCcjc2VsZWN0LXBheS11bnRpbCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyICR0aGlzICAgICAgICAgPSAkKCcjc2VsZWN0LXBheS11bnRpbCA6c2VsZWN0ZWQnKTtcclxuICAgICAgdmFyIGNvbnRyYWN0SWQgICAgPSAkdGhpcy5hdHRyKCdkYXRhLWNvbnRyYWN0Jyk7XHJcbiAgICAgIHZhciBsYXN0UGF5bWVudElkID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgUGF5bWVudHMudXBkYXRlVW50aWwoY29udHJhY3RJZCxsYXN0UGF5bWVudElkKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcbiAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEluaXQgUGF5bWVudHMgIEhhbmRsZXJzICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICBcclxuICBmdW5jdGlvbiBpbml0UGF5bWVudHNIYW5kbGVycygpIHtcclxuICAgIHBheW1lbnRUYWJsZS5pbml0KCk7XHJcbiAgICBleHRyYVRhYmxlLmluaXQoKTtcclxuICAgIGlmICghcmFuKSB7XHJcbiAgICAgIFBheW1lbnRzLmdldEFsbCgpO1xyXG4gICAgICByYW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLXBheVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgaWQgPSBwYXltZW50VGFibGUuZ2V0SWQoKTtcclxuICAgICAgaWYoaWQpIHtcclxuICAgICAgICBQYXltZW50cy51cGRhdGUoaWQpO1xyXG4gICAgICAgIHVwZGF0ZV9tb2RlKGlkKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gVE9ETzogTUVTU0FHRSBTZWxlY3QgYSBwYXltZW50XHJcbiAgICAgIH1cclxuICAgIH0pOyBcclxuXHJcbiAgICAkKFwiI3NlbGVjdC1jb250cmFjdFwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgUGF5bWVudHMuZ2V0QWxsKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2J0bi1yZWNvbm5lY3RcIikub24oJ2NsaWNrJyxmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKClcclxuICAgICAgQ29udHJhY3RzLnJlY29ubmVjdCgpXHJcbiAgICB9KVxyXG5cclxuICAgICQoXCIjcGF5bWVudC1kZXRhaWwtYm94XCIpLmNvbGxhcHNlKClcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVfbW9kZShpZCl7XHJcbiAgICAgIHZhciBtb2RlID0gJCgnLnBheW1lbnQtbW9kZS5zZWxlY3RlZCcpLnRleHQoKTtcclxuICAgICAgdmFyIGV4dHJhSW5mbyA9IHtpZDogaWQudG9TdHJpbmcoKSxtb2R1bGU6J3BhZ29zJ31cclxuICAgICAgdmFyIGZvcm0gPSAnZGF0YT0nK0pTT04uc3RyaW5naWZ5KHt0aXBvOiBtb2RlfSkrJyZleHRyYV9pbmZvPScrSlNPTi5zdHJpbmdpZnkoZXh0cmFJbmZvKTtcclxuXHJcbiAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAncHJvY2Vzcy9heGlvc3VwZGF0ZScsZm9ybSlcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICAvL1RPRE86IHNvbWV0aGluZyB3aGl0aCB0aGF0IC8gYWxnbyBjb24gZXN0b1xyXG4gICAgICB9KTtcclxuICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICAgICAgZGV0YWlsIEhhbmRsZXJzICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgZnVuY3Rpb24gZGV0YWlsSGFuZGxlcnMoKSB7XHJcbiAgICAkKFwiI2J0bi1zYXZlLW9ic2VydmF0aW9uc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBQYXltZW50cy5zYXZlQWJvbm9zKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjYnRuLXNhdmUtcmVhbC1vYnNlcnZhdGlvbnMnKS5vbignY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICBDbGllbnRzLnNhdmVPYnNlcnZhdGlvbnMoKTtcclxuICAgIH0pXHJcblxyXG4gICAgZGV0YWlsc0NvbnRyYWN0VGFibGUuaW5pdCgpO1xyXG5cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFjb3VudEhhbmRsZXJzKCl7XHJcbiAgICB2YXIgJHVzZXJJZCAgICAgICAgICA9ICQoXCIjYWNvdW50LXVzZXItaWRcIilcclxuICAgIHZhciAkY3VycmVudFBhc3N3b3JkID0gJChcIiNhY291bnQtY3VycmVudC1wYXNzd29yZFwiKVxyXG4gICAgdmFyICRidG5VcGRhdGVVc2VyICAgID0gJChcIiN1cGRhdGUtdXNlci1kYXRhXCIpO1xyXG4gICAgdmFyICRuZXdQYXNzd29yZCAgICAgID0gJChcIiNhY291bnQtbmV3LXBhc3N3b3JkXCIpO1xyXG5cclxuICAgICQoXCIjYWNvdW50LWN1cnJlbnQtcGFzc3dvcmRcIikub24oJ2tleXVwJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTsgICAgXHJcbiAgICAgIFVzZXJzLmNvbmZpcm1QYXNzd29yZCgkdXNlcklkLnZhbCgpLCRjdXJyZW50UGFzc3dvcmQudmFsKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJGJ0blVwZGF0ZVVzZXIub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFVzZXJzLnVwZGF0ZVBhc3N3b3JkKCR1c2VySWQudmFsKCksJGN1cnJlbnRQYXNzd29yZC52YWwoKSwkbmV3UGFzc3dvcmQudmFsKCkpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2VjdGlvbkhhbmRsZXJzKCkge1xyXG4gICAgaWYgKCFyYW4pIHtcclxuICAgICAgU2VjdGlvbnMuaW5pdCgpXHJcbiAgICAgIFNlY3Rpb25zLmdldElwcygpO1xyXG4gICAgICByYW4gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYnRuLWFkZC1zZWN0aW9uXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIFNlY3Rpb25zLmFkZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgICQoXCIjc2VsZWN0LXNlY3RvclwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgU2VjdGlvbnMuZ2V0SXBzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gICQoZnVuY3Rpb24gKCkge1xyXG4gICAgaW5pdENvbXBvbmVudHMoKVxyXG4gIH0pOyIsInZhciByYW4gPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIGxvZ2luSGFuZGxlcnMoKSB7XHJcblxyXG4gICQoXCIjc2VuZC1jcmVkZW50aWFsc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgIFNlc3Npb24ubG9naW4oKTtcclxuICB9KTtcclxuXHJcbiAgJChcIiN1c2VyLWlucHV0XCIpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBsb2dpbkxpYnJhcnkuc2VuZFRvTG9naW4oZSlcclxuICB9KVxyXG5cclxuICAkKFwiI3Bhc3N3b3JkLWlucHV0XCIpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICBsb2dpbkxpYnJhcnkuc2VuZFRvTG9naW4oZSlcclxuICB9KVxyXG5cclxuICAkKFwiYVtocmVmXVwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBsb2dpbkxpYnJhcnkubG9hZGluZygpO1xyXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhciB0YXJnZXQgPSAkdGhpcy5hdHRyKCd0YXJnZXQnKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtcclxuICAgICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sIDMwMDApXHJcbiAgICB9Y2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRocm93IGVycm9yXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxudmFyIFNlc3Npb24gPSB7XHJcbiAgbG9naW46IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHVzZXIgICAgID0gJChcIiN1c2VyLWlucHV0XCIpLnZhbCgpO1xyXG4gICAgdmFyIHBhc3N3b3JkID0gJChcIiNwYXNzd29yZC1pbnB1dFwiKS52YWwoKTtcclxuICAgIHZhciBpc19lbXB0eSA9IGlzRW1wdHkoW3VzZXIsIHBhc3N3b3JkXSlcclxuICAgIGlmICghaXNfZW1wdHkpIHtcclxuICAgICAgdmFyIGZvcm0gPSAndXNlcj0nICsgdXNlciArICcmcGFzc3dvcmQ9JyArIHBhc3N3b3JkO1xyXG4gICAgICBjb25uZWN0QW5kU2VuZCgnYXBwL2xvZ2luJywgZmFsc2UsIGZhbHNlLCBTZXNzaW9uLnByb2Nlc3NMb2dpbkRhdGEsIGZvcm0sIG51bGwsIGxvZ2luTGlicmFyeS5sb2FkaW5nKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGlzcGxheU1lc3NhZ2UoTUVTU0FHRV9FUlJPUiArIFwiIExMZW5lIHRvZG9zIGxvcyBjYW1wb3MgaW5kaWNhZG9zIHBhcmEgaW5ncmVzYXJcIilcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBwcm9jZXNzTG9naW5EYXRhOiBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgaWYgKHJlc3BvbnNlID09IHRydWUpIHtcclxuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBCQVNFX1VSTCArICdhcHAvYWRtaW4vJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogXCJub25lXCJcclxuICAgICAgfSk7XHJcbiAgICAgIGRpc3BsYXlNZXNzYWdlKE1FU1NBR0VfSU5GTyArIFwiIFVzdWFyaW8geSBDb250cmFzZcOxYSBubyB2YWxpZG9zXCIpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG52YXIgbG9naW5MaWJyYXJ5ID0ge1xyXG4gIGxvYWRpbmc6IGZ1bmN0aW9uKHN0b3ApIHtcclxuICAgIGlmKCFzdG9wKXtcclxuICAgICAgICQoXCIubG9hZGVyXCIpLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogXCJibG9ja1wiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgJChcIi5sb2FkZXJcIikuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgXHJcbiAgc2VuZFRvTG9naW46IGZ1bmN0aW9uKGUpIHtcclxuICAgIGtleSA9IGUud2hpY2hcclxuICAgIGlmIChrZXkgPT0gMTMpIHtcclxuICAgICAgU2Vzc2lvbi5sb2dpbigpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgbG9naW5IYW5kbGVycygpO1xyXG59KSIsIiAgZnVuY3Rpb24gaXNDdXJyZW50UGFnZShwYWdlTmFtZSl7XHJcbiAgICBpZihnZXRDdXJyZW50UGFnZSgpID09IHBhZ2VOYW1lKXtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gIFxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFBhZ2UoKXtcclxuICAgIHZhciBjdXJyZW50UGFnZSA9ICQoXCJ0aXRsZVwiKS50ZXh0KCkuc3BsaXQoXCIgXCIpO1xyXG4gICAgY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZVs0XS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICAgIHJldHVybiBjdXJyZW50UGFnZTtcclxuICB9XHJcblxyXG4gIGlmKGlzQ3VycmVudFBhZ2UoXCJjaWVycmVcIikgfHwgaXNDdXJyZW50UGFnZShcImNpZXJyZTJcIikpe1xyXG4gICAgY2llcnJlQ2FqYUZ1bmN0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgaWYoaXNDdXJyZW50UGFnZShcInJlcG9ydGVzXCIpKXtcclxuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gICAgc2NyaXB0LnNyYyA9IEJBU0VfVVJMICsgXCJhc3NldHMvanMvbWluL3JlcG9ydGVzLm1pbi5qcz92ZXJzaW9uPTQuMC4yMlwiO1xyXG4gICAgJChcImJvZHlcIikuYXBwZW5kKHNjcmlwdCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjaWVycmVDYWphRnVuY3Rpb25zKCl7XHJcbiAgICB2YXIgdG90YWxlcyA9IHtcclxuICAgICAgICAgIHRvdGFsMTogMCxcclxuICAgICAgICAgIHRvdGFsNTogMCxcclxuICAgICAgICAgIHRvdGFsMTA6IDAsXHJcbiAgICAgICAgICB0b3RhbDIwOiAwLFxyXG4gICAgICAgICAgdG90YWwyNTogMCxcclxuICAgICAgICAgIHRvdGFsNTA6IDAsXHJcbiAgICAgICAgICB0b3RhbDEwMDogMCxcclxuICAgICAgICAgIHRvdGFsMjAwOiAwLFxyXG4gICAgICAgICAgdG90YWw1MDA6IDAsXHJcbiAgICAgICAgICB0b3RhbDEwMDA6IDAsXHJcbiAgICAgICAgICB0b3RhbDIwMDA6IDBcclxuICAgICAgICB9XHJcblxyXG4gICAgdmFyIGdhc3RvICAgPSB7XHJcbiAgICAgICAgJ2ZlY2hhJzogJycsXHJcbiAgICAgICAgJ2Rlc2NyaXBjaW9uJzogJycsXHJcbiAgICAgICAgJ21vbnRvJzogJycsXHJcbiAgICAgIH1cclxuICAgIHZhciBnYXN0b3MgID0gW3tmZWNoYTogbm93KCksZGVzY3JpcGNpb246XCJob2xhXCIsbW9udG86IDIwMDAsIGlkX2dhc3RvOiAxfV1cclxuICAgIHZhciBhdXRvciAgID0gJCgnI2F1dG9yLWNpZXJyZScpLnRleHQoKS50cmltKClcclxuXHJcbiAgICB2YXIgYXBwQ2llcnJlID0gbmV3IFZ1ZSh7XHJcbiAgICAgIGVsOiAnI2FwcC1jaWVycmUnLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgaXNIaWRlOiBmYWxzZSxcclxuICAgICAgICBmZWNoYTogbm93KCksXHJcbiAgICAgICAgZGF0YV9jaWVycmU6e1xyXG4gICAgICAgICAgYXV0b3I6IGF1dG9yLFxyXG4gICAgICAgICAgcGFnb3NfZmFjdHVyYXM6IDAsXHJcbiAgICAgICAgICBwYWdvc19leHRyYXM6IDAsXHJcbiAgICAgICAgICBwYWdvc19lZmVjdGl2bzogMCxcclxuICAgICAgICAgIHBhZ29zX2JhbmNvOiAwLFxyXG4gICAgICAgICAgdG90YWxfaW5ncmVzb3M6IDAsXHJcbiAgICAgICAgICBlZmVjdGl2b19jYWphOiAwLFxyXG4gICAgICAgICAgdG90YWxfZGVzY3VhZHJlOiAwLFxyXG4gICAgICAgICAgdG90YWxfZ2FzdG9zOiAwLFxyXG4gICAgICAgICAgYmFuY286IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRlbzp0b3RhbGVzLFxyXG4gICAgICAgIHN1bWE6IDAsXHJcbiAgICAgICAgZ2FzdG86IGdhc3RvLFxyXG4gICAgICAgIGdhc3RvczogZ2FzdG9zXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBtb3VudGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmdldEdhc3RvcygpO1xyXG4gICAgICAgIHRoaXMuc2V0SW5ncmVzb3MoKTtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGNyZWF0ZWQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnLndpbGwtbG9hZCcpLmNzcyh7dmlzaWJpbGl0eTpcInZpc2libGVcIn0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgY3VycmVuY3lGb3JtYXQ6IGZ1bmN0aW9uKG51bWJlcil7XHJcbiAgICAgICAgICByZXR1cm4gQ3VycmVuY3lGb3JtYXQobnVtYmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBtZXRob2RzOntcclxuICAgICAgICBjaGFuZ2VUb3RhbDogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICB2YXIgdW5pdCA9IGUuc3JjRWxlbWVudC5hdHRyaWJ1dGVzWydkYXRhLXVuaXQnXS52YWx1ZVxyXG4gICAgICAgICAgdmFyIGNhbnRpZGFkID0gZS5zcmNFbGVtZW50LnZhbHVlXHJcbiAgICAgICAgICB2YXIgdG90YWwgPSBjYW50aWRhZCAqIHVuaXRcclxuICAgICAgICAgIHRvdGFsZXNbJ3RvdGFsJysgdW5pdF0gPSBjYW50aWRhZCAqIHVuaXQgKiAxLjAwICAgIFxyXG4gICAgICAgIH0sIFxyXG5cclxuICAgICAgICBhZGRHYXN0bzogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgdmFyIGdhc3RvID0gdGhpcy5nYXN0bztcclxuICAgICAgICAgIGdhc3RvLmZlY2hhID0gbm93KCk7XHJcbiAgICAgICAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoZ2FzdG8pO1xyXG4gICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdjYWphL2FkZF9nYXN0bycsZm9ybSlcclxuICAgICAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpXHJcbiAgICAgICAgICAgIGFwcENpZXJyZS5maWxsR2FzdG9zKGRhdGEuZ2FzdG9zLFwibm9ybWFsXCIpXHJcbiAgICAgICAgICAgIGFwcENpZXJyZS5zZXRHYXN0b1RvdGFsKGRhdGEudG90YWxfZ2FzdG9zKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpbGxHYXN0b3M6IGZ1bmN0aW9uKGdhc3Rvc19zZXJ2aWRvcixtb2RlKXtcclxuICAgICAgICAgIGlmKG1vZGUgPT0gXCJncm91cFwiKXtcclxuICAgICAgICAgICAgaWYoZ2FzdG9zX3NlcnZpZG9yICE9IG51bGwgfHwgZ2FzdG9zX3NlcnZpZG9yLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFtnYXN0b3Nfc2Vydmlkb3JdKTtcclxuICAgICAgICAgICAgICBhcHBDaWVycmUuZ2FzdG9zID0gZ2FzdG9zX3NlcnZpZG9yO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBhcHBDaWVycmUuZ2FzdG9zID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhcHBDaWVycmUuZ2FzdG9zLnB1c2goSlNPTi5wYXJzZShnYXN0b3Nfc2Vydmlkb3IpWzBdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRHYXN0b1RvdGFsOiBmdW5jdGlvbih0b3RhbEdhc3Rvcyl7XHJcbiAgICAgICAgICB0aGlzLmRhdGFfY2llcnJlLnRvdGFsX2dhc3RvcyA9IHRvdGFsR2FzdG9zXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0R2FzdG86IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgdmFyIGdhc3RvID0gdGhpcy5nYXN0bztcclxuICAgICAgICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShnYXN0byk7XHJcbiAgICAgICAgICBjb25uZWN0QW5kU2VuZCgnY2FqYS9nZXRfZ2FzdG8nLGZhbHNlLG51bGwsYXBwQ2llcnJlLmZpbGxHYXN0b3MsZm9ybSxudWxsLCBudWxsKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZWxldGVHYXN0bzogZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgIHZhciBjYWxsZXIgPSBlLnRhcmdldDtcclxuICAgICAgICAgIGlmKGNhbGxlci5sb2NhbG5hbWUgPT0gXCJpXCIpe1xyXG4gICAgICAgICAgICBjYWxsZXIgPSBjYWxsZXIucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBpZCA9IGNhbGxlci5hdHRyaWJ1dGVzWydkYXRhLWlkJ10udmFsdWVcclxuICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ0VzdMOhIFNlZ3Vybz8nLFxyXG4gICAgICAgICAgICB0ZXh0OiBcIlNlZ3VybyBkZSBxdWUgcXVpZXJlIGVsaW1pbmFyIGVzdGUgZ2FzdG8/XCIsXHJcbiAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdFc3RveSBTZWd1cm8hJyxcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJ1xyXG4gICAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoe2lkOiBpZCwgZmVjaGE6bm93KCl9KVxyXG4gICAgICAgICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoQkFTRV9VUkwgKyAnY2FqYS9kZWxldGVfZ2FzdG8nLGZvcm0pXHJcbiAgICAgICAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwb25zZS5kYXRhXHJcbiAgICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKVxyXG4gICAgICAgICAgICAgIGFwcENpZXJyZS5maWxsR2FzdG9zKGRhdGEuZ2FzdG9zLFwiZ3JvdXBcIilcclxuICAgICAgICAgICAgICBhcHBDaWVycmUuc2V0R2FzdG9Ub3RhbChkYXRhLnRvdGFsX2dhc3RvcykgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7ICAgICAgXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0R2FzdG9zOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIGRhdGEgPSB7ZmVjaGE6IG5vdygpfVxyXG4gICAgICAgICAgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgICAgICB2YXIgc2VuZCA9IGF4aW9zLnBvc3QoIEJBU0VfVVJMICsgJ2NhamEvZ2V0X2dhc3RvcycsZm9ybSlcclxuICAgICAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgICAgICBkaXNwbGF5TWVzc2FnZShkYXRhLm1lbnNhamUpXHJcbiAgICAgICAgICAgIGFwcENpZXJyZS5maWxsR2FzdG9zKGRhdGEuZ2FzdG9zLFwiZ3JvdXBcIilcclxuICAgICAgICAgICAgYXBwQ2llcnJlLnNldEdhc3RvVG90YWwoZGF0YS50b3RhbF9nYXN0b3MpXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRJbmdyZXNvczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciBmb3JtID0gJ2RhdGE9JyArIEpTT04uc3RyaW5naWZ5KHtmZWNoYTogbm93KCl9KVxyXG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLmRhdGFfY2llcnJlO1xyXG4gICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdjYWphL2dldF9pbmdyZXNvcycsZm9ybSlcclxuICAgICAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcG9uc2UuZGF0YVxyXG4gICAgICAgICAgICBzZWxmLnBhZ29zX2ZhY3R1cmFzID0gZGF0YS5wYWdvc19mYWN0dXJhcztcclxuICAgICAgICAgICAgc2VsZi5wYWdvc19leHRyYXMgPSBkYXRhLnBhZ29zX2V4dHJhcztcclxuICAgICAgICAgICAgc2VsZi5wYWdvc19lZmVjdGl2byA9IGRhdGEucGFnb3NfZWZlY3Rpdm87XHJcbiAgICAgICAgICAgIHNlbGYucGFnb3NfYmFuY28gPSBkYXRhLnBhZ29zX2JhbmNvO1xyXG4gICAgICAgICAgICBzZWxmLnRvdGFsX2luZ3Jlc29zID0gcGFyc2VGbG9hdChkYXRhLnBhZ29zX2ZhY3R1cmFzKSArIHBhcnNlRmxvYXQoc2VsZi5wYWdvc19leHRyYXMpO1xyXG4gICAgICAgICAgICBzZWxmLnRvdGFsX2Rlc2N1YWRyZSA9IC0gc2VsZi5wYWdvc19lZmVjdGl2byArIHNlbGYuZWZlY3Rpdm9fY2FqYTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNlcnJhckNhamE6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgc2VsZiAgID0gdGhpcztcclxuICAgICAgICAgIHZhciBjaWVycmUgPSB0aGlzLmRhdGFfY2llcnJlO1xyXG4gICAgICAgICAgd2luZG93LmNpZXJyZSA9IGNpZXJyZTtcclxuICAgICAgICAgIGlmKGNpZXJyZS50b3RhbF9kZXNjdWFkcmUgIT0gMCl7XHJcbiAgICAgICAgICAgIHN3YWwoe1xyXG4gICAgICAgICAgICAgIHRpdGxlOiAnRXN0w6EgU2VndXJvPycsXHJcbiAgICAgICAgICAgICAgdGV4dDogXCJIYXkgdW4gZGVzY3VhZHJlIGVuIGxhIGNhamEsIHF1aWVyZSBoYWNlciBlbCBjaWVycmUgZGUgdG9kb3MgbW9kb3M/XCIsXHJcbiAgICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdTaScsXHJcbiAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ05vJ1xyXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgc2VsZi5jZXJyYXIoY2llcnJlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNlbGYuY2VycmFyKGNpZXJyZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2VycmFyOiBmdW5jdGlvbihjaWVycmUpe1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBjaWVycmUuZmVjaGEgPSBub3coKTtcclxuICAgICAgICAgIGZvcm0gPSAnZGF0YT0nKyBKU09OLnN0cmluZ2lmeShjaWVycmUpO1xyXG4gICAgICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdjYWphL2FkZF9jaWVycmUnLGZvcm0pXHJcbiAgICAgICAgICBzZW5kLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGFcclxuICAgICAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKVxyXG4gICAgICAgICAgICBzZWxmLmlzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGFwcFN1bW1hcnlWaWV3LmlzSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhcHBTdW1tYXJ5Vmlldy5jaWVycmUgPSBjaWVycmU7XHJcbiAgICAgICAgICAgICQoXCIjYXBwLWNpZXJyZVwiKS5hZGRDbGFzcygnaGlkZScpO1xyXG4gICAgICAgICAgICAkKFwiLnRvcC1uYXZcIikuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgJChcIiNwcmludC12aWV3XCIpLmNzcyh7dmlzaWJpbGl0eTogXCJ2aXNpYmxlXCJ9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBjb21wdXRlZDp7XHJcbiAgICAgICAgZ2V0VG90YWw6IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgdmFyIHQgPSB0b3RhbGVzO1xyXG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLmRhdGFfY2llcnJlO1xyXG4gICAgICAgICAgdmFyIHN1bWEgPSBzdW1hcihbdC50b3RhbDEsdC50b3RhbDUsdC50b3RhbDEwLCB0LnRvdGFsMjAsIHQudG90YWwyNSwgdC50b3RhbDUwLCB0LnRvdGFsMTAwLCB0LnRvdGFsMjAwLCB0LnRvdGFsNTAwLCB0LnRvdGFsMTAwMCwgdC50b3RhbDIwMDBdKTtcclxuICAgICAgICAgIHRoaXMuc3VtYSA9IHN1bWE7XHJcbiAgICAgICAgICBzZWxmLmVmZWN0aXZvX2NhamEgPSBzdW1hLnRvRml4ZWQoMik7XHJcbiAgICAgICAgICBzZWxmLnRvdGFsX2Rlc2N1YWRyZSA9IHBhcnNlRmxvYXQoLXNlbGYucGFnb3NfZWZlY3Rpdm8pICsgcGFyc2VGbG9hdChzZWxmLmVmZWN0aXZvX2NhamEpO1xyXG4gICAgICAgICAgc2VsZi5iYW5jbyA9IHBhcnNlRmxvYXQoc2VsZi5wYWdvc19iYW5jbykgKyBwYXJzZUZsb2F0KHNlbGYucGFnb3NfZWZlY3Rpdm8pIC0gcGFyc2VGbG9hdChzZWxmLnRvdGFsX2dhc3RvcykgKyBwYXJzZUZsb2F0KHNlbGYudG90YWxfZGVzY3VhZHJlKVxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3VtYTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBkZWNpbWFsczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciBmaWVsZHMgPSBbXCJwYWdvc19mYWN0dXJhc1wiLFwicGFnb3NfZXh0cmFcIixcInBhZ29zX2VmZWN0aXZvXCIsXCJwYWdvc19iYW5jb1wiLFwidG90YWxfaW5ncmVzb3NcIixcImVmZWN0aXZvX2NhamFcIixcInRvdGFsX2Rlc2N1YWRyZVwiLFwidG90YWxfZ2FzdG9cIixcImJhbmNvXCJdO1xyXG4gICAgICAgICAgZmllbGRzLmZvckVhY2goZnVuY3Rpb24oZmllbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhX2NpZXJyZVtmaWVsZF0gPSB0aGlzLmRhdGFfY2llcnJlW2ZpZWxkXS50b0ZpeGVkKDIpXHJcbiAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgd2luZG93LmFwcENpZXJyZSA9IGFwcENpZXJyZTtcclxuICAgIGZ1bmN0aW9uIHN1bWFyICh2YWxvcmVzKXtcclxuICAgICAgdmFyIHN1bWEgPSAwO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbG9yZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzdW1hICs9IHBhcnNlRmxvYXQodmFsb3Jlc1tpXSk7IFxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdW1hO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5vdygpe1xyXG4gICAgICByZXR1cm4gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcclxuICAgIH1cclxuICB9XHJcbiAgVnVlLmNvbXBvbmVudCgnc3VtbWFyeS1wcmludC12aWV3Jyx7XHJcbiAgICB0ZW1wbGF0ZTogJ1xcXHJcbiAgICA8ZGl2IGNsYXNzPVwicHJpbnQtY29udGFpbmVyXCI+XFxcclxuICAgICAgPGRpdiBjbGFzcz1cIl9faGVhZGVyXCI+XFxcclxuICAgICAgPGgyIGNsYXNzPVwiX190aXRsZSB0LWNlbnRlclwiPiB7e3RpdGxlfX08L2gyPlxcXHJcbiAgICAgIDwvZGl2PlxcXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJfX2JvZHlcIj5cXFxyXG4gICAgICA8cHJpbnRlYWJsZT48L3ByaW50ZWFibGU+XFxcclxuICAgICAgPC9kaXY+XFxcclxuICAgIDxkaXY+XFxcclxuICAgIFxcXHJcbiAgICAnLFxyXG4gICAgcHJvcHM6Wydzb21ldmFsdWUnXSxcclxuICAgIG1ldGhvZHM6e1xyXG4gICAgICBnb0JhY2s6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgYXBwU3VtbWFyeVZpZXcuaXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICB3aW5kb3cuYXBwQ2llcnJlLmlzSGlkZSA9IGZhbHNlO1xyXG4gICAgICAgIHNlbGYuaXNIaWRlID0gdHJ1ZTtcclxuICAgICAgICAkKFwiLnRvcC1uYXZcIikucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAkKFwiI2FwcC1jaWVycmVcIikucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRhdGE6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYmFjazoge2xpbms6XCJzb21lbGlua1wiLHRleHQ6XCJ2b2x2ZXIgYSBjaWVycmVcIn0sXHJcbiAgICAgICAgZm93YXJkOiB7bGluazogQkFTRV9VUkwgKyBcImFwcC9sb2dvdXRcIix0ZXh0OlwiY2VycmFyIHNlc3Npb25cIn0sXHJcbiAgICAgICAgdGl0bGU6XCJSZXN1bWVuIGRlIGNpZXJyZSBkZSBob3lcIixcclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICB2YXIgYXBwU3VtbWFyeVZpZXcgPSBuZXcgVnVlKHtcclxuICAgIGVsOiBcIiNwcmludC12aWV3XCIsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGlzSGlkZTogdHJ1ZSxcclxuICAgICAgYmFjazoge2xpbms6XCJzb21lbGlua1wiLHRleHQ6XCJ2b2x2ZXIgYSBjaWVycmVcIn0sXHJcbiAgICAgIGZvd2FyZDoge2xpbms6IEJBU0VfVVJMICsgXCJhcHAvbG9nb3V0XCIsdGV4dDpcImNlcnJhciBzZXNzaW9uXCJ9LFxyXG4gICAgICBjaWVycmU6e1xyXG4gICAgICAgICAgYXV0b3I6ICcnLFxyXG4gICAgICAgICAgcGFnb3NfZmFjdHVyYXM6IDAsXHJcbiAgICAgICAgICBwYWdvc19leHRyYXM6IDAsXHJcbiAgICAgICAgICBwYWdvc19lZmVjdGl2bzogMCxcclxuICAgICAgICAgIHBhZ29zX2JhbmNvOiAwLFxyXG4gICAgICAgICAgdG90YWxfaW5ncmVzb3M6IDAsXHJcbiAgICAgICAgICBlZmVjdGl2b19jYWphOiAwLFxyXG4gICAgICAgICAgdG90YWxfZGVzY3VhZHJlOiAwLFxyXG4gICAgICAgICAgdG90YWxfZ2FzdG9zOiAwLFxyXG4gICAgICAgICAgYmFuY286IDBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZmlsdGVyczoge1xyXG4gICAgICBjdXJyZW5jeUZvcm1hdDogZnVuY3Rpb24obnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gXCJSRCQgXCIrIEN1cnJlbmN5Rm9ybWF0KG51bWJlcik7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBzcGFuaXNoRGF0ZUZvcm1hdDogZnVuY3Rpb24oZGF0ZSl7XHJcbiAgICAgICAgbW9tZW50LmxvY2FsZSgnZXMtRE8nKTtcclxuICAgICAgICByZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdCgnZGRkZCBERCBbZGVdIE1NTU0gW2RlbF0gWVlZWScpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBtZXRob2RzOntcclxuICAgICAgZ29CYWNrOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGFwcFN1bW1hcnlWaWV3LmlzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgd2luZG93LmFwcENpZXJyZS5pc0hpZGUgPSBmYWxzZTtcclxuICAgICAgICBzZWxmLmlzSGlkZSA9IHRydWU7XHJcbiAgICAgICAgJChcIi50b3AtbmF2XCIpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgJChcIiNhcHAtY2llcnJlXCIpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHByaW50OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHByaW50KClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pIiwidmFyIGxpc3RFeHRyYXMgPSAnJztcclxudmFyIHJlY2lib1Jlc2V0ID0ge1xyXG4gIGlkX3BhZ286IDAsXHJcbiAgaWRfY29udHJhdG86IDAsXHJcbiAgaWRfc2VydmljaW86IDAsXHJcbiAgaWRfZW1wbGVhZG86IDAsXHJcbiAgZmVjaGFfcGFnbyA6ICcnLFxyXG4gIGNvbmNlcHRvIDogJ2V4dHJhJyxcclxuICBkZXRhbGxlc19leHRyYSA6ICcnLFxyXG4gIGN1b3RhOiAnJyxcclxuICBtb3JhIDogJycsXHJcbiAgbW9udG9fZXh0cmE6ICcnLFxyXG4gIHRvdGFsOiAnJyxcclxuICBlc3RhZG86ICcnLFxyXG4gIGZlY2hhX2xpbWl0ZTogJycsXHJcbiAgY29tcGxldGVfZGF0ZSA6ICcnLFxyXG4gIGRlc2N1ZW50bzogJycsXHJcbiAgcmF6b25fZGVzY3VlbnRvOiAnJyxcclxuICBkZXVkYTogJycsXHJcbiAgYWJvbm9fYTogJycsXHJcbiAgdGlwbzogJycsXHJcbiAgZ2VuZXJhZG86ICcnXHJcbn1cclxuXHJcbnZhciBhcHBQYWdvRXh0cmEgPSBuZXcgVnVlKHtcclxuICBlbDogXCIjYXBwLXBhZ28tZXh0cmFcIixcclxuICBkYXRhOiB7XHJcbiAgICByZWNpYm86e1xyXG4gICAgICAgaWRfcGFnbzogMCxcclxuICAgICAgIGlkX2NvbnRyYXRvOiAwLFxyXG4gICAgICAgaWRfc2VydmljaW86IDAsXHJcbiAgICAgICBpZF9lbXBsZWFkbzogMCxcclxuICAgICAgIGZlY2hhX3BhZ28gOiAnZGQvbW0veXl5eScsXHJcbiAgICAgICBjb25jZXB0byA6ICdleHRyYScsXHJcbiAgICAgICBkZXRhbGxlc19leHRyYSA6ICcnLFxyXG4gICAgICAgY3VvdGE6ICcnLFxyXG4gICAgICAgbW9yYSA6ICcnLFxyXG4gICAgICAgbW9udG9fZXh0cmE6ICcnLFxyXG4gICAgICAgdG90YWw6ICcnLFxyXG4gICAgICAgZXN0YWRvOiAnJyxcclxuICAgICAgIGZlY2hhX2xpbWl0ZTogJycsXHJcbiAgICAgICBjb21wbGV0ZV9kYXRlIDogJycsXHJcbiAgICAgICBkZXNjdWVudG86ICcnLFxyXG4gICAgICAgcmF6b25fZGVzY3VlbnRvOiAnJyxcclxuICAgICAgIGRldWRhOiAnJyxcclxuICAgICAgIGFib25vX2E6ICcnLFxyXG4gICAgICAgdGlwbzogJycsXHJcbiAgICAgICBnZW5lcmFkbzogJydcclxuICAgIH0sXHJcblxyXG4gICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICBleHRyYTp7XHJcbiAgICAgIFwiY29udHJvbHNcIjogJycsXHJcbiAgICAgIFwiaWRfZXh0cmFcIjogJycsXHJcbiAgICAgIFwiaWRfc2VydmljaW9cIjogJycsXHJcbiAgICAgIFwiY2hlY2tib3hcIjogJycsXHJcbiAgICAgIFwiZmVjaGFcIjogJycsXHJcbiAgICAgIFwiY29uY2VwdG9cIjogJycsXHJcbiAgICAgIFwidWx0aW1vX3BhZ29cIjogJycsXHJcbiAgICAgIFwibW9udG9fcGFnYWRvXCI6ICcnLFxyXG4gICAgICBcIm1vbnRvX3RvdGFsXCI6ICcnLFxyXG4gICAgICBcImVzdGFkb1wiOiAnJ1xyXG4gICAgfSxcclxuICAgIGZpcnN0Q29udHJvbHM6IHtcclxuICAgICAgaGlkZTogZmFsc2VcclxuICAgIH0sXHJcbiAgfSxcclxuICBmaWx0ZXJzOiB7XHJcblxyXG4gIH0sXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIHVybF9yZWNpYm86IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIEJBU0VfVVJMICsgJ3Byb2Nlc3MvZ2V0cmVjaWJvLycgKyB0aGlzLnJlY2liby5pZF9wYWdvO1xyXG4gICAgfSxcclxuXHJcbiAgICBoaWRlX3JlY2libzogZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZih0aGlzLnJlY2liby5lc3RhZG8gPT0gXCJwYWdhZG9cIil7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgIHJldHVybiB0aGlzLmhpZGVfcmVjaWJvID0gdHJ1ZTtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbWV0aG9kczp7XHJcblxyXG4gICAgZ29CYWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGV4dHJhVGFibGUuZWwucGFyZW50cyhcIi5ib290c3RyYXAtdGFibGVcIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICB0aGlzLnZpc2libGUgPSBmYWxzZVxyXG4gICAgICB0aGlzLmV4dHJhID0ge2NvbmNlcHRvOiAnJ31cclxuICAgICAgZXh0cmFUYWJsZS5yZWZyZXNoKGxpc3RFeHRyYXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZW5lcmF0ZVBheW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGZvcm0gPSAnZGF0YT0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5leHRyYSk7XHJcbiAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdCggQkFTRV9VUkwgKyAnZXh0cmEvZ2VuZXJhdGVfZXh0cmFfcGF5bWVudCcsZm9ybSk7XHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgICBzZWxlY3RFeHRyYVBheW1lbnQuaHRtbChkYXRhLnBhZ29zKS5jaGFuZ2UoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oKXtcclxuICAgICAgICBcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0UGF5bWVudDogZnVuY3Rpb24gKGlkX3BhZ28pIHtcclxuICAgICAgdmFyIGZvcm0gPSBcImRhdGE9XCIgKyBKU09OLnN0cmluZ2lmeSh7aWRfcGFnbzogaWRfcGFnb30pO1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KCBCQVNFX1VSTCArICdleHRyYS9nZXRfcGF5bWVudCcsZm9ybSk7XHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEgXHJcbiAgICAgICAgaWYoZGF0YS5yZWNpYm8pe1xyXG4gICAgICAgICAgc2VsZi5yZWNpYm8gPSBkYXRhLnJlY2lib1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgYXBwbHlQYXltZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpc1xyXG4gICAgICB2YXIgcmVjaWJvID0gdGhpcy5yZWNpYm9cclxuICAgICAgdmFyIGluZm8gPSB7XHJcbiAgICAgICAgaWRfZXh0cmE6IHJlY2liby5pZF9leHRyYSxcclxuICAgICAgICBpZF9wYWdvOiByZWNpYm8uaWRfcGFnb1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICBjb25jZXB0bzogJ2V4dHJhIC0nLCBcclxuICAgICAgICBkZXRhbGxlc19leHRyYTogcmVjaWJvLmRldGFsbGVzX2V4dHJhLFxyXG4gICAgICAgIGZlY2hhX3BhZ286IHJlY2liby5mZWNoYV9wYWdvLFxyXG4gICAgICAgIGN1b3RhOiByZWNpYm8uY3VvdGEsXHJcbiAgICAgICAgdG90YWw6IHJlY2liby5jdW90YSxcclxuICAgICAgICBlc3RhZG86ICdwYWdhZG8nLFxyXG4gICAgICAgIHRpcG86IHJlY2liby50aXBvLFxyXG4gICAgICAgIGdlbmVyYWRvOiB0cnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBmb3JtID0gJ2RhdGE9JysgSlNPTi5zdHJpbmdpZnkoZGF0YSkgKyAnJmluZm89JysgSlNPTi5zdHJpbmdpZnkoaW5mbylcclxuICAgICAgdmFyIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ2V4dHJhL2FwcGx5X3BheW1lbnQnLGZvcm0pXHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgIGxpc3RFeHRyYXMgPSBkYXRhLmV4dHJhcztcclxuICAgICAgICBzZWxmLmdldFBheW1lbnRzKHNlbGYuZXh0cmEuaWRfZXh0cmEpO1xyXG4gICAgICAgIGRpc3BsYXlNZXNzYWdlKGRhdGEubWVuc2FqZSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGdldFBheW1lbnRzOiBmdW5jdGlvbiAoaWRfZXh0cmEpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICB2YXIgZm9ybSA9IFwiZGF0YT1cIisgSlNPTi5zdHJpbmdpZnkoe2lkX2V4dHJhOiBpZF9leHRyYX0pXHJcbiAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdleHRyYS9nZXRfZXh0cmFfcGF5bWVudF9vZicsIGZvcm0pXHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgICAgaWYoIWRhdGEucGFnb3Mpe1xyXG4gICAgICAgICAgc2VsZi5yZWNpYm8gPSByZWNpYm9SZXNldFxyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxlY3RFeHRyYVBheW1lbnQuaHRtbChkYXRhLnBhZ29zKS5jaGFuZ2UoKVxyXG5cclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlUGF5bWVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgIHZhciByZWNpYm8gPSB0aGlzLnJlY2lib1xyXG4gICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAnaWRfZXh0cmEnOiByZWNpYm8uaWRfZXh0cmEsXHJcbiAgICAgICAgJ2lkX3BhZ28nOiByZWNpYm8uaWRfcGFnb1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZm9ybSA9ICdkYXRhPScrIEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgIHZhciBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdleHRyYS9kZWxldGVfcGF5bWVudCcsZm9ybSlcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhXHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UoZGF0YS5tZW5zYWplKTtcclxuICAgICAgICBzZWxmLmdldFBheW1lbnRzKHNlbGYuZXh0cmEuaWRfZXh0cmEpO1xyXG4gICAgICB9KVxyXG4gICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuYnVzLiRvbigncm93LXNlbGVjdGVkJyxmdW5jdGlvbiAocm93KSB7XHJcbiAgZXh0cmFUYWJsZS5lbC5wYXJlbnRzKFwiLmJvb3RzdHJhcC10YWJsZVwiKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgYXBwUGFnb0V4dHJhLnZpc2libGUgPSB0cnVlXHJcbiAgYXBwUGFnb0V4dHJhLmV4dHJhID0gcm93XHJcbiAgbGlzdEV4dHJhcyA9IGV4dHJhVGFibGUuZWwuZmluZCgndGJvZHknKS5odG1sKCk7XHJcbiAgYXBwUGFnb0V4dHJhLmdldFBheW1lbnRzKHJvdy5pZF9leHRyYSk7XHJcbn0pXHJcblxyXG52YXIgc2VsZWN0RXh0cmFQYXltZW50ID0gJChcIiNzZWxlY3QtZXh0cmEtcGF5bWVudFwiKTtcclxuc2VsZWN0RXh0cmFQYXltZW50Lm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGlkX3BhZ28gPSBzZWxlY3RFeHRyYVBheW1lbnQudmFsKClcclxuICBhcHBQYWdvRXh0cmEuZ2V0UGF5bWVudChpZF9wYWdvKVxyXG59KSIsIi8qISBBZG1pbkxURSBhcHAuanNcbiogPT09PT09PT09PT09PT09PVxuKiBNYWluIEpTIGFwcGxpY2F0aW9uIGZpbGUgZm9yIEFkbWluTFRFIHYyLiBUaGlzIGZpbGVcbiogc2hvdWxkIGJlIGluY2x1ZGVkIGluIGFsbCBwYWdlcy4gSXQgY29udHJvbHMgc29tZSBsYXlvdXRcbiogb3B0aW9ucyBhbmQgaW1wbGVtZW50cyBleGNsdXNpdmUgQWRtaW5MVEUgcGx1Z2lucy5cbipcbiogQEF1dGhvciAgQWxtc2FlZWQgU3R1ZGlvXG4qIEBTdXBwb3J0IDxodHRwczovL3d3dy5hbG1zYWVlZHN0dWRpby5jb20+XG4qIEBFbWFpbCAgIDxhYmR1bGxhaEBhbG1zYWVlZHN0dWRpby5jb20+XG4qIEB2ZXJzaW9uIDIuNC4wXG4qIEByZXBvc2l0b3J5IGdpdDovL2dpdGh1Yi5jb20vYWxtYXNhZWVkMjAxMC9BZG1pbkxURS5naXRcbiogQGxpY2Vuc2UgTUlUIDxodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUPlxuKi9cbmlmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBqUXVlcnkpdGhyb3cgbmV3IEVycm9yKFwiQWRtaW5MVEUgcmVxdWlyZXMgalF1ZXJ5XCIpOytmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZT1hKHRoaXMpLGY9ZS5kYXRhKGMpO2lmKCFmKXt2YXIgaD1hLmV4dGVuZCh7fSxkLGUuZGF0YSgpLFwib2JqZWN0XCI9PXR5cGVvZiBiJiZiKTtlLmRhdGEoYyxmPW5ldyBnKGgpKX1pZihcInN0cmluZ1wiPT10eXBlb2YgYil7aWYodm9pZCAwPT09ZltiXSl0aHJvdyBuZXcgRXJyb3IoXCJObyBtZXRob2QgbmFtZWQgXCIrYik7ZltiXSgpfX0pfXZhciBjPVwibHRlLmxheW91dFwiLGQ9e3NsaW1zY3JvbGw6ITAscmVzZXRIZWlnaHQ6ITB9LGU9e3dyYXBwZXI6XCIud3JhcHBlclwiLGNvbnRlbnRXcmFwcGVyOlwiLmNvbnRlbnQtd3JhcHBlclwiLGxheW91dEJveGVkOlwiLmxheW91dC1ib3hlZFwiLG1haW5Gb290ZXI6XCIubWFpbi1mb290ZXJcIixtYWluSGVhZGVyOlwiLm1haW4taGVhZGVyXCIsc2lkZWJhcjpcIi5zaWRlYmFyXCIsY29udHJvbFNpZGViYXI6XCIuY29udHJvbC1zaWRlYmFyXCIsZml4ZWQ6XCIuZml4ZWRcIixzaWRlYmFyTWVudTpcIi5zaWRlYmFyLW1lbnVcIixsb2dvOlwiLm1haW4taGVhZGVyIC5sb2dvXCJ9LGY9e2ZpeGVkOlwiZml4ZWRcIixob2xkVHJhbnNpdGlvbjpcImhvbGQtdHJhbnNpdGlvblwifSxnPWZ1bmN0aW9uKGEpe3RoaXMub3B0aW9ucz1hLHRoaXMuYmluZGVkUmVzaXplPSExLHRoaXMuYWN0aXZhdGUoKX07Zy5wcm90b3R5cGUuYWN0aXZhdGU9ZnVuY3Rpb24oKXt0aGlzLmZpeCgpLHRoaXMuZml4U2lkZWJhcigpLGEoXCJib2R5XCIpLnJlbW92ZUNsYXNzKGYuaG9sZFRyYW5zaXRpb24pLHRoaXMub3B0aW9ucy5yZXNldEhlaWdodCYmYShcImJvZHksIGh0bWwsIFwiK2Uud3JhcHBlcikuY3NzKHtoZWlnaHQ6XCJhdXRvXCIsXCJtaW4taGVpZ2h0XCI6XCIxMDAlXCJ9KSx0aGlzLmJpbmRlZFJlc2l6ZXx8KGEod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXt0aGlzLmZpeCgpLHRoaXMuZml4U2lkZWJhcigpLGEoZS5sb2dvK1wiLCBcIitlLnNpZGViYXIpLm9uZShcIndlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmRcIixmdW5jdGlvbigpe3RoaXMuZml4KCksdGhpcy5maXhTaWRlYmFyKCl9LmJpbmQodGhpcykpfS5iaW5kKHRoaXMpKSx0aGlzLmJpbmRlZFJlc2l6ZT0hMCksYShlLnNpZGViYXJNZW51KS5vbihcImV4cGFuZGVkLnRyZWVcIixmdW5jdGlvbigpe3RoaXMuZml4KCksdGhpcy5maXhTaWRlYmFyKCl9LmJpbmQodGhpcykpLGEoZS5zaWRlYmFyTWVudSkub24oXCJjb2xsYXBzZWQudHJlZVwiLGZ1bmN0aW9uKCl7dGhpcy5maXgoKSx0aGlzLmZpeFNpZGViYXIoKX0uYmluZCh0aGlzKSl9LGcucHJvdG90eXBlLmZpeD1mdW5jdGlvbigpe2EoZS5sYXlvdXRCb3hlZCtcIiA+IFwiK2Uud3JhcHBlcikuY3NzKFwib3ZlcmZsb3dcIixcImhpZGRlblwiKTt2YXIgYj1hKGUubWFpbkZvb3Rlcikub3V0ZXJIZWlnaHQoKXx8MCxjPWEoZS5tYWluSGVhZGVyKS5vdXRlckhlaWdodCgpK2IsZD1hKHdpbmRvdykuaGVpZ2h0KCksZz1hKGUuc2lkZWJhcikuaGVpZ2h0KCl8fDA7aWYoYShcImJvZHlcIikuaGFzQ2xhc3MoZi5maXhlZCkpYShlLmNvbnRlbnRXcmFwcGVyKS5jc3MoXCJtaW4taGVpZ2h0XCIsZC1iKTtlbHNle3ZhciBoO2Q+PWc/KGEoZS5jb250ZW50V3JhcHBlcikuY3NzKFwibWluLWhlaWdodFwiLGQtYyksaD1kLWMpOihhKGUuY29udGVudFdyYXBwZXIpLmNzcyhcIm1pbi1oZWlnaHRcIixnKSxoPWcpO3ZhciBpPWEoZS5jb250cm9sU2lkZWJhcik7dm9pZCAwIT09aSYmaS5oZWlnaHQoKT5oJiZhKGUuY29udGVudFdyYXBwZXIpLmNzcyhcIm1pbi1oZWlnaHRcIixpLmhlaWdodCgpKX19LGcucHJvdG90eXBlLmZpeFNpZGViYXI9ZnVuY3Rpb24oKXtpZighYShcImJvZHlcIikuaGFzQ2xhc3MoZi5maXhlZCkpcmV0dXJuIHZvaWQodm9pZCAwIT09YS5mbi5zbGltU2Nyb2xsJiZhKGUuc2lkZWJhcikuc2xpbVNjcm9sbCh7ZGVzdHJveTohMH0pLmhlaWdodChcImF1dG9cIikpO3RoaXMub3B0aW9ucy5zbGltc2Nyb2xsJiZ2b2lkIDAhPT1hLmZuLnNsaW1TY3JvbGwmJihhKGUuc2lkZWJhcikuc2xpbVNjcm9sbCh7ZGVzdHJveTohMH0pLmhlaWdodChcImF1dG9cIiksYShlLnNpZGViYXIpLnNsaW1TY3JvbGwoe2hlaWdodDphKHdpbmRvdykuaGVpZ2h0KCktYShlLm1haW5IZWFkZXIpLmhlaWdodCgpK1wicHhcIixjb2xvcjpcInJnYmEoMCwwLDAsMC4yKVwiLHNpemU6XCIzcHhcIn0pKX07dmFyIGg9YS5mbi5sYXlvdXQ7YS5mbi5sYXlvdXQ9YixhLmZuLmxheW91dC5Db25zdHVjdG9yPWcsYS5mbi5sYXlvdXQubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLmxheW91dD1oLHRoaXN9LGEod2luZG93KS5vbihcImxvYWRcIixmdW5jdGlvbigpe2IuY2FsbChhKFwiYm9keVwiKSl9KX0oalF1ZXJ5KSxmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZT1hKHRoaXMpLGY9ZS5kYXRhKGMpO2lmKCFmKXt2YXIgZz1hLmV4dGVuZCh7fSxkLGUuZGF0YSgpLFwib2JqZWN0XCI9PXR5cGVvZiBiJiZiKTtlLmRhdGEoYyxmPW5ldyBoKGcpKX1cInRvZ2dsZVwiPT1iJiZmLnRvZ2dsZSgpfSl9dmFyIGM9XCJsdGUucHVzaG1lbnVcIixkPXtjb2xsYXBzZVNjcmVlblNpemU6NzY3LGV4cGFuZE9uSG92ZXI6ITEsZXhwYW5kVHJhbnNpdGlvbkRlbGF5OjIwMH0sZT17Y29sbGFwc2VkOlwiLnNpZGViYXItY29sbGFwc2VcIixvcGVuOlwiLnNpZGViYXItb3BlblwiLG1haW5TaWRlYmFyOlwiLm1haW4tc2lkZWJhclwiLGNvbnRlbnRXcmFwcGVyOlwiLmNvbnRlbnQtd3JhcHBlclwiLHNlYXJjaElucHV0OlwiLnNpZGViYXItZm9ybSAuZm9ybS1jb250cm9sXCIsYnV0dG9uOidbZGF0YS10b2dnbGU9XCJwdXNoLW1lbnVcIl0nLG1pbmk6XCIuc2lkZWJhci1taW5pXCIsZXhwYW5kZWQ6XCIuc2lkZWJhci1leHBhbmRlZC1vbi1ob3ZlclwiLGxheW91dEZpeGVkOlwiLmZpeGVkXCJ9LGY9e2NvbGxhcHNlZDpcInNpZGViYXItY29sbGFwc2VcIixvcGVuOlwic2lkZWJhci1vcGVuXCIsbWluaTpcInNpZGViYXItbWluaVwiLGV4cGFuZGVkOlwic2lkZWJhci1leHBhbmRlZC1vbi1ob3ZlclwiLGV4cGFuZEZlYXR1cmU6XCJzaWRlYmFyLW1pbmktZXhwYW5kLWZlYXR1cmVcIixsYXlvdXRGaXhlZDpcImZpeGVkXCJ9LGc9e2V4cGFuZGVkOlwiZXhwYW5kZWQucHVzaE1lbnVcIixjb2xsYXBzZWQ6XCJjb2xsYXBzZWQucHVzaE1lbnVcIn0saD1mdW5jdGlvbihhKXt0aGlzLm9wdGlvbnM9YSx0aGlzLmluaXQoKX07aC5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpeyh0aGlzLm9wdGlvbnMuZXhwYW5kT25Ib3Zlcnx8YShcImJvZHlcIikuaXMoZS5taW5pK2UubGF5b3V0Rml4ZWQpKSYmKHRoaXMuZXhwYW5kT25Ib3ZlcigpLGEoXCJib2R5XCIpLmFkZENsYXNzKGYuZXhwYW5kRmVhdHVyZSkpLGEoZS5jb250ZW50V3JhcHBlcikuY2xpY2soZnVuY3Rpb24oKXthKHdpbmRvdykud2lkdGgoKTw9dGhpcy5vcHRpb25zLmNvbGxhcHNlU2NyZWVuU2l6ZSYmYShcImJvZHlcIikuaGFzQ2xhc3MoZi5vcGVuKSYmdGhpcy5jbG9zZSgpfS5iaW5kKHRoaXMpKSxhKGUuc2VhcmNoSW5wdXQpLmNsaWNrKGZ1bmN0aW9uKGEpe2Euc3RvcFByb3BhZ2F0aW9uKCl9KX0saC5wcm90b3R5cGUudG9nZ2xlPWZ1bmN0aW9uKCl7dmFyIGI9YSh3aW5kb3cpLndpZHRoKCksYz0hYShcImJvZHlcIikuaGFzQ2xhc3MoZi5jb2xsYXBzZWQpO2I8PXRoaXMub3B0aW9ucy5jb2xsYXBzZVNjcmVlblNpemUmJihjPWEoXCJib2R5XCIpLmhhc0NsYXNzKGYub3BlbikpLGM/dGhpcy5jbG9zZSgpOnRoaXMub3BlbigpfSxoLnByb3RvdHlwZS5vcGVuPWZ1bmN0aW9uKCl7YSh3aW5kb3cpLndpZHRoKCk+dGhpcy5vcHRpb25zLmNvbGxhcHNlU2NyZWVuU2l6ZT9hKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhmLmNvbGxhcHNlZCkudHJpZ2dlcihhLkV2ZW50KGcuZXhwYW5kZWQpKTphKFwiYm9keVwiKS5hZGRDbGFzcyhmLm9wZW4pLnRyaWdnZXIoYS5FdmVudChnLmV4cGFuZGVkKSl9LGgucHJvdG90eXBlLmNsb3NlPWZ1bmN0aW9uKCl7YSh3aW5kb3cpLndpZHRoKCk+dGhpcy5vcHRpb25zLmNvbGxhcHNlU2NyZWVuU2l6ZT9hKFwiYm9keVwiKS5hZGRDbGFzcyhmLmNvbGxhcHNlZCkudHJpZ2dlcihhLkV2ZW50KGcuY29sbGFwc2VkKSk6YShcImJvZHlcIikucmVtb3ZlQ2xhc3MoZi5vcGVuK1wiIFwiK2YuY29sbGFwc2VkKS50cmlnZ2VyKGEuRXZlbnQoZy5jb2xsYXBzZWQpKX0saC5wcm90b3R5cGUuZXhwYW5kT25Ib3Zlcj1mdW5jdGlvbigpe2EoZS5tYWluU2lkZWJhcikuaG92ZXIoZnVuY3Rpb24oKXthKFwiYm9keVwiKS5pcyhlLm1pbmkrZS5jb2xsYXBzZWQpJiZhKHdpbmRvdykud2lkdGgoKT50aGlzLm9wdGlvbnMuY29sbGFwc2VTY3JlZW5TaXplJiZ0aGlzLmV4cGFuZCgpfS5iaW5kKHRoaXMpLGZ1bmN0aW9uKCl7YShcImJvZHlcIikuaXMoZS5leHBhbmRlZCkmJnRoaXMuY29sbGFwc2UoKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLmV4cGFuZD1mdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXthKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhmLmNvbGxhcHNlZCkuYWRkQ2xhc3MoZi5leHBhbmRlZCl9LHRoaXMub3B0aW9ucy5leHBhbmRUcmFuc2l0aW9uRGVsYXkpfSxoLnByb3RvdHlwZS5jb2xsYXBzZT1mdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXthKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhmLmV4cGFuZGVkKS5hZGRDbGFzcyhmLmNvbGxhcHNlZCl9LHRoaXMub3B0aW9ucy5leHBhbmRUcmFuc2l0aW9uRGVsYXkpfTt2YXIgaT1hLmZuLnB1c2hNZW51O2EuZm4ucHVzaE1lbnU9YixhLmZuLnB1c2hNZW51LkNvbnN0cnVjdG9yPWgsYS5mbi5wdXNoTWVudS5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4ucHVzaE1lbnU9aSx0aGlzfSxhKGRvY3VtZW50KS5vbihcImNsaWNrXCIsZS5idXR0b24sZnVuY3Rpb24oYyl7Yy5wcmV2ZW50RGVmYXVsdCgpLGIuY2FsbChhKHRoaXMpLFwidG9nZ2xlXCIpfSksYSh3aW5kb3cpLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7Yi5jYWxsKGEoZS5idXR0b24pKX0pfShqUXVlcnkpLGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlPWEodGhpcyk7aWYoIWUuZGF0YShjKSl7dmFyIGY9YS5leHRlbmQoe30sZCxlLmRhdGEoKSxcIm9iamVjdFwiPT10eXBlb2YgYiYmYik7ZS5kYXRhKGMsbmV3IGgoZSxmKSl9fSl9dmFyIGM9XCJsdGUudHJlZVwiLGQ9e2FuaW1hdGlvblNwZWVkOjUwMCxhY2NvcmRpb246ITAsZm9sbG93TGluazohMSx0cmlnZ2VyOlwiLnRyZWV2aWV3IGFcIn0sZT17dHJlZTpcIi50cmVlXCIsdHJlZXZpZXc6XCIudHJlZXZpZXdcIix0cmVldmlld01lbnU6XCIudHJlZXZpZXctbWVudVwiLG9wZW46XCIubWVudS1vcGVuLCAuYWN0aXZlXCIsbGk6XCJsaVwiLGRhdGE6J1tkYXRhLXdpZGdldD1cInRyZWVcIl0nLGFjdGl2ZTpcIi5hY3RpdmVcIn0sZj17b3BlbjpcIm1lbnUtb3BlblwiLHRyZWU6XCJ0cmVlXCJ9LGc9e2NvbGxhcHNlZDpcImNvbGxhcHNlZC50cmVlXCIsZXhwYW5kZWQ6XCJleHBhbmRlZC50cmVlXCJ9LGg9ZnVuY3Rpb24oYixjKXt0aGlzLmVsZW1lbnQ9Yix0aGlzLm9wdGlvbnM9YyxhKHRoaXMuZWxlbWVudCkuYWRkQ2xhc3MoZi50cmVlKSxhKGUudHJlZXZpZXcrZS5hY3RpdmUsdGhpcy5lbGVtZW50KS5hZGRDbGFzcyhmLm9wZW4pLHRoaXMuX3NldFVwTGlzdGVuZXJzKCl9O2gucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbihhLGIpe3ZhciBjPWEubmV4dChlLnRyZWV2aWV3TWVudSksZD1hLnBhcmVudCgpLGc9ZC5oYXNDbGFzcyhmLm9wZW4pO2QuaXMoZS50cmVldmlldykmJih0aGlzLm9wdGlvbnMuZm9sbG93TGluayYmXCIjXCIhPWEuYXR0cihcImhyZWZcIil8fGIucHJldmVudERlZmF1bHQoKSxnP3RoaXMuY29sbGFwc2UoYyxkKTp0aGlzLmV4cGFuZChjLGQpKX0saC5wcm90b3R5cGUuZXhwYW5kPWZ1bmN0aW9uKGIsYyl7dmFyIGQ9YS5FdmVudChnLmV4cGFuZGVkKTtpZih0aGlzLm9wdGlvbnMuYWNjb3JkaW9uKXt2YXIgaD1jLnNpYmxpbmdzKGUub3BlbiksaT1oLmNoaWxkcmVuKGUudHJlZXZpZXdNZW51KTt0aGlzLmNvbGxhcHNlKGksaCl9Yy5hZGRDbGFzcyhmLm9wZW4pLGIuc2xpZGVEb3duKHRoaXMub3B0aW9ucy5hbmltYXRpb25TcGVlZCxmdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS50cmlnZ2VyKGQpfS5iaW5kKHRoaXMpKX0saC5wcm90b3R5cGUuY29sbGFwc2U9ZnVuY3Rpb24oYixjKXt2YXIgZD1hLkV2ZW50KGcuY29sbGFwc2VkKTtiLmZpbmQoZS5vcGVuKS5yZW1vdmVDbGFzcyhmLm9wZW4pLGMucmVtb3ZlQ2xhc3MoZi5vcGVuKSxiLnNsaWRlVXAodGhpcy5vcHRpb25zLmFuaW1hdGlvblNwZWVkLGZ1bmN0aW9uKCl7Yi5maW5kKGUub3BlbitcIiA+IFwiK2UudHJlZXZpZXcpLnNsaWRlVXAoKSxhKHRoaXMuZWxlbWVudCkudHJpZ2dlcihkKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLl9zZXRVcExpc3RlbmVycz1mdW5jdGlvbigpe3ZhciBiPXRoaXM7YSh0aGlzLmVsZW1lbnQpLm9uKFwiY2xpY2tcIix0aGlzLm9wdGlvbnMudHJpZ2dlcixmdW5jdGlvbihjKXtiLnRvZ2dsZShhKHRoaXMpLGMpfSl9O3ZhciBpPWEuZm4udHJlZTthLmZuLnRyZWU9YixhLmZuLnRyZWUuQ29uc3RydWN0b3I9aCxhLmZuLnRyZWUubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLnRyZWU9aSx0aGlzfSxhKHdpbmRvdykub24oXCJsb2FkXCIsZnVuY3Rpb24oKXthKGUuZGF0YSkuZWFjaChmdW5jdGlvbigpe2IuY2FsbChhKHRoaXMpKX0pfSl9KGpRdWVyeSksZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU9YSh0aGlzKSxmPWUuZGF0YShjKTtpZighZil7dmFyIGc9YS5leHRlbmQoe30sZCxlLmRhdGEoKSxcIm9iamVjdFwiPT10eXBlb2YgYiYmYik7ZS5kYXRhKGMsZj1uZXcgaChlLGcpKX1cInN0cmluZ1wiPT10eXBlb2YgYiYmZi50b2dnbGUoKX0pfXZhciBjPVwibHRlLmNvbnRyb2xzaWRlYmFyXCIsZD17c2xpZGU6ITB9LGU9e3NpZGViYXI6XCIuY29udHJvbC1zaWRlYmFyXCIsZGF0YTonW2RhdGEtdG9nZ2xlPVwiY29udHJvbC1zaWRlYmFyXCJdJyxvcGVuOlwiLmNvbnRyb2wtc2lkZWJhci1vcGVuXCIsYmc6XCIuY29udHJvbC1zaWRlYmFyLWJnXCIsd3JhcHBlcjpcIi53cmFwcGVyXCIsY29udGVudDpcIi5jb250ZW50LXdyYXBwZXJcIixib3hlZDpcIi5sYXlvdXQtYm94ZWRcIn0sZj17b3BlbjpcImNvbnRyb2wtc2lkZWJhci1vcGVuXCIsZml4ZWQ6XCJmaXhlZFwifSxnPXtjb2xsYXBzZWQ6XCJjb2xsYXBzZWQuY29udHJvbHNpZGViYXJcIixleHBhbmRlZDpcImV4cGFuZGVkLmNvbnRyb2xzaWRlYmFyXCJ9LGg9ZnVuY3Rpb24oYSxiKXt0aGlzLmVsZW1lbnQ9YSx0aGlzLm9wdGlvbnM9Yix0aGlzLmhhc0JpbmRlZFJlc2l6ZT0hMSx0aGlzLmluaXQoKX07aC5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS5pcyhlLmRhdGEpfHxhKHRoaXMpLm9uKFwiY2xpY2tcIix0aGlzLnRvZ2dsZSksdGhpcy5maXgoKSxhKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7dGhpcy5maXgoKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbihiKXtiJiZiLnByZXZlbnREZWZhdWx0KCksdGhpcy5maXgoKSxhKGUuc2lkZWJhcikuaXMoZS5vcGVuKXx8YShcImJvZHlcIikuaXMoZS5vcGVuKT90aGlzLmNvbGxhcHNlKCk6dGhpcy5leHBhbmQoKX0saC5wcm90b3R5cGUuZXhwYW5kPWZ1bmN0aW9uKCl7dGhpcy5vcHRpb25zLnNsaWRlP2EoZS5zaWRlYmFyKS5hZGRDbGFzcyhmLm9wZW4pOmEoXCJib2R5XCIpLmFkZENsYXNzKGYub3BlbiksYSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoYS5FdmVudChnLmV4cGFuZGVkKSl9LGgucHJvdG90eXBlLmNvbGxhcHNlPWZ1bmN0aW9uKCl7YShcImJvZHksIFwiK2Uuc2lkZWJhcikucmVtb3ZlQ2xhc3MoZi5vcGVuKSxhKHRoaXMuZWxlbWVudCkudHJpZ2dlcihhLkV2ZW50KGcuY29sbGFwc2VkKSl9LGgucHJvdG90eXBlLmZpeD1mdW5jdGlvbigpe2EoXCJib2R5XCIpLmlzKGUuYm94ZWQpJiZ0aGlzLl9maXhGb3JCb3hlZChhKGUuYmcpKX0saC5wcm90b3R5cGUuX2ZpeEZvckJveGVkPWZ1bmN0aW9uKGIpe2IuY3NzKHtwb3NpdGlvbjpcImFic29sdXRlXCIsaGVpZ2h0OmEoZS53cmFwcGVyKS5oZWlnaHQoKX0pfTt2YXIgaT1hLmZuLmNvbnRyb2xTaWRlYmFyO2EuZm4uY29udHJvbFNpZGViYXI9YixhLmZuLmNvbnRyb2xTaWRlYmFyLkNvbnN0cnVjdG9yPWgsYS5mbi5jb250cm9sU2lkZWJhci5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4uY29udHJvbFNpZGViYXI9aSx0aGlzfSxhKGRvY3VtZW50KS5vbihcImNsaWNrXCIsZS5kYXRhLGZ1bmN0aW9uKGMpe2MmJmMucHJldmVudERlZmF1bHQoKSxiLmNhbGwoYSh0aGlzKSxcInRvZ2dsZVwiKX0pfShqUXVlcnkpLGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlPWEodGhpcyksZj1lLmRhdGEoYyk7aWYoIWYpe3ZhciBnPWEuZXh0ZW5kKHt9LGQsZS5kYXRhKCksXCJvYmplY3RcIj09dHlwZW9mIGImJmIpO2UuZGF0YShjLGY9bmV3IGgoZSxnKSl9aWYoXCJzdHJpbmdcIj09dHlwZW9mIGIpe2lmKHZvaWQgMD09PWZbYl0pdGhyb3cgbmV3IEVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFwiK2IpO2ZbYl0oKX19KX12YXIgYz1cImx0ZS5ib3h3aWRnZXRcIixkPXthbmltYXRpb25TcGVlZDo1MDAsY29sbGFwc2VUcmlnZ2VyOidbZGF0YS13aWRnZXQ9XCJjb2xsYXBzZVwiXScscmVtb3ZlVHJpZ2dlcjonW2RhdGEtd2lkZ2V0PVwicmVtb3ZlXCJdJyxjb2xsYXBzZUljb246XCJmYS1taW51c1wiLGV4cGFuZEljb246XCJmYS1wbHVzXCIscmVtb3ZlSWNvbjpcImZhLXRpbWVzXCJ9LGU9e2RhdGE6XCIuYm94XCIsY29sbGFwc2VkOlwiLmNvbGxhcHNlZC1ib3hcIixib2R5OlwiLmJveC1ib2R5XCIsZm9vdGVyOlwiLmJveC1mb290ZXJcIix0b29sczpcIi5ib3gtdG9vbHNcIn0sZj17Y29sbGFwc2VkOlwiY29sbGFwc2VkLWJveFwifSxnPXtjb2xsYXBzZWQ6XCJjb2xsYXBzZWQuYm94d2lkZ2V0XCIsZXhwYW5kZWQ6XCJleHBhbmRlZC5ib3h3aWRnZXRcIixyZW1vdmVkOlwicmVtb3ZlZC5ib3h3aWRnZXRcIn0saD1mdW5jdGlvbihhLGIpe3RoaXMuZWxlbWVudD1hLHRoaXMub3B0aW9ucz1iLHRoaXMuX3NldFVwTGlzdGVuZXJzKCl9O2gucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS5pcyhlLmNvbGxhcHNlZCk/dGhpcy5leHBhbmQoKTp0aGlzLmNvbGxhcHNlKCl9LGgucHJvdG90eXBlLmV4cGFuZD1mdW5jdGlvbigpe3ZhciBiPWEuRXZlbnQoZy5leHBhbmRlZCksYz10aGlzLm9wdGlvbnMuY29sbGFwc2VJY29uLGQ9dGhpcy5vcHRpb25zLmV4cGFuZEljb247YSh0aGlzLmVsZW1lbnQpLnJlbW92ZUNsYXNzKGYuY29sbGFwc2VkKSxhKHRoaXMuZWxlbWVudCkuZmluZChlLnRvb2xzKS5maW5kKFwiLlwiK2QpLnJlbW92ZUNsYXNzKGQpLmFkZENsYXNzKGMpLGEodGhpcy5lbGVtZW50KS5maW5kKGUuYm9keStcIiwgXCIrZS5mb290ZXIpLnNsaWRlRG93bih0aGlzLm9wdGlvbnMuYW5pbWF0aW9uU3BlZWQsZnVuY3Rpb24oKXthKHRoaXMuZWxlbWVudCkudHJpZ2dlcihiKX0uYmluZCh0aGlzKSl9LGgucHJvdG90eXBlLmNvbGxhcHNlPWZ1bmN0aW9uKCl7dmFyIGI9YS5FdmVudChnLmNvbGxhcHNlZCksYz10aGlzLm9wdGlvbnMuY29sbGFwc2VJY29uLGQ9dGhpcy5vcHRpb25zLmV4cGFuZEljb247YSh0aGlzLmVsZW1lbnQpLmZpbmQoZS50b29scykuZmluZChcIi5cIitjKS5yZW1vdmVDbGFzcyhjKS5hZGRDbGFzcyhkKSxhKHRoaXMuZWxlbWVudCkuZmluZChlLmJvZHkrXCIsIFwiK2UuZm9vdGVyKS5zbGlkZVVwKHRoaXMub3B0aW9ucy5hbmltYXRpb25TcGVlZCxmdW5jdGlvbigpe2EodGhpcy5lbGVtZW50KS5hZGRDbGFzcyhmLmNvbGxhcHNlZCksYSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoYil9LmJpbmQodGhpcykpfSxoLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24oKXt2YXIgYj1hLkV2ZW50KGcucmVtb3ZlZCk7YSh0aGlzLmVsZW1lbnQpLnNsaWRlVXAodGhpcy5vcHRpb25zLmFuaW1hdGlvblNwZWVkLGZ1bmN0aW9uKCl7YSh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoYiksYSh0aGlzLmVsZW1lbnQpLnJlbW92ZSgpfS5iaW5kKHRoaXMpKX0saC5wcm90b3R5cGUuX3NldFVwTGlzdGVuZXJzPWZ1bmN0aW9uKCl7dmFyIGI9dGhpczthKHRoaXMuZWxlbWVudCkub24oXCJjbGlja1wiLHRoaXMub3B0aW9ucy5jb2xsYXBzZVRyaWdnZXIsZnVuY3Rpb24oYSl7YSYmYS5wcmV2ZW50RGVmYXVsdCgpLGIudG9nZ2xlKCl9KSxhKHRoaXMuZWxlbWVudCkub24oXCJjbGlja1wiLHRoaXMub3B0aW9ucy5yZW1vdmVUcmlnZ2VyLGZ1bmN0aW9uKGEpe2EmJmEucHJldmVudERlZmF1bHQoKSxiLnJlbW92ZSgpfSl9O3ZhciBpPWEuZm4uYm94V2lkZ2V0O2EuZm4uYm94V2lkZ2V0PWIsYS5mbi5ib3hXaWRnZXQuQ29uc3RydWN0b3I9aCxhLmZuLmJveFdpZGdldC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4uYm94V2lkZ2V0PWksdGhpc30sYSh3aW5kb3cpLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7YShlLmRhdGEpLmVhY2goZnVuY3Rpb24oKXtiLmNhbGwoYSh0aGlzKSl9KX0pfShqUXVlcnkpLGZ1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlPWEodGhpcyksZj1lLmRhdGEoYyk7aWYoIWYpe3ZhciBoPWEuZXh0ZW5kKHt9LGQsZS5kYXRhKCksXCJvYmplY3RcIj09dHlwZW9mIGImJmIpO2UuZGF0YShjLGY9bmV3IGcoZSxoKSl9aWYoXCJzdHJpbmdcIj09dHlwZW9mIGYpe2lmKHZvaWQgMD09PWZbYl0pdGhyb3cgbmV3IEVycm9yKFwiTm8gbWV0aG9kIG5hbWVkIFwiK2IpO2ZbYl0oKX19KX12YXIgYz1cImx0ZS50b2RvbGlzdFwiLGQ9e2lDaGVjazohMSxvbkNoZWNrOmZ1bmN0aW9uKCl7fSxvblVuQ2hlY2s6ZnVuY3Rpb24oKXt9fSxlPXtkYXRhOidbZGF0YS13aWRnZXQ9XCJ0b2RvLWxpc3RcIl0nfSxmPXtkb25lOlwiZG9uZVwifSxnPWZ1bmN0aW9uKGEsYil7dGhpcy5lbGVtZW50PWEsdGhpcy5vcHRpb25zPWIsdGhpcy5fc2V0VXBMaXN0ZW5lcnMoKX07Zy5wcm90b3R5cGUudG9nZ2xlPWZ1bmN0aW9uKGEpe2lmKGEucGFyZW50cyhlLmxpKS5maXJzdCgpLnRvZ2dsZUNsYXNzKGYuZG9uZSksIWEucHJvcChcImNoZWNrZWRcIikpcmV0dXJuIHZvaWQgdGhpcy51bkNoZWNrKGEpO3RoaXMuY2hlY2soYSl9LGcucHJvdG90eXBlLmNoZWNrPWZ1bmN0aW9uKGEpe3RoaXMub3B0aW9ucy5vbkNoZWNrLmNhbGwoYSl9LGcucHJvdG90eXBlLnVuQ2hlY2s9ZnVuY3Rpb24oYSl7dGhpcy5vcHRpb25zLm9uVW5DaGVjay5jYWxsKGEpfSxnLnByb3RvdHlwZS5fc2V0VXBMaXN0ZW5lcnM9ZnVuY3Rpb24oKXt2YXIgYj10aGlzO2EodGhpcy5lbGVtZW50KS5vbihcImNoYW5nZSBpZkNoYW5nZWRcIixcImlucHV0OmNoZWNrYm94XCIsZnVuY3Rpb24oKXtiLnRvZ2dsZShhKHRoaXMpKX0pfTt2YXIgaD1hLmZuLnRvZG9MaXN0O2EuZm4udG9kb0xpc3Q9YixhLmZuLnRvZG9MaXN0LkNvbnN0cnVjdG9yPWcsYS5mbi50b2RvTGlzdC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4udG9kb0xpc3Q9aCx0aGlzfSxhKHdpbmRvdykub24oXCJsb2FkXCIsZnVuY3Rpb24oKXthKGUuZGF0YSkuZWFjaChmdW5jdGlvbigpe2IuY2FsbChhKHRoaXMpKX0pfSl9KGpRdWVyeSksZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYihiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGQ9YSh0aGlzKSxlPWQuZGF0YShjKTtlfHxkLmRhdGEoYyxlPW5ldyBmKGQpKSxcInN0cmluZ1wiPT10eXBlb2YgYiYmZS50b2dnbGUoZCl9KX12YXIgYz1cImx0ZS5kaXJlY3RjaGF0XCIsZD17ZGF0YTonW2RhdGEtd2lkZ2V0PVwiY2hhdC1wYW5lLXRvZ2dsZVwiXScsYm94OlwiLmRpcmVjdC1jaGF0XCJ9LGU9e29wZW46XCJkaXJlY3QtY2hhdC1jb250YWN0cy1vcGVuXCJ9LGY9ZnVuY3Rpb24oYSl7dGhpcy5lbGVtZW50PWF9O2YucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbihhKXthLnBhcmVudHMoZC5ib3gpLmZpcnN0KCkudG9nZ2xlQ2xhc3MoZS5vcGVuKX07dmFyIGc9YS5mbi5kaXJlY3RDaGF0O2EuZm4uZGlyZWN0Q2hhdD1iLGEuZm4uZGlyZWN0Q2hhdC5Db25zdHJ1Y3Rvcj1mLGEuZm4uZGlyZWN0Q2hhdC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4uZGlyZWN0Q2hhdD1nLHRoaXN9LGEoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixkLmRhdGEsZnVuY3Rpb24oYyl7YyYmYy5wcmV2ZW50RGVmYXVsdCgpLGIuY2FsbChhKHRoaXMpLFwidG9nZ2xlXCIpfSl9KGpRdWVyeSk7IiwiLyoqXHJcbiogQGxpY2Vuc2UgSW5wdXQgTWFzayBwbHVnaW4gZm9yIGpxdWVyeVxyXG4qIGh0dHA6Ly9naXRodWIuY29tL1JvYmluSGVyYm90cy9qcXVlcnkuaW5wdXRtYXNrXHJcbiogQ29weXJpZ2h0IChjKSAyMDEwIC0gMjAxNCBSb2JpbiBIZXJib3RzXHJcbiogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIChodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocClcclxuKiBWZXJzaW9uOiAwLjAuMFxyXG4qL1xyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIGlmICgkLmZuLmlucHV0bWFzayA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy9oZWxwZXIgZnVuY3Rpb25zICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGlzSW5wdXRFdmVudFN1cHBvcnRlZChldmVudE5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSxcclxuICAgICAgICAgICAgZXZlbnROYW1lID0gJ29uJyArIGV2ZW50TmFtZSxcclxuICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSAoZXZlbnROYW1lIGluIGVsKTtcclxuICAgICAgICAgICAgaWYgKCFpc1N1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGV2ZW50TmFtZSwgJ3JldHVybjsnKTtcclxuICAgICAgICAgICAgICAgIGlzU3VwcG9ydGVkID0gdHlwZW9mIGVsW2V2ZW50TmFtZV0gPT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBpc1N1cHBvcnRlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZUFsaWFzKGFsaWFzU3RyLCBvcHRpb25zLCBvcHRzKSB7XHJcbiAgICAgICAgICAgIHZhciBhbGlhc0RlZmluaXRpb24gPSBvcHRzLmFsaWFzZXNbYWxpYXNTdHJdO1xyXG4gICAgICAgICAgICBpZiAoYWxpYXNEZWZpbml0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxpYXNEZWZpbml0aW9uLmFsaWFzKSByZXNvbHZlQWxpYXMoYWxpYXNEZWZpbml0aW9uLmFsaWFzLCB1bmRlZmluZWQsIG9wdHMpOyAvL2FsaWFzIGlzIGFub3RoZXIgYWxpYXNcclxuICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIG9wdHMsIGFsaWFzRGVmaW5pdGlvbik7ICAvL21lcmdlIGFsaWFzIGRlZmluaXRpb24gaW4gdGhlIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIG9wdHMsIG9wdGlvbnMpOyAgLy9yZWFwcGx5IGV4dHJhIGdpdmVuIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVNYXNrU2V0cyhvcHRzKSB7XHJcbiAgICAgICAgICAgIHZhciBtcyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgZ2VubWFza3MgPSBbXTsgLy91c2VkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIG1hc2tzIHRoYXQgd2hlcmUgcHJvY2Vzc2VkLCB0byBhdm9pZCBkdXBsaWNhdGVzXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1hc2tUZW1wbGF0ZShtYXNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5udW1lcmljSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrID0gbWFzay5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGVzY2FwZWQgPSBmYWxzZSwgb3V0Q291bnQgPSAwLCBncmVlZHkgPSBvcHRzLmdyZWVkeSwgcmVwZWF0ID0gb3B0cy5yZXBlYXQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVwZWF0ID09IFwiKlwiKSBncmVlZHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vaWYgKGdyZWVkeSA9PSB0cnVlICYmIG9wdHMucGxhY2Vob2xkZXIgPT0gXCJcIikgb3B0cy5wbGFjZWhvbGRlciA9IFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hc2subGVuZ3RoID09IDEgJiYgZ3JlZWR5ID09IGZhbHNlICYmIHJlcGVhdCAhPSAwKSB7IG9wdHMucGxhY2Vob2xkZXIgPSBcIlwiOyB9IC8vaGlkZSBwbGFjZWhvbGRlciB3aXRoIHNpbmdsZSBub24tZ3JlZWR5IG1hc2tcclxuICAgICAgICAgICAgICAgIHZhciBzaW5nbGVNYXNrID0gJC5tYXAobWFzay5zcGxpdChcIlwiKSwgZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG91dEVsZW0gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCA9PSBvcHRzLmVzY2FwZUNoYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChlbGVtZW50ICE9IG9wdHMub3B0aW9uYWxtYXJrZXIuc3RhcnQgJiYgZWxlbWVudCAhPSBvcHRzLm9wdGlvbmFsbWFya2VyLmVuZCkgfHwgZXNjYXBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFza2RlZiA9IG9wdHMuZGVmaW5pdGlvbnNbZWxlbWVudF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXNrZGVmICYmICFlc2NhcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1hc2tkZWYuY2FyZGluYWxpdHk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dEVsZW0ucHVzaChvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdCgob3V0Q291bnQgKyBpKSAlIG9wdHMucGxhY2Vob2xkZXIubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRFbGVtLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0Q291bnQgKz0gb3V0RWxlbS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRFbGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYWxsb2NhdGUgcmVwZXRpdGlvbnNcclxuICAgICAgICAgICAgICAgIHZhciByZXBlYXRlZE1hc2sgPSBzaW5nbGVNYXNrLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHJlcGVhdCAmJiBncmVlZHk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcGVhdGVkTWFzayA9IHJlcGVhdGVkTWFzay5jb25jYXQoc2luZ2xlTWFzay5zbGljZSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBcIm1hc2tcIjogcmVwZWF0ZWRNYXNrLCBcInJlcGVhdFwiOiByZXBlYXQsIFwiZ3JlZWR5XCI6IGdyZWVkeSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdGVzdCBkZWZpbml0aW9uID0+IHtmbjogUmVnRXhwL2Z1bmN0aW9uLCBjYXJkaW5hbGl0eTogaW50LCBvcHRpb25hbGl0eTogYm9vbCwgbmV3QmxvY2tNYXJrZXI6IGJvb2wsIG9mZnNldDogaW50LCBjYXNpbmc6IG51bGwvdXBwZXIvbG93ZXIsIGRlZjogZGVmaW5pdGlvblN5bWJvbH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VGVzdGluZ0NoYWluKG1hc2spIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRzLm51bWVyaWNJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2sgPSBtYXNrLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNPcHRpb25hbCA9IGZhbHNlLCBlc2NhcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3QmxvY2tNYXJrZXIgPSBmYWxzZTsgLy9pbmRpY2F0ZXMgd2hldGVyIHRoZSBiZWdpbi9lbmRpbmcgb2YgYSBibG9jayBzaG91bGQgYmUgaW5kaWNhdGVkXHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQubWFwKG1hc2suc3BsaXQoXCJcIiksIGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvdXRFbGVtID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09IG9wdHMuZXNjYXBlQ2hhcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgPT0gb3B0cy5vcHRpb25hbG1hcmtlci5zdGFydCAmJiAhZXNjYXBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc09wdGlvbmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChlbGVtZW50ID09IG9wdHMub3B0aW9uYWxtYXJrZXIuZW5kICYmICFlc2NhcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3B0aW9uYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2tkZWYgPSBvcHRzLmRlZmluaXRpb25zW2VsZW1lbnRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFza2RlZiAmJiAhZXNjYXBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZhbGlkYXRvcnMgPSBtYXNrZGVmW1wicHJldmFsaWRhdG9yXCJdLCBwcmV2YWxpZGF0b3JzTCA9IHByZXZhbGlkYXRvcnMgPyBwcmV2YWxpZGF0b3JzLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG1hc2tkZWYuY2FyZGluYWxpdHk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2YWxpZGF0b3IgPSBwcmV2YWxpZGF0b3JzTCA+PSBpID8gcHJldmFsaWRhdG9yc1tpIC0gMV0gOiBbXSwgdmFsaWRhdG9yID0gcHJldmFsaWRhdG9yW1widmFsaWRhdG9yXCJdLCBjYXJkaW5hbGl0eSA9IHByZXZhbGlkYXRvcltcImNhcmRpbmFsaXR5XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dEVsZW0ucHVzaCh7IGZuOiB2YWxpZGF0b3IgPyB0eXBlb2YgdmFsaWRhdG9yID09ICdzdHJpbmcnID8gbmV3IFJlZ0V4cCh2YWxpZGF0b3IpIDogbmV3IGZ1bmN0aW9uICgpIHsgdGhpcy50ZXN0ID0gdmFsaWRhdG9yOyB9IDogbmV3IFJlZ0V4cChcIi5cIiksIGNhcmRpbmFsaXR5OiBjYXJkaW5hbGl0eSA/IGNhcmRpbmFsaXR5IDogMSwgb3B0aW9uYWxpdHk6IGlzT3B0aW9uYWwsIG5ld0Jsb2NrTWFya2VyOiBpc09wdGlvbmFsID09IHRydWUgPyBuZXdCbG9ja01hcmtlciA6IGZhbHNlLCBvZmZzZXQ6IDAsIGNhc2luZzogbWFza2RlZltcImNhc2luZ1wiXSwgZGVmOiBtYXNrZGVmW1wiZGVmaW5pdGlvblN5bWJvbFwiXSB8fCBlbGVtZW50IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsID09IHRydWUpIC8vcmVzZXQgbmV3QmxvY2tNYXJrZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3QmxvY2tNYXJrZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dEVsZW0ucHVzaCh7IGZuOiBtYXNrZGVmLnZhbGlkYXRvciA/IHR5cGVvZiBtYXNrZGVmLnZhbGlkYXRvciA9PSAnc3RyaW5nJyA/IG5ldyBSZWdFeHAobWFza2RlZi52YWxpZGF0b3IpIDogbmV3IGZ1bmN0aW9uICgpIHsgdGhpcy50ZXN0ID0gbWFza2RlZi52YWxpZGF0b3I7IH0gOiBuZXcgUmVnRXhwKFwiLlwiKSwgY2FyZGluYWxpdHk6IG1hc2tkZWYuY2FyZGluYWxpdHksIG9wdGlvbmFsaXR5OiBpc09wdGlvbmFsLCBuZXdCbG9ja01hcmtlcjogbmV3QmxvY2tNYXJrZXIsIG9mZnNldDogMCwgY2FzaW5nOiBtYXNrZGVmW1wiY2FzaW5nXCJdLCBkZWY6IG1hc2tkZWZbXCJkZWZpbml0aW9uU3ltYm9sXCJdIHx8IGVsZW1lbnQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRFbGVtLnB1c2goeyBmbjogbnVsbCwgY2FyZGluYWxpdHk6IDAsIG9wdGlvbmFsaXR5OiBpc09wdGlvbmFsLCBuZXdCbG9ja01hcmtlcjogbmV3QmxvY2tNYXJrZXIsIG9mZnNldDogMCwgY2FzaW5nOiBudWxsLCBkZWY6IGVsZW1lbnQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlc2NhcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXNldCBuZXdCbG9ja01hcmtlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdCbG9ja01hcmtlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3V0RWxlbTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXJrT3B0aW9uYWwobWFza1BhcnQpIHsgLy9uZWVkZWQgZm9yIHRoZSBjbGVhck9wdGlvbmFsVGFpbCBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5vcHRpb25hbG1hcmtlci5zdGFydCArIG1hc2tQYXJ0ICsgb3B0cy5vcHRpb25hbG1hcmtlci5lbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gc3BsaXRGaXJzdE9wdGlvbmFsRW5kUGFydChtYXNrUGFydCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbmFsU3RhcnRNYXJrZXJzID0gMCwgb3B0aW9uYWxFbmRNYXJrZXJzID0gMCwgbXBsID0gbWFza1BhcnQubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtcGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXNrUGFydC5jaGFyQXQoaSkgPT0gb3B0cy5vcHRpb25hbG1hcmtlci5zdGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbFN0YXJ0TWFya2VycysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BhcnQuY2hhckF0KGkpID09IG9wdHMub3B0aW9uYWxtYXJrZXIuZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsRW5kTWFya2VycysrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uYWxTdGFydE1hcmtlcnMgPiAwICYmIG9wdGlvbmFsU3RhcnRNYXJrZXJzID09IG9wdGlvbmFsRW5kTWFya2VycylcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFza1BhcnRzID0gW21hc2tQYXJ0LnN1YnN0cmluZygwLCBpKV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IG1wbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tQYXJ0cy5wdXNoKG1hc2tQYXJ0LnN1YnN0cmluZyhpICsgMSwgbXBsKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFza1BhcnRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNwbGl0Rmlyc3RPcHRpb25hbFN0YXJ0UGFydChtYXNrUGFydCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1wbCA9IG1hc2tQYXJ0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BhcnQuY2hhckF0KGkpID09IG9wdHMub3B0aW9uYWxtYXJrZXIuc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIG1hc2tQYXJ0cyA9IFttYXNrUGFydC5zdWJzdHJpbmcoMCwgaSldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCBtcGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXNrUGFydHMucHVzaChtYXNrUGFydC5zdWJzdHJpbmcoaSArIDEsIG1wbCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tQYXJ0cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZU1hc2sobWFza1ByZWZpeCwgbWFza1BhcnQsIG1ldGFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFza1BhcnRzID0gc3BsaXRGaXJzdE9wdGlvbmFsRW5kUGFydChtYXNrUGFydCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3TWFzaywgbWFza1RlbXBsYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtYXNrcyA9IHNwbGl0Rmlyc3RPcHRpb25hbFN0YXJ0UGFydChtYXNrUGFydHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hc2tzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdNYXNrID0gbWFza1ByZWZpeCArIG1hc2tzWzBdICsgbWFya09wdGlvbmFsKG1hc2tzWzFdKSArIChtYXNrUGFydHMubGVuZ3RoID4gMSA/IG1hc2tQYXJ0c1sxXSA6IFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkobmV3TWFzaywgZ2VubWFza3MpID09IC0xICYmIG5ld01hc2sgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5tYXNrcy5wdXNoKG5ld01hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrVGVtcGxhdGUgPSBnZXRNYXNrVGVtcGxhdGUobmV3TWFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXNrXCI6IG5ld01hc2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9idWZmZXJcIjogbWFza1RlbXBsYXRlW1wibWFza1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYnVmZmVyXCI6IG1hc2tUZW1wbGF0ZVtcIm1hc2tcIl0uc2xpY2UoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGVzdHNcIjogZ2V0VGVzdGluZ0NoYWluKG5ld01hc2spLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXN0VmFsaWRQb3NpdGlvblwiOiAtMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ3JlZWR5XCI6IG1hc2tUZW1wbGF0ZVtcImdyZWVkeVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IG1hc2tUZW1wbGF0ZVtcInJlcGVhdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YWRhdGFcIjogbWV0YWRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld01hc2sgPSBtYXNrUHJlZml4ICsgbWFza3NbMF0gKyAobWFza1BhcnRzLmxlbmd0aCA+IDEgPyBtYXNrUGFydHNbMV0gOiBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KG5ld01hc2ssIGdlbm1hc2tzKSA9PSAtMSAmJiBuZXdNYXNrICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VubWFza3MucHVzaChuZXdNYXNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza1RlbXBsYXRlID0gZ2V0TWFza1RlbXBsYXRlKG5ld01hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWFza1wiOiBuZXdNYXNrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfYnVmZmVyXCI6IG1hc2tUZW1wbGF0ZVtcIm1hc2tcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJ1ZmZlclwiOiBtYXNrVGVtcGxhdGVbXCJtYXNrXCJdLnNsaWNlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRlc3RzXCI6IGdldFRlc3RpbmdDaGFpbihuZXdNYXNrKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGFzdFZhbGlkUG9zaXRpb25cIjogLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdyZWVkeVwiOiBtYXNrVGVtcGxhdGVbXCJncmVlZHlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJlcGVhdFwiOiBtYXNrVGVtcGxhdGVbXCJyZXBlYXRcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGFkYXRhXCI6IG1ldGFkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3BsaXRGaXJzdE9wdGlvbmFsU3RhcnRQYXJ0KG1hc2tzWzFdKS5sZW5ndGggPiAxKSB7IC8vb3B0aW9uYWwgY29udGFpbnMgYW5vdGhlciBvcHRpb25hbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZU1hc2sobWFza1ByZWZpeCArIG1hc2tzWzBdLCBtYXNrc1sxXSArIG1hc2tQYXJ0c1sxXSwgbWV0YWRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BhcnRzLmxlbmd0aCA+IDEgJiYgc3BsaXRGaXJzdE9wdGlvbmFsU3RhcnRQYXJ0KG1hc2tQYXJ0c1sxXSkubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZU1hc2sobWFza1ByZWZpeCArIG1hc2tzWzBdICsgbWFya09wdGlvbmFsKG1hc2tzWzFdKSwgbWFza1BhcnRzWzFdLCBtZXRhZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlTWFzayhtYXNrUHJlZml4ICsgbWFza3NbMF0sIG1hc2tQYXJ0c1sxXSwgbWV0YWRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld01hc2sgPSBtYXNrUHJlZml4ICsgbWFza1BhcnRzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkobmV3TWFzaywgZ2VubWFza3MpID09IC0xICYmIG5ld01hc2sgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5tYXNrcy5wdXNoKG5ld01hc2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrVGVtcGxhdGUgPSBnZXRNYXNrVGVtcGxhdGUobmV3TWFzayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtYXNrXCI6IG5ld01hc2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIl9idWZmZXJcIjogbWFza1RlbXBsYXRlW1wibWFza1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYnVmZmVyXCI6IG1hc2tUZW1wbGF0ZVtcIm1hc2tcIl0uc2xpY2UoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGVzdHNcIjogZ2V0VGVzdGluZ0NoYWluKG5ld01hc2spLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYXN0VmFsaWRQb3NpdGlvblwiOiAtMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ3JlZWR5XCI6IG1hc2tUZW1wbGF0ZVtcImdyZWVkeVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVwZWF0XCI6IG1hc2tUZW1wbGF0ZVtcInJlcGVhdFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWV0YWRhdGFcIjogbWV0YWRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihvcHRzLm1hc2spKSB7IC8vYWxsb3cgbWFzayB0byBiZSBhIHByZXByb2Nlc3NpbmcgZm4gLSBzaG91bGQgcmV0dXJuIGEgdmFsaWQgbWFza1xyXG4gICAgICAgICAgICAgICAgb3B0cy5tYXNrID0gb3B0cy5tYXNrLmNhbGwodGhpcywgb3B0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCQuaXNBcnJheShvcHRzLm1hc2spKSB7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2gob3B0cy5tYXNrLCBmdW5jdGlvbiAobmR4LCBtc2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobXNrW1wibWFza1wiXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVNYXNrKFwiXCIsIG1za1tcIm1hc2tcIl0udG9TdHJpbmcoKSwgbXNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVNYXNrKFwiXCIsIG1zay50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgZ2VuZXJhdGVNYXNrKFwiXCIsIG9wdHMubWFzay50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvcHRzLmdyZWVkeSA/IG1zIDogbXMuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYVtcIm1hc2tcIl0ubGVuZ3RoIC0gYltcIm1hc2tcIl0ubGVuZ3RoOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtc2llMTAgPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKG5ldyBSZWdFeHAoXCJtc2llIDEwXCIsIFwiaVwiKSkgIT09IG51bGwsXHJcbiAgICAgICAgICAgIGlwaG9uZSA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gobmV3IFJlZ0V4cChcImlwaG9uZVwiLCBcImlcIikpICE9PSBudWxsLFxyXG4gICAgICAgICAgICBhbmRyb2lkID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaChuZXcgUmVnRXhwKFwiYW5kcm9pZC4qc2FmYXJpLipcIiwgXCJpXCIpKSAhPT0gbnVsbCxcclxuICAgICAgICAgICAgYW5kcm9pZGNocm9tZSA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gobmV3IFJlZ0V4cChcImFuZHJvaWQuKmNocm9tZS4qXCIsIFwiaVwiKSkgIT09IG51bGwsXHJcbiAgICAgICAgICAgIHBhc3RlRXZlbnQgPSBpc0lucHV0RXZlbnRTdXBwb3J0ZWQoJ3Bhc3RlJykgPyAncGFzdGUnIDogaXNJbnB1dEV2ZW50U3VwcG9ydGVkKCdpbnB1dCcpID8gJ2lucHV0JyA6IFwicHJvcGVydHljaGFuZ2VcIjtcclxuXHJcblxyXG4gICAgICAgIC8vbWFza2luZyBzY29wZVxyXG4gICAgICAgIC8vYWN0aW9uT2JqIGRlZmluaXRpb24gc2VlIGJlbG93XHJcbiAgICAgICAgZnVuY3Rpb24gbWFza1Njb3BlKG1hc2tzZXRzLCBhY3RpdmVNYXNrc2V0SW5kZXgsIG9wdHMsIGFjdGlvbk9iaikge1xyXG4gICAgICAgICAgICB2YXIgaXNSVEwgPSBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlT25Gb2N1cyA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpLFxyXG4gICAgICAgICAgICAgICAgJGVsLCBjaHJvbWVWYWx1ZU9uSW5wdXQsXHJcbiAgICAgICAgICAgICAgICBza2lwS2V5UHJlc3NFdmVudCA9IGZhbHNlLCAvL1NhZmFyaSA1LjEueCAtIG1vZGFsIGRpYWxvZyBmaXJlcyBrZXlwcmVzcyB0d2ljZSB3b3JrYXJvdW5kXHJcbiAgICAgICAgICAgICAgICBza2lwSW5wdXRFdmVudCA9IGZhbHNlLCAvL3NraXAgd2hlbiB0cmlnZ2VyZWQgZnJvbSB3aXRoaW4gaW5wdXRtYXNrXHJcbiAgICAgICAgICAgICAgICBpZ25vcmFibGUgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL21hc2tzZXQgaGVscGVyZnVuY3Rpb25zXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRBY3RpdmVNYXNrU2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2ZVRlc3RzKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEFjdGl2ZU1hc2tTZXQoKVsndGVzdHMnXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QWN0aXZlTWFza1NldCgpWydfYnVmZmVyJ107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEFjdGl2ZUJ1ZmZlcigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRBY3RpdmVNYXNrU2V0KClbJ2J1ZmZlciddO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpc1ZhbGlkKHBvcywgYywgc3RyaWN0KSB7IC8vc3RyaWN0IHRydWUgfiBubyBjb3JyZWN0aW9uIG9yIGF1dG9maWxsXHJcbiAgICAgICAgICAgICAgICBzdHJpY3QgPSBzdHJpY3QgPT09IHRydWU7IC8vYWx3YXlzIHNldCBhIHZhbHVlIHRvIHN0cmljdCB0byBwcmV2ZW50IHBvc3NpYmxlIHN0cmFuZ2UgYmVoYXZpb3IgaW4gdGhlIGV4dGVuc2lvbnMgXHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gX2lzVmFsaWQocG9zaXRpb24sIGFjdGl2ZU1hc2tzZXQsIGMsIHN0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0UG9zID0gZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvc2l0aW9uKSwgbG9vcGVuZCA9IGMgPyAxIDogMCwgY2hycyA9ICcnLCBidWZmZXIgPSBhY3RpdmVNYXNrc2V0W1wiYnVmZmVyXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBhY3RpdmVNYXNrc2V0Wyd0ZXN0cyddW3Rlc3RQb3NdLmNhcmRpbmFsaXR5OyBpID4gbG9vcGVuZDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNocnMgKz0gZ2V0QnVmZmVyRWxlbWVudChidWZmZXIsIHRlc3RQb3MgLSAoaSAtIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNocnMgKz0gYztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGlzIGZhbHNlIG9yIGEganNvbiBvYmplY3QgPT4geyBwb3M6ID8/LCBjOiA/P30gb3IgdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmVNYXNrc2V0Wyd0ZXN0cyddW3Rlc3RQb3NdLmZuICE9IG51bGwgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0Wyd0ZXN0cyddW3Rlc3RQb3NdLmZuLnRlc3QoY2hycywgYnVmZmVyLCBwb3NpdGlvbiwgc3RyaWN0LCBvcHRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IChjID09IGdldEJ1ZmZlckVsZW1lbnQoYWN0aXZlTWFza3NldFsnX2J1ZmZlciddLCBwb3NpdGlvbiwgdHJ1ZSkgfHwgYyA9PSBvcHRzLnNraXBPcHRpb25hbFBhcnRDaGFyYWN0ZXIpID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgXCJyZWZyZXNoXCI6IHRydWUsIGM6IGdldEJ1ZmZlckVsZW1lbnQoYWN0aXZlTWFza3NldFsnX2J1ZmZlciddLCBwb3NpdGlvbiwgdHJ1ZSksIHBvczogcG9zaXRpb24gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBQb3N0UHJvY2Vzc1Jlc3VsdHMobWFza0ZvcndhcmRzLCByZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhc1ZhbGlkQWN0dWFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3VsdHMsIGZ1bmN0aW9uIChuZHgsIHJzbHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzVmFsaWRBY3R1YWwgPSAkLmluQXJyYXkocnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSwgbWFza0ZvcndhcmRzKSA9PSAtMSAmJiByc2x0W1wicmVzdWx0XCJdICE9PSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1ZhbGlkQWN0dWFsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1ZhbGlkQWN0dWFsKSB7IC8vc3RyaXAgbWFza2ZvcndhcmRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSAkLm1hcChyZXN1bHRzLCBmdW5jdGlvbiAocnNsdCwgbmR4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KHJzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl0sIG1hc2tGb3J3YXJkcykgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnNsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV1bXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IGFjdHVhbExWUDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy9rZWVwIG1hc2tmb3J3YXJkcyB3aXRoIHRoZSBsZWFzdCBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb3dlc3RQb3MgPSAtMSwgbG93ZXN0SW5kZXggPSAtMSwgcnNsdFZhbGlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gocmVzdWx0cywgZnVuY3Rpb24gKG5keCwgcnNsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShyc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdLCBtYXNrRm9yd2FyZHMpICE9IC0xICYmIHJzbHRbXCJyZXN1bHRcIl0gIT09IGZhbHNlICYgKGxvd2VzdFBvcyA9PSAtMSB8fCBsb3dlc3RQb3MgPiByc2x0W1wicmVzdWx0XCJdW1wicG9zXCJdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvd2VzdFBvcyA9IHJzbHRbXCJyZXN1bHRcIl1bXCJwb3NcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ZXN0SW5kZXggPSByc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9ICQubWFwKHJlc3VsdHMsIGZ1bmN0aW9uIChyc2x0LCBuZHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkocnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSwgbWFza0ZvcndhcmRzKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyc2x0W1wicmVzdWx0XCJdW1wicG9zXCJdID09IGxvd2VzdFBvcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnNsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJzbHRbXCJyZXN1bHRcIl0gIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBwb3M7IGkgPCBsb3dlc3RQb3M7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnNsdFZhbGlkID0gX2lzVmFsaWQoaSwgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV0sIG1hc2tzZXRzW2xvd2VzdEluZGV4XVtcImJ1ZmZlclwiXVtpXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNsdFZhbGlkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBsb3dlc3RQb3MgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wiYnVmZmVyXCJdLCBpLCBtYXNrc2V0c1tsb3dlc3RJbmRleF1bXCJidWZmZXJcIl1baV0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxzbyBjaGVjayBjaGVjayBmb3IgdGhlIGxvd2VzdHBvcyB3aXRoIHRoZSBuZXcgaW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnNsdFZhbGlkID0gX2lzVmFsaWQobG93ZXN0UG9zLCBtYXNrc2V0c1tyc2x0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdXSwgYywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyc2x0VmFsaWQgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dW1wiYnVmZmVyXCJdLCBsb3dlc3RQb3MsIGMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV1bXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IGxvd2VzdFBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwibmR4IFwiICsgcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSArIFwiIHZhbGlkYXRlIFwiICsgbWFza3NldHNbcnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXV1bXCJidWZmZXJcIl0uam9pbignJykgKyBcIiBsdiBcIiArIG1hc2tzZXRzW3JzbHRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl1dWydsYXN0VmFsaWRQb3NpdGlvbiddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJzbHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBfaXNWYWxpZChwb3MsIGdldEFjdGl2ZU1hc2tTZXQoKSwgYywgc3RyaWN0KTsgLy9vbmx5IGNoZWNrIHZhbGlkaXR5IGluIGN1cnJlbnQgbWFzayB3aGVuIHZhbGlkYXRpbmcgc3RyaWN0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7IFwicG9zXCI6IHBvcyB9OyAvL2Fsd2F5cyB0YWtlIGEgcG9zc2libGUgY29ycmVjdGVkIG1hc2twb3NpdGlvbiBpbnRvIGFjY291bnRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0cyA9IFtdLCByZXN1bHQgPSBmYWxzZSwgY3VycmVudEFjdGl2ZU1hc2tzZXRJbmRleCA9IGFjdGl2ZU1hc2tzZXRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBhY3R1YWxCdWZmZXIgPSBnZXRBY3RpdmVCdWZmZXIoKS5zbGljZSgpLCBhY3R1YWxMVlAgPSBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSxcclxuICAgICAgICAgICAgICAgICAgICBhY3R1YWxQcmV2aW91cyA9IHNlZWtQcmV2aW91cyhwb3MpLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tGb3J3YXJkcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUpID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFza1BvcyA9IHBvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGx2cCA9IGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJzbHRWYWxpZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGx2cCA9PSBhY3R1YWxMVlApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobWFza1BvcyAtIGFjdHVhbExWUCkgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGx2cCA9PSAtMSA/IDAgOiBsdnA7IGkgPCBtYXNrUG9zOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnNsdFZhbGlkID0gX2lzVmFsaWQoaSwgZ2V0QWN0aXZlTWFza1NldCgpLCBhY3R1YWxCdWZmZXJbaV0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNsdFZhbGlkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KGdldEFjdGl2ZUJ1ZmZlcigpLCBpLCBhY3R1YWxCdWZmZXJbaV0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJzbHRWYWxpZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJzbHRWYWxpZCA9IHsgXCJwb3NcIjogaSB9OyAvL2Fsd2F5cyB0YWtlIGEgcG9zc2libGUgY29ycmVjdGVkIG1hc2twb3NpdGlvbiBpbnRvIGFjY291bnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdWYWxpZFBvc2l0aW9uID0gcnNsdFZhbGlkLnBvcyB8fCBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSA8IG5ld1ZhbGlkUG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddID0gbmV3VmFsaWRQb3NpdGlvbjsgLy9zZXQgbmV3IHBvc2l0aW9uIGZyb20gaXNWYWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kb2VzIHRoZSBpbnB1dCBtYXRjaCBvbiBhIGZ1cnRoZXIgcG9zaXRpb24/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTWFzayhtYXNrUG9zKSAmJiAhX2lzVmFsaWQobWFza1BvcywgZ2V0QWN0aXZlTWFza1NldCgpLCBjLCBzdHJpY3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heEZvcndhcmQgPSBzZWVrTmV4dChtYXNrUG9zKSAtIG1hc2tQb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgZncgPSAwOyBmdyA8IG1heEZvcndhcmQ7IGZ3KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pc1ZhbGlkKCsrbWFza1BvcywgZ2V0QWN0aXZlTWFza1NldCgpLCBjLCBzdHJpY3QpICE9PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrRm9yd2FyZHMucHVzaChhY3RpdmVNYXNrc2V0SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ21hc2tmb3J3YXJkICcgKyBhY3RpdmVNYXNrc2V0SW5kZXggKyBcIiBwb3MgXCIgKyBwb3MgKyBcIiBtYXNrUG9zIFwiICsgbWFza1Bvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVNYXNrU2V0KClbJ2xhc3RWYWxpZFBvc2l0aW9uJ10gPj0gYWN0dWFsTFZQIHx8IGFjdGl2ZU1hc2tzZXRJbmRleCA9PSBjdXJyZW50QWN0aXZlTWFza3NldEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFza1BvcyA+PSAwICYmIG1hc2tQb3MgPCBnZXRNYXNrTGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfaXNWYWxpZChtYXNrUG9zLCBnZXRBY3RpdmVNYXNrU2V0KCksIGMsIHN0cmljdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geyBcInBvc1wiOiBtYXNrUG9zIH07IC8vYWx3YXlzIHRha2UgYSBwb3NzaWJsZSBjb3JyZWN0ZWQgbWFza3Bvc2l0aW9uIGludG8gYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdWYWxpZFBvc2l0aW9uID0gcmVzdWx0LnBvcyB8fCBtYXNrUG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddIDwgbmV3VmFsaWRQb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSA9IG5ld1ZhbGlkUG9zaXRpb247IC8vc2V0IG5ldyBwb3NpdGlvbiBmcm9tIGlzVmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBvcyBcIiArIHBvcyArIFwiIG5keCBcIiArIGFjdGl2ZU1hc2tzZXRJbmRleCArIFwiIHZhbGlkYXRlIFwiICsgZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJykgKyBcIiBsdiBcIiArIGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHsgXCJhY3RpdmVNYXNrc2V0SW5kZXhcIjogaW5kZXgsIFwicmVzdWx0XCI6IHJlc3VsdCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gY3VycmVudEFjdGl2ZU1hc2tzZXRJbmRleDsgLy9yZXNldCBhY3RpdmVNYXNrc2V0SW5kZXhcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9zdFByb2Nlc3NSZXN1bHRzKG1hc2tGb3J3YXJkcywgcmVzdWx0cyk7IC8vcmV0dXJuIHJlc3VsdHMgb2YgdGhlIG11bHRpcGxlIG1hc2sgdmFsaWRhdGlvbnNcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZGV0ZXJtaW5lQWN0aXZlTWFza3NldEluZGV4KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRNYXNrc2V0SW5kZXggPSBhY3RpdmVNYXNrc2V0SW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFZhbGlkID0geyBcImFjdGl2ZU1hc2tzZXRJbmRleFwiOiAwLCBcImxhc3RWYWxpZFBvc2l0aW9uXCI6IC0xLCBcIm5leHRcIjogLTEgfTtcclxuICAgICAgICAgICAgICAgICQuZWFjaChtYXNrc2V0cywgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddID4gaGlnaGVzdFZhbGlkWydsYXN0VmFsaWRQb3NpdGlvbiddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoZXN0VmFsaWRbXCJhY3RpdmVNYXNrc2V0SW5kZXhcIl0gPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RWYWxpZFtcImxhc3RWYWxpZFBvc2l0aW9uXCJdID0gZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFZhbGlkW1wibmV4dFwiXSA9IHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVsnbGFzdFZhbGlkUG9zaXRpb24nXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddID09IGhpZ2hlc3RWYWxpZFsnbGFzdFZhbGlkUG9zaXRpb24nXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGhpZ2hlc3RWYWxpZFsnbmV4dCddID09IC0xIHx8IGhpZ2hlc3RWYWxpZFsnbmV4dCddID4gc2Vla05leHQoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RWYWxpZFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaGVzdFZhbGlkW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSBnZXRBY3RpdmVNYXNrU2V0KClbJ2xhc3RWYWxpZFBvc2l0aW9uJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoZXN0VmFsaWRbXCJuZXh0XCJdID0gc2Vla05leHQoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGhpZ2hlc3RWYWxpZFtcImxhc3RWYWxpZFBvc2l0aW9uXCJdICE9IC0xICYmIG1hc2tzZXRzW2N1cnJlbnRNYXNrc2V0SW5kZXhdW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPT0gaGlnaGVzdFZhbGlkW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPyBjdXJyZW50TWFza3NldEluZGV4IDogaGlnaGVzdFZhbGlkW1wiYWN0aXZlTWFza3NldEluZGV4XCJdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRNYXNrc2V0SW5kZXggIT0gYWN0aXZlTWFza3NldEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJCdWZmZXIoZ2V0QWN0aXZlQnVmZmVyKCksIHNlZWtOZXh0KGhpZ2hlc3RWYWxpZFtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKSwgZ2V0TWFza0xlbmd0aCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJ3cml0ZU91dEJ1ZmZlclwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkZWwuZGF0YSgnX2lucHV0bWFzaycpWydhY3RpdmVNYXNrc2V0SW5kZXgnXSA9IGFjdGl2ZU1hc2tzZXRJbmRleDsgLy9zdG9yZSB0aGUgYWN0aXZlTWFza3NldEluZGV4XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzTWFzayhwb3MpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZXN0UG9zID0gZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IGdldEFjdGl2ZVRlc3RzKClbdGVzdFBvc107XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlc3QgIT0gdW5kZWZpbmVkID8gdGVzdC5mbiA6IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBkZXRlcm1pbmVUZXN0UG9zaXRpb24ocG9zKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zICUgZ2V0QWN0aXZlVGVzdHMoKS5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1hc2tMZW5ndGgoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5nZXRNYXNrTGVuZ3RoKGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCksIGdldEFjdGl2ZU1hc2tTZXQoKVsnZ3JlZWR5J10sIGdldEFjdGl2ZU1hc2tTZXQoKVsncmVwZWF0J10sIGdldEFjdGl2ZUJ1ZmZlcigpLCBvcHRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9wb3M6IGZyb20gcG9zaXRpb25cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlZWtOZXh0KHBvcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hc2tMID0gZ2V0TWFza0xlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvcyA+PSBtYXNrTCkgcmV0dXJuIG1hc2tMO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKCsrcG9zaXRpb24gPCBtYXNrTCAmJiAhaXNNYXNrKHBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3BvczogZnJvbSBwb3NpdGlvblxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2Vla1ByZXZpb3VzKHBvcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDw9IDApIHJldHVybiAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHdoaWxlICgtLXBvc2l0aW9uID4gMCAmJiAhaXNNYXNrKHBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgcG9zaXRpb24sIGVsZW1lbnQsIGF1dG9QcmVwYXJlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXV0b1ByZXBhcmUpIHBvc2l0aW9uID0gcHJlcGFyZUJ1ZmZlcihidWZmZXIsIHBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IGdldEFjdGl2ZVRlc3RzKClbZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvc2l0aW9uKV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbSAhPSB1bmRlZmluZWQgJiYgdGVzdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRlc3QuY2FzaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1cHBlclwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW1lbnQudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibG93ZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtZW50LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnVmZmVyW3Bvc2l0aW9uXSA9IGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBwb3NpdGlvbiwgYXV0b1ByZXBhcmUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhdXRvUHJlcGFyZSkgcG9zaXRpb24gPSBwcmVwYXJlQnVmZmVyKGJ1ZmZlciwgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcltwb3NpdGlvbl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vbmVlZGVkIHRvIGhhbmRsZSB0aGUgbm9uLWdyZWVkeSBtYXNrIHJlcGV0aXRpb25zXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwcmVwYXJlQnVmZmVyKGJ1ZmZlciwgcG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBqO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGJ1ZmZlcltwb3NpdGlvbl0gPT0gdW5kZWZpbmVkICYmIGJ1ZmZlci5sZW5ndGggPCBnZXRNYXNrTGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKVtqXSAhPT0gdW5kZWZpbmVkKSB7IC8vYWRkIGEgbmV3IGJ1ZmZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIucHVzaChnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpW2orK10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHdyaXRlQnVmZmVyKGlucHV0LCBidWZmZXIsIGNhcmV0UG9zKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVTZXQoYnVmZmVyLmpvaW4oJycpKTtcclxuICAgICAgICAgICAgICAgIGlmIChjYXJldFBvcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgY2FyZXRQb3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGVhckJ1ZmZlcihidWZmZXIsIHN0YXJ0LCBlbmQsIHN0cmlwTm9tYXNrcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0LCBtYXNrTCA9IGdldE1hc2tMZW5ndGgoKSA7IGkgPCBlbmQgJiYgaSA8IG1hc2tMOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaXBOb21hc2tzID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNNYXNrKGkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIGksIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgaSwgZ2V0QnVmZmVyRWxlbWVudChnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLnNsaWNlKCksIGksIHRydWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0UmVUYXJnZXRQbGFjZUhvbGRlcihidWZmZXIsIHBvcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlc3RQb3MgPSBkZXRlcm1pbmVUZXN0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIHNldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBwb3MsIGdldEJ1ZmZlckVsZW1lbnQoZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKSwgdGVzdFBvcykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRQbGFjZUhvbGRlcihwb3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLnBsYWNlaG9sZGVyLmNoYXJBdChwb3MgJSBvcHRzLnBsYWNlaG9sZGVyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrVmFsKGlucHV0LCB3cml0ZU91dCwgc3RyaWN0LCBucHR2bCwgaW50ZWxsaUNoZWNrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRWYWx1ZSA9IG5wdHZsICE9IHVuZGVmaW5lZCA/IG5wdHZsLnNsaWNlKCkgOiB0cnVuY2F0ZUlucHV0KGlucHV0Ll92YWx1ZUdldCgpKS5zcGxpdCgnJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKG1zKSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wiYnVmZmVyXCJdID0gbXNbXCJfYnVmZmVyXCJdLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXNbXCJwXCJdID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyaWN0ICE9PSB0cnVlKSBhY3RpdmVNYXNrc2V0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdyaXRlT3V0KSBpbnB1dC5fdmFsdWVTZXQoXCJcIik7IC8vaW5pdGlhbCBjbGVhclxyXG4gICAgICAgICAgICAgICAgdmFyIG1sID0gZ2V0TWFza0xlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKGlucHV0VmFsdWUsIGZ1bmN0aW9uIChuZHgsIGNoYXJDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludGVsbGlDaGVjayA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcCA9IGdldEFjdGl2ZU1hc2tTZXQoKVtcInBcIl0sIGx2cCA9IHAgPT0gLTEgPyBwIDogc2Vla1ByZXZpb3VzKHApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gbHZwID09IC0xID8gbmR4IDogc2Vla05leHQobHZwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShjaGFyQ29kZSwgZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5zbGljZShsdnAgKyAxLCBwb3MpKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cHJlc3NFdmVudC5jYWxsKGlucHV0LCB1bmRlZmluZWQsIHRydWUsIGNoYXJDb2RlLmNoYXJDb2RlQXQoMCksIHdyaXRlT3V0LCBzdHJpY3QsIG5keCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlwcmVzc0V2ZW50LmNhbGwoaW5wdXQsIHVuZGVmaW5lZCwgdHJ1ZSwgY2hhckNvZGUuY2hhckNvZGVBdCgwKSwgd3JpdGVPdXQsIHN0cmljdCwgbmR4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3RyaWN0ID09PSB0cnVlICYmIGdldEFjdGl2ZU1hc2tTZXQoKVtcInBcIl0gIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IHNlZWtQcmV2aW91cyhnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZXNjYXBlUmVnZXgoc3RyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5pbnB1dG1hc2suZXNjYXBlUmVnZXguY2FsbCh0aGlzLCBzdHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0cnVuY2F0ZUlucHV0KGlucHV0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dFZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChcIihcIiArIGVzY2FwZVJlZ2V4KGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuam9pbignJykpICsgXCIpKiRcIiksIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGVhck9wdGlvbmFsVGFpbChpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpLCB0bXBCdWZmZXIgPSBidWZmZXIuc2xpY2UoKSwgdGVzdFBvcywgcG9zO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcG9zID0gdG1wQnVmZmVyLmxlbmd0aCAtIDE7IHBvcyA+PSAwOyBwb3MtLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0UG9zID0gZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZVRlc3RzKClbdGVzdFBvc10ub3B0aW9uYWxpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc01hc2socG9zKSB8fCAhaXNWYWxpZChwb3MsIGJ1ZmZlcltwb3NdLCB0cnVlKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcEJ1ZmZlci5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcihpbnB1dCwgdG1wQnVmZmVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdW5tYXNrZWR2YWx1ZSgkaW5wdXQsIHNraXBEYXRlcGlja2VyQ2hlY2spIHtcclxuICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVUZXN0cygpICYmIChza2lwRGF0ZXBpY2tlckNoZWNrID09PSB0cnVlIHx8ICEkaW5wdXQuaGFzQ2xhc3MoJ2hhc0RhdGVwaWNrZXInKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NoZWNrVmFsKGlucHV0LCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVtVmFsdWUgPSAkLm1hcChnZXRBY3RpdmVCdWZmZXIoKSwgZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc01hc2soaW5kZXgpICYmIGlzVmFsaWQoaW5kZXgsIGVsZW1lbnQsIHRydWUpID8gZWxlbWVudCA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVubWFza2VkVmFsdWUgPSAoaXNSVEwgPyB1bVZhbHVlLnJldmVyc2UoKSA6IHVtVmFsdWUpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzLm9uVW5NYXNrICE9IHVuZGVmaW5lZCA/IG9wdHMub25Vbk1hc2suY2FsbCh0aGlzLCBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSwgdW5tYXNrZWRWYWx1ZSkgOiB1bm1hc2tlZFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGlucHV0WzBdLl92YWx1ZUdldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBUcmFuc2xhdGVQb3NpdGlvbihwb3MpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1JUTCAmJiB0eXBlb2YgcG9zID09ICdudW1iZXInICYmICghb3B0cy5ncmVlZHkgfHwgb3B0cy5wbGFjZWhvbGRlciAhPSBcIlwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBiZmZyTGdodCA9IGdldEFjdGl2ZUJ1ZmZlcigpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBwb3MgPSBiZmZyTGdodCAtIHBvcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3M7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhcmV0KGlucHV0LCBiZWdpbiwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbnB0ID0gaW5wdXQuanF1ZXJ5ICYmIGlucHV0Lmxlbmd0aCA+IDAgPyBpbnB1dFswXSA6IGlucHV0LCByYW5nZTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYmVnaW4gPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBiZWdpbiA9IFRyYW5zbGF0ZVBvc2l0aW9uKGJlZ2luKTtcclxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBUcmFuc2xhdGVQb3NpdGlvbihlbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghJChpbnB1dCkuaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbmQgPSAodHlwZW9mIGVuZCA9PSAnbnVtYmVyJykgPyBlbmQgOiBiZWdpbjtcclxuICAgICAgICAgICAgICAgICAgICBucHQuc2Nyb2xsTGVmdCA9IG5wdC5zY3JvbGxXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5pbnNlcnRNb2RlID09IGZhbHNlICYmIGJlZ2luID09IGVuZCkgZW5kKys7IC8vc2V0IHZpc3VhbGl6YXRpb24gZm9yIGluc2VydC9vdmVyd3JpdGUgbW9kZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChucHQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0LnNlbGVjdGlvblN0YXJ0ID0gYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5zZWxlY3Rpb25FbmQgPSBhbmRyb2lkID8gYmVnaW4gOiBlbmQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobnB0LmNyZWF0ZVRleHRSYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG5wdC5jcmVhdGVUZXh0UmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVFbmQoJ2NoYXJhY3RlcicsIGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgYmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZS5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghJChpbnB1dCkuaXMoJzp2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgXCJiZWdpblwiOiAwLCBcImVuZFwiOiAwIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChucHQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW4gPSBucHQuc2VsZWN0aW9uU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IG5wdC5zZWxlY3Rpb25FbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luID0gMCAtIHJhbmdlLmR1cGxpY2F0ZSgpLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLTEwMDAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IGJlZ2luICsgcmFuZ2UudGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJlZ2luID0gVHJhbnNsYXRlUG9zaXRpb24oYmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IFRyYW5zbGF0ZVBvc2l0aW9uKGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgXCJiZWdpblwiOiBiZWdpbiwgXCJlbmRcIjogZW5kIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzQ29tcGxldGUoYnVmZmVyKSB7IC8vcmV0dXJuIHRydWUgLyBmYWxzZSAvIHVuZGVmaW5lZCAocmVwZWF0ICopXHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5yZXBlYXQgPT0gXCIqXCIpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29tcGxldGUgPSBmYWxzZSwgaGlnaGVzdFZhbGlkUG9zaXRpb24gPSAwLCBjdXJyZW50QWN0aXZlTWFza3NldEluZGV4ID0gYWN0aXZlTWFza3NldEluZGV4O1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKG1zKSA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IG5keDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFtbCA9IHNlZWtQcmV2aW91cyhnZXRNYXNrTGVuZ3RoKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXNbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA+PSBoaWdoZXN0VmFsaWRQb3NpdGlvbiAmJiBtc1tcImxhc3RWYWxpZFBvc2l0aW9uXCJdID09IGFtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1zQ29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gYW1sOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWFzayA9IGlzTWFzayhpKSwgdGVzdFBvcyA9IGRldGVybWluZVRlc3RQb3NpdGlvbihpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG1hc2sgJiYgKGJ1ZmZlcltpXSA9PSB1bmRlZmluZWQgfHwgYnVmZmVyW2ldID09IGdldFBsYWNlSG9sZGVyKGkpKSkgfHwgKCFtYXNrICYmIGJ1ZmZlcltpXSAhPSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpW3Rlc3RQb3NdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc0NvbXBsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlID0gY29tcGxldGUgfHwgbXNDb21wbGV0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSkgLy9icmVhayBsb29wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZ2hlc3RWYWxpZFBvc2l0aW9uID0gbXNbXCJsYXN0VmFsaWRQb3NpdGlvblwiXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGN1cnJlbnRBY3RpdmVNYXNrc2V0SW5kZXg7IC8vcmVzZXQgYWN0aXZlTWFza3NldFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpc1NlbGVjdGlvbihiZWdpbiwgZW5kKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNSVEwgPyAoYmVnaW4gLSBlbmQpID4gMSB8fCAoKGJlZ2luIC0gZW5kKSA9PSAxICYmIG9wdHMuaW5zZXJ0TW9kZSkgOlxyXG4gICAgICAgICAgICAgICAgICAgIChlbmQgLSBiZWdpbikgPiAxIHx8ICgoZW5kIC0gYmVnaW4pID09IDEgJiYgb3B0cy5pbnNlcnRNb2RlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAgICAgICAgICAgZnVuY3Rpb24gaW5zdGFsbEV2ZW50UnVsZXIobnB0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRzID0gJC5fZGF0YShucHQpLmV2ZW50cztcclxuXHJcbiAgICAgICAgICAgICAgICAkLmVhY2goZXZlbnRzLCBmdW5jdGlvbiAoZXZlbnRUeXBlLCBldmVudEhhbmRsZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGV2ZW50SGFuZGxlcnMsIGZ1bmN0aW9uIChuZHgsIGV2ZW50SGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyLm5hbWVzcGFjZSA9PSBcImlucHV0bWFza1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyLnR5cGUgIT0gXCJzZXR2YWx1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSBldmVudEhhbmRsZXIuaGFuZGxlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXIuaGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWRPbmx5IHx8IHRoaXMuZGlzYWJsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwYXRjaFZhbHVlUHJvcGVydHkobnB0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVQcm9wZXJ0eTtcclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlUHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5wdCwgXCJ2YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZVByb3BlcnR5ICYmIHZhbHVlUHJvcGVydHkuZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFucHQuX3ZhbHVlR2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZUdldCA9IHZhbHVlUHJvcGVydHkuZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVTZXQgPSB2YWx1ZVByb3BlcnR5LnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0Ll92YWx1ZUdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1JUTCA/IHZhbHVlR2V0LmNhbGwodGhpcykuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKSA6IHZhbHVlR2V0LmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5fdmFsdWVTZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0LmNhbGwodGhpcywgaXNSVEwgPyB2YWx1ZS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5wdCwgXCJ2YWx1ZVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHNlbGYgPSAkKHRoaXMpLCBpbnB1dERhdGEgPSAkKHRoaXMpLmRhdGEoJ19pbnB1dG1hc2snKSwgbWFza3NldHMgPSBpbnB1dERhdGFbJ21hc2tzZXRzJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IGlucHV0RGF0YVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0RGF0YSAmJiBpbnB1dERhdGFbJ29wdHMnXS5hdXRvVW5tYXNrID8gJHNlbGYuaW5wdXRtYXNrKCd1bm1hc2tlZHZhbHVlJykgOiB2YWx1ZUdldC5jYWxsKHRoaXMpICE9IG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ19idWZmZXInXS5qb2luKCcnKSA/IHZhbHVlR2V0LmNhbGwodGhpcykgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlU2V0LmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ3NldHZhbHVlLmlucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18gJiYgbnB0Ll9fbG9va3VwR2V0dGVyX18oXCJ2YWx1ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbnB0Ll92YWx1ZUdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVHZXQgPSBucHQuX19sb29rdXBHZXR0ZXJfXyhcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVTZXQgPSBucHQuX19sb29rdXBTZXR0ZXJfXyhcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX3ZhbHVlR2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzUlRMID8gdmFsdWVHZXQuY2FsbCh0aGlzKS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpIDogdmFsdWVHZXQuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnB0Ll92YWx1ZVNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVTZXQuY2FsbCh0aGlzLCBpc1JUTCA/IHZhbHVlLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX19kZWZpbmVHZXR0ZXJfXyhcInZhbHVlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkc2VsZiA9ICQodGhpcyksIGlucHV0RGF0YSA9ICQodGhpcykuZGF0YSgnX2lucHV0bWFzaycpLCBtYXNrc2V0cyA9IGlucHV0RGF0YVsnbWFza3NldHMnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSBpbnB1dERhdGFbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0RGF0YSAmJiBpbnB1dERhdGFbJ29wdHMnXS5hdXRvVW5tYXNrID8gJHNlbGYuaW5wdXRtYXNrKCd1bm1hc2tlZHZhbHVlJykgOiB2YWx1ZUdldC5jYWxsKHRoaXMpICE9IG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ19idWZmZXInXS5qb2luKCcnKSA/IHZhbHVlR2V0LmNhbGwodGhpcykgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5wdC5fX2RlZmluZVNldHRlcl9fKFwidmFsdWVcIiwgZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVNldC5jYWxsKHRoaXMsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudHJpZ2dlckhhbmRsZXIoJ3NldHZhbHVlLmlucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbnB0Ll92YWx1ZUdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX3ZhbHVlR2V0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gaXNSVEwgPyB0aGlzLnZhbHVlLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiB0aGlzLnZhbHVlOyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBucHQuX3ZhbHVlU2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7IHRoaXMudmFsdWUgPSBpc1JUTCA/IHZhbHVlLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiB2YWx1ZTsgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQudmFsSG9va3MudGV4dCA9PSB1bmRlZmluZWQgfHwgJC52YWxIb29rcy50ZXh0LmlucHV0bWFza3BhdGNoICE9IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlR2V0ID0gJC52YWxIb29rcy50ZXh0ICYmICQudmFsSG9va3MudGV4dC5nZXQgPyAkLnZhbEhvb2tzLnRleHQuZ2V0IDogZnVuY3Rpb24gKGVsZW0pIHsgcmV0dXJuIGVsZW0udmFsdWU7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVNldCA9ICQudmFsSG9va3MudGV4dCAmJiAkLnZhbEhvb2tzLnRleHQuc2V0ID8gJC52YWxIb29rcy50ZXh0LnNldCA6IGZ1bmN0aW9uIChlbGVtLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkuZXh0ZW5kKCQudmFsSG9va3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZWxlbSA9ICQoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZWxlbS5kYXRhKCdfaW5wdXRtYXNrJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZWxlbS5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXS5hdXRvVW5tYXNrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkZWxlbS5pbnB1dG1hc2soJ3VubWFza2VkdmFsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWx1ZUdldChlbGVtKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXREYXRhID0gJGVsZW0uZGF0YSgnX2lucHV0bWFzaycpLCBtYXNrc2V0cyA9IGlucHV0RGF0YVsnbWFza3NldHMnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5wdXREYXRhWydhY3RpdmVNYXNrc2V0SW5kZXgnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICE9IG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ19idWZmZXInXS5qb2luKCcnKSA/IHJlc3VsdCA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuIHZhbHVlR2V0KGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoZWxlbSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRlbGVtID0gJChlbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZhbHVlU2V0KGVsZW0sIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGVtLmRhdGEoJ19pbnB1dG1hc2snKSkgJGVsZW0udHJpZ2dlckhhbmRsZXIoJ3NldHZhbHVlLmlucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRtYXNrcGF0Y2g6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3NoaWZ0IGNoYXJzIHRvIGxlZnQgZnJvbSBzdGFydCB0byBlbmQgYW5kIHB1dCBjIGF0IGVuZCBwb3NpdGlvbiBpZiBkZWZpbmVkXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzaGlmdEwoc3RhcnQsIGVuZCwgYywgbWFza0p1bXBzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gZ2V0QWN0aXZlQnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFza0p1bXBzICE9PSBmYWxzZSkgLy9qdW1waW5nIG92ZXIgbm9ubWFzayBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghaXNNYXNrKHN0YXJ0KSAmJiBzdGFydCAtIDEgPj0gMCkgc3RhcnQtLTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZCAmJiBpIDwgZ2V0TWFza0xlbmd0aCgpIDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTWFzayhpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZVRhcmdldFBsYWNlSG9sZGVyKGJ1ZmZlciwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqID0gc2Vla05leHQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwID0gZ2V0QnVmZmVyRWxlbWVudChidWZmZXIsIGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocCAhPSBnZXRQbGFjZUhvbGRlcihqKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPCBnZXRNYXNrTGVuZ3RoKCkgJiYgaXNWYWxpZChpLCBwLCB0cnVlKSAhPT0gZmFsc2UgJiYgZ2V0QWN0aXZlVGVzdHMoKVtkZXRlcm1pbmVUZXN0UG9zaXRpb24oaSldLmRlZiA9PSBnZXRBY3RpdmVUZXN0cygpW2RldGVybWluZVRlc3RQb3NpdGlvbihqKV0uZGVmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIGksIHAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNYXNrKGkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlVGFyZ2V0UGxhY2VIb2xkZXIoYnVmZmVyLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0QnVmZmVyRWxlbWVudChidWZmZXIsIHNlZWtQcmV2aW91cyhlbmQpLCBjKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpW1wiZ3JlZWR5XCJdID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYnVmZmVyID0gdHJ1bmNhdGVJbnB1dChidWZmZXIuam9pbignJykpLnNwbGl0KCcnKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gdHJidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBibCA9IGJ1ZmZlci5sZW5ndGg7IGkgPCBibDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltpXSA9IHRyYnVmZmVyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCA9PSAwKSBnZXRBY3RpdmVNYXNrU2V0KClbXCJidWZmZXJcIl0gPSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnQ7IC8vcmV0dXJuIHRoZSB1c2VkIHN0YXJ0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNoaWZ0UihzdGFydCwgZW5kLCBjKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gZ2V0QWN0aXZlQnVmZmVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QnVmZmVyRWxlbWVudChidWZmZXIsIHN0YXJ0LCB0cnVlKSAhPSBnZXRQbGFjZUhvbGRlcihzdGFydCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gc2Vla1ByZXZpb3VzKGVuZCkgOyBpID4gc3RhcnQgJiYgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTWFzayhpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGogPSBzZWVrUHJldmlvdXMoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IGdldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0ICE9IGdldFBsYWNlSG9sZGVyKGopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQoaiwgdCwgdHJ1ZSkgIT09IGZhbHNlICYmIGdldEFjdGl2ZVRlc3RzKClbZGV0ZXJtaW5lVGVzdFBvc2l0aW9uKGkpXS5kZWYgPT0gZ2V0QWN0aXZlVGVzdHMoKVtkZXRlcm1pbmVUZXN0UG9zaXRpb24oaildLmRlZikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgaSwgdCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlVGFyZ2V0UGxhY2VIb2xkZXIoYnVmZmVyLCBqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IC8vZWxzZSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZVRhcmdldFBsYWNlSG9sZGVyKGJ1ZmZlciwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGMgIT0gdW5kZWZpbmVkICYmIGdldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBzdGFydCkgPT0gZ2V0UGxhY2VIb2xkZXIoc3RhcnQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHNldEJ1ZmZlckVsZW1lbnQoYnVmZmVyLCBzdGFydCwgYyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoQmVmb3JlID0gYnVmZmVyLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVNYXNrU2V0KClbXCJncmVlZHlcIl0gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHJidWZmZXIgPSB0cnVuY2F0ZUlucHV0KGJ1ZmZlci5qb2luKCcnKSkuc3BsaXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlci5sZW5ndGggPSB0cmJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGJsID0gYnVmZmVyLmxlbmd0aDsgaSA8IGJsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyW2ldID0gdHJidWZmZXJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoID09IDApIGdldEFjdGl2ZU1hc2tTZXQoKVtcImJ1ZmZlclwiXSA9IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBlbmQgLSAobGVuZ3RoQmVmb3JlIC0gYnVmZmVyLmxlbmd0aCk7IC8vcmV0dXJuIG5ldyBzdGFydCBwb3NpdGlvblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBIYW5kbGVSZW1vdmUoaW5wdXQsIGssIHBvcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMubnVtZXJpY0lucHV0IHx8IGlzUlRMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSBvcHRzLmtleUNvZGUuREVMRVRFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2Ugb3B0cy5rZXlDb2RlLkRFTEVURTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSBvcHRzLmtleUNvZGUuQkFDS1NQQUNFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1JUTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZCA9IHBvcy5lbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA9IHBlbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpc1NlbGVjdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9zLmJlZ2luID09IHBvcy5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zQmVnaW4gPSBrID09IG9wdHMua2V5Q29kZS5CQUNLU1BBQ0UgPyBwb3MuYmVnaW4gLSAxIDogcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmlzTnVtZXJpYyAmJiBvcHRzLnJhZGl4UG9pbnQgIT0gXCJcIiAmJiBnZXRBY3RpdmVCdWZmZXIoKVtwb3NCZWdpbl0gPT0gb3B0cy5yYWRpeFBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA9IChnZXRBY3RpdmVCdWZmZXIoKS5sZW5ndGggLSAxID09IHBvc0JlZ2luKSAvKiByYWRpeFBvaW50IGlzIGxhdGVzdD8gZGVsZXRlIGl0ICovID8gcG9zLmJlZ2luIDogayA9PSBvcHRzLmtleUNvZGUuQkFDS1NQQUNFID8gcG9zQmVnaW4gOiBzZWVrTmV4dChwb3NCZWdpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPT0gb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luLS07XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuREVMRVRFKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MuZW5kKys7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBvcy5lbmQgLSBwb3MuYmVnaW4gPT0gMSAmJiAhb3B0cy5pbnNlcnRNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoayA9PSBvcHRzLmtleUNvZGUuQkFDS1NQQUNFKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MuYmVnaW4tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhckJ1ZmZlcihnZXRBY3RpdmVCdWZmZXIoKSwgcG9zLmJlZ2luLCBwb3MuZW5kKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbWwgPSBnZXRNYXNrTGVuZ3RoKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5ncmVlZHkgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaGlmdEwocG9zLmJlZ2luLCBtbCwgdW5kZWZpbmVkLCAhaXNSVEwgJiYgKGsgPT0gb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRSAmJiAhaXNTZWxlY3Rpb24pKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld3BvcyA9IHBvcy5iZWdpbjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gcG9zLmJlZ2luOyBpIDwgcG9zLmVuZDsgaSsrKSB7IC8vc2Vla25leHQgdG8gc2tpcCBwbGFjZWhvbGRlcnMgYXQgc3RhcnQgaW4gc2VsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc01hc2soaSkgfHwgIWlzU2VsZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3cG9zID0gc2hpZnRMKHBvcy5iZWdpbiwgbWwsIHVuZGVmaW5lZCwgIWlzUlRMICYmIChrID09IG9wdHMua2V5Q29kZS5CQUNLU1BBQ0UgJiYgIWlzU2VsZWN0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNTZWxlY3Rpb24pIHBvcy5iZWdpbiA9IG5ld3BvcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBmaXJzdE1hc2tQb3MgPSBzZWVrTmV4dCgtMSk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckJ1ZmZlcihnZXRBY3RpdmVCdWZmZXIoKSwgcG9zLmJlZ2luLCBwb3MuZW5kLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNoZWNrVmFsKGlucHV0LCBmYWxzZSwgbWFza3NldHNbMV0gPT0gdW5kZWZpbmVkIHx8IGZpcnN0TWFza1BvcyA+PSBwb3MuZW5kLCBnZXRBY3RpdmVCdWZmZXIoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydsYXN0VmFsaWRQb3NpdGlvbiddIDwgZmlyc3RNYXNrUG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdID0gZmlyc3RNYXNrUG9zO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdID0gcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBrZXlkb3duRXZlbnQoZSkge1xyXG4gICAgICAgICAgICAgICAgLy9TYWZhcmkgNS4xLnggLSBtb2RhbCBkaWFsb2cgZmlyZXMga2V5cHJlc3MgdHdpY2Ugd29ya2Fyb3VuZFxyXG4gICAgICAgICAgICAgICAgc2tpcEtleVByZXNzRXZlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMsICRpbnB1dCA9ICQoaW5wdXQpLCBrID0gZS5rZXlDb2RlLCBwb3MgPSBjYXJldChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9iYWNrc3BhY2UsIGRlbGV0ZSwgYW5kIGVzY2FwZSBnZXQgc3BlY2lhbCB0cmVhdG1lbnRcclxuICAgICAgICAgICAgICAgIGlmIChrID09IG9wdHMua2V5Q29kZS5CQUNLU1BBQ0UgfHwgayA9PSBvcHRzLmtleUNvZGUuREVMRVRFIHx8IChpcGhvbmUgJiYgayA9PSAxMjcpIHx8IGUuY3RybEtleSAmJiBrID09IDg4KSB7IC8vYmFja3NwYWNlL2RlbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy9zdG9wIGRlZmF1bHQgYWN0aW9uIGJ1dCBhbGxvdyBwcm9wYWdhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrID09IDg4KSB2YWx1ZU9uRm9jdXMgPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICBIYW5kbGVSZW1vdmUoaW5wdXQsIGssIHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV0ZXJtaW5lQWN0aXZlTWFza3NldEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGdldEFjdGl2ZUJ1ZmZlcigpLCBnZXRBY3RpdmVNYXNrU2V0KClbXCJwXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuX3ZhbHVlR2V0KCkgPT0gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5qb2luKCcnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoJ2NsZWFyZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1Rvb2x0aXApIHsgLy91cGRhdGUgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQucHJvcChcInRpdGxlXCIsIGdldEFjdGl2ZU1hc2tTZXQoKVtcIm1hc2tcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuRU5EIHx8IGsgPT0gb3B0cy5rZXlDb2RlLlBBR0VfRE9XTikgeyAvL3doZW4gRU5EIG9yIFBBR0VfRE9XTiBwcmVzc2VkIHNldCBwb3NpdGlvbiBhdCBsYXN0bWF0Y2hcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhcmV0UG9zID0gc2Vla05leHQoZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuaW5zZXJ0TW9kZSAmJiBjYXJldFBvcyA9PSBnZXRNYXNrTGVuZ3RoKCkgJiYgIWUuc2hpZnRLZXkpIGNhcmV0UG9zLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBlLnNoaWZ0S2V5ID8gcG9zLmJlZ2luIDogY2FyZXRQb3MsIGNhcmV0UG9zKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGsgPT0gb3B0cy5rZXlDb2RlLkhPTUUgJiYgIWUuc2hpZnRLZXkpIHx8IGsgPT0gb3B0cy5rZXlDb2RlLlBBR0VfVVApIHsgLy9Ib21lIG9yIHBhZ2VfdXBcclxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgMCwgZS5zaGlmdEtleSA/IHBvcy5iZWdpbiA6IDApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChrID09IG9wdHMua2V5Q29kZS5FU0NBUEUgfHwgKGsgPT0gOTAgJiYgZS5jdHJsS2V5KSkgeyAvL2VzY2FwZSAmJiB1bmRvXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWwoaW5wdXQsIHRydWUsIGZhbHNlLCB2YWx1ZU9uRm9jdXMuc3BsaXQoJycpKTtcclxuICAgICAgICAgICAgICAgICAgICAkaW5wdXQuY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuSU5TRVJUICYmICEoZS5zaGlmdEtleSB8fCBlLmN0cmxLZXkpKSB7IC8vaW5zZXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5pbnNlcnRNb2RlID0gIW9wdHMuaW5zZXJ0TW9kZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgIW9wdHMuaW5zZXJ0TW9kZSAmJiBwb3MuYmVnaW4gPT0gZ2V0TWFza0xlbmd0aCgpID8gcG9zLmJlZ2luIC0gMSA6IHBvcy5iZWdpbik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMuaW5zZXJ0TW9kZSA9PSBmYWxzZSAmJiAhZS5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrID09IG9wdHMua2V5Q29kZS5SSUdIVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IGNhcmV0KGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBjYXJldFBvcy5iZWdpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PSBvcHRzLmtleUNvZGUuTEVGVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYXJldFBvcyA9IGNhcmV0KGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBjYXJldFBvcy5iZWdpbiAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRDYXJldFBvcyA9IGNhcmV0KGlucHV0KTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRzLm9uS2V5RG93bi5jYWxsKHRoaXMsIGUsIGdldEFjdGl2ZUJ1ZmZlcigpLCBvcHRzKSA9PT0gdHJ1ZSkgLy9leHRyYSBzdHVmZiB0byBleGVjdXRlIG9uIGtleWRvd25cclxuICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgY3VycmVudENhcmV0UG9zLmJlZ2luLCBjdXJyZW50Q2FyZXRQb3MuZW5kKTtcclxuICAgICAgICAgICAgICAgIGlnbm9yYWJsZSA9ICQuaW5BcnJheShrLCBvcHRzLmlnbm9yYWJsZXMpICE9IC0xO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24ga2V5cHJlc3NFdmVudChlLCBjaGVja3ZhbCwgaywgd3JpdGVPdXQsIHN0cmljdCwgbmR4KSB7XHJcbiAgICAgICAgICAgICAgICAvL1NhZmFyaSA1LjEueCAtIG1vZGFsIGRpYWxvZyBmaXJlcyBrZXlwcmVzcyB0d2ljZSB3b3JrYXJvdW5kXHJcbiAgICAgICAgICAgICAgICBpZiAoayA9PSB1bmRlZmluZWQgJiYgc2tpcEtleVByZXNzRXZlbnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNraXBLZXlQcmVzc0V2ZW50ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLCAkaW5wdXQgPSAkKGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgayA9IGNoZWNrdmFsID8gayA6IChlLndoaWNoIHx8IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2t2YWwgIT09IHRydWUgJiYgKCEoZS5jdHJsS2V5ICYmIGUuYWx0S2V5KSAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSB8fCBpZ25vcmFibGUpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NwZWNpYWwgdHJlYXQgdGhlIGRlY2ltYWwgc2VwYXJhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja3ZhbCAhPT0gdHJ1ZSAmJiBrID09IDQ2ICYmIGUuc2hpZnRLZXkgPT0gZmFsc2UgJiYgb3B0cy5yYWRpeFBvaW50ID09IFwiLFwiKSBrID0gNDQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zLCByZXN1bHRzLCByZXN1bHQsIGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2t2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwY2FyZXQgPSBzdHJpY3QgPyBuZHggOiBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSB7IGJlZ2luOiBwY2FyZXQsIGVuZDogcGNhcmV0IH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBjYXJldChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2hvdWxkIHdlIGNsZWFyIGEgcG9zc2libGUgc2VsZWN0aW9uPz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzU2xjdG4gPSBpc1NlbGVjdGlvbihwb3MuYmVnaW4sIHBvcy5lbmQpLCByZWRldGVybWluZUxWUCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbEluZGV4ID0gYWN0aXZlTWFza3NldEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNTbGN0bikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5pdGlhbEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBsbW50KSB7IC8vaW5pdCB1bmRvYnVmZmVyIGZvciByZWNvdmVyeSB3aGVuIG5vdCB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKGxtbnQpID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gbmR4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJ1bmRvQnVmZmVyXCJdID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIYW5kbGVSZW1vdmUoaW5wdXQsIG9wdHMua2V5Q29kZS5ERUxFVEUsIHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuaW5zZXJ0TW9kZSkgeyAvL3ByZXNlcnZlIHNvbWUgc3BhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2gobWFza3NldHMsIGZ1bmN0aW9uIChuZHgsIGxtbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAobG1udCkgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gbmR4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnRSKHBvcy5iZWdpbiwgZ2V0TWFza0xlbmd0aCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdID0gc2Vla05leHQoZ2V0QWN0aXZlTWFza1NldCgpW1wibGFzdFZhbGlkUG9zaXRpb25cIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSBpbml0aWFsSW5kZXg7IC8vcmVzdG9yZSBpbmRleFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFkaXhQb3NpdGlvbiA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpLmluZGV4T2Yob3B0cy5yYWRpeFBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuaXNOdW1lcmljICYmIGNoZWNrdmFsICE9PSB0cnVlICYmIHJhZGl4UG9zaXRpb24gIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmdyZWVkeSAmJiBwb3MuYmVnaW4gPD0gcmFkaXhQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5iZWdpbiA9IHNlZWtQcmV2aW91cyhwb3MuYmVnaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcy5lbmQgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT0gb3B0cy5yYWRpeFBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luID0gcmFkaXhQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MuZW5kID0gcG9zLmJlZ2luO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBwb3MuYmVnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBpc1ZhbGlkKHAsIGMsIHN0cmljdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJpY3QgPT09IHRydWUpIHJlc3VsdHMgPSBbeyBcImFjdGl2ZU1hc2tzZXRJbmRleFwiOiBhY3RpdmVNYXNrc2V0SW5kZXgsIFwicmVzdWx0XCI6IHJlc3VsdHMgfV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtaW5pbWFsRm9yd2FyZFBvc2l0aW9uID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXN1bHRzLCBmdW5jdGlvbiAoaW5kZXgsIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gcmVzdWx0W1wiYWN0aXZlTWFza3NldEluZGV4XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wid3JpdGVPdXRCdWZmZXJcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5wID0gcmVzdWx0W1wicmVzdWx0XCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5wICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWZyZXNoID0gZmFsc2UsIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChucCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoID0gbnBbXCJyZWZyZXNoXCJdOyAvL29ubHkgcmV3cml0ZSBidWZmZXIgZnJvbSBpc1ZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBucC5wb3MgIT0gdW5kZWZpbmVkID8gbnAucG9zIDogcDsgLy9zZXQgbmV3IHBvc2l0aW9uIGZyb20gaXNWYWxpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gbnAuYyAhPSB1bmRlZmluZWQgPyBucC5jIDogYzsgLy9zZXQgbmV3IGNoYXIgZnJvbSBpc1ZhbGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWZyZXNoICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmluc2VydE1vZGUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RVbm1hc2tlZFBvc2l0aW9uID0gZ2V0TWFza0xlbmd0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJmckNsb25lID0gYnVmZmVyLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZ2V0QnVmZmVyRWxlbWVudChiZnJDbG9uZSwgbGFzdFVubWFza2VkUG9zaXRpb24sIHRydWUpICE9IGdldFBsYWNlSG9sZGVyKGxhc3RVbm1hc2tlZFBvc2l0aW9uKSAmJiBsYXN0VW5tYXNrZWRQb3NpdGlvbiA+PSBwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFVubWFza2VkUG9zaXRpb24gPSBsYXN0VW5tYXNrZWRQb3NpdGlvbiA9PSAwID8gLTEgOiBzZWVrUHJldmlvdXMobGFzdFVubWFza2VkUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RVbm1hc2tlZFBvc2l0aW9uID49IHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdFIocCwgZ2V0TWFza0xlbmd0aCgpLCBjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NoaWZ0IHRoZSBsdnAgaWYgbmVlZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGx2cCA9IGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdLCBubHZwID0gc2Vla05leHQobHZwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmx2cCAhPSBnZXRNYXNrTGVuZ3RoKCkgJiYgbHZwID49IHAgJiYgKGdldEJ1ZmZlckVsZW1lbnQoZ2V0QWN0aXZlQnVmZmVyKCksIG5sdnAsIHRydWUpICE9IGdldFBsYWNlSG9sZGVyKG5sdnApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSA9IG5sdnA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGdldEFjdGl2ZU1hc2tTZXQoKVtcIndyaXRlT3V0QnVmZmVyXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBzZXRCdWZmZXJFbGVtZW50KGJ1ZmZlciwgcCwgYywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaW5pbWFsRm9yd2FyZFBvc2l0aW9uID09IC0xIHx8IG1pbmltYWxGb3J3YXJkUG9zaXRpb24gPiBzZWVrTmV4dChwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW1hbEZvcndhcmRQb3NpdGlvbiA9IHNlZWtOZXh0KHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0UG9zID0gcCA8IGdldE1hc2tMZW5ndGgoKSA/IHAgKyAxIDogcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1pbmltYWxGb3J3YXJkUG9zaXRpb24gPT0gLTEgfHwgbWluaW1hbEZvcndhcmRQb3NpdGlvbiA+IG5leHRQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltYWxGb3J3YXJkUG9zaXRpb24gPSBuZXh0UG9zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtaW5pbWFsRm9yd2FyZFBvc2l0aW9uID4gZ2V0QWN0aXZlTWFza1NldCgpW1wicFwiXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpW1wicFwiXSA9IG1pbmltYWxGb3J3YXJkUG9zaXRpb247IC8vbmVlZGVkIGZvciBjaGVja3ZhbCBzdHJpY3QgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmljdCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gaW5pdGlhbEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0ZXJtaW5lQWN0aXZlTWFza3NldEluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdyaXRlT3V0ICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3VsdHMsIGZ1bmN0aW9uIChuZHgsIHJzbHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocnNsdFtcImFjdGl2ZU1hc2tzZXRJbmRleFwiXSA9PSBhY3RpdmVNYXNrc2V0SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcnNsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IG9wdHMub25LZXlWYWxpZGF0aW9uLmNhbGwoc2VsZiwgcmVzdWx0W1wicmVzdWx0XCJdLCBvcHRzKTsgfSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldEFjdGl2ZU1hc2tTZXQoKVtcIndyaXRlT3V0QnVmZmVyXCJdICYmIHJlc3VsdFtcInJlc3VsdFwiXSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0NhcmV0UG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja3ZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZXRQb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLm51bWVyaWNJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHAgPiByYWRpeFBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZXRQb3NpdGlvbiA9IHNlZWtQcmV2aW91cyhtaW5pbWFsRm9yd2FyZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PSBvcHRzLnJhZGl4UG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJldFBvc2l0aW9uID0gbWluaW1hbEZvcndhcmRQb3NpdGlvbiAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgbmV3Q2FyZXRQb3NpdGlvbiA9IHNlZWtQcmV2aW91cyhtaW5pbWFsRm9yd2FyZFBvc2l0aW9uIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJldFBvc2l0aW9uID0gbWluaW1hbEZvcndhcmRQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlciwgbmV3Q2FyZXRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja3ZhbCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IC8vdGltZW91dCBuZWVkZWQgZm9yIElFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGUoYnVmZmVyKSA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJjb21wbGV0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lwSW5wdXRFdmVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1NsY3RuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVtcImJ1ZmZlclwiXSA9IGdldEFjdGl2ZU1hc2tTZXQoKVtcInVuZG9CdWZmZXJcIl0uc3BsaXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1Rvb2x0aXApIHsgLy91cGRhdGUgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnByb3AoXCJ0aXRsZVwiLCBnZXRBY3RpdmVNYXNrU2V0KClbXCJtYXNrXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9uZWVkZWQgZm9yIElFOCBhbmQgYmVsb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQgPyBlLnByZXZlbnREZWZhdWx0KCkgOiBlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBrZXl1cEV2ZW50KGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLCBpbnB1dCA9IHRoaXMsIGsgPSBlLmtleUNvZGUsIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhbmRyb2lkY2hyb21lICYmIGsgPT0gb3B0cy5rZXlDb2RlLkJBQ0tTUEFDRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaHJvbWVWYWx1ZU9uSW5wdXQgPT0gaW5wdXQuX3ZhbHVlR2V0KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleWRvd25FdmVudC5jYWxsKHRoaXMsIGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG9wdHMub25LZXlVcC5jYWxsKHRoaXMsIGUsIGJ1ZmZlciwgb3B0cyk7IC8vZXh0cmEgc3R1ZmYgdG8gZXhlY3V0ZSBvbiBrZXl1cFxyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT0gb3B0cy5rZXlDb2RlLlRBQiAmJiBvcHRzLnNob3dNYXNrT25Gb2N1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkaW5wdXQuaGFzQ2xhc3MoJ2ZvY3VzLmlucHV0bWFzaycpICYmIGlucHV0Ll92YWx1ZUdldCgpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVPbkZvY3VzID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXIuam9pbignJykgPT0gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5qb2luKCcnKSAmJiAkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBidWZmZXIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXJldChpbnB1dCwgVHJhbnNsYXRlUG9zaXRpb24oMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIFRyYW5zbGF0ZVBvc2l0aW9uKDApLCBUcmFuc2xhdGVQb3NpdGlvbihnZXRNYXNrTGVuZ3RoKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlucHV0RXZlbnQoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNraXBJbnB1dEV2ZW50ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcElucHV0RXZlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMsICRpbnB1dCA9ICQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNocm9tZVZhbHVlT25JbnB1dCA9IGdldEFjdGl2ZUJ1ZmZlcigpLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tWYWwoaW5wdXQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QWN0aXZlQnVmZmVyKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGUoZ2V0QWN0aXZlQnVmZmVyKCkpID09PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICRpbnB1dC50cmlnZ2VyKFwiY29tcGxldGVcIik7XHJcbiAgICAgICAgICAgICAgICAkaW5wdXQuY2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbWFzayhlbCkge1xyXG4gICAgICAgICAgICAgICAgJGVsID0gJChlbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoJGVsLmlzKFwiOmlucHV0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zdG9yZSB0ZXN0cyAmIG9yaWdpbmFsIGJ1ZmZlciBpbiB0aGUgaW5wdXQgZWxlbWVudCAtIHVzZWQgdG8gZ2V0IHRoZSB1bm1hc2tlZCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICRlbC5kYXRhKCdfaW5wdXRtYXNrJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbWFza3NldHMnOiBtYXNrc2V0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FjdGl2ZU1hc2tzZXRJbmRleCc6IGFjdGl2ZU1hc2tzZXRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ29wdHMnOiBvcHRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnaXNSVEwnOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3Nob3cgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNob3dUb29sdGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5wcm9wKFwidGl0bGVcIiwgZ2V0QWN0aXZlTWFza1NldCgpW1wibWFza1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2NvcnJlY3QgZ3JlZWR5IHNldHRpbmcgaWYgbmVlZGVkXHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlTWFza1NldCgpWydncmVlZHknXSA9IGdldEFjdGl2ZU1hc2tTZXQoKVsnZ3JlZWR5J10gPyBnZXRBY3RpdmVNYXNrU2V0KClbJ2dyZWVkeSddIDogZ2V0QWN0aXZlTWFza1NldCgpWydyZXBlYXQnXSA9PSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2hhbmRsZSBtYXhsZW5ndGggYXR0cmlidXRlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbC5hdHRyKFwibWF4TGVuZ3RoXCIpICE9IG51bGwpIC8vb25seSB3aGVuIHRoZSBhdHRyaWJ1dGUgaXMgc2V0XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF4TGVuZ3RoID0gJGVsLnByb3AoJ21heExlbmd0aCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF4TGVuZ3RoID4gLTEpIHsgLy9oYW5kbGUgKi1yZXBlYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChtYXNrc2V0cywgZnVuY3Rpb24gKG5keCwgbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChtcykgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobXNbXCJyZXBlYXRcIl0gPT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wicmVwZWF0XCJdID0gbWF4TGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldE1hc2tMZW5ndGgoKSA+PSBtYXhMZW5ndGggJiYgbWF4TGVuZ3RoID4gLTEpIHsgLy9GRiBzZXRzIG5vIGRlZmluZWQgbWF4IGxlbmd0aCB0byAtMSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXhMZW5ndGggPCBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLmxlbmd0aCkgZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5sZW5ndGggPSBtYXhMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0QWN0aXZlTWFza1NldCgpWydncmVlZHknXSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZU1hc2tTZXQoKVsncmVwZWF0J10gPSBNYXRoLnJvdW5kKG1heExlbmd0aCAvIGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC5wcm9wKCdtYXhMZW5ndGgnLCBnZXRNYXNrTGVuZ3RoKCkgKiAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0Y2hWYWx1ZVByb3BlcnR5KGVsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMubnVtZXJpY0lucHV0KSBvcHRzLmlzTnVtZXJpYyA9IG9wdHMubnVtZXJpY0lucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5kaXIgPT0gXCJydGxcIiB8fCAob3B0cy5udW1lcmljSW5wdXQgJiYgb3B0cy5yaWdodEFsaWduTnVtZXJpY3MpIHx8IChvcHRzLmlzTnVtZXJpYyAmJiBvcHRzLnJpZ2h0QWxpZ25OdW1lcmljcykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5jc3MoXCJ0ZXh0LWFsaWduXCIsIFwicmlnaHRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5kaXIgPT0gXCJydGxcIiB8fCBvcHRzLm51bWVyaWNJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5kaXIgPSBcImx0clwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwucmVtb3ZlQXR0cihcImRpclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0RGF0YSA9ICRlbC5kYXRhKCdfaW5wdXRtYXNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0RGF0YVsnaXNSVEwnXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5kYXRhKCdfaW5wdXRtYXNrJywgaW5wdXREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSVEwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy91bmJpbmQgYWxsIGV2ZW50cyAtIHRvIG1ha2Ugc3VyZSB0aGF0IG5vIG90aGVyIG1hc2sgd2lsbCBpbnRlcmZlcmUgd2hlbiByZS1tYXNraW5nXHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLnVuYmluZChcIi5pbnB1dG1hc2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2JpbmQgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLmNsb3Nlc3QoJ2Zvcm0nKS5iaW5kKFwic3VibWl0XCIsIGZ1bmN0aW9uICgpIHsgLy90cmlnZ2VyIGNoYW5nZSBvbiBzdWJtaXQgaWYgYW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZU9uRm9jdXMgIT0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC5jaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQoJ3Jlc2V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRlbC50cmlnZ2VyKFwic2V0dmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICRlbC5iaW5kKFwibW91c2VlbnRlci5pbnB1dG1hc2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISRpbnB1dC5oYXNDbGFzcygnZm9jdXMuaW5wdXRtYXNrJykgJiYgb3B0cy5zaG93TWFza09uSG92ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5fdmFsdWVHZXQoKSAhPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnVmZmVyKGlucHV0LCBnZXRBY3RpdmVCdWZmZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKFwiYmx1ci5pbnB1dG1hc2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzLCBucHRWYWx1ZSA9IGlucHV0Ll92YWx1ZUdldCgpLCBidWZmZXIgPSBnZXRBY3RpdmVCdWZmZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnJlbW92ZUNsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlT25Gb2N1cyAhPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzICYmIG5wdFZhbHVlICE9ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobnB0VmFsdWUgPT0gZ2V0QWN0aXZlQnVmZmVyVGVtcGxhdGUoKS5qb2luKCcnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVTZXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IC8vY2xlYXJvdXQgb3B0aW9uYWwgdGFpbCBvZiB0aGUgbWFza1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyT3B0aW9uYWxUYWlsKGlucHV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb21wbGV0ZShidWZmZXIpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LnRyaWdnZXIoXCJpbmNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY2xlYXJJbmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKG1hc2tzZXRzLCBmdW5jdGlvbiAobmR4LCBtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChtcykgPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNbXCJidWZmZXJcIl0gPSBtc1tcIl9idWZmZXJcIl0uc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zW1wibGFzdFZhbGlkUG9zaXRpb25cIl0gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZU1hc2tzZXRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll92YWx1ZVNldCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoaW5wdXQsIGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZChcImZvY3VzLmlucHV0bWFza1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5wdXQgPSAkKHRoaXMpLCBpbnB1dCA9IHRoaXMsIG5wdFZhbHVlID0gaW5wdXQuX3ZhbHVlR2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLnNob3dNYXNrT25Gb2N1cyAmJiAhJGlucHV0Lmhhc0NsYXNzKCdmb2N1cy5pbnB1dG1hc2snKSAmJiAoIW9wdHMuc2hvd01hc2tPbkhvdmVyIHx8IChvcHRzLnNob3dNYXNrT25Ib3ZlciAmJiBucHRWYWx1ZSA9PSAnJykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQuX3ZhbHVlR2V0KCkgIT0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUJ1ZmZlcihpbnB1dCwgZ2V0QWN0aXZlQnVmZmVyKCksIHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmFkZENsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVPbkZvY3VzID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZChcIm1vdXNlbGVhdmUuaW5wdXRtYXNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbnB1dCA9ICQodGhpcyksIGlucHV0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuY2xlYXJNYXNrT25Mb3N0Rm9jdXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJGlucHV0Lmhhc0NsYXNzKCdmb2N1cy5pbnB1dG1hc2snKSAmJiBpbnB1dC5fdmFsdWVHZXQoKSAhPSAkaW5wdXQuYXR0cihcInBsYWNlaG9sZGVyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Ll92YWx1ZUdldCgpID09IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuam9pbignJykgfHwgaW5wdXQuX3ZhbHVlR2V0KCkgPT0gJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll92YWx1ZVNldCgnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IC8vY2xlYXJvdXQgb3B0aW9uYWwgdGFpbCBvZiB0aGUgbWFza1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhck9wdGlvbmFsVGFpbChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYmluZChcImNsaWNrLmlucHV0bWFza1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkQ2FyZXQgPSBjYXJldChpbnB1dCksIGJ1ZmZlciA9IGdldEFjdGl2ZUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2FyZXQuYmVnaW4gPT0gc2VsZWN0ZWRDYXJldC5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xpY2tQb3NpdGlvbiA9IGlzUlRMID8gVHJhbnNsYXRlUG9zaXRpb24oc2VsZWN0ZWRDYXJldC5iZWdpbikgOiBzZWxlY3RlZENhcmV0LmJlZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsdnAgPSBnZXRBY3RpdmVNYXNrU2V0KClbXCJsYXN0VmFsaWRQb3NpdGlvblwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRzLmlzTnVtZXJpYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UG9zaXRpb24gPSBvcHRzLnNraXBSYWRpeERhbmNlID09PSBmYWxzZSAmJiBvcHRzLnJhZGl4UG9pbnQgIT0gXCJcIiAmJiAkLmluQXJyYXkob3B0cy5yYWRpeFBvaW50LCBidWZmZXIpICE9IC0xID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcHRzLm51bWVyaWNJbnB1dCA/IHNlZWtOZXh0KCQuaW5BcnJheShvcHRzLnJhZGl4UG9pbnQsIGJ1ZmZlcikpIDogJC5pbkFycmF5KG9wdHMucmFkaXhQb2ludCwgYnVmZmVyKSkgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vla05leHQobHZwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UG9zaXRpb24gPSBzZWVrTmV4dChsdnApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tQb3NpdGlvbiA8IGxhc3RQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNYXNrKGNsaWNrUG9zaXRpb24pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIGNsaWNrUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGNhcmV0KGlucHV0LCBzZWVrTmV4dChjbGlja1Bvc2l0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcmV0KGlucHV0LCBsYXN0UG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKCdkYmxjbGljay5pbnB1dG1hc2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoaW5wdXQsIDAsIHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQocGFzdGVFdmVudCArIFwiLmlucHV0bWFzayBkcmFnZHJvcC5pbnB1dG1hc2sgZHJvcC5pbnB1dG1hc2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNraXBJbnB1dEV2ZW50ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBza2lwSW5wdXRFdmVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcywgJGlucHV0ID0gJChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Bhc3RlIGV2ZW50IGZvciBJRTggYW5kIGxvd2VyIEkgZ3Vlc3MgOy0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gXCJwcm9wZXJ0eWNoYW5nZVwiICYmIGlucHV0Ll92YWx1ZUdldCgpLmxlbmd0aCA8PSBnZXRNYXNrTGVuZ3RoKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhc3RlVmFsdWUgPSBvcHRzLm9uQmVmb3JlUGFzdGUgIT0gdW5kZWZpbmVkID8gb3B0cy5vbkJlZm9yZVBhc3RlLmNhbGwodGhpcywgaW5wdXQuX3ZhbHVlR2V0KCkpIDogaW5wdXQuX3ZhbHVlR2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1ZhbChpbnB1dCwgdHJ1ZSwgZmFsc2UsIHBhc3RlVmFsdWUuc3BsaXQoJycpLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBsZXRlKGdldEFjdGl2ZUJ1ZmZlcigpKSA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudHJpZ2dlcihcImNvbXBsZXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGlucHV0LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQoJ3NldHZhbHVlLmlucHV0bWFzaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tWYWwoaW5wdXQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZU9uRm9jdXMgPSBnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Ll92YWx1ZUdldCgpID09IGdldEFjdGl2ZUJ1ZmZlclRlbXBsYXRlKCkuam9pbignJykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVTZXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQoJ2NvbXBsZXRlLmlucHV0bWFzaycsIG9wdHMub25jb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgICkuYmluZCgnaW5jb21wbGV0ZS5pbnB1dG1hc2snLCBvcHRzLm9uaW5jb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgICkuYmluZCgnY2xlYXJlZC5pbnB1dG1hc2snLCBvcHRzLm9uY2xlYXJlZFxyXG4gICAgICAgICAgICAgICAgICAgICkuYmluZChcImtleXVwLmlucHV0bWFza1wiLCBrZXl1cEV2ZW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZHJvaWRjaHJvbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmJpbmQoXCJpbnB1dC5pbnB1dG1hc2tcIiwgaW5wdXRFdmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmJpbmQoXCJrZXlkb3duLmlucHV0bWFza1wiLCBrZXlkb3duRXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKS5iaW5kKFwia2V5cHJlc3MuaW5wdXRtYXNrXCIsIGtleXByZXNzRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1zaWUxMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmJpbmQoXCJpbnB1dC5pbnB1dG1hc2tcIiwgaW5wdXRFdmVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vYXBwbHkgbWFza1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrVmFsKGVsLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVPbkZvY3VzID0gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV3JhcCBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluIGEgdHJ5L2NhdGNoIGJsb2NrIHNpbmNlIElFOSB0aHJvdyBcIlVuc3BlY2lmaWVkIGVycm9yXCIgaWYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpcyB1bmRlZmluZWQgd2hlbiB3ZSBhcmUgaW4gYW4gSUZyYW1lLlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQgPT09IGVsKSB7IC8vcG9zaXRpb24gdGhlIGNhcmV0IHdoZW4gaW4gZm9jdXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdmb2N1cy5pbnB1dG1hc2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZXQoZWwsIHNlZWtOZXh0KGdldEFjdGl2ZU1hc2tTZXQoKVtcImxhc3RWYWxpZFBvc2l0aW9uXCJdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcHRzLmNsZWFyTWFza09uTG9zdEZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXRBY3RpdmVCdWZmZXIoKS5qb2luKCcnKSA9PSBnZXRBY3RpdmVCdWZmZXJUZW1wbGF0ZSgpLmpvaW4oJycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5fdmFsdWVTZXQoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJPcHRpb25hbFRhaWwoZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCdWZmZXIoZWwsIGdldEFjdGl2ZUJ1ZmZlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbGxFdmVudFJ1bGVyKGVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9hY3Rpb24gb2JqZWN0XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25PYmogIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbk9ialtcImFjdGlvblwiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpc0NvbXBsZXRlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc0NvbXBsZXRlKGFjdGlvbk9ialtcImJ1ZmZlclwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVubWFza2VkdmFsdWVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSVEwgPSBhY3Rpb25PYmpbXCIkaW5wdXRcIl0uZGF0YSgnX2lucHV0bWFzaycpWydpc1JUTCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5tYXNrZWR2YWx1ZShhY3Rpb25PYmpbXCIkaW5wdXRcIl0sIGFjdGlvbk9ialtcInNraXBEYXRlcGlja2VyQ2hlY2tcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtYXNrXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2soYWN0aW9uT2JqW1wiZWxcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZm9ybWF0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbCA9ICQoe30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZWwuZGF0YSgnX2lucHV0bWFzaycsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtYXNrc2V0cyc6IG1hc2tzZXRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FjdGl2ZU1hc2tzZXRJbmRleCc6IGFjdGl2ZU1hc2tzZXRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcHRzJzogb3B0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpc1JUTCc6IG9wdHMubnVtZXJpY0lucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cy5udW1lcmljSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuaXNOdW1lcmljID0gb3B0cy5udW1lcmljSW5wdXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JUTCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVmFsKCRlbCwgZmFsc2UsIGZhbHNlLCBhY3Rpb25PYmpbXCJ2YWx1ZVwiXS5zcGxpdCgnJyksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0QWN0aXZlQnVmZmVyKCkuam9pbignJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgJC5pbnB1dG1hc2sgPSB7XHJcbiAgICAgICAgICAgIC8vb3B0aW9ucyBkZWZhdWx0XHJcbiAgICAgICAgICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogXCJfXCIsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25hbG1hcmtlcjogeyBzdGFydDogXCJbXCIsIGVuZDogXCJdXCIgfSxcclxuICAgICAgICAgICAgICAgIHF1YW50aWZpZXJtYXJrZXI6IHsgc3RhcnQ6IFwie1wiLCBlbmQ6IFwifVwiIH0sXHJcbiAgICAgICAgICAgICAgICBncm91cG1hcmtlcjogeyBzdGFydDogXCIoXCIsIGVuZDogXCIpXCIgfSxcclxuICAgICAgICAgICAgICAgIGVzY2FwZUNoYXI6IFwiXFxcXFwiLFxyXG4gICAgICAgICAgICAgICAgbWFzazogbnVsbCxcclxuICAgICAgICAgICAgICAgIG9uY29tcGxldGU6ICQubm9vcCwgLy9leGVjdXRlcyB3aGVuIHRoZSBtYXNrIGlzIGNvbXBsZXRlXHJcbiAgICAgICAgICAgICAgICBvbmluY29tcGxldGU6ICQubm9vcCwgLy9leGVjdXRlcyB3aGVuIHRoZSBtYXNrIGlzIGluY29tcGxldGUgYW5kIGZvY3VzIGlzIGxvc3RcclxuICAgICAgICAgICAgICAgIG9uY2xlYXJlZDogJC5ub29wLCAvL2V4ZWN1dGVzIHdoZW4gdGhlIG1hc2sgaXMgY2xlYXJlZFxyXG4gICAgICAgICAgICAgICAgcmVwZWF0OiAwLCAvL3JlcGV0aXRpb25zIG9mIHRoZSBtYXNrOiAqIH4gZm9yZXZlciwgb3RoZXJ3aXNlIHNwZWNpZnkgYW4gaW50ZWdlclxyXG4gICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlLCAvL3RydWU6IGFsbG9jYXRlZCBidWZmZXIgZm9yIHRoZSBtYXNrIGFuZCByZXBldGl0aW9ucyAtIGZhbHNlOiBhbGxvY2F0ZSBvbmx5IGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgYXV0b1VubWFzazogZmFsc2UsIC8vYXV0b21hdGljYWxseSB1bm1hc2sgd2hlbiByZXRyaWV2aW5nIHRoZSB2YWx1ZSB3aXRoICQuZm4udmFsIG9yIHZhbHVlIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIF9fbG9va3VwR2V0dGVyX18gb3IgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yXHJcbiAgICAgICAgICAgICAgICBjbGVhck1hc2tPbkxvc3RGb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGluc2VydE1vZGU6IHRydWUsIC8vaW5zZXJ0IHRoZSBpbnB1dCBvciBvdmVyd3JpdGUgdGhlIGlucHV0XHJcbiAgICAgICAgICAgICAgICBjbGVhckluY29tcGxldGU6IGZhbHNlLCAvL2NsZWFyIHRoZSBpbmNvbXBsZXRlIGlucHV0IG9uIGJsdXJcclxuICAgICAgICAgICAgICAgIGFsaWFzZXM6IHt9LCAvL2FsaWFzZXMgZGVmaW5pdGlvbnMgPT4gc2VlIGpxdWVyeS5pbnB1dG1hc2suZXh0ZW5zaW9ucy5qc1xyXG4gICAgICAgICAgICAgICAgb25LZXlVcDogJC5ub29wLCAvL292ZXJyaWRlIHRvIGltcGxlbWVudCBhdXRvY29tcGxldGUgb24gY2VydGFpbiBrZXlzIGZvciBleGFtcGxlXHJcbiAgICAgICAgICAgICAgICBvbktleURvd246ICQubm9vcCwgLy9vdmVycmlkZSB0byBpbXBsZW1lbnQgYXV0b2NvbXBsZXRlIG9uIGNlcnRhaW4ga2V5cyBmb3IgZXhhbXBsZVxyXG4gICAgICAgICAgICAgICAgb25CZWZvcmVQYXN0ZTogdW5kZWZpbmVkLCAvL2V4ZWN1dGVzIGJlZm9yZSBtYXNraW5nIHRoZSBwYXN0ZWQgdmFsdWUgdG8gYWxsb3cgcHJlcHJvY2Vzc2luZyBvZiB0aGUgcGFzdGVkIHZhbHVlLiAgYXJncyA9PiBwYXN0ZWRWYWx1ZSA9PiByZXR1cm4gcHJvY2Vzc2VkVmFsdWVcclxuICAgICAgICAgICAgICAgIG9uVW5NYXNrOiB1bmRlZmluZWQsIC8vZXhlY3V0ZXMgYWZ0ZXIgdW5tYXNraW5nIHRvIGFsbG93IHBvc3Rwcm9jZXNzaW5nIG9mIHRoZSB1bm1hc2tlZHZhbHVlLiAgYXJncyA9PiBtYXNrZWRWYWx1ZSwgdW5tYXNrZWRWYWx1ZVxyXG4gICAgICAgICAgICAgICAgc2hvd01hc2tPbkZvY3VzOiB0cnVlLCAvL3Nob3cgdGhlIG1hc2stcGxhY2Vob2xkZXIgd2hlbiB0aGUgaW5wdXQgaGFzIGZvY3VzXHJcbiAgICAgICAgICAgICAgICBzaG93TWFza09uSG92ZXI6IHRydWUsIC8vc2hvdyB0aGUgbWFzay1wbGFjZWhvbGRlciB3aGVuIGhvdmVyaW5nIHRoZSBlbXB0eSBpbnB1dFxyXG4gICAgICAgICAgICAgICAgb25LZXlWYWxpZGF0aW9uOiAkLm5vb3AsIC8vZXhlY3V0ZXMgb24gZXZlcnkga2V5LXByZXNzIHdpdGggdGhlIHJlc3VsdCBvZiBpc1ZhbGlkLiBQYXJhbXM6IHJlc3VsdCwgb3B0c1xyXG4gICAgICAgICAgICAgICAgc2tpcE9wdGlvbmFsUGFydENoYXJhY3RlcjogXCIgXCIsIC8vYSBjaGFyYWN0ZXIgd2hpY2ggY2FuIGJlIHVzZWQgdG8gc2tpcCBhbiBvcHRpb25hbCBwYXJ0IG9mIGEgbWFza1xyXG4gICAgICAgICAgICAgICAgc2hvd1Rvb2x0aXA6IGZhbHNlLCAvL3Nob3cgdGhlIGFjdGl2ZW1hc2sgYXMgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgbnVtZXJpY0lucHV0OiBmYWxzZSwgLy9udW1lcmljSW5wdXQgaW5wdXQgZGlyZWN0aW9uIHN0eWxlIChpbnB1dCBzaGlmdHMgdG8gdGhlIGxlZnQgd2hpbGUgaG9sZGluZyB0aGUgY2FyZXQgcG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAvL251bWVyaWMgYmFzaWMgcHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICAgaXNOdW1lcmljOiBmYWxzZSwgLy9lbmFibGUgbnVtZXJpYyBmZWF0dXJlc1xyXG4gICAgICAgICAgICAgICAgcmFkaXhQb2ludDogXCJcIiwgLy9cIi5cIiwgLy8gfCBcIixcIlxyXG4gICAgICAgICAgICAgICAgc2tpcFJhZGl4RGFuY2U6IGZhbHNlLCAvL2Rpc2FibGUgcmFkaXhwb2ludCBjYXJldCBwb3NpdGlvbmluZ1xyXG4gICAgICAgICAgICAgICAgcmlnaHRBbGlnbk51bWVyaWNzOiB0cnVlLCAvL2FsaWduIG51bWVyaWNzIHRvIHRoZSByaWdodFxyXG4gICAgICAgICAgICAgICAgLy9udW1lcmljIGJhc2ljIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJzknOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbMC05XVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJkaW5hbGl0eTogMVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgJ2EnOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcjogXCJbQS1aYS16XFx1MDQxMC1cXHUwNDRGXFx1MDQwMVxcdTA0NTFdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcmRpbmFsaXR5OiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAnKic6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yOiBcIltBLVphLXpcXHUwNDEwLVxcdTA0NEZcXHUwNDAxXFx1MDQ1MTAtOV1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdHk6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAga2V5Q29kZToge1xyXG4gICAgICAgICAgICAgICAgICAgIEFMVDogMTgsIEJBQ0tTUEFDRTogOCwgQ0FQU19MT0NLOiAyMCwgQ09NTUE6IDE4OCwgQ09NTUFORDogOTEsIENPTU1BTkRfTEVGVDogOTEsIENPTU1BTkRfUklHSFQ6IDkzLCBDT05UUk9MOiAxNywgREVMRVRFOiA0NiwgRE9XTjogNDAsIEVORDogMzUsIEVOVEVSOiAxMywgRVNDQVBFOiAyNywgSE9NRTogMzYsIElOU0VSVDogNDUsIExFRlQ6IDM3LCBNRU5VOiA5MywgTlVNUEFEX0FERDogMTA3LCBOVU1QQURfREVDSU1BTDogMTEwLCBOVU1QQURfRElWSURFOiAxMTEsIE5VTVBBRF9FTlRFUjogMTA4LFxyXG4gICAgICAgICAgICAgICAgICAgIE5VTVBBRF9NVUxUSVBMWTogMTA2LCBOVU1QQURfU1VCVFJBQ1Q6IDEwOSwgUEFHRV9ET1dOOiAzNCwgUEFHRV9VUDogMzMsIFBFUklPRDogMTkwLCBSSUdIVDogMzksIFNISUZUOiAxNiwgU1BBQ0U6IDMyLCBUQUI6IDksIFVQOiAzOCwgV0lORE9XUzogOTFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvL3NwZWNpZnkga2V5Y29kZXMgd2hpY2ggc2hvdWxkIG5vdCBiZSBjb25zaWRlcmVkIGluIHRoZSBrZXlwcmVzcyBldmVudCwgb3RoZXJ3aXNlIHRoZSBwcmV2ZW50RGVmYXVsdCB3aWxsIHN0b3AgdGhlaXIgZGVmYXVsdCBiZWhhdmlvciBlc3BlY2lhbGx5IGluIEZGXHJcbiAgICAgICAgICAgICAgICBpZ25vcmFibGVzOiBbOCwgOSwgMTMsIDE5LCAyNywgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLCA0NSwgNDYsIDkzLCAxMTIsIDExMywgMTE0LCAxMTUsIDExNiwgMTE3LCAxMTgsIDExOSwgMTIwLCAxMjEsIDEyMiwgMTIzXSxcclxuICAgICAgICAgICAgICAgIGdldE1hc2tMZW5ndGg6IGZ1bmN0aW9uIChidWZmZXIsIGdyZWVkeSwgcmVwZWF0LCBjdXJyZW50QnVmZmVyLCBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZWRMZW5ndGggPSBidWZmZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZ3JlZWR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXBlYXQgPT0gXCIqXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRMZW5ndGggPSBjdXJyZW50QnVmZmVyLmxlbmd0aCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVwZWF0ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlZExlbmd0aCArPSAoYnVmZmVyLmxlbmd0aCAqIChyZXBlYXQgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGN1bGF0ZWRMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVzY2FwZVJlZ2V4OiBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BlY2lhbHMgPSBbJy8nLCAnLicsICcqJywgJysnLCAnPycsICd8JywgJygnLCAnKScsICdbJywgJ10nLCAneycsICd9JywgJ1xcXFwnXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKCcoXFxcXCcgKyBzcGVjaWFscy5qb2luKCd8XFxcXCcpICsgJyknLCAnZ2ltJyksICdcXFxcJDEnKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvcHRzID0gJC5leHRlbmQodHJ1ZSwge30sICQuaW5wdXRtYXNrLmRlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmVBbGlhcyhvcHRzLmFsaWFzLCBvcHRpb25zLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXNrU2NvcGUoZ2VuZXJhdGVNYXNrU2V0cyhvcHRzKSwgMCwgb3B0cywgeyBcImFjdGlvblwiOiBcImZvcm1hdFwiLCBcInZhbHVlXCI6IHZhbHVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJC5mbi5pbnB1dG1hc2sgPSBmdW5jdGlvbiAoZm4sIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIG9wdHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5pbnB1dG1hc2suZGVmYXVsdHMsIG9wdGlvbnMpLFxyXG4gICAgICAgICAgICAgICAgbWFza3NldHMsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChmbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJtYXNrXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzb2x2ZSBwb3NzaWJsZSBhbGlhc2VzIGdpdmVuIGJ5IG9wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUFsaWFzKG9wdHMuYWxpYXMsIG9wdGlvbnMsIG9wdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IGdlbmVyYXRlTWFza1NldHMob3B0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXNrc2V0cy5sZW5ndGggPT0gMCkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrU2NvcGUoJC5leHRlbmQodHJ1ZSwge30sIG1hc2tzZXRzKSwgMCwgb3B0cywgeyBcImFjdGlvblwiOiBcIm1hc2tcIiwgXCJlbFwiOiB0aGlzIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidW5tYXNrZWR2YWx1ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHMgPSAkaW5wdXQuZGF0YSgnX2lucHV0bWFzaycpWydtYXNrc2V0cyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzID0gJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKVsnb3B0cyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tTY29wZShtYXNrc2V0cywgYWN0aXZlTWFza3NldEluZGV4LCBvcHRzLCB7IFwiYWN0aW9uXCI6IFwidW5tYXNrZWR2YWx1ZVwiLCBcIiRpbnB1dFwiOiAkaW5wdXQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gJGlucHV0LnZhbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZW1vdmVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGlucHV0ID0gJCh0aGlzKSwgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9ICRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJylbJ21hc2tzZXRzJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gJGlucHV0LmRhdGEoJ19pbnB1dG1hc2snKVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cyA9ICRpbnB1dC5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3dyaXRlb3V0IHRoZSB1bm1hc2tlZHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuX3ZhbHVlU2V0KG1hc2tTY29wZShtYXNrc2V0cywgYWN0aXZlTWFza3NldEluZGV4LCBvcHRzLCB7IFwiYWN0aW9uXCI6IFwidW5tYXNrZWR2YWx1ZVwiLCBcIiRpbnB1dFwiOiAkaW5wdXQsIFwic2tpcERhdGVwaWNrZXJDaGVja1wiOiB0cnVlIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NsZWFyIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQucmVtb3ZlRGF0YSgnX2lucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdW5iaW5kIGFsbCBldmVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQudW5iaW5kKFwiLmlucHV0bWFza1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW5wdXQucmVtb3ZlQ2xhc3MoJ2ZvY3VzLmlucHV0bWFzaycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzdG9yZSB0aGUgdmFsdWUgcHJvcGVydHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVQcm9wZXJ0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVQcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaW5wdXQsIFwidmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlUHJvcGVydHkgJiYgdmFsdWVQcm9wZXJ0eS5nZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0Ll92YWx1ZUdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGlucHV0LCBcInZhbHVlXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGlucHV0Ll92YWx1ZUdldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IGlucHV0Ll92YWx1ZVNldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Ll9fbG9va3VwR2V0dGVyX18gJiYgaW5wdXQuX19sb29rdXBHZXR0ZXJfXyhcInZhbHVlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC5fdmFsdWVHZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll9fZGVmaW5lR2V0dGVyX18oXCJ2YWx1ZVwiLCBpbnB1dC5fdmFsdWVHZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuX19kZWZpbmVTZXR0ZXJfXyhcInZhbHVlXCIsIGlucHV0Ll92YWx1ZVNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHsgLy90cnkgY2F0Y2ggbmVlZGVkIGZvciBJRTcgYXMgaXQgZG9lcyBub3Qgc3VwcG9ydHMgZGVsZXRpbmcgZm5zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnB1dC5fdmFsdWVHZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBpbnB1dC5fdmFsdWVTZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5fdmFsdWVHZXQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Ll92YWx1ZVNldCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImdldGVtcHR5bWFza1wiOiAvL3JldHVybiB0aGUgZGVmYXVsdCAoZW1wdHkpIG1hc2sgdmFsdWUsIHVzZWZ1bGwgZm9yIHNldHRpbmcgdGhlIGRlZmF1bHQgdmFsdWUgaW4gdmFsaWRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhKCdfaW5wdXRtYXNrJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tzZXRzID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ21hc2tzZXRzJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVNYXNrc2V0SW5kZXggPSB0aGlzLmRhdGEoJ19pbnB1dG1hc2snKVsnYWN0aXZlTWFza3NldEluZGV4J107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFza3NldHNbYWN0aXZlTWFza3NldEluZGV4XVsnX2J1ZmZlciddLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImhhc01hc2tlZFZhbHVlXCI6IC8vY2hlY2sgd2hldGVyIHRoZSByZXR1cm5lZCB2YWx1ZSBpcyBtYXNrZWQgb3Igbm90OyBjdXJyZW50bHkgb25seSB3b3JrcyByZWxpYWJsZSB3aGVuIHVzaW5nIGpxdWVyeS52YWwgZm4gdG8gcmV0cmlldmUgdGhlIHZhbHVlIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJykgPyAhdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXS5hdXRvVW5tYXNrIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlzQ29tcGxldGVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza3NldHMgPSB0aGlzLmRhdGEoJ19pbnB1dG1hc2snKVsnbWFza3NldHMnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ29wdHMnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tTY29wZShtYXNrc2V0cywgYWN0aXZlTWFza3NldEluZGV4LCBvcHRzLCB7IFwiYWN0aW9uXCI6IFwiaXNDb21wbGV0ZVwiLCBcImJ1ZmZlclwiOiB0aGlzWzBdLl92YWx1ZUdldCgpLnNwbGl0KCcnKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZ2V0bWV0YWRhdGFcIjogLy9yZXR1cm4gbWFzayBtZXRhZGF0YSBpZiBleGlzdHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YSgnX2lucHV0bWFzaycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IHRoaXMuZGF0YSgnX2lucHV0bWFzaycpWydtYXNrc2V0cyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlTWFza3NldEluZGV4ID0gdGhpcy5kYXRhKCdfaW5wdXRtYXNrJylbJ2FjdGl2ZU1hc2tzZXRJbmRleCddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hc2tzZXRzW2FjdGl2ZU1hc2tzZXRJbmRleF1bJ21ldGFkYXRhJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgdGhlIGZuIGlzIGFuIGFsaWFzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzb2x2ZUFsaWFzKGZuLCBvcHRpb25zLCBvcHRzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tYXliZSBmbiBpcyBhIG1hc2sgc28gd2UgdHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NldCBtYXNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLm1hc2sgPSBmbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IGdlbmVyYXRlTWFza1NldHMob3B0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXNrc2V0cy5sZW5ndGggPT0gMCkgeyByZXR1cm4gdGhpczsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2tTY29wZSgkLmV4dGVuZCh0cnVlLCB7fSwgbWFza3NldHMpLCBhY3RpdmVNYXNrc2V0SW5kZXgsIG9wdHMsIHsgXCJhY3Rpb25cIjogXCJtYXNrXCIsIFwiZWxcIjogdGhpcyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZm4gPT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgb3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmlucHV0bWFzay5kZWZhdWx0cywgZm4pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc29sdmVBbGlhcyhvcHRzLmFsaWFzLCBmbiwgb3B0cyk7IC8vcmVzb2x2ZSBhbGlhc2VzXHJcbiAgICAgICAgICAgICAgICBtYXNrc2V0cyA9IGdlbmVyYXRlTWFza1NldHMob3B0cyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFza3NldHMubGVuZ3RoID09IDApIHsgcmV0dXJuIHRoaXM7IH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2tTY29wZSgkLmV4dGVuZCh0cnVlLCB7fSwgbWFza3NldHMpLCBhY3RpdmVNYXNrc2V0SW5kZXgsIG9wdHMsIHsgXCJhY3Rpb25cIjogXCJtYXNrXCIsIFwiZWxcIjogdGhpcyB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZuID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy9sb29rIGZvciBkYXRhLWlucHV0bWFzayBhdHJpYnV0ZSAtIHRoZSBhdHRyaWJ1dGUgc2hvdWxkIG9ubHkgY29udGFpbiBvcHRpcG5zXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXR0ck9wdGlvbnMgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWlucHV0bWFza1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0ck9wdGlvbnMgJiYgYXR0ck9wdGlvbnMgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ck9wdGlvbnMgPSBhdHRyT3B0aW9ucy5yZXBsYWNlKG5ldyBSZWdFeHAoXCInXCIsIFwiZ1wiKSwgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YW9wdGlvbnMgPSAkLnBhcnNlSlNPTihcIntcIiArIGF0dHJPcHRpb25zICsgXCJ9XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQodHJ1ZSwgZGF0YW9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmlucHV0bWFzay5kZWZhdWx0cywgZGF0YW9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZUFsaWFzKG9wdHMuYWxpYXMsIGRhdGFvcHRpb25zLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuYWxpYXMgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmlucHV0bWFzayhvcHRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHsgfSAvL25lZWQgYSBtb3JlIHJlbGF4IHBhcnNlSlNPTlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSkoalF1ZXJ5KTtcclxuIiwiLyohIGlDaGVjayB2MS4wLjEgYnkgRGFtaXIgU3VsdGFub3YsIGh0dHA6Ly9naXQuaW8vYXJsemVBLCBNSVQgTGljZW5zZWQgKi9cbihmdW5jdGlvbihoKXtmdW5jdGlvbiBGKGEsYixkKXt2YXIgYz1hWzBdLGU9L2VyLy50ZXN0KGQpP206L2JsLy50ZXN0KGQpP3M6bCxmPWQ9PUg/e2NoZWNrZWQ6Y1tsXSxkaXNhYmxlZDpjW3NdLGluZGV0ZXJtaW5hdGU6XCJ0cnVlXCI9PWEuYXR0cihtKXx8XCJmYWxzZVwiPT1hLmF0dHIodyl9OmNbZV07aWYoL14oY2h8ZGl8aW4pLy50ZXN0KGQpJiYhZilEKGEsZSk7ZWxzZSBpZigvXih1bnxlbnxkZSkvLnRlc3QoZCkmJmYpdChhLGUpO2Vsc2UgaWYoZD09SClmb3IoZSBpbiBmKWZbZV0/RChhLGUsITApOnQoYSxlLCEwKTtlbHNlIGlmKCFifHxcInRvZ2dsZVwiPT1kKXtpZighYilhW3BdKFwiaWZDbGlja2VkXCIpO2Y/Y1tuXSE9PXUmJnQoYSxlKTpEKGEsZSl9fWZ1bmN0aW9uIEQoYSxiLGQpe3ZhciBjPWFbMF0sZT1hLnBhcmVudCgpLGY9Yj09bCxBPWI9PW0sQj1iPT1zLEs9QT93OmY/RTpcImVuYWJsZWRcIixwPWsoYSxLK3goY1tuXSkpLE49ayhhLGIreChjW25dKSk7aWYoITAhPT1jW2JdKXtpZighZCYmXG5iPT1sJiZjW25dPT11JiZjLm5hbWUpe3ZhciBDPWEuY2xvc2VzdChcImZvcm1cIikscj0naW5wdXRbbmFtZT1cIicrYy5uYW1lKydcIl0nLHI9Qy5sZW5ndGg/Qy5maW5kKHIpOmgocik7ci5lYWNoKGZ1bmN0aW9uKCl7dGhpcyE9PWMmJmgodGhpcykuZGF0YShxKSYmdChoKHRoaXMpLGIpfSl9QT8oY1tiXT0hMCxjW2xdJiZ0KGEsbCxcImZvcmNlXCIpKTooZHx8KGNbYl09ITApLGYmJmNbbV0mJnQoYSxtLCExKSk7TChhLGYsYixkKX1jW3NdJiZrKGEseSwhMCkmJmUuZmluZChcIi5cIitJKS5jc3MoeSxcImRlZmF1bHRcIik7ZVt2XShOfHxrKGEsYil8fFwiXCIpO0I/ZS5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLFwidHJ1ZVwiKTplLmF0dHIoXCJhcmlhLWNoZWNrZWRcIixBP1wibWl4ZWRcIjpcInRydWVcIik7ZVt6XShwfHxrKGEsSyl8fFwiXCIpfWZ1bmN0aW9uIHQoYSxiLGQpe3ZhciBjPWFbMF0sZT1hLnBhcmVudCgpLGY9Yj09bCxoPWI9PW0scT1iPT1zLHA9aD93OmY/RTpcImVuYWJsZWRcIix0PWsoYSxwK3goY1tuXSkpLFxudT1rKGEsYit4KGNbbl0pKTtpZighMSE9PWNbYl0pe2lmKGh8fCFkfHxcImZvcmNlXCI9PWQpY1tiXT0hMTtMKGEsZixwLGQpfSFjW3NdJiZrKGEseSwhMCkmJmUuZmluZChcIi5cIitJKS5jc3MoeSxcInBvaW50ZXJcIik7ZVt6XSh1fHxrKGEsYil8fFwiXCIpO3E/ZS5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLFwiZmFsc2VcIik6ZS5hdHRyKFwiYXJpYS1jaGVja2VkXCIsXCJmYWxzZVwiKTtlW3ZdKHR8fGsoYSxwKXx8XCJcIil9ZnVuY3Rpb24gTShhLGIpe2lmKGEuZGF0YShxKSl7YS5wYXJlbnQoKS5odG1sKGEuYXR0cihcInN0eWxlXCIsYS5kYXRhKHEpLnN8fFwiXCIpKTtpZihiKWFbcF0oYik7YS5vZmYoXCIuaVwiKS51bndyYXAoKTtoKEcrJ1tmb3I9XCInK2FbMF0uaWQrJ1wiXScpLmFkZChhLmNsb3Nlc3QoRykpLm9mZihcIi5pXCIpfX1mdW5jdGlvbiBrKGEsYixkKXtpZihhLmRhdGEocSkpcmV0dXJuIGEuZGF0YShxKS5vW2IrKGQ/XCJcIjpcIkNsYXNzXCIpXX1mdW5jdGlvbiB4KGEpe3JldHVybiBhLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK1xuYS5zbGljZSgxKX1mdW5jdGlvbiBMKGEsYixkLGMpe2lmKCFjKXtpZihiKWFbcF0oXCJpZlRvZ2dsZWRcIik7YVtwXShcImlmQ2hhbmdlZFwiKVtwXShcImlmXCIreChkKSl9fXZhciBxPVwiaUNoZWNrXCIsST1xK1wiLWhlbHBlclwiLHU9XCJyYWRpb1wiLGw9XCJjaGVja2VkXCIsRT1cInVuXCIrbCxzPVwiZGlzYWJsZWRcIix3PVwiZGV0ZXJtaW5hdGVcIixtPVwiaW5cIit3LEg9XCJ1cGRhdGVcIixuPVwidHlwZVwiLHY9XCJhZGRDbGFzc1wiLHo9XCJyZW1vdmVDbGFzc1wiLHA9XCJ0cmlnZ2VyXCIsRz1cImxhYmVsXCIseT1cImN1cnNvclwiLEo9L2lwYWR8aXBob25lfGlwb2R8YW5kcm9pZHxibGFja2JlcnJ5fHdpbmRvd3MgcGhvbmV8b3BlcmEgbWluaXxzaWxrL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtoLmZuW3FdPWZ1bmN0aW9uKGEsYil7dmFyIGQ9J2lucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgaW5wdXRbdHlwZT1cIicrdSsnXCJdJyxjPWgoKSxlPWZ1bmN0aW9uKGEpe2EuZWFjaChmdW5jdGlvbigpe3ZhciBhPWgodGhpcyk7Yz1hLmlzKGQpP1xuYy5hZGQoYSk6Yy5hZGQoYS5maW5kKGQpKX0pfTtpZigvXihjaGVja3x1bmNoZWNrfHRvZ2dsZXxpbmRldGVybWluYXRlfGRldGVybWluYXRlfGRpc2FibGV8ZW5hYmxlfHVwZGF0ZXxkZXN0cm95KSQvaS50ZXN0KGEpKXJldHVybiBhPWEudG9Mb3dlckNhc2UoKSxlKHRoaXMpLGMuZWFjaChmdW5jdGlvbigpe3ZhciBjPWgodGhpcyk7XCJkZXN0cm95XCI9PWE/TShjLFwiaWZEZXN0cm95ZWRcIik6RihjLCEwLGEpO2guaXNGdW5jdGlvbihiKSYmYigpfSk7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGEmJmEpcmV0dXJuIHRoaXM7dmFyIGY9aC5leHRlbmQoe2NoZWNrZWRDbGFzczpsLGRpc2FibGVkQ2xhc3M6cyxpbmRldGVybWluYXRlQ2xhc3M6bSxsYWJlbEhvdmVyOiEwLGFyaWE6ITF9LGEpLGs9Zi5oYW5kbGUsQj1mLmhvdmVyQ2xhc3N8fFwiaG92ZXJcIix4PWYuZm9jdXNDbGFzc3x8XCJmb2N1c1wiLHc9Zi5hY3RpdmVDbGFzc3x8XCJhY3RpdmVcIix5PSEhZi5sYWJlbEhvdmVyLEM9Zi5sYWJlbEhvdmVyQ2xhc3N8fFxuXCJob3ZlclwiLHI9KFwiXCIrZi5pbmNyZWFzZUFyZWEpLnJlcGxhY2UoXCIlXCIsXCJcIil8MDtpZihcImNoZWNrYm94XCI9PWt8fGs9PXUpZD0naW5wdXRbdHlwZT1cIicraysnXCJdJzstNTA+ciYmKHI9LTUwKTtlKHRoaXMpO3JldHVybiBjLmVhY2goZnVuY3Rpb24oKXt2YXIgYT1oKHRoaXMpO00oYSk7dmFyIGM9dGhpcyxiPWMuaWQsZT0tcitcIiVcIixkPTEwMCsyKnIrXCIlXCIsZD17cG9zaXRpb246XCJhYnNvbHV0ZVwiLHRvcDplLGxlZnQ6ZSxkaXNwbGF5OlwiYmxvY2tcIix3aWR0aDpkLGhlaWdodDpkLG1hcmdpbjowLHBhZGRpbmc6MCxiYWNrZ3JvdW5kOlwiI2ZmZlwiLGJvcmRlcjowLG9wYWNpdHk6MH0sZT1KP3twb3NpdGlvbjpcImFic29sdXRlXCIsdmlzaWJpbGl0eTpcImhpZGRlblwifTpyP2Q6e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIixvcGFjaXR5OjB9LGs9XCJjaGVja2JveFwiPT1jW25dP2YuY2hlY2tib3hDbGFzc3x8XCJpY2hlY2tib3hcIjpmLnJhZGlvQ2xhc3N8fFwiaVwiK3UsbT1oKEcrJ1tmb3I9XCInK2IrJ1wiXScpLmFkZChhLmNsb3Nlc3QoRykpLFxuQT0hIWYuYXJpYSxFPXErXCItXCIrTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikucmVwbGFjZShcIjAuXCIsXCJcIiksZz0nPGRpdiBjbGFzcz1cIicraysnXCIgJysoQT8ncm9sZT1cIicrY1tuXSsnXCIgJzpcIlwiKTttLmxlbmd0aCYmQSYmbS5lYWNoKGZ1bmN0aW9uKCl7Zys9J2FyaWEtbGFiZWxsZWRieT1cIic7dGhpcy5pZD9nKz10aGlzLmlkOih0aGlzLmlkPUUsZys9RSk7Zys9J1wiJ30pO2c9YS53cmFwKGcrXCIvPlwiKVtwXShcImlmQ3JlYXRlZFwiKS5wYXJlbnQoKS5hcHBlbmQoZi5pbnNlcnQpO2Q9aCgnPGlucyBjbGFzcz1cIicrSSsnXCIvPicpLmNzcyhkKS5hcHBlbmRUbyhnKTthLmRhdGEocSx7bzpmLHM6YS5hdHRyKFwic3R5bGVcIil9KS5jc3MoZSk7Zi5pbmhlcml0Q2xhc3MmJmdbdl0oYy5jbGFzc05hbWV8fFwiXCIpO2YuaW5oZXJpdElEJiZiJiZnLmF0dHIoXCJpZFwiLHErXCItXCIrYik7XCJzdGF0aWNcIj09Zy5jc3MoXCJwb3NpdGlvblwiKSYmZy5jc3MoXCJwb3NpdGlvblwiLFwicmVsYXRpdmVcIik7RihhLCEwLEgpO1xuaWYobS5sZW5ndGgpbS5vbihcImNsaWNrLmkgbW91c2VvdmVyLmkgbW91c2VvdXQuaSB0b3VjaGJlZ2luLmkgdG91Y2hlbmQuaVwiLGZ1bmN0aW9uKGIpe3ZhciBkPWJbbl0sZT1oKHRoaXMpO2lmKCFjW3NdKXtpZihcImNsaWNrXCI9PWQpe2lmKGgoYi50YXJnZXQpLmlzKFwiYVwiKSlyZXR1cm47RihhLCExLCEwKX1lbHNlIHkmJigvdXR8bmQvLnRlc3QoZCk/KGdbel0oQiksZVt6XShDKSk6KGdbdl0oQiksZVt2XShDKSkpO2lmKEopYi5zdG9wUHJvcGFnYXRpb24oKTtlbHNlIHJldHVybiExfX0pO2Eub24oXCJjbGljay5pIGZvY3VzLmkgYmx1ci5pIGtleXVwLmkga2V5ZG93bi5pIGtleXByZXNzLmlcIixmdW5jdGlvbihiKXt2YXIgZD1iW25dO2I9Yi5rZXlDb2RlO2lmKFwiY2xpY2tcIj09ZClyZXR1cm4hMTtpZihcImtleWRvd25cIj09ZCYmMzI9PWIpcmV0dXJuIGNbbl09PXUmJmNbbF18fChjW2xdP3QoYSxsKTpEKGEsbCkpLCExO2lmKFwia2V5dXBcIj09ZCYmY1tuXT09dSkhY1tsXSYmRChhLGwpO2Vsc2UgaWYoL3VzfHVyLy50ZXN0KGQpKWdbXCJibHVyXCI9PVxuZD96OnZdKHgpfSk7ZC5vbihcImNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlb3ZlciBtb3VzZW91dCB0b3VjaGJlZ2luLmkgdG91Y2hlbmQuaVwiLGZ1bmN0aW9uKGIpe3ZhciBkPWJbbl0sZT0vd258dXAvLnRlc3QoZCk/dzpCO2lmKCFjW3NdKXtpZihcImNsaWNrXCI9PWQpRihhLCExLCEwKTtlbHNle2lmKC93bnxlcnxpbi8udGVzdChkKSlnW3ZdKGUpO2Vsc2UgZ1t6XShlK1wiIFwiK3cpO2lmKG0ubGVuZ3RoJiZ5JiZlPT1CKW1bL3V0fG5kLy50ZXN0KGQpP3o6dl0oQyl9aWYoSiliLnN0b3BQcm9wYWdhdGlvbigpO2Vsc2UgcmV0dXJuITF9fSl9KX19KSh3aW5kb3cualF1ZXJ5fHx3aW5kb3cuWmVwdG8pO1xuIl19
