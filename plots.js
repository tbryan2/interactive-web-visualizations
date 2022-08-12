
// Grab the metadara array from the samples.js file
let metadata_array = samples.metadata

// Define the variables and function to populate the dropdown with the id's of the samples
var select = document.getElementById("selDataset");
let options = metadata_array.map(d => d.id);

for (var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}

// Grab the samples array from within the samples.js file
let samples_array = samples.samples

// Create an array of sample_values from the samples.js array
let samplesValues = samples_array.map(d => d.sample_values)

// Create an array of otu_ids from the samples.js array
let otuIds = samples_array.map(d => d.otu_ids)

// Create an array of otu_labels from the samples.js array
let otuLabels = samples_array.map(d => d.otu_labels)

// Initialize sample metadata
function demoinit() {
    var select = document.getElementById("selDataset");
    var selectedSample = select.value;
    var selectedSampleData = metadata_array.filter(d => d.id == selectedSample)[0];
    
    var demoPanel = d3.select("#sample-metadata");
    demoPanel.html("");
    Object.entries(selectedSampleData).forEach(([key, value]) => {
        demoPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    }
    );
}

// Initialize the gauge chart
function gaugeinit() {
    var graphDiv = document.getElementById('gauge')

    var data = [{
        type :  'indicator',
        mode : 'gauge+number',
        value : metadata_array[0].wfreq,
        title : { text : 'Belly Button Washing Frequency <br> Scrubs per Week' },
        gauge : {
            axis : { range : [null, 9] },
            bar : { color : 'blue' },
            steps : [
                { range: [0, 1], color: 'FF0000' },
                { range: [1, 2], color: 'FF3300'},
                { range: [2, 3], color: '#ff6600' },
                { range: [3, 4], color: 'FFCC00' },
                { range: [4, 5], color: 'FFFF00' },
                { range: [5, 6], color: 'ccff00' },
                { range: [6, 7], color: '66ff00' },
                { range: [7, 8], color: '33ff00' },
                { range: [8, 9], color: '00FF00' }
            ],
            threshold : {
                line : { color : 'black', width : 4 },
                thickness : 0.75,
                value : 8
            }
        }
    }];

    var layout = {
        width : 600,
        height : 500,
        margin : { t : 25, r : 25, l : 25, b : 25 },
        paper_bgcolor : '#f9f9f9',
        font : { color : '#2f2f2f', family : 'Arial' }
    };

    Plotly.newPlot(graphDiv, data, layout);

}

// // Initialize the bar chart
function barinit() {
    
    var graphDiv = document.getElementById('bar')

    var data = [{
        x: samplesValues[1].slice(0, 10).reverse(),
        y: otuIds[1].slice(0, 10).reverse().map(d => `OTU ${d}`),
        type: 'bar',
        orientation: 'h',
    }];

    var layout = {
        height: 500,
        width: 400
    };

    Plotly.newPlot(graphDiv, data, layout);
}

// Initialize the bubble chart
function bubbleinit() {

    var graphDiv = document.getElementById('bubble')

    var trace = [{
        x: otuIds[0],
        y: samplesValues[0],
        text: otuLabels[0],
        mode: 'markers',
        marker: {
            size: samplesValues[0],
            color: otuIds[0],
            colorscale: 'Jet'
        }
    }];
    
    //var data = [trace];

    var layout = {
        title: 'Bubble Chart',
        showlegend: false,
        height: 600,
        width: 1000
    };

    Plotly.newPlot(graphDiv, trace, layout);

}

// Get new data for the sample metadata when the dropdown menu is changed
function demogetData() {
    var select = document.getElementById("selDataset");
    var selectedSample = select.value;
    var selectedSampleData = metadata_array.filter(d => d.id == selectedSample)[0];

    var demoPanel = d3.select("#sample-metadata");
    demoPanel.html("");
    Object.entries(selectedSampleData).forEach(([key, value]) => {
        demoPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    }
    );
}

// Get new data for the gauge chart when the dropdown menu is changed
function gaugegetData() {
    var select = document.getElementById("selDataset");
    var selectedSample = select.value;
    var selectedSampleData = metadata_array.filter(d => d.id == selectedSample)[0];
    var value = selectedSampleData.wfreq;
    var data = [{
        type :  'indicator',
        mode : 'gauge+number',
        value : value,
        title : { text : 'Belly Button Washing Frequency <br> Scrubs per Week' },
        gauge : {
            axis : { range : [null, 9] },
            bar : { color : 'blue' },
            steps: [
                { range: [0, 1], color: 'FF0000' },
                { range: [1, 2], color: 'FF3300' },
                { range: [2, 3], color: '#ff6600' },
                { range: [3, 4], color: 'FFCC00' },
                { range: [4, 5], color: 'FFFF00' },
                { range: [5, 6], color: 'ccff00' },
                { range: [6, 7], color: '66ff00' },
                { range: [7, 8], color: '33ff00' },
                { range: [8, 9], color: '00FF00' }
            ],
            threshold: {
                line: { color: 'black', width: 4 },
                thickness: 0.75,
                value: 8
            }

        }
    }];
    var layout = {
        width: 600,
        height: 500,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: '#f9f9f9',
        font: { color: '#2f2f2f', family: 'Arial' }
    };


    var graphDiv = document.getElementById('gauge');
    Plotly.newPlot(graphDiv, data, layout);
}


// Get new data for bar chart when the dropdown menu is changed
 function bargetData() {
    // Select the dropdown menu HTML element
    let dropdownMenu = d3.select("#selDataset")

    // Get the value of the dropdown menu
    let dropdownValue = dropdownMenu.property("value")

    // Filter the data to whatever is selected in the dropdown menu
    let filteredData = samples_array.filter(d => d.id == dropdownValue)

    // Get the top 10 values from the filtered data
    let filteredDataValues = filteredData[0].sample_values.slice(0, 10).reverse()

    // Get the top 10 otu_ids from the filtered data
    let filteredDataOtuIds = filteredData[0].otu_ids.slice(0, 10).reverse().map(d => `OTU ${d}`)

    // Get the top 10 otu_labels from the filtered data
    let filteredDataOtuLabels = filteredData[0].otu_labels.slice(0, 10).reverse()

    // Initialize the bar chart
    let data = [{
        x: filteredDataValues,
        y: filteredDataOtuIds,
        text: filteredDataOtuLabels,
        type: 'bar',
        orientation: 'h',
    }];

    // Restyle the bar chart
    Plotly.restyle("bar", "x", [data[0].x]);

    Plotly.restyle("bar", "y", [data[0].y]);

    Plotly.restyle("bar", "text", [data[0].text]);

    Plotly.restyle("bar", "type", [data[0].type]);

    Plotly.restyle("bar", "orientation", [data[0].orientation]);

}

// Get new data for bubble chart when dropdown menu is changed
function bubblegetData() {
    // Select the dropdown menu HTML element
    let dropdownMenu = d3.select("#selDataset")

    // Get the value of the dropdown menu
    let dropdownValue = dropdownMenu.property("value")

    // Filter the data to whatever is selected in the dropdown menu
    let filteredData = samples_array.filter(d => d.id == dropdownValue)

    // Get the top 10 values from the filtered data
    let filteredDataValues = filteredData[0].sample_values.slice(0, 10).reverse()
    
    // Get the top 10 otu_ids from the filtered data
    let filteredDataOtuIds = filteredData[0].otu_ids.slice(0, 10).reverse()

    // Get the top 10 otu_labels from the filtered data
    let filteredDataOtuLabels = filteredData[0].otu_labels.slice(0, 10).reverse()

    // Initialize the bubble chart

    var trace = [{
        x: filteredDataOtuIds,
        y: filteredDataValues,
        text: filteredDataOtuLabels,
        mode: 'markers',
        marker: {
            size: filteredDataValues,
            color: filteredDataOtuIds,
            colorscale: 'Jet'
        }
    }];

    var layout = {
        title: 'Bubble Chart',
        showlegend: false,
        height: 600,
        width: 1000
    };

    Plotly.newPlot("bubble", trace, layout);
}

// Initialize the charts and info box
barinit();
bubbleinit();
demoinit();
gaugeinit();

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", function (d) {
    bargetData(d);
    bubblegetData(d);
    demogetData(d);
    gaugegetData(d);
});
