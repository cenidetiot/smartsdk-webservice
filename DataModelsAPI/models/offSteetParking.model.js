
const Sequelize = require('sequelize');

var sequelize = require('../db/sequelize');
//var sequelize = require('../utils/config');
var Zone = require('../models/zone.model')
var locations = require('./functions/locations')

var parking= sequelize.define('OffStreetParking', {
	idOffStreetParking: { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	type: { 
		type: Sequelize.STRING,
        defaultValue: "OffStreetParking"
	},
	name: {
		type : Sequelize.STRING,
		allowNull: false
	},
	category: { 
		type: Sequelize.TEXT,
		set(category) {
			this.setDataValue('category', category.join(","));
		},
		get() {
			return this.getDataValue('category').split(',')
		}	
	},
	location:{
		type: Sequelize.TEXT,
		allowNull: false,
		set(location) {
			this.setDataValue('location', location.join(";"));
		},
		get() {
			return locations.getPoly(this.getDataValue('location'))
		}
	},
	description: {
		type:Sequelize.TEXT
    },
    areaServed:{
        type: Sequelize.STRING(100),
        references: {
			// This is a reference to another model
			model: Zone,
			// This is the column name of the referenced model
			key: 'idZone',
		},
		allowNull: false,
    },
	dateCreated: { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	},
	dateModified: { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW 
	},
	status : { 
		type: Sequelize.CHAR(1),
		defaultValue: "1"
	}
});
parking.sync() 
module.exports = parking;