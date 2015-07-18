$(document).ready(function(){

	var moves = 0;
	var score = 0;
	var input = $('input');

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

			case "north":
			case "n":
			case "go north":
			case "go n"
				goNorth();
				break;

			case "south":
			case "s":
			case "go south":
			case "go s"
				goSouth();
				break;

			case "east":
			case "e":
			case "go east":
			case "go e"
				goEast();
				break;

			case "west":
			case "w":
			case "go west":
			case "go w"
				goWest();
				break;

			case "up":
			case "u":
			case "go up":
			case "go u"
				goUp();
				break;

			case "down":
			case "d":
			case "go down":
			case "go d"
				goUp();
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
		$('.commandline').before("> " + command + "<br />");
		parseCommand(command);
	}
	
	input.on('keypress', function(event) {
		if(event.which === 13){
			submitCommand();
		}
	})


});