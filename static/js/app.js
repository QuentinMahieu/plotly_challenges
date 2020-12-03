// append the names as options for the dropdown
d3.json("data/samples.json").then((data) => {
    var names = data.metadata;
    names.forEach(element => {
        d3.select("#selDataset").append('option').text(element.id);
    });
});
// Display the default plot
function init() {
        d3.json("data/samples.json").then((dict) => {
        var tableData = dict.metadata.filter(x => x.id === parseInt("940"));
        d3.select("#sample-metadata").html("");
        d3.select("#sample-metadata").append('p').text(`AGE : ${tableData[0].age}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`BBTYPE : ${tableData[0].bbtype}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`ETHNICITY : ${tableData[0].ethnicity}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`GENDER : ${tableData[0].gender}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`LOCATION : ${tableData[0].location}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`WFREQ : ${tableData[0].wfreq}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`sample : ${tableData[0].id}`).attr("class","panel-text");
        var filteredData =  dict.samples.filter(x => x.id === "940");
    
        //define the values and ...
        var otu_ids = filteredData[0].otu_ids;
        var values = filteredData[0].sample_values;
        var labels = filteredData[0].otu_labels;
        // ... make a dictionnary
        var samples = []
        for(i=0;i<otu_ids.length;i++){
           samples.push({
               otu_ids : otu_ids[i],
               value : values[i],
               label : labels[i]
            });
        };
        //sort Descending and select the top 10
        var sorted_samples = samples.sort(
            (s1,s2) => s2.value - s1.value).slice(0,10); 
        //create the graph
        var data1 = [{
            x: sorted_samples.reverse().map(x => x.value),
            y: sorted_samples.reverse().map(x => `OTU ${x.otu_ids}`),
            type: 'bar',
            orientation: 'h',
            hovertext: sorted_samples.reverse().map(x => x.label)
        }];
        var layout1 = {
            title: `Subject ${940} top 10 OTU`,
        };
        Plotly.newPlot('bar-chart', data1,layout1);
        //create the bubble chart
        var data2 = [{
            x: otu_ids,
            y: values,
            type: "scatter",
            mode: 'markers',
            marker: {
              size: values,
              color: otu_ids
            }
          }];
          var layout2 = {
            title: 'OTU abundance per id',
            xaxis: {text: 'OTU'}
          };
        Plotly.newPlot('bubble', data2, layout2);
        //creates the gauge chart
        // Path to plot the needle
        var x = .24;
        var y = .78;
        var path = `M ${x} ${y} L 0.5 0.5`;
        
        // create the plot
        var data3 = [{
            values: [180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180/10,180/10,180],
            labels : ["0","1","2","3","4","5","6","7","8","9"," "],
            marker:{'colors': ['rgb(245,167,130)','rgb(246,179,131)','rgb(246,190,132)',
            'rgb(247,201,133)','rgb(247,212,134)','rgb(212,219,139)','rgb(177,226,144)',
            'rgb(107,239,154)','rgb(97,217,140)','rgb(88,197,127)','rgb(255, 255, 255)']},
            showlegend: false,
            hole: .5,
            type: "pie",
            direction: "clockwise",
            rotation: 90,
            textinfo: "label",
            textposition: "inside",
            hoverinfo: "none"
            }];
        var layout3 = { width: 600, height: 500, margin: { t: -1, b: 0 },
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
        Plotly.newPlot('gauge', data3, layout3);
    });
};

function optionChanged(val){
    d3.json("data/samples.json").then((dict) => {
        var tableData = dict.metadata.filter(x => x.id === parseInt(val));
        d3.select("#sample-metadata").html("");
        d3.select("#sample-metadata").append('p').text(`AGE : ${tableData[0].age}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`BBTYPE : ${tableData[0].bbtype}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`ETHNICITY : ${tableData[0].ethnicity}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`GENDER : ${tableData[0].gender}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`LOCATION : ${tableData[0].location}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`WFREQ : ${tableData[0].wfreq}`).attr("class","panel-text");
        d3.select("#sample-metadata").append('p').text(`sample : ${tableData[0].id}`).attr("class","panel-text");
        var filteredData = dict.samples.filter(x => x.id === val);
        //define the values and ...
        var otu_ids = filteredData[0].otu_ids;
        var values = filteredData[0].sample_values;
        var labels = filteredData[0].otu_labels;
        // ... make a dictionnary
        var samples = []
        for(i=0;i<otu_ids.length;i++){
           samples.push({
               otu_ids : otu_ids[i],
               value : values[i],
               label : labels[i]
            });
        };
        //sort Descending and select the top 10
        var sorted_samples = samples.sort(
            (s1,s2) => s2.value - s1.value).slice(0,10); 
        //create the barplot
        var data1 = [{
            x: sorted_samples.reverse().map(x => x.value),
            y: sorted_samples.reverse().map(x => `OTU ${x.otu_ids}`),
            type: 'bar',
            orientation: 'h',
            hovertext: sorted_samples.reverse().map(x => x.label)
            }];
        var layout1 = {
            title: `${val} top 10 OTU`
        };
        Plotly.newPlot('bar-chart', data1,layout1);
        //create the bubble chart
        var data2 = [{
            x: otu_ids,
            y: values,
            type: "scatter",
            mode: 'markers',
            marker: {
              size: values,
              color: otu_ids
            }
          }];
          var layout2 = {
            title:'OTU abundance per id',
            xaxis: {text: "OTU"}
          };
        Plotly.newPlot('bubble', data2, layout2);
        //creates the gauge
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
        var data3 = [{
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
            var layout3 = {width: 600, height: 500, margin: { t: -1, b: 0 },
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
        Plotly.newPlot('gauge', data3, layout3);
    });
};

init();