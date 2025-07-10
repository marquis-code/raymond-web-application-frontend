import{aa as o,U as t,S as s,E as u}from"./CIplC_IQ.js";const c=o((i,n)=>{t().initUser();const{isAuthenticated:e}=t(),a=s().getAuthToken();if(!e.value||!a)return u("/login")});export{c as default};
