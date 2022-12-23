function drawChart() {
    const ctx = document.getElementById('baseStatsChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Sp-Attack', 'Sp-Defense', 'Speed'],
            datasets: [{
                label: '# of Votes',
                data: [80, 82, 83, 100, 100, 80],
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
                // datalabels: {
                //     display: true,
                //     color: 'rgb(239, 239, 239)',
                // },
                tooltip: {
                    enabled: false
                }
            }
        }
    });
}