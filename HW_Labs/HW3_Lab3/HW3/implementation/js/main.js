d3.csv("../data/data7238/buildings.csv", function(data) {

	console.log(data);

	// sort buildings in descending order
	data.sort(function(a, b) {
		return b.height_m - a.height_m;
	});

	// draw svg bar chart
	var svg = d3.select("#bar-chart").append("svg")
		.attr("width", 600)
		.attr("height", 600);

	var barwidth = 47;
	var barshift = 240;

	svg.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("width", function(d) {
			return d.height_px;
		})
		.attr("height", 30)
		.attr('x', barshift)
    	.attr('y', function(d, i) {
    		return barwidth * i;
    	})
    	.attr("class", "data-rect")
    	.on("click", function(d) {
    		showBuilding(d);
    	});

    // add building names
    svg.selectAll("text.text-name")
    	.data(data)
    	.enter()
    	.append("text")
    	.attr('class', 'text-name')
    	.text(function(d) {
    		return d.building;
    	})
    	.attr("x", function(d) {
    		return barshift - 10;
    	})
    	.attr("y", function(d, i) {
    		return (barwidth) * i + 20;
    	})
    	.on("click", function(d) {
    		showBuilding(d);
    	});

    // add height labels
    svg.selectAll("text.text-height")
    	.data(data)
    	.enter()
    	.append("text")
    	.attr('class', 'text-height')
    	.text(function(d) {
    		return d.height_m;
    	})
    	.attr("x", function(d) {
    		return +d.height_px + barshift - 10;
    	})
    	.attr("y", function(d, i) {
    		return (barwidth) * i + 20;
    	});

    showBuilding(data[0])

});

function showBuilding(d) {
	$("#height_b").html(d.height_m + "m");
	$("#city_b").html(d.city)
	$("#country_b").html(d.country);
	$("#floors_b").html(d.floors);
	$("#complete_b").html(d.completed);

	var data = "";
    data += "<h3>" + d.building + "</h3>";

    document.getElementById("chart-img").innerHTML = "<img src=../data/data7238/img/" + d.image + " class='img-responsive'></img>";
    document.getElementById("chart-stats").innerHTML = data;

    // Extra Credit
    var building = d.building.replace(" ", "_")
    var url = "https://en.wikipedia.org/wiki/" + building;
    $('#wiki').attr("href", url);
}