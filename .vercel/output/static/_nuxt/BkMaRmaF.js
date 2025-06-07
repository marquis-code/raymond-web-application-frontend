import{c as r,b as u}from"./BVR-Olpb.js";import{J as n,r as a,D as p,H as m}from"./Daz8KKXB.js";import{u as h}from"./BJc4oWiV.js";/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=r("circle-check-big",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=r("shopping-bag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=r("truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]]);/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=r("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]),{showToast:i}=m(),{createUser:d}=h(),s={firstName:a(""),lastName:a(""),email:a(""),role:a(""),password:a("")},T=()=>{n();const c=a(!1),l=p(()=>c.value||!s.firstName.value||!s.lastName.value||!s.password.value||!s.email.value||!s.role.value);return{credential:s,signup:async t=>{var o;c.value=!0;const e=await u.$_signup({firstName:t.firstName,lastName:t.lastName,role:t.role,email:t.email,password:t.password});return e.type!=="ERROR"?(i({title:"Success",message:"Signup was successfully",toastType:"success",duration:3e3}),d(e.data)):(console.log(e,"tes here"),i({title:"Error",message:((o=e==null?void 0:e.data)==null?void 0:o.message)||"Something went wrong",toastType:"error",duration:3e3})),e},loading:c,isFormDisabled:l}};export{w as C,f as S,M as T,N as U,T as u};
