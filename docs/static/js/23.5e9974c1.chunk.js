(this["webpackJsonptext-roleplay"]=this["webpackJsonptext-roleplay"]||[]).push([[23],{234:function(e,n,t){"use strict";t.r(n);var r=t(164),o=t(435),a=t(166),i=t(165),c=t(0),l=t.n(c),s=t(596),u=t(457),f=function(e){Object(a.a)(t,e);var n=Object(i.a)(t);function t(){var e;Object(r.a)(this,t);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return(e=n.call.apply(n,[this].concat(a))).state={visible:!1},e.toggleModal=function(){e.setState({visible:!e.state.visible})},e}return Object(o.a)(t,[{key:"render",value:function(){var e=this.props,n=e.src,t=e.noTitle,r=void 0!==t&&t;return l.a.createElement(l.a.Fragment,null,l.a.createElement("img",{onClick:this.toggleModal,src:n,alt:"",className:"chat-image"}),l.a.createElement(s.a,{title:!r&&l.a.createElement("div",null,l.a.createElement("a",{href:n,target:"_blank",rel:"noopener noreferrer"},n),l.a.createElement(u.a,{onClick:this.toggleModal})),className:"image-modal",closable:!1,footer:null,visible:this.state.visible,onCancel:this.toggleModal,width:"fit-content"},l.a.createElement("img",{style:{maxWidth:"100%"},src:n,alt:""})))}}]),t}(c.Component);n.default=f},431:function(e,n,t){"use strict";var r=t(0),o=t.n(r),a=t(2),i=t.n(a),c=t(235),l=t(16),s=t(236);function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){y(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function y(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function b(e){return(b="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e){return"object"===b(e)&&"string"===typeof e.name&&"string"===typeof e.theme&&("object"===b(e.icon)||"function"===typeof e.icon)}function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.keys(e).reduce((function(n,t){var r=e[t];switch(t){case"class":n.className=r,delete n.class;break;default:n[t]=r}return n}),{})}function d(e){return Object(c.generate)(e)[0]}function g(e){return e?Array.isArray(e)?e:[e]:[]}var v="\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n",O=!1;function h(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function j(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function w(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?j(Object(t),!0).forEach((function(n){C(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):j(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function C(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var k={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};var S=function(e){var n,t,a=e.icon,i=e.className,c=e.onClick,u=e.style,y=e.primaryColor,b=e.secondaryColor,g=h(e,["icon","className","onClick","style","primaryColor","secondaryColor"]),j=k;if(y&&(j={primaryColor:y,secondaryColor:b||d(y)}),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v;Object(r.useEffect)((function(){O||(Object(s.insertCss)(e,{prepend:!0}),O=!0)}),[])}(),n=m(a),t="icon should be icon definiton, but got ".concat(a),Object(l.a)(n,"[@ant-design/icons] ".concat(t)),!m(a))return null;var C=a;return C&&"function"===typeof C.icon&&(C=w({},C,{icon:C.icon(j.primaryColor,j.secondaryColor)})),function e(n,t,r){return r?o.a.createElement(n.tag,f({key:t},p(n.attrs),{},r),(n.children||[]).map((function(r,o){return e(r,"".concat(t,"-").concat(n.tag,"-").concat(o))}))):o.a.createElement(n.tag,f({key:t},p(n.attrs)),(n.children||[]).map((function(r,o){return e(r,"".concat(t,"-").concat(n.tag,"-").concat(o))})))}(C.icon,"svg-".concat(C.name),w({className:i,onClick:c,style:u,"data-icon":C.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},g))};S.displayName="IconReact",S.getTwoToneColors=function(){return w({},k)},S.setTwoToneColors=function(e){var n=e.primaryColor,t=e.secondaryColor;k.primaryColor=n,k.secondaryColor=t||d(n),k.calculated=!!t};var E=S;function P(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(t.push(i.value),!n||t.length!==n);r=!0);}catch(l){o=!0,a=l}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return t}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return x(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return x(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function T(e){var n=P(g(e),2),t=n[0],r=n[1];return E.setTwoToneColors({primaryColor:t,secondaryColor:r})}function A(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(t.push(i.value),!n||t.length!==n);r=!0);}catch(l){o=!0,a=l}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return t}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return I(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return I(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function N(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}T("#1890ff");var D=r.forwardRef((function(e,n){var t,o,a,c=e.className,l=e.icon,s=e.spin,u=e.rotate,f=e.tabIndex,y=e.onClick,b=e.twoToneColor,m=N(e,["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"]),p=i()("anticon",(t={},o="anticon-".concat(l.name),a=Boolean(l.name),o in t?Object.defineProperty(t,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[o]=a,t),c),d=i()({"anticon-spin":!!s||"loading"===l.name}),v=f;void 0===v&&y&&(v=-1);var O=u?{msTransform:"rotate(".concat(u,"deg)"),transform:"rotate(".concat(u,"deg)")}:void 0,h=A(g(b),2),j=h[0],w=h[1];return r.createElement("span",Object.assign({role:"img","aria-label":l.name},m,{ref:n,tabIndex:v,onClick:y,className:p}),r.createElement(E,{className:d,icon:l,primaryColor:j,secondaryColor:w,style:O}))}));D.displayName="AntdIcon",D.getTwoToneColor=function(){var e=E.getTwoToneColors();return e.calculated?[e.primaryColor,e.secondaryColor]:e.primaryColor},D.setTwoToneColor=T;n.a=D},435:function(e,n,t){"use strict";function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function o(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}t.d(n,"a",(function(){return o}))},457:function(e,n,t){"use strict";var r=t(0),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"}}]},name:"close",theme:"outlined"},a=t(431),i=function(e,n){return r.createElement(a.a,Object.assign({},e,{ref:n,icon:o}))};i.displayName="CloseOutlined";n.a=r.forwardRef(i)}}]);
//# sourceMappingURL=23.5e9974c1.chunk.js.map