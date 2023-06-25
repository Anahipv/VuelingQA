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

    var data = {"OkPercent": 98.88589133297117, "KoPercent": 1.1141086670288287};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9872798254256171, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9987572493786246, 500, 1500, "/api/v2/item-attribute/underground"], "isController": false}, {"data": [0.9975165562913907, 500, 1500, "/api/v2/item-attribute/holdable"], "isController": false}, {"data": [0.9979218620116376, 500, 1500, "/api/v2/region/johto"], "isController": false}, {"data": [0.9987531172069826, 500, 1500, "/api/v2/region/paldea"], "isController": false}, {"data": [0.9966887417218543, 500, 1500, "/api/v2/item/poke-ball"], "isController": false}, {"data": [0.0, 500, 1500, "/api/v2/super-contest-effect/3"], "isController": false}, {"data": [0.9987593052109182, 500, 1500, "/api/v2/super-contest-effect/1"], "isController": false}, {"data": [0.9979355904211396, 500, 1500, "/api/v2/berry/razz"], "isController": false}, {"data": [0.9987572493786246, 500, 1500, "/api/v2/item-pocket/battle"], "isController": false}, {"data": [0.9979338842975206, 500, 1500, "/api/v2/contest-effect/5"], "isController": false}, {"data": [0.9991721854304636, 500, 1500, "/api/v2/item-attribute/usable-overworld"], "isController": false}, {"data": [0.9991735537190083, 500, 1500, "/api/v2/contest-effect/3"], "isController": false}, {"data": [0.9987593052109182, 500, 1500, "/api/v2/contest-effect/1"], "isController": false}, {"data": [0.9983388704318937, 500, 1500, "/api/v2/location-area/sunyshore-city-area"], "isController": false}, {"data": [0.9995840266222962, 500, 1500, "/api/v2/encounter-method/gift"], "isController": false}, {"data": [0.9995840266222962, 500, 1500, "/api/v2/encounter-method/walk"], "isController": false}, {"data": [0.9983429991714996, 500, 1500, "/api/v2/item-category/collectibles"], "isController": false}, {"data": [0.999587118084228, 500, 1500, "/api/v2/berry-firmness/soft"], "isController": false}, {"data": [0.9979287489643744, 500, 1500, "/api/v2/item-category/evolution"], "isController": false}, {"data": [0.9979338842975206, 500, 1500, "/api/v2/contest-type/cute"], "isController": false}, {"data": [0.9987593052109182, 500, 1500, "/api/v2/super-contest-effect/7"], "isController": false}, {"data": [0.9983361064891847, 500, 1500, "/api/v2/encounter-method/purple-flowers"], "isController": false}, {"data": [0.9971074380165289, 500, 1500, "/api/v2/super-contest-effect/5"], "isController": false}, {"data": [0.9995867768595041, 500, 1500, "/api/v2/berry-firmness/very-hard"], "isController": false}, {"data": [0.9991735537190083, 500, 1500, "/api/v2/contest-type/beauty"], "isController": false}, {"data": [0.9991721854304636, 500, 1500, "/api/v2/item-fling-effect/paralyze"], "isController": false}, {"data": [0.9995840266222962, 500, 1500, "/api/v2/encounter-condition-value/season-winter"], "isController": false}, {"data": [0.9979355904211396, 500, 1500, "/api/v2/berry-flavor/sweet"], "isController": false}, {"data": [0.9970906068162926, 500, 1500, "/api/v2/region/unova"], "isController": false}, {"data": [0.9979321753515302, 500, 1500, "/api/v2/super-contest-effect/9"], "isController": false}, {"data": [0.9987613542526838, 500, 1500, "/api/v2/berry-flavor/spicy"], "isController": false}, {"data": [0.9991714995857498, 500, 1500, "/api/v2/item-fling-effect/poison"], "isController": false}, {"data": [0.9995843724023276, 500, 1500, "/api/v2/encounter-method/surf"], "isController": false}, {"data": [0.9966887417218543, 500, 1500, "/api/v2/item-attribute/countable"], "isController": false}, {"data": [0.9987562189054726, 500, 1500, "/api/v2/location/eterna-forest"], "isController": false}, {"data": [0.9979253112033195, 500, 1500, "/api/v2/location/pinwheel-forest"], "isController": false}, {"data": [0.9979201331114809, 500, 1500, "/api/v2/encounter-condition/season"], "isController": false}, {"data": [0.9983416252072969, 500, 1500, "/api/v2/location/chargestone-cave"], "isController": false}, {"data": [0.9987613542526838, 500, 1500, "/api/v2/berry/pinap"], "isController": false}, {"data": [0.9954318936877077, 500, 1500, "/api/v2/location-area/valley-windworks-area"], "isController": false}, {"data": [0.9987572493786246, 500, 1500, "/api/v2/item-fling-effect/berry-effect"], "isController": false}, {"data": [0.999587118084228, 500, 1500, "/api/v2/berry-firmness/super-hard"], "isController": false}, {"data": [0.9983471074380166, 500, 1500, "/api/v2/berry-flavor/sour"], "isController": false}, {"data": [0.9983429991714996, 500, 1500, "/api/v2/item-pocket/pokeballs"], "isController": false}, {"data": [0.9966804979253112, 500, 1500, "/api/v2/location-area/fuego-ironworks-area"], "isController": false}, {"data": [0.9991701244813278, 500, 1500, "/api/v2/location/spring-path"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition-value/slot2-ruby"], "isController": false}, {"data": [0.9979218620116376, 500, 1500, "/api/v2/pal-park-area/forest"], "isController": false}, {"data": [0.999168744804655, 500, 1500, "/api/v2/region/alola"], "isController": false}, {"data": [0.9987510407993339, 500, 1500, "/api/v2/encounter-condition/swarm"], "isController": false}, {"data": [0.9983443708609272, 500, 1500, "/api/v2/item-category/training"], "isController": false}, {"data": [0.9983471074380166, 500, 1500, "/api/v2/contest-type/tough"], "isController": false}, {"data": [0.9979355904211396, 500, 1500, "/api/v2/berry-flavor/dry"], "isController": false}, {"data": [0.9966777408637874, 500, 1500, "/api/v2/pal-park-area/mountain"], "isController": false}, {"data": [0.9995843724023276, 500, 1500, "/api/v2/region/hisui"], "isController": false}, {"data": [0.9991721854304636, 500, 1500, "/api/v2/item-category/plates"], "isController": false}, {"data": [0.9962748344370861, 500, 1500, "/api/v2/item/premier-ball"], "isController": false}, {"data": [0.9995836802664446, 500, 1500, "/api/v2/encounter-condition/starter"], "isController": false}, {"data": [0.996268656716418, 500, 1500, "/api/v2/location-area/eterna-forest-area"], "isController": false}, {"data": [0.9983347210657785, 500, 1500, "/api/v2/encounter-condition-value/swarm-yes"], "isController": false}, {"data": [0.9958471760797342, 500, 1500, "/api/v2/pal-park-area/field"], "isController": false}, {"data": [0.9983416252072969, 500, 1500, "/api/v2/location/sunyshore-city"], "isController": false}, {"data": [0.9991721854304636, 500, 1500, "/api/v2/item-attribute/consumable"], "isController": false}, {"data": [0.9983429991714996, 500, 1500, "/api/v2/item-pocket/key"], "isController": false}, {"data": [0.9995854063018242, 500, 1500, "/api/v2/item-pocket/machines"], "isController": false}, {"data": [0.9975227085053675, 500, 1500, "/api/v2/berry-firmness/very-soft"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-firmness/hard"], "isController": false}, {"data": [0.9979372937293729, 500, 1500, "/api/v2/berry/iapapa"], "isController": false}, {"data": [0.9983471074380166, 500, 1500, "/api/v2/contest-type/smart"], "isController": false}, {"data": [0.999587118084228, 500, 1500, "/api/v2/berry/lum"], "isController": false}, {"data": [0.9987572493786246, 500, 1500, "/api/v2/item-fling-effect/flinch"], "isController": false}, {"data": [0.9975165562913907, 500, 1500, "/api/v2/item/ultra-ball"], "isController": false}, {"data": [0.9975103734439834, 500, 1500, "/api/v2/location-area/pastoria-city-area"], "isController": false}, {"data": [0.9983443708609272, 500, 1500, "/api/v2/item-category/choice"], "isController": false}, {"data": [0.9983484723369116, 500, 1500, "/api/v2/berry/rawst"], "isController": false}, {"data": [0.9991680532445923, 500, 1500, "/api/v2/encounter-condition/radar"], "isController": false}, {"data": [0.9983347210657785, 500, 1500, "/api/v2/encounter-condition-value/time-night"], "isController": false}, {"data": [0.9983443708609272, 500, 1500, "/api/v2/item/ice-heal"], "isController": false}, {"data": [0.99833748960931, 500, 1500, "/api/v2/encounter-method/headbutt"], "isController": false}, {"data": [0.9983429991714996, 500, 1500, "/api/v2/item-fling-effect/burn"], "isController": false}, {"data": [0.9991714995857498, 500, 1500, "/api/v2/item-pocket/medicine"], "isController": false}, {"data": [0.9983388704318937, 500, 1500, "/api/v2/pal-park-area/pond"], "isController": false}, {"data": [0.9983443708609272, 500, 1500, "/api/v2/item/antidote"], "isController": false}, {"data": [0.9995864350703061, 500, 1500, "/api/v2/contest-effect/9"], "isController": false}, {"data": [0.9975020815986678, 500, 1500, "/api/v2/encounter-condition-value/item-claw-fossil"], "isController": false}, {"data": [0.9991735537190083, 500, 1500, "/api/v2/contest-effect/7"], "isController": false}, {"data": [0.9987510407993339, 500, 1500, "/api/v2/encounter-condition/weekday"], "isController": false}, {"data": [0.9966777408637874, 500, 1500, "/api/v2/pal-park-area/sea"], "isController": false}, {"data": [0.9991742361684558, 500, 1500, "/api/v2/contest-type/cool"], "isController": false}, {"data": [0.9987603305785124, 500, 1500, "/api/v2/berry-flavor/bitter"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 108607, 1210, 1.1141086670288287, 131.8581030688633, 15, 29110, 114.0, 173.0, 198.95000000000073, 387.0, 350.1463685133602, 1874.8857503481895, 49.07284178478509], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/item-attribute/underground", 1207, 0, 0.0, 132.33057166528585, 22, 664, 125.0, 193.20000000000005, 214.0, 282.52000000000044, 3.9247310079762756, 17.458122289960233, 0.5672462784965712], "isController": false}, {"data": ["/api/v2/item-attribute/holdable", 1208, 0, 0.0, 147.21605960264867, 23, 650, 139.0, 203.10000000000014, 230.0, 405.3700000000006, 3.9201814706521847, 48.940445105289974, 0.5551038215278972], "isController": false}, {"data": ["/api/v2/region/johto", 1203, 0, 0.0, 137.32585203657518, 23, 593, 128.0, 192.0, 221.0, 424.6800000000003, 3.91172444291256, 27.62084445326904, 0.5118858157717608], "isController": false}, {"data": ["/api/v2/region/paldea", 1203, 0, 0.0, 137.1271820448876, 22, 590, 130.0, 194.60000000000014, 220.79999999999995, 369.9200000000001, 3.917711769744063, 25.2315913546555, 0.5164952040189926], "isController": false}, {"data": ["/api/v2/item/poke-ball", 1208, 0, 0.0, 156.4718543046356, 33, 796, 147.0, 214.0, 242.0, 426.1000000000008, 3.9218359906369415, 76.06305840711124, 0.5208688425064687], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 1210, 1210, 100.0, 119.7264462809915, 17, 504, 116.0, 182.0, 209.0, 296.7900000000011, 3.921771992713931, 3.7950734106694886, 0.5514991864753965], "isController": false}, {"data": ["/api/v2/super-contest-effect/1", 1209, 0, 0.0, 126.07278742762628, 19, 622, 119.0, 188.0, 208.0, 400.50000000000045, 3.9036518032998613, 8.961593481603758, 0.5489510348390431], "isController": false}, {"data": ["/api/v2/berry/razz", 1211, 0, 0.0, 125.10322047894297, 17, 1725, 117.0, 186.79999999999995, 210.1999999999996, 407.75999999999385, 3.9141283549671617, 7.42364510475384, 0.5045556082574857], "isController": false}, {"data": ["/api/v2/item-pocket/battle", 1207, 0, 0.0, 142.72493786246878, 17, 29110, 114.0, 180.0, 204.0, 296.9200000000001, 3.9254330334783822, 7.163633892593712, 0.5366802975458725], "isController": false}, {"data": ["/api/v2/contest-effect/5", 1210, 0, 0.0, 123.18677685950409, 18, 593, 118.0, 184.0, 211.45000000000005, 329.8900000000001, 3.931928887329115, 5.574317771749903, 0.5298888539564628], "isController": false}, {"data": ["/api/v2/item-attribute/usable-overworld", 1208, 0, 0.0, 133.9677152317882, 19, 672, 128.0, 191.0, 219.0, 321.5600000000013, 3.927127085473531, 15.361642678167385, 0.586768011794385], "isController": false}, {"data": ["/api/v2/contest-effect/3", 1210, 0, 0.0, 121.98181818181826, 17, 979, 116.0, 183.0, 207.45000000000005, 305.9100000000019, 3.9202726695436927, 5.71459853046473, 0.5283179964814743], "isController": false}, {"data": ["/api/v2/contest-effect/1", 1209, 0, 0.0, 123.2977667493796, 15, 848, 118.0, 182.0, 210.0, 347.8000000000002, 3.903714825398363, 5.465464363265043, 0.5260865682665763], "isController": false}, {"data": ["/api/v2/location-area/sunyshore-city-area", 1204, 0, 0.0, 152.07973421926906, 29, 926, 143.0, 206.0, 235.75, 379.7000000000003, 3.9190667152752456, 59.95188950933545, 0.5932181063160773], "isController": false}, {"data": ["/api/v2/encounter-method/gift", 1202, 0, 0.0, 119.95424292845254, 18, 509, 115.0, 181.0, 207.0, 306.49000000000046, 3.919215895974489, 5.154599586640104, 0.547312376098], "isController": false}, {"data": ["/api/v2/encounter-method/walk", 1202, 0, 0.0, 119.38019966722139, 18, 549, 115.0, 181.70000000000005, 205.0, 266.0, 3.905501168076264, 5.766729260554113, 0.5453971357762752], "isController": false}, {"data": ["/api/v2/item-category/collectibles", 1207, 0, 0.0, 126.3429991714997, 20, 565, 119.0, 186.0, 217.5999999999999, 372.0400000000009, 3.9291771515256078, 8.435389252422775, 0.5678888851814355], "isController": false}, {"data": ["/api/v2/berry-firmness/soft", 1211, 0, 0.0, 127.0437654830718, 19, 512, 122.0, 185.0, 210.39999999999986, 335.0799999999981, 3.916115575533171, 10.734071453546655, 0.5392307579591572], "isController": false}, {"data": ["/api/v2/item-category/evolution", 1207, 0, 0.0, 129.55758077879057, 20, 634, 124.0, 186.20000000000005, 212.0, 398.84000000000196, 3.9237613494878305, 14.042651475839772, 0.5556107379645854], "isController": false}, {"data": ["/api/v2/contest-type/cute", 1210, 0, 0.0, 126.12561983471099, 18, 644, 120.0, 186.0, 217.45000000000005, 390.7800000000002, 3.9321461068503836, 6.744444269546991, 0.5337581141134797], "isController": false}, {"data": ["/api/v2/super-contest-effect/7", 1209, 0, 0.0, 126.9991728701406, 20, 576, 121.0, 188.0, 213.0, 371.50000000000045, 3.9198394454513323, 11.223184845232808, 0.5512274220165937], "isController": false}, {"data": ["/api/v2/encounter-method/purple-flowers", 1202, 0, 0.0, 121.31031613976707, 17, 563, 116.0, 181.0, 213.69999999999982, 323.52000000000044, 3.914914129192166, 5.730341816054405, 0.5849432243812513], "isController": false}, {"data": ["/api/v2/super-contest-effect/5", 1210, 0, 0.0, 134.77355371900808, 21, 617, 128.0, 191.9000000000001, 218.0, 370.2300000000007, 3.930613305613306, 22.71590203108758, 0.5527424961018711], "isController": false}, {"data": ["/api/v2/berry-firmness/very-hard", 1210, 0, 0.0, 127.07355371900833, 20, 520, 122.0, 186.9000000000001, 212.0, 282.1200000000008, 3.9239849526527433, 9.193254738779348, 0.5594744170774419], "isController": false}, {"data": ["/api/v2/contest-type/beauty", 1210, 0, 0.0, 124.47520661157043, 17, 619, 119.0, 186.0, 214.45000000000005, 348.900000000001, 3.9209967757092627, 6.738567641244997, 0.5399028763427793], "isController": false}, {"data": ["/api/v2/item-fling-effect/paralyze", 1208, 0, 0.0, 120.86341059602654, 16, 1399, 115.0, 178.0, 203.54999999999995, 350.28000000000065, 3.919927053013119, 5.0821089645616535, 0.5665519568808024], "isController": false}, {"data": ["/api/v2/encounter-condition-value/season-winter", 1202, 0, 0.0, 122.08818635607342, 20, 548, 116.0, 182.0, 209.8499999999999, 334.40000000000055, 3.917299996089218, 5.77544977048598, 0.6159036126663712], "isController": false}, {"data": ["/api/v2/berry-flavor/sweet", 1211, 0, 0.0, 130.51362510322028, 19, 557, 124.0, 189.79999999999995, 216.0, 315.43999999999846, 3.9266930824054316, 15.801714234789333, 0.5368525698601176], "isController": false}, {"data": ["/api/v2/region/unova", 1203, 0, 0.0, 144.06816292601872, 26, 1926, 133.0, 201.0, 224.79999999999995, 427.3200000000006, 3.908420160040546, 42.75488770805108, 0.5114534193803059], "isController": false}, {"data": ["/api/v2/super-contest-effect/9", 1209, 0, 0.0, 122.40942928039702, 17, 577, 116.0, 182.0, 209.0, 394.7000000000048, 3.9288070270077045, 7.476946769173651, 0.5524884881729586], "isController": false}, {"data": ["/api/v2/berry-flavor/spicy", 1211, 0, 0.0, 132.0660611065233, 21, 633, 124.0, 191.79999999999995, 221.39999999999986, 386.75999999999976, 3.9089987669384567, 15.729298683133848, 0.5344334251673671], "isController": false}, {"data": ["/api/v2/item-fling-effect/poison", 1207, 0, 0.0, 122.09113504556748, 17, 519, 118.0, 183.20000000000005, 210.5999999999999, 331.52000000000044, 3.926697312473364, 5.07901901394189, 0.5598611402549913], "isController": false}, {"data": ["/api/v2/encounter-method/surf", 1203, 0, 0.0, 118.90939318370748, 17, 553, 114.0, 179.0, 197.0, 305.40000000000055, 3.9126913657341906, 5.4173156310881705, 0.5464012356445207], "isController": false}, {"data": ["/api/v2/item-attribute/countable", 1208, 0, 0.0, 136.29801324503308, 29, 784, 127.0, 197.10000000000014, 222.0, 343.0200000000018, 3.907197588405197, 22.594658017113396, 0.5570809061593347], "isController": false}, {"data": ["/api/v2/location/eterna-forest", 1206, 0, 0.0, 120.55058043117734, 17, 1386, 115.0, 177.0, 200.0, 351.51000000000045, 3.9115839320175794, 6.1909529924752285, 0.5500664904399721], "isController": false}, {"data": ["/api/v2/location/pinwheel-forest", 1205, 0, 0.0, 128.08298755186712, 22, 1388, 119.0, 188.0, 216.0, 402.7000000000003, 3.9177691149743312, 7.124315431824315, 0.5585881745959497], "isController": false}, {"data": ["/api/v2/encounter-condition/season", 1202, 0, 0.0, 124.97504159733782, 17, 557, 118.5, 185.70000000000005, 209.8499999999999, 330.28000000000065, 3.9180789026771365, 6.786937957774714, 0.5662848414025549], "isController": false}, {"data": ["/api/v2/location/chargestone-cave", 1206, 0, 0.0, 126.86733001658368, 18, 581, 120.0, 185.29999999999995, 209.64999999999986, 368.0, 3.9187524979610138, 7.841192280853678, 0.5625552902346378], "isController": false}, {"data": ["/api/v2/berry/pinap", 1211, 0, 0.0, 122.05119735755578, 17, 636, 117.0, 180.0, 206.0, 366.0, 3.912370651081798, 7.358208870840078, 0.50814970370496], "isController": false}, {"data": ["/api/v2/location-area/valley-windworks-area", 1204, 0, 0.0, 180.08305647840498, 36, 1193, 169.0, 240.0, 266.0, 494.6500000000003, 3.9174982673855254, 138.6677824100586, 0.6006320585737573], "isController": false}, {"data": ["/api/v2/item-fling-effect/berry-effect", 1207, 0, 0.0, 129.21043910521948, 21, 568, 121.0, 190.20000000000005, 214.5999999999999, 393.0, 3.927463938592295, 11.417105969330315, 0.5829829283847939], "isController": false}, {"data": ["/api/v2/berry-firmness/super-hard", 1211, 0, 0.0, 126.0148637489676, 21, 674, 120.0, 186.0, 209.0, 281.91999999999894, 3.932954652480749, 9.497182982663821, 0.5645940760885451], "isController": false}, {"data": ["/api/v2/berry-flavor/sour", 1210, 0, 0.0, 130.85206611570206, 24, 676, 124.0, 188.9000000000001, 217.0, 300.7800000000002, 3.9330791459042347, 15.542661947987467, 0.5338847668756724], "isController": false}, {"data": ["/api/v2/item-pocket/pokeballs", 1207, 0, 0.0, 125.14250207125093, 18, 750, 120.0, 189.0, 216.5999999999999, 341.84000000000015, 3.921377517868746, 7.090871710526316, 0.5476142432179987], "isController": false}, {"data": ["/api/v2/location-area/fuego-ironworks-area", 1205, 0, 0.0, 171.33526970954347, 47, 743, 162.0, 229.0, 257.70000000000005, 453.86000000000104, 3.9218366563169234, 116.2173609568549, 0.5974673031107812], "isController": false}, {"data": ["/api/v2/location/spring-path", 1205, 0, 0.0, 124.04564315352701, 18, 644, 119.0, 178.4000000000001, 203.70000000000005, 359.3400000000006, 3.91869918699187, 5.8733581046747965, 0.5434133638211383], "isController": false}, {"data": ["/api/v2/encounter-condition-value/slot2-ruby", 1201, 0, 0.0, 123.5220649458784, 18, 459, 117.0, 186.0, 211.89999999999986, 355.0, 3.9160191594742555, 5.827055257932303, 0.6042295187470043], "isController": false}, {"data": ["/api/v2/pal-park-area/forest", 1203, 0, 0.0, 149.53699085619274, 24, 783, 141.0, 207.60000000000014, 236.79999999999995, 402.6800000000003, 3.908750337101286, 48.00798587362844, 0.5420337381527174], "isController": false}, {"data": ["/api/v2/region/alola", 1203, 0, 0.0, 137.88944305901884, 23, 593, 130.0, 194.0, 218.79999999999995, 387.0, 3.91563323894151, 36.673890362065876, 0.5123973183771116], "isController": false}, {"data": ["/api/v2/encounter-condition/swarm", 1201, 0, 0.0, 125.63280599500409, 18, 643, 120.0, 184.0, 207.89999999999986, 355.82000000000016, 3.9101798161792236, 6.028690939314075, 0.561324641580416], "isController": false}, {"data": ["/api/v2/item-category/training", 1208, 0, 0.0, 121.74420529801328, 16, 614, 115.0, 182.0, 206.0, 383.30000000000246, 3.9190114228801494, 7.07869917532061, 0.551110981342521], "isController": false}, {"data": ["/api/v2/contest-type/tough", 1210, 0, 0.0, 125.09917355371907, 17, 558, 119.0, 184.0, 214.0, 359.8900000000001, 3.9318777803412606, 6.7570390970004, 0.5375614152810319], "isController": false}, {"data": ["/api/v2/berry-flavor/dry", 1211, 0, 0.0, 132.95210569777058, 20, 566, 128.0, 190.0, 215.39999999999986, 353.5599999999986, 3.9150394413552303, 16.077804614759795, 0.5276127372138886], "isController": false}, {"data": ["/api/v2/pal-park-area/mountain", 1204, 0, 0.0, 156.4186046511628, 35, 792, 147.0, 220.0, 249.0, 424.9000000000001, 3.9174600282421537, 69.79034400195873, 0.5508928164715529], "isController": false}, {"data": ["/api/v2/region/hisui", 1203, 0, 0.0, 121.70241064006653, 18, 529, 116.0, 182.0, 209.0, 358.7600000000002, 3.916908149643473, 7.932664913880116, 0.5125641523947514], "isController": false}, {"data": ["/api/v2/item-category/plates", 1208, 0, 0.0, 125.86175496688752, 19, 650, 120.0, 182.0, 204.0, 328.20000000000164, 3.912753373454171, 9.876429072032883, 0.5425888467094652], "isController": false}, {"data": ["/api/v2/item/premier-ball", 1208, 0, 0.0, 158.1208609271522, 31, 2591, 146.0, 213.0, 240.0, 442.19000000000074, 3.9277144473562706, 72.54646633724371, 0.5331565509594939], "isController": false}, {"data": ["/api/v2/encounter-condition/starter", 1201, 0, 0.0, 122.32972522897585, 17, 607, 118.0, 181.0, 207.79999999999973, 327.8800000000001, 3.916938721597302, 6.891212459273295, 0.5699451850761699], "isController": false}, {"data": ["/api/v2/location-area/eterna-forest-area", 1206, 0, 0.0, 173.3515754560532, 46, 713, 163.0, 231.29999999999995, 261.0, 467.16000000000076, 3.9100367335955153, 115.78051317003148, 0.5880328681383881], "isController": false}, {"data": ["/api/v2/encounter-condition-value/swarm-yes", 1201, 0, 0.0, 125.49458784346366, 17, 624, 119.0, 190.79999999999995, 213.0, 368.98, 3.9093270488975107, 5.839806494821199, 0.5993792448016692], "isController": false}, {"data": ["/api/v2/pal-park-area/field", 1204, 0, 0.0, 163.7217607973421, 34, 2810, 151.0, 224.0, 264.5, 437.85000000000014, 3.9114148991121347, 79.96074727435456, 0.5385834968504014], "isController": false}, {"data": ["/api/v2/location/sunyshore-city", 1206, 0, 0.0, 125.11028192371487, 18, 582, 120.0, 187.0, 212.0, 301.4400000000005, 3.9247080876322884, 6.187806922911704, 0.555744797565119], "isController": false}, {"data": ["/api/v2/item-attribute/consumable", 1208, 0, 0.0, 136.56291390728506, 22, 547, 129.0, 190.10000000000014, 216.0, 363.3700000000006, 3.926884530740549, 22.217700826173598, 0.5637226816590437], "isController": false}, {"data": ["/api/v2/item-pocket/key", 1207, 0, 0.0, 126.57746478873233, 17, 644, 120.0, 186.0, 215.0, 357.880000000001, 3.9274894979516533, 8.244890928377819, 0.5254551379095473], "isController": false}, {"data": ["/api/v2/item-pocket/machines", 1206, 0, 0.0, 120.7562189054727, 17, 584, 116.0, 181.29999999999995, 205.0, 312.4600000000014, 3.919045390734675, 6.62751099388096, 0.543461372543285], "isController": false}, {"data": ["/api/v2/berry-firmness/very-soft", 1211, 0, 0.0, 128.47151114781167, 19, 1450, 121.0, 189.79999999999995, 214.39999999999986, 365.4799999999975, 3.910185209102885, 8.495211481164272, 0.5575068755166223], "isController": false}, {"data": ["/api/v2/berry-firmness/hard", 1211, 0, 0.0, 126.0933113129645, 17, 480, 120.0, 182.0, 210.0, 302.3999999999994, 3.928170594837262, 10.052819637244312, 0.5408906776094277], "isController": false}, {"data": ["/api/v2/berry/iapapa", 1212, 0, 0.0, 126.13118811881176, 18, 1120, 119.0, 183.70000000000005, 210.0, 363.6099999999997, 3.9089586753403407, 7.335892825754619, 0.5115238891558649], "isController": false}, {"data": ["/api/v2/contest-type/smart", 1210, 0, 0.0, 124.22066115702455, 17, 560, 118.0, 186.9000000000001, 213.0, 340.4500000000005, 3.9237431861443226, 6.742179215753991, 0.536449263730669], "isController": false}, {"data": ["/api/v2/berry/lum", 1211, 0, 0.0, 124.4219653179191, 16, 1335, 119.0, 180.0, 204.79999999999973, 333.0, 3.917610484056199, 7.371349278752058, 0.5011786849720332], "isController": false}, {"data": ["/api/v2/item-fling-effect/flinch", 1207, 0, 0.0, 122.08699254349624, 16, 537, 119.0, 182.0, 206.0, 301.9200000000001, 3.922983417513342, 5.465063696680578, 0.5593316200751445], "isController": false}, {"data": ["/api/v2/item/ultra-ball", 1208, 0, 0.0, 156.95612582781473, 30, 797, 148.0, 215.0, 241.54999999999995, 424.4700000000014, 3.9084996926262656, 74.39785333824052, 0.5229145096580063], "isController": false}, {"data": ["/api/v2/location-area/pastoria-city-area", 1205, 0, 0.0, 154.06307053941904, 24, 590, 145.0, 214.0, 242.4000000000001, 406.40000000000055, 3.9154013367602576, 59.90007476426359, 0.5888396541612105], "isController": false}, {"data": ["/api/v2/item-category/choice", 1208, 0, 0.0, 124.37086092715214, 17, 576, 117.0, 189.10000000000014, 215.54999999999995, 359.5700000000022, 3.925353298044147, 5.810728229399206, 0.5443361018772157], "isController": false}, {"data": ["/api/v2/berry/rawst", 1211, 0, 0.0, 126.02477291494625, 16, 846, 119.0, 188.0, 222.39999999999986, 378.7999999999988, 3.912358011449543, 7.327313770264464, 0.5081480620339739], "isController": false}, {"data": ["/api/v2/encounter-condition/radar", 1202, 0, 0.0, 123.90682196339435, 19, 548, 120.0, 184.70000000000005, 210.8499999999999, 296.5500000000004, 3.908078863861, 6.070278564415024, 0.5610230400269209], "isController": false}, {"data": ["/api/v2/encounter-condition-value/time-night", 1201, 0, 0.0, 124.19150707743545, 18, 546, 117.0, 183.79999999999995, 218.0, 373.7000000000003, 3.913199309243752, 5.735016092869245, 0.6037944246684696], "isController": false}, {"data": ["/api/v2/item/ice-heal", 1208, 0, 0.0, 155.00413907284747, 24, 670, 148.0, 209.0, 233.0, 401.82000000000016, 3.92673135371463, 69.10428742157914, 0.5176843093276123], "isController": false}, {"data": ["/api/v2/encounter-method/headbutt", 1203, 0, 0.0, 123.29260182876135, 17, 553, 117.0, 186.0, 215.0, 395.6800000000003, 3.9138242910870216, 5.666653136305519, 0.5618478230369064], "isController": false}, {"data": ["/api/v2/item-fling-effect/burn", 1207, 0, 0.0, 124.4904722452364, 17, 535, 121.0, 184.0, 209.5999999999999, 385.0400000000009, 3.9109457878757437, 5.037324172488263, 0.5499767514200266], "isController": false}, {"data": ["/api/v2/item-pocket/medicine", 1207, 0, 0.0, 122.05468102734075, 17, 542, 117.0, 182.0, 207.99999999999955, 296.0, 3.9120993096295336, 7.933699088216706, 0.542498146452533], "isController": false}, {"data": ["/api/v2/pal-park-area/pond", 1204, 0, 0.0, 140.07641196013293, 21, 579, 132.0, 197.0, 222.0, 392.0, 3.9177277179236043, 25.693913845376656, 0.5356268364348677], "isController": false}, {"data": ["/api/v2/item/antidote", 1208, 0, 0.0, 155.12913907284778, 32, 575, 145.0, 211.10000000000014, 247.54999999999995, 410.5600000000013, 3.9176514846861337, 69.3987596806206, 0.5164872562818633], "isController": false}, {"data": ["/api/v2/contest-effect/9", 1209, 0, 0.0, 123.51943755169557, 17, 508, 117.0, 184.0, 210.0, 333.8000000000002, 3.9300330590870227, 5.578533641968788, 0.5296333614785247], "isController": false}, {"data": ["/api/v2/encounter-condition-value/item-claw-fossil", 1201, 0, 0.0, 128.30807660283074, 19, 671, 121.0, 186.79999999999995, 216.79999999999973, 428.84000000000015, 3.915865941095725, 5.721338483979511, 0.6271504046286122], "isController": false}, {"data": ["/api/v2/contest-effect/7", 1210, 0, 0.0, 122.81818181818186, 18, 537, 117.0, 184.0, 207.45000000000005, 332.4500000000005, 3.9226110974233954, 5.6111219397149785, 0.5286331361761998], "isController": false}, {"data": ["/api/v2/encounter-condition/weekday", 1201, 0, 0.0, 124.35886761032468, 18, 620, 118.0, 179.79999999999995, 211.89999999999986, 333.8000000000002, 3.9166832443573347, 6.837743253831077, 0.5699080111418388], "isController": false}, {"data": ["/api/v2/pal-park-area/sea", 1204, 0, 0.0, 141.13870431893653, 27, 655, 132.0, 199.5, 226.0, 429.50000000000045, 3.9183779737689974, 30.603276434406226, 0.5318891976112214], "isController": false}, {"data": ["/api/v2/contest-type/cool", 1211, 0, 0.0, 123.4698596201485, 19, 554, 119.0, 184.0, 208.0, 273.63999999999965, 3.9076239000732476, 6.694876406470328, 0.5304294161232241], "isController": false}, {"data": ["/api/v2/berry-flavor/bitter", 1210, 0, 0.0, 130.43966942148737, 22, 557, 124.0, 190.0, 218.0, 322.7800000000002, 3.9223695001734273, 15.485749298187605, 0.5400918940668488], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 1210, 100.0, 1.1141086670288287], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 108607, 1210, "404/Not Found", 1210, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 1210, 1210, "404/Not Found", 1210, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
