const gama = {
	settings:{},
	init(){
		this.checkingL();
		this.fileReader = help.get(document,'#fileInput');
		this.buttonEvent();
		this.keyEventSetup();
		this.loadData();
	},
	checkingL(){
		const pleaseBuySystem = function(){
			const bound = help.makeBound('div');
			const pop = help.makeElement('div');
			pop.innerHTML = templ.pleaseBuyPop();
			pop.id = 'pleaseBuyPop';
			bound.appendChild(pop);
			bound.onclick = null;
			const buttons = {
				ok(){
					bound.remove();
					setTimeout(function(){
						gama.inputs.ShiftS();
						location.reload();
					},600000);
				},
				buyit(button){
					pop.find('#msg').innerHTML = templ.wannaBuy();
					button.parentNode.remove()
				}
			};
			pop.findall('#buttons div span').forEach((button)=>{
				button.onclick = function(){
					buttons[this.id](this);	
				}
			});
			help.get(document,'main').appendChild(bound);
		}
		const xdata = help.storage({dbName:'buyedgamadata'},false);
		if(!xdata)pleaseBuySystem();
	},
	fileindex:0,
	addfiles(){
		gama.newfileconfig(gama.fileReader.files[gama.fileindex]);
	},
	fileData:{},
	saveData(){
		help.storage({dbName:'gamadata',value:JSON.stringify(gama.fileData)},true);
	},
	loadData(){
		this.fileData = help.storage({dbName:'gamadata'},false)||{};
	},
	buttonEvent(){
		help.get(document,'#buttons #add').onclick = this.addfiles;
	},
	files:[],
	newfileconfig(file){
		gama.ignorestate = true;
		const bound = help.makeBound('div');
		const div = help.makeElement('div');
		div.id = 'newfileconfig';
		div.innerHTML = templ.newfileconfig({file,more:gama.fileData});
		bound.callback = function(){div.remove();gama.ignorestate=false}
		div.find('#nextbutton').onclick = function(){
			const kev = div.find('#kev').value,id = div.find('#id').value; 
			gama.fileData[file.name] = {kev,id};
			gama.files.push({file,id,kev});
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
			div.innerHTML = templ.processfiles({
				id:gama.files[gama.filereadylen].id,
				kev:gama.files[gama.filereadylen].kev,
				src:fs.result,
				type:gama.files[gama.filereadylen].file.type,
			});
			div.find('audio').onpause = function(){
				div.find('div').classList.remove('active');
			}
			div.find('audio').onended = function(){
				div.find('div').classList.remove('active');
			}
			div.find('audio').onplay = function(){
				div.find('div').classList.add('active');
			}
			const kev = gama.files[gama.filereadylen].kev;
			div.onclick = function(){
				gama.setRecentlyFlag();
				gama.recentlyactive=[kev,this];
				gama.setRecentlyFlag();
				gama.showproperties();
			};
			gama.inputs[kev] = div;
			if(gama.recentlyactive){
				gama.setRecentlyFlag();
			}
			gama.recentlyactive = [kev,div];
			gama.setRecentlyFlag();
			gama.showproperties();
			help.get(document,'#musics').appendChild(div);
			gama.filereadylen++;
			if(gama.filereadylen<gama.files.length)gama.processfiles();
			else gama.saveData();
		}
		fs.readAsDataURL(gama.files[gama.filereadylen].file);
	},
	inputs:{
		ShiftL(){
			gama.recentlyactive[1].find('audio').loop = !gama.recentlyactive[1].find('audio').loop;
			gama.showproperties();
		},
		ArrowUp(){
			if(gama.recentlyactive[1].find('audio').volume<0.9){
			  gama.recentlyactive[1].find('audio').volume += 0.1;
			  gama.showproperties();
			}
		},
		ArrowDown(){
			if(gama.recentlyactive[1].find('audio').volume>0.2){
			    gama.recentlyactive[1].find('audio').volume -= 0.1;
			    gama.showproperties();
			}
		},
		ShiftR(){
			gama.recentlyactive[1].find('audio').currentTime = 0;
		},
		ShiftM(){
			gama.recentlyactive[1].find('audio').muted = !gama.recentlyactive[1].find('audio').muted;
			gama.showproperties();
		},
		ShiftD(){
			gama.recentlyactive[1].remove();
			const newbucketfiles = [];
			gama.files.forEach((file)=>{
				if(JSON.stringify(file) != JSON.stringify(gama.recentlyactive))newbucketfiles.push(file);
			})
			delete gama.inputs[gama.recentlyactive[0]];
			gama.recentlyactive = null;
			gama.files = newbucketfiles;
			help.get(document,'#properties').innerHTML = '';
		},
		Altr(){
			help.getall(document,'#musicsitem').forEach((div)=>{
				div.find('audio').currentTime = 0;
			});
		},
		'1Altr'(){
			help.getall(document,'#musicsitem').forEach((div)=>{
				div.find('audio').currentTime = 0;
				div.find('audio').pause();
			});
		},
		Altq(){
			location.reload();
		},
		Altp(){
			console.log('pausing...');
			help.getall(document,'#musicsitem').forEach((div)=>{
				if(!div.find('audio').paused)div.find('audio').pause();	
			});
		},
		ShiftA(){
			gama.addfiles();	
		},
		ShiftS(){
			delete localStorage.gamadata;
			gama.loadData();	
		}
	},
	keyBuckets:{},
	keyEventSetup(){
		window.addEventListener('keydown',(ev)=>{
			if(!gama.keyBuckets[ev.key])gama.keyBuckets[ev.key]=null;			
		})
		window.addEventListener('keyup',(ev)=>{
			const combinedKeys = this.getCombinedKeys();
			this.keyBuckets = {};
			if(gama.inputs[combinedKeys]){
				if(typeof gama.inputs[combinedKeys] === 'function' && (gama.recentlyactive||combinedKeys==='ShiftA') && !gama.ignorestate)gama.inputs[combinedKeys]();
				if(typeof gama.inputs[combinedKeys] != 'function' && !gama.ignorestate){
					if(gama.inputs[combinedKeys].find('audio').paused){
						gama.intervalPlay(gama.inputs[combinedKeys].find('audio'),50);
					}
					else{
						gama.intervalPause(gama.inputs[combinedKeys].find('audio'),50);
					}
					gama.setRecentlyFlag();
					gama.recentlyactive = [ev.key,gama.inputs[combinedKeys]];
					gama.setRecentlyFlag();
					gama.showproperties();
				}
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
	},
	setRecentlyFlag(){
		if(!gama.recentlyactive)return
		let background = gama.recentlyactive[1].style.background;
		background = (background==='orange')?'rgb(94, 129, 172)':'orange';
		gama.recentlyactive[1].style.background = background;
	},
	getCombinedKeys(){
		let combinedKeys = '';
		for(let i in gama.keyBuckets){
			combinedKeys+=i;	
		}
		return combinedKeys;
	},
	intervalPause(audio,time){
		let prevVolume = audio.volume;
		let interval = setInterval(function(){
			if(audio.volume>0.2){
				audio.volume-=0.1;
				gama.showproperties();
			}
			else{
				clearInterval(interval);
				audio.pause();
				audio.volume = prevVolume;
			}
		},time||100);
	},
	intervalPlay(audio,time){
		let prevVolume = (audio.volume===1)?0.9:audio.volume;
		audio.volume = 0;
		audio.play();
		let interval = setInterval(function(){
			if(audio.volume<prevVolume){
				audio.volume += 0.1;
				gama.showproperties();
			}
			else clearInterval(interval);
		},time||100)	
	}
};

gama.init();