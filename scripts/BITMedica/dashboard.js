$("#chart-med").on("click", function(e) {
    e.preventDefault();
    $(".agenda-dash").hide();
    $(".bitacora-dash").hide();
    $(".graph-med").show();
    $(".page-title").text("GRAFICAS");
    HideModalsF("bitacora");
    ChangeClassActive($("#chart-med"), "graph");
});