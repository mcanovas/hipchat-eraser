phantom.casperPath = './node_modules/casperjs';
phantom.injectJs(phantom.casperPath +'/bin/bootstrap.js');

var casper = require('casper').create({
	verbose: true
});

require("utils").dump(casper.cli.args);

var strDate = "";
var messagesURL = "";
var dest = casper.cli.get(3);
var host = casper.cli.get(0);

var currentUrl = 0;

var pages = 0;
var currentPage = -1;

var urls = [];

var running = false;

casper.start('https://' + host + '/sign_in', function() {
	this.echo("Logging to Hipchat");
	this.fill('form[name="signin"]', {
		email: casper.cli.get(1),
		password: casper.cli.get(2)
	}, true);
});

var pad = function(val) {
	return val < 10 ? ('0' + val) : val;
};

var generateHistoryUrl = function(date) {
	var day = pad(date.getDate());
	var month = pad(date.getMonth() + 1);

	strDate = date.getFullYear() + "/" + month + "/" + day;
	return "https://" + host + "/history/member/" + dest + "/" + strDate;
};

var previousDay = function(currentDate) {
	var prev = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
	prev.setDate(prev.getDate() - 1);
	return prev;
};

var datesEquals = function (date1, date2) {
	if (date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()) {
		return true;
	}
	return false;
};

function generateHistory() {
	this.echo("Generating history");
	var today = new Date();
	var finalDate = new Date(casper.cli.get(4));
	var i = 0;
	var url = generateHistoryUrl(today);
	this.echo("Generating history: " + url);
	urls[i] = url;
	i++;
	while (!datesEquals(today, finalDate)) {
		today = previousDay(today);
		url = generateHistoryUrl(today);
		this.echo("Generating history: " + url);
		urls[i] = url;
		i++;
	}
};

casper.on('remote.message', function(msg) {
    this.echo('REMOTE: ' + msg);
});

function deleteMessage (messagesURL) {
	var left = this.evaluate(function(action) {
		var forms = document.querySelectorAll('form[action="' + action +'"]');
		var left = forms.length;
		if (left > 0) {
			forms[0].submit();
			console.log("Message Deleted");
			left - 1;
		}
		return left;
	}, messagesURL);
	return left;
};

function checkPages() {
	var pages = this.evaluate(function() {
		var result = 0;
		var numbers = document.querySelectorAll('.aui-nav-pagination li a');
		if (numbers.length > 0) {
			var last = numbers[numbers.length - 3];
			var result = last.innerHTML.trim();
		}
		return result;
	});
	return pages;
};

function check() {
	if (urls.length == 0) {
		generateHistory.call(this);
	}
	if (urls[currentUrl]) {
		this.waitFor(function check() {
			this.echo("Opening History: " + urls[currentUrl]);
			var cu = urls[currentUrl];
			if (currentPage > 1) {
				cu = cu + "?p=" + currentPage;
			}
			return this.open(cu);
		}, function then() {
			this.echo("Processing History: " + urls[currentUrl]);

			if (currentPage === -1) { 
				pages = checkPages.call(this);
				this.echo("Pages: " + pages);
				currentPage = 1;
			}
			
			var left = deleteMessage.call(this, urls[currentUrl]);
			this.echo("Current Page: " + currentPage);
			this.echo("Messages: " + left);
			if (left === 0 && currentPage <= pages) {
				currentPage++;
			}

			if (left === 0 && currentPage > pages) {
				currentPage = -1;				
				currentUrl++;
				this.echo("Going to the next DAY.");
			}
			this.run(check);
		});
		if (!running) {
			this.run(check);
			running = true;
		}

	} else {
		this.echo("All Done!");
		this.exit();
	}
}

casper.run(check);