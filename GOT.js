var pList = document.getElementById("planets");
var $climate = document.getElementById("climate");
var $terrain = document.getElementById("terrain");
var $pop = document.getElementById("population");
var $diameter = document.getElementById("diameter");
var $orbit = document.getElementById("orbit");
var $people = document.getElementById("people");
var $photo = document.getElementById("planetPhoto");
var $name = document.getElementById("name");
var info = document.getElementById("infoBox");

(function() {  
    for(i = 1; i < 7; i++){
        var url = "https://swapi.co/api/planets/?page=" + i;

        $.get(url)
        .done(function(response) {

            console.log(response);
            updateUISuccess(response)
            
        })
        .fail(function(error) {
            console.log(error);
            
            updateUIError()
                
        });

        //handle XHR success
        function updateUISuccess(response) {
            for(j = 0; j < 10; j++){
                let n = response.results[j].name;
                let c = response.results[j].climate;
                let t = response.results[j].terrain;
                let pop = response.results[j].population;
                let d = response.results[j].diameter;
                let o = response.results[j].orbital_period;
                let u = response.results[j].url;
                let pr = [];
                let s = [];
                let picP = "pics/" + n +".jpg";
                //promonent figures
                for (i=0; i< response.results[j].residents.length; i++){
                    let popURL = response.results[j].residents;
                    console.log(popURL[i]);
                    $.get(popURL[i])
                    .done(function(resp){
                        pr.push(resp.name);
                        pr.push("\n");
                    })
                     .fail(function(error) {
                         console.log(error);
                         updateUIError()
                     });
                }
                //trial species
                // for(k = 0; k < 4; k++){
                //     var specURL = "https://swapi.co/api/species/?page=" + k;
                //     $.get(specURL)
                //     .done(function(respond){
                //         for (l = 0; l < 10; l++){
                //             if (respond.results[l].homeworld == u){
                //                 console.log(respond.results[l].name)
                //                 s.push(respond.results[l].name)
                //             }
                //         }
                //     })

                // }

                let planet= document.createElement("li");
                planet.onclick = function(){
                    info.setAttribute("style", "visibility: visible")
                    $name.textContent = n;
                    $climate.textContent = c;
                    $terrain.textContent = t;
                    $pop.textContent = pop;
                    $diameter.textContent = d;
                    $orbit.textContent = o;
                    $people.textContent = pr;
                    $photo.setAttribute("src", picP);

                }
                planet.textContent = response.results[j].name;
                pList.appendChild(planet);
            }

        }

        // handle XHR error
        function updateUIError() {
    //		
        }

    }
})();  
