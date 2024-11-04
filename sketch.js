function setup() {
  createCanvas(windowWidth, windowHeight); 
  noLoop(); 
}


function draw() {
  background(255); 
  
  //griglia principale
  let gridSize = 16; // dimensione (16x16)
  let spacing = 20;  

  // dimensione massima possibile per ogni pattern 4x4 
  // considerando la dimensione della finestra e gli spazi tra i pattern
  let patternSize = min(
    (width - spacing * (gridSize + 1)) / gridSize,
    (height - spacing * (gridSize + 1)) / gridSize
  );
  
  // coordinate iniziali per centrare l'intera griglia nella finestra
  let startX = (width - (patternSize * gridSize + spacing * (gridSize - 1))) / 2;
  let startY = (height - (patternSize * gridSize + spacing * (gridSize - 1))) / 2;
  
  //dimensione di ogni cella all'interno del pattern 4x4
  let cellSize = patternSize / 4;
  
  // ciclo per disegnare la griglia 16x16 di pattern
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
     
      //posizione di ogni pattern nella griglia
      let x = startX + col * (patternSize + spacing);
      let y = startY + row * (patternSize + spacing);
      
      push(); //salva lo stato corrente 
      
      // sposta l'origine al centro del pattern corrente per permettere la rotazioni e scaling dal centro invece che dall'angolo
      translate(x + patternSize/2, y + patternSize/2);
      
      //scaling casuale tra 50% e 100% della dimensione originale
      let randomScale = random(0.5, 1);
      scale(randomScale);
      
      //rotazione casuale di 0°, 22.5°, 45°, 67.5
      rotate(random([0, PI/8, PI/4, 3*PI/8]));
      
      //riporta l'origine all'angolo in alto a sinistra del pattern
      translate(-patternSize/2, -patternSize/2);
      
      //cornice del pattern
      noFill();
      stroke(0);
      strokeWeight(1);
      rect(0, 0, patternSize, patternSize);
      
      //disegna il pattern casuale 4x4 nella cornice
      drawRandomPattern(0, 0, cellSize);
      
      pop(); // Ripristina lo stato precedente del contesto grafico
    }
  }
}

//disegna un singolo pattern 4x4 di celle bianche e nere
function drawRandomPattern(x, y, cellSize) {
  // Crea un array di 16 valori V/F (V=cella nera, F=cella bianca)
  let grid = []; 
  for (let i = 0; i < 16; i++) {
    grid[i] = random() > 0.5; // 50% di probabilità per ogni valore
  }
  
  // disegna la griglia 4x4 di celle
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let index = i * 4 + j; // calcola l'indice nell'array grid
      
      // colore di riempimento basato su V/F
      if (grid[index]) {
        fill(0);   //nero 
      } else {
        fill(255);  // bianco
      }
      
      //singola cella
      stroke(0);
      strokeWeight(0.5);
      rect(x + j * cellSize, y + i * cellSize, cellSize, cellSize);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
  redraw(); 
}
