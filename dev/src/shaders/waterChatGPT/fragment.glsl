varying vec2 vUv;
varying float vWave;
uniform float time;

void main() {
  // Base bleu-vert douce
  vec3 base = vec3(0.3, 0.75, 0.95);

  // Variation douce avec les vagues
  float highlight = sin(vUv.x * 40.0 + time * 2.0) * 0.1;
  highlight += cos(vUv.y * 30.0 + time * 1.5) * 0.1;
  highlight += vWave * 0.3;

  // Ajout d'un effet "lumière qui bouge"
  float lightRipple = sin((vUv.x + time * 0.2) * 10.0) * 0.05;

  vec3 finalColor = base + vec3(highlight + lightRipple);

  gl_FragColor = vec4(finalColor, 1.0);
}
