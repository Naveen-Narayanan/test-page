/********************************************/
function Coordinates(X, Y) {
	this.X = X;
	this.Y = Y;
};

Coordinates.prototype.getX = function(){
	return this.X;
};

Coordinates.prototype.getY = function(){
	return this.Y;
};


/********************************************/

function BoardCell(i, j, score, cellType, center){

	this.coordinates = new Coordinates(j, i);
	this.score = score;
	this.cellType = cellType;
	this.populated = false;

	if(center){
		this.center = true;
	}else{
		this.center = false;
	}
};

BoardCell.prototype.getScore = function(){
	return this.score;
};

BoardCell.prototype.getType = function(){
	return this.cellType;
};

BoardCell.prototype.isCenter = function(){
	return this.center;
};

BoardCell.prototype.populate = function(){
	this.populated = true;
};

BoardCell.prototype.isPopulated = function(){
	return this.populated;
};

BoardCell.prototype.getCoordinates = function(){
	return this.coordinates;
};

BoardCell.prototype.setLetter = function(letter){
	this.letter = letter;
};

BoardCell.prototype.getLetter = function(letter){
	return this.letter;
};


/********************************************/

function DoubleWord(i, j){

	BoardCell.call(this, i, j, 2, "DW");
};

DoubleWord.prototype = Object.create(BoardCell.prototype);
DoubleWord.prototype.constructor = DoubleWord;

/********************************************/

function DoubleLetter(i, j){

	BoardCell.call(this, i, j, 2, "DL");
};

DoubleLetter.prototype = Object.create(BoardCell.prototype);
DoubleLetter.prototype.constructor = DoubleLetter;

/********************************************/

function TripleWord(i, j){

	BoardCell.call(this, i, j, 3, "TW");
};

TripleWord.prototype = Object.create(BoardCell.prototype);
TripleWord.prototype.constructor = TripleWord;

/********************************************/

function TripleLetter(i, j){

	BoardCell.call(this, i, j, 3, "TL");
};

TripleLetter.prototype = Object.create(BoardCell.prototype);
TripleLetter.prototype.constructor = TripleLetter;

/********************************************/

function NormalCell(i, j){

	BoardCell.call(this, i, j, 1, " ");
};

NormalCell.prototype = Object.create(BoardCell.prototype);
NormalCell.prototype.constructor = NormalCell;

/********************************************/

function CenterCell(i, j){

	BoardCell.call(this, i, j, 2, "*", true);
};

CenterCell.prototype = Object.create(BoardCell.prototype);
CenterCell.prototype.constructor = CenterCell;


/********************************************/

function Selection() {};

Selection.prototype.setGridSelection = function(cell){
	this.gridValue = cell;
}

Selection.prototype.setDrawSelection = function(draw){
	this.drawValue = draw;
}

Selection.prototype.getGridSelection = function(){
	return this.gridValue;
}

Selection.prototype.getDrawSelection = function(){
	return this.drawValue;
}

/********************************************/

function RackLetter() {};

RackLetter.prototype.setLetter = function (letter){
	this.letter = letter;
} 

RackLetter.prototype.setCount = function (count){
	this.count = count;
}

RackLetter.prototype.setScore = function (score){
	this.score = score;
}

RackLetter.prototype.getLetter = function () {
	return this.letter;
} 

RackLetter.prototype.getCount = function () {
	return this.count;
}

RackLetter.prototype.getScore = function () {
	return this.score;
}

RackLetter.prototype.reduceCountByOne = function () {
	this.count-- ;
}

RackLetter.prototype.increaseCountByOne = function () {
	this.count++ ;
}

RackLetter.prototype.setCoordinates = function(X){
	this.coordinates = new Coordinates(X, 0);
};

RackLetter.prototype.getCoordinates = function(){
	return this.coordinates;
};

/********************************************/

function MinMax(indexVal, min, max) {

	this.indexVal = indexVal;
	this.min = min;
	this.max = max;
	this.changed = 0;
};

MinMax.prototype.setMin = function(min){
	if(min < this.min){
		this.min = min;
	}
};

MinMax.prototype.setMax = function(max){
	if(max > this.max){
		this.max = max;
	}
};

MinMax.prototype.updateMinAndMax = function(index){
	if(index < this.min){
		this.min = index;
	}

	if(index > this.max){
		this.max = index;
	}
};

MinMax.prototype.getMin = function(){
	return this.min;
};

MinMax.prototype.getMax = function(){
	return this.max;
};

MinMax.prototype.setChanged = function(){
	this.changed = 1;
};

MinMax.prototype.resetChanged = function(){
	this.changed = 0;
};

MinMax.prototype.isChanged = function(){
	return this.changed;
};


/********************************************/

function iMinMax(i){

	indexVal = i;
	min = 14;
	max = 0;
	MinMax.call(this, indexVal, min, max);
};

iMinMax.prototype = Object.create(MinMax.prototype);
iMinMax.prototype.constructor = iMinMax;


/********************************************/

function jMinMax(j){

	indexVal = j;
	min = 14;
	max = 0;
	MinMax.call(this, indexVal, min, max);
};

jMinMax.prototype = Object.create(MinMax.prototype);
jMinMax.prototype.constructor = jMinMax;

/********************************************/

function rowMap(row){
	
	this.row = row;
	this.min = 14;
	this.max = 0;
	MinMax.call(this, row, min, max);
};

rowMap.prototype = Object.create(MinMax.prototype);
rowMap.prototype.constructor = rowMap;

/********************************************/

function colMap(col){
	
	this.col = col;
	this.min = 14;
	this.max = 0;
	MinMax.call(this, col, min, max);
};

colMap.prototype = Object.create(MinMax.prototype);
colMap.prototype.constructor = colMap;
