(function(){if (Meteor.isClient) {
	// counter starts at 0
	Session.setDefault('counter', 0);

	Template.hello.helpers({
		counter: function () {
			return Session.get('counter');
		}
	});

	Template.hello.events({
		'click button': function () {
		// increment the counter when button is clicked
			Session.set('counter', Session.get('counter') + 1);
		}
	});
}

if (Meteor.isServer) {
	var fs = Npm.require('fs');
	var sys = Npm.require('fs');
	var results = [];
	Meteor.startup(function () {
		// code to run on server at startup
		function parseCsvFile(fileName){
			var stream = fs.createReadStream('/' + fileName);
			var iteration = 0, header = [], buffer = "";
			var pattern = /(?:^|,)("(?:[^"]+)*"|[^,]*)/g;
			stream.addListener('data', function(data){
				buffer+=data.toString();
				var parts = buffer.split('\r\n');
				parts.forEach(function(d, i){
					if(i == parts.length-1) return;
					if(iteration++ == 0 && i == 0){
						header = d.split(pattern);
					}else{
						results.push(buildRecord(d));
					}
				})
				buffer = parts[parts.length-1];
			})
		 
			function buildRecord(str){
				var record = {};
				str.split(pattern).forEach(function(value, index){
					if(header[index] != '')
						record[header[index].toLowerCase()] = value.replace(/"/g, '');
				})
				return record;
			}
		}

		parseCsvFile('test.csv');
		Networks = new Mongo.Collection("networks");
		Networks.insert(results);
	});
}

})();
