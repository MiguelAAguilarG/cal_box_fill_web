const AWG = [18, 16, 14, 12, 10, 8, 6];

window.addEventListener("DOMContentLoaded", calc_main, false);
document.getElementById("form0").addEventListener("change", calc_main);
document.getElementById("form").addEventListener("change", calc_main);

function calc_main() {
    console.log("cambio");

    /*data */
    var decimals = Number.parseInt(document.getElementById("decimals").value);

    for(let ii = 0; ii < 7; ii++) {
        document.getElementById("item5AWG" + String(AWG[ii])).value = "0";
        document.getElementById("item6AWG" + String(AWG[ii])).value = "0";
        document.getElementById("item7AWG" + String(AWG[ii])).value = "0";
    }

    var [numAWG, numAWGTotal] = funNum();
    
    var inAWG = [];
    for(let ii = 18; ii >= 6; ii = ii-2) {

        inAWG.push(Number.parseFloat(document.getElementById("inAWG" + String(ii)).innerHTML));
    }
    console.log(inAWG);

    var cmAWG = [];
    for(let ii = 18; ii >= 6; ii = ii-2) {

        cmAWG.push(Number.parseFloat(document.getElementById("cmAWG" + String(ii)).innerHTML));
    }
    console.log(cmAWG);

    /*computation */
    returnfunCheckbox = funCheckbox(numAWGTotal);
    console.log(returnfunCheckbox);

    if (returnfunCheckbox === true) {
        var [numAWG, numAWGTotal] = funNum();
    }

    var inAWGTotal = [];
    for(let ii = 0; ii < 7; ii++) {

        inAWGTotal.push(numAWGTotal[ii]*inAWG[ii]);
    }
    console.log(inAWGTotal);

    var cmAWGTotal = [];
    for(let ii = 0; ii < 7; ii++) {

        cmAWGTotal.push(numAWGTotal[ii]*cmAWG[ii]);
    }
    console.log(cmAWGTotal);

    var inTotal = 0;
    for(let ii = 0; ii < 7; ii++) {

        inTotal = inTotal + inAWGTotal[ii];
    }
    console.log(inTotal);

    var cmTotal = 0;
    for(let ii = 0; ii < 7; ii++) {

        cmTotal = cmTotal + cmAWGTotal[ii];
    }
    console.log(cmTotal);

    /*results */
    let e = 0;
    for(let ii = 18; ii >= 6; ii = ii-2) {

        document.getElementById("numAWG" + String(ii)).innerHTML = numAWGTotal[e];

        document.getElementById("inAWG" + String(ii) + "Total").innerHTML = inAWGTotal[e].toFixed(decimals);
        document.getElementById("cmAWG" + String(ii) + "Total").innerHTML = cmAWGTotal[e].toFixed(decimals);

        document.getElementById("inResult").innerHTML = inTotal.toFixed(decimals);
        document.getElementById("cmResult").innerHTML = cmTotal.toFixed(decimals);
        e++;
    }
}

function funNum() {
    var numAWG = [];
    for(let i = 1; i <= 9; i++) {

        numAWG.push([])
        for(let ii = 18; ii >= 6; ii = ii-2) {
            numAWG[i-1].push(Number.parseInt(document.getElementById("item" + String(i) + "AWG" + String(ii)).value));
        }
    }

    numAWG.push([])
    for(let ii = 18; ii >= 6; ii = ii-2) {
        numAWG[9].push(Number.parseInt(document.getElementById("itemDeviceAWG" + String(ii)).value));
    }
    console.log(numAWG);

    var numAWGTotal = [];
    for(let ii = 0; ii < 7; ii++) {

        numAWGTotal.push(0);
        for(let i = 0; i < 10; i++) {
            numAWGTotal[ii] = numAWGTotal[ii] + numAWG[i][ii];
        }
    }
    console.log(numAWGTotal);

    return [numAWG, numAWGTotal];
}

function funCheckbox(numAWGTotal) {
    var clamp = document.getElementById("clamp").checked;
    var egc = document.getElementById("egc").checked;
    var iegc = document.getElementById("iegc").checked;

    var clamp_index = -1;
    var egc_index = -1;
    var iegc_index = -1;

    if (clamp === true) {
        
        for(let ii = 0; ii < 7; ii++) {
            
            if (numAWGTotal[ii] > 0){
                clamp_index = ii;
            }
        }
        console.log(clamp_index);

        if (clamp_index >= 0){
            for(let ii = 0; ii < 7; ii++) {
                document.getElementById("item5AWG" + String(AWG[ii])).value = "0";
            }
            document.getElementById("item5AWG" + String(AWG[clamp_index])).value = "1";
        }
    }
    if (egc === true) {

        for(let ii = 0; ii < 7; ii++) {
            
            if (numAWGTotal[ii] > 0){
                egc_index = ii;
            }
        }
        console.log(egc_index);

        if (egc_index >= 0){
            for(let ii = 0; ii < 7; ii++) {
                document.getElementById("item6AWG" + String(AWG[ii])).value = "0";
            }
            document.getElementById("item6AWG" + String(AWG[egc_index])).value = "1";
        }
    }
    if (iegc === true) {

        for(let ii = 0; ii < 7; ii++) {
            
            if (numAWGTotal[ii] > 0){
                iegc_index = ii;
            }
        }
        console.log(iegc_index);

        if (iegc_index >= 0){
            for(let ii = 0; ii < 7; ii++) {
                document.getElementById("item7AWG" + String(AWG[ii])).value = "0";
            }
            document.getElementById("item7AWG" + String(AWG[iegc_index])).value = "1";
        }
    }

    if (clamp_index >= 0 || egc_index >= 0 || iegc_index >= 0) {
        return true;
    }
    else {
        return false;
    }
}