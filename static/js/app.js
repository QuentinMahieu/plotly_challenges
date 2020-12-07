// append the names as options for the dropdown
d3.json("data/samples.json").then((dict) => {
    var samples_m = dict.metadata;
    var samples_s = dict.samples;
    samples_m.forEach(x => {
        d3.select("#selDataset").append('option').attr('id',`${x.id}`).text(x.id)
    });
});
var CHART_TYPE = "bar"
var DATA_SET = "940"

// Display the default page
function init() {
    //tables
    demoTable(DATA_SET); 
    //create the graph
    barPiePlot(DATA_SET)
    //create the bubble chart
    bubble(DATA_SET);
    //creates the gauge chart
    gauge(DATA_SET);
};

//chart select
function chartChanged(chartType){
    CHART_TYPE = chartType
    barPiePlot(DATA_SET)
}

// Display page according to the subject
function optionChanged(subject){
    //set data set
    DATA_SET = subject
    init()
};
init();
/////// ///////////////// FUNCTIONS TO CREATE THE TABLE AND THE PLOTS ////////////////////////////////
//creates the demographic table
function demoTable(subject){
    d3.json("data/samples.json").then((dict) => {
        var tableData = dict.metadata.filter(x => x.id === parseInt(subject));
        d3.select("#sample-metadata").html("");
        d3.select("#sample-metadata").append('p').text(`AGE : ${tableData[0].age}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`BBTYPE : ${tableData[0].bbtype}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`ETHNICITY : ${tableData[0].ethnicity}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`GENDER : ${tableData[0].gender}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`LOCATION : ${tableData[0].location}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`WFREQ : ${tableData[0].wfreq}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`sample : ${tableData[0].id}`).attr("class","panel-text");
    });
}
//creates the bar and pie charts
function barPiePlot(subject){
    d3.json("data/samples.json").then((dict) => {
        var filteredData = dict.samples.filter(x => x.id === subject);
        var otu_ids = filteredData[0].otu_ids;
        var values = filteredData[0].sample_values;
        var labels = filteredData[0].otu_labels;
        var samples = []
        for(i=0;i<otu_ids.length;i++){
            samples.push({
                otu_ids : otu_ids[i],
                value : values[i],
                label : labels[i]});
        };
        //sort Descending and select the top 10
        var sorted_samples = samples.sort(
            (s1,s2) => s2.value - s1.value).slice(0,10);
        var dropdown = d3.select("#selPlot");
        if (CHART_TYPE === 'Piechart'){
            var data = [{
                values: sorted_samples.reverse().map(x => x.value),
                labels: sorted_samples.reverse().map(x => `OTU ${x.otu_ids}`),
                type: 'pie',
                hovertext: sorted_samples.reverse().map(x => x.label)
                }];
            var layout = {
                title: `${subject} top 10 OTU`
            }
        }else{
            var data = [{
                x: sorted_samples.reverse().map(x => x.value),
                y: sorted_samples.reverse().map(x => `OTU ${x.otu_ids}`),
                type: 'bar',
                orientation: 'h',
                hovertext: sorted_samples.reverse().map(x => x.label)
                }];
            var layout = {
                title: `${subject} top 10 OTU`
            };
        }
        Plotly.newPlot('plot', data,layout)
    });
}
function bubble(subject){
    d3.json("data/samples.json").then((dict) => {
        var filteredData = dict.samples.filter(x => x.id === subject);
        var otu_ids = filteredData[0].otu_ids;
        var values = filteredData[0].sample_values;
        var sizes = []
        values.forEach(function(x){if (x>100){sizes.push(x*0.60);}else if((x>60) && (x<=100)){sizes.push(x*0.70);}else if (
            (otu_ids.length <=2) && (x<5)){sizes.push(x*10)}else{sizes.push(x)}});
        var data = [{
        x: otu_ids,
        y: values,
        type: "scatter",
        mode: 'markers',
        marker: {
            size: sizes,
            color: otu_ids
        }
        }]; 
        var layout = {
        title:'OTU abundance per id',
        xaxis: {text: "OTU"}
        };
        Plotly.newPlot('bubble', data, layout);
    });
}
function gauge(subject){
    d3.json("data/samples.json").then((dict) => {
        var tableData = dict.metadata.filter(x => x.id === parseInt(subject));
    // Path to plot the needle
    switch (parseInt(tableData[0].wfreq)){
        case 1:
            var x = .18;
            var y = .68;
            break;
        case 2:
            var x = .24;
            var y = .78;
            break;
        case 3:
            var x = .34;
            var y = .84;
            break;
        case 4:
            var x = .44;
            var y = .86;
            break;
        case 5:
            var x = .55;
            var y = .86;
            break;
        case 6:
            var x = .65;
            var y = .84;
            break;
        case 7:
            var x = .75;
            var y = .78;
            break;
        case 8:
            var x = .82;
            var y = .68;
            break;
        case 9:
            var x = .84;
            var y = .56;
            break;
        default:
            var x = .15;
            var y = .56;
            break;
    };
    var path = `M ${x} ${y} L 0.5 0.5`;
    //creates the plot
    var data = [{
        values: [50,5,5,5,5,5,5,5,5,5,5,5],
        labels : [" ","0","1","2","3","4","5","6","7","8","9"],
        marker:{'colors': ['rgb(255, 255, 255)','rgb(245,167,130)','rgb(246,179,131)','rgb(246,190,132)',
        'rgb(247,201,133)','rgb(247,212,134)','rgb(212,219,139)','rgb(177,226,144)',
        'rgb(107,239,154)','rgb(97,217,140)','rgb(88,197,127)']},
        showlegend: false,
        hole: .5,
        type: "pie",
        direction: "clockwise",
        rotation: 90,
        textinfo: "label",
        textposition: "inside",
        hoverinfo: "none"
        }];
        var layout = {width: 600, height: 500, margin: { t: -1, b: 0 },
            title: { text: "Belly Button Washing Frequency", position: 'top center',font:{size:17}},
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
                }
            }],
        xaxis: {
            showticklabels: false,
            showgrid: false,
            zeroline: false,
            },
        yaxis: {
            showticklabels: false,
            showgrid: false,
            zeroline: false,
            },
        };
    Plotly.newPlot('gauge', data, layout);
    });
}
