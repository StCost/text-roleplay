(self.webpackChunktext_roleplay=self.webpackChunktext_roleplay||[]).push([[950,81,549],{6081:function(e,t,n){"use strict";n.r(t);var r=n(1413),a=n(5987),o=n(2791),c=n(426),i=n(3824),l=["avatar","nickname","style"];t.default=function(e){var t=e.avatar,n=e.nickname,s=e.style,u=(0,a.Z)(e,l),f=(0,i.isURL)(t)?t:"";return(0,i.isURL)(t),o.createElement(c.Z,Object.assign({src:f,style:(0,r.Z)((0,r.Z)({},s),{},{backgroundColor:f?"transparent":(0,i.colorFromString)(n)})},u),n&&n)}},4950:function(e,t,n){"use strict";n.r(t),n.d(t,{Settings:function(){return U}});var r=n(4942),a=n(1413),o=n(3144),c=n(5671),i=n(136),l=n(4062),s=n(2791),u=n(4233),f=n(9271),d=n(2426),p=n.n(d),h=n(8183),m=n(4964),v=n(2756),y=n(1099),b=n(4469),g=n(2493),C=n(3924),k=n(3347),O=n(2871),E=n(2056),w=n(2414),S=(n(8549),n(2404)),x=n(1233),Z=n(6081),j=n(3824),P=n(5078),N=n(9638),U=function(e){(0,i.Z)(n,e);var t=(0,l.Z)(n);function n(){var e;(0,c.Z)(this,n);for(var o=arguments.length,i=new Array(o),l=0;l<o;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).state=x.defaultUser,e.componentDidMount=function(){var t=e.props,n=t.user,r=t.uid,a=t.currentUser,o=t.history;n?e.setState(n):S.default.getUser({uid:r}),(0,j.redirectToUserPage)(n,a,o),(0,N.addStatusChangeListener)("afk",e.onSave),(0,N.addStatusChangeListener)("offline",e.onSave)},e.componentDidUpdate=function(t){var n=e.props,r=n.user,a=n.currentUser,o=n.history;(0,j.redirectToUserPage)(r,a,o),e.props!==t&&e.setState(r)},e.componentWillUnmount=function(){(0,N.removeStatusChangeListener)("afk",e.onSave),e.onSave()},e.rawOnChange=function(t,n,o){var c=(0,a.Z)((0,a.Z)({},e.state),{},(0,r.Z)({},t,n));e.setState(c,(function(){return o&&e.onSave()}))},e.onSave=function(){var t=e.state,n=e.props.user;n&&t!==x.defaultUser&&Object.keys((0,O.diff)(t,n)).length>0&&e.setSettings(t)},e.onChange=function(t){return function(n){return e.rawOnChange(t,n.target.value)}},e.setSettings=function(t){var n=e.props.user;n&&S.default.setUser({uid:n.uid,user:t})},e.clearAvatar=function(){return e.setSettings((0,a.Z)((0,a.Z)({},e.props.user),{},{avatar:""}))},e.getField=function(t,n,r){var a=r.nickname,o=void 0===a?"":a,c=e.props,i=c.hasRight,l=c.currentUser,u=c.uid,f=!i;switch(t){case"avatar":return s.createElement("div",null,s.createElement("div",{style:{display:"flex"}},s.createElement(P.default,{placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",onChange:e.onChange(t),value:n,readOnly:f,onUpload:function(n){S.default.notify({message:"\u0424\u0430\u0439\u043b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d!"}),e.rawOnChange(t,n)}}),s.createElement(h.Z,{title:"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440?",onConfirm:e.clearAvatar,okText:"\u0414\u0430",cancelText:"\u041d\u0435\u0442",icon:s.createElement(E.Z,{style:{color:"#ff4d4f"}}),disabled:!n},s.createElement(m.Z,{disabled:f||!n,danger:!0},s.createElement(E.Z,null)))),s.createElement(Z.default,{avatar:n,nickname:o||u,size:128,style:{margin:"8px auto",display:"block"}}));case"uid":return s.createElement(v.Z,{value:n,readOnly:!0});case"lastOnline":return n?s.createElement(v.Z,{value:"".concat(p()(parseInt(n)).fromNow()," (").concat((0,j.getFullTime)(parseInt(n)),")"),readOnly:!0}):"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u0435\u0449\u0451 \u043d\u0435 \u0431\u044b\u043b \u0430\u043a\u0442\u0438\u0432\u0435\u043d";case"approved":return s.createElement(s.Fragment,null,i&&l&&l.uid!==u&&s.createElement(s.Fragment,null,s.createElement(y.Z,{checked:!!n,onChange:function(n){return e.rawOnChange(t,n)}})),n?"\u0410\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d":"\u041d\u0435 \u0430\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d");case"aiApiKey":var d="https://platform.openai.com/account/api-keys";return s.createElement(b.Z,{title:s.createElement("a",{href:d,target:"_blank",rel:"noreferrer"},d)},s.createElement(v.Z,{value:n,onChange:e.onChange(t)}));case"isAdmin":return s.createElement(s.Fragment,null,i&&l&&l.uid!==u&&s.createElement(s.Fragment,null,s.createElement(y.Z,{checked:!!n,onChange:function(n){return e.rawOnChange(t,n)}})),n?"\u0418\u043c\u0435\u044e\u0442\u0441\u044f":"\u041e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044e\u0442");case"zoom":return l&&l.uid===u&&s.createElement(b.Z,{title:"\u0412\u041d\u0418\u041c\u0410\u041d\u0418\u0415! \u0418\u0437\u043c\u0435\u043d\u044f\u044f \u0440\u0430\u0437\u043c\u0435\u0440, \u0432\u043d\u0435\u0448\u043d\u0438\u0439 \u0432\u0438\u0434 \u0441\u0442\u0440\u0430\u043d\u0438\u0446 \u043c\u043e\u0436\u0435\u0442 \u043a\u0430\u0440\u0434\u0438\u043d\u0430\u043b\u044c\u043d\u043e \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c\u0441\u044f, \u0430 \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u044b \u0441\u0442\u0430\u043d\u0443\u0442 \u043f\u0435\u0440\u0435\u043a\u0440\u044b\u0442\u044b \u0434\u0440\u0443\u0433\u0438\u043c\u0438 \u0438 \u0431\u0443\u0434\u0443\u0442 \u043d\u0435 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b. \u0418\u0437\u043c\u0435\u043d\u044f\u0439\u0442\u0435 \u043d\u0430 \u0441\u0432\u043e\u0439 \u0441\u0442\u0440\u0430\u0445 \u0438 \u0440\u0438\u0441\u043a"},s.createElement(g.Z,{max:200,min:50,value:parseInt(n),onChange:function(n){return void 0!==n&&e.rawOnChange(t,Math.min(200,Math.max(50,n||0)))},onBlur:function(){return e.onSave()},onPressEnter:function(){return e.onSave()}}));case"enableDisabledFeatures":return l&&l.uid===u&&s.createElement(s.Fragment,null,s.createElement(y.Z,{checked:!!n,onChange:function(n){return e.rawOnChange(t,n,!0)}})," ",n?"\u0410\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d\u044b":"\u0414\u0435\u0430\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d\u044b");case"notificationVolume":return l&&l.uid===u&&s.createElement(g.Z,{max:100,min:0,value:parseInt(n),onChange:function(n){return void 0!==n&&e.rawOnChange(t,Math.min(100,Math.max(0,n||0)))},onBlur:function(){return e.onSave()},onPressEnter:function(){return e.onSave()}});default:return s.createElement(v.Z,{value:n,onChange:e.onChange(t),readOnly:f})}},e.labels={avatar:"\u0410\u0432\u0430\u0442\u0430\u0440",nickname:"\u041d\u0438\u043a\u043d\u0435\u0439\u043c",lastOnline:"\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u044f\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c",isAdmin:"\u041f\u0440\u0430\u0432\u0430 \u0430\u0434\u043c\u0438\u043d\u0430",uid:"UID",approved:"\u0410\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d",aiApiKey:"OpenAI API key",zoom:"\u0420\u0430\u0437\u043c\u0435\u0440 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f %",enableDisabledFeatures:"\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0444\u0443\u043d\u043a\u0446\u0438\u0438",notificationVolume:"\u0413\u0440\u043e\u043c\u043a\u043e\u0441\u0442\u044c \u043e\u043f\u043e\u0432\u0435\u0449\u0435\u043d\u0438\u044f \u043e \u043d\u043e\u0432\u043e\u043c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0438"},e.getDeleteUser=function(){var t=e.props,n=t.currentUser,r=t.uid;return n&&n.isSuperAdmin&&s.createElement(k.Z,{title:"\u041f\u043e\u043b\u043d\u043e\u0435 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"},s.createElement(h.Z,{title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435. \u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?",onConfirm:function(){return C.Z.confirm({title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c?",content:"\u0412\u044b \u0442\u043e\u0447\u043d\u043e \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435? \u042d\u0442\u043e \u043d\u0435\u043b\u044c\u0437\u044f \u0431\u0443\u0434\u0435\u0442 \u043e\u0442\u043c\u0435\u043d\u0438\u0442\u044c. \u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0431\u0443\u0434\u0435\u0442 \u0442\u0430\u043a \u0436\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435 \u043e\u0431 \u0430\u0443\u0442\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u0438 \u0432 Firebase",okText:"",cancelText:"",onOk:function(e){S.default.fullDeleteUser({uid:r}),e()}})},okText:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430"},s.createElement(m.Z,null,"\u0423\u0434\u0430\u043b\u0438\u0442\u044c")))},e.render=function(){var t=e.state;return t.uid&&s.createElement(k.Z,{className:"settings",bordered:!1,loading:void 0===t,title:t&&s.createElement(s.Fragment,null,s.createElement(w.Z,null)," ","\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0438\u0433\u0440\u043e\u043a\u0430 ",t.nickname||t.uid)},Object.keys(x.defaultUser).map((function(n){var r=e.labels[n],a=e.getField(n,"".concat(t[n]||""),t);return r&&a&&s.createElement(k.Z,{className:n,key:n,title:r},a)})),e.getDeleteUser())},e}return(0,o.Z)(n)}(s.Component);t.default=(0,f.EN)((0,u.$j)(j.getStateUser)(U))},2056:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(2791),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6a25.95 25.95 0 0025.6 30.4h723c1.5 0 3-.1 4.4-.4a25.88 25.88 0 0021.2-30zM204 390h272V182h72v208h272v104H204V390zm468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z"}}]},name:"clear",theme:"outlined"},o=n(4291),c=function(e,t){return r.createElement(o.Z,Object.assign({},e,{ref:t,icon:a}))};c.displayName="ClearOutlined";var i=r.forwardRef(c)},426:function(e,t,n){"use strict";n.d(t,{Z:function(){return b}});var r=n(2791),a=n(1694),o=n.n(a),c=n(9077),i=n(8782);function l(e){return l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s.apply(this,arguments)}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},p(e,t)}function h(e,t){return!t||"object"!==l(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function m(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}var y=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},b=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(g,e);var t,n,a,l,b=(t=g,function(){var e,n=v(t);if(m()){var r=v(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return h(this,e)});function g(){var e;return f(this,g),(e=b.apply(this,arguments)).state={scale:1,mounted:!1,isImgExist:!0},e.setScale=function(){if(e.avatarChildren&&e.avatarNode){var t=e.avatarChildren.offsetWidth,n=e.avatarNode.offsetWidth;0===t||0===n||e.lastChildrenWidth===t&&e.lastNodeWidth===n||(e.lastChildrenWidth=t,e.lastNodeWidth=n,e.setState({scale:n-8<t?(n-8)/t:1}))}},e.handleImgLoadError=function(){var t=e.props.onError;!1!==(t?t():void 0)&&e.setState({isImgExist:!1})},e.renderAvatar=function(t){var n,a,c=t.getPrefixCls,l=e.props,f=l.prefixCls,d=l.shape,p=l.size,h=l.src,m=l.srcSet,v=l.icon,b=l.className,g=l.alt,C=y(l,["prefixCls","shape","size","src","srcSet","icon","className","alt"]);(0,i.Z)(!("string"===typeof v&&v.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(v,"` at https://ant.design/components/icon"));var k=e.state,O=k.isImgExist,E=k.scale,w=(k.mounted,c("avatar",f)),S=o()((u(n={},"".concat(w,"-lg"),"large"===p),u(n,"".concat(w,"-sm"),"small"===p),n)),x=o()(w,b,S,(u(a={},"".concat(w,"-").concat(d),d),u(a,"".concat(w,"-image"),h&&O),u(a,"".concat(w,"-icon"),v),a)),Z="number"===typeof p?{width:p,height:p,lineHeight:"".concat(p,"px"),fontSize:v?p/2:18}:{},j=e.props.children;if(h&&O)j=r.createElement("img",{src:h,srcSet:m,onError:e.handleImgLoadError,alt:g});else if(v)j=v;else{if(e.avatarChildren||1!==E){var P="scale(".concat(E,") translateX(-50%)"),N={msTransform:P,WebkitTransform:P,transform:P},U="number"===typeof p?{lineHeight:"".concat(p,"px")}:{};j=r.createElement("span",{className:"".concat(w,"-string"),ref:function(t){return e.avatarChildren=t},style:s(s({},U),N)},j)}else{j=r.createElement("span",{className:"".concat(w,"-string"),style:{opacity:0},ref:function(t){return e.avatarChildren=t}},j)}}return r.createElement("span",s({},C,{style:s(s({},Z),C.style),className:x,ref:function(t){return e.avatarNode=t}}),j)},e}return n=g,(a=[{key:"componentDidMount",value:function(){this.setScale(),this.setState({mounted:!0})}},{key:"componentDidUpdate",value:function(e){this.setScale(),e.src!==this.props.src&&this.setState({isImgExist:!0,scale:1})}},{key:"render",value:function(){return r.createElement(c.C,null,this.renderAvatar)}}])&&d(n.prototype,a),l&&d(n,l),g}(r.Component);b.defaultProps={shape:"circle",size:"default"}},8183:function(e,t,n){"use strict";n.d(t,{Z:function(){return y}});var r=n(2791),a=n(9901),o=n.n(a),c=n(4469),i=n(4964),l=n(3439),s=n(1104),u=n(9077),f=void 0;function d(){return d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},d.apply(this,arguments)}function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(l){a=!0,o=l}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}return n}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},v=r.forwardRef((function(e,t){var n=p(r.useState(e.visible),2),a=n[0],o=n[1];r.useEffect((function(){"visible"in e&&o(e.visible)}),[e.visible]),r.useEffect((function(){"defaultVisible"in e&&o(e.defaultVisible)}),[e.defaultVisible]);var h=function(t,n){"visible"in e||o(t),e.onVisibleChange&&e.onVisibleChange(t,n)},v=function(t){h(!1,t),e.onConfirm&&e.onConfirm.call(f,t)},y=function(t){h(!1,t),e.onCancel&&e.onCancel.call(f,t)},b=r.useContext(u.E_).getPrefixCls,g=e.prefixCls,C=e.placement,k=m(e,["prefixCls","placement"]),O=b("popover",g),E=r.createElement(l.Z,{componentName:"Popconfirm",defaultLocale:s.Z.Popconfirm},(function(t){return function(t,n){var a,o=e.okButtonProps,c=e.cancelButtonProps,l=e.title,s=e.cancelText,u=e.okText,f=e.okType,p=e.icon;return r.createElement("div",{className:"".concat(t,"-inner-content")},r.createElement("div",{className:"".concat(t,"-message")},p,r.createElement("div",{className:"".concat(t,"-message-title")},(a=l)?"function"===typeof a?a():a:null)),r.createElement("div",{className:"".concat(t,"-buttons")},r.createElement(i.Z,d({onClick:y,size:"small"},c),s||n.cancelText),r.createElement(i.Z,d({onClick:v,type:f,size:"small"},o),u||n.okText)))}(O,t)}));return r.createElement(c.Z,d({},k,{prefixCls:O,placement:C,onVisibleChange:function(t){e.disabled||h(t)},visible:a,overlay:E,ref:t}))}));v.defaultProps={transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary",icon:r.createElement(o(),null),disabled:!1};var y=v},1099:function(e,t,n){"use strict";var r=n(2791),a=n(718),o=n(1694),c=n.n(o),i=n(9),l=n(1329),s=n.n(l),u=n(345),f=n(9077),d=n(3081),p=n(8782);function h(){return h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},h.apply(this,arguments)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=r.forwardRef((function(e,t){var n;(0,p.Z)("checked"in e||!("value"in e),"Switch","`value` is not a valid prop, do you mean `checked`?");var o=e.prefixCls,l=e.size,v=e.loading,y=e.className,b=void 0===y?"":y,g=e.disabled,C=r.useContext(f.E_),k=C.getPrefixCls,O=C.direction,E=r.useContext(d.Z),w=k("switch",o),S=v?r.createElement(s(),{className:"".concat(w,"-loading-icon")}):null,x=c()(b,(m(n={},"".concat(w,"-small"),"small"===(l||E)),m(n,"".concat(w,"-loading"),v),m(n,"".concat(w,"-rtl"),"rtl"===O),n));return r.createElement(u.Z,{insertExtraNode:!0},r.createElement(a.default,h({},(0,i.Z)(e,["loading"]),{prefixCls:w,className:x,disabled:g||v,ref:t,loadingIcon:S})))}));v.__ANT_SWITCH=!0,t.Z=v},961:function(e,t,n){"use strict";var r=n(2791),a=n(2007),o=n.n(a),c=n(3688);function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i.apply(this,arguments)}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e){return u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},u(e)}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=n(1694),m=function(e){function t(e){var n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=function(e,t){return!t||"object"!==typeof t&&"function"!==typeof t?d(e):t}(this,u(t).call(this,e)),p(d(d(n)),"handleClick",(function(e){var t=n.state.checked,r=n.props.onClick,a=!t;n.setChecked(a,e),r&&r(a,e)})),p(d(d(n)),"handleKeyDown",(function(e){37===e.keyCode?n.setChecked(!1,e):39===e.keyCode&&n.setChecked(!0,e)})),p(d(d(n)),"handleMouseUp",(function(e){var t=n.props.onMouseUp;n.node&&n.node.blur(),t&&t(e)})),p(d(d(n)),"saveNode",(function(e){n.node=e}));var r=!1;return r="checked"in e?!!e.checked:!!e.defaultChecked,n.state={checked:r},n}var n,a,o;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,e),n=t,o=[{key:"getDerivedStateFromProps",value:function(e){var t={},n=e.checked;return"checked"in e&&(t.checked=!!n),t}}],(a=[{key:"componentDidMount",value:function(){var e=this.props,t=e.autoFocus,n=e.disabled;t&&!n&&this.focus()}},{key:"setChecked",value:function(e,t){var n=this.props,r=n.disabled,a=n.onChange;r||("checked"in this.props||this.setState({checked:e}),a&&a(e,t))}},{key:"focus",value:function(){this.node.focus()}},{key:"blur",value:function(){this.node.blur()}},{key:"render",value:function(){var e,t=this.props,n=t.className,a=t.prefixCls,o=t.disabled,c=t.loadingIcon,s=t.checkedChildren,u=t.unCheckedChildren,f=l(t,["className","prefixCls","disabled","loadingIcon","checkedChildren","unCheckedChildren"]),d=this.state.checked,m=h((p(e={},n,!!n),p(e,a,!0),p(e,"".concat(a,"-checked"),d),p(e,"".concat(a,"-disabled"),o),e));return r.createElement("button",i({},f,{type:"button",role:"switch","aria-checked":d,disabled:o,className:m,ref:this.saveNode,onKeyDown:this.handleKeyDown,onClick:this.handleClick,onMouseUp:this.handleMouseUp}),c,r.createElement("span",{className:"".concat(a,"-inner")},d?s:u))}}])&&s(n.prototype,a),o&&s(n,o),t}(r.Component);m.propTypes={className:o().string,prefixCls:o().string,disabled:o().bool,checkedChildren:o().any,unCheckedChildren:o().any,onChange:o().func,onMouseUp:o().func,onClick:o().func,tabIndex:o().number,checked:o().bool,defaultChecked:o().bool,autoFocus:o().bool,loadingIcon:o().node},m.defaultProps={prefixCls:"rc-switch",checkedChildren:null,unCheckedChildren:null,className:"",defaultChecked:!1},(0,c.O)(m),t.default=m},718:function(e,t,n){e.exports=n(961)},8549:function(e,t,n){"use strict";n.r(t),t.default={}}}]);
//# sourceMappingURL=950.ae946da2.chunk.js.map