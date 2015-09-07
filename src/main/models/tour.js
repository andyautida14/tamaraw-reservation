'use strict';

module.exports = function(sequelize, DataTypes) {
	var tour = sequelize.define('tour', {
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			get: function() {
				return this.getDataValue("id");
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
		for_date: {
			type: DataTypes.DATE,
			get: function() {
				return this.getDataValue("for_date");
			},
			set: function(val) {
				this.setDataValue("for_date", val);
			}
		},
		deleted: {
			type: DataTypes.BOOLEAN,
			get: function() {
				return this.getDataValue("deleted");
			},
			set: function(val) {
				this.setDataValue("deleted", val);
			}
		}
	}, {
		timestamps: false,
		freezeTableName: true
	});
	
	return tour;
}