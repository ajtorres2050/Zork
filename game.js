$(document).ready(function(){

	var moves = 0;
	var score = 0;
	var input = $('input');
	var output = $('.commandline'); // For output, use output.before();

	var mailbox = {
		desc: "small mailbox"
	};

	var mat = {
		specialdesc: "A rubber mat saying 'Welcome to Zork!' lies by the door."
	};

	var westOfHouse = {
		look: "This is an open field west of a white house, with a boarded front door.",
		name: "West of House",
		items: [mailbox, mat],
		visited: true
	}

	var player = {
		inventory: [],
		location: westOfHouse
	};

	var room = player.location;

	function invalidCommand() {
		output.before("That's not a verb I recognize.<br />");
	}

	function look() {
		var itemlist = [];

		output.before("<strong>" + room.name + "</strong><br />")
		output.before(room.look + "<br />");

		for (var i = 0; i < room.items.length; i++) {
			if (room.items[i].specialdesc) {
				output.before(room.items[i].specialdesc + "<br />");
			}
			else {
				itemlist.push(room.items[i].desc);
			}
		}

		if (itemlist.length === 1) {
			output.before("There is a " + itemlist[0] + " here.");
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
			output.before("There is a " + str + " here.");
		}
	}

	function goNorth() {

	}

	function goSouth() {

	}

	function goEast() {

	}

	function goWest() {

	}

	function goUp() {

	}

	function goDown() {

	}

	function parseCommand(command){

		command = command.toLowerCase();

		switch(command) {

			case "go":
				output.before("Which direction?<br />");
				break;

			case "north":
			case "n":
			case "go north":
			case "go n":
				goNorth();
				break;

			case "south":
			case "s":
			case "go south":
			case "go s":
				goSouth();
				break;

			case "east":
			case "e":
			case "go east":
			case "go e":
				goEast();
				break;

			case "west":
			case "w":
			case "go west":
			case "go w":
				goWest();
				break;

			case "up":
			case "u":
			case "go up":
			case "go u":
				goUp();
				break;

			case "down":
			case "d":
			case "go down":
			case "go d":
				goUp();
				break;

			case "look":
			case "l":
				look();
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