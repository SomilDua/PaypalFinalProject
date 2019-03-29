const express=require('express');
var cors = require('cors')
var app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());

//Var list for storage
var list=[]
var temp=[]
var sku=""
var or=[]
var or_list=[]
app.get("/product_home",(req,res)=>{
	res.send({});
});
app.get("/product_home/add_product",(req,res)=>{
});
app.post("/product_home/add_product",(req,res)=>{
	temp=[req.body.category,req.body.brand,req.body.traits_id,req.body.tax_id,req.body.parent_sku,req.body.inventory,req.body.active,req.body.cost]
	console.log(temp);

	//Generate the SKU 
	sku=""
	sku+=req.body.brand.substring(0,2)
	sku+=req.body.category.substring(0,2)
	sku+="-";
	sku+=(Math.floor(Math.random()*1000)).toString();
	sku+=req.body.active.toString();
	sku+="-";
	sku+=req.body.inventory.toString();
	sku+=req.body.tax_id.toString();
	sku+="-";
	sku+=req.body.traits_id;
	console.log(sku);
	temp.push(sku);
	list.push(temp);
	console.log(list);
	res.send(sku);
});
app.put("/product_home/edit_product",(req,res)=>{
	temp=[req.body.category,req.body.brand,req.body.traits_id,req.body.tax_id,req.body.parent_sku,req.body.inventory,req.body.active,req.body.cost]
	console.log(temp);

	//Generate the SKU 
	sku=""
	sku+=req.body.brand.substring(0,2)
	sku+=req.body.category.substring(0,2)
	sku+="-";
	sku+=(Math.floor(Math.random()*1000)).toString();
	sku+=req.body.active.toString();
	sku+="-";
	sku+=req.body.inventory.toString();
	sku+=req.body.tax_id.toString();
	sku+="-";
	sku+=req.body.traits_id;
	console.log(sku);
	console.log(req.body.SKU);
	temp.push(sku);
	let i=0;
	for(i=0;i<list.length;i++){
		let te=list[i]
		console.log(te[te.length-1]==req.body.SKU);
		console.log(te[te.length-1])
		if(te[te.length-1]==req.body.SKU){
			list[i]=temp
		}
	}
	console.log(list);
	res.send("Product Edited");
});
app.get("/check_details/:sku",(req,res)=>{
	let i=0;
	console.log(req.params.sku)
	for(i=0;i<list.length;i++){
		let te=list[i]
		console.log(te[te.length-1]==req.params.sku);
		console.log(te[te.length-1])
		if(te[te.length-1]==req.params.sku){
			res.send({
				"category": te[0],
				"brand": te[1],
				"traits_id": te[2],
				"tax_id": te[3],
				"parent_sku": te[4],
				"inventory": te[5],
				"active": te[6],
				"cost": te[7],
				"SKU": te[8]
			  });
			break;
		}
	}
});
app.get("/check_inventory/:sku",(req,res)=>{
	let i=0;
	console.log(req.params.sku)
	for(i=0;i<list.length;i++){
		let te=list[i]
		console.log(te[te.length-1]==req.params.sku);
		console.log(te[te.length-1])
		if(te[te.length-1]==req.params.sku){
			res.send(te[5].toString());
			break;
		}
	}
});
app.get("/edit_inventory/:sku/:invent",(req,res)=>{
	let i=0;
	console.log(req.params.sku)
	for(i=0;i<list.length;i++){
		let te=list[i]
		console.log(te[te.length-1]==req.params.sku);
		console.log(te[te.length-1])
		if(te[te.length-1]==req.params.sku){
			te[5]=Number(req.params.invent);
			list[i]=te;
			console.log(list);
			res.send("Inventory Changed");
			break;
		}
	}
});
app.get("/product_list",(req,res)=>{
	let i=0;
	let tem=[]
	for(i=0;i<list.length;i++){
		let te=list[i]
		tem.push(te[te.length-1]);
		}
	res.send(tem);
});
app.get("/Generate_taxes",(req,res)=>{
	let i=0;
	let tem=0
	let to=0;
	for(i=0;i<list.length;i++){
		let te=list[i]
		tem+=te[te.length-2]*te[3]*0.1;
		to+=te[te.length-2]
		}
	to=tem/to;
	to*=100;
	res.send({"Total Tax":tem.toString(),"Average Tax rate":to.toString()});
});
app.post("/order_new",(req,res)=>{
	or=[req.body.product_sku,req.body.quantity]
	or.push(Math.floor(Math.random()*10000));
	or_list.push(or);
	console.log(or_list);
	res.render(200);
});
app.listen(8080);