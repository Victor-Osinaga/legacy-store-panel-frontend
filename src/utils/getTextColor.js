function getBrightness(hexColor) {
  // Convertir el valor hexadecimal a RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calcular el brillo usando la fórmula de luminosidad relativa
  return r * 0.299 + g * 0.587 + b * 0.114;
}

export default function getTextColor(hexColor) {
  const brightness = getBrightness(hexColor);
  // Si el brillo es menor que 128, el color de fondo es oscuro, y el texto debe ser blanco
  return brightness < 128 ? "#FFFFFF" : "#000000";
}
