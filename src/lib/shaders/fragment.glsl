varying float v_depth;

void main() {
  // Чем глубже частица, тем она прозрачнее
  float alpha = smoothstep(-0.5, 0.5, v_depth);

  // Цвет частиц - почти белый, с рассчитанной прозрачностью
  gl_FragColor = vec4(vec3(0.4), alpha);
}