varying vec3 csm_vPositionW;

uniform float uTime;
uniform float uWaveSpeed;
uniform float uWaveAmplitude;
uniform float uWaterLevel;
uniform vec3 uGrassColor;
uniform vec3 uUnderwaterColor;
uniform float uFoamDepth;

// Simple 2D noise basé sur des interpolations lissées
float hash(vec2 p) {
  return fract(sin(dot(p ,vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  // Quatre coins
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  // Interpolation lissée
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float random(float x) {
  return fract(sin(x)*100000.0);
}

float noise(float x) {
  float i = floor(x);  // integer
  float f = fract(x);  // fraction
  return mix(random(i), random(i + 1.0), f);
}

void main() {
  vec3 baseColor = csm_DiffuseColor.rgb;

  float height = csm_vPositionW.y;

  float offset = mix(-0.1, 0.1, noise(csm_vPositionW.x * csm_vPositionW.z * csm_vPositionW.y * 0.2));
  // float offset = 0.0;

  if (height < uWaterLevel - 0.2 + + offset) {
    baseColor = uUnderwaterColor;
  }  else if (height < uWaterLevel + 0.4 + offset) {
    baseColor = baseColor * 0.8;
  } else if (height < uWaterLevel +1.2 + offset) {
    baseColor = baseColor;
  } else {
    baseColor = uGrassColor;
  }

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