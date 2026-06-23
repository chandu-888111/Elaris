import{j as e,bE as T,bF as N,r as n,bG as L,bH as A,bI as C,bA as z,bJ as M,bK as v}from"./index-B2LsKEZE.js";import{L as B}from"./Logo-CA7rvoo5.js";import{$ as F,a2 as O,a4 as R,a7 as D,V as E,a8 as G,a5 as I,s as j,a9 as V,w as P,i as W,k as _}from"./three-BlwufqMb.js";import"./framer-motion-BuzgYyqz.js";function q(){const a=n.useRef(null),[u,r]=n.useMemo(()=>{const t=new Float32Array(24e3),i=new Float32Array(8e3*3);for(let o=0;o<8e3;o++){const m=1.2+Math.random()*5.5,h=Math.random()*Math.PI*2+m*2.5,w=.2+Math.random()*.15,f=(Math.random()-.5)*.08*m,p=Math.cos(h)*m+f,k=(Math.random()-.5)*.1*m*w,b=Math.sin(h)*m+f;t[o*3]=p,t[o*3+1]=k,t[o*3+2]=b;const x=p*.15,g=1-x,y=(m-1.2)/5.5;i[o*3]=1*g,i[o*3+1]=(.8-y*.4)*g,i[o*3+2]=(.6-y*.5+(x<0?Math.abs(x):0))*g}return[t,i]},[]),d=n.useMemo(()=>{const t=document.createElement("canvas");t.width=32,t.height=32;const i=t.getContext("2d");if(i){const o=i.createRadialGradient(16,16,0,16,16,16);o.addColorStop(0,"rgba(255, 255, 255, 1)"),o.addColorStop(.2,"rgba(255, 200, 50, 1)"),o.addColorStop(.5,"rgba(255, 50, 0, 0.6)"),o.addColorStop(1,"rgba(0, 0, 0, 0)"),i.fillStyle=o,i.fillRect(0,0,32,32)}return new V(t)},[]);return j(t=>{a.current&&(a.current.rotation.y=t.clock.elapsedTime*.2)}),e.jsxs("points",{ref:a,children:[e.jsxs("bufferGeometry",{children:[e.jsx("bufferAttribute",{attach:"attributes-position",args:[u,3]}),e.jsx("bufferAttribute",{attach:"attributes-color",args:[r,3]})]}),e.jsx("pointsMaterial",{size:.18,map:d,transparent:!0,opacity:.8,blending:P,depthWrite:!1,vertexColors:!0})]})}function H(){const s=n.useRef(null),a=n.useRef(null),u=n.useMemo(()=>({uTime:{value:0},uLocalCameraPos:{value:new W}}),[]);return j(t=>{if(s.current&&a.current){s.current.uniforms.uTime.value=t.clock.elapsedTime;const i=s.current.uniforms.uLocalCameraPos.value;i.copy(t.camera.position),a.current.worldToLocal(i)}}),e.jsxs("mesh",{ref:a,children:[e.jsx("boxGeometry",{args:[40,40,40]}),e.jsx("shaderMaterial",{ref:s,vertexShader:`
    varying vec3 vLocalPos;
    void main() {
      vLocalPos = position; 
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform float uTime;
    uniform vec3 uLocalCameraPos;
    varying vec3 vLocalPos;

    float hash(vec3 p) {
        p  = fract( p*0.3183099+.1 );
        p *= 17.0;
        return fract( p.x*p.y*p.z*(p.x+p.y+p.z) );
    }

    float noise(in vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f*f*(3.0-2.0*f);
        return mix(mix(mix( hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)),f.x),
                       mix( hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x),f.y),
                   mix(mix( hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),
                       mix( hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x),f.y),f.z);
    }

    void main() {
      vec3 ro = uLocalCameraPos;
      vec3 rd = normalize(vLocalPos - uLocalCameraPos);
      
      vec3 bhPos = vec3(0.0);
      float bhMass = 0.85; 
      
      vec3 p = ro;
      vec3 v = rd;
      float dt = 0.12; // OPTIMIZATION: Larger step size
      vec3 diskGlow = vec3(0.0);
      
      // OPTIMIZATION: Reduced loop from 150 to 80
      for(int i = 0; i < 80; i++) {
          vec3 old_p = p;
          vec3 dir = bhPos - p;
          float r = length(dir);
          
          if(r < bhMass * 0.95) break; 
          
          v += normalize(dir) * (bhMass / (r * r)) * dt * 0.65;
          v = normalize(v);
          p += v * dt;
          
          bool crossedPlane = sign(old_p.y) != sign(p.y);
          bool nearPlane = abs(p.y) < 0.2;
          
          if((crossedPlane || nearPlane) && r > bhMass && r < 6.5) {
              float distFromCenter = r - bhMass;
              float gasDensity = smoothstep(6.5, bhMass, r);
              
              float angle = atan(p.z, p.x) + uTime * 2.5 / r; 
              vec3 noisePos = vec3(cos(angle)*r, 0.0, sin(angle)*r) * 5.0;
              float n = noise(noisePos - vec3(uTime * 1.5));
              
              float intensity = (1.0 / (distFromCenter * distFromCenter * 1.5 + 0.1)) * n * gasDensity;
              float crossBoost = crossedPlane ? 2.0 : 1.0;
              
              // DOPPLER EFFECT in Shader (Brighter/Bluer on Left, Dimmer on Right)
              float doppler = p.x * 0.25; 
              float shift = 1.0 - doppler;
              
              vec3 color = vec3(1.0, 0.6, 0.2); // Base Orange
              if (doppler < 0.0) {
                 color += vec3(0.2, 0.4, 0.8) * abs(doppler); // Add blue to approaching side
              }
              
              diskGlow += color * intensity * 0.05 * crossBoost * shift; 
          }
          
          if(r > 15.0) break; // OPTIMIZATION: Early exit
      }
      
      // Add pure white core heat
      diskGlow += vec3(1.0, 0.9, 0.8) * pow(length(diskGlow), 3.0) * 0.2;
      
      gl_FragColor = vec4(diskGlow, clamp(length(diskGlow), 0.0, 1.0));
    }
  `,uniforms:u,transparent:!0,depthWrite:!1,depthTest:!1,blending:P,side:_})]})}function Z(){return e.jsxs("mesh",{children:[e.jsx("sphereGeometry",{args:[.85,64,64]}),e.jsx("meshBasicMaterial",{color:"#000000"})]})}function $(){const s=n.useRef(null),a=1e3,u=n.useMemo(()=>{const r=new Float32Array(a*3);for(let d=0;d<a;d++)r[d*3]=(Math.random()-.5)*20,r[d*3+1]=(Math.random()-.5)*20,r[d*3+2]=(Math.random()-.5)*10+5;return r},[]);return j(r=>{s.current&&(s.current.rotation.y=r.clock.elapsedTime*.02,s.current.rotation.x=r.clock.elapsedTime*.01)}),e.jsxs("points",{ref:s,children:[e.jsx("bufferGeometry",{children:e.jsx("bufferAttribute",{attach:"attributes-position",args:[u,3]})}),e.jsx("pointsMaterial",{color:"#ffffff",size:.05,transparent:!0,opacity:.3,sizeAttenuation:!0})]})}function J(){return j(s=>{const a=s.clock.elapsedTime;s.camera.position.x=Math.sin(a*.05)*.5,s.camera.position.y=Math.cos(a*.05)*.2,s.camera.lookAt(2.5,1.5,0)}),null}function K(){return e.jsx("div",{className:"fixed inset-0 -z-20 h-full w-full bg-[#020202] overflow-hidden pointer-events-none","aria-hidden":!0,children:e.jsxs(T,{camera:{position:[0,0,7.5],fov:40},children:[e.jsx("color",{attach:"background",args:["#010102"]}),e.jsx("ambientLight",{intensity:.02}),e.jsx(J,{}),e.jsx(F,{radius:100,depth:80,count:4e3,factor:5,saturation:0,fade:!0,speed:.5}),e.jsx($,{}),e.jsxs("group",{position:[2.5,1.5,0],rotation:[.15,-.3,.35],children:[e.jsx(Z,{}),e.jsx(q,{}),e.jsx(H,{})]}),e.jsxs(O,{multisampling:0,enableNormalPass:!1,children:[e.jsx(R,{luminanceThreshold:.2,luminanceSmoothing:.8,intensity:2,mipmapBlur:!0}),e.jsx(D,{blendFunction:N.NORMAL,offset:new E(.001,.001)}),e.jsx(G,{premultiply:!0,blendFunction:N.ADD,opacity:.4}),e.jsx(I,{eskil:!1,offset:.1,darkness:1.1})]})]})})}function ee(){const s=L(),{user:a,loading:u}=A(),[r,d]=n.useState("signin"),[t,i]=n.useState(""),[o,m]=n.useState(""),[h,w]=n.useState(""),[f,p]=n.useState(!1),[k,b]=n.useState(!1),[x,g]=n.useState("");n.useEffect(()=>{!u&&a&&s({to:"/dashboard"})},[a,u,s]);const y=async c=>{c.preventDefault(),p(!0);try{if(r==="signup"){const{error:l}=await M.auth.signUp({email:t,password:o,options:{emailRedirectTo:`${window.location.origin}/verified`,data:{display_name:h||t.split("@")[0]}}});if(l)throw l;v.success("Account created — verification code sent!"),b(!0)}else{const{error:l}=await M.auth.signInWithPassword({email:t,password:o});if(l)throw l;v.success("Welcome back!"),s({to:"/dashboard"})}}catch(l){v.error(l.message)}finally{p(!1)}},S=async c=>{c.preventDefault(),p(!0);try{const{error:l}=await M.auth.verifyOtp({email:t,token:x,type:"signup"});if(l)throw l;v.success("Email verified successfully!"),s({to:"/verified"})}catch(l){v.error(l.message)}finally{p(!1)}};return e.jsxs("div",{className:"relative flex min-h-screen items-center justify-center px-4",children:[e.jsx(K,{}),e.jsxs("div",{className:"relative w-full max-w-md",children:[e.jsx("div",{className:"mb-8 flex justify-center",children:e.jsx(B,{})}),k?e.jsxs("div",{className:"glass-strong rounded-3xl p-8 ring-spark animate-in fade-in duration-300",children:[e.jsx("h1",{className:"font-display text-2xl font-semibold",children:"Verify your email"}),e.jsxs("p",{className:"mt-2 text-sm text-muted-foreground leading-relaxed",children:["We have sent a verification email to ",e.jsx("strong",{children:t}),"."]}),e.jsx("p",{className:"mt-1 text-xs text-muted-foreground/80 leading-relaxed",children:"Click the link in the email to verify, or if your template sends a 6-digit code, enter it below:"}),e.jsxs("form",{onSubmit:S,className:"mt-6 space-y-3",children:[e.jsx("input",{type:"text",required:!0,maxLength:6,value:x,onChange:c=>g(c.target.value.replace(/\D/g,"")),placeholder:"123456",className:"w-full text-center text-lg tracking-widest rounded-xl border border-border bg-background/50 px-4 py-3 outline-none focus:ring-2 focus:ring-ring font-mono"}),e.jsxs("button",{disabled:f,type:"submit",className:"inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-60",children:[f&&e.jsx(C,{className:"h-4 w-4 animate-spin"}),"Verify & Continue"]})]}),e.jsx("div",{className:"mt-5 text-center text-sm text-muted-foreground",children:e.jsx("button",{onClick:()=>b(!1),className:"font-medium text-foreground underline-offset-4 hover:underline",children:"Back to sign up"})})]}):e.jsxs("div",{className:"glass-strong rounded-3xl p-8 ring-spark",children:[e.jsx("h1",{className:"font-display text-2xl font-semibold",children:r==="signin"?"Welcome back":"Create your account"}),e.jsx("p",{className:"mt-1 text-sm text-muted-foreground",children:r==="signin"?"Sign in to continue building.":"Spark your first project in minutes."}),e.jsxs("form",{onSubmit:y,className:"mt-6 space-y-3",children:[r==="signup"&&e.jsx("input",{value:h,onChange:c=>w(c.target.value),placeholder:"Display name",className:"w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"}),e.jsx("input",{type:"email",required:!0,value:t,onChange:c=>i(c.target.value),placeholder:"you@example.com",className:"w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"}),e.jsx("input",{type:"password",required:!0,minLength:6,value:o,onChange:c=>m(c.target.value),placeholder:"Password",className:"w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"}),e.jsxs("button",{disabled:f,type:"submit",className:"inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-60",children:[f&&e.jsx(C,{className:"h-4 w-4 animate-spin"}),r==="signin"?"Sign in":"Create account"]})]}),e.jsxs("div",{className:"mt-5 text-center text-sm text-muted-foreground",children:[r==="signin"?"New here?":"Already have an account?"," ",e.jsx("button",{onClick:()=>d(r==="signin"?"signup":"signin"),className:"font-medium text-foreground underline-offset-4 hover:underline",children:r==="signin"?"Sign up":"Sign in"})]})]}),e.jsx("div",{className:"mt-6 text-center text-xs text-muted-foreground",children:e.jsx(z,{to:"/",className:"hover:text-foreground",children:"← back to home"})})]})]})}export{ee as component};
