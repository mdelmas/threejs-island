uniform float time;
varying vec2 vUv;
varying float vWave;

void main() {
  vUv = uv;
  vec3 pos = position;

  float wave = sin(pos.x * 0.1 + time) * 0.1;
  wave += cos(pos.y * 0.15 + time * 1.2) * 0.1;

  pos.z += wave;
  vWave = wave;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
