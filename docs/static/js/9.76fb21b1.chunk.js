(this["webpackJsonptext-roleplay"]=this["webpackJsonptext-roleplay"]||[]).push([[9,28,39,48],{159:function(a,e,t){"use strict";t.r(e);var s=t(6),n=t.n(s),r=t(102),c=t(27),l=t(2),i=t(50),u=t(52),o=t(51),m=t(0),h=t.n(m),d=t(28),b=t(38),p=t(513),g=t(514),f=t(453),v=t(107),E=t(449),C=t(489),O=t(75),j=t(153),k=t(481),N=t(35),S=t(66),y=(t(474),t(29)),x=t(24),L=t(5),P=t(266),U=t(110),R=function(a){Object(u.a)(t,a);var e=Object(o.a)(t);function t(){var a;Object(i.a)(this,t);for(var s=arguments.length,u=new Array(s),o=0;o<s;o++)u[o]=arguments[o];return(a=e.call.apply(e,[this].concat(u))).state={character:Object(y.getInitialCharacter)()},a.componentDidMount=function(){var e=a.props,t=e.character,s=e.uid,n=e.user,r=e.currentUser,c=e.history;t?a.setState({character:t}):L.default.getCharacter({uid:s}),n||L.default.getUser({uid:s}),Object(x.redirectToUserPage)(n,r,c)},a.componentDidUpdate=function(e){var t=a.props,s=t.user,n=t.currentUser,r=t.history,c=t.character;e.character!==c&&a.state.character!==c&&a.setState({character:c}),Object(x.redirectToUserPage)(s,n,r),Object(U.addStatusChangeListener)("afk",a.onSave),Object(U.addStatusChangeListener)("offline",a.onSave)},a.componentWillUnmount=function(){Object(U.removeStatusChangeListener)("afk",a.onSave),Object(U.removeStatusChangeListener)("offline",a.onSave),a.onSave()},a.onLimbClick=function(e,t){a.setState({character:Object(l.a)(Object(l.a)({},a.state.character),{},{limbs:Object(l.a)(Object(l.a)({},a.state.character.limbs),{},Object(c.a)({},e,"crippled"===t?"fine":"crippled"))})})},a.getStatus=function(e){var t=a.props.hasRight;return e&&h.a.createElement(P.default,{limbs:e,onClick:t?a.onLimbClick:void 0,hasRight:t})},a.onSave=Object(r.a)(n.a.mark((function e(){var t,s,r,c,l,i,u=arguments;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=u.length>0&&void 0!==u[0]&&u[0],s=a.props,r=s.uid,c=s.character,l=a.state.character,c){e.next=6;break}return t&&v.a.error("\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u0436 \u043d\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d!"),e.abrupt("return");case 6:if(0!==(i=Object(x.getCharacterChanges)(Object(y.getInitialCharacter)(),l)).length){e.next=10;break}return t&&v.a.error("\u0412 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0435 \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u043b\u043e\u0441\u044c"),e.abrupt("return");case 10:if(0!==(i=Object(x.getCharacterChanges)(c||Object(y.getInitialCharacter)(),l)).length){e.next=14;break}return t&&v.a.error("\u0412 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0435 \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u043b\u043e\u0441\u044c"),e.abrupt("return");case 14:if(!(l.stats.skillPoints<0)){e.next=17;break}return t&&v.a.error("\u041e\u0447\u043a\u0438 \u041d\u0430\u0432\u044b\u043a\u043e\u0432 (\u041e\u041d) \u043d\u0435 \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u043e\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u043c\u0438!"),e.abrupt("return");case 17:v.a.success("\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u0436 \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d"),L.default.setCharacter({uid:r,character:l}),L.default.sendMessage({uid:r,message:"\u0425\u0430\u0440\u0430\u043a\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043a\u0438 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0430 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u044b",data:{characterChanges:i}});case 20:case"end":return e.stop()}}),e)}))),a.onChange=function(e){return function(t){if(t){var s="number"===typeof t?t:t.currentTarget.value,n=Object(x.set)(a.state.character,e,s),r=Object(x.processCharacterChanges)({},n);a.setState({character:Object(l.a)(Object(l.a)({},a.state.character),r)})}}},a.getMainStats=function(e){var t=a.props.hasRight,s=e.stats;return s&&h.a.createElement(E.a,{className:"status-main-stats"},h.a.createElement("div",{className:"status-main-stats-health"},h.a.createElement("div",{className:"status-main-stats-hp"},h.a.createElement("span",{className:"status-main-stats-hp-label"},"\u041e\u0447\u043a\u0438 \u0417\u0434\u043e\u0440\u043e\u0432\u044c\u044f (\u041e\u0417)"),h.a.createElement("div",{className:"status-main-stats-hp-body"},h.a.createElement(C.a,{max:s.maxHealthPoints||1e3,min:-Math.floor(s.maxHealthPoints/2),disabled:!t,value:s.healthPoints,onChange:a.onChange("stats.healthPoints")}),"/",h.a.createElement(O.a,{value:s.maxHealthPoints,readOnly:!0,disabled:!t}))),h.a.createElement("div",{className:"status-main-stats-ap-wrapper"},h.a.createElement("div",{className:"status-main-stats-ap"},h.a.createElement(j.a,{title:"\u041a\u043b\u0430\u0441\u0441 \u0411\u0440\u043e\u043d\u0438 (\u041a\u0411)"},h.a.createElement("div",{className:"status-main-stats-ap-total"},"\u041a\u0411")),h.a.createElement("div",{className:"status-main-stats-ap-change"},"+/-"),h.a.createElement("div",{className:"status-main-stats-ap-base"},"Base")),h.a.createElement("div",{className:"status-main-stats-ap"},h.a.createElement(O.a,{className:"status-main-stats-ap-total",readOnly:!0,disabled:!t,value:Math.min(95,s.armorClass.total)}),h.a.createElement(C.a,{className:"status-main-stats-ap-change",min:1,max:95,disabled:!t,value:s.armorClass.change,onChange:a.onChange("stats.armorClass.change")}),h.a.createElement(O.a,{className:"status-main-stats-ap-base",readOnly:!0,disabled:!t,value:s.armorClass.base})))),h.a.createElement("div",{className:"status-main-stats-info"},y.subStats.slice(3).map((function(e){var n=e.label,r=e.full,c=e.field;return h.a.createElement(j.a,{key:c,title:r},h.a.createElement("div",{className:"status-main-stats-item"},h.a.createElement("span",{className:"status-main-stats-item-label"},n),h.a.createElement(O.a,{className:"status-main-stats-item-input",readOnly:!0,disabled:!t,value:s[c],onChange:a.onChange(["stats",c])})))}))))},a.getControls=function(){var e=a.props.character,t=a.state.character;return h.a.createElement("div",{className:"status-controls"},h.a.createElement(k.a,{title:"\u041e\u0442\u043a\u0430\u0442\u0438\u0442\u044c \u043d\u0435 \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f?",okText:"\u041e\u0442\u043a\u0430\u0442\u0438\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",disabled:e===t,onConfirm:function(){a.setState({character:a.props.character}),v.a.success("\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u043e\u0442\u043a\u0430\u0447\u0435\u043d\u043e!")}},h.a.createElement(N.a,{disabled:e===t},h.a.createElement(p.a,null),"\u041e\u0442\u043a\u0430\u0442\u0438\u0442\u044c")),h.a.createElement(k.a,{title:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f?",okText:"\u0414\u0430",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",disabled:e===t,onConfirm:function(){return a.onSave(!0)}},h.a.createElement(N.a,{className:"status-save-button",disabled:e===t},h.a.createElement(g.a,null),"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c")))},a.render=function(){var e=a.props,t=e.user,s=e.character,n=e.loading,r=e.hasRight,c=a.state.character;return t&&s&&!n?h.a.createElement(E.a,{className:"status",extra:r&&a.getControls(),title:h.a.createElement(h.a.Fragment,null,h.a.createElement(f.a,null)," ","\u0421\u0442\u0430\u0442\u0443\u0441 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0430 ",t.nickname)},a.getStatus(c.limbs),a.getMainStats(c)):h.a.createElement(S.a,{description:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u043d\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d"})},a}return t}(m.Component);e.default=Object(d.g)(Object(b.b)(x.getStateUser)(R))},266:function(a,e,t){"use strict";t.r(e);var s=t(0),n=t.n(s),r=(t(469),[0,1,2,3,3,4,4]);e.default=function(a){var e=a.limbs,t=a.onClick,s=a.hasRight,c=Object.values(a.limbs).reduce((function(a,e){return a+(function(a){return"crippled"===a}(e)?1:0)}),0),l=function(a){var s=e[a];return n.a.createElement("div",{key:a+s,className:"limb ".concat(s," ").concat(a),style:{backgroundImage:"url(./assets/".concat(s,"-").concat(a,".png)")},onClick:function(){return t&&t(a,s)}})};return n.a.createElement("div",{className:"body-status ".concat(s?"":"disabled")},n.a.createElement("div",null,n.a.createElement("div",{key:"head"+e.head,className:"limb ".concat(e.head," head"),style:{backgroundImage:"url(./assets/".concat(e.head,"-head.png)")},onClick:function(){return t&&t("head",e.head)}},n.a.createElement("div",{key:"face",className:"limb face",style:{backgroundImage:"url(./assets/face_0".concat(r[c],".png)")}}))),n.a.createElement("div",null,l("handL"),l("torso"),l("handR")),n.a.createElement("div",null,l("legL"),l("legR")))}},469:function(a,e,t){},474:function(a,e,t){}}]);
//# sourceMappingURL=9.76fb21b1.chunk.js.map