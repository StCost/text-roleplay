"use strict";(self.webpackChunktext_roleplay=self.webpackChunktext_roleplay||[]).push([[14,81,395,554],{6081:function(e,t,n){n.r(t);var r=n(1413),a=n(5987),o=n(2791),c=n(426),i=n(3824),l=["avatar","nickname","style"];t.default=function(e){var t=e.avatar,n=e.nickname,s=e.style,u=(0,a.Z)(e,l),f=(0,i.isURL)(t)?t:"";return(0,i.isURL)(t),o.createElement(c.Z,Object.assign({src:f,style:(0,r.Z)((0,r.Z)({},s),{},{backgroundColor:f?"transparent":(0,i.colorFromString)(n)})},u),n&&n)}},9395:function(e,t,n){n.r(t);var r=n(3144),a=n(5671),o=n(136),c=n(4062),i=n(2791),l=n(4964),s=n(3347),u=n(2622),f=(n(1554),n(6081)),m=n(2404),p=function(e){(0,o.Z)(n,e);var t=(0,c.Z)(n);function n(){var e;(0,a.Z)(this,n);for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return(e=t.call.apply(t,[this].concat(o))).getStats=function(){var t=e.props.item,n=t.type,r=t.armor,a=t.capacity;switch(n){case"wearable":return r;case"weapon":return a;default:var o=e.props.amount||e.props.item.amount;return!!(o&&o>=2)&&"".concat(o,"\u0448\u0442")}},e.labels={wearable:"\u0417\u0430\u0449\u0438\u0442\u0430",weapon:"\u041c\u0430\u0433\u0430\u0437\u0438\u043d"},e.getHeaderButton=function(){var t=e.props,n=t.footer,r=t.uid,a=e.props.item,o=a.failed,c=a.id;return o?i.createElement("div",{className:"item-header-button"},i.createElement(l.Z,{disabled:!r,onClick:function(){return m.default.removeItem({uid:r,id:c,all:!0})}},i.createElement(u.Z,null))):!!n&&i.createElement("div",{className:"item-header-button"},n)},e.render=function(){var t=e.props,n=t.disabled,r=t.item,a=r.name,o=void 0===a?r.id:a,c=r.price,l=void 0===c?0:c,u=r.description,m=r.image,p=r.effect,d=r.weight,v=void 0===d?0:d,h=r.type,y=r.approved,g=e.getStats();return i.createElement(s.Z,{className:"item ".concat(y&&!n?"":"disabled")},i.createElement("div",{className:"item-info"},i.createElement("div",{className:"item-name"},o,e.getHeaderButton()),i.createElement("div",{className:"item-subinfo"},i.createElement("div",{className:"item-price"},l>0&&"\u0426\u0435\u043d\u0430: ".concat(l)),i.createElement("div",{className:"item-weight"},v>0&&"\u0412\u0435\u0441: ".concat(v,"lb")))),(m||u)&&i.createElement("div",{className:"item-body"},m&&i.createElement("div",{className:"item-image"},i.createElement(f.default,{avatar:m,nickname:o,shape:"square"})),u),(g||p)&&i.createElement("div",{className:"item-prefooter"},i.createElement("div",{className:"item-ammo"},g?"".concat(e.labels[h]||"\u041a\u043e\u043b-\u0432\u043e",": ").concat(g):""),i.createElement("div",{className:"item-effect"},p)))},e}return(0,r.Z)(n)}(i.Component);t.default=p},1014:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var r=n(3144),a=n(5671),o=n(136),c=n(4062),i=n(2791),l=n(8327),s=n(4964),u=n(8321),f=n(9421),m={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M904 768H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8zm-25.3-608H145.3c-18.4 0-33.3 14.3-33.3 32v464c0 17.7 14.9 32 33.3 32h733.3c18.4 0 33.3-14.3 33.3-32V192c.1-17.7-14.8-32-33.2-32zM360 616H184V456h176v160zm0-224H184V232h176v160zm240 224H424V456h176v160zm0-224H424V232h176v160zm240 224H664V456h176v160zm0-224H664V232h176v160z"}}]},name:"insert-row-below",theme:"outlined"},p=n(4291),d=function(e,t){return i.createElement(p.Z,Object.assign({},e,{ref:t,icon:m}))};d.displayName="InsertRowBelowOutlined";var v=i.forwardRef(d),h=n(9395),y=function(e){(0,o.Z)(n,e);var t=(0,c.Z)(n);function n(){var e;(0,a.Z)(this,n);for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c];return(e=t.call.apply(t,[this].concat(o))).getFooter=function(t){var n=e.props.controls;if(n){var r=n.map((function(e){var n=e.label,r=e.onClick,a=(e.isAdmin,e.condition);return!(a&&!a(t))&&i.createElement(l.Z.Item,{key:n},i.createElement(s.Z,{onClick:function(){return r&&r(t)}},n))})).filter(Boolean);if(0!==r.length)return i.createElement(u.Z,{overlay:i.createElement(l.Z,null,r),trigger:["click"]},i.createElement(s.Z,null,i.createElement(v,null)))}},e.render=function(){var t=e.props,n=t.items,r=t.uid;return n&&0!==n.length?i.createElement("div",{className:"items-body"},n.map((function(t){return i.createElement(h.default,{key:t.id+t.time,item:t,footer:e.getFooter(t),uid:r})}))):i.createElement(f.Z,{description:"\u041d\u0435\u0442 \u043f\u0440\u0435\u0434\u043c\u0435\u0442\u043e\u0432"})},e}return(0,r.Z)(n)}(i.Component),g=y},2622:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(2791),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},o=n(4291),c=function(e,t){return r.createElement(o.Z,Object.assign({},e,{ref:t,icon:a}))};c.displayName="DeleteOutlined";var i=r.forwardRef(c)},426:function(e,t,n){n.d(t,{Z:function(){return g}});var r=n(2791),a=n(1694),o=n.n(a),c=n(9077),i=n(8782);function l(e){return l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s.apply(this,arguments)}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},p(e,t)}function d(e,t){return!t||"object"!==l(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function v(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}var y=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},g=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(b,e);var t,n,a,l,g=(t=b,function(){var e,n=h(t);if(v()){var r=h(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return d(this,e)});function b(){var e;return f(this,b),(e=g.apply(this,arguments)).state={scale:1,mounted:!1,isImgExist:!0},e.setScale=function(){if(e.avatarChildren&&e.avatarNode){var t=e.avatarChildren.offsetWidth,n=e.avatarNode.offsetWidth;0===t||0===n||e.lastChildrenWidth===t&&e.lastNodeWidth===n||(e.lastChildrenWidth=t,e.lastNodeWidth=n,e.setState({scale:n-8<t?(n-8)/t:1}))}},e.handleImgLoadError=function(){var t=e.props.onError;!1!==(t?t():void 0)&&e.setState({isImgExist:!1})},e.renderAvatar=function(t){var n,a,c=t.getPrefixCls,l=e.props,f=l.prefixCls,m=l.shape,p=l.size,d=l.src,v=l.srcSet,h=l.icon,g=l.className,b=l.alt,E=y(l,["prefixCls","shape","size","src","srcSet","icon","className","alt"]);(0,i.Z)(!("string"===typeof h&&h.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(h,"` at https://ant.design/components/icon"));var w=e.state,O=w.isImgExist,N=w.scale,Z=(w.mounted,c("avatar",f)),S=o()((u(n={},"".concat(Z,"-lg"),"large"===p),u(n,"".concat(Z,"-sm"),"small"===p),n)),C=o()(Z,g,S,(u(a={},"".concat(Z,"-").concat(m),m),u(a,"".concat(Z,"-image"),d&&O),u(a,"".concat(Z,"-icon"),h),a)),k="number"===typeof p?{width:p,height:p,lineHeight:"".concat(p,"px"),fontSize:h?p/2:18}:{},j=e.props.children;if(d&&O)j=r.createElement("img",{src:d,srcSet:v,onError:e.handleImgLoadError,alt:b});else if(h)j=h;else{if(e.avatarChildren||1!==N){var x="scale(".concat(N,") translateX(-50%)"),H={msTransform:x,WebkitTransform:x,transform:x},z="number"===typeof p?{lineHeight:"".concat(p,"px")}:{};j=r.createElement("span",{className:"".concat(Z,"-string"),ref:function(t){return e.avatarChildren=t},style:s(s({},z),H)},j)}else{j=r.createElement("span",{className:"".concat(Z,"-string"),style:{opacity:0},ref:function(t){return e.avatarChildren=t}},j)}}return r.createElement("span",s({},E,{style:s(s({},k),E.style),className:C,ref:function(t){return e.avatarNode=t}}),j)},e}return n=b,(a=[{key:"componentDidMount",value:function(){this.setScale(),this.setState({mounted:!0})}},{key:"componentDidUpdate",value:function(e){this.setScale(),e.src!==this.props.src&&this.setState({isImgExist:!0,scale:1})}},{key:"render",value:function(){return r.createElement(c.C,null,this.renderAvatar)}}])&&m(n.prototype,a),l&&m(n,l),b}(r.Component);g.defaultProps={shape:"circle",size:"default"}},1554:function(e,t,n){n.r(t),t.default={}}}]);
//# sourceMappingURL=14.992f30b8.chunk.js.map