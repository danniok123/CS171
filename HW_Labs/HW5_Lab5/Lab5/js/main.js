
// The function is called every time when an order comes in or an order gets processed
// The current order queue is stored in the variable 'orders'

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 600)
    .attr("height", 200);


svg.append("g").attr("id", "circ-order");
svg.append("text")
    .attr("class", "label-order")
	.attr("text-anchor", "middle")
	.attr("y", 65)
	.attr("x", 40);

function updateVisualization(orders) {
    console.log(orders);

    var circle = svg.select("#circ-order")
		.selectAll("circle")
		.data(orders);

    var circlePadding = 5;

    circle.enter().append("circle")
		.attr("class", "circle")
		.attr("fill", function(d) {
			return d.product == "coffee" ? "#27ae60" : "#2980b9";
		})
		.attr("r", function(d) { return 20; })
		.attr("cx", function(d, i) {
			return (i * 2 + 7) * 20 + (i * circlePadding);
		})
		.attr("cy", 60);

    circle.exit().remove();

    svg.select(".label-order").text("Orders: " + orders.length);
}
