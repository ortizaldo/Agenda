$("#chart-med").on("click", function(e) {
    e.preventDefault();
    $(".agenda-dash").hide();
    $(".bitacora-dash").hide();
    $(".graph-med").show();
    $(".page-title").text("GRAFICAS");
    HideModalsF("bitacora");
    ChangeClassActive($("#chart-med"), "graph");
    var start = moment(new Date()).subtract(1, 'months').format("YYYY-MM-DD");
    var end = moment(new Date()).format("YYYY-MM-DD");
    GetDataGraph("dpto", start, end, "all");
});

function Createchart(dataset_, lbl) {
    var ctx = document.getElementById('stackchart');
    if( myChart != null){
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [lbl],
            datasets: dataset_
        },
        options: {
            scales: {
                xAxes: [{ stacked: true }],
                yAxes: [{ stacked: true }]
            }
        }
    });
}

function GetDataGraph(flag, start, end, filtr) {
    var url = "CallsWeb/Dashboard/CreateCharts.php", lbl = "";
    if(flag == "dpto"){
        lbl = "Departamento";
    }else if(flag == "cdolor"){
        lbl = "Dolor";
    }
    Pace.restart();
    Pace.track(function () {
        $.ajax({
            method: "GET",
            url: url,
            data: {
                start_date: start,
                end_date: end,
                filtr: filtr,
                flag: flag
            },
            dataType: "JSON",
            success: function (data) {
                var arr = [];
                _.each(data.response, function(rows) {
                    arr.push({
                        label: rows.Area,
                        data: [rows.NVeces],
                        backgroundColor: getRandomColor() // red
                    });
                });
                Createchart(arr, lbl);
            }
        });
    });
}

function getRandomColor() {
    var color = randomColor({
        hue: 'blue',
    });
    return color;
}