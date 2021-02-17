const uitvoer = document.getElementById('uitvoer');
let dataObject; 
const jsonKnop = document.getElementById('haalJSON');
const urlJson = 'https://gist.githubusercontent.com/Theo-denBlanken/193d989a2aab328f847f4357e7171dc5/raw/1ca3b05253dee0dac348b9ded4ada8a64d97ff5e/huisDataa.json';
jsonKnop.addEventListener('click', ()=>{
    jsonKnop.style.display = 'none';
    const vraagServ = new XMLHttpRequest();
    vraagServ.onreadystatechange = () => {
        if( vraagServ.readyState == 4 && vraagServ.status == 200){
            dataObject = JSON.parse(vraagServ.responseText); 
            uitvoeren();
        }
    }
    vraagServ.open('GET', urlJson, true);
    vraagServ.send();
});

const geefDagWeek = (num) => {
    switch (num) {
        case 0: return 'Zondag'; break 
        case 1: return 'Maandag'; break
        case 2: return 'Dinsdag'; break
        case 3: return 'Woensdag'; break
        case 4: return 'Donderdag'; break
        case 5: return 'Vrijdag'; break
        case 6: return 'Zaterdag'; break
        default: return num;
    }
}
const maandNaam = (num) => {
    switch (num) {
        case 0: return 'Januari'; break 
        case 1: return 'Februari'; break
        case 2: return 'Maart'; break
        case 3: return 'April'; break
        case 4: return 'Mei'; break
        case 5: return 'Juni'; break
        case 6: return 'Julie'; break
        case 7: return 'Argustus'; break
        case 8: return 'September'; break
        case 9: return 'Oktober'; break
        case 10: return 'November'; break
        case 11: return 'December'; break
        default: return num;
    }
}

const maakDatum = (num) =>{
    if(typeof(num)== 'string'){
        num = Date.parse(num);
    }
    // zet de string van de js datum om in een betere vorm
    let datum = new Date(num);

    let dagWeek  = datum.getDay();
    let dagMaand = datum.getDate();
    let maand    = datum.getMonth();
    let jaar     = datum.getFullYear();
    let uren     = datum.getHours();
    if (uren < 10)  
    {
        uren = '0' + uren
    }
    let minuten  = datum.getMinutes();

    if(minuten < 10) 
    {
        minuten = '0' + minuten
    }
    return `${geefDagWeek(dagWeek)}<br>
    ${dagMaand} ${maandNaam(maand)} ${jaar} ${uren}: ${minuten}`
}

const uitvoeren = () => {
    let html ="";
    dataObject.forEach( obj => {
        html += `<div class="rij">`;
        html+= `<div>${ maakDatum(obj.tijd)} </div>`;
        html+= `<div>${obj.tempBuiten}&deg;C</div>`;
        html+= `<div>${obj.tempBinnen}&deg;C</div>`;
        html+= `<div>${obj.tempGewenst}&deg;C</div>`;
        if( obj.tempGewenst > obj.tempBinnen){
            html+= `<div> <img class="icon" src="../Icons/vlam.svg" alt="CV aan"> </div>`;
        } else{
            html+= `<div> <img class="icon" src="../Icons/vlamUIt.svg" alt="CV uit"> </div>`;
        }
        if( obj.lichtKamer){
            html+= `<div> <img class="icon" src="../Icons/lampAan.svg" alt="lamp aan"> </div>`;
        } else{
            html+= `<div> <img class="icon" src="../Icons/lampUIt.svg" alt="CV uit"> </div>`;
        }
        if( obj.lichtBuiten){
            html+= `<div> <img class="icon" src="../Icons/lampAan.svg" alt="lamp aan"> </div>`;
        } else{
            html+= `<div> <img class="icon" src="../Icons/lampUIt.svg" alt="CV uit"> </div>`;
        }
        html += "</div>";
    });
    uitvoer.innerHTML = html;    
    
    // uitvoer.innerHTML = `<div>${dataObject[0].tijd}</div>`;
    // uitvoer.innerHTML += `<div>${dataObject[1].tempBuiten}</div>`;
}

const starten = () => {
    // de data array in onze dataObject stoppen
    dataObject = energieData 
    // data uitvoeren
    uitvoeren();
}

document.addEventListener('DOMContentLoaded',starten)