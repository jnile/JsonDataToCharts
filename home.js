let data;
let context = arrayOfNumbers(1999,2022);
let currentNo = 0;
let chart;

function onOpen() {
    fetch("./resources/newFile.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        data = jsondata;
        createLineChart();
    });
    
}

function next() {
    currentNo += 1;
    if(currentNo == data.length) {
        currentNo = 0;
    }

    updateChart();
}

function previous() {
    currentNo -= 1;
    if(currentNo == -1) {
        currentNo = data.length - 1;
    }

    updateChart();
}


function createLineChart() {
    let ctx = document.getElementById("chart");
    
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: context,
            datasets: [{
                label: getNameOfCountry(),
                data: jsonDataToArray(),
                fill: false,
                borderColor: 'rgb(240,5,5)',
                tension: 0
            }]
        },
        options: {
            responsive: false
        }
    });
}

function updateChart() {
    //Remove every old data set
    console.log(chart.data.datasets);
    chart.data.datasets.pop()

    let temp = {
        label: getNameOfCountry(),
        data: jsonDataToArray(),
        fill: false,
        borderColor: 'rgb(240,5,5)',
        tension: 0
    };

    //Add new data set
    chart.data.datasets.push(temp);

    console.log(chart.data.datasets);
    chart.update();
}

function jsonDataToArray() {
    let current = data[currentNo];
    let arr = [];

    context.forEach(element => {
        arr.push(current[element]);
    });

    return arr;
}

function getNameOfCountry() {
    return data[currentNo]["Country"];
}

function arrayOfNumbers(start,end) {

    let arr = []
    for(let x = start; x < end + 1; x++) {
        arr.push(x);
    }

    return arr;
}