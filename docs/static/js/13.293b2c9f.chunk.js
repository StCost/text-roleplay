(this["webpackJsonptext-roleplay"]=this["webpackJsonptext-roleplay"]||[]).push([[13,43],{152:function(a,e,t){"use strict";t.r(e);var s=t(3),r=t(20),c=t(48),l=t(50),n=t(49),i=t(0),m=t.n(i),h=t(27),o=t(33),u=t(447),d=t(146),p=t(72),b=t(494),g=t(100),v=t(481),E=t(35),f=t(445),N=t(63),C=t(631),O=t(458),k=(t(467),t(28)),j=t(4),y=t(23),x=function(a){Object(l.a)(t,a);var e=Object(n.a)(t);function t(){var a;Object(c.a)(this,t);for(var l=arguments.length,n=new Array(l),i=0;i<l;i++)n[i]=arguments[i];return(a=e.call.apply(e,[this].concat(n))).state={character:k.initialCharacter,update:!1},a.componentDidMount=function(){var e=a.props,t=e.character,s=e.uid,r=e.user,c=e.currentUser,l=e.history;t?a.setState({character:t}):j.default.getCharacter({uid:s}),r||j.default.getUser({uid:s}),Object(y.redirectToUserPage)(r,c,l)},a.componentDidUpdate=function(e){var t=a.props,s=t.character,r=t.user,c=t.currentUser,l=t.history;e.character!==s&&a.setState({character:s}),Object(y.redirectToUserPage)(r,c,l)},a.getSpecial=function(e){var t=a.props.hasRight,s=e.special;return s&&m.a.createElement(u.a,{className:"char-special"},m.a.createElement("div",{className:"char-special-item"},m.a.createElement("span",{className:"char-special-label"}),m.a.createElement("div",{className:"char-special-input total"},"Total"),m.a.createElement("div",{className:"char-special-input"},"+/-"),m.a.createElement("div",{className:"char-special-input"},"Base")),k.special.map((function(e){var r=e.label,c=e.full,l=e.field;return m.a.createElement("div",{key:r,className:"char-special-item"},m.a.createElement(d.a,{title:c},m.a.createElement("span",{className:"char-special-label"},r)),m.a.createElement(p.a,{className:"char-special-input total",readOnly:!0,min:0,max:9,disabled:!t,value:s[l].total}),m.a.createElement(b.a,{className:"char-special-input",min:0,max:9,disabled:!t,value:s[l].change,onChange:a.onChange(["special",l,"change"])}),m.a.createElement(b.a,{className:"char-special-input",min:0,max:9,disabled:!t,value:s[l].base,onChange:a.onChange(["special",l,"base"])}))})))},a.onGiftSelect=function(e){return function(){var t=a.state.character,c=Object(r.a)(t.gifts),l=c.indexOf(e);if(l>-1)c.splice(l,1);else{if(!(c.length<=2))return;c.push(e)}a.setState({character:Object(s.a)(Object(s.a)(Object(s.a)({},t),Object(y.processCharacterChanges)({},Object(s.a)(Object(s.a)({},t),{},{gifts:c}))),{},{gifts:c})})}},a.getSkills=function(e){var t=a.props.hasRight,s=e.skills,r=e.gifts;return s&&m.a.createElement(u.a,{className:"char-skills"},m.a.createElement("div",{className:"char-skills-item"},m.a.createElement("span",{className:"char-skills-label"}),m.a.createElement("div",{className:"char-skills-input total"},"Total"),m.a.createElement("div",{className:"char-skills-input"},"+/-"),m.a.createElement("div",{className:"char-skills-input"},"Base")),k.skills.map((function(e){var c=e.label,l=e.full,n=e.formula,i=e.field;return m.a.createElement("div",{key:i,className:"char-skills-item"},m.a.createElement(d.a,{title:l,placement:"left"},m.a.createElement("span",{className:"char-skills-label ".concat(r.indexOf(i)>-1?"gift":""),onClick:a.onGiftSelect(i)},c)),m.a.createElement(p.a,{className:"char-skills-input",readOnly:!0,disabled:!t,value:s[i].total}),m.a.createElement(b.a,{className:"char-skills-input",disabled:!t,min:1,max:95,value:s[i].change,onChange:a.onChange(["skills",i,"change"])}),m.a.createElement(d.a,{title:n},m.a.createElement(p.a,{className:"char-skills-input",readOnly:!0,disabled:!t,value:s[i].base,onChange:a.onChange(["skills",i,"base"])})))})))},a.getStats=function(e){var t=a.props.hasRight,s=e.stats;return s&&m.a.createElement(u.a,{className:"char-stats"},k.stats.map((function(e){var r=e.label,c=e.full,l=e.field,n=e.getBase;return m.a.createElement("div",{key:l,className:"char-stats-item"},m.a.createElement(d.a,{title:c},m.a.createElement("span",{className:"char-stats-label"},r)),"wounds"===l?m.a.createElement(p.a.TextArea,{className:"char-stats-input",disabled:!t,value:s[l],onChange:a.onChange(["stats",l])}):n?m.a.createElement(p.a,{className:"char-stats-input",readOnly:!0,disabled:!t,value:s[l]}):m.a.createElement(b.a,{className:"char-stats-input",min:1,disabled:!t,value:s[l],onChange:a.onChange(["stats",l])}))})))},a.componentWillUnmount=function(){return a.onSave(!0)},a.getMainStats=function(e){var t=a.props.hasRight,s=e.stats;return s&&m.a.createElement(u.a,{className:"char-main-stats"},m.a.createElement("div",{className:"char-main-stats-health"},m.a.createElement("div",{className:"char-main-stats-hp"},m.a.createElement("span",{className:"char-main-stats-hp-label"},"\u041e\u0447\u043a\u0438 \u0417\u0434\u043e\u0440\u043e\u0432\u044c\u044f (\u041e\u0417)"),m.a.createElement("div",{className:"char-main-stats-hp-body"},m.a.createElement(p.a,{max:s.maxHealthPoints||void 0,min:-Math.floor(s.maxHealthPoints/2),readOnly:!0,disabled:!t,value:s.healthPoints}),"/",m.a.createElement(p.a,{value:s.maxHealthPoints,readOnly:!0,disabled:!t}))),m.a.createElement("div",{className:"char-main-stats-ap-wrapper"},m.a.createElement("div",{className:"char-main-stats-ap"},m.a.createElement(d.a,{title:"\u041a\u043b\u0430\u0441\u0441 \u0411\u0440\u043e\u043d\u0438 (\u041a\u0411)"},m.a.createElement("div",{className:"char-main-stats-ap-total"},"\u041a\u0411")),m.a.createElement("div",{className:"char-main-stats-ap-change"},"+/-"),m.a.createElement("div",{className:"char-main-stats-ap-base"},"Base")),m.a.createElement("div",{className:"char-main-stats-ap"},m.a.createElement(p.a,{className:"char-main-stats-ap-total",min:1,max:95,readOnly:!0,disabled:!t,value:Math.min(95,s.armorClass.total)}),m.a.createElement(p.a,{className:"char-main-stats-ap-change",readOnly:!0,disabled:!t,min:1,max:95,value:s.armorClass.change}),m.a.createElement(p.a,{className:"char-main-stats-ap-base",readOnly:!0,disabled:!t,value:s.armorClass.base})))),m.a.createElement("div",{className:"char-main-stats-info"},k.subStats.slice(3).map((function(a){var e=a.label,r=a.full,c=a.field;return m.a.createElement("div",{key:c,className:"char-main-stats-item"},m.a.createElement(d.a,{title:r},m.a.createElement("span",{className:"char-main-stats-item-label"},e)),m.a.createElement(p.a,{className:"char-main-stats-item-input",readOnly:!0,disabled:!t,value:s[c]}))}))))},a.onChange=function(e){return function(t){if(t&&("number"===typeof t||t.target)){var r="number"===typeof t?t:t.target.value||"",c="number"===typeof r?Math.min(464999,r):r||"",l=Object(y.set)(a.state.character,e,c),n=Object(y.processCharacterChanges)({},l);a.setState({character:Object(s.a)(Object(s.a)({},a.state.character),n)})}}},a.onSave=function(e){var t=a.props,s=t.uid,r=t.character,c=a.state.character;if(r){var l=Object(y.getCharacterChanges)(k.initialCharacter,c);0!==l.length&&0!==(l=Object(y.getCharacterChanges)(r,c)).length?c.stats.skillPoints<0?e||g.a.error("\u041e\u0447\u043a\u0438 \u041d\u0430\u0432\u044b\u043a\u043e\u0432 (\u041e\u041d) \u043d\u0435 \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u043e\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043b\u044c\u043d\u044b\u043c\u0438!"):(g.a.success("\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u0436 \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d"),j.default.setCharacter({uid:s,character:c}),j.default.sendMessage({uid:s,message:"\u0425\u0430\u0440\u0430\u043a\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043a\u0438 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0430 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u044b",data:{characterChanges:l}})):e||g.a.error("\u0412 \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0435 \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u043b\u043e\u0441\u044c")}else e||g.a.error("\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u0436 \u043d\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d!")},a.changeBio=function(e){return a.setState({character:Object(s.a)(Object(s.a)({},a.state.character),{},{bio:e.currentTarget.value})})},a.downloadCharacter=function(){var e="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(a.props.character)),t=document.createElement("a");t.setAttribute("href",e),t.setAttribute("download","character_".concat(Date.now(),".json")),t.click(),t.remove()},a.getControls=function(e){return m.a.createElement("div",{className:"char-controls"},m.a.createElement(v.a,{title:"\u042d\u043a\u0441\u043f\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0435\u0440\u0441\u043e\u043d\u0430\u0436\u0430?",okText:"\u0414\u0430",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",onConfirm:a.downloadCharacter},m.a.createElement(E.a,null,m.a.createElement(C.a,null))),m.a.createElement(v.a,{title:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f?",okText:"\u0414\u0430",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",onConfirm:function(){return a.onSave()},disabled:!e},m.a.createElement(E.a,{disabled:!e},"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c")))},a.getTitle=function(a){return m.a.createElement(m.a.Fragment,null,m.a.createElement(O.a,null)," ","\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u0436 \u0438\u0433\u0440\u043e\u043a\u0430 ",a.nickname||a.uid)},a.render=function(){var e=a.props,t=e.user,s=e.hasRight,r=e.character,c=e.loading,l=a.state.character;return t&&r&&l!==k.initialCharacter&&!c?m.a.createElement(u.a,{className:"char",title:a.getTitle(t),extra:a.getControls(s)},m.a.createElement("div",{className:"char-bio"},m.a.createElement(p.a.TextArea,{disabled:!s,minLength:3,value:l.bio,onChange:a.changeBio})),m.a.createElement("div",null,a.getMainStats(l)),m.a.createElement("div",null,m.a.createElement("div",null,a.getSpecial(l),a.getStats(l)),m.a.createElement("div",null,a.getSkills(l)))):m.a.createElement(f.a,{spinning:c},m.a.createElement(N.a,{description:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u043d\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d"}))},a}return t}(i.Component);e.default=Object(h.g)(Object(o.b)((function(a,e){var t=Object(y.getStateUser)(a,e),r=t.user,c=t.currentUser,l=t.character,n=!!r&&!!c&&c.approved&&(c.uid===r.uid&&l&&!l.static||!c.isSuperAdmin);return Object(s.a)(Object(s.a)({},t),{},{hasRight:n})}))(x))},467:function(a,e,t){}}]);
//# sourceMappingURL=13.293b2c9f.chunk.js.map