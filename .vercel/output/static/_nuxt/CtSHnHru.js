import{u}from"./DV4RNhg2.js";import{b as n,c as l}from"./qWfVCmuZ.js";import{J as m,r as o,C as p,H as d}from"./YPhWyupa.js";const{showToast:c}=d(),a={email:o(""),password:o("")},f=()=>{m();const e=o(!1),i=p(()=>e.value||!a.email.value||!a.password.value);return{credential:a,login:async t=>{var r;e.value=!0;const s=await n.$_login({email:t.email,password:t.password});return console.log(s,"rse hee"),s.status===200||s.status===201?(u().createUser(s.data),c({title:"Success",message:"Login was successfully",toastType:"success",duration:3e3})):c({title:"Error",message:((r=s==null?void 0:s.data)==null?void 0:r.error)||"Something went wrong",toastType:"error",duration:3e3}),s},loading:e,isFormDisabled:i}};/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=l("shopping-cart",[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]]);export{v as S,f as u};
