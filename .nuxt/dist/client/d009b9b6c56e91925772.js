(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{408:function(e,t,n){"use strict";n.r(t);n(31),n(278),n(5);var r,c=n(3),o={name:"AddressPage",components:{Destination:n(42).a},asyncData:(r=Object(c.a)(regeneratorRuntime.mark((function e(t){var n,r,c,o,d,l,m;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.params,r=t.$api,c=t.query,o=t.store,e.next=3,r.address.get(n.id);case 3:return d=e.sent,l={page_size:9,address:d.id,page:c.page?Number.parseInt(c.page):1},e.next=7,r.activity.list(l);case 7:return m=e.sent,d.address_components=d.address_components?d.address_components.reverse():[],o.commit("config/SET_TARGET",d),o.commit("config/SET_TARGET_MODEL","address"),e.abrupt("return",{address:d,activityRes:m,queries:l});case 12:case"end":return e.stop()}}),e)}))),function(e){return r.apply(this,arguments)}),data:function(){return{hidden:!1}},watchQuery:!0,head:function(){return{title:this.address.formatted_address}},mounted:function(){this.toTop()}},d=n(1),component=Object(d.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"hero"},[t("div",{staticClass:"hero-body"},[t("div",{staticClass:"container"},[t("activity-list",{attrs:{value:this.activityRes,q:this.queries}})],1)])])}),[],!1,null,null,null);t.default=component.exports}}]);