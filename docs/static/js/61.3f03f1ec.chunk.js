"use strict";(self.webpackChunktext_roleplay=self.webpackChunktext_roleplay||[]).push([[61],{2351:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(2791),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"}}]},name:"upload",theme:"outlined"},i=n(4291),a=function(e,t){return r.createElement(i.Z,Object.assign({},e,{ref:t,icon:o}))};a.displayName="UploadOutlined";var c=r.forwardRef(a)},6776:function(e,t,n){n.d(t,{Z:function(){return ce}});var r=n(2791),o=n(2007),i=n.n(o),a=n(1694),c=n.n(a),l=n(9613),u=n.n(l),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var d=function(e){function t(){return p(this,t),y(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),s(t,[{key:"shouldComponentUpdate",value:function(e){return this.props.forceRender||!u()(this.props,e)}},{key:"render",value:function(){var e;if(this._isActived=this.props.forceRender||this._isActived||this.props.isActive,!this._isActived)return null;var t=this.props,n=t.prefixCls,o=t.isActive,i=t.children,a=t.destroyInactivePanel,l=t.forceRender,u=t.role,s=c()((f(e={},n+"-content",!0),f(e,n+"-content-active",o),f(e,n+"-content-inactive",!o),e)),p=l||o||!a?r.createElement("div",{className:n+"-content-box"},i):null;return r.createElement("div",{className:s,role:u},p)}}]),t}(r.Component);d.propTypes={prefixCls:i().string,isActive:i().bool,children:i().any,destroyInactivePanel:i().bool,forceRender:i().bool,role:i().string};var b=d,h=n(2795),v=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function O(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var w=function(e){function t(){var e,n,r;g(this,t);for(var o=arguments.length,i=Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=r=O(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),r.handleItemClick=function(){var e=r.props,t=e.onItemClick,n=e.panelKey;"function"===typeof t&&t(n)},r.handleKeyPress=function(e){"Enter"!==e.key&&13!==e.keyCode&&13!==e.which||r.handleItemClick()},O(r,n)}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),v(t,[{key:"shouldComponentUpdate",value:function(e){return!u()(this.props,e)}},{key:"render",value:function(){var e,t=this.props,n=t.className,o=t.id,i=t.style,a=t.prefixCls,l=t.header,u=t.headerClass,s=t.children,f=t.isActive,p=t.showArrow,y=t.destroyInactivePanel,d=t.disabled,v=t.accordion,g=t.forceRender,O=t.expandIcon,w=t.extra,C=c()(a+"-header",m({},u,u)),P=c()((m(e={},a+"-item",!0),m(e,a+"-item-active",f),m(e,a+"-item-disabled",d),e),n),x=r.createElement("i",{className:"arrow"});return p&&"function"===typeof O&&(x=O(this.props)),r.createElement("div",{className:P,style:i,id:o},r.createElement("div",{className:C,onClick:this.handleItemClick,role:v?"tab":"button",tabIndex:d?-1:0,"aria-expanded":""+f,onKeyPress:this.handleKeyPress},p&&x,l,w&&r.createElement("div",{className:a+"-extra"},w)),r.createElement(h.Z,{showProp:"isActive",exclusive:!0,component:"",animation:this.props.openAnimation},r.createElement(b,{prefixCls:a,isActive:f,destroyInactivePanel:y,forceRender:g,role:v?"tabpanel":null},s)))}}]),t}(r.Component);w.propTypes={className:i().oneOfType([i().string,i().object]),id:i().string,children:i().any,openAnimation:i().object,prefixCls:i().string,header:i().oneOfType([i().string,i().number,i().node]),headerClass:i().string,showArrow:i().bool,isActive:i().bool,onItemClick:i().func,style:i().object,destroyInactivePanel:i().bool,disabled:i().bool,accordion:i().bool,forceRender:i().bool,expandIcon:i().func,extra:i().node,panelKey:i().any},w.defaultProps={showArrow:!0,isActive:!1,destroyInactivePanel:!1,onItemClick:function(){},headerClass:"",forceRender:!1};var C=w,P=n(6465);function x(e,t,n,r){var o=void 0;return(0,P.Z)(e,n,{start:function(){t?(o=e.offsetHeight,e.style.height=0):e.style.height=e.offsetHeight+"px"},active:function(){e.style.height=(t?o:0)+"px"},end:function(){e.style.height="",r()}})}var j=function(e){return{enter:function(t,n){return x(t,!0,e+"-anim",n)},leave:function(t,n){return x(t,!1,e+"-anim",n)}}},E=n(7441),A=n(3688),_=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function k(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function I(e){var t=e;return Array.isArray(t)||(t=t?[t]:[]),t.map((function(e){return String(e)}))}var S=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));N.call(n);var r=e.activeKey,o=e.defaultActiveKey;return"activeKey"in e&&(o=r),n.state={openAnimation:e.openAnimation||j(e.prefixCls),activeKey:I(o)},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),_(t,[{key:"shouldComponentUpdate",value:function(e,t){return!u()(this.props,e)||!u()(this.state,t)}},{key:"render",value:function(){var e,t=this.props,n=t.prefixCls,o=t.className,i=t.style,a=t.accordion,l=c()((k(e={},n,!0),k(e,o,!!o),e));return r.createElement("div",{className:l,style:i,role:a?"tablist":null},this.getItems())}}],[{key:"getDerivedStateFromProps",value:function(e){var t={};return"activeKey"in e&&(t.activeKey=I(e.activeKey)),"openAnimation"in e&&(t.openAnimation=e.openAnimation),t.activeKey||t.openAnimation?t:null}}]),t}(r.Component),N=function(){var e=this;this.onClickItem=function(t){var n=e.state.activeKey;if(e.props.accordion)n=n[0]===t?[]:[t];else{var r=(n=[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(n))).indexOf(t);r>-1?n.splice(r,1):n.push(t)}e.setActiveKey(n)},this.getNewChild=function(t,n){if(!t)return null;var o=e.state.activeKey,i=e.props,a=i.prefixCls,c=i.accordion,l=i.destroyInactivePanel,u=i.expandIcon,s=t.key||String(n),f=t.props,p=f.header,y=f.headerClass,d=f.disabled,b={key:s,panelKey:s,header:p,headerClass:y,isActive:c?o[0]===s:o.indexOf(s)>-1,prefixCls:a,destroyInactivePanel:l,openAnimation:e.state.openAnimation,accordion:c,children:t.props.children,onItemClick:d?null:e.onClickItem,expandIcon:u};return"string"===typeof t.type?t:r.cloneElement(t,b)},this.getItems=function(){var t=e.props.children,n=(0,E.isFragment)(t)?t.props.children:t,o=r.Children.map(n,e.getNewChild);return(0,E.isFragment)(t)?r.createElement(r.Fragment,null,o):o},this.setActiveKey=function(t){"activeKey"in e.props||e.setState({activeKey:t}),e.props.onChange(e.props.accordion?t[0]:t)}};S.propTypes={children:i().any,prefixCls:i().string,activeKey:i().oneOfType([i().string,i().number,i().arrayOf(i().oneOfType([i().string,i().number]))]),defaultActiveKey:i().oneOfType([i().string,i().number,i().arrayOf(i().oneOfType([i().string,i().number]))]),openAnimation:i().object,onChange:i().func,accordion:i().bool,className:i().string,style:i().object,destroyInactivePanel:i().bool,expandIcon:i().func},S.defaultProps={prefixCls:"rc-collapse",onChange:function(){},accordion:!1,destroyInactivePanel:!1},S.Panel=C,(0,A.O)(S);var T=S,R=(S.Panel,n(7739)),K=n.n(R),Z=n(9077);function V(e){return V="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},V(e)}function H(){return H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},H.apply(this,arguments)}function z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function D(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function F(e,t){return F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},F(e,t)}function B(e,t){return!t||"object"!==V(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function M(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function L(e){return L=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},L(e)}var $=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(l,e);var t,n,o,i,a=(t=l,function(){var e,n=L(t);if(M()){var r=L(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return B(this,e)});function l(){var e;return D(this,l),(e=a.apply(this,arguments)).renderCollapsePanel=function(t){var n=t.getPrefixCls,o=e.props,i=o.prefixCls,a=o.className,l=void 0===a?"":a,u=o.showArrow,s=void 0===u||u,f=n("collapse",i),p=c()(z({},"".concat(f,"-no-arrow"),!s),l);return r.createElement(T.Panel,H({},e.props,{prefixCls:f,className:p}))},e}return n=l,(o=[{key:"render",value:function(){return r.createElement(Z.C,null,this.renderCollapsePanel)}}])&&U(n.prototype,o),i&&U(n,i),l}(r.Component),q=n(5475),G=n.n(q);function J(e,t,n){var r,o;return(0,P.Z)(e,"ant-motion-collapse-legacy",{start:function(){t?(r=e.offsetHeight,e.style.height="0px",e.style.opacity="0"):(e.style.height="".concat(e.offsetHeight,"px"),e.style.opacity="1")},active:function(){o&&G().cancel(o),o=G()((function(){e.style.height="".concat(t?r:0,"px"),e.style.opacity=t?"1":"0"}))},end:function(){o&&G().cancel(o),e.style.height="",e.style.opacity="",n()}})}var Q={enter:function(e,t){return J(e,!0,t)},leave:function(e,t){return J(e,!1,t)},appear:function(e,t){return J(e,!0,t)}};function W(e){return W="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},W(e)}function X(){return X=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},X.apply(this,arguments)}function Y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ee(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function te(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ne(e,t){return ne=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},ne(e,t)}function re(e,t){return!t||"object"!==W(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function oe(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function ie(e){return ie=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},ie(e)}var ae=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ne(e,t)}(l,e);var t,n,o,i,a=(t=l,function(){var e,n=ie(t);if(oe()){var r=ie(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return re(this,e)});function l(){var e;return ee(this,l),(e=a.apply(this,arguments)).renderExpandIcon=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0,o=e.props.expandIcon,i=o?o(t):r.createElement(K(),{rotate:t.isActive?90:void 0});return r.isValidElement(i)?r.cloneElement(i,{className:c()(i.props.className,"".concat(n,"-arrow"))}):i},e.renderCollapse=function(t){var n,o=t.getPrefixCls,i=t.direction,a=e.props,l=a.prefixCls,u=a.className,s=void 0===u?"":u,f=a.bordered,p=o("collapse",l),y=e.getIconPosition(i),d=c()((Y(n={},"".concat(p,"-borderless"),!f),Y(n,"".concat(p,"-icon-position-").concat(y),!0),Y(n,"".concat(p,"-rtl"),"rtl"===i),n),s),b=X(X({},Q),{appear:function(){}});return r.createElement(T,X({openAnimation:b},e.props,{expandIcon:function(t){return e.renderExpandIcon(t,p)},prefixCls:p,className:d}))},e}return n=l,o=[{key:"getIconPosition",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"ltr",t=this.props.expandIconPosition;return void 0!==t?t:"rtl"===e?"right":"left"}},{key:"render",value:function(){return r.createElement(Z.C,null,this.renderCollapse)}}],o&&te(n.prototype,o),i&&te(n,i),l}(r.Component);ae.Panel=$,ae.defaultProps={bordered:!0};var ce=ae},8183:function(e,t,n){n.d(t,{Z:function(){return v}});var r=n(2791),o=n(9901),i=n.n(o),a=n(4469),c=n(4964),l=n(3439),u=n(1104),s=n(9077),f=void 0;function p(){return p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},p.apply(this,arguments)}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(l){o=!0,i=l}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var b=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n},h=r.forwardRef((function(e,t){var n=y(r.useState(e.visible),2),o=n[0],i=n[1];r.useEffect((function(){"visible"in e&&i(e.visible)}),[e.visible]),r.useEffect((function(){"defaultVisible"in e&&i(e.defaultVisible)}),[e.defaultVisible]);var d=function(t,n){"visible"in e||i(t),e.onVisibleChange&&e.onVisibleChange(t,n)},h=function(t){d(!1,t),e.onConfirm&&e.onConfirm.call(f,t)},v=function(t){d(!1,t),e.onCancel&&e.onCancel.call(f,t)},m=r.useContext(s.E_).getPrefixCls,g=e.prefixCls,O=e.placement,w=b(e,["prefixCls","placement"]),C=m("popover",g),P=r.createElement(l.Z,{componentName:"Popconfirm",defaultLocale:u.Z.Popconfirm},(function(t){return function(t,n){var o,i=e.okButtonProps,a=e.cancelButtonProps,l=e.title,u=e.cancelText,s=e.okText,f=e.okType,y=e.icon;return r.createElement("div",{className:"".concat(t,"-inner-content")},r.createElement("div",{className:"".concat(t,"-message")},y,r.createElement("div",{className:"".concat(t,"-message-title")},(o=l)?"function"===typeof o?o():o:null)),r.createElement("div",{className:"".concat(t,"-buttons")},r.createElement(c.Z,p({onClick:v,size:"small"},a),u||n.cancelText),r.createElement(c.Z,p({onClick:h,type:f,size:"small"},i),s||n.okText)))}(C,t)}));return r.createElement(a.Z,p({},w,{prefixCls:C,placement:O,onVisibleChange:function(t){e.disabled||d(t)},visible:o,overlay:P,ref:t}))}));h.defaultProps={transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary",icon:r.createElement(i(),null),disabled:!1};var v=h}}]);
//# sourceMappingURL=61.3f03f1ec.chunk.js.map