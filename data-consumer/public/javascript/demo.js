
(function ($, AdminLTE) {

    "use strict";
    var map = "";
    var iconColor = {
        red : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        white: 'http://maps.google.com/mapfiles/ms/icons/white-dot.png',
        blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        yellow: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    }

    setup();

    function getdata(){

        $.ajax({
            url: 'http://10.189.156.52:4000/map',
            dataType: 'json',
            headers: { 'Access-Control-Allow-Origin': '*' },
            success: function( data ){
                setMarker(map, data);
            },
            error: function(xhr, status, error){
                console.log(xhr.responseText);
            }
        });
    }

    function initMap() {
        var data;
        var myLatLng = {lat: 20, lng: -160};
        var mapOpt = {
            zoom: 2,
            center: myLatLng
        }
        // Create a map object and specify the DOM element for display.
        map = new google.maps.Map(document.getElementById('areaMap'), mapOpt);
        getdata();
        //if(data){
        //    setMarker(map, data);
        //} else{
        //    var marker = new google.maps.Marker({
        //        position: myLatLng,
        //        map: map,
        //        title: 'Name: '
        //    });
        //    marker.setIcon(iconColor.green);
        //    marker.addListener('click', function(){
        //        // TODO: generate data clicked region.
        //        map.setZoom(8);
        //        map.setCenter(marker.getPosition());
        //    })
        //    marker.setMap(map);
        //}
    }
    function setMarker(map, data){
        var marker = "";
        var lat = "", lon = "", city = "";
        for(var i = 0; i < data.length; i++) {
            city = data[i]._id.city;
            lat = data[i]._id.lat;
            lon = data[i]._id.long;

            marker = new google.maps.Marker({
                map: map,
                position: {lat:lat, lng:lon},
                title: 'Name: ' + city
            });

            //create_revenue(map, lat, lon, data[i].$revenue);
            marker.setIcon(iconColor.green);
            marker.addListener('click', function(){
                // TODO: generate data clicked region.
                map.setZoom(8);
                map.setCenter(marker.getPosition());
            });
            marker.setMap(map);
        }
    }

    // Get context with jQuery - using jQuery's .get() method.
    var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var areaChart = new Chart(areaChartCanvas);

    var areaChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Electronics",
                fillColor: "rgba(210, 214, 222, 1)",
                strokeColor: "rgba(210, 214, 222, 1)",
                pointColor: "rgba(210, 214, 222, 1)",
                pointStrokeColor: "#c1c7d1",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "Digital Goods",
                fillColor: "rgba(60,141,188,0.9)",
                strokeColor: "rgba(60,141,188,0.8)",
                pointColor: "#3b8bba",
                pointStrokeColor: "rgba(60,141,188,1)",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(60,141,188,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    }

    var areaChartOptions = {
        //Boolean - If we should show the scale at all
        showScale: true,
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: false,
        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",
        //Number - Width of the grid lines
        scaleGridLineWidth: 1,
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
        //Boolean - Whether the line is curved between points
        bezierCurve: true,
        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.3,
        //Boolean - Whether to show a dot for each point
        pointDot: false,
        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,
        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,
        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,
        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,
        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,
        //Boolean - Whether to fill the dataset with a color
        datasetFill: true,
        //String - A legend template
        //legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
        maintainAspectRatio: true,
        //Boolean - whether to make the chart responsive to window resizing
        responsive: true
    };

    //Create the line chart
    areaChart.Line(areaChartData, areaChartOptions);

    function setup() {
      google.maps.event.addDomListener(window, 'load', initMap);
    }
})(jQuery, $.AdminLTE);
