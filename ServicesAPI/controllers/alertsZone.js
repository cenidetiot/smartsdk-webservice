
var Zone = require('../../DataModelsAPI/models/zone.model');
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')
var fetch = require('node-fetch')
const { DateTime } = require('luxon');
var context = require('../../config/config').context

exports.getHistory = async function (req,res) {
	console.log(req.query.id)

    await Zone.findOne({where : { 'idZone': req.params.idZone }})
    .then( async (zone) => {
	  	if (zone != null){
			let jsonQuery = {
				type : "Alert",
				options : "count",
				//georel :"coveredBy",
				//geometry:"polygon",
				//coords : zone.location
			}
			if(req.query.id != undefined)
				jsonQuery["id"] = req.query.id
			let queryToCount = ngsi.createQuery(jsonQuery);

            await cb.getWithQuery(queryToCount)
			.then(async (response) => {
				let off = Number(response["headers"]["_headers"]["fiware-total-count"][0])
				console.log(off)  
				let params  = {
					type : "Alert",
					options : "keyValues",
					//georel :"coveredBy",
					//geometry:"polygon",
					//coords : zone.location,
					limit : "10",
				}
				if(req.query.id != undefined)
					params["id"] = req.query.id

				if (off > 10){
					params.offset = off - 10
				}
                let query = ngsi.createQuery(params);
				await cb.getWithQuery(query)
				.then((result) => {
					res.status(200).json(result.body.reverse())
				})
				.catch((error) =>{
					res.status(500).send("eeror 1");
                })
			})
			.catch((error) =>{
				res.status(500).send("error");
			})
				
	  	}  	
	});
} 

exports.getCurrent = async function (req,res) {
	console.log(req.query)
    await Zone.findOne({where : { 'idZone': req.params.idZone }})
    .then( async (zone) => {
	  	if (zone != null){
			//var dt = DateTime.utc()
			//var dt = DateTime.local();
			var dt = DateTime.local().setZone('America/Mexico_City')
			let midnight = dt.minus({ days: 1 }).endOf('day');
			let jsonQuery = {
				type : "Alert",
				options : "count",
				//georel :"coveredBy",
				//geometry:"polygon",
				//coords : zone.location,
				dateObserved: `>=${midnight}`
			}

			if(req.query.id != undefined)
				jsonQuery["id"] = req.query.id

			let queryToCount = ngsi.createQuery(jsonQuery);
			console.log(queryToCount)

            await await cb.getWithQuery(queryToCount)
			.then(async (response) => {

				let count = Number(response["headers"]["_headers"]["fiware-total-count"][0])  
				if (count < 20) {
					count = 20;
				}
				let jsonQuery2 = {
					type : "Alert",
					options : "keyValues",
					//georel :"coveredBy",
					//geometry:"polygon",
					//coords : zone.location,
					dateObserved: `>=${midnight}`,
					limit : 10,
					offset : count - 10,
				}
				if(req.query.id != undefined)
					jsonQuery2["id"] = req.query.id

				let query = ngsi.createQuery(jsonQuery2);

				console.log(query)
				await cb.getWithQuery(query)
				.then((result) => {
					
					res.status(200).json(result.body.reverse())
					
				})
				.catch((error) =>{
					res.status(error.status).send(error);
				})
				
			})
			.catch((error) =>{
				console.log("segundo")
				res.status(500).send(error);
			})
				
	  	}  	
	});
} 









