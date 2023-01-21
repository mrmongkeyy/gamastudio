const express = require('express');
const path = require('path');
const app = express();

const route = [
	{
		methode:'get',
		address:'/',
		callback(req,res){
			res.sendFile('/more/index.html',{root:path.joing(__dirname)},function(err){if(err)console.log(err)});
		}
	},
	{
		methode:'get',
		address:'/scripts',
		callback(req,res){
			res.sendFile(`/more/${req.query.fn}.js`,{root:path.joing(__dirname)},function(err){if(err)console.log(err)});
		}
	},
	{
		methode:'get',
		address:'/style',
		callback(req,res){
			res.sendFile('/more/style.css',{root:path.joing(__dirname)},function(err){if(err)console.log(err)});
		}
	}
]

for(let i of route){
	app[i.methode](i.address,(req,res)=>{i.callback(req,res)});
}

app.listen(process.env.PORT||3000,()=>console.log('am lived!'));
