let chartStats = [];
let myChart

// draw chart from chartjs.org version 3.9.1
// he drawChart function renders a bar chart to display the Pokémon's base stats using the Chart.js library.
// It checks if an existing chart (myChart) exists and destroys it to prevent reusing the canvas.
// Then, it creates a new horizontal bar chart using data from chartStats for the Pokémon's stats
// (HP, Attack, Defense, Sp-Attack, Sp-Defense, Speed). The chart has customized background colors
// for each stat, hides the legend, and disables tooltips. It also shows data labels on each bar.
function drawChart() {
    if (myChart) { myChart.destroy(); }
    const ctx = document.getElementById('baseStatsChart').getContext('2d');
    myChart = new Chart(ctx, {
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


// The getStats function collects the base stats of the current Pokémon and stores them in the chartStats array.
// It iterates through the stats array of the currentPokemon object, extracts each base_stat and
// pushes it into the chartStats array for further use, such as rendering charts or visualizations.
function getStats() {
    chartStats = [];
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        stat = currentPokemon['stats'][i]['base_stat'];
        chartStats.push(stat);
    }
}