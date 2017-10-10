
// SVG drawing area

var margin = {top: 40, right: 40, bottom: 60, left: 60};

var width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Date parser
var formatDate = d3.timeFormat("%Y");
var parseDate = d3.timeParse("%Y");

// create scales
var x = d3.scaleTime()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

loadData();

// create axes
var xAxis = d3.axisBottom()
    .scale(x);
var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(8);

// x axis Label
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (height) + ")")
	.call(xAxis);

// y axis Label
svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(0,0)")
	.call(yAxis);

var lineGroup = svg.append("path")
    .attr("class", "line")
    .attr("stroke", "green");

// create tooltip
var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-8, 0])
    .html(function(d) {
        return d.EDITION + ", " + d.GOALS;
    });
svg.call(toolTip);


// form controls
d3.select("#data-attr")
    .on("change", function() {
        updateVisualization();
    });
d3.select("#filterMe")
    .on("change", function() {
        updateVisualization();
    });


// FIFA world cup
var data;


// Load CSV file
function loadData() {
    d3.csv("data/fifa-world-cup.csv", function(error, csv) {

        csv.forEach(function(d){
            // Convert string to 'date object'
            d.YEAR = parseDate(d.YEAR);

            // Convert numeric values to 'numbers'
            d.TEAMS = +d.TEAMS;
            d.MATCHES = +d.MATCHES;
            d.GOALS = +d.GOALS;
            d.AVERAGE_GOALS = +d.AVERAGE_GOALS;
            d.AVERAGE_ATTENDANCE = +d.AVERAGE_ATTENDANCE;
        });

        // Store csv data in global variable
        data = csv;

        // Initial data to show
        showEdition(data[0]);

        // Draw the visualization for the first time
        updateVisualization();
    });
}


// Render visualization
function updateVisualization() {

    console.log(data);

    var selectMe = d3.select("#data-attr").property("value");

    var inputMin = d3.select("#minDate").property("value");
    var inputMax = d3.select("#maxDate").property("value");

    if (inputMin && inputMin.value) {
        inputMin = d3.min(function(d) {
            return d.YEAR;
        });
    }

    if (inputMax && inputMax.value) {
        inputMax = d3.max(function(d) {
            return d.YEAR;
        });
    }


    var filtered = data;

    filtered = filtered.filter(function(d) {
        return d.YEAR >= inputMin && d.YEAR <= inputMax;
    });

    /*
    // update the domains
    x.domain([inputMin, inputMax]);
    y.domain([0, d3.max(filtered.map(function(d) {
        return d[selectMe];
    }))]);*/



    x.domain(d3.extent(data, function(d) {
        return d.YEAR;
    }));
    y.domain([0, d3.max(data, function(d) {
        return d.GOALS;
    })]);




    var circle = svg.selectAll("circle")
        .data(data);

    circle.enter()
        .append("circle")
        .attr("class", "tooltip-circle")
        .merge(circle)
        .on("click", function(d) {
            showEdition(d);
        })
        .on("mouseover", toolTip.show)
        .on("mouseout", toolTip.hide);


    circle.transition()
        .duration(1000)
        .attr("r", 6)
        .attr("cx", function(d) {
            return x(d.YEAR);
        })
        .attr("cy", function(d) {
            return y(d[selectMe]);
        });

    svg.call(toolTip);

    circle.exit().remove();


    // update the axes
    svg.select(".x-axis")
        .transition()
        .duration(1000)
        .call(xAxis);

    svg.select(".y-axis")
        .transition()
        .duration(1000)
        .call(yAxis);

    // define the line
    var valueLine = d3.line()
        .x(function(d) {
            return x(d.YEAR);
        })
        .y(function(d) {
            return y(d[selectMe]);
        })
        .curve(d3.curveLinear);

    lineGroup.attr("d", valueLine(data));

    lineGroup.transition()
        .duration(1000);


}


// Show details for a specific FIFA World Cup
function showEdition(d){
    $("#chart-title").html(d.EDITION);
    $("#winner").html(d.WINNER);
    $("#goals").html(d.GOALS);
    $("#avggoals").html(d.AVERAGE_GOALS);
    $("#matches").html(d.MATCHES);
    $("#teams").html(d.TEAMS);
    $("#avgatten").html(d.AVERAGE_ATTENDANCE);

}
