(this["webpackJsonptext-roleplay"]=this["webpackJsonptext-roleplay"]||[]).push([[9,29,42,51],{154:function(a,e,t){"use strict";t.r(e);var s=t(25),n=t(3),r=t(47),c=t(49),l=t(48),i=t(0),m=t.n(i),u=t(27),o=t(33),h=t(451),d=t(99),p=t(447),b=t(494),g=t(71),v=t(146),f=t(445),E=t(62),C=t(481),N=t(35),O=(t(470),t(28)),y=t(23),j=t(4),k=t(264),S=function(a){Object(c.a)(t,a);var e=Object(l.a)(t);function t(){var a;Object(r.a)(this,t);for(var c=arguments.length,l=new Array(c),i=0;i<c;i++)l[i]=arguments[i];return(a=e.call.apply(e,[this].concat(l))).state={character:O.initialCharacter},a.componentDidMount=function(){var e=a.props,t=e.character,s=e.uid,n=e.user,r=e.currentUser,c=e.history;t?a.setState({character:t}):j.default.getCharacter({uid:s}),n||j.default.getUser({uid:s}),Object(y.redirectToUserPage)(n,r,c)},a.componentDidUpdate=function(e){var t=a.props,s=t.user,n=t.currentUser,r=t.history,c=t.character;e.character!==c&&a.state.character!==c&&a.setState({character:c}),Object(y.redirectToUserPage)(s,n,r)},a.onLimbClick=function(e,t){a.setState({character:Object(n.a)(Object(n.a)({},a.state.character),{},{limbs:Object(n.a)(Object(n.a)({},a.state.character.limbs),{},Object(s.a)({},e,"crippled"===t?"fine":"crippled"))})})},a.getStatus=function(e){var t=a.props.hasRight;return e&&m.a.createElement(k.default,{limbs:e,onClick:t?a.onLimbClick:void 0,hasRight:t})},a.onSave=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=a.props,s=t.uid,n=t.character,r=a.state.character;if(n){var c=Object(y.getCharacterChanges)(O.initialCharacter,r);0!==c.length&&0!==(c=Object(y.getCharacterChanges)(n||O.initialCharacter,r)).length?r.stats.skillPoints<0?e||d.a.error("\u041e\u0447\u043a\u0438 \u041d\u0430\u0432\u044b\u043a\u043e\u0432 (\u041e\u041d) \u043d\u0435 \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u043e\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u043c\u0438!"):(d.a.success("\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u0436 \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d"),j.default.setCharacter({uid:s,character:r}),j.default.sendMessage({uid:s,message:"\u0425\u0430\u0440\u0430\u043a\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043a\u0438 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0430 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u044b",data:{characterChanges:c}})):e||d.a.error("\u0412 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0435 \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u043b\u043e\u0441\u044c")}else e||d.a.error("\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u0436 \u043d\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d!")},a.componentWillUnmount=function(){return a.onSave(!0)},a.onChange=function(e){return function(t){if(t){var s="number"===typeof t?t:t.currentTarget.value,r=Object(y.set)(a.state.character,e,s),c=Object(y.processCharacterChanges)({},r);a.setState({character:Object(n.a)(Object(n.a)({},a.state.character),c)})}}},a.getMainStats=function(e){var t=a.props.hasRight,s=e.stats;return s&&m.a.createElement(p.a,{className:"status-main-stats"},m.a.createElement("div",{className:"status-main-stats-health"},m.a.createElement("div",{className:"status-main-stats-hp"},m.a.createElement("span",{className:"status-main-stats-hp-label"},"\u041e\u0447\u043a\u0438 \u0417\u0434\u043e\u0440\u043e\u0432\u044c\u044f (\u041e\u0417)"),m.a.createElement("div",{className:"status-main-stats-hp-body"},m.a.createElement(b.a,{max:s.maxHealthPoints||1e3,min:-Math.floor(s.maxHealthPoints/2),disabled:!t,value:s.healthPoints,onChange:a.onChange("stats.healthPoints")}),"/",m.a.createElement(g.a,{value:s.maxHealthPoints,readOnly:!0,disabled:!t}))),m.a.createElement("div",{className:"status-main-stats-ap-wrapper"},m.a.createElement("div",{className:"status-main-stats-ap"},m.a.createElement(v.a,{title:"\u041a\u043b\u0430\u0441\u0441 \u0411\u0440\u043e\u043d\u0438 (\u041a\u0411)"},m.a.createElement("div",{className:"status-main-stats-ap-total"},"\u041a\u0411")),m.a.createElement("div",{className:"status-main-stats-ap-change"},"+/-"),m.a.createElement("div",{className:"status-main-stats-ap-base"},"Base")),m.a.createElement("div",{className:"status-main-stats-ap"},m.a.createElement(g.a,{className:"status-main-stats-ap-total",readOnly:!0,disabled:!t,value:Math.min(95,s.armorClass.total)}),m.a.createElement(b.a,{className:"status-main-stats-ap-change",min:1,max:95,disabled:!t,value:s.armorClass.change,onChange:a.onChange("stats.armorClass.change")}),m.a.createElement(g.a,{className:"status-main-stats-ap-base",readOnly:!0,disabled:!t,value:s.armorClass.base})))),m.a.createElement("div",{className:"status-main-stats-info"},O.subStats.slice(3).map((function(e){var n=e.label,r=e.full,c=e.field;return m.a.createElement(v.a,{key:c,title:r},m.a.createElement("div",{className:"status-main-stats-item"},m.a.createElement("span",{className:"status-main-stats-item-label"},n),m.a.createElement(g.a,{className:"status-main-stats-item-input",readOnly:!0,disabled:!t,value:s[c],onChange:a.onChange(["stats",c])})))}))))},a.render=function(){var e=a.props,t=e.user,s=e.character,n=e.loading,r=e.hasRight,c=a.state.character;return t&&s&&!n?m.a.createElement(p.a,{className:"status",title:m.a.createElement(m.a.Fragment,null,m.a.createElement(h.a,null)," ","\u0421\u0442\u0430\u0442\u0443\u0441 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0430 ",t.nickname),extra:m.a.createElement(C.a,{title:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f?",okText:"\u0414\u0430",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",onConfirm:function(){return a.onSave()},disabled:!r},m.a.createElement(N.a,{disabled:!r},"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"))},a.getStatus(c.limbs),a.getMainStats(c)):m.a.createElement(f.a,{spinning:n},m.a.createElement(E.a,{description:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u043d\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d"}))},a}return t}(i.Component);e.default=Object(u.g)(Object(o.b)(y.getStateUser)(S))},264:function(a,e,t){"use strict";t.r(e);var s=t(0),n=t.n(s),r=(t(465),[0,1,2,3,3,4,4]);e.default=function(a){var e=a.limbs,t=a.onClick,s=a.hasRight,c=Object.values(a.limbs).reduce((function(a,e){return a+(function(a){return"crippled"===a}(e)?1:0)}),0),l=function(a){var s=e[a];return n.a.createElement("div",{key:a+s,className:"limb ".concat(s," ").concat(a),style:{backgroundImage:"url(./assets/".concat(s,"-").concat(a,".png)")},onClick:function(){return t&&t(a,s)}})};return n.a.createElement("div",{className:"body-status ".concat(s?"":"disabled")},n.a.createElement("div",null,n.a.createElement("div",{key:"head"+e.head,className:"limb ".concat(e.head," head"),style:{backgroundImage:"url(./assets/".concat(e.head,"-head.png)")},onClick:function(){return t&&t("head",e.head)}},n.a.createElement("div",{key:"face",className:"limb face",style:{backgroundImage:"url(./assets/face_0".concat(r[c],".png)")}}))),n.a.createElement("div",null,l("handL"),l("torso"),l("handR")),n.a.createElement("div",null,l("legL"),l("legR")))}},465:function(a,e,t){},470:function(a,e,t){}}]);
//# sourceMappingURL=9.f4b589e9.chunk.js.map