
"use strict" //nicht nötig, da mit jQuery
/* Wir haben von Montag ein manuelles Muster für die JSON-Video-DataView.applyDiese Datei wollen wir nachbauen.
Wir holen mit jQuery alle Elemente:
let videos = $(".style-scope ytd-playlist-video-renderer #video-title")
und haben damit eine NodeList, die wir mit einer for-Schleife  durchgehen.
Wir bauen ein Json-ähnliches Textdokument, das wir dann hochladen.

on Monday we started to write all the youtube links (manually) into "Zuordnungen.JSON". 
today we want to to do that with the Javascript.
then we put the viedos as = $(".style-scope ytd-playlist-video-renderer #video-title")
and we build all as a NodeList which with the "for-Loop"function.
we build a text document like as "JSON" and then we can upload this document ("Zuordnungen.JSON"). 
*/


loadContent()
let dokument

//hier wird das Youtube-Dokument vom Server geholt, here we would like to take the Youtube Document from the server

function loadContent(dieURL) {
    //console.log(linkName);
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log("Oops")
            return;
        }
        //console.log(xhr.responseXML);
        // Antwort liegt als String vor
        // können auf übermittelten string über Eigenschaft responseText zugreifen
        // Snippets werden an HTML-Container als DON-String übergeben
        let einbau = xhr.responseText
        console.log("einbau", einbau)
        //hier übergeben wir das geholte Dokument an die Funktion uebergabe
        uebergabe(einbau)

    };

    xhr.open("GET", "JavaScriptArraysYouTube.html");
    // xhr.responseType ="document";
    xhr.send();

}




//hier wird ein JSON-ähnliches Dokument mit Stringverarbeitung erstellt.

//those are what we wrote for creating a similarly "JSON" document with String as a process.
//we get the Youtube document via "let videos = $(".style-scope ytd-playlist-video-renderer #video-title")"
//Through "For-Loop" we build up the document in"Zuorgnungen.json"
let alleVideos = "["
function uebergabe(dasDokument) {
    //console.log("Dokument", dasDokument)
    //console.log( $('p'))
    let derDiv = document.querySelector("#ersetzen")
    derDiv.innerHTML = dasDokument
    let videos = $(".style-scope ytd-playlist-video-renderer #video-title")
    
    for (let i = 0; i < videos.length; i++) {
        let derTitle = videos[i].title
        let dieUrl0 = videos[i].href
       
        //http://localhost/watch?v=   ersetzen durch "https://www.youtube.com/embed/
        let dieUrl = dieUrl0.replace("http://localhost/watch?v=", "https://www.youtube.com/embed/");
        console.log("dieurl0",dieUrl0)
        let dieurl1 = dieUrl.split("&")[0]
        //alleVideos[i] = [derTitle, dieUrl ]; 
        ///////////Stringverarbeitung Json-ähnlich
        alleVideos = alleVideos + "\n{\"" + derTitle + "\": \"" + dieurl1 + "\"},"
        // alleVideos[i]["URL"] = videos[i].URL
    }
    //let jsonString = Object.assign({}, alleVideos);

       ///                     es muss noch das letzte Komma gelöscht werden.
    let zeige = alleVideos.slice(2, -2)

    alleVideos = "[" + zeige + "]"
    console.log("Letztes", zeige)
    //hier wird das erstellte Dokument an die Funktion SendFile übergeben
    sendFile(alleVideos)


}

//hier wird gesendet. Here all files will be sent.
function sendFile(jsonString) {
    console.log("jsonString", jsonString)
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log("Fehler")
            return;
        }
        //console.log("im Senden", (JSON.parse(xhr.responseX)));
        console.log("im Senden", (xhr.responseText));
        xhr.responseText
    };
    xhr.open("POST", "./script.php");
    xhr.send(jsonString);
}
