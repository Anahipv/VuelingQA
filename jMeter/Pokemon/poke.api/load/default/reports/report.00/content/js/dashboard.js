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

    var data = {"OkPercent": 98.89502762430939, "KoPercent": 1.1049723756906078};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9809699201964396, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9861111111111112, 500, 1500, "/api/v2/item-attribute/underground"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item-attribute/holdable"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/region/johto"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/region/paldea"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/item/poke-ball"], "isController": false}, {"data": [0.0, 500, 1500, "/api/v2/super-contest-effect/3"], "isController": false}, {"data": [0.9864864864864865, 500, 1500, "/api/v2/super-contest-effect/1"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/berry/razz"], "isController": false}, {"data": [0.9722222222222222, 500, 1500, "/api/v2/item-pocket/battle"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/5"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item-attribute/usable-overworld"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/1"], "isController": false}, {"data": [0.9583333333333334, 500, 1500, "/api/v2/location-area/sunyshore-city-area"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-method/gift"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-method/walk"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item-category/collectibles"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/soft"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item-category/evolution"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/cute"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/super-contest-effect/7"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-method/purple-flowers"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/super-contest-effect/5"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/very-hard"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/beauty"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item-fling-effect/paralyze"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/encounter-condition-value/season-winter"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/sweet"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/super-contest-effect/9"], "isController": false}, {"data": [0.9864864864864865, 500, 1500, "/api/v2/region/unova"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/spicy"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item-fling-effect/poison"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-method/surf"], "isController": false}, {"data": [0.9459459459459459, 500, 1500, "/api/v2/item-attribute/countable"], "isController": false}, {"data": [0.9864864864864865, 500, 1500, "/api/v2/location/eterna-forest"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location/pinwheel-forest"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition/season"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location/chargestone-cave"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/pinap"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/location-area/valley-windworks-area"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item-fling-effect/berry-effect"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/berry-firmness/super-hard"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/sour"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item-pocket/pokeballs"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/location-area/fuego-ironworks-area"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location/spring-path"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition-value/slot2-ruby"], "isController": false}, {"data": [0.972972972972973, 500, 1500, "/api/v2/pal-park-area/forest"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/region/alola"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition/swarm"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item-category/training"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/tough"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/dry"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/pal-park-area/mountain"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/region/hisui"], "isController": false}, {"data": [0.9864864864864865, 500, 1500, "/api/v2/item-category/plates"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item/premier-ball"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition/starter"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location-area/eterna-forest-area"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition-value/swarm-yes"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/pal-park-area/field"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location/sunyshore-city"], "isController": false}, {"data": [0.9722222222222222, 500, 1500, "/api/v2/item-attribute/consumable"], "isController": false}, {"data": [0.9722222222222222, 500, 1500, "/api/v2/item-pocket/key"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item-pocket/machines"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/very-soft"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/hard"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/iapapa"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/smart"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/lum"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item-fling-effect/flinch"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/item/ultra-ball"], "isController": false}, {"data": [0.9722222222222222, 500, 1500, "/api/v2/location-area/pastoria-city-area"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/item-category/choice"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/rawst"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition/radar"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition-value/time-night"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/item/ice-heal"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-method/headbutt"], "isController": false}, {"data": [0.972972972972973, 500, 1500, "/api/v2/item-fling-effect/burn"], "isController": false}, {"data": [0.9864864864864865, 500, 1500, "/api/v2/item-pocket/medicine"], "isController": false}, {"data": [0.9722222222222222, 500, 1500, "/api/v2/pal-park-area/pond"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/item/antidote"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/9"], "isController": false}, {"data": [0.9861111111111112, 500, 1500, "/api/v2/encounter-condition-value/item-claw-fossil"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/7"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition/weekday"], "isController": false}, {"data": [0.9722222222222222, 500, 1500, "/api/v2/pal-park-area/sea"], "isController": false}, {"data": [0.9864864864864865, 500, 1500, "/api/v2/contest-type/cool"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/bitter"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3258, 36, 1.1049723756906078, 52.18692449355449, 16, 1192, 24.0, 65.0, 214.0, 701.1499999999978, 18.197457494582093, 97.48752411351627, 2.55047016556726], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/item-attribute/underground", 36, 0, 0.0, 75.72222222222223, 19, 815, 25.5, 212.50000000000003, 307.54999999999916, 815.0, 0.2063817833679214, 0.9171963858823394, 0.029828617127394888], "isController": false}, {"data": ["/api/v2/item-attribute/holdable", 36, 0, 0.0, 69.11111111111113, 21, 818, 28.0, 210.70000000000005, 319.8999999999992, 818.0, 0.20705719955137608, 2.584125974175366, 0.02931962298334915], "isController": false}, {"data": ["/api/v2/region/johto", 36, 0, 0.0, 55.97222222222223, 21, 292, 26.0, 208.5000000000001, 266.49999999999994, 292.0, 0.21265158809387388, 1.5007904289064393, 0.027827453910721774], "isController": false}, {"data": ["/api/v2/region/paldea", 36, 0, 0.0, 66.25000000000001, 20, 434, 24.5, 218.00000000000017, 330.29999999999984, 434.0, 0.21227917069603983, 1.3661728626878082, 0.027986023480434937], "isController": false}, {"data": ["/api/v2/item/poke-ball", 36, 0, 0.0, 47.44444444444445, 23, 387, 31.0, 53.600000000000094, 246.74999999999977, 387.0, 0.20705243602942444, 4.015364791524078, 0.027499151660157935], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 36, 36, 100.0, 28.805555555555557, 17, 206, 22.0, 35.90000000000001, 71.69999999999978, 206.0, 0.20705958139454628, 0.2006282874303331, 0.029117753633608072], "isController": false}, {"data": ["/api/v2/super-contest-effect/1", 37, 0, 0.0, 43.702702702702695, 18, 710, 22.0, 47.000000000000014, 126.80000000000092, 710.0, 0.20745259427879384, 0.4762517591419312, 0.029173021070455385], "isController": false}, {"data": ["/api/v2/berry/razz", 36, 0, 0.0, 63.30555555555558, 21, 577, 30.0, 125.90000000000032, 358.5499999999996, 577.0, 0.20655348300810722, 0.39237541525856484, 0.026626034919013823], "isController": false}, {"data": ["/api/v2/item-pocket/battle", 36, 0, 0.0, 73.80555555555557, 18, 642, 25.0, 211.10000000000002, 568.8999999999999, 642.0, 0.20971810391532048, 0.3818605764189469, 0.028672397019672724], "isController": false}, {"data": ["/api/v2/contest-effect/5", 36, 0, 0.0, 30.638888888888903, 19, 270, 22.0, 34.300000000000004, 85.5499999999997, 270.0, 0.20651082747741287, 0.2930163667001291, 0.027830560734260722], "isController": false}, {"data": ["/api/v2/item-attribute/usable-overworld", 36, 0, 0.0, 79.41666666666669, 21, 1023, 24.0, 207.10000000000002, 482.39999999999907, 1023.0, 0.20636285468615648, 0.8064295822585269, 0.030833512467755807], "isController": false}, {"data": ["/api/v2/contest-effect/3", 36, 0, 0.0, 27.916666666666664, 19, 169, 22.0, 33.300000000000004, 55.09999999999981, 169.0, 0.2070917416415472, 0.30193014177155475, 0.02790884799466163], "isController": false}, {"data": ["/api/v2/contest-effect/1", 37, 0, 0.0, 29.054054054054053, 18, 200, 21.0, 40.40000000000002, 67.70000000000022, 200.0, 0.2074560837898302, 0.2900596120851579, 0.027957948791988832], "isController": false}, {"data": ["/api/v2/location-area/sunyshore-city-area", 36, 0, 0.0, 122.22222222222223, 25, 1066, 30.0, 402.300000000002, 820.3499999999996, 1066.0, 0.21038236995739756, 3.2173538883483235, 0.031844987640035766], "isController": false}, {"data": ["/api/v2/encounter-method/gift", 36, 0, 0.0, 31.38888888888889, 18, 203, 22.0, 48.50000000000002, 94.19999999999982, 203.0, 0.21240191161720456, 0.27939401845241607, 0.029661595079355712], "isController": false}, {"data": ["/api/v2/encounter-method/walk", 37, 0, 0.0, 36.432432432432435, 18, 207, 21.0, 70.60000000000021, 206.1, 207.0, 0.21293003234234545, 0.3140729217021742, 0.029735346313433008], "isController": false}, {"data": ["/api/v2/item-category/collectibles", 36, 0, 0.0, 64.33333333333336, 19, 789, 21.0, 207.50000000000003, 301.9499999999992, 789.0, 0.2075514122144006, 0.4447739383168734, 0.02999766504661259], "isController": false}, {"data": ["/api/v2/berry-firmness/soft", 36, 0, 0.0, 23.5, 18, 39, 22.5, 30.200000000000017, 33.89999999999999, 39.0, 0.20719424460431654, 0.5678844424460432, 0.028529676258992807], "isController": false}, {"data": ["/api/v2/item-category/evolution", 36, 0, 0.0, 66.08333333333336, 20, 596, 25.5, 206.70000000000005, 272.99999999999943, 596.0, 0.20732072516182534, 0.7411333496982332, 0.029356938621547535], "isController": false}, {"data": ["/api/v2/contest-type/cute", 36, 0, 0.0, 28.58333333333333, 18, 72, 24.0, 52.0, 55.84999999999997, 72.0, 0.20661038446749042, 0.3542708984969094, 0.02804574554783317], "isController": false}, {"data": ["/api/v2/super-contest-effect/7", 36, 0, 0.0, 27.97222222222222, 20, 85, 23.0, 42.20000000000006, 68.84999999999997, 85.0, 0.20642083474292003, 0.5911752942930373, 0.02902792988572313], "isController": false}, {"data": ["/api/v2/encounter-method/purple-flowers", 36, 0, 0.0, 33.13888888888888, 18, 209, 21.0, 37.900000000000055, 204.75, 209.0, 0.21251475796930341, 0.31066101866883117, 0.031752693329397876], "isController": false}, {"data": ["/api/v2/super-contest-effect/5", 36, 0, 0.0, 30.444444444444446, 20, 65, 25.5, 58.300000000000004, 61.599999999999994, 65.0, 0.20652622883106156, 1.193643617479003, 0.029042750929368026], "isController": false}, {"data": ["/api/v2/berry-firmness/very-hard", 36, 0, 0.0, 34.3611111111111, 18, 267, 23.5, 47.60000000000001, 91.89999999999971, 267.0, 0.20641846757223214, 0.4832781331169762, 0.02943075807182216], "isController": false}, {"data": ["/api/v2/contest-type/beauty", 36, 0, 0.0, 23.805555555555554, 18, 63, 21.5, 30.60000000000001, 40.04999999999996, 63.0, 0.20707268251156155, 0.3556477815900881, 0.028512937728642752], "isController": false}, {"data": ["/api/v2/item-fling-effect/paralyze", 36, 0, 0.0, 59.41666666666666, 18, 813, 21.0, 207.40000000000003, 303.8499999999991, 813.0, 0.2088724369611381, 0.2701335260568365, 0.03018859440453949], "isController": false}, {"data": ["/api/v2/encounter-condition-value/season-winter", 36, 0, 0.0, 41.361111111111114, 18, 556, 24.0, 52.300000000000004, 130.1499999999993, 556.0, 0.21239689900527453, 0.31289709185870884, 0.033394434316258985], "isController": false}, {"data": ["/api/v2/berry-flavor/sweet", 36, 0, 0.0, 26.166666666666664, 19, 56, 24.0, 33.800000000000026, 55.15, 56.0, 0.2066127560419883, 0.8313495579347907, 0.028247837740115588], "isController": false}, {"data": ["/api/v2/super-contest-effect/9", 36, 0, 0.0, 23.55555555555556, 19, 49, 22.0, 28.300000000000004, 31.99999999999997, 49.0, 0.20637350164238913, 0.39284526179338575, 0.02902127366846097], "isController": false}, {"data": ["/api/v2/region/unova", 37, 0, 0.0, 81.43243243243242, 23, 748, 28.0, 238.40000000000003, 329.5000000000007, 748.0, 0.21204288997266366, 2.3188217525201584, 0.027747800055016536], "isController": false}, {"data": ["/api/v2/berry-flavor/spicy", 37, 0, 0.0, 38.567567567567565, 20, 472, 24.0, 52.60000000000001, 101.20000000000059, 472.0, 0.20745724698626297, 0.8347679247266611, 0.02836329548640314], "isController": false}, {"data": ["/api/v2/item-fling-effect/poison", 36, 0, 0.0, 67.55555555555556, 18, 748, 22.0, 207.90000000000006, 313.6499999999993, 748.0, 0.2088312411536766, 0.2693381445489245, 0.029774766805114043], "isController": false}, {"data": ["/api/v2/encounter-method/surf", 36, 0, 0.0, 29.0, 16, 206, 22.0, 42.0, 69.14999999999978, 206.0, 0.21287415589484016, 0.2945325065488369, 0.029727543254845844], "isController": false}, {"data": ["/api/v2/item-attribute/countable", 37, 0, 0.0, 101.67567567567565, 20, 827, 24.0, 514.0000000000001, 697.4000000000002, 827.0, 0.20744212644999244, 1.1984644727325735, 0.029576709435252826], "isController": false}, {"data": ["/api/v2/location/eterna-forest", 37, 0, 0.0, 66.72972972972974, 18, 590, 22.0, 225.40000000000015, 487.40000000000015, 590.0, 0.21111250584838698, 0.33382499308178615, 0.02968769613492942], "isController": false}, {"data": ["/api/v2/location/pinwheel-forest", 36, 0, 0.0, 31.19444444444445, 20, 222, 23.0, 50.60000000000001, 83.44999999999976, 222.0, 0.21035409606170385, 0.38212843833995563, 0.029991892602547626], "isController": false}, {"data": ["/api/v2/encounter-condition/season", 36, 0, 0.0, 35.77777777777778, 18, 443, 22.0, 36.900000000000055, 110.64999999999944, 443.0, 0.21240065844204117, 0.36760455754287835, 0.03069853266545126], "isController": false}, {"data": ["/api/v2/location/chargestone-cave", 36, 0, 0.0, 35.97222222222222, 19, 257, 23.0, 46.90000000000014, 217.89999999999992, 257.0, 0.2107395200992817, 0.42165625713441085, 0.03025264595175236], "isController": false}, {"data": ["/api/v2/berry/pinap", 36, 0, 0.0, 54.138888888888886, 20, 273, 25.0, 149.40000000000066, 270.45, 273.0, 0.2071179536746177, 0.38925634945976734, 0.026901062342504056], "isController": false}, {"data": ["/api/v2/location-area/valley-windworks-area", 36, 0, 0.0, 93.30555555555557, 31, 840, 59.5, 219.60000000000002, 314.69999999999914, 840.0, 0.21043894055684484, 7.448062272024481, 0.03226456412834437], "isController": false}, {"data": ["/api/v2/item-fling-effect/berry-effect", 36, 0, 0.0, 69.66666666666669, 20, 806, 23.5, 216.00000000000006, 353.7999999999993, 806.0, 0.2084756952085336, 0.6050907520760705, 0.03094561100751671], "isController": false}, {"data": ["/api/v2/berry-firmness/super-hard", 36, 0, 0.0, 45.94444444444444, 18, 656, 23.0, 55.80000000000007, 222.49999999999926, 656.0, 0.20633565078837413, 0.4983534343422764, 0.029620449869034175], "isController": false}, {"data": ["/api/v2/berry-flavor/sour", 36, 0, 0.0, 24.833333333333332, 20, 40, 23.0, 34.300000000000004, 37.449999999999996, 40.0, 0.20633565078837413, 0.8156314390335466, 0.028008452597250003], "isController": false}, {"data": ["/api/v2/item-pocket/pokeballs", 36, 0, 0.0, 67.1111111111111, 18, 851, 22.0, 209.50000000000006, 328.2499999999991, 851.0, 0.20934127279493858, 0.3777274333015445, 0.029234181650074433], "isController": false}, {"data": ["/api/v2/location-area/fuego-ironworks-area", 36, 0, 0.0, 84.22222222222223, 30, 848, 36.5, 249.3, 358.3999999999992, 848.0, 0.21034795056823163, 6.232482416226007, 0.03204519559437903], "isController": false}, {"data": ["/api/v2/location/spring-path", 36, 0, 0.0, 29.38888888888889, 18, 207, 21.0, 42.30000000000005, 78.64999999999978, 207.0, 0.21048077316604008, 0.31512164582809565, 0.029187763466384464], "isController": false}, {"data": ["/api/v2/encounter-condition-value/slot2-ruby", 36, 0, 0.0, 31.222222222222225, 18, 217, 22.5, 47.90000000000001, 75.04999999999976, 217.0, 0.2131590166264033, 0.31696879921900906, 0.03288977014352707], "isController": false}, {"data": ["/api/v2/pal-park-area/forest", 37, 0, 0.0, 77.48648648648646, 22, 590, 29.0, 219.2, 571.1, 590.0, 0.21135731381991216, 2.59515184880526, 0.02930931500237063], "isController": false}, {"data": ["/api/v2/region/alola", 36, 0, 0.0, 74.55555555555554, 23, 595, 28.5, 224.40000000000003, 304.2999999999995, 595.0, 0.21243449936269648, 1.988755493423382, 0.027799045815040363], "isController": false}, {"data": ["/api/v2/encounter-condition/swarm", 37, 0, 0.0, 32.837837837837846, 18, 221, 21.0, 36.20000000000002, 209.3, 221.0, 0.2128026686604935, 0.3279771704434347, 0.030548820598723183], "isController": false}, {"data": ["/api/v2/item-category/training", 36, 0, 0.0, 57.63888888888888, 17, 738, 21.0, 200.20000000000002, 285.7999999999993, 738.0, 0.20801072410844293, 0.37485265907042314, 0.029251508077749785], "isController": false}, {"data": ["/api/v2/contest-type/tough", 36, 0, 0.0, 24.166666666666664, 19, 68, 21.0, 30.200000000000017, 39.09999999999995, 68.0, 0.20634511220015478, 0.35477880592095834, 0.028211245808614907], "isController": false}, {"data": ["/api/v2/berry-flavor/dry", 36, 0, 0.0, 34.02777777777777, 19, 377, 23.0, 31.300000000000004, 99.89999999999954, 377.0, 0.2071179536746177, 0.8505073131335796, 0.0279123804756809], "isController": false}, {"data": ["/api/v2/pal-park-area/mountain", 36, 0, 0.0, 84.44444444444443, 26, 820, 34.0, 212.9, 314.24999999999915, 820.0, 0.2114425669127623, 3.766108500505113, 0.029734110972107205], "isController": false}, {"data": ["/api/v2/region/hisui", 36, 0, 0.0, 55.861111111111086, 19, 232, 22.5, 220.60000000000002, 225.2, 232.0, 0.2121490700799095, 0.42876970665971287, 0.027761694717488152], "isController": false}, {"data": ["/api/v2/item-category/plates", 37, 0, 0.0, 69.56756756756755, 17, 903, 24.0, 202.20000000000005, 298.20000000000095, 903.0, 0.208207892767308, 0.5245588155643841, 0.02887257887984154], "isController": false}, {"data": ["/api/v2/item/premier-ball", 36, 0, 0.0, 67.47222222222223, 23, 579, 33.5, 169.90000000000026, 271.2999999999995, 579.0, 0.20652385924251637, 3.814265536976376, 0.02803400042452127], "isController": false}, {"data": ["/api/v2/encounter-condition/starter", 36, 0, 0.0, 30.555555555555554, 18, 221, 22.0, 37.90000000000001, 74.79999999999976, 221.0, 0.2125122489699059, 0.37359704098830004, 0.030922192477066388], "isController": false}, {"data": ["/api/v2/location-area/eterna-forest-area", 37, 0, 0.0, 79.75675675675677, 26, 437, 40.0, 237.60000000000005, 279.5000000000002, 437.0, 0.21107517128464914, 6.249257938850953, 0.031743726931480434], "isController": false}, {"data": ["/api/v2/encounter-condition-value/swarm-yes", 37, 0, 0.0, 33.35135135135134, 18, 209, 22.0, 38.000000000000014, 199.10000000000002, 209.0, 0.21280144474926813, 0.3175340392446124, 0.03262678400940927], "isController": false}, {"data": ["/api/v2/pal-park-area/field", 36, 0, 0.0, 94.75, 25, 729, 34.0, 236.50000000000003, 524.9999999999997, 729.0, 0.21177093443924822, 4.328275280155299, 0.029159864996029294], "isController": false}, {"data": ["/api/v2/location/sunyshore-city", 36, 0, 0.0, 34.22222222222223, 18, 259, 21.0, 31.60000000000005, 221.59999999999994, 259.0, 0.2103922061376082, 0.33152296197160874, 0.02979186512690741], "isController": false}, {"data": ["/api/v2/item-attribute/consumable", 36, 0, 0.0, 98.24999999999999, 20, 1192, 26.0, 238.60000000000025, 729.5999999999992, 1192.0, 0.20653689265245004, 1.1675687864666702, 0.02964933908194351], "isController": false}, {"data": ["/api/v2/item-pocket/key", 36, 0, 0.0, 80.77777777777777, 18, 805, 22.5, 219.30000000000018, 606.9499999999997, 805.0, 0.2094313937659255, 0.43886057686713903, 0.02801962983001152], "isController": false}, {"data": ["/api/v2/item-pocket/machines", 36, 0, 0.0, 59.361111111111114, 18, 772, 22.0, 201.40000000000003, 296.8499999999992, 772.0, 0.20983545403146367, 0.35409732867809496, 0.02909827585201938], "isController": false}, {"data": ["/api/v2/berry-firmness/very-soft", 37, 0, 0.0, 29.8918918918919, 19, 234, 22.0, 35.800000000000026, 70.20000000000026, 234.0, 0.2074560837898302, 0.4509738696446894, 0.02957869944659688], "isController": false}, {"data": ["/api/v2/berry-firmness/hard", 36, 0, 0.0, 28.333333333333336, 18, 69, 24.0, 54.0, 57.94999999999998, 69.0, 0.206615127670931, 0.5286441743142961, 0.028449934571876237], "isController": false}, {"data": ["/api/v2/berry/iapapa", 37, 0, 0.0, 61.29729729729729, 19, 292, 26.0, 193.20000000000022, 266.80000000000007, 292.0, 0.20728988089235492, 0.3890077362544399, 0.02712582425739801], "isController": false}, {"data": ["/api/v2/contest-type/smart", 36, 0, 0.0, 27.944444444444443, 19, 65, 23.0, 53.20000000000002, 60.74999999999999, 65.0, 0.2063723185929994, 0.35456806560346704, 0.028214965432636633], "isController": false}, {"data": ["/api/v2/berry/lum", 36, 0, 0.0, 44.25, 19, 464, 25.0, 72.50000000000003, 143.54999999999947, 464.0, 0.20627062706270627, 0.38831296052782366, 0.026388136860561056], "isController": false}, {"data": ["/api/v2/item-fling-effect/flinch", 36, 0, 0.0, 78.33333333333331, 17, 1125, 22.5, 213.60000000000002, 409.2999999999988, 1125.0, 0.20801072410844293, 0.28889249817990614, 0.029657779023274086], "isController": false}, {"data": ["/api/v2/item/ultra-ball", 37, 0, 0.0, 51.783783783783775, 24, 461, 33.0, 55.60000000000001, 256.70000000000033, 461.0, 0.20744677868792716, 3.948234319546532, 0.027754110039302754], "isController": false}, {"data": ["/api/v2/location-area/pastoria-city-area", 36, 0, 0.0, 92.13888888888889, 26, 1093, 31.5, 225.70000000000007, 639.0999999999992, 1093.0, 0.2110211665953493, 3.2277182621967304, 0.03173560513250371], "isController": false}, {"data": ["/api/v2/item-category/choice", 36, 0, 0.0, 70.25, 19, 765, 24.0, 216.60000000000005, 317.0499999999993, 765.0, 0.20793623288858082, 0.307318516071738, 0.02883490729509617], "isController": false}, {"data": ["/api/v2/berry/rawst", 36, 0, 0.0, 42.27777777777777, 19, 100, 34.0, 85.60000000000001, 94.89999999999999, 100.0, 0.2063486604532792, 0.3864559330971788, 0.02680114437527943], "isController": false}, {"data": ["/api/v2/encounter-condition/radar", 36, 0, 0.0, 29.305555555555554, 18, 208, 21.0, 42.70000000000004, 75.39999999999978, 208.0, 0.21289429798105242, 0.33034306474647834, 0.03056197441720186], "isController": false}, {"data": ["/api/v2/encounter-condition-value/time-night", 36, 0, 0.0, 28.833333333333336, 19, 211, 21.5, 33.50000000000002, 70.74999999999977, 211.0, 0.21292451825827743, 0.311693215692537, 0.03285358777813265], "isController": false}, {"data": ["/api/v2/item/ice-heal", 36, 0, 0.0, 36.30555555555556, 24, 209, 31.5, 38.300000000000004, 66.19999999999976, 209.0, 0.206361671758832, 3.631179475182143, 0.02720588446039289], "isController": false}, {"data": ["/api/v2/encounter-method/headbutt", 36, 0, 0.0, 30.138888888888886, 18, 204, 21.0, 43.50000000000002, 95.19999999999982, 204.0, 0.2131577545014773, 0.3085363667112719, 0.03059979483566129], "isController": false}, {"data": ["/api/v2/item-fling-effect/burn", 37, 0, 0.0, 86.97297297297297, 17, 804, 20.0, 220.2, 738.3000000000001, 804.0, 0.20924761344613854, 0.2685900333806497, 0.02942544564086323], "isController": false}, {"data": ["/api/v2/item-pocket/medicine", 37, 0, 0.0, 69.8108108108108, 18, 874, 22.0, 208.40000000000003, 294.4000000000009, 874.0, 0.21008880510572578, 0.42534000140532374, 0.029133408520520564], "isController": false}, {"data": ["/api/v2/pal-park-area/pond", 36, 0, 0.0, 87.08333333333334, 21, 767, 26.5, 215.50000000000006, 705.8, 767.0, 0.2113320966492122, 1.3850553352548898, 0.028893060088759477], "isController": false}, {"data": ["/api/v2/item/antidote", 36, 0, 0.0, 53.83333333333332, 25, 301, 33.0, 117.30000000000061, 242.3499999999999, 301.0, 0.2063746847053428, 3.6553466628926854, 0.02720760003439578], "isController": false}, {"data": ["/api/v2/contest-effect/9", 36, 0, 0.0, 32.66666666666668, 18, 377, 22.0, 28.300000000000004, 95.64999999999952, 377.0, 0.20634511220015478, 0.29312268040867795, 0.02780822801134898], "isController": false}, {"data": ["/api/v2/encounter-condition-value/item-claw-fossil", 36, 0, 0.0, 46.75000000000001, 19, 576, 23.0, 49.9000000000001, 271.6999999999995, 576.0, 0.21240316480715565, 0.30997932572320325, 0.03401769436364602], "isController": false}, {"data": ["/api/v2/contest-effect/7", 36, 0, 0.0, 31.722222222222225, 19, 184, 23.0, 52.0, 82.84999999999982, 184.0, 0.2063711355571734, 0.2952813562309751, 0.027811735065322196], "isController": false}, {"data": ["/api/v2/encounter-condition/weekday", 36, 0, 0.0, 31.999999999999993, 18, 200, 24.0, 49.10000000000003, 80.9999999999998, 200.0, 0.2131577545014773, 0.3716094132092676, 0.031016118574921987], "isController": false}, {"data": ["/api/v2/pal-park-area/sea", 36, 0, 0.0, 83.22222222222223, 20, 752, 27.0, 222.00000000000006, 593.8999999999997, 752.0, 0.21131224906670423, 1.6496903780288088, 0.028683986933859266], "isController": false}, {"data": ["/api/v2/contest-type/cool", 37, 0, 0.0, 48.405405405405396, 18, 772, 21.0, 43.60000000000001, 274.3000000000008, 772.0, 0.20745724698626297, 0.355515839641155, 0.02816070051864312], "isController": false}, {"data": ["/api/v2/berry-flavor/bitter", 36, 0, 0.0, 29.77777777777778, 19, 70, 25.0, 52.800000000000026, 64.89999999999999, 70.0, 0.20636522058149132, 0.814847046111162, 0.02841552353709988], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 36, 100.0, 1.1049723756906078], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3258, 36, "404/Not Found", 36, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 36, 36, "404/Not Found", 36, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
