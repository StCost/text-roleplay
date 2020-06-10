(this["webpackJsonptext-roleplay"]=this["webpackJsonptext-roleplay"]||[]).push([[8,27,30,46],{155:function(e,t,n){"use strict";n.r(t),n.d(t,"Settings",(function(){return D}));var r=n(26),a=n(2),o=n(49),c=n(51),i=n(50),l=n(0),s=n.n(l),u=n(37),f=n(27),d=n(148),p=n.n(d),h=n(479),b=n(34),m=n(72),v=n(481),y=n(150),g=n(487),O=n(446),k=n(447),C=n(185),j=n(519),E=n(456),w=(n(471),n(4)),S=n(43),x=n(253),P=n(23),U=n(259),N=n(120),D=function(e){Object(c.a)(n,e);var t=Object(i.a)(n);function n(){var e;Object(o.a)(this,n);for(var c=arguments.length,i=new Array(c),l=0;l<c;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).state=S.defaultUser,e.componentDidMount=function(){var t=e.props,n=t.user,r=t.uid,a=t.currentUser,o=t.history;n?e.setState(n):w.default.getUser({uid:r}),Object(P.redirectToUserPage)(n,a,o),Object(N.addStatusChangeListener)("afk",e.onSave),Object(N.addStatusChangeListener)("offline",e.onSave)},e.componentDidUpdate=function(t){var n=e.props,r=n.user,a=n.currentUser,o=n.history;Object(P.redirectToUserPage)(r,a,o),e.props!==t&&e.setState(r)},e.componentWillUnmount=function(){Object(N.removeStatusChangeListener)("afk",e.onSave),e.onSave()},e.rawOnChange=function(t,n,o){var c=Object(a.a)(Object(a.a)({},e.state),{},Object(r.a)({},t,n));e.setState(c,(function(){return o&&e.onSave()}))},e.onSave=function(){var t=e.state,n=e.props.user;n&&t!==S.defaultUser&&Object.keys(Object(C.diff)(t,n)).length>0&&e.setSettings(t)},e.onChange=function(t){return function(n){return e.rawOnChange(t,n.target.value)}},e.setSettings=function(t){var n=e.props.user;n&&w.default.setUser({uid:n.uid,user:t})},e.clearAvatar=function(){return e.setSettings(Object(a.a)(Object(a.a)({},e.props.user),{},{avatar:""}))},e.getField=function(t,n,r){var a=r.nickname,o=void 0===a?"":a,c=e.props,i=c.hasRight,l=c.currentUser,u=c.uid,f=!i;switch(t){case"avatar":return s.a.createElement("div",null,s.a.createElement("div",{style:{display:"flex"}},s.a.createElement(U.default,{placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",onChange:e.onChange(t),value:n,readOnly:f,onUpload:function(n){w.default.notify({message:"\u0424\u0430\u0439\u043b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d!"}),e.rawOnChange(t,n)}}),s.a.createElement(h.a,{title:"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440?",onConfirm:e.clearAvatar,okText:"\u0414\u0430",cancelText:"\u041d\u0435\u0442",icon:s.a.createElement(j.a,{style:{color:"#ff4d4f"}}),disabled:!n},s.a.createElement(b.a,{disabled:f||!n,danger:!0},s.a.createElement(j.a,null)))),s.a.createElement(x.default,{avatar:n,nickname:o||u,size:128,style:{margin:"8px auto",display:"block"}}));case"uid":return s.a.createElement(m.a,{value:n,readOnly:!0});case"lastOnline":return n?s.a.createElement(m.a,{value:"".concat(p()(parseInt(n)).fromNow()," (").concat(Object(P.getFullTime)(parseInt(n)),")"),readOnly:!0}):"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u0435\u0449\u0451 \u043d\u0435 \u0431\u044b\u043b \u0430\u043a\u0442\u0438\u0432\u0435\u043d";case"approved":return s.a.createElement(s.a.Fragment,null,i&&l&&l.uid!==u&&s.a.createElement(s.a.Fragment,null,s.a.createElement(v.a,{checked:!!n,onChange:function(n){return e.rawOnChange(t,n)}})),n?"\u0410\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d":"\u041d\u0435 \u0430\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d");case"isAdmin":return s.a.createElement(s.a.Fragment,null,i&&l&&l.uid!==u&&s.a.createElement(s.a.Fragment,null,s.a.createElement(v.a,{checked:!!n,onChange:function(n){return e.rawOnChange(t,n)}})),n?"\u0418\u043c\u0435\u044e\u0442\u0441\u044f":"\u041e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044e\u0442");case"zoom":return l&&l.uid===u&&s.a.createElement(y.a,{title:"\u0412\u041d\u0418\u041c\u0410\u041d\u0418\u0415! \u0418\u0437\u043c\u0435\u043d\u044f\u044f \u0440\u0430\u0437\u043c\u0435\u0440, \u0432\u043d\u0435\u0448\u043d\u0438\u0439 \u0432\u0438\u0434 \u0441\u0442\u0440\u0430\u043d\u0438\u0446 \u043c\u043e\u0436\u0435\u0442 \u043a\u0430\u0440\u0434\u0438\u043d\u0430\u043b\u044c\u043d\u043e \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c\u0441\u044f, \u0430 \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u044b \u0441\u0442\u0430\u043d\u0443\u0442 \u043f\u0435\u0440\u0435\u043a\u0440\u044b\u0442\u044b \u0434\u0440\u0443\u0433\u0438\u043c\u0438 \u0438 \u0431\u0443\u0434\u0443\u0442 \u043d\u0435 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b. \u0418\u0437\u043c\u0435\u043d\u044f\u0439\u0442\u0435 \u043d\u0430 \u0441\u0432\u043e\u0439 \u0441\u0442\u0440\u0430\u0445 \u0438 \u0440\u0438\u0441\u043a"},s.a.createElement(g.a,{max:200,min:50,value:parseInt(n),onChange:function(n){return void 0!==n&&e.rawOnChange(t,n||0)},onBlur:function(){return e.onSave()},onPressEnter:function(){return e.onSave()}}));case"enableDisabledFeatures":return l&&l.uid===u&&s.a.createElement(s.a.Fragment,null,s.a.createElement(v.a,{checked:!!n,onChange:function(n){return e.rawOnChange(t,n,!0)}})," ",n?"\u0410\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d\u044b":"\u0414\u0435\u0430\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d\u044b");default:return s.a.createElement(m.a,{value:n,onChange:e.onChange(t),readOnly:f})}},e.labels={avatar:"\u0410\u0432\u0430\u0442\u0430\u0440",nickname:"\u041d\u0438\u043a\u043d\u0435\u0439\u043c",lastOnline:"\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u044f\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c",isAdmin:"\u041f\u0440\u0430\u0432\u0430 \u0430\u0434\u043c\u0438\u043d\u0430",uid:"UID",approved:"\u0410\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d",zoom:"\u0420\u0430\u0437\u043c\u0435\u0440 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f %",enableDisabledFeatures:"\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0444\u0443\u043d\u043a\u0446\u0438\u0438"},e.getDeleteUser=function(){var t=e.props,n=t.currentUser,r=t.uid;return n&&n.isSuperAdmin&&s.a.createElement(k.a,{title:"\u041f\u043e\u043b\u043d\u043e\u0435 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f"},s.a.createElement(h.a,{title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435. \u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?",onConfirm:function(){return O.a.confirm({title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c?",content:"\u0412\u044b \u0442\u043e\u0447\u043d\u043e \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0432\u0441\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435? \u042d\u0442\u043e \u043d\u0435\u043b\u044c\u0437\u044f \u0431\u0443\u0434\u0435\u0442 \u043e\u0442\u043c\u0435\u043d\u0438\u0442\u044c. \u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0431\u0443\u0434\u0435\u0442 \u0442\u0430\u043a \u0436\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435 \u043e\u0431 \u0430\u0443\u0442\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u0438 \u0432 Firebase",okText:"",cancelText:"",onOk:function(e){w.default.fullDeleteUser({uid:r}),e()}})},okText:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430"},s.a.createElement(b.a,null,"\u0423\u0434\u0430\u043b\u0438\u0442\u044c")))},e.render=function(){var t=e.state;return t.uid&&s.a.createElement(k.a,{className:"settings",bordered:!1,loading:void 0===t,title:t&&s.a.createElement(s.a.Fragment,null,s.a.createElement(E.a,null)," ","\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0438\u0433\u0440\u043e\u043a\u0430 ",t.nickname||t.uid)},Object.keys(S.defaultUser).map((function(n){var r=e.labels[n],a=e.getField(n,"".concat(t[n]||""),t);return r&&a&&s.a.createElement(k.a,{className:n,key:n,title:r},a)})),e.getDeleteUser())},e}return n}(s.a.Component);t.default=Object(f.g)(Object(u.b)(P.getStateUser)(D))},253:function(e,t,n){"use strict";n.r(t);var r=n(2),a=n(474),o=n(0),c=n.n(o),i=n(476),l=n(23);t.default=function(e){var t=e.avatar,n=e.nickname,o=e.style,s=Object(a.a)(e,["avatar","nickname","style"]),u=Object(l.isURL)(t)?t:"";return Object(l.isURL)(t),c.a.createElement(i.a,Object.assign({src:u,style:Object(r.a)(Object(r.a)({},o),{},{backgroundColor:u?"transparent":Object(l.colorFromString)(n)})},s),n&&n)}},259:function(e,t,n){"use strict";n.r(t);var r=n(474),a=n(49),o=n(51),c=n(50),i=n(0),l=n.n(i),s=n(446),u=n(101),f=n(72),d=n(104),p=n(4),h=function(e){Object(o.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(a.a)(this,n);for(var o=arguments.length,c=new Array(o),i=0;i<o;i++)c[i]=arguments[i];return(e=t.call.apply(t,[this].concat(c))).uploadFile=function(t,n){if(t){if(t.type.indexOf("image")>-1)if(FileReader){var r=new FileReader;r.onload=function(n){n.target&&n.target.result&&"string"===typeof n.target.result&&s.a.confirm({title:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435?",content:l.a.createElement(d.default,{src:n.target.result,noTitle:!0}),onOk:function(n){n(),p.default.uploadFile({file:t,onFinish:function(t){return e.props.onUpload(t)}})},okText:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",maskClosable:!0,centered:!0})},r.readAsDataURL(t)}else u.a.error("\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u043e\u043c");else u.a.error("\u0422\u043e\u043b\u044c\u043a\u043e \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0438 \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u044b");n.preventDefault()}},e.onPaste=function(t){e.uploadFile(t.clipboardData.files[0],t)},e.onDrop=function(t){var n=t.dataTransfer.items[0].getAsFile();n&&e.uploadFile(n,t)},e.render=function(){var t=e.props,n=t.textArea,a=(t.onUpload,Object(r.a)(t,["textArea","onUpload"]));return n?l.a.createElement(f.a.TextArea,Object.assign({},a,{onPaste:e.onPaste,onDrop:e.onDrop})):l.a.createElement(f.a,Object.assign({},a,{onPaste:e.onPaste,onDrop:e.onDrop}))},e}return n}(i.Component);t.default=h},471:function(e,t,n){},474:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}n.d(t,"a",(function(){return r}))},476:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));var r=n(0),a=n(1),o=n.n(a),c=n(190),i=n(19);function l(e){return(l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e,t){return!t||"object"!==l(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function b(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var v=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},y=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(g,e);var t,n,a,l,y=(t=g,function(){var e,n=m(t);if(b()){var r=m(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return h(this,e)});function g(){var e;return f(this,g),(e=y.apply(this,arguments)).state={scale:1,mounted:!1,isImgExist:!0},e.setScale=function(){if(e.avatarChildren&&e.avatarNode){var t=e.avatarChildren.offsetWidth,n=e.avatarNode.offsetWidth;0===t||0===n||e.lastChildrenWidth===t&&e.lastNodeWidth===n||(e.lastChildrenWidth=t,e.lastNodeWidth=n,e.setState({scale:n-8<t?(n-8)/t:1}))}},e.handleImgLoadError=function(){var t=e.props.onError;!1!==(t?t():void 0)&&e.setState({isImgExist:!1})},e.renderAvatar=function(t){var n,a,c=t.getPrefixCls,l=e.props,f=l.prefixCls,d=l.shape,p=l.size,h=l.src,b=l.srcSet,m=l.icon,y=l.className,g=l.alt,O=v(l,["prefixCls","shape","size","src","srcSet","icon","className","alt"]);Object(i.a)(!("string"===typeof m&&m.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(m,"` at https://ant.design/components/icon"));var k=e.state,C=k.isImgExist,j=k.scale,E=(k.mounted,c("avatar",f)),w=o()((u(n={},"".concat(E,"-lg"),"large"===p),u(n,"".concat(E,"-sm"),"small"===p),n)),S=o()(E,y,w,(u(a={},"".concat(E,"-").concat(d),d),u(a,"".concat(E,"-image"),h&&C),u(a,"".concat(E,"-icon"),m),a)),x="number"===typeof p?{width:p,height:p,lineHeight:"".concat(p,"px"),fontSize:m?p/2:18}:{},P=e.props.children;if(h&&C)P=r.createElement("img",{src:h,srcSet:b,onError:e.handleImgLoadError,alt:g});else if(m)P=m;else{if(e.avatarChildren||1!==j){var U="scale(".concat(j,") translateX(-50%)"),N={msTransform:U,WebkitTransform:U,transform:U},D="number"===typeof p?{lineHeight:"".concat(p,"px")}:{};P=r.createElement("span",{className:"".concat(E,"-string"),ref:function(t){return e.avatarChildren=t},style:s(s({},D),N)},P)}else{P=r.createElement("span",{className:"".concat(E,"-string"),style:{opacity:0},ref:function(t){return e.avatarChildren=t}},P)}}return r.createElement("span",s({},O,{style:s(s({},x),O.style),className:S,ref:function(t){return e.avatarNode=t}}),P)},e}return n=g,(a=[{key:"componentDidMount",value:function(){this.setScale(),this.setState({mounted:!0})}},{key:"componentDidUpdate",value:function(e){this.setScale(),e.src!==this.props.src&&this.setState({isImgExist:!0,scale:1})}},{key:"render",value:function(){return r.createElement(c.a,null,this.renderAvatar)}}])&&d(n.prototype,a),l&&d(n,l),g}(r.Component);y.defaultProps={shape:"circle",size:"default"}},477:function(e,t,n){e.exports=n(478)},478:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(5),c=n.n(o),i=n(102);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=n(1),m=function(e){function t(e){var n,r,a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),r=this,a=f(t).call(this,e),n=!a||"object"!==typeof a&&"function"!==typeof a?p(r):a,h(p(p(n)),"handleClick",(function(e){var t=n.state.checked,r=n.props.onClick,a=!t;n.setChecked(a,e),r&&r(a,e)})),h(p(p(n)),"handleKeyDown",(function(e){37===e.keyCode?n.setChecked(!1,e):39===e.keyCode&&n.setChecked(!0,e)})),h(p(p(n)),"handleMouseUp",(function(e){var t=n.props.onMouseUp;n.node&&n.node.blur(),t&&t(e)})),h(p(p(n)),"saveNode",(function(e){n.node=e}));var o=!1;return o="checked"in e?!!e.checked:!!e.defaultChecked,n.state={checked:o},n}var n,r,o;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,e),n=t,o=[{key:"getDerivedStateFromProps",value:function(e){var t={},n=e.checked;return"checked"in e&&(t.checked=!!n),t}}],(r=[{key:"componentDidMount",value:function(){var e=this.props,t=e.autoFocus,n=e.disabled;t&&!n&&this.focus()}},{key:"setChecked",value:function(e,t){var n=this.props,r=n.disabled,a=n.onChange;r||("checked"in this.props||this.setState({checked:e}),a&&a(e,t))}},{key:"focus",value:function(){this.node.focus()}},{key:"blur",value:function(){this.node.blur()}},{key:"render",value:function(){var e,t=this.props,n=t.className,r=t.prefixCls,o=t.disabled,c=t.loadingIcon,i=t.checkedChildren,u=t.unCheckedChildren,f=s(t,["className","prefixCls","disabled","loadingIcon","checkedChildren","unCheckedChildren"]),d=this.state.checked,p=b((h(e={},n,!!n),h(e,r,!0),h(e,"".concat(r,"-checked"),d),h(e,"".concat(r,"-disabled"),o),e));return a.a.createElement("button",l({},f,{type:"button",role:"switch","aria-checked":d,disabled:o,className:p,ref:this.saveNode,onKeyDown:this.handleKeyDown,onClick:this.handleClick,onMouseUp:this.handleMouseUp}),c,a.a.createElement("span",{className:"".concat(r,"-inner")},d?i:u))}}])&&u(n.prototype,r),o&&u(n,o),t}(r.Component);m.propTypes={className:c.a.string,prefixCls:c.a.string,disabled:c.a.bool,checkedChildren:c.a.any,unCheckedChildren:c.a.any,onChange:c.a.func,onMouseUp:c.a.func,onClick:c.a.func,tabIndex:c.a.number,checked:c.a.bool,defaultChecked:c.a.bool,autoFocus:c.a.bool,loadingIcon:c.a.node},m.defaultProps={prefixCls:"rc-switch",checkedChildren:null,unCheckedChildren:null,className:"",defaultChecked:!1},Object(i.a)(m),t.default=m},481:function(e,t,n){"use strict";var r=n(0),a=n(477),o=n.n(a),c=n(1),i=n.n(c),l=n(15),s=n(41),u=n.n(s),f=n(193),d=n(190),p=n(33),h=n(19);function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=r.forwardRef((function(e,t){var n;Object(h.a)("checked"in e||!("value"in e),"Switch","`value` is not a valid prop, do you mean `checked`?");var a=e.prefixCls,c=e.size,s=e.loading,v=e.className,y=void 0===v?"":v,g=e.disabled,O=r.useContext(d.b),k=O.getPrefixCls,C=O.direction,j=r.useContext(p.b),E=k("switch",a),w=s?r.createElement(u.a,{className:"".concat(E,"-loading-icon")}):null,S=i()(y,(m(n={},"".concat(E,"-small"),"small"===(c||j)),m(n,"".concat(E,"-loading"),s),m(n,"".concat(E,"-rtl"),"rtl"===C),n));return r.createElement(f.a,{insertExtraNode:!0},r.createElement(o.a,b({},Object(l.a)(e,["loading"]),{prefixCls:E,className:S,disabled:g||s,ref:t,loadingIcon:w})))}));v.__ANT_SWITCH=!0,t.a=v}}]);
//# sourceMappingURL=8.1dd4a400.chunk.js.map