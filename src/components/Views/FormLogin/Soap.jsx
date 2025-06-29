import React, { useEffect, useState, useRef } from "react";

const DIRECTIONS = [
  [0, 1], // derecha
  [1, 0], // abajo
  [0, -1], // izquierda
  [-1, 0], // arriba
  [1, 1], // diagonal derecha abajo
  [1, -1], // diagonal izquierda abajo
  [-1, -1], // diagonal izquierda arriba
  [-1, 1], // diagonal derecha arriba
];

// function generateEmptyGrid(size, filler) {
//   return Array(size)
//     .fill()
//     .map(() =>
//       Array(size)
//         .fill(null)
//         .map(() => filler[Math.floor(Math.random() * filler.length)])
//     );
// }

function placeWords(words, filler, size = 12) {
  const grid = Array(size)
    .fill()
    .map(() => Array(size).fill(null));

  const canPlace = (word, x, y, dx, dy) => {
    for (let i = 0; i < word.length; i++) {
      const nx = x + i * dx;
      const ny = y + i * dy;
      if (nx < 0 || ny < 0 || nx >= size || ny >= size) return false;
      const cell = grid[nx][ny];
      if (cell !== null && cell !== word[i]) return false;
    }
    return true;
  };

  //   LUGAR ALEATORIO - SELECCIONADO
  //   const place = (word) => {
  //     const attempts = 100;
  //     for (let i = 0; i < attempts; i++) {
  //       const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  //       const x = Math.floor(Math.random() * size);
  //       const y = Math.floor(Math.random() * size);

  //       if (canPlace(word, x, y, dir[0], dir[1])) {
  //         for (let j = 0; j < word.length; j++) {
  //           grid[x + j * dir[0]][y + j * dir[1]] = word[j];
  //         }
  //         return true;
  //       }
  //     }
  //     return false;
  //   };

  //   INTENTA TODAS LAS POSICIONES POSIBLES - EN TEST
  //   const place = (word) => {
  //     const directions = [...DIRECTIONS];
  //     for (let x = 0; x < size; x++) {
  //       for (let y = 0; y < size; y++) {
  //         for (let d = 0; d < directions.length; d++) {
  //           const [dx, dy] = directions[d];
  //           if (canPlace(word, x, y, dx, dy)) {
  //             for (let j = 0; j < word.length; j++) {
  //               grid[x + j * dx][y + j * dy] = word[j];
  //             }
  //             return true;
  //           }
  //         }
  //       }
  //     }
  //     return false; // no se pudo colocar
  //   };

  //   MEJOR FUNCIONAMIENTO - INTENTOS ALEATORIOS SINO BUSQUEDA EXAUSTIVA
  const place = (word) => {
    const attempts = 200;
    const directions = [...DIRECTIONS];

    // 1️⃣ Intentos aleatorios
    for (let i = 0; i < attempts; i++) {
      const [dx, dy] =
        directions[Math.floor(Math.random() * directions.length)];
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);

      if (canPlace(word, x, y, dx, dy)) {
        for (let j = 0; j < word.length; j++) {
          grid[x + j * dx][y + j * dy] = word[j];
        }
        return true;
      }
    }

    // Búsqueda exhaustiva como respaldo
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let d = 0; d < directions.length; d++) {
          const [dx, dy] = directions[d];
          if (canPlace(word, x, y, dx, dy)) {
            for (let j = 0; j < word.length; j++) {
              grid[x + j * dx][y + j * dy] = word[j];
            }
            return true;
          }
        }
      }
    }

    // No se pudo colocar
    return false;
  };

  // Coloca cada palabra
  words.forEach((word) => {
    if (!place(word.toUpperCase())) {
      console.warn("No se pudo colocar la palabra:", word);
    }
  });

  // Rellena los espacios vacíos con letras aleatorias
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === null) {
        grid[i][j] = filler[Math.floor(Math.random() * filler.length)];
      }
    }
  }

  return grid;
}

const SopaDeLetras = ({
  palabras = [],
  relleno = ["A", "B", "C", "D"],
  styles = {
    "spacing-y": "5px",
    "spacing-x": "5px",
    ["bg-selected"]: "#fef08a",
    radius: "50%",
  },
}) => {
  const [size, setSize] = useState(12);
  const [grid, setGrid] = useState([]);
  const [selected, setSelected] = useState([]);
  const isMouseDown = useRef(false);
  const [startCoord, setStartCoord] = useState(null);
  const [direction, setDirection] = useState(null);

  const getOptimalGridSize = (words) => {
    const longestWord = Math.max(...words.map((w) => w.length));
    const base = Math.ceil(Math.sqrt(words.join("").length)) + 2;
    return Math.max(longestWord, base);
  };

  useEffect(() => {
    const upperPalabras = palabras.map((w) => w.toUpperCase());
    const gridSize = getOptimalGridSize(upperPalabras);
    setSize(gridSize);
    setGrid(placeWords(upperPalabras, relleno, gridSize));
  }, [palabras, relleno]);

  const handleMouseDown = (x, y) => {
    isMouseDown.current = true;
    setStartCoord([x, y]);
    setSelected([[x, y]]);
    setDirection(null); // reseteamos dirección
  };

  const handleMouseEnter = (x, y) => {
    if (!isMouseDown.current || !startCoord) return;

    const [startX, startY] = startCoord;
    const dx = x - startX;
    const dy = y - startY;

    // evitar seleccionar la misma celda
    if (dx === 0 && dy === 0) return;

    // primera vez que entra: fijamos dirección
    if (!direction) {
      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const divisor = Math.abs(gcd(dx, dy));
      setDirection([dx / divisor, dy / divisor]);
      setSelected((prev) => [...prev, [x, y]]);
      return;
    }

    // ya hay dirección: validar si (x,y) está en la línea
    const [dirX, dirY] = direction;
    const steps = Math.max(Math.abs(x - startX), Math.abs(y - startY));
    const expectedX = startX + dirX * steps;
    const expectedY = startY + dirY * steps;

    if (x === expectedX && y === expectedY) {
      setSelected((prev) => [...prev, [x, y]]);
    }
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    const selectedWord = selected.map(([x, y]) => grid[x][y]).join("");
    const reversed = selectedWord.split("").reverse().join("");
    const found = palabras.some(
      (word) =>
        word.toUpperCase() === selectedWord || word.toUpperCase() === reversed
    );
    if (found) {
      alert(`¡Encontraste la palabra: ${selectedWord}!`);
    }
    setSelected([]);
    setStartCoord(null);
    setDirection(null);
  };

  return (
    <div
      className="select-none"
      onMouseUp={handleMouseUp}
      style={{
        // border: "3px solid red",
        // padding: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 2rem)`,
          border: "3px solid red",
          padding: "5px 20px",
          borderRadius: "15px",
          rowGap: styles["spacing-y"] ? styles["spacing-y"] : "5px",
          columnGap: styles["spacing-x"] ? styles["spacing-x"] : "5px",
        }}
      >
        {grid.map((row, i) =>
          row.map((char, j) => {
            const isSelected = selected.some(([x, y]) => x === i && y === j);
            return (
              <button
                key={`${i}-${j}`}
                style={{
                  width: "24px",
                  height: "24px",
                  //   border: "1px solid black",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backgroundColor: isSelected
                    ? styles["bg-selected"]
                      ? styles["bg-selected"]
                      : "#fef08a"
                    : "transparent",
                  borderRadius: styles.radius ? styles.radius : "50%",
                  padding: "0",
                }}
                onMouseDown={() => handleMouseDown(i, j)}
                onMouseEnter={() => handleMouseEnter(i, j)}
              >
                {char}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SopaDeLetras;
