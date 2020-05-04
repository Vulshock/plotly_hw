function plotMeta(sample_selected){
    d3.json("../../samples.json").then((data) => {
        var pannel=d3.select('#sample-metadata');
        pannel.html('')
        var metadata=data.metadata;
        var filtered_meta=metadata.filter(sample=>sample.id==sample_selected)[0];
        Object.entries(filtered_meta).forEach(([key,value]) => {
            pannel.append("p").text(`${key}: ${value}`);
        });
});

}
function plotData(sample_selected){
    d3.json("../../samples.json").then((data) => {
        console.log(data)
        var washFreq = data.metadata.map(d=>d.wfreq);
        console.log(`washing frequency ${washFreq}`);

        var samples = data.samples.filter(sample=>sample.id==sample_selected);
        console.log(samples);
        var result=samples[0];
        var otu_ids=result.otu_ids;
        var sample_values=result.sample_values;
        var otu_labels=result.otu_labels;

        // var sample_values = samples.sample_values.slice(0,10);

//        var sliceOtu = samples.otu_id.slice(0,10);

//        var otuTop = sliceOtu.map(d=> 'OTU' +d);

//        console.log(`OTU ID ${otuTop}`);

//        var label = samples.otu_labels.slice(0,10);

        var trace={
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(id=>`OTU ${id}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        };

        var data = [trace];
        var layout = {
            title: "Top 10 OTU",
            // yaxis:{
            //     tickmode:"linear",
            // },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // create the bar plot
        Plotly.newPlot("bar", data, layout);

        var trace_2 = {
            x: otu_ids,
            y: sample_values,
            mode:"markers" ,
            marker: {
                size: sample_values.map(item=>item/1.5),
                color: otu_ids,
                colorscale: 'Earth'
            },
            text: otu_labels,
        };

        var layout_2={
            title:"Top 10 OTU",
            height: 600,
            width: 1000,
        };

        var data2= [trace_2];


        Plotly.newPlot("bubble", data2,); 
    });
};


// d3.select('#selDataset').on('change', updatePlotly);
// function updatePlotly(){
//     var dropdown= d3.select('#selDataset');
//     var dataset= dropdown.property('value')
// }
// function init(){
//     var selector =d3.select('#selDataset');

function init(){
d3.json('../samples.json').then((sampleData)=>{
    
    sampleData.names.forEach(name=>{
        d3.select('#selDataset').append('option').text(name);
    });
  });
};

function optionChanged(newSample) {
        // Fetch New Data Each Time a New Sample is Selected
        plotData(newSample);
        plotMeta(newSample)
      };

init( );
