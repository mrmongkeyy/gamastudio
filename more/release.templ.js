const templ={newfileconfig(config){return`
			<div class='container fullheight'>
				<div class=container>
					<div>File Selected:</div>
					<div class=bold>${config.file.name||"Undefined"}</div>
				</div>
				<div class=container>
					<div>ID</div>
					<div>
						<input id=id placeholder=typetheid required value="${config.more[config.file.name]?config.more[config.file.name].id:""}">
					</div>
				</div>
				<div class=container>
					<div>Key Event</div>
					<div>
						<input id=kev placeholder=typethekey value="${config.more[config.file.name]?config.more[config.file.name].kev:""}">
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
		`},processfiles(config){return`
			<div>
				(${config.kev}) ${config.id} 
			</div>
			<div>
				<audio src=${config.src} type=${config.type} controls></audio>
			</div>
		`},showproperties(config){return`
			<div>ID: ${config.id}</div>
			<div>Loop: ${config.loop} "SHIFT+l" change!</div>
			<div>Volume: ${String(config.volume).slice(0,3)} "arrow keys" change!</div>
			<div>Reset "SHIFT+r"</div>
			<div>Muted: ${config.muted} "SHIFT+m" change!</div>
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
					Hello world, this is Mrmongkeyy. You are using the trial version of this app, which allows you to use the app for up to 10 minutes before it reloads and deletes all of your work. However, you can use it again afterwards, though it will start from scratch. Enjoy the app!
				</div>
				<div id=buttons>
					<div><span id=ok>Ok</span></div>
					<div><span id=buyit>Get full version</span></div>
				</div>
			</div>
		`},wannaBuy(){return"Please contact my developer. Its Mrmongkeyy shit!"}};