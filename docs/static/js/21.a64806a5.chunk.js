(this["webpackJsonptext-roleplay"]=this["webpackJsonptext-roleplay"]||[]).push([[21,40],{239:function(e,a,t){"use strict";t.r(a);var n=t(4),r=t(453),c=t(0),l=t.n(c),i=t(457),s=t(22);a.default=function(e){var a=e.avatar,t=e.nickname,c=e.style,m=Object(r.a)(e,["avatar","nickname","style"]),o=Object(s.isURL)(a)?a:"";return Object(s.isURL)(a),l.a.createElement(i.a,Object.assign({src:o,style:Object(n.a)(Object(n.a)({},c),{},{backgroundColor:o?"transparent":Object(s.colorFromString)(t)})},m),t&&t)}},241:function(e,a,t){"use strict";t.r(a);var n=t(98),r=t(100),c=t(99),l=t(0),i=t.n(l),s=t(33),m=t(433),o=t(473),u=(t(444),t(239)),d=t(3),f=function(e){Object(r.a)(t,e);var a=Object(c.a)(t);function t(){var e;Object(n.a)(this,t);for(var r=arguments.length,c=new Array(r),l=0;l<r;l++)c[l]=arguments[l];return(e=a.call.apply(a,[this].concat(c))).getStats=function(){var a=e.props.item,t=a.type,n=a.armor,r=a.capacity;switch(t){case"wearable":return n;case"weapon":return r;default:var c=e.props.amount||e.props.item.amount;return!!(c&&c>=2)&&"".concat(c,"\u0448\u0442")}},e.labels={wearable:"\u0417\u0430\u0449\u0438\u0442\u0430",weapon:"\u041c\u0430\u0433\u0430\u0437\u0438\u043d"},e.getFooter=function(){var a=e.props,t=a.footer,n=a.uid,r=e.props.item,c=r.failed,l=r.id;return c?i.a.createElement("div",{className:"item-footer"},i.a.createElement(s.a,{disabled:!n,onClick:function(){return d.default.removeItem({uid:n,id:l,all:!0})}},i.a.createElement(o.a,null))):!!t&&i.a.createElement("div",{className:"item-footer"},t)},e.render=function(){var a=e.props,t=a.disabled,n=a.item,r=n.name,c=void 0===r?n.id:r,l=n.price,s=void 0===l?0:l,o=n.description,d=n.image,f=n.effect,p=n.weight,v=void 0===p?0:p,b=n.type,E=n.approved,g=e.getStats();return i.a.createElement(m.a,{className:"item ".concat(E&&!t?"":"disabled")},i.a.createElement("div",{className:"item-info"},i.a.createElement("div",{className:"item-name"},c),i.a.createElement("div",{className:"item-subinfo"},i.a.createElement("div",{className:"item-price"},s>0&&"\u0426\u0435\u043d\u0430: ".concat(s)),i.a.createElement("div",{className:"item-weight"},v>0&&"\u0412\u0435\u0441: ".concat(v,"lb")))),(d||o)&&i.a.createElement("div",{className:"item-body"},d&&i.a.createElement("div",{className:"item-image"},i.a.createElement(u.default,{avatar:d,nickname:c,shape:"square"})),o),(g||f)&&i.a.createElement("div",{className:"item-prefooter"},i.a.createElement("div",{className:"item-ammo"},g?"".concat(e.labels[b]||"\u041a\u043e\u043b-\u0432\u043e",": ").concat(g):""),i.a.createElement("div",{className:"item-effect"},f)),e.getFooter())},e}return t}(l.Component);a.default=f},245:function(e,a,t){"use strict";t.r(a);var n=t(453),r=t(0),c=t.n(r),l=t(35),i=t(241),s=t(3);a.default=Object(l.b)((function(e,a){return{item:e.items.find((function(e){return e.id===a.id}))}}))((function(e){var a=e.id,t=e.item,r=Object(n.a)(e,["id","item"]);return t?c.a.createElement(i.default,Object.assign({item:t},r)):(s.default.getItemById({id:a}),c.a.createElement(c.a.Fragment,null))}))},249:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(614),l=t(148),i=t(68),s=t(472),m=t(33),o=t(617),u=t(22),d=t(48),f=t(245),p=t(3);a.default=function(e){var a=e.uid,t=e.message,n=t.body,v=t.isRP,b=t.rolls,E=t.data;if(E){var g=E.itemId,h=E.taken,y=E.amount,O=E.type,j=E.characterChanges;if(j){var N=Object.values(j),k=function(e){switch(typeof e){case"string":case"number":return e;default:return[e.base&&"b:".concat(e.base),e.change&&"".concat(e.base?" + ":"","c:").concat(e.change),e.total&&" = t:".concat(e.total)].filter(Boolean).join("")}};return r.a.createElement(c.a,null,r.a.createElement(c.a.Panel,{key:"char-changes",header:n},N.map((function(e){var a=e.label,t=e.full,n=e.before,c=e.after;return r.a.createElement("div",{key:a,className:"chat-char-changes"},r.a.createElement(l.a,{title:t},r.a.createElement("span",null,a)),r.a.createElement("div",null,r.a.createElement(i.a,{value:k(n),readOnly:!0}),"->",r.a.createElement(i.a,{value:k(c),readOnly:!0})))}))))}if(g)return r.a.createElement(r.a.Fragment,null,r.a.createElement("i",{className:"rp-message"},n),r.a.createElement("div",{className:h?"":"rp-message"},r.a.createElement(f.default,{id:g.trim(),amount:y,disabled:h,footer:a&&O?r.a.createElement(s.a,{title:"\u041f\u043e\u0434\u043e\u0431\u0440\u0430\u0442\u044c \u043f\u0440\u0435\u0434\u043c\u0435\u0442?",onConfirm:function(){return p.default.takeItem({uid:a,message:t,data:E})},okText:"\u041f\u043e\u0434\u043e\u0431\u0440\u0430\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",disabled:h},r.a.createElement(m.a,{className:"take-button",disabled:h},r.a.createElement(o.a,null))):void 0})))}if(Object(u.isURL)(n)){var w=Object(u.processLinks)(n);if(w)return r.a.createElement("span",null,w)}var C=b?Object(d.importRolls)(n,b):n;return v?r.a.createElement("i",{className:"rp-message"},C):r.a.createElement("span",null,C)}},444:function(e,a,t){}}]);
//# sourceMappingURL=21.a64806a5.chunk.js.map