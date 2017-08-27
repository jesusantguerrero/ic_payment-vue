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