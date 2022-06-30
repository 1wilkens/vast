"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1928],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=p(n),m=r,h=d["".concat(l,".").concat(m)]||d[m]||c[m]||i;return n?a.createElement(h,o(o({ref:t},u),{},{components:n})):a.createElement(h,o({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},86688:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const i={sidebar_position:3},o="Plugins",s={unversionedId:"understand-vast/architecture/plugins",id:"understand-vast/architecture/plugins",title:"Plugins",description:"VAST has a plugin system that makes it easy to hook into various places of",source:"@site/docs/understand-vast/architecture/plugins.md",sourceDirName:"understand-vast/architecture",slug:"/understand-vast/architecture/plugins",permalink:"/docs/understand-vast/architecture/plugins",draft:!1,editUrl:"https://github.com/tenzir/vast/tree/master/web/docs/understand-vast/architecture/plugins.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"docsSidebar",previous:{title:"Components",permalink:"/docs/understand-vast/architecture/components"},next:{title:"AWS",permalink:"/docs/understand-vast/architecture/cloud/aws"}},l={},p=[{value:"Plugin types",id:"plugin-types",level:2},{value:"Command",id:"command",level:3},{value:"Component",id:"component",level:3},{value:"Analyzer",id:"analyzer",level:3},{value:"Reader",id:"reader",level:3},{value:"Writer",id:"writer",level:3},{value:"Query Language",id:"query-language",level:3},{value:"Transform",id:"transform",level:3},{value:"Store",id:"store",level:3}],u={toc:p};function c(e){let{components:t,...i}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"plugins"},"Plugins"),(0,r.kt)("p",null,"VAST has a plugin system that makes it easy to hook into various places of\nthe data processing pipeline and add custom functionality in a safe and\nsustainable way. A set of customization points allow anyone to add new\nfunctionality that adds CLI commands, receives a copy of the input stream,\nspawns queries, or implements integrations with third-party libraries."),(0,r.kt)("p",null,"There exist ",(0,r.kt)("strong",{parentName:"p"},"dynamic plugins")," that come in the form shared libraries, and\n",(0,r.kt)("strong",{parentName:"p"},"static plugins")," that are compiled into libvast or VAST itself:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Plugins",src:n(95296).Z+"#gh-light-mode-only",width:"1391",height:"1083"}),"\n",(0,r.kt)("img",{alt:"Plugins",src:n(51232).Z+"#gh-dark-mode-only",width:"1391",height:"1083"})),(0,r.kt)("p",null,"Plugins do not only exist for extensions by third parties, but VAST also\nimplements core functionality through the plugin API. Such plugins compile as\nstatic plugins. Because they are always built, we call them ",(0,r.kt)("em",{parentName:"p"},"native plugins"),"."),(0,r.kt)("h2",{id:"plugin-types"},"Plugin types"),(0,r.kt)("p",null,"VAST offers several customization points to exchange or enhance functionality\nselectively. Here is a list of available plugin categories and plugin types:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Plugin types",src:n(7007).Z+"#gh-light-mode-only",width:"1802",height:"440"}),"\n",(0,r.kt)("img",{alt:"Plugin types",src:n(90412).Z+"#gh-dark-mode-only",width:"1802",height:"440"})),(0,r.kt)("h3",{id:"command"},"Command"),(0,r.kt)("p",null,"The command plugin adds a new command to the ",(0,r.kt)("inlineCode",{parentName:"p"},"vast")," executable, at a configurable\nlocation in the command hierarchy. New commands can have sub-commands as well\nand allow for flexible structuring of the provided functionality."),(0,r.kt)("h3",{id:"component"},"Component"),(0,r.kt)("p",null,"The component plugin spawns a ",(0,r.kt)("a",{parentName:"p",href:"components"},"component")," inside the VAST node. A\ncomponent is an ",(0,r.kt)("a",{parentName:"p",href:"actor-model"},"actor")," and runs in parallel with all other\ncomponents."),(0,r.kt)("p",null,"This plugin is the most generic mechanism to introduce new functionality."),(0,r.kt)("h3",{id:"analyzer"},"Analyzer"),(0,r.kt)("p",null,"The analyzer plugin hooks into the processing path of data by spawning a new\nactor inside the server that receives the full stream of table slices. The\nanalyzer plugin is a refinement of the ",(0,r.kt)("a",{parentName:"p",href:"#component"},"component plugin"),"."),(0,r.kt)("h3",{id:"reader"},"Reader"),(0,r.kt)("p",null,"The reader plugin adds a new format to parse input data, such as JSON (ASCII) or\nPCAP (binary)."),(0,r.kt)("p",null,"Reader plugins automatically add the subcommands ",(0,r.kt)("inlineCode",{parentName:"p"},"vast import <format>"),"."),(0,r.kt)("h3",{id:"writer"},"Writer"),(0,r.kt)("p",null,"The writer plugin adds a new format to print data, such as JSON (ASCII) or PCAP\n(binary)."),(0,r.kt)("p",null,"Writer plugins automatically add the subcommands ",(0,r.kt)("inlineCode",{parentName:"p"},"vast export <format>"),"."),(0,r.kt)("h3",{id:"query-language"},"Query Language"),(0,r.kt)("p",null,"A query language plugin adds an alternative parser for a query expression. This\nplugin allows for replacing the query ",(0,r.kt)("em",{parentName:"p"},"frontend")," while using VAST as ",(0,r.kt)("em",{parentName:"p"},"backend"),"\nexecution engine."),(0,r.kt)("p",null,"For example, you could write a SQL plugin that takes an expression like\n",(0,r.kt)("inlineCode",{parentName:"p"},'SELECT * FROM zeek.conn WHERE id.orig_h = "1.2.3.4"')," and executes it on\nhistorical data or runs it as live query."),(0,r.kt)("h3",{id:"transform"},"Transform"),(0,r.kt)("p",null,"The transform plugin adds a new ",(0,r.kt)("a",{parentName:"p",href:"/docs/understand-vast/query-language/operators"},"transform\nstep")," that users can reference in\na ",(0,r.kt)("a",{parentName:"p",href:"/docs/understand-vast/query-language/pipelines"},"transform definition"),"."),(0,r.kt)("h3",{id:"store"},"Store"),(0,r.kt)("p",null,"Inside a partition, the store plugin implements the conversion from in-memory\nArrow record batches to the persistent format, and vice versa."))}c.isMDXComponent=!0},90412:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/plugin-types.dark-75384b1b2ffcb8b95482fc337e3bc0ca.png"},7007:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/plugin-types.light-2303143dc1f2ed4d843df3b2fd01cbf1.png"},51232:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/plugins.dark-b4408b1c2e0c1c84ff5b66d11974d9f6.png"},95296:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/plugins.light-4d2465de31a50c7f977bf37a2b97a17f.png"}}]);