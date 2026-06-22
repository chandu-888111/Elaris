import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { an as Sun, ao as Moon } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
const MotionButton = ({ whileHover, whileTap, ...props }) => {
  const defaultHover = {
    scale: 1.05,
    rotateX: 5,
    rotateY: 5,
    transition: { type: "spring", stiffness: 200 }
  };
  const defaultTap = { scale: 0.97 };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.button,
    {
      whileHover: whileHover || defaultHover,
      whileTap: whileTap || defaultTap,
      ...props
    }
  );
};
const ThemeToggle = () => {
  const [isLight, setIsLight] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialLight = saved === "light" || !saved && !prefersDark;
    setIsLight(initialLight);
    document.documentElement.classList.toggle("light", initialLight);
  }, []);
  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    MotionButton,
    {
      onClick: toggleTheme,
      whileHover: { scale: 1.08 },
      whileTap: { scale: 0.95 },
      className: "flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors",
      children: [
        isLight ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" }),
        isLight ? "Light" : "Dark"
      ]
    }
  );
};
export {
  ThemeToggle as T
};
