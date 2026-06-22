import { _ as _extends } from "./babel__runtime.mjs";
import { r as reactExports } from "./react.mjs";
import { c as clientExports } from "./react-dom.mjs";
import { e as Vector3, D as DoubleSide, d as Vector2, P as PerspectiveCamera$1, O as OrthographicCamera, k as Vector4, g as Color, h as ShaderMaterial, l as Uniform, m as UniformsUtils, M as MathUtils, n as REVISION, o as WebGLRenderTarget, H as HalfFloatType, p as LinearFilter, q as DepthTexture, F as FloatType, r as Plane, s as BackSide, t as FrontSide, N as NoToneMapping, u as MeshPhysicalMaterial, v as AdditiveBlending, w as Spherical, S as Scene } from "./three.mjs";
import { u as useThree, a as useFrame, e as extend, c as context$1, b as createPortal } from "./react-three__fiber.mjs";
import { L as LineSegments2, a as Line2, b as LineMaterial, c as LineSegmentsGeometry, d as LineGeometry, O as OrbitControls$1 } from "./three-stdlib.mjs";
import { T as Text$1, p as preloadFont } from "./troika-three-text.mjs";
import { s as suspend } from "./suspend-react.mjs";
import { t as tunnel } from "./tunnel-rat.mjs";
const v1 = /* @__PURE__ */ new Vector3();
const v2 = /* @__PURE__ */ new Vector3();
const v3 = /* @__PURE__ */ new Vector3();
const v4 = /* @__PURE__ */ new Vector2();
function defaultCalculatePosition(el, camera, size) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
  objectPos.project(camera);
  const widthHalf = size.width / 2;
  const heightHalf = size.height / 2;
  return [objectPos.x * widthHalf + widthHalf, -(objectPos.y * heightHalf) + heightHalf];
}
function isObjectBehindCamera(el, camera) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
  const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
  const deltaCamObj = objectPos.sub(cameraPos);
  const camDir = camera.getWorldDirection(v3);
  return deltaCamObj.angleTo(camDir) > Math.PI / 2;
}
function isObjectVisible(el, camera, raycaster, occlude) {
  const elPos = v1.setFromMatrixPosition(el.matrixWorld);
  const screenPos = elPos.clone();
  screenPos.project(camera);
  v4.set(screenPos.x, screenPos.y);
  raycaster.setFromCamera(v4, camera);
  const intersects = raycaster.intersectObjects(occlude, true);
  if (intersects.length) {
    const intersectionDistance = intersects[0].distance;
    const pointDistance = elPos.distanceTo(raycaster.ray.origin);
    return pointDistance < intersectionDistance;
  }
  return true;
}
function objectScale(el, camera) {
  if (camera instanceof OrthographicCamera) {
    return camera.zoom;
  } else if (camera instanceof PerspectiveCamera$1) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const vFOV = camera.fov * Math.PI / 180;
    const dist = objectPos.distanceTo(cameraPos);
    const scaleFOV = 2 * Math.tan(vFOV / 2) * dist;
    return 1 / scaleFOV;
  } else {
    return 1;
  }
}
function objectZIndex(el, camera, zIndexRange) {
  if (camera instanceof PerspectiveCamera$1 || camera instanceof OrthographicCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const dist = objectPos.distanceTo(cameraPos);
    const A = (zIndexRange[1] - zIndexRange[0]) / (camera.far - camera.near);
    const B = zIndexRange[1] - A * camera.far;
    return Math.round(A * dist + B);
  }
  return void 0;
}
const epsilon = (value) => Math.abs(value) < 1e-10 ? 0 : value;
function getCSSMatrix(matrix, multipliers, prepend = "") {
  let matrix3d = "matrix3d(";
  for (let i = 0; i !== 16; i++) {
    matrix3d += epsilon(multipliers[i] * matrix.elements[i]) + (i !== 15 ? "," : ")");
  }
  return prepend + matrix3d;
}
const getCameraCSSMatrix = /* @__PURE__ */ ((multipliers) => {
  return (matrix) => getCSSMatrix(matrix, multipliers);
})([1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1]);
const getObjectCSSMatrix = /* @__PURE__ */ ((scaleMultipliers) => {
  return (matrix, factor) => getCSSMatrix(matrix, scaleMultipliers(factor), "translate(-50%,-50%)");
})((f) => [1 / f, 1 / f, 1 / f, 1, -1 / f, -1 / f, -1 / f, -1, 1 / f, 1 / f, 1 / f, 1, 1, 1, 1, 1]);
function isRefObject(ref) {
  return ref && typeof ref === "object" && "current" in ref;
}
const Html = /* @__PURE__ */ reactExports.forwardRef(({
  children,
  eps = 1e-3,
  style,
  className,
  prepend,
  center,
  fullscreen,
  portal,
  distanceFactor,
  sprite = false,
  transform = false,
  occlude,
  onOcclude,
  castShadow,
  receiveShadow,
  material,
  geometry,
  zIndexRange = [16777271, 0],
  calculatePosition = defaultCalculatePosition,
  as = "div",
  wrapperClass,
  pointerEvents = "auto",
  ...props
}, ref) => {
  const {
    gl,
    camera,
    scene,
    size,
    raycaster,
    events,
    viewport
  } = useThree();
  const [el] = reactExports.useState(() => document.createElement(as));
  const root = reactExports.useRef(null);
  const group = reactExports.useRef(null);
  const oldZoom = reactExports.useRef(0);
  const oldPosition = reactExports.useRef([0, 0]);
  const transformOuterRef = reactExports.useRef(null);
  const transformInnerRef = reactExports.useRef(null);
  const target = (portal == null ? void 0 : portal.current) || events.connected || gl.domElement.parentNode;
  const occlusionMeshRef = reactExports.useRef(null);
  const isMeshSizeSet = reactExports.useRef(false);
  const isRayCastOcclusion = reactExports.useMemo(() => {
    return occlude && occlude !== "blending" || Array.isArray(occlude) && occlude.length && isRefObject(occlude[0]);
  }, [occlude]);
  reactExports.useLayoutEffect(() => {
    const el2 = gl.domElement;
    if (occlude && occlude === "blending") {
      el2.style.zIndex = `${Math.floor(zIndexRange[0] / 2)}`;
      el2.style.position = "absolute";
      el2.style.pointerEvents = "none";
    } else {
      el2.style.zIndex = null;
      el2.style.position = null;
      el2.style.pointerEvents = null;
    }
  }, [occlude]);
  reactExports.useLayoutEffect(() => {
    if (group.current) {
      const currentRoot = root.current = clientExports.createRoot(el);
      scene.updateMatrixWorld();
      if (transform) {
        el.style.cssText = `position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;`;
      } else {
        const vec = calculatePosition(group.current, camera, size);
        el.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${vec[0]}px,${vec[1]}px,0);transform-origin:0 0;`;
      }
      if (target) {
        if (prepend) target.prepend(el);
        else target.appendChild(el);
      }
      return () => {
        if (target) target.removeChild(el);
        currentRoot.unmount();
      };
    }
  }, [target, transform]);
  reactExports.useLayoutEffect(() => {
    if (wrapperClass) el.className = wrapperClass;
  }, [wrapperClass]);
  const styles = reactExports.useMemo(() => {
    if (transform) {
      return {
        position: "absolute",
        top: 0,
        left: 0,
        width: size.width,
        height: size.height,
        transformStyle: "preserve-3d",
        pointerEvents: "none"
      };
    } else {
      return {
        position: "absolute",
        transform: center ? "translate3d(-50%,-50%,0)" : "none",
        ...fullscreen && {
          top: -size.height / 2,
          left: -size.width / 2,
          width: size.width,
          height: size.height
        },
        ...style
      };
    }
  }, [style, center, fullscreen, size, transform]);
  const transformInnerStyles = reactExports.useMemo(() => ({
    position: "absolute",
    pointerEvents
  }), [pointerEvents]);
  reactExports.useLayoutEffect(() => {
    isMeshSizeSet.current = false;
    if (transform) {
      var _root$current;
      (_root$current = root.current) == null || _root$current.render(/* @__PURE__ */ reactExports.createElement("div", {
        ref: transformOuterRef,
        style: styles
      }, /* @__PURE__ */ reactExports.createElement("div", {
        ref: transformInnerRef,
        style: transformInnerStyles
      }, /* @__PURE__ */ reactExports.createElement("div", {
        ref,
        className,
        style,
        children
      }))));
    } else {
      var _root$current2;
      (_root$current2 = root.current) == null || _root$current2.render(/* @__PURE__ */ reactExports.createElement("div", {
        ref,
        style: styles,
        className,
        children
      }));
    }
  });
  const visible = reactExports.useRef(true);
  useFrame((gl2) => {
    if (group.current) {
      camera.updateMatrixWorld();
      group.current.updateWorldMatrix(true, false);
      const vec = transform ? oldPosition.current : calculatePosition(group.current, camera, size);
      if (transform || Math.abs(oldZoom.current - camera.zoom) > eps || Math.abs(oldPosition.current[0] - vec[0]) > eps || Math.abs(oldPosition.current[1] - vec[1]) > eps) {
        const isBehindCamera = isObjectBehindCamera(group.current, camera);
        let raytraceTarget = false;
        if (isRayCastOcclusion) {
          if (Array.isArray(occlude)) {
            raytraceTarget = occlude.map((item) => item.current);
          } else if (occlude !== "blending") {
            raytraceTarget = [scene];
          }
        }
        const previouslyVisible = visible.current;
        if (raytraceTarget) {
          const isvisible = isObjectVisible(group.current, camera, raycaster, raytraceTarget);
          visible.current = isvisible && !isBehindCamera;
        } else {
          visible.current = !isBehindCamera;
        }
        if (previouslyVisible !== visible.current) {
          if (onOcclude) onOcclude(!visible.current);
          else el.style.display = visible.current ? "block" : "none";
        }
        const halfRange = Math.floor(zIndexRange[0] / 2);
        const zRange = occlude ? isRayCastOcclusion ? [zIndexRange[0], halfRange] : [halfRange - 1, 0] : zIndexRange;
        el.style.zIndex = `${objectZIndex(group.current, camera, zRange)}`;
        if (transform) {
          const [widthHalf, heightHalf] = [size.width / 2, size.height / 2];
          const fov = camera.projectionMatrix.elements[5] * heightHalf;
          const {
            isOrthographicCamera: isOrthographicCamera2,
            top,
            left,
            bottom,
            right
          } = camera;
          const cameraMatrix = getCameraCSSMatrix(camera.matrixWorldInverse);
          const cameraTransform = isOrthographicCamera2 ? `scale(${fov})translate(${epsilon(-(right + left) / 2)}px,${epsilon((top + bottom) / 2)}px)` : `translateZ(${fov}px)`;
          let matrix = group.current.matrixWorld;
          if (sprite) {
            matrix = camera.matrixWorldInverse.clone().transpose().copyPosition(matrix).scale(group.current.scale);
            matrix.elements[3] = matrix.elements[7] = matrix.elements[11] = 0;
            matrix.elements[15] = 1;
          }
          el.style.width = size.width + "px";
          el.style.height = size.height + "px";
          el.style.perspective = isOrthographicCamera2 ? "" : `${fov}px`;
          if (transformOuterRef.current && transformInnerRef.current) {
            transformOuterRef.current.style.transform = `${cameraTransform}${cameraMatrix}translate(${widthHalf}px,${heightHalf}px)`;
            transformInnerRef.current.style.transform = getObjectCSSMatrix(matrix, 1 / ((distanceFactor || 10) / 400));
          }
        } else {
          const scale = distanceFactor === void 0 ? 1 : objectScale(group.current, camera) * distanceFactor;
          el.style.transform = `translate3d(${vec[0]}px,${vec[1]}px,0) scale(${scale})`;
        }
        oldPosition.current = vec;
        oldZoom.current = camera.zoom;
      }
    }
    if (!isRayCastOcclusion && occlusionMeshRef.current && !isMeshSizeSet.current) {
      if (transform) {
        if (transformOuterRef.current) {
          const el2 = transformOuterRef.current.children[0];
          if (el2 != null && el2.clientWidth && el2 != null && el2.clientHeight) {
            const {
              isOrthographicCamera: isOrthographicCamera2
            } = camera;
            if (isOrthographicCamera2 || geometry) {
              if (props.scale) {
                if (!Array.isArray(props.scale)) {
                  occlusionMeshRef.current.scale.setScalar(1 / props.scale);
                } else if (props.scale instanceof Vector3) {
                  occlusionMeshRef.current.scale.copy(props.scale.clone().divideScalar(1));
                } else {
                  occlusionMeshRef.current.scale.set(1 / props.scale[0], 1 / props.scale[1], 1 / props.scale[2]);
                }
              }
            } else {
              const ratio = (distanceFactor || 10) / 400;
              const w = el2.clientWidth * ratio;
              const h = el2.clientHeight * ratio;
              occlusionMeshRef.current.scale.set(w, h, 1);
            }
            isMeshSizeSet.current = true;
          }
        }
      } else {
        const ele = el.children[0];
        if (ele != null && ele.clientWidth && ele != null && ele.clientHeight) {
          const ratio = 1 / viewport.factor;
          const w = ele.clientWidth * ratio;
          const h = ele.clientHeight * ratio;
          occlusionMeshRef.current.scale.set(w, h, 1);
          isMeshSizeSet.current = true;
        }
        occlusionMeshRef.current.lookAt(gl2.camera.position);
      }
    }
  });
  const shaders = reactExports.useMemo(() => ({
    vertexShader: !transform ? (
      /* glsl */
      `
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `
    ) : void 0,
    fragmentShader: (
      /* glsl */
      `
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `
    )
  }), [transform]);
  return /* @__PURE__ */ reactExports.createElement("group", _extends({}, props, {
    ref: group
  }), occlude && !isRayCastOcclusion && /* @__PURE__ */ reactExports.createElement("mesh", {
    castShadow,
    receiveShadow,
    ref: occlusionMeshRef
  }, geometry || /* @__PURE__ */ reactExports.createElement("planeGeometry", null), material || /* @__PURE__ */ reactExports.createElement("shaderMaterial", {
    side: DoubleSide,
    vertexShader: shaders.vertexShader,
    fragmentShader: shaders.fragmentShader
  })));
});
const Line = /* @__PURE__ */ reactExports.forwardRef(function Line3({
  points,
  color = 16777215,
  vertexColors,
  linewidth,
  lineWidth,
  segments,
  dashed,
  ...rest
}, ref) {
  var _vertexColors$, _ref;
  const size = useThree((state) => state.size);
  const line2 = reactExports.useMemo(() => segments ? new LineSegments2() : new Line2(), [segments]);
  const [lineMaterial] = reactExports.useState(() => new LineMaterial());
  const itemSize = (vertexColors == null || (_vertexColors$ = vertexColors[0]) == null ? void 0 : _vertexColors$.length) === 4 ? 4 : 3;
  const lineGeom = reactExports.useMemo(() => {
    const geom = segments ? new LineSegmentsGeometry() : new LineGeometry();
    const pValues = points.map((p) => {
      const isArray = Array.isArray(p);
      return p instanceof Vector3 || p instanceof Vector4 ? [p.x, p.y, p.z] : p instanceof Vector2 ? [p.x, p.y, 0] : isArray && p.length === 3 ? [p[0], p[1], p[2]] : isArray && p.length === 2 ? [p[0], p[1], 0] : p;
    });
    geom.setPositions(pValues.flat());
    if (vertexColors) {
      color = 16777215;
      const cValues = vertexColors.map((c) => c instanceof Color ? c.toArray() : c);
      geom.setColors(cValues.flat(), itemSize);
    }
    return geom;
  }, [points, segments, vertexColors, itemSize]);
  reactExports.useLayoutEffect(() => {
    line2.computeLineDistances();
  }, [points, line2]);
  reactExports.useLayoutEffect(() => {
    if (dashed) {
      lineMaterial.defines.USE_DASH = "";
    } else {
      delete lineMaterial.defines.USE_DASH;
    }
    lineMaterial.needsUpdate = true;
  }, [dashed, lineMaterial]);
  reactExports.useEffect(() => {
    return () => {
      lineGeom.dispose();
      lineMaterial.dispose();
    };
  }, [lineGeom]);
  return /* @__PURE__ */ reactExports.createElement("primitive", _extends({
    object: line2,
    ref
  }, rest), /* @__PURE__ */ reactExports.createElement("primitive", {
    object: lineGeom,
    attach: "geometry"
  }), /* @__PURE__ */ reactExports.createElement("primitive", _extends({
    object: lineMaterial,
    attach: "material",
    color,
    vertexColors: Boolean(vertexColors),
    resolution: [size.width, size.height],
    linewidth: (_ref = linewidth !== null && linewidth !== void 0 ? linewidth : lineWidth) !== null && _ref !== void 0 ? _ref : 1,
    dashed,
    transparent: itemSize === 4
  }, rest)));
});
const Text = /* @__PURE__ */ reactExports.forwardRef(({
  sdfGlyphSize = 64,
  anchorX = "center",
  anchorY = "middle",
  font,
  fontSize = 1,
  children,
  characters,
  onSync,
  ...props
}, ref) => {
  const invalidate = useThree(({
    invalidate: invalidate2
  }) => invalidate2);
  const [troikaMesh] = reactExports.useState(() => new Text$1());
  const [nodes, text] = reactExports.useMemo(() => {
    const n = [];
    let t = "";
    reactExports.Children.forEach(children, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        t += child;
      } else {
        n.push(child);
      }
    });
    return [n, t];
  }, [children]);
  suspend(() => new Promise((res) => preloadFont({
    font,
    characters
  }, res)), ["troika-text", font, characters]);
  reactExports.useLayoutEffect(() => void troikaMesh.sync(() => {
    invalidate();
    if (onSync) onSync(troikaMesh);
  }));
  reactExports.useEffect(() => {
    return () => troikaMesh.dispose();
  }, [troikaMesh]);
  return /* @__PURE__ */ reactExports.createElement("primitive", _extends({
    object: troikaMesh,
    ref,
    font,
    text,
    anchorX,
    anchorY,
    fontSize,
    sdfGlyphSize
  }, props), nodes);
});
function shaderMaterial(uniforms, vertexShader, fragmentShader, onInit) {
  var _Class;
  return _Class = class extends ShaderMaterial {
    constructor(parameters) {
      super({
        vertexShader,
        fragmentShader,
        ...parameters
      });
      for (const key in uniforms) {
        this.uniforms[key] = new Uniform(uniforms[key]);
        Object.defineProperty(this, key, {
          get() {
            return this.uniforms[key].value;
          },
          set(value) {
            this.uniforms[key].value = value;
          }
        });
      }
      this.uniforms = UniformsUtils.clone(this.uniforms);
    }
  }, _Class.key = MathUtils.generateUUID(), _Class;
}
const getVersion = () => parseInt(REVISION.replace(/\D+/g, ""));
const version = /* @__PURE__ */ getVersion();
function useFBO(width, height, settings) {
  const size = useThree((state) => state.size);
  const viewport = useThree((state) => state.viewport);
  const _width = typeof width === "number" ? width : size.width * viewport.dpr;
  const _height = typeof height === "number" ? height : size.height * viewport.dpr;
  const _settings = (typeof width === "number" ? settings : width) || {};
  const {
    samples = 0,
    depth,
    ...targetSettings
  } = _settings;
  const depthBuffer = depth !== null && depth !== void 0 ? depth : _settings.depthBuffer;
  const target = reactExports.useMemo(() => {
    const target2 = new WebGLRenderTarget(_width, _height, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      type: HalfFloatType,
      ...targetSettings
    });
    if (depthBuffer) {
      target2.depthTexture = new DepthTexture(_width, _height, FloatType);
    }
    target2.samples = samples;
    return target2;
  }, []);
  reactExports.useLayoutEffect(() => {
    target.setSize(_width, _height);
    if (samples) target.samples = samples;
  }, [samples, target, _width, _height]);
  reactExports.useEffect(() => {
    return () => target.dispose();
  }, []);
  return target;
}
const isFunction = (node) => typeof node === "function";
const PerspectiveCamera = /* @__PURE__ */ reactExports.forwardRef(({
  envMap,
  resolution = 256,
  frames = Infinity,
  makeDefault,
  children,
  ...props
}, ref) => {
  const set = useThree(({
    set: set2
  }) => set2);
  const camera = useThree(({
    camera: camera2
  }) => camera2);
  const size = useThree(({
    size: size2
  }) => size2);
  const cameraRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => cameraRef.current, []);
  const groupRef = reactExports.useRef(null);
  const fbo = useFBO(resolution);
  reactExports.useLayoutEffect(() => {
    if (!props.manual) {
      cameraRef.current.aspect = size.width / size.height;
    }
  }, [size, props]);
  reactExports.useLayoutEffect(() => {
    cameraRef.current.updateProjectionMatrix();
  });
  let count = 0;
  let oldEnvMap = null;
  const functional = isFunction(children);
  useFrame((state) => {
    if (functional && (frames === Infinity || count < frames)) {
      groupRef.current.visible = false;
      state.gl.setRenderTarget(fbo);
      oldEnvMap = state.scene.background;
      if (envMap) state.scene.background = envMap;
      state.gl.render(state.scene, cameraRef.current);
      state.scene.background = oldEnvMap;
      state.gl.setRenderTarget(null);
      groupRef.current.visible = true;
      count++;
    }
  });
  reactExports.useLayoutEffect(() => {
    if (makeDefault) {
      const oldCam = camera;
      set(() => ({
        camera: cameraRef.current
      }));
      return () => set(() => ({
        camera: oldCam
      }));
    }
  }, [cameraRef, makeDefault, set]);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("perspectiveCamera", _extends({
    ref: cameraRef
  }, props), !functional && children), /* @__PURE__ */ reactExports.createElement("group", {
    ref: groupRef
  }, functional && children(fbo.texture)));
});
const OrbitControls = /* @__PURE__ */ reactExports.forwardRef(({
  makeDefault,
  camera,
  regress,
  domElement,
  enableDamping = true,
  keyEvents = false,
  onChange,
  onStart,
  onEnd,
  ...restProps
}, ref) => {
  const invalidate = useThree((state) => state.invalidate);
  const defaultCamera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const events = useThree((state) => state.events);
  const setEvents = useThree((state) => state.setEvents);
  const set = useThree((state) => state.set);
  const get = useThree((state) => state.get);
  const performance2 = useThree((state) => state.performance);
  const explCamera = camera || defaultCamera;
  const explDomElement = domElement || events.connected || gl.domElement;
  const controls = reactExports.useMemo(() => new OrbitControls$1(explCamera), [explCamera]);
  useFrame(() => {
    if (controls.enabled) controls.update();
  }, -1);
  reactExports.useEffect(() => {
    if (keyEvents) {
      controls.connect(keyEvents === true ? explDomElement : keyEvents);
    }
    controls.connect(explDomElement);
    return () => void controls.dispose();
  }, [keyEvents, explDomElement, regress, controls, invalidate]);
  reactExports.useEffect(() => {
    const callback = (e) => {
      invalidate();
      if (regress) performance2.regress();
      if (onChange) onChange(e);
    };
    const onStartCb = (e) => {
      if (onStart) onStart(e);
    };
    const onEndCb = (e) => {
      if (onEnd) onEnd(e);
    };
    controls.addEventListener("change", callback);
    controls.addEventListener("start", onStartCb);
    controls.addEventListener("end", onEndCb);
    return () => {
      controls.removeEventListener("start", onStartCb);
      controls.removeEventListener("end", onEndCb);
      controls.removeEventListener("change", callback);
    };
  }, [onChange, onStart, onEnd, controls, invalidate, setEvents]);
  reactExports.useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return /* @__PURE__ */ reactExports.createElement("primitive", _extends({
    ref,
    object: controls,
    enableDamping
  }, restProps));
});
const GridMaterial = /* @__PURE__ */ shaderMaterial(
  {
    cellSize: 0.5,
    sectionSize: 1,
    fadeDistance: 100,
    fadeStrength: 1,
    fadeFrom: 1,
    cellThickness: 0.5,
    sectionThickness: 1,
    cellColor: /* @__PURE__ */ new Color(),
    sectionColor: /* @__PURE__ */ new Color(),
    infiniteGrid: false,
    followCamera: false,
    worldCamProjPosition: /* @__PURE__ */ new Vector3(),
    worldPlanePosition: /* @__PURE__ */ new Vector3()
  },
  /* glsl */
  `
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  /* glsl */
  `
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
    }
  `
);
const Grid = /* @__PURE__ */ reactExports.forwardRef(({
  args,
  cellColor = "#000000",
  sectionColor = "#2080ff",
  cellSize = 0.5,
  sectionSize = 1,
  followCamera = false,
  infiniteGrid = false,
  fadeDistance = 100,
  fadeStrength = 1,
  fadeFrom = 1,
  cellThickness = 0.5,
  sectionThickness = 1,
  side = BackSide,
  ...props
}, fRef) => {
  extend({
    GridMaterial
  });
  const ref = reactExports.useRef(null);
  reactExports.useImperativeHandle(fRef, () => ref.current, []);
  const plane = new Plane();
  const upVector = new Vector3(0, 1, 0);
  const zeroVector = new Vector3(0, 0, 0);
  useFrame((state) => {
    plane.setFromNormalAndCoplanarPoint(upVector, zeroVector).applyMatrix4(ref.current.matrixWorld);
    const gridMaterial = ref.current.material;
    const worldCamProjPosition = gridMaterial.uniforms.worldCamProjPosition;
    const worldPlanePosition = gridMaterial.uniforms.worldPlanePosition;
    plane.projectPoint(state.camera.position, worldCamProjPosition.value);
    worldPlanePosition.value.set(0, 0, 0).applyMatrix4(ref.current.matrixWorld);
  });
  const uniforms1 = {
    cellSize,
    sectionSize,
    cellColor,
    sectionColor,
    cellThickness,
    sectionThickness
  };
  const uniforms2 = {
    fadeDistance,
    fadeStrength,
    fadeFrom,
    infiniteGrid,
    followCamera
  };
  return /* @__PURE__ */ reactExports.createElement("mesh", _extends({
    ref,
    frustumCulled: false
  }, props), /* @__PURE__ */ reactExports.createElement("gridMaterial", _extends({
    transparent: true,
    "extensions-derivatives": true,
    side
  }, uniforms1, uniforms2)), /* @__PURE__ */ reactExports.createElement("planeGeometry", {
    args
  }));
});
const DiscardMaterial = /* @__PURE__ */ shaderMaterial({}, "void main() { }", "void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");
class MeshTransmissionMaterialImpl extends MeshPhysicalMaterial {
  constructor(samples = 6, transmissionSampler = false) {
    super();
    this.uniforms = {
      chromaticAberration: {
        value: 0.05
      },
      // Transmission must always be 0, unless transmissionSampler is being used
      transmission: {
        value: 0
      },
      // Instead a workaround is used, see below for reasons why
      _transmission: {
        value: 1
      },
      transmissionMap: {
        value: null
      },
      // Roughness is 1 in THREE.MeshPhysicalMaterial but it makes little sense in a transmission material
      roughness: {
        value: 0
      },
      thickness: {
        value: 0
      },
      thicknessMap: {
        value: null
      },
      attenuationDistance: {
        value: Infinity
      },
      attenuationColor: {
        value: new Color("white")
      },
      anisotropicBlur: {
        value: 0.1
      },
      time: {
        value: 0
      },
      distortion: {
        value: 0
      },
      distortionScale: {
        value: 0.5
      },
      temporalDistortion: {
        value: 0
      },
      buffer: {
        value: null
      }
    };
    this.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ...this.uniforms
      };
      if (this.anisotropy > 0) shader.defines.USE_ANISOTROPY = "";
      if (transmissionSampler) shader.defines.USE_SAMPLER = "";
      else shader.defines.USE_TRANSMISSION = "";
      shader.fragmentShader = /*glsl*/
      `
      uniform float chromaticAberration;         
      uniform float anisotropicBlur;      
      uniform float time;
      uniform float distortion;
      uniform float distortionScale;
      uniform float temporalDistortion;
      uniform sampler2D buffer;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
      }

      uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
      }

      // Compound versions of the hashing algorithm I whipped together.
      uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
      uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
      uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }

      // Construct a float with half-open range [0:1] using low 23 bits.
      // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
      float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
      }

      // Pseudo-random value in half-open range [0:1].
      float randomBase( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float randomBase( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float rand(float seed) {
        float result = randomBase(vec3(gl_FragCoord.xy, seed));
        return result;
      }

      const float F3 =  0.3333333;
      const float G3 =  0.1666667;

      float snoise(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w;
        w *= w;
        d *= w;
        return dot(d, vec4(52.0));
      }

      float snoiseFractal(vec3 m) {
        return 0.5333333* snoise(m)
              +0.2666667* snoise(2.0*m)
              +0.1333333* snoise(4.0*m)
              +0.0666667* snoise(8.0*m);
      }
` + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <transmission_pars_fragment>",
        /*glsl*/
        `
        #ifdef USE_TRANSMISSION
          // Transmission code is based on glTF-Sampler-Viewer
          // https://github.com/KhronosGroup/glTF-Sample-Viewer
          uniform float _transmission;
          uniform float thickness;
          uniform float attenuationDistance;
          uniform vec3 attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            uniform sampler2D transmissionMap;
          #endif
          #ifdef USE_THICKNESSMAP
            uniform sampler2D thicknessMap;
          #endif
          uniform vec2 transmissionSamplerSize;
          uniform sampler2D transmissionSamplerMap;
          uniform mat4 modelMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 vWorldPosition;
          vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
            // Direction of refracted light.
            vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
            // Compute rotation-independant scaling of the model matrix.
            vec3 modelScale;
            modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
            modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
            modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
            // The thickness is specified in local space.
            return normalize( refractionVector ) * thickness * modelScale;
          }
          float applyIorToRoughness( const in float roughness, const in float ior ) {
            // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
            // an IOR of 1.5 results in the default amount of microfacet refraction.
            return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
          }
          vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
            float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );            
            #ifdef USE_SAMPLER
              #ifdef texture2DLodEXT
                return texture2DLodEXT(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #else
                return texture2D(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #endif
            #else
              return texture2D(buffer, fragCoord.xy);
            #endif
          }
          vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
            if ( isinf( attenuationDistance ) ) {
              // Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
              return radiance;
            } else {
              // Compute light attenuation using Beer's law.
              vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
              vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
              return transmittance * radiance;
            }
          }
          vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
            const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
            const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
            const in vec3 attenuationColor, const in float attenuationDistance ) {
            vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
            vec3 refractedRayExit = position + transmissionRay;
            // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
            vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
            vec2 refractionCoords = ndcPos.xy / ndcPos.w;
            refractionCoords += 1.0;
            refractionCoords /= 2.0;
            // Sample framebuffer to get pixel the refracted ray hits.
            vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
            vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
            // Get the specular component.
            vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
            return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
          }
        #endif
`
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <transmission_fragment>",
        /*glsl*/
        `  
        // Improve the refraction to use the world pos
        material.transmission = _transmission;
        material.transmissionAlpha = 1.0;
        material.thickness = thickness;
        material.attenuationDistance = attenuationDistance;
        material.attenuationColor = attenuationColor;
        #ifdef USE_TRANSMISSIONMAP
          material.transmission *= texture2D( transmissionMap, vUv ).r;
        #endif
        #ifdef USE_THICKNESSMAP
          material.thickness *= texture2D( thicknessMap, vUv ).g;
        #endif
        
        vec3 pos = vWorldPosition;
        float runningSeed = 0.0;
        vec3 v = normalize( cameraPosition - pos );
        vec3 n = inverseTransformDirection( normal, viewMatrix );
        vec3 transmission = vec3(0.0);
        float transmissionR, transmissionB, transmissionG;
        float randomCoords = rand(runningSeed++);
        float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
        vec3 distortionNormal = vec3(0.0);
        vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;
        if (distortion > 0.0) {
          distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
        }
        for (float i = 0.0; i < ${samples}.0; i ++) {
          vec3 sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5)) * pow(rand(runningSeed++), 0.33) + distortionNormal);
          transmissionR = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness  + thickness_smear * (i + randomCoords) / float(${samples}),
            material.attenuationColor, material.attenuationDistance
          ).r;
          transmissionG = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior  * (1.0 + chromaticAberration * (i + randomCoords) / float(${samples})) , material.thickness + thickness_smear * (i + randomCoords) / float(${samples}),
            material.attenuationColor, material.attenuationDistance
          ).g;
          transmissionB = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior * (1.0 + 2.0 * chromaticAberration * (i + randomCoords) / float(${samples})), material.thickness + thickness_smear * (i + randomCoords) / float(${samples}),
            material.attenuationColor, material.attenuationDistance
          ).b;
          transmission.r += transmissionR;
          transmission.g += transmissionG;
          transmission.b += transmissionB;
        }
        transmission /= ${samples}.0;
        totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
`
      );
    };
    Object.keys(this.uniforms).forEach((name) => Object.defineProperty(this, name, {
      get: () => this.uniforms[name].value,
      set: (v) => this.uniforms[name].value = v
    }));
  }
}
const MeshTransmissionMaterial = /* @__PURE__ */ reactExports.forwardRef(({
  buffer,
  transmissionSampler = false,
  backside = false,
  side = FrontSide,
  transmission = 1,
  thickness = 0,
  backsideThickness = 0,
  backsideEnvMapIntensity = 1,
  samples = 10,
  resolution,
  backsideResolution,
  background,
  anisotropy,
  anisotropicBlur,
  ...props
}, fref) => {
  extend({
    MeshTransmissionMaterial: MeshTransmissionMaterialImpl
  });
  const ref = reactExports.useRef(null);
  const [discardMaterial] = reactExports.useState(() => new DiscardMaterial());
  const fboBack = useFBO(backsideResolution || resolution);
  const fboMain = useFBO(resolution);
  let oldBg;
  let oldEnvMapIntensity;
  let oldTone;
  let parent;
  useFrame((state) => {
    ref.current.time = state.clock.elapsedTime;
    if (ref.current.buffer === fboMain.texture && !transmissionSampler) {
      var _r3f$parent;
      parent = (_r3f$parent = ref.current.__r3f.parent) == null ? void 0 : _r3f$parent.object;
      if (parent) {
        oldTone = state.gl.toneMapping;
        oldBg = state.scene.background;
        oldEnvMapIntensity = ref.current.envMapIntensity;
        state.gl.toneMapping = NoToneMapping;
        if (background) state.scene.background = background;
        parent.material = discardMaterial;
        if (backside) {
          state.gl.setRenderTarget(fboBack);
          state.gl.render(state.scene, state.camera);
          parent.material = ref.current;
          parent.material.buffer = fboBack.texture;
          parent.material.thickness = backsideThickness;
          parent.material.side = BackSide;
          parent.material.envMapIntensity = backsideEnvMapIntensity;
        }
        state.gl.setRenderTarget(fboMain);
        state.gl.render(state.scene, state.camera);
        parent.material = ref.current;
        parent.material.thickness = thickness;
        parent.material.side = side;
        parent.material.buffer = fboMain.texture;
        parent.material.envMapIntensity = oldEnvMapIntensity;
        state.scene.background = oldBg;
        state.gl.setRenderTarget(null);
        state.gl.toneMapping = oldTone;
      }
    }
  });
  reactExports.useImperativeHandle(fref, () => ref.current, []);
  return /* @__PURE__ */ reactExports.createElement("meshTransmissionMaterial", _extends({
    // Samples must re-compile the shader so we memoize it
    args: [samples, transmissionSampler],
    ref
  }, props, {
    buffer: buffer || fboMain.texture,
    _transmission: transmission,
    anisotropicBlur: anisotropicBlur !== null && anisotropicBlur !== void 0 ? anisotropicBlur : anisotropy,
    transmission: transmissionSampler ? transmission : 0,
    thickness,
    side
  }));
});
function create(type, effect) {
  const El = type + "Geometry";
  return /* @__PURE__ */ reactExports.forwardRef(({
    args,
    children,
    ...props
  }, fref) => {
    const ref = reactExports.useRef(null);
    reactExports.useImperativeHandle(fref, () => ref.current);
    reactExports.useLayoutEffect(() => void (effect == null ? void 0 : effect(ref.current)));
    return /* @__PURE__ */ reactExports.createElement("mesh", _extends({
      ref
    }, props), /* @__PURE__ */ reactExports.createElement(El, {
      attach: "geometry",
      args
    }), children);
  });
}
const Cylinder = /* @__PURE__ */ create("cylinder");
const Sphere = /* @__PURE__ */ create("sphere");
const Torus = /* @__PURE__ */ create("torus");
const Ring = /* @__PURE__ */ create("ring");
class StarfieldMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: {
          value: 0
        },
        fade: {
          value: 1
        }
      },
      vertexShader: (
        /* glsl */
        `
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`
      ),
      fragmentShader: (
        /* glsl */
        `
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
      }`
      )
    });
  }
}
const genStar = (r) => {
  return new Vector3().setFromSpherical(new Spherical(r, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI));
};
const Stars = /* @__PURE__ */ reactExports.forwardRef(({
  radius = 100,
  depth = 50,
  count = 5e3,
  saturation = 0,
  factor = 4,
  fade = false,
  speed = 1
}, ref) => {
  const material = reactExports.useRef(null);
  const [position, color, size] = reactExports.useMemo(() => {
    const positions = [];
    const colors = [];
    const sizes = Array.from({
      length: count
    }, () => (0.5 + 0.5 * Math.random()) * factor);
    const color2 = new Color();
    let r = radius + depth;
    const increment = depth / count;
    for (let i = 0; i < count; i++) {
      r -= increment * Math.random();
      positions.push(...genStar(r).toArray());
      color2.setHSL(i / count, saturation, 0.9);
      colors.push(color2.r, color2.g, color2.b);
    }
    return [new Float32Array(positions), new Float32Array(colors), new Float32Array(sizes)];
  }, [count, depth, factor, radius, saturation]);
  useFrame((state) => material.current && (material.current.uniforms.time.value = state.clock.elapsedTime * speed));
  const [starfieldMaterial] = reactExports.useState(() => new StarfieldMaterial());
  return /* @__PURE__ */ reactExports.createElement("points", {
    ref
  }, /* @__PURE__ */ reactExports.createElement("bufferGeometry", null, /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-position",
    args: [position, 3]
  }), /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-color",
    args: [color, 3]
  }), /* @__PURE__ */ reactExports.createElement("bufferAttribute", {
    attach: "attributes-size",
    args: [size, 1]
  })), /* @__PURE__ */ reactExports.createElement("primitive", {
    ref: material,
    object: starfieldMaterial,
    attach: "material",
    blending: AdditiveBlending,
    "uniforms-fade-value": fade,
    depthWrite: false,
    transparent: true,
    vertexColors: true
  }));
});
const context = /* @__PURE__ */ reactExports.createContext(null);
function PerformanceMonitor({
  iterations = 10,
  ms = 250,
  threshold = 0.75,
  step = 0.1,
  factor: _factor = 0.5,
  flipflops = Infinity,
  bounds = (refreshrate) => refreshrate > 100 ? [60, 100] : [40, 60],
  onIncline,
  onDecline,
  onChange,
  onFallback,
  children
}) {
  const decimalPlacesRatio = Math.pow(10, 0);
  const [api, _] = reactExports.useState(() => ({
    fps: 0,
    index: 0,
    factor: _factor,
    flipped: 0,
    refreshrate: 0,
    fallback: false,
    frames: [],
    averages: [],
    subscriptions: /* @__PURE__ */ new Map(),
    subscribe: (ref) => {
      const key = /* @__PURE__ */ Symbol();
      api.subscriptions.set(key, ref.current);
      return () => void api.subscriptions.delete(key);
    }
  }));
  let lastFactor = 0;
  useFrame(() => {
    const {
      frames,
      averages
    } = api;
    if (api.fallback) return;
    if (averages.length < iterations) {
      frames.push(performance.now());
      const msPassed = frames[frames.length - 1] - frames[0];
      if (msPassed >= ms) {
        api.fps = Math.round(frames.length / msPassed * 1e3 * decimalPlacesRatio) / decimalPlacesRatio;
        api.refreshrate = Math.max(api.refreshrate, api.fps);
        averages[api.index++ % iterations] = api.fps;
        if (averages.length === iterations) {
          const [lower, upper] = bounds(api.refreshrate);
          const upperBounds = averages.filter((value) => value >= upper);
          const lowerBounds = averages.filter((value) => value < lower);
          if (upperBounds.length > iterations * threshold) {
            api.factor = Math.min(1, api.factor + step);
            api.flipped++;
            if (onIncline) onIncline(api);
            api.subscriptions.forEach((value) => value.onIncline && value.onIncline(api));
          }
          if (lowerBounds.length > iterations * threshold) {
            api.factor = Math.max(0, api.factor - step);
            api.flipped++;
            if (onDecline) onDecline(api);
            api.subscriptions.forEach((value) => value.onDecline && value.onDecline(api));
          }
          if (lastFactor !== api.factor) {
            lastFactor = api.factor;
            if (onChange) onChange(api);
            api.subscriptions.forEach((value) => value.onChange && value.onChange(api));
          }
          if (api.flipped > flipflops && !api.fallback) {
            api.fallback = true;
            if (onFallback) onFallback(api);
            api.subscriptions.forEach((value) => value.onFallback && value.onFallback(api));
          }
          api.averages = [];
        }
        api.frames = [];
      }
    }
  });
  return /* @__PURE__ */ reactExports.createElement(context.Provider, {
    value: api
  }, children);
}
const isOrthographicCamera = (def) => def && def.isOrthographicCamera;
const col = /* @__PURE__ */ new Color();
const tracked = /* @__PURE__ */ tunnel();
function computeContainerPosition(canvasSize, trackRect) {
  const {
    right,
    top,
    left: trackLeft,
    bottom: trackBottom,
    width,
    height
  } = trackRect;
  const isOffscreen = trackRect.bottom < 0 || top > canvasSize.height || right < 0 || trackRect.left > canvasSize.width;
  const canvasBottom = canvasSize.top + canvasSize.height;
  const bottom = canvasBottom - trackBottom;
  const left = trackLeft - canvasSize.left;
  return {
    position: {
      width,
      height,
      left,
      top,
      bottom,
      right
    },
    isOffscreen
  };
}
function prepareSkissor(state, {
  left,
  bottom,
  width,
  height
}) {
  let autoClear;
  const aspect = width / height;
  if (isOrthographicCamera(state.camera)) {
    if (!state.camera.manual) {
      if (state.camera.left !== width / -2 || state.camera.right !== width / 2 || state.camera.top !== height / 2 || state.camera.bottom !== height / -2) {
        Object.assign(state.camera, {
          left: width / -2,
          right: width / 2,
          top: height / 2,
          bottom: height / -2
        });
        state.camera.updateProjectionMatrix();
      }
    } else {
      state.camera.updateProjectionMatrix();
    }
  } else if (state.camera.aspect !== aspect) {
    state.camera.aspect = aspect;
    state.camera.updateProjectionMatrix();
  }
  autoClear = state.gl.autoClear;
  state.gl.autoClear = false;
  state.gl.setViewport(left, bottom, width, height);
  state.gl.setScissor(left, bottom, width, height);
  state.gl.setScissorTest(true);
  return autoClear;
}
function finishSkissor(state, autoClear) {
  state.gl.setScissorTest(false);
  state.gl.autoClear = autoClear;
}
function clear(state) {
  state.gl.getClearColor(col);
  state.gl.setClearColor(col, state.gl.getClearAlpha());
  state.gl.clear(true, true);
}
function Container({
  visible = true,
  canvasSize,
  scene,
  index,
  children,
  frames,
  rect,
  track
}) {
  const rootState = useThree();
  const [isOffscreen, setOffscreen] = reactExports.useState(false);
  let frameCount = 0;
  useFrame((state) => {
    if (frames === Infinity || frameCount <= frames) {
      var _track$current;
      if (track) rect.current = (_track$current = track.current) == null ? void 0 : _track$current.getBoundingClientRect();
      frameCount++;
    }
    if (rect.current) {
      const {
        position,
        isOffscreen: _isOffscreen
      } = computeContainerPosition(canvasSize, rect.current);
      if (isOffscreen !== _isOffscreen) setOffscreen(_isOffscreen);
      if (visible && !isOffscreen && rect.current) {
        const autoClear = prepareSkissor(state, position);
        state.gl.render(children ? state.scene : scene, state.camera);
        finishSkissor(state, autoClear);
      }
    }
  }, index);
  reactExports.useLayoutEffect(() => {
    const curRect = rect.current;
    if (curRect && (!visible || !isOffscreen)) {
      const {
        position
      } = computeContainerPosition(canvasSize, curRect);
      const autoClear = prepareSkissor(rootState, position);
      clear(rootState);
      finishSkissor(rootState, autoClear);
    }
  }, [visible, isOffscreen]);
  reactExports.useEffect(() => {
    if (!track) return;
    const curRect = rect.current;
    const old = rootState.get().events.connected;
    rootState.setEvents({
      connected: track.current
    });
    return () => {
      if (curRect) {
        const {
          position
        } = computeContainerPosition(canvasSize, curRect);
        const autoClear = prepareSkissor(rootState, position);
        clear(rootState);
        finishSkissor(rootState, autoClear);
      }
      rootState.setEvents({
        connected: old
      });
    };
  }, [track]);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, children, /* @__PURE__ */ reactExports.createElement("group", {
    onPointerOver: () => null
  }));
}
const CanvasView = /* @__PURE__ */ reactExports.forwardRef(({
  track,
  visible = true,
  index = 1,
  id,
  style,
  className,
  frames = Infinity,
  children,
  ...props
}, fref) => {
  var _rect$current, _rect$current2, _rect$current3, _rect$current4;
  const rect = reactExports.useRef(null);
  const {
    size,
    scene
  } = useThree();
  const [virtualScene] = reactExports.useState(() => new Scene());
  const [ready, toggle] = reactExports.useReducer(() => true, false);
  const compute = reactExports.useCallback((event, state) => {
    if (rect.current && track && track.current && event.target === track.current) {
      const {
        width,
        height,
        left,
        top
      } = rect.current;
      const x = event.clientX - left;
      const y = event.clientY - top;
      state.pointer.set(x / width * 2 - 1, -(y / height) * 2 + 1);
      state.raycaster.setFromCamera(state.pointer, state.camera);
    }
  }, [rect, track]);
  reactExports.useEffect(() => {
    var _track$current2;
    if (track) rect.current = (_track$current2 = track.current) == null ? void 0 : _track$current2.getBoundingClientRect();
    toggle();
  }, [track]);
  return /* @__PURE__ */ reactExports.createElement("group", _extends({
    ref: fref
  }, props), ready && createPortal(/* @__PURE__ */ reactExports.createElement(Container, {
    visible,
    canvasSize: size,
    frames,
    scene,
    track,
    rect,
    index
  }, children), virtualScene, {
    events: {
      compute,
      priority: index
    },
    size: {
      width: (_rect$current = rect.current) == null ? void 0 : _rect$current.width,
      height: (_rect$current2 = rect.current) == null ? void 0 : _rect$current2.height,
      // @ts-ignore
      top: (_rect$current3 = rect.current) == null ? void 0 : _rect$current3.top,
      // @ts-ignore
      left: (_rect$current4 = rect.current) == null ? void 0 : _rect$current4.left
    }
  }));
});
const HtmlView = /* @__PURE__ */ reactExports.forwardRef(({
  as: El = "div",
  id,
  visible,
  className,
  style,
  index = 1,
  track,
  frames = Infinity,
  children,
  ...props
}, fref) => {
  const uuid = reactExports.useId();
  const ref = reactExports.useRef(null);
  reactExports.useImperativeHandle(fref, () => ref.current);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(El, _extends({
    ref,
    id,
    className,
    style
  }, props)), /* @__PURE__ */ reactExports.createElement(tracked.In, null, /* @__PURE__ */ reactExports.createElement(CanvasView, {
    visible,
    key: uuid,
    track: ref,
    frames,
    index
  }, children)));
});
const View = /* @__PURE__ */ (() => {
  const _View = /* @__PURE__ */ reactExports.forwardRef((props, fref) => {
    const store = reactExports.useContext(context$1);
    if (!store) return /* @__PURE__ */ reactExports.createElement(HtmlView, _extends({
      ref: fref
    }, props));
    else return /* @__PURE__ */ reactExports.createElement(CanvasView, _extends({
      ref: fref
    }, props));
  });
  _View.Port = () => /* @__PURE__ */ reactExports.createElement(tracked.Out, null);
  return _View;
})();
export {
  Cylinder as C,
  Grid as G,
  Html as H,
  Line as L,
  MeshTransmissionMaterial as M,
  OrbitControls as O,
  PerformanceMonitor as P,
  Ring as R,
  Stars as S,
  Text as T,
  View as V,
  Sphere as a,
  Torus as b,
  PerspectiveCamera as c,
  useFBO as u
};
