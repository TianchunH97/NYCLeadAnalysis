var data1 = [
  [1, 20, 1], [2, 40, 1], [3, 60, 1],
  [4, 80, 2], [5, 100, 2], [6, 120, 2],
  [7, 140, 3], [8, 160, 3], [9, 200, 3]
]

var data2 = [
  [18, 16, 1], [16, 32, 1], [14, 48, 1],
  [12, 64, 2], [10, 80, 2], [8, 96, 2],
  [6, 112, 3], [4, 128, 3], [2, 144, 3]
]

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

d3.csv("https://raw.githubusercontent.com/TianchunH97/NYCLeadAnalysis/main/join_2016.csv", function(data) { 

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
      .html("data: (" + d[2] + ", " + d[3] + "), borough: " + d[1])
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
  .domain([1, 2, 3])
  .range([ "#F8766D", "#00BA38", "#619CFF"])

  var borough_map = d3.scaleOrdinal()
    .domain([1, 2, 3, 4, 5])
    .range(["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"])

  // Add dots
  svg.append('g')
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) {return xScale(d[3]);})
      .attr("cy", function(d) {return yScale(d[2]);})
      .attr("r", 5)
      .style("fill", function(d) {return color(d[0]);})
    .on("mouseover", mouseover )
    .on("mousemove", mousemove )
    .on("mouseleave", mouseleave )

  // Interactive components
  d3.selectAll("p")
    .on("click", function () {

    var paraID = d3.select(this).attr("id");

    if (paraID == "change_data") {
      svg.selectAll("circle")
        .data(data2)
        .transition()
        .duration(2000)
          .attr("cx", function(d) {return xScale(d[0]);})
          .attr("cy", function(d) {return yScale(d[1]);})
          .attr("r", 5)
          .style("fill", function(d) {return color(d[2]);})
    } else {
      svg.selectAll("circle")
        .data(data)
        .transition()
        .duration(2000)
          .attr("cx", function(d) {return xScale(d[3]);})
          .attr("cy", function(d) {return yScale(d[2]);})
          .attr("r", 5)
          .style("fill", function(d) {return color(d[0]);})
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