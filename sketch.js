function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(255);
  
  let gridSize = 16; // 16x16 griglia
  let spacing = 20;  // spazio tra i pattern
  
  // calcola la dimensione di ogni pattern 4x4 
  let patternSize = min(
    (width - spacing * (gridSize + 1)) / gridSize,
    (height - spacing * (gridSize + 1)) / gridSize
  );
  
  // posizione (x,y) iniziale per centrare la griglia
  let startX = (width - (patternSize * gridSize + spacing * (gridSize - 1))) / 2;
  let startY = (height - (patternSize * gridSize + spacing * (gridSize - 1))) / 2;
  
  // dimensione di ogni cella all'interno del pattern 4x4
  let cellSize = patternSize / 4;
  
  // disegna la griglia 16x16
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let x = startX + col * (patternSize + spacing);
      let y = startY + row * (patternSize + spacing);
      
      push(); // salva lo stato corrente
      translate(x + patternSize/2, y + patternSize/2); // sposta il sistema di coordinate al centro del pattern corrente 
      rotate(random([0, PI/8, PI/4, 3*PI/8])); // rotazione casuale di multipli di 22.5 gradi, simmetria di rotazione di 90°
      translate(-patternSize/2, -patternSize/2); // riporta l'origine del sistema di coordinate all'angolo in alto a sinistra del pattern
      
      // cornice del pattern
      noFill();
      stroke(0);
      strokeWeight(1);
      rect(0, 0, patternSize, patternSize);
      
      drawRandomPattern(0, 0, cellSize);
      
      pop(); // ripristina lo stato precedente
    }
  }
}

function drawRandomPattern(x, y, cellSize) { //disegna la griglia 4x4 di celle nere e bianche nel pattern
  // griglia 4x4 con valori casuali V/F
  let grid = []; // array con 16 valori (uno per ogni cella 4x4) generati casualmente
  for (let i = 0; i < 16; i++) {
    grid[i] = random() > 0.5; // 50% di probabilità V o F
  }
  
  // cella del pattern 4x4
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let index = i * 4 + j; //calcola l'indice della cella corrente
     
      
      // riempie con valori casuali 
      // se > di 0.5 (vero) --> nero
      // se <= di 0.5 (falso)--> bianco
      if (grid[index]) { //controlla se la cella è nera o bianca
        fill(0); // nero 
      } else {
        fill(255); // bianco
      }
      
      stroke(0);
      strokeWeight(0.5);
      rect(x + j * cellSize, y + i * cellSize, cellSize, cellSize); // disegna la cella nella posizione calcolata
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

//questo l'ho scritto io