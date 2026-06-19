import{C as v,V as o,c as f,d as x,W as p,e as _,T as b,L as c,f as g,D as C,M as y}from"./LanguageButton.astro_astro_type_script_index_0_lang.Bw8qwCtD.js";var S=`uniform vec2 u_resolution;
varying vec2 v_uv;

void main() {
  vec2 xy = position.xy * 2.0;

  v_uv = uv;
  gl_Position = vec4(xy, 0.0, 1.0);
}`,W=`uniform sampler2D u_textures[5];
uniform float u_time;
uniform float u_visibleLerp;
uniform float u_cornerSize;
uniform int u_prevIndex;
uniform int u_index;
uniform int u_maxIndex;
uniform float u_borderWidth;
uniform vec2 u_domWH;
uniform vec2 u_textureSize[5]; 
varying vec2 v_uv;

float rand(float x) {
  return fract(sin(x * 12.9898) * 43758.5453);
}

float box(vec2 uv, vec2 center, vec2 size, float radius, float antialias) {
  vec2 d = abs(uv - center) - size + radius;
  float l = length(max(d, 0.)) + min(max(d.x, d.y), 0.);
  return smoothstep(antialias, 0.0, l - radius);
}

vec2 getCoverUV(vec2 uv, vec2 textureSize, vec2 containerSize) {
  
  float textureAspect = textureSize.x / textureSize.y;
  float containerAspect = containerSize.x / containerSize.y;

  vec2 newUV = uv;

  if (textureAspect > containerAspect) {
    
    float scale = containerAspect / textureAspect;
    newUV.x = (uv.x - 0.5) * scale + 0.5;
  } else {
    
    float scale = textureAspect / containerAspect;
    newUV.y = (uv.y - 0.5) * scale + 0.5;
  }

  return newUV;
}

vec4 getTexture(int i, vec2 uv) {
  if (i > u_maxIndex) return vec4(0.0);
  
  vec2 coverUV = getCoverUV(uv, u_textureSize[i], u_domWH);
  if (i == 0) return texture2D(u_textures[0], coverUV);
  if (i == 1) return texture2D(u_textures[1], coverUV);
  if (i == 2) return texture2D(u_textures[2], coverUV);
  if (i == 3) return texture2D(u_textures[3], coverUV);
  if (i == 4) return texture2D(u_textures[4], coverUV);
  return vec4(0.0);
}

float easeOutCirc(float t) {
  return sqrt(1.0 - pow(t - 1.0, 2.0));
}

float getSliceIndex(float x) {
  float totalSlices = 40.0; 
  float accumWidth = 0.0;

  for (float i = 0.0; i < totalSlices; i++) {
    
    float sliceWidth = (0.5 + 1.5 * rand(i)) / totalSlices;

    if (x <= accumWidth + sliceWidth) {
      return i;
    }
    accumWidth += sliceWidth;
  }

  return totalSlices - 1.0;
}

void main() {
    float numSlices = u_domWH.x / 1.0;
    float xSlice = floor(v_uv.x * numSlices);

    
    float offset = rand(xSlice) * 0.01;
    float adjustedProgress = clamp((u_visibleLerp - offset * 0.5) / (1.0 - 0.5), 0.0, 1.0);

    float borderWidth = 1.09;
    float borderPosition;
    if (u_index < u_prevIndex) {
      borderPosition = mix(-borderWidth, 1.0 + borderWidth, easeOutCirc(adjustedProgress));
    } else {
      borderPosition = mix(1.0 + borderWidth, -borderWidth, easeOutCirc(adjustedProgress));
    }

    float distFromBorder = v_uv.y - borderPosition;

    vec4 texture0 = getTexture(min(u_index, u_prevIndex), v_uv);
    vec4 texture1 = getTexture(max(u_index, u_prevIndex), v_uv);

    
    int index = (u_index > u_prevIndex)
        ? min(u_index, u_prevIndex)
        : max(u_index, u_prevIndex);
    float blendFactor = smoothstep(-borderWidth, borderWidth, distFromBorder);
    vec4 borderColor = vec4(getTexture(index, vec2(v_uv.x, 1.0)));
    vec4 blendedTex0 = mix(texture0, borderColor, blendFactor);
    vec4 blendedTex1 = mix(borderColor, texture1, blendFactor);
    vec4 resultColor = mix(blendedTex0, blendedTex1, blendFactor);

    
    float fadeWidth = borderWidth * 0.52; 
    float borderDistance = abs(distFromBorder);

    
    float borderIntensity = 1.0 - smoothstep(0.0, borderWidth, borderDistance);

    
    float blendIntensity = smoothstep(borderWidth - fadeWidth, borderWidth, borderDistance);

    
    resultColor = mix(borderColor, resultColor, blendIntensity);
    resultColor = mix(resultColor, borderColor, borderIntensity * (1.0 - blendIntensity));

    
    float antialias = 2.0;
    float mask = box(v_uv * u_domWH, u_domWH / 2.0, u_domWH / 2.0, u_cornerSize, antialias);

    vec4 finalColor = mix(vec4(0.0), resultColor, mask);

    gl_FragColor = finalColor;
}`;const I=.0075,z=5,w="ImageChangeCanvas-fallback";(class extends v{static componentName="ImageChangeCanvas";canvas=null;scene=null;camera=null;renderer=null;geometry=null;mesh=null;time=0;dpr=1;rafId=null;isDestroyed=!1;resizeObserver=null;lastRenderTime=0;targetFPS=60;frameInterval=1e3/this.targetFPS;sharedUniforms={u_resolution:{value:new o(1,1)},u_time:{value:0},u_visible:{value:1},u_visibleLerp:{value:1},u_prevIndex:{value:0},u_index:{value:0},u_borderWidth:{value:1}};onInit(){if(!this.isWebGLAvailable()){this.handleWebGLFallback();return}this.initializeRenderer(),this.setupResizeObserver(),this.createMesh(),this.time=performance.now(),this.animate()}isWebGLAvailable(){try{const e=document.createElement("canvas"),t=e.getContext("webgl")||e.getContext("experimental-webgl");return!!(window.WebGLRenderingContext&&t)}catch{return!1}}handleWebGLFallback(){const e=document.querySelectorAll("[data-image-change-canvas]");this.el?.remove(),e.forEach(t=>{const n=this.parseConfig(t.dataset.ImageChangeCanvas);if(n.src?.[0]){const r=document.createElement("img");r.src=`/assets/images/canvas-image/${this.isSp?"sp":"pc"}/${n.src[0]}`,r.alt="",r.classList.add(w),t.appendChild(r)}})}initializeRenderer(){this.dpr=Math.min(window.devicePixelRatio,2),this.canvas=this.el,this.scene=new f,this.camera=new x,this.renderer=new p({canvas:this.canvas,alpha:!0,premultipliedAlpha:!1,antialias:!1,powerPreference:"high-performance"});const e=this.el.parentElement;this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.setPixelRatio(this.dpr),this.renderer.setClearColor(0,0),this.geometry=new _(1,1,1,1),this.sharedUniforms.u_resolution.value.set(e.clientWidth,e.clientHeight)}setupResizeObserver(){this.el?.parentElement&&(this.resizeObserver=new ResizeObserver(e=>{if(this.isDestroyed)return;const t=e[0];if(t){const{width:n,height:r}=t.contentRect;requestAnimationFrame(()=>{this.handleResize(n,r)})}}),this.resizeObserver.observe(this.el.parentElement))}parseConfig(e){try{return JSON.parse(e||"{}")}catch(t){return console.warn("Failed to parse ImageChangeCanvas config:",t),{}}}async createMesh(){const e=this.parseConfig(this.el.dataset.imageChangeCanvas);if(e.src?.length)try{const{textures:t,textureSizes:n}=await this.loadTextures(e.src);this.createShaderMesh(t,n,e),this.setupEventListeners()}catch(t){console.error("Failed to create mesh:",t)}}async loadTextures(e){const t=new b,n=[],r=[],i=e.map((s,l)=>new Promise((u,h)=>{const m=t.load(`/assets/images/canvas-image/${this.isSp?"sp":"pc"}/${s}`,a=>{const d=a.image;r[l]=new o(d.width,d.height),a.generateMipmaps=!1,a.minFilter=c,a.magFilter=c,u()},void 0,h);n[l]=m}));return await Promise.all(i),{textures:n,textureSizes:r}}createShaderMesh(e,t,n){const r=Array.from({length:z},(l,u)=>t[u]||new o(1,1)),i=this.el.parentElement,s=new g({uniforms:{u_textures:{value:e},u_textureSize:{value:r},u_resolution:this.sharedUniforms.u_resolution,u_time:this.sharedUniforms.u_time,u_visible:{value:1},u_visibleLerp:{value:1},u_cornerSize:{value:n.cornerSize||0},u_maxIndex:{value:n.src.length-1},u_prevIndex:{value:0},u_index:{value:0},u_domWH:{value:new o(i.clientWidth,i.clientHeight)},u_borderWidth:{value:n.borderWidth||1}},vertexShader:S,fragmentShader:W,side:C});this.mesh=new y(this.geometry,s),this.scene?.add(this.mesh)}setupEventListeners(){this.on("ImageChangeCanvas",(e,t,n,r,i)=>{if(this.isDestroyed||!this.mesh||i&&i!==this.el.dataset.imageChangeCanvasId)return;const s=this.mesh.material.uniforms;r||(s.u_prevIndex.value=e),s.u_index.value=t,s.u_visible.value=n,s.u_visibleLerp.value=0})}handleResize(e,t){this.isDestroyed||!this.renderer||!this.canvas||(this.renderer.setSize(e*this.dpr,t*this.dpr),this.canvas.style.width=`${e}px`,this.canvas.style.height=`${t}px`,this.sharedUniforms.u_resolution.value.set(e,t),this.mesh?.material.uniforms.u_domWH&&this.mesh.material.uniforms.u_domWH.value.set(e,t))}onResize(){const e=this.el?.parentElement;e&&this.handleResize(e.clientWidth,e.clientHeight)}animate(){if(this.isDestroyed)return;const e=t=>{if(this.isDestroyed||(this.rafId=requestAnimationFrame(e),t-this.lastRenderTime<this.frameInterval))return;const n=t/1e3,r=n-this.time;this.time=n,this.lastRenderTime=t,this.updateUniforms(r),this.renderer?.render(this.scene,this.camera)};this.rafId===null&&(this.rafId=requestAnimationFrame(e))}updateUniforms(e){if(this.sharedUniforms.u_time.value+=e,this.mesh?.material.uniforms){const t=this.mesh.material.uniforms.u_visible,n=this.mesh.material.uniforms.u_visibleLerp;if(t&&n){const r=t.value,i=n.value;Math.abs(r-i)>.001?n.value+=(r-i)*I:n.value=r}}}onDestroy(){this.isDestroyed=!0,this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.resizeObserver?.disconnect(),this.resizeObserver=null,this.disposeMesh(),this.disposeRenderer(),this.removeCanvas()}disposeMesh(){if(this.mesh){this.scene?.remove(this.mesh),this.mesh.geometry?.dispose();const e=this.mesh.material;Array.isArray(e)?e.forEach(t=>this.disposeMaterial(t)):this.disposeMaterial(e),this.mesh=null}}disposeMaterial(e){if(!e)return;const t=e.uniforms?.u_textures?.value;Array.isArray(t)&&t.forEach(n=>n?.dispose?.()),e.dispose()}disposeRenderer(){this.renderer&&(this.renderer.dispose(),this.renderer.forceContextLoss?.(),this.renderer=null),this.scene?.clear(),this.scene=null,this.camera=null,this.geometry?.dispose(),this.geometry=null}removeCanvas(){this.canvas?.parentNode&&this.canvas.parentNode.removeChild(this.canvas),this.canvas=null}}).register();
