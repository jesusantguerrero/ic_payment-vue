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
      console.log("hello");
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
if("undefined"==typeof jQuery)throw new Error("AdminLTE requires jQuery");+function(e){"use strict";function t(t){return this.each(function(){var a=e(this),o=a.data(i);if(!o){var r=e.extend({},n,a.data(),"object"==typeof t&&t);a.data(i,o=new s(r))}if("string"==typeof t){if(void 0===o[t])throw new Error("No method named "+t);o[t]()}})}var i="lte.layout",n={slimscroll:!0,resetHeight:!0},a={wrapper:".wrapper",contentWrapper:".content-wrapper",layoutBoxed:".layout-boxed",mainFooter:".main-footer",mainHeader:".main-header",sidebar:".sidebar",controlSidebar:".control-sidebar",fixed:".fixed",sidebarMenu:".sidebar-menu",logo:".main-header .logo"},o={fixed:"fixed",holdTransition:"hold-transition"},s=function(e){this.options=e,this.bindedResize=!1,this.activate()};s.prototype.activate=function(){this.fix(),this.fixSidebar(),e("body").removeClass(o.holdTransition),this.options.resetHeight&&e("body, html, "+a.wrapper).css({height:"auto","min-height":"100%"}),this.bindedResize||(e(window).resize(function(){this.fix(),this.fixSidebar(),e(a.logo+", "+a.sidebar).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(){this.fix(),this.fixSidebar()}.bind(this))}.bind(this)),this.bindedResize=!0),e(a.sidebarMenu).on("expanded.tree",function(){this.fix(),this.fixSidebar()}.bind(this)),e(a.sidebarMenu).on("collapsed.tree",function(){this.fix(),this.fixSidebar()}.bind(this))},s.prototype.fix=function(){e(a.layoutBoxed+" > "+a.wrapper).css("overflow","hidden");var t=e(a.mainFooter).outerHeight()||0,i=e(a.mainHeader).outerHeight()+t,n=e(window).height(),s=e(a.sidebar).height()||0;if(e("body").hasClass(o.fixed))e(a.contentWrapper).css("min-height",n-t);else{var r;n>=s?(e(a.contentWrapper).css("min-height",n-i),r=n-i):(e(a.contentWrapper).css("min-height",s),r=s);var l=e(a.controlSidebar);void 0!==l&&l.height()>r&&e(a.contentWrapper).css("min-height",l.height())}},s.prototype.fixSidebar=function(){e("body").hasClass(o.fixed)?this.options.slimscroll&&void 0!==e.fn.slimScroll&&(e(a.sidebar).slimScroll({destroy:!0}).height("auto"),e(a.sidebar).slimScroll({height:e(window).height()-e(a.mainHeader).height()+"px",color:"rgba(0,0,0,0.2)",size:"3px"})):void 0!==e.fn.slimScroll&&e(a.sidebar).slimScroll({destroy:!0}).height("auto")};var r=e.fn.layout;e.fn.layout=t,e.fn.layout.Constuctor=s,e.fn.layout.noConflict=function(){return e.fn.layout=r,this},e(window).on("load",function(){t.call(e("body"))})}(jQuery),function(e){"use strict";function t(t){return this.each(function(){var a=e(this),o=a.data(i);if(!o){var s=e.extend({},n,a.data(),"object"==typeof t&&t);a.data(i,o=new r(s))}"toggle"==t&&o.toggle()})}var i="lte.pushmenu",n={collapseScreenSize:767,expandOnHover:!1,expandTransitionDelay:200},a={collapsed:".sidebar-collapse",open:".sidebar-open",mainSidebar:".main-sidebar",contentWrapper:".content-wrapper",searchInput:".sidebar-form .form-control",button:'[data-toggle="push-menu"]',mini:".sidebar-mini",expanded:".sidebar-expanded-on-hover",layoutFixed:".fixed"},o={collapsed:"sidebar-collapse",open:"sidebar-open",mini:"sidebar-mini",expanded:"sidebar-expanded-on-hover",expandFeature:"sidebar-mini-expand-feature",layoutFixed:"fixed"},s={expanded:"expanded.pushMenu",collapsed:"collapsed.pushMenu"},r=function(e){this.options=e,this.init()};r.prototype.init=function(){(this.options.expandOnHover||e("body").is(a.mini+a.layoutFixed))&&(this.expandOnHover(),e("body").addClass(o.expandFeature)),e(a.contentWrapper).click(function(){e(window).width()<=this.options.collapseScreenSize&&e("body").hasClass(o.open)&&this.close()}.bind(this)),e(a.searchInput).click(function(e){e.stopPropagation()})},r.prototype.toggle=function(){var t=e(window).width(),i=!e("body").hasClass(o.collapsed);t<=this.options.collapseScreenSize&&(i=e("body").hasClass(o.open)),i?this.close():this.open()},r.prototype.open=function(){e(window).width()>this.options.collapseScreenSize?e("body").removeClass(o.collapsed).trigger(e.Event(s.expanded)):e("body").addClass(o.open).trigger(e.Event(s.expanded))},r.prototype.close=function(){e(window).width()>this.options.collapseScreenSize?e("body").addClass(o.collapsed).trigger(e.Event(s.collapsed)):e("body").removeClass(o.open+" "+o.collapsed).trigger(e.Event(s.collapsed))},r.prototype.expandOnHover=function(){e(a.mainSidebar).hover(function(){e("body").is(a.mini+a.collapsed)&&e(window).width()>this.options.collapseScreenSize&&this.expand()}.bind(this),function(){e("body").is(a.expanded)&&this.collapse()}.bind(this))},r.prototype.expand=function(){setTimeout(function(){e("body").removeClass(o.collapsed).addClass(o.expanded)},this.options.expandTransitionDelay)},r.prototype.collapse=function(){setTimeout(function(){e("body").removeClass(o.expanded).addClass(o.collapsed)},this.options.expandTransitionDelay)};var l=e.fn.pushMenu;e.fn.pushMenu=t,e.fn.pushMenu.Constructor=r,e.fn.pushMenu.noConflict=function(){return e.fn.pushMenu=l,this},e(document).on("click",a.button,function(i){i.preventDefault(),t.call(e(this),"toggle")}),e(window).on("load",function(){t.call(e(a.button))})}(jQuery),function(e){"use strict";function t(t){return this.each(function(){var a=e(this);if(!a.data(i)){var o=e.extend({},n,a.data(),"object"==typeof t&&t);a.data(i,new r(a,o))}})}var i="lte.tree",n={animationSpeed:500,accordion:!0,followLink:!1,trigger:".treeview a"},a={tree:".tree",treeview:".treeview",treeviewMenu:".treeview-menu",open:".menu-open, .active",li:"li",data:'[data-widget="tree"]',active:".active"},o={open:"menu-open",tree:"tree"},s={collapsed:"collapsed.tree",expanded:"expanded.tree"},r=function(t,i){this.element=t,this.options=i,e(this.element).addClass(o.tree),e(a.treeview+a.active,this.element).addClass(o.open),this._setUpListeners()};r.prototype.toggle=function(e,t){var i=e.next(a.treeviewMenu),n=e.parent(),s=n.hasClass(o.open);n.is(a.treeview)&&(this.options.followLink&&"#"!=e.attr("href")||t.preventDefault(),s?this.collapse(i,n):this.expand(i,n))},r.prototype.expand=function(t,i){var n=e.Event(s.expanded);if(this.options.accordion){var r=i.siblings(a.open),l=r.children(a.treeviewMenu);this.collapse(l,r)}i.addClass(o.open),t.slideDown(this.options.animationSpeed,function(){e(this.element).trigger(n)}.bind(this))},r.prototype.collapse=function(t,i){var n=e.Event(s.collapsed);t.find(a.open).removeClass(o.open),i.removeClass(o.open),t.slideUp(this.options.animationSpeed,function(){t.find(a.open+" > "+a.treeview).slideUp(),e(this.element).trigger(n)}.bind(this))},r.prototype._setUpListeners=function(){var t=this;e(this.element).on("click",this.options.trigger,function(i){t.toggle(e(this),i)})};var l=e.fn.tree;e.fn.tree=t,e.fn.tree.Constructor=r,e.fn.tree.noConflict=function(){return e.fn.tree=l,this},e(window).on("load",function(){e(a.data).each(function(){t.call(e(this))})})}(jQuery),function(e){"use strict";function t(t){return this.each(function(){var a=e(this),o=a.data(i);if(!o){var s=e.extend({},n,a.data(),"object"==typeof t&&t);a.data(i,o=new r(a,s))}"string"==typeof t&&o.toggle()})}var i="lte.controlsidebar",n={slide:!0},a={sidebar:".control-sidebar",data:'[data-toggle="control-sidebar"]',open:".control-sidebar-open",bg:".control-sidebar-bg",wrapper:".wrapper",content:".content-wrapper",boxed:".layout-boxed"},o={open:"control-sidebar-open",fixed:"fixed"},s={collapsed:"collapsed.controlsidebar",expanded:"expanded.controlsidebar"},r=function(e,t){this.element=e,this.options=t,this.hasBindedResize=!1,this.init()};r.prototype.init=function(){e(this.element).is(a.data)||e(this).on("click",this.toggle),this.fix(),e(window).resize(function(){this.fix()}.bind(this))},r.prototype.toggle=function(t){t&&t.preventDefault(),this.fix(),e(a.sidebar).is(a.open)||e("body").is(a.open)?this.collapse():this.expand()},r.prototype.expand=function(){this.options.slide?e(a.sidebar).addClass(o.open):e("body").addClass(o.open),e(this.element).trigger(e.Event(s.expanded))},r.prototype.collapse=function(){e("body, "+a.sidebar).removeClass(o.open),e(this.element).trigger(e.Event(s.collapsed))},r.prototype.fix=function(){e("body").is(a.boxed)&&this._fixForBoxed(e(a.bg))},r.prototype._fixForBoxed=function(t){t.css({position:"absolute",height:e(a.wrapper).height()})};var l=e.fn.controlSidebar;e.fn.controlSidebar=t,e.fn.controlSidebar.Constructor=r,e.fn.controlSidebar.noConflict=function(){return e.fn.controlSidebar=l,this},e(document).on("click",a.data,function(i){i&&i.preventDefault(),t.call(e(this),"toggle")})}(jQuery),function(e){"use strict";function t(t){return this.each(function(){var a=e(this),o=a.data(i);if(!o){var s=e.extend({},n,a.data(),"object"==typeof t&&t);a.data(i,o=new r(a,s))}if("string"==typeof t){if(void 0===o[t])throw new Error("No method named "+t);o[t]()}})}var i="lte.boxwidget",n={animationSpeed:500,collapseTrigger:'[data-widget="collapse"]',removeTrigger:'[data-widget="remove"]',collapseIcon:"fa-minus",expandIcon:"fa-plus",removeIcon:"fa-times"},a={data:".box",collapsed:".collapsed-box",body:".box-body",footer:".box-footer",tools:".box-tools"},o={collapsed:"collapsed-box"},s={collapsed:"collapsed.boxwidget",expanded:"expanded.boxwidget",removed:"removed.boxwidget"},r=function(e,t){this.element=e,this.options=t,this._setUpListeners()};r.prototype.toggle=function(){e(this.element).is(a.collapsed)?this.expand():this.collapse()},r.prototype.expand=function(){var t=e.Event(s.expanded),i=this.options.collapseIcon,n=this.options.expandIcon;e(this.element).removeClass(o.collapsed),e(this.element).find(a.tools).find("."+n).removeClass(n).addClass(i),e(this.element).find(a.body+", "+a.footer).slideDown(this.options.animationSpeed,function(){e(this.element).trigger(t)}.bind(this))},r.prototype.collapse=function(){var t=e.Event(s.collapsed),i=this.options.collapseIcon,n=this.options.expandIcon;e(this.element).find(a.tools).find("."+i).removeClass(i).addClass(n),e(this.element).find(a.body+", "+a.footer).slideUp(this.options.animationSpeed,function(){e(this.element).addClass(o.collapsed),e(this.element).trigger(t)}.bind(this))},r.prototype.remove=function(){var t=e.Event(s.removed);e(this.element).slideUp(this.options.animationSpeed,function(){e(this.element).trigger(t),e(this.element).remove()}.bind(this))},r.prototype._setUpListeners=function(){var t=this;e(this.element).on("click",this.options.collapseTrigger,function(e){e&&e.preventDefault(),t.toggle()}),e(this.element).on("click",this.options.removeTrigger,function(e){e&&e.preventDefault(),t.remove()})};var l=e.fn.boxWidget;e.fn.boxWidget=t,e.fn.boxWidget.Constructor=r,e.fn.boxWidget.noConflict=function(){return e.fn.boxWidget=l,this},e(window).on("load",function(){e(a.data).each(function(){t.call(e(this))})})}(jQuery),function(e){"use strict";function t(t){return this.each(function(){var a=e(this),o=a.data(i);if(!o){var r=e.extend({},n,a.data(),"object"==typeof t&&t);a.data(i,o=new s(a,r))}if("string"==typeof o){if(void 0===o[t])throw new Error("No method named "+t);o[t]()}})}var i="lte.todolist",n={iCheck:!1,onCheck:function(){},onUnCheck:function(){}},a={data:'[data-widget="todo-list"]'},o={done:"done"},s=function(e,t){this.element=e,this.options=t,this._setUpListeners()};s.prototype.toggle=function(e){e.parents(a.li).first().toggleClass(o.done),e.prop("checked")?this.check(e):this.unCheck(e)},s.prototype.check=function(e){this.options.onCheck.call(e)},s.prototype.unCheck=function(e){this.options.onUnCheck.call(e)},s.prototype._setUpListeners=function(){var t=this;e(this.element).on("change ifChanged","input:checkbox",function(){t.toggle(e(this))})};var r=e.fn.todoList;e.fn.todoList=t,e.fn.todoList.Constructor=s,e.fn.todoList.noConflict=function(){return e.fn.todoList=r,this},e(window).on("load",function(){e(a.data).each(function(){t.call(e(this))})})}(jQuery),function(e){"use strict";function t(t){return this.each(function(){var n=e(this),a=n.data(i);a||n.data(i,a=new o(n)),"string"==typeof t&&a.toggle(n)})}var i="lte.directchat",n={data:'[data-widget="chat-pane-toggle"]',box:".direct-chat"},a={open:"direct-chat-contacts-open"},o=function(e){this.element=e};o.prototype.toggle=function(e){e.parents(n.box).first().toggleClass(a.open)};var s=e.fn.directChat;e.fn.directChat=t,e.fn.directChat.Constructor=o,e.fn.directChat.noConflict=function(){return e.fn.directChat=s,this},e(document).on("click",n.data,function(i){i&&i.preventDefault(),t.call(e(this),"toggle")})}(jQuery),function(e){function t(e){var t=document.createElement("input"),i=(e="on"+e)in t;return i||(t.setAttribute(e,"return;"),i="function"==typeof t[e]),t=null,i}function i(t,n,a){var o=a.aliases[t];return!!o&&(o.alias&&i(o.alias,void 0,a),e.extend(!0,a,o),e.extend(!0,a,n),!0)}function n(t){function i(i){t.numericInput&&(i=i.split("").reverse().join(""));var n=!1,a=0,o=t.greedy,s=t.repeat;"*"==s&&(o=!1),1==i.length&&0==o&&0!=s&&(t.placeholder="");for(var r=e.map(i.split(""),function(e,i){var o=[];if(e==t.escapeChar)n=!0;else if(e!=t.optionalmarker.start&&e!=t.optionalmarker.end||n){var s=t.definitions[e];if(s&&!n)for(var r=0;r<s.cardinality;r++)o.push(t.placeholder.charAt((a+r)%t.placeholder.length));else o.push(e),n=!1;return a+=o.length,o}}),l=r.slice(),d=1;d<s&&o;d++)l=l.concat(r.slice());return{mask:l,repeat:s,greedy:o}}function n(i){t.numericInput&&(i=i.split("").reverse().join(""));var n=!1,a=!1,o=!1;return e.map(i.split(""),function(e,i){var s=[];if(e==t.escapeChar)a=!0;else if(e!=t.optionalmarker.start||a){if(e!=t.optionalmarker.end||a){var r=t.definitions[e];if(r&&!a){for(var l=r.prevalidator,d=l?l.length:0,c=1;c<r.cardinality;c++){var u=d>=c?l[c-1]:[],p=u.validator,f=u.cardinality;s.push({fn:p?"string"==typeof p?new RegExp(p):new function(){this.test=p}:new RegExp("."),cardinality:f||1,optionality:n,newBlockMarker:1==n&&o,offset:0,casing:r.casing,def:r.definitionSymbol||e}),1==n&&(o=!1)}s.push({fn:r.validator?"string"==typeof r.validator?new RegExp(r.validator):new function(){this.test=r.validator}:new RegExp("."),cardinality:r.cardinality,optionality:n,newBlockMarker:o,offset:0,casing:r.casing,def:r.definitionSymbol||e})}else s.push({fn:null,cardinality:0,optionality:n,newBlockMarker:o,offset:0,casing:null,def:e}),a=!1;return o=!1,s}n=!1,o=!0}else n=!0,o=!0})}function a(e){return t.optionalmarker.start+e+t.optionalmarker.end}function o(e){for(var i=0,n=0,a=e.length,o=0;o<a&&(e.charAt(o)==t.optionalmarker.start&&i++,e.charAt(o)==t.optionalmarker.end&&n++,!(i>0&&i==n));o++);var s=[e.substring(0,o)];return o<a&&s.push(e.substring(o+1,a)),s}function s(e){for(var i=e.length,n=0;n<i&&e.charAt(n)!=t.optionalmarker.start;n++);var a=[e.substring(0,n)];return n<i&&a.push(e.substring(n+1,i)),a}function r(t,c,u){var p,f,h=o(c),v=s(h[0]);v.length>1?(p=t+v[0]+a(v[1])+(h.length>1?h[1]:""),-1==e.inArray(p,d)&&""!=p&&(d.push(p),f=i(p),l.push({mask:p,_buffer:f.mask,buffer:f.mask.slice(),tests:n(p),lastValidPosition:-1,greedy:f.greedy,repeat:f.repeat,metadata:u})),p=t+v[0]+(h.length>1?h[1]:""),-1==e.inArray(p,d)&&""!=p&&(d.push(p),f=i(p),l.push({mask:p,_buffer:f.mask,buffer:f.mask.slice(),tests:n(p),lastValidPosition:-1,greedy:f.greedy,repeat:f.repeat,metadata:u})),s(v[1]).length>1&&r(t+v[0],v[1]+h[1],u),h.length>1&&s(h[1]).length>1&&(r(t+v[0]+a(v[1]),h[1],u),r(t+v[0],h[1],u))):(p=t+h,-1==e.inArray(p,d)&&""!=p&&(d.push(p),f=i(p),l.push({mask:p,_buffer:f.mask,buffer:f.mask.slice(),tests:n(p),lastValidPosition:-1,greedy:f.greedy,repeat:f.repeat,metadata:u})))}var l=[],d=[];return e.isFunction(t.mask)&&(t.mask=t.mask.call(this,t)),e.isArray(t.mask)?e.each(t.mask,function(e,t){void 0!=t.mask?r("",t.mask.toString(),t):r("",t.toString())}):r("",t.mask.toString()),t.greedy?l:l.sort(function(e,t){return e.mask.length-t.mask.length})}function a(t,i,n,a){function c(){return t[i]}function u(){return c().tests}function p(){return c()._buffer}function f(){return c().buffer}function h(a,o,s){function r(e,t,i,a){for(var o=g(e),s=i?1:0,r="",l=t.buffer,d=t.tests[o].cardinality;d>s;d--)r+=C(l,o-(d-1));return i&&(r+=i),null!=t.tests[o].fn?t.tests[o].fn.test(r,l,e,a,n):(i==C(t._buffer,e,!0)||i==n.skipOptionalPartCharacter)&&{refresh:!0,c:C(t._buffer,e,!0),pos:e}}if(s=!0===s)return!0===(d=r(a,c(),o,s))&&(d={pos:a}),d;var l=[],d=!1,u=i,p=f().slice(),h=c().lastValidPosition,v=(y(a),[]);return e.each(t,function(e,t){if("object"==typeof t){i=e;var n,g=a,y=c().lastValidPosition;if(y==h){if(g-h>1)for(var C=-1==y?0:y;C<g&&!1!==(n=r(C,c(),p[C],!0));C++){x(f(),C,p[C],!0),!0===n&&(n={pos:C});P=n.pos||C;c().lastValidPosition<P&&(c().lastValidPosition=P)}if(!m(g)&&!r(g,c(),o,s)){for(var _=b(g)-g,w=0;w<_&&!1===r(++g,c(),o,s);w++);v.push(i)}}if((c().lastValidPosition>=h||i==u)&&g>=0&&g<k()){if(!1!==(d=r(g,c(),o,s))){!0===d&&(d={pos:g});var P=d.pos||g;c().lastValidPosition<P&&(c().lastValidPosition=P)}l.push({activeMasksetIndex:e,result:d})}}}),i=u,function(i,n){var s=!1;if(e.each(n,function(t,n){if(s=-1==e.inArray(n.activeMasksetIndex,i)&&!1!==n.result)return!1}),s)n=e.map(n,function(n,a){if(-1==e.inArray(n.activeMasksetIndex,i))return n;t[n.activeMasksetIndex].lastValidPosition=h});else{var l,d=-1,c=-1;e.each(n,function(t,n){-1!=e.inArray(n.activeMasksetIndex,i)&&!1!==n.result&(-1==d||d>n.result.pos)&&(d=n.result.pos,c=n.activeMasksetIndex)}),n=e.map(n,function(n,s){if(-1!=e.inArray(n.activeMasksetIndex,i)){if(n.result.pos==d)return n;if(!1!==n.result){for(var u=a;u<d;u++){if(!1===(l=r(u,t[n.activeMasksetIndex],t[c].buffer[u],!0))){t[n.activeMasksetIndex].lastValidPosition=d-1;break}x(t[n.activeMasksetIndex].buffer,u,t[c].buffer[u],!0),t[n.activeMasksetIndex].lastValidPosition=u}return!1!==(l=r(d,t[n.activeMasksetIndex],o,!0))&&(x(t[n.activeMasksetIndex].buffer,d,o,!0),t[n.activeMasksetIndex].lastValidPosition=d),n}}})}return n}(v,l)}function v(){var n=i,a={activeMasksetIndex:0,lastValidPosition:-1,next:-1};e.each(t,function(e,t){"object"==typeof t&&(i=e,c().lastValidPosition>a.lastValidPosition?(a.activeMasksetIndex=e,a.lastValidPosition=c().lastValidPosition,a.next=b(c().lastValidPosition)):c().lastValidPosition==a.lastValidPosition&&(-1==a.next||a.next>b(c().lastValidPosition))&&(a.activeMasksetIndex=e,a.lastValidPosition=c().lastValidPosition,a.next=b(c().lastValidPosition)))}),n!=(i=-1!=a.lastValidPosition&&t[n].lastValidPosition==a.lastValidPosition?n:a.activeMasksetIndex)&&(P(f(),b(a.lastValidPosition),k()),c().writeOutBuffer=!0),W.data("_inputmask").activeMasksetIndex=i}function m(e){var t=g(e),i=u()[t];return void 0!=i&&i.fn}function g(e){return e%u().length}function k(){return n.getMaskLength(p(),c().greedy,c().repeat,f(),n)}function b(e){var t=k();if(e>=t)return t;for(var i=e;++i<t&&!m(i););return i}function y(e){var t=e;if(t<=0)return 0;for(;--t>0&&!m(t););return t}function x(e,t,i,n){n&&(t=_(e,t));var a=u()[g(t)],o=i;if(void 0!=o&&void 0!=a)switch(a.casing){case"upper":o=i.toUpperCase();break;case"lower":o=i.toLowerCase()}e[t]=o}function C(e,t,i){return i&&(t=_(e,t)),e[t]}function _(e,t){for(var i;void 0==e[t]&&e.length<k();)for(i=0;void 0!==p()[i];)e.push(p()[i++]);return t}function w(e,t,i){e._valueSet(t.join("")),void 0!=i&&D(e,i)}function P(e,t,i,n){for(var a=t,o=k();a<i&&a<o;a++)!0===n?m(a)||x(e,a,""):x(e,a,C(p().slice(),a,!0))}function M(e,t){var i=g(t);x(e,t,C(p(),i))}function S(e){return n.placeholder.charAt(e%n.placeholder.length)}function E(n,a,o,s,r){var l=void 0!=s?s.slice():j(n._valueGet()).split("");e.each(t,function(e,t){"object"==typeof t&&(t.buffer=t._buffer.slice(),t.lastValidPosition=-1,t.p=-1)}),!0!==o&&(i=0),a&&n._valueSet("");k();e.each(l,function(t,i){if(!0===r){var s=c().p,l=-1==s?s:y(s),d=-1==l?t:b(l);-1==e.inArray(i,p().slice(l+1,d))&&K.call(n,void 0,!0,i.charCodeAt(0),a,o,t)}else K.call(n,void 0,!0,i.charCodeAt(0),a,o,t)}),!0===o&&-1!=c().p&&(c().lastValidPosition=y(c().p))}function A(t){return e.inputmask.escapeRegex.call(this,t)}function j(e){return e.replace(new RegExp("("+A(p().join(""))+")*$"),"")}function I(e){for(var t=f(),i=t.slice(),n=i.length-1;n>=0;n--){var a=g(n);if(!u()[a].optionality)break;if(m(n)&&h(n,t[n],!0))break;i.pop()}w(e,i)}function T(e){return!Q||"number"!=typeof e||n.greedy&&""==n.placeholder||(e=f().length-e),e}function D(t,i,a){var o,s=t.jquery&&t.length>0?t[0]:t;if("number"!=typeof i)return e(t).is(":visible")?(s.setSelectionRange?(i=s.selectionStart,a=s.selectionEnd):document.selection&&document.selection.createRange&&(a=(i=0-(o=document.selection.createRange()).duplicate().moveStart("character",-1e5))+o.text.length),i=T(i),a=T(a),{begin:i,end:a}):{begin:0,end:0};i=T(i),a=T(a),e(t).is(":visible")&&(a="number"==typeof a?a:i,s.scrollLeft=s.scrollWidth,0==n.insertMode&&i==a&&a++,s.setSelectionRange?(s.selectionStart=i,s.selectionEnd=r?i:a):s.createTextRange&&((o=s.createTextRange()).collapse(!0),o.moveEnd("character",a),o.moveStart("character",i),o.select()))}function V(a){if("*"!=n.repeat){var o=!1,s=0,r=i;return e.each(t,function(e,t){if("object"==typeof t){i=e;var n=y(k());if(t.lastValidPosition>=s&&t.lastValidPosition==n){for(var r=!0,l=0;l<=n;l++){var d=m(l),c=g(l);if(d&&(void 0==a[l]||a[l]==S(l))||!d&&a[l]!=p()[c]){r=!1;break}}if(o=o||r)return!1}s=t.lastValidPosition}}),i=r,o}}function O(e,t){return Q?e-t>1||e-t==1&&n.insertMode:t-e>1||t-e==1&&n.insertMode}function L(t){var i=e._data(t).events;e.each(i,function(t,i){e.each(i,function(e,t){if("inputmask"==t.namespace&&"setvalue"!=t.type){var i=t.handler;t.handler=function(e){if(!this.readOnly&&!this.disabled)return i.apply(this,arguments);e.preventDefault}}})})}function G(t){var i;if(Object.getOwnPropertyDescriptor&&(i=Object.getOwnPropertyDescriptor(t,"value")),i&&i.get){if(!t._valueGet){var n=i.get,a=i.set;t._valueGet=function(){return Q?n.call(this).split("").reverse().join(""):n.call(this)},t._valueSet=function(e){a.call(this,Q?e.split("").reverse().join(""):e)},Object.defineProperty(t,"value",{get:function(){var t=e(this),i=e(this).data("_inputmask"),a=i.masksets,o=i.activeMasksetIndex;return i&&i.opts.autoUnmask?t.inputmask("unmaskedvalue"):n.call(this)!=a[o]._buffer.join("")?n.call(this):""},set:function(t){a.call(this,t),e(this).triggerHandler("setvalue.inputmask")}})}}else if(document.__lookupGetter__&&t.__lookupGetter__("value")){if(!t._valueGet){var n=t.__lookupGetter__("value"),a=t.__lookupSetter__("value");t._valueGet=function(){return Q?n.call(this).split("").reverse().join(""):n.call(this)},t._valueSet=function(e){a.call(this,Q?e.split("").reverse().join(""):e)},t.__defineGetter__("value",function(){var t=e(this),i=e(this).data("_inputmask"),a=i.masksets,o=i.activeMasksetIndex;return i&&i.opts.autoUnmask?t.inputmask("unmaskedvalue"):n.call(this)!=a[o]._buffer.join("")?n.call(this):""}),t.__defineSetter__("value",function(t){a.call(this,t),e(this).triggerHandler("setvalue.inputmask")})}}else if(t._valueGet||(t._valueGet=function(){return Q?this.value.split("").reverse().join(""):this.value},t._valueSet=function(e){this.value=Q?e.split("").reverse().join(""):e}),void 0==e.valHooks.text||1!=e.valHooks.text.inputmaskpatch){var n=e.valHooks.text&&e.valHooks.text.get?e.valHooks.text.get:function(e){return e.value},a=e.valHooks.text&&e.valHooks.text.set?e.valHooks.text.set:function(e,t){return e.value=t,e};jQuery.extend(e.valHooks,{text:{get:function(t){var i=e(t);if(i.data("_inputmask")){if(i.data("_inputmask").opts.autoUnmask)return i.inputmask("unmaskedvalue");var a=n(t),o=i.data("_inputmask");return a!=o.masksets[o.activeMasksetIndex]._buffer.join("")?a:""}return n(t)},set:function(t,i){var n=e(t),o=a(t,i);return n.data("_inputmask")&&n.triggerHandler("setvalue.inputmask"),o},inputmaskpatch:!0}})}}function R(e,t,i,n){var a=f();if(!1!==n)for(;!m(e)&&e-1>=0;)e--;for(l=e;l<t&&l<k();l++)if(m(l)){M(a,l);var o=b(l),s=C(a,o);if(s!=S(o))if(o<k()&&!1!==h(l,s,!0)&&u()[g(l)].def==u()[g(o)].def)x(a,l,s,!0);else if(m(l))break}else M(a,l);if(void 0!=i&&x(a,y(t),i),0==c().greedy){var r=j(a.join("")).split("");a.length=r.length;for(var l=0,d=a.length;l<d;l++)a[l]=r[l];0==a.length&&(c().buffer=p().slice())}return e}function H(e,t,i){var n=f();if(C(n,e,!0)!=S(e))for(l=y(t);l>e&&l>=0;l--)if(m(l)){var a=y(l),o=C(n,a);o!=S(a)&&!1!==h(a,o,!0)&&u()[g(l)].def==u()[g(a)].def&&(x(n,l,o,!0),M(n,a))}else M(n,l);void 0!=i&&C(n,e)==S(e)&&x(n,e,i);var s=n.length;if(0==c().greedy){var r=j(n.join("")).split("");n.length=r.length;for(var l=0,d=n.length;l<d;l++)n[l]=r[l];0==n.length&&(c().buffer=p().slice())}return t-(s-n.length)}function N(e,i,a){if(n.numericInput||Q){switch(i){case n.keyCode.BACKSPACE:i=n.keyCode.DELETE;break;case n.keyCode.DELETE:i=n.keyCode.BACKSPACE}if(Q){var o=a.end;a.end=a.begin,a.begin=o}}var s=!0;if(a.begin==a.end){var r=i==n.keyCode.BACKSPACE?a.begin-1:a.begin;n.isNumeric&&""!=n.radixPoint&&f()[r]==n.radixPoint&&(a.begin=f().length-1==r?a.begin:i==n.keyCode.BACKSPACE?r:b(r),a.end=a.begin),s=!1,i==n.keyCode.BACKSPACE?a.begin--:i==n.keyCode.DELETE&&a.end++}else a.end-a.begin!=1||n.insertMode||(s=!1,i==n.keyCode.BACKSPACE&&a.begin--);P(f(),a.begin,a.end);var l=k();if(0==n.greedy)R(a.begin,l,void 0,!Q&&i==n.keyCode.BACKSPACE&&!s);else{for(var d=a.begin,u=a.begin;u<a.end;u++)!m(u)&&s||(d=R(a.begin,l,void 0,!Q&&i==n.keyCode.BACKSPACE&&!s));s||(a.begin=d)}var p=b(-1);P(f(),a.begin,a.end,!0),E(e,!1,void 0==t[1]||p>=a.end,f()),c().lastValidPosition<p?(c().lastValidPosition=-1,c().p=p):c().p=a.begin}function U(t){q=!1;var i=this,a=e(i),o=t.keyCode,r=D(i);o==n.keyCode.BACKSPACE||o==n.keyCode.DELETE||s&&127==o||t.ctrlKey&&88==o?(t.preventDefault(),88==o&&($=f().join("")),N(i,o,r),v(),w(i,f(),c().p),i._valueGet()==p().join("")&&a.trigger("cleared"),n.showTooltip&&a.prop("title",c().mask)):o==n.keyCode.END||o==n.keyCode.PAGE_DOWN?setTimeout(function(){var e=b(c().lastValidPosition);n.insertMode||e!=k()||t.shiftKey||e--,D(i,t.shiftKey?r.begin:e,e)},0):o==n.keyCode.HOME&&!t.shiftKey||o==n.keyCode.PAGE_UP?D(i,0,t.shiftKey?r.begin:0):o==n.keyCode.ESCAPE||90==o&&t.ctrlKey?(E(i,!0,!1,$.split("")),a.click()):o!=n.keyCode.INSERT||t.shiftKey||t.ctrlKey?0!=n.insertMode||t.shiftKey||(o==n.keyCode.RIGHT?setTimeout(function(){var e=D(i);D(i,e.begin)},0):o==n.keyCode.LEFT&&setTimeout(function(){var e=D(i);D(i,e.begin-1)},0)):(n.insertMode=!n.insertMode,D(i,n.insertMode||r.begin!=k()?r.begin:r.begin-1));var l=D(i);!0===n.onKeyDown.call(this,t,f(),n)&&D(i,l.begin,l.end),J=-1!=e.inArray(o,n.ignorables)}function K(a,o,s,r,l,d){if(void 0==s&&q)return!1;q=!0;var u=this,p=e(u);a=a||window.event;var s=o?s:a.which||a.charCode||a.keyCode;if(!(!0===o||a.ctrlKey&&a.altKey)&&(a.ctrlKey||a.metaKey||J))return!0;if(s){!0!==o&&46==s&&0==a.shiftKey&&","==n.radixPoint&&(s=44);var m,g,_,P=String.fromCharCode(s);if(o){var M=l?d:c().lastValidPosition+1;m={begin:M,end:M}}else m=D(u);var E=O(m.begin,m.end),A=i;E&&(i=A,e.each(t,function(e,t){"object"==typeof t&&(i=e,c().undoBuffer=f().join(""))}),N(u,n.keyCode.DELETE,m),n.insertMode||e.each(t,function(e,t){"object"==typeof t&&(i=e,H(m.begin,k()),c().lastValidPosition=b(c().lastValidPosition))}),i=A);var j=f().join("").indexOf(n.radixPoint);n.isNumeric&&!0!==o&&-1!=j&&(n.greedy&&m.begin<=j?(m.begin=y(m.begin),m.end=m.begin):P==n.radixPoint&&(m.begin=j,m.end=m.begin));var I=m.begin;g=h(I,P,l),!0===l&&(g=[{activeMasksetIndex:i,result:g}]);var T=-1;if(e.each(g,function(e,t){i=t.activeMasksetIndex,c().writeOutBuffer=!0;var a=t.result;if(!1!==a){var o=!1,s=f();if(!0!==a&&(o=a.refresh,I=void 0!=a.pos?a.pos:I,P=void 0!=a.c?a.c:P),!0!==o){if(1==n.insertMode){for(var r=k(),d=s.slice();C(d,r,!0)!=S(r)&&r>=I;)r=0==r?-1:y(r);if(r>=I){H(I,k(),P);var u=c().lastValidPosition,p=b(u);p!=k()&&u>=I&&C(f(),p,!0)!=S(p)&&(c().lastValidPosition=p)}else c().writeOutBuffer=!1}else x(s,I,P,!0);(-1==T||T>b(I))&&(T=b(I))}else if(!l){var h=I<k()?I+1:I;(-1==T||T>h)&&(T=h)}T>c().p&&(c().p=T)}}),!0!==l&&(i=A,v()),!1!==r&&(e.each(g,function(e,t){if(t.activeMasksetIndex==i)return _=t,!1}),void 0!=_)){var L=this;if(setTimeout(function(){n.onKeyValidation.call(L,_.result,n)},0),c().writeOutBuffer&&!1!==_.result){var G,R=f();G=o?void 0:n.numericInput?I>j?y(T):P==n.radixPoint?T-1:y(T-1):T,w(u,R,G),!0!==o&&setTimeout(function(){!0===V(R)&&p.trigger("complete"),Z=!0,p.trigger("input")},0)}else E&&(c().buffer=c().undoBuffer.split(""))}n.showTooltip&&p.prop("title",c().mask),a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)}}function B(t){var i=e(this),a=this,o=t.keyCode,s=f();l&&o==n.keyCode.BACKSPACE&&z==a._valueGet()&&U.call(this,t),n.onKeyUp.call(this,t,s,n),o==n.keyCode.TAB&&n.showMaskOnFocus&&(i.hasClass("focus.inputmask")&&0==a._valueGet().length?(w(a,s=p().slice()),D(a,0),$=f().join("")):(w(a,s),s.join("")==p().join("")&&-1!=e.inArray(n.radixPoint,s)?(D(a,T(0)),i.click()):D(a,T(0),T(k()))))}function F(t){if(!0===Z)return Z=!1,!0;var i=this,n=e(i);z=f().join(""),E(i,!1,!1),w(i,f()),!0===V(f())&&n.trigger("complete"),n.click()}var W,z,Q=!1,$=f().join(""),q=!1,Z=!1,J=!1;if(void 0!=a)switch(a.action){case"isComplete":return V(a.buffer);case"unmaskedvalue":return Q=a.$input.data("_inputmask").isRTL,function(t,i){if(!u()||!0!==i&&t.hasClass("hasDatepicker"))return t[0]._valueGet();var a=e.map(f(),function(e,t){return m(t)&&h(t,e,!0)?e:null}),o=(Q?a.reverse():a).join("");return void 0!=n.onUnMask?n.onUnMask.call(this,f().join(""),o):o}(a.$input,a.skipDatepickerCheck);case"mask":!function(a){if((W=e(a)).is(":input")){if(W.data("_inputmask",{masksets:t,activeMasksetIndex:i,opts:n,isRTL:!1}),n.showTooltip&&W.prop("title",c().mask),c().greedy=c().greedy?c().greedy:0==c().repeat,null!=W.attr("maxLength")){var s=W.prop("maxLength");s>-1&&e.each(t,function(e,t){"object"==typeof t&&"*"==t.repeat&&(t.repeat=s)}),k()>=s&&s>-1&&(s<p().length&&(p().length=s),0==c().greedy&&(c().repeat=Math.round(s/p().length)),W.prop("maxLength",2*k()))}if(G(a),n.numericInput&&(n.isNumeric=n.numericInput),("rtl"==a.dir||n.numericInput&&n.rightAlignNumerics||n.isNumeric&&n.rightAlignNumerics)&&W.css("text-align","right"),"rtl"==a.dir||n.numericInput){a.dir="ltr",W.removeAttr("dir");var r=W.data("_inputmask");r.isRTL=!0,W.data("_inputmask",r),Q=!0}W.unbind(".inputmask"),W.removeClass("focus.inputmask"),W.closest("form").bind("submit",function(){$!=f().join("")&&W.change()}).bind("reset",function(){setTimeout(function(){W.trigger("setvalue")},0)}),W.bind("mouseenter.inputmask",function(){var t=this;!e(this).hasClass("focus.inputmask")&&n.showMaskOnHover&&t._valueGet()!=f().join("")&&w(t,f())}).bind("blur.inputmask",function(){var a=e(this),o=this,s=o._valueGet(),r=f();a.removeClass("focus.inputmask"),$!=f().join("")&&a.change(),n.clearMaskOnLostFocus&&""!=s&&(s==p().join("")?o._valueSet(""):I(o)),!1===V(r)&&(a.trigger("incomplete"),n.clearIncomplete&&(e.each(t,function(e,t){"object"==typeof t&&(t.buffer=t._buffer.slice(),t.lastValidPosition=-1)}),i=0,n.clearMaskOnLostFocus?o._valueSet(""):w(o,r=p().slice())))}).bind("focus.inputmask",function(){var t=e(this),i=this,a=i._valueGet();n.showMaskOnFocus&&!t.hasClass("focus.inputmask")&&(!n.showMaskOnHover||n.showMaskOnHover&&""==a)&&i._valueGet()!=f().join("")&&w(i,f(),b(c().lastValidPosition)),t.addClass("focus.inputmask"),$=f().join("")}).bind("mouseleave.inputmask",function(){var t=e(this),i=this;n.clearMaskOnLostFocus&&(t.hasClass("focus.inputmask")||i._valueGet()==t.attr("placeholder")||(i._valueGet()==p().join("")||""==i._valueGet()?i._valueSet(""):I(i)))}).bind("click.inputmask",function(){var t=this;setTimeout(function(){var i=D(t),a=f();if(i.begin==i.end){var o,s=Q?T(i.begin):i.begin,r=c().lastValidPosition;s<(o=n.isNumeric&&!1===n.skipRadixDance&&""!=n.radixPoint&&-1!=e.inArray(n.radixPoint,a)?n.numericInput?b(e.inArray(n.radixPoint,a)):e.inArray(n.radixPoint,a):b(r))?m(s)?D(t,s):D(t,b(s)):D(t,o)}},0)}).bind("dblclick.inputmask",function(){var e=this;setTimeout(function(){D(e,0,b(c().lastValidPosition))},0)}).bind(d+".inputmask dragdrop.inputmask drop.inputmask",function(t){if(!0===Z)return Z=!1,!0;var i=this,a=e(i);if("propertychange"==t.type&&i._valueGet().length<=k())return!0;setTimeout(function(){var e=void 0!=n.onBeforePaste?n.onBeforePaste.call(this,i._valueGet()):i._valueGet();E(i,!0,!1,e.split(""),!0),!0===V(f())&&a.trigger("complete"),a.click()},0)}).bind("setvalue.inputmask",function(){var e=this;E(e,!0),$=f().join(""),e._valueGet()==p().join("")&&e._valueSet("")}).bind("complete.inputmask",n.oncomplete).bind("incomplete.inputmask",n.onincomplete).bind("cleared.inputmask",n.oncleared).bind("keyup.inputmask",B),l?W.bind("input.inputmask",F):W.bind("keydown.inputmask",U).bind("keypress.inputmask",K),o&&W.bind("input.inputmask",F),E(a,!0,!1),$=f().join("");var u;try{u=document.activeElement}catch(e){}u===a?(W.addClass("focus.inputmask"),D(a,b(c().lastValidPosition))):n.clearMaskOnLostFocus?f().join("")==p().join("")?a._valueSet(""):I(a):w(a,f()),L(a)}}(a.el);break;case"format":return(W=e({})).data("_inputmask",{masksets:t,activeMasksetIndex:i,opts:n,isRTL:n.numericInput}),n.numericInput&&(n.isNumeric=n.numericInput,Q=!0),E(W,!1,!1,a.value.split(""),!0),f().join("")}}if(void 0===e.fn.inputmask){var o=null!==navigator.userAgent.match(new RegExp("msie 10","i")),s=null!==navigator.userAgent.match(new RegExp("iphone","i")),r=null!==navigator.userAgent.match(new RegExp("android.*safari.*","i")),l=null!==navigator.userAgent.match(new RegExp("android.*chrome.*","i")),d=t("paste")?"paste":t("input")?"input":"propertychange";e.inputmask={defaults:{placeholder:"_",optionalmarker:{start:"[",end:"]"},quantifiermarker:{start:"{",end:"}"},groupmarker:{start:"(",end:")"},escapeChar:"\\",mask:null,oncomplete:e.noop,onincomplete:e.noop,oncleared:e.noop,repeat:0,greedy:!0,autoUnmask:!1,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,aliases:{},onKeyUp:e.noop,onKeyDown:e.noop,onBeforePaste:void 0,onUnMask:void 0,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:e.noop,skipOptionalPartCharacter:" ",showTooltip:!1,numericInput:!1,isNumeric:!1,radixPoint:"",skipRadixDance:!1,rightAlignNumerics:!0,definitions:{9:{validator:"[0-9]",cardinality:1},a:{validator:"[A-Za-zА-яЁё]",cardinality:1},"*":{validator:"[A-Za-zА-яЁё0-9]",cardinality:1}},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123],getMaskLength:function(e,t,i,n,a){var o=e.length;return t||("*"==i?o=n.length+1:i>1&&(o+=e.length*(i-1))),o}},escapeRegex:function(e){var t=["/",".","*","+","?","|","(",")","[","]","{","}","\\"];return e.replace(new RegExp("(\\"+t.join("|\\")+")","gim"),"\\$1")},format:function(t,o){var s=e.extend(!0,{},e.inputmask.defaults,o);return i(s.alias,o,s),a(n(s),0,s,{action:"format",value:t})}},e.fn.inputmask=function(t,o){var s,r=e.extend(!0,{},e.inputmask.defaults,o),l=0;if("string"==typeof t)switch(t){case"mask":return i(r.alias,o,r),s=n(r),0==s.length?this:this.each(function(){a(e.extend(!0,{},s),0,r,{action:"mask",el:this})});case"unmaskedvalue":var d=e(this);return d.data("_inputmask")?(s=d.data("_inputmask").masksets,l=d.data("_inputmask").activeMasksetIndex,r=d.data("_inputmask").opts,a(s,l,r,{action:"unmaskedvalue",$input:d})):d.val();case"remove":return this.each(function(){var t=e(this),i=this;if(t.data("_inputmask")){s=t.data("_inputmask").masksets,l=t.data("_inputmask").activeMasksetIndex,r=t.data("_inputmask").opts,i._valueSet(a(s,l,r,{action:"unmaskedvalue",$input:t,skipDatepickerCheck:!0})),t.removeData("_inputmask"),t.unbind(".inputmask"),t.removeClass("focus.inputmask");var n;Object.getOwnPropertyDescriptor&&(n=Object.getOwnPropertyDescriptor(i,"value")),n&&n.get?i._valueGet&&Object.defineProperty(i,"value",{get:i._valueGet,set:i._valueSet}):document.__lookupGetter__&&i.__lookupGetter__("value")&&i._valueGet&&(i.__defineGetter__("value",i._valueGet),i.__defineSetter__("value",i._valueSet));try{delete i._valueGet,delete i._valueSet}catch(e){i._valueGet=void 0,i._valueSet=void 0}}});case"getemptymask":return this.data("_inputmask")?(s=this.data("_inputmask").masksets,l=this.data("_inputmask").activeMasksetIndex,s[l]._buffer.join("")):"";case"hasMaskedValue":return!!this.data("_inputmask")&&!this.data("_inputmask").opts.autoUnmask;case"isComplete":return s=this.data("_inputmask").masksets,l=this.data("_inputmask").activeMasksetIndex,r=this.data("_inputmask").opts,a(s,l,r,{action:"isComplete",buffer:this[0]._valueGet().split("")});case"getmetadata":return this.data("_inputmask")?(s=this.data("_inputmask").masksets,l=this.data("_inputmask").activeMasksetIndex,s[l].metadata):void 0;default:return i(t,o,r)||(r.mask=t),s=n(r),0==s.length?this:this.each(function(){a(e.extend(!0,{},s),l,r,{action:"mask",el:this})})}else{if("object"==typeof t)return r=e.extend(!0,{},e.inputmask.defaults,t),i(r.alias,t,r),s=n(r),0==s.length?this:this.each(function(){a(e.extend(!0,{},s),l,r,{action:"mask",el:this})});if(void 0==t)return this.each(function(){var t=e(this).attr("data-inputmask");if(t&&""!=t)try{t=t.replace(new RegExp("'","g"),'"');var n=e.parseJSON("{"+t+"}");e.extend(!0,n,o),i((r=e.extend(!0,{},e.inputmask.defaults,n)).alias,n,r),r.alias=void 0,e(this).inputmask(r)}catch(e){}})}}}}(jQuery),function(e){function t(e,t,a){var o=e[0],s=/er/.test(a)?v:/bl/.test(a)?f:u,r=a==m?{checked:o[u],disabled:o[f],indeterminate:"true"==e.attr(v)||"false"==e.attr(h)}:o[s];if(/^(ch|di|in)/.test(a)&&!r)i(e,s);else if(/^(un|en|de)/.test(a)&&r)n(e,s);else if(a==m)for(s in r)r[s]?i(e,s,!0):n(e,s,!0);else t&&"toggle"!=a||(t||e[y]("ifClicked"),r?o[g]!==c&&n(e,s):i(e,s))}function i(t,i,a){var m=t[0],y=t.parent(),x=i==u,_=i==v,w=i==f,P=_?h:x?p:"enabled",M=o(t,P+s(m[g])),S=o(t,i+s(m[g]));if(!0!==m[i]){if(!a&&i==u&&m[g]==c&&m.name){var E=t.closest("form"),A='input[name="'+m.name+'"]';(A=E.length?E.find(A):e(A)).each(function(){this!==m&&e(this).data(l)&&n(e(this),i)})}_?(m[i]=!0,m[u]&&n(t,u,"force")):(a||(m[i]=!0),x&&m[v]&&n(t,v,!1)),r(t,x,i,a)}m[f]&&o(t,C,!0)&&y.find("."+d).css(C,"default"),y[k](S||o(t,i)||""),w?y.attr("aria-disabled","true"):y.attr("aria-checked",_?"mixed":"true"),y[b](M||o(t,P)||"")}function n(e,t,i){var n=e[0],a=e.parent(),l=t==u,c=t==v,m=t==f,y=c?h:l?p:"enabled",x=o(e,y+s(n[g])),_=o(e,t+s(n[g]));!1!==n[t]&&(!c&&i&&"force"!=i||(n[t]=!1),r(e,l,y,i)),!n[f]&&o(e,C,!0)&&a.find("."+d).css(C,"pointer"),a[b](_||o(e,t)||""),m?a.attr("aria-disabled","false"):a.attr("aria-checked","false"),a[k](x||o(e,y)||"")}function a(t,i){t.data(l)&&(t.parent().html(t.attr("style",t.data(l).s||"")),i&&t[y](i),t.off(".i").unwrap(),e(x+'[for="'+t[0].id+'"]').add(t.closest(x)).off(".i"))}function o(e,t,i){if(e.data(l))return e.data(l).o[t+(i?"":"Class")]}function s(e){return e.charAt(0).toUpperCase()+e.slice(1)}function r(e,t,i,n){n||(t&&e[y]("ifToggled"),e[y]("ifChanged")[y]("if"+s(i)))}var l="iCheck",d=l+"-helper",c="radio",u="checked",p="un"+u,f="disabled",h="determinate",v="in"+h,m="update",g="type",k="addClass",b="removeClass",y="trigger",x="label",C="cursor",_=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);e.fn[l]=function(o,s){var r='input[type="checkbox"], input[type="'+c+'"]',p=e(),h=function(t){t.each(function(){var t=e(this);p=t.is(r)?p.add(t):p.add(t.find(r))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(o))return o=o.toLowerCase(),h(this),p.each(function(){var i=e(this);"destroy"==o?a(i,"ifDestroyed"):t(i,!0,o),e.isFunction(s)&&s()});if("object"!=typeof o&&o)return this;var C=e.extend({checkedClass:u,disabledClass:f,indeterminateClass:v,labelHover:!0,aria:!1},o),w=C.handle,P=C.hoverClass||"hover",M=C.focusClass||"focus",S=C.activeClass||"active",E=!!C.labelHover,A=C.labelHoverClass||"hover",j=0|(""+C.increaseArea).replace("%","");return"checkbox"!=w&&w!=c||(r='input[type="'+w+'"]'),-50>j&&(j=-50),h(this),p.each(function(){var o=e(this);a(o);var s=this,r=s.id,p={position:"absolute",top:h=-j+"%",left:h,display:"block",width:p=100+2*j+"%",height:p,margin:0,padding:0,background:"#fff",border:0,opacity:0},h=_?{position:"absolute",visibility:"hidden"}:j?p:{position:"absolute",opacity:0},v="checkbox"==s[g]?C.checkboxClass||"icheckbox":C.radioClass||"i"+c,w=e(x+'[for="'+r+'"]').add(o.closest(x)),I=!!C.aria,T=l+"-"+Math.random().toString(36).replace("0.",""),D='<div class="'+v+'" '+(I?'role="'+s[g]+'" ':"");w.length&&I&&w.each(function(){D+='aria-labelledby="',this.id?D+=this.id:(this.id=T,D+=T),D+='"'}),D=o.wrap(D+"/>")[y]("ifCreated").parent().append(C.insert),p=e('<ins class="'+d+'"/>').css(p).appendTo(D),o.data(l,{o:C,s:o.attr("style")}).css(h),C.inheritClass&&D[k](s.className||""),C.inheritID&&r&&D.attr("id",l+"-"+r),"static"==D.css("position")&&D.css("position","relative"),t(o,!0,m),w.length&&w.on("click.i mouseover.i mouseout.i touchbegin.i touchend.i",function(i){var n=i[g],a=e(this);if(!s[f]){if("click"==n){if(e(i.target).is("a"))return;t(o,!1,!0)}else E&&(/ut|nd/.test(n)?(D[b](P),a[b](A)):(D[k](P),a[k](A)));if(!_)return!1;i.stopPropagation()}}),o.on("click.i focus.i blur.i keyup.i keydown.i keypress.i",function(e){var t=e[g];return e=e.keyCode,"click"!=t&&("keydown"==t&&32==e?(s[g]==c&&s[u]||(s[u]?n(o,u):i(o,u)),!1):void("keyup"==t&&s[g]==c?!s[u]&&i(o,u):/us|ur/.test(t)&&D["blur"==t?b:k](M)))}),p.on("click mousedown mouseup mouseover mouseout touchbegin.i touchend.i",function(e){var i=e[g],n=/wn|up/.test(i)?S:P;if(!s[f]){if("click"==i?t(o,!1,!0):(/wn|er|in/.test(i)?D[k](n):D[b](n+" "+S),w.length&&E&&n==P&&w[/ut|nd/.test(i)?b:k](A)),!_)return!1;e.stopPropagation()}})})}}(window.jQuery||window.Zepto);