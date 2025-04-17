varying vec3 csm_vPositionW;
uniform float uWaterLevel;
uniform vec3 uGrassColor;
uniform vec3 uUnderwaterColor;

void main() {
    vec3 baseColor = csm_DiffuseColor.rgb;

    float heightFactor = smoothstep(uWaterLevel + 1.0, uWaterLevel, csm_vPositionW.y);
    baseColor = mix(baseColor, baseColor * 0.5, heightFactor);
   
    float oceanFactor = smoothstep(min(uWaterLevel - 0.4, 0.2), 0.0, csm_vPositionW.y);
    baseColor = mix(baseColor, uUnderwaterColor, oceanFactor);

    float grassFactor = smoothstep(uWaterLevel + 0.4, max(uWaterLevel + 1.6, 3.0), csm_vPositionW.y);
    baseColor = mix(baseColor, uGrassColor, grassFactor);
   
    csm_DiffuseColor = vec4(baseColor, 1.0);  
}