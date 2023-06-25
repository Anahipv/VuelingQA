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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 324.0, "minX": 0.0, "maxY": 3363.0, "series": [{"data": [[0.0, 324.0], [0.1, 326.0], [0.2, 327.0], [0.3, 328.0], [0.4, 329.0], [0.5, 329.0], [0.6, 330.0], [0.7, 330.0], [0.8, 330.0], [0.9, 330.0], [1.0, 331.0], [1.1, 331.0], [1.2, 331.0], [1.3, 332.0], [1.4, 332.0], [1.5, 332.0], [1.6, 332.0], [1.7, 332.0], [1.8, 332.0], [1.9, 333.0], [2.0, 333.0], [2.1, 333.0], [2.2, 333.0], [2.3, 333.0], [2.4, 333.0], [2.5, 333.0], [2.6, 333.0], [2.7, 334.0], [2.8, 334.0], [2.9, 334.0], [3.0, 334.0], [3.1, 334.0], [3.2, 334.0], [3.3, 334.0], [3.4, 334.0], [3.5, 334.0], [3.6, 334.0], [3.7, 335.0], [3.8, 335.0], [3.9, 335.0], [4.0, 335.0], [4.1, 335.0], [4.2, 335.0], [4.3, 335.0], [4.4, 335.0], [4.5, 335.0], [4.6, 335.0], [4.7, 336.0], [4.8, 336.0], [4.9, 336.0], [5.0, 336.0], [5.1, 336.0], [5.2, 336.0], [5.3, 336.0], [5.4, 336.0], [5.5, 336.0], [5.6, 336.0], [5.7, 337.0], [5.8, 337.0], [5.9, 337.0], [6.0, 337.0], [6.1, 337.0], [6.2, 337.0], [6.3, 337.0], [6.4, 337.0], [6.5, 337.0], [6.6, 337.0], [6.7, 337.0], [6.8, 338.0], [6.9, 338.0], [7.0, 338.0], [7.1, 338.0], [7.2, 338.0], [7.3, 338.0], [7.4, 338.0], [7.5, 338.0], [7.6, 338.0], [7.7, 338.0], [7.8, 338.0], [7.9, 338.0], [8.0, 339.0], [8.1, 339.0], [8.2, 339.0], [8.3, 339.0], [8.4, 339.0], [8.5, 339.0], [8.6, 339.0], [8.7, 339.0], [8.8, 339.0], [8.9, 339.0], [9.0, 339.0], [9.1, 339.0], [9.2, 340.0], [9.3, 340.0], [9.4, 340.0], [9.5, 340.0], [9.6, 340.0], [9.7, 340.0], [9.8, 340.0], [9.9, 340.0], [10.0, 340.0], [10.1, 340.0], [10.2, 340.0], [10.3, 340.0], [10.4, 340.0], [10.5, 340.0], [10.6, 340.0], [10.7, 340.0], [10.8, 341.0], [10.9, 341.0], [11.0, 341.0], [11.1, 341.0], [11.2, 341.0], [11.3, 341.0], [11.4, 341.0], [11.5, 341.0], [11.6, 341.0], [11.7, 341.0], [11.8, 341.0], [11.9, 341.0], [12.0, 341.0], [12.1, 341.0], [12.2, 341.0], [12.3, 342.0], [12.4, 342.0], [12.5, 342.0], [12.6, 342.0], [12.7, 342.0], [12.8, 342.0], [12.9, 342.0], [13.0, 342.0], [13.1, 342.0], [13.2, 342.0], [13.3, 342.0], [13.4, 342.0], [13.5, 342.0], [13.6, 342.0], [13.7, 342.0], [13.8, 342.0], [13.9, 342.0], [14.0, 343.0], [14.1, 343.0], [14.2, 343.0], [14.3, 343.0], [14.4, 343.0], [14.5, 343.0], [14.6, 343.0], [14.7, 343.0], [14.8, 343.0], [14.9, 343.0], [15.0, 343.0], [15.1, 343.0], [15.2, 343.0], [15.3, 343.0], [15.4, 343.0], [15.5, 343.0], [15.6, 343.0], [15.7, 344.0], [15.8, 344.0], [15.9, 344.0], [16.0, 344.0], [16.1, 344.0], [16.2, 344.0], [16.3, 344.0], [16.4, 344.0], [16.5, 344.0], [16.6, 344.0], [16.7, 344.0], [16.8, 344.0], [16.9, 344.0], [17.0, 344.0], [17.1, 344.0], [17.2, 344.0], [17.3, 344.0], [17.4, 344.0], [17.5, 345.0], [17.6, 345.0], [17.7, 345.0], [17.8, 345.0], [17.9, 345.0], [18.0, 345.0], [18.1, 345.0], [18.2, 345.0], [18.3, 345.0], [18.4, 345.0], [18.5, 345.0], [18.6, 345.0], [18.7, 345.0], [18.8, 345.0], [18.9, 345.0], [19.0, 345.0], [19.1, 345.0], [19.2, 345.0], [19.3, 345.0], [19.4, 345.0], [19.5, 345.0], [19.6, 345.0], [19.7, 346.0], [19.8, 346.0], [19.9, 346.0], [20.0, 346.0], [20.1, 346.0], [20.2, 346.0], [20.3, 346.0], [20.4, 346.0], [20.5, 346.0], [20.6, 346.0], [20.7, 346.0], [20.8, 346.0], [20.9, 346.0], [21.0, 346.0], [21.1, 346.0], [21.2, 346.0], [21.3, 346.0], [21.4, 346.0], [21.5, 347.0], [21.6, 347.0], [21.7, 347.0], [21.8, 347.0], [21.9, 347.0], [22.0, 347.0], [22.1, 347.0], [22.2, 347.0], [22.3, 347.0], [22.4, 347.0], [22.5, 347.0], [22.6, 347.0], [22.7, 347.0], [22.8, 347.0], [22.9, 347.0], [23.0, 347.0], [23.1, 347.0], [23.2, 347.0], [23.3, 347.0], [23.4, 348.0], [23.5, 348.0], [23.6, 348.0], [23.7, 348.0], [23.8, 348.0], [23.9, 348.0], [24.0, 348.0], [24.1, 348.0], [24.2, 348.0], [24.3, 348.0], [24.4, 348.0], [24.5, 348.0], [24.6, 348.0], [24.7, 348.0], [24.8, 348.0], [24.9, 348.0], [25.0, 348.0], [25.1, 348.0], [25.2, 349.0], [25.3, 349.0], [25.4, 349.0], [25.5, 349.0], [25.6, 349.0], [25.7, 349.0], [25.8, 349.0], [25.9, 349.0], [26.0, 349.0], [26.1, 349.0], [26.2, 349.0], [26.3, 349.0], [26.4, 349.0], [26.5, 349.0], [26.6, 349.0], [26.7, 349.0], [26.8, 349.0], [26.9, 349.0], [27.0, 349.0], [27.1, 349.0], [27.2, 350.0], [27.3, 350.0], [27.4, 350.0], [27.5, 350.0], [27.6, 350.0], [27.7, 350.0], [27.8, 350.0], [27.9, 350.0], [28.0, 350.0], [28.1, 350.0], [28.2, 350.0], [28.3, 350.0], [28.4, 350.0], [28.5, 350.0], [28.6, 350.0], [28.7, 350.0], [28.8, 350.0], [28.9, 350.0], [29.0, 350.0], [29.1, 350.0], [29.2, 350.0], [29.3, 350.0], [29.4, 350.0], [29.5, 351.0], [29.6, 351.0], [29.7, 351.0], [29.8, 351.0], [29.9, 351.0], [30.0, 351.0], [30.1, 351.0], [30.2, 351.0], [30.3, 351.0], [30.4, 351.0], [30.5, 351.0], [30.6, 351.0], [30.7, 351.0], [30.8, 351.0], [30.9, 351.0], [31.0, 351.0], [31.1, 351.0], [31.2, 351.0], [31.3, 351.0], [31.4, 352.0], [31.5, 352.0], [31.6, 352.0], [31.7, 352.0], [31.8, 352.0], [31.9, 352.0], [32.0, 352.0], [32.1, 352.0], [32.2, 352.0], [32.3, 352.0], [32.4, 352.0], [32.5, 352.0], [32.6, 352.0], [32.7, 352.0], [32.8, 352.0], [32.9, 352.0], [33.0, 352.0], [33.1, 352.0], [33.2, 353.0], [33.3, 353.0], [33.4, 353.0], [33.5, 353.0], [33.6, 353.0], [33.7, 353.0], [33.8, 353.0], [33.9, 353.0], [34.0, 353.0], [34.1, 353.0], [34.2, 353.0], [34.3, 353.0], [34.4, 353.0], [34.5, 353.0], [34.6, 353.0], [34.7, 353.0], [34.8, 353.0], [34.9, 353.0], [35.0, 354.0], [35.1, 354.0], [35.2, 354.0], [35.3, 354.0], [35.4, 354.0], [35.5, 354.0], [35.6, 354.0], [35.7, 354.0], [35.8, 354.0], [35.9, 354.0], [36.0, 354.0], [36.1, 354.0], [36.2, 354.0], [36.3, 354.0], [36.4, 354.0], [36.5, 354.0], [36.6, 354.0], [36.7, 355.0], [36.8, 355.0], [36.9, 355.0], [37.0, 355.0], [37.1, 355.0], [37.2, 355.0], [37.3, 355.0], [37.4, 355.0], [37.5, 355.0], [37.6, 355.0], [37.7, 355.0], [37.8, 355.0], [37.9, 355.0], [38.0, 355.0], [38.1, 355.0], [38.2, 356.0], [38.3, 356.0], [38.4, 356.0], [38.5, 356.0], [38.6, 356.0], [38.7, 356.0], [38.8, 356.0], [38.9, 356.0], [39.0, 356.0], [39.1, 356.0], [39.2, 356.0], [39.3, 356.0], [39.4, 356.0], [39.5, 356.0], [39.6, 356.0], [39.7, 356.0], [39.8, 356.0], [39.9, 357.0], [40.0, 357.0], [40.1, 357.0], [40.2, 357.0], [40.3, 357.0], [40.4, 357.0], [40.5, 357.0], [40.6, 357.0], [40.7, 357.0], [40.8, 357.0], [40.9, 357.0], [41.0, 357.0], [41.1, 357.0], [41.2, 357.0], [41.3, 357.0], [41.4, 357.0], [41.5, 358.0], [41.6, 358.0], [41.7, 358.0], [41.8, 358.0], [41.9, 358.0], [42.0, 358.0], [42.1, 358.0], [42.2, 358.0], [42.3, 358.0], [42.4, 358.0], [42.5, 358.0], [42.6, 358.0], [42.7, 358.0], [42.8, 358.0], [42.9, 358.0], [43.0, 358.0], [43.1, 359.0], [43.2, 359.0], [43.3, 359.0], [43.4, 359.0], [43.5, 359.0], [43.6, 359.0], [43.7, 359.0], [43.8, 359.0], [43.9, 359.0], [44.0, 359.0], [44.1, 359.0], [44.2, 359.0], [44.3, 359.0], [44.4, 359.0], [44.5, 360.0], [44.6, 360.0], [44.7, 360.0], [44.8, 360.0], [44.9, 360.0], [45.0, 360.0], [45.1, 360.0], [45.2, 360.0], [45.3, 360.0], [45.4, 360.0], [45.5, 360.0], [45.6, 360.0], [45.7, 360.0], [45.8, 361.0], [45.9, 361.0], [46.0, 361.0], [46.1, 361.0], [46.2, 361.0], [46.3, 361.0], [46.4, 361.0], [46.5, 361.0], [46.6, 361.0], [46.7, 361.0], [46.8, 361.0], [46.9, 361.0], [47.0, 361.0], [47.1, 362.0], [47.2, 362.0], [47.3, 362.0], [47.4, 362.0], [47.5, 362.0], [47.6, 362.0], [47.7, 362.0], [47.8, 362.0], [47.9, 362.0], [48.0, 362.0], [48.1, 362.0], [48.2, 362.0], [48.3, 362.0], [48.4, 363.0], [48.5, 363.0], [48.6, 363.0], [48.7, 363.0], [48.8, 363.0], [48.9, 363.0], [49.0, 363.0], [49.1, 363.0], [49.2, 363.0], [49.3, 363.0], [49.4, 363.0], [49.5, 363.0], [49.6, 363.0], [49.7, 363.0], [49.8, 364.0], [49.9, 364.0], [50.0, 364.0], [50.1, 364.0], [50.2, 364.0], [50.3, 364.0], [50.4, 364.0], [50.5, 364.0], [50.6, 364.0], [50.7, 365.0], [50.8, 365.0], [50.9, 365.0], [51.0, 365.0], [51.1, 365.0], [51.2, 366.0], [51.3, 366.0], [51.4, 366.0], [51.5, 366.0], [51.6, 366.0], [51.7, 366.0], [51.8, 366.0], [51.9, 366.0], [52.0, 366.0], [52.1, 366.0], [52.2, 366.0], [52.3, 366.0], [52.4, 366.0], [52.5, 366.0], [52.6, 366.0], [52.7, 366.0], [52.8, 367.0], [52.9, 367.0], [53.0, 367.0], [53.1, 367.0], [53.2, 367.0], [53.3, 367.0], [53.4, 367.0], [53.5, 367.0], [53.6, 367.0], [53.7, 367.0], [53.8, 367.0], [53.9, 367.0], [54.0, 367.0], [54.1, 367.0], [54.2, 368.0], [54.3, 368.0], [54.4, 368.0], [54.5, 368.0], [54.6, 368.0], [54.7, 368.0], [54.8, 368.0], [54.9, 368.0], [55.0, 368.0], [55.1, 369.0], [55.2, 369.0], [55.3, 369.0], [55.4, 369.0], [55.5, 369.0], [55.6, 369.0], [55.7, 369.0], [55.8, 369.0], [55.9, 370.0], [56.0, 370.0], [56.1, 370.0], [56.2, 370.0], [56.3, 370.0], [56.4, 370.0], [56.5, 370.0], [56.6, 370.0], [56.7, 370.0], [56.8, 370.0], [56.9, 370.0], [57.0, 371.0], [57.1, 371.0], [57.2, 371.0], [57.3, 371.0], [57.4, 371.0], [57.5, 371.0], [57.6, 371.0], [57.7, 371.0], [57.8, 371.0], [57.9, 371.0], [58.0, 371.0], [58.1, 372.0], [58.2, 372.0], [58.3, 372.0], [58.4, 372.0], [58.5, 372.0], [58.6, 372.0], [58.7, 372.0], [58.8, 372.0], [58.9, 372.0], [59.0, 373.0], [59.1, 373.0], [59.2, 373.0], [59.3, 373.0], [59.4, 373.0], [59.5, 373.0], [59.6, 373.0], [59.7, 373.0], [59.8, 373.0], [59.9, 373.0], [60.0, 373.0], [60.1, 373.0], [60.2, 374.0], [60.3, 374.0], [60.4, 374.0], [60.5, 374.0], [60.6, 374.0], [60.7, 374.0], [60.8, 374.0], [60.9, 374.0], [61.0, 374.0], [61.1, 374.0], [61.2, 374.0], [61.3, 375.0], [61.4, 375.0], [61.5, 375.0], [61.6, 375.0], [61.7, 375.0], [61.8, 375.0], [61.9, 375.0], [62.0, 375.0], [62.1, 376.0], [62.2, 376.0], [62.3, 376.0], [62.4, 376.0], [62.5, 376.0], [62.6, 376.0], [62.7, 376.0], [62.8, 376.0], [62.9, 377.0], [63.0, 377.0], [63.1, 377.0], [63.2, 377.0], [63.3, 377.0], [63.4, 377.0], [63.5, 378.0], [63.6, 378.0], [63.7, 378.0], [63.8, 378.0], [63.9, 378.0], [64.0, 378.0], [64.1, 379.0], [64.2, 379.0], [64.3, 379.0], [64.4, 379.0], [64.5, 379.0], [64.6, 379.0], [64.7, 379.0], [64.8, 379.0], [64.9, 379.0], [65.0, 380.0], [65.1, 380.0], [65.2, 380.0], [65.3, 380.0], [65.4, 380.0], [65.5, 380.0], [65.6, 380.0], [65.7, 381.0], [65.8, 381.0], [65.9, 381.0], [66.0, 381.0], [66.1, 381.0], [66.2, 381.0], [66.3, 381.0], [66.4, 381.0], [66.5, 382.0], [66.6, 382.0], [66.7, 382.0], [66.8, 382.0], [66.9, 382.0], [67.0, 382.0], [67.1, 382.0], [67.2, 382.0], [67.3, 382.0], [67.4, 383.0], [67.5, 383.0], [67.6, 383.0], [67.7, 383.0], [67.8, 383.0], [67.9, 383.0], [68.0, 383.0], [68.1, 383.0], [68.2, 384.0], [68.3, 384.0], [68.4, 384.0], [68.5, 384.0], [68.6, 384.0], [68.7, 385.0], [68.8, 385.0], [68.9, 385.0], [69.0, 385.0], [69.1, 386.0], [69.2, 386.0], [69.3, 386.0], [69.4, 387.0], [69.5, 387.0], [69.6, 387.0], [69.7, 387.0], [69.8, 388.0], [69.9, 388.0], [70.0, 388.0], [70.1, 388.0], [70.2, 388.0], [70.3, 388.0], [70.4, 388.0], [70.5, 389.0], [70.6, 389.0], [70.7, 389.0], [70.8, 389.0], [70.9, 389.0], [71.0, 390.0], [71.1, 390.0], [71.2, 390.0], [71.3, 390.0], [71.4, 391.0], [71.5, 391.0], [71.6, 391.0], [71.7, 391.0], [71.8, 391.0], [71.9, 392.0], [72.0, 392.0], [72.1, 392.0], [72.2, 393.0], [72.3, 393.0], [72.4, 393.0], [72.5, 394.0], [72.6, 394.0], [72.7, 394.0], [72.8, 394.0], [72.9, 394.0], [73.0, 395.0], [73.1, 395.0], [73.2, 395.0], [73.3, 395.0], [73.4, 396.0], [73.5, 396.0], [73.6, 396.0], [73.7, 396.0], [73.8, 396.0], [73.9, 397.0], [74.0, 397.0], [74.1, 398.0], [74.2, 398.0], [74.3, 398.0], [74.4, 398.0], [74.5, 399.0], [74.6, 399.0], [74.7, 399.0], [74.8, 399.0], [74.9, 399.0], [75.0, 400.0], [75.1, 401.0], [75.2, 401.0], [75.3, 401.0], [75.4, 401.0], [75.5, 401.0], [75.6, 401.0], [75.7, 401.0], [75.8, 402.0], [75.9, 402.0], [76.0, 402.0], [76.1, 402.0], [76.2, 403.0], [76.3, 403.0], [76.4, 403.0], [76.5, 404.0], [76.6, 404.0], [76.7, 404.0], [76.8, 404.0], [76.9, 405.0], [77.0, 405.0], [77.1, 405.0], [77.2, 405.0], [77.3, 406.0], [77.4, 406.0], [77.5, 407.0], [77.6, 407.0], [77.7, 407.0], [77.8, 407.0], [77.9, 408.0], [78.0, 409.0], [78.1, 409.0], [78.2, 410.0], [78.3, 410.0], [78.4, 411.0], [78.5, 411.0], [78.6, 411.0], [78.7, 412.0], [78.8, 413.0], [78.9, 413.0], [79.0, 413.0], [79.1, 414.0], [79.2, 414.0], [79.3, 415.0], [79.4, 415.0], [79.5, 415.0], [79.6, 416.0], [79.7, 416.0], [79.8, 417.0], [79.9, 417.0], [80.0, 418.0], [80.1, 419.0], [80.2, 419.0], [80.3, 419.0], [80.4, 420.0], [80.5, 420.0], [80.6, 420.0], [80.7, 421.0], [80.8, 421.0], [80.9, 422.0], [81.0, 423.0], [81.1, 423.0], [81.2, 423.0], [81.3, 424.0], [81.4, 425.0], [81.5, 425.0], [81.6, 426.0], [81.7, 427.0], [81.8, 427.0], [81.9, 427.0], [82.0, 427.0], [82.1, 428.0], [82.2, 428.0], [82.3, 429.0], [82.4, 429.0], [82.5, 430.0], [82.6, 430.0], [82.7, 430.0], [82.8, 430.0], [82.9, 431.0], [83.0, 431.0], [83.1, 432.0], [83.2, 432.0], [83.3, 432.0], [83.4, 434.0], [83.5, 434.0], [83.6, 435.0], [83.7, 436.0], [83.8, 436.0], [83.9, 437.0], [84.0, 438.0], [84.1, 438.0], [84.2, 438.0], [84.3, 438.0], [84.4, 439.0], [84.5, 440.0], [84.6, 440.0], [84.7, 441.0], [84.8, 441.0], [84.9, 442.0], [85.0, 442.0], [85.1, 442.0], [85.2, 443.0], [85.3, 443.0], [85.4, 443.0], [85.5, 444.0], [85.6, 444.0], [85.7, 445.0], [85.8, 445.0], [85.9, 446.0], [86.0, 447.0], [86.1, 448.0], [86.2, 448.0], [86.3, 448.0], [86.4, 449.0], [86.5, 449.0], [86.6, 451.0], [86.7, 453.0], [86.8, 455.0], [86.9, 455.0], [87.0, 455.0], [87.1, 455.0], [87.2, 456.0], [87.3, 457.0], [87.4, 458.0], [87.5, 460.0], [87.6, 461.0], [87.7, 462.0], [87.8, 464.0], [87.9, 466.0], [88.0, 468.0], [88.1, 470.0], [88.2, 472.0], [88.3, 474.0], [88.4, 476.0], [88.5, 478.0], [88.6, 480.0], [88.7, 481.0], [88.8, 484.0], [88.9, 486.0], [89.0, 489.0], [89.1, 491.0], [89.2, 491.0], [89.3, 495.0], [89.4, 495.0], [89.5, 498.0], [89.6, 499.0], [89.7, 501.0], [89.8, 505.0], [89.9, 506.0], [90.0, 510.0], [90.1, 512.0], [90.2, 514.0], [90.3, 517.0], [90.4, 519.0], [90.5, 527.0], [90.6, 529.0], [90.7, 544.0], [90.8, 549.0], [90.9, 552.0], [91.0, 552.0], [91.1, 553.0], [91.2, 556.0], [91.3, 557.0], [91.4, 557.0], [91.5, 559.0], [91.6, 561.0], [91.7, 564.0], [91.8, 564.0], [91.9, 569.0], [92.0, 571.0], [92.1, 575.0], [92.2, 576.0], [92.3, 576.0], [92.4, 580.0], [92.5, 581.0], [92.6, 584.0], [92.7, 585.0], [92.8, 586.0], [92.9, 587.0], [93.0, 589.0], [93.1, 589.0], [93.2, 591.0], [93.3, 591.0], [93.4, 593.0], [93.5, 593.0], [93.6, 598.0], [93.7, 598.0], [93.8, 599.0], [93.9, 601.0], [94.0, 604.0], [94.1, 617.0], [94.2, 620.0], [94.3, 637.0], [94.4, 638.0], [94.5, 638.0], [94.6, 648.0], [94.7, 653.0], [94.8, 658.0], [94.9, 660.0], [95.0, 664.0], [95.1, 672.0], [95.2, 678.0], [95.3, 679.0], [95.4, 684.0], [95.5, 712.0], [95.6, 730.0], [95.7, 745.0], [95.8, 750.0], [95.9, 752.0], [96.0, 757.0], [96.1, 760.0], [96.2, 769.0], [96.3, 773.0], [96.4, 780.0], [96.5, 805.0], [96.6, 815.0], [96.7, 837.0], [96.8, 853.0], [96.9, 856.0], [97.0, 856.0], [97.1, 866.0], [97.2, 886.0], [97.3, 887.0], [97.4, 889.0], [97.5, 894.0], [97.6, 894.0], [97.7, 898.0], [97.8, 902.0], [97.9, 905.0], [98.0, 906.0], [98.1, 936.0], [98.2, 936.0], [98.3, 946.0], [98.4, 957.0], [98.5, 969.0], [98.6, 978.0], [98.7, 1177.0], [98.8, 1349.0], [98.9, 1357.0], [99.0, 1362.0], [99.1, 1367.0], [99.2, 1386.0], [99.3, 1401.0], [99.4, 1402.0], [99.5, 1408.0], [99.6, 1418.0], [99.7, 1421.0], [99.8, 1423.0], [99.9, 1426.0], [100.0, 3363.0]], "isOverall": false, "label": "get personaje", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 300.0, "maxY": 1811.0, "series": [{"data": [[1100.0, 1.0], [600.0, 40.0], [300.0, 1811.0], [1300.0, 14.0], [700.0, 23.0], [1400.0, 16.0], [400.0, 356.0], [800.0, 31.0], [3300.0, 1.0], [900.0, 23.0], [500.0, 101.0]], "isOverall": false, "label": "get personaje", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 3300.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 2168.0, "series": [{"data": [[0.0, 2168.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 248.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 1.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 10.0, "minX": 1.68734461E12, "maxY": 20.0, "series": [{"data": [[1.68734465E12, 20.0], [1.68734464E12, 17.980988593155853], [1.68734466E12, 19.48767123287671], [1.68734461E12, 10.0], [1.68734463E12, 16.06609808102346], [1.68734462E12, 11.27838827838828]], "isOverall": false, "label": "RequestPorPersonaje - 5 c/ 2 min", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 10000, "maxX": 1.68734466E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 397.7473560517041, "minX": 2.0, "maxY": 1362.0, "series": [{"data": [[33.0, 427.0], [32.0, 405.5], [2.0, 1362.0], [35.0, 397.7473560517041], [3.0, 909.0], [4.0, 900.0], [5.0, 898.0], [7.0, 889.0], [8.0, 764.0], [9.0, 759.0], [10.0, 420.7456896551723], [11.0, 810.0], [13.0, 805.0], [14.0, 764.0], [15.0, 401.98092643051746], [16.0, 595.5], [17.0, 593.0], [18.0, 588.0], [19.0, 588.0], [20.0, 415.45334796926466], [21.0, 494.5], [22.0, 490.7142857142857], [23.0, 527.5], [24.0, 577.0], [25.0, 817.8333333333334], [26.0, 431.5], [27.0, 429.0], [28.0, 426.0], [29.0, 411.0], [30.0, 405.0], [31.0, 417.5]], "isOverall": false, "label": "get personaje", "isController": false}, {"data": [[23.574265618535325, 412.43359536615577]], "isOverall": false, "label": "get personaje-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 35.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 685.6, "minX": 1.68734461E12, "maxY": 165464.6, "series": [{"data": [[1.68734465E12, 99645.5], [1.68734464E12, 165464.6], [1.68734466E12, 76569.7], [1.68734461E12, 9539.9], [1.68734463E12, 98474.1], [1.68734462E12, 57271.0]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.68734465E12, 7077.5], [1.68734464E12, 11756.5], [1.68734466E12, 5438.5], [1.68734461E12, 685.6], [1.68734463E12, 6988.0], [1.68734462E12, 4067.6]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 10000, "maxX": 1.68734466E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 397.1172707889127, "minX": 1.68734461E12, "maxY": 445.8109589041095, "series": [{"data": [[1.68734465E12, 410.42736842105285], [1.68734464E12, 406.5754119138149], [1.68734466E12, 445.8109589041095], [1.68734461E12, 433.28260869565213], [1.68734463E12, 397.1172707889127], [1.68734462E12, 411.02930402930417]], "isOverall": false, "label": "get personaje", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 10000, "maxX": 1.68734466E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 395.94882729211093, "minX": 1.68734461E12, "maxY": 444.55890410958887, "series": [{"data": [[1.68734465E12, 409.07368421052644], [1.68734464E12, 405.3941698352347], [1.68734466E12, 444.55890410958887], [1.68734461E12, 433.1739130434783], [1.68734463E12, 395.94882729211093], [1.68734462E12, 409.4835164835165]], "isOverall": false, "label": "get personaje", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 10000, "maxX": 1.68734466E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 67.65217391304348, "minX": 1.68734461E12, "maxY": 105.97473684210519, "series": [{"data": [[1.68734465E12, 105.97473684210519], [1.68734464E12, 84.67300380228133], [1.68734466E12, 98.60273972602738], [1.68734461E12, 67.65217391304348], [1.68734463E12, 76.81236673773988], [1.68734462E12, 87.69230769230764]], "isOverall": false, "label": "get personaje", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 10000, "maxX": 1.68734466E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 324.0, "minX": 1.68734461E12, "maxY": 3363.0, "series": [{"data": [[1.68734465E12, 1428.0], [1.68734464E12, 3363.0], [1.68734466E12, 1362.0], [1.68734461E12, 687.0], [1.68734463E12, 1367.0], [1.68734462E12, 863.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.68734465E12, 396.0], [1.68734464E12, 471.0], [1.68734466E12, 751.8000000000001], [1.68734461E12, 678.0], [1.68734463E12, 473.0], [1.68734462E12, 590.6]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.68734465E12, 1423.0], [1.68734464E12, 979.6000000000004], [1.68734466E12, 955.02], [1.68734461E12, 687.0], [1.68734463E12, 1003.9000000000055], [1.68734462E12, 773.26]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.68734465E12, 583.3999999999999], [1.68734464E12, 558.0], [1.68734466E12, 889.0], [1.68734461E12, 680.95], [1.68734463E12, 557.0], [1.68734462E12, 691.2000000000005]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.68734465E12, 328.0], [1.68734464E12, 326.0], [1.68734466E12, 332.0], [1.68734461E12, 332.0], [1.68734463E12, 324.0], [1.68734462E12, 328.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.68734465E12, 363.0], [1.68734464E12, 366.0], [1.68734466E12, 377.0], [1.68734461E12, 353.5], [1.68734463E12, 363.0], [1.68734462E12, 357.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 10000, "maxX": 1.68734466E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 345.0, "minX": 11.0, "maxY": 743.0, "series": [{"data": [[32.0, 409.0], [40.0, 372.0], [42.0, 361.5], [43.0, 380.0], [44.0, 385.0], [45.0, 367.0], [47.0, 387.0], [48.0, 366.0], [55.0, 355.0], [56.0, 372.0], [59.0, 353.0], [58.0, 349.0], [60.0, 358.0], [68.0, 449.0], [80.0, 367.0], [84.0, 368.5], [85.0, 380.5], [93.0, 349.0], [97.0, 360.0], [98.0, 375.0], [99.0, 345.0], [11.0, 743.0], [19.0, 552.0], [20.0, 487.5], [23.0, 549.0], [24.0, 374.0], [25.0, 424.0], [26.0, 372.0], [27.0, 345.0], [29.0, 448.0], [30.0, 356.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 99.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 341.0, "minX": 11.0, "maxY": 743.0, "series": [{"data": [[32.0, 405.5], [40.0, 370.0], [42.0, 358.5], [43.0, 379.0], [44.0, 385.0], [45.0, 366.0], [47.0, 384.0], [48.0, 365.0], [55.0, 354.0], [56.0, 370.5], [59.0, 351.0], [58.0, 347.0], [60.0, 357.0], [68.0, 445.0], [80.0, 367.0], [84.0, 366.0], [85.0, 380.5], [93.0, 349.0], [97.0, 359.0], [98.0, 375.0], [99.0, 344.0], [11.0, 743.0], [19.0, 552.0], [20.0, 487.0], [23.0, 549.0], [24.0, 367.5], [25.0, 423.5], [26.0, 370.5], [27.0, 341.0], [29.0, 446.0], [30.0, 354.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 99.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 5.6, "minX": 1.68734461E12, "maxY": 77.5, "series": [{"data": [[1.68734465E12, 47.4], [1.68734464E12, 77.5], [1.68734466E12, 34.6], [1.68734461E12, 5.6], [1.68734463E12, 48.8], [1.68734462E12, 27.8]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 10000, "maxX": 1.68734466E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 4.6, "minX": 1.68734461E12, "maxY": 78.9, "series": [{"data": [[1.68734465E12, 47.5], [1.68734464E12, 78.9], [1.68734466E12, 36.5], [1.68734461E12, 4.6], [1.68734463E12, 46.9], [1.68734462E12, 27.3]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 10000, "maxX": 1.68734466E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 4.6, "minX": 1.68734461E12, "maxY": 78.9, "series": [{"data": [[1.68734465E12, 47.5], [1.68734464E12, 78.9], [1.68734466E12, 36.5], [1.68734461E12, 4.6], [1.68734463E12, 46.9], [1.68734462E12, 27.3]], "isOverall": false, "label": "get personaje-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 10000, "maxX": 1.68734466E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 4.6, "minX": 1.68734461E12, "maxY": 78.9, "series": [{"data": [[1.68734465E12, 47.5], [1.68734464E12, 78.9], [1.68734466E12, 36.5], [1.68734461E12, 4.6], [1.68734463E12, 46.9], [1.68734462E12, 27.3]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 10000, "maxX": 1.68734466E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 7200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

