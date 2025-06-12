import{U as n,r as t,N as u,R as l,S as m,D as p}from"./Bq4bZCFA.js";import{c as d}from"./Ct9L6SDY.js";const{showToast:c}=p(),a={email:t(""),password:t("")},y=()=>{n();const e=t(!1),i=u(()=>e.value||!a.email.value||!a.password.value);return{credential:a,login:async o=>{var r;e.value=!0;const s=await l.$_login({email:o.email,password:o.password});return console.log(s,"rse hee"),s.status===200||s.status===201?(m().createUser(s.data),c({title:"Success",message:"Login was successfully",toastType:"success",duration:3e3})):c({title:"Error",message:((r=s==null?void 0:s.data)==null?void 0:r.error)||"Something went wrong",toastType:"error",duration:3e3}),s},loading:e,isFormDisabled:i}};/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=d("shopping-cart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]);export{f as S,y as u};
