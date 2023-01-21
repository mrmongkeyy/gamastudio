const templ = {
	newfileconfig(file){
		return `
			<div class='container fullheight'>
				<div class=container>
					<div>File Selected:</div>
					<div class=bold>${file.name||'Undefined'}</div>
				</div>
				<div class=container>
					<div>ID</div>
					<div>
						<input id=id placeholder=typetheid required>
					</div>
				</div>
				<div class=container>
					<div>Key Event</div>
					<div>
						<input id=kev placeholder=typethekey>
					</div>
				</div>
				<div class=container>
					<div class=buttons>
						<div class='fullwidth righttextalign'>
							<span id=nextbutton>Next</span>	
						</div>
					</div>
				</div>
			</div>
		`;
	},
	processfiles(config){
		return `
			<div>
				(${config.kev}) ${config.id} 
			</div>
			<div>
				<audio src=${config.src} type=${config.type} controls></audio>
			</div>
		`;
	},
	showproperties(config){
		return `
			<div>ID: ${config.id}</div>
			<div>Loop: ${config.loop} "SHIFT+l" change!</div>
			<div>Volume: ${String(config.volume).slice(0,3)} "arrow keys" change!</div>
			<div>Reset "SHIFT+r"</div>
			<div>Muted: ${config.muted} "SHIFT+m" change!</div>
			<div>Delete "SHIFT+d"</div>
		`;
	}
}


const gama = {
	settings:{},
	init(){
		this.fileReader = help.get(document,'#fileInput');
		this.buttonEvent();
		this.keyEventSetup();
	},
	fileindex:0,
	addfiles(){
		gama.newfileconfig(gama.fileReader.files[gama.fileindex]);
	},
	buttonEvent(){
		help.get(document,'#addbutton span').onclick = this.addfiles;
	},
	files:[],
	newfileconfig(file){
		gama.ignorestate = true;
		const bound = help.makeBound('div');
		const div = help.makeElement('div');
		div.id = 'newfileconfig';
		div.innerHTML = templ.newfileconfig(file);
		bound.callback = function(){div.remove()}
		div.find('#nextbutton').onclick = function(){
			gama.files.push((function(){
				return {
					file,
					id:div.find('#id').value,
					kev:div.find('#kev').value
				}
			})());
			gama.fileindex++;
			if(gama.fileindex<gama.fileReader.files.length)gama.addfiles();
			else{
				gama.ignorestate = false;
				gama.fileindex = 0;
				gama.processfiles();
			}
			bound.click();
		}
		help.get(document,'main').appendChild(bound);
		help.get(document,'main').appendChild(div);
	},
	filereadylen:0,
	processfiles(){
		const fs = new FileReader();
		fs.onload = function(){
			const div = help.makeElement('div');
			div.id = 'musicsitem';
			div.draggable = true;
			div.innerHTML = templ.processfiles({
				id:gama.files[gama.filereadylen].id,
				kev:gama.files[gama.filereadylen].kev,
				src:fs.result,
				type:gama.files[gama.filereadylen].file.type,
			});
			const kev = gama.files[gama.filereadylen].kev;
			div.onclick = function(){gama.recentlyactive=[kev,this];gama.showproperties()};
			gama.inputs[kev] = div;
			gama.recentlyactive = [kev,div];
			gama.showproperties();
			help.get(document,'#musics').appendChild(div);
			gama.filereadylen++;
			if(gama.filereadylen<gama.files.length)gama.processfiles();
		}
		fs.readAsDataURL(gama.files[gama.filereadylen].file);
	},
	inputs:{
		L(){
			if(gama.ignorestate)return
			gama.recentlyactive[1].find('audio').loop = !gama.recentlyactive[1].find('audio').loop;
			gama.showproperties();
		},
		ArrowUp(){
			if(gama.ignorestate || gama.recentlyactive[1].find('audio').volume===1)return
			gama.recentlyactive[1].find('audio').volume += 0.1;
			gama.showproperties();
		},
		ArrowDown(){
			if(gama.ignorestate || gama.recentlyactive[1].find('audio').volume<=0.2)return
			gama.recentlyactive[1].find('audio').volume -= 0.1;
			gama.showproperties();
		},
		R(){
			//console.log(gama.recentlyactive.find('audio').currentTime);
			if(gama.ignorestate)return
			gama.recentlyactive[1].find('audio').currentTime = 0;
		},
		M(){
			if(gama.ignorestate)return
			gama.recentlyactive[1].find('audio').muted = !gama.recentlyactive[1].find('audio').muted;
			gama.showproperties();
		},
		D(){
			gama.recentlyactive[1].remove();
			const newbucketfiles = [];
			gama.files.forEach((file)=>{
				if(JSON.stringify(file) != JSON.stringify(gama.recentlyactive))newbucketfiles.push(file);
			})
			delete gama.inputs[gama.recentlyactive[0]];
			gama.recentlyactive = null;
			gama.files = newbucketfiles;
			help.get(document,'#properties').innerHTML = '';
		}
	},
	keyEventSetup(){
		window.addEventListener('keydown',(ev)=>{
			//console.log(ev.key);
			if(gama.inputs[ev.key] && typeof gama.inputs[ev.key] === 'function'){
				gama.inputs[ev.key]();
				return
			}
			if(gama.inputs[ev.key] && !gama.ignorestate){
				if(gama.inputs[ev.key].find('audio').paused){
					gama.inputs[ev.key].find('audio').play();
					gama.inputs[ev.key].findall('div')[0].classList.add('active');
				}
				else{
					gama.inputs[ev.key].find('audio').pause();
					gama.inputs[ev.key].findall('div')[0].classList.remove('active');
				}
				gama.recentlyactive = [ev.key,gama.inputs[ev.key]];
				gama.showproperties();
			}
		})
	},
	ignorestate:false,
	recentlyactive:null,
	showproperties(){
		const audio = this.recentlyactive[1].find('audio');
		const id = this.recentlyactive[1].find('div').innerText;
		const div = help.makeElement('div');
		div.innerHTML = templ.showproperties({
			loop:audio.loop,
			paused:audio.paused,
			volume:audio.volume,
			playbackrate:audio.playBackRate,
			muted:audio.muted,
			id,
		})
		div.id = 'propertiesitem';
		help.get(document,'#properties').innerHTML = '';
		help.get(document,'#properties').appendChild(div);
	}
};

gama.init();



