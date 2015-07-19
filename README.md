# Zork
Web-based Zork clone using Javascript....just for fun

So far, I've got a pretty nice looking terminal emulated in the browser. The bottom of the terminal has a text
input element that listens for the enter key. When the enter key is pressed, the user has submitted a command.
This causes the program to update the "Moves" variable that's printed at the top of the screen, clear the input
text box, and push "> user command" to the bottom of the terminal. It also calls the parseCommand function, passing
the user input into that function, which is currently empty.

Next steps:
- Build "room" objects and a "player" object.
- Implement commands for north, south, east, and west to move the player object between rooms
- Build an inventory for the player to carry items
- Implement an enemy "troll" object that will fight with the player
- Implement an enemy "thief" object that will wander around the game and occasionally steal items from the player

I don't plan on implementing the entire Zork game, since it is pretty massive, and there are much better ways
of making Infocom style text adventures (www.inform7.com for instance). I just want to build a complete working
web-based application and deal with parsing human language.

Feel free to add to this repo if you would like. 
Ideas for additional features not found in the original Zork game:
- A minimap that shows the player and surrounding rooms (Beyond Zork had this)
- Buttons instead of text input.
- Graphics...although that really undermines the spirit of Interactive Fiction
