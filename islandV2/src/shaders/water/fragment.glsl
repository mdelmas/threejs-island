varying vec2 vUv;

// uniform float uTime;
// uniform sampler2D uDistanceMapBigIsland;
// uniform sampler2D uDistanceMapSmallIsland;
// uniform sampler2D uPerlinNoise;
// uniform float uFrequency;
// uniform float uNoiseFrequency;
// uniform float uNoiseStrength;
// uniform float uTreshold;
// uniform float uWaveSpeed;
// uniform float uOscillationAmplitude; 
// uniform float uOscillationFrequency; 
// uniform float uWaveColorIntensity; 
// uniform float uWaveWidth;

void main() {
  // float terrainData = min(texture2D(uDistanceMapBigIsland, vUv).r, texture2D(uDistanceMapSmallIsland, vUv).r);
  // float terrainData = texture2D(uDistanceMapBigIsland, vUv).r;
  // // float terrainData = 1.0 - texture2D(uDistanceMap, vUv).r;
  // float mask = 1.0 - step(terrainData, 0.01); // ring around the island where the lines should be visible
  
  // // vec2 offset = vUv + vec2(sin(uTime) * 0.01);
  // // float offset = mix(-0.1, 0.1, noise(vUv.x * vUv.y * 0.2 + uTime));
  // // vec2 newUv = vUv + offset;

  // // vec2 offset = vec2(sin(vUv.x + uTime * 0.2), sin(vUv.y + uTime * 0.2));
  // // vec2 movingUv = vUv * vec2(uNoiseFrequency);
  // // vec2 movingUv = vUv * vec2(uNoiseFrequency);
  // float noise = texture2D(uPerlinNoise, vUv).r + sin(vUv.x * vUv.y + uTime) * 0.05 + 0.05;  
  // // float noise = texture2D(uPerlinNoise, vUv).r;  

  // // float noise = texture2D(uPerlinNoise, vUv * vec2(uNoiseFrequency)).r;

  // // FOAM
  // // float foamNoise = texture2D(uPerlinNoise, mod(vUv * vec2(uNoiseFrequency) * 5.0, 1.0)).r;

  // // float foam = smoothstep(0.1, 0.5, noise);
  // // foam = step(0.5, foam);  // binary step to create foam effect

  // if (mask < 0.01) {
  //   discard;
  // }

  // float oscillation = uTime - sin(uTime * uOscillationFrequency) * uOscillationAmplitude; // or = uTime for simple wave 
  // float ripple = terrainData * 2.0 + (oscillation * uWaveSpeed * 0.4);
  // // float correctedTerrain = terrainData / (1.0 - terrainData + 0.0001);
  // // float ripple = correctedTerrain + (oscillation * uWaveSpeed * 0.4);
  // ripple = mod(ripple * uFrequency, uWaveWidth);
  // ripple -= 1.0 - terrainData;

  // ripple += noise * noise * uNoiseStrength;

  // if (ripple > uTreshold) {
  //   discard;
  // }

  csm_FragColor = vec4(vec3(2.0), 1.0);
}