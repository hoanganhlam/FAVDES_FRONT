exports.ids=[4],exports.modules={71:function(t,e,o){"use strict";o.r(e);var c={name:"HomePage",asyncData:async({$api:t,params:e,query:o})=>({activity:await t.activity.get(e.activity)}),data:()=>({}),head(){return{title:this.title}},methods:{},computed:{title(){let t=this.activity;return t&&t.action_object&&t.action_object.title?t.action_object.title:t.action_object.content}},mounted(){this.toTop()}},l=o(1),component=Object(l.a)(c,(function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"hero"},[this._ssrNode('<div class="hero-body">',"</div>",[this._ssrNode('<div class="container">',"</div>",[this._ssrNode('<div class="columns">',"</div>",[this._ssrNode('<div class="column is-8">',"</div>",[e("ActivityDetail",{attrs:{value:this.activity}})],1),this._ssrNode(" "),this._ssrNode('<div class="column">',"</div>",[e("user-follow")],1)],2)])])])}),[],!1,null,null,"66d7773e");e.default=component.exports}};