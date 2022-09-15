"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3349],{52991:(e,t,r)=>{r.d(t,{Z:()=>E});var n=r(67294),s=r(34334),o=r(53438),c=r(39960),i=r(13919),a=r(95999);const l="cardContainer_fWXF",d="cardTitle_rnsV",m="cardDescription_PWke";function p(e){let{href:t,children:r}=e;return n.createElement(c.Z,{href:t,className:(0,s.Z)("card padding--lg",l)},r)}function u(e){let{href:t,icon:r,title:o,description:c}=e;return n.createElement(p,{href:t},n.createElement("h2",{className:(0,s.Z)("text--truncate",d),title:o},r," ",o),c&&n.createElement("p",{className:(0,s.Z)("text--truncate",m),title:c},c))}function v(e){let{item:t}=e;const r=(0,o.Wl)(t);return r?n.createElement(u,{href:r,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:(0,a.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function f(e){var t;let{item:r}=e;const s=(0,i.Z)(r.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",c=(0,o.xz)(null!=(t=r.docId)?t:void 0);return n.createElement(u,{href:r.href,icon:s,title:r.label,description:null==c?void 0:c.description})}function h(e){let{item:t}=e;switch(t.type){case"link":return n.createElement(f,{item:t});case"category":return n.createElement(v,{item:t});default:throw new Error("unknown item type "+JSON.stringify(t))}}function g(e){let{className:t}=e;const r=(0,o.jA)();return n.createElement(E,{items:r.items,className:t})}function E(e){const{items:t,className:r}=e;if(!t)return n.createElement(g,e);const c=(0,o.MN)(t);return n.createElement("section",{className:(0,s.Z)("row",r)},c.map(((e,t)=>n.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},n.createElement(h,{item:e})))))}},61605:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>c,metadata:()=>a,toc:()=>d});var n=r(83117),s=(r(67294),r(3905)),o=(r(61839),r(52991));const c={},i="Develop VAST",a={unversionedId:"develop-vast/README",id:"develop-vast/README",title:"Develop VAST",description:"This section describes VAST from a developer perspective. We cover the",source:"@site/docs/develop-vast/README.md",sourceDirName:"develop-vast",slug:"/develop-vast/",permalink:"/docs/develop-vast/",draft:!1,editUrl:"https://github.com/tenzir/vast/tree/master/web/docs/develop-vast/README.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Sigma",permalink:"/docs/understand-vast/query-language/frontends/sigma"},next:{title:"Contributing",permalink:"/docs/develop-vast/contributing/"}},l={},d=[],m={toc:d};function p(e){let{components:t,...r}=e;return(0,s.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"develop-vast"},"Develop VAST"),(0,s.kt)("p",null,"This section describes VAST from a ",(0,s.kt)("strong",{parentName:"p"},"developer perspective"),". We cover the\nfollowing topics:"),(0,s.kt)(o.Z,{mdxType:"DocCardList"}))}p.isMDXComponent=!0}}]);