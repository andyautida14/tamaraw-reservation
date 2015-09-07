'use strict';

module.exports = function(sequelize, DataTypes) {
	var reservation = sequelize.define('reservation', {
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			get: function() {
				return this.getDataValue("id");
			}
		},
		tour_id: {
			type: DataTypes.BIGINT,
			get: function() {
				return this.getDataValue("tour_id");
			}
		},
		name: {
			type: DataTypes.STRING,
			get: function() {
				return this.getDataValue("name");
			},
			set: function(val) {
				this.setDataValue("name", val);
			}
		},
		age: {
			type: DataTypes.INTEGER,
			get: function() {
				return this.getDataValue("age");
			},
			set: function(val) {
				this.setDataValue("age", val);
			}
		},
		sex: {
			type: DataTypes.STRING,
			get: function() {
				return this.getDataValue("sex");
			},
			set: function(val) {
				this.setDataValue("sex", val);
			}
		},
		citizenship: {
			type: DataTypes.STRING,
			get: function() {
				return this.getDataValue("citizenship");
			},
			set: function(val) {
				this.setDataValue("citizenship", val);
			}
		},
		address: {
			type: DataTypes.STRING,
			get: function() {
				return this.getDataValue("address");
			},
			set: function(val) {
				this.setDataValue("address", val);
			}
		},
		email: {
			type: DataTypes.STRING,
			get: function() {
				return this.getDataValue("email");
			},
			set: function(val) {
				this.setDataValue("email", val);
			}
		},
		agency: {
			type: DataTypes.STRING,
			get: function() {
				return this.getDataValue('agency');
			},
			set: function(val) {
				this.setDataValue("agency", val);
			}
		},
		contact_number: {
			type: DataTypes.STRING,
			get: function() {
				return this.getDataValue("contact_number");
			},
			set: function(val) {
				this.setDataValue("contact_number", val);
			}
		},
		contact_person: {
			type: DataTypes.STRING,
			get: function() {
				return this.getDataValue("contact_person");
			},
			set: function(val) {
				this.setDataValue("contact_person", val);
			}
		},
		days: {
			type: DataTypes.INTEGER,
			get: function() {
				return this.getDataValue("days");
			},
			set: function(val) {
				this.setDataValue("days", val);
			}
		}
	}, {
		timestamps: false,
		freezeTableName: true,
		underscored: true
	});
	
	return reservation;
}