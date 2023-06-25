/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9946780202235231, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9894179894179894, 500, 1500, "get pokemon : ditto"], "isController": false}, {"data": [0.9947089947089947, 500, 1500, "get pokemon : eevee"], "isController": false}, {"data": [1.0, 500, 1500, "get pokemons by ability : flash-fire"], "isController": false}, {"data": [1.0, 500, 1500, "get pokemons by ability : limber"], "isController": false}, {"data": [1.0, 500, 1500, "get pokemons by ability : cute-charm"], "isController": false}, {"data": [0.9852941176470589, 500, 1500, "get pokemons by ability : skill-link"], "isController": false}, {"data": [0.9946808510638298, 500, 1500, "get pokemon : vulpix"], "isController": false}, {"data": [0.9946524064171123, 500, 1500, "get pokemons by ability : cursed-body"], "isController": false}, {"data": [1.0, 500, 1500, "get pokemons by ability : anticipation"], "isController": false}, {"data": [0.9946808510638298, 500, 1500, "get pokemon : gengar"], "isController": false}, {"data": [1.0, 500, 1500, "get pokemons by ability : adaptability"], "isController": false}, {"data": [0.9830508474576272, 500, 1500, "get pokemons by ability : run-away"], "isController": false}, {"data": [0.9876543209876543, 500, 1500, "get pokemons by ability : drought"], "isController": false}, {"data": [1.0, 500, 1500, "get pokemons by ability : imposter"], "isController": false}, {"data": [0.9946808510638298, 500, 1500, "get pokemon : minccino"], "isController": false}, {"data": [1.0, 500, 1500, "get pokemons by ability : technician"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1879, 0, 0.0, 78.78818520489666, 20, 2185, 52.0, 140.0, 184.0, 278.60000000000014, 62.693937472890454, 5719.522621867805, 8.433347548463514], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["get pokemon : ditto", 189, 0, 0.0, 70.85714285714288, 21, 2046, 42.0, 93.0, 138.0, 1604.0999999999972, 6.312203593614321, 149.18298423827733, 0.832175278455013], "isController": false}, {"data": ["get pokemon : eevee", 189, 0, 0.0, 93.7989417989418, 32, 2175, 68.0, 145.0, 185.5, 473.0999999999892, 6.306095892696273, 1215.0511770753394, 0.8313700639785125], "isController": false}, {"data": ["get pokemons by ability : flash-fire", 106, 0, 0.0, 46.566037735849044, 23, 211, 38.0, 71.6, 89.09999999999988, 210.71999999999997, 3.8514642831189594, 94.91682222403895, 0.5265673824576702], "isController": false}, {"data": ["get pokemons by ability : limber", 88, 0, 0.0, 50.13636363636364, 22, 208, 41.5, 80.20000000000002, 135.9999999999999, 208.0, 3.1680887064837817, 62.224543068455915, 0.42076178132987724], "isController": false}, {"data": ["get pokemons by ability : cute-charm", 60, 0, 0.0, 46.349999999999994, 25, 122, 41.0, 74.6, 98.85, 122.0, 2.2090497404366554, 46.17126089567763, 0.30201851920032396], "isController": false}, {"data": ["get pokemons by ability : skill-link", 68, 0, 0.0, 69.41176470588235, 22, 1593, 38.5, 83.0, 109.29999999999993, 1593.0, 2.5053422739665465, 49.28729862850932, 0.34252726401886374], "isController": false}, {"data": ["get pokemon : vulpix", 188, 0, 0.0, 115.0797872340426, 35, 2185, 91.5, 166.59999999999997, 226.09999999999997, 584.7799999999734, 6.28174284950548, 1368.8633971531676, 0.8342939721999465], "isController": false}, {"data": ["get pokemons by ability : cursed-body", 187, 0, 0.0, 54.117647058823515, 21, 1534, 38.0, 74.0, 108.6, 390.0000000000059, 6.774380524561658, 128.9557786009274, 0.9328004433234314], "isController": false}, {"data": ["get pokemons by ability : anticipation", 57, 0, 0.0, 47.54385964912281, 22, 255, 37.0, 65.60000000000001, 147.69999999999962, 255.0, 2.1033986493966563, 42.719483133602715, 0.291682234584302], "isController": false}, {"data": ["get pokemon : gengar", 188, 0, 0.0, 147.0265957446809, 42, 2184, 132.5, 231.69999999999996, 269.0, 539.2799999999727, 6.281532961341842, 1737.9714347392999, 0.8342660964282135], "isController": false}, {"data": ["get pokemons by ability : adaptability", 72, 0, 0.0, 49.56944444444443, 21, 199, 36.0, 92.50000000000001, 103.0, 199.0, 2.5993718184772012, 51.99617991624246, 0.36045976389039314], "isController": false}, {"data": ["get pokemons by ability : run-away", 59, 0, 0.0, 76.01694915254238, 20, 1650, 36.0, 112.0, 159.0, 1650.0, 2.1792125286252495, 46.97379606587501, 0.2936829384280121], "isController": false}, {"data": ["get pokemons by ability : drought", 81, 0, 0.0, 62.987654320987644, 22, 1520, 37.0, 85.0, 102.0, 1520.0, 2.970841738492573, 56.92394094993581, 0.39746613102879147], "isController": false}, {"data": ["get pokemons by ability : imposter", 100, 0, 0.0, 48.139999999999986, 21, 205, 41.0, 80.70000000000002, 117.1499999999998, 204.17999999999958, 3.6879955744053103, 60.731490872210955, 0.4970150285819657], "isController": false}, {"data": ["get pokemon : minccino", 188, 0, 0.0, 89.7340425531915, 28, 2124, 70.0, 126.0, 154.64999999999995, 483.72999999997273, 6.285102968708211, 626.6597514166556, 0.8470158297673175], "isController": false}, {"data": ["get pokemons by ability : technician", 59, 0, 0.0, 53.016949152542374, 22, 183, 41.0, 86.0, 116.0, 183.0, 2.176238427206669, 46.04356568828151, 0.29753259746966176], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1879, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
