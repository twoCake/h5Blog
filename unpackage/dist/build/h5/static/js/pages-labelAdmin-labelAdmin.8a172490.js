(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-labelAdmin-labelAdmin"],{"4fbb":function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return l})),a.d(t,"a",(function(){return n}));var n={uniIcons:a("465f").default},i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"label-container"},[a("v-uni-view",{staticClass:"label-box"},[a("v-uni-view",{staticClass:"label-header"},[a("v-uni-view",{staticClass:"label-title"},[e._v("我的标签")]),a("v-uni-view",{staticClass:"label-edit",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.changeEditStatus.apply(void 0,arguments)}}},[e._v(e._s(e.isEdit?"完成":"编辑"))])],1),a("v-uni-view",{staticClass:"label-content"},[e._l(e.selfLabelList,(function(t){return a("v-uni-view",{key:t._id,staticClass:"label-content-item"},[e._v(e._s(t.name)),e.isEdit?a("uni-icons",{attrs:{type:"clear",size:"20",color:"red"},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.deleteLabelItem(t)}}}):e._e()],1)})),e.selfLabelList.length?e._e():a("v-uni-view",{staticClass:"no-data"},[e._v("当前没有数据")])],2)],1),a("v-uni-view",{staticClass:"label-box"},[a("v-uni-view",{staticClass:"label-header"},[a("v-uni-view",{staticClass:"label-title"},[e._v("标签推荐")])],1),a("v-uni-view",{staticClass:"label-content"},[e._l(e.recommendLabelList,(function(t){return a("v-uni-view",{key:t._id,staticClass:"label-content-item",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.changeSelfLabelList(t)}}},[e._v(e._s(t.name))])})),e.recommendLabelList.length?e._e():a("v-uni-view",{staticClass:"no-data"},[e._v("当前没有数据")])],2)],1)],1)},l=[]},"5e31":function(e,t,a){var n=a("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-8b10dde0]{background-color:#f5f5f5}body.?%PAGE?%[data-v-8b10dde0]{background-color:#f5f5f5}.label-container .label-box[data-v-8b10dde0]{margin-bottom:%?20?%;background-color:#fff}.label-container .label-box .label-header[data-v-8b10dde0]{display:flex;align-items:center;justify-content:space-between;flex-direction:row;flex-wrap:nowrap;padding:%?20?% %?30?%;font-size:%?28?%;border-bottom:%?1?% solid #f5f5f5}.label-container .label-box .label-header .label-title[data-v-8b10dde0]{color:#666}.label-container .label-box .label-header .label-edit[data-v-8b10dde0]{color:#30b33a;font-weight:700}.label-container .label-box .label-content[data-v-8b10dde0]{display:flex;align-items:center;justify-content:flex-start;flex-direction:row;flex-wrap:wrap;padding:0 %?30?% %?30?%}.label-container .label-box .label-content .label-content-item[data-v-8b10dde0]{position:relative;padding:%?4?% %?10?%;margin:%?24?% %?20?% 0 0;border-radius:%?10?%;border:%?1?% solid #666;font-size:%?28?%;color:#666}.label-container .label-box .label-content .label-content-item .icon-close[data-v-8b10dde0]{position:absolute;right:%?-16?%;top:%?-16?%;background-color:#fff;border-radius:50%}.label-container .no-data[data-v-8b10dde0]{width:100%;font-size:%?28?%;color:#ddd;text-align:center;padding:%?100?% 0}',""]),e.exports=t},"7e43":function(e,t,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("d81d"),a("14d9"),a("4de4"),a("d3b7"),a("caad"),a("2532");var i=n(a("c7eb")),l=n(a("1da1")),s=n(a("5530")),r=a("26cb"),d={data:function(){return{isEdit:!1,labelIds:[]}},watch:{userInfo:{immediate:!0,handler:function(e,t){this.labelIds=this.userInfo.label_ids}}},methods:(0,s.default)({changeEditStatus:function(){this.isEdit&&this.updateLabel(),this.isEdit=!this.isEdit},updateLabel:function(){var e=this;return(0,l.default)((0,i.default)().mark((function t(){var a,n,l;return(0,i.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.selfLabelList.map((function(e){return e._id})),t.next=3,e.$http.update_label_list({label_ids:a,userId:e.userInfo._id});case 3:n=t.sent,l=n.msg,uni.showToast({title:l,icon:"none"}),e.updateUserInfo((0,s.default)((0,s.default)({},e.userInfo),{},{label_ids:a}));case 7:case"end":return t.stop()}}),t)})))()},changeSelfLabelList:function(e){this.isEdit&&this.labelIds.push(e._id)},deleteLabelItem:function(e){this.labelIds=this.labelIds.filter((function(t){return t!==e._id}))}},(0,r.mapMutations)(["updateUserInfo"])),computed:(0,s.default)((0,s.default)({},(0,r.mapState)(["labelList"])),{},{selfLabelList:function(){var e=this;return this.labelList.filter((function(t){return e.labelIds.includes(t._id)}))},recommendLabelList:function(){var e=this;return this.labelList.filter((function(t){return!e.labelIds.includes(t._id)&&t._id}))}})};t.default=d},bf16:function(e,t,a){"use strict";a.r(t);var n=a("4fbb"),i=a("c0bd");for(var l in i)["default"].indexOf(l)<0&&function(e){a.d(t,e,(function(){return i[e]}))}(l);a("fea2");var s=a("f0c5"),r=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"8b10dde0",null,!1,n["a"],void 0);t["default"]=r.exports},c0bd:function(e,t,a){"use strict";a.r(t);var n=a("7e43"),i=a.n(n);for(var l in n)["default"].indexOf(l)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(l);t["default"]=i.a},efa9:function(e,t,a){var n=a("5e31");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("0e1a4910",n,!0,{sourceMap:!1,shadowMode:!1})},fea2:function(e,t,a){"use strict";var n=a("efa9"),i=a.n(n);i.a}}]);