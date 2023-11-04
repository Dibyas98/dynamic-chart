let key = "76de1437173b4011a84eeecb351b0983";
let country = "india";
let city = "delhi";
const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city},${country},NC&key=${key}`;
let chartdata=[]
let count=0;

async function apiCall() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    result.data.forEach(element => {
      chartdata.push(element.wind_spd)
    });
    console.log(chartdata);
  } 
  
  
  
  
  catch (error) {
    console.error(error);
  }
}
apiCall();

const ctx = document.getElementById("realTimeChart").getContext("2d");
let chart;

// Initial data
const initialData = {
  labels: [],
  datasets: [
    {
      label: "Wind-Speed",
      data: [],
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
      fill: false,
    },
  ],
};

// Chart configuration
const chartConfig = {
  type: "line",
  data: initialData,
  options: {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    animation: false,
  },
};

// Initialize the chart
chart = new Chart(ctx, chartConfig);
function addData(newData) {
  chart.data.labels.push(chart.data.labels.length);
  chart.data.datasets[0].data.push(newData);
  chart.update(); // Update the chart
  count++
}
setInterval(() => {
  for(let i=0;i<chartdata.length;i++){
    addData(chartdata[i])
    console.log(chartdata[i]);
  }

}, 2000);
