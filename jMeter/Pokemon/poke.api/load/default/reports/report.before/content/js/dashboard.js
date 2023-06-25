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

    var data = {"OkPercent": 98.86550288399098, "KoPercent": 1.134497116009015};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5118797509454143, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5238907849829352, 500, 1500, "/api/v2/item-attribute/underground"], "isController": false}, {"data": [0.5068493150684932, 500, 1500, "/api/v2/item-attribute/holdable"], "isController": false}, {"data": [0.5052816901408451, 500, 1500, "/api/v2/region/paldea"], "isController": false}, {"data": [0.49298245614035086, 500, 1500, "/api/v2/region/johto"], "isController": false}, {"data": [0.4880546075085324, 500, 1500, "/api/v2/item/poke-ball"], "isController": false}, {"data": [0.0, 500, 1500, "/api/v2/super-contest-effect/3"], "isController": false}, {"data": [0.531986531986532, 500, 1500, "/api/v2/super-contest-effect/1"], "isController": false}, {"data": [0.5066666666666667, 500, 1500, "/api/v2/berry/razz"], "isController": false}, {"data": [0.5259515570934256, 500, 1500, "/api/v2/item-pocket/battle"], "isController": false}, {"data": [0.5387205387205387, 500, 1500, "/api/v2/contest-effect/5"], "isController": false}, {"data": [0.5273037542662116, 500, 1500, "/api/v2/item-attribute/usable-overworld"], "isController": false}, {"data": [0.5336700336700336, 500, 1500, "/api/v2/contest-effect/3"], "isController": false}, {"data": [0.5252525252525253, 500, 1500, "/api/v2/contest-effect/1"], "isController": false}, {"data": [0.5017421602787456, 500, 1500, "/api/v2/location-area/sunyshore-city-area"], "isController": false}, {"data": [0.5141342756183745, 500, 1500, "/api/v2/encounter-method/gift"], "isController": false}, {"data": [0.531578947368421, 500, 1500, "/api/v2/encounter-method/walk"], "isController": false}, {"data": [0.5274914089347079, 500, 1500, "/api/v2/item-category/collectibles"], "isController": false}, {"data": [0.5266666666666666, 500, 1500, "/api/v2/berry-firmness/soft"], "isController": false}, {"data": [0.5171232876712328, 500, 1500, "/api/v2/item-category/evolution"], "isController": false}, {"data": [0.5251677852348994, 500, 1500, "/api/v2/contest-type/cute"], "isController": false}, {"data": [0.5203389830508475, 500, 1500, "/api/v2/super-contest-effect/7"], "isController": false}, {"data": [0.5176056338028169, 500, 1500, "/api/v2/encounter-method/purple-flowers"], "isController": false}, {"data": [0.5202020202020202, 500, 1500, "/api/v2/super-contest-effect/5"], "isController": false}, {"data": [0.5351170568561873, 500, 1500, "/api/v2/berry-firmness/very-hard"], "isController": false}, {"data": [0.5336700336700336, 500, 1500, "/api/v2/contest-type/beauty"], "isController": false}, {"data": [0.5258620689655172, 500, 1500, "/api/v2/item-fling-effect/paralyze"], "isController": false}, {"data": [0.5266903914590747, 500, 1500, "/api/v2/encounter-condition-value/season-winter"], "isController": false}, {"data": [0.5351170568561873, 500, 1500, "/api/v2/berry-flavor/sweet"], "isController": false}, {"data": [0.5338983050847458, 500, 1500, "/api/v2/super-contest-effect/9"], "isController": false}, {"data": [0.5157342657342657, 500, 1500, "/api/v2/region/unova"], "isController": false}, {"data": [0.5317725752508361, 500, 1500, "/api/v2/berry-flavor/spicy"], "isController": false}, {"data": [0.5380622837370242, 500, 1500, "/api/v2/item-fling-effect/poison"], "isController": false}, {"data": [0.5246478873239436, 500, 1500, "/api/v2/encounter-method/surf"], "isController": false}, {"data": [0.5085616438356164, 500, 1500, "/api/v2/item-attribute/countable"], "isController": false}, {"data": [0.5295138888888888, 500, 1500, "/api/v2/location/eterna-forest"], "isController": false}, {"data": [0.5121951219512195, 500, 1500, "/api/v2/location/pinwheel-forest"], "isController": false}, {"data": [0.5141843971631206, 500, 1500, "/api/v2/encounter-condition/season"], "isController": false}, {"data": [0.527681660899654, 500, 1500, "/api/v2/location/chargestone-cave"], "isController": false}, {"data": [0.5083333333333333, 500, 1500, "/api/v2/berry/pinap"], "isController": false}, {"data": [0.44947735191637633, 500, 1500, "/api/v2/location-area/valley-windworks-area"], "isController": false}, {"data": [0.5344827586206896, 500, 1500, "/api/v2/item-fling-effect/berry-effect"], "isController": false}, {"data": [0.5334448160535117, 500, 1500, "/api/v2/berry-firmness/super-hard"], "isController": false}, {"data": [0.5303030303030303, 500, 1500, "/api/v2/berry-flavor/sour"], "isController": false}, {"data": [0.5327586206896552, 500, 1500, "/api/v2/item-pocket/pokeballs"], "isController": false}, {"data": [0.45818815331010454, 500, 1500, "/api/v2/location-area/fuego-ironworks-area"], "isController": false}, {"data": [0.5295138888888888, 500, 1500, "/api/v2/location/spring-path"], "isController": false}, {"data": [0.5195729537366548, 500, 1500, "/api/v2/encounter-condition-value/slot2-ruby"], "isController": false}, {"data": [0.49477351916376305, 500, 1500, "/api/v2/pal-park-area/forest"], "isController": false}, {"data": [0.4929328621908127, 500, 1500, "/api/v2/region/alola"], "isController": false}, {"data": [0.5177304964539007, 500, 1500, "/api/v2/encounter-condition/swarm"], "isController": false}, {"data": [0.5189655172413793, 500, 1500, "/api/v2/item-category/training"], "isController": false}, {"data": [0.5304054054054054, 500, 1500, "/api/v2/contest-type/tough"], "isController": false}, {"data": [0.5217391304347826, 500, 1500, "/api/v2/berry-flavor/dry"], "isController": false}, {"data": [0.4876760563380282, 500, 1500, "/api/v2/pal-park-area/mountain"], "isController": false}, {"data": [0.5211267605633803, 500, 1500, "/api/v2/region/hisui"], "isController": false}, {"data": [0.5295138888888888, 500, 1500, "/api/v2/item-category/plates"], "isController": false}, {"data": [0.49829931972789115, 500, 1500, "/api/v2/item/premier-ball"], "isController": false}, {"data": [0.526595744680851, 500, 1500, "/api/v2/encounter-condition/starter"], "isController": false}, {"data": [0.47909407665505227, 500, 1500, "/api/v2/location-area/eterna-forest-area"], "isController": false}, {"data": [0.526595744680851, 500, 1500, "/api/v2/encounter-condition-value/swarm-yes"], "isController": false}, {"data": [0.4842105263157895, 500, 1500, "/api/v2/pal-park-area/field"], "isController": false}, {"data": [0.5364583333333334, 500, 1500, "/api/v2/location/sunyshore-city"], "isController": false}, {"data": [0.5068493150684932, 500, 1500, "/api/v2/item-attribute/consumable"], "isController": false}, {"data": [0.5206896551724138, 500, 1500, "/api/v2/item-pocket/key"], "isController": false}, {"data": [0.5380622837370242, 500, 1500, "/api/v2/item-pocket/machines"], "isController": false}, {"data": [0.53, 500, 1500, "/api/v2/berry-firmness/very-soft"], "isController": false}, {"data": [0.5367892976588629, 500, 1500, "/api/v2/berry-firmness/hard"], "isController": false}, {"data": [0.5083056478405316, 500, 1500, "/api/v2/berry/iapapa"], "isController": false}, {"data": [0.5371621621621622, 500, 1500, "/api/v2/contest-type/smart"], "isController": false}, {"data": [0.52, 500, 1500, "/api/v2/berry/lum"], "isController": false}, {"data": [0.5257731958762887, 500, 1500, "/api/v2/item-fling-effect/flinch"], "isController": false}, {"data": [0.48135593220338985, 500, 1500, "/api/v2/item/ultra-ball"], "isController": false}, {"data": [0.4721254355400697, 500, 1500, "/api/v2/location-area/pastoria-city-area"], "isController": false}, {"data": [0.5275862068965518, 500, 1500, "/api/v2/item-category/choice"], "isController": false}, {"data": [0.5, 500, 1500, "/api/v2/berry/rawst"], "isController": false}, {"data": [0.522887323943662, 500, 1500, "/api/v2/encounter-condition/radar"], "isController": false}, {"data": [0.5195035460992907, 500, 1500, "/api/v2/encounter-condition-value/time-night"], "isController": false}, {"data": [0.4931972789115646, 500, 1500, "/api/v2/item/ice-heal"], "isController": false}, {"data": [0.5265017667844523, 500, 1500, "/api/v2/encounter-method/headbutt"], "isController": false}, {"data": [0.5347222222222222, 500, 1500, "/api/v2/item-fling-effect/burn"], "isController": false}, {"data": [0.5329861111111112, 500, 1500, "/api/v2/item-pocket/medicine"], "isController": false}, {"data": [0.5087412587412588, 500, 1500, "/api/v2/pal-park-area/pond"], "isController": false}, {"data": [0.4846938775510204, 500, 1500, "/api/v2/item/antidote"], "isController": false}, {"data": [0.5389830508474577, 500, 1500, "/api/v2/contest-effect/9"], "isController": false}, {"data": [0.5159574468085106, 500, 1500, "/api/v2/encounter-condition-value/item-claw-fossil"], "isController": false}, {"data": [0.5287162162162162, 500, 1500, "/api/v2/contest-effect/7"], "isController": false}, {"data": [0.5034965034965035, 500, 1500, "/api/v2/pal-park-area/sea"], "isController": false}, {"data": [0.526595744680851, 500, 1500, "/api/v2/encounter-condition/weekday"], "isController": false}, {"data": [0.535234899328859, 500, 1500, "/api/v2/contest-type/cool"], "isController": false}, {"data": [0.5318791946308725, 500, 1500, "/api/v2/berry-flavor/bitter"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 26179, 297, 1.134497116009015, 1024.2523014630037, 21, 11146, 1031.0, 1278.0, 1591.9500000000007, 3336.9600000000064, 86.77249027998289, 463.15736483955754, 12.155906060136495], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/api/v2/item-attribute/underground", 293, 0, 0.0, 1012.8020477815693, 28, 4183, 1008.0, 1240.6000000000001, 1331.6, 3211.94, 0.9803691943238967, 4.358671535959139, 0.14169398511712566], "isController": false}, {"data": ["/api/v2/item-attribute/holdable", 292, 0, 0.0, 1108.5102739726026, 41, 5226, 1079.5, 1351.8, 1861.599999999998, 3450.6899999999905, 0.9793235289185518, 12.223533556294333, 0.13867374188788087], "isController": false}, {"data": ["/api/v2/region/paldea", 284, 0, 0.0, 1072.9788732394375, 170, 3985, 1030.5, 1273.5, 1988.5, 3430.0999999999867, 0.9673255152541104, 6.227603721393221, 0.12752826617119617], "isController": false}, {"data": ["/api/v2/region/johto", 285, 0, 0.0, 1117.6350877192992, 111, 5657, 1031.0, 1313.0000000000002, 2287.299999999999, 4046.239999999979, 0.9688670714377987, 6.838447311903806, 0.1267853394264307], "isController": false}, {"data": ["/api/v2/item/poke-ball", 293, 0, 0.0, 1173.9419795221843, 59, 4084, 1121.0, 1580.0000000000007, 2060.0, 3370.5200000000013, 0.984493389110092, 19.092869038018918, 0.13075302824118407], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 297, 297, 100.0, 942.5420875420876, 25, 3127, 955.0, 1177.8, 1233.3999999999987, 2887.439999999998, 0.9905447996398019, 0.9586750577400904, 0.13929536244934715], "isController": false}, {"data": ["/api/v2/super-contest-effect/1", 297, 0, 0.0, 968.4444444444446, 25, 4220, 974.0, 1183.6, 1280.1999999999994, 3724.479999999994, 0.9880962678572617, 2.2679578751189378, 0.13895103766742745], "isController": false}, {"data": ["/api/v2/berry/razz", 300, 0, 0.0, 1035.4699999999998, 23, 4596, 984.5, 1231.3000000000006, 2233.2999999999993, 3410.130000000001, 1.0021780669989444, 1.901378422855673, 0.12918701644908268], "isController": false}, {"data": ["/api/v2/item-pocket/battle", 289, 0, 0.0, 976.5813148788933, 59, 4194, 969.0, 1160.0, 1252.5, 3379.300000000008, 0.9735950248957344, 1.7745172135137683, 0.13310869480996368], "isController": false}, {"data": ["/api/v2/contest-effect/5", 297, 0, 0.0, 917.5521885521891, 26, 3372, 955.0, 1149.7999999999997, 1206.3999999999999, 2212.2999999999906, 0.9952482759082897, 1.4120523424776654, 0.1341252559329531], "isController": false}, {"data": ["/api/v2/item-attribute/usable-overworld", 293, 0, 0.0, 979.2525597269624, 64, 2957, 996.0, 1215.2000000000003, 1314.3000000000002, 2759.0600000000004, 0.9812458137977227, 3.835784441979236, 0.1466119233506363], "isController": false}, {"data": ["/api/v2/contest-effect/3", 297, 0, 0.0, 957.6363636363635, 23, 4482, 964.0, 1159.0, 1254.2999999999995, 3291.5799999999876, 0.9938461847349243, 1.448414609329773, 0.13393630223966752], "isController": false}, {"data": ["/api/v2/contest-effect/1", 297, 0, 0.0, 976.4949494949495, 22, 5969, 961.0, 1170.0, 1280.9999999999995, 3505.1599999999917, 0.991563364905334, 1.3871545282228315, 0.13362865659857043], "isController": false}, {"data": ["/api/v2/location-area/sunyshore-city-area", 287, 0, 0.0, 1147.5087108013938, 99, 5620, 1108.0, 1356.2, 2067.6, 5207.0, 0.9701091457293226, 14.837687478028887, 0.1468426929570752], "isController": false}, {"data": ["/api/v2/encounter-method/gift", 283, 0, 0.0, 1026.837455830388, 21, 7699, 968.0, 1197.6, 1374.2, 3270.8400000000056, 0.9611661696679052, 1.2615206474540983, 0.13422535377198283], "isController": false}, {"data": ["/api/v2/encounter-method/walk", 285, 0, 0.0, 950.4736842105265, 31, 3977, 972.0, 1165.6000000000001, 1255.6999999999998, 2829.8999999999987, 0.9618727155523006, 1.4195862280920832, 0.13432402180076072], "isController": false}, {"data": ["/api/v2/item-category/collectibles", 291, 0, 0.0, 981.2302405498284, 32, 3716, 991.0, 1209.2, 1295.0, 3170.879999999999, 0.9786282389736174, 2.0992407276235476, 0.14144236266415564], "isController": false}, {"data": ["/api/v2/berry-firmness/soft", 300, 0, 0.0, 993.9333333333329, 26, 6114, 967.0, 1198.2000000000003, 1312.9, 3592.5000000000023, 0.9995202302894611, 2.7394955889922836, 0.1376292504597793], "isController": false}, {"data": ["/api/v2/item-category/evolution", 292, 0, 0.0, 1015.4383561643835, 45, 3865, 1007.5, 1242.4, 1350.7499999999998, 3131.8999999999983, 0.9827910592939387, 3.5150307395671008, 0.13916474960705186], "isController": false}, {"data": ["/api/v2/contest-type/cute", 298, 0, 0.0, 976.1275167785234, 40, 4355, 947.0, 1198.1, 1295.05, 3152.0599999999936, 0.9958994342088114, 1.7081709183161948, 0.1351855677295164], "isController": false}, {"data": ["/api/v2/super-contest-effect/7", 295, 0, 0.0, 993.6677966101697, 26, 5462, 972.0, 1196.0000000000002, 1341.8, 3944.7200000000144, 0.9890235152913093, 2.8326939167091334, 0.13908143183784039], "isController": false}, {"data": ["/api/v2/encounter-method/purple-flowers", 284, 0, 0.0, 1016.5774647887323, 71, 3462, 966.5, 1210.0, 1317.5, 3423.4499999999994, 0.9646608062390457, 1.409564562004932, 0.14413388999470117], "isController": false}, {"data": ["/api/v2/super-contest-effect/5", 297, 0, 0.0, 1030.6464646464651, 31, 5148, 1012.0, 1262.0, 1438.2999999999972, 3268.319999999999, 0.9891690979577156, 5.717557277928207, 0.13910190440030373], "isController": false}, {"data": ["/api/v2/berry-firmness/very-hard", 299, 0, 0.0, 958.7959866220732, 29, 4771, 976.0, 1190.0, 1277.0, 2960.0, 0.9975145540375987, 2.336914762965187, 0.142223754774892], "isController": false}, {"data": ["/api/v2/contest-type/beauty", 297, 0, 0.0, 958.7441077441082, 22, 3980, 953.0, 1164.6, 1269.5999999999995, 3472.719999999993, 0.997075915413048, 1.7134685085993602, 0.1372926797590232], "isController": false}, {"data": ["/api/v2/item-fling-effect/paralyze", 290, 0, 0.0, 939.1931034482759, 22, 3728, 950.0, 1153.9, 1237.1999999999998, 2483.2199999999834, 0.9779687252346283, 1.2656323505731233, 0.14134704231906733], "isController": false}, {"data": ["/api/v2/encounter-condition-value/season-winter", 281, 0, 0.0, 961.131672597865, 53, 3347, 973.0, 1161.8, 1225.9, 3112.6600000000003, 0.9584261346776312, 1.4124581328085295, 0.15069004656552598], "isController": false}, {"data": ["/api/v2/berry-flavor/sweet", 299, 0, 0.0, 977.9866220735786, 26, 5707, 982.0, 1194.0, 1328.0, 3132.0, 0.9972350906683476, 4.013019843185615, 0.13634073505231314], "isController": false}, {"data": ["/api/v2/super-contest-effect/9", 295, 0, 0.0, 952.1525423728816, 25, 3483, 955.0, 1159.2, 1254.8, 3103.160000000006, 0.9906941911737545, 1.8861363892051273, 0.1393163706338092], "isController": false}, {"data": ["/api/v2/region/unova", 286, 0, 0.0, 1060.9475524475522, 39, 3561, 1065.5, 1278.2, 1401.1999999999998, 2978.349999999998, 0.9607567807257409, 10.50706676398808, 0.1257240318527825], "isController": false}, {"data": ["/api/v2/berry-flavor/spicy", 299, 0, 0.0, 970.4013377926414, 27, 4464, 986.0, 1184.0, 1262.0, 3477.0, 0.9939432621284348, 3.9996789006455646, 0.13589068036912194], "isController": false}, {"data": ["/api/v2/item-fling-effect/poison", 289, 0, 0.0, 918.653979238754, 72, 2380, 943.0, 1176.0, 1232.5, 2313.000000000001, 0.9740183142405522, 1.2578908596048655, 0.13887370496007873], "isController": false}, {"data": ["/api/v2/encounter-method/surf", 284, 0, 0.0, 962.4366197183103, 22, 3342, 973.0, 1168.5, 1235.75, 2972.0499999999993, 0.9717208697586095, 1.3452113770892855, 0.13569930114793083], "isController": false}, {"data": ["/api/v2/item-attribute/countable", 292, 0, 0.0, 1063.2500000000005, 31, 4356, 1024.5, 1304.4, 2003.5499999999988, 3442.8999999999996, 0.9735734814587599, 5.627341853698913, 0.13881028153611225], "isController": false}, {"data": ["/api/v2/location/eterna-forest", 288, 0, 0.0, 974.9131944444445, 23, 3509, 992.0, 1184.2, 1258.3500000000004, 3107.53, 0.9635587436264604, 1.5226843276584854, 0.135500448322471], "isController": false}, {"data": ["/api/v2/location/pinwheel-forest", 287, 0, 0.0, 998.0278745644597, 61, 3755, 973.0, 1192.6, 1725.7999999999984, 3239.6000000000004, 0.9711990416600398, 1.7648223384662498, 0.13847173836168533], "isController": false}, {"data": ["/api/v2/encounter-condition/season", 282, 0, 0.0, 1010.8014184397159, 109, 3462, 982.5, 1202.3000000000002, 1314.7499999999995, 3426.02, 0.9602876776702467, 1.661468478216453, 0.13879157841327786], "isController": false}, {"data": ["/api/v2/location/chargestone-cave", 289, 0, 0.0, 991.3529411764703, 29, 4402, 981.0, 1175.0, 1295.0, 3402.2000000000135, 0.9741003896401559, 1.9482666111081148, 0.13983667702842079], "isController": false}, {"data": ["/api/v2/berry/pinap", 300, 0, 0.0, 1042.8899999999996, 31, 4874, 996.0, 1242.1000000000004, 2193.2, 3549.680000000001, 1.0028011579010703, 1.8847210342974712, 0.13024663476644763], "isController": false}, {"data": ["/api/v2/location-area/valley-windworks-area", 287, 0, 0.0, 1362.8501742160283, 119, 10584, 1277.0, 1811.7999999999993, 2504.799999999998, 5194.680000000015, 0.9668931734646781, 34.22279973372537, 0.14824436350972114], "isController": false}, {"data": ["/api/v2/item-fling-effect/berry-effect", 290, 0, 0.0, 985.4965517241378, 27, 5825, 977.5, 1202.9, 1263.9499999999998, 3557.579999999996, 0.9778170403164081, 2.840239763267123, 0.14514471692196682], "isController": false}, {"data": ["/api/v2/berry-firmness/super-hard", 299, 0, 0.0, 992.6086956521739, 25, 5446, 972.0, 1174.0, 1289.0, 3923.0, 1.0018831382062605, 2.420293719926752, 0.14382502081671905], "isController": false}, {"data": ["/api/v2/berry-flavor/sour", 297, 0, 0.0, 969.1010101010095, 30, 3231, 989.0, 1220.2, 1265.3, 2849.9399999999946, 0.9952516110007137, 3.934102044077583, 0.13509763079013595], "isController": false}, {"data": ["/api/v2/item-pocket/pokeballs", 290, 0, 0.0, 957.6448275862069, 37, 3639, 966.0, 1182.0000000000005, 1250.05, 3253.2699999999973, 0.9761614638382669, 1.763027284975192, 0.13631942317272672], "isController": false}, {"data": ["/api/v2/location-area/fuego-ironworks-area", 287, 0, 0.0, 1326.2543554006968, 82, 11146, 1241.0, 1908.8, 2238.7999999999975, 4141.680000000033, 0.967476605269545, 28.66740355467591, 0.14738901408403224], "isController": false}, {"data": ["/api/v2/location/spring-path", 288, 0, 0.0, 947.4479166666662, 38, 3428, 963.5, 1162.1, 1243.0, 3295.8200000000006, 0.9715189766666779, 1.4537140677128488, 0.13472235809244948], "isController": false}, {"data": ["/api/v2/encounter-condition-value/slot2-ruby", 281, 0, 0.0, 976.5302491103207, 101, 4267, 980.0, 1152.6, 1227.8, 2893.840000000001, 0.959113110495974, 1.4251734712641522, 0.1479881557210585], "isController": false}, {"data": ["/api/v2/pal-park-area/forest", 287, 0, 0.0, 1128.515679442508, 53, 3807, 1080.0, 1401.2, 2087.1999999999975, 3286.6400000000003, 0.9623703147319782, 11.817813679909598, 0.13345369598822354], "isController": false}, {"data": ["/api/v2/region/alola", 283, 0, 0.0, 1148.1166077738505, 226, 5036, 1069.0, 1396.9999999999998, 2550.200000000002, 3844.440000000007, 0.9633321078931961, 9.020065811028621, 0.12606103755633621], "isController": false}, {"data": ["/api/v2/encounter-condition/swarm", 282, 0, 0.0, 996.081560283688, 23, 3572, 976.0, 1173.7, 1258.0499999999988, 3422.2300000000005, 0.9561266698311521, 1.4727737262239777, 0.1372564652980267], "isController": false}, {"data": ["/api/v2/item-category/training", 290, 0, 0.0, 998.9758620689653, 26, 4630, 972.5, 1202.0, 1291.9999999999998, 3460.6899999999814, 0.9794815502828675, 1.767117178924259, 0.13773959300852825], "isController": false}, {"data": ["/api/v2/contest-type/tough", 296, 0, 0.0, 987.2162162162159, 22, 4750, 957.5, 1185.6, 1338.1999999999994, 3677.419999999994, 0.9947640460011157, 1.710617131786072, 0.13600289691421505], "isController": false}, {"data": ["/api/v2/berry-flavor/dry", 299, 0, 0.0, 1020.0635451505024, 31, 4605, 988.0, 1230.0, 1413.0, 4438.0, 0.994581361079603, 4.084752692479767, 0.13403537873924337], "isController": false}, {"data": ["/api/v2/pal-park-area/mountain", 284, 0, 0.0, 1166.757042253522, 148, 4873, 1126.0, 1451.0, 2115.75, 3725.149999999991, 0.9595242921819043, 17.091562748116427, 0.13493310358808028], "isController": false}, {"data": ["/api/v2/region/hisui", 284, 0, 0.0, 994.9190140845068, 48, 4262, 983.5, 1193.5, 1276.5, 3154.3999999999996, 0.9636657301464501, 1.9489464730767403, 0.1261046951558831], "isController": false}, {"data": ["/api/v2/item-category/plates", 288, 0, 0.0, 1015.444444444445, 30, 6638, 998.5, 1221.0, 1357.0500000000002, 3700.8600000000115, 0.9706512800463756, 2.44784737330136, 0.13460203297518097], "isController": false}, {"data": ["/api/v2/item/premier-ball", 294, 0, 0.0, 1161.4251700680277, 59, 4754, 1127.0, 1439.5, 2054.0, 3627.400000000007, 0.9831099043306996, 18.156360401319507, 0.13344948896676487], "isController": false}, {"data": ["/api/v2/encounter-condition/starter", 282, 0, 0.0, 986.1134751773046, 26, 3666, 972.0, 1211.0, 1306.4499999999994, 3212.520000000001, 0.9636841439785119, 1.694917132134082, 0.1402235717312483], "isController": false}, {"data": ["/api/v2/location-area/eterna-forest-area", 287, 0, 0.0, 1287.2752613240418, 69, 10752, 1231.0, 1618.599999999999, 2294.599999999995, 3934.0400000000022, 0.9650497320053532, 28.573790419863883, 0.14513443235236756], "isController": false}, {"data": ["/api/v2/encounter-condition-value/swarm-yes", 282, 0, 0.0, 957.5673758865245, 24, 3876, 961.0, 1145.4, 1238.0499999999995, 3187.4300000000044, 0.952647989811396, 1.4229117067178574, 0.14606028750038005], "isController": false}, {"data": ["/api/v2/pal-park-area/field", 285, 0, 0.0, 1187.4701754385958, 133, 6168, 1169.0, 1494.4000000000008, 1925.8999999999996, 3537.7199999999684, 0.9719896457524052, 19.86748967474157, 0.13383841801864174], "isController": false}, {"data": ["/api/v2/location/sunyshore-city", 288, 0, 0.0, 946.9999999999994, 67, 4253, 963.0, 1184.0, 1236.95, 2776.1800000000057, 0.9742368478025547, 1.5335231664558076, 0.13795345989391644], "isController": false}, {"data": ["/api/v2/item-attribute/consumable", 292, 0, 0.0, 1069.0034246575347, 43, 4467, 1014.0, 1301.8, 2276.5999999999967, 3394.1699999999964, 0.9752089852816919, 5.51522676009358, 0.13999582112930536], "isController": false}, {"data": ["/api/v2/item-pocket/key", 290, 0, 0.0, 984.2965517241381, 55, 3714, 974.0, 1196.8000000000002, 1274.4499999999996, 3037.7199999999875, 0.9762271848974289, 2.0467568112885526, 0.13060851985444116], "isController": false}, {"data": ["/api/v2/item-pocket/machines", 289, 0, 0.0, 945.8927335640136, 31, 4824, 967.0, 1150.0, 1203.5, 3125.300000000003, 0.9766945142888042, 1.6491951036005894, 0.13544005959864275], "isController": false}, {"data": ["/api/v2/berry-firmness/very-soft", 300, 0, 0.0, 995.6400000000003, 23, 4063, 975.0, 1180.9, 1638.3999999999971, 3404.330000000001, 0.9975957941361319, 2.168342004103444, 0.14223533783581568], "isController": false}, {"data": ["/api/v2/berry-firmness/hard", 299, 0, 0.0, 963.026755852843, 26, 6783, 957.0, 1185.0, 1253.0, 3590.0, 1.0010747324050233, 2.562903155436104, 0.1378432981143636], "isController": false}, {"data": ["/api/v2/berry/iapapa", 301, 0, 0.0, 1053.8837209302321, 42, 5686, 991.0, 1240.8, 2279.199999999999, 4061.4600000000105, 0.9994388532684306, 1.8743791121015112, 0.13078594368942356], "isController": false}, {"data": ["/api/v2/contest-type/smart", 296, 0, 0.0, 947.3851351351351, 21, 3409, 953.0, 1197.5, 1272.15, 3269.0499999999993, 0.9942461363796676, 1.7088244645430328, 0.13593208895815767], "isController": false}, {"data": ["/api/v2/berry/lum", 300, 0, 0.0, 1004.3366666666661, 30, 5848, 978.0, 1226.4, 1325.6499999999996, 3283.79, 1.0042715014528463, 1.890256688657423, 0.1284761393460184], "isController": false}, {"data": ["/api/v2/item-fling-effect/flinch", 291, 0, 0.0, 955.6357388316154, 27, 3225, 959.0, 1163.6, 1249.8, 3055.3599999999997, 0.981344340577071, 1.3645864685345934, 0.1399182360588402], "isController": false}, {"data": ["/api/v2/item/ultra-ball", 295, 0, 0.0, 1206.962711864407, 90, 6682, 1147.0, 1677.0000000000005, 2301.3999999999996, 4168.360000000022, 0.9805322794550234, 18.661608624487712, 0.1311844944192756], "isController": false}, {"data": ["/api/v2/location-area/pastoria-city-area", 287, 0, 0.0, 1213.2822299651564, 74, 4209, 1127.0, 1792.4, 2559.399999999994, 3524.560000000001, 0.9658811730576365, 14.774348981996582, 0.14525947329187114], "isController": false}, {"data": ["/api/v2/item-category/choice", 290, 0, 0.0, 977.6172413793104, 115, 4251, 976.5, 1191.4, 1245.45, 3396.609999999992, 0.9717814765046696, 1.436224693888835, 0.13475875943717097], "isController": false}, {"data": ["/api/v2/berry/rawst", 300, 0, 0.0, 1036.6799999999996, 27, 4028, 986.5, 1254.5000000000005, 2152.649999999999, 3475.3700000000017, 1.0023153484549308, 1.8782188939784235, 0.13018353646924394], "isController": false}, {"data": ["/api/v2/encounter-condition/radar", 284, 0, 0.0, 985.6549295774648, 61, 4028, 967.0, 1199.0, 1287.0, 3270.9999999999995, 0.9684107152599706, 1.5033982286438157, 0.13901989760079655], "isController": false}, {"data": ["/api/v2/encounter-condition-value/time-night", 282, 0, 0.0, 981.7482269503544, 77, 3513, 985.5, 1171.7, 1254.4999999999995, 3376.050000000001, 0.9602124725471168, 1.4049152631646151, 0.1481577838500434], "isController": false}, {"data": ["/api/v2/item/ice-heal", 294, 0, 0.0, 1163.3707482993195, 98, 5514, 1122.0, 1467.0, 2090.0, 4445.150000000009, 0.9885243751954352, 17.394349487287037, 0.13032303774549195], "isController": false}, {"data": ["/api/v2/encounter-method/headbutt", 283, 0, 0.0, 989.7915194346288, 30, 3643, 974.0, 1201.0, 1282.2, 3615.2000000000007, 0.9627618678260633, 1.3934984019173589, 0.1382089790726868], "isController": false}, {"data": ["/api/v2/item-fling-effect/burn", 288, 0, 0.0, 938.2673611111111, 25, 3304, 953.5, 1158.5, 1232.55, 2701.4300000000017, 0.9687184661957619, 1.245039995375042, 0.136226034308779], "isController": false}, {"data": ["/api/v2/item-pocket/medicine", 288, 0, 0.0, 947.0972222222223, 23, 3953, 964.5, 1176.1, 1243.2500000000002, 3065.2100000000014, 0.9661511624006173, 1.9571742175181994, 0.1339779932235231], "isController": false}, {"data": ["/api/v2/pal-park-area/pond", 286, 0, 0.0, 1064.8776223776224, 35, 5445, 1023.0, 1276.2, 1782.8999999999985, 3909.2099999999973, 0.9676840883637681, 6.344069530301031, 0.13230055895598392], "isController": false}, {"data": ["/api/v2/item/antidote", 294, 0, 0.0, 1212.401360544218, 76, 10464, 1114.0, 1596.5, 2134.25, 4256.400000000003, 0.9847563732829566, 17.442378197108702, 0.12982627968085855], "isController": false}, {"data": ["/api/v2/contest-effect/9", 295, 0, 0.0, 954.5084745762707, 24, 5691, 958.0, 1174.4000000000003, 1249.2, 3466.8800000000047, 0.9939754976616305, 1.411453103730609, 0.13395372917705567], "isController": false}, {"data": ["/api/v2/encounter-condition-value/item-claw-fossil", 282, 0, 0.0, 991.3687943262411, 31, 4904, 957.5, 1194.0, 1346.6999999999994, 3478.5100000000098, 0.9604021428547103, 1.4021296576949667, 0.15381440569157467], "isController": false}, {"data": ["/api/v2/contest-effect/7", 296, 0, 0.0, 964.2195945945946, 28, 4177, 958.0, 1186.3, 1230.7499999999995, 3285.5899999999956, 0.990559565760104, 1.4177527579219666, 0.13349337897938898], "isController": false}, {"data": ["/api/v2/pal-park-area/sea", 286, 0, 0.0, 1099.709790209791, 82, 6493, 1028.0, 1302.3, 1989.0499999999993, 3665.8599999999915, 0.9685820433017133, 7.562863509306516, 0.13147744533099429], "isController": false}, {"data": ["/api/v2/encounter-condition/weekday", 282, 0, 0.0, 977.9326241134747, 95, 3591, 965.0, 1203.2, 1290.2499999999998, 3364.310000000002, 0.9597582226094532, 1.6738668918298027, 0.13965231950078957], "isController": false}, {"data": ["/api/v2/contest-type/cool", 298, 0, 0.0, 952.0637583892623, 24, 3667, 963.0, 1158.2, 1257.3500000000001, 2957.6599999999958, 0.9934492357441702, 1.7022493770106515, 0.13485297243011685], "isController": false}, {"data": ["/api/v2/berry-flavor/bitter", 298, 0, 0.0, 1017.4026845637583, 26, 5452, 997.0, 1200.4, 1327.7500000000007, 3871.2299999999996, 0.9979772541560059, 3.9409099823679523, 0.13741678987890316], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 297, 100.0, 1.134497116009015], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 26179, 297, "404/Not Found", 297, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/api/v2/super-contest-effect/3", 297, 297, "404/Not Found", 297, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
