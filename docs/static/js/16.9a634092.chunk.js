(this["webpackJsonptext-roleplay"]=this["webpackJsonptext-roleplay"]||[]).push([[16,18,24,40],{230:function(e,t,n){"use strict";n.r(t);var r=n(4),o=n(430),a=n(0),i=n.n(a),c=n(436),l=n(20);t.default=function(e){var t=e.avatar,n=e.nickname,a=e.style,s=Object(o.a)(e,["avatar","nickname","style"]),u=Object(l.isURL)(t)?t:"";return i.a.createElement(c.a,Object.assign({src:u,style:Object(r.a)(Object(r.a)({},a),{},{backgroundColor:u?"transparent":Object(l.colorFromString)(n)})},s),n&&n.substr(0,5))}},231:function(e,t,n){"use strict";n.r(t);var r=n(164),o=n(166),a=n(165),i=n(0),c=n.n(i),l=n(64),s=n(420),u=n(458),f=(n(422),n(230)),m=n(3),p=function(e){Object(o.a)(n,e);var t=Object(a.a)(n);function n(){var e;Object(r.a)(this,n);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).getStats=function(){var t=e.props.item,n=t.type,r=t.armor,o=t.capacity;switch(n){case"wearable":return r;case"weapon":return o;default:var a=e.props.amount||e.props.item.amount;return!!(a&&a>=2)&&"".concat(a,"\u0448\u0442")}},e.labels={wearable:"\u0417\u0430\u0449\u0438\u0442\u0430",weapon:"\u041c\u0430\u0433\u0430\u0437\u0438\u043d"},e.getFooter=function(){var t=e.props,n=t.footer,r=t.uid,o=e.props.item,a=o.failed,i=o.id;return a?c.a.createElement("div",{className:"item-footer"},c.a.createElement(l.a,{disabled:!r,onClick:function(){return m.default.removeItem({uid:r,id:i,all:!0})}},c.a.createElement(u.a,null))):!!n&&c.a.createElement("div",{className:"item-footer"},n)},e.render=function(){var t=e.props,n=t.disabled,r=t.item,o=r.name,a=void 0===o?r.id:o,i=r.price,l=void 0===i?0:i,u=r.description,m=r.image,p=r.effect,y=r.weight,d=void 0===y?0:y,b=r.type,v=r.approved,g=e.getStats();return c.a.createElement(s.a,{className:"item ".concat(v&&!n?"":"disabled")},c.a.createElement("div",{className:"item-info"},c.a.createElement("div",{className:"item-name"},a),c.a.createElement("div",{className:"item-subinfo"},c.a.createElement("div",{className:"item-price"},l>0&&"\u0426\u0435\u043d\u0430: ".concat(l)),c.a.createElement("div",{className:"item-weight"},d>0&&"\u0412\u0435\u0441: ".concat(d,"lb")))),(m||u)&&c.a.createElement("div",{className:"item-body"},m&&c.a.createElement("div",{className:"item-image"},c.a.createElement(f.default,{avatar:m,nickname:a,shape:"square"})),u),(g||p)&&c.a.createElement("div",{className:"item-prefooter"},c.a.createElement("div",{className:"item-ammo"},g?"".concat(e.labels[b]||"\u041a\u043e\u043b-\u0432\u043e",": ").concat(g):""),c.a.createElement("div",{className:"item-effect"},p)),e.getFooter())},e}return n}(i.Component);t.default=p},237:function(e,t,n){"use strict";n.r(t);var r=n(430),o=n(0),a=n.n(o),i=n(32),c=n(231),l=n(3);t.default=Object(i.b)((function(e,t){return{item:e.items.find((function(e){return e.id===t.id}))}}))((function(e){var t=e.id,n=e.item,o=Object(r.a)(e,["id","item"]);return n?a.a.createElement(c.default,Object.assign({item:n},o)):(l.default.getItemById({id:t}),a.a.createElement(a.a.Fragment,null))}))},422:function(e,t,n){},430:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}n.d(t,"a",(function(){return r}))},431:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(2),i=n.n(a),c=n(235),l=n(16),s=n(236);function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){m(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e){return(p="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e){return"object"===p(e)&&"string"===typeof e.name&&"string"===typeof e.theme&&("object"===p(e.icon)||"function"===typeof e.icon)}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.keys(e).reduce((function(t,n){var r=e[n];switch(n){case"class":t.className=r,delete t.class;break;default:t[n]=r}return t}),{})}function b(e){return Object(c.generate)(e)[0]}function v(e){return e?Array.isArray(e)?e:[e]:[]}var g="\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n",h=!1;function O(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var E={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};var S=function(e){var t,n,a=e.icon,i=e.className,c=e.onClick,u=e.style,m=e.primaryColor,p=e.secondaryColor,v=O(e,["icon","className","onClick","style","primaryColor","secondaryColor"]),j=E;if(m&&(j={primaryColor:m,secondaryColor:p||b(m)}),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g;Object(r.useEffect)((function(){h||(Object(s.insertCss)(e,{prepend:!0}),h=!0)}),[])}(),t=y(a),n="icon should be icon definiton, but got ".concat(a),Object(l.a)(t,"[@ant-design/icons] ".concat(n)),!y(a))return null;var C=a;return C&&"function"===typeof C.icon&&(C=w({},C,{icon:C.icon(j.primaryColor,j.secondaryColor)})),function e(t,n,r){return r?o.a.createElement(t.tag,f({key:n},d(t.attrs),{},r),(t.children||[]).map((function(r,o){return e(r,"".concat(n,"-").concat(t.tag,"-").concat(o))}))):o.a.createElement(t.tag,f({key:n},d(t.attrs)),(t.children||[]).map((function(r,o){return e(r,"".concat(n,"-").concat(t.tag,"-").concat(o))})))}(C.icon,"svg-".concat(C.name),w({className:i,onClick:c,style:u,"data-icon":C.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},v))};S.displayName="IconReact",S.getTwoToneColors=function(){return w({},E)},S.setTwoToneColors=function(e){var t=e.primaryColor,n=e.secondaryColor;E.primaryColor=t,E.secondaryColor=n||b(t),E.calculated=!!n};var k=S;function P(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(l){o=!0,a=l}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return N(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function x(e){var t=P(v(e),2),n=t[0],r=t[1];return k.setTwoToneColors({primaryColor:n,secondaryColor:r})}function I(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(l){o=!0,a=l}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return T(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return T(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function A(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}x("#1890ff");var D=r.forwardRef((function(e,t){var n,o,a,c=e.className,l=e.icon,s=e.spin,u=e.rotate,f=e.tabIndex,m=e.onClick,p=e.twoToneColor,y=A(e,["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"]),d=i()("anticon",(n={},o="anticon-".concat(l.name),a=Boolean(l.name),o in n?Object.defineProperty(n,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[o]=a,n),c),b=i()({"anticon-spin":!!s||"loading"===l.name}),g=f;void 0===g&&m&&(g=-1);var h=u?{msTransform:"rotate(".concat(u,"deg)"),transform:"rotate(".concat(u,"deg)")}:void 0,O=I(v(p),2),j=O[0],w=O[1];return r.createElement("span",Object.assign({role:"img","aria-label":l.name},y,{ref:t,tabIndex:g,onClick:m,className:d}),r.createElement(k,{className:b,icon:l,primaryColor:j,secondaryColor:w,style:h}))}));D.displayName="AntdIcon",D.getTwoToneColor=function(){var e=k.getTwoToneColors();return e.calculated?[e.primaryColor,e.secondaryColor]:e.primaryColor},D.setTwoToneColor=x;t.a=D},436:function(e,t,n){"use strict";n.d(t,"a",(function(){return g}));var r=n(0),o=n(2),a=n.n(o),i=n(229),c=n(17);function l(e){return(l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e,t){return!t||"object"!==l(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function b(e){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var v=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},g=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(h,e);var t,n,o,l,g=(t=h,function(){var e,n=b(t);if(d()){var r=b(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return y(this,e)});function h(){var e;return f(this,h),(e=g.apply(this,arguments)).state={scale:1,mounted:!1,isImgExist:!0},e.setScale=function(){if(e.avatarChildren&&e.avatarNode){var t=e.avatarChildren.offsetWidth,n=e.avatarNode.offsetWidth;0===t||0===n||e.lastChildrenWidth===t&&e.lastNodeWidth===n||(e.lastChildrenWidth=t,e.lastNodeWidth=n,e.setState({scale:n-8<t?(n-8)/t:1}))}},e.handleImgLoadError=function(){var t=e.props.onError;!1!==(t?t():void 0)&&e.setState({isImgExist:!1})},e.renderAvatar=function(t){var n,o,i=t.getPrefixCls,l=e.props,f=l.prefixCls,m=l.shape,p=l.size,y=l.src,d=l.srcSet,b=l.icon,g=l.className,h=l.alt,O=v(l,["prefixCls","shape","size","src","srcSet","icon","className","alt"]);Object(c.a)(!("string"===typeof b&&b.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(b,"` at https://ant.design/components/icon"));var j=e.state,w=j.isImgExist,C=j.scale,E=(j.mounted,i("avatar",f)),S=a()((u(n={},"".concat(E,"-lg"),"large"===p),u(n,"".concat(E,"-sm"),"small"===p),n)),k=a()(E,g,S,(u(o={},"".concat(E,"-").concat(m),m),u(o,"".concat(E,"-image"),y&&w),u(o,"".concat(E,"-icon"),b),o)),P="number"===typeof p?{width:p,height:p,lineHeight:"".concat(p,"px"),fontSize:b?p/2:18}:{},N=e.props.children;if(y&&w)N=r.createElement("img",{src:y,srcSet:d,onError:e.handleImgLoadError,alt:h});else if(b)N=b;else{if(e.avatarChildren||1!==C){var x="scale(".concat(C,") translateX(-50%)"),I={msTransform:x,WebkitTransform:x,transform:x},T="number"===typeof p?{lineHeight:"".concat(p,"px")}:{};N=r.createElement("span",{className:"".concat(E,"-string"),ref:function(t){return e.avatarChildren=t},style:s(s({},T),I)},N)}else{N=r.createElement("span",{className:"".concat(E,"-string"),style:{opacity:0},ref:function(t){return e.avatarChildren=t}},N)}}return r.createElement("span",s({},O,{style:s(s({},P),O.style),className:k,ref:function(t){return e.avatarNode=t}}),N)},e}return n=h,(o=[{key:"componentDidMount",value:function(){this.setScale(),this.setState({mounted:!0})}},{key:"componentDidUpdate",value:function(e){this.setScale(),e.src!==this.props.src&&this.setState({isImgExist:!0,scale:1})}},{key:"render",value:function(){return r.createElement(i.a,null,this.renderAvatar)}}])&&m(n.prototype,o),l&&m(n,l),h}(r.Component);g.defaultProps={shape:"circle",size:"default"}},458:function(e,t,n){"use strict";var r=n(0),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},a=n(431),i=function(e,t){return r.createElement(a.a,Object.assign({},e,{ref:t,icon:o}))};i.displayName="DeleteOutlined";t.a=r.forwardRef(i)}}]);
//# sourceMappingURL=16.9a634092.chunk.js.map