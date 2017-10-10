
// SVG drawing area

var margin = {top: 40, right: 10, bottom: 60, left: 60};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Scales
var x = d3.scaleBand()
    .rangeRound([0, width])
	.paddingInner(0.1);

var y = d3.scaleLinear()
    .range([height, 0]);

// Axis
var xAxis = d3.axisBottom()
	.scale(x);

var yAxis = d3.axisLeft()
	.scale(y);

svg.append("g")
	.attr("class", "axis x-axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

svg.append("g")
	.attr("class", "axis y-axis");


d3.select("#ranking-type")
	.on("change", function() {
		updateVisualization();
	});

var selectMe = ""



// Initialize data
loadData();

// Create a 'data' property under the window object
// to store the coffee chain data
Object.defineProperty(window, 'data', {
	// data getter
	get: function() { return _data; },
	// data setter
	set: function(value) {
		_data = value;
		// update the visualization each time the data property is set by using the equal sign (e.g. data = [])
		updateVisualization()
	}
});

// Load CSV file
function loadData() {
	d3.csv("data/coffee-house-chains.csv", function(error, csv) {

		csv.forEach(function(d){
			d.revenue = +d.revenue;
			d.stores = +d.stores;
		});

		// Store csv data in global variable
		data = csv;

        // updateVisualization gets automatically called within the data = csv call;
		// basically(whenever the data is set to a value using = operator);
		// see the definition above: Object.defineProperty(window, 'data', { ...
	});
}

// Render visualization
function updateVisualization() {

  	//console.log(data);

    var selectMe = d3.select("#ranking-type").property("value");
  	data.sort(function(a, b) {
  		return b[selectMe] - a[selectMe];
  	});

  	// update the domains
	x.domain(data.map(function(d) {
		return d.company;
	}));

	y.domain([0, d3.max(data.map(function(d) {
		return d[selectMe];
	}))]);

	// update axis labels
	svg.select("g.x-axis")
		.transition()
		.duration(1000)
		.call(xAxis);

	svg.select("g.y-axis")
		.transition()
		.duration(1000)
		.call(yAxis);


	// creating the bars
  	var bars = svg.selectAll(".bar")
	  	.data(data);



  	bars.enter()
		.append("rect")
		.attr("class", "bar");

  	// transition the bars
  	bars.transition()
	  	.duration(1000)
	  	.attr("x", function(d) {
	  		return x(d.company);
	  	})
	  	.attr("y", function(d) {
	  		return y(d[selectMe]);
	  	})
		.attr("width", x.bandwidth())
		.attr("height", function(d) {
			return height - y(d[selectMe]);
		});

    bars.exit().remove();
}