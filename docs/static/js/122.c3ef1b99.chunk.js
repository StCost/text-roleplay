(self.webpackChunktext_roleplay=self.webpackChunktext_roleplay||[]).push([[122,498,554,805,462],{6081:function(e,t,n){"use strict";n.r(t);var a=n(1413),r=n(5987),c=n(2791),o=n(426),i=n(3824),l=["avatar","nickname","style"];t.default=function(e){var t=e.avatar,n=e.nickname,s=e.style,u=(0,r.Z)(e,l),d=(0,i.isURL)(t)?t:"";return(0,i.isURL)(t),c.createElement(o.Z,Object.assign({src:d,style:(0,a.Z)((0,a.Z)({},s),{},{backgroundColor:d?"transparent":(0,i.colorFromString)(n)})},u),n&&n)}},9395:function(e,t,n){"use strict";n.r(t);var a=n(3144),r=n(5671),c=n(136),o=n(4062),i=n(2791),l=n(4964),s=n(3347),u=n(2622),d=(n(1554),n(6081)),m=n(2404),f=function(e){(0,c.Z)(n,e);var t=(0,o.Z)(n);function n(){var e;(0,r.Z)(this,n);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).getStats=function(){var t=e.props.item,n=t.type,a=t.armor,r=t.capacity;switch(n){case"wearable":return a;case"weapon":return r;default:var c=e.props.amount||e.props.item.amount;return!!(c&&c>=2)&&"".concat(c,"\u0448\u0442")}},e.labels={wearable:"\u0417\u0430\u0449\u0438\u0442\u0430",weapon:"\u041c\u0430\u0433\u0430\u0437\u0438\u043d"},e.getFooter=function(){var t=e.props,n=t.footer,a=t.uid,r=e.props.item,c=r.failed,o=r.id;return c?i.createElement("div",{className:"item-footer"},i.createElement(l.Z,{disabled:!a,onClick:function(){return m.default.removeItem({uid:a,id:o,all:!0})}},i.createElement(u.Z,null))):!!n&&i.createElement("div",{className:"item-footer"},n)},e.render=function(){var t=e.props,n=t.disabled,a=t.item,r=a.name,c=void 0===r?a.id:r,o=a.price,l=void 0===o?0:o,u=a.description,m=a.image,f=a.effect,p=a.weight,h=void 0===p?0:p,v=a.type,b=a.approved,k=e.getStats();return i.createElement(s.Z,{className:"item ".concat(b&&!n?"":"disabled")},i.createElement("div",{className:"item-info"},i.createElement("div",{className:"item-name"},c),i.createElement("div",{className:"item-subinfo"},i.createElement("div",{className:"item-price"},l>0&&"\u0426\u0435\u043d\u0430: ".concat(l)),i.createElement("div",{className:"item-weight"},h>0&&"\u0412\u0435\u0441: ".concat(h,"lb")))),(m||u)&&i.createElement("div",{className:"item-body"},m&&i.createElement("div",{className:"item-image"},i.createElement(d.default,{avatar:m,nickname:c,shape:"square"})),u),(k||f)&&i.createElement("div",{className:"item-prefooter"},i.createElement("div",{className:"item-ammo"},k?"".concat(e.labels[v]||"\u041a\u043e\u043b-\u0432\u043e",": ").concat(k):""),i.createElement("div",{className:"item-effect"},f)),e.getFooter())},e}return(0,a.Z)(n)}(i.Component);t.default=f},8920:function(e,t,n){"use strict";n.r(t);var a=n(5987),r=n(2791),c=n(4233),o=n(9395),i=n(2404),l=["id","item"];t.default=(0,c.$j)((function(e,t){return{item:e.items.find((function(e){return e.id===t.id}))}}))((function(e){var t=e.id,n=e.item,c=(0,a.Z)(e,l);return n?r.createElement(o.default,Object.assign({item:n},c)):(i.default.getItemById({id:t}),r.createElement(r.Fragment,null))}))},9122:function(e,t,n){"use strict";n.r(t);var a=n(1413),r=n(3144),c=n(5671),o=n(136),i=n(4062),l=n(2791),s=n(4233),u=n(9271),d=n(9421),m=n(3347),f=n(1099),p=n(2756),h=n(1953),v=(n(6805),n(3824)),b=n(2404),k=n(3498),g=function(e){(0,o.Z)(n,e);var t=(0,i.Z)(n);function n(){var e;(0,c.Z)(this,n);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={notes:void 0,editMode:!1},e.componentDidMount=function(){var t=e.props,n=t.character,a=t.user,r=t.uid,c=t.currentUser,o=t.history;n?e.setState({notes:n.notes}):b.default.getCharacter({uid:r}),a||b.default.getUser({uid:r}),(0,v.redirectToUserPage)(a,c,o)},e.componentDidUpdate=function(t){var n=e.props,a=n.character,r=n.user,c=n.currentUser,o=n.history;t!==e.props&&a&&a.notes!==e.state.notes&&e.setState({notes:a.notes}),(0,v.redirectToUserPage)(r,c,o)},e.onSave=function(){var t=e.props.uid,n=e.state.notes;t&&void 0!==n&&b.default.setCharacterNotes({uid:t,notes:n})},e.componentWillUnmount=e.onSave,e.getTitle=function(e){return l.createElement(l.Fragment,null,l.createElement(h.Z,null)," ","\u0417\u0430\u043f\u0438\u0441\u0438 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f ",e.nickname)},e.render=function(){var t=e.props,n=t.user,r=t.currentUser,c=t.hasRight,o=t.character,i=t.uid;if(!n||!o)return l.createElement(d.Z,{description:"\u0414\u0430\u043d\u043d\u044b\u0435 \u043d\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u044b"});var s=n.notesAreVisible;return s||r&&(r.isAdmin||r.uid===i)?l.createElement(m.Z,{className:"notebook",title:e.getTitle(n)},l.createElement("div",{className:"notebook-switch"},l.createElement(f.Z,{checked:s,onChange:function(){return b.default.setUser({uid:i,user:(0,a.Z)((0,a.Z)({},n),{},{notesAreVisible:!s})})},disabled:!c}),l.createElement("span",null,s?"\u0417\u0430\u043f\u0438\u0441\u0438 \u0432\u0438\u0434\u043d\u044b \u0432\u0441\u0435\u043c":"\u0417\u0430\u043f\u0438\u0441\u0438 \u0432\u0438\u0434\u043d\u044b \u0442\u043e\u043b\u044c\u043a\u043e \u0412\u0430\u043c"),l.createElement("br",null),l.createElement(f.Z,{checked:e.state.editMode,onChange:function(){return e.setState({editMode:!e.state.editMode})},disabled:!c}),l.createElement("span",null,e.state.editMode?"\u0420\u0435\u0436\u0438\u043c \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f":"\u0420\u0435\u0436\u0438\u043c \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430")),e.state.editMode?l.createElement(p.Z.TextArea,{className:"notebook-input",value:e.state.notes,onChange:function(t){return e.setState({notes:t.currentTarget.value})},onBlur:e.onSave,readOnly:!c,autoSize:!0}):l.createElement(k.default,{message:{body:e.state.notes||"",author:n.uid,time:0}})):l.createElement(d.Z,{description:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u0441\u043a\u0440\u044b\u043b \u0441\u0432\u043e\u0438 \u0437\u0430\u043f\u0438\u0441\u0438 \u043e\u0442 \u043f\u043e\u0441\u0442\u043e\u0440\u043e\u043d\u043d\u0438\u0445"})},e}return(0,r.Z)(n)}(l.Component);t.default=(0,u.EN)((0,s.$j)(v.getStateUser)(g))},3498:function(e,t,n){"use strict";n.r(t);var a=n(2791),r=n(6776),c=n(4469),o=n(2756),i=n(8183),l=n(4964),s=n(2351),u=n(3824),d=n(7585),m=n(8920),f=n(2404),p=n(8272);t.default=function(e){var t=e.uid,n=e.message,h=n.body,v=n.isRP,b=n.rolls,k=n.data;if(k){var g=k.itemId,E=k.taken,y=k.amount,C=k.type,N=k.characterChanges,Z=k.perk;if(Z)return a.createElement(a.Fragment,null,a.createElement("i",{className:"rp-message"},h,a.createElement(p.default,{perk:Z})));if(N){var w=Object.values(N),O=function(e){switch(typeof e){case"string":case"number":return e;default:return[e.base&&"b:".concat(e.base),e.change&&"".concat(e.base?" + ":"","c:").concat(e.change),e.total&&" = t:".concat(e.total)].filter(Boolean).join("")}};return a.createElement(r.Z,null,a.createElement(r.Z.Panel,{key:"char-changes",header:h},w.map((function(e){var t=e.label,n=e.full,r=e.before,i=e.after;return a.createElement("div",{key:t,className:"chat-char-changes"},a.createElement(c.Z,{title:n},a.createElement("span",null,t)),a.createElement("div",null,a.createElement(o.Z,{value:O(r),readOnly:!0}),"->",a.createElement(o.Z,{value:O(i),readOnly:!0})))}))))}if(g)return a.createElement(a.Fragment,null,a.createElement("i",{className:"rp-message"},h),a.createElement("div",{className:E?"":"rp-message"},a.createElement(m.default,{id:g.trim(),amount:y,disabled:E,footer:t&&C?a.createElement(i.Z,{title:"\u041f\u043e\u0434\u043e\u0431\u0440\u0430\u0442\u044c \u043f\u0440\u0435\u0434\u043c\u0435\u0442?",onConfirm:function(){return f.default.takeItem({uid:t,message:n,data:k})},okText:"\u041f\u043e\u0434\u043e\u0431\u0440\u0430\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",disabled:E},a.createElement(l.Z,{className:"take-button",disabled:E},a.createElement(s.Z,null))):void 0})))}if((0,u.isURL)(h)){var j=(0,u.processLinks)(h);if(j)return a.createElement("span",null,j)}var x=b?(0,d.importRolls)(h,b):h;return v?a.createElement("i",{className:"rp-message"},x):a.createElement("span",null,x)}},8272:function(e,t,n){"use strict";n.r(t);var a=n(2791),r=n(8183),c=n(4964),o=n(732);n(2462);t.default=function(e){var t=e.perk,n=e.onDelete,i=e.hasRight;return a.createElement("div",{className:"perks-item"},n&&i&&a.createElement(r.Z,{title:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u043f\u0435\u0440\u043a?",okText:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",onConfirm:function(){return n(t)}},a.createElement(c.Z,{className:"perks-item-close"},a.createElement(o.Z,null))),a.createElement("div",{className:"perks-item-label"},t.label),a.createElement("div",{className:"perks-item-description"},t.description))}},1099:function(e,t,n){"use strict";var a=n(2791),r=n(718),c=n(1694),o=n.n(c),i=n(9),l=n(1329),s=n.n(l),u=n(345),d=n(9077),m=n(3081),f=n(8782);function p(){return p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},p.apply(this,arguments)}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var v=a.forwardRef((function(e,t){var n;(0,f.Z)("checked"in e||!("value"in e),"Switch","`value` is not a valid prop, do you mean `checked`?");var c=e.prefixCls,l=e.size,v=e.loading,b=e.className,k=void 0===b?"":b,g=e.disabled,E=a.useContext(d.E_),y=E.getPrefixCls,C=E.direction,N=a.useContext(m.Z),Z=y("switch",c),w=v?a.createElement(s(),{className:"".concat(Z,"-loading-icon")}):null,O=o()(k,(h(n={},"".concat(Z,"-small"),"small"===(l||N)),h(n,"".concat(Z,"-loading"),v),h(n,"".concat(Z,"-rtl"),"rtl"===C),n));return a.createElement(u.Z,{insertExtraNode:!0},a.createElement(r.default,p({},(0,i.Z)(e,["loading"]),{prefixCls:Z,className:O,disabled:g||v,ref:t,loadingIcon:w})))}));v.__ANT_SWITCH=!0,t.Z=v},961:function(e,t,n){"use strict";var a=n(2791),r=n(2007),c=n.n(r),o=n(3688);function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i.apply(this,arguments)}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function s(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function u(e){return u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},u(e)}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p=n(1694),h=function(e){function t(e){var n;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=function(e,t){return!t||"object"!==typeof t&&"function"!==typeof t?m(e):t}(this,u(t).call(this,e)),f(m(m(n)),"handleClick",(function(e){var t=n.state.checked,a=n.props.onClick,r=!t;n.setChecked(r,e),a&&a(r,e)})),f(m(m(n)),"handleKeyDown",(function(e){37===e.keyCode?n.setChecked(!1,e):39===e.keyCode&&n.setChecked(!0,e)})),f(m(m(n)),"handleMouseUp",(function(e){var t=n.props.onMouseUp;n.node&&n.node.blur(),t&&t(e)})),f(m(m(n)),"saveNode",(function(e){n.node=e}));var a=!1;return a="checked"in e?!!e.checked:!!e.defaultChecked,n.state={checked:a},n}var n,r,c;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,e),n=t,c=[{key:"getDerivedStateFromProps",value:function(e){var t={},n=e.checked;return"checked"in e&&(t.checked=!!n),t}}],(r=[{key:"componentDidMount",value:function(){var e=this.props,t=e.autoFocus,n=e.disabled;t&&!n&&this.focus()}},{key:"setChecked",value:function(e,t){var n=this.props,a=n.disabled,r=n.onChange;a||("checked"in this.props||this.setState({checked:e}),r&&r(e,t))}},{key:"focus",value:function(){this.node.focus()}},{key:"blur",value:function(){this.node.blur()}},{key:"render",value:function(){var e,t=this.props,n=t.className,r=t.prefixCls,c=t.disabled,o=t.loadingIcon,s=t.checkedChildren,u=t.unCheckedChildren,d=l(t,["className","prefixCls","disabled","loadingIcon","checkedChildren","unCheckedChildren"]),m=this.state.checked,h=p((f(e={},n,!!n),f(e,r,!0),f(e,"".concat(r,"-checked"),m),f(e,"".concat(r,"-disabled"),c),e));return a.createElement("button",i({},d,{type:"button",role:"switch","aria-checked":m,disabled:c,className:h,ref:this.saveNode,onKeyDown:this.handleKeyDown,onClick:this.handleClick,onMouseUp:this.handleMouseUp}),o,a.createElement("span",{className:"".concat(r,"-inner")},m?s:u))}}])&&s(n.prototype,r),c&&s(n,c),t}(a.Component);h.propTypes={className:c().string,prefixCls:c().string,disabled:c().bool,checkedChildren:c().any,unCheckedChildren:c().any,onChange:c().func,onMouseUp:c().func,onClick:c().func,tabIndex:c().number,checked:c().bool,defaultChecked:c().bool,autoFocus:c().bool,loadingIcon:c().node},h.defaultProps={prefixCls:"rc-switch",checkedChildren:null,unCheckedChildren:null,className:"",defaultChecked:!1},(0,o.O)(h),t.default=h},718:function(e,t,n){e.exports=n(961)},1554:function(e,t,n){"use strict";n.r(t),t.default={}},6805:function(e,t,n){"use strict";n.r(t),t.default={}},2462:function(e,t,n){"use strict";n.r(t),t.default={}}}]);
//# sourceMappingURL=122.c3ef1b99.chunk.js.map