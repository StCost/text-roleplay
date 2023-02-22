"use strict";(self.webpackChunktext_roleplay=self.webpackChunktext_roleplay||[]).push([[342,832,690,460,554,462,895],{6081:function(e,t,n){n.r(t);var a=n(1413),r=n(5987),s=n(2791),l=n(426),i=n(3824),c=["avatar","nickname","style"];t.default=function(e){var t=e.avatar,n=e.nickname,o=e.style,u=(0,r.Z)(e,c),m=(0,i.isURL)(t)?t:"";return(0,i.isURL)(t),s.createElement(l.Z,Object.assign({src:m,style:(0,a.Z)((0,a.Z)({},o),{},{backgroundColor:m?"transparent":(0,i.colorFromString)(n)})},u),n&&n)}},5078:function(e,t,n){n.r(t);var a=n(5987),r=n(3144),s=n(5671),l=n(136),i=n(4062),c=n(2791),o=n(3924),u=n(8528),m=n(2756),d=n(4010),f=n(2404),g=["textArea","onUpload"],p=function(e){(0,l.Z)(n,e);var t=(0,i.Z)(n);function n(){var e;(0,s.Z)(this,n);for(var r=arguments.length,l=new Array(r),i=0;i<r;i++)l[i]=arguments[i];return(e=t.call.apply(t,[this].concat(l))).uploadFile=function(t,n){if(t){if(t.type.indexOf("image")>-1)if(FileReader){var a=new FileReader;a.onload=function(n){n.target&&n.target.result&&"string"===typeof n.target.result&&o.Z.confirm({title:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435?",content:c.createElement(d.default,{src:n.target.result,noTitle:!0}),onOk:function(n){n(),f.default.uploadFile({file:t,onFinish:function(t){return e.props.onUpload(t)}})},okText:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",maskClosable:!0,centered:!0})},a.readAsDataURL(t)}else u.Z.error("\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u043e\u043c");else u.Z.error("\u0422\u043e\u043b\u044c\u043a\u043e \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0438 \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u044b");n.preventDefault()}},e.onPaste=function(t){e.uploadFile(t.clipboardData.files[0],t)},e.onDrop=function(t){var n=t.dataTransfer.items[0].getAsFile();n&&e.uploadFile(n,t)},e.render=function(){var t=e.props,n=t.textArea,r=(t.onUpload,(0,a.Z)(t,g));return n?c.createElement(m.Z.TextArea,Object.assign({},r,{onPaste:e.onPaste,onDrop:e.onDrop})):c.createElement(m.Z,Object.assign({},r,{onPaste:e.onPaste,onDrop:e.onDrop}))},e}return(0,r.Z)(n)}(c.Component);t.default=p},9395:function(e,t,n){n.r(t);var a=n(3144),r=n(5671),s=n(136),l=n(4062),i=n(2791),c=n(4964),o=n(3347),u=n(2622),m=(n(1554),n(6081)),d=n(2404),f=function(e){(0,s.Z)(n,e);var t=(0,l.Z)(n);function n(){var e;(0,r.Z)(this,n);for(var a=arguments.length,s=new Array(a),l=0;l<a;l++)s[l]=arguments[l];return(e=t.call.apply(t,[this].concat(s))).getStats=function(){var t=e.props.item,n=t.type,a=t.armor,r=t.capacity;switch(n){case"wearable":return a;case"weapon":return r;default:var s=e.props.amount||e.props.item.amount;return!!(s&&s>=2)&&"".concat(s,"\u0448\u0442")}},e.labels={wearable:"\u0417\u0430\u0449\u0438\u0442\u0430",weapon:"\u041c\u0430\u0433\u0430\u0437\u0438\u043d"},e.getFooter=function(){var t=e.props,n=t.footer,a=t.uid,r=e.props.item,s=r.failed,l=r.id;return s?i.createElement("div",{className:"item-footer"},i.createElement(c.Z,{disabled:!a,onClick:function(){return d.default.removeItem({uid:a,id:l,all:!0})}},i.createElement(u.Z,null))):!!n&&i.createElement("div",{className:"item-footer"},n)},e.render=function(){var t=e.props,n=t.disabled,a=t.item,r=a.name,s=void 0===r?a.id:r,l=a.price,c=void 0===l?0:l,u=a.description,d=a.image,f=a.effect,g=a.weight,p=void 0===g?0:g,v=a.type,h=a.approved,E=e.getStats();return i.createElement(o.Z,{className:"item ".concat(h&&!n?"":"disabled")},i.createElement("div",{className:"item-info"},i.createElement("div",{className:"item-name"},s),i.createElement("div",{className:"item-subinfo"},i.createElement("div",{className:"item-price"},c>0&&"\u0426\u0435\u043d\u0430: ".concat(c)),i.createElement("div",{className:"item-weight"},p>0&&"\u0412\u0435\u0441: ".concat(p,"lb")))),(d||u)&&i.createElement("div",{className:"item-body"},d&&i.createElement("div",{className:"item-image"},i.createElement(m.default,{avatar:d,nickname:s,shape:"square"})),u),(E||f)&&i.createElement("div",{className:"item-prefooter"},i.createElement("div",{className:"item-ammo"},E?"".concat(e.labels[v]||"\u041a\u043e\u043b-\u0432\u043e",": ").concat(E):""),i.createElement("div",{className:"item-effect"},f)),e.getFooter())},e}return(0,a.Z)(n)}(i.Component);t.default=f},8920:function(e,t,n){n.r(t);var a=n(5987),r=n(2791),s=n(4233),l=n(9395),i=n(2404),c=["id","item"];t.default=(0,s.$j)((function(e,t){return{item:e.items.find((function(e){return e.id===t.id}))}}))((function(e){var t=e.id,n=e.item,s=(0,a.Z)(e,c);return n?r.createElement(l.default,Object.assign({item:n},s)):(i.default.getItemById({id:t}),r.createElement(r.Fragment,null))}))},3690:function(e,t,n){n.r(t);var a=n(2791),r=n(4233);t.default=(0,r.$j)((function(e){return{users:e.users,currentUser:e.currentUser}}))((function(e){var t=e.users,n=e.currentUser,r=Object.values(t).map((function(e){var t=e.isTyping,a=e.nickname,r=e.uid;return t&&r!==(null===n||void 0===n?void 0:n.uid)&&(a||r)})).filter(Boolean);if(0===r.length)return a.createElement(a.Fragment,null);var s=" \u043f\u0438\u0448".concat(1===r.length?"\u0435\u0442":"\u0443\u0442","...");return a.createElement("div",{className:"chat-body__typing-users"},r.join(", "),s)}))},1874:function(e,t,n){n.r(t);var a=n(2791),r=n(4469),s=n(2426),l=n.n(s),i=(n(4895),n(6081)),c=n(3824);t.default=function(e){var t=e.user,n=e.displayOnline,s=e.onClick;return a.createElement("div",{className:"user-info"},a.createElement(r.Z,{title:t&&t.lastOnline?"\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u044f\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c: ".concat(l()(t.lastOnline).fromNow()):void 0,placement:"left"},a.createElement("div",{className:"user-info-title ".concat((0,c.getUserStatus)(t)," ").concat(s&&t?"interactive":""),onClick:function(){return s&&t&&s(t)}},a.createElement(i.default,{avatar:t?t.avatar:"",size:26,nickname:t&&(t.nickname||t.uid)||""}),a.createElement("div",{className:"user-info-nickname"},t&&(t.nickname||t.uid)||"[Loading...]"))),n&&a.createElement("span",null,!(!t||!t.lastOnline)&&"\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u044f\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c: ".concat(l()(t.lastOnline).fromNow())))}},6872:function(e,t,n){n.r(t);var a=n(2791),r=n(3347),s=n(2426),l=n.n(s),i=n(3498),c=n(1874),o=function(){};t.default=function(e){var t=e.message,n=t.time,s=t.grouped,u=t.body,m=t.mentioned,d=e.user,f=e.uid,g=e.extra,p=e.onUserClick,v=void 0===p?o:p,h=a.createElement(c.default,{user:d,onClick:v}),E=["chat-message",s&&"grouped",m&&d&&u.indexOf("@".concat(d.nickname," "))>-1&&"mentioned"].filter(Boolean).join(" ");return a.createElement(r.Z,{className:E,title:s?void 0:h,key:n},g||a.createElement("div",{className:"chat-time"},l()(n).fromNow()),a.createElement(i.default,{message:e.message,uid:f}))}},3498:function(e,t,n){n.r(t);var a=n(2791),r=n(6776),s=n(4469),l=n(2756),i=n(8183),c=n(4964),o=n(2351),u=n(3824),m=n(7585),d=n(8920),f=n(2404),g=n(8272);t.default=function(e){var t=e.uid,n=e.message,p=n.body,v=n.isRP,h=n.rolls,E=n.data;if(E){var y=E.itemId,b=E.taken,Z=E.amount,k=E.type,M=E.characterChanges,C=E.perk;if(C)return a.createElement(a.Fragment,null,a.createElement("i",{className:"rp-message"},p,a.createElement(g.default,{perk:C})));if(M){var w=Object.values(M),N=function(e){switch(typeof e){case"string":case"number":return e;default:return[e.base&&"b:".concat(e.base),e.change&&"".concat(e.base?" + ":"","c:").concat(e.change),e.total&&" = t:".concat(e.total)].filter(Boolean).join("")}};return a.createElement(r.Z,null,a.createElement(r.Z.Panel,{key:"char-changes",header:p},w.map((function(e){var t=e.label,n=e.full,r=e.before,i=e.after;return a.createElement("div",{key:t,className:"chat-char-changes"},a.createElement(s.Z,{title:n},a.createElement("span",null,t)),a.createElement("div",null,a.createElement(l.Z,{value:N(r),readOnly:!0}),"->",a.createElement(l.Z,{value:N(i),readOnly:!0})))}))))}if(y)return a.createElement(a.Fragment,null,a.createElement("i",{className:"rp-message"},p),a.createElement("div",{className:b?"":"rp-message"},a.createElement(d.default,{id:y.trim(),amount:Z,disabled:b,footer:t&&k?a.createElement(i.Z,{title:"\u041f\u043e\u0434\u043e\u0431\u0440\u0430\u0442\u044c \u043f\u0440\u0435\u0434\u043c\u0435\u0442?",onConfirm:function(){return f.default.takeItem({uid:t,message:n,data:E})},okText:"\u041f\u043e\u0434\u043e\u0431\u0440\u0430\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",disabled:b},a.createElement(c.Z,{className:"take-button",disabled:b},a.createElement(o.Z,null))):void 0})))}if((0,u.isURL)(p)){var O=(0,u.processLinks)(p);if(O)return a.createElement("span",null,O)}var S=h?(0,m.importRolls)(p,h):p;return v?a.createElement("i",{className:"rp-message"},S):a.createElement("span",null,S)}},4342:function(e,t,n){n.r(t),n.d(t,{default:function(){return J}});var a=n(1413),r=n(5671),s=n(3144),l=n(136),i=n(4062),c=n(2791),o=n(4233),u=n(2426),m=n.n(u),d={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"},f=n(4291),g=function(e,t){return c.createElement(f.Z,Object.assign({},e,{ref:t,icon:d}))};g.displayName="EyeOutlined";var p=c.forwardRef(g),v={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"}},{tag:"path",attrs:{d:"M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"}}]},name:"eye-invisible",theme:"outlined"},h=function(e,t){return c.createElement(f.Z,Object.assign({},e,{ref:t,icon:v}))};h.displayName="EyeInvisibleOutlined";var E=c.forwardRef(h),y={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"}}]},name:"sync",theme:"outlined"},b=function(e,t){return c.createElement(f.Z,Object.assign({},e,{ref:t,icon:y}))};b.displayName="SyncOutlined";var Z=c.forwardRef(b),k={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z"}}]},name:"reload",theme:"outlined"},M=function(e,t){return c.createElement(f.Z,Object.assign({},e,{ref:t,icon:k}))};M.displayName="ReloadOutlined";var C=c.forwardRef(M),w={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"}}]},name:"down",theme:"outlined"},N=function(e,t){return c.createElement(f.Z,Object.assign({},e,{ref:t,icon:w}))};N.displayName="DownOutlined";var O=c.forwardRef(N),S={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 00308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 00-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"}}]},name:"code",theme:"outlined"},T=function(e,t){return c.createElement(f.Z,Object.assign({},e,{ref:t,icon:S}))};T.displayName="CodeOutlined";var x=c.forwardRef(T),I={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M553.1 509.1l-77.8 99.2-41.1-52.4a8 8 0 00-12.6 0l-99.8 127.2a7.98 7.98 0 006.3 12.9H696c6.7 0 10.4-7.7 6.3-12.9l-136.5-174a8.1 8.1 0 00-12.7 0zM360 442a40 40 0 1080 0 40 40 0 10-80 0zm494.6-153.4L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"}}]},name:"file-image",theme:"outlined"},z=function(e,t){return c.createElement(f.Z,Object.assign({},e,{ref:t,icon:I}))};z.displayName="FileImageOutlined";var A=c.forwardRef(z),D=n(3097),R=n(8528),U=n(3924),L=n(8327),j=n(3347),P=n(4469),F=n(4964),B=n(8321),H=n(9271),V=(n(3460),n(2404)),_=n(5078),q=n(3690),K=n(6872),Y=n(3824),Q=n(9638),$=function(e){(0,l.Z)(n,e);var t=(0,i.Z)(n);function n(){var e;(0,r.Z)(this,n);for(var s=arguments.length,l=new Array(s),i=0;i<s;i++)l[i]=arguments[i];return(e=t.call.apply(t,[this].concat(l))).state={message:"",sending:!1,showPinned:!0},e.componentDidMount=function(){V.default.subscribe({}),e.setState(JSON.parse(localStorage.getItem("chat-state")||"{}")),(0,Q.addStatusChangeListener)("afk",e.resetIsTyping),(0,Q.addStatusChangeListener)("offline",e.resetIsTyping)},e.componentDidUpdate=function(t,n){var a=e.props,r=a.messages,s=a.users,l=a.loading;if(e.state.sending&&t.messages!==r&&(localStorage.setItem("message",""),e.setState({message:"",sending:!1})),!l){var i=r.map((function(e){return e.author})).filter((function(e,t,n){return n.findIndex((function(t){return t===e}))===t}));if(i.length!==Object.keys(s).length){var c=i.find((function(e){return!s[e]}));c&&V.default.getUser({uid:c});var o=i.find((function(e){return!!s[e]&&!!s[e].error}));o&&r.forEach((function(e){var t=e.author,n=e.time;t===o&&V.default.removeMessage({id:n})}))}}n!==e.state&&localStorage.setItem("chat-state",JSON.stringify(e.state))},e.togglePinned=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:!e.state.showPinned;return e.setState({showPinned:t})},e.onChangeMessage=function(t){return e.changeMessage(t.target.value)},e.changeMessage=function(t){localStorage.setItem("message",t),e.setState({message:t})},e.lastTyping=Date.now()-500,e.timeout=null,e.onKeyDown=function(t){if("Enter"!==t.key||t.shiftKey){var n=Date.now();e.props.currentUser&&n>e.lastTyping&&(e.props.currentUser.isTyping||V.default.setIsTyping({isTyping:!0,uid:e.props.uid}),null!==e.timeout&&clearTimeout(e.timeout),e.lastTyping=n+1e3,e.timeout=setTimeout((function(){Date.now()>e.lastTyping&&V.default.setIsTyping({isTyping:!1,uid:e.props.uid})}),3e3))}else t.preventDefault(),e.onSendMessage(t.getModifierState("Alt")?"complete":"none")()},e.resetIsTyping=function(){var t=e.props,n=t.uid,a=t.currentUser;null!==a&&void 0!==a&&a.isTyping&&V.default.setIsTyping({isTyping:!1,uid:n})},e.onSendMessage=function(t){return function(){var n=e.state.message,a=e.props,r=a.currentUser,s=a.loading,l=a.uid;if(!s)if(r)if(r.nickname)if(r.approved){if((0,Y.validateMessage)(n))switch(e.setState({sending:!0}),t){case"picture":V.default.sendMessagePhotoAi({message:n,uid:l});break;case"complete":V.default.sendMessageAi({message:r.nickname+": "+n,uid:l});break;default:V.default.sendMessage({uid:l,message:n})}}else R.Z.error("\u0410\u0434\u043c\u0438\u043d \u043f\u043e\u043a\u0430 \u0447\u0442\u043e \u043d\u0435 \u0430\u043a\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043b \u0412\u0430\u0448 \u0430\u043a\u043a\u0430\u0443\u043d\u0442");else R.Z.error("\u041d\u0438\u043a\u043d\u0435\u0439\u043c \u043d\u0435 \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d. \u041f\u0440\u043e\u0439\u0434\u0438\u0442\u0435 \u0432 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0438 \u043d\u0430\u0437\u043e\u0432\u0438\u0442\u0435 \u0441\u0435\u0431\u044f");else R.Z.error("\u0414\u0430\u043d\u043d\u044b\u0435 \u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435 \u043e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044e\u0442")}},e.getMoreMessages=function(){V.default.getMoreMessages({firstMessage:e.props.messages[e.props.messages.length-1]})},e.onScroll=function(t){t.currentTarget.scrollHeight+t.currentTarget.scrollTop<=1e3&&(t.preventDefault(),e.getMoreMessages())},e.onPinMessage=function(e){return function(){V.default.changeMessage({message:(0,a.Z)((0,a.Z)({},e),{},{pinned:!e.pinned})}),V.default.notify({message:"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 ".concat(e.pinned?"\u043e\u0442\u043a\u0440\u0435\u043f\u043b\u0435\u043d\u043e":"\u043f\u0440\u0438\u043a\u0440\u0435\u043f\u043b\u0435\u043d\u043e","!")})}},e.getPinnedMessage=function(t){var n=t.find((function(e){return e.pinned}));if(!n)return!1;var r=e.state.showPinned;return c.createElement("div",{className:"chat-pinned-message ".concat(r?"":"hidden")},r?c.createElement(p,{onClick:function(){return e.togglePinned()}}):c.createElement(E,{onClick:function(){return e.togglePinned()}}),e.getMessage((0,a.Z)((0,a.Z)({},n),{},{grouped:!1})))},e.getMessageControlsOverlay=function(t){var n=e.props.currentUser,a=null===n||void 0===n?void 0:n.isAdmin,r=a||(null===n||void 0===n?void 0:n.uid)==t.author,s=null===n||void 0===n?void 0:n.approved;return c.createElement(L.Z,null,c.createElement(L.Z.Item,null,c.createElement(j.Z,{bodyStyle:{padding:"4px 15px"}},m()(t.time).format("HH:MM:SS DD:MM:YYYY"))),s&&c.createElement(L.Z.Item,null,c.createElement(P.Z,{title:"OpenAI \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442 \u0442\u0435\u043a\u0441\u0442, \u0437\u043d\u0430\u044f \u0420\u041f \u0438 \u043d\u043e\u043d-\u0420\u041f \u0442\u0435\u043a\u0441\u0442"},c.createElement(F.Z,{onClick:function(){return V.default.sendMessageAi({IC:!0,OOC:!0})}},"OpenAI")),c.createElement(P.Z,{title:"\u0418\u0418 \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442 \u0437\u043d\u0430\u044f \u0442\u043e\u043b\u044c\u043a\u043e \u0420\u041f \u0442\u0435\u043a\u0441\u0442"},c.createElement(F.Z,{onClick:function(){return V.default.sendMessageAi({IC:!0,OOC:!1})}},"IC"))),a&&c.createElement(L.Z.Item,null,c.createElement(F.Z,{onClick:e.onPinMessage(t)},t.pinned?"\u041e\u0442\u043a\u0440\u0435\u043f\u0438\u0442\u044c":"\u041f\u0440\u0438\u043a\u0440\u0435\u043f\u0438\u0442\u044c")),r&&c.createElement(L.Z.Item,null,c.createElement(F.Z,{onClick:function(e){return e.shiftKey?V.default.removeMessage({id:t.time}):U.Z.confirm({title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c?",content:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435? \u042d\u0442\u043e \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435 \u043d\u0435\u043b\u044c\u0437\u044f \u0431\u0443\u0434\u0435\u0442 \u043e\u0442\u043c\u0435\u043d\u0438\u0442\u044c",okText:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",onOk:function(e){V.default.removeMessage({id:t.time}),e()}})}},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c")))},e.getMessageControls=function(t){return c.createElement(B.Z,{overlay:e.getMessageControlsOverlay(t),trigger:["hover"],placement:"topLeft"},c.createElement("div",{className:"chat-time"},m()(t.time).fromNow()))},e.getMessage=function(t){var n=e.props,a=n.users,r=n.uid,s=n.history;return c.createElement(K.default,{key:t.time,message:t,user:a[t.author],uid:r,extra:e.getMessageControls(t),onUserClick:function(){return s.push("/".concat(t.author,"/stats"))}})},e.scrollDown=function(){return e.bodyRef&&e.bodyRef.scrollTo({left:0,top:Number.MAX_SAFE_INTEGER,behavior:"smooth"})},e.bodyRef=null,e.render=function(){var t=e.props,n=t.messages,a=t.loading,r=t.currentUser;return c.createElement("div",{className:"chat-wrapper"},c.createElement("div",{className:"chat-reload"},a?c.createElement(Z,{spin:!0}):c.createElement(C,{onClick:function(){return V.default.getMessages({})}})),e.getPinnedMessage(n),c.createElement("div",{className:"chat-body",ref:function(t){return e.bodyRef=t},onScroll:e.onScroll},n.map(e.getMessage)),c.createElement("div",{className:"chat-controls"},c.createElement(O,{onClick:e.scrollDown}),c.createElement(q.default,null),c.createElement(_.default,{textArea:!0,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",autoSize:{minRows:1,maxRows:10},onChange:e.onChangeMessage,onKeyDown:e.onKeyDown,value:e.state.message,disabled:!r||!r.enableDisabledFeatures,onUpload:function(t){e.changeMessage("".concat(e.state.message," ").concat(t)),V.default.notify({message:"\u0424\u0430\u0439\u043b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d!"})}}),c.createElement(P.Z,{title:c.createElement("div",null,c.createElement(x,{onClick:e.onSendMessage("complete")}),c.createElement("br",null),c.createElement(A,{onClick:e.onSendMessage("picture")})),placement:"right"},c.createElement(D.Z,{onClick:e.onSendMessage("none")}))))},e}return(0,s.Z)(n,[{key:"componentWillUnmount",value:function(){(0,Q.removeStatusChangeListener)("afk",this.resetIsTyping),(0,Q.removeStatusChangeListener)("offline",this.resetIsTyping)}}]),n}(c.Component),J=(0,H.EN)((0,o.$j)((function(e){return{messages:e.messages,uid:e.uid,loading:e.loading,users:e.users,currentUser:e.currentUser}}))($))},8272:function(e,t,n){n.r(t);var a=n(2791),r=n(8183),s=n(4964),l=n(732);n(2462);t.default=function(e){var t=e.perk,n=e.onDelete,i=e.hasRight;return a.createElement("div",{className:"perks-item"},n&&i&&a.createElement(r.Z,{title:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u043f\u0435\u0440\u043a?",okText:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",onConfirm:function(){return n(t)}},a.createElement(s.Z,{className:"perks-item-close"},a.createElement(l.Z,null))),a.createElement("div",{className:"perks-item-label"},t.label),a.createElement("div",{className:"perks-item-description"},t.description))}},3097:function(e,t,n){n.d(t,{Z:function(){return i}});var a=n(2791),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2a15.99 15.99 0 00-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z"}}]},name:"send",theme:"outlined"},s=n(4291),l=function(e,t){return a.createElement(s.Z,Object.assign({},e,{ref:t,icon:r}))};l.displayName="SendOutlined";var i=a.forwardRef(l)},3460:function(e,t,n){n.r(t),t.default={}},1554:function(e,t,n){n.r(t),t.default={}},2462:function(e,t,n){n.r(t),t.default={}},4895:function(e,t,n){n.r(t),t.default={}}}]);
//# sourceMappingURL=342.696ec09e.chunk.js.map