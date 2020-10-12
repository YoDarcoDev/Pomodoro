const affichageTravail = document.querySelector('.affichageT');
const affichagePause = document.querySelector('.affichageP');
const btnGo = document.querySelector('.b1');
const btnPause = document.querySelector('.b2');
const btnReset = document.querySelector('.b3');
const cycles = document.querySelector('h2');


let tempsInitial = 1800;   // 1800 / 60sec = 30min
let tempsDeRepos = 300;
let checkInterval = false;
let pause = false;
let nbDeCycles = 0;

cycles.innerText = `Nombre de cycles ${nbDeCycles}`;

// Timer Travail
affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;


// Timer Repos
affichagePause.innerText = `${Math.trunc(tempsDeRepos / 60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;



btnGo.addEventListener('click', () => {
    
    if (checkInterval === false) {

        checkInterval = true;

        tempsInitial--; // démarrer directement au clic

        affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;

        let timer = setInterval(() => {

            if(pause === false && tempsInitial > 0) {
                tempsInitial --;

                affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
            }
            
            else if (pause === false && tempsDeRepos === 0 && tempsInitial === 0) {     // Ordre des conditions important
                tempsInitial = 1800;
                tempsDeRepos = 300;
                nbDeCycles++;
                cycles.innerText = `Nombre de cycles ${nbDeCycles}`;

                affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;

                affichagePause.innerText = `${Math.trunc(tempsDeRepos / 60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
            }

            else if (pause === false && tempsInitial === 0) {
                tempsDeRepos --;

                affichagePause.innerText = `${Math.trunc(tempsDeRepos / 60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
            }

        }, 1000)


        // BOUTON RESET TIMER (DANS LE IF CAR IL DOIT ETRE DANS LE MEME BLOC (PORTEE))
        btnReset.addEventListener('click', () => {
            clearInterval(timer);
            checkInterval = false;
            tempsInitial = 1800;
            tempsDeRepos = 300;
            nbDeCycles = 0;
            cycles.innerText = `Nombre de cycles ${nbDeCycles}`;

            // On réactualise nos affichageS 

            affichageTravail.innerText = `${Math.trunc(tempsInitial / 60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;

            affichagePause.innerText = `${Math.trunc(tempsDeRepos / 60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;

        })
    }

    else {
        return;
    }

});



// BOUTON PAUSE 
btnPause.addEventListener('click', () => {
    pause = !pause;    // si pause = false ca le passe à true et inversement (de base il est défini à false)
    
    if (pause === false) {
        btnPause.innerText = "Pause";
    }
    else if (pause === true) {
        btnPause.innerText = "Play";
    }
})





/*  Pour éviter de spammer le bouton Commencer on va déclarer une variable checkInterval false
        On test checkInterval - On passe la variable a true - On exécute une condition
        Si on click à nouveau sur Commencer on ne va pas rentrer dans la condition checkInterval car elle est à true et donc on return et on va sortir 


    Quand on va click sur Pause (pause va passer à true donc ca s'arrete)
*/