
/*var protoInclude = document.createElement("script");
protoInclude.src = "prototypes.js";
var head = document.head;
//document.head.insertBefore(protoInclude, document.head.lastChild);
document.head.appendChild(protoInclude);*/

function buildGrid(){
	
	first = true;
	var array = inputArray();

	//CAUTION::::objectArray is global
	objectArray = populateObjectArray(array);
	
	body = document.body;
	grid = document.createElement("table");
	
	/*grid.onclick = function(){
		console.log("Table clicked");
	}*/

	grid.id = "grid";

	body.appendChild(grid);

	for(var i=0; i<15; i++){
		var gridRow = document.createElement("tr");
		grid.appendChild(gridRow);
		for(var j=0; j<15; j++){
			var cell = document.createElement("td");

			addCellEvents(cell, i, j, objectArray);
			gridRow.appendChild(cell);
		}
	}

	//Populate grid
	var LENGTH = grid.childNodes.length;
	var MID = Math.floor(LENGTH/2);


	for(var i=0; i<LENGTH; i++){
		for(var j=0; j<LENGTH; j++){
			grid.childNodes[i].childNodes[j].appendChild(document.createTextNode(objectArray[i][j].getType()));

		}
	}
	
}

function inputArray(){

	var array = [
					["TW"," "," ","DL"," "," "," ","TW"," "," "," ","DL"," "," ","TW"],
					[" ","DW"," "," "," ","TL"," "," "," ","TL"," "," "," ","DW"," "],
					[" "," ","DW"," "," "," ","DL"," ","DL"," "," "," ","DW"," "," "],
					["DL"," "," ","DW"," "," "," ","DL"," "," "," ","DW"," "," ","DL"],
					[" "," "," "," ","DW"," "," "," "," "," ","DW"," "," "," "," "],
					[" ","TL"," "," "," ","TL"," "," "," ","TL"," "," "," ","TL"," "],
					[" "," ","DL"," "," "," ","DL"," ","DL"," "," "," ","DL"," "," "],
					["TW"," "," ","DL"," "," "," ","*"," "," "," ","DL"," "," ","TW"],
					[" "," ","DL"," "," "," ","DL"," ","DL"," "," "," ","DL"," "," "],
					[" ","TL"," "," "," ","TL"," "," "," ","TL"," "," "," ","TL"," "],
					[" "," "," "," ","DW"," "," "," "," "," ","DW"," "," "," "," "],
					["DL"," "," ","DW"," "," "," ","DL"," "," "," ","DW"," "," ","DL"],
					[" "," ","DW"," "," "," ","DL"," ","DL"," "," "," ","DW"," "," "],
					[" ","DW"," "," "," ","TL"," "," "," ","TL"," "," "," ","DW"," "],
					["TW"," "," ","DL"," "," "," ","TW"," "," "," ","DL"," "," ","TW"]
				];

	return array;
}


function populateObjectArray(inputArray){

	var array = [];

	for(var i=0; i<inputArray.length; i++){
		array[i] = inputArray[i];
		for(var j=0; j<inputArray[i].length; j++){
			
			switch(inputArray[i][j]){
				case "TW":
					array[i][j] = new TripleWord(i, j);
					break;

				case "TL":
					array[i][j] = new TripleLetter(i, j);
					break;

				case "DW":
					array[i][j] = new DoubleWord(i, j);
					break;

				case "DL":
					array[i][j] = new DoubleLetter(i, j);
					break;

				case "*":
					array[i][j] = new CenterCell(i, j);
					break;

				default:
					array[i][j] = new NormalCell(i, j);
					break;
			}
		}

	}

	return array;
}

/*
 * Reset the grid 
 */

function resetGrid(){
	
	deleteGrid();
	buildGrid();
	
}

function deleteGrid(){
	
	body.removeChild(grid);
	body.removeChild(drawContainer);
	
}

/*****************************
*        COMMON NAMESPACE
*****************************/

{	

	var selected = new Selection();
	var Rack = loadRack();
	var MID = 7;
	var MAX = 14;
	var first = true;
	var letterIndex = {
			"A": 0,
			"B": 1,
			"C": 2,
			"D": 3,
			"E": 4,
			"F": 5,
			"G": 6,
			"H": 7,
			"I": 8,
			"J": 9,
			"K": 10,
			"L": 11,
			"M": 12,
			"N": 13,
			"O": 14,
			"P": 15,
			"Q": 16,
			"R": 17,
			"S": 18,
			"T": 19,
			"U": 20,
			"V": 21,
			"W": 22,
			"X": 23,
			"Y": 24,
			"Z": 25
	};

	var rowArray = [];
	var colArray = [];
	var totalScore = 0;

	for(var i = 0; i < 15; i++){
		rowArray[i] = new iMinMax(i);
	}

	for(var i = 0; i < 15; i++){
		colArray[i] = new jMinMax(i);
	}

	
	/*****************************
	*        DRAW
	*****************************/

	function drawLetters(){
		
		drawContainer = document.createElement("div");
		
		var sep = document.createElement("br");
		drawContainer.appendChild(sep);
		
		body.appendChild(drawContainer);
		
		var draw = document.createElement("table");
		draw.id = "draw";
		drawContainer.appendChild(draw);
		
		var row = document.createElement("tr");
		draw.appendChild(row);
	
		var inputArray = generateLetters();
	
		for(var i=0; i<7; i++){
			var letter = document.createElement("td");
			row.appendChild(letter);
			addDrawEvents(letter, i, inputArray);
			letter.appendChild(document.createTextNode(inputArray[i].getLetter()));
		}
	}
	
	
	function generateLetters(){
	
		var array = [];
		var min = 0;
		var max = 25;
		var num = 7;
		
		var randomIntegers = genRandomIntegers(0, 25);
		
		for(var i=0; i<7; i++){
			array[i] = Rack[randomIntegers[i]];
		}
	
		return array;
	}

	function addCellEvents(cell, i, j){

		cell.addEventListener("click", function(event){
		
			selected.setGridSelection(objectArray[i][j]);
			
			//console.log("Cell selected : " + selected.getGridSelection().getType());

		});
	
	}

	function addDrawEvents(cell, i, inputArray){

		cell.addEventListener("click", function(event){

			var drawSelected = inputArray[i];
			drawSelected.setCoordinates(i);

			//Add to selection

			selected.setDrawSelection(drawSelected);
			//console.log("Draw selected : " + selected.getDrawSelection().getLetter(), );
		});

	}

	function processMove(){

		var cellSelected = selected.getGridSelection();
		if(cellSelected == null){
			alert("Please select a cell in the board");
			return;
		}

		var drawSelected = selected.getDrawSelection();
		if(drawSelected == null){
			alert("Please select a letter from the draw");
			return;
		}

		/*
		 * Get the selected cell's details. Map the details to the object array
		 * which is an 8X8 array. All 4 quadrants in the grid are mirror images 
		 * of each other. So, translate the coordinates into 8X8, and fetch the
		 * details that correspond that position in the object array.
		 */ 

		 var cellCoordinates = cellSelected.getCoordinates();
		 var j = cellCoordinates.getX();
		 var i = cellCoordinates.getY();

		//Mark the selected cell in the board as populated if it is a valid move

		if(moveValid(i, j)){
			
			//Set the populated flag	
			cellSelected.populate();

			//Update the min and max values for the selected row and column and set the changed flag
			rowArray[i].updateMinAndMax(j);
			rowArray[i].setChanged();
			colArray[j].updateMinAndMax(i);
			colArray[j].setChanged();


		}else{

			//Reset cell selection and prompt user to renter
			 selected.setGridSelection(null);
			 alert("You can only choose cells where the adjacent (not diagonal) cells have been populated.");
			 return;
		}

		var grid = document.getElementById("grid");
		var cell = grid.childNodes[i].childNodes[j];

		cell.innerHTML = drawSelected.getLetter();
		objectArray[i][j].setLetter(cell.innerHTML);

		var drawCoordinates = drawSelected.getCoordinates();

		var draw = document.getElementById("draw");
		draw.childNodes[0].childNodes[drawCoordinates.getX()].innerHTML = " ";
		drawSelected.reduceCountByOne();

		/*
		 * Clear the selections
		 */

		selected.setGridSelection(null);
		selected.setDrawSelection(null);

		return;

	}


	function genRandomIntegers(min, max){

		var array = [];

		for(var i=0; i<7; i++){
			array[i] = Math.floor(Math.random() * (max - min + 1) + min);
		}

		return array;
	}

	function play(){

		var words = [];
		words = getWords();
		var list = words[0];

		for(var i = 1; i < words.length; i++){
			list = list + ", " + words[i]; 
		}

		alert("Words list :" + list);

		//Reset the changed flag for the new round
		for(var i = 0; i < 15; i++){
			rowArray[i].resetChanged();
		}

		for(var i = 0; i < 15; i++){
			colArray[i].resetChanged();
		}

	}

	function moveValid(i, j){

		var cellSelected = selected.getGridSelection();
		var topPopulated = false;
		var bottomPopulated = false;
		var leftPopulated = false;
		var rightPopulated = false;

		if(cellSelected.isPopulated()){

			return false;
		}

		if(first){

			if(cellSelected.isCenter()){

				first = false;
				return true;
			}else{

				return false;
			}
		}

		if(i-1 < 0){
			topPopulated = false;
		}else{
			topPopulated = objectArray[i-1][j].isPopulated();
		}

		if(i+1 > MAX){
			bottomPopulated = false;
		}else{
			bottomPopulated = objectArray[i+1][j].isPopulated();
		}

		if(j-1 < 0){
			leftPopulated = false;
		}else{
			leftPopulated = objectArray[i][j-1].isPopulated();
		}

		if(j+1 > MAX){
			rightPopulated = false;
		}else{
			rightPopulated = objectArray[i][j+1].isPopulated();
		}

		if(topPopulated || bottomPopulated || leftPopulated || rightPopulated){
			return true;
		}else{
			return false;
		}

	}

	function getWords(){
		
		var words = [];
		var k = 0;
		var playScore = 0;
		//Get the left to right words
		//Loop through the row array where a row has changed

		for(var i=0; i<15; i++){
			
			if(rowArray[i].isChanged()){
				var valid = false;
				var doubleWord = false;
				var tripleWord = false;
				var wordScore = 0;
				var tempWord = new String("");
				
				for(var j = rowArray[i].getMin(); j <= rowArray[i].getMax(); j++){
					
					var currentLetter = objectArray[i][j].getLetter();
					
					if(objectArray[i][j].getType == "DW"){
						doubleWord = true;
					}else if(objectArray[i][j].getType == "TW"){
						tripleWord = true;
					}

					if(colArray[j].isChanged()){
						valid = true;
					}
					
					if(currentLetter == null){	
						
						if(tempWord.length > 1){
							
							if(valid){
								words[k++] = tempWord;
								
								if(doubleWord){
									wordScore = wordScore * 2;
								}
								
								if(tripleWord){
									wordScore = wordScore * 3;
								}
								
								playScore = playScore + wordScore;
							}
							
						}
						
						wordScore = 0;
						
						valid = false;
						tripleWord = false;
						doubleWord = false;
						
						tempWord = "";
						continue;
					}
					
					//Multiply the score of the letter with the score of the cell (Double/Triple Letter)
					wordScore = wordScore + (Rack[letterIndex[currentLetter]].getScore() * objectArray[i][j].getScore());
				
					tempWord = tempWord + objectArray[i][j].getLetter();
				}

				if(tempWord.length > 1){
					
					if(valid){
						
						if(doubleWord){
							wordScore = wordScore * 2;
						}
						
						if(tripleWord){
							wordScore = wordScore * 3;
						}
						
						playScore = playScore + wordScore;
						wordScore = 0;
						
						words[k++] = tempWord;
						
					}
				}
			}
		}

		//Get the top to bottom words
		//Loop through the col array where a col has changed

		for(var i=0; i<15; i++){

			if(colArray[i].isChanged()){
				var valid = false;
				var doubleWord = false;
				var tripleWord = false;
				var wordScore = 0;
				var tempWord = new String("");
				for(var j = colArray[i].getMin(); j <= colArray[i].getMax(); j++){
					
					var currentLetter = objectArray[j][i].getLetter();
					
					if(objectArray[j][i].getType == "DW"){
						doubleWord = true;
					}else if(objectArray[j][i].getType == "TW"){
						tripleWord = true;
					}
					
					if(rowArray[j].isChanged()){
						valid = true;
					}
					
					if(objectArray[j][i].getLetter() == null){
						
						if(tempWord.length > 1){
							
							if(valid){
								words[k++] = tempWord;
								
								if(doubleWord){
									wordScore = wordScore * 2;
								}
								
								if(tripleWord){
									wordScore = wordScore * 3;
									
								}
								
								playScore = playScore + wordScore;
							}
						}
						
						wordScore = 0;
						
						valid = false;
						tripleWord = false;
						doubleWord = false;
						
						tempWord = "";
						continue;
					}
					
					//Multiply the score of the letter with the score of the cell (Double/Triple Letter)
					wordScore = wordScore + (Rack[letterIndex[currentLetter]].getScore() * objectArray[j][i].getScore());
					tempWord = tempWord + objectArray[j][i].getLetter();
				}

				if(tempWord.length > 1){
					
					if(valid){
						
						if(doubleWord){
							wordScore = wordScore * 2;
						}
						
						if(tripleWord){
							wordScore = wordScore * 3;
						}
						
						playScore = playScore + wordScore;
						wordScore = 0;
						
						words[k++] = tempWord;
					}
				}
			}
		}
		
		totalScore = totalScore + playScore;
		
		alert("playScore : " + playScore);
		alert("totalScore : " + totalScore);

		return words;
	}

	function loadRack(){

		var RackArray = [];

		RackArray[0] = new RackLetter();
		RackArray[0].setLetter("A");
		RackArray[0].setCount(9);
		RackArray[0].setScore(1);
		
		RackArray[1] = new RackLetter();
		RackArray[1].setLetter("B");
		RackArray[1].setCount(2);
		RackArray[1].setScore(3);
		
		RackArray[2] = new RackLetter();
		RackArray[2].setLetter("C");
		RackArray[2].setCount(2);
		RackArray[2].setScore(3);
		
		RackArray[3] = new RackLetter();
		RackArray[3].setLetter("D");
		RackArray[3].setCount(4);
		RackArray[3].setScore(2);
		
		RackArray[4] = new RackLetter();
		RackArray[4].setLetter("E");
		RackArray[4].setCount(12);
		RackArray[4].setScore(1);
		
		RackArray[5] = new RackLetter();
		RackArray[5].setLetter("F");
		RackArray[5].setCount(2);
		RackArray[5].setScore(4);
		
		RackArray[6] = new RackLetter();
		RackArray[6].setLetter("G");
		RackArray[6].setCount(3);
		RackArray[6].setScore(2);
		
		RackArray[7] = new RackLetter();
		RackArray[7].setLetter("H");
		RackArray[7].setCount(2);
		RackArray[7].setScore(4);
		
		RackArray[8] = new RackLetter();
		RackArray[8].setLetter("I");
		RackArray[8].setCount(9);
		RackArray[8].setScore(1);
		
		RackArray[9] = new RackLetter();
		RackArray[9].setLetter("J");
		RackArray[9].setCount(1);
		RackArray[9].setScore(8);
		
		RackArray[10] = new RackLetter();
		RackArray[10].setLetter("K");
		RackArray[10].setCount(1);
		RackArray[10].setScore(5);
		
		RackArray[11] = new RackLetter();
		RackArray[11].setLetter("L");
		RackArray[11].setCount(4);
		RackArray[11].setScore(1);
		
		RackArray[12] = new RackLetter();
		RackArray[12].setLetter("M");
		RackArray[12].setCount(2);
		RackArray[12].setScore(3);
		
		RackArray[13] = new RackLetter();
		RackArray[13].setLetter("N");
		RackArray[13].setCount(6);
		RackArray[13].setScore(1);
		
		RackArray[14] = new RackLetter();
		RackArray[14].setLetter("O");
		RackArray[14].setCount(8);
		RackArray[14].setScore(1);
		
		RackArray[15] = new RackLetter();
		RackArray[15].setLetter("P");
		RackArray[15].setCount(2);
		RackArray[15].setScore(3);
		
		RackArray[16] = new RackLetter();
		RackArray[16].setLetter("Q");
		RackArray[16].setCount(1);
		RackArray[16].setScore(10);
		
		RackArray[17] = new RackLetter();
		RackArray[17].setLetter("R");
		RackArray[17].setCount(6);
		RackArray[17].setScore(1);
		
		RackArray[18] = new RackLetter();
		RackArray[18].setLetter("S");
		RackArray[18].setCount(6);
		RackArray[18].setScore(1);
		
		RackArray[19] = new RackLetter();
		RackArray[19].setLetter("T");
		RackArray[19].setCount(6);
		RackArray[19].setScore(1);
		
		RackArray[20] = new RackLetter();
		RackArray[20].setLetter("U");
		RackArray[20].setCount(4);
		RackArray[20].setScore(1);
		
		RackArray[21] = new RackLetter();
		RackArray[21].setLetter("V");
		RackArray[21].setCount(2);
		RackArray[21].setScore(4);
		
		RackArray[22] = new RackLetter();
		RackArray[22].setLetter("W");
		RackArray[22].setCount(2);
		RackArray[22].setScore(4);
		
		RackArray[23] = new RackLetter();
		RackArray[23].setLetter("X");
		RackArray[23].setCount(1);
		RackArray[23].setScore(8);
		
		RackArray[24] = new RackLetter();
		RackArray[24].setLetter("Y");
		RackArray[24].setCount(2);
		RackArray[24].setScore(4);
		
		RackArray[25] = new RackLetter();
		RackArray[25].setLetter("Z");
		RackArray[25].setCount(1);
		RackArray[25].setScore(10);

		return RackArray;
	}

}


