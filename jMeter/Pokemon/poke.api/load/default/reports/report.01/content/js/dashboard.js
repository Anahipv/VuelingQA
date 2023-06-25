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

    var data = {"OkPercent": 98.88620504562533, "KoPercent": 1.1137949543746646};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9857085346215781, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.996969696969697, 500, 1500, "/api/v2/item-attribute/underground"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/item-attribute/holdable"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/region/johto"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/region/paldea"], "isController": false}, {"data": [0.9909638554216867, 500, 1500, "/api/v2/item/poke-ball"], "isController": false}, {"data": [0.0, 500, 1500, "/api/v2/super-contest-effect/3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/super-contest-effect/1"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry/razz"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/item-pocket/battle"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/5"], "isController": false}, {"data": [0.9939393939393939, 500, 1500, "/api/v2/item-attribute/usable-overworld"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/contest-effect/3"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-effect/1"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location-area/sunyshore-city-area"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-method/gift"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/encounter-method/walk"], "isController": false}, {"data": [0.9939393939393939, 500, 1500, "/api/v2/item-category/collectibles"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/berry-firmness/soft"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/item-category/evolution"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/contest-type/cute"], "isController": false}, {"data": [0.9939393939393939, 500, 1500, "/api/v2/super-contest-effect/7"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-method/purple-flowers"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/super-contest-effect/5"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/berry-firmness/very-hard"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/beauty"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/item-fling-effect/paralyze"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/encounter-condition-value/season-winter"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/region/unova"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/berry-flavor/sweet"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/super-contest-effect/9"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/berry-flavor/spicy"], "isController": false}, {"data": [0.9879518072289156, 500, 1500, "/api/v2/encounter-method/surf"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/item-fling-effect/poison"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/item-attribute/countable"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/location/eterna-forest"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location/pinwheel-forest"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/encounter-condition/season"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/location/chargestone-cave"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/berry/pinap"], "isController": false}, {"data": [0.9939393939393939, 500, 1500, "/api/v2/location-area/valley-windworks-area"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/item-fling-effect/berry-effect"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/berry-firmness/super-hard"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/item-pocket/pokeballs"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/berry-flavor/sour"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/location-area/fuego-ironworks-area"], "isController": false}, {"data": [0.9939393939393939, 500, 1500, "/api/v2/location/spring-path"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition-value/slot2-ruby"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pal-park-area/forest"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/region/alola"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/encounter-condition/swarm"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/item-category/training"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/contest-type/tough"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/berry-flavor/dry"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/pal-park-area/mountain"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/region/hisui"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/item-category/plates"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/item/premier-ball"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition/starter"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/location-area/eterna-forest-area"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition-value/swarm-yes"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/pal-park-area/field"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/location/sunyshore-city"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/item-attribute/consumable"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/item-pocket/key"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/item-pocket/machines"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/berry-firmness/very-soft"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/berry-firmness/hard"], "isController": false}, {"data": [0.9910179640718563, 500, 1500, "/api/v2/berry/iapapa"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/contest-type/smart"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/berry/lum"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/item-fling-effect/flinch"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/item/ultra-ball"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/location-area/pastoria-city-area"], "isController": false}, {"data": [0.9939759036144579, 500, 1500, "/api/v2/item-category/choice"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition/radar"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition-value/time-night"], "isController": false}, {"data": [0.9909638554216867, 500, 1500, "/api/v2/berry/rawst"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/item/ice-heal"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/encounter-method/headbutt"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/item-fling-effect/burn"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/item-pocket/medicine"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/pal-park-area/pond"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/item/antidote"], "isController": false}, {"data": [0.990909090909091, 500, 1500, "/api/v2/contest-effect/9"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition-value/item-claw-fossil"], "isController": false}, {"data": [0.996969696969697, 500, 1500, "/api/v2/contest-effect/7"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/encounter-condition/weekday"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/pal-park-area/sea"], "isController": false}, {"data": [1.0, 500, 1500, "/api/v2/contest-type/cool"], "isController": false}, {"data": [0.9969879518072289, 500, 1500, "/api/v2/berry-flavor/bitter"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 14904, 166, 1.1137949543746646, 38.87385936661298, 15, 1925, 23.0, 48.0, 78.0, 314.8500000000022, 78.56242982673463, 420.72075994516604, 11.010659953204645], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/item-attribute/underground", 165, 0, 0.0, 43.27878787878787, 18, 557, 24.0, 54.400000000000006, 220.7, 371.540000000001, 0.8953814596345758, 3.9825344230080475, 0.1294106015878098], "isController": false}, {"data": ["/api/v2/item-attribute/holdable", 166, 0, 0.0, 41.349397590361455, 18, 621, 25.0, 51.30000000000001, 157.45000000000076, 417.3200000000038, 0.8905770510096783, 11.117574864133351, 0.12610710194961267], "isController": false}, {"data": ["/api/v2/region/johto", 166, 0, 0.0, 38.04216867469879, 19, 529, 24.0, 46.60000000000002, 71.40000000000009, 511.5800000000003, 0.8889793339081352, 6.277381048808179, 0.11633128002313489], "isController": false}, {"data": ["/api/v2/region/paldea", 165, 0, 0.0, 36.230303030303034, 18, 579, 24.0, 45.0, 79.79999999999995, 363.1800000000011, 0.9080602731885573, 5.847825393423993, 0.11971497742231958], "isController": false}, {"data": ["/api/v2/item/poke-ball", 166, 0, 0.0, 49.25903614457833, 22, 700, 27.0, 57.30000000000001, 231.55000000000004, 619.6000000000015, 0.8905770510096783, 17.271737657996955, 0.1182797645872229], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 166, 166, 100.0, 35.6265060240964, 17, 767, 22.0, 43.30000000000001, 56.650000000000006, 633.0000000000025, 0.8905674953593923, 0.862428152729643, 0.12523605403491453], "isController": false}, {"data": ["/api/v2/super-contest-effect/1", 166, 0, 0.0, 39.1024096385542, 18, 490, 23.0, 48.0, 182.9500000000007, 420.99000000000126, 0.8879474506279821, 2.038355084034063, 0.12486761024455997], "isController": false}, {"data": ["/api/v2/berry/razz", 166, 0, 0.0, 35.21084337349399, 17, 331, 22.0, 46.30000000000001, 82.10000000000008, 293.4800000000007, 0.8912847386280658, 1.6899038429271724, 0.11489217333877412], "isController": false}, {"data": ["/api/v2/item-pocket/battle", 165, 0, 0.0, 40.64848484848487, 18, 1318, 22.0, 48.400000000000006, 101.99999999999966, 612.4600000000037, 0.8913763390903638, 1.6267987484941142, 0.1218678588600107], "isController": false}, {"data": ["/api/v2/contest-effect/5", 166, 0, 0.0, 33.99397590361445, 16, 499, 22.0, 46.60000000000002, 52.0, 405.8700000000017, 0.8902904706740464, 1.262058391121766, 0.11998055171193205], "isController": false}, {"data": ["/api/v2/item-attribute/usable-overworld", 165, 0, 0.0, 41.55151515151513, 17, 592, 23.0, 54.0, 178.19999999999857, 585.4000000000001, 0.9080552758011524, 3.551831124420083, 0.13567622773200813], "isController": false}, {"data": ["/api/v2/contest-effect/3", 166, 0, 0.0, 42.355421686747015, 17, 768, 22.0, 45.0, 199.75000000000054, 597.1500000000032, 0.8885368046931872, 1.2948036153010318, 0.11974421781998029], "isController": false}, {"data": ["/api/v2/contest-effect/1", 166, 0, 0.0, 34.156626506024104, 18, 473, 21.5, 44.0, 54.650000000000006, 347.7100000000023, 0.8879379513238834, 1.2425824083979675, 0.11966351297138272], "isController": false}, {"data": ["/api/v2/location-area/sunyshore-city-area", 165, 0, 0.0, 36.16363636363637, 20, 393, 26.0, 45.400000000000006, 56.099999999999966, 343.5000000000002, 0.9080202956293957, 13.890867181738887, 0.13744447834234017], "isController": false}, {"data": ["/api/v2/encounter-method/gift", 165, 0, 0.0, 28.430303030303037, 17, 284, 22.0, 40.400000000000006, 52.0, 188.9600000000005, 0.8943574177462192, 1.1763690189847689, 0.12489561595479429], "isController": false}, {"data": ["/api/v2/encounter-method/walk", 166, 0, 0.0, 40.09036144578313, 16, 619, 21.5, 49.0, 130.30000000000024, 540.6100000000015, 0.8888127389353523, 1.3120215436696188, 0.12412131022241736], "isController": false}, {"data": ["/api/v2/item-category/collectibles", 165, 0, 0.0, 42.22424242424241, 17, 769, 23.0, 46.400000000000006, 182.69999999999874, 682.5400000000004, 0.9079953114423919, 1.9494867848849047, 0.1312336973569082], "isController": false}, {"data": ["/api/v2/berry-firmness/soft", 166, 0, 0.0, 32.84337349397591, 17, 592, 22.0, 40.0, 55.60000000000002, 366.8800000000042, 0.8896272676116723, 2.4383262798440475, 0.12249750462231035], "isController": false}, {"data": ["/api/v2/item-category/evolution", 165, 0, 0.0, 38.24848484848484, 18, 759, 23.0, 45.400000000000006, 75.79999999999973, 588.0600000000009, 0.8954300506324991, 3.204601908419213, 0.126794294279016], "isController": false}, {"data": ["/api/v2/contest-type/cute", 166, 0, 0.0, 34.09638554216866, 17, 503, 22.0, 39.0, 53.95000000000002, 368.33000000000254, 0.8904719501335707, 1.5271826537002864, 0.12087461041852181], "isController": false}, {"data": ["/api/v2/super-contest-effect/7", 165, 0, 0.0, 42.721212121212126, 17, 593, 23.0, 49.0, 201.89999999999992, 577.82, 0.895969765093018, 2.5640028704970734, 0.12599574821620566], "isController": false}, {"data": ["/api/v2/encounter-method/purple-flowers", 165, 0, 0.0, 36.53939393939394, 18, 333, 22.0, 51.0, 117.19999999999959, 319.1400000000001, 0.9066681319889002, 1.3266621819792839, 0.13546896893974777], "isController": false}, {"data": ["/api/v2/super-contest-effect/5", 166, 0, 0.0, 35.632530120481945, 18, 581, 25.0, 45.60000000000002, 60.650000000000006, 398.09000000000344, 0.890247499530743, 5.144438969779851, 0.12519105462151073], "isController": false}, {"data": ["/api/v2/berry-firmness/very-hard", 166, 0, 0.0, 34.614457831325296, 17, 513, 23.0, 44.200000000000045, 70.60000000000014, 503.6200000000002, 0.8928619452557296, 2.092272247927861, 0.12730258203841457], "isController": false}, {"data": ["/api/v2/contest-type/beauty", 166, 0, 0.0, 31.47590361445783, 17, 277, 22.0, 47.0, 52.0, 258.9100000000003, 0.8885700980103525, 1.5270312157084205, 0.1223519373236911], "isController": false}, {"data": ["/api/v2/item-fling-effect/paralyze", 166, 0, 0.0, 34.61445783132533, 17, 619, 22.0, 37.60000000000002, 54.85000000000005, 412.64000000000385, 0.8905674953593923, 1.1545198731343684, 0.12871483331366218], "isController": false}, {"data": ["/api/v2/encounter-condition-value/season-winter", 165, 0, 0.0, 43.212121212121225, 17, 636, 22.0, 48.400000000000006, 209.7999999999995, 545.5800000000005, 0.8945659186649824, 1.3190188102815443, 0.14064952432134975], "isController": false}, {"data": ["/api/v2/region/unova", 166, 0, 0.0, 37.68072289156625, 19, 506, 25.0, 50.0, 64.20000000000005, 358.60000000000275, 0.8888079799964662, 9.722979116358886, 0.11630885675735007], "isController": false}, {"data": ["/api/v2/berry-flavor/sweet", 166, 0, 0.0, 33.72289156626506, 18, 513, 23.0, 44.30000000000001, 53.30000000000001, 350.860000000003, 0.8917252197082017, 3.5884879063124475, 0.1219155573819807], "isController": false}, {"data": ["/api/v2/super-contest-effect/9", 165, 0, 0.0, 35.672727272727265, 17, 884, 22.0, 45.400000000000006, 75.19999999999982, 453.6800000000022, 0.9052603858055172, 1.7210073644989796, 0.12730224175390084], "isController": false}, {"data": ["/api/v2/berry-flavor/spicy", 166, 0, 0.0, 37.92771084337348, 18, 640, 24.0, 48.30000000000001, 84.7000000000001, 406.1700000000044, 0.8890888446129785, 3.5775490672601067, 0.12155511547443067], "isController": false}, {"data": ["/api/v2/encounter-method/surf", 166, 0, 0.0, 45.89759036144577, 17, 575, 22.0, 48.60000000000002, 237.0500000000001, 560.2600000000002, 0.8889983773101908, 1.2305732432910077, 0.1241472343314036], "isController": false}, {"data": ["/api/v2/item-fling-effect/poison", 166, 0, 0.0, 39.22891566265063, 18, 620, 23.0, 50.30000000000001, 96.90000000000015, 523.5200000000018, 0.8912512415774073, 1.15277421243725, 0.1270729309280288], "isController": false}, {"data": ["/api/v2/item-attribute/countable", 166, 0, 0.0, 46.48192771084337, 18, 549, 23.0, 64.1000000000002, 237.90000000000003, 502.1000000000009, 0.8883038213118001, 5.1365986609221235, 0.1266526932729715], "isController": false}, {"data": ["/api/v2/location/eterna-forest", 166, 0, 0.0, 37.56024096385546, 17, 601, 22.0, 47.30000000000001, 109.55000000000038, 542.7100000000011, 0.8903000203803619, 1.4084248410465852, 0.1251984403659884], "isController": false}, {"data": ["/api/v2/location/pinwheel-forest", 165, 0, 0.0, 35.95757575757576, 17, 301, 23.0, 50.20000000000002, 82.09999999999997, 277.2400000000001, 0.8957314325731379, 1.6293395049455233, 0.12771170815984192], "isController": false}, {"data": ["/api/v2/encounter-condition/season", 165, 0, 0.0, 35.03636363636365, 17, 592, 22.0, 45.80000000000001, 71.99999999999977, 359.02000000000123, 0.8946144211844695, 1.5497542860163631, 0.12929974056181784], "isController": false}, {"data": ["/api/v2/location/chargestone-cave", 166, 0, 0.0, 38.234939759036166, 17, 266, 22.0, 56.60000000000002, 143.5500000000006, 255.2800000000002, 0.8890126603971638, 1.7793746552398193, 0.12762193464685848], "isController": false}, {"data": ["/api/v2/berry/pinap", 166, 0, 0.0, 40.355421686747, 17, 629, 22.0, 47.0, 196.8000000000004, 525.1500000000019, 0.8889983773101908, 1.6716207016125144, 0.11546560955298377], "isController": false}, {"data": ["/api/v2/location-area/valley-windworks-area", 165, 0, 0.0, 51.0060606060606, 23, 648, 33.0, 57.0, 216.2999999999999, 612.3600000000001, 0.8901116685547823, 31.5068395725441, 0.13647219918271564], "isController": false}, {"data": ["/api/v2/item-fling-effect/berry-effect", 165, 0, 0.0, 40.47272727272726, 18, 761, 23.0, 46.400000000000006, 71.69999999999976, 573.560000000001, 0.9080003081698016, 2.640224783386896, 0.13478129574395492], "isController": false}, {"data": ["/api/v2/berry-firmness/super-hard", 166, 0, 0.0, 43.89156626506024, 18, 591, 23.0, 50.0, 139.60000000000014, 543.4300000000009, 0.8975495815039903, 2.1675644978588577, 0.1288474496885611], "isController": false}, {"data": ["/api/v2/item-pocket/pokeballs", 165, 0, 0.0, 44.19393939393938, 18, 767, 22.0, 49.80000000000001, 220.09999999999997, 575.600000000001, 0.8957217074084327, 1.6192650908750386, 0.1250861368744198], "isController": false}, {"data": ["/api/v2/berry-flavor/sour", 166, 0, 0.0, 39.67469879518071, 18, 884, 23.0, 50.30000000000001, 82.55000000000004, 476.6400000000076, 0.897525317242759, 3.5449673362962484, 0.12183204989916357], "isController": false}, {"data": ["/api/v2/location-area/fuego-ironworks-area", 165, 0, 0.0, 44.848484848484844, 22, 573, 31.0, 56.80000000000001, 100.59999999999945, 375.660000000001, 0.8957217074084327, 26.542917750693505, 0.13645760386300343], "isController": false}, {"data": ["/api/v2/location/spring-path", 165, 0, 0.0, 45.66060606060608, 17, 761, 23.0, 48.400000000000006, 250.5999999999998, 653.4200000000005, 0.8914100486223663, 1.3350838651404646, 0.1236135028363047], "isController": false}, {"data": ["/api/v2/encounter-condition-value/slot2-ruby", 165, 0, 0.0, 36.703030303030296, 17, 372, 22.0, 47.400000000000006, 176.29999999999808, 331.74000000000024, 0.8904527277535227, 1.325064911980097, 0.1373940732275943], "isController": false}, {"data": ["/api/v2/pal-park-area/forest", 166, 0, 0.0, 33.86144578313252, 19, 235, 25.0, 51.30000000000001, 60.30000000000001, 233.66000000000003, 0.8888222569660106, 10.916360771481655, 0.12325464891520849], "isController": false}, {"data": ["/api/v2/region/alola", 165, 0, 0.0, 37.393939393939405, 19, 502, 25.0, 51.400000000000006, 71.79999999999995, 357.4600000000007, 0.8901692940148254, 8.337502840786478, 0.11648699745897129], "isController": false}, {"data": ["/api/v2/encounter-condition/swarm", 166, 0, 0.0, 35.60843373493975, 17, 525, 22.0, 48.60000000000002, 77.85000000000005, 411.1000000000021, 0.8887746688511249, 1.3697881948906165, 0.12758776984483922], "isController": false}, {"data": ["/api/v2/item-category/training", 166, 0, 0.0, 43.42168674698796, 17, 577, 22.0, 48.0, 195.00000000000057, 557.5700000000004, 0.8905866068650278, 1.608592718917991, 0.12523874159039453], "isController": false}, {"data": ["/api/v2/contest-type/tough", 166, 0, 0.0, 36.500000000000014, 17, 567, 22.0, 48.0, 59.650000000000006, 542.8800000000005, 0.9017965307996111, 1.5491351784850904, 0.12329249444525932], "isController": false}, {"data": ["/api/v2/berry-flavor/dry", 166, 0, 0.0, 38.79518072289158, 18, 472, 23.0, 49.900000000000034, 98.00000000000011, 348.05000000000234, 0.8881802470853242, 3.6479742233773322, 0.11969616611110814], "isController": false}, {"data": ["/api/v2/pal-park-area/mountain", 165, 0, 0.0, 43.0060606060606, 21, 552, 27.0, 54.0, 99.59999999999968, 501.1800000000003, 0.8901837015456826, 15.858910308934208, 0.1251820830298616], "isController": false}, {"data": ["/api/v2/region/hisui", 165, 0, 0.0, 32.63030303030302, 16, 500, 21.0, 45.400000000000006, 54.099999999999966, 360.0800000000007, 0.8957557464088337, 1.8139477991552753, 0.11721803712771849], "isController": false}, {"data": ["/api/v2/item-category/plates", 166, 0, 0.0, 35.548192771084366, 17, 366, 22.0, 42.30000000000001, 90.30000000000024, 343.89000000000044, 0.8886604781635777, 2.243049017187015, 0.12323221474533988], "isController": false}, {"data": ["/api/v2/item/premier-ball", 166, 0, 0.0, 42.81325301204822, 20, 733, 28.0, 54.30000000000001, 72.40000000000009, 634.5100000000018, 0.8906965139426198, 16.451429331481293, 0.12090509320119545], "isController": false}, {"data": ["/api/v2/encounter-condition/starter", 165, 0, 0.0, 32.23030303030303, 17, 266, 23.0, 47.80000000000001, 59.799999999999955, 251.48000000000008, 0.9064838316247487, 1.5948342611058004, 0.1319004794063355], "isController": false}, {"data": ["/api/v2/location-area/eterna-forest-area", 166, 0, 0.0, 45.48192771084336, 23, 715, 30.0, 51.60000000000002, 78.65, 627.9000000000017, 0.8888936486942366, 26.321012972291687, 0.1336812713856567], "isController": false}, {"data": ["/api/v2/encounter-condition-value/swarm-yes", 166, 0, 0.0, 34.98192771084338, 15, 476, 22.0, 48.0, 76.45000000000007, 329.9400000000027, 0.8887366020280327, 1.3280124858123372, 0.1362613735531261], "isController": false}, {"data": ["/api/v2/pal-park-area/field", 166, 0, 0.0, 48.83132530120483, 19, 567, 28.0, 59.30000000000001, 235.50000000000006, 509.3800000000011, 0.8889412495515131, 18.17296634607661, 0.12240304315113608], "isController": false}, {"data": ["/api/v2/location/sunyshore-city", 165, 0, 0.0, 41.56363636363637, 18, 568, 22.0, 50.400000000000006, 232.9999999999999, 505.3000000000003, 0.9080103017896057, 1.4317660783172643, 0.12857567749950471], "isController": false}, {"data": ["/api/v2/item-attribute/consumable", 166, 0, 0.0, 42.6686746987952, 17, 572, 22.0, 53.30000000000001, 216.55000000000004, 543.1900000000005, 0.8907156309861725, 5.039252607087092, 0.12786640405758531], "isController": false}, {"data": ["/api/v2/item-pocket/key", 165, 0, 0.0, 40.28484848484849, 17, 505, 23.0, 49.400000000000006, 192.39999999999907, 482.5600000000001, 0.9080003081698016, 1.9061127681352426, 0.12148050997974885], "isController": false}, {"data": ["/api/v2/item-pocket/machines", 166, 0, 0.0, 30.945783132530117, 18, 575, 22.0, 42.30000000000001, 53.95000000000002, 338.49000000000444, 0.8891936192322938, 1.5033808440375818, 0.12330614641697824], "isController": false}, {"data": ["/api/v2/berry-firmness/very-soft", 166, 0, 0.0, 33.36746987951803, 17, 582, 23.0, 46.0, 50.650000000000006, 365.590000000004, 0.889031705227078, 1.931336442935947, 0.12675647359682948], "isController": false}, {"data": ["/api/v2/berry-firmness/hard", 166, 0, 0.0, 43.51204819277106, 18, 770, 22.0, 50.0, 215.25000000000014, 584.4100000000035, 0.8912943096764495, 2.278651076734534, 0.12272704850037047], "isController": false}, {"data": ["/api/v2/berry/iapapa", 167, 0, 0.0, 50.14970059880239, 16, 1925, 23.0, 55.400000000000034, 155.3999999999999, 989.9999999999907, 0.8802956106457785, 1.6519029638815237, 0.11519493342434993], "isController": false}, {"data": ["/api/v2/contest-type/smart", 166, 0, 0.0, 37.795180722891565, 16, 899, 22.0, 42.30000000000001, 54.0, 661.8200000000045, 0.8930108452401446, 1.5334912269081382, 0.12209132649767601], "isController": false}, {"data": ["/api/v2/berry/lum", 166, 0, 0.0, 40.80722891566265, 17, 832, 23.0, 51.0, 190.90000000000015, 480.92000000000655, 0.8936502382170063, 1.6798420634707008, 0.11432439570940217], "isController": false}, {"data": ["/api/v2/item-fling-effect/flinch", 165, 0, 0.0, 38.23636363636364, 17, 640, 23.0, 46.400000000000006, 145.99999999999898, 399.76000000000124, 0.8954154727793697, 1.2466180259344881, 0.12766665920487105], "isController": false}, {"data": ["/api/v2/item/ultra-ball", 166, 0, 0.0, 48.662650602409684, 21, 778, 28.0, 55.30000000000001, 112.90000000000003, 770.6300000000001, 0.8878999561398817, 16.90079205623723, 0.1187913027257459], "isController": false}, {"data": ["/api/v2/location-area/pastoria-city-area", 166, 0, 0.0, 45.903614457831324, 21, 588, 27.0, 57.30000000000001, 211.60000000000036, 533.730000000001, 0.8889840946821614, 13.600456708884487, 0.13369487361430943], "isController": false}, {"data": ["/api/v2/item-category/choice", 166, 0, 0.0, 33.75301204819279, 17, 553, 22.0, 45.30000000000001, 51.95000000000002, 536.9200000000003, 0.8908972838366546, 1.3188407668693547, 0.12354239678203607], "isController": false}, {"data": ["/api/v2/encounter-condition/radar", 166, 0, 0.0, 28.87349397590361, 17, 221, 22.0, 40.0, 51.650000000000006, 215.6400000000001, 0.8892984185488364, 1.3815243398566408, 0.12766295656902243], "isController": false}, {"data": ["/api/v2/encounter-condition-value/time-night", 165, 0, 0.0, 33.15151515151515, 18, 394, 22.0, 42.0, 52.0, 298.3000000000005, 0.8891762994099103, 1.3029095684126857, 0.1371971243230135], "isController": false}, {"data": ["/api/v2/berry/rawst", 166, 0, 0.0, 48.96987951807225, 18, 1085, 23.0, 50.30000000000001, 199.3, 869.2600000000041, 0.8900565668480738, 1.6653112098201122, 0.11560305018632208], "isController": false}, {"data": ["/api/v2/item/ice-heal", 165, 0, 0.0, 39.16363636363635, 21, 283, 27.0, 51.0, 84.19999999999959, 277.72, 0.9080202956293957, 15.97950733191994, 0.11970970694332853], "isController": false}, {"data": ["/api/v2/encounter-method/headbutt", 165, 0, 0.0, 47.55151515151513, 17, 590, 22.0, 54.400000000000006, 242.49999999999994, 516.0800000000004, 0.8902317300169953, 1.2885229656181716, 0.12779693780517415], "isController": false}, {"data": ["/api/v2/item-fling-effect/burn", 166, 0, 0.0, 30.807228915662638, 17, 263, 22.0, 45.60000000000002, 56.30000000000001, 253.62000000000018, 0.8902761464986941, 1.1462703429440253, 0.12519508310137886], "isController": false}, {"data": ["/api/v2/item-pocket/medicine", 166, 0, 0.0, 37.21686746987953, 16, 659, 22.0, 47.30000000000001, 176.00000000000068, 378.2700000000052, 0.8902809211725966, 1.8053820682807924, 0.12345692461573116], "isController": false}, {"data": ["/api/v2/pal-park-area/pond", 165, 0, 0.0, 44.13939393939392, 18, 720, 23.0, 48.80000000000001, 235.19999999999993, 558.9600000000008, 0.8957654723127035, 5.874919415038002, 0.12246793566775245], "isController": false}, {"data": ["/api/v2/item/antidote", 165, 0, 0.0, 40.921212121212115, 21, 592, 28.0, 61.0, 83.39999999999998, 374.86000000000115, 0.8968366126752907, 15.8862270185618, 0.11823529561637135], "isController": false}, {"data": ["/api/v2/contest-effect/9", 165, 0, 0.0, 43.83636363636364, 17, 742, 22.0, 42.20000000000002, 197.09999999999985, 631.1200000000006, 0.9016935444207029, 1.2790855939428052, 0.12151729407232129], "isController": false}, {"data": ["/api/v2/encounter-condition-value/item-claw-fossil", 165, 0, 0.0, 37.44242424242426, 18, 500, 22.0, 48.20000000000002, 145.5999999999989, 352.16000000000076, 0.9064589319166937, 1.3250470311409848, 0.14517506331478297], "isController": false}, {"data": ["/api/v2/contest-effect/7", 165, 0, 0.0, 34.212121212121204, 18, 666, 22.0, 43.400000000000006, 55.39999999999998, 363.06000000000154, 0.8928813009009985, 1.2759282245190617, 0.12032970656673612], "isController": false}, {"data": ["/api/v2/encounter-condition/weekday", 165, 0, 0.0, 29.94545454545455, 17, 307, 23.0, 45.400000000000006, 52.69999999999999, 276.64000000000016, 0.8904094804325771, 1.554548710795001, 0.12956153572700585], "isController": false}, {"data": ["/api/v2/pal-park-area/sea", 165, 0, 0.0, 32.6727272727273, 18, 330, 24.0, 49.400000000000006, 56.69999999999999, 295.6800000000002, 0.9080452811913554, 7.092340982009697, 0.12326005281796719], "isController": false}, {"data": ["/api/v2/contest-type/cool", 166, 0, 0.0, 33.445783132530124, 18, 496, 22.0, 45.0, 53.30000000000001, 342.5700000000029, 0.8892555431155014, 1.523432896361552, 0.12070949266899873], "isController": false}, {"data": ["/api/v2/berry-flavor/bitter", 166, 0, 0.0, 35.608433734939766, 17, 568, 22.0, 47.30000000000001, 62.30000000000001, 380.4000000000035, 0.8928283295504663, 3.524866117769973, 0.12293827584630446], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 166, 100.0, 1.1137949543746646], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 14904, 166, "404/Not Found", 166, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 166, 166, "404/Not Found", 166, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
