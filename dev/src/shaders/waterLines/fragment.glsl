varying vec2 vUv;

uniform float uTime;
uniform sampler2D uDistanceMap;
uniform sampler2D uPerlinNoise;
uniform float uFrequency;
uniform float uNoiseFrequency;
uniform float uTreshold;
uniform float uWaveSpeed;

void main() {
  // parameters
  float frequency = uFrequency;
  float noiseFrequency = uNoiseFrequency;
  float treshold = uTreshold;
  float waveSpeed = uWaveSpeed;
  //

  float terrainData = texture2D(uDistanceMap, vUv).r;
  float mask = 1.0 - step(terrainData, 0.01); // ring around the island where the lines should be visible

  if (mask < 0.01) {
    discard;
  }

  float ripple = terrainData + (uTime * waveSpeed);
  ripple = mod(ripple * frequency, 1.0);
  ripple -= 1.0 - terrainData;

  float noise = texture2D(uPerlinNoise, vUv * vec2(noiseFrequency)).r;
  ripple += noise * 1.0;

  if (ripple > treshold) {
    discard;
  }

  csm_FragColor = vec4(vec3(10.0), 1.0);
}



// uniform vec3 uWaveColorWhite;
// uniform vec3 uWaveColorLightBlue;
// uniform float uWaveSpeed;
// uniform float uWaveOffset;
// uniform float uWaveFrequency;
// uniform float uLightBlueWaveWidth;
// uniform float uWhiteWaveWidth;


//   float mask = texture2D(map, vUv).r;
//   float dist = 1.0 - mask;

//   float ringCount = 10.0;
//   float ring = fract(dist * ringCount);

//   float ringFade = smoothstep(0.4, 0.5, ring);

//   vec3 ringColor = mix(vec3(0.1), vec3(0.0, 0.5, 1.0), ringFade);

//   csm_FragColor = vec4(vec3(ring), 1.0);


  // vec3 baseColor = csm_FragColor.rgb;

  // float value = texture2D(uDistanceMap, vUv).r; // gray scale value from the map texture
  // // float waveLocation = 1.0 - step(value, 0.01); // ring around the island where the lines should be visible

  // float lightBlueWaveTreshold = step(sin(value * uWaveFrequency + uTime * uWaveSpeed) * 0.5 + 0.5, uLightBlueWaveWidth);
  // float lightBlueWaveLines = lightBlueWaveTreshold; // creates wave pattern going towards the island
  // // float lightBlueWaveLines = lightBlueWaveTreshold * waveLocation; // creates wave pattern going towards the island

  // float whiteWaveTreshold = step(sin(value * uWaveFrequency + uTime * uWaveSpeed + uWaveOffset) * 0.5 + 0.5, uWhiteWaveWidth);
  // float whiteWaveLines = whiteWaveTreshold; // creates wave pattern going towards the island
  // // float whiteWaveLines = whiteWaveTreshold * waveLocation; // creates wave pattern going towards the island
  
  // vec3 finalColor = mix(baseColor, uWaveColorLightBlue, lightBlueWaveLines);
  // finalColor = mix(finalColor, uWaveColorWhite, whiteWaveLines);

  // // float waveLines = clamp(generalWaveLines + whiteWaveLines, 0.0, 1.0);

  // // vec3 finalColor = mix(baseColor, vec3(1.0), generalWaveLines);
  // // float finalAlpha = mix(1.0, 0.8, generalWaveLines);

  // // vec3 whiteColor = mix(baseColor, vec3(1.0), 0.8);

  // // csm_FragColor =  csm_FragColor + vec4(vec3(waveLines), 1.0);
  // // csm_FragColor = vec4(mix(baseColor, whiteColor, whiteWaveLines), 1.0);

  // csm_FragColor = vec4(finalColor, 1.0);
  // csm_FragColor = vec4(whiteColor, 1.0);
  // csm_FragColor = vec4(vec3(whiteWaveLines), 1.0);
