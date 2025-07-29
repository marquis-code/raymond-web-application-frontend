import{u as y,r as i,f as w,Y as g,E as v,O as f,a0 as u}from"./B5jWEhsj.js";const{showToast:d}=v(),{createUser:C}=f(),c={firstName:i(""),lastName:i(""),email:i(""),role:i(""),password:i("")},A=()=>{y();const e=i(!1),t=w(()=>e.value||!c.firstName.value||!c.lastName.value||!c.password.value||!c.email.value||!c.role.value);return{credential:c,signup:async a=>{var o;e.value=!0;const s=await g.$_signup({firstName:a.firstName,lastName:a.lastName,role:a.role,email:a.email,password:a.password});return s.type!=="ERROR"?(d({title:"Success",message:"Signup was successfully",toastType:"success",duration:3e3}),C(s.data)):(console.log(s,"tes here"),d({title:"Error",message:((o=s==null?void 0:s.data)==null?void 0:o.message)||"Something went wrong",toastType:"error",duration:3e3})),s},loading:e,isFormDisabled:t}};/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),M=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,a)=>a?a.toUpperCase():r.toLowerCase()),b=e=>{const t=M(e);return t.charAt(0).toUpperCase()+t.slice(1)},x=(...e)=>e.filter((t,r,a)=>!!t&&t.trim()!==""&&a.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=({size:e,strokeWidth:t=2,absoluteStrokeWidth:r,color:a,iconNode:s,name:o,class:j,...m},{slots:h})=>u("svg",{...n,width:e||n.width,height:e||n.height,stroke:a||n.stroke,"stroke-width":r?Number(t)*24/Number(e):t,class:x("lucide",...o?[`lucide-${p(b(o))}-icon`,`lucide-${p(o)}`]:["lucide-icon"]),...m},[...s.map(k=>u(...k)),...h.default?[h.default()]:[]]);/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=(e,t)=>(r,{slots:a})=>u(N,{...r,iconNode:t,name:e},a);/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=l("circle-check-big",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=l("loader",[["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m16.2 7.8 2.9-2.9",key:"r700ao"}],["path",{d:"M18 12h4",key:"wj9ykh"}],["path",{d:"m16.2 16.2 2.9 2.9",key:"1bxg5t"}],["path",{d:"M12 18v4",key:"jadmvz"}],["path",{d:"m4.9 19.1 2.9-2.9",key:"bwix9q"}],["path",{d:"M2 12h4",key:"j09sii"}],["path",{d:"m4.9 4.9 2.9 2.9",key:"giyufr"}]]);/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=l("lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=l("shopping-bag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=l("truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]]);/**
 * @license lucide-vue-next v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=l("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);export{T as C,S as L,_ as S,$ as T,B as U,U as a,l as c,A as u};
