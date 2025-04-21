varying vec3 csm_vPositionW;

uniform float uTime;
uniform float uWaveSpeed;
uniform float uWaveAmplitude;
uniform float uWaterLevel;
uniform vec3 uGrassColor;
uniform vec3 uUnderwaterColor;
uniform float uFoamDepth;

void main() {
  vec3 baseColor = csm_DiffuseColor.rgb;

  float heightFactor = smoothstep(uWaterLevel + 1.0, uWaterLevel, csm_vPositionW.y);
  baseColor = mix(baseColor, baseColor * 0.5, heightFactor);
  
  float oceanFactor = smoothstep(min(uWaterLevel - 0.4, 0.2), 0.0, csm_vPositionW.y);
  baseColor = mix(baseColor, uUnderwaterColor, oceanFactor);

  float grassFactor = smoothstep(uWaterLevel + 0.4, max(uWaterLevel + 1.6, 3.0), csm_vPositionW.y);
  baseColor = mix(baseColor, uGrassColor, grassFactor);

  // Foam Effect
  // Get the y position based on sine function, oscillating up and down over time
  float sineOffset = sin(uTime * uWaveSpeed) * uWaveAmplitude;

  // The current dynamic water height
  float currentWaterHeight = uWaterLevel + sineOffset;

  float stripe = smoothstep(currentWaterHeight + 0.01, currentWaterHeight - 0.01, csm_vPositionW.y) - smoothstep(currentWaterHeight + uFoamDepth + 0.01, currentWaterHeight + uFoamDepth - 0.01, csm_vPositionW.y);

  vec3 stripeColor = vec3(1.0, 1.0, 1.0); // White stripe

  // Apply the foam strip to baseColor    
  vec3 finalColor = mix(baseColor - stripe, stripeColor, stripe);

  // Output the final color
  csm_DiffuseColor = vec4(finalColor, 1.0);
}