varying vec2 vUv;

uniform float uTime;
uniform float uWaveFactor;
uniform sampler2D uDistanceMap;
uniform sampler2D uPerlinNoise;

void main() {
  float terrainData = texture2D(uDistanceMap, vUv).r;
  float proximity = 1.0 - texture2D(uDistanceMap, vUv).r;

  float noise = texture2D(uPerlinNoise, vUv).r;

  // wave synchronised to float
  // float baseSpeed = 0.03;
  // float floatModulation = 0.03 * uWaveFactor; // Ajuste ce facteur pour l'effet voulu

  // wave doing back and forth motion
  // float ripple = terrainData + uTime * (baseSpeed + floatModulation);

  float ripple = terrainData + uTime * 0.05 ;
  ripple = ripple * 10.0;
  ripple = mod(ripple, 4.0);
  ripple -= (1.0 - terrainData);
  ripple += noise * noise * 2.0;

  if (ripple > 0.001) {
    discard;
  }

  csm_FragColor = vec4(vec3(1.5), 1.0);
}