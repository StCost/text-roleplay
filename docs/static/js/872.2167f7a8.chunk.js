"use strict";(self.webpackChunktext_roleplay=self.webpackChunktext_roleplay||[]).push([[872,498,554,462,895],{6081:function(e,t,a){a.r(t);var n=a(1413),r=a(5987),l=a(2791),c=a(426),i=a(3824),m=["avatar","nickname","style"];t.default=function(e){var t=e.avatar,a=e.nickname,s=e.style,o=(0,r.Z)(e,m),u=(0,i.isURL)(t)?t:"";return(0,i.isURL)(t),l.createElement(c.Z,Object.assign({src:u,style:(0,n.Z)((0,n.Z)({},s),{},{backgroundColor:u?"transparent":(0,i.colorFromString)(a)})},o),a&&a)}},9395:function(e,t,a){a.r(t);var n=a(3144),r=a(5671),l=a(136),c=a(4062),i=a(2791),m=a(4964),s=a(3347),o=a(2622),u=(a(1554),a(6081)),d=a(2404),f=function(e){(0,l.Z)(a,e);var t=(0,c.Z)(a);function a(){var e;(0,r.Z)(this,a);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(e=t.call.apply(t,[this].concat(l))).getStats=function(){var t=e.props.item,a=t.type,n=t.armor,r=t.capacity;switch(a){case"wearable":return n;case"weapon":return r;default:var l=e.props.amount||e.props.item.amount;return!!(l&&l>=2)&&"".concat(l,"\u0448\u0442")}},e.labels={wearable:"\u0417\u0430\u0449\u0438\u0442\u0430",weapon:"\u041c\u0430\u0433\u0430\u0437\u0438\u043d"},e.getHeaderButton=function(){var t=e.props,a=t.footer,n=t.uid,r=e.props.item,l=r.failed,c=r.id;return l?i.createElement("div",{className:"item-header-button"},i.createElement(m.Z,{disabled:!n,onClick:function(){return d.default.removeItem({uid:n,id:c,all:!0})}},i.createElement(o.Z,null))):!!a&&i.createElement("div",{className:"item-header-button"},a)},e.render=function(){var t=e.props,a=t.disabled,n=t.item,r=n.name,l=void 0===r?n.id:r,c=n.price,m=void 0===c?0:c,o=n.description,d=n.image,f=n.effect,v=n.weight,p=void 0===v?0:v,E=n.type,g=n.approved,k=e.getStats();return i.createElement(s.Z,{className:"item ".concat(g&&!a?"":"disabled")},i.createElement("div",{className:"item-info"},i.createElement("div",{className:"item-name"},l,e.getHeaderButton()),i.createElement("div",{className:"item-subinfo"},i.createElement("div",{className:"item-price"},m>0&&"\u0426\u0435\u043d\u0430: ".concat(m)),i.createElement("div",{className:"item-weight"},p>0&&"\u0412\u0435\u0441: ".concat(p,"lb")))),(d||o)&&i.createElement("div",{className:"item-body"},d&&i.createElement("div",{className:"item-image"},i.createElement(u.default,{avatar:d,nickname:l,shape:"square"})),o),(k||f)&&i.createElement("div",{className:"item-prefooter"},i.createElement("div",{className:"item-ammo"},k?"".concat(e.labels[E]||"\u041a\u043e\u043b-\u0432\u043e",": ").concat(k):""),i.createElement("div",{className:"item-effect"},f)))},e}return(0,n.Z)(a)}(i.Component);t.default=f},8920:function(e,t,a){a.r(t);var n=a(5987),r=a(2791),l=a(4233),c=a(9395),i=a(2404),m=["id","item"];t.default=(0,l.$j)((function(e,t){return{item:e.items.find((function(e){return e.id===t.id}))}}))((function(e){var t=e.id,a=e.item,l=(0,n.Z)(e,m);return a?r.createElement(c.default,Object.assign({item:a},l)):(i.default.getItemById({id:t}),r.createElement(r.Fragment,null))}))},1874:function(e,t,a){a.r(t);var n=a(2791),r=a(4469),l=a(2426),c=a.n(l),i=(a(4895),a(6081)),m=a(3824);t.default=function(e){var t=e.user,a=e.displayOnline,l=e.onClick;return n.createElement("div",{className:"user-info"},n.createElement(r.Z,{title:t&&t.lastOnline?"\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u044f\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c: ".concat(c()(t.lastOnline).fromNow()):void 0,placement:"left"},n.createElement("div",{className:"user-info-title ".concat((0,m.getUserStatus)(t)," ").concat(l&&t?"interactive":""),onClick:function(){return l&&t&&l(t)}},n.createElement(i.default,{avatar:t?t.avatar:"",size:26,nickname:t&&(t.nickname||t.uid)||""}),n.createElement("div",{className:"user-info-nickname"},t&&(t.nickname||t.uid)||"[Loading...]"))),a&&n.createElement("span",null,!(!t||!t.lastOnline)&&"\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u044f\u044f \u0430\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c: ".concat(c()(t.lastOnline).fromNow())))}},6872:function(e,t,a){a.r(t);var n=a(2791),r=a(3347),l=a(2426),c=a.n(l),i=a(3498),m=a(1874),s=function(){};t.default=function(e){var t=e.message,a=t.time,l=t.grouped,o=t.body,u=t.mentioned,d=e.user,f=e.uid,v=e.extra,p=e.onUserClick,E=void 0===p?s:p,g=n.createElement(m.default,{user:d,onClick:E}),k=["chat-message",l&&"grouped",u&&d&&o.indexOf("@".concat(d.nickname," "))>-1&&"mentioned"].filter(Boolean).join(" ");return n.createElement(r.Z,{className:k,title:l?void 0:g,key:a},v||n.createElement("div",{className:"chat-time"},c()(a).fromNow()),n.createElement(i.default,{message:e.message,uid:f}))}},3498:function(e,t,a){a.r(t);var n=a(2791),r=a(6776),l=a(4469),c=a(2756),i=a(8183),m=a(4964),s=a(2351),o=a(3824),u=a(7585),d=a(8920),f=a(2404),v=a(8272);t.default=function(e){var t=e.uid,a=e.message,p=a.body,E=a.isRP,g=a.rolls,k=a.data;if(k){var b=k.itemId,N=k.taken,h=k.amount,Z=k.type,y=k.characterChanges,w=k.perk;if(w)return n.createElement(n.Fragment,null,n.createElement("i",{className:"rp-message"},p,n.createElement(v.default,{perk:w})));if(y){var C=Object.values(y),O=function(e){switch(typeof e){case"string":case"number":return e;default:return[e.base&&"b:".concat(e.base),e.change&&"".concat(e.base?" + ":"","c:").concat(e.change),e.total&&" = t:".concat(e.total)].filter(Boolean).join("")}};return n.createElement(r.Z,null,n.createElement(r.Z.Panel,{key:"char-changes",header:p},C.map((function(e){var t=e.label,a=e.full,r=e.before,i=e.after;return n.createElement("div",{key:t,className:"chat-char-changes"},n.createElement(l.Z,{title:a},n.createElement("span",null,t)),n.createElement("div",null,n.createElement(c.Z,{value:O(r),readOnly:!0}),"->",n.createElement(c.Z,{value:O(i),readOnly:!0})))}))))}if(b)return n.createElement(n.Fragment,null,n.createElement("i",{className:"rp-message"},p),n.createElement("div",{className:N?"":"rp-message"},n.createElement(d.default,{id:b.trim(),amount:h,disabled:N,footer:t&&Z?n.createElement(i.Z,{title:"\u041f\u043e\u0434\u043e\u0431\u0440\u0430\u0442\u044c \u043f\u0440\u0435\u0434\u043c\u0435\u0442?",onConfirm:function(){return f.default.takeItem({uid:t,message:a,data:k})},okText:"\u041f\u043e\u0434\u043e\u0431\u0440\u0430\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",disabled:N},n.createElement(m.Z,{className:"take-button",disabled:N},n.createElement(s.Z,null))):void 0})))}if((0,o.isURL)(p)){var x=(0,o.processLinks)(p);if(x)return n.createElement("span",null,x)}var j=g?(0,u.importRolls)(p,g):p;return E?n.createElement("i",{className:"rp-message"},j):n.createElement("span",null,j)}},8272:function(e,t,a){a.r(t);var n=a(2791),r=a(8183),l=a(4964),c=a(732);a(2462);t.default=function(e){var t=e.perk,a=e.onDelete,i=e.hasRight;return n.createElement("div",{className:"perks-item"},a&&i&&n.createElement(r.Z,{title:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u043f\u0435\u0440\u043a?",okText:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",onConfirm:function(){return a(t)}},n.createElement(l.Z,{className:"perks-item-close"},n.createElement(c.Z,null))),n.createElement("div",{className:"perks-item-label"},t.label),n.createElement("div",{className:"perks-item-description"},t.description))}},1554:function(e,t,a){a.r(t),t.default={}},2462:function(e,t,a){a.r(t),t.default={}},4895:function(e,t,a){a.r(t),t.default={}}}]);
//# sourceMappingURL=872.2167f7a8.chunk.js.map