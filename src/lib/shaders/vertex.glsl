uniform float u_time;
uniform vec2 u_mouse; // 👈 1. Принимаем uniform

varying float v_depth;

void main() {
  // Конвертируем позицию мыши в систему координат нашей сцены
  vec2 mouse_plane = vec2(u_mouse.x * 20.0 - 10.0, u_mouse.y * 20.0 - 10.0);
  
  // Рассчитываем расстояние от частицы до курсора
  float dist = distance(position.xy, mouse_plane);

  // Чем ближе курсор, тем сильнее смещение по оси Z
  float strength = smoothstep(2.0, 0.0, dist);

  vec3 pos = position;

  // Создаем очень медленную и плавную волну по оси Z
  pos.z += sin(pos.x * 0.2 + u_time * 0.1) * 0.05;
  pos.z += sin(pos.y * 0.2 + u_time * 0.1) * 0.05;

  // 👇 2. Добавляем смещение от мыши
  pos.z += strength * 2.0;

  v_depth = pos.z;
  
  // Делаем частицы очень маленькими
  gl_PointSize = 2.0;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}