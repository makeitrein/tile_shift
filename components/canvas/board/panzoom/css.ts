import gsap from "gsap";
import { CurrentValues, PanzoomOptions } from "./types";
const isIE =
  typeof document !== "undefined" && !!(document as any).documentMode;

/**
 * Lazy creation of a CSS style declaration
 */
let divStyle: CSSStyleDeclaration;
function createStyle() {
  if (divStyle) {
    return divStyle;
  }
  return (divStyle = document.createElement("div").style);
}

/**
 * Proper prefixing for cross-browser compatibility
 */
const prefixes = ["webkit", "moz", "ms"];
const prefixCache: { [key: string]: string } = {};
function getPrefixedName(name: string) {
  if (prefixCache[name]) {
    return prefixCache[name];
  }
  const divStyle = createStyle();
  if (name in divStyle) {
    return (prefixCache[name] = name);
  }
  const capName = name[0].toUpperCase() + name.slice(1);
  let i = prefixes.length;
  while (i--) {
    const prefixedName = `${prefixes[i]}${capName}`;
    if (prefixedName in divStyle) {
      return (prefixCache[name] = prefixedName);
    }
  }
}

/**
 * Gets a style value expected to be a number
 */
export function getCSSNum(name: string, style: CSSStyleDeclaration) {
  return parseFloat(style[getPrefixedName(name) as any]) || 0;
}

function getBoxStyle(
  elem: HTMLElement | SVGElement,
  name: string,
  style: CSSStyleDeclaration = window.getComputedStyle(elem)
) {
  // Support: FF 68+
  // Firefox requires specificity for border
  const suffix = name === "border" ? "Width" : "";
  return {
    left: getCSSNum(`${name}Left${suffix}`, style),
    right: getCSSNum(`${name}Right${suffix}`, style),
    top: getCSSNum(`${name}Top${suffix}`, style),
    bottom: getCSSNum(`${name}Bottom${suffix}`, style),
  };
}

/**
 * Set a style using the properly prefixed name
 */
export function setStyle(
  elem: HTMLElement | SVGElement,
  name: string,
  value: string
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elem.style[getPrefixedName(name) as any] = value;
}

/**
 * Set the transform using the proper prefix
 */
export function setTransform(
  elem: HTMLElement | SVGElement,
  { x, y, scale, isSVG }: CurrentValues,
  _options?: PanzoomOptions
) {
  setStyle(elem, "transform", `scale(${scale}) translate3d(${x}px, ${y}px, 0)`);
}

export function setScale(
  elem: HTMLElement | SVGElement,
  { x, y, scale, isSVG }: CurrentValues,
  _options?: PanzoomOptions
) {
  gsap.to(elem, { scale, transformOrigin: "50% 50%" });
}

/**
 * Dimensions used in containment and focal point zooming
 */
let dimensionsCache = {};
export function getDimensions(elem: HTMLElement | SVGElement, scale: number) {
  const cachedResult = dimensionsCache[scale];
  if (cachedResult) {
    return cachedResult;
  } else {
    console.log("CALCULATE FRESH");
    const parent = elem.parentNode as HTMLElement | SVGElement;
    const style = window.getComputedStyle(elem);
    const parentStyle = window.getComputedStyle(parent);
    const rectElem = elem.getBoundingClientRect();
    const rectParent = parent.getBoundingClientRect();

    const result = {
      elem: {
        style,
        width: rectElem.width,
        height: rectElem.height,
        top: rectElem.top,
        bottom: rectElem.bottom,
        left: rectElem.left,
        right: rectElem.right,
        margin: getBoxStyle(elem, "margin", style),
        border: getBoxStyle(elem, "border", style),
      },
      parent: {
        style: parentStyle,
        width: rectParent.width,
        height: rectParent.height,
        top: rectParent.top,
        bottom: rectParent.bottom,
        left: rectParent.left,
        right: rectParent.right,
        padding: getBoxStyle(parent, "padding", parentStyle),
        border: getBoxStyle(parent, "border", parentStyle),
      },
    };

    dimensionsCache = { [scale]: result };

    return result;
  }
}
