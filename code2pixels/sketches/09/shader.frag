// code2pixels - #09
// by @code2pixels_ / @sandromiccoli
// 18/10/2021

#ifdef GL_ES
precision mediump float; // highp
#endif

#define PI 3.14159265359
#define HALF_PI 1.5707963267948966

uniform vec3 u_color0;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_seed;
uniform float u_genki;


vec3 colorRandom(in float _c){
    vec3 c = u_color0;
    if(step(1.-1./5.,_c) == 1.0){
        c=u_color1;
    } else if(step(1.-2./5.,_c) == 1.0){
        c=u_color2;
    } else if(step(1.-3./5.,_c) == 1.0){
        c=u_color3;
    } else if(step(1.-4./5.,_c) == 1.0){
        c=u_color4;
    }
    return c;
}


// source: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float random(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

float random (in float x) {
    return fract(sin(x)*1e4);
}

float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(random(b), random(b + d.yx), f.x), mix(random(b + d.xy), random(b + d.yy), f.x), f.y);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;

  st-=0.5;
  st*=2.;
  st*= vec2(75,75./u_resolution.x*u_resolution.y);
  
  vec2 ipos = floor(st);
  
  float c = (noise(ipos+u_mouse)-(u_time*0.1))*0.75;
  c += distance(ipos,vec2(0.5,0.5))*0.0125-u_genki;

  vec3 t_color = colorRandom(fract(c));

  vec4 color = vec4(t_color, 1.0);
  gl_FragColor = color;
}
