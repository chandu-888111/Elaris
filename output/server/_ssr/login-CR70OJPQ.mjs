import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-DwafHdRl.mjs";
import { u as useAuth, S as SharedCanvas } from "./router-DT2A3-T4.mjs";
import { L as Logo } from "./Logo-AqCW_hF-.mjs";
import { d as dt, w as wt, y as yt, A as At, q as qt } from "../_libs/react-three__postprocessing.mjs";
import { d as BlendFunction } from "../_libs/postprocessing.mjs";
import "./ai-gateway-BOABUhLo.mjs";
import "./ai-DTqZfz-A.mjs";
import "../_libs/seroval.mjs";
import { L as LoaderCircle } from "../_libs/lucide-react.mjs";
import { S as Stars } from "../_libs/react-three__drei.mjs";
import { a as useFrame } from "../_libs/react-three__fiber.mjs";
import { d as Vector2, ao as CanvasTexture, v as AdditiveBlending, e as Vector3, s as BackSide } from "../_libs/three.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/ai.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/zod.mjs";
import "../_libs/@vercel/oidc.mjs";
import "os";
import "path";
import "fs";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/react-use-measure.mjs";
import "../_libs/maath.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "../_libs/ai-sdk__google.mjs";
import "../_libs/ai-sdk__anthropic.mjs";
import "../_libs/ai-sdk__cohere.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/babel__runtime.mjs";
import "../_libs/three-stdlib.mjs";
import "../_libs/troika-three-text.mjs";
import "../_libs/troika-worker-utils.mjs";
import "../_libs/webgl-sdf-generator.mjs";
import "../_libs/bidi-js.mjs";
import "../_libs/troika-three-utils.mjs";
import "../_libs/suspend-react.mjs";
import "../_libs/tunnel-rat.mjs";
function AccretionDisk() {
  const count = 8e3;
  const ref = reactExports.useRef(null);
  const [positions, colors] = reactExports.useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 5.5;
      const angle = Math.random() * Math.PI * 2 + r * 2.5;
      const tilt = 0.2 + Math.random() * 0.15;
      const spread = (Math.random() - 0.5) * 0.08 * r;
      const x = Math.cos(angle) * r + spread;
      const y = (Math.random() - 0.5) * 0.1 * r * tilt;
      const z = Math.sin(angle) * r + spread;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      const doppler = x * 0.15;
      const intensity = 1 - doppler;
      const t = (r - 1.2) / 5.5;
      col[i * 3] = 1 * intensity;
      col[i * 3 + 1] = (0.8 - t * 0.4) * intensity;
      col[i * 3 + 2] = (0.6 - t * 0.5 + (doppler < 0 ? Math.abs(doppler) : 0)) * intensity;
    }
    return [pos, col];
  }, []);
  const fireTexture = reactExports.useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 200, 50, 1)");
      gradient.addColorStop(0.5, "rgba(255, 50, 0, 0.6)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    return new CanvasTexture(canvas);
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("points", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("bufferGeometry", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("bufferAttribute", { attach: "attributes-position", args: [positions, 3] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("bufferAttribute", { attach: "attributes-color", args: [colors, 3] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "pointsMaterial",
      {
        size: 0.18,
        map: fireTexture,
        transparent: true,
        opacity: 0.8,
        blending: AdditiveBlending,
        depthWrite: false,
        vertexColors: true
      }
    )
  ] });
}
function LensingShader() {
  const materialRef = reactExports.useRef(null);
  const meshRef = reactExports.useRef(null);
  const uniforms = reactExports.useMemo(
    () => ({
      uTime: { value: 0 },
      uLocalCameraPos: { value: new Vector3() }
    }),
    []
  );
  useFrame((state) => {
    if (materialRef.current && meshRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      const localCam = materialRef.current.uniforms.uLocalCameraPos.value;
      localCam.copy(state.camera.position);
      meshRef.current.worldToLocal(localCam);
    }
  });
  const vertexShader = `
    varying vec3 vLocalPos;
    void main() {
      vLocalPos = position; 
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const fragmentShader = `
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
  `;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("boxGeometry", { args: [40, 40, 40] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "shaderMaterial",
      {
        ref: materialRef,
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: AdditiveBlending,
        side: BackSide
      }
    )
  ] });
}
function EventHorizon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("sphereGeometry", { args: [0.85, 64, 64] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: "#000000" })
  ] });
}
function CinematicDust() {
  const ref = reactExports.useRef(null);
  const count = 1e3;
  const positions = reactExports.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 + 5;
    }
    return pos;
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("points", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("bufferGeometry", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("bufferAttribute", { attach: "attributes-position", args: [positions, 3] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointsMaterial", { color: "#ffffff", size: 0.05, transparent: true, opacity: 0.3, sizeAttenuation: true })
  ] });
}
function CinematicCamera() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.05) * 0.5;
    state.camera.position.y = Math.cos(t * 0.05) * 0.2;
    state.camera.lookAt(2.5, 1.5, 0);
  });
  return null;
}
function BlackHoleBackground() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 -z-20 h-full w-full bg-[#020202] overflow-hidden pointer-events-none",
      "aria-hidden": true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SharedCanvas, { camera: { position: [0, 0, 7.5], fov: 40 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("color", { attach: "background", args: ["#010102"] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.02 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CinematicCamera, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stars, { radius: 100, depth: 80, count: 4e3, factor: 5, saturation: 0, fade: true, speed: 0.5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CinematicDust, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [2.5, 1.5, 0], rotation: [0.15, -0.3, 0.35], children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(EventHorizon, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccretionDisk, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LensingShader, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(dt, { multisampling: 0, enableNormalPass: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(wt, { luminanceThreshold: 0.2, luminanceSmoothing: 0.8, intensity: 2, mipmapBlur: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            yt,
            {
              blendFunction: BlendFunction.NORMAL,
              offset: new Vector2(1e-3, 1e-3)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(At, { premultiply: true, blendFunction: BlendFunction.ADD, opacity: 0.4 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(qt, { eskil: false, offset: 0.1, darkness: 1.1 })
        ] })
      ] })
    }
  );
}
function LoginPage() {
  const navigate = useNavigate();
  const {
    user,
    loading
  } = useAuth();
  const [mode, setMode] = reactExports.useState("signin");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [showOtp, setShowOtp] = reactExports.useState(false);
  const [otpToken, setOtpToken] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!loading && user) navigate({
      to: "/dashboard"
    });
  }, [user, loading, navigate]);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/verified`,
            data: {
              display_name: name || email.split("@")[0]
            }
          }
        });
        if (error) throw error;
        toast.success("Account created — verification code sent!");
        setShowOtp(true);
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({
          to: "/dashboard"
        });
      }
    } catch (e2) {
      toast.error(e2.message);
    } finally {
      setBusy(false);
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const {
        error
      } = await supabase.auth.verifyOtp({
        email,
        token: otpToken,
        type: "signup"
      });
      if (error) throw error;
      toast.success("Email verified successfully!");
      navigate({
        to: "/verified"
      });
    } catch (e2) {
      toast.error(e2.message);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen items-center justify-center px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BlackHoleBackground, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
      showOtp ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-3xl p-8 ring-spark animate-in fade-in duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold", children: "Verify your email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: [
          "We have sent a verification email to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: email }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground/80 leading-relaxed", children: "Click the link in the email to verify, or if your template sends a 6-digit code, enter it below:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: verifyOtp, className: "mt-6 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, maxLength: 6, value: otpToken, onChange: (e) => setOtpToken(e.target.value.replace(/\D/g, "")), placeholder: "123456", className: "w-full text-center text-lg tracking-widest rounded-xl border border-border bg-background/50 px-4 py-3 outline-none focus:ring-2 focus:ring-ring font-mono" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: busy, type: "submit", className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-60", children: [
            busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            "Verify & Continue"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowOtp(false), className: "font-medium text-foreground underline-offset-4 hover:underline", children: "Back to sign up" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-3xl p-8 ring-spark", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold", children: mode === "signin" ? "Welcome back" : "Create your account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: mode === "signin" ? "Sign in to continue building." : "Spark your first project in minutes." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-6 space-y-3", children: [
          mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Display name", className: "w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password", className: "w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: busy, type: "submit", className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-spark px-4 py-3 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-60", children: [
            busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            mode === "signin" ? "Sign in" : "Create account"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 text-center text-sm text-muted-foreground", children: [
          mode === "signin" ? "New here?" : "Already have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode(mode === "signin" ? "signup" : "signin"), className: "font-medium text-foreground underline-offset-4 hover:underline", children: mode === "signin" ? "Sign up" : "Sign in" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground", children: "← back to home" }) })
    ] })
  ] });
}
export {
  LoginPage as component
};
