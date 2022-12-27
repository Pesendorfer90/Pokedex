chartStats = [];

// draw chart from chartjs.org version 3.9.1
function drawChart() {
    const ctx = document.getElementById('baseStatsChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Sp-Attack', 'Sp-Defense', 'Speed'],
            datasets: [{
                label: '',
                data: [chartStats[0], chartStats[1], chartStats[2], chartStats[3], chartStats[4], chartStats[5]],
                backgroundColor: [
                    'rgb(40, 167, 69)',
                    'rgb(220, 53, 69)',
                    'rgb(121, 182, 185)',
                    'rgb(220, 53, 69)',
                    'rgb(121, 182, 185)',
                    'rgb(255, 153, 51)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                xAxis: {
                    display: true
                },
                yAxis: {
                    grid: {
                        display: false,
                        borderWidth: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                datalabels: {
                    display: true,
                    color: 'rgb(239, 239, 239)',
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    });
}


// collect the statistic numbers for the chart and add them to the array charStats
function getStats() {
    chartStats = [];
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        stat = currentPokemon['stats'][i]['base_stat'];
        chartStats.push(stat);
    }
}