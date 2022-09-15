"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[747],{87325:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>m,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var n=a(83117),i=(a(67294),a(3905));const r={title:"VAST v2.1",description:"VAST v2.1 - Tune VAST Databases",authors:"dominiklohmann",date:new Date("2022-07-07T00:00:00.000Z"),tags:["release","performance"]},s=void 0,o={permalink:"/blog/vast-v2.1",source:"@site/blog/vast-v2.1/index.md",title:"VAST v2.1",description:"VAST v2.1 - Tune VAST Databases",date:"2022-07-07T00:00:00.000Z",formattedDate:"July 7, 2022",tags:[{label:"release",permalink:"/blog/tags/release"},{label:"performance",permalink:"/blog/tags/performance"}],readingTime:3.935,hasTruncateMarker:!0,authors:[{name:"Dominik Lohmann",title:"Engineering Manager",url:"https://github.com/dominiklohmann",email:"dominik@tenzir.com",imageURL:"https://github.com/dominiklohmann.png",key:"dominiklohmann"}],frontMatter:{title:"VAST v2.1",description:"VAST v2.1 - Tune VAST Databases",authors:"dominiklohmann",date:"2022-07-07T00:00:00.000Z",tags:["release","performance"]},prevItem:{title:"VAST v2.2",permalink:"/blog/vast-v2.2"},nextItem:{title:"Apache Arrow as Platform for Security Data Engineering",permalink:"/blog/apache-arrow-as-platform-for-security-data-engineering"}},l={authorsImageUrls:[void 0]},p=[{value:"New Project Site",id:"new-project-site",level:2},{value:"Performance Improvements",id:"performance-improvements",level:2},{value:"Rebuild VAST Databases",id:"rebuild-vast-databases",level:2}],d={toc:p};function m(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/tenzir/vast/releases/tag/v2.1.0"},"VAST v2.1")," is out! This release comes with a particular\nfocus on performance and reducing the size of VAST databases. It brings a new\nutility for optimizing databases in production, allowing existing deployments to\ntake full advantage of the improvements after upgrading."),(0,i.kt)("h2",{id:"new-project-site"},"New Project Site"),(0,i.kt)("p",null,"VAST has new project site: ",(0,i.kt)("a",{parentName:"p",href:"https://vast.io"},"vast.io"),". We ported all\ndocumentation from ",(0,i.kt)("inlineCode",{parentName:"p"},"https://docs.tenzir.com"),", added a lot of new content, and\nrestructured the reading experience along the user journey."),(0,i.kt)("p",null,"You can find the Threat Bus documentation in ",(0,i.kt)("a",{parentName:"p",href:"/docs/use-vast/integrate/threatbus"},"Use VAST \u2192 Integrate \u2192 Threat\nBus"),". Threat Bus is now officially in\nmaintainance mode: we are only supporting existing features with bugfixes. That\nsaid, Threat Bus will resurface in a new shape with its existing functionality\nintegrated into VAST itself. Stay tuned."),(0,i.kt)("h2",{id:"performance-improvements"},"Performance Improvements"),(0,i.kt)("p",null,"VAST now compresses data with ",(0,i.kt)("a",{parentName:"p",href:"http://www.zstd.net"},"Zstd"),". The default\nconfiguration achieves over 2x space savings. When transferring data between\nclient and server processes, compression reduces the amount of transferred data\nby up to 5x."),(0,i.kt)("p",null,"Additionally, VAST now compresses on-disk indexes with Zstd, resulting in a\n50-80% size reduction depending on the type of indexes used."),(0,i.kt)("p",null,"This allowed us to increase the default partition size from 1,048,576 to\n4,194,304 events",(0,i.kt)("sup",{parentName:"p",id:"fnref-1-11be5a"},(0,i.kt)("a",{parentName:"sup",href:"#fn-1-11be5a",className:"footnote-ref"},"1")),", and the default number of events in a single batch from 1,024\nto 65,536, resulting in a massive performance increase at the cost of a ~20%\nlarger memory footprint at peak loads. Use the option ",(0,i.kt)("inlineCode",{parentName:"p"},"vast.max-partition-size"),"\nto tune this space-time tradeoff."),(0,i.kt)("p",null,"To benchmark this, we used ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/satta/speeve"},(0,i.kt)("inlineCode",{parentName:"a"},"speeve"))," to generate 20 EVE JSON files\ncontaining 8,388,608 events each",(0,i.kt)("sup",{parentName:"p",id:"fnref-2-11be5a"},(0,i.kt)("a",{parentName:"sup",href:"#fn-2-11be5a",className:"footnote-ref"},"2")),". We spawned a VAST server process and ran\n20 VAST client processes in parallel, with one process per file."),(0,i.kt)("p",null,"We observed a reduction of ",(0,i.kt)("strong",{parentName:"p"},"up to 73%")," of disk space utilization:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Database Size",src:a(19617).Z+"#gh-light-mode-only",width:"3000",height:"2100"}),"\n",(0,i.kt)("img",{alt:"Database Size",src:a(80856).Z+"#gh-dark-mode-only",width:"3000",height:"2100"})),(0,i.kt)("p",null,"In addition, we were able to scale the ingest rate by almost ",(0,i.kt)("strong",{parentName:"p"},"6x")," due to the\nhigher batch size and the reduced memory usage per batch:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Ingest Rate",src:a(3443).Z+"#gh-light-mode-only",width:"3000",height:"2100"}),"\n",(0,i.kt)("img",{alt:"Ingest Rate",src:a(28386).Z+"#gh-dark-mode-only",width:"3000",height:"2100"})),(0,i.kt)("p",null,"The table below summaries the benchmarks:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"right"}),(0,i.kt)("th",{parentName:"tr",align:"left"},"VAST v2.0"),(0,i.kt)("th",{parentName:"tr",align:"left"},"VAST v2.1"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Change"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"right"},"Ingest Duration"),(0,i.kt)("td",{parentName:"tr",align:"left"},"1,650 s"),(0,i.kt)("td",{parentName:"tr",align:"left"},"242 s"),(0,i.kt)("td",{parentName:"tr",align:"left"},"-85.3%")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"right"},"Ingest Rate"),(0,i.kt)("td",{parentName:"tr",align:"left"},"101,680 events/s"),(0,i.kt)("td",{parentName:"tr",align:"left"},"693,273 events/s"),(0,i.kt)("td",{parentName:"tr",align:"left"},"+581.8%")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"right"},"Index Size"),(0,i.kt)("td",{parentName:"tr",align:"left"},"14,791 MiB"),(0,i.kt)("td",{parentName:"tr",align:"left"},"5,721 MiB"),(0,i.kt)("td",{parentName:"tr",align:"left"},"-61.3%")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"right"},"Store Size"),(0,i.kt)("td",{parentName:"tr",align:"left"},"37,656 MiB"),(0,i.kt)("td",{parentName:"tr",align:"left"},"8,491 MiB"),(0,i.kt)("td",{parentName:"tr",align:"left"},"-77.5%")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"right"},"Database Size"),(0,i.kt)("td",{parentName:"tr",align:"left"},"52,446 MiB"),(0,i.kt)("td",{parentName:"tr",align:"left"},"14,212 MiB"),(0,i.kt)("td",{parentName:"tr",align:"left"},"-72.9%")))),(0,i.kt)("admonition",{title:"Compressed Filesystems",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"The above benchmarks ran on filesystems without compression. We expect the gain\nfrom compression to be smaller when using compressed filesystems like\n",(0,i.kt)("a",{parentName:"p",href:"https://btrfs.wiki.kernel.org/index.php/Main_Page"},(0,i.kt)("inlineCode",{parentName:"a"},"btrfs")),".")),(0,i.kt)("h2",{id:"rebuild-vast-databases"},"Rebuild VAST Databases"),(0,i.kt)("p",null,"The new changes to VAST's internal data format only apply to newly ingested\ndata. To retrofit changes, we introduce a new ",(0,i.kt)("inlineCode",{parentName:"p"},"rebuild")," command with this\nrelease. A rebuild effectively re-ingests events from existing partitions and\natomically replaces them with partitions of the new format."),(0,i.kt)("p",null,"This makes it possible to upgrade persistent state to a newer version, or\nrecreate persistent state after changing configuration parameters, e.g.,\nswitching from the Feather to the Parquet store backend (that will land in\nv2.2). Rebuilding partitions also recreates their sparse indexes that\naccellerate query execution. The process takes place asynchronously in the\nbackground."),(0,i.kt)("p",null,"We recommend running ",(0,i.kt)("inlineCode",{parentName:"p"},"vast rebuild")," to upgrade your VAST v1.x partitions to VAST\nv2.x partitions to take advantage of the new compression and an improved\ninternal representation."),(0,i.kt)("p",null,"This is how you run it:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"vast rebuild [--all] [--undersized] [--parallel=<number>] [<expression>]\n")),(0,i.kt)("p",null,"A rebuild is not only useful when upgrading outdated partitions, but also when\nchanging parameters of up-to-date partitions. Use the ",(0,i.kt)("inlineCode",{parentName:"p"},"--all")," flag to extend a\nrebuild operation to ",(0,i.kt)("em",{parentName:"p"},"all")," partitions. (Internally, VAST versions the partition\nstate via FlatBuffers. An outdated partition is one whose version number is not\nthe newest.)"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"--undersized")," flag causes VAST to only rebuild partitions that are under\nthe configured partition size limit ",(0,i.kt)("inlineCode",{parentName:"p"},"vast.max-partition-size"),"."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"--parallel")," options is a performance tuning knob. The parallelism level\ncontrols how many sets of partitions to rebuild in parallel. This value defaults\nto 1 to limit the CPU and memory requirements of the rebuilding process, which\ngrow linearly with the selected parallelism level."),(0,i.kt)("p",null,"An optional expression allows for restricting the set of partitions to rebuild.\nVAST performs a catalog lookup with the expression to identify the set of\ncandidate partitions. This process may yield false positives, as with regular\nqueries, which may cause unaffected partitions to undergo a rebuild. For\nexample, to rebuild outdated partitions containing ",(0,i.kt)("inlineCode",{parentName:"p"},"suricata.flow")," events\nolder than 2 weeks, run the following command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"vast rebuild '#type == \"suricata.flow\" && #import_time < 2 weeks ago'\n")),(0,i.kt)("div",{className:"footnotes"},(0,i.kt)("hr",{parentName:"div"}),(0,i.kt)("ol",{parentName:"div"},(0,i.kt)("li",{parentName:"ol",id:"fn-1-11be5a"},"VAST v2.0 failed to write its partitions to disk with the defaults for\nv2.1 because the on-disk size exceeded the maximum possible size of a\nFlatBuffers table, which VAST internally uses to have an open standard for its\npersistent state.",(0,i.kt)("a",{parentName:"li",href:"#fnref-1-11be5a",className:"footnote-backref"},"\u21a9")),(0,i.kt)("li",{parentName:"ol",id:"fn-2-11be5a"},"This resulted in 167,772,160 events, with a total of 200'917'930 unique\nvalues with a schema distribution of 80.74% ",(0,i.kt)("inlineCode",{parentName:"li"},"suricata.flow"),", 7.85%\n",(0,i.kt)("inlineCode",{parentName:"li"},"suricata.dns"),", 5.35% ",(0,i.kt)("inlineCode",{parentName:"li"},"suricata.http"),", 4.57% ",(0,i.kt)("inlineCode",{parentName:"li"},"suricata.fileinfo"),", 1.04%\n",(0,i.kt)("inlineCode",{parentName:"li"},"suricata.tls"),", 0.41% ",(0,i.kt)("inlineCode",{parentName:"li"},"suricata.ftp"),", and 0.04% ",(0,i.kt)("inlineCode",{parentName:"li"},"suricata.smtp"),".",(0,i.kt)("a",{parentName:"li",href:"#fnref-2-11be5a",className:"footnote-backref"},"\u21a9")))))}m.isMDXComponent=!0},28386:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/rate-dark-026fc75f7f0a93ae2734813a1c870feb.png"},3443:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/rate-light-0c19006b81ccac4f390f70ba73d0072a.png"},80856:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/storage-dark-701aea7c53efb6a69eeb91d2903dbe29.png"},19617:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/storage-light-cdbfe9d3c7df930476bfdabb5e5f4df8.png"}}]);