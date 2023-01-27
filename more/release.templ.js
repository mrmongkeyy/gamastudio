const templ={newfileconfig(i){return`
			<div class='container fullheight'>
				<div class=container>
					<div>File Selected:</div>
					<div class=bold>${i.file.name||"Undefined"}</div>
				</div>
				<div class=container>
					<div>ID</div>
					<div>
						<input id=id placeholder=typetheid required value="${i.more[i.file.name]?i.more[i.file.name].id:""}">
					</div>
				</div>
				<div class=container>
					<div>Key Event</div>
					<div>
						<input id=kev placeholder=typethekey value="${i.more[i.file.name]?i.more[i.file.name].kev:""}">
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
		`},processfiles(i){return`
			<div>
				(${i.kev}) ${i.id} 
			</div>
			<div>
				<audio src=${i.src} type=${i.type} controls></audio>
			</div>
		`},showproperties(i){return`
			<div>ID: ${i.id}</div>
			<div>Loop: ${i.loop} "SHIFT+l" change!</div>
			<div>Volume: ${String(i.volume).slice(0,3)} "arrow keys" change!</div>
			<div>Reset "SHIFT+r"</div>
			<div>Muted: ${i.muted} "SHIFT+m" change!</div>
			<div>Delete "SHIFT+d"</div>
			<div>ResetAll "Alt+r"</div>
			<div>DeleteAll "Alt+q"</div>
			<div>ResetAll&&Pause "Alt+r+1"</div>
			<div>PauseAll "Alt+p"</div>
			<div>AddFile "Shift+a"</div>
			<div>DeleteSaveData "Shift+s"</div>
		`},pleaseBuyPop(){return`
			<div id=box>
				<div id=msg>
					Helloworld, this is Mrmongkeyy. You are using the trial version of this app, you can use the app 10 minutes only
					and the app will reload and delete all of your works, but its ok you can use it again, but it will start from 0.
					Enjoy the app!
				</div>
				<div id=buttons>
					<div><span id=ok>Ok</span></div>
					<div><span id=buyit>Get full version</span></div>
				</div>
			</div>
		`},wannaBuy(){return"Please contact our developer. Its Mrmongkeyy shit!"}};