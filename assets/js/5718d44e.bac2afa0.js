"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8653],{3905:(e,t,o)=>{o.d(t,{Zo:()=>l,kt:()=>k});var r=o(67294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function p(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var s=r.createContext({}),c=function(e){var t=r.useContext(s),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},l=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),m=c(o),k=n,u=m["".concat(s,".").concat(k)]||m[k]||d[k]||a;return o?r.createElement(u,i(i({ref:t},l),{},{components:o})):r.createElement(u,i({ref:t},l))}));function k(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,i=new Array(a);i[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:n,i[1]=p;for(var c=2;c<a;c++)i[c]=o[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,o)}m.displayName="MDXCreateElement"},71336:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>p,toc:()=>c});var r=o(87462),n=(o(67294),o(3905));const a={sidebar_position:1},i="Docker Compose",p={unversionedId:"setup/deploy/docker-compose",id:"setup/deploy/docker-compose",title:"Docker Compose",description:"We offer a range of Docker Compose files for quickly getting up and running with",source:"@site/docs/setup/deploy/docker-compose.md",sourceDirName:"setup/deploy",slug:"/setup/deploy/docker-compose",permalink:"/docs/setup/deploy/docker-compose",draft:!1,editUrl:"https://github.com/tenzir/vast/tree/master/web/docs/setup/deploy/docker-compose.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docsSidebar",previous:{title:"Docker",permalink:"/docs/setup/deploy/docker"},next:{title:"AWS",permalink:"/docs/setup/deploy/aws"}},s={},c=[{value:"Quick Start with Docker Compose",id:"quick-start-with-docker-compose",level:2}],l={toc:c};function d(e){let{components:t,...o}=e;return(0,n.kt)("wrapper",(0,r.Z)({},l,o,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"docker-compose"},"Docker Compose"),(0,n.kt)("p",null,"We offer a range of Docker Compose files for quickly getting up and running with\nVAST. All mentioned files are in the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/tenzir/vast/tree/master/docker"},(0,n.kt)("inlineCode",{parentName:"a"},"docker"))," directory of\nthe VAST repository, and require having the repository checked out locally."),(0,n.kt)("admonition",{title:"Docker Compose V2 CLI",type:"info"},(0,n.kt)("p",{parentName:"admonition"},"All examples shown use the ",(0,n.kt)("a",{parentName:"p",href:"https://docs.docker.com/compose/#compose-v2-and-the-new-docker-compose-command"},"Docker Compose V2 CLI"),". If\nusing ",(0,n.kt)("inlineCode",{parentName:"p"},"docker compose")," (with a space) does not work for you, try using\n",(0,n.kt)("inlineCode",{parentName:"p"},"docker-compose")," instead\u2014although we don't test it explicitly, most commands\nshould work that way as well.")),(0,n.kt)("h2",{id:"quick-start-with-docker-compose"},"Quick Start with Docker Compose"),(0,n.kt)("p",null,"To get up and running with VAST in Docker Compose, simply run ",(0,n.kt)("inlineCode",{parentName:"p"},"docker compose\nup")," from the ",(0,n.kt)("inlineCode",{parentName:"p"},"docker/vast")," directory, which fetches the latest version of VAST\nfrom Docker Hub."),(0,n.kt)("admonition",{title:"Cached Images and Containers By default, Docker aggressively caches",type:"info"},(0,n.kt)("p",{parentName:"admonition"},"images and containers. To prevent Docker from re-using an image, pass ",(0,n.kt)("inlineCode",{parentName:"p"},"--pull\nalways")," (Compose v2.8+) to ",(0,n.kt)("inlineCode",{parentName:"p"},"docker compose up"),". Similarly, to prevent Docker\nfrom re-using an already built container, pass ",(0,n.kt)("inlineCode",{parentName:"p"},"--force-recreate"),". :::"),(0,n.kt)("p",{parentName:"admonition"},"The ",(0,n.kt)("inlineCode",{parentName:"p"},"docker compose run")," command makes interacting with VAST inside Docker\nCompose easy:"),(0,n.kt)("pre",{parentName:"admonition"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"# Run `vast status` in the Docker Compose network.\ndocker compose run vast status\n\n# Import a Suricata Eve JSON file in the Docker Compose network.\n# NOTE: When piping to stdin, passing --no-TTY is required.\ndocker compose run --no-TTY vast import suricata < path/to/eve.json\n\n# Run a query against VAST.\n# NOTE: For commands that check whether input exists on stdin, passing\n# --interactive=false is required. This is a bug in Docker Compose.\ndocker compose run --interactive=false vast export json '#type == \"suricata.alert\"'\n")),(0,n.kt)("p",{parentName:"admonition"},"The Docker Compose network by default exposes VAST on port 42000, allowing for\nusers to connect to it from outside, e.g., with a local VAST binary."),(0,n.kt)("h2",{parentName:"admonition",id:"override-files"},"Override Files"),(0,n.kt)("p",{parentName:"admonition"},"VAST's integrations with other services are opt-in, i.e., not loaded by default.\nTo opt into loading another service, specify its override file when starting\nDocker Compose:"),(0,n.kt)("pre",{parentName:"admonition"},(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"# Load both VAST and Zeek, and the import that sits between the two.\n# NOTE: The override file for Zeek does not exist yet, but we plan to add it in\n# the near future.\ndocker compose -f docker/vast/docker-compose.yaml \\\n               -f docker/zeek/docker-compose.yaml \\\n               -f docker/zeek/docker-compose.vast-import.yaml \\\n               up\n")),(0,n.kt)("p",{parentName:"admonition"},"We currently have the following override files:"),(0,n.kt)("table",{parentName:"admonition"},(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"File"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"docker/vast/docker-compose.yaml"),(0,n.kt)("td",{parentName:"tr",align:null},"The ",(0,n.kt)("inlineCode",{parentName:"td"},"vast")," service that starts up a VAST server including REST API.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"docker/vast/docker-compose.volume.yaml"),(0,n.kt)("td",{parentName:"tr",align:null},"Add persistent storage to VAST.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"docker/vast/docker-compose.build.yaml"),(0,n.kt)("td",{parentName:"tr",align:null},"Force VAST to be built from source.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"docker/quarto/docker-compose.yaml"),(0,n.kt)("td",{parentName:"tr",align:null},"Build the Quarto image and run Bash inside.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"docker/quarto/docker-compose.bind.yaml"),(0,n.kt)("td",{parentName:"tr",align:null},"Bind mound the VAST respository.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"docker/quarto/docker-compose.vast.yaml"),(0,n.kt)("td",{parentName:"tr",align:null},"Apply settings to connect to the VAST service.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"docker/thehive/docker-compose.yaml"),(0,n.kt)("td",{parentName:"tr",align:null},"Start TheHive/Cortex with a basic initial setup.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"docker/thehive/docker-compose.vast.yaml"),(0,n.kt)("td",{parentName:"tr",align:null},"Integrate the Analyzer with the VAST service.")),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"docker/thehive/docker-compose.app.yaml"),(0,n.kt)("td",{parentName:"tr",align:null},"Start an integration app for Suricata alerts."))))))}d.isMDXComponent=!0}}]);