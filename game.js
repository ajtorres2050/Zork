$(document).ready(function(){

	var moves = 0;
	var input = $('input');

	function parseCommand(command){

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