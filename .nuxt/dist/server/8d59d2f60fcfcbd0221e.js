exports.ids=[1],exports.modules={74:function(t,e,n){"use strict";n.r(e);var o={name:"HomePage",components:{Destination:n(4).a},async asyncData({$api:t,params:e,query:n,store:o}){let d=null,q={page:Number.parseInt(n.page)||1,page_size:9};e.flag&&(q.hashtag=e.flag),e.destination&&!["hashtag","anywhere"].includes(e.destination)&&(d=await t.destination.get(e.destination),q.destination=d.id);let r=await t.activity.list(q);return o.commit("config/SET_TARGET",{...d}),o.commit("config/SET_TARGET_MODEL","destination"),{destination:d,response:r,q:q,responseD:await t.destination.list({page_size:3})}},data:()=>({updating:!1}),head(){return{title:this.title}},methods:{handleClick(){this.updating?this.push():this.updating=!0},async push(){let data=this.cleanData(this.destination);this.destination.id&&await this.$api.destination.update(this.destination.slug,data),this.updating=!1}},computed:{title(){let t=this.$route.params;return this.$auth.loggedIn&&void 0===t.activity&&void 0===t.flag?`Welcome, ${this.convertName(this.$auth.user)}`:t.flag?this.destination?this.subtitle+` in ${this.destination.title}`:this.subtitle:t.destination?`${this.destination.title} Checkin | ${this.destination.title} Photos`:"9Destination - Get inspired and share your best moment!"},subtitle(){return"#"+this.$route.params.flag},tag_line(){return this.$auth.loggedIn?"Get inspired and share your moment!":"Get inspired and share your best moment!"}},mounted(){this.toTop()}},d=n(1),component=Object(d.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"destination-page"},[t._ssrNode('<section class="hero">',"</section>",[t._ssrNode('<div class="hero-body">',"</div>",[t._ssrNode('<div class="container">',"</div>",[void 0===t.$route.params.flag?t._ssrNode('<div class="columns">',"</div>",[t._ssrNode('<div class="column">',"</div>",[t._ssrNode('<div class="content">',"</div>",[t._ssrNode('<p class="subtitle">',"</p>",[t.destination?n("editable",{attrs:{icon:"text",type:"textarea","is-updating":t.updating},model:{value:t.destination.description,callback:function(e){t.$set(t.destination,"description",e)},expression:"destination.description"}}):n("span",[t._v(t._s(t.tag_line))])],1)]),t._ssrNode(" "),t.updating&&t.destination&&t.destination.photos?t._ssrNode('<div class="columns is-mobile">',"</div>",[t._ssrNode(t._ssrList(t.destination.photos,(function(p){return'<div class="column is-3"><div class="image"><img'+t._ssrAttr("src",p.sizes["270_270"])+" alt></div></div>"}))+" "),t._ssrNode("<div"+t._ssrClass("column",{"is-3":t.destination.photos.length})+">","</div>",[n("Upload",{on:{done:function(e){t.destination.photos=e}}})],1)],2):t._e()],2),t._ssrNode(" "),t._ssrNode('<div class="column is-3">',"</div>",[t._ssrNode('<div class="buttons is-right-desktop">',"</div>",[n("b-dropdown",{staticStyle:{"margin-right":"0.5rem"},attrs:{"aria-role":"list"}},[n("button",{staticClass:"button",attrs:{slot:"trigger"},slot:"trigger"},[n("b-icon",{attrs:{size:"is-small",icon:"fire"}})],1),t._v(" "),n("b-dropdown-item",{attrs:{"aria-role":"listitem"}},[t._v("Hot")]),t._v(" "),n("b-dropdown-item",{attrs:{"aria-role":"listitem"}},[t._v("New")])],1),t._ssrNode(" "),t.destination?n("follow",{attrs:{model:"destination",pk:t.destination.id}}):t._e(),t._ssrNode(" "),t._ssrNode('<div class="button">',"</div>",[n("b-icon",{attrs:{size:"is-small",icon:"refresh"}})],1),t._ssrNode(" "),t.destination?t._ssrNode("<div"+t._ssrClass("button",{"is-success":t.updating})+">","</div>",[n("b-icon",{attrs:{size:"is-small",icon:t.updating?"check":"pen"}})],1):t._e()],2)])],2):t.$route.params.flag?t._ssrNode('<div><h1 class="title">'+t._ssrEscape(t._s(t.title))+"</h1></div>"):t._e(),t._ssrNode(" "),n("activity-list",{attrs:{q:t.q,value:t.response}})],2)])]),t._ssrNode(" "),t._ssrNode('<div class="section has-background-light">',"</div>",[t._ssrNode('<div class="container">',"</div>",[t._ssrNode('<div class="columns is-multiline">',"</div>",t._l(t.responseD.results,(function(e,i){return t._ssrNode('<div class="column is-4">',"</div>",[n("destination",{attrs:{value:e}})],1)})),0)])])],2)}),[],!1,null,null,"525436a2");e.default=component.exports}};