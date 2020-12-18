
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/TianchunH97/NYCLeadAnalysis/main/scatter_data.csv", function(data) { 

  // Add X axis
  var xScale = d3.scaleLinear()
    .domain([0, 0.5])
    .range([ 0, width]);

  var xAxis = d3.axisBottom().scale(xScale);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add Y axis
  var yScale = d3.scaleLinear()
    .domain([0, 60])
    .range([ height, 0]);

  svg.append("g")
    .call(d3.axisLeft(yScale));

  // Add X axis label
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("children lead level");

  // Add Y axis label
  svg.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left+20)
  .attr("x", -margin.top)
  .text("water lead level")

  // Add tooltip
  var tooltip = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")
  .style("position", "absolute")

  var mouseover = function(d) {
    tooltip
      .style("opacity", 1);
  }

  var mousemove = function(event, d) {
    tooltip
      .html("data: (" + d. + ", " + d[3] + "), borough: " + d[1])
      .style("left", (d3.pointer(event)[0]+60) + "px")
      .style("top", (d3.pointer(event)[1]+150) + "px");
  }

  var mouseleave = function(d) {
    tooltip
      .transition()
      .duration(1)
      .style("opacity", 0);
  }

  // Color scale
  var color = d3.scaleOrdinal()
  .domain([1, 2, 3, 4, 5])
  .range([ "#F8766D", "#00BA38", "#619CFF", "9A9A9A", "DDD378"])

  var borough_map = d3.scaleOrdinal()
    .domain([1, 2, 3, 4, 5])
    .range(["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"])

  // Add dots
  svg.append('g')
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) {return xScale(d.rate_16);})
      .attr("cy", function(d) {return yScale(d.crate_16);})
      .attr("r", 5)
      .style("fill", function(d) {return color(d.borough_id);})
    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )

  // Interactive components
  d3.selectAll("p")
    .on("click", function () {

    var paraID = d3.select(this).attr("id");

    if (paraID == "d2015") {
      svg.selectAll("circle")
        .data(data)
        .transition()
        .duration(2000)
          .attr("cx", function(d) {return xScale(d.rate_15);})
          .attr("cy", function(d) {return yScale(d.crate_15);})
          .attr("r", 5)
          .style("fill", function(d) {return color(d.borough_id);})
    } else if (paraID == "d2014") {
      svg.selectAll("circle")
        .data(data)
        .transition()
        .duration(2000)
          .attr("cx", function(d) {return xScale(d.rate_14);})
          .attr("cy", function(d) {return yScale(d.crate_14;})
          .attr("r", 5)
          .style("fill", function(d) {return color(d.borough_id);})
    } else {
      svg.selectAll("circle")
        .data(data)
        .transition()
        .duration(2000)
          .attr("cx", function(d) {return xScale(d.rate_16);})
          .attr("cy", function(d) {return yScale(d.crate_16;})
          .attr("r", 5)
          .style("fill", function(d) {return color(d.borough_id);})
    }
  });

  // Add legends
  var size = 20
  svg.selectAll("mydots")
    .data([1,2,3])
    .enter()
    .append("rect")
      .attr("x", 360)
      .attr("y", function(d,i){ return 20 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d){ return color(d)})

  svg.selectAll("mylabels")
    .data([1,2,3])
    .enter()
    .append("text")
      .attr("x", 360 + size*1.2)
      .attr("y", function(d,i){ return 20 + i*(size+5) + (size/2)}) 
      .style("fill", function(d){ return color(d)})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")

});