"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2262],{52991:(e,t,n)=>{n.d(t,{Z:()=>k});var r=n(67294),a=n(34334),s=n(53438),o=n(39960),i=n(13919),c=n(95999);const l="cardContainer_fWXF",u="cardTitle_rnsV",d="cardDescription_PWke";function m(e){let{href:t,children:n}=e;return r.createElement(o.Z,{href:t,className:(0,a.Z)("card padding--lg",l)},n)}function g(e){let{href:t,icon:n,title:s,description:o}=e;return r.createElement(m,{href:t},r.createElement("h2",{className:(0,a.Z)("text--truncate",u),title:s},n," ",s),o&&r.createElement("p",{className:(0,a.Z)("text--truncate",d),title:o},o))}function f(e){let{item:t}=e;const n=(0,s.Wl)(t);return n?r.createElement(g,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:(0,c.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function p(e){var t;let{item:n}=e;const a=(0,i.Z)(n.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",o=(0,s.xz)(null!=(t=n.docId)?t:void 0);return r.createElement(g,{href:n.href,icon:a,title:n.label,description:null==o?void 0:o.description})}function h(e){let{item:t}=e;switch(t.type){case"link":return r.createElement(p,{item:t});case"category":return r.createElement(f,{item:t});default:throw new Error("unknown item type "+JSON.stringify(t))}}function y(e){let{className:t}=e;const n=(0,s.jA)();return r.createElement(k,{items:n.items,className:t})}function k(e){const{items:t,className:n}=e;if(!t)return r.createElement(y,e);const o=(0,s.MN)(t);return r.createElement("section",{className:(0,a.Z)("row",n)},o.map(((e,t)=>r.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},r.createElement(h,{item:e})))))}},91272:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var r=n(83117),a=(n(67294),n(3905)),s=(n(61839),n(52991));const o={},i="Frontends",c={unversionedId:"understand-vast/query-language/frontends/README",id:"understand-vast/query-language/frontends/README",title:"Frontends",description:"A query language frontend is the representation of query. VAST features a",source:"@site/docs/understand-vast/query-language/frontends/README.md",sourceDirName:"understand-vast/query-language/frontends",slug:"/understand-vast/query-language/frontends/",permalink:"/docs/understand-vast/query-language/frontends/",draft:!1,editUrl:"https://github.com/tenzir/vast/tree/master/web/docs/understand-vast/query-language/frontends/README.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"where",permalink:"/docs/understand-vast/query-language/operators/where"},next:{title:"Sigma",permalink:"/docs/understand-vast/query-language/frontends/sigma"}},l={},u=[],d={toc:u};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"frontends"},"Frontends"),(0,a.kt)("p",null,"A query language ",(0,a.kt)("em",{parentName:"p"},"frontend")," is the representation of query. VAST features a\n",(0,a.kt)("a",{parentName:"p",href:"/docs/understand-vast/architecture/plugins#query-language"},"query language plugin")," that allows for exchanging the\nquery frontend by replacing it with a different language."),(0,a.kt)("p",null,"The ",(0,a.kt)("a",{parentName:"p",href:"."},(0,a.kt)("strong",{parentName:"a"},"VAST")," ",(0,a.kt)("strong",{parentName:"a"},"Q"),"uery ",(0,a.kt)("strong",{parentName:"a"},"L"),"anguage (VASTQL)")," is the default query language\nfrontend. Besides VAST, the following frontends ship with VAST:"),(0,a.kt)(s.Z,{mdxType:"DocCardList"}))}m.isMDXComponent=!0}}]);