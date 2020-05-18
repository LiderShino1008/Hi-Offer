const tilesProvider='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let myMap=L.map('Map').setView([15.0000000,-86.5000000],10);
L.tileLayer(tilesProvider,{
    maxZoom:18
}).addTo(myMap);

let marker=L.marker([15.0000000,-86.5000000]).addTo(myMap);
marker.bindPopup("<b>Hola Jonathan!</b><br>tenemos nuevas ofertas por aqui.").openPopup();



function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'X4XYXX'.replace(/[XY]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'X' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

console.log(generateUUID());
console.log(generateUUID());
console.log(generateUUID());
//