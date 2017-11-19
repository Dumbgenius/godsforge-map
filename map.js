canvas = document.getElementById("mapCanvas");
cellDetailsContainer = document.getElementById("thingsInCell");
map = []

numHorizCells = 20
numVertCells = 20
cellWidth = canvas.width/numHorizCells;
cellHeight = canvas.height/numVertCells;

voidColour = "#000000";
creatureColour = "#FF0000";

function loadMap(stuff) {
	var newMap=[];	
	
	for (var i=0; i<numHorizCells; i++) {
		var row=[];
		for (var j=0; j<numVertCells; j++) {
			var tmp = {
				void: true,
				colour: voidColour,
				fortifications: [],
				equipment: [],
				artifacts: [],
				paragons: [],
				creatures: [],
			} //base empty cell

			for (var k=0; k<stuff.length; k++) { //populate the cell
				if (stuff[k].x == i && stuff[k].y == j) {
					if (stuff[k].type=="land") {
						tmp.void = false
						tmp.colour = stuff[k].colour
					}
					if (stuff[k].type=="fortification") {
						tmp.fortifications.push(stuff[k])
					}
					if (stuff[k].type=="equipment") {
						tmp.equipment.push(stuff[k])
					}
					if (stuff[k].type=="artifact") {
						tmp.artifacts.push(stuff[k])
					}
					if (stuff[k].type=="race" || stuff[k].type=="legend") {
						tmp.creatures.push(stuff[k])
					}
				}
			}

			row.push(tmp);
		}
		newMap.push(row);
	}
	
	map = newMap;
}

function drawMap() {
	var ctx=canvas.getContext("2d");
	
	for (var x=0; x<numHorizCells; x++) {
		for (var y=0; y<numVertCells; y++) {
			ctx.fillStyle = map[x][y].colour
			ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellHeight);

			if (map[x][y].creatures) {
				ctx.beginPath();
				ctx.arc( (x+0.5) * cellWidth, (y+0.5) * cellWidth, cellWidth*0.4, 0, 2*Math.PI );

				ctx.fillStyle = creatureColour;
				ctx.strokeStyle = voidColour;
				ctx.stroke();
				ctx.fill();

				ctx.closePath()
			}
		}
	}
}




loadMap([])

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		loadMap(JSON.parse(this.responseText))
	}
};
xhttp.open("GET", dest, true);
xhttp.send();