(this["webpackJsonptext-roleplay"]=this["webpackJsonptext-roleplay"]||[]).push([[21,27],{252:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n(471),o=n(0),c=n.n(o),i=n(473),l=n(23);t.default=function(e){var t=e.avatar,n=e.nickname,o=e.style,u=Object(a.a)(e,["avatar","nickname","style"]),s=Object(l.isURL)(t)?t:"";return Object(l.isURL)(t),c.a.createElement(i.a,Object.assign({src:s,style:Object(r.a)(Object(r.a)({},o),{},{backgroundColor:s?"transparent":Object(l.colorFromString)(n)})},u),n&&n)}},263:function(e,t,n){"use strict";n.r(t);var r=n(26),a=n(48),o=n(196),c=n(50),i=n(49),l=n(0),u=n.n(l),s=n(507),f=n(72),p=n(484),d=n(476),h=n(34),m=n(478),y=n(101),b=n(446),v=n(445),g=n(516),C=n(458),k=n(55),O=n(252),E=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(){var e;Object(a.a)(this,n);for(var c=arguments.length,i=new Array(c),l=0;l<c;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).state={},e.labels={id:"ID",type:"\u0422\u0438\u043f*",name:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435*",weight:"\u0412\u0435\u0441",effect:"\u042d\u0444\u0444\u0435\u043a\u0442",image:"\u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430",description:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",price:"\u0426\u0435\u043d\u0430",capacity:"\u0420\u0430\u0437\u043c\u0435\u0440 \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u0430",armor:"\u0417\u0430\u0449\u0438\u0442\u0430",approved:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043d"},e.types=[{key:"weapon",value:"\u041e\u0440\u0443\u0436\u0438\u0435"},{key:"wearable",value:"\u041e\u0434\u0435\u0436\u0434\u0430/\u0411\u0440\u043e\u043d\u044f"},{key:"usable",value:"\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c\u043e\u0435"},{key:"ammo",value:"\u041f\u0430\u0442\u0440\u043e\u043d\u044b"},{key:"misc",value:"\u041f\u0440\u043e\u0447\u0435\u0435"},{key:"note",value:"\u0417\u0430\u043f\u0438\u0441\u043a\u0430"},{key:"key",value:"\u041a\u043b\u044e\u0447"},{key:"junk",value:"\u041c\u0443\u0441\u043e\u0440"}],e.onChange=function(t,n){return e.setState(Object(r.a)({},t,n))},e.clearImage=function(){return e.setState({image:""})},e.fields={id:function(){return!1},type:function(t,n){return u.a.createElement(s.a,{value:t,onChange:function(t){return e.onChange(n,t)}},e.types.map((function(e){var t=e.key,n=e.value;return u.a.createElement(s.a.Option,{value:t,key:t},n)})))},name:function(t,n){return u.a.createElement(f.a,{value:t,onChange:function(t){return e.onChange(n,t.currentTarget.value)}})},weight:function(t,n){return u.a.createElement(p.a,{value:t,min:0,precision:2,onChange:function(t){return e.onChange(n,t||0)},step:.01})},effect:function(t,n){return u.a.createElement(f.a,{value:t,onChange:function(t){return e.onChange(n,t.currentTarget.value)}})},image:function(t,n){return u.a.createElement("div",null,u.a.createElement("div",{style:{display:"flex"}},u.a.createElement(f.a,{value:t,onChange:function(t){return e.onChange(n,t.currentTarget.value)}}),u.a.createElement(d.a,{title:"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443?",onConfirm:e.clearImage,okText:"\u0414\u0430",cancelText:"\u041d\u0435\u0442",icon:u.a.createElement(g.a,{style:{color:"#ff4d4f"}})},u.a.createElement(h.a,{disabled:!t,danger:!0},u.a.createElement(g.a,null)))),u.a.createElement(O.default,{shape:"square",avatar:t,nickname:t,size:128,style:{margin:"8px auto",display:"block"}}))},description:function(t,n){return u.a.createElement(f.a.TextArea,{value:t,onChange:function(t){return e.onChange(n,t.currentTarget.value)}})},price:function(t,n){return u.a.createElement(p.a,{value:t,min:0,step:1,onChange:function(t){return e.onChange(n,t||0)}})},capacity:function(t,n,r){return"weapon"===r.type&&u.a.createElement(p.a,{value:t,min:1,step:1,onChange:function(t){return e.onChange(n,t||1)}})},armor:function(t,n,r){return"wearable"===r.type&&u.a.createElement(p.a,{value:t,min:0,step:1,onChange:function(t){return e.onChange(n,t||0)}})},approved:function(t,n){return e.props.isAdmin&&u.a.createElement(m.a,{checked:t,disabled:!e.props.isAdmin,onChange:function(t){return e.onChange(n,t)}})}},e.getField=function(t,n,r){var a=e.fields[t];return a&&a(n,t,r)},e.onSubmit=function(){var t=e.props.onSubmit,n={};Object.keys(k.defaultItem).forEach((function(t){n[t]=e.getValue(t)}));if("IItem"!==n.discriminator)return y.a.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u0433\u0435\u043d\u0435\u0440\u0430\u0446\u0438\u0438 \u043f\u0440\u0435\u0434\u043c\u0435\u0442\u0430!"),void console.error(n);n.name?(t(n),e.setState({})):y.a.error("\u0418\u043c\u044f \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c")},e.getValue=function(t){var n=Object(o.a)(e).state,r=e.props.item,a=n[t],c=r?r[t]:void 0,i=k.defaultItem[t];return void 0!==a?a:void 0!==c?c:i},e.content=function(){var t=Object(o.a)(e).state;return u.a.createElement("div",{className:"item-creator"},u.a.createElement("div",{className:"item-creator__body"},Object.keys(k.defaultItem).map((function(n){var r=e.getField(n,e.getValue(n),t);return r&&u.a.createElement(b.a,{className:n,key:n,title:e.labels[n]},r)}))),u.a.createElement("div",{className:"item-creator__controls"},u.a.createElement(d.a,{title:"\u0412\u0441\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u0431\u0443\u0434\u0443\u0442 \u043e\u0431\u043d\u0443\u043b\u0435\u043d\u044b",onConfirm:function(){return e.setState(k.defaultItem)},okText:"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",icon:u.a.createElement(g.a,{style:{color:"#ff4d4f"}})},u.a.createElement(h.a,null,"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c")),u.a.createElement(d.a,{title:"\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f?",onConfirm:e.onSubmit,okText:"\u0413\u043e\u0442\u043e\u0432\u043e",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",icon:u.a.createElement(g.a,{style:{color:"#15395b"}})},u.a.createElement(h.a,null,"\u0413\u043e\u0442\u043e\u0432\u043e"))))},e.render=function(){var t=e.props,n=t.onClose,r=t.visible;return u.a.createElement(v.a,{className:"item-creator-modal",centered:!0,closable:!1,onCancel:n,footer:null,visible:r,title:u.a.createElement(C.a,{onClick:n})},e.content())},e}return n}(l.Component);t.default=E},471:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}n.d(t,"a",(function(){return r}))},473:function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));var r=n(0),a=n(1),o=n.n(a),c=n(189),i=n(19);function l(e){return(l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(){return(u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e,t){return!t||"object"!==l(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var b=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},v=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(g,e);var t,n,a,l,v=(t=g,function(){var e,n=y(t);if(m()){var r=y(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return h(this,e)});function g(){var e;return f(this,g),(e=v.apply(this,arguments)).state={scale:1,mounted:!1,isImgExist:!0},e.setScale=function(){if(e.avatarChildren&&e.avatarNode){var t=e.avatarChildren.offsetWidth,n=e.avatarNode.offsetWidth;0===t||0===n||e.lastChildrenWidth===t&&e.lastNodeWidth===n||(e.lastChildrenWidth=t,e.lastNodeWidth=n,e.setState({scale:n-8<t?(n-8)/t:1}))}},e.handleImgLoadError=function(){var t=e.props.onError;!1!==(t?t():void 0)&&e.setState({isImgExist:!1})},e.renderAvatar=function(t){var n,a,c=t.getPrefixCls,l=e.props,f=l.prefixCls,p=l.shape,d=l.size,h=l.src,m=l.srcSet,y=l.icon,v=l.className,g=l.alt,C=b(l,["prefixCls","shape","size","src","srcSet","icon","className","alt"]);Object(i.a)(!("string"===typeof y&&y.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(y,"` at https://ant.design/components/icon"));var k=e.state,O=k.isImgExist,E=k.scale,j=(k.mounted,c("avatar",f)),w=o()((s(n={},"".concat(j,"-lg"),"large"===d),s(n,"".concat(j,"-sm"),"small"===d),n)),x=o()(j,v,w,(s(a={},"".concat(j,"-").concat(p),p),s(a,"".concat(j,"-image"),h&&O),s(a,"".concat(j,"-icon"),y),a)),S="number"===typeof d?{width:d,height:d,lineHeight:"".concat(d,"px"),fontSize:y?d/2:18}:{},P=e.props.children;if(h&&O)P=r.createElement("img",{src:h,srcSet:m,onError:e.handleImgLoadError,alt:g});else if(y)P=y;else{if(e.avatarChildren||1!==E){var N="scale(".concat(E,") translateX(-50%)"),I={msTransform:N,WebkitTransform:N,transform:N},_="number"===typeof d?{lineHeight:"".concat(d,"px")}:{};P=r.createElement("span",{className:"".concat(j,"-string"),ref:function(t){return e.avatarChildren=t},style:u(u({},_),I)},P)}else{P=r.createElement("span",{className:"".concat(j,"-string"),style:{opacity:0},ref:function(t){return e.avatarChildren=t}},P)}}return r.createElement("span",u({},C,{style:u(u({},S),C.style),className:x,ref:function(t){return e.avatarNode=t}}),P)},e}return n=g,(a=[{key:"componentDidMount",value:function(){this.setScale(),this.setState({mounted:!0})}},{key:"componentDidUpdate",value:function(e){this.setScale(),e.src!==this.props.src&&this.setState({isImgExist:!0,scale:1})}},{key:"render",value:function(){return r.createElement(c.a,null,this.renderAvatar)}}])&&p(n.prototype,a),l&&p(n,l),g}(r.Component);v.defaultProps={shape:"circle",size:"default"}},474:function(e,t,n){e.exports=n(475)},475:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(5),c=n.n(o),i=n(102);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=n(1),y=function(e){function t(e){var n,r,a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,a=f(t).call(this,e),n=!a||"object"!==typeof a&&"function"!==typeof a?d(r):a,h(d(d(n)),"handleClick",(function(e){var t=n.state.checked,r=n.props.onClick,a=!t;n.setChecked(a,e),r&&r(a,e)})),h(d(d(n)),"handleKeyDown",(function(e){37===e.keyCode?n.setChecked(!1,e):39===e.keyCode&&n.setChecked(!0,e)})),h(d(d(n)),"handleMouseUp",(function(e){var t=n.props.onMouseUp;n.node&&n.node.blur(),t&&t(e)})),h(d(d(n)),"saveNode",(function(e){n.node=e}));var o=!1;return o="checked"in e?!!e.checked:!!e.defaultChecked,n.state={checked:o},n}var n,r,o;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,e),n=t,o=[{key:"getDerivedStateFromProps",value:function(e){var t={},n=e.checked;return"checked"in e&&(t.checked=!!n),t}}],(r=[{key:"componentDidMount",value:function(){var e=this.props,t=e.autoFocus,n=e.disabled;t&&!n&&this.focus()}},{key:"setChecked",value:function(e,t){var n=this.props,r=n.disabled,a=n.onChange;r||("checked"in this.props||this.setState({checked:e}),a&&a(e,t))}},{key:"focus",value:function(){this.node.focus()}},{key:"blur",value:function(){this.node.blur()}},{key:"render",value:function(){var e,t=this.props,n=t.className,r=t.prefixCls,o=t.disabled,c=t.loadingIcon,i=t.checkedChildren,s=t.unCheckedChildren,f=u(t,["className","prefixCls","disabled","loadingIcon","checkedChildren","unCheckedChildren"]),p=this.state.checked,d=m((h(e={},n,!!n),h(e,r,!0),h(e,"".concat(r,"-checked"),p),h(e,"".concat(r,"-disabled"),o),e));return a.a.createElement("button",l({},f,{type:"button",role:"switch","aria-checked":p,disabled:o,className:d,ref:this.saveNode,onKeyDown:this.handleKeyDown,onClick:this.handleClick,onMouseUp:this.handleMouseUp}),c,a.a.createElement("span",{className:"".concat(r,"-inner")},p?i:s))}}])&&s(n.prototype,r),o&&s(n,o),t}(r.Component);y.propTypes={className:c.a.string,prefixCls:c.a.string,disabled:c.a.bool,checkedChildren:c.a.any,unCheckedChildren:c.a.any,onChange:c.a.func,onMouseUp:c.a.func,onClick:c.a.func,tabIndex:c.a.number,checked:c.a.bool,defaultChecked:c.a.bool,autoFocus:c.a.bool,loadingIcon:c.a.node},y.defaultProps={prefixCls:"rc-switch",checkedChildren:null,unCheckedChildren:null,className:"",defaultChecked:!1},Object(i.a)(y),t.default=y},478:function(e,t,n){"use strict";var r=n(0),a=n(474),o=n.n(a),c=n(1),i=n.n(c),l=n(14),u=n(41),s=n.n(u),f=n(192),p=n(189),d=n(33),h=n(19);function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=r.forwardRef((function(e,t){var n;Object(h.a)("checked"in e||!("value"in e),"Switch","`value` is not a valid prop, do you mean `checked`?");var a=e.prefixCls,c=e.size,u=e.loading,b=e.className,v=void 0===b?"":b,g=e.disabled,C=r.useContext(p.b),k=C.getPrefixCls,O=C.direction,E=r.useContext(d.b),j=k("switch",a),w=u?r.createElement(s.a,{className:"".concat(j,"-loading-icon")}):null,x=i()(v,(y(n={},"".concat(j,"-small"),"small"===(c||E)),y(n,"".concat(j,"-loading"),u),y(n,"".concat(j,"-rtl"),"rtl"===O),n));return r.createElement(f.a,{insertExtraNode:!0},r.createElement(o.a,m({},Object(l.a)(e,["loading"]),{prefixCls:j,className:x,disabled:g||u,ref:t,loadingIcon:w})))}));b.__ANT_SWITCH=!0,t.a=b}}]);
//# sourceMappingURL=21.d8a3e3db.chunk.js.map