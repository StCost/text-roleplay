(this["webpackJsonptext-roleplay"]=this["webpackJsonptext-roleplay"]||[]).push([[25],{254:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(420),c=n(436),i=n(64),s=n(3);e.default=function(){return a.a.createElement(o.a,null,a.a.createElement(c.a,{src:"https://cdn.lowgif.com/full/fc3d7d9abd06a92e-hi-bear-gifs-get-the-best-gif-on-giphy.gif",size:256,style:{margin:"0 auto",display:"block"}}),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement(i.a,{type:"primary",size:"large",onClick:function(){return s.default.logout({})},style:{width:"100%"}},"\u0412\u044b\u0439\u0442\u0438"))}},436:function(t,e,n){"use strict";n.d(e,"a",(function(){return g}));var r=n(0),a=n(2),o=n.n(a),c=n(229),i=n(17);function s(t){return(s="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function p(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(t,e){return(y=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t,e){return!e||"object"!==s(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function d(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var b=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(t);a<r.length;a++)e.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(t,r[a])&&(n[r[a]]=t[r[a]])}return n},g=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&y(t,e)}(v,t);var e,n,a,s,g=(e=v,function(){var t,n=m(e);if(d()){var r=m(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return h(this,t)});function v(){var t;return f(this,v),(t=g.apply(this,arguments)).state={scale:1,mounted:!1,isImgExist:!0},t.setScale=function(){if(t.avatarChildren&&t.avatarNode){var e=t.avatarChildren.offsetWidth,n=t.avatarNode.offsetWidth;0===e||0===n||t.lastChildrenWidth===e&&t.lastNodeWidth===n||(t.lastChildrenWidth=e,t.lastNodeWidth=n,t.setState({scale:n-8<e?(n-8)/e:1}))}},t.handleImgLoadError=function(){var e=t.props.onError;!1!==(e?e():void 0)&&t.setState({isImgExist:!1})},t.renderAvatar=function(e){var n,a,c=e.getPrefixCls,s=t.props,f=s.prefixCls,p=s.shape,y=s.size,h=s.src,d=s.srcSet,m=s.icon,g=s.className,v=s.alt,O=b(s,["prefixCls","shape","size","src","srcSet","icon","className","alt"]);Object(i.a)(!("string"===typeof m&&m.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(m,"` at https://ant.design/components/icon"));var E=t.state,S=E.isImgExist,w=E.scale,j=(E.mounted,c("avatar",f)),x=o()((u(n={},"".concat(j,"-lg"),"large"===y),u(n,"".concat(j,"-sm"),"small"===y),n)),P=o()(j,g,x,(u(a={},"".concat(j,"-").concat(p),p),u(a,"".concat(j,"-image"),h&&S),u(a,"".concat(j,"-icon"),m),a)),C="number"===typeof y?{width:y,height:y,lineHeight:"".concat(y,"px"),fontSize:m?y/2:18}:{},N=t.props.children;if(h&&S)N=r.createElement("img",{src:h,srcSet:d,onError:t.handleImgLoadError,alt:v});else if(m)N=m;else{if(t.avatarChildren||1!==w){var k="scale(".concat(w,") translateX(-50%)"),_={msTransform:k,WebkitTransform:k,transform:k},I="number"===typeof y?{lineHeight:"".concat(y,"px")}:{};N=r.createElement("span",{className:"".concat(j,"-string"),ref:function(e){return t.avatarChildren=e},style:l(l({},I),_)},N)}else{N=r.createElement("span",{className:"".concat(j,"-string"),style:{opacity:0},ref:function(e){return t.avatarChildren=e}},N)}}return r.createElement("span",l({},O,{style:l(l({},C),O.style),className:P,ref:function(e){return t.avatarNode=e}}),N)},t}return n=v,(a=[{key:"componentDidMount",value:function(){this.setScale(),this.setState({mounted:!0})}},{key:"componentDidUpdate",value:function(t){this.setScale(),t.src!==this.props.src&&this.setState({isImgExist:!0,scale:1})}},{key:"render",value:function(){return r.createElement(c.a,null,this.renderAvatar)}}])&&p(n.prototype,a),s&&p(n,s),v}(r.Component);g.defaultProps={shape:"circle",size:"default"}}}]);
//# sourceMappingURL=25.992fdec0.chunk.js.map