"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8667],{52495:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>u,contentTitle:()=>i,default:()=>l,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var n=a(83117),s=(a(67294),a(3905));a(61839);const r={},i="Threat Bus",o={unversionedId:"use-vast/integrate/threatbus/README",id:"use-vast/integrate/threatbus/README",title:"Threat Bus",description:"Threat Bus is in maintenance mode. We are no longer adding features, as we are",source:"@site/docs/use-vast/integrate/threatbus/README.md",sourceDirName:"use-vast/integrate/threatbus",slug:"/use-vast/integrate/threatbus/",permalink:"/docs/use-vast/integrate/threatbus/",draft:!1,editUrl:"https://github.com/tenzir/vast/tree/master/web/docs/use-vast/integrate/threatbus/README.md",tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Python",permalink:"/docs/use-vast/integrate/python"},next:{title:"Install",permalink:"/docs/use-vast/integrate/threatbus/install"}},u={},p=[],c={toc:p};function l(t){let{components:e,...a}=t;return(0,s.kt)("wrapper",(0,n.Z)({},c,a,{components:e,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"threat-bus"},"Threat Bus"),(0,s.kt)("admonition",{type:"caution"},(0,s.kt)("p",{parentName:"admonition"},"Threat Bus is in maintenance mode. We are no longer adding features, as we are\nabout to integrate the core concepts into a new version of VAST's Python\nbindings."),(0,s.kt)("p",{parentName:"admonition"},"We're happy to answer any question about the upcoming relaunch in our ",(0,s.kt)("a",{parentName:"p",href:"http://slack.tenzir.com"},"Community\nSlack"),".")),(0,s.kt)("p",null,"Threat Bus is a\n",(0,s.kt)("a",{parentName:"p",href:"https://docs.oasis-open.org/cti/stix/v2.1/stix-v2.1.html"},"STIX"),"-based security\ncontent fabric to connect security tools, such as network monitors like\n",(0,s.kt)("a",{parentName:"p",href:"https://zeek.org/"},"Zeek"),", telemetry engines like\n",(0,s.kt)("a",{parentName:"p",href:"https://github.com/tenzir/vast"},"VAST"),", or threat intelligence platforms (TIP)\nlike ",(0,s.kt)("a",{parentName:"p",href:"https://www.opencti.io"},"OpenCTI")," and\n",(0,s.kt)("a",{parentName:"p",href:"https://www.misp-project.org/"},"MISP"),". Threat Bus wraps a tool's functions in a\npublish-subscrbe fashion and connects it to a messaging backbone."),(0,s.kt)("p",null,"For example, Threat Bus turns a TIP into a feed of STIX Indicator objects that\ncan trigger action in other tools, such as installation into a blocklist or\nexecuting a SIEM retro matching."),(0,s.kt)("p",null,"Threat Bus is a ",(0,s.kt)("a",{parentName:"p",href:"threatbus/understand/plugins"},"plugin"),"-based application. Almost\nall functionality is implemented in either\n",(0,s.kt)("a",{parentName:"p",href:"threatbus/understand/plugins#backbone-plugins"},"backbone")," or\n",(0,s.kt)("a",{parentName:"p",href:"threatbus/understand/plugins#application-plugins"},"application")," plugins. The\nremaining logic of Threat Bus is responsible for launching and initializing all\ninstalled plugins with the user-provided configuration. It provides some\nrudimentary data structures for message exchange and subscription management, as\nwell as two callbacks for (un)subscribing to the bus."))}l.isMDXComponent=!0}}]);