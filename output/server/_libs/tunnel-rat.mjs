import { R as React } from "./react.mjs";
import { a as create } from "./zustand.mjs";
var _window$document, _window$navigator;
const useIsomorphicLayoutEffect = typeof window !== "undefined" && ((_window$document = window.document) != null && _window$document.createElement || ((_window$navigator = window.navigator) == null ? void 0 : _window$navigator.product) === "ReactNative") ? React.useLayoutEffect : React.useEffect;
function tunnel() {
  const useStore = create((set) => ({
    current: new Array(),
    version: 0,
    set
  }));
  return {
    In: ({
      children
    }) => {
      const set = useStore((state) => state.set);
      const version = useStore((state) => state.version);
      useIsomorphicLayoutEffect(() => {
        set((state) => ({
          version: state.version + 1
        }));
      }, []);
      useIsomorphicLayoutEffect(() => {
        set(({
          current
        }) => ({
          current: [...current, children]
        }));
        return () => set(({
          current
        }) => ({
          current: current.filter((c) => c !== children)
        }));
      }, [children, version]);
      return null;
    },
    Out: () => {
      const current = useStore((state) => state.current);
      return /* @__PURE__ */ React.createElement(React.Fragment, null, current);
    }
  };
}
export {
  tunnel as t
};
