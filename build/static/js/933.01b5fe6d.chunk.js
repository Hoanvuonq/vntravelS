"use strict";(self.webpackChunklearning_typescript=self.webpackChunklearning_typescript||[]).push([[933],{40933:(s,e,t)=>{t.r(e),t.d(e,{default:()=>o});var a=t(14710),c=t(78445),i=t(20682),r=t(81331),l=t(79706),n=t(91046);const o=s=>{let{user:e}=s;const[t,o]=(0,a.useState)([]);(0,a.useEffect)((()=>{(async()=>{try{const s=await(0,r.AV)(e._id);s.withdraws&&s.withdraws&&s.withdraws&&o(s.withdraws)}catch(s){console.error("L\u1ed7i khi l\u1ea5y l\u1ecbch s\u1eed giao d\u1ecbch:",s)}})()}),[e._id]);return(0,n.jsx)("div",{className:"flex flex-col gap-[1vw]",children:t.map((s=>(0,n.jsxs)("div",{className:"flex items-center justify-between gap-[1vw] border-t-[0.1vw] border-gray-300 pt-[0.5vw]",children:[(0,n.jsxs)("div",{className:"flex items-center xl:gap-[2vw] gap-[6vw]",children:[(0,n.jsx)("img",{src:c.z.Total1,alt:"withdraw",className:"xl:w-[3vw] w-[10vw] hover-items"}),(0,n.jsxs)("p",{children:[s.amount," VN\u0110"]}),(0,n.jsx)("p",{children:s.status})]}),s.status.toLowerCase()===l.x.PENDING.toLowerCase()&&(0,n.jsxs)("div",{className:"flex gap-[1vw]",children:[(0,n.jsx)(i.Tooltip,{content:"X\xe1c Nh\u1eadn",children:(0,n.jsx)("img",{src:c.z.checkIcon,alt:"check",className:"w-[2vw] hover-items",onClick:()=>(async s=>{try{await(0,r.n5)(s),o(t.map((e=>e._id===s?{...e,status:l.x.SUCCESS}:e)))}catch(e){console.error("L\u1ed7i khi x\xe1c nh\u1eadn giao d\u1ecbch:",e)}})(s._id)})}),(0,n.jsx)(i.Tooltip,{content:"H\u1ee7y \u0110\u01a1n",children:(0,n.jsx)("img",{src:c.z.errorIcon,alt:"reject",className:"w-[2vw] hover-items",onClick:()=>(async s=>{try{await(0,r.U8)(s),o(t.map((e=>e._id===s?{...e,status:l.x.ERROR}:e)))}catch(e){console.error("L\u1ed7i khi t\u1eeb ch\u1ed1i giao d\u1ecbch:",e)}})(s._id)})})]})]},s._id)))})}}}]);
//# sourceMappingURL=933.01b5fe6d.chunk.js.map