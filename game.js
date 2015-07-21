$(document).ready(function(){


	function scrollDown() {
		var objDiv = document.getElementById("content");
		objDiv.scrollTop = objDiv.scrollHeight;
	}

	var moves = 0;
	var score = 0;
	var input = $('input');
	var output = $('.commandline'); // For output, use output.before();
	var verbose = false;

	// ======================== Items ========================

	var mailbox = {
		desc: "small mailbox"
	};

	var mat = {
		specialdesc: "A rubber mat saying 'Welcome to Zork!' lies by the door."
	};

	// ======================== Rooms ========================
	

	var Rooms = function(name, look, items) {
		this.name = name;
		this.look = look;
		this.items = items;
		this.visited = false;
	};

	Rooms.prototype.addExit = function(direction, exit) {
		
		switch(direction){

			case "north":
				this.north = exit;
				break;

			case "northeast":
				this.northeast = exit;
				break;

			case "east":
				this.east = exit;
				break;

			case "southeast":
				this.southeast = exit;
				break;

			case "south":
				this.south = exit;
				break;

			case "southwest":
				this.southwest = exit;
				break;

			case "west":
				this.west = exit;
				break;

			case "northwest":
				this.northwest = exit;
				break;

			case "up":
				this.up = exit;
				break;

			case "down":
				this.down = exit;
				break;
		}
	};

	var testRoom = new Rooms("Test Room", "Test room.", []);

	var westOfHouse = new Rooms("West of House", "This is an open field west of a white house, with a boarded front door.", [mailbox, mat]);

	westOfHouse.addExit("north", testRoom);
	westOfHouse.visited = true;

	testRoom.addExit("south", westOfHouse);

	

	// ======================= Player ========================

	var player = {
		inventory: [],
		location: westOfHouse
	};

	var room = player.location;

	// ======================== Commands ========================

	function invalidCommand() {
		output.before("That's not a verb I recognize.<br />");
		scrollDown();
	}

	function brief() {
		verbose = false;
		output.before("ZORK is now in its normal \"brief\" printing mode, which gives long descriptions of places never before visited, and short descriptions otherwise.<br /><br />");
		scrollDown();
	}

	function verboseOn() {
		verbose = true;
		output.before("ZORK is now in its \"verbose\" mode, which always gives long descriptions of locations (even if you've been there before).<br /><br />");
		scrollDown();
	}

	function showItems() {
		var itemlist = [];

		for (var i = 0; i < room.items.length; i++) {
			if (room.items[i].specialdesc) {
				output.before(room.items[i].specialdesc + "<br />");
			}
			else {
				itemlist.push(room.items[i].desc);
			}
		}

		if (itemlist.length === 1) {
			output.before("There is a " + itemlist[0] + " here.<br /><br />");
		}
		else if (itemlist.length > 1) {
			var str = "";
			for (var i = 0; i < itemlist.length; i++) {
				if (!itemlist[i + 1]) {
					str.concat(itemlist[i]);
				}
				else {
					str.concat(itemlist[i] + ", ");
				}
			}
			output.before("There is a " + str + " here.<br /><br />");
		}

		scrollDown();

	}

	function look() {

		output.before("<strong>" + room.name + "</strong><br />")
		output.before(room.look + "<br /><br />");

		showItems();
		scrollDown();
	}

	function go(direction) {


		// If player typed "go -direction-", this function receives an array
		// as a parameter. The item at the array index 1 should be the direction
		// entered. This function will recursively call itself, passing that
		// direction as a parameter.

		if (Array.isArray(direction)){

			// If the array has length of 1, the player didn't specify a direction
			if (direction.length == 1) {
				output.before("Which direction?<br /><br />");
			}
			else {
				go(direction[1]);
			}
		}

		else {

			if (room[direction] === undefined) {
				output.before("You can't go that way.<br /><br />");
			}

			else {
				player.location = room[direction];
				room = player.location;

				if (!verbose){
					if (room.visited) {
						output.before("<strong>" + room.name + "</strong><br /><br />");
						showItems();
					}
					else {
						look();
						room.visited = true;
					}
				}

				else {
					look();
					room.visited = true;
				}
			}
		}

		scrollDown();

	}

	function parseCommand(command){

		command = command.toLowerCase();
		command = command.split(" ");

		switch(command[0]) {

			case "go":
				go(command);
				break;

			case "north":
			case "n":
				go("north");
				break;

			case "south":
			case "s":
				go("south");
				break;

			case "east":
			case "e":
				go("east");
				break;

			case "west":
			case "w":
				go("west");
				break;

			case "up":
			case "u":
				go("up");
				break;

			case "down":
			case "d":
				go("down");
				break;

			case "look":
			case "l":
				look();
				break;

			case "brief":
				brief();
				break;

			case "verbose":
				verboseOn();
				break;

			default:
				invalidCommand();	

		}

	}

	function submitCommand() {

		moves++;
		$('.moves').text("Moves: " + moves);


		var command = input.val();
		input.val('');
		output.before("> " + command + "<br /><br />");
		parseCommand(command);
	}
	
	input.on('keypress', function(event) {
		if(event.which === 13){
			submitCommand();
		}
	})


});