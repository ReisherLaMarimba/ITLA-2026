let selectedChair = null;
let raceInterval;
const chairs = [
    { id: 'chair-0', pos: 0, name: 'Roja' },
    { id: 'chair-1', pos: 0, name: 'Azul' },
    { id: 'chair-2', pos: 0, name: 'Verde' }
];

function setBet(index) {
    selectedChair = index;
    document.getElementById('bet-status').innerText = `Has apostado por la Silla ${chairs[index].name}`;
    document.getElementById('start-btn').disabled = false;
}

function startRace() {
    // Resetear posiciones
    chairs.forEach(c => {
        c.pos = 0;
        document.getElementById(c.id).style.left = '0px';
    });
    document.getElementById('start-btn').disabled = true;

    raceInterval = setInterval(() => {
        chairs.forEach((chair, index) => {
            // Mover cada silla un tramo aleatorio
            chair.pos += Math.random() * 15;
            const element = document.getElementById(chair.id);
            element.style.left = chair.pos + 'px';

            // Verificar si alguien llegó a la meta (pista mide aprox 100% - offset)
            const finishPos = document.getElementById('track').offsetWidth - 50;
            if (chair.pos >= finishPos) {
                endRace(index);
            }
        });
    }, 50);
}

function endRace(winnerIndex) {
    clearInterval(raceInterval);
    const winnerName = chairs[winnerIndex].name;
    
    if (winnerIndex === selectedChair) {
        alert(`¡FELICIDADES! La Silla ${winnerName} ganó y tú también.`);
    } else {
        alert(`Perdiste. La Silla ${winnerName} fue más rápida. Inténtalo de nuevo.`);
    }
    document.getElementById('start-btn').disabled = false;
}
