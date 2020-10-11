// @TODO: YOUR CODE HERE!
//set dimensions and margins of scatterplot
var svgWidth = 1000;
var svgHeight = 600;
//creating margins
var margin = {top:20, right:600, bottom:50, left:60};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// append div classed chart to scatter element
var chart = d3.select("#scatter").append("div").classed("chart",true);

//creating svg wrapper
var svg = chart
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

var chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// parameters for scatterplot
var chosenX = "poverty";
var chosenY = "smokes";
//function to update x scale var on axis label 

//importing data from data.csv
d3.csv("./assets/data/data.csv",function(myData){

    myData.forEach(function(data) {
        //converting to numeric values
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
    });
    //checking console for data
    console.log(myData);
//setting min/max variables for x/y axis

    var xMin;
    var xMax;
    var yMax;

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    xMax = d3.max(myData, function(data){
        return Number(data["poverty"]) * 1;
    });
    xMin = d3.min(myData, function(data){
        return Number(data["poverty"])* 0.9;
    });
    yMax = d3.max(myData, function(data){
        return Number(data.smokes)*1;
});

    var xLabel = "poverty";
    var yLabel = "smokes";

    xlinearScale.domain([xMin, xMax]);
    yLinearScale.domain([0,yMax]);

    chart.selectAll("circle")
         .data(myData)
         .enter()
         .append("circle")
         .attr("cx", function(data, index){
             return xLinearScale(Number(data[xLabel]));
         })
         .attr("cy", function(data, index){
             return yLinearScale(Number(data.smokes));
         })
         .attr("r", "12")
         .attr("fill","blue")
    chart.selectAll("text")
         .data(myData)
         .enter()
         .appned("text")
         .attr("text-anchor","middle")
         .attr("class", "stateText")
         .style("font", "12px sans-serif")
         .text(function(data){
             return data.abbr;
         })
    chart.append("g")
})


