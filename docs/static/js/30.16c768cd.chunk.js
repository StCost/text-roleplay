(this["webpackJsonptext-roleplay"]=this["webpackJsonptext-roleplay"]||[]).push([[30],{258:function(e,t,n){"use strict";n.r(t);var r=n(473),a=n(47),o=n(49),l=n(48),i=n(0),c=n.n(i),s=n(446),u=n(99),p=n(71),f=n(102),d=n(4),b=function(e){Object(o.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(a.a)(this,n);for(var o=arguments.length,l=new Array(o),i=0;i<o;i++)l[i]=arguments[i];return(e=t.call.apply(t,[this].concat(l))).uploadFile=function(t,n){if(t){if(t.type.indexOf("image")>-1)if(FileReader){var r=new FileReader;r.onload=function(n){n.target&&n.target.result&&"string"===typeof n.target.result&&s.a.confirm({title:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435?",content:c.a.createElement(f.default,{src:n.target.result,noTitle:!0}),onOk:function(n){n(),d.default.uploadFile({file:t,onFinish:function(t){return e.props.onUpload(t)}})},okText:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c",cancelText:"\u041e\u0442\u043c\u0435\u043d\u0430",maskClosable:!0,centered:!0})},r.readAsDataURL(t)}else u.a.error("\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u043e\u043c");else u.a.error("\u0422\u043e\u043b\u044c\u043a\u043e \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0438 \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u044b");n.preventDefault()}},e.onPaste=function(t){e.uploadFile(t.clipboardData.files[0],t)},e.onDrop=function(t){var n=t.dataTransfer.items[0].getAsFile();n&&e.uploadFile(n,t)},e.render=function(){var t=e.props,n=t.textArea,a=(t.onUpload,Object(r.a)(t,["textArea","onUpload"]));return n?c.a.createElement(p.a.TextArea,Object.assign({},a,{onPaste:e.onPaste,onDrop:e.onDrop})):c.a.createElement(p.a,Object.assign({},a,{onPaste:e.onPaste,onDrop:e.onDrop}))},e}return n}(i.Component);t.default=b},473:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}n.d(t,"a",(function(){return r}))}}]);
//# sourceMappingURL=30.16c768cd.chunk.js.map