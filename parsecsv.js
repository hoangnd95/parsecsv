if (Meteor.isClient) {
	Networks = new Mongo.Collection("data11");
	
	Template.networks.helpers({
		items: function () {
			return Networks.find();
		},
		headers: function () {
			var index = [];
			var ele = Networks.findOne();
			for (i in ele) {
				if (!ele.hasOwnProperty(i) || i == '_id') continue;
				index.push(i);
			}
			
			return index;
		},
		index: 'Path'
		
	});

}

if (Meteor.isServer) {
	var fs = Npm.require('fs');
	var results = [];
	
	Meteor.startup(function () {
		// code to run on server at startup
		function parseCsvFile(fileName){
			var meteor_root = Npm.require('fs').realpathSync( process.cwd() + '/../' );
			var application_root = Npm.require('fs').realpathSync( meteor_root + '/../' );
			// if running on dev mode
			if( Npm.require('path').basename( Npm.require('fs').realpathSync( meteor_root + '/../../../' ) ) == '.meteor' ){
				application_root =  Npm.require('fs').realpathSync( meteor_root + '/../../../../' );
			}
			var stream = fs.createReadStream(application_root + '/' + fileName);
			var iteration = 0, header = [], buffer = "";
			var pattern = /(?:^|,)("(?:[^"]+)*"|[^,]*)/g;
			stream.addListener('data', function(data){
				buffer+=data.toString();
				var parts = buffer.split('\r\n');
				parts.forEach(function(d, i){
					if(i == parts.length-1) return;
					if(iteration++ == 0 && i == 0){
						header = d.split(pattern).map(function(el) {
							var str = el.replace(new RegExp("\\.","g"), "_");
							return str;
						});
					}else{
						results.push(buildRecord(d));
					}
				})
				buffer = parts[parts.length-1];
			})
		 
			function buildRecord(str){
				var record = {};
				str.split(pattern).forEach(function(value, index){
					if(header[index] != '') {
						record[header[index]] = value.replace(/"/g, '');
					}
				})
				return record;
			}
		}

		parseCsvFile('data.csv');
		Networks = new Mongo.Collection("data11");
		console.log(results);
		for (network in results) {
			if (!results.hasOwnProperty(network)) continue;
			Networks.insert(results[network]);
		}
	});
}
