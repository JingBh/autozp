(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{238:function(t,e,n){"use strict";n.r(e);var o=n(108),r={data:function(){return{code:"",valid:null}},methods:{onSubmit:function(t){var e=this;t.preventDefault(),this.$axios.$post("invite/verify",{code:this.code}).then((function(t){var n=!0===t;e.valid=n,n&&(e.$store.commit("inviteVerified",!0),e.$router.push("/"))})).catch((function(t){console.error(t),alert("请求过程中发生错误。")}))}}},l=n(32),c=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-form",{on:{submit:t.onSubmit}},[n("b-form-group",{attrs:{label:"邀请码","label-for":"inputInviteCode"}},[n("b-form-input",{attrs:{type:"text",id:"inputInviteCode",placeholder:"请输入邀请码",state:t.valid,required:""},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),t._v(" "),n("b-form-invalid-feedback",{attrs:{state:t.valid}},[t._v("邀请码无效，请检查输入是否正确。")])],1),t._v(" "),n("b-button",{attrs:{block:"",type:"submit",variant:"primary"}},[t._v("提交")])],1)}),[],!1,null,null,null).exports,d={components:{Logo:o.a,InviteCode:c},head:{title:"验证邀请码 - AutoZP"}},v=Object(l.a)(d,(function(){var t=this.$createElement,e=this._self._c||t;return e("b-container",{staticClass:"my-5 text-center"},[e("h1",{staticClass:"mb-5"},[e("logo")],1),this._v(" "),e("b-row",{staticClass:"justify-content-center"},[e("b-col",{attrs:{cols:"10",sm:"7",md:"5",lg:"3"}},[e("invite-code")],1)],1)],1)}),[],!1,null,null,null);e.default=v.exports}}]);