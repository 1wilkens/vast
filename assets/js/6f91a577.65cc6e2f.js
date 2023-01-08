"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8152],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>f});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=a.createContext({}),l=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=l(e.components);return a.createElement(p.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=l(t),f=r,m=c["".concat(p,".").concat(f)]||c[f]||d[f]||o;return t?a.createElement(m,i(i({ref:n},u),{},{components:t})):a.createElement(m,i({ref:n},u))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=c;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=t[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},5759:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var a=t(87462),r=(t(67294),t(3905));const o={sidebar_position:1},i="Pipelines",s={unversionedId:"understand/query-language/pipelines",id:"understand/query-language/pipelines",title:"Pipelines",description:"A pipeline is chain of operators that represents a dataflow. An",source:"@site/docs/understand/query-language/pipelines.md",sourceDirName:"understand/query-language",slug:"/understand/query-language/pipelines",permalink:"/docs/understand/query-language/pipelines",draft:!1,editUrl:"https://github.com/tenzir/vast/tree/master/web/docs/understand/query-language/pipelines.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Expressions",permalink:"/docs/understand/query-language/expressions"},next:{title:"Operators",permalink:"/docs/understand/query-language/operators/"}},p={},l=[{value:"Define a pipeline",id:"define-a-pipeline",level:2}],u={toc:l};function d(e){let{components:n,...o}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,o,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"pipelines"},"Pipelines"),(0,r.kt)("p",null,"A pipeline is chain of ",(0,r.kt)("a",{parentName:"p",href:"operators"},"operators")," that represents a dataflow. An\noperator consumes data, performs a transformation, and produces new data,\npossibly with a different schema. Think of it as UNIX pipes where output from\none command is input to the next."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Query Language",src:t(43231).Z+"#gh-light-mode-only",width:"1258",height:"260"}),"\n",(0,r.kt)("img",{alt:"Query Language",src:t(94919).Z+"#gh-dark-mode-only",width:"1258",height:"260"})),(0,r.kt)("p",null,"The basic idea is that a query consists of two connected pieces: a ",(0,r.kt)("em",{parentName:"p"},"dataset")," to\nrepresent a data source and a ",(0,r.kt)("em",{parentName:"p"},"pipeline")," as a squence of operators to process\nthe data."),(0,r.kt)("p",null,"To date, a VAST ",(0,r.kt)("a",{parentName:"p",href:"expressions"},"expression")," takes the role of a dataset and you\ncan only ",(0,r.kt)("a",{parentName:"p",href:"/docs/use/transform"},"define a pipeline")," statically in the YAML\nconfiguration. Being able to execute pipeline as part of the query is our most\nrequested feature, and we are actively working on bringing this ability into the\nquery language."),(0,r.kt)("h2",{id:"define-a-pipeline"},"Define a pipeline"),(0,r.kt)("p",null,"Add a uniquely named pipeline under the key ",(0,r.kt)("inlineCode",{parentName:"p"},"vast.pipelines")," in the\nconfiguration file:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'vast:\n  pipelines:\n     example:\n       - hash:\n           field: src_ip\n           out: pseudonym\n           salt: "B3IwnumKPEJDAA4u"\n       - summarize:\n           group-by:\n             - src_ip\n             - dest_ip\n           aggregate:\n             flow.pkts_toserver: sum\n             flow.pkts_toclient: sum\n             flow.bytes_toserver: sum\n             flow.bytes_toclient: sum\n             flow.start: min\n             flow.end: max\n')),(0,r.kt)("p",null,"The above ",(0,r.kt)("inlineCode",{parentName:"p"},"example")," pipeline consists of two operators, ",(0,r.kt)("inlineCode",{parentName:"p"},"hash")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"summarize"),"\nthat execute in sequential order."),(0,r.kt)("p",null,"Please consult the ",(0,r.kt)("a",{parentName:"p",href:"/docs/use/transform"},"section on data transformation")," on\nwhere you can deploy pipelines today. Have a look at ",(0,r.kt)("a",{parentName:"p",href:"operators"},"all available\noperators")," to better understand what you can do with the data."))}d.isMDXComponent=!0},94919:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/query-language.dark-d71a0a71db8879757bfdaa7391801103.png"},43231:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/query-language.light-c276650944e817ebe2dd109bf555d744.png"}}]);