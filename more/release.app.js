const a={settings:{},init(){this.checkingL(),this.fileReader=help.get(document,"#fileInput"),this.buttonEvent(),this.keyEventSetup(),this.loadData()},checkingL(){var e=help.storage({dbName:"buyedgamadata"},!1);if(!e){const i=help.makeBound("div"),t=help.makeElement("div"),n=(t.innerHTML=templ.pleaseBuyPop(),t.id="pleaseBuyPop",i.appendChild(t),i.onclick=null,{ok(){i.remove(),setTimeout(function(){a.inputs.ShiftS(),location.reload()},6e5)},buyit(e){t.find("#msg").innerHTML=templ.wannaBuy(),e.parentNode.remove()}});t.findall("#buttons div span").forEach(e=>{e.onclick=function(){n[this.id](this)}}),help.get(document,"main").appendChild(i)}},fileindex:0,addfiles(){a.newfileconfig(a.fileReader.files[a.fileindex])},fileData:{},saveData(){help.storage({dbName:"gamadata",value:JSON.stringify(a.fileData)},!0)},loadData(){this.fileData=help.storage({dbName:"gamadata"},!1)||{}},buttonEvent(){help.get(document,"#buttons #add").onclick=this.addfiles},files:[],newfileconfig(t){a.ignorestate=!0;const n=help.makeBound("div"),l=help.makeElement("div");l.id="newfileconfig",l.innerHTML=templ.newfileconfig({file:t,more:a.fileData}),n.callback=function(){l.remove(),a.ignorestate=!1},l.find("#nextbutton").onclick=function(){var e=l.find("#kev").value,i=l.find("#id").value;a.fileData[t.name]={kev:e,id:i},a.files.push({file:t,id:i,kev:e}),a.fileindex++,a.fileindex<a.fileReader.files.length?a.addfiles():(a.ignorestate=!1,a.fileindex=0,a.processfiles()),n.click()},help.get(document,"main").appendChild(n),help.get(document,"main").appendChild(l)},filereadylen:0,processfiles(){const t=new FileReader;t.onload=function(){const e=help.makeElement("div"),i=(e.id="musicsitem",e.innerHTML=templ.processfiles({id:a.files[a.filereadylen].id,kev:a.files[a.filereadylen].kev,src:t.result,type:a.files[a.filereadylen].file.type}),e.find("audio").onpause=function(){e.find("div").classList.remove("active")},e.find("audio").onended=function(){e.find("div").classList.remove("active")},e.find("audio").onplay=function(){e.find("div").classList.add("active")},a.files[a.filereadylen].kev);e.onclick=function(){a.setRecentlyFlag(),a.recentlyactive=[i,this],a.setRecentlyFlag(),a.showproperties()},a.inputs[i]=e,a.recentlyactive&&a.setRecentlyFlag(),a.recentlyactive=[i,e],a.setRecentlyFlag(),a.showproperties(),help.get(document,"#musics").appendChild(e),a.filereadylen++,a.filereadylen<a.files.length?a.processfiles():a.saveData()},t.readAsDataURL(a.files[a.filereadylen].file)},inputs:{ShiftL(){a.recentlyactive[1].find("audio").loop=!a.recentlyactive[1].find("audio").loop,a.showproperties()},ArrowUp(){a.recentlyactive[1].find("audio").volume<.9&&(a.recentlyactive[1].find("audio").volume+=.1,a.showproperties())},ArrowDown(){.2<a.recentlyactive[1].find("audio").volume&&(a.recentlyactive[1].find("audio").volume-=.1,a.showproperties())},ShiftR(){a.recentlyactive[1].find("audio").currentTime=0},ShiftM(){a.recentlyactive[1].find("audio").muted=!a.recentlyactive[1].find("audio").muted,a.showproperties()},ShiftD(){a.recentlyactive[1].remove();const i=[];a.files.forEach(e=>{JSON.stringify(e)!=JSON.stringify(a.recentlyactive)&&i.push(e)}),delete a.inputs[a.recentlyactive[0]],a.recentlyactive=null,a.files=i,help.get(document,"#properties").innerHTML=""},Altr(){help.getall(document,"#musicsitem").forEach(e=>{e.find("audio").currentTime=0})},"1Altr"(){help.getall(document,"#musicsitem").forEach(e=>{e.find("audio").currentTime=0,e.find("audio").pause()})},Altq(){location.reload()},Altp(){console.log("pausing..."),help.getall(document,"#musicsitem").forEach(e=>{e.find("audio").paused||e.find("audio").pause()})},ShiftA(){a.addfiles()},ShiftS(){delete localStorage.gamadata,a.loadData()}},keyBuckets:{},keyEventSetup(){window.addEventListener("keydown",e=>{a.keyBuckets[e.key]||(a.keyBuckets[e.key]=null)}),window.addEventListener("keyup",e=>{var i=this.getCombinedKeys();this.keyBuckets={},a.inputs[i]&&("function"!=typeof a.inputs[i]||!a.recentlyactive&&"ShiftA"!==i||a.ignorestate||a.inputs[i](),"function"==typeof a.inputs[i]||a.ignorestate||(a.inputs[i].find("audio").paused?a.intervalPlay(a.inputs[i].find("audio"),50):a.intervalPause(a.inputs[i].find("audio"),50),a.setRecentlyFlag(),a.recentlyactive=[e.key,a.inputs[i]],a.setRecentlyFlag(),a.showproperties()))})},ignorestate:!1,recentlyactive:null,showproperties(){var e=this.recentlyactive[1].find("audio"),i=this.recentlyactive[1].find("div").innerText,t=help.makeElement("div");t.innerHTML=templ.showproperties({loop:e.loop,paused:e.paused,volume:e.volume,playbackrate:e.playBackRate,muted:e.muted,id:i}),t.id="propertiesitem",help.get(document,"#properties").innerHTML="",help.get(document,"#properties").appendChild(t)},setRecentlyFlag(){var e;a.recentlyactive&&(e="orange"===(e=a.recentlyactive[1].style.background)?"rgb(94, 129, 172)":"orange",a.recentlyactive[1].style.background=e)},getCombinedKeys(){let e="";for(var i in a.keyBuckets)e+=i;return e},intervalPause(e,i){let t=e.volume,n=setInterval(function(){.2<e.volume?(e.volume-=.1,a.showproperties()):(clearInterval(n),e.pause(),e.volume=t)},i||100)},intervalPlay(e,i){let t=1===e.volume?.9:e.volume,n=(e.volume=0,e.play(),setInterval(function(){e.volume<t?(e.volume+=.1,a.showproperties()):clearInterval(n)},i||100))}};a.init();