"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7442],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=a.createContext({}),l=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),h=l(n),u=i,m=h["".concat(c,".").concat(u)]||h[u]||d[u]||r;return n?a.createElement(m,o(o({ref:t},p),{},{components:n})):a.createElement(m,o({ref:t},p))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=h;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var l=2;l<r;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},37225:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var a=n(87462),i=(n(67294),n(3905));const r={sidebar_position:1},o="Target Audience",s={unversionedId:"about/target-audience",id:"about/target-audience",title:"Target Audience",description:"This section characterizes the primary audience of VAST in the security",source:"@site/docs/about/target-audience.md",sourceDirName:"about",slug:"/about/target-audience",permalink:"/docs/about/target-audience",draft:!1,editUrl:"https://github.com/tenzir/vast/tree/master/web/docs/about/target-audience.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Why VAST",permalink:"/docs/about/why-vast"},next:{title:"Vision",permalink:"/docs/about/vision"}},c={},l=[{value:"SOC Analyst",id:"soc-analyst",level:2},{value:"Detection Engineer",id:"detection-engineer",level:2},{value:"Data Scientist",id:"data-scientist",level:2}],p={toc:l};function d(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"target-audience"},"Target Audience"),(0,i.kt)("p",null,"This section characterizes the primary audience of VAST in the security\noperations center (SOC). From our perspective, VAST users fall into three user\ncategories that ideally collaborate to achieve the SOC's mission of defending\nits constituency: the ",(0,i.kt)("strong",{parentName:"p"},"SOC Analyst"),", the ",(0,i.kt)("strong",{parentName:"p"},"Detection Engineer"),", and the\n",(0,i.kt)("strong",{parentName:"p"},"Data Scientist"),"."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Personae",src:n(24574).Z+"#gh-light-mode-only",width:"1346",height:"886"}),"\n",(0,i.kt)("img",{alt:"Personae",src:n(10769).Z+"#gh-dark-mode-only",width:"1346",height:"886"})),(0,i.kt)("p",null,"In practice, the lines are blurred and a single person often has to wear\nmultiple hats. We deem it still important to expose the key functional roles\nthat yield an optimal team for detection and response use cases."),(0,i.kt)("h2",{id:"soc-analyst"},"SOC Analyst"),(0,i.kt)("p",null,"The SOC Analyst operationalizes the security content crafted by the Detection\nEngineer. The optimal roll-out of security content yields actionable alerts,\nideally pre-contextualized and automatically triaged. SOC Analysts are domain\nexperts, which is why flanking them with engineering and analytics resources\nyields a strong team."),(0,i.kt)("p",null,"Responding to the alerts is the ",(0,i.kt)("em",{parentName:"p"},"reactive")," element of the SOC Analyst. Threat\nhunting is the ",(0,i.kt)("em",{parentName:"p"},"proactive")," element, which involves forming hypotheses derived\nfrom domain knowledge, experience, and understanding of the behavior of the\nlocal environment."),(0,i.kt)("admonition",{title:"Threat Hunting Engine",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"With VAST, we want to enable threat hunters with an interactive data exploration\nworkbench so that they can ",(0,i.kt)("em",{parentName:"p"},"think and execute in the security domain"),", without\nhaving to context-switch and adapt to the lower-level analytics primitives\nexposed by a generic database.")),(0,i.kt)("h2",{id:"detection-engineer"},"Detection Engineer"),(0,i.kt)("p",null,"The Detection Engineer distills the work from SOC Analyst and Data Scientist\ninto security content. ",(0,i.kt)("em",{parentName:"p"},"Detection as Code (DaC)")," is the guiding principle.\nCodified detections typically range in terms of complexity from singular\nindicators of compromise to complex state machines describing behavior."),(0,i.kt)("p",null,"Examples include ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/SigmaHQ/sigma"},"Sigma rules")," within\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/SigmaHQ/sigma/wiki/Specification:-Sigma-Correlations"},"correlations"),",\n",(0,i.kt)("a",{parentName:"p",href:"https://yara.readthedocs.io/"},"Yara rules")," rules for file scanning, ",(0,i.kt)("a",{parentName:"p",href:"https://zeek.org"},"Zeek\nscripts")," or ",(0,i.kt)("a",{parentName:"p",href:"https://suricata.io/"},"Suricata rules")," for network\nanalytics, and ",(0,i.kt)("a",{parentName:"p",href:"https://kestrel.readthedocs.io/"},"Kestrel hunt flows")," for generic\nmulti-stage correlations."),(0,i.kt)("p",null,'Simplistic detections (e.g., point indicators of file hashes, domains, or IPs of\nattacker infrastructure) shift the effort to downstream contextualization and\ntriaging, which is why "shifting left" is crucial to keep the alerting funnel\nactionable. Point indicators are not "bad" per se and can be highly actionable,\nbut it\'s the Detection Engineer\'s responsibility to ensure that low-fidelity\nalerts are properly contextualized and triaged before hitting the SOC Analyst.'),(0,i.kt)("admonition",{title:"Security Content Execution Engine",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"With VAST, we aim to build a universal security content execution engine that is\ncapable of processing detections in an open, standardized format, such as STIX\nbundles or MISP events. VAST will operationalize security content by deploying\nit live in-stream to catch future events, as well as retro-actively to surface\npast occurrences of previously unknown attacks.")),(0,i.kt)("h2",{id:"data-scientist"},"Data Scientist"),(0,i.kt)("p",null,"Data Scientists flank SOC Analysts and Detection Engineers in advanced\nenvironments to solve complex detection challenges that involve processing\nmassive amounts of data. Illuminating the data and its stable relationships\nto craft actionable detections is one central goal. When the SOC Analysts acts\nas threat hunter to follow a domain-specific hypothesis based on TTPs and IoCs,\nthe Data Scientist acts as ",(0,i.kt)("em",{parentName:"p"},"data hunter")," using statistical and machine-learning\ntools. Analysis results manifest not only as new indicators, but often as\ntrained models that the Detection Engineer can codify and push out to the edge\nfor realtime detection."),(0,i.kt)("p",null,"The Data Scientist extracts features, trains models, and sanity-checks domain\nassumptions (e.g., attacker TTPs) with SOC Analyst to arrive at a robust\nmodel of malicious activity. Notebooks are an effective vehicle of capturing the\noften organic process at arriving at a working solution\u2014both analytically and\nvisually."),(0,i.kt)("admonition",{title:"Data Science Workbench",type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"With VAST, we enable Data Scientists to access the raw underlying security data\nat high bandwidth while bringing their own tools to run custom, advanced\nanalytics. VAST makes this possible by standardizing all internal data\nrepresentation and processing on ",(0,i.kt)("a",{parentName:"p",href:"https://arrow.apache.org"},"Apache Arrow"),", which\noffers high interoperability and native access from R, Python, Spark, and other\ndata science tools.")))}d.isMDXComponent=!0},10769:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/personae.dark-a4f4101e4b333c769b6d4d4e5bde89c3.png"},24574:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/personae.light-baa48bd03356cb95b902fda47a6a46c9.png"}}]);