// node_modules/lucide-react/dist/esm/createLucideIcon.mjs
import { forwardRef as forwardRef2, createElement as createElement3 } from "react";

// node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var toKebabCase = (string) => string?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

// node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
function toLucideIconData(iconName, iconNode, aliases = []) {
  if (iconNode == null) {
    throw new Error("[lucide]: iconNode is required when icon name is used");
  }
  return {
    name: toKebabCase(iconName),
    size: 24,
    node: iconNode,
    ...aliases.length > 0 ? { aliases } : {}
  };
}

// node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
var toCamelCase = (string) => {
  let out = "";
  let upperNext = false;
  for (const ch of string) {
    if (ch === "-" || ch === "_" || ch <= " ") {
      upperNext = out.length > 0;
      continue;
    }
    if (out.length === 0) {
      out += ch.toLowerCase();
    } else {
      out += upperNext ? ch.toUpperCase() : ch;
    }
    upperNext = false;
  }
  return out;
};

// node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

// node_modules/lucide-react/dist/esm/Icon.mjs
import { forwardRef, createElement as createElement2 } from "react";

// node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// node_modules/lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
function isDefined(value) {
  return value !== null && value !== void 0;
}
function buildLucideIconNode(icon, params = {}) {
  const attributeNames = params.attributeNames ?? {};
  const getAttributeName = (attributeName) => attributeNames[attributeName] ?? attributeName;
  const viewBoxWidth = icon.size ?? icon.width ?? defaultAttributes["width"];
  const viewBoxHeight = icon.size ?? icon.height ?? defaultAttributes["height"];
  const aliasClassNames = icon.aliases?.filter((alias) => typeof alias === "string" && alias.trim() !== "").map((alias) => `lucide-${alias}`) ?? [];
  const iconClassNames = [...icon.name ? [`lucide-${icon.name}`] : [], ...aliasClassNames];
  const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
  const className = params.includeDefaultClasses === false ? mergeClasses(...classNamesFromClassName) : mergeClasses("lucide", ...iconClassNames, ...classNamesFromClassName);
  const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? defaultAttributes["stroke-width"]) * Number(icon.size ?? icon.width ?? defaultAttributes["width"]) / Number(params.size ?? params.width ?? defaultAttributes["width"]) : params.strokeWidth ?? defaultAttributes["stroke-width"];
  const attributes = {
    ...Object.entries(defaultAttributes).reduce((attrs, [attrName, value]) => {
      attrs[getAttributeName(attrName)] = value;
      return attrs;
    }, {}),
    ..."color" in params && params.color && {
      [getAttributeName("stroke")]: params.color
    },
    ..."size" in params && isDefined(params.size) && {
      [getAttributeName("width")]: params.size,
      [getAttributeName("height")]: params.size
    },
    ..."width" in params && isDefined(params.width) && {
      [getAttributeName("width")]: params.width
    },
    ..."height" in params && isDefined(params.height) && {
      [getAttributeName("height")]: params.height
    },
    [getAttributeName("stroke-width")]: calculatedStrokeWidth,
    ...className && {
      [getAttributeName("class")]: className
    },
    [getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
    ...params.hasA11yProp === false ? {
      [getAttributeName("aria-hidden")]: "true"
    } : {},
    ..."attributes" in params && params.attributes
  };
  return [
    "svg",
    attributes,
    icon.node.map((child) => {
      const [name, attrs, children] = child;
      const nextAttrs = params.nonScalingStroke ? { [getAttributeName("vector-effect")]: "non-scaling-stroke", ...attrs } : attrs;
      return children ? [name, nextAttrs, children] : [name, nextAttrs];
    })
  ];
}

// node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
function buildLucideIconForReact(icon, params = {}) {
  return buildLucideIconNode(icon, {
    ...params,
    attributeNames: {
      ...params.attributeNames,
      class: "className",
      "stroke-width": "strokeWidth",
      "stroke-linecap": "strokeLinecap",
      "stroke-linejoin": "strokeLinejoin",
      "vector-effect": "vectorEffect"
    }
  });
}

// node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};

// node_modules/lucide-react/dist/esm/context.mjs
import { createContext, useContext, useMemo, createElement } from "react";
var LucideContext = createContext({});
var useLucideContext = () => useContext(LucideContext);

// node_modules/lucide-react/dist/esm/Icon.mjs
var Icon = forwardRef(
  ({
    color,
    size,
    width,
    height,
    strokeWidth,
    absoluteStrokeWidth,
    nonScalingStroke,
    className = "",
    children,
    iconNode = [],
    icon = {
      node: iconNode,
      aliases: [],
      size: 24
    },
    ...rest
  }, ref) => {
    const {
      size: contextSize = 24,
      strokeWidth: contextStrokeWidth = 2,
      absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
      nonScalingStroke: contextNonScalingStroke = false,
      color: contextColor = "currentColor",
      className: contextClass = ""
    } = useLucideContext() ?? {};
    const hasAccessibleProp = Boolean(children) || hasA11yProp(rest);
    const [name, svgAttributes, builtIconNode = []] = buildLucideIconForReact(icon, {
      color: color ?? contextColor,
      width: width ?? size ?? contextSize,
      height: height ?? size ?? contextSize,
      strokeWidth: strokeWidth ?? contextStrokeWidth,
      absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
      nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
      className: mergeClasses(contextClass, className),
      hasA11yProp: hasAccessibleProp,
      attributes: rest
    });
    return createElement2(
      name,
      {
        ref,
        ...svgAttributes
      },
      [
        ...builtIconNode.map(([tag, attrs]) => createElement2(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);

// node_modules/lucide-react/dist/esm/createLucideIcon.mjs
function createLucideIcon(iconDataOrName, iconNode = [], aliases = []) {
  const iconData = typeof iconDataOrName === "string" ? toLucideIconData(iconDataOrName, iconNode, aliases) : iconDataOrName;
  const Component = forwardRef2(
    ({ className, ...props }, ref) => createElement3(Icon, {
      ref,
      icon: iconData,
      className,
      ...props
    })
  );
  if (iconData.name) {
    Component.displayName = toPascalCase(iconData.name);
  }
  return Component;
}

// node_modules/lucide-react/dist/esm/icons/arrow-left.mjs
var __iconData = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
__iconData.node;
var ArrowLeft = createLucideIcon(__iconData);

// node_modules/lucide-react/dist/esm/icons/chevron-down.mjs
var __iconData2 = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
__iconData2.node;
var ChevronDown = createLucideIcon(__iconData2);

// node_modules/lucide-react/dist/esm/icons/clipboard-paste.mjs
var __iconData3 = {
  name: "clipboard-paste",
  size: 24,
  node: [
    ["path", { d: "M11 14h10", key: "1w8e9d" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v1.344", key: "1e62lh" }],
    ["path", { d: "m17 18 4-4-4-4", key: "z2g111" }],
    [
      "path",
      { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113", key: "bjbb7m" }
    ],
    ["rect", { x: "8", y: "2", width: "8", height: "4", rx: "1", key: "ublpy" }]
  ]
};
__iconData3.node;
var ClipboardPaste = createLucideIcon(__iconData3);

// node_modules/lucide-react/dist/esm/icons/grip-vertical.mjs
var __iconData4 = {
  name: "grip-vertical",
  size: 24,
  node: [
    ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
    ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
    ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
    ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
    ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
    ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
  ]
};
__iconData4.node;
var GripVertical = createLucideIcon(__iconData4);

// node_modules/lucide-react/dist/esm/icons/image-plus.mjs
var __iconData5 = {
  name: "image-plus",
  size: 24,
  node: [
    ["path", { d: "M16 5h6", key: "1vod17" }],
    ["path", { d: "M19 2v6", key: "4bpg5p" }],
    ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
  ]
};
__iconData5.node;
var ImagePlus = createLucideIcon(__iconData5);

// node_modules/lucide-react/dist/esm/icons/layout-grid.mjs
var __iconData6 = {
  name: "layout-grid",
  size: 24,
  node: [
    ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
    ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
    ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
    ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
  ]
};
__iconData6.node;
var LayoutGrid = createLucideIcon(__iconData6);

// node_modules/lucide-react/dist/esm/icons/log-out.mjs
var __iconData7 = {
  name: "log-out",
  size: 24,
  node: [
    ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
    ["path", { d: "M21 12H9", key: "dn1m92" }],
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
  ]
};
__iconData7.node;
var LogOut = createLucideIcon(__iconData7);

// node_modules/lucide-react/dist/esm/icons/maximize-2.mjs
var __iconData8 = {
  name: "maximize-2",
  size: 24,
  node: [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "m21 3-7 7", key: "1l2asr" }],
    ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
    ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
  ]
};
__iconData8.node;
var Maximize2 = createLucideIcon(__iconData8);

// node_modules/lucide-react/dist/esm/icons/minimize-2.mjs
var __iconData9 = {
  name: "minimize-2",
  size: 24,
  node: [
    ["path", { d: "m14 10 7-7", key: "oa77jy" }],
    ["path", { d: "M20 10h-6V4", key: "mjg0md" }],
    ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
    ["path", { d: "M4 14h6v6", key: "rmj7iw" }]
  ]
};
__iconData9.node;
var Minimize2 = createLucideIcon(__iconData9);

// node_modules/lucide-react/dist/esm/icons/monitor.mjs
var __iconData10 = {
  name: "monitor",
  size: 24,
  node: [
    ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
    ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
    ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
  ]
};
__iconData10.node;
var Monitor = createLucideIcon(__iconData10);

// node_modules/lucide-react/dist/esm/icons/pencil.mjs
var __iconData11 = {
  name: "pencil",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu"
      }
    ],
    ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
  ]
};
__iconData11.node;
var Pencil = createLucideIcon(__iconData11);

// node_modules/lucide-react/dist/esm/icons/power.mjs
var __iconData12 = {
  name: "power",
  size: 24,
  node: [
    ["path", { d: "M12 2v10", key: "mnfbl" }],
    ["path", { d: "M18.4 6.6a9 9 0 1 1-12.77.04", key: "obofu9" }]
  ]
};
__iconData12.node;
var Power = createLucideIcon(__iconData12);

// node_modules/lucide-react/dist/esm/icons/square-chevron-right.mjs
var __iconData13 = {
  name: "square-chevron-right",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "m10 8 4 4-4 4", key: "1wy4r4" }]
  ],
  aliases: ["chevron-right-square"]
};
__iconData13.node;
var SquareChevronRight = createLucideIcon(__iconData13);

// node_modules/lucide-react/dist/esm/icons/trash.mjs
var __iconData14 = {
  name: "trash",
  size: 24,
  node: [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ],
  aliases: ["trash-2"]
};
__iconData14.node;
var Trash = createLucideIcon(__iconData14);

// node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs
var __iconData15 = {
  name: "triangle-alert",
  size: 24,
  node: [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq"
      }
    ],
    ["path", { d: "M12 9v4", key: "juzpu7" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }]
  ],
  aliases: ["alert-triangle"]
};
__iconData15.node;
var TriangleAlert = createLucideIcon(__iconData15);

// node_modules/lucide-react/dist/esm/icons/wifi-off.mjs
var __iconData16 = {
  name: "wifi-off",
  size: 24,
  node: [
    ["path", { d: "M12 20h.01", key: "zekei9" }],
    ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
    ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
    ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
    ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
    ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
    ["path", { d: "m2 2 20 20", key: "1ooewy" }]
  ]
};
__iconData16.node;
var WifiOff = createLucideIcon(__iconData16);

// node_modules/lucide-react/dist/esm/icons/x.mjs
var __iconData17 = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
__iconData17.node;
var X = createLucideIcon(__iconData17);

// src/frontend/BgShellPanel.tsx
import { useEffect as useEffect4, useMemo as useMemo5, useRef as useRef3, useState as useState4 } from "react";
import { useTranslation as useTranslation4 } from "@termix/plugin-sdk/frontend";
import { Button as Button2 } from "@termix/plugin-sdk/ui";

// src/frontend/BgShellTab.tsx
import { useCallback as useCallback2, useEffect as useEffect3, useMemo as useMemo4, useState as useState3 } from "react";
import { toast as toast2 } from "sonner";
import { useTranslation as useTranslation3 } from "@termix/plugin-sdk/frontend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  EmptyState,
  Input,
  useIsMobile as useIsMobile2
} from "@termix/plugin-sdk/ui";

// src/frontend/BgTerminal.tsx
import { useCallback, useEffect as useEffect2, useMemo as useMemo3, useRef as useRef2, useState as useState2 } from "react";
import { toast } from "sonner";

// node_modules/@xterm/xterm/lib/xterm.mjs
var zs = Object.defineProperty;
var Rl = Object.getOwnPropertyDescriptor;
var Ll = (s15, t) => {
  for (var e in t) zs(s15, e, { get: t[e], enumerable: true });
};
var M = (s15, t, e, i) => {
  for (var r5 = i > 1 ? void 0 : i ? Rl(t, e) : t, n = s15.length - 1, o2; n >= 0; n--) (o2 = s15[n]) && (r5 = (i ? o2(t, e, r5) : o2(r5)) || r5);
  return i && r5 && zs(t, e, r5), r5;
};
var S = (s15, t) => (e, i) => t(e, i, s15);
var Gs = "Terminal input";
var mi = { get: () => Gs, set: (s15) => Gs = s15 };
var $s = "Too much output to announce, navigate to rows manually to read";
var _i = { get: () => $s, set: (s15) => $s = s15 };
function Al(s15) {
  return s15.replace(/\r?\n/g, "\r");
}
function kl(s15, t) {
  return t ? "\x1B[200~" + s15 + "\x1B[201~" : s15;
}
function Vs(s15, t) {
  s15.clipboardData && s15.clipboardData.setData("text/plain", t.selectionText), s15.preventDefault();
}
function qs(s15, t, e, i) {
  if (s15.stopPropagation(), s15.clipboardData) {
    let r5 = s15.clipboardData.getData("text/plain");
    Cn(r5, t, e, i);
  }
}
function Cn(s15, t, e, i) {
  s15 = Al(s15), s15 = kl(s15, e.decPrivateModes.bracketedPasteMode && i.rawOptions.ignoreBracketedPasteMode !== true), e.triggerDataEvent(s15, true), t.value = "";
}
function Mn(s15, t, e) {
  let i = e.getBoundingClientRect(), r5 = s15.clientX - i.left - 10, n = s15.clientY - i.top - 10;
  t.style.width = "20px", t.style.height = "20px", t.style.left = `${r5}px`, t.style.top = `${n}px`, t.style.zIndex = "1000", t.focus();
}
function Pn(s15, t, e, i, r5) {
  Mn(s15, t, e), r5 && i.rightClickSelect(s15), t.value = i.selectionText, t.select();
}
function Ce(s15) {
  return s15 > 65535 ? (s15 -= 65536, String.fromCharCode((s15 >> 10) + 55296) + String.fromCharCode(s15 % 1024 + 56320)) : String.fromCharCode(s15);
}
function It(s15, t = 0, e = s15.length) {
  let i = "";
  for (let r5 = t; r5 < e; ++r5) {
    let n = s15[r5];
    n > 65535 ? (n -= 65536, i += String.fromCharCode((n >> 10) + 55296) + String.fromCharCode(n % 1024 + 56320)) : i += String.fromCharCode(n);
  }
  return i;
}
var er = class {
  constructor() {
    this._interim = 0;
  }
  clear() {
    this._interim = 0;
  }
  decode(t, e) {
    let i = t.length;
    if (!i) return 0;
    let r5 = 0, n = 0;
    if (this._interim) {
      let o2 = t.charCodeAt(n++);
      56320 <= o2 && o2 <= 57343 ? e[r5++] = (this._interim - 55296) * 1024 + o2 - 56320 + 65536 : (e[r5++] = this._interim, e[r5++] = o2), this._interim = 0;
    }
    for (let o2 = n; o2 < i; ++o2) {
      let l = t.charCodeAt(o2);
      if (55296 <= l && l <= 56319) {
        if (++o2 >= i) return this._interim = l, r5;
        let a = t.charCodeAt(o2);
        56320 <= a && a <= 57343 ? e[r5++] = (l - 55296) * 1024 + a - 56320 + 65536 : (e[r5++] = l, e[r5++] = a);
        continue;
      }
      l !== 65279 && (e[r5++] = l);
    }
    return r5;
  }
};
var tr = class {
  constructor() {
    this.interim = new Uint8Array(3);
  }
  clear() {
    this.interim.fill(0);
  }
  decode(t, e) {
    let i = t.length;
    if (!i) return 0;
    let r5 = 0, n, o2, l, a, u = 0, h2 = 0;
    if (this.interim[0]) {
      let _3 = false, p = this.interim[0];
      p &= (p & 224) === 192 ? 31 : (p & 240) === 224 ? 15 : 7;
      let m = 0, f;
      for (; (f = this.interim[++m] & 63) && m < 4; ) p <<= 6, p |= f;
      let A2 = (this.interim[0] & 224) === 192 ? 2 : (this.interim[0] & 240) === 224 ? 3 : 4, R3 = A2 - m;
      for (; h2 < R3; ) {
        if (h2 >= i) return 0;
        if (f = t[h2++], (f & 192) !== 128) {
          h2--, _3 = true;
          break;
        } else this.interim[m++] = f, p <<= 6, p |= f & 63;
      }
      _3 || (A2 === 2 ? p < 128 ? h2-- : e[r5++] = p : A2 === 3 ? p < 2048 || p >= 55296 && p <= 57343 || p === 65279 || (e[r5++] = p) : p < 65536 || p > 1114111 || (e[r5++] = p)), this.interim.fill(0);
    }
    let c = i - 4, d = h2;
    for (; d < i; ) {
      for (; d < c && !((n = t[d]) & 128) && !((o2 = t[d + 1]) & 128) && !((l = t[d + 2]) & 128) && !((a = t[d + 3]) & 128); ) e[r5++] = n, e[r5++] = o2, e[r5++] = l, e[r5++] = a, d += 4;
      if (n = t[d++], n < 128) e[r5++] = n;
      else if ((n & 224) === 192) {
        if (d >= i) return this.interim[0] = n, r5;
        if (o2 = t[d++], (o2 & 192) !== 128) {
          d--;
          continue;
        }
        if (u = (n & 31) << 6 | o2 & 63, u < 128) {
          d--;
          continue;
        }
        e[r5++] = u;
      } else if ((n & 240) === 224) {
        if (d >= i) return this.interim[0] = n, r5;
        if (o2 = t[d++], (o2 & 192) !== 128) {
          d--;
          continue;
        }
        if (d >= i) return this.interim[0] = n, this.interim[1] = o2, r5;
        if (l = t[d++], (l & 192) !== 128) {
          d--;
          continue;
        }
        if (u = (n & 15) << 12 | (o2 & 63) << 6 | l & 63, u < 2048 || u >= 55296 && u <= 57343 || u === 65279) continue;
        e[r5++] = u;
      } else if ((n & 248) === 240) {
        if (d >= i) return this.interim[0] = n, r5;
        if (o2 = t[d++], (o2 & 192) !== 128) {
          d--;
          continue;
        }
        if (d >= i) return this.interim[0] = n, this.interim[1] = o2, r5;
        if (l = t[d++], (l & 192) !== 128) {
          d--;
          continue;
        }
        if (d >= i) return this.interim[0] = n, this.interim[1] = o2, this.interim[2] = l, r5;
        if (a = t[d++], (a & 192) !== 128) {
          d--;
          continue;
        }
        if (u = (n & 7) << 18 | (o2 & 63) << 12 | (l & 63) << 6 | a & 63, u < 65536 || u > 1114111) continue;
        e[r5++] = u;
      }
    }
    return r5;
  }
};
var ir = "";
var we = " ";
var De = class s {
  constructor() {
    this.fg = 0;
    this.bg = 0;
    this.extended = new rt();
  }
  static toColorRGB(t) {
    return [t >>> 16 & 255, t >>> 8 & 255, t & 255];
  }
  static fromColorRGB(t) {
    return (t[0] & 255) << 16 | (t[1] & 255) << 8 | t[2] & 255;
  }
  clone() {
    let t = new s();
    return t.fg = this.fg, t.bg = this.bg, t.extended = this.extended.clone(), t;
  }
  isInverse() {
    return this.fg & 67108864;
  }
  isBold() {
    return this.fg & 134217728;
  }
  isUnderline() {
    return this.hasExtendedAttrs() && this.extended.underlineStyle !== 0 ? 1 : this.fg & 268435456;
  }
  isBlink() {
    return this.fg & 536870912;
  }
  isInvisible() {
    return this.fg & 1073741824;
  }
  isItalic() {
    return this.bg & 67108864;
  }
  isDim() {
    return this.bg & 134217728;
  }
  isStrikethrough() {
    return this.fg & 2147483648;
  }
  isProtected() {
    return this.bg & 536870912;
  }
  isOverline() {
    return this.bg & 1073741824;
  }
  getFgColorMode() {
    return this.fg & 50331648;
  }
  getBgColorMode() {
    return this.bg & 50331648;
  }
  isFgRGB() {
    return (this.fg & 50331648) === 50331648;
  }
  isBgRGB() {
    return (this.bg & 50331648) === 50331648;
  }
  isFgPalette() {
    return (this.fg & 50331648) === 16777216 || (this.fg & 50331648) === 33554432;
  }
  isBgPalette() {
    return (this.bg & 50331648) === 16777216 || (this.bg & 50331648) === 33554432;
  }
  isFgDefault() {
    return (this.fg & 50331648) === 0;
  }
  isBgDefault() {
    return (this.bg & 50331648) === 0;
  }
  isAttributeDefault() {
    return this.fg === 0 && this.bg === 0;
  }
  getFgColor() {
    switch (this.fg & 50331648) {
      case 16777216:
      case 33554432:
        return this.fg & 255;
      case 50331648:
        return this.fg & 16777215;
      default:
        return -1;
    }
  }
  getBgColor() {
    switch (this.bg & 50331648) {
      case 16777216:
      case 33554432:
        return this.bg & 255;
      case 50331648:
        return this.bg & 16777215;
      default:
        return -1;
    }
  }
  hasExtendedAttrs() {
    return this.bg & 268435456;
  }
  updateExtended() {
    this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
  }
  getUnderlineColor() {
    if (this.bg & 268435456 && ~this.extended.underlineColor) switch (this.extended.underlineColor & 50331648) {
      case 16777216:
      case 33554432:
        return this.extended.underlineColor & 255;
      case 50331648:
        return this.extended.underlineColor & 16777215;
      default:
        return this.getFgColor();
    }
    return this.getFgColor();
  }
  getUnderlineColorMode() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? this.extended.underlineColor & 50331648 : this.getFgColorMode();
  }
  isUnderlineColorRGB() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 50331648 : this.isFgRGB();
  }
  isUnderlineColorPalette() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 16777216 || (this.extended.underlineColor & 50331648) === 33554432 : this.isFgPalette();
  }
  isUnderlineColorDefault() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 0 : this.isFgDefault();
  }
  getUnderlineStyle() {
    return this.fg & 268435456 ? this.bg & 268435456 ? this.extended.underlineStyle : 1 : 0;
  }
  getUnderlineVariantOffset() {
    return this.extended.underlineVariantOffset;
  }
};
var rt = class s2 {
  constructor(t = 0, e = 0) {
    this._ext = 0;
    this._urlId = 0;
    this._ext = t, this._urlId = e;
  }
  get ext() {
    return this._urlId ? this._ext & -469762049 | this.underlineStyle << 26 : this._ext;
  }
  set ext(t) {
    this._ext = t;
  }
  get underlineStyle() {
    return this._urlId ? 5 : (this._ext & 469762048) >> 26;
  }
  set underlineStyle(t) {
    this._ext &= -469762049, this._ext |= t << 26 & 469762048;
  }
  get underlineColor() {
    return this._ext & 67108863;
  }
  set underlineColor(t) {
    this._ext &= -67108864, this._ext |= t & 67108863;
  }
  get urlId() {
    return this._urlId;
  }
  set urlId(t) {
    this._urlId = t;
  }
  get underlineVariantOffset() {
    let t = (this._ext & 3758096384) >> 29;
    return t < 0 ? t ^ 4294967288 : t;
  }
  set underlineVariantOffset(t) {
    this._ext &= 536870911, this._ext |= t << 29 & 3758096384;
  }
  clone() {
    return new s2(this._ext, this._urlId);
  }
  isEmpty() {
    return this.underlineStyle === 0 && this._urlId === 0;
  }
};
var q = class s3 extends De {
  constructor() {
    super(...arguments);
    this.content = 0;
    this.fg = 0;
    this.bg = 0;
    this.extended = new rt();
    this.combinedData = "";
  }
  static fromCharData(e) {
    let i = new s3();
    return i.setFromCharData(e), i;
  }
  isCombined() {
    return this.content & 2097152;
  }
  getWidth() {
    return this.content >> 22;
  }
  getChars() {
    return this.content & 2097152 ? this.combinedData : this.content & 2097151 ? Ce(this.content & 2097151) : "";
  }
  getCode() {
    return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : this.content & 2097151;
  }
  setFromCharData(e) {
    this.fg = e[0], this.bg = 0;
    let i = false;
    if (e[1].length > 2) i = true;
    else if (e[1].length === 2) {
      let r5 = e[1].charCodeAt(0);
      if (55296 <= r5 && r5 <= 56319) {
        let n = e[1].charCodeAt(1);
        56320 <= n && n <= 57343 ? this.content = (r5 - 55296) * 1024 + n - 56320 + 65536 | e[2] << 22 : i = true;
      } else i = true;
    } else this.content = e[1].charCodeAt(0) | e[2] << 22;
    i && (this.combinedData = e[1], this.content = 2097152 | e[2] << 22);
  }
  getAsCharData() {
    return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
  }
};
var js = "di$target";
var Hn = "di$dependencies";
var Fn = /* @__PURE__ */ new Map();
function Xs(s15) {
  return s15[Hn] || [];
}
function ie(s15) {
  if (Fn.has(s15)) return Fn.get(s15);
  let t = function(e, i, r5) {
    if (arguments.length !== 3) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
    Pl(t, e, r5);
  };
  return t._id = s15, Fn.set(s15, t), t;
}
function Pl(s15, t, e) {
  t[js] === t ? t[Hn].push({ id: s15, index: e }) : (t[Hn] = [{ id: s15, index: e }], t[js] = t);
}
var F = ie("BufferService");
var rr = ie("CoreMouseService");
var ge = ie("CoreService");
var Zs = ie("CharsetService");
var xt = ie("InstantiationService");
var nr = ie("LogService");
var H = ie("OptionsService");
var sr = ie("OscLinkService");
var Js = ie("UnicodeService");
var Be = ie("DecorationService");
var wt = class {
  constructor(t, e, i) {
    this._bufferService = t;
    this._optionsService = e;
    this._oscLinkService = i;
  }
  provideLinks(t, e) {
    let i = this._bufferService.buffer.lines.get(t - 1);
    if (!i) {
      e(void 0);
      return;
    }
    let r5 = [], n = this._optionsService.rawOptions.linkHandler, o2 = new q(), l = i.getTrimmedLength(), a = -1, u = -1, h2 = false;
    for (let c = 0; c < l; c++) if (!(u === -1 && !i.hasContent(c))) {
      if (i.loadCell(c, o2), o2.hasExtendedAttrs() && o2.extended.urlId) if (u === -1) {
        u = c, a = o2.extended.urlId;
        continue;
      } else h2 = o2.extended.urlId !== a;
      else u !== -1 && (h2 = true);
      if (h2 || u !== -1 && c === l - 1) {
        let d = this._oscLinkService.getLinkData(a)?.uri;
        if (d) {
          let _3 = { start: { x: u + 1, y: t }, end: { x: c + (!h2 && c === l - 1 ? 1 : 0), y: t } }, p = false;
          if (!n?.allowNonHttpProtocols) try {
            let m = new URL(d);
            ["http:", "https:"].includes(m.protocol) || (p = true);
          } catch {
            p = true;
          }
          p || r5.push({ text: d, range: _3, activate: (m, f) => n ? n.activate(m, f, _3) : Ol(m, f), hover: (m, f) => n?.hover?.(m, f, _3), leave: (m, f) => n?.leave?.(m, f, _3) });
        }
        h2 = false, o2.hasExtendedAttrs() && o2.extended.urlId ? (u = c, a = o2.extended.urlId) : (u = -1, a = -1);
      }
    }
    e(r5);
  }
};
wt = M([S(0, F), S(1, H), S(2, sr)], wt);
function Ol(s15, t) {
  if (confirm(`Do you want to navigate to ${t}?

WARNING: This link could potentially be dangerous`)) {
    let i = window.open();
    if (i) {
      try {
        i.opener = null;
      } catch {
      }
      i.location.href = t;
    } else console.warn("Opening link blocked as opener could not be cleared");
  }
}
var nt = ie("CharSizeService");
var ae = ie("CoreBrowserService");
var Dt = ie("MouseService");
var ce = ie("RenderService");
var Qs = ie("SelectionService");
var or = ie("CharacterJoinerService");
var Re = ie("ThemeService");
var lr = ie("LinkProviderService");
var Wn = class {
  constructor() {
    this.listeners = [], this.unexpectedErrorHandler = function(t) {
      setTimeout(() => {
        throw t.stack ? ar.isErrorNoTelemetry(t) ? new ar(t.message + `

` + t.stack) : new Error(t.message + `

` + t.stack) : t;
      }, 0);
    };
  }
  addListener(t) {
    return this.listeners.push(t), () => {
      this._removeListener(t);
    };
  }
  emit(t) {
    this.listeners.forEach((e) => {
      e(t);
    });
  }
  _removeListener(t) {
    this.listeners.splice(this.listeners.indexOf(t), 1);
  }
  setUnexpectedErrorHandler(t) {
    this.unexpectedErrorHandler = t;
  }
  getUnexpectedErrorHandler() {
    return this.unexpectedErrorHandler;
  }
  onUnexpectedError(t) {
    this.unexpectedErrorHandler(t), this.emit(t);
  }
  onUnexpectedExternalError(t) {
    this.unexpectedErrorHandler(t);
  }
};
var Bl = new Wn();
function Lt(s15) {
  Nl(s15) || Bl.onUnexpectedError(s15);
}
var Un = "Canceled";
function Nl(s15) {
  return s15 instanceof bi ? true : s15 instanceof Error && s15.name === Un && s15.message === Un;
}
var bi = class extends Error {
  constructor() {
    super(Un), this.name = this.message;
  }
};
function eo(s15) {
  return s15 ? new Error(`Illegal argument: ${s15}`) : new Error("Illegal argument");
}
var ar = class s4 extends Error {
  constructor(t) {
    super(t), this.name = "CodeExpectedError";
  }
  static fromError(t) {
    if (t instanceof s4) return t;
    let e = new s4();
    return e.message = t.message, e.stack = t.stack, e;
  }
  static isErrorNoTelemetry(t) {
    return t.name === "CodeExpectedError";
  }
};
var Rt = class s5 extends Error {
  constructor(t) {
    super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, s5.prototype);
  }
};
function Fl(s15, t, e = 0, i = s15.length) {
  let r5 = e, n = i;
  for (; r5 < n; ) {
    let o2 = Math.floor((r5 + n) / 2);
    t(s15[o2]) ? r5 = o2 + 1 : n = o2;
  }
  return r5 - 1;
}
var cr = class cr2 {
  constructor(t) {
    this._array = t;
    this._findLastMonotonousLastIdx = 0;
  }
  findLastMonotonous(t) {
    if (cr2.assertInvariants) {
      if (this._prevFindLastPredicate) {
        for (let i of this._array) if (this._prevFindLastPredicate(i) && !t(i)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
      }
      this._prevFindLastPredicate = t;
    }
    let e = Fl(this._array, t, this._findLastMonotonousLastIdx);
    return this._findLastMonotonousLastIdx = e + 1, e === -1 ? void 0 : this._array[e];
  }
};
cr.assertInvariants = false;
function Se(s15, t = 0) {
  return s15[s15.length - (1 + t)];
}
var ro;
((l) => {
  function s15(a) {
    return a < 0;
  }
  l.isLessThan = s15;
  function t(a) {
    return a <= 0;
  }
  l.isLessThanOrEqual = t;
  function e(a) {
    return a > 0;
  }
  l.isGreaterThan = e;
  function i(a) {
    return a === 0;
  }
  l.isNeitherLessOrGreaterThan = i, l.greaterThan = 1, l.lessThan = -1, l.neitherLessOrGreaterThan = 0;
})(ro ||= {});
function no(s15, t) {
  return (e, i) => t(s15(e), s15(i));
}
var so = (s15, t) => s15 - t;
var At = class At2 {
  constructor(t) {
    this.iterate = t;
  }
  forEach(t) {
    this.iterate((e) => (t(e), true));
  }
  toArray() {
    let t = [];
    return this.iterate((e) => (t.push(e), true)), t;
  }
  filter(t) {
    return new At2((e) => this.iterate((i) => t(i) ? e(i) : true));
  }
  map(t) {
    return new At2((e) => this.iterate((i) => e(t(i))));
  }
  some(t) {
    let e = false;
    return this.iterate((i) => (e = t(i), !e)), e;
  }
  findFirst(t) {
    let e;
    return this.iterate((i) => t(i) ? (e = i, false) : true), e;
  }
  findLast(t) {
    let e;
    return this.iterate((i) => (t(i) && (e = i), true)), e;
  }
  findLastMaxBy(t) {
    let e, i = true;
    return this.iterate((r5) => ((i || ro.isGreaterThan(t(r5, e))) && (i = false, e = r5), true)), e;
  }
};
At.empty = new At((t) => {
});
function co(s15, t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let i of s15) {
    let r5 = t(i), n = e[r5];
    n || (n = e[r5] = []), n.push(i);
  }
  return e;
}
var lo;
var ao;
var oo = class {
  constructor(t, e) {
    this.toKey = e;
    this._map = /* @__PURE__ */ new Map();
    this[lo] = "SetWithKey";
    for (let i of t) this.add(i);
  }
  get size() {
    return this._map.size;
  }
  add(t) {
    let e = this.toKey(t);
    return this._map.set(e, t), this;
  }
  delete(t) {
    return this._map.delete(this.toKey(t));
  }
  has(t) {
    return this._map.has(this.toKey(t));
  }
  *entries() {
    for (let t of this._map.values()) yield [t, t];
  }
  keys() {
    return this.values();
  }
  *values() {
    for (let t of this._map.values()) yield t;
  }
  clear() {
    this._map.clear();
  }
  forEach(t, e) {
    this._map.forEach((i) => t.call(e, i, i, this));
  }
  [(ao = Symbol.iterator, lo = Symbol.toStringTag, ao)]() {
    return this.values();
  }
};
var ur = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(t, e) {
    let i = this.map.get(t);
    i || (i = /* @__PURE__ */ new Set(), this.map.set(t, i)), i.add(e);
  }
  delete(t, e) {
    let i = this.map.get(t);
    i && (i.delete(e), i.size === 0 && this.map.delete(t));
  }
  forEach(t, e) {
    let i = this.map.get(t);
    i && i.forEach(e);
  }
  get(t) {
    let e = this.map.get(t);
    return e || /* @__PURE__ */ new Set();
  }
};
function Kn(s15, t) {
  let e = this, i = false, r5;
  return function() {
    if (i) return r5;
    if (i = true, t) try {
      r5 = s15.apply(e, arguments);
    } finally {
      t();
    }
    else r5 = s15.apply(e, arguments);
    return r5;
  };
}
var zn;
((O2) => {
  function s15(I2) {
    return I2 && typeof I2 == "object" && typeof I2[Symbol.iterator] == "function";
  }
  O2.is = s15;
  let t = Object.freeze([]);
  function e() {
    return t;
  }
  O2.empty = e;
  function* i(I2) {
    yield I2;
  }
  O2.single = i;
  function r5(I2) {
    return s15(I2) ? I2 : i(I2);
  }
  O2.wrap = r5;
  function n(I2) {
    return I2 || t;
  }
  O2.from = n;
  function* o2(I2) {
    for (let k = I2.length - 1; k >= 0; k--) yield I2[k];
  }
  O2.reverse = o2;
  function l(I2) {
    return !I2 || I2[Symbol.iterator]().next().done === true;
  }
  O2.isEmpty = l;
  function a(I2) {
    return I2[Symbol.iterator]().next().value;
  }
  O2.first = a;
  function u(I2, k) {
    let P3 = 0;
    for (let oe of I2) if (k(oe, P3++)) return true;
    return false;
  }
  O2.some = u;
  function h2(I2, k) {
    for (let P3 of I2) if (k(P3)) return P3;
  }
  O2.find = h2;
  function* c(I2, k) {
    for (let P3 of I2) k(P3) && (yield P3);
  }
  O2.filter = c;
  function* d(I2, k) {
    let P3 = 0;
    for (let oe of I2) yield k(oe, P3++);
  }
  O2.map = d;
  function* _3(I2, k) {
    let P3 = 0;
    for (let oe of I2) yield* k(oe, P3++);
  }
  O2.flatMap = _3;
  function* p(...I2) {
    for (let k of I2) yield* k;
  }
  O2.concat = p;
  function m(I2, k, P3) {
    let oe = P3;
    for (let Me2 of I2) oe = k(oe, Me2);
    return oe;
  }
  O2.reduce = m;
  function* f(I2, k, P3 = I2.length) {
    for (k < 0 && (k += I2.length), P3 < 0 ? P3 += I2.length : P3 > I2.length && (P3 = I2.length); k < P3; k++) yield I2[k];
  }
  O2.slice = f;
  function A2(I2, k = Number.POSITIVE_INFINITY) {
    let P3 = [];
    if (k === 0) return [P3, I2];
    let oe = I2[Symbol.iterator]();
    for (let Me2 = 0; Me2 < k; Me2++) {
      let Pe2 = oe.next();
      if (Pe2.done) return [P3, O2.empty()];
      P3.push(Pe2.value);
    }
    return [P3, { [Symbol.iterator]() {
      return oe;
    } }];
  }
  O2.consume = A2;
  async function R3(I2) {
    let k = [];
    for await (let P3 of I2) k.push(P3);
    return Promise.resolve(k);
  }
  O2.asyncToArray = R3;
})(zn ||= {});
var Wl = false;
var dt = null;
var hr = class hr2 {
  constructor() {
    this.livingDisposables = /* @__PURE__ */ new Map();
  }
  getDisposableData(t) {
    let e = this.livingDisposables.get(t);
    return e || (e = { parent: null, source: null, isSingleton: false, value: t, idx: hr2.idx++ }, this.livingDisposables.set(t, e)), e;
  }
  trackDisposable(t) {
    let e = this.getDisposableData(t);
    e.source || (e.source = new Error().stack);
  }
  setParent(t, e) {
    let i = this.getDisposableData(t);
    i.parent = e;
  }
  markAsDisposed(t) {
    this.livingDisposables.delete(t);
  }
  markAsSingleton(t) {
    this.getDisposableData(t).isSingleton = true;
  }
  getRootParent(t, e) {
    let i = e.get(t);
    if (i) return i;
    let r5 = t.parent ? this.getRootParent(this.getDisposableData(t.parent), e) : t;
    return e.set(t, r5), r5;
  }
  getTrackedDisposables() {
    let t = /* @__PURE__ */ new Map();
    return [...this.livingDisposables.entries()].filter(([, i]) => i.source !== null && !this.getRootParent(i, t).isSingleton).flatMap(([i]) => i);
  }
  computeLeakingDisposables(t = 10, e) {
    let i;
    if (e) i = e;
    else {
      let a = /* @__PURE__ */ new Map(), u = [...this.livingDisposables.values()].filter((c) => c.source !== null && !this.getRootParent(c, a).isSingleton);
      if (u.length === 0) return;
      let h2 = new Set(u.map((c) => c.value));
      if (i = u.filter((c) => !(c.parent && h2.has(c.parent))), i.length === 0) throw new Error("There are cyclic diposable chains!");
    }
    if (!i) return;
    function r5(a) {
      function u(c, d) {
        for (; c.length > 0 && d.some((_3) => typeof _3 == "string" ? _3 === c[0] : c[0].match(_3)); ) c.shift();
      }
      let h2 = a.source.split(`
`).map((c) => c.trim().replace("at ", "")).filter((c) => c !== "");
      return u(h2, ["Error", /^trackDisposable \(.*\)$/, /^DisposableTracker.trackDisposable \(.*\)$/]), h2.reverse();
    }
    let n = new ur();
    for (let a of i) {
      let u = r5(a);
      for (let h2 = 0; h2 <= u.length; h2++) n.add(u.slice(0, h2).join(`
`), a);
    }
    i.sort(no((a) => a.idx, so));
    let o2 = "", l = 0;
    for (let a of i.slice(0, t)) {
      l++;
      let u = r5(a), h2 = [];
      for (let c = 0; c < u.length; c++) {
        let d = u[c];
        d = `(shared with ${n.get(u.slice(0, c + 1).join(`
`)).size}/${i.length} leaks) at ${d}`;
        let p = n.get(u.slice(0, c).join(`
`)), m = co([...p].map((f) => r5(f)[c]), (f) => f);
        delete m[u[c]];
        for (let [f, A2] of Object.entries(m)) h2.unshift(`    - stacktraces of ${A2.length} other leaks continue with ${f}`);
        h2.unshift(d);
      }
      o2 += `


==================== Leaking disposable ${l}/${i.length}: ${a.value.constructor.name} ====================
${h2.join(`
`)}
============================================================

`;
    }
    return i.length > t && (o2 += `


... and ${i.length - t} more leaking disposables

`), { leaks: i, details: o2 };
  }
};
hr.idx = 0;
function Ul(s15) {
  dt = s15;
}
if (Wl) {
  let s15 = "__is_disposable_tracked__";
  Ul(new class {
    trackDisposable(t) {
      let e = new Error("Potentially leaked disposable").stack;
      setTimeout(() => {
        t[s15] || console.log(e);
      }, 3e3);
    }
    setParent(t, e) {
      if (t && t !== D.None) try {
        t[s15] = true;
      } catch {
      }
    }
    markAsDisposed(t) {
      if (t && t !== D.None) try {
        t[s15] = true;
      } catch {
      }
    }
    markAsSingleton(t) {
    }
  }());
}
function fr(s15) {
  return dt?.trackDisposable(s15), s15;
}
function pr(s15) {
  dt?.markAsDisposed(s15);
}
function vi(s15, t) {
  dt?.setParent(s15, t);
}
function Kl(s15, t) {
  if (dt) for (let e of s15) dt.setParent(e, t);
}
function Gn(s15) {
  return dt?.markAsSingleton(s15), s15;
}
function Ne(s15) {
  if (zn.is(s15)) {
    let t = [];
    for (let e of s15) if (e) try {
      e.dispose();
    } catch (i) {
      t.push(i);
    }
    if (t.length === 1) throw t[0];
    if (t.length > 1) throw new AggregateError(t, "Encountered errors while disposing of store");
    return Array.isArray(s15) ? [] : s15;
  } else if (s15) return s15.dispose(), s15;
}
function ho(...s15) {
  let t = C(() => Ne(s15));
  return Kl(s15, t), t;
}
function C(s15) {
  let t = fr({ dispose: Kn(() => {
    pr(t), s15();
  }) });
  return t;
}
var dr = class dr2 {
  constructor() {
    this._toDispose = /* @__PURE__ */ new Set();
    this._isDisposed = false;
    fr(this);
  }
  dispose() {
    this._isDisposed || (pr(this), this._isDisposed = true, this.clear());
  }
  get isDisposed() {
    return this._isDisposed;
  }
  clear() {
    if (this._toDispose.size !== 0) try {
      Ne(this._toDispose);
    } finally {
      this._toDispose.clear();
    }
  }
  add(t) {
    if (!t) return t;
    if (t === this) throw new Error("Cannot register a disposable on itself!");
    return vi(t, this), this._isDisposed ? dr2.DISABLE_DISPOSED_WARNING || console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack) : this._toDispose.add(t), t;
  }
  delete(t) {
    if (t) {
      if (t === this) throw new Error("Cannot dispose a disposable on itself!");
      this._toDispose.delete(t), t.dispose();
    }
  }
  deleteAndLeak(t) {
    t && this._toDispose.has(t) && (this._toDispose.delete(t), vi(t, null));
  }
};
dr.DISABLE_DISPOSED_WARNING = false;
var Ee = dr;
var D = class {
  constructor() {
    this._store = new Ee();
    fr(this), vi(this._store, this);
  }
  dispose() {
    pr(this), this._store.dispose();
  }
  _register(t) {
    if (t === this) throw new Error("Cannot register a disposable on itself!");
    return this._store.add(t);
  }
};
D.None = Object.freeze({ dispose() {
} });
var ye = class {
  constructor() {
    this._isDisposed = false;
    fr(this);
  }
  get value() {
    return this._isDisposed ? void 0 : this._value;
  }
  set value(t) {
    this._isDisposed || t === this._value || (this._value?.dispose(), t && vi(t, this), this._value = t);
  }
  clear() {
    this.value = void 0;
  }
  dispose() {
    this._isDisposed = true, pr(this), this._value?.dispose(), this._value = void 0;
  }
  clearAndLeak() {
    let t = this._value;
    return this._value = void 0, t && vi(t, null), t;
  }
};
var fe = typeof window == "object" ? window : globalThis;
var kt = class kt2 {
  constructor(t) {
    this.element = t, this.next = kt2.Undefined, this.prev = kt2.Undefined;
  }
};
kt.Undefined = new kt(void 0);
var G = kt;
var Ct = class {
  constructor() {
    this._first = G.Undefined;
    this._last = G.Undefined;
    this._size = 0;
  }
  get size() {
    return this._size;
  }
  isEmpty() {
    return this._first === G.Undefined;
  }
  clear() {
    let t = this._first;
    for (; t !== G.Undefined; ) {
      let e = t.next;
      t.prev = G.Undefined, t.next = G.Undefined, t = e;
    }
    this._first = G.Undefined, this._last = G.Undefined, this._size = 0;
  }
  unshift(t) {
    return this._insert(t, false);
  }
  push(t) {
    return this._insert(t, true);
  }
  _insert(t, e) {
    let i = new G(t);
    if (this._first === G.Undefined) this._first = i, this._last = i;
    else if (e) {
      let n = this._last;
      this._last = i, i.prev = n, n.next = i;
    } else {
      let n = this._first;
      this._first = i, i.next = n, n.prev = i;
    }
    this._size += 1;
    let r5 = false;
    return () => {
      r5 || (r5 = true, this._remove(i));
    };
  }
  shift() {
    if (this._first !== G.Undefined) {
      let t = this._first.element;
      return this._remove(this._first), t;
    }
  }
  pop() {
    if (this._last !== G.Undefined) {
      let t = this._last.element;
      return this._remove(this._last), t;
    }
  }
  _remove(t) {
    if (t.prev !== G.Undefined && t.next !== G.Undefined) {
      let e = t.prev;
      e.next = t.next, t.next.prev = e;
    } else t.prev === G.Undefined && t.next === G.Undefined ? (this._first = G.Undefined, this._last = G.Undefined) : t.next === G.Undefined ? (this._last = this._last.prev, this._last.next = G.Undefined) : t.prev === G.Undefined && (this._first = this._first.next, this._first.prev = G.Undefined);
    this._size -= 1;
  }
  *[Symbol.iterator]() {
    let t = this._first;
    for (; t !== G.Undefined; ) yield t.element, t = t.next;
  }
};
var zl = globalThis.performance && typeof globalThis.performance.now == "function";
var mr = class s6 {
  static create(t) {
    return new s6(t);
  }
  constructor(t) {
    this._now = zl && t === false ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
  }
  stop() {
    this._stopTime = this._now();
  }
  reset() {
    this._startTime = this._now(), this._stopTime = -1;
  }
  elapsed() {
    return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime;
  }
};
var Gl = false;
var fo = false;
var $l = false;
var $;
((Qe) => {
  Qe.None = () => D.None;
  function t(y) {
    if ($l) {
      let { onDidAddListener: T } = y, g = gi.create(), w2 = 0;
      y.onDidAddListener = () => {
        ++w2 === 2 && (console.warn("snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here"), g.print()), T?.();
      };
    }
  }
  function e(y, T) {
    return d(y, () => {
    }, 0, void 0, true, void 0, T);
  }
  Qe.defer = e;
  function i(y) {
    return (T, g = null, w2) => {
      let E = false, x;
      return x = y((N2) => {
        if (!E) return x ? x.dispose() : E = true, T.call(g, N2);
      }, null, w2), E && x.dispose(), x;
    };
  }
  Qe.once = i;
  function r5(y, T, g) {
    return h2((w2, E = null, x) => y((N2) => w2.call(E, T(N2)), null, x), g);
  }
  Qe.map = r5;
  function n(y, T, g) {
    return h2((w2, E = null, x) => y((N2) => {
      T(N2), w2.call(E, N2);
    }, null, x), g);
  }
  Qe.forEach = n;
  function o2(y, T, g) {
    return h2((w2, E = null, x) => y((N2) => T(N2) && w2.call(E, N2), null, x), g);
  }
  Qe.filter = o2;
  function l(y) {
    return y;
  }
  Qe.signal = l;
  function a(...y) {
    return (T, g = null, w2) => {
      let E = ho(...y.map((x) => x((N2) => T.call(g, N2))));
      return c(E, w2);
    };
  }
  Qe.any = a;
  function u(y, T, g, w2) {
    let E = g;
    return r5(y, (x) => (E = T(E, x), E), w2);
  }
  Qe.reduce = u;
  function h2(y, T) {
    let g, w2 = { onWillAddFirstListener() {
      g = y(E.fire, E);
    }, onDidRemoveLastListener() {
      g?.dispose();
    } };
    T || t(w2);
    let E = new v(w2);
    return T?.add(E), E.event;
  }
  function c(y, T) {
    return T instanceof Array ? T.push(y) : T && T.add(y), y;
  }
  function d(y, T, g = 100, w2 = false, E = false, x, N2) {
    let Z2, te3, Oe2, ze = 0, le, et2 = { leakWarningThreshold: x, onWillAddFirstListener() {
      Z2 = y((ht) => {
        ze++, te3 = T(te3, ht), w2 && !Oe2 && (me2.fire(te3), te3 = void 0), le = () => {
          let fi = te3;
          te3 = void 0, Oe2 = void 0, (!w2 || ze > 1) && me2.fire(fi), ze = 0;
        }, typeof g == "number" ? (clearTimeout(Oe2), Oe2 = setTimeout(le, g)) : Oe2 === void 0 && (Oe2 = 0, queueMicrotask(le));
      });
    }, onWillRemoveListener() {
      E && ze > 0 && le?.();
    }, onDidRemoveLastListener() {
      le = void 0, Z2.dispose();
    } };
    N2 || t(et2);
    let me2 = new v(et2);
    return N2?.add(me2), me2.event;
  }
  Qe.debounce = d;
  function _3(y, T = 0, g) {
    return Qe.debounce(y, (w2, E) => w2 ? (w2.push(E), w2) : [E], T, void 0, true, void 0, g);
  }
  Qe.accumulate = _3;
  function p(y, T = (w2, E) => w2 === E, g) {
    let w2 = true, E;
    return o2(y, (x) => {
      let N2 = w2 || !T(x, E);
      return w2 = false, E = x, N2;
    }, g);
  }
  Qe.latch = p;
  function m(y, T, g) {
    return [Qe.filter(y, T, g), Qe.filter(y, (w2) => !T(w2), g)];
  }
  Qe.split = m;
  function f(y, T = false, g = [], w2) {
    let E = g.slice(), x = y((te3) => {
      E ? E.push(te3) : Z2.fire(te3);
    });
    w2 && w2.add(x);
    let N2 = () => {
      E?.forEach((te3) => Z2.fire(te3)), E = null;
    }, Z2 = new v({ onWillAddFirstListener() {
      x || (x = y((te3) => Z2.fire(te3)), w2 && w2.add(x));
    }, onDidAddFirstListener() {
      E && (T ? setTimeout(N2) : N2());
    }, onDidRemoveLastListener() {
      x && x.dispose(), x = null;
    } });
    return w2 && w2.add(Z2), Z2.event;
  }
  Qe.buffer = f;
  function A2(y, T) {
    return (w2, E, x) => {
      let N2 = T(new O2());
      return y(function(Z2) {
        let te3 = N2.evaluate(Z2);
        te3 !== R3 && w2.call(E, te3);
      }, void 0, x);
    };
  }
  Qe.chain = A2;
  let R3 = /* @__PURE__ */ Symbol("HaltChainable");
  class O2 {
    constructor() {
      this.steps = [];
    }
    map(T) {
      return this.steps.push(T), this;
    }
    forEach(T) {
      return this.steps.push((g) => (T(g), g)), this;
    }
    filter(T) {
      return this.steps.push((g) => T(g) ? g : R3), this;
    }
    reduce(T, g) {
      let w2 = g;
      return this.steps.push((E) => (w2 = T(w2, E), w2)), this;
    }
    latch(T = (g, w2) => g === w2) {
      let g = true, w2;
      return this.steps.push((E) => {
        let x = g || !T(E, w2);
        return g = false, w2 = E, x ? E : R3;
      }), this;
    }
    evaluate(T) {
      for (let g of this.steps) if (T = g(T), T === R3) break;
      return T;
    }
  }
  function I2(y, T, g = (w2) => w2) {
    let w2 = (...Z2) => N2.fire(g(...Z2)), E = () => y.on(T, w2), x = () => y.removeListener(T, w2), N2 = new v({ onWillAddFirstListener: E, onDidRemoveLastListener: x });
    return N2.event;
  }
  Qe.fromNodeEventEmitter = I2;
  function k(y, T, g = (w2) => w2) {
    let w2 = (...Z2) => N2.fire(g(...Z2)), E = () => y.addEventListener(T, w2), x = () => y.removeEventListener(T, w2), N2 = new v({ onWillAddFirstListener: E, onDidRemoveLastListener: x });
    return N2.event;
  }
  Qe.fromDOMEventEmitter = k;
  function P3(y) {
    return new Promise((T) => i(y)(T));
  }
  Qe.toPromise = P3;
  function oe(y) {
    let T = new v();
    return y.then((g) => {
      T.fire(g);
    }, () => {
      T.fire(void 0);
    }).finally(() => {
      T.dispose();
    }), T.event;
  }
  Qe.fromPromise = oe;
  function Me2(y, T) {
    return y((g) => T.fire(g));
  }
  Qe.forward = Me2;
  function Pe2(y, T, g) {
    return T(g), y((w2) => T(w2));
  }
  Qe.runAndSubscribe = Pe2;
  class Ke2 {
    constructor(T, g) {
      this._observable = T;
      this._counter = 0;
      this._hasChanged = false;
      let w2 = { onWillAddFirstListener: () => {
        T.addObserver(this);
      }, onDidRemoveLastListener: () => {
        T.removeObserver(this);
      } };
      g || t(w2), this.emitter = new v(w2), g && g.add(this.emitter);
    }
    beginUpdate(T) {
      this._counter++;
    }
    handlePossibleChange(T) {
    }
    handleChange(T, g) {
      this._hasChanged = true;
    }
    endUpdate(T) {
      this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = false, this.emitter.fire(this._observable.get())));
    }
  }
  function di(y, T) {
    return new Ke2(y, T).emitter.event;
  }
  Qe.fromObservable = di;
  function V(y) {
    return (T, g, w2) => {
      let E = 0, x = false, N2 = { beginUpdate() {
        E++;
      }, endUpdate() {
        E--, E === 0 && (y.reportChanges(), x && (x = false, T.call(g)));
      }, handlePossibleChange() {
      }, handleChange() {
        x = true;
      } };
      y.addObserver(N2), y.reportChanges();
      let Z2 = { dispose() {
        y.removeObserver(N2);
      } };
      return w2 instanceof Ee ? w2.add(Z2) : Array.isArray(w2) && w2.push(Z2), Z2;
    };
  }
  Qe.fromObservableLight = V;
})($ ||= {});
var Mt = class Mt2 {
  constructor(t) {
    this.listenerCount = 0;
    this.invocationCount = 0;
    this.elapsedOverall = 0;
    this.durations = [];
    this.name = `${t}_${Mt2._idPool++}`, Mt2.all.add(this);
  }
  start(t) {
    this._stopWatch = new mr(), this.listenerCount = t;
  }
  stop() {
    if (this._stopWatch) {
      let t = this._stopWatch.elapsed();
      this.durations.push(t), this.elapsedOverall += t, this.invocationCount += 1, this._stopWatch = void 0;
    }
  }
};
Mt.all = /* @__PURE__ */ new Set(), Mt._idPool = 0;
var $n = Mt;
var po = -1;
var br = class br2 {
  constructor(t, e, i = (br2._idPool++).toString(16).padStart(3, "0")) {
    this._errorHandler = t;
    this.threshold = e;
    this.name = i;
    this._warnCountdown = 0;
  }
  dispose() {
    this._stacks?.clear();
  }
  check(t, e) {
    let i = this.threshold;
    if (i <= 0 || e < i) return;
    this._stacks || (this._stacks = /* @__PURE__ */ new Map());
    let r5 = this._stacks.get(t.value) || 0;
    if (this._stacks.set(t.value, r5 + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
      this._warnCountdown = i * 0.5;
      let [n, o2] = this.getMostFrequentStack(), l = `[${this.name}] potential listener LEAK detected, having ${e} listeners already. MOST frequent listener (${o2}):`;
      console.warn(l), console.warn(n);
      let a = new qn(l, n);
      this._errorHandler(a);
    }
    return () => {
      let n = this._stacks.get(t.value) || 0;
      this._stacks.set(t.value, n - 1);
    };
  }
  getMostFrequentStack() {
    if (!this._stacks) return;
    let t, e = 0;
    for (let [i, r5] of this._stacks) (!t || e < r5) && (t = [i, r5], e = r5);
    return t;
  }
};
br._idPool = 1;
var Vn = br;
var gi = class s7 {
  constructor(t) {
    this.value = t;
  }
  static create() {
    let t = new Error();
    return new s7(t.stack ?? "");
  }
  print() {
    console.warn(this.value.split(`
`).slice(2).join(`
`));
  }
};
var qn = class extends Error {
  constructor(t, e) {
    super(t), this.name = "ListenerLeakError", this.stack = e;
  }
};
var Yn = class extends Error {
  constructor(t, e) {
    super(t), this.name = "ListenerRefusalError", this.stack = e;
  }
};
var Vl = 0;
var Pt = class {
  constructor(t) {
    this.value = t;
    this.id = Vl++;
  }
};
var ql = 2;
var Yl = (s15, t) => {
  if (s15 instanceof Pt) t(s15);
  else for (let e = 0; e < s15.length; e++) {
    let i = s15[e];
    i && t(i);
  }
};
var _r;
if (Gl) {
  let s15 = [];
  setInterval(() => {
    s15.length !== 0 && (console.warn("[LEAKING LISTENERS] GC'ed these listeners that were NOT yet disposed:"), console.warn(s15.join(`
`)), s15.length = 0);
  }, 3e3), _r = new FinalizationRegistry((t) => {
    typeof t == "string" && s15.push(t);
  });
}
var v = class {
  constructor(t) {
    this._size = 0;
    this._options = t, this._leakageMon = po > 0 || this._options?.leakWarningThreshold ? new Vn(t?.onListenerError ?? Lt, this._options?.leakWarningThreshold ?? po) : void 0, this._perfMon = this._options?._profName ? new $n(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
  }
  dispose() {
    if (!this._disposed) {
      if (this._disposed = true, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners) {
        if (fo) {
          let t = this._listeners;
          queueMicrotask(() => {
            Yl(t, (e) => e.stack?.print());
          });
        }
        this._listeners = void 0, this._size = 0;
      }
      this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose();
    }
  }
  get event() {
    return this._event ??= (t, e, i) => {
      if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
        let a = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
        console.warn(a);
        let u = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], h2 = new Yn(`${a}. HINT: Stack shows most frequent listener (${u[1]}-times)`, u[0]);
        return (this._options?.onListenerError || Lt)(h2), D.None;
      }
      if (this._disposed) return D.None;
      e && (t = t.bind(e));
      let r5 = new Pt(t), n, o2;
      this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2) && (r5.stack = gi.create(), n = this._leakageMon.check(r5.stack, this._size + 1)), fo && (r5.stack = o2 ?? gi.create()), this._listeners ? this._listeners instanceof Pt ? (this._deliveryQueue ??= new jn(), this._listeners = [this._listeners, r5]) : this._listeners.push(r5) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r5, this._options?.onDidAddFirstListener?.(this)), this._size++;
      let l = C(() => {
        _r?.unregister(l), n?.(), this._removeListener(r5);
      });
      if (i instanceof Ee ? i.add(l) : Array.isArray(i) && i.push(l), _r) {
        let a = new Error().stack.split(`
`).slice(2, 3).join(`
`).trim(), u = /(file:|vscode-file:\/\/vscode-app)?(\/[^:]*:\d+:\d+)/.exec(a);
        _r.register(l, u?.[2] ?? a, l);
      }
      return l;
    }, this._event;
  }
  _removeListener(t) {
    if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
    if (this._size === 1) {
      this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
      return;
    }
    let e = this._listeners, i = e.indexOf(t);
    if (i === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
    this._size--, e[i] = void 0;
    let r5 = this._deliveryQueue.current === this;
    if (this._size * ql <= e.length) {
      let n = 0;
      for (let o2 = 0; o2 < e.length; o2++) e[o2] ? e[n++] = e[o2] : r5 && (this._deliveryQueue.end--, n < this._deliveryQueue.i && this._deliveryQueue.i--);
      e.length = n;
    }
  }
  _deliver(t, e) {
    if (!t) return;
    let i = this._options?.onListenerError || Lt;
    if (!i) {
      t.value(e);
      return;
    }
    try {
      t.value(e);
    } catch (r5) {
      i(r5);
    }
  }
  _deliverQueue(t) {
    let e = t.current._listeners;
    for (; t.i < t.end; ) this._deliver(e[t.i++], t.value);
    t.reset();
  }
  fire(t) {
    if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof Pt) this._deliver(this._listeners, t);
    else {
      let e = this._deliveryQueue;
      e.enqueue(this, t, this._listeners.length), this._deliverQueue(e);
    }
    this._perfMon?.stop();
  }
  hasListeners() {
    return this._size > 0;
  }
};
var jn = class {
  constructor() {
    this.i = -1;
    this.end = 0;
  }
  enqueue(t, e, i) {
    this.i = 0, this.end = i, this.current = t, this.value = e;
  }
  reset() {
    this.i = this.end, this.current = void 0, this.value = void 0;
  }
};
var gr = class gr2 {
  constructor() {
    this.mapWindowIdToZoomLevel = /* @__PURE__ */ new Map();
    this._onDidChangeZoomLevel = new v();
    this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event;
    this.mapWindowIdToZoomFactor = /* @__PURE__ */ new Map();
    this._onDidChangeFullscreen = new v();
    this.onDidChangeFullscreen = this._onDidChangeFullscreen.event;
    this.mapWindowIdToFullScreen = /* @__PURE__ */ new Map();
  }
  getZoomLevel(t) {
    return this.mapWindowIdToZoomLevel.get(this.getWindowId(t)) ?? 0;
  }
  setZoomLevel(t, e) {
    if (this.getZoomLevel(e) === t) return;
    let i = this.getWindowId(e);
    this.mapWindowIdToZoomLevel.set(i, t), this._onDidChangeZoomLevel.fire(i);
  }
  getZoomFactor(t) {
    return this.mapWindowIdToZoomFactor.get(this.getWindowId(t)) ?? 1;
  }
  setZoomFactor(t, e) {
    this.mapWindowIdToZoomFactor.set(this.getWindowId(e), t);
  }
  setFullscreen(t, e) {
    if (this.isFullscreen(e) === t) return;
    let i = this.getWindowId(e);
    this.mapWindowIdToFullScreen.set(i, t), this._onDidChangeFullscreen.fire(i);
  }
  isFullscreen(t) {
    return !!this.mapWindowIdToFullScreen.get(this.getWindowId(t));
  }
  getWindowId(t) {
    return t.vscodeWindowId;
  }
};
gr.INSTANCE = new gr();
var Si = gr;
function Xl(s15, t, e) {
  typeof t == "string" && (t = s15.matchMedia(t)), t.addEventListener("change", e);
}
var Eu = Si.INSTANCE.onDidChangeZoomLevel;
function mo(s15) {
  return Si.INSTANCE.getZoomFactor(s15);
}
var Tu = Si.INSTANCE.onDidChangeFullscreen;
var Ot = typeof navigator == "object" ? navigator.userAgent : "";
var Ei = Ot.indexOf("Firefox") >= 0;
var Bt = Ot.indexOf("AppleWebKit") >= 0;
var Ti = Ot.indexOf("Chrome") >= 0;
var Sr = !Ti && Ot.indexOf("Safari") >= 0;
var Iu = Ot.indexOf("Electron/") >= 0;
var yu = Ot.indexOf("Android") >= 0;
var vr = false;
if (typeof fe.matchMedia == "function") {
  let s15 = fe.matchMedia("(display-mode: standalone) or (display-mode: window-controls-overlay)"), t = fe.matchMedia("(display-mode: fullscreen)");
  vr = s15.matches, Xl(fe, s15, ({ matches: e }) => {
    vr && t.matches || (vr = e);
  });
}
function _o() {
  return vr;
}
var Nt = "en";
var yr = false;
var xr = false;
var Ii = false;
var Zl = false;
var vo = false;
var go = false;
var Jl = false;
var Ql = false;
var ea = false;
var ta = false;
var Tr;
var Ir = Nt;
var bo = Nt;
var ia;
var $e;
var Ve = globalThis;
var xe;
typeof Ve.vscode < "u" && typeof Ve.vscode.process < "u" ? xe = Ve.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (xe = process);
var So = typeof xe?.versions?.electron == "string";
var ra = So && xe?.type === "renderer";
if (typeof xe == "object") {
  yr = xe.platform === "win32", xr = xe.platform === "darwin", Ii = xe.platform === "linux", Zl = Ii && !!xe.env.SNAP && !!xe.env.SNAP_REVISION, Jl = So, ea = !!xe.env.CI || !!xe.env.BUILD_ARTIFACTSTAGINGDIRECTORY, Tr = Nt, Ir = Nt;
  let s15 = xe.env.VSCODE_NLS_CONFIG;
  if (s15) try {
    let t = JSON.parse(s15);
    Tr = t.userLocale, bo = t.osLocale, Ir = t.resolvedLanguage || Nt, ia = t.languagePack?.translationsConfigFile;
  } catch {
  }
  vo = true;
} else typeof navigator == "object" && !ra ? ($e = navigator.userAgent, yr = $e.indexOf("Windows") >= 0, xr = $e.indexOf("Macintosh") >= 0, Ql = ($e.indexOf("Macintosh") >= 0 || $e.indexOf("iPad") >= 0 || $e.indexOf("iPhone") >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0, Ii = $e.indexOf("Linux") >= 0, ta = $e?.indexOf("Mobi") >= 0, go = true, Ir = globalThis._VSCODE_NLS_LANGUAGE || Nt, Tr = navigator.language.toLowerCase(), bo = Tr) : console.error("Unable to resolve platform.");
var Xn = 0;
xr ? Xn = 1 : yr ? Xn = 3 : Ii && (Xn = 2);
var wr = yr;
var Te = xr;
var Zn = Ii;
var Dr = vo;
var na = go && typeof Ve.importScripts == "function";
var xu = na ? Ve.origin : void 0;
var Fe = $e;
var st = Ir;
var sa;
((i) => {
  function s15() {
    return st;
  }
  i.value = s15;
  function t() {
    return st.length === 2 ? st === "en" : st.length >= 3 ? st[0] === "e" && st[1] === "n" && st[2] === "-" : false;
  }
  i.isDefaultVariant = t;
  function e() {
    return st === "en";
  }
  i.isDefault = e;
})(sa ||= {});
var oa = typeof Ve.postMessage == "function" && !Ve.importScripts;
var Eo = (() => {
  if (oa) {
    let s15 = [];
    Ve.addEventListener("message", (e) => {
      if (e.data && e.data.vscodeScheduleAsyncWork) for (let i = 0, r5 = s15.length; i < r5; i++) {
        let n = s15[i];
        if (n.id === e.data.vscodeScheduleAsyncWork) {
          s15.splice(i, 1), n.callback();
          return;
        }
      }
    });
    let t = 0;
    return (e) => {
      let i = ++t;
      s15.push({ id: i, callback: e }), Ve.postMessage({ vscodeScheduleAsyncWork: i }, "*");
    };
  }
  return (s15) => setTimeout(s15);
})();
var la = !!(Fe && Fe.indexOf("Chrome") >= 0);
var wu = !!(Fe && Fe.indexOf("Firefox") >= 0);
var Du = !!(!la && Fe && Fe.indexOf("Safari") >= 0);
var Ru = !!(Fe && Fe.indexOf("Edg/") >= 0);
var Lu = !!(Fe && Fe.indexOf("Android") >= 0);
var ot = typeof navigator == "object" ? navigator : {};
var aa = { clipboard: { writeText: Dr || document.queryCommandSupported && document.queryCommandSupported("copy") || !!(ot && ot.clipboard && ot.clipboard.writeText), readText: Dr || !!(ot && ot.clipboard && ot.clipboard.readText) }, keyboard: Dr || _o() ? 0 : ot.keyboard || Sr ? 1 : 2, touch: "ontouchstart" in fe || ot.maxTouchPoints > 0, pointerEvents: fe.PointerEvent && ("ontouchstart" in fe || navigator.maxTouchPoints > 0) };
var yi = class {
  constructor() {
    this._keyCodeToStr = [], this._strToKeyCode = /* @__PURE__ */ Object.create(null);
  }
  define(t, e) {
    this._keyCodeToStr[t] = e, this._strToKeyCode[e.toLowerCase()] = t;
  }
  keyCodeToStr(t) {
    return this._keyCodeToStr[t];
  }
  strToKeyCode(t) {
    return this._strToKeyCode[t.toLowerCase()] || 0;
  }
};
var Jn = new yi();
var To = new yi();
var Io = new yi();
var yo = new Array(230);
var Qn;
((o2) => {
  function s15(l) {
    return Jn.keyCodeToStr(l);
  }
  o2.toString = s15;
  function t(l) {
    return Jn.strToKeyCode(l);
  }
  o2.fromString = t;
  function e(l) {
    return To.keyCodeToStr(l);
  }
  o2.toUserSettingsUS = e;
  function i(l) {
    return Io.keyCodeToStr(l);
  }
  o2.toUserSettingsGeneral = i;
  function r5(l) {
    return To.strToKeyCode(l) || Io.strToKeyCode(l);
  }
  o2.fromUserSettings = r5;
  function n(l) {
    if (l >= 98 && l <= 113) return null;
    switch (l) {
      case 16:
        return "Up";
      case 18:
        return "Down";
      case 15:
        return "Left";
      case 17:
        return "Right";
    }
    return Jn.keyCodeToStr(l);
  }
  o2.toElectronAccelerator = n;
})(Qn ||= {});
var Rr = class s8 {
  constructor(t, e, i, r5, n) {
    this.ctrlKey = t;
    this.shiftKey = e;
    this.altKey = i;
    this.metaKey = r5;
    this.keyCode = n;
  }
  equals(t) {
    return t instanceof s8 && this.ctrlKey === t.ctrlKey && this.shiftKey === t.shiftKey && this.altKey === t.altKey && this.metaKey === t.metaKey && this.keyCode === t.keyCode;
  }
  getHashCode() {
    let t = this.ctrlKey ? "1" : "0", e = this.shiftKey ? "1" : "0", i = this.altKey ? "1" : "0", r5 = this.metaKey ? "1" : "0";
    return `K${t}${e}${i}${r5}${this.keyCode}`;
  }
  isModifierKey() {
    return this.keyCode === 0 || this.keyCode === 5 || this.keyCode === 57 || this.keyCode === 6 || this.keyCode === 4;
  }
  toKeybinding() {
    return new es([this]);
  }
  isDuplicateModifierCase() {
    return this.ctrlKey && this.keyCode === 5 || this.shiftKey && this.keyCode === 4 || this.altKey && this.keyCode === 6 || this.metaKey && this.keyCode === 57;
  }
};
var es = class {
  constructor(t) {
    if (t.length === 0) throw eo("chords");
    this.chords = t;
  }
  getHashCode() {
    let t = "";
    for (let e = 0, i = this.chords.length; e < i; e++) e !== 0 && (t += ";"), t += this.chords[e].getHashCode();
    return t;
  }
  equals(t) {
    if (t === null || this.chords.length !== t.chords.length) return false;
    for (let e = 0; e < this.chords.length; e++) if (!this.chords[e].equals(t.chords[e])) return false;
    return true;
  }
};
function ca(s15) {
  if (s15.charCode) {
    let e = String.fromCharCode(s15.charCode).toUpperCase();
    return Qn.fromString(e);
  }
  let t = s15.keyCode;
  if (t === 3) return 7;
  if (Ei) switch (t) {
    case 59:
      return 85;
    case 60:
      if (Zn) return 97;
      break;
    case 61:
      return 86;
    case 107:
      return 109;
    case 109:
      return 111;
    case 173:
      return 88;
    case 224:
      if (Te) return 57;
      break;
  }
  else if (Bt) {
    if (Te && t === 93) return 57;
    if (!Te && t === 92) return 57;
  }
  return yo[t] || 0;
}
var ua = Te ? 256 : 2048;
var ha = 512;
var da = 1024;
var fa = Te ? 2048 : 256;
var ft = class {
  constructor(t) {
    this._standardKeyboardEventBrand = true;
    let e = t;
    this.browserEvent = e, this.target = e.target, this.ctrlKey = e.ctrlKey, this.shiftKey = e.shiftKey, this.altKey = e.altKey, this.metaKey = e.metaKey, this.altGraphKey = e.getModifierState?.("AltGraph"), this.keyCode = ca(e), this.code = e.code, this.ctrlKey = this.ctrlKey || this.keyCode === 5, this.altKey = this.altKey || this.keyCode === 6, this.shiftKey = this.shiftKey || this.keyCode === 4, this.metaKey = this.metaKey || this.keyCode === 57, this._asKeybinding = this._computeKeybinding(), this._asKeyCodeChord = this._computeKeyCodeChord();
  }
  preventDefault() {
    this.browserEvent && this.browserEvent.preventDefault && this.browserEvent.preventDefault();
  }
  stopPropagation() {
    this.browserEvent && this.browserEvent.stopPropagation && this.browserEvent.stopPropagation();
  }
  toKeyCodeChord() {
    return this._asKeyCodeChord;
  }
  equals(t) {
    return this._asKeybinding === t;
  }
  _computeKeybinding() {
    let t = 0;
    this.keyCode !== 5 && this.keyCode !== 4 && this.keyCode !== 6 && this.keyCode !== 57 && (t = this.keyCode);
    let e = 0;
    return this.ctrlKey && (e |= ua), this.altKey && (e |= ha), this.shiftKey && (e |= da), this.metaKey && (e |= fa), e |= t, e;
  }
  _computeKeyCodeChord() {
    let t = 0;
    return this.keyCode !== 5 && this.keyCode !== 4 && this.keyCode !== 6 && this.keyCode !== 57 && (t = this.keyCode), new Rr(this.ctrlKey, this.shiftKey, this.altKey, this.metaKey, t);
  }
};
var wo = /* @__PURE__ */ new WeakMap();
function pa(s15) {
  if (!s15.parent || s15.parent === s15) return null;
  try {
    let t = s15.location, e = s15.parent.location;
    if (t.origin !== "null" && e.origin !== "null" && t.origin !== e.origin) return null;
  } catch {
    return null;
  }
  return s15.parent;
}
var Lr = class {
  static getSameOriginWindowChain(t) {
    let e = wo.get(t);
    if (!e) {
      e = [], wo.set(t, e);
      let i = t, r5;
      do
        r5 = pa(i), r5 ? e.push({ window: new WeakRef(i), iframeElement: i.frameElement || null }) : e.push({ window: new WeakRef(i), iframeElement: null }), i = r5;
      while (i);
    }
    return e.slice(0);
  }
  static getPositionOfChildWindowRelativeToAncestorWindow(t, e) {
    if (!e || t === e) return { top: 0, left: 0 };
    let i = 0, r5 = 0, n = this.getSameOriginWindowChain(t);
    for (let o2 of n) {
      let l = o2.window.deref();
      if (i += l?.scrollY ?? 0, r5 += l?.scrollX ?? 0, l === e || !o2.iframeElement) break;
      let a = o2.iframeElement.getBoundingClientRect();
      i += a.top, r5 += a.left;
    }
    return { top: i, left: r5 };
  }
};
var qe = class {
  constructor(t, e) {
    this.timestamp = Date.now(), this.browserEvent = e, this.leftButton = e.button === 0, this.middleButton = e.button === 1, this.rightButton = e.button === 2, this.buttons = e.buttons, this.target = e.target, this.detail = e.detail || 1, e.type === "dblclick" && (this.detail = 2), this.ctrlKey = e.ctrlKey, this.shiftKey = e.shiftKey, this.altKey = e.altKey, this.metaKey = e.metaKey, typeof e.pageX == "number" ? (this.posx = e.pageX, this.posy = e.pageY) : (this.posx = e.clientX + this.target.ownerDocument.body.scrollLeft + this.target.ownerDocument.documentElement.scrollLeft, this.posy = e.clientY + this.target.ownerDocument.body.scrollTop + this.target.ownerDocument.documentElement.scrollTop);
    let i = Lr.getPositionOfChildWindowRelativeToAncestorWindow(t, e.view);
    this.posx -= i.left, this.posy -= i.top;
  }
  preventDefault() {
    this.browserEvent.preventDefault();
  }
  stopPropagation() {
    this.browserEvent.stopPropagation();
  }
};
var xi = class {
  constructor(t, e = 0, i = 0) {
    this.browserEvent = t || null, this.target = t ? t.target || t.targetNode || t.srcElement : null, this.deltaY = i, this.deltaX = e;
    let r5 = false;
    if (Ti) {
      let n = navigator.userAgent.match(/Chrome\/(\d+)/);
      r5 = (n ? parseInt(n[1]) : 123) <= 122;
    }
    if (t) {
      let n = t, o2 = t, l = t.view?.devicePixelRatio || 1;
      if (typeof n.wheelDeltaY < "u") r5 ? this.deltaY = n.wheelDeltaY / (120 * l) : this.deltaY = n.wheelDeltaY / 120;
      else if (typeof o2.VERTICAL_AXIS < "u" && o2.axis === o2.VERTICAL_AXIS) this.deltaY = -o2.detail / 3;
      else if (t.type === "wheel") {
        let a = t;
        a.deltaMode === a.DOM_DELTA_LINE ? Ei && !Te ? this.deltaY = -t.deltaY / 3 : this.deltaY = -t.deltaY : this.deltaY = -t.deltaY / 40;
      }
      if (typeof n.wheelDeltaX < "u") Sr && wr ? this.deltaX = -(n.wheelDeltaX / 120) : r5 ? this.deltaX = n.wheelDeltaX / (120 * l) : this.deltaX = n.wheelDeltaX / 120;
      else if (typeof o2.HORIZONTAL_AXIS < "u" && o2.axis === o2.HORIZONTAL_AXIS) this.deltaX = -t.detail / 3;
      else if (t.type === "wheel") {
        let a = t;
        a.deltaMode === a.DOM_DELTA_LINE ? Ei && !Te ? this.deltaX = -t.deltaX / 3 : this.deltaX = -t.deltaX : this.deltaX = -t.deltaX / 40;
      }
      this.deltaY === 0 && this.deltaX === 0 && t.wheelDelta && (r5 ? this.deltaY = t.wheelDelta / (120 * l) : this.deltaY = t.wheelDelta / 120);
    }
  }
  preventDefault() {
    this.browserEvent?.preventDefault();
  }
  stopPropagation() {
    this.browserEvent?.stopPropagation();
  }
};
var Do = Object.freeze(function(s15, t) {
  let e = setTimeout(s15.bind(t), 0);
  return { dispose() {
    clearTimeout(e);
  } };
});
var ma;
((i) => {
  function s15(r5) {
    return r5 === i.None || r5 === i.Cancelled || r5 instanceof ts ? true : !r5 || typeof r5 != "object" ? false : typeof r5.isCancellationRequested == "boolean" && typeof r5.onCancellationRequested == "function";
  }
  i.isCancellationToken = s15, i.None = Object.freeze({ isCancellationRequested: false, onCancellationRequested: $.None }), i.Cancelled = Object.freeze({ isCancellationRequested: true, onCancellationRequested: Do });
})(ma ||= {});
var ts = class {
  constructor() {
    this._isCancelled = false;
    this._emitter = null;
  }
  cancel() {
    this._isCancelled || (this._isCancelled = true, this._emitter && (this._emitter.fire(void 0), this.dispose()));
  }
  get isCancellationRequested() {
    return this._isCancelled;
  }
  get onCancellationRequested() {
    return this._isCancelled ? Do : (this._emitter || (this._emitter = new v()), this._emitter.event);
  }
  dispose() {
    this._emitter && (this._emitter.dispose(), this._emitter = null);
  }
};
var Ye = class {
  constructor(t, e) {
    this._isDisposed = false;
    this._token = -1, typeof t == "function" && typeof e == "number" && this.setIfNotSet(t, e);
  }
  dispose() {
    this.cancel(), this._isDisposed = true;
  }
  cancel() {
    this._token !== -1 && (clearTimeout(this._token), this._token = -1);
  }
  cancelAndSet(t, e) {
    if (this._isDisposed) throw new Rt("Calling 'cancelAndSet' on a disposed TimeoutTimer");
    this.cancel(), this._token = setTimeout(() => {
      this._token = -1, t();
    }, e);
  }
  setIfNotSet(t, e) {
    if (this._isDisposed) throw new Rt("Calling 'setIfNotSet' on a disposed TimeoutTimer");
    this._token === -1 && (this._token = setTimeout(() => {
      this._token = -1, t();
    }, e));
  }
};
var kr = class {
  constructor() {
    this.disposable = void 0;
    this.isDisposed = false;
  }
  cancel() {
    this.disposable?.dispose(), this.disposable = void 0;
  }
  cancelAndSet(t, e, i = globalThis) {
    if (this.isDisposed) throw new Rt("Calling 'cancelAndSet' on a disposed IntervalTimer");
    this.cancel();
    let r5 = i.setInterval(() => {
      t();
    }, e);
    this.disposable = C(() => {
      i.clearInterval(r5), this.disposable = void 0;
    });
  }
  dispose() {
    this.cancel(), this.isDisposed = true;
  }
};
var ba;
var Ar;
(function() {
  typeof globalThis.requestIdleCallback != "function" || typeof globalThis.cancelIdleCallback != "function" ? Ar = (s15, t) => {
    Eo(() => {
      if (e) return;
      let i = Date.now() + 15;
      t(Object.freeze({ didTimeout: true, timeRemaining() {
        return Math.max(0, i - Date.now());
      } }));
    });
    let e = false;
    return { dispose() {
      e || (e = true);
    } };
  } : Ar = (s15, t, e) => {
    let i = s15.requestIdleCallback(t, typeof e == "number" ? { timeout: e } : void 0), r5 = false;
    return { dispose() {
      r5 || (r5 = true, s15.cancelIdleCallback(i));
    } };
  }, ba = (s15) => Ar(globalThis, s15);
})();
var va;
((e) => {
  async function s15(i) {
    let r5, n = await Promise.all(i.map((o2) => o2.then((l) => l, (l) => {
      r5 || (r5 = l);
    })));
    if (typeof r5 < "u") throw r5;
    return n;
  }
  e.settled = s15;
  function t(i) {
    return new Promise(async (r5, n) => {
      try {
        await i(r5, n);
      } catch (o2) {
        n(o2);
      }
    });
  }
  e.withAsyncBody = t;
})(va ||= {});
var _e = class _e2 {
  static fromArray(t) {
    return new _e2((e) => {
      e.emitMany(t);
    });
  }
  static fromPromise(t) {
    return new _e2(async (e) => {
      e.emitMany(await t);
    });
  }
  static fromPromises(t) {
    return new _e2(async (e) => {
      await Promise.all(t.map(async (i) => e.emitOne(await i)));
    });
  }
  static merge(t) {
    return new _e2(async (e) => {
      await Promise.all(t.map(async (i) => {
        for await (let r5 of i) e.emitOne(r5);
      }));
    });
  }
  constructor(t, e) {
    this._state = 0, this._results = [], this._error = null, this._onReturn = e, this._onStateChanged = new v(), queueMicrotask(async () => {
      let i = { emitOne: (r5) => this.emitOne(r5), emitMany: (r5) => this.emitMany(r5), reject: (r5) => this.reject(r5) };
      try {
        await Promise.resolve(t(i)), this.resolve();
      } catch (r5) {
        this.reject(r5);
      } finally {
        i.emitOne = void 0, i.emitMany = void 0, i.reject = void 0;
      }
    });
  }
  [Symbol.asyncIterator]() {
    let t = 0;
    return { next: async () => {
      do {
        if (this._state === 2) throw this._error;
        if (t < this._results.length) return { done: false, value: this._results[t++] };
        if (this._state === 1) return { done: true, value: void 0 };
        await $.toPromise(this._onStateChanged.event);
      } while (true);
    }, return: async () => (this._onReturn?.(), { done: true, value: void 0 }) };
  }
  static map(t, e) {
    return new _e2(async (i) => {
      for await (let r5 of t) i.emitOne(e(r5));
    });
  }
  map(t) {
    return _e2.map(this, t);
  }
  static filter(t, e) {
    return new _e2(async (i) => {
      for await (let r5 of t) e(r5) && i.emitOne(r5);
    });
  }
  filter(t) {
    return _e2.filter(this, t);
  }
  static coalesce(t) {
    return _e2.filter(t, (e) => !!e);
  }
  coalesce() {
    return _e2.coalesce(this);
  }
  static async toPromise(t) {
    let e = [];
    for await (let i of t) e.push(i);
    return e;
  }
  toPromise() {
    return _e2.toPromise(this);
  }
  emitOne(t) {
    this._state === 0 && (this._results.push(t), this._onStateChanged.fire());
  }
  emitMany(t) {
    this._state === 0 && (this._results = this._results.concat(t), this._onStateChanged.fire());
  }
  resolve() {
    this._state === 0 && (this._state = 1, this._onStateChanged.fire());
  }
  reject(t) {
    this._state === 0 && (this._state = 2, this._error = t, this._onStateChanged.fire());
  }
};
_e.EMPTY = _e.fromArray([]);
function Lo(s15) {
  return 55296 <= s15 && s15 <= 56319;
}
function is(s15) {
  return 56320 <= s15 && s15 <= 57343;
}
function Ao(s15, t) {
  return (s15 - 55296 << 10) + (t - 56320) + 65536;
}
function Mo(s15) {
  return ns(s15, 0);
}
function ns(s15, t) {
  switch (typeof s15) {
    case "object":
      return s15 === null ? je(349, t) : Array.isArray(s15) ? Ea(s15, t) : Ta(s15, t);
    case "string":
      return Po(s15, t);
    case "boolean":
      return Sa(s15, t);
    case "number":
      return je(s15, t);
    case "undefined":
      return je(937, t);
    default:
      return je(617, t);
  }
}
function je(s15, t) {
  return (t << 5) - t + s15 | 0;
}
function Sa(s15, t) {
  return je(s15 ? 433 : 863, t);
}
function Po(s15, t) {
  t = je(149417, t);
  for (let e = 0, i = s15.length; e < i; e++) t = je(s15.charCodeAt(e), t);
  return t;
}
function Ea(s15, t) {
  return t = je(104579, t), s15.reduce((e, i) => ns(i, e), t);
}
function Ta(s15, t) {
  return t = je(181387, t), Object.keys(s15).sort().reduce((e, i) => (e = Po(i, e), ns(s15[i], e)), t);
}
function rs(s15, t, e = 32) {
  let i = e - t, r5 = ~((1 << i) - 1);
  return (s15 << t | (r5 & s15) >>> i) >>> 0;
}
function ko(s15, t = 0, e = s15.byteLength, i = 0) {
  for (let r5 = 0; r5 < e; r5++) s15[t + r5] = i;
}
function Ia(s15, t, e = "0") {
  for (; s15.length < t; ) s15 = e + s15;
  return s15;
}
function wi(s15, t = 32) {
  return s15 instanceof ArrayBuffer ? Array.from(new Uint8Array(s15)).map((e) => e.toString(16).padStart(2, "0")).join("") : Ia((s15 >>> 0).toString(16), t / 4);
}
var Cr = class Cr2 {
  constructor() {
    this._h0 = 1732584193;
    this._h1 = 4023233417;
    this._h2 = 2562383102;
    this._h3 = 271733878;
    this._h4 = 3285377520;
    this._buff = new Uint8Array(67), this._buffDV = new DataView(this._buff.buffer), this._buffLen = 0, this._totalLen = 0, this._leftoverHighSurrogate = 0, this._finished = false;
  }
  update(t) {
    let e = t.length;
    if (e === 0) return;
    let i = this._buff, r5 = this._buffLen, n = this._leftoverHighSurrogate, o2, l;
    for (n !== 0 ? (o2 = n, l = -1, n = 0) : (o2 = t.charCodeAt(0), l = 0); ; ) {
      let a = o2;
      if (Lo(o2)) if (l + 1 < e) {
        let u = t.charCodeAt(l + 1);
        is(u) ? (l++, a = Ao(o2, u)) : a = 65533;
      } else {
        n = o2;
        break;
      }
      else is(o2) && (a = 65533);
      if (r5 = this._push(i, r5, a), l++, l < e) o2 = t.charCodeAt(l);
      else break;
    }
    this._buffLen = r5, this._leftoverHighSurrogate = n;
  }
  _push(t, e, i) {
    return i < 128 ? t[e++] = i : i < 2048 ? (t[e++] = 192 | (i & 1984) >>> 6, t[e++] = 128 | (i & 63) >>> 0) : i < 65536 ? (t[e++] = 224 | (i & 61440) >>> 12, t[e++] = 128 | (i & 4032) >>> 6, t[e++] = 128 | (i & 63) >>> 0) : (t[e++] = 240 | (i & 1835008) >>> 18, t[e++] = 128 | (i & 258048) >>> 12, t[e++] = 128 | (i & 4032) >>> 6, t[e++] = 128 | (i & 63) >>> 0), e >= 64 && (this._step(), e -= 64, this._totalLen += 64, t[0] = t[64], t[1] = t[65], t[2] = t[66]), e;
  }
  digest() {
    return this._finished || (this._finished = true, this._leftoverHighSurrogate && (this._leftoverHighSurrogate = 0, this._buffLen = this._push(this._buff, this._buffLen, 65533)), this._totalLen += this._buffLen, this._wrapUp()), wi(this._h0) + wi(this._h1) + wi(this._h2) + wi(this._h3) + wi(this._h4);
  }
  _wrapUp() {
    this._buff[this._buffLen++] = 128, ko(this._buff, this._buffLen), this._buffLen > 56 && (this._step(), ko(this._buff));
    let t = 8 * this._totalLen;
    this._buffDV.setUint32(56, Math.floor(t / 4294967296), false), this._buffDV.setUint32(60, t % 4294967296, false), this._step();
  }
  _step() {
    let t = Cr2._bigBlock32, e = this._buffDV;
    for (let c = 0; c < 64; c += 4) t.setUint32(c, e.getUint32(c, false), false);
    for (let c = 64; c < 320; c += 4) t.setUint32(c, rs(t.getUint32(c - 12, false) ^ t.getUint32(c - 32, false) ^ t.getUint32(c - 56, false) ^ t.getUint32(c - 64, false), 1), false);
    let i = this._h0, r5 = this._h1, n = this._h2, o2 = this._h3, l = this._h4, a, u, h2;
    for (let c = 0; c < 80; c++) c < 20 ? (a = r5 & n | ~r5 & o2, u = 1518500249) : c < 40 ? (a = r5 ^ n ^ o2, u = 1859775393) : c < 60 ? (a = r5 & n | r5 & o2 | n & o2, u = 2400959708) : (a = r5 ^ n ^ o2, u = 3395469782), h2 = rs(i, 5) + a + l + u + t.getUint32(c * 4, false) & 4294967295, l = o2, o2 = n, n = rs(r5, 30), r5 = i, i = h2;
    this._h0 = this._h0 + i & 4294967295, this._h1 = this._h1 + r5 & 4294967295, this._h2 = this._h2 + n & 4294967295, this._h3 = this._h3 + o2 & 4294967295, this._h4 = this._h4 + l & 4294967295;
  }
};
Cr._bigBlock32 = new DataView(new ArrayBuffer(320));
var { registerWindow: Bh, getWindow: be, getDocument: Nh, getWindows: Fh, getWindowsCount: Hh, getWindowId: Oo, getWindowById: Wh, hasWindow: Uh, onDidRegisterWindow: No, onWillUnregisterWindow: Kh, onDidUnregisterWindow: zh } = (function() {
  let s15 = /* @__PURE__ */ new Map();
  fe;
  let t = { window: fe, disposables: new Ee() };
  s15.set(fe.vscodeWindowId, t);
  let e = new v(), i = new v(), r5 = new v();
  function n(o2, l) {
    return (typeof o2 == "number" ? s15.get(o2) : void 0) ?? (l ? t : void 0);
  }
  return { onDidRegisterWindow: e.event, onWillUnregisterWindow: r5.event, onDidUnregisterWindow: i.event, registerWindow(o2) {
    if (s15.has(o2.vscodeWindowId)) return D.None;
    let l = new Ee(), a = { window: o2, disposables: l.add(new Ee()) };
    return s15.set(o2.vscodeWindowId, a), l.add(C(() => {
      s15.delete(o2.vscodeWindowId), i.fire(o2);
    })), l.add(L(o2, Y.BEFORE_UNLOAD, () => {
      r5.fire(o2);
    })), e.fire(a), l;
  }, getWindows() {
    return s15.values();
  }, getWindowsCount() {
    return s15.size;
  }, getWindowId(o2) {
    return o2.vscodeWindowId;
  }, hasWindow(o2) {
    return s15.has(o2);
  }, getWindowById: n, getWindow(o2) {
    let l = o2;
    if (l?.ownerDocument?.defaultView) return l.ownerDocument.defaultView.window;
    let a = o2;
    return a?.view ? a.view.window : fe;
  }, getDocument(o2) {
    return be(o2).document;
  } };
})();
var ss = class {
  constructor(t, e, i, r5) {
    this._node = t, this._type = e, this._handler = i, this._options = r5 || false, this._node.addEventListener(this._type, this._handler, this._options);
  }
  dispose() {
    this._handler && (this._node.removeEventListener(this._type, this._handler, this._options), this._node = null, this._handler = null);
  }
};
function L(s15, t, e, i) {
  return new ss(s15, t, e, i);
}
function ya(s15, t) {
  return function(e) {
    return t(new qe(s15, e));
  };
}
function xa(s15) {
  return function(t) {
    return s15(new ft(t));
  };
}
var os = function(t, e, i, r5) {
  let n = i;
  return e === "click" || e === "mousedown" || e === "contextmenu" ? n = ya(be(t), i) : (e === "keydown" || e === "keypress" || e === "keyup") && (n = xa(i)), L(t, e, n, r5);
};
var wa;
var mt;
var Mr = class extends kr {
  constructor(t) {
    super(), this.defaultTarget = t && be(t);
  }
  cancelAndSet(t, e, i) {
    return super.cancelAndSet(t, e, i ?? this.defaultTarget);
  }
};
var Di = class {
  constructor(t, e = 0) {
    this._runner = t, this.priority = e, this._canceled = false;
  }
  dispose() {
    this._canceled = true;
  }
  execute() {
    if (!this._canceled) try {
      this._runner();
    } catch (t) {
      Lt(t);
    }
  }
  static sort(t, e) {
    return e.priority - t.priority;
  }
};
(function() {
  let s15 = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r5 = (n) => {
    e.set(n, false);
    let o2 = s15.get(n) ?? [];
    for (t.set(n, o2), s15.set(n, []), i.set(n, true); o2.length > 0; ) o2.sort(Di.sort), o2.shift().execute();
    i.set(n, false);
  };
  mt = (n, o2, l = 0) => {
    let a = Oo(n), u = new Di(o2, l), h2 = s15.get(a);
    return h2 || (h2 = [], s15.set(a, h2)), h2.push(u), e.get(a) || (e.set(a, true), n.requestAnimationFrame(() => r5(a))), u;
  }, wa = (n, o2, l) => {
    let a = Oo(n);
    if (i.get(a)) {
      let u = new Di(o2, l), h2 = t.get(a);
      return h2 || (h2 = [], t.set(a, h2)), h2.push(u), u;
    } else return mt(n, o2, l);
  };
})();
var pt = class pt2 {
  constructor(t, e) {
    this.width = t;
    this.height = e;
  }
  with(t = this.width, e = this.height) {
    return t !== this.width || e !== this.height ? new pt2(t, e) : this;
  }
  static is(t) {
    return typeof t == "object" && typeof t.height == "number" && typeof t.width == "number";
  }
  static lift(t) {
    return t instanceof pt2 ? t : new pt2(t.width, t.height);
  }
  static equals(t, e) {
    return t === e ? true : !t || !e ? false : t.width === e.width && t.height === e.height;
  }
};
pt.None = new pt(0, 0);
function Fo(s15) {
  let t = s15.getBoundingClientRect(), e = be(s15);
  return { left: t.left + e.scrollX, top: t.top + e.scrollY, width: t.width, height: t.height };
}
var Gh = new class {
  constructor() {
    this.mutationObservers = /* @__PURE__ */ new Map();
  }
  observe(s15, t, e) {
    let i = this.mutationObservers.get(s15);
    i || (i = /* @__PURE__ */ new Map(), this.mutationObservers.set(s15, i));
    let r5 = Mo(e), n = i.get(r5);
    if (n) n.users += 1;
    else {
      let o2 = new v(), l = new MutationObserver((u) => o2.fire(u));
      l.observe(s15, e);
      let a = n = { users: 1, observer: l, onDidMutate: o2.event };
      t.add(C(() => {
        a.users -= 1, a.users === 0 && (o2.dispose(), l.disconnect(), i?.delete(r5), i?.size === 0 && this.mutationObservers.delete(s15));
      })), i.set(r5, n);
    }
    return n.onDidMutate;
  }
}();
var Y = { CLICK: "click", AUXCLICK: "auxclick", DBLCLICK: "dblclick", MOUSE_UP: "mouseup", MOUSE_DOWN: "mousedown", MOUSE_OVER: "mouseover", MOUSE_MOVE: "mousemove", MOUSE_OUT: "mouseout", MOUSE_ENTER: "mouseenter", MOUSE_LEAVE: "mouseleave", MOUSE_WHEEL: "wheel", POINTER_UP: "pointerup", POINTER_DOWN: "pointerdown", POINTER_MOVE: "pointermove", POINTER_LEAVE: "pointerleave", CONTEXT_MENU: "contextmenu", WHEEL: "wheel", KEY_DOWN: "keydown", KEY_PRESS: "keypress", KEY_UP: "keyup", LOAD: "load", BEFORE_UNLOAD: "beforeunload", UNLOAD: "unload", PAGE_SHOW: "pageshow", PAGE_HIDE: "pagehide", PASTE: "paste", ABORT: "abort", ERROR: "error", RESIZE: "resize", SCROLL: "scroll", FULLSCREEN_CHANGE: "fullscreenchange", WK_FULLSCREEN_CHANGE: "webkitfullscreenchange", SELECT: "select", CHANGE: "change", SUBMIT: "submit", RESET: "reset", FOCUS: "focus", FOCUS_IN: "focusin", FOCUS_OUT: "focusout", BLUR: "blur", INPUT: "input", STORAGE: "storage", DRAG_START: "dragstart", DRAG: "drag", DRAG_ENTER: "dragenter", DRAG_LEAVE: "dragleave", DRAG_OVER: "dragover", DROP: "drop", DRAG_END: "dragend", ANIMATION_START: Bt ? "webkitAnimationStart" : "animationstart", ANIMATION_END: Bt ? "webkitAnimationEnd" : "animationend", ANIMATION_ITERATION: Bt ? "webkitAnimationIteration" : "animationiteration" };
var Da = /([\w\-]+)?(#([\w\-]+))?((\.([\w\-]+))*)/;
function Ho(s15, t, e, ...i) {
  let r5 = Da.exec(t);
  if (!r5) throw new Error("Bad use of emmet");
  let n = r5[1] || "div", o2;
  return s15 !== "http://www.w3.org/1999/xhtml" ? o2 = document.createElementNS(s15, n) : o2 = document.createElement(n), r5[3] && (o2.id = r5[3]), r5[4] && (o2.className = r5[4].replace(/\./g, " ").trim()), e && Object.entries(e).forEach(([l, a]) => {
    typeof a > "u" || (/^on\w+$/.test(l) ? o2[l] = a : l === "selected" ? a && o2.setAttribute(l, "true") : o2.setAttribute(l, a));
  }), o2.append(...i), o2;
}
function Ra(s15, t, ...e) {
  return Ho("http://www.w3.org/1999/xhtml", s15, t, ...e);
}
Ra.SVG = function(s15, t, ...e) {
  return Ho("http://www.w3.org/2000/svg", s15, t, ...e);
};
var ls = class {
  constructor(t) {
    this.domNode = t;
    this._maxWidth = "";
    this._width = "";
    this._height = "";
    this._top = "";
    this._left = "";
    this._bottom = "";
    this._right = "";
    this._paddingTop = "";
    this._paddingLeft = "";
    this._paddingBottom = "";
    this._paddingRight = "";
    this._fontFamily = "";
    this._fontWeight = "";
    this._fontSize = "";
    this._fontStyle = "";
    this._fontFeatureSettings = "";
    this._fontVariationSettings = "";
    this._textDecoration = "";
    this._lineHeight = "";
    this._letterSpacing = "";
    this._className = "";
    this._display = "";
    this._position = "";
    this._visibility = "";
    this._color = "";
    this._backgroundColor = "";
    this._layerHint = false;
    this._contain = "none";
    this._boxShadow = "";
  }
  setMaxWidth(t) {
    let e = Ie(t);
    this._maxWidth !== e && (this._maxWidth = e, this.domNode.style.maxWidth = this._maxWidth);
  }
  setWidth(t) {
    let e = Ie(t);
    this._width !== e && (this._width = e, this.domNode.style.width = this._width);
  }
  setHeight(t) {
    let e = Ie(t);
    this._height !== e && (this._height = e, this.domNode.style.height = this._height);
  }
  setTop(t) {
    let e = Ie(t);
    this._top !== e && (this._top = e, this.domNode.style.top = this._top);
  }
  setLeft(t) {
    let e = Ie(t);
    this._left !== e && (this._left = e, this.domNode.style.left = this._left);
  }
  setBottom(t) {
    let e = Ie(t);
    this._bottom !== e && (this._bottom = e, this.domNode.style.bottom = this._bottom);
  }
  setRight(t) {
    let e = Ie(t);
    this._right !== e && (this._right = e, this.domNode.style.right = this._right);
  }
  setPaddingTop(t) {
    let e = Ie(t);
    this._paddingTop !== e && (this._paddingTop = e, this.domNode.style.paddingTop = this._paddingTop);
  }
  setPaddingLeft(t) {
    let e = Ie(t);
    this._paddingLeft !== e && (this._paddingLeft = e, this.domNode.style.paddingLeft = this._paddingLeft);
  }
  setPaddingBottom(t) {
    let e = Ie(t);
    this._paddingBottom !== e && (this._paddingBottom = e, this.domNode.style.paddingBottom = this._paddingBottom);
  }
  setPaddingRight(t) {
    let e = Ie(t);
    this._paddingRight !== e && (this._paddingRight = e, this.domNode.style.paddingRight = this._paddingRight);
  }
  setFontFamily(t) {
    this._fontFamily !== t && (this._fontFamily = t, this.domNode.style.fontFamily = this._fontFamily);
  }
  setFontWeight(t) {
    this._fontWeight !== t && (this._fontWeight = t, this.domNode.style.fontWeight = this._fontWeight);
  }
  setFontSize(t) {
    let e = Ie(t);
    this._fontSize !== e && (this._fontSize = e, this.domNode.style.fontSize = this._fontSize);
  }
  setFontStyle(t) {
    this._fontStyle !== t && (this._fontStyle = t, this.domNode.style.fontStyle = this._fontStyle);
  }
  setFontFeatureSettings(t) {
    this._fontFeatureSettings !== t && (this._fontFeatureSettings = t, this.domNode.style.fontFeatureSettings = this._fontFeatureSettings);
  }
  setFontVariationSettings(t) {
    this._fontVariationSettings !== t && (this._fontVariationSettings = t, this.domNode.style.fontVariationSettings = this._fontVariationSettings);
  }
  setTextDecoration(t) {
    this._textDecoration !== t && (this._textDecoration = t, this.domNode.style.textDecoration = this._textDecoration);
  }
  setLineHeight(t) {
    let e = Ie(t);
    this._lineHeight !== e && (this._lineHeight = e, this.domNode.style.lineHeight = this._lineHeight);
  }
  setLetterSpacing(t) {
    let e = Ie(t);
    this._letterSpacing !== e && (this._letterSpacing = e, this.domNode.style.letterSpacing = this._letterSpacing);
  }
  setClassName(t) {
    this._className !== t && (this._className = t, this.domNode.className = this._className);
  }
  toggleClassName(t, e) {
    this.domNode.classList.toggle(t, e), this._className = this.domNode.className;
  }
  setDisplay(t) {
    this._display !== t && (this._display = t, this.domNode.style.display = this._display);
  }
  setPosition(t) {
    this._position !== t && (this._position = t, this.domNode.style.position = this._position);
  }
  setVisibility(t) {
    this._visibility !== t && (this._visibility = t, this.domNode.style.visibility = this._visibility);
  }
  setColor(t) {
    this._color !== t && (this._color = t, this.domNode.style.color = this._color);
  }
  setBackgroundColor(t) {
    this._backgroundColor !== t && (this._backgroundColor = t, this.domNode.style.backgroundColor = this._backgroundColor);
  }
  setLayerHinting(t) {
    this._layerHint !== t && (this._layerHint = t, this.domNode.style.transform = this._layerHint ? "translate3d(0px, 0px, 0px)" : "");
  }
  setBoxShadow(t) {
    this._boxShadow !== t && (this._boxShadow = t, this.domNode.style.boxShadow = t);
  }
  setContain(t) {
    this._contain !== t && (this._contain = t, this.domNode.style.contain = this._contain);
  }
  setAttribute(t, e) {
    this.domNode.setAttribute(t, e);
  }
  removeAttribute(t) {
    this.domNode.removeAttribute(t);
  }
  appendChild(t) {
    this.domNode.appendChild(t.domNode);
  }
  removeChild(t) {
    this.domNode.removeChild(t.domNode);
  }
};
function Ie(s15) {
  return typeof s15 == "number" ? `${s15}px` : s15;
}
function _t(s15) {
  return new ls(s15);
}
var Wt = class {
  constructor() {
    this._hooks = new Ee();
    this._pointerMoveCallback = null;
    this._onStopCallback = null;
  }
  dispose() {
    this.stopMonitoring(false), this._hooks.dispose();
  }
  stopMonitoring(t, e) {
    if (!this.isMonitoring()) return;
    this._hooks.clear(), this._pointerMoveCallback = null;
    let i = this._onStopCallback;
    this._onStopCallback = null, t && i && i(e);
  }
  isMonitoring() {
    return !!this._pointerMoveCallback;
  }
  startMonitoring(t, e, i, r5, n) {
    this.isMonitoring() && this.stopMonitoring(false), this._pointerMoveCallback = r5, this._onStopCallback = n;
    let o2 = t;
    try {
      t.setPointerCapture(e), this._hooks.add(C(() => {
        try {
          t.releasePointerCapture(e);
        } catch {
        }
      }));
    } catch {
      o2 = be(t);
    }
    this._hooks.add(L(o2, Y.POINTER_MOVE, (l) => {
      if (l.buttons !== i) {
        this.stopMonitoring(true);
        return;
      }
      l.preventDefault(), this._pointerMoveCallback(l);
    })), this._hooks.add(L(o2, Y.POINTER_UP, (l) => this.stopMonitoring(true)));
  }
};
function Wo(s15, t, e) {
  let i = null, r5 = null;
  if (typeof e.value == "function" ? (i = "value", r5 = e.value, r5.length !== 0 && console.warn("Memoize should only be used in functions with zero parameters")) : typeof e.get == "function" && (i = "get", r5 = e.get), !r5) throw new Error("not supported");
  let n = `$memoize$${t}`;
  e[i] = function(...o2) {
    return this.hasOwnProperty(n) || Object.defineProperty(this, n, { configurable: false, enumerable: false, writable: false, value: r5.apply(this, o2) }), this[n];
  };
}
var He;
((n) => (n.Tap = "-xterm-gesturetap", n.Change = "-xterm-gesturechange", n.Start = "-xterm-gesturestart", n.End = "-xterm-gesturesend", n.Contextmenu = "-xterm-gesturecontextmenu"))(He ||= {});
var Q = class Q2 extends D {
  constructor() {
    super();
    this.dispatched = false;
    this.targets = new Ct();
    this.ignoreTargets = new Ct();
    this.activeTouches = {}, this.handle = null, this._lastSetTapCountTime = 0, this._register($.runAndSubscribe(No, ({ window: e, disposables: i }) => {
      i.add(L(e.document, "touchstart", (r5) => this.onTouchStart(r5), { passive: false })), i.add(L(e.document, "touchend", (r5) => this.onTouchEnd(e, r5))), i.add(L(e.document, "touchmove", (r5) => this.onTouchMove(r5), { passive: false }));
    }, { window: fe, disposables: this._store }));
  }
  static addTarget(e) {
    if (!Q2.isTouchDevice()) return D.None;
    Q2.INSTANCE || (Q2.INSTANCE = Gn(new Q2()));
    let i = Q2.INSTANCE.targets.push(e);
    return C(i);
  }
  static ignoreTarget(e) {
    if (!Q2.isTouchDevice()) return D.None;
    Q2.INSTANCE || (Q2.INSTANCE = Gn(new Q2()));
    let i = Q2.INSTANCE.ignoreTargets.push(e);
    return C(i);
  }
  static isTouchDevice() {
    return "ontouchstart" in fe || navigator.maxTouchPoints > 0;
  }
  dispose() {
    this.handle && (this.handle.dispose(), this.handle = null), super.dispose();
  }
  onTouchStart(e) {
    let i = Date.now();
    this.handle && (this.handle.dispose(), this.handle = null);
    for (let r5 = 0, n = e.targetTouches.length; r5 < n; r5++) {
      let o2 = e.targetTouches.item(r5);
      this.activeTouches[o2.identifier] = { id: o2.identifier, initialTarget: o2.target, initialTimeStamp: i, initialPageX: o2.pageX, initialPageY: o2.pageY, rollingTimestamps: [i], rollingPageX: [o2.pageX], rollingPageY: [o2.pageY] };
      let l = this.newGestureEvent(He.Start, o2.target);
      l.pageX = o2.pageX, l.pageY = o2.pageY, this.dispatchEvent(l);
    }
    this.dispatched && (e.preventDefault(), e.stopPropagation(), this.dispatched = false);
  }
  onTouchEnd(e, i) {
    let r5 = Date.now(), n = Object.keys(this.activeTouches).length;
    for (let o2 = 0, l = i.changedTouches.length; o2 < l; o2++) {
      let a = i.changedTouches.item(o2);
      if (!this.activeTouches.hasOwnProperty(String(a.identifier))) {
        console.warn("move of an UNKNOWN touch", a);
        continue;
      }
      let u = this.activeTouches[a.identifier], h2 = Date.now() - u.initialTimeStamp;
      if (h2 < Q2.HOLD_DELAY && Math.abs(u.initialPageX - Se(u.rollingPageX)) < 30 && Math.abs(u.initialPageY - Se(u.rollingPageY)) < 30) {
        let c = this.newGestureEvent(He.Tap, u.initialTarget);
        c.pageX = Se(u.rollingPageX), c.pageY = Se(u.rollingPageY), this.dispatchEvent(c);
      } else if (h2 >= Q2.HOLD_DELAY && Math.abs(u.initialPageX - Se(u.rollingPageX)) < 30 && Math.abs(u.initialPageY - Se(u.rollingPageY)) < 30) {
        let c = this.newGestureEvent(He.Contextmenu, u.initialTarget);
        c.pageX = Se(u.rollingPageX), c.pageY = Se(u.rollingPageY), this.dispatchEvent(c);
      } else if (n === 1) {
        let c = Se(u.rollingPageX), d = Se(u.rollingPageY), _3 = Se(u.rollingTimestamps) - u.rollingTimestamps[0], p = c - u.rollingPageX[0], m = d - u.rollingPageY[0], f = [...this.targets].filter((A2) => u.initialTarget instanceof Node && A2.contains(u.initialTarget));
        this.inertia(e, f, r5, Math.abs(p) / _3, p > 0 ? 1 : -1, c, Math.abs(m) / _3, m > 0 ? 1 : -1, d);
      }
      this.dispatchEvent(this.newGestureEvent(He.End, u.initialTarget)), delete this.activeTouches[a.identifier];
    }
    this.dispatched && (i.preventDefault(), i.stopPropagation(), this.dispatched = false);
  }
  newGestureEvent(e, i) {
    let r5 = document.createEvent("CustomEvent");
    return r5.initEvent(e, false, true), r5.initialTarget = i, r5.tapCount = 0, r5;
  }
  dispatchEvent(e) {
    if (e.type === He.Tap) {
      let i = (/* @__PURE__ */ new Date()).getTime(), r5 = 0;
      i - this._lastSetTapCountTime > Q2.CLEAR_TAP_COUNT_TIME ? r5 = 1 : r5 = 2, this._lastSetTapCountTime = i, e.tapCount = r5;
    } else (e.type === He.Change || e.type === He.Contextmenu) && (this._lastSetTapCountTime = 0);
    if (e.initialTarget instanceof Node) {
      for (let r5 of this.ignoreTargets) if (r5.contains(e.initialTarget)) return;
      let i = [];
      for (let r5 of this.targets) if (r5.contains(e.initialTarget)) {
        let n = 0, o2 = e.initialTarget;
        for (; o2 && o2 !== r5; ) n++, o2 = o2.parentElement;
        i.push([n, r5]);
      }
      i.sort((r5, n) => r5[0] - n[0]);
      for (let [r5, n] of i) n.dispatchEvent(e), this.dispatched = true;
    }
  }
  inertia(e, i, r5, n, o2, l, a, u, h2) {
    this.handle = mt(e, () => {
      let c = Date.now(), d = c - r5, _3 = 0, p = 0, m = true;
      n += Q2.SCROLL_FRICTION * d, a += Q2.SCROLL_FRICTION * d, n > 0 && (m = false, _3 = o2 * n * d), a > 0 && (m = false, p = u * a * d);
      let f = this.newGestureEvent(He.Change);
      f.translationX = _3, f.translationY = p, i.forEach((A2) => A2.dispatchEvent(f)), m || this.inertia(e, i, c, n, o2, l + _3, a, u, h2 + p);
    });
  }
  onTouchMove(e) {
    let i = Date.now();
    for (let r5 = 0, n = e.changedTouches.length; r5 < n; r5++) {
      let o2 = e.changedTouches.item(r5);
      if (!this.activeTouches.hasOwnProperty(String(o2.identifier))) {
        console.warn("end of an UNKNOWN touch", o2);
        continue;
      }
      let l = this.activeTouches[o2.identifier], a = this.newGestureEvent(He.Change, l.initialTarget);
      a.translationX = o2.pageX - Se(l.rollingPageX), a.translationY = o2.pageY - Se(l.rollingPageY), a.pageX = o2.pageX, a.pageY = o2.pageY, this.dispatchEvent(a), l.rollingPageX.length > 3 && (l.rollingPageX.shift(), l.rollingPageY.shift(), l.rollingTimestamps.shift()), l.rollingPageX.push(o2.pageX), l.rollingPageY.push(o2.pageY), l.rollingTimestamps.push(i);
    }
    this.dispatched && (e.preventDefault(), e.stopPropagation(), this.dispatched = false);
  }
};
Q.SCROLL_FRICTION = -5e-3, Q.HOLD_DELAY = 700, Q.CLEAR_TAP_COUNT_TIME = 400, M([Wo], Q, "isTouchDevice", 1);
var Pr = Q;
var lt = class extends D {
  onclick(t, e) {
    this._register(L(t, Y.CLICK, (i) => e(new qe(be(t), i))));
  }
  onmousedown(t, e) {
    this._register(L(t, Y.MOUSE_DOWN, (i) => e(new qe(be(t), i))));
  }
  onmouseover(t, e) {
    this._register(L(t, Y.MOUSE_OVER, (i) => e(new qe(be(t), i))));
  }
  onmouseleave(t, e) {
    this._register(L(t, Y.MOUSE_LEAVE, (i) => e(new qe(be(t), i))));
  }
  onkeydown(t, e) {
    this._register(L(t, Y.KEY_DOWN, (i) => e(new ft(i))));
  }
  onkeyup(t, e) {
    this._register(L(t, Y.KEY_UP, (i) => e(new ft(i))));
  }
  oninput(t, e) {
    this._register(L(t, Y.INPUT, e));
  }
  onblur(t, e) {
    this._register(L(t, Y.BLUR, e));
  }
  onfocus(t, e) {
    this._register(L(t, Y.FOCUS, e));
  }
  onchange(t, e) {
    this._register(L(t, Y.CHANGE, e));
  }
  ignoreGesture(t) {
    return Pr.ignoreTarget(t);
  }
};
var Uo = 11;
var Or = class extends lt {
  constructor(t) {
    super(), this._onActivate = t.onActivate, this.bgDomNode = document.createElement("div"), this.bgDomNode.className = "arrow-background", this.bgDomNode.style.position = "absolute", this.bgDomNode.style.width = t.bgWidth + "px", this.bgDomNode.style.height = t.bgHeight + "px", typeof t.top < "u" && (this.bgDomNode.style.top = "0px"), typeof t.left < "u" && (this.bgDomNode.style.left = "0px"), typeof t.bottom < "u" && (this.bgDomNode.style.bottom = "0px"), typeof t.right < "u" && (this.bgDomNode.style.right = "0px"), this.domNode = document.createElement("div"), this.domNode.className = t.className, this.domNode.style.position = "absolute", this.domNode.style.width = Uo + "px", this.domNode.style.height = Uo + "px", typeof t.top < "u" && (this.domNode.style.top = t.top + "px"), typeof t.left < "u" && (this.domNode.style.left = t.left + "px"), typeof t.bottom < "u" && (this.domNode.style.bottom = t.bottom + "px"), typeof t.right < "u" && (this.domNode.style.right = t.right + "px"), this._pointerMoveMonitor = this._register(new Wt()), this._register(os(this.bgDomNode, Y.POINTER_DOWN, (e) => this._arrowPointerDown(e))), this._register(os(this.domNode, Y.POINTER_DOWN, (e) => this._arrowPointerDown(e))), this._pointerdownRepeatTimer = this._register(new Mr()), this._pointerdownScheduleRepeatTimer = this._register(new Ye());
  }
  _arrowPointerDown(t) {
    if (!t.target || !(t.target instanceof Element)) return;
    let e = () => {
      this._pointerdownRepeatTimer.cancelAndSet(() => this._onActivate(), 1e3 / 24, be(t));
    };
    this._onActivate(), this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancelAndSet(e, 200), this._pointerMoveMonitor.startMonitoring(t.target, t.pointerId, t.buttons, (i) => {
    }, () => {
      this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancel();
    }), t.preventDefault();
  }
};
var cs = class s9 {
  constructor(t, e, i, r5, n, o2, l) {
    this._forceIntegerValues = t;
    this._scrollStateBrand = void 0;
    this._forceIntegerValues && (e = e | 0, i = i | 0, r5 = r5 | 0, n = n | 0, o2 = o2 | 0, l = l | 0), this.rawScrollLeft = r5, this.rawScrollTop = l, e < 0 && (e = 0), r5 + e > i && (r5 = i - e), r5 < 0 && (r5 = 0), n < 0 && (n = 0), l + n > o2 && (l = o2 - n), l < 0 && (l = 0), this.width = e, this.scrollWidth = i, this.scrollLeft = r5, this.height = n, this.scrollHeight = o2, this.scrollTop = l;
  }
  equals(t) {
    return this.rawScrollLeft === t.rawScrollLeft && this.rawScrollTop === t.rawScrollTop && this.width === t.width && this.scrollWidth === t.scrollWidth && this.scrollLeft === t.scrollLeft && this.height === t.height && this.scrollHeight === t.scrollHeight && this.scrollTop === t.scrollTop;
  }
  withScrollDimensions(t, e) {
    return new s9(this._forceIntegerValues, typeof t.width < "u" ? t.width : this.width, typeof t.scrollWidth < "u" ? t.scrollWidth : this.scrollWidth, e ? this.rawScrollLeft : this.scrollLeft, typeof t.height < "u" ? t.height : this.height, typeof t.scrollHeight < "u" ? t.scrollHeight : this.scrollHeight, e ? this.rawScrollTop : this.scrollTop);
  }
  withScrollPosition(t) {
    return new s9(this._forceIntegerValues, this.width, this.scrollWidth, typeof t.scrollLeft < "u" ? t.scrollLeft : this.rawScrollLeft, this.height, this.scrollHeight, typeof t.scrollTop < "u" ? t.scrollTop : this.rawScrollTop);
  }
  createScrollEvent(t, e) {
    let i = this.width !== t.width, r5 = this.scrollWidth !== t.scrollWidth, n = this.scrollLeft !== t.scrollLeft, o2 = this.height !== t.height, l = this.scrollHeight !== t.scrollHeight, a = this.scrollTop !== t.scrollTop;
    return { inSmoothScrolling: e, oldWidth: t.width, oldScrollWidth: t.scrollWidth, oldScrollLeft: t.scrollLeft, width: this.width, scrollWidth: this.scrollWidth, scrollLeft: this.scrollLeft, oldHeight: t.height, oldScrollHeight: t.scrollHeight, oldScrollTop: t.scrollTop, height: this.height, scrollHeight: this.scrollHeight, scrollTop: this.scrollTop, widthChanged: i, scrollWidthChanged: r5, scrollLeftChanged: n, heightChanged: o2, scrollHeightChanged: l, scrollTopChanged: a };
  }
};
var Ri = class extends D {
  constructor(e) {
    super();
    this._scrollableBrand = void 0;
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this._smoothScrollDuration = e.smoothScrollDuration, this._scheduleAtNextAnimationFrame = e.scheduleAtNextAnimationFrame, this._state = new cs(e.forceIntegerValues, 0, 0, 0, 0, 0, 0), this._smoothScrolling = null;
  }
  dispose() {
    this._smoothScrolling && (this._smoothScrolling.dispose(), this._smoothScrolling = null), super.dispose();
  }
  setSmoothScrollDuration(e) {
    this._smoothScrollDuration = e;
  }
  validateScrollPosition(e) {
    return this._state.withScrollPosition(e);
  }
  getScrollDimensions() {
    return this._state;
  }
  setScrollDimensions(e, i) {
    let r5 = this._state.withScrollDimensions(e, i);
    this._setState(r5, !!this._smoothScrolling), this._smoothScrolling?.acceptScrollDimensions(this._state);
  }
  getFutureScrollPosition() {
    return this._smoothScrolling ? this._smoothScrolling.to : this._state;
  }
  getCurrentScrollPosition() {
    return this._state;
  }
  setScrollPositionNow(e) {
    let i = this._state.withScrollPosition(e);
    this._smoothScrolling && (this._smoothScrolling.dispose(), this._smoothScrolling = null), this._setState(i, false);
  }
  setScrollPositionSmooth(e, i) {
    if (this._smoothScrollDuration === 0) return this.setScrollPositionNow(e);
    if (this._smoothScrolling) {
      e = { scrollLeft: typeof e.scrollLeft > "u" ? this._smoothScrolling.to.scrollLeft : e.scrollLeft, scrollTop: typeof e.scrollTop > "u" ? this._smoothScrolling.to.scrollTop : e.scrollTop };
      let r5 = this._state.withScrollPosition(e);
      if (this._smoothScrolling.to.scrollLeft === r5.scrollLeft && this._smoothScrolling.to.scrollTop === r5.scrollTop) return;
      let n;
      i ? n = new Nr(this._smoothScrolling.from, r5, this._smoothScrolling.startTime, this._smoothScrolling.duration) : n = this._smoothScrolling.combine(this._state, r5, this._smoothScrollDuration), this._smoothScrolling.dispose(), this._smoothScrolling = n;
    } else {
      let r5 = this._state.withScrollPosition(e);
      this._smoothScrolling = Nr.start(this._state, r5, this._smoothScrollDuration);
    }
    this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
      this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
    });
  }
  hasPendingScrollAnimation() {
    return !!this._smoothScrolling;
  }
  _performSmoothScrolling() {
    if (!this._smoothScrolling) return;
    let e = this._smoothScrolling.tick(), i = this._state.withScrollPosition(e);
    if (this._setState(i, true), !!this._smoothScrolling) {
      if (e.isDone) {
        this._smoothScrolling.dispose(), this._smoothScrolling = null;
        return;
      }
      this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
        this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
      });
    }
  }
  _setState(e, i) {
    let r5 = this._state;
    r5.equals(e) || (this._state = e, this._onScroll.fire(this._state.createScrollEvent(r5, i)));
  }
};
var Br = class {
  constructor(t, e, i) {
    this.scrollLeft = t, this.scrollTop = e, this.isDone = i;
  }
};
function as(s15, t) {
  let e = t - s15;
  return function(i) {
    return s15 + e * ka(i);
  };
}
function La(s15, t, e) {
  return function(i) {
    return i < e ? s15(i / e) : t((i - e) / (1 - e));
  };
}
var Nr = class s10 {
  constructor(t, e, i, r5) {
    this.from = t, this.to = e, this.duration = r5, this.startTime = i, this.animationFrameDisposable = null, this._initAnimations();
  }
  _initAnimations() {
    this.scrollLeft = this._initAnimation(this.from.scrollLeft, this.to.scrollLeft, this.to.width), this.scrollTop = this._initAnimation(this.from.scrollTop, this.to.scrollTop, this.to.height);
  }
  _initAnimation(t, e, i) {
    if (Math.abs(t - e) > 2.5 * i) {
      let n, o2;
      return t < e ? (n = t + 0.75 * i, o2 = e - 0.75 * i) : (n = t - 0.75 * i, o2 = e + 0.75 * i), La(as(t, n), as(o2, e), 0.33);
    }
    return as(t, e);
  }
  dispose() {
    this.animationFrameDisposable !== null && (this.animationFrameDisposable.dispose(), this.animationFrameDisposable = null);
  }
  acceptScrollDimensions(t) {
    this.to = t.withScrollPosition(this.to), this._initAnimations();
  }
  tick() {
    return this._tick(Date.now());
  }
  _tick(t) {
    let e = (t - this.startTime) / this.duration;
    if (e < 1) {
      let i = this.scrollLeft(e), r5 = this.scrollTop(e);
      return new Br(i, r5, false);
    }
    return new Br(this.to.scrollLeft, this.to.scrollTop, true);
  }
  combine(t, e, i) {
    return s10.start(t, e, i);
  }
  static start(t, e, i) {
    i = i + 10;
    let r5 = Date.now() - 10;
    return new s10(t, e, r5, i);
  }
};
function Aa(s15) {
  return Math.pow(s15, 3);
}
function ka(s15) {
  return 1 - Aa(1 - s15);
}
var Fr = class extends D {
  constructor(t, e, i) {
    super(), this._visibility = t, this._visibleClassName = e, this._invisibleClassName = i, this._domNode = null, this._isVisible = false, this._isNeeded = false, this._rawShouldBeVisible = false, this._shouldBeVisible = false, this._revealTimer = this._register(new Ye());
  }
  setVisibility(t) {
    this._visibility !== t && (this._visibility = t, this._updateShouldBeVisible());
  }
  setShouldBeVisible(t) {
    this._rawShouldBeVisible = t, this._updateShouldBeVisible();
  }
  _applyVisibilitySetting() {
    return this._visibility === 2 ? false : this._visibility === 3 ? true : this._rawShouldBeVisible;
  }
  _updateShouldBeVisible() {
    let t = this._applyVisibilitySetting();
    this._shouldBeVisible !== t && (this._shouldBeVisible = t, this.ensureVisibility());
  }
  setIsNeeded(t) {
    this._isNeeded !== t && (this._isNeeded = t, this.ensureVisibility());
  }
  setDomNode(t) {
    this._domNode = t, this._domNode.setClassName(this._invisibleClassName), this.setShouldBeVisible(false);
  }
  ensureVisibility() {
    if (!this._isNeeded) {
      this._hide(false);
      return;
    }
    this._shouldBeVisible ? this._reveal() : this._hide(true);
  }
  _reveal() {
    this._isVisible || (this._isVisible = true, this._revealTimer.setIfNotSet(() => {
      this._domNode?.setClassName(this._visibleClassName);
    }, 0));
  }
  _hide(t) {
    this._revealTimer.cancel(), this._isVisible && (this._isVisible = false, this._domNode?.setClassName(this._invisibleClassName + (t ? " fade" : "")));
  }
};
var Ca = 140;
var Ut = class extends lt {
  constructor(t) {
    super(), this._lazyRender = t.lazyRender, this._host = t.host, this._scrollable = t.scrollable, this._scrollByPage = t.scrollByPage, this._scrollbarState = t.scrollbarState, this._visibilityController = this._register(new Fr(t.visibility, "visible scrollbar " + t.extraScrollbarClassName, "invisible scrollbar " + t.extraScrollbarClassName)), this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._pointerMoveMonitor = this._register(new Wt()), this._shouldRender = true, this.domNode = _t(document.createElement("div")), this.domNode.setAttribute("role", "presentation"), this.domNode.setAttribute("aria-hidden", "true"), this._visibilityController.setDomNode(this.domNode), this.domNode.setPosition("absolute"), this._register(L(this.domNode.domNode, Y.POINTER_DOWN, (e) => this._domNodePointerDown(e)));
  }
  _createArrow(t) {
    let e = this._register(new Or(t));
    this.domNode.domNode.appendChild(e.bgDomNode), this.domNode.domNode.appendChild(e.domNode);
  }
  _createSlider(t, e, i, r5) {
    this.slider = _t(document.createElement("div")), this.slider.setClassName("slider"), this.slider.setPosition("absolute"), this.slider.setTop(t), this.slider.setLeft(e), typeof i == "number" && this.slider.setWidth(i), typeof r5 == "number" && this.slider.setHeight(r5), this.slider.setLayerHinting(true), this.slider.setContain("strict"), this.domNode.domNode.appendChild(this.slider.domNode), this._register(L(this.slider.domNode, Y.POINTER_DOWN, (n) => {
      n.button === 0 && (n.preventDefault(), this._sliderPointerDown(n));
    })), this.onclick(this.slider.domNode, (n) => {
      n.leftButton && n.stopPropagation();
    });
  }
  _onElementSize(t) {
    return this._scrollbarState.setVisibleSize(t) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  _onElementScrollSize(t) {
    return this._scrollbarState.setScrollSize(t) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  _onElementScrollPosition(t) {
    return this._scrollbarState.setScrollPosition(t) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  beginReveal() {
    this._visibilityController.setShouldBeVisible(true);
  }
  beginHide() {
    this._visibilityController.setShouldBeVisible(false);
  }
  render() {
    this._shouldRender && (this._shouldRender = false, this._renderDomNode(this._scrollbarState.getRectangleLargeSize(), this._scrollbarState.getRectangleSmallSize()), this._updateSlider(this._scrollbarState.getSliderSize(), this._scrollbarState.getArrowSize() + this._scrollbarState.getSliderPosition()));
  }
  _domNodePointerDown(t) {
    t.target === this.domNode.domNode && this._onPointerDown(t);
  }
  delegatePointerDown(t) {
    let e = this.domNode.domNode.getClientRects()[0].top, i = e + this._scrollbarState.getSliderPosition(), r5 = e + this._scrollbarState.getSliderPosition() + this._scrollbarState.getSliderSize(), n = this._sliderPointerPosition(t);
    i <= n && n <= r5 ? t.button === 0 && (t.preventDefault(), this._sliderPointerDown(t)) : this._onPointerDown(t);
  }
  _onPointerDown(t) {
    let e, i;
    if (t.target === this.domNode.domNode && typeof t.offsetX == "number" && typeof t.offsetY == "number") e = t.offsetX, i = t.offsetY;
    else {
      let n = Fo(this.domNode.domNode);
      e = t.pageX - n.left, i = t.pageY - n.top;
    }
    let r5 = this._pointerDownRelativePosition(e, i);
    this._setDesiredScrollPositionNow(this._scrollByPage ? this._scrollbarState.getDesiredScrollPositionFromOffsetPaged(r5) : this._scrollbarState.getDesiredScrollPositionFromOffset(r5)), t.button === 0 && (t.preventDefault(), this._sliderPointerDown(t));
  }
  _sliderPointerDown(t) {
    if (!t.target || !(t.target instanceof Element)) return;
    let e = this._sliderPointerPosition(t), i = this._sliderOrthogonalPointerPosition(t), r5 = this._scrollbarState.clone();
    this.slider.toggleClassName("active", true), this._pointerMoveMonitor.startMonitoring(t.target, t.pointerId, t.buttons, (n) => {
      let o2 = this._sliderOrthogonalPointerPosition(n), l = Math.abs(o2 - i);
      if (wr && l > Ca) {
        this._setDesiredScrollPositionNow(r5.getScrollPosition());
        return;
      }
      let u = this._sliderPointerPosition(n) - e;
      this._setDesiredScrollPositionNow(r5.getDesiredScrollPositionFromDelta(u));
    }, () => {
      this.slider.toggleClassName("active", false), this._host.onDragEnd();
    }), this._host.onDragStart();
  }
  _setDesiredScrollPositionNow(t) {
    let e = {};
    this.writeScrollPosition(e, t), this._scrollable.setScrollPositionNow(e);
  }
  updateScrollbarSize(t) {
    this._updateScrollbarSize(t), this._scrollbarState.setScrollbarSize(t), this._shouldRender = true, this._lazyRender || this.render();
  }
  isNeeded() {
    return this._scrollbarState.isNeeded();
  }
};
var Kt = class s11 {
  constructor(t, e, i, r5, n, o2) {
    this._scrollbarSize = Math.round(e), this._oppositeScrollbarSize = Math.round(i), this._arrowSize = Math.round(t), this._visibleSize = r5, this._scrollSize = n, this._scrollPosition = o2, this._computedAvailableSize = 0, this._computedIsNeeded = false, this._computedSliderSize = 0, this._computedSliderRatio = 0, this._computedSliderPosition = 0, this._refreshComputedValues();
  }
  clone() {
    return new s11(this._arrowSize, this._scrollbarSize, this._oppositeScrollbarSize, this._visibleSize, this._scrollSize, this._scrollPosition);
  }
  setVisibleSize(t) {
    let e = Math.round(t);
    return this._visibleSize !== e ? (this._visibleSize = e, this._refreshComputedValues(), true) : false;
  }
  setScrollSize(t) {
    let e = Math.round(t);
    return this._scrollSize !== e ? (this._scrollSize = e, this._refreshComputedValues(), true) : false;
  }
  setScrollPosition(t) {
    let e = Math.round(t);
    return this._scrollPosition !== e ? (this._scrollPosition = e, this._refreshComputedValues(), true) : false;
  }
  setScrollbarSize(t) {
    this._scrollbarSize = Math.round(t);
  }
  setOppositeScrollbarSize(t) {
    this._oppositeScrollbarSize = Math.round(t);
  }
  static _computeValues(t, e, i, r5, n) {
    let o2 = Math.max(0, i - t), l = Math.max(0, o2 - 2 * e), a = r5 > 0 && r5 > i;
    if (!a) return { computedAvailableSize: Math.round(o2), computedIsNeeded: a, computedSliderSize: Math.round(l), computedSliderRatio: 0, computedSliderPosition: 0 };
    let u = Math.round(Math.max(20, Math.floor(i * l / r5))), h2 = (l - u) / (r5 - i), c = n * h2;
    return { computedAvailableSize: Math.round(o2), computedIsNeeded: a, computedSliderSize: Math.round(u), computedSliderRatio: h2, computedSliderPosition: Math.round(c) };
  }
  _refreshComputedValues() {
    let t = s11._computeValues(this._oppositeScrollbarSize, this._arrowSize, this._visibleSize, this._scrollSize, this._scrollPosition);
    this._computedAvailableSize = t.computedAvailableSize, this._computedIsNeeded = t.computedIsNeeded, this._computedSliderSize = t.computedSliderSize, this._computedSliderRatio = t.computedSliderRatio, this._computedSliderPosition = t.computedSliderPosition;
  }
  getArrowSize() {
    return this._arrowSize;
  }
  getScrollPosition() {
    return this._scrollPosition;
  }
  getRectangleLargeSize() {
    return this._computedAvailableSize;
  }
  getRectangleSmallSize() {
    return this._scrollbarSize;
  }
  isNeeded() {
    return this._computedIsNeeded;
  }
  getSliderSize() {
    return this._computedSliderSize;
  }
  getSliderPosition() {
    return this._computedSliderPosition;
  }
  getDesiredScrollPositionFromOffset(t) {
    if (!this._computedIsNeeded) return 0;
    let e = t - this._arrowSize - this._computedSliderSize / 2;
    return Math.round(e / this._computedSliderRatio);
  }
  getDesiredScrollPositionFromOffsetPaged(t) {
    if (!this._computedIsNeeded) return 0;
    let e = t - this._arrowSize, i = this._scrollPosition;
    return e < this._computedSliderPosition ? i -= this._visibleSize : i += this._visibleSize, i;
  }
  getDesiredScrollPositionFromDelta(t) {
    if (!this._computedIsNeeded) return 0;
    let e = this._computedSliderPosition + t;
    return Math.round(e / this._computedSliderRatio);
  }
};
var Wr = class extends Ut {
  constructor(t, e, i) {
    let r5 = t.getScrollDimensions(), n = t.getCurrentScrollPosition();
    if (super({ lazyRender: e.lazyRender, host: i, scrollbarState: new Kt(e.horizontalHasArrows ? e.arrowSize : 0, e.horizontal === 2 ? 0 : e.horizontalScrollbarSize, e.vertical === 2 ? 0 : e.verticalScrollbarSize, r5.width, r5.scrollWidth, n.scrollLeft), visibility: e.horizontal, extraScrollbarClassName: "horizontal", scrollable: t, scrollByPage: e.scrollByPage }), e.horizontalHasArrows) throw new Error("horizontalHasArrows is not supported in xterm.js");
    this._createSlider(Math.floor((e.horizontalScrollbarSize - e.horizontalSliderSize) / 2), 0, void 0, e.horizontalSliderSize);
  }
  _updateSlider(t, e) {
    this.slider.setWidth(t), this.slider.setLeft(e);
  }
  _renderDomNode(t, e) {
    this.domNode.setWidth(t), this.domNode.setHeight(e), this.domNode.setLeft(0), this.domNode.setBottom(0);
  }
  onDidScroll(t) {
    return this._shouldRender = this._onElementScrollSize(t.scrollWidth) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(t.scrollLeft) || this._shouldRender, this._shouldRender = this._onElementSize(t.width) || this._shouldRender, this._shouldRender;
  }
  _pointerDownRelativePosition(t, e) {
    return t;
  }
  _sliderPointerPosition(t) {
    return t.pageX;
  }
  _sliderOrthogonalPointerPosition(t) {
    return t.pageY;
  }
  _updateScrollbarSize(t) {
    this.slider.setHeight(t);
  }
  writeScrollPosition(t, e) {
    t.scrollLeft = e;
  }
  updateOptions(t) {
    this.updateScrollbarSize(t.horizontal === 2 ? 0 : t.horizontalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(t.vertical === 2 ? 0 : t.verticalScrollbarSize), this._visibilityController.setVisibility(t.horizontal), this._scrollByPage = t.scrollByPage;
  }
};
var Ur = class extends Ut {
  constructor(t, e, i) {
    let r5 = t.getScrollDimensions(), n = t.getCurrentScrollPosition();
    if (super({ lazyRender: e.lazyRender, host: i, scrollbarState: new Kt(e.verticalHasArrows ? e.arrowSize : 0, e.vertical === 2 ? 0 : e.verticalScrollbarSize, 0, r5.height, r5.scrollHeight, n.scrollTop), visibility: e.vertical, extraScrollbarClassName: "vertical", scrollable: t, scrollByPage: e.scrollByPage }), e.verticalHasArrows) throw new Error("horizontalHasArrows is not supported in xterm.js");
    this._createSlider(0, Math.floor((e.verticalScrollbarSize - e.verticalSliderSize) / 2), e.verticalSliderSize, void 0);
  }
  _updateSlider(t, e) {
    this.slider.setHeight(t), this.slider.setTop(e);
  }
  _renderDomNode(t, e) {
    this.domNode.setWidth(e), this.domNode.setHeight(t), this.domNode.setRight(0), this.domNode.setTop(0);
  }
  onDidScroll(t) {
    return this._shouldRender = this._onElementScrollSize(t.scrollHeight) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(t.scrollTop) || this._shouldRender, this._shouldRender = this._onElementSize(t.height) || this._shouldRender, this._shouldRender;
  }
  _pointerDownRelativePosition(t, e) {
    return e;
  }
  _sliderPointerPosition(t) {
    return t.pageY;
  }
  _sliderOrthogonalPointerPosition(t) {
    return t.pageX;
  }
  _updateScrollbarSize(t) {
    this.slider.setWidth(t);
  }
  writeScrollPosition(t, e) {
    t.scrollTop = e;
  }
  updateOptions(t) {
    this.updateScrollbarSize(t.vertical === 2 ? 0 : t.verticalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(0), this._visibilityController.setVisibility(t.vertical), this._scrollByPage = t.scrollByPage;
  }
};
var Ma = 500;
var Ko = 50;
var zo = true;
var us = class {
  constructor(t, e, i) {
    this.timestamp = t, this.deltaX = e, this.deltaY = i, this.score = 0;
  }
};
var zr = class zr2 {
  constructor() {
    this._capacity = 5, this._memory = [], this._front = -1, this._rear = -1;
  }
  isPhysicalMouseWheel() {
    if (this._front === -1 && this._rear === -1) return false;
    let t = 1, e = 0, i = 1, r5 = this._rear;
    do {
      let n = r5 === this._front ? t : Math.pow(2, -i);
      if (t -= n, e += this._memory[r5].score * n, r5 === this._front) break;
      r5 = (this._capacity + r5 - 1) % this._capacity, i++;
    } while (true);
    return e <= 0.5;
  }
  acceptStandardWheelEvent(t) {
    if (Ti) {
      let e = be(t.browserEvent), i = mo(e);
      this.accept(Date.now(), t.deltaX * i, t.deltaY * i);
    } else this.accept(Date.now(), t.deltaX, t.deltaY);
  }
  accept(t, e, i) {
    let r5 = null, n = new us(t, e, i);
    this._front === -1 && this._rear === -1 ? (this._memory[0] = n, this._front = 0, this._rear = 0) : (r5 = this._memory[this._rear], this._rear = (this._rear + 1) % this._capacity, this._rear === this._front && (this._front = (this._front + 1) % this._capacity), this._memory[this._rear] = n), n.score = this._computeScore(n, r5);
  }
  _computeScore(t, e) {
    if (Math.abs(t.deltaX) > 0 && Math.abs(t.deltaY) > 0) return 1;
    let i = 0.5;
    if ((!this._isAlmostInt(t.deltaX) || !this._isAlmostInt(t.deltaY)) && (i += 0.25), e) {
      let r5 = Math.abs(t.deltaX), n = Math.abs(t.deltaY), o2 = Math.abs(e.deltaX), l = Math.abs(e.deltaY), a = Math.max(Math.min(r5, o2), 1), u = Math.max(Math.min(n, l), 1), h2 = Math.max(r5, o2), c = Math.max(n, l);
      h2 % a === 0 && c % u === 0 && (i -= 0.5);
    }
    return Math.min(Math.max(i, 0), 1);
  }
  _isAlmostInt(t) {
    return Math.abs(Math.round(t) - t) < 0.01;
  }
};
zr.INSTANCE = new zr();
var hs = zr;
var ds = class extends lt {
  constructor(e, i, r5) {
    super();
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this._onWillScroll = this._register(new v());
    this.onWillScroll = this._onWillScroll.event;
    this._options = Pa(i), this._scrollable = r5, this._register(this._scrollable.onScroll((o2) => {
      this._onWillScroll.fire(o2), this._onDidScroll(o2), this._onScroll.fire(o2);
    }));
    let n = { onMouseWheel: (o2) => this._onMouseWheel(o2), onDragStart: () => this._onDragStart(), onDragEnd: () => this._onDragEnd() };
    this._verticalScrollbar = this._register(new Ur(this._scrollable, this._options, n)), this._horizontalScrollbar = this._register(new Wr(this._scrollable, this._options, n)), this._domNode = document.createElement("div"), this._domNode.className = "xterm-scrollable-element " + this._options.className, this._domNode.setAttribute("role", "presentation"), this._domNode.style.position = "relative", this._domNode.appendChild(e), this._domNode.appendChild(this._horizontalScrollbar.domNode.domNode), this._domNode.appendChild(this._verticalScrollbar.domNode.domNode), this._options.useShadows ? (this._leftShadowDomNode = _t(document.createElement("div")), this._leftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._leftShadowDomNode.domNode), this._topShadowDomNode = _t(document.createElement("div")), this._topShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topShadowDomNode.domNode), this._topLeftShadowDomNode = _t(document.createElement("div")), this._topLeftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topLeftShadowDomNode.domNode)) : (this._leftShadowDomNode = null, this._topShadowDomNode = null, this._topLeftShadowDomNode = null), this._listenOnDomNode = this._options.listenOnDomNode || this._domNode, this._mouseWheelToDispose = [], this._setListeningToMouseWheel(this._options.handleMouseWheel), this.onmouseover(this._listenOnDomNode, (o2) => this._onMouseOver(o2)), this.onmouseleave(this._listenOnDomNode, (o2) => this._onMouseLeave(o2)), this._hideTimeout = this._register(new Ye()), this._isDragging = false, this._mouseIsOver = false, this._shouldRender = true, this._revealOnScroll = true;
  }
  get options() {
    return this._options;
  }
  dispose() {
    this._mouseWheelToDispose = Ne(this._mouseWheelToDispose), super.dispose();
  }
  getDomNode() {
    return this._domNode;
  }
  getOverviewRulerLayoutInfo() {
    return { parent: this._domNode, insertBefore: this._verticalScrollbar.domNode.domNode };
  }
  delegateVerticalScrollbarPointerDown(e) {
    this._verticalScrollbar.delegatePointerDown(e);
  }
  getScrollDimensions() {
    return this._scrollable.getScrollDimensions();
  }
  setScrollDimensions(e) {
    this._scrollable.setScrollDimensions(e, false);
  }
  updateClassName(e) {
    this._options.className = e, Te && (this._options.className += " mac"), this._domNode.className = "xterm-scrollable-element " + this._options.className;
  }
  updateOptions(e) {
    typeof e.handleMouseWheel < "u" && (this._options.handleMouseWheel = e.handleMouseWheel, this._setListeningToMouseWheel(this._options.handleMouseWheel)), typeof e.mouseWheelScrollSensitivity < "u" && (this._options.mouseWheelScrollSensitivity = e.mouseWheelScrollSensitivity), typeof e.fastScrollSensitivity < "u" && (this._options.fastScrollSensitivity = e.fastScrollSensitivity), typeof e.scrollPredominantAxis < "u" && (this._options.scrollPredominantAxis = e.scrollPredominantAxis), typeof e.horizontal < "u" && (this._options.horizontal = e.horizontal), typeof e.vertical < "u" && (this._options.vertical = e.vertical), typeof e.horizontalScrollbarSize < "u" && (this._options.horizontalScrollbarSize = e.horizontalScrollbarSize), typeof e.verticalScrollbarSize < "u" && (this._options.verticalScrollbarSize = e.verticalScrollbarSize), typeof e.scrollByPage < "u" && (this._options.scrollByPage = e.scrollByPage), this._horizontalScrollbar.updateOptions(this._options), this._verticalScrollbar.updateOptions(this._options), this._options.lazyRender || this._render();
  }
  setRevealOnScroll(e) {
    this._revealOnScroll = e;
  }
  delegateScrollFromMouseWheelEvent(e) {
    this._onMouseWheel(new xi(e));
  }
  _setListeningToMouseWheel(e) {
    if (this._mouseWheelToDispose.length > 0 !== e && (this._mouseWheelToDispose = Ne(this._mouseWheelToDispose), e)) {
      let r5 = (n) => {
        this._onMouseWheel(new xi(n));
      };
      this._mouseWheelToDispose.push(L(this._listenOnDomNode, Y.MOUSE_WHEEL, r5, { passive: false }));
    }
  }
  _onMouseWheel(e) {
    if (e.browserEvent?.defaultPrevented) return;
    let i = hs.INSTANCE;
    zo && i.acceptStandardWheelEvent(e);
    let r5 = false;
    if (e.deltaY || e.deltaX) {
      let o2 = e.deltaY * this._options.mouseWheelScrollSensitivity, l = e.deltaX * this._options.mouseWheelScrollSensitivity;
      this._options.scrollPredominantAxis && (this._options.scrollYToX && l + o2 === 0 ? l = o2 = 0 : Math.abs(o2) >= Math.abs(l) ? l = 0 : o2 = 0), this._options.flipAxes && ([o2, l] = [l, o2]);
      let a = !Te && e.browserEvent && e.browserEvent.shiftKey;
      (this._options.scrollYToX || a) && !l && (l = o2, o2 = 0), e.browserEvent && e.browserEvent.altKey && (l = l * this._options.fastScrollSensitivity, o2 = o2 * this._options.fastScrollSensitivity);
      let u = this._scrollable.getFutureScrollPosition(), h2 = {};
      if (o2) {
        let c = Ko * o2, d = u.scrollTop - (c < 0 ? Math.floor(c) : Math.ceil(c));
        this._verticalScrollbar.writeScrollPosition(h2, d);
      }
      if (l) {
        let c = Ko * l, d = u.scrollLeft - (c < 0 ? Math.floor(c) : Math.ceil(c));
        this._horizontalScrollbar.writeScrollPosition(h2, d);
      }
      h2 = this._scrollable.validateScrollPosition(h2), (u.scrollLeft !== h2.scrollLeft || u.scrollTop !== h2.scrollTop) && (zo && this._options.mouseWheelSmoothScroll && i.isPhysicalMouseWheel() ? this._scrollable.setScrollPositionSmooth(h2) : this._scrollable.setScrollPositionNow(h2), r5 = true);
    }
    let n = r5;
    !n && this._options.alwaysConsumeMouseWheel && (n = true), !n && this._options.consumeMouseWheelIfScrollbarIsNeeded && (this._verticalScrollbar.isNeeded() || this._horizontalScrollbar.isNeeded()) && (n = true), n && (e.preventDefault(), e.stopPropagation());
  }
  _onDidScroll(e) {
    this._shouldRender = this._horizontalScrollbar.onDidScroll(e) || this._shouldRender, this._shouldRender = this._verticalScrollbar.onDidScroll(e) || this._shouldRender, this._options.useShadows && (this._shouldRender = true), this._revealOnScroll && this._reveal(), this._options.lazyRender || this._render();
  }
  renderNow() {
    if (!this._options.lazyRender) throw new Error("Please use `lazyRender` together with `renderNow`!");
    this._render();
  }
  _render() {
    if (this._shouldRender && (this._shouldRender = false, this._horizontalScrollbar.render(), this._verticalScrollbar.render(), this._options.useShadows)) {
      let e = this._scrollable.getCurrentScrollPosition(), i = e.scrollTop > 0, r5 = e.scrollLeft > 0, n = r5 ? " left" : "", o2 = i ? " top" : "", l = r5 || i ? " top-left-corner" : "";
      this._leftShadowDomNode.setClassName(`shadow${n}`), this._topShadowDomNode.setClassName(`shadow${o2}`), this._topLeftShadowDomNode.setClassName(`shadow${l}${o2}${n}`);
    }
  }
  _onDragStart() {
    this._isDragging = true, this._reveal();
  }
  _onDragEnd() {
    this._isDragging = false, this._hide();
  }
  _onMouseLeave(e) {
    this._mouseIsOver = false, this._hide();
  }
  _onMouseOver(e) {
    this._mouseIsOver = true, this._reveal();
  }
  _reveal() {
    this._verticalScrollbar.beginReveal(), this._horizontalScrollbar.beginReveal(), this._scheduleHide();
  }
  _hide() {
    !this._mouseIsOver && !this._isDragging && (this._verticalScrollbar.beginHide(), this._horizontalScrollbar.beginHide());
  }
  _scheduleHide() {
    !this._mouseIsOver && !this._isDragging && this._hideTimeout.cancelAndSet(() => this._hide(), Ma);
  }
};
var Kr = class extends ds {
  constructor(t, e, i) {
    super(t, e, i);
  }
  setScrollPosition(t) {
    t.reuseAnimation ? this._scrollable.setScrollPositionSmooth(t, t.reuseAnimation) : this._scrollable.setScrollPositionNow(t);
  }
  getScrollPosition() {
    return this._scrollable.getCurrentScrollPosition();
  }
};
function Pa(s15) {
  let t = { lazyRender: typeof s15.lazyRender < "u" ? s15.lazyRender : false, className: typeof s15.className < "u" ? s15.className : "", useShadows: typeof s15.useShadows < "u" ? s15.useShadows : true, handleMouseWheel: typeof s15.handleMouseWheel < "u" ? s15.handleMouseWheel : true, flipAxes: typeof s15.flipAxes < "u" ? s15.flipAxes : false, consumeMouseWheelIfScrollbarIsNeeded: typeof s15.consumeMouseWheelIfScrollbarIsNeeded < "u" ? s15.consumeMouseWheelIfScrollbarIsNeeded : false, alwaysConsumeMouseWheel: typeof s15.alwaysConsumeMouseWheel < "u" ? s15.alwaysConsumeMouseWheel : false, scrollYToX: typeof s15.scrollYToX < "u" ? s15.scrollYToX : false, mouseWheelScrollSensitivity: typeof s15.mouseWheelScrollSensitivity < "u" ? s15.mouseWheelScrollSensitivity : 1, fastScrollSensitivity: typeof s15.fastScrollSensitivity < "u" ? s15.fastScrollSensitivity : 5, scrollPredominantAxis: typeof s15.scrollPredominantAxis < "u" ? s15.scrollPredominantAxis : true, mouseWheelSmoothScroll: typeof s15.mouseWheelSmoothScroll < "u" ? s15.mouseWheelSmoothScroll : true, arrowSize: typeof s15.arrowSize < "u" ? s15.arrowSize : 11, listenOnDomNode: typeof s15.listenOnDomNode < "u" ? s15.listenOnDomNode : null, horizontal: typeof s15.horizontal < "u" ? s15.horizontal : 1, horizontalScrollbarSize: typeof s15.horizontalScrollbarSize < "u" ? s15.horizontalScrollbarSize : 10, horizontalSliderSize: typeof s15.horizontalSliderSize < "u" ? s15.horizontalSliderSize : 0, horizontalHasArrows: typeof s15.horizontalHasArrows < "u" ? s15.horizontalHasArrows : false, vertical: typeof s15.vertical < "u" ? s15.vertical : 1, verticalScrollbarSize: typeof s15.verticalScrollbarSize < "u" ? s15.verticalScrollbarSize : 10, verticalHasArrows: typeof s15.verticalHasArrows < "u" ? s15.verticalHasArrows : false, verticalSliderSize: typeof s15.verticalSliderSize < "u" ? s15.verticalSliderSize : 0, scrollByPage: typeof s15.scrollByPage < "u" ? s15.scrollByPage : false };
  return t.horizontalSliderSize = typeof s15.horizontalSliderSize < "u" ? s15.horizontalSliderSize : t.horizontalScrollbarSize, t.verticalSliderSize = typeof s15.verticalSliderSize < "u" ? s15.verticalSliderSize : t.verticalScrollbarSize, Te && (t.className += " mac"), t;
}
var zt = class extends D {
  constructor(e, i, r5, n, o2, l, a, u) {
    super();
    this._bufferService = r5;
    this._optionsService = a;
    this._renderService = u;
    this._onRequestScrollLines = this._register(new v());
    this.onRequestScrollLines = this._onRequestScrollLines.event;
    this._isSyncing = false;
    this._isHandlingScroll = false;
    this._suppressOnScrollHandler = false;
    let h2 = this._register(new Ri({ forceIntegerValues: false, smoothScrollDuration: this._optionsService.rawOptions.smoothScrollDuration, scheduleAtNextAnimationFrame: (c) => mt(n.window, c) }));
    this._register(this._optionsService.onSpecificOptionChange("smoothScrollDuration", () => {
      h2.setSmoothScrollDuration(this._optionsService.rawOptions.smoothScrollDuration);
    })), this._scrollableElement = this._register(new Kr(i, { vertical: 1, horizontal: 2, useShadows: false, mouseWheelSmoothScroll: true, ...this._getChangeOptions() }, h2)), this._register(this._optionsService.onMultipleOptionChange(["scrollSensitivity", "fastScrollSensitivity", "overviewRuler"], () => this._scrollableElement.updateOptions(this._getChangeOptions()))), this._register(o2.onProtocolChange((c) => {
      this._scrollableElement.updateOptions({ handleMouseWheel: !(c & 16) });
    })), this._scrollableElement.setScrollDimensions({ height: 0, scrollHeight: 0 }), this._register($.runAndSubscribe(l.onChangeColors, () => {
      this._scrollableElement.getDomNode().style.backgroundColor = l.colors.background.css;
    })), e.appendChild(this._scrollableElement.getDomNode()), this._register(C(() => this._scrollableElement.getDomNode().remove())), this._styleElement = n.mainDocument.createElement("style"), i.appendChild(this._styleElement), this._register(C(() => this._styleElement.remove())), this._register($.runAndSubscribe(l.onChangeColors, () => {
      this._styleElement.textContent = [".xterm .xterm-scrollable-element > .scrollbar > .slider {", `  background: ${l.colors.scrollbarSliderBackground.css};`, "}", ".xterm .xterm-scrollable-element > .scrollbar > .slider:hover {", `  background: ${l.colors.scrollbarSliderHoverBackground.css};`, "}", ".xterm .xterm-scrollable-element > .scrollbar > .slider.active {", `  background: ${l.colors.scrollbarSliderActiveBackground.css};`, "}"].join(`
`);
    })), this._register(this._bufferService.onResize(() => this.queueSync())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._latestYDisp = void 0, this.queueSync();
    })), this._register(this._bufferService.onScroll(() => this._sync())), this._register(this._scrollableElement.onScroll((c) => this._handleScroll(c)));
  }
  scrollLines(e) {
    let i = this._scrollableElement.getScrollPosition();
    this._scrollableElement.setScrollPosition({ reuseAnimation: true, scrollTop: i.scrollTop + e * this._renderService.dimensions.css.cell.height });
  }
  scrollToLine(e, i) {
    i && (this._latestYDisp = e), this._scrollableElement.setScrollPosition({ reuseAnimation: !i, scrollTop: e * this._renderService.dimensions.css.cell.height });
  }
  _getChangeOptions() {
    return { mouseWheelScrollSensitivity: this._optionsService.rawOptions.scrollSensitivity, fastScrollSensitivity: this._optionsService.rawOptions.fastScrollSensitivity, verticalScrollbarSize: this._optionsService.rawOptions.overviewRuler?.width || 14 };
  }
  queueSync(e) {
    e !== void 0 && (this._latestYDisp = e), this._queuedAnimationFrame === void 0 && (this._queuedAnimationFrame = this._renderService.addRefreshCallback(() => {
      this._queuedAnimationFrame = void 0, this._sync(this._latestYDisp);
    }));
  }
  _sync(e = this._bufferService.buffer.ydisp) {
    !this._renderService || this._isSyncing || (this._isSyncing = true, this._suppressOnScrollHandler = true, this._scrollableElement.setScrollDimensions({ height: this._renderService.dimensions.css.canvas.height, scrollHeight: this._renderService.dimensions.css.cell.height * this._bufferService.buffer.lines.length }), this._suppressOnScrollHandler = false, e !== this._latestYDisp && this._scrollableElement.setScrollPosition({ scrollTop: e * this._renderService.dimensions.css.cell.height }), this._isSyncing = false);
  }
  _handleScroll(e) {
    if (!this._renderService || this._isHandlingScroll || this._suppressOnScrollHandler) return;
    this._isHandlingScroll = true;
    let i = Math.round(e.scrollTop / this._renderService.dimensions.css.cell.height), r5 = i - this._bufferService.buffer.ydisp;
    r5 !== 0 && (this._latestYDisp = i, this._onRequestScrollLines.fire(r5)), this._isHandlingScroll = false;
  }
};
zt = M([S(2, F), S(3, ae), S(4, rr), S(5, Re), S(6, H), S(7, ce)], zt);
var Gt = class extends D {
  constructor(e, i, r5, n, o2) {
    super();
    this._screenElement = e;
    this._bufferService = i;
    this._coreBrowserService = r5;
    this._decorationService = n;
    this._renderService = o2;
    this._decorationElements = /* @__PURE__ */ new Map();
    this._altBufferIsActive = false;
    this._dimensionsChanged = false;
    this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this._register(this._renderService.onRenderedViewportChange(() => this._doRefreshDecorations())), this._register(this._renderService.onDimensionsChange(() => {
      this._dimensionsChanged = true, this._queueRefresh();
    })), this._register(this._coreBrowserService.onDprChange(() => this._queueRefresh())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
    })), this._register(this._decorationService.onDecorationRegistered(() => this._queueRefresh())), this._register(this._decorationService.onDecorationRemoved((l) => this._removeDecoration(l))), this._register(C(() => {
      this._container.remove(), this._decorationElements.clear();
    }));
  }
  _queueRefresh() {
    this._animationFrame === void 0 && (this._animationFrame = this._renderService.addRefreshCallback(() => {
      this._doRefreshDecorations(), this._animationFrame = void 0;
    }));
  }
  _doRefreshDecorations() {
    for (let e of this._decorationService.decorations) this._renderDecoration(e);
    this._dimensionsChanged = false;
  }
  _renderDecoration(e) {
    this._refreshStyle(e), this._dimensionsChanged && this._refreshXPosition(e);
  }
  _createElement(e) {
    let i = this._coreBrowserService.mainDocument.createElement("div");
    i.classList.add("xterm-decoration"), i.classList.toggle("xterm-decoration-top-layer", e?.options?.layer === "top"), i.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, i.style.height = `${(e.options.height || 1) * this._renderService.dimensions.css.cell.height}px`, i.style.top = `${(e.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height}px`, i.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
    let r5 = e.options.x ?? 0;
    return r5 && r5 > this._bufferService.cols && (i.style.display = "none"), this._refreshXPosition(e, i), i;
  }
  _refreshStyle(e) {
    let i = e.marker.line - this._bufferService.buffers.active.ydisp;
    if (i < 0 || i >= this._bufferService.rows) e.element && (e.element.style.display = "none", e.onRenderEmitter.fire(e.element));
    else {
      let r5 = this._decorationElements.get(e);
      r5 || (r5 = this._createElement(e), e.element = r5, this._decorationElements.set(e, r5), this._container.appendChild(r5), e.onDispose(() => {
        this._decorationElements.delete(e), r5.remove();
      })), r5.style.display = this._altBufferIsActive ? "none" : "block", this._altBufferIsActive || (r5.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, r5.style.height = `${(e.options.height || 1) * this._renderService.dimensions.css.cell.height}px`, r5.style.top = `${i * this._renderService.dimensions.css.cell.height}px`, r5.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`), e.onRenderEmitter.fire(r5);
    }
  }
  _refreshXPosition(e, i = e.element) {
    if (!i) return;
    let r5 = e.options.x ?? 0;
    (e.options.anchor || "left") === "right" ? i.style.right = r5 ? `${r5 * this._renderService.dimensions.css.cell.width}px` : "" : i.style.left = r5 ? `${r5 * this._renderService.dimensions.css.cell.width}px` : "";
  }
  _removeDecoration(e) {
    this._decorationElements.get(e)?.remove(), this._decorationElements.delete(e), e.dispose();
  }
};
Gt = M([S(1, F), S(2, ae), S(3, Be), S(4, ce)], Gt);
var Gr = class {
  constructor() {
    this._zones = [];
    this._zonePool = [];
    this._zonePoolIndex = 0;
    this._linePadding = { full: 0, left: 0, center: 0, right: 0 };
  }
  get zones() {
    return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
  }
  clear() {
    this._zones.length = 0, this._zonePoolIndex = 0;
  }
  addDecoration(t) {
    if (t.options.overviewRulerOptions) {
      for (let e of this._zones) if (e.color === t.options.overviewRulerOptions.color && e.position === t.options.overviewRulerOptions.position) {
        if (this._lineIntersectsZone(e, t.marker.line)) return;
        if (this._lineAdjacentToZone(e, t.marker.line, t.options.overviewRulerOptions.position)) {
          this._addLineToZone(e, t.marker.line);
          return;
        }
      }
      if (this._zonePoolIndex < this._zonePool.length) {
        this._zonePool[this._zonePoolIndex].color = t.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = t.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = t.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = t.marker.line, this._zones.push(this._zonePool[this._zonePoolIndex++]);
        return;
      }
      this._zones.push({ color: t.options.overviewRulerOptions.color, position: t.options.overviewRulerOptions.position, startBufferLine: t.marker.line, endBufferLine: t.marker.line }), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
    }
  }
  setPadding(t) {
    this._linePadding = t;
  }
  _lineIntersectsZone(t, e) {
    return e >= t.startBufferLine && e <= t.endBufferLine;
  }
  _lineAdjacentToZone(t, e, i) {
    return e >= t.startBufferLine - this._linePadding[i || "full"] && e <= t.endBufferLine + this._linePadding[i || "full"];
  }
  _addLineToZone(t, e) {
    t.startBufferLine = Math.min(t.startBufferLine, e), t.endBufferLine = Math.max(t.endBufferLine, e);
  }
};
var We = { full: 0, left: 0, center: 0, right: 0 };
var at = { full: 0, left: 0, center: 0, right: 0 };
var Li = { full: 0, left: 0, center: 0, right: 0 };
var bt = class extends D {
  constructor(e, i, r5, n, o2, l, a, u) {
    super();
    this._viewportElement = e;
    this._screenElement = i;
    this._bufferService = r5;
    this._decorationService = n;
    this._renderService = o2;
    this._optionsService = l;
    this._themeService = a;
    this._coreBrowserService = u;
    this._colorZoneStore = new Gr();
    this._shouldUpdateDimensions = true;
    this._shouldUpdateAnchor = true;
    this._lastKnownBufferLength = 0;
    this._canvas = this._coreBrowserService.mainDocument.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), this._viewportElement.parentElement?.insertBefore(this._canvas, this._viewportElement), this._register(C(() => this._canvas?.remove()));
    let h2 = this._canvas.getContext("2d");
    if (h2) this._ctx = h2;
    else throw new Error("Ctx cannot be null");
    this._register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(void 0, true))), this._register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(void 0, true))), this._register(this._renderService.onRenderedViewportChange(() => this._queueRefresh())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
    })), this._register(this._bufferService.onScroll(() => {
      this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
    })), this._register(this._renderService.onRender(() => {
      (!this._containerHeight || this._containerHeight !== this._screenElement.clientHeight) && (this._queueRefresh(true), this._containerHeight = this._screenElement.clientHeight);
    })), this._register(this._coreBrowserService.onDprChange(() => this._queueRefresh(true))), this._register(this._optionsService.onSpecificOptionChange("overviewRuler", () => this._queueRefresh(true))), this._register(this._themeService.onChangeColors(() => this._queueRefresh())), this._queueRefresh(true);
  }
  get _width() {
    return this._optionsService.options.overviewRuler?.width || 0;
  }
  _refreshDrawConstants() {
    let e = Math.floor((this._canvas.width - 1) / 3), i = Math.ceil((this._canvas.width - 1) / 3);
    at.full = this._canvas.width, at.left = e, at.center = i, at.right = e, this._refreshDrawHeightConstants(), Li.full = 1, Li.left = 1, Li.center = 1 + at.left, Li.right = 1 + at.left + at.center;
  }
  _refreshDrawHeightConstants() {
    We.full = Math.round(2 * this._coreBrowserService.dpr);
    let e = this._canvas.height / this._bufferService.buffer.lines.length, i = Math.round(Math.max(Math.min(e, 12), 6) * this._coreBrowserService.dpr);
    We.left = i, We.center = i, We.right = i;
  }
  _refreshColorZonePadding() {
    this._colorZoneStore.setPadding({ full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.full), left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.left), center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.center), right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.right) }), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
  }
  _refreshCanvasDimensions() {
    this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
  }
  _refreshDecorations() {
    this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
    for (let i of this._decorationService.decorations) this._colorZoneStore.addDecoration(i);
    this._ctx.lineWidth = 1, this._renderRulerOutline();
    let e = this._colorZoneStore.zones;
    for (let i of e) i.position !== "full" && this._renderColorZone(i);
    for (let i of e) i.position === "full" && this._renderColorZone(i);
    this._shouldUpdateDimensions = false, this._shouldUpdateAnchor = false;
  }
  _renderRulerOutline() {
    this._ctx.fillStyle = this._themeService.colors.overviewRulerBorder.css, this._ctx.fillRect(0, 0, 1, this._canvas.height), this._optionsService.rawOptions.overviewRuler.showTopBorder && this._ctx.fillRect(1, 0, this._canvas.width - 1, 1), this._optionsService.rawOptions.overviewRuler.showBottomBorder && this._ctx.fillRect(1, this._canvas.height - 1, this._canvas.width - 1, this._canvas.height);
  }
  _renderColorZone(e) {
    this._ctx.fillStyle = e.color, this._ctx.fillRect(Li[e.position || "full"], Math.round((this._canvas.height - 1) * (e.startBufferLine / this._bufferService.buffers.active.lines.length) - We[e.position || "full"] / 2), at[e.position || "full"], Math.round((this._canvas.height - 1) * ((e.endBufferLine - e.startBufferLine) / this._bufferService.buffers.active.lines.length) + We[e.position || "full"]));
  }
  _queueRefresh(e, i) {
    this._shouldUpdateDimensions = e || this._shouldUpdateDimensions, this._shouldUpdateAnchor = i || this._shouldUpdateAnchor, this._animationFrame === void 0 && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
      this._refreshDecorations(), this._animationFrame = void 0;
    }));
  }
};
bt = M([S(2, F), S(3, Be), S(4, ce), S(5, H), S(6, Re), S(7, ae)], bt);
var b;
((E) => (E.NUL = "\0", E.SOH = "", E.STX = "", E.ETX = "", E.EOT = "", E.ENQ = "", E.ACK = "", E.BEL = "\x07", E.BS = "\b", E.HT = "	", E.LF = `
`, E.VT = "\v", E.FF = "\f", E.CR = "\r", E.SO = "", E.SI = "", E.DLE = "", E.DC1 = "", E.DC2 = "", E.DC3 = "", E.DC4 = "", E.NAK = "", E.SYN = "", E.ETB = "", E.CAN = "", E.EM = "", E.SUB = "", E.ESC = "\x1B", E.FS = "", E.GS = "", E.RS = "", E.US = "", E.SP = " ", E.DEL = "\x7F"))(b ||= {});
var Ai;
((g) => (g.PAD = "\x80", g.HOP = "\x81", g.BPH = "\x82", g.NBH = "\x83", g.IND = "\x84", g.NEL = "\x85", g.SSA = "\x86", g.ESA = "\x87", g.HTS = "\x88", g.HTJ = "\x89", g.VTS = "\x8A", g.PLD = "\x8B", g.PLU = "\x8C", g.RI = "\x8D", g.SS2 = "\x8E", g.SS3 = "\x8F", g.DCS = "\x90", g.PU1 = "\x91", g.PU2 = "\x92", g.STS = "\x93", g.CCH = "\x94", g.MW = "\x95", g.SPA = "\x96", g.EPA = "\x97", g.SOS = "\x98", g.SGCI = "\x99", g.SCI = "\x9A", g.CSI = "\x9B", g.ST = "\x9C", g.OSC = "\x9D", g.PM = "\x9E", g.APC = "\x9F"))(Ai ||= {});
var fs;
((t) => t.ST = `${b.ESC}\\`)(fs ||= {});
var $t = class {
  constructor(t, e, i, r5, n, o2) {
    this._textarea = t;
    this._compositionView = e;
    this._bufferService = i;
    this._optionsService = r5;
    this._coreService = n;
    this._renderService = o2;
    this._isComposing = false, this._isSendingComposition = false, this._compositionPosition = { start: 0, end: 0 }, this._dataAlreadySent = "";
  }
  get isComposing() {
    return this._isComposing;
  }
  compositionstart() {
    this._isComposing = true, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
  }
  compositionupdate(t) {
    this._compositionView.textContent = t.data, this.updateCompositionElements(), setTimeout(() => {
      this._compositionPosition.end = this._textarea.value.length;
    }, 0);
  }
  compositionend() {
    this._finalizeComposition(true);
  }
  keydown(t) {
    if (this._isComposing || this._isSendingComposition) {
      if (t.keyCode === 20 || t.keyCode === 229 || t.keyCode === 16 || t.keyCode === 17 || t.keyCode === 18) return false;
      this._finalizeComposition(false);
    }
    return t.keyCode === 229 ? (this._handleAnyTextareaChanges(), false) : true;
  }
  _finalizeComposition(t) {
    if (this._compositionView.classList.remove("active"), this._isComposing = false, t) {
      let e = { start: this._compositionPosition.start, end: this._compositionPosition.end };
      this._isSendingComposition = true, setTimeout(() => {
        if (this._isSendingComposition) {
          this._isSendingComposition = false;
          let i;
          e.start += this._dataAlreadySent.length, this._isComposing ? i = this._textarea.value.substring(e.start, this._compositionPosition.start) : i = this._textarea.value.substring(e.start), i.length > 0 && this._coreService.triggerDataEvent(i, true);
        }
      }, 0);
    } else {
      this._isSendingComposition = false;
      let e = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
      this._coreService.triggerDataEvent(e, true);
    }
  }
  _handleAnyTextareaChanges() {
    let t = this._textarea.value;
    setTimeout(() => {
      if (!this._isComposing) {
        let e = this._textarea.value, i = e.replace(t, "");
        this._dataAlreadySent = i, e.length > t.length ? this._coreService.triggerDataEvent(i, true) : e.length < t.length ? this._coreService.triggerDataEvent(`${b.DEL}`, true) : e.length === t.length && e !== t && this._coreService.triggerDataEvent(e, true);
      }
    }, 0);
  }
  updateCompositionElements(t) {
    if (this._isComposing) {
      if (this._bufferService.buffer.isCursorInViewport) {
        let e = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), i = this._renderService.dimensions.css.cell.height, r5 = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, n = e * this._renderService.dimensions.css.cell.width;
        this._compositionView.style.left = n + "px", this._compositionView.style.top = r5 + "px", this._compositionView.style.height = i + "px", this._compositionView.style.lineHeight = i + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
        let o2 = this._compositionView.getBoundingClientRect();
        this._textarea.style.left = n + "px", this._textarea.style.top = r5 + "px", this._textarea.style.width = Math.max(o2.width, 1) + "px", this._textarea.style.height = Math.max(o2.height, 1) + "px", this._textarea.style.lineHeight = o2.height + "px";
      }
      t || setTimeout(() => this.updateCompositionElements(true), 0);
    }
  }
};
$t = M([S(2, F), S(3, H), S(4, ge), S(5, ce)], $t);
var ue = 0;
var he = 0;
var de = 0;
var J = 0;
var ps = { css: "#00000000", rgba: 0 };
var j;
((i) => {
  function s15(r5, n, o2, l) {
    return l !== void 0 ? `#${vt(r5)}${vt(n)}${vt(o2)}${vt(l)}` : `#${vt(r5)}${vt(n)}${vt(o2)}`;
  }
  i.toCss = s15;
  function t(r5, n, o2, l = 255) {
    return (r5 << 24 | n << 16 | o2 << 8 | l) >>> 0;
  }
  i.toRgba = t;
  function e(r5, n, o2, l) {
    return { css: i.toCss(r5, n, o2, l), rgba: i.toRgba(r5, n, o2, l) };
  }
  i.toColor = e;
})(j ||= {});
var U;
((l) => {
  function s15(a, u) {
    if (J = (u.rgba & 255) / 255, J === 1) return { css: u.css, rgba: u.rgba };
    let h2 = u.rgba >> 24 & 255, c = u.rgba >> 16 & 255, d = u.rgba >> 8 & 255, _3 = a.rgba >> 24 & 255, p = a.rgba >> 16 & 255, m = a.rgba >> 8 & 255;
    ue = _3 + Math.round((h2 - _3) * J), he = p + Math.round((c - p) * J), de = m + Math.round((d - m) * J);
    let f = j.toCss(ue, he, de), A2 = j.toRgba(ue, he, de);
    return { css: f, rgba: A2 };
  }
  l.blend = s15;
  function t(a) {
    return (a.rgba & 255) === 255;
  }
  l.isOpaque = t;
  function e(a, u, h2) {
    let c = $r.ensureContrastRatio(a.rgba, u.rgba, h2);
    if (c) return j.toColor(c >> 24 & 255, c >> 16 & 255, c >> 8 & 255);
  }
  l.ensureContrastRatio = e;
  function i(a) {
    let u = (a.rgba | 255) >>> 0;
    return [ue, he, de] = $r.toChannels(u), { css: j.toCss(ue, he, de), rgba: u };
  }
  l.opaque = i;
  function r5(a, u) {
    return J = Math.round(u * 255), [ue, he, de] = $r.toChannels(a.rgba), { css: j.toCss(ue, he, de, J), rgba: j.toRgba(ue, he, de, J) };
  }
  l.opacity = r5;
  function n(a, u) {
    return J = a.rgba & 255, r5(a, J * u / 255);
  }
  l.multiplyOpacity = n;
  function o2(a) {
    return [a.rgba >> 24 & 255, a.rgba >> 16 & 255, a.rgba >> 8 & 255];
  }
  l.toColorRGB = o2;
})(U ||= {});
var z;
((i) => {
  let s15, t;
  try {
    let r5 = document.createElement("canvas");
    r5.width = 1, r5.height = 1;
    let n = r5.getContext("2d", { willReadFrequently: true });
    n && (s15 = n, s15.globalCompositeOperation = "copy", t = s15.createLinearGradient(0, 0, 1, 1));
  } catch {
  }
  function e(r5) {
    if (r5.match(/#[\da-f]{3,8}/i)) switch (r5.length) {
      case 4:
        return ue = parseInt(r5.slice(1, 2).repeat(2), 16), he = parseInt(r5.slice(2, 3).repeat(2), 16), de = parseInt(r5.slice(3, 4).repeat(2), 16), j.toColor(ue, he, de);
      case 5:
        return ue = parseInt(r5.slice(1, 2).repeat(2), 16), he = parseInt(r5.slice(2, 3).repeat(2), 16), de = parseInt(r5.slice(3, 4).repeat(2), 16), J = parseInt(r5.slice(4, 5).repeat(2), 16), j.toColor(ue, he, de, J);
      case 7:
        return { css: r5, rgba: (parseInt(r5.slice(1), 16) << 8 | 255) >>> 0 };
      case 9:
        return { css: r5, rgba: parseInt(r5.slice(1), 16) >>> 0 };
    }
    let n = r5.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
    if (n) return ue = parseInt(n[1]), he = parseInt(n[2]), de = parseInt(n[3]), J = Math.round((n[5] === void 0 ? 1 : parseFloat(n[5])) * 255), j.toColor(ue, he, de, J);
    if (!s15 || !t) throw new Error("css.toColor: Unsupported css format");
    if (s15.fillStyle = t, s15.fillStyle = r5, typeof s15.fillStyle != "string") throw new Error("css.toColor: Unsupported css format");
    if (s15.fillRect(0, 0, 1, 1), [ue, he, de, J] = s15.getImageData(0, 0, 1, 1).data, J !== 255) throw new Error("css.toColor: Unsupported css format");
    return { rgba: j.toRgba(ue, he, de, J), css: r5 };
  }
  i.toColor = e;
})(z ||= {});
var ve;
((e) => {
  function s15(i) {
    return t(i >> 16 & 255, i >> 8 & 255, i & 255);
  }
  e.relativeLuminance = s15;
  function t(i, r5, n) {
    let o2 = i / 255, l = r5 / 255, a = n / 255, u = o2 <= 0.03928 ? o2 / 12.92 : Math.pow((o2 + 0.055) / 1.055, 2.4), h2 = l <= 0.03928 ? l / 12.92 : Math.pow((l + 0.055) / 1.055, 2.4), c = a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
    return u * 0.2126 + h2 * 0.7152 + c * 0.0722;
  }
  e.relativeLuminance2 = t;
})(ve ||= {});
var $r;
((n) => {
  function s15(o2, l) {
    if (J = (l & 255) / 255, J === 1) return l;
    let a = l >> 24 & 255, u = l >> 16 & 255, h2 = l >> 8 & 255, c = o2 >> 24 & 255, d = o2 >> 16 & 255, _3 = o2 >> 8 & 255;
    return ue = c + Math.round((a - c) * J), he = d + Math.round((u - d) * J), de = _3 + Math.round((h2 - _3) * J), j.toRgba(ue, he, de);
  }
  n.blend = s15;
  function t(o2, l, a) {
    let u = ve.relativeLuminance(o2 >> 8), h2 = ve.relativeLuminance(l >> 8);
    if (Xe(u, h2) < a) {
      if (h2 < u) {
        let p = e(o2, l, a), m = Xe(u, ve.relativeLuminance(p >> 8));
        if (m < a) {
          let f = i(o2, l, a), A2 = Xe(u, ve.relativeLuminance(f >> 8));
          return m > A2 ? p : f;
        }
        return p;
      }
      let d = i(o2, l, a), _3 = Xe(u, ve.relativeLuminance(d >> 8));
      if (_3 < a) {
        let p = e(o2, l, a), m = Xe(u, ve.relativeLuminance(p >> 8));
        return _3 > m ? d : p;
      }
      return d;
    }
  }
  n.ensureContrastRatio = t;
  function e(o2, l, a) {
    let u = o2 >> 24 & 255, h2 = o2 >> 16 & 255, c = o2 >> 8 & 255, d = l >> 24 & 255, _3 = l >> 16 & 255, p = l >> 8 & 255, m = Xe(ve.relativeLuminance2(d, _3, p), ve.relativeLuminance2(u, h2, c));
    for (; m < a && (d > 0 || _3 > 0 || p > 0); ) d -= Math.max(0, Math.ceil(d * 0.1)), _3 -= Math.max(0, Math.ceil(_3 * 0.1)), p -= Math.max(0, Math.ceil(p * 0.1)), m = Xe(ve.relativeLuminance2(d, _3, p), ve.relativeLuminance2(u, h2, c));
    return (d << 24 | _3 << 16 | p << 8 | 255) >>> 0;
  }
  n.reduceLuminance = e;
  function i(o2, l, a) {
    let u = o2 >> 24 & 255, h2 = o2 >> 16 & 255, c = o2 >> 8 & 255, d = l >> 24 & 255, _3 = l >> 16 & 255, p = l >> 8 & 255, m = Xe(ve.relativeLuminance2(d, _3, p), ve.relativeLuminance2(u, h2, c));
    for (; m < a && (d < 255 || _3 < 255 || p < 255); ) d = Math.min(255, d + Math.ceil((255 - d) * 0.1)), _3 = Math.min(255, _3 + Math.ceil((255 - _3) * 0.1)), p = Math.min(255, p + Math.ceil((255 - p) * 0.1)), m = Xe(ve.relativeLuminance2(d, _3, p), ve.relativeLuminance2(u, h2, c));
    return (d << 24 | _3 << 16 | p << 8 | 255) >>> 0;
  }
  n.increaseLuminance = i;
  function r5(o2) {
    return [o2 >> 24 & 255, o2 >> 16 & 255, o2 >> 8 & 255, o2 & 255];
  }
  n.toChannels = r5;
})($r ||= {});
function vt(s15) {
  let t = s15.toString(16);
  return t.length < 2 ? "0" + t : t;
}
function Xe(s15, t) {
  return s15 < t ? (t + 0.05) / (s15 + 0.05) : (s15 + 0.05) / (t + 0.05);
}
var Vr = class extends De {
  constructor(e, i, r5) {
    super();
    this.content = 0;
    this.combinedData = "";
    this.fg = e.fg, this.bg = e.bg, this.combinedData = i, this._width = r5;
  }
  isCombined() {
    return 2097152;
  }
  getWidth() {
    return this._width;
  }
  getChars() {
    return this.combinedData;
  }
  getCode() {
    return 2097151;
  }
  setFromCharData(e) {
    throw new Error("not implemented");
  }
  getAsCharData() {
    return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
  }
};
var ct = class {
  constructor(t) {
    this._bufferService = t;
    this._characterJoiners = [];
    this._nextCharacterJoinerId = 0;
    this._workCell = new q();
  }
  register(t) {
    let e = { id: this._nextCharacterJoinerId++, handler: t };
    return this._characterJoiners.push(e), e.id;
  }
  deregister(t) {
    for (let e = 0; e < this._characterJoiners.length; e++) if (this._characterJoiners[e].id === t) return this._characterJoiners.splice(e, 1), true;
    return false;
  }
  getJoinedCharacters(t) {
    if (this._characterJoiners.length === 0) return [];
    let e = this._bufferService.buffer.lines.get(t);
    if (!e || e.length === 0) return [];
    let i = [], r5 = e.translateToString(true), n = 0, o2 = 0, l = 0, a = e.getFg(0), u = e.getBg(0);
    for (let h2 = 0; h2 < e.getTrimmedLength(); h2++) if (e.loadCell(h2, this._workCell), this._workCell.getWidth() !== 0) {
      if (this._workCell.fg !== a || this._workCell.bg !== u) {
        if (h2 - n > 1) {
          let c = this._getJoinedRanges(r5, l, o2, e, n);
          for (let d = 0; d < c.length; d++) i.push(c[d]);
        }
        n = h2, l = o2, a = this._workCell.fg, u = this._workCell.bg;
      }
      o2 += this._workCell.getChars().length || we.length;
    }
    if (this._bufferService.cols - n > 1) {
      let h2 = this._getJoinedRanges(r5, l, o2, e, n);
      for (let c = 0; c < h2.length; c++) i.push(h2[c]);
    }
    return i;
  }
  _getJoinedRanges(t, e, i, r5, n) {
    let o2 = t.substring(e, i), l = [];
    try {
      l = this._characterJoiners[0].handler(o2);
    } catch (a) {
      console.error(a);
    }
    for (let a = 1; a < this._characterJoiners.length; a++) try {
      let u = this._characterJoiners[a].handler(o2);
      for (let h2 = 0; h2 < u.length; h2++) ct._mergeRanges(l, u[h2]);
    } catch (u) {
      console.error(u);
    }
    return this._stringRangesToCellRanges(l, r5, n), l;
  }
  _stringRangesToCellRanges(t, e, i) {
    let r5 = 0, n = false, o2 = 0, l = t[r5];
    if (l) {
      for (let a = i; a < this._bufferService.cols; a++) {
        let u = e.getWidth(a), h2 = e.getString(a).length || we.length;
        if (u !== 0) {
          if (!n && l[0] <= o2 && (l[0] = a, n = true), l[1] <= o2) {
            if (l[1] = a, l = t[++r5], !l) break;
            l[0] <= o2 ? (l[0] = a, n = true) : n = false;
          }
          o2 += h2;
        }
      }
      l && (l[1] = this._bufferService.cols);
    }
  }
  static _mergeRanges(t, e) {
    let i = false;
    for (let r5 = 0; r5 < t.length; r5++) {
      let n = t[r5];
      if (i) {
        if (e[1] <= n[0]) return t[r5 - 1][1] = e[1], t;
        if (e[1] <= n[1]) return t[r5 - 1][1] = Math.max(e[1], n[1]), t.splice(r5, 1), t;
        t.splice(r5, 1), r5--;
      } else {
        if (e[1] <= n[0]) return t.splice(r5, 0, e), t;
        if (e[1] <= n[1]) return n[0] = Math.min(e[0], n[0]), t;
        e[0] < n[1] && (n[0] = Math.min(e[0], n[0]), i = true);
        continue;
      }
    }
    return i ? t[t.length - 1][1] = e[1] : t.push(e), t;
  }
};
ct = M([S(0, F)], ct);
function Oa(s15) {
  return 57508 <= s15 && s15 <= 57558;
}
function Ba(s15) {
  return 9472 <= s15 && s15 <= 9631;
}
function $o(s15) {
  return Oa(s15) || Ba(s15);
}
function Vo() {
  return { css: { canvas: qr(), cell: qr() }, device: { canvas: qr(), cell: qr(), char: { width: 0, height: 0, left: 0, top: 0 } } };
}
function qr() {
  return { width: 0, height: 0 };
}
var Vt = class {
  constructor(t, e, i, r5, n, o2, l) {
    this._document = t;
    this._characterJoinerService = e;
    this._optionsService = i;
    this._coreBrowserService = r5;
    this._coreService = n;
    this._decorationService = o2;
    this._themeService = l;
    this._workCell = new q();
    this._columnSelectMode = false;
    this.defaultSpacing = 0;
  }
  handleSelectionChanged(t, e, i) {
    this._selectionStart = t, this._selectionEnd = e, this._columnSelectMode = i;
  }
  createRow(t, e, i, r5, n, o2, l, a, u, h2, c) {
    let d = [], _3 = this._characterJoinerService.getJoinedCharacters(e), p = this._themeService.colors, m = t.getNoBgTrimmedLength();
    i && m < o2 + 1 && (m = o2 + 1);
    let f, A2 = 0, R3 = "", O2 = 0, I2 = 0, k = 0, P3 = 0, oe = false, Me2 = 0, Pe2 = false, Ke2 = 0, di = 0, V = [], Qe = h2 !== -1 && c !== -1;
    for (let y = 0; y < m; y++) {
      t.loadCell(y, this._workCell);
      let T = this._workCell.getWidth();
      if (T === 0) continue;
      let g = false, w2 = y >= di, E = y, x = this._workCell;
      if (_3.length > 0 && y === _3[0][0] && w2) {
        let W = _3.shift(), An = this._isCellInSelection(W[0], e);
        for (O2 = W[0] + 1; O2 < W[1]; O2++) w2 &&= An === this._isCellInSelection(O2, e);
        w2 &&= !i || o2 < W[0] || o2 >= W[1], w2 ? (g = true, x = new Vr(this._workCell, t.translateToString(true, W[0], W[1]), W[1] - W[0]), E = W[1] - 1, T = x.getWidth()) : di = W[1];
      }
      let N2 = this._isCellInSelection(y, e), Z2 = i && y === o2, te3 = Qe && y >= h2 && y <= c, Oe2 = false;
      this._decorationService.forEachDecorationAtCell(y, e, void 0, (W) => {
        Oe2 = true;
      });
      let ze = x.getChars() || we;
      if (ze === " " && (x.isUnderline() || x.isOverline()) && (ze = "\xA0"), Ke2 = T * a - u.get(ze, x.isBold(), x.isItalic()), !f) f = this._document.createElement("span");
      else if (A2 && (N2 && Pe2 || !N2 && !Pe2 && x.bg === I2) && (N2 && Pe2 && p.selectionForeground || x.fg === k) && x.extended.ext === P3 && te3 === oe && Ke2 === Me2 && !Z2 && !g && !Oe2 && w2) {
        x.isInvisible() ? R3 += we : R3 += ze, A2++;
        continue;
      } else A2 && (f.textContent = R3), f = this._document.createElement("span"), A2 = 0, R3 = "";
      if (I2 = x.bg, k = x.fg, P3 = x.extended.ext, oe = te3, Me2 = Ke2, Pe2 = N2, g && o2 >= y && o2 <= E && (o2 = y), !this._coreService.isCursorHidden && Z2 && this._coreService.isCursorInitialized) {
        if (V.push("xterm-cursor"), this._coreBrowserService.isFocused) l && V.push("xterm-cursor-blink"), V.push(r5 === "bar" ? "xterm-cursor-bar" : r5 === "underline" ? "xterm-cursor-underline" : "xterm-cursor-block");
        else if (n) switch (n) {
          case "outline":
            V.push("xterm-cursor-outline");
            break;
          case "block":
            V.push("xterm-cursor-block");
            break;
          case "bar":
            V.push("xterm-cursor-bar");
            break;
          case "underline":
            V.push("xterm-cursor-underline");
            break;
          default:
            break;
        }
      }
      if (x.isBold() && V.push("xterm-bold"), x.isItalic() && V.push("xterm-italic"), x.isDim() && V.push("xterm-dim"), x.isInvisible() ? R3 = we : R3 = x.getChars() || we, x.isUnderline() && (V.push(`xterm-underline-${x.extended.underlineStyle}`), R3 === " " && (R3 = "\xA0"), !x.isUnderlineColorDefault())) if (x.isUnderlineColorRGB()) f.style.textDecorationColor = `rgb(${De.toColorRGB(x.getUnderlineColor()).join(",")})`;
      else {
        let W = x.getUnderlineColor();
        this._optionsService.rawOptions.drawBoldTextInBrightColors && x.isBold() && W < 8 && (W += 8), f.style.textDecorationColor = p.ansi[W].css;
      }
      x.isOverline() && (V.push("xterm-overline"), R3 === " " && (R3 = "\xA0")), x.isStrikethrough() && V.push("xterm-strikethrough"), te3 && (f.style.textDecoration = "underline");
      let le = x.getFgColor(), et2 = x.getFgColorMode(), me2 = x.getBgColor(), ht = x.getBgColorMode(), fi = !!x.isInverse();
      if (fi) {
        let W = le;
        le = me2, me2 = W;
        let An = et2;
        et2 = ht, ht = An;
      }
      let tt2, Qi, pi = false;
      this._decorationService.forEachDecorationAtCell(y, e, void 0, (W) => {
        W.options.layer !== "top" && pi || (W.backgroundColorRGB && (ht = 50331648, me2 = W.backgroundColorRGB.rgba >> 8 & 16777215, tt2 = W.backgroundColorRGB), W.foregroundColorRGB && (et2 = 50331648, le = W.foregroundColorRGB.rgba >> 8 & 16777215, Qi = W.foregroundColorRGB), pi = W.options.layer === "top");
      }), !pi && N2 && (tt2 = this._coreBrowserService.isFocused ? p.selectionBackgroundOpaque : p.selectionInactiveBackgroundOpaque, me2 = tt2.rgba >> 8 & 16777215, ht = 50331648, pi = true, p.selectionForeground && (et2 = 50331648, le = p.selectionForeground.rgba >> 8 & 16777215, Qi = p.selectionForeground)), pi && V.push("xterm-decoration-top");
      let it2;
      switch (ht) {
        case 16777216:
        case 33554432:
          it2 = p.ansi[me2], V.push(`xterm-bg-${me2}`);
          break;
        case 50331648:
          it2 = j.toColor(me2 >> 16, me2 >> 8 & 255, me2 & 255), this._addStyle(f, `background-color:#${qo((me2 >>> 0).toString(16), "0", 6)}`);
          break;
        case 0:
        default:
          fi ? (it2 = p.foreground, V.push(`xterm-bg-${257}`)) : it2 = p.background;
      }
      switch (tt2 || x.isDim() && (tt2 = U.multiplyOpacity(it2, 0.5)), et2) {
        case 16777216:
        case 33554432:
          x.isBold() && le < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && (le += 8), this._applyMinimumContrast(f, it2, p.ansi[le], x, tt2, void 0) || V.push(`xterm-fg-${le}`);
          break;
        case 50331648:
          let W = j.toColor(le >> 16 & 255, le >> 8 & 255, le & 255);
          this._applyMinimumContrast(f, it2, W, x, tt2, Qi) || this._addStyle(f, `color:#${qo(le.toString(16), "0", 6)}`);
          break;
        case 0:
        default:
          this._applyMinimumContrast(f, it2, p.foreground, x, tt2, Qi) || fi && V.push(`xterm-fg-${257}`);
      }
      V.length && (f.className = V.join(" "), V.length = 0), !Z2 && !g && !Oe2 && w2 ? A2++ : f.textContent = R3, Ke2 !== this.defaultSpacing && (f.style.letterSpacing = `${Ke2}px`), d.push(f), y = E;
    }
    return f && A2 && (f.textContent = R3), d;
  }
  _applyMinimumContrast(t, e, i, r5, n, o2) {
    if (this._optionsService.rawOptions.minimumContrastRatio === 1 || $o(r5.getCode())) return false;
    let l = this._getContrastCache(r5), a;
    if (!n && !o2 && (a = l.getColor(e.rgba, i.rgba)), a === void 0) {
      let u = this._optionsService.rawOptions.minimumContrastRatio / (r5.isDim() ? 2 : 1);
      a = U.ensureContrastRatio(n || e, o2 || i, u), l.setColor((n || e).rgba, (o2 || i).rgba, a ?? null);
    }
    return a ? (this._addStyle(t, `color:${a.css}`), true) : false;
  }
  _getContrastCache(t) {
    return t.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
  }
  _addStyle(t, e) {
    t.setAttribute("style", `${t.getAttribute("style") || ""}${e};`);
  }
  _isCellInSelection(t, e) {
    let i = this._selectionStart, r5 = this._selectionEnd;
    return !i || !r5 ? false : this._columnSelectMode ? i[0] <= r5[0] ? t >= i[0] && e >= i[1] && t < r5[0] && e <= r5[1] : t < i[0] && e >= i[1] && t >= r5[0] && e <= r5[1] : e > i[1] && e < r5[1] || i[1] === r5[1] && e === i[1] && t >= i[0] && t < r5[0] || i[1] < r5[1] && e === r5[1] && t < r5[0] || i[1] < r5[1] && e === i[1] && t >= i[0];
  }
};
Vt = M([S(1, or), S(2, H), S(3, ae), S(4, ge), S(5, Be), S(6, Re)], Vt);
function qo(s15, t, e) {
  for (; s15.length < e; ) s15 = t + s15;
  return s15;
}
var Yr = class {
  constructor(t, e) {
    this._flat = new Float32Array(256);
    this._font = "";
    this._fontSize = 0;
    this._weight = "normal";
    this._weightBold = "bold";
    this._measureElements = [];
    this._container = t.createElement("div"), this._container.classList.add("xterm-width-cache-measure-container"), this._container.setAttribute("aria-hidden", "true"), this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
    let i = t.createElement("span");
    i.classList.add("xterm-char-measure-element");
    let r5 = t.createElement("span");
    r5.classList.add("xterm-char-measure-element"), r5.style.fontWeight = "bold";
    let n = t.createElement("span");
    n.classList.add("xterm-char-measure-element"), n.style.fontStyle = "italic";
    let o2 = t.createElement("span");
    o2.classList.add("xterm-char-measure-element"), o2.style.fontWeight = "bold", o2.style.fontStyle = "italic", this._measureElements = [i, r5, n, o2], this._container.appendChild(i), this._container.appendChild(r5), this._container.appendChild(n), this._container.appendChild(o2), e.appendChild(this._container), this.clear();
  }
  dispose() {
    this._container.remove(), this._measureElements.length = 0, this._holey = void 0;
  }
  clear() {
    this._flat.fill(-9999), this._holey = /* @__PURE__ */ new Map();
  }
  setFont(t, e, i, r5) {
    t === this._font && e === this._fontSize && i === this._weight && r5 === this._weightBold || (this._font = t, this._fontSize = e, this._weight = i, this._weightBold = r5, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${i}`, this._measureElements[1].style.fontWeight = `${r5}`, this._measureElements[2].style.fontWeight = `${i}`, this._measureElements[3].style.fontWeight = `${r5}`, this.clear());
  }
  get(t, e, i) {
    let r5 = 0;
    if (!e && !i && t.length === 1 && (r5 = t.charCodeAt(0)) < 256) {
      if (this._flat[r5] !== -9999) return this._flat[r5];
      let l = this._measure(t, 0);
      return l > 0 && (this._flat[r5] = l), l;
    }
    let n = t;
    e && (n += "B"), i && (n += "I");
    let o2 = this._holey.get(n);
    if (o2 === void 0) {
      let l = 0;
      e && (l |= 1), i && (l |= 2), o2 = this._measure(t, l), o2 > 0 && this._holey.set(n, o2);
    }
    return o2;
  }
  _measure(t, e) {
    let i = this._measureElements[e];
    return i.textContent = t.repeat(32), i.offsetWidth / 32;
  }
};
var ms = class {
  constructor() {
    this.clear();
  }
  clear() {
    this.hasSelection = false, this.columnSelectMode = false, this.viewportStartRow = 0, this.viewportEndRow = 0, this.viewportCappedStartRow = 0, this.viewportCappedEndRow = 0, this.startCol = 0, this.endCol = 0, this.selectionStart = void 0, this.selectionEnd = void 0;
  }
  update(t, e, i, r5 = false) {
    if (this.selectionStart = e, this.selectionEnd = i, !e || !i || e[0] === i[0] && e[1] === i[1]) {
      this.clear();
      return;
    }
    let n = t.buffers.active.ydisp, o2 = e[1] - n, l = i[1] - n, a = Math.max(o2, 0), u = Math.min(l, t.rows - 1);
    if (a >= t.rows || u < 0) {
      this.clear();
      return;
    }
    this.hasSelection = true, this.columnSelectMode = r5, this.viewportStartRow = o2, this.viewportEndRow = l, this.viewportCappedStartRow = a, this.viewportCappedEndRow = u, this.startCol = e[0], this.endCol = i[0];
  }
  isCellSelected(t, e, i) {
    return this.hasSelection ? (i -= t.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? e >= this.startCol && i >= this.viewportCappedStartRow && e < this.endCol && i <= this.viewportCappedEndRow : e < this.startCol && i >= this.viewportCappedStartRow && e >= this.endCol && i <= this.viewportCappedEndRow : i > this.viewportStartRow && i < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && i === this.viewportStartRow && e >= this.startCol && e < this.endCol || this.viewportStartRow < this.viewportEndRow && i === this.viewportEndRow && e < this.endCol || this.viewportStartRow < this.viewportEndRow && i === this.viewportStartRow && e >= this.startCol) : false;
  }
};
function Yo() {
  return new ms();
}
var _s = "xterm-dom-renderer-owner-";
var Le = "xterm-rows";
var jr = "xterm-fg-";
var jo = "xterm-bg-";
var ki = "xterm-focus";
var Xr = "xterm-selection";
var Na = 1;
var Yt = class extends D {
  constructor(e, i, r5, n, o2, l, a, u, h2, c, d, _3, p, m) {
    super();
    this._terminal = e;
    this._document = i;
    this._element = r5;
    this._screenElement = n;
    this._viewportElement = o2;
    this._helperContainer = l;
    this._linkifier2 = a;
    this._charSizeService = h2;
    this._optionsService = c;
    this._bufferService = d;
    this._coreService = _3;
    this._coreBrowserService = p;
    this._themeService = m;
    this._terminalClass = Na++;
    this._rowElements = [];
    this._selectionRenderModel = Yo();
    this.onRequestRedraw = this._register(new v()).event;
    this._rowContainer = this._document.createElement("div"), this._rowContainer.classList.add(Le), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = this._document.createElement("div"), this._selectionContainer.classList.add(Xr), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = Vo(), this._updateDimensions(), this._register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this._register(this._themeService.onChangeColors((f) => this._injectCss(f))), this._injectCss(this._themeService.colors), this._rowFactory = u.createInstance(Vt, document), this._element.classList.add(_s + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this._register(this._linkifier2.onShowLinkUnderline((f) => this._handleLinkHover(f))), this._register(this._linkifier2.onHideLinkUnderline((f) => this._handleLinkLeave(f))), this._register(C(() => {
      this._element.classList.remove(_s + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
    })), this._widthCache = new Yr(this._document, this._helperContainer), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
  }
  _updateDimensions() {
    let e = this._coreBrowserService.dpr;
    this.dimensions.device.char.width = this._charSizeService.width * e, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * e), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / e), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / e), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
    for (let r5 of this._rowElements) r5.style.width = `${this.dimensions.css.canvas.width}px`, r5.style.height = `${this.dimensions.css.cell.height}px`, r5.style.lineHeight = `${this.dimensions.css.cell.height}px`, r5.style.overflow = "hidden";
    this._dimensionsStyleElement || (this._dimensionsStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
    let i = `${this._terminalSelector} .${Le} span { display: inline-block; height: 100%; vertical-align: top;}`;
    this._dimensionsStyleElement.textContent = i, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
  }
  _injectCss(e) {
    this._themeStyleElement || (this._themeStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
    let i = `${this._terminalSelector} .${Le} { pointer-events: none; color: ${e.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
    i += `${this._terminalSelector} .${Le} .xterm-dim { color: ${U.multiplyOpacity(e.foreground, 0.5).css};}`, i += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;
    let r5 = `blink_underline_${this._terminalClass}`, n = `blink_bar_${this._terminalClass}`, o2 = `blink_block_${this._terminalClass}`;
    i += `@keyframes ${r5} { 50% {  border-bottom-style: hidden; }}`, i += `@keyframes ${n} { 50% {  box-shadow: none; }}`, i += `@keyframes ${o2} { 0% {  background-color: ${e.cursor.css};  color: ${e.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${e.cursor.css}; }}`, i += `${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${r5} 1s step-end infinite;}${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${n} 1s step-end infinite;}${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${o2} 1s step-end infinite;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-block { background-color: ${e.cursor.css}; color: ${e.cursorAccent.css};}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${e.cursor.css} !important; color: ${e.cursorAccent.css} !important;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${e.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e.cursor.css} inset;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${e.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, i += `${this._terminalSelector} .${Xr} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${Xr} div { position: absolute; background-color: ${e.selectionBackgroundOpaque.css};}${this._terminalSelector} .${Xr} div { position: absolute; background-color: ${e.selectionInactiveBackgroundOpaque.css};}`;
    for (let [l, a] of e.ansi.entries()) i += `${this._terminalSelector} .${jr}${l} { color: ${a.css}; }${this._terminalSelector} .${jr}${l}.xterm-dim { color: ${U.multiplyOpacity(a, 0.5).css}; }${this._terminalSelector} .${jo}${l} { background-color: ${a.css}; }`;
    i += `${this._terminalSelector} .${jr}${257} { color: ${U.opaque(e.background).css}; }${this._terminalSelector} .${jr}${257}.xterm-dim { color: ${U.multiplyOpacity(U.opaque(e.background), 0.5).css}; }${this._terminalSelector} .${jo}${257} { background-color: ${e.foreground.css}; }`, this._themeStyleElement.textContent = i;
  }
  _setDefaultSpacing() {
    let e = this.dimensions.css.cell.width - this._widthCache.get("W", false, false);
    this._rowContainer.style.letterSpacing = `${e}px`, this._rowFactory.defaultSpacing = e;
  }
  handleDevicePixelRatioChange() {
    this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
  }
  _refreshRowElements(e, i) {
    for (let r5 = this._rowElements.length; r5 <= i; r5++) {
      let n = this._document.createElement("div");
      this._rowContainer.appendChild(n), this._rowElements.push(n);
    }
    for (; this._rowElements.length > i; ) this._rowContainer.removeChild(this._rowElements.pop());
  }
  handleResize(e, i) {
    this._refreshRowElements(e, i), this._updateDimensions(), this.handleSelectionChanged(this._selectionRenderModel.selectionStart, this._selectionRenderModel.selectionEnd, this._selectionRenderModel.columnSelectMode);
  }
  handleCharSizeChanged() {
    this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
  }
  handleBlur() {
    this._rowContainer.classList.remove(ki), this.renderRows(0, this._bufferService.rows - 1);
  }
  handleFocus() {
    this._rowContainer.classList.add(ki), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
  }
  handleSelectionChanged(e, i, r5) {
    if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(e, i, r5), this.renderRows(0, this._bufferService.rows - 1), !e || !i || (this._selectionRenderModel.update(this._terminal, e, i, r5), !this._selectionRenderModel.hasSelection)) return;
    let n = this._selectionRenderModel.viewportStartRow, o2 = this._selectionRenderModel.viewportEndRow, l = this._selectionRenderModel.viewportCappedStartRow, a = this._selectionRenderModel.viewportCappedEndRow, u = this._document.createDocumentFragment();
    if (r5) {
      let h2 = e[0] > i[0];
      u.appendChild(this._createSelectionElement(l, h2 ? i[0] : e[0], h2 ? e[0] : i[0], a - l + 1));
    } else {
      let h2 = n === l ? e[0] : 0, c = l === o2 ? i[0] : this._bufferService.cols;
      u.appendChild(this._createSelectionElement(l, h2, c));
      let d = a - l - 1;
      if (u.appendChild(this._createSelectionElement(l + 1, 0, this._bufferService.cols, d)), l !== a) {
        let _3 = o2 === a ? i[0] : this._bufferService.cols;
        u.appendChild(this._createSelectionElement(a, 0, _3));
      }
    }
    this._selectionContainer.appendChild(u);
  }
  _createSelectionElement(e, i, r5, n = 1) {
    let o2 = this._document.createElement("div"), l = i * this.dimensions.css.cell.width, a = this.dimensions.css.cell.width * (r5 - i);
    return l + a > this.dimensions.css.canvas.width && (a = this.dimensions.css.canvas.width - l), o2.style.height = `${n * this.dimensions.css.cell.height}px`, o2.style.top = `${e * this.dimensions.css.cell.height}px`, o2.style.left = `${l}px`, o2.style.width = `${a}px`, o2;
  }
  handleCursorMove() {
  }
  _handleOptionsChanged() {
    this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
  }
  clear() {
    for (let e of this._rowElements) e.replaceChildren();
  }
  renderRows(e, i) {
    let r5 = this._bufferService.buffer, n = r5.ybase + r5.y, o2 = Math.min(r5.x, this._bufferService.cols - 1), l = this._coreService.decPrivateModes.cursorBlink ?? this._optionsService.rawOptions.cursorBlink, a = this._coreService.decPrivateModes.cursorStyle ?? this._optionsService.rawOptions.cursorStyle, u = this._optionsService.rawOptions.cursorInactiveStyle;
    for (let h2 = e; h2 <= i; h2++) {
      let c = h2 + r5.ydisp, d = this._rowElements[h2], _3 = r5.lines.get(c);
      if (!d || !_3) break;
      d.replaceChildren(...this._rowFactory.createRow(_3, c, c === n, a, u, o2, l, this.dimensions.css.cell.width, this._widthCache, -1, -1));
    }
  }
  get _terminalSelector() {
    return `.${_s}${this._terminalClass}`;
  }
  _handleLinkHover(e) {
    this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, true);
  }
  _handleLinkLeave(e) {
    this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, false);
  }
  _setCellUnderline(e, i, r5, n, o2, l) {
    r5 < 0 && (e = 0), n < 0 && (i = 0);
    let a = this._bufferService.rows - 1;
    r5 = Math.max(Math.min(r5, a), 0), n = Math.max(Math.min(n, a), 0), o2 = Math.min(o2, this._bufferService.cols);
    let u = this._bufferService.buffer, h2 = u.ybase + u.y, c = Math.min(u.x, o2 - 1), d = this._optionsService.rawOptions.cursorBlink, _3 = this._optionsService.rawOptions.cursorStyle, p = this._optionsService.rawOptions.cursorInactiveStyle;
    for (let m = r5; m <= n; ++m) {
      let f = m + u.ydisp, A2 = this._rowElements[m], R3 = u.lines.get(f);
      if (!A2 || !R3) break;
      A2.replaceChildren(...this._rowFactory.createRow(R3, f, f === h2, _3, p, c, d, this.dimensions.css.cell.width, this._widthCache, l ? m === r5 ? e : 0 : -1, l ? (m === n ? i : o2) - 1 : -1));
    }
  }
};
Yt = M([S(7, xt), S(8, nt), S(9, H), S(10, F), S(11, ge), S(12, ae), S(13, Re)], Yt);
var jt = class extends D {
  constructor(e, i, r5) {
    super();
    this._optionsService = r5;
    this.width = 0;
    this.height = 0;
    this._onCharSizeChange = this._register(new v());
    this.onCharSizeChange = this._onCharSizeChange.event;
    try {
      this._measureStrategy = this._register(new vs(this._optionsService));
    } catch {
      this._measureStrategy = this._register(new bs(e, i, this._optionsService));
    }
    this._register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], () => this.measure()));
  }
  get hasValidSize() {
    return this.width > 0 && this.height > 0;
  }
  measure() {
    let e = this._measureStrategy.measure();
    (e.width !== this.width || e.height !== this.height) && (this.width = e.width, this.height = e.height, this._onCharSizeChange.fire());
  }
};
jt = M([S(2, H)], jt);
var Zr = class extends D {
  constructor() {
    super(...arguments);
    this._result = { width: 0, height: 0 };
  }
  _validateAndSet(e, i) {
    e !== void 0 && e > 0 && i !== void 0 && i > 0 && (this._result.width = e, this._result.height = i);
  }
};
var bs = class extends Zr {
  constructor(e, i, r5) {
    super();
    this._document = e;
    this._parentElement = i;
    this._optionsService = r5;
    this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
  }
  measure() {
    return this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`, this._validateAndSet(Number(this._measureElement.offsetWidth) / 32, Number(this._measureElement.offsetHeight)), this._result;
  }
};
var vs = class extends Zr {
  constructor(e) {
    super();
    this._optionsService = e;
    this._canvas = new OffscreenCanvas(100, 100), this._ctx = this._canvas.getContext("2d");
    let i = this._ctx.measureText("W");
    if (!("width" in i && "fontBoundingBoxAscent" in i && "fontBoundingBoxDescent" in i)) throw new Error("Required font metrics not supported");
  }
  measure() {
    this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
    let e = this._ctx.measureText("W");
    return this._validateAndSet(e.width, e.fontBoundingBoxAscent + e.fontBoundingBoxDescent), this._result;
  }
};
var Jr = class extends D {
  constructor(e, i, r5) {
    super();
    this._textarea = e;
    this._window = i;
    this.mainDocument = r5;
    this._isFocused = false;
    this._cachedIsFocused = void 0;
    this._screenDprMonitor = this._register(new gs(this._window));
    this._onDprChange = this._register(new v());
    this.onDprChange = this._onDprChange.event;
    this._onWindowChange = this._register(new v());
    this.onWindowChange = this._onWindowChange.event;
    this._register(this.onWindowChange((n) => this._screenDprMonitor.setWindow(n))), this._register($.forward(this._screenDprMonitor.onDprChange, this._onDprChange)), this._register(L(this._textarea, "focus", () => this._isFocused = true)), this._register(L(this._textarea, "blur", () => this._isFocused = false));
  }
  get window() {
    return this._window;
  }
  set window(e) {
    this._window !== e && (this._window = e, this._onWindowChange.fire(this._window));
  }
  get dpr() {
    return this.window.devicePixelRatio;
  }
  get isFocused() {
    return this._cachedIsFocused === void 0 && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask(() => this._cachedIsFocused = void 0)), this._cachedIsFocused;
  }
};
var gs = class extends D {
  constructor(e) {
    super();
    this._parentWindow = e;
    this._windowResizeListener = this._register(new ye());
    this._onDprChange = this._register(new v());
    this.onDprChange = this._onDprChange.event;
    this._outerListener = () => this._setDprAndFireIfDiffers(), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._updateDpr(), this._setWindowResizeListener(), this._register(C(() => this.clearListener()));
  }
  setWindow(e) {
    this._parentWindow = e, this._setWindowResizeListener(), this._setDprAndFireIfDiffers();
  }
  _setWindowResizeListener() {
    this._windowResizeListener.value = L(this._parentWindow, "resize", () => this._setDprAndFireIfDiffers());
  }
  _setDprAndFireIfDiffers() {
    this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio && this._onDprChange.fire(this._parentWindow.devicePixelRatio), this._updateDpr();
  }
  _updateDpr() {
    this._outerListener && (this._resolutionMediaMatchList?.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
  }
  clearListener() {
    !this._resolutionMediaMatchList || !this._outerListener || (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._outerListener = void 0);
  }
};
var Qr = class extends D {
  constructor() {
    super();
    this.linkProviders = [];
    this._register(C(() => this.linkProviders.length = 0));
  }
  registerLinkProvider(e) {
    return this.linkProviders.push(e), { dispose: () => {
      let i = this.linkProviders.indexOf(e);
      i !== -1 && this.linkProviders.splice(i, 1);
    } };
  }
};
function Ci(s15, t, e) {
  let i = e.getBoundingClientRect(), r5 = s15.getComputedStyle(e), n = parseInt(r5.getPropertyValue("padding-left")), o2 = parseInt(r5.getPropertyValue("padding-top"));
  return [t.clientX - i.left - n, t.clientY - i.top - o2];
}
function Xo(s15, t, e, i, r5, n, o2, l, a) {
  if (!n) return;
  let u = Ci(s15, t, e);
  if (u) return u[0] = Math.ceil((u[0] + (a ? o2 / 2 : 0)) / o2), u[1] = Math.ceil(u[1] / l), u[0] = Math.min(Math.max(u[0], 1), i + (a ? 1 : 0)), u[1] = Math.min(Math.max(u[1], 1), r5), u;
}
var Xt = class {
  constructor(t, e) {
    this._renderService = t;
    this._charSizeService = e;
  }
  getCoords(t, e, i, r5, n) {
    return Xo(window, t, e, i, r5, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, n);
  }
  getMouseReportCoords(t, e) {
    let i = Ci(window, t, e);
    if (this._charSizeService.hasValidSize) return i[0] = Math.min(Math.max(i[0], 0), this._renderService.dimensions.css.canvas.width - 1), i[1] = Math.min(Math.max(i[1], 0), this._renderService.dimensions.css.canvas.height - 1), { col: Math.floor(i[0] / this._renderService.dimensions.css.cell.width), row: Math.floor(i[1] / this._renderService.dimensions.css.cell.height), x: Math.floor(i[0]), y: Math.floor(i[1]) };
  }
};
Xt = M([S(0, ce), S(1, nt)], Xt);
var en = class {
  constructor(t, e) {
    this._renderCallback = t;
    this._coreBrowserService = e;
    this._refreshCallbacks = [];
  }
  dispose() {
    this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
  }
  addRefreshCallback(t) {
    return this._refreshCallbacks.push(t), this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh())), this._animationFrame;
  }
  refresh(t, e, i) {
    this._rowCount = i, t = t !== void 0 ? t : 0, e = e !== void 0 ? e : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, t) : t, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, e) : e, !this._animationFrame && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
  }
  _innerRefresh() {
    if (this._animationFrame = void 0, this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) {
      this._runRefreshCallbacks();
      return;
    }
    let t = Math.max(this._rowStart, 0), e = Math.min(this._rowEnd, this._rowCount - 1);
    this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(t, e), this._runRefreshCallbacks();
  }
  _runRefreshCallbacks() {
    for (let t of this._refreshCallbacks) t(0);
    this._refreshCallbacks = [];
  }
};
var tn = {};
Ll(tn, { getSafariVersion: () => Ha, isChromeOS: () => Ts, isFirefox: () => Ss, isIpad: () => Wa, isIphone: () => Ua, isLegacyEdge: () => Fa, isLinux: () => Bi, isMac: () => Zt, isNode: () => Mi, isSafari: () => Zo, isWindows: () => Es });
var Mi = typeof process < "u" && "title" in process;
var Pi = Mi ? "node" : navigator.userAgent;
var Oi = Mi ? "node" : navigator.platform;
var Ss = Pi.includes("Firefox");
var Fa = Pi.includes("Edge");
var Zo = /^((?!chrome|android).)*safari/i.test(Pi);
function Ha() {
  if (!Zo) return 0;
  let s15 = Pi.match(/Version\/(\d+)/);
  return s15 === null || s15.length < 2 ? 0 : parseInt(s15[1]);
}
var Zt = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(Oi);
var Wa = Oi === "iPad";
var Ua = Oi === "iPhone";
var Es = ["Windows", "Win16", "Win32", "WinCE"].includes(Oi);
var Bi = Oi.indexOf("Linux") >= 0;
var Ts = /\bCrOS\b/.test(Pi);
var rn = class {
  constructor() {
    this._tasks = [];
    this._i = 0;
  }
  enqueue(t) {
    this._tasks.push(t), this._start();
  }
  flush() {
    for (; this._i < this._tasks.length; ) this._tasks[this._i]() || this._i++;
    this.clear();
  }
  clear() {
    this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
  }
  _start() {
    this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
  }
  _process(t) {
    this._idleCallback = void 0;
    let e = 0, i = 0, r5 = t.timeRemaining(), n = 0;
    for (; this._i < this._tasks.length; ) {
      if (e = performance.now(), this._tasks[this._i]() || this._i++, e = Math.max(1, performance.now() - e), i = Math.max(e, i), n = t.timeRemaining(), i * 1.5 > n) {
        r5 - e < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(r5 - e))}ms`), this._start();
        return;
      }
      r5 = n;
    }
    this.clear();
  }
};
var Is = class extends rn {
  _requestCallback(t) {
    return setTimeout(() => t(this._createDeadline(16)));
  }
  _cancelCallback(t) {
    clearTimeout(t);
  }
  _createDeadline(t) {
    let e = performance.now() + t;
    return { timeRemaining: () => Math.max(0, e - performance.now()) };
  }
};
var ys = class extends rn {
  _requestCallback(t) {
    return requestIdleCallback(t);
  }
  _cancelCallback(t) {
    cancelIdleCallback(t);
  }
};
var Jt = !Mi && "requestIdleCallback" in window ? ys : Is;
var nn = class {
  constructor() {
    this._queue = new Jt();
  }
  set(t) {
    this._queue.clear(), this._queue.enqueue(t);
  }
  flush() {
    this._queue.flush();
  }
};
var Qt = class extends D {
  constructor(e, i, r5, n, o2, l, a, u, h2) {
    super();
    this._rowCount = e;
    this._optionsService = r5;
    this._charSizeService = n;
    this._coreService = o2;
    this._coreBrowserService = u;
    this._renderer = this._register(new ye());
    this._pausedResizeTask = new nn();
    this._observerDisposable = this._register(new ye());
    this._isPaused = false;
    this._needsFullRefresh = false;
    this._isNextRenderRedrawOnly = true;
    this._needsSelectionRefresh = false;
    this._canvasWidth = 0;
    this._canvasHeight = 0;
    this._selectionState = { start: void 0, end: void 0, columnSelectMode: false };
    this._onDimensionsChange = this._register(new v());
    this.onDimensionsChange = this._onDimensionsChange.event;
    this._onRenderedViewportChange = this._register(new v());
    this.onRenderedViewportChange = this._onRenderedViewportChange.event;
    this._onRender = this._register(new v());
    this.onRender = this._onRender.event;
    this._onRefreshRequest = this._register(new v());
    this.onRefreshRequest = this._onRefreshRequest.event;
    this._renderDebouncer = new en((c, d) => this._renderRows(c, d), this._coreBrowserService), this._register(this._renderDebouncer), this._syncOutputHandler = new xs(this._coreBrowserService, this._coreService, () => this._fullRefresh()), this._register(C(() => this._syncOutputHandler.dispose())), this._register(this._coreBrowserService.onDprChange(() => this.handleDevicePixelRatioChange())), this._register(a.onResize(() => this._fullRefresh())), this._register(a.buffers.onBufferActivate(() => this._renderer.value?.clear())), this._register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this._register(this._charSizeService.onCharSizeChange(() => this.handleCharSizeChanged())), this._register(l.onDecorationRegistered(() => this._fullRefresh())), this._register(l.onDecorationRemoved(() => this._fullRefresh())), this._register(this._optionsService.onMultipleOptionChange(["customGlyphs", "drawBoldTextInBrightColors", "letterSpacing", "lineHeight", "fontFamily", "fontSize", "fontWeight", "fontWeightBold", "minimumContrastRatio", "rescaleOverlappingGlyphs"], () => {
      this.clear(), this.handleResize(a.cols, a.rows), this._fullRefresh();
    })), this._register(this._optionsService.onMultipleOptionChange(["cursorBlink", "cursorStyle"], () => this.refreshRows(a.buffer.y, a.buffer.y, true))), this._register(h2.onChangeColors(() => this._fullRefresh())), this._registerIntersectionObserver(this._coreBrowserService.window, i), this._register(this._coreBrowserService.onWindowChange((c) => this._registerIntersectionObserver(c, i)));
  }
  get dimensions() {
    return this._renderer.value.dimensions;
  }
  _registerIntersectionObserver(e, i) {
    if ("IntersectionObserver" in e) {
      let r5 = new e.IntersectionObserver((n) => this._handleIntersectionChange(n[n.length - 1]), { threshold: 0 });
      r5.observe(i), this._observerDisposable.value = C(() => r5.disconnect());
    }
  }
  _handleIntersectionChange(e) {
    this._isPaused = e.isIntersecting === void 0 ? e.intersectionRatio === 0 : !e.isIntersecting, !this._isPaused && !this._charSizeService.hasValidSize && this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = false);
  }
  refreshRows(e, i, r5 = false) {
    if (this._isPaused) {
      this._needsFullRefresh = true;
      return;
    }
    if (this._coreService.decPrivateModes.synchronizedOutput) {
      this._syncOutputHandler.bufferRows(e, i);
      return;
    }
    let n = this._syncOutputHandler.flush();
    n && (e = Math.min(e, n.start), i = Math.max(i, n.end)), r5 || (this._isNextRenderRedrawOnly = false), this._renderDebouncer.refresh(e, i, this._rowCount);
  }
  _renderRows(e, i) {
    if (this._renderer.value) {
      if (this._coreService.decPrivateModes.synchronizedOutput) {
        this._syncOutputHandler.bufferRows(e, i);
        return;
      }
      e = Math.min(e, this._rowCount - 1), i = Math.min(i, this._rowCount - 1), this._renderer.value.renderRows(e, i), this._needsSelectionRefresh && (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = false), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({ start: e, end: i }), this._onRender.fire({ start: e, end: i }), this._isNextRenderRedrawOnly = true;
    }
  }
  resize(e, i) {
    this._rowCount = i, this._fireOnCanvasResize();
  }
  _handleOptionsChanged() {
    this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
  }
  _fireOnCanvasResize() {
    this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
  }
  hasRenderer() {
    return !!this._renderer.value;
  }
  setRenderer(e) {
    this._renderer.value = e, this._renderer.value && (this._renderer.value.onRequestRedraw((i) => this.refreshRows(i.start, i.end, true)), this._needsSelectionRefresh = true, this._fullRefresh());
  }
  addRefreshCallback(e) {
    return this._renderDebouncer.addRefreshCallback(e);
  }
  _fullRefresh() {
    this._isPaused ? this._needsFullRefresh = true : this.refreshRows(0, this._rowCount - 1);
  }
  clearTextureAtlas() {
    this._renderer.value && (this._renderer.value.clearTextureAtlas?.(), this._fullRefresh());
  }
  handleDevicePixelRatioChange() {
    this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
  }
  handleResize(e, i) {
    this._renderer.value && (this._isPaused ? this._pausedResizeTask.set(() => this._renderer.value?.handleResize(e, i)) : this._renderer.value.handleResize(e, i), this._fullRefresh());
  }
  handleCharSizeChanged() {
    this._renderer.value?.handleCharSizeChanged();
  }
  handleBlur() {
    this._renderer.value?.handleBlur();
  }
  handleFocus() {
    this._renderer.value?.handleFocus();
  }
  handleSelectionChanged(e, i, r5) {
    this._selectionState.start = e, this._selectionState.end = i, this._selectionState.columnSelectMode = r5, this._renderer.value?.handleSelectionChanged(e, i, r5);
  }
  handleCursorMove() {
    this._renderer.value?.handleCursorMove();
  }
  clear() {
    this._renderer.value?.clear();
  }
};
Qt = M([S(2, H), S(3, nt), S(4, ge), S(5, Be), S(6, F), S(7, ae), S(8, Re)], Qt);
var xs = class {
  constructor(t, e, i) {
    this._coreBrowserService = t;
    this._coreService = e;
    this._onTimeout = i;
    this._start = 0;
    this._end = 0;
    this._isBuffering = false;
  }
  bufferRows(t, e) {
    this._isBuffering ? (this._start = Math.min(this._start, t), this._end = Math.max(this._end, e)) : (this._start = t, this._end = e, this._isBuffering = true), this._timeout === void 0 && (this._timeout = this._coreBrowserService.window.setTimeout(() => {
      this._timeout = void 0, this._coreService.decPrivateModes.synchronizedOutput = false, this._onTimeout();
    }, 1e3));
  }
  flush() {
    if (this._timeout !== void 0 && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0), !this._isBuffering) return;
    let t = { start: this._start, end: this._end };
    return this._isBuffering = false, t;
  }
  dispose() {
    this._timeout !== void 0 && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0);
  }
};
function Jo(s15, t, e, i) {
  let r5 = e.buffer.x, n = e.buffer.y;
  if (!e.buffer.hasScrollback) return Ga(r5, n, s15, t, e, i) + sn(n, t, e, i) + $a(r5, n, s15, t, e, i);
  let o2;
  if (n === t) return o2 = r5 > s15 ? "D" : "C", Fi(Math.abs(r5 - s15), Ni(o2, i));
  o2 = n > t ? "D" : "C";
  let l = Math.abs(n - t), a = za(n > t ? s15 : r5, e) + (l - 1) * e.cols + 1 + Ka(n > t ? r5 : s15, e);
  return Fi(a, Ni(o2, i));
}
function Ka(s15, t) {
  return s15 - 1;
}
function za(s15, t) {
  return t.cols - s15;
}
function Ga(s15, t, e, i, r5, n) {
  return sn(t, i, r5, n).length === 0 ? "" : Fi(el(s15, t, s15, t - gt(t, r5), false, r5).length, Ni("D", n));
}
function sn(s15, t, e, i) {
  let r5 = s15 - gt(s15, e), n = t - gt(t, e), o2 = Math.abs(r5 - n) - Va(s15, t, e);
  return Fi(o2, Ni(Qo(s15, t), i));
}
function $a(s15, t, e, i, r5, n) {
  let o2;
  sn(t, i, r5, n).length > 0 ? o2 = i - gt(i, r5) : o2 = t;
  let l = i, a = qa(s15, t, e, i, r5, n);
  return Fi(el(s15, o2, e, l, a === "C", r5).length, Ni(a, n));
}
function Va(s15, t, e) {
  let i = 0, r5 = s15 - gt(s15, e), n = t - gt(t, e);
  for (let o2 = 0; o2 < Math.abs(r5 - n); o2++) {
    let l = Qo(s15, t) === "A" ? -1 : 1;
    e.buffer.lines.get(r5 + l * o2)?.isWrapped && i++;
  }
  return i;
}
function gt(s15, t) {
  let e = 0, i = t.buffer.lines.get(s15), r5 = i?.isWrapped;
  for (; r5 && s15 >= 0 && s15 < t.rows; ) e++, i = t.buffer.lines.get(--s15), r5 = i?.isWrapped;
  return e;
}
function qa(s15, t, e, i, r5, n) {
  let o2;
  return sn(e, i, r5, n).length > 0 ? o2 = i - gt(i, r5) : o2 = t, s15 < e && o2 <= i || s15 >= e && o2 < i ? "C" : "D";
}
function Qo(s15, t) {
  return s15 > t ? "A" : "B";
}
function el(s15, t, e, i, r5, n) {
  let o2 = s15, l = t, a = "";
  for (; (o2 !== e || l !== i) && l >= 0 && l < n.buffer.lines.length; ) o2 += r5 ? 1 : -1, r5 && o2 > n.cols - 1 ? (a += n.buffer.translateBufferLineToString(l, false, s15, o2), o2 = 0, s15 = 0, l++) : !r5 && o2 < 0 && (a += n.buffer.translateBufferLineToString(l, false, 0, s15 + 1), o2 = n.cols - 1, s15 = o2, l--);
  return a + n.buffer.translateBufferLineToString(l, false, s15, o2);
}
function Ni(s15, t) {
  let e = t ? "O" : "[";
  return b.ESC + e + s15;
}
function Fi(s15, t) {
  s15 = Math.floor(s15);
  let e = "";
  for (let i = 0; i < s15; i++) e += t;
  return e;
}
var on = class {
  constructor(t) {
    this._bufferService = t;
    this.isSelectAllActive = false;
    this.selectionStartLength = 0;
  }
  clearSelection() {
    this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = false, this.selectionStartLength = 0;
  }
  get finalSelectionStart() {
    return this.isSelectAllActive ? [0, 0] : !this.selectionEnd || !this.selectionStart ? this.selectionStart : this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
  }
  get finalSelectionEnd() {
    if (this.isSelectAllActive) return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
    if (this.selectionStart) {
      if (!this.selectionEnd || this.areSelectionValuesReversed()) {
        let t = this.selectionStart[0] + this.selectionStartLength;
        return t > this._bufferService.cols ? t % this._bufferService.cols === 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(t / this._bufferService.cols) - 1] : [t % this._bufferService.cols, this.selectionStart[1] + Math.floor(t / this._bufferService.cols)] : [t, this.selectionStart[1]];
      }
      if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
        let t = this.selectionStart[0] + this.selectionStartLength;
        return t > this._bufferService.cols ? [t % this._bufferService.cols, this.selectionStart[1] + Math.floor(t / this._bufferService.cols)] : [Math.max(t, this.selectionEnd[0]), this.selectionEnd[1]];
      }
      return this.selectionEnd;
    }
  }
  areSelectionValuesReversed() {
    let t = this.selectionStart, e = this.selectionEnd;
    return !t || !e ? false : t[1] > e[1] || t[1] === e[1] && t[0] > e[0];
  }
  handleTrim(t) {
    return this.selectionStart && (this.selectionStart[1] -= t), this.selectionEnd && (this.selectionEnd[1] -= t), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), true) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), false);
  }
};
function ws(s15, t) {
  if (s15.start.y > s15.end.y) throw new Error(`Buffer range end (${s15.end.x}, ${s15.end.y}) cannot be before start (${s15.start.x}, ${s15.start.y})`);
  return t * (s15.end.y - s15.start.y) + (s15.end.x - s15.start.x + 1);
}
var Ds = 50;
var Ya = 15;
var ja = 50;
var Xa = 500;
var Za = "\xA0";
var Ja = new RegExp(Za, "g");
var ei = class extends D {
  constructor(e, i, r5, n, o2, l, a, u, h2) {
    super();
    this._element = e;
    this._screenElement = i;
    this._linkifier = r5;
    this._bufferService = n;
    this._coreService = o2;
    this._mouseService = l;
    this._optionsService = a;
    this._renderService = u;
    this._coreBrowserService = h2;
    this._dragScrollAmount = 0;
    this._enabled = true;
    this._workCell = new q();
    this._mouseDownTimeStamp = 0;
    this._oldHasSelection = false;
    this._oldSelectionStart = void 0;
    this._oldSelectionEnd = void 0;
    this._onLinuxMouseSelection = this._register(new v());
    this.onLinuxMouseSelection = this._onLinuxMouseSelection.event;
    this._onRedrawRequest = this._register(new v());
    this.onRequestRedraw = this._onRedrawRequest.event;
    this._onSelectionChange = this._register(new v());
    this.onSelectionChange = this._onSelectionChange.event;
    this._onRequestScrollLines = this._register(new v());
    this.onRequestScrollLines = this._onRequestScrollLines.event;
    this._mouseMoveListener = (c) => this._handleMouseMove(c), this._mouseUpListener = (c) => this._handleMouseUp(c), this._coreService.onUserInput(() => {
      this.hasSelection && this.clearSelection();
    }), this._trimListener = this._bufferService.buffer.lines.onTrim((c) => this._handleTrim(c)), this._register(this._bufferService.buffers.onBufferActivate((c) => this._handleBufferActivate(c))), this.enable(), this._model = new on(this._bufferService), this._activeSelectionMode = 0, this._register(C(() => {
      this._removeMouseDownListeners();
    })), this._register(this._bufferService.onResize((c) => {
      c.rowsChanged && this.clearSelection();
    }));
  }
  reset() {
    this.clearSelection();
  }
  disable() {
    this.clearSelection(), this._enabled = false;
  }
  enable() {
    this._enabled = true;
  }
  get selectionStart() {
    return this._model.finalSelectionStart;
  }
  get selectionEnd() {
    return this._model.finalSelectionEnd;
  }
  get hasSelection() {
    let e = this._model.finalSelectionStart, i = this._model.finalSelectionEnd;
    return !e || !i ? false : e[0] !== i[0] || e[1] !== i[1];
  }
  get selectionText() {
    let e = this._model.finalSelectionStart, i = this._model.finalSelectionEnd;
    if (!e || !i) return "";
    let r5 = this._bufferService.buffer, n = [];
    if (this._activeSelectionMode === 3) {
      if (e[0] === i[0]) return "";
      let l = e[0] < i[0] ? e[0] : i[0], a = e[0] < i[0] ? i[0] : e[0];
      for (let u = e[1]; u <= i[1]; u++) {
        let h2 = r5.translateBufferLineToString(u, true, l, a);
        n.push(h2);
      }
    } else {
      let l = e[1] === i[1] ? i[0] : void 0;
      n.push(r5.translateBufferLineToString(e[1], true, e[0], l));
      for (let a = e[1] + 1; a <= i[1] - 1; a++) {
        let u = r5.lines.get(a), h2 = r5.translateBufferLineToString(a, true);
        u?.isWrapped ? n[n.length - 1] += h2 : n.push(h2);
      }
      if (e[1] !== i[1]) {
        let a = r5.lines.get(i[1]), u = r5.translateBufferLineToString(i[1], true, 0, i[0]);
        a && a.isWrapped ? n[n.length - 1] += u : n.push(u);
      }
    }
    return n.map((l) => l.replace(Ja, " ")).join(Es ? `\r
` : `
`);
  }
  clearSelection() {
    this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
  }
  refresh(e) {
    this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._refresh())), Bi && e && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
  }
  _refresh() {
    this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({ start: this._model.finalSelectionStart, end: this._model.finalSelectionEnd, columnSelectMode: this._activeSelectionMode === 3 });
  }
  _isClickInSelection(e) {
    let i = this._getMouseBufferCoords(e), r5 = this._model.finalSelectionStart, n = this._model.finalSelectionEnd;
    return !r5 || !n || !i ? false : this._areCoordsInSelection(i, r5, n);
  }
  isCellInSelection(e, i) {
    let r5 = this._model.finalSelectionStart, n = this._model.finalSelectionEnd;
    return !r5 || !n ? false : this._areCoordsInSelection([e, i], r5, n);
  }
  _areCoordsInSelection(e, i, r5) {
    return e[1] > i[1] && e[1] < r5[1] || i[1] === r5[1] && e[1] === i[1] && e[0] >= i[0] && e[0] < r5[0] || i[1] < r5[1] && e[1] === r5[1] && e[0] < r5[0] || i[1] < r5[1] && e[1] === i[1] && e[0] >= i[0];
  }
  _selectWordAtCursor(e, i) {
    let r5 = this._linkifier.currentLink?.link?.range;
    if (r5) return this._model.selectionStart = [r5.start.x - 1, r5.start.y - 1], this._model.selectionStartLength = ws(r5, this._bufferService.cols), this._model.selectionEnd = void 0, true;
    let n = this._getMouseBufferCoords(e);
    return n ? (this._selectWordAt(n, i), this._model.selectionEnd = void 0, true) : false;
  }
  selectAll() {
    this._model.isSelectAllActive = true, this.refresh(), this._onSelectionChange.fire();
  }
  selectLines(e, i) {
    this._model.clearSelection(), e = Math.max(e, 0), i = Math.min(i, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, e], this._model.selectionEnd = [this._bufferService.cols, i], this.refresh(), this._onSelectionChange.fire();
  }
  _handleTrim(e) {
    this._model.handleTrim(e) && this.refresh();
  }
  _getMouseBufferCoords(e) {
    let i = this._mouseService.getCoords(e, this._screenElement, this._bufferService.cols, this._bufferService.rows, true);
    if (i) return i[0]--, i[1]--, i[1] += this._bufferService.buffer.ydisp, i;
  }
  _getMouseEventScrollAmount(e) {
    let i = Ci(this._coreBrowserService.window, e, this._screenElement)[1], r5 = this._renderService.dimensions.css.canvas.height;
    return i >= 0 && i <= r5 ? 0 : (i > r5 && (i -= r5), i = Math.min(Math.max(i, -Ds), Ds), i /= Ds, i / Math.abs(i) + Math.round(i * (Ya - 1)));
  }
  shouldForceSelection(e) {
    return Zt ? e.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e.shiftKey;
  }
  handleMouseDown(e) {
    if (this._mouseDownTimeStamp = e.timeStamp, !(e.button === 2 && this.hasSelection) && e.button === 0) {
      if (!this._enabled) {
        if (!this.shouldForceSelection(e)) return;
        e.stopPropagation();
      }
      e.preventDefault(), this._dragScrollAmount = 0, this._enabled && e.shiftKey ? this._handleIncrementalClick(e) : e.detail === 1 ? this._handleSingleClick(e) : e.detail === 2 ? this._handleDoubleClick(e) : e.detail === 3 && this._handleTripleClick(e), this._addMouseDownListeners(), this.refresh(true);
    }
  }
  _addMouseDownListeners() {
    this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(() => this._dragScroll(), ja);
  }
  _removeMouseDownListeners() {
    this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
  }
  _handleIncrementalClick(e) {
    this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e));
  }
  _handleSingleClick(e) {
    if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = false, this._activeSelectionMode = this.shouldColumnSelect(e) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e), !this._model.selectionStart) return;
    this._model.selectionEnd = void 0;
    let i = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
    i && i.length !== this._model.selectionStart[0] && i.hasWidth(this._model.selectionStart[0]) === 0 && this._model.selectionStart[0]++;
  }
  _handleDoubleClick(e) {
    this._selectWordAtCursor(e, true) && (this._activeSelectionMode = 1);
  }
  _handleTripleClick(e) {
    let i = this._getMouseBufferCoords(e);
    i && (this._activeSelectionMode = 2, this._selectLineAt(i[1]));
  }
  shouldColumnSelect(e) {
    return e.altKey && !(Zt && this._optionsService.rawOptions.macOptionClickForcesSelection);
  }
  _handleMouseMove(e) {
    if (e.stopImmediatePropagation(), !this._model.selectionStart) return;
    let i = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
    if (this._model.selectionEnd = this._getMouseBufferCoords(e), !this._model.selectionEnd) {
      this.refresh(true);
      return;
    }
    this._activeSelectionMode === 2 ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : this._activeSelectionMode === 1 && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e), this._activeSelectionMode !== 3 && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
    let r5 = this._bufferService.buffer;
    if (this._model.selectionEnd[1] < r5.lines.length) {
      let n = r5.lines.get(this._model.selectionEnd[1]);
      n && n.hasWidth(this._model.selectionEnd[0]) === 0 && this._model.selectionEnd[0] < this._bufferService.cols && this._model.selectionEnd[0]++;
    }
    (!i || i[0] !== this._model.selectionEnd[0] || i[1] !== this._model.selectionEnd[1]) && this.refresh(true);
  }
  _dragScroll() {
    if (!(!this._model.selectionEnd || !this._model.selectionStart) && this._dragScrollAmount) {
      this._onRequestScrollLines.fire({ amount: this._dragScrollAmount, suppressScrollEvent: false });
      let e = this._bufferService.buffer;
      this._dragScrollAmount > 0 ? (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e.ydisp + this._bufferService.rows, e.lines.length - 1)) : (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e.ydisp), this.refresh();
    }
  }
  _handleMouseUp(e) {
    let i = e.timeStamp - this._mouseDownTimeStamp;
    if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && i < Xa && e.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
      if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
        let r5 = this._mouseService.getCoords(e, this._element, this._bufferService.cols, this._bufferService.rows, false);
        if (r5 && r5[0] !== void 0 && r5[1] !== void 0) {
          let n = Jo(r5[0] - 1, r5[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
          this._coreService.triggerDataEvent(n, true);
        }
      }
    } else this._fireEventIfSelectionChanged();
  }
  _fireEventIfSelectionChanged() {
    let e = this._model.finalSelectionStart, i = this._model.finalSelectionEnd, r5 = !!e && !!i && (e[0] !== i[0] || e[1] !== i[1]);
    if (!r5) {
      this._oldHasSelection && this._fireOnSelectionChange(e, i, r5);
      return;
    }
    !e || !i || (!this._oldSelectionStart || !this._oldSelectionEnd || e[0] !== this._oldSelectionStart[0] || e[1] !== this._oldSelectionStart[1] || i[0] !== this._oldSelectionEnd[0] || i[1] !== this._oldSelectionEnd[1]) && this._fireOnSelectionChange(e, i, r5);
  }
  _fireOnSelectionChange(e, i, r5) {
    this._oldSelectionStart = e, this._oldSelectionEnd = i, this._oldHasSelection = r5, this._onSelectionChange.fire();
  }
  _handleBufferActivate(e) {
    this.clearSelection(), this._trimListener.dispose(), this._trimListener = e.activeBuffer.lines.onTrim((i) => this._handleTrim(i));
  }
  _convertViewportColToCharacterIndex(e, i) {
    let r5 = i;
    for (let n = 0; i >= n; n++) {
      let o2 = e.loadCell(n, this._workCell).getChars().length;
      this._workCell.getWidth() === 0 ? r5-- : o2 > 1 && i !== n && (r5 += o2 - 1);
    }
    return r5;
  }
  setSelection(e, i, r5) {
    this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [e, i], this._model.selectionStartLength = r5, this.refresh(), this._fireEventIfSelectionChanged();
  }
  rightClickSelect(e) {
    this._isClickInSelection(e) || (this._selectWordAtCursor(e, false) && this.refresh(true), this._fireEventIfSelectionChanged());
  }
  _getWordAt(e, i, r5 = true, n = true) {
    if (e[0] >= this._bufferService.cols) return;
    let o2 = this._bufferService.buffer, l = o2.lines.get(e[1]);
    if (!l) return;
    let a = o2.translateBufferLineToString(e[1], false), u = this._convertViewportColToCharacterIndex(l, e[0]), h2 = u, c = e[0] - u, d = 0, _3 = 0, p = 0, m = 0;
    if (a.charAt(u) === " ") {
      for (; u > 0 && a.charAt(u - 1) === " "; ) u--;
      for (; h2 < a.length && a.charAt(h2 + 1) === " "; ) h2++;
    } else {
      let R3 = e[0], O2 = e[0];
      l.getWidth(R3) === 0 && (d++, R3--), l.getWidth(O2) === 2 && (_3++, O2++);
      let I2 = l.getString(O2).length;
      for (I2 > 1 && (m += I2 - 1, h2 += I2 - 1); R3 > 0 && u > 0 && !this._isCharWordSeparator(l.loadCell(R3 - 1, this._workCell)); ) {
        l.loadCell(R3 - 1, this._workCell);
        let k = this._workCell.getChars().length;
        this._workCell.getWidth() === 0 ? (d++, R3--) : k > 1 && (p += k - 1, u -= k - 1), u--, R3--;
      }
      for (; O2 < l.length && h2 + 1 < a.length && !this._isCharWordSeparator(l.loadCell(O2 + 1, this._workCell)); ) {
        l.loadCell(O2 + 1, this._workCell);
        let k = this._workCell.getChars().length;
        this._workCell.getWidth() === 2 ? (_3++, O2++) : k > 1 && (m += k - 1, h2 += k - 1), h2++, O2++;
      }
    }
    h2++;
    let f = u + c - d + p, A2 = Math.min(this._bufferService.cols, h2 - u + d + _3 - p - m);
    if (!(!i && a.slice(u, h2).trim() === "")) {
      if (r5 && f === 0 && l.getCodePoint(0) !== 32) {
        let R3 = o2.lines.get(e[1] - 1);
        if (R3 && l.isWrapped && R3.getCodePoint(this._bufferService.cols - 1) !== 32) {
          let O2 = this._getWordAt([this._bufferService.cols - 1, e[1] - 1], false, true, false);
          if (O2) {
            let I2 = this._bufferService.cols - O2.start;
            f -= I2, A2 += I2;
          }
        }
      }
      if (n && f + A2 === this._bufferService.cols && l.getCodePoint(this._bufferService.cols - 1) !== 32) {
        let R3 = o2.lines.get(e[1] + 1);
        if (R3?.isWrapped && R3.getCodePoint(0) !== 32) {
          let O2 = this._getWordAt([0, e[1] + 1], false, false, true);
          O2 && (A2 += O2.length);
        }
      }
      return { start: f, length: A2 };
    }
  }
  _selectWordAt(e, i) {
    let r5 = this._getWordAt(e, i);
    if (r5) {
      for (; r5.start < 0; ) r5.start += this._bufferService.cols, e[1]--;
      this._model.selectionStart = [r5.start, e[1]], this._model.selectionStartLength = r5.length;
    }
  }
  _selectToWordAt(e) {
    let i = this._getWordAt(e, true);
    if (i) {
      let r5 = e[1];
      for (; i.start < 0; ) i.start += this._bufferService.cols, r5--;
      if (!this._model.areSelectionValuesReversed()) for (; i.start + i.length > this._bufferService.cols; ) i.length -= this._bufferService.cols, r5++;
      this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? i.start : i.start + i.length, r5];
    }
  }
  _isCharWordSeparator(e) {
    return e.getWidth() === 0 ? false : this._optionsService.rawOptions.wordSeparator.indexOf(e.getChars()) >= 0;
  }
  _selectLineAt(e) {
    let i = this._bufferService.buffer.getWrappedRangeForLine(e), r5 = { start: { x: 0, y: i.first }, end: { x: this._bufferService.cols - 1, y: i.last } };
    this._model.selectionStart = [0, i.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = ws(r5, this._bufferService.cols);
  }
};
ei = M([S(3, F), S(4, ge), S(5, Dt), S(6, H), S(7, ce), S(8, ae)], ei);
var Hi = class {
  constructor() {
    this._data = {};
  }
  set(t, e, i) {
    this._data[t] || (this._data[t] = {}), this._data[t][e] = i;
  }
  get(t, e) {
    return this._data[t] ? this._data[t][e] : void 0;
  }
  clear() {
    this._data = {};
  }
};
var Wi = class {
  constructor() {
    this._color = new Hi();
    this._css = new Hi();
  }
  setCss(t, e, i) {
    this._css.set(t, e, i);
  }
  getCss(t, e) {
    return this._css.get(t, e);
  }
  setColor(t, e, i) {
    this._color.set(t, e, i);
  }
  getColor(t, e) {
    return this._color.get(t, e);
  }
  clear() {
    this._color.clear(), this._css.clear();
  }
};
var re = Object.freeze((() => {
  let s15 = [z.toColor("#2e3436"), z.toColor("#cc0000"), z.toColor("#4e9a06"), z.toColor("#c4a000"), z.toColor("#3465a4"), z.toColor("#75507b"), z.toColor("#06989a"), z.toColor("#d3d7cf"), z.toColor("#555753"), z.toColor("#ef2929"), z.toColor("#8ae234"), z.toColor("#fce94f"), z.toColor("#729fcf"), z.toColor("#ad7fa8"), z.toColor("#34e2e2"), z.toColor("#eeeeec")], t = [0, 95, 135, 175, 215, 255];
  for (let e = 0; e < 216; e++) {
    let i = t[e / 36 % 6 | 0], r5 = t[e / 6 % 6 | 0], n = t[e % 6];
    s15.push({ css: j.toCss(i, r5, n), rgba: j.toRgba(i, r5, n) });
  }
  for (let e = 0; e < 24; e++) {
    let i = 8 + e * 10;
    s15.push({ css: j.toCss(i, i, i), rgba: j.toRgba(i, i, i) });
  }
  return s15;
})());
var St = z.toColor("#ffffff");
var Ki = z.toColor("#000000");
var tl = z.toColor("#ffffff");
var il = Ki;
var Ui = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967117 };
var Qa = St;
var ti = class extends D {
  constructor(e) {
    super();
    this._optionsService = e;
    this._contrastCache = new Wi();
    this._halfContrastCache = new Wi();
    this._onChangeColors = this._register(new v());
    this.onChangeColors = this._onChangeColors.event;
    this._colors = { foreground: St, background: Ki, cursor: tl, cursorAccent: il, selectionForeground: void 0, selectionBackgroundTransparent: Ui, selectionBackgroundOpaque: U.blend(Ki, Ui), selectionInactiveBackgroundTransparent: Ui, selectionInactiveBackgroundOpaque: U.blend(Ki, Ui), scrollbarSliderBackground: U.opacity(St, 0.2), scrollbarSliderHoverBackground: U.opacity(St, 0.4), scrollbarSliderActiveBackground: U.opacity(St, 0.5), overviewRulerBorder: St, ansi: re.slice(), contrastCache: this._contrastCache, halfContrastCache: this._halfContrastCache }, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this._register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", () => this._contrastCache.clear())), this._register(this._optionsService.onSpecificOptionChange("theme", () => this._setTheme(this._optionsService.rawOptions.theme)));
  }
  get colors() {
    return this._colors;
  }
  _setTheme(e = {}) {
    let i = this._colors;
    if (i.foreground = K(e.foreground, St), i.background = K(e.background, Ki), i.cursor = U.blend(i.background, K(e.cursor, tl)), i.cursorAccent = U.blend(i.background, K(e.cursorAccent, il)), i.selectionBackgroundTransparent = K(e.selectionBackground, Ui), i.selectionBackgroundOpaque = U.blend(i.background, i.selectionBackgroundTransparent), i.selectionInactiveBackgroundTransparent = K(e.selectionInactiveBackground, i.selectionBackgroundTransparent), i.selectionInactiveBackgroundOpaque = U.blend(i.background, i.selectionInactiveBackgroundTransparent), i.selectionForeground = e.selectionForeground ? K(e.selectionForeground, ps) : void 0, i.selectionForeground === ps && (i.selectionForeground = void 0), U.isOpaque(i.selectionBackgroundTransparent) && (i.selectionBackgroundTransparent = U.opacity(i.selectionBackgroundTransparent, 0.3)), U.isOpaque(i.selectionInactiveBackgroundTransparent) && (i.selectionInactiveBackgroundTransparent = U.opacity(i.selectionInactiveBackgroundTransparent, 0.3)), i.scrollbarSliderBackground = K(e.scrollbarSliderBackground, U.opacity(i.foreground, 0.2)), i.scrollbarSliderHoverBackground = K(e.scrollbarSliderHoverBackground, U.opacity(i.foreground, 0.4)), i.scrollbarSliderActiveBackground = K(e.scrollbarSliderActiveBackground, U.opacity(i.foreground, 0.5)), i.overviewRulerBorder = K(e.overviewRulerBorder, Qa), i.ansi = re.slice(), i.ansi[0] = K(e.black, re[0]), i.ansi[1] = K(e.red, re[1]), i.ansi[2] = K(e.green, re[2]), i.ansi[3] = K(e.yellow, re[3]), i.ansi[4] = K(e.blue, re[4]), i.ansi[5] = K(e.magenta, re[5]), i.ansi[6] = K(e.cyan, re[6]), i.ansi[7] = K(e.white, re[7]), i.ansi[8] = K(e.brightBlack, re[8]), i.ansi[9] = K(e.brightRed, re[9]), i.ansi[10] = K(e.brightGreen, re[10]), i.ansi[11] = K(e.brightYellow, re[11]), i.ansi[12] = K(e.brightBlue, re[12]), i.ansi[13] = K(e.brightMagenta, re[13]), i.ansi[14] = K(e.brightCyan, re[14]), i.ansi[15] = K(e.brightWhite, re[15]), e.extendedAnsi) {
      let r5 = Math.min(i.ansi.length - 16, e.extendedAnsi.length);
      for (let n = 0; n < r5; n++) i.ansi[n + 16] = K(e.extendedAnsi[n], re[n + 16]);
    }
    this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
  }
  restoreColor(e) {
    this._restoreColor(e), this._onChangeColors.fire(this.colors);
  }
  _restoreColor(e) {
    if (e === void 0) {
      for (let i = 0; i < this._restoreColors.ansi.length; ++i) this._colors.ansi[i] = this._restoreColors.ansi[i];
      return;
    }
    switch (e) {
      case 256:
        this._colors.foreground = this._restoreColors.foreground;
        break;
      case 257:
        this._colors.background = this._restoreColors.background;
        break;
      case 258:
        this._colors.cursor = this._restoreColors.cursor;
        break;
      default:
        this._colors.ansi[e] = this._restoreColors.ansi[e];
    }
  }
  modifyColors(e) {
    e(this._colors), this._onChangeColors.fire(this.colors);
  }
  _updateRestoreColors() {
    this._restoreColors = { foreground: this._colors.foreground, background: this._colors.background, cursor: this._colors.cursor, ansi: this._colors.ansi.slice() };
  }
};
ti = M([S(0, H)], ti);
function K(s15, t) {
  if (s15 !== void 0) try {
    return z.toColor(s15);
  } catch {
  }
  return t;
}
var Rs = class {
  constructor(...t) {
    this._entries = /* @__PURE__ */ new Map();
    for (let [e, i] of t) this.set(e, i);
  }
  set(t, e) {
    let i = this._entries.get(t);
    return this._entries.set(t, e), i;
  }
  forEach(t) {
    for (let [e, i] of this._entries.entries()) t(e, i);
  }
  has(t) {
    return this._entries.has(t);
  }
  get(t) {
    return this._entries.get(t);
  }
};
var ln = class {
  constructor() {
    this._services = new Rs();
    this._services.set(xt, this);
  }
  setService(t, e) {
    this._services.set(t, e);
  }
  getService(t) {
    return this._services.get(t);
  }
  createInstance(t, ...e) {
    let i = Xs(t).sort((o2, l) => o2.index - l.index), r5 = [];
    for (let o2 of i) {
      let l = this._services.get(o2.id);
      if (!l) throw new Error(`[createInstance] ${t.name} depends on UNKNOWN service ${o2.id._id}.`);
      r5.push(l);
    }
    let n = i.length > 0 ? i[0].index : e.length;
    if (e.length !== n) throw new Error(`[createInstance] First service dependency of ${t.name} at position ${n + 1} conflicts with ${e.length} static arguments`);
    return new t(...e, ...r5);
  }
};
var ec = { trace: 0, debug: 1, info: 2, warn: 3, error: 4, off: 5 };
var tc = "xterm.js: ";
var ii = class extends D {
  constructor(e) {
    super();
    this._optionsService = e;
    this._logLevel = 5;
    this._updateLogLevel(), this._register(this._optionsService.onSpecificOptionChange("logLevel", () => this._updateLogLevel())), ic = this;
  }
  get logLevel() {
    return this._logLevel;
  }
  _updateLogLevel() {
    this._logLevel = ec[this._optionsService.rawOptions.logLevel];
  }
  _evalLazyOptionalParams(e) {
    for (let i = 0; i < e.length; i++) typeof e[i] == "function" && (e[i] = e[i]());
  }
  _log(e, i, r5) {
    this._evalLazyOptionalParams(r5), e.call(console, (this._optionsService.options.logger ? "" : tc) + i, ...r5);
  }
  trace(e, ...i) {
    this._logLevel <= 0 && this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger) ?? console.log, e, i);
  }
  debug(e, ...i) {
    this._logLevel <= 1 && this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger) ?? console.log, e, i);
  }
  info(e, ...i) {
    this._logLevel <= 2 && this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger) ?? console.info, e, i);
  }
  warn(e, ...i) {
    this._logLevel <= 3 && this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger) ?? console.warn, e, i);
  }
  error(e, ...i) {
    this._logLevel <= 4 && this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger) ?? console.error, e, i);
  }
};
ii = M([S(0, H)], ii);
var ic;
var zi = class extends D {
  constructor(e) {
    super();
    this._maxLength = e;
    this.onDeleteEmitter = this._register(new v());
    this.onDelete = this.onDeleteEmitter.event;
    this.onInsertEmitter = this._register(new v());
    this.onInsert = this.onInsertEmitter.event;
    this.onTrimEmitter = this._register(new v());
    this.onTrim = this.onTrimEmitter.event;
    this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
  }
  get maxLength() {
    return this._maxLength;
  }
  set maxLength(e) {
    if (this._maxLength === e) return;
    let i = new Array(e);
    for (let r5 = 0; r5 < Math.min(e, this.length); r5++) i[r5] = this._array[this._getCyclicIndex(r5)];
    this._array = i, this._maxLength = e, this._startIndex = 0;
  }
  get length() {
    return this._length;
  }
  set length(e) {
    if (e > this._length) for (let i = this._length; i < e; i++) this._array[i] = void 0;
    this._length = e;
  }
  get(e) {
    return this._array[this._getCyclicIndex(e)];
  }
  set(e, i) {
    this._array[this._getCyclicIndex(e)] = i;
  }
  push(e) {
    this._array[this._getCyclicIndex(this._length)] = e, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
  }
  recycle() {
    if (this._length !== this._maxLength) throw new Error("Can only recycle when the buffer is full");
    return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
  }
  get isFull() {
    return this._length === this._maxLength;
  }
  pop() {
    return this._array[this._getCyclicIndex(this._length-- - 1)];
  }
  splice(e, i, ...r5) {
    if (i) {
      for (let n = e; n < this._length - i; n++) this._array[this._getCyclicIndex(n)] = this._array[this._getCyclicIndex(n + i)];
      this._length -= i, this.onDeleteEmitter.fire({ index: e, amount: i });
    }
    for (let n = this._length - 1; n >= e; n--) this._array[this._getCyclicIndex(n + r5.length)] = this._array[this._getCyclicIndex(n)];
    for (let n = 0; n < r5.length; n++) this._array[this._getCyclicIndex(e + n)] = r5[n];
    if (r5.length && this.onInsertEmitter.fire({ index: e, amount: r5.length }), this._length + r5.length > this._maxLength) {
      let n = this._length + r5.length - this._maxLength;
      this._startIndex += n, this._length = this._maxLength, this.onTrimEmitter.fire(n);
    } else this._length += r5.length;
  }
  trimStart(e) {
    e > this._length && (e = this._length), this._startIndex += e, this._length -= e, this.onTrimEmitter.fire(e);
  }
  shiftElements(e, i, r5) {
    if (!(i <= 0)) {
      if (e < 0 || e >= this._length) throw new Error("start argument out of range");
      if (e + r5 < 0) throw new Error("Cannot shift elements in list beyond index 0");
      if (r5 > 0) {
        for (let o2 = i - 1; o2 >= 0; o2--) this.set(e + o2 + r5, this.get(e + o2));
        let n = e + i + r5 - this._length;
        if (n > 0) for (this._length += n; this._length > this._maxLength; ) this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
      } else for (let n = 0; n < i; n++) this.set(e + n + r5, this.get(e + n));
    }
  }
  _getCyclicIndex(e) {
    return (this._startIndex + e) % this._maxLength;
  }
};
var B = 3;
var X2 = Object.freeze(new De());
var an = 0;
var Ls = 2;
var Ze = class s12 {
  constructor(t, e, i = false) {
    this.isWrapped = i;
    this._combined = {};
    this._extendedAttrs = {};
    this._data = new Uint32Array(t * B);
    let r5 = e || q.fromCharData([0, ir, 1, 0]);
    for (let n = 0; n < t; ++n) this.setCell(n, r5);
    this.length = t;
  }
  get(t) {
    let e = this._data[t * B + 0], i = e & 2097151;
    return [this._data[t * B + 1], e & 2097152 ? this._combined[t] : i ? Ce(i) : "", e >> 22, e & 2097152 ? this._combined[t].charCodeAt(this._combined[t].length - 1) : i];
  }
  set(t, e) {
    this._data[t * B + 1] = e[0], e[1].length > 1 ? (this._combined[t] = e[1], this._data[t * B + 0] = t | 2097152 | e[2] << 22) : this._data[t * B + 0] = e[1].charCodeAt(0) | e[2] << 22;
  }
  getWidth(t) {
    return this._data[t * B + 0] >> 22;
  }
  hasWidth(t) {
    return this._data[t * B + 0] & 12582912;
  }
  getFg(t) {
    return this._data[t * B + 1];
  }
  getBg(t) {
    return this._data[t * B + 2];
  }
  hasContent(t) {
    return this._data[t * B + 0] & 4194303;
  }
  getCodePoint(t) {
    let e = this._data[t * B + 0];
    return e & 2097152 ? this._combined[t].charCodeAt(this._combined[t].length - 1) : e & 2097151;
  }
  isCombined(t) {
    return this._data[t * B + 0] & 2097152;
  }
  getString(t) {
    let e = this._data[t * B + 0];
    return e & 2097152 ? this._combined[t] : e & 2097151 ? Ce(e & 2097151) : "";
  }
  isProtected(t) {
    return this._data[t * B + 2] & 536870912;
  }
  loadCell(t, e) {
    return an = t * B, e.content = this._data[an + 0], e.fg = this._data[an + 1], e.bg = this._data[an + 2], e.content & 2097152 && (e.combinedData = this._combined[t]), e.bg & 268435456 && (e.extended = this._extendedAttrs[t]), e;
  }
  setCell(t, e) {
    e.content & 2097152 && (this._combined[t] = e.combinedData), e.bg & 268435456 && (this._extendedAttrs[t] = e.extended), this._data[t * B + 0] = e.content, this._data[t * B + 1] = e.fg, this._data[t * B + 2] = e.bg;
  }
  setCellFromCodepoint(t, e, i, r5) {
    r5.bg & 268435456 && (this._extendedAttrs[t] = r5.extended), this._data[t * B + 0] = e | i << 22, this._data[t * B + 1] = r5.fg, this._data[t * B + 2] = r5.bg;
  }
  addCodepointToCell(t, e, i) {
    let r5 = this._data[t * B + 0];
    r5 & 2097152 ? this._combined[t] += Ce(e) : r5 & 2097151 ? (this._combined[t] = Ce(r5 & 2097151) + Ce(e), r5 &= -2097152, r5 |= 2097152) : r5 = e | 1 << 22, i && (r5 &= -12582913, r5 |= i << 22), this._data[t * B + 0] = r5;
  }
  insertCells(t, e, i) {
    if (t %= this.length, t && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t - 1, 0, 1, i), e < this.length - t) {
      let r5 = new q();
      for (let n = this.length - t - e - 1; n >= 0; --n) this.setCell(t + e + n, this.loadCell(t + n, r5));
      for (let n = 0; n < e; ++n) this.setCell(t + n, i);
    } else for (let r5 = t; r5 < this.length; ++r5) this.setCell(r5, i);
    this.getWidth(this.length - 1) === 2 && this.setCellFromCodepoint(this.length - 1, 0, 1, i);
  }
  deleteCells(t, e, i) {
    if (t %= this.length, e < this.length - t) {
      let r5 = new q();
      for (let n = 0; n < this.length - t - e; ++n) this.setCell(t + n, this.loadCell(t + e + n, r5));
      for (let n = this.length - e; n < this.length; ++n) this.setCell(n, i);
    } else for (let r5 = t; r5 < this.length; ++r5) this.setCell(r5, i);
    t && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t - 1, 0, 1, i), this.getWidth(t) === 0 && !this.hasContent(t) && this.setCellFromCodepoint(t, 0, 1, i);
  }
  replaceCells(t, e, i, r5 = false) {
    if (r5) {
      for (t && this.getWidth(t - 1) === 2 && !this.isProtected(t - 1) && this.setCellFromCodepoint(t - 1, 0, 1, i), e < this.length && this.getWidth(e - 1) === 2 && !this.isProtected(e) && this.setCellFromCodepoint(e, 0, 1, i); t < e && t < this.length; ) this.isProtected(t) || this.setCell(t, i), t++;
      return;
    }
    for (t && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t - 1, 0, 1, i), e < this.length && this.getWidth(e - 1) === 2 && this.setCellFromCodepoint(e, 0, 1, i); t < e && t < this.length; ) this.setCell(t++, i);
  }
  resize(t, e) {
    if (t === this.length) return this._data.length * 4 * Ls < this._data.buffer.byteLength;
    let i = t * B;
    if (t > this.length) {
      if (this._data.buffer.byteLength >= i * 4) this._data = new Uint32Array(this._data.buffer, 0, i);
      else {
        let r5 = new Uint32Array(i);
        r5.set(this._data), this._data = r5;
      }
      for (let r5 = this.length; r5 < t; ++r5) this.setCell(r5, e);
    } else {
      this._data = this._data.subarray(0, i);
      let r5 = Object.keys(this._combined);
      for (let o2 = 0; o2 < r5.length; o2++) {
        let l = parseInt(r5[o2], 10);
        l >= t && delete this._combined[l];
      }
      let n = Object.keys(this._extendedAttrs);
      for (let o2 = 0; o2 < n.length; o2++) {
        let l = parseInt(n[o2], 10);
        l >= t && delete this._extendedAttrs[l];
      }
    }
    return this.length = t, i * 4 * Ls < this._data.buffer.byteLength;
  }
  cleanupMemory() {
    if (this._data.length * 4 * Ls < this._data.buffer.byteLength) {
      let t = new Uint32Array(this._data.length);
      return t.set(this._data), this._data = t, 1;
    }
    return 0;
  }
  fill(t, e = false) {
    if (e) {
      for (let i = 0; i < this.length; ++i) this.isProtected(i) || this.setCell(i, t);
      return;
    }
    this._combined = {}, this._extendedAttrs = {};
    for (let i = 0; i < this.length; ++i) this.setCell(i, t);
  }
  copyFrom(t) {
    this.length !== t.length ? this._data = new Uint32Array(t._data) : this._data.set(t._data), this.length = t.length, this._combined = {};
    for (let e in t._combined) this._combined[e] = t._combined[e];
    this._extendedAttrs = {};
    for (let e in t._extendedAttrs) this._extendedAttrs[e] = t._extendedAttrs[e];
    this.isWrapped = t.isWrapped;
  }
  clone() {
    let t = new s12(0);
    t._data = new Uint32Array(this._data), t.length = this.length;
    for (let e in this._combined) t._combined[e] = this._combined[e];
    for (let e in this._extendedAttrs) t._extendedAttrs[e] = this._extendedAttrs[e];
    return t.isWrapped = this.isWrapped, t;
  }
  getTrimmedLength() {
    for (let t = this.length - 1; t >= 0; --t) if (this._data[t * B + 0] & 4194303) return t + (this._data[t * B + 0] >> 22);
    return 0;
  }
  getNoBgTrimmedLength() {
    for (let t = this.length - 1; t >= 0; --t) if (this._data[t * B + 0] & 4194303 || this._data[t * B + 2] & 50331648) return t + (this._data[t * B + 0] >> 22);
    return 0;
  }
  copyCellsFrom(t, e, i, r5, n) {
    let o2 = t._data;
    if (n) for (let a = r5 - 1; a >= 0; a--) {
      for (let u = 0; u < B; u++) this._data[(i + a) * B + u] = o2[(e + a) * B + u];
      o2[(e + a) * B + 2] & 268435456 && (this._extendedAttrs[i + a] = t._extendedAttrs[e + a]);
    }
    else for (let a = 0; a < r5; a++) {
      for (let u = 0; u < B; u++) this._data[(i + a) * B + u] = o2[(e + a) * B + u];
      o2[(e + a) * B + 2] & 268435456 && (this._extendedAttrs[i + a] = t._extendedAttrs[e + a]);
    }
    let l = Object.keys(t._combined);
    for (let a = 0; a < l.length; a++) {
      let u = parseInt(l[a], 10);
      u >= e && (this._combined[u - e + i] = t._combined[u]);
    }
  }
  translateToString(t, e, i, r5) {
    e = e ?? 0, i = i ?? this.length, t && (i = Math.min(i, this.getTrimmedLength())), r5 && (r5.length = 0);
    let n = "";
    for (; e < i; ) {
      let o2 = this._data[e * B + 0], l = o2 & 2097151, a = o2 & 2097152 ? this._combined[e] : l ? Ce(l) : we;
      if (n += a, r5) for (let u = 0; u < a.length; ++u) r5.push(e);
      e += o2 >> 22 || 1;
    }
    return r5 && r5.push(e), n;
  }
};
function sl(s15, t, e, i, r5, n) {
  let o2 = [];
  for (let l = 0; l < s15.length - 1; l++) {
    let a = l, u = s15.get(++a);
    if (!u.isWrapped) continue;
    let h2 = [s15.get(l)];
    for (; a < s15.length && u.isWrapped; ) h2.push(u), u = s15.get(++a);
    if (!n && i >= l && i < a) {
      l += h2.length - 1;
      continue;
    }
    let c = 0, d = ri(h2, c, t), _3 = 1, p = 0;
    for (; _3 < h2.length; ) {
      let f = ri(h2, _3, t), A2 = f - p, R3 = e - d, O2 = Math.min(A2, R3);
      h2[c].copyCellsFrom(h2[_3], p, d, O2, false), d += O2, d === e && (c++, d = 0), p += O2, p === f && (_3++, p = 0), d === 0 && c !== 0 && h2[c - 1].getWidth(e - 1) === 2 && (h2[c].copyCellsFrom(h2[c - 1], e - 1, d++, 1, false), h2[c - 1].setCell(e - 1, r5));
    }
    h2[c].replaceCells(d, e, r5);
    let m = 0;
    for (let f = h2.length - 1; f > 0 && (f > c || h2[f].getTrimmedLength() === 0); f--) m++;
    m > 0 && (o2.push(l + h2.length - m), o2.push(m)), l += h2.length - 1;
  }
  return o2;
}
function ol(s15, t) {
  let e = [], i = 0, r5 = t[i], n = 0;
  for (let o2 = 0; o2 < s15.length; o2++) if (r5 === o2) {
    let l = t[++i];
    s15.onDeleteEmitter.fire({ index: o2 - n, amount: l }), o2 += l - 1, n += l, r5 = t[++i];
  } else e.push(o2);
  return { layout: e, countRemoved: n };
}
function ll(s15, t) {
  let e = [];
  for (let i = 0; i < t.length; i++) e.push(s15.get(t[i]));
  for (let i = 0; i < e.length; i++) s15.set(i, e[i]);
  s15.length = t.length;
}
function al(s15, t, e) {
  let i = [], r5 = s15.map((a, u) => ri(s15, u, t)).reduce((a, u) => a + u), n = 0, o2 = 0, l = 0;
  for (; l < r5; ) {
    if (r5 - l < e) {
      i.push(r5 - l);
      break;
    }
    n += e;
    let a = ri(s15, o2, t);
    n > a && (n -= a, o2++);
    let u = s15[o2].getWidth(n - 1) === 2;
    u && n--;
    let h2 = u ? e - 1 : e;
    i.push(h2), l += h2;
  }
  return i;
}
function ri(s15, t, e) {
  if (t === s15.length - 1) return s15[t].getTrimmedLength();
  let i = !s15[t].hasContent(e - 1) && s15[t].getWidth(e - 1) === 1, r5 = s15[t + 1].getWidth(0) === 2;
  return i && r5 ? e - 1 : e;
}
var un = class un2 {
  constructor(t) {
    this.line = t;
    this.isDisposed = false;
    this._disposables = [];
    this._id = un2._nextId++;
    this._onDispose = this.register(new v());
    this.onDispose = this._onDispose.event;
  }
  get id() {
    return this._id;
  }
  dispose() {
    this.isDisposed || (this.isDisposed = true, this.line = -1, this._onDispose.fire(), Ne(this._disposables), this._disposables.length = 0);
  }
  register(t) {
    return this._disposables.push(t), t;
  }
};
un._nextId = 1;
var cn = un;
var ne = {};
var Je = ne.B;
ne[0] = { "`": "\u25C6", a: "\u2592", b: "\u2409", c: "\u240C", d: "\u240D", e: "\u240A", f: "\xB0", g: "\xB1", h: "\u2424", i: "\u240B", j: "\u2518", k: "\u2510", l: "\u250C", m: "\u2514", n: "\u253C", o: "\u23BA", p: "\u23BB", q: "\u2500", r: "\u23BC", s: "\u23BD", t: "\u251C", u: "\u2524", v: "\u2534", w: "\u252C", x: "\u2502", y: "\u2264", z: "\u2265", "{": "\u03C0", "|": "\u2260", "}": "\xA3", "~": "\xB7" };
ne.A = { "#": "\xA3" };
ne.B = void 0;
ne[4] = { "#": "\xA3", "@": "\xBE", "[": "ij", "\\": "\xBD", "]": "|", "{": "\xA8", "|": "f", "}": "\xBC", "~": "\xB4" };
ne.C = ne[5] = { "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" };
ne.R = { "#": "\xA3", "@": "\xE0", "[": "\xB0", "\\": "\xE7", "]": "\xA7", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xA8" };
ne.Q = { "@": "\xE0", "[": "\xE2", "\\": "\xE7", "]": "\xEA", "^": "\xEE", "`": "\xF4", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xFB" };
ne.K = { "@": "\xA7", "[": "\xC4", "\\": "\xD6", "]": "\xDC", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xDF" };
ne.Y = { "#": "\xA3", "@": "\xA7", "[": "\xB0", "\\": "\xE7", "]": "\xE9", "`": "\xF9", "{": "\xE0", "|": "\xF2", "}": "\xE8", "~": "\xEC" };
ne.E = ne[6] = { "@": "\xC4", "[": "\xC6", "\\": "\xD8", "]": "\xC5", "^": "\xDC", "`": "\xE4", "{": "\xE6", "|": "\xF8", "}": "\xE5", "~": "\xFC" };
ne.Z = { "#": "\xA3", "@": "\xA7", "[": "\xA1", "\\": "\xD1", "]": "\xBF", "{": "\xB0", "|": "\xF1", "}": "\xE7" };
ne.H = ne[7] = { "@": "\xC9", "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" };
ne["="] = { "#": "\xF9", "@": "\xE0", "[": "\xE9", "\\": "\xE7", "]": "\xEA", "^": "\xEE", _: "\xE8", "`": "\xF4", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xFB" };
var cl = 4294967295;
var $i = class {
  constructor(t, e, i) {
    this._hasScrollback = t;
    this._optionsService = e;
    this._bufferService = i;
    this.ydisp = 0;
    this.ybase = 0;
    this.y = 0;
    this.x = 0;
    this.tabs = {};
    this.savedY = 0;
    this.savedX = 0;
    this.savedCurAttrData = X2.clone();
    this.savedCharset = Je;
    this.markers = [];
    this._nullCell = q.fromCharData([0, ir, 1, 0]);
    this._whitespaceCell = q.fromCharData([0, we, 1, 32]);
    this._isClearing = false;
    this._memoryCleanupQueue = new Jt();
    this._memoryCleanupPosition = 0;
    this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new zi(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
  }
  getNullCell(t) {
    return t ? (this._nullCell.fg = t.fg, this._nullCell.bg = t.bg, this._nullCell.extended = t.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new rt()), this._nullCell;
  }
  getWhitespaceCell(t) {
    return t ? (this._whitespaceCell.fg = t.fg, this._whitespaceCell.bg = t.bg, this._whitespaceCell.extended = t.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new rt()), this._whitespaceCell;
  }
  getBlankLine(t, e) {
    return new Ze(this._bufferService.cols, this.getNullCell(t), e);
  }
  get hasScrollback() {
    return this._hasScrollback && this.lines.maxLength > this._rows;
  }
  get isCursorInViewport() {
    let e = this.ybase + this.y - this.ydisp;
    return e >= 0 && e < this._rows;
  }
  _getCorrectBufferLength(t) {
    if (!this._hasScrollback) return t;
    let e = t + this._optionsService.rawOptions.scrollback;
    return e > cl ? cl : e;
  }
  fillViewportRows(t) {
    if (this.lines.length === 0) {
      t === void 0 && (t = X2);
      let e = this._rows;
      for (; e--; ) this.lines.push(this.getBlankLine(t));
    }
  }
  clear() {
    this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new zi(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
  }
  resize(t, e) {
    let i = this.getNullCell(X2), r5 = 0, n = this._getCorrectBufferLength(e);
    if (n > this.lines.maxLength && (this.lines.maxLength = n), this.lines.length > 0) {
      if (this._cols < t) for (let l = 0; l < this.lines.length; l++) r5 += +this.lines.get(l).resize(t, i);
      let o2 = 0;
      if (this._rows < e) for (let l = this._rows; l < e; l++) this.lines.length < e + this.ybase && (this._optionsService.rawOptions.windowsMode || this._optionsService.rawOptions.windowsPty.backend !== void 0 || this._optionsService.rawOptions.windowsPty.buildNumber !== void 0 ? this.lines.push(new Ze(t, i)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + o2 + 1 ? (this.ybase--, o2++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new Ze(t, i)));
      else for (let l = this._rows; l > e; l--) this.lines.length > e + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
      if (n < this.lines.maxLength) {
        let l = this.lines.length - n;
        l > 0 && (this.lines.trimStart(l), this.ybase = Math.max(this.ybase - l, 0), this.ydisp = Math.max(this.ydisp - l, 0), this.savedY = Math.max(this.savedY - l, 0)), this.lines.maxLength = n;
      }
      this.x = Math.min(this.x, t - 1), this.y = Math.min(this.y, e - 1), o2 && (this.y += o2), this.savedX = Math.min(this.savedX, t - 1), this.scrollTop = 0;
    }
    if (this.scrollBottom = e - 1, this._isReflowEnabled && (this._reflow(t, e), this._cols > t)) for (let o2 = 0; o2 < this.lines.length; o2++) r5 += +this.lines.get(o2).resize(t, i);
    this._cols = t, this._rows = e, this._memoryCleanupQueue.clear(), r5 > 0.1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue(() => this._batchedMemoryCleanup()));
  }
  _batchedMemoryCleanup() {
    let t = true;
    this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, t = false);
    let e = 0;
    for (; this._memoryCleanupPosition < this.lines.length; ) if (e += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), e > 100) return true;
    return t;
  }
  get _isReflowEnabled() {
    let t = this._optionsService.rawOptions.windowsPty;
    return t && t.buildNumber ? this._hasScrollback && t.backend === "conpty" && t.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
  }
  _reflow(t, e) {
    this._cols !== t && (t > this._cols ? this._reflowLarger(t, e) : this._reflowSmaller(t, e));
  }
  _reflowLarger(t, e) {
    let i = this._optionsService.rawOptions.reflowCursorLine, r5 = sl(this.lines, this._cols, t, this.ybase + this.y, this.getNullCell(X2), i);
    if (r5.length > 0) {
      let n = ol(this.lines, r5);
      ll(this.lines, n.layout), this._reflowLargerAdjustViewport(t, e, n.countRemoved);
    }
  }
  _reflowLargerAdjustViewport(t, e, i) {
    let r5 = this.getNullCell(X2), n = i;
    for (; n-- > 0; ) this.ybase === 0 ? (this.y > 0 && this.y--, this.lines.length < e && this.lines.push(new Ze(t, r5))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
    this.savedY = Math.max(this.savedY - i, 0);
  }
  _reflowSmaller(t, e) {
    let i = this._optionsService.rawOptions.reflowCursorLine, r5 = this.getNullCell(X2), n = [], o2 = 0;
    for (let l = this.lines.length - 1; l >= 0; l--) {
      let a = this.lines.get(l);
      if (!a || !a.isWrapped && a.getTrimmedLength() <= t) continue;
      let u = [a];
      for (; a.isWrapped && l > 0; ) a = this.lines.get(--l), u.unshift(a);
      if (!i) {
        let I2 = this.ybase + this.y;
        if (I2 >= l && I2 < l + u.length) continue;
      }
      let h2 = u[u.length - 1].getTrimmedLength(), c = al(u, this._cols, t), d = c.length - u.length, _3;
      this.ybase === 0 && this.y !== this.lines.length - 1 ? _3 = Math.max(0, this.y - this.lines.maxLength + d) : _3 = Math.max(0, this.lines.length - this.lines.maxLength + d);
      let p = [];
      for (let I2 = 0; I2 < d; I2++) {
        let k = this.getBlankLine(X2, true);
        p.push(k);
      }
      p.length > 0 && (n.push({ start: l + u.length + o2, newLines: p }), o2 += p.length), u.push(...p);
      let m = c.length - 1, f = c[m];
      f === 0 && (m--, f = c[m]);
      let A2 = u.length - d - 1, R3 = h2;
      for (; A2 >= 0; ) {
        let I2 = Math.min(R3, f);
        if (u[m] === void 0) break;
        if (u[m].copyCellsFrom(u[A2], R3 - I2, f - I2, I2, true), f -= I2, f === 0 && (m--, f = c[m]), R3 -= I2, R3 === 0) {
          A2--;
          let k = Math.max(A2, 0);
          R3 = ri(u, k, this._cols);
        }
      }
      for (let I2 = 0; I2 < u.length; I2++) c[I2] < t && u[I2].setCell(c[I2], r5);
      let O2 = d - _3;
      for (; O2-- > 0; ) this.ybase === 0 ? this.y < e - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + o2) - e && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
      this.savedY = Math.min(this.savedY + d, this.ybase + e - 1);
    }
    if (n.length > 0) {
      let l = [], a = [];
      for (let f = 0; f < this.lines.length; f++) a.push(this.lines.get(f));
      let u = this.lines.length, h2 = u - 1, c = 0, d = n[c];
      this.lines.length = Math.min(this.lines.maxLength, this.lines.length + o2);
      let _3 = 0;
      for (let f = Math.min(this.lines.maxLength - 1, u + o2 - 1); f >= 0; f--) if (d && d.start > h2 + _3) {
        for (let A2 = d.newLines.length - 1; A2 >= 0; A2--) this.lines.set(f--, d.newLines[A2]);
        f++, l.push({ index: h2 + 1, amount: d.newLines.length }), _3 += d.newLines.length, d = n[++c];
      } else this.lines.set(f, a[h2--]);
      let p = 0;
      for (let f = l.length - 1; f >= 0; f--) l[f].index += p, this.lines.onInsertEmitter.fire(l[f]), p += l[f].amount;
      let m = Math.max(0, u + o2 - this.lines.maxLength);
      m > 0 && this.lines.onTrimEmitter.fire(m);
    }
  }
  translateBufferLineToString(t, e, i = 0, r5) {
    let n = this.lines.get(t);
    return n ? n.translateToString(e, i, r5) : "";
  }
  getWrappedRangeForLine(t) {
    let e = t, i = t;
    for (; e > 0 && this.lines.get(e).isWrapped; ) e--;
    for (; i + 1 < this.lines.length && this.lines.get(i + 1).isWrapped; ) i++;
    return { first: e, last: i };
  }
  setupTabStops(t) {
    for (t != null ? this.tabs[t] || (t = this.prevStop(t)) : (this.tabs = {}, t = 0); t < this._cols; t += this._optionsService.rawOptions.tabStopWidth) this.tabs[t] = true;
  }
  prevStop(t) {
    for (t == null && (t = this.x); !this.tabs[--t] && t > 0; ) ;
    return t >= this._cols ? this._cols - 1 : t < 0 ? 0 : t;
  }
  nextStop(t) {
    for (t == null && (t = this.x); !this.tabs[++t] && t < this._cols; ) ;
    return t >= this._cols ? this._cols - 1 : t < 0 ? 0 : t;
  }
  clearMarkers(t) {
    this._isClearing = true;
    for (let e = 0; e < this.markers.length; e++) this.markers[e].line === t && (this.markers[e].dispose(), this.markers.splice(e--, 1));
    this._isClearing = false;
  }
  clearAllMarkers() {
    this._isClearing = true;
    for (let t = 0; t < this.markers.length; t++) this.markers[t].dispose();
    this.markers.length = 0, this._isClearing = false;
  }
  addMarker(t) {
    let e = new cn(t);
    return this.markers.push(e), e.register(this.lines.onTrim((i) => {
      e.line -= i, e.line < 0 && e.dispose();
    })), e.register(this.lines.onInsert((i) => {
      e.line >= i.index && (e.line += i.amount);
    })), e.register(this.lines.onDelete((i) => {
      e.line >= i.index && e.line < i.index + i.amount && e.dispose(), e.line > i.index && (e.line -= i.amount);
    })), e.register(e.onDispose(() => this._removeMarker(e))), e;
  }
  _removeMarker(t) {
    this._isClearing || this.markers.splice(this.markers.indexOf(t), 1);
  }
};
var hn = class extends D {
  constructor(e, i) {
    super();
    this._optionsService = e;
    this._bufferService = i;
    this._onBufferActivate = this._register(new v());
    this.onBufferActivate = this._onBufferActivate.event;
    this.reset(), this._register(this._optionsService.onSpecificOptionChange("scrollback", () => this.resize(this._bufferService.cols, this._bufferService.rows))), this._register(this._optionsService.onSpecificOptionChange("tabStopWidth", () => this.setupTabStops()));
  }
  reset() {
    this._normal = new $i(true, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new $i(false, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }), this.setupTabStops();
  }
  get alt() {
    return this._alt;
  }
  get active() {
    return this._activeBuffer;
  }
  get normal() {
    return this._normal;
  }
  activateNormalBuffer() {
    this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }));
  }
  activateAltBuffer(e) {
    this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({ activeBuffer: this._alt, inactiveBuffer: this._normal }));
  }
  resize(e, i) {
    this._normal.resize(e, i), this._alt.resize(e, i), this.setupTabStops(e);
  }
  setupTabStops(e) {
    this._normal.setupTabStops(e), this._alt.setupTabStops(e);
  }
};
var ks = 2;
var Cs = 1;
var ni = class extends D {
  constructor(e) {
    super();
    this.isUserScrolling = false;
    this._onResize = this._register(new v());
    this.onResize = this._onResize.event;
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this.cols = Math.max(e.rawOptions.cols || 0, ks), this.rows = Math.max(e.rawOptions.rows || 0, Cs), this.buffers = this._register(new hn(e, this)), this._register(this.buffers.onBufferActivate((i) => {
      this._onScroll.fire(i.activeBuffer.ydisp);
    }));
  }
  get buffer() {
    return this.buffers.active;
  }
  resize(e, i) {
    let r5 = this.cols !== e, n = this.rows !== i;
    this.cols = e, this.rows = i, this.buffers.resize(e, i), this._onResize.fire({ cols: e, rows: i, colsChanged: r5, rowsChanged: n });
  }
  reset() {
    this.buffers.reset(), this.isUserScrolling = false;
  }
  scroll(e, i = false) {
    let r5 = this.buffer, n;
    n = this._cachedBlankLine, (!n || n.length !== this.cols || n.getFg(0) !== e.fg || n.getBg(0) !== e.bg) && (n = r5.getBlankLine(e, i), this._cachedBlankLine = n), n.isWrapped = i;
    let o2 = r5.ybase + r5.scrollTop, l = r5.ybase + r5.scrollBottom;
    if (r5.scrollTop === 0) {
      let a = r5.lines.isFull;
      l === r5.lines.length - 1 ? a ? r5.lines.recycle().copyFrom(n) : r5.lines.push(n.clone()) : r5.lines.splice(l + 1, 0, n.clone()), a ? this.isUserScrolling && (r5.ydisp = Math.max(r5.ydisp - 1, 0)) : (r5.ybase++, this.isUserScrolling || r5.ydisp++);
    } else {
      let a = l - o2 + 1;
      r5.lines.shiftElements(o2 + 1, a - 1, -1), r5.lines.set(l, n.clone());
    }
    this.isUserScrolling || (r5.ydisp = r5.ybase), this._onScroll.fire(r5.ydisp);
  }
  scrollLines(e, i) {
    let r5 = this.buffer;
    if (e < 0) {
      if (r5.ydisp === 0) return;
      this.isUserScrolling = true;
    } else e + r5.ydisp >= r5.ybase && (this.isUserScrolling = false);
    let n = r5.ydisp;
    r5.ydisp = Math.max(Math.min(r5.ydisp + e, r5.ybase), 0), n !== r5.ydisp && (i || this._onScroll.fire(r5.ydisp));
  }
};
ni = M([S(0, H)], ni);
var si = { cols: 80, rows: 24, cursorBlink: false, cursorStyle: "block", cursorWidth: 1, cursorInactiveStyle: "outline", customGlyphs: true, drawBoldTextInBrightColors: true, documentOverride: null, fastScrollModifier: "alt", fastScrollSensitivity: 5, fontFamily: "monospace", fontSize: 15, fontWeight: "normal", fontWeightBold: "bold", ignoreBracketedPasteMode: false, lineHeight: 1, letterSpacing: 0, linkHandler: null, logLevel: "info", logger: null, scrollback: 1e3, scrollOnEraseInDisplay: false, scrollOnUserInput: true, scrollSensitivity: 1, screenReaderMode: false, smoothScrollDuration: 0, macOptionIsMeta: false, macOptionClickForcesSelection: false, minimumContrastRatio: 1, disableStdin: false, allowProposedApi: false, allowTransparency: false, tabStopWidth: 8, theme: {}, reflowCursorLine: false, rescaleOverlappingGlyphs: false, rightClickSelectsWord: Zt, windowOptions: {}, windowsMode: false, windowsPty: {}, wordSeparator: " ()[]{}',\"`", altClickMovesCursor: true, convertEol: false, termName: "xterm", cancelEvents: false, overviewRuler: {} };
var nc = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
var dn = class extends D {
  constructor(e) {
    super();
    this._onOptionChange = this._register(new v());
    this.onOptionChange = this._onOptionChange.event;
    let i = { ...si };
    for (let r5 in e) if (r5 in i) try {
      let n = e[r5];
      i[r5] = this._sanitizeAndValidateOption(r5, n);
    } catch (n) {
      console.error(n);
    }
    this.rawOptions = i, this.options = { ...i }, this._setupOptions(), this._register(C(() => {
      this.rawOptions.linkHandler = null, this.rawOptions.documentOverride = null;
    }));
  }
  onSpecificOptionChange(e, i) {
    return this.onOptionChange((r5) => {
      r5 === e && i(this.rawOptions[e]);
    });
  }
  onMultipleOptionChange(e, i) {
    return this.onOptionChange((r5) => {
      e.indexOf(r5) !== -1 && i();
    });
  }
  _setupOptions() {
    let e = (r5) => {
      if (!(r5 in si)) throw new Error(`No option with key "${r5}"`);
      return this.rawOptions[r5];
    }, i = (r5, n) => {
      if (!(r5 in si)) throw new Error(`No option with key "${r5}"`);
      n = this._sanitizeAndValidateOption(r5, n), this.rawOptions[r5] !== n && (this.rawOptions[r5] = n, this._onOptionChange.fire(r5));
    };
    for (let r5 in this.rawOptions) {
      let n = { get: e.bind(this, r5), set: i.bind(this, r5) };
      Object.defineProperty(this.options, r5, n);
    }
  }
  _sanitizeAndValidateOption(e, i) {
    switch (e) {
      case "cursorStyle":
        if (i || (i = si[e]), !sc(i)) throw new Error(`"${i}" is not a valid value for ${e}`);
        break;
      case "wordSeparator":
        i || (i = si[e]);
        break;
      case "fontWeight":
      case "fontWeightBold":
        if (typeof i == "number" && 1 <= i && i <= 1e3) break;
        i = nc.includes(i) ? i : si[e];
        break;
      case "cursorWidth":
        i = Math.floor(i);
      case "lineHeight":
      case "tabStopWidth":
        if (i < 1) throw new Error(`${e} cannot be less than 1, value: ${i}`);
        break;
      case "minimumContrastRatio":
        i = Math.max(1, Math.min(21, Math.round(i * 10) / 10));
        break;
      case "scrollback":
        if (i = Math.min(i, 4294967295), i < 0) throw new Error(`${e} cannot be less than 0, value: ${i}`);
        break;
      case "fastScrollSensitivity":
      case "scrollSensitivity":
        if (i <= 0) throw new Error(`${e} cannot be less than or equal to 0, value: ${i}`);
        break;
      case "rows":
      case "cols":
        if (!i && i !== 0) throw new Error(`${e} must be numeric, value: ${i}`);
        break;
      case "windowsPty":
        i = i ?? {};
        break;
    }
    return i;
  }
};
function sc(s15) {
  return s15 === "block" || s15 === "underline" || s15 === "bar";
}
function oi(s15, t = 5) {
  if (typeof s15 != "object") return s15;
  let e = Array.isArray(s15) ? [] : {};
  for (let i in s15) e[i] = t <= 1 ? s15[i] : s15[i] && oi(s15[i], t - 1);
  return e;
}
var ul = Object.freeze({ insertMode: false });
var hl = Object.freeze({ applicationCursorKeys: false, applicationKeypad: false, bracketedPasteMode: false, cursorBlink: void 0, cursorStyle: void 0, origin: false, reverseWraparound: false, sendFocus: false, synchronizedOutput: false, wraparound: true });
var li = class extends D {
  constructor(e, i, r5) {
    super();
    this._bufferService = e;
    this._logService = i;
    this._optionsService = r5;
    this.isCursorInitialized = false;
    this.isCursorHidden = false;
    this._onData = this._register(new v());
    this.onData = this._onData.event;
    this._onUserInput = this._register(new v());
    this.onUserInput = this._onUserInput.event;
    this._onBinary = this._register(new v());
    this.onBinary = this._onBinary.event;
    this._onRequestScrollToBottom = this._register(new v());
    this.onRequestScrollToBottom = this._onRequestScrollToBottom.event;
    this.modes = oi(ul), this.decPrivateModes = oi(hl);
  }
  reset() {
    this.modes = oi(ul), this.decPrivateModes = oi(hl);
  }
  triggerDataEvent(e, i = false) {
    if (this._optionsService.rawOptions.disableStdin) return;
    let r5 = this._bufferService.buffer;
    i && this._optionsService.rawOptions.scrollOnUserInput && r5.ybase !== r5.ydisp && this._onRequestScrollToBottom.fire(), i && this._onUserInput.fire(), this._logService.debug(`sending data "${e}"`), this._logService.trace("sending data (codes)", () => e.split("").map((n) => n.charCodeAt(0))), this._onData.fire(e);
  }
  triggerBinaryEvent(e) {
    this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e}"`), this._logService.trace("sending binary (codes)", () => e.split("").map((i) => i.charCodeAt(0))), this._onBinary.fire(e));
  }
};
li = M([S(0, F), S(1, nr), S(2, H)], li);
var dl = { NONE: { events: 0, restrict: () => false }, X10: { events: 1, restrict: (s15) => s15.button === 4 || s15.action !== 1 ? false : (s15.ctrl = false, s15.alt = false, s15.shift = false, true) }, VT200: { events: 19, restrict: (s15) => s15.action !== 32 }, DRAG: { events: 23, restrict: (s15) => !(s15.action === 32 && s15.button === 3) }, ANY: { events: 31, restrict: (s15) => true } };
function Ms(s15, t) {
  let e = (s15.ctrl ? 16 : 0) | (s15.shift ? 4 : 0) | (s15.alt ? 8 : 0);
  return s15.button === 4 ? (e |= 64, e |= s15.action) : (e |= s15.button & 3, s15.button & 4 && (e |= 64), s15.button & 8 && (e |= 128), s15.action === 32 ? e |= 32 : s15.action === 0 && !t && (e |= 3)), e;
}
var Ps = String.fromCharCode;
var fl = { DEFAULT: (s15) => {
  let t = [Ms(s15, false) + 32, s15.col + 32, s15.row + 32];
  return t[0] > 255 || t[1] > 255 || t[2] > 255 ? "" : `\x1B[M${Ps(t[0])}${Ps(t[1])}${Ps(t[2])}`;
}, SGR: (s15) => {
  let t = s15.action === 0 && s15.button !== 4 ? "m" : "M";
  return `\x1B[<${Ms(s15, true)};${s15.col};${s15.row}${t}`;
}, SGR_PIXELS: (s15) => {
  let t = s15.action === 0 && s15.button !== 4 ? "m" : "M";
  return `\x1B[<${Ms(s15, true)};${s15.x};${s15.y}${t}`;
} };
var ai = class extends D {
  constructor(e, i, r5) {
    super();
    this._bufferService = e;
    this._coreService = i;
    this._optionsService = r5;
    this._protocols = {};
    this._encodings = {};
    this._activeProtocol = "";
    this._activeEncoding = "";
    this._lastEvent = null;
    this._wheelPartialScroll = 0;
    this._onProtocolChange = this._register(new v());
    this.onProtocolChange = this._onProtocolChange.event;
    for (let n of Object.keys(dl)) this.addProtocol(n, dl[n]);
    for (let n of Object.keys(fl)) this.addEncoding(n, fl[n]);
    this.reset();
  }
  addProtocol(e, i) {
    this._protocols[e] = i;
  }
  addEncoding(e, i) {
    this._encodings[e] = i;
  }
  get activeProtocol() {
    return this._activeProtocol;
  }
  get areMouseEventsActive() {
    return this._protocols[this._activeProtocol].events !== 0;
  }
  set activeProtocol(e) {
    if (!this._protocols[e]) throw new Error(`unknown protocol "${e}"`);
    this._activeProtocol = e, this._onProtocolChange.fire(this._protocols[e].events);
  }
  get activeEncoding() {
    return this._activeEncoding;
  }
  set activeEncoding(e) {
    if (!this._encodings[e]) throw new Error(`unknown encoding "${e}"`);
    this._activeEncoding = e;
  }
  reset() {
    this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null, this._wheelPartialScroll = 0;
  }
  consumeWheelEvent(e, i, r5) {
    if (e.deltaY === 0 || e.shiftKey || i === void 0 || r5 === void 0) return 0;
    let n = i / r5, o2 = this._applyScrollModifier(e.deltaY, e);
    return e.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (o2 /= n + 0, Math.abs(e.deltaY) < 50 && (o2 *= 0.3), this._wheelPartialScroll += o2, o2 = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e.deltaMode === WheelEvent.DOM_DELTA_PAGE && (o2 *= this._bufferService.rows), o2;
  }
  _applyScrollModifier(e, i) {
    return i.altKey || i.ctrlKey || i.shiftKey ? e * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e * this._optionsService.rawOptions.scrollSensitivity;
  }
  triggerMouseEvent(e) {
    if (e.col < 0 || e.col >= this._bufferService.cols || e.row < 0 || e.row >= this._bufferService.rows || e.button === 4 && e.action === 32 || e.button === 3 && e.action !== 32 || e.button !== 4 && (e.action === 2 || e.action === 3) || (e.col++, e.row++, e.action === 32 && this._lastEvent && this._equalEvents(this._lastEvent, e, this._activeEncoding === "SGR_PIXELS")) || !this._protocols[this._activeProtocol].restrict(e)) return false;
    let i = this._encodings[this._activeEncoding](e);
    return i && (this._activeEncoding === "DEFAULT" ? this._coreService.triggerBinaryEvent(i) : this._coreService.triggerDataEvent(i, true)), this._lastEvent = e, true;
  }
  explainEvents(e) {
    return { down: !!(e & 1), up: !!(e & 2), drag: !!(e & 4), move: !!(e & 8), wheel: !!(e & 16) };
  }
  _equalEvents(e, i, r5) {
    if (r5) {
      if (e.x !== i.x || e.y !== i.y) return false;
    } else if (e.col !== i.col || e.row !== i.row) return false;
    return !(e.button !== i.button || e.action !== i.action || e.ctrl !== i.ctrl || e.alt !== i.alt || e.shift !== i.shift);
  }
};
ai = M([S(0, F), S(1, ge), S(2, H)], ai);
var Os = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]];
var ac = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
var se;
function cc(s15, t) {
  let e = 0, i = t.length - 1, r5;
  if (s15 < t[0][0] || s15 > t[i][1]) return false;
  for (; i >= e; ) if (r5 = e + i >> 1, s15 > t[r5][1]) e = r5 + 1;
  else if (s15 < t[r5][0]) i = r5 - 1;
  else return true;
  return false;
}
var fn = class {
  constructor() {
    this.version = "6";
    if (!se) {
      se = new Uint8Array(65536), se.fill(1), se[0] = 0, se.fill(0, 1, 32), se.fill(0, 127, 160), se.fill(2, 4352, 4448), se[9001] = 2, se[9002] = 2, se.fill(2, 11904, 42192), se[12351] = 1, se.fill(2, 44032, 55204), se.fill(2, 63744, 64256), se.fill(2, 65040, 65050), se.fill(2, 65072, 65136), se.fill(2, 65280, 65377), se.fill(2, 65504, 65511);
      for (let t = 0; t < Os.length; ++t) se.fill(0, Os[t][0], Os[t][1] + 1);
    }
  }
  wcwidth(t) {
    return t < 32 ? 0 : t < 127 ? 1 : t < 65536 ? se[t] : cc(t, ac) ? 0 : t >= 131072 && t <= 196605 || t >= 196608 && t <= 262141 ? 2 : 1;
  }
  charProperties(t, e) {
    let i = this.wcwidth(t), r5 = i === 0 && e !== 0;
    if (r5) {
      let n = Ae.extractWidth(e);
      n === 0 ? r5 = false : n > i && (i = n);
    }
    return Ae.createPropertyValue(0, i, r5);
  }
};
var Ae = class s13 {
  constructor() {
    this._providers = /* @__PURE__ */ Object.create(null);
    this._active = "";
    this._onChange = new v();
    this.onChange = this._onChange.event;
    let t = new fn();
    this.register(t), this._active = t.version, this._activeProvider = t;
  }
  static extractShouldJoin(t) {
    return (t & 1) !== 0;
  }
  static extractWidth(t) {
    return t >> 1 & 3;
  }
  static extractCharKind(t) {
    return t >> 3;
  }
  static createPropertyValue(t, e, i = false) {
    return (t & 16777215) << 3 | (e & 3) << 1 | (i ? 1 : 0);
  }
  dispose() {
    this._onChange.dispose();
  }
  get versions() {
    return Object.keys(this._providers);
  }
  get activeVersion() {
    return this._active;
  }
  set activeVersion(t) {
    if (!this._providers[t]) throw new Error(`unknown Unicode version "${t}"`);
    this._active = t, this._activeProvider = this._providers[t], this._onChange.fire(t);
  }
  register(t) {
    this._providers[t.version] = t;
  }
  wcwidth(t) {
    return this._activeProvider.wcwidth(t);
  }
  getStringCellWidth(t) {
    let e = 0, i = 0, r5 = t.length;
    for (let n = 0; n < r5; ++n) {
      let o2 = t.charCodeAt(n);
      if (55296 <= o2 && o2 <= 56319) {
        if (++n >= r5) return e + this.wcwidth(o2);
        let u = t.charCodeAt(n);
        56320 <= u && u <= 57343 ? o2 = (o2 - 55296) * 1024 + u - 56320 + 65536 : e += this.wcwidth(u);
      }
      let l = this.charProperties(o2, i), a = s13.extractWidth(l);
      s13.extractShouldJoin(l) && (a -= s13.extractWidth(i)), e += a, i = l;
    }
    return e;
  }
  charProperties(t, e) {
    return this._activeProvider.charProperties(t, e);
  }
};
var pn = class {
  constructor() {
    this.glevel = 0;
    this._charsets = [];
  }
  reset() {
    this.charset = void 0, this._charsets = [], this.glevel = 0;
  }
  setgLevel(t) {
    this.glevel = t, this.charset = this._charsets[t];
  }
  setgCharset(t, e) {
    this._charsets[t] = e, this.glevel === t && (this.charset = e);
  }
};
function Bs(s15) {
  let e = s15.buffer.lines.get(s15.buffer.ybase + s15.buffer.y - 1)?.get(s15.cols - 1), i = s15.buffer.lines.get(s15.buffer.ybase + s15.buffer.y);
  i && e && (i.isWrapped = e[3] !== 0 && e[3] !== 32);
}
var Vi = 2147483647;
var uc = 256;
var ci = class s14 {
  constructor(t = 32, e = 32) {
    this.maxLength = t;
    this.maxSubParamsLength = e;
    if (e > uc) throw new Error("maxSubParamsLength must not be greater than 256");
    this.params = new Int32Array(t), this.length = 0, this._subParams = new Int32Array(e), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(t), this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
  }
  static fromArray(t) {
    let e = new s14();
    if (!t.length) return e;
    for (let i = Array.isArray(t[0]) ? 1 : 0; i < t.length; ++i) {
      let r5 = t[i];
      if (Array.isArray(r5)) for (let n = 0; n < r5.length; ++n) e.addSubParam(r5[n]);
      else e.addParam(r5);
    }
    return e;
  }
  clone() {
    let t = new s14(this.maxLength, this.maxSubParamsLength);
    return t.params.set(this.params), t.length = this.length, t._subParams.set(this._subParams), t._subParamsLength = this._subParamsLength, t._subParamsIdx.set(this._subParamsIdx), t._rejectDigits = this._rejectDigits, t._rejectSubDigits = this._rejectSubDigits, t._digitIsSub = this._digitIsSub, t;
  }
  toArray() {
    let t = [];
    for (let e = 0; e < this.length; ++e) {
      t.push(this.params[e]);
      let i = this._subParamsIdx[e] >> 8, r5 = this._subParamsIdx[e] & 255;
      r5 - i > 0 && t.push(Array.prototype.slice.call(this._subParams, i, r5));
    }
    return t;
  }
  reset() {
    this.length = 0, this._subParamsLength = 0, this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
  }
  addParam(t) {
    if (this._digitIsSub = false, this.length >= this.maxLength) {
      this._rejectDigits = true;
      return;
    }
    if (t < -1) throw new Error("values lesser than -1 are not allowed");
    this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = t > Vi ? Vi : t;
  }
  addSubParam(t) {
    if (this._digitIsSub = true, !!this.length) {
      if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) {
        this._rejectSubDigits = true;
        return;
      }
      if (t < -1) throw new Error("values lesser than -1 are not allowed");
      this._subParams[this._subParamsLength++] = t > Vi ? Vi : t, this._subParamsIdx[this.length - 1]++;
    }
  }
  hasSubParams(t) {
    return (this._subParamsIdx[t] & 255) - (this._subParamsIdx[t] >> 8) > 0;
  }
  getSubParams(t) {
    let e = this._subParamsIdx[t] >> 8, i = this._subParamsIdx[t] & 255;
    return i - e > 0 ? this._subParams.subarray(e, i) : null;
  }
  getSubParamsAll() {
    let t = {};
    for (let e = 0; e < this.length; ++e) {
      let i = this._subParamsIdx[e] >> 8, r5 = this._subParamsIdx[e] & 255;
      r5 - i > 0 && (t[e] = this._subParams.slice(i, r5));
    }
    return t;
  }
  addDigit(t) {
    let e;
    if (this._rejectDigits || !(e = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) return;
    let i = this._digitIsSub ? this._subParams : this.params, r5 = i[e - 1];
    i[e - 1] = ~r5 ? Math.min(r5 * 10 + t, Vi) : t;
  }
};
var qi = [];
var mn = class {
  constructor() {
    this._state = 0;
    this._active = qi;
    this._id = -1;
    this._handlers = /* @__PURE__ */ Object.create(null);
    this._handlerFb = () => {
    };
    this._stack = { paused: false, loopPosition: 0, fallThrough: false };
  }
  registerHandler(t, e) {
    this._handlers[t] === void 0 && (this._handlers[t] = []);
    let i = this._handlers[t];
    return i.push(e), { dispose: () => {
      let r5 = i.indexOf(e);
      r5 !== -1 && i.splice(r5, 1);
    } };
  }
  clearHandler(t) {
    this._handlers[t] && delete this._handlers[t];
  }
  setHandlerFallback(t) {
    this._handlerFb = t;
  }
  dispose() {
    this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
    }, this._active = qi;
  }
  reset() {
    if (this._state === 2) for (let t = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; t >= 0; --t) this._active[t].end(false);
    this._stack.paused = false, this._active = qi, this._id = -1, this._state = 0;
  }
  _start() {
    if (this._active = this._handlers[this._id] || qi, !this._active.length) this._handlerFb(this._id, "START");
    else for (let t = this._active.length - 1; t >= 0; t--) this._active[t].start();
  }
  _put(t, e, i) {
    if (!this._active.length) this._handlerFb(this._id, "PUT", It(t, e, i));
    else for (let r5 = this._active.length - 1; r5 >= 0; r5--) this._active[r5].put(t, e, i);
  }
  start() {
    this.reset(), this._state = 1;
  }
  put(t, e, i) {
    if (this._state !== 3) {
      if (this._state === 1) for (; e < i; ) {
        let r5 = t[e++];
        if (r5 === 59) {
          this._state = 2, this._start();
          break;
        }
        if (r5 < 48 || 57 < r5) {
          this._state = 3;
          return;
        }
        this._id === -1 && (this._id = 0), this._id = this._id * 10 + r5 - 48;
      }
      this._state === 2 && i - e > 0 && this._put(t, e, i);
    }
  }
  end(t, e = true) {
    if (this._state !== 0) {
      if (this._state !== 3) if (this._state === 1 && this._start(), !this._active.length) this._handlerFb(this._id, "END", t);
      else {
        let i = false, r5 = this._active.length - 1, n = false;
        if (this._stack.paused && (r5 = this._stack.loopPosition - 1, i = e, n = this._stack.fallThrough, this._stack.paused = false), !n && i === false) {
          for (; r5 >= 0 && (i = this._active[r5].end(t), i !== true); r5--) if (i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r5, this._stack.fallThrough = false, i;
          r5--;
        }
        for (; r5 >= 0; r5--) if (i = this._active[r5].end(false), i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r5, this._stack.fallThrough = true, i;
      }
      this._active = qi, this._id = -1, this._state = 0;
    }
  }
};
var pe = class {
  constructor(t) {
    this._handler = t;
    this._data = "";
    this._hitLimit = false;
  }
  start() {
    this._data = "", this._hitLimit = false;
  }
  put(t, e, i) {
    this._hitLimit || (this._data += It(t, e, i), this._data.length > 1e7 && (this._data = "", this._hitLimit = true));
  }
  end(t) {
    let e = false;
    if (this._hitLimit) e = false;
    else if (t && (e = this._handler(this._data), e instanceof Promise)) return e.then((i) => (this._data = "", this._hitLimit = false, i));
    return this._data = "", this._hitLimit = false, e;
  }
};
var Yi = [];
var _n = class {
  constructor() {
    this._handlers = /* @__PURE__ */ Object.create(null);
    this._active = Yi;
    this._ident = 0;
    this._handlerFb = () => {
    };
    this._stack = { paused: false, loopPosition: 0, fallThrough: false };
  }
  dispose() {
    this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
    }, this._active = Yi;
  }
  registerHandler(t, e) {
    this._handlers[t] === void 0 && (this._handlers[t] = []);
    let i = this._handlers[t];
    return i.push(e), { dispose: () => {
      let r5 = i.indexOf(e);
      r5 !== -1 && i.splice(r5, 1);
    } };
  }
  clearHandler(t) {
    this._handlers[t] && delete this._handlers[t];
  }
  setHandlerFallback(t) {
    this._handlerFb = t;
  }
  reset() {
    if (this._active.length) for (let t = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; t >= 0; --t) this._active[t].unhook(false);
    this._stack.paused = false, this._active = Yi, this._ident = 0;
  }
  hook(t, e) {
    if (this.reset(), this._ident = t, this._active = this._handlers[t] || Yi, !this._active.length) this._handlerFb(this._ident, "HOOK", e);
    else for (let i = this._active.length - 1; i >= 0; i--) this._active[i].hook(e);
  }
  put(t, e, i) {
    if (!this._active.length) this._handlerFb(this._ident, "PUT", It(t, e, i));
    else for (let r5 = this._active.length - 1; r5 >= 0; r5--) this._active[r5].put(t, e, i);
  }
  unhook(t, e = true) {
    if (!this._active.length) this._handlerFb(this._ident, "UNHOOK", t);
    else {
      let i = false, r5 = this._active.length - 1, n = false;
      if (this._stack.paused && (r5 = this._stack.loopPosition - 1, i = e, n = this._stack.fallThrough, this._stack.paused = false), !n && i === false) {
        for (; r5 >= 0 && (i = this._active[r5].unhook(t), i !== true); r5--) if (i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r5, this._stack.fallThrough = false, i;
        r5--;
      }
      for (; r5 >= 0; r5--) if (i = this._active[r5].unhook(false), i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r5, this._stack.fallThrough = true, i;
    }
    this._active = Yi, this._ident = 0;
  }
};
var ji = new ci();
ji.addParam(0);
var Xi = class {
  constructor(t) {
    this._handler = t;
    this._data = "";
    this._params = ji;
    this._hitLimit = false;
  }
  hook(t) {
    this._params = t.length > 1 || t.params[0] ? t.clone() : ji, this._data = "", this._hitLimit = false;
  }
  put(t, e, i) {
    this._hitLimit || (this._data += It(t, e, i), this._data.length > 1e7 && (this._data = "", this._hitLimit = true));
  }
  unhook(t) {
    let e = false;
    if (this._hitLimit) e = false;
    else if (t && (e = this._handler(this._data, this._params), e instanceof Promise)) return e.then((i) => (this._params = ji, this._data = "", this._hitLimit = false, i));
    return this._params = ji, this._data = "", this._hitLimit = false, e;
  }
};
var Fs = class {
  constructor(t) {
    this.table = new Uint8Array(t);
  }
  setDefault(t, e) {
    this.table.fill(t << 4 | e);
  }
  add(t, e, i, r5) {
    this.table[e << 8 | t] = i << 4 | r5;
  }
  addMany(t, e, i, r5) {
    for (let n = 0; n < t.length; n++) this.table[e << 8 | t[n]] = i << 4 | r5;
  }
};
var ke = 160;
var hc = (function() {
  let s15 = new Fs(4095), e = Array.apply(null, Array(256)).map((a, u) => u), i = (a, u) => e.slice(a, u), r5 = i(32, 127), n = i(0, 24);
  n.push(25), n.push.apply(n, i(28, 32));
  let o2 = i(0, 14), l;
  s15.setDefault(1, 0), s15.addMany(r5, 0, 2, 0);
  for (l in o2) s15.addMany([24, 26, 153, 154], l, 3, 0), s15.addMany(i(128, 144), l, 3, 0), s15.addMany(i(144, 152), l, 3, 0), s15.add(156, l, 0, 0), s15.add(27, l, 11, 1), s15.add(157, l, 4, 8), s15.addMany([152, 158, 159], l, 0, 7), s15.add(155, l, 11, 3), s15.add(144, l, 11, 9);
  return s15.addMany(n, 0, 3, 0), s15.addMany(n, 1, 3, 1), s15.add(127, 1, 0, 1), s15.addMany(n, 8, 0, 8), s15.addMany(n, 3, 3, 3), s15.add(127, 3, 0, 3), s15.addMany(n, 4, 3, 4), s15.add(127, 4, 0, 4), s15.addMany(n, 6, 3, 6), s15.addMany(n, 5, 3, 5), s15.add(127, 5, 0, 5), s15.addMany(n, 2, 3, 2), s15.add(127, 2, 0, 2), s15.add(93, 1, 4, 8), s15.addMany(r5, 8, 5, 8), s15.add(127, 8, 5, 8), s15.addMany([156, 27, 24, 26, 7], 8, 6, 0), s15.addMany(i(28, 32), 8, 0, 8), s15.addMany([88, 94, 95], 1, 0, 7), s15.addMany(r5, 7, 0, 7), s15.addMany(n, 7, 0, 7), s15.add(156, 7, 0, 0), s15.add(127, 7, 0, 7), s15.add(91, 1, 11, 3), s15.addMany(i(64, 127), 3, 7, 0), s15.addMany(i(48, 60), 3, 8, 4), s15.addMany([60, 61, 62, 63], 3, 9, 4), s15.addMany(i(48, 60), 4, 8, 4), s15.addMany(i(64, 127), 4, 7, 0), s15.addMany([60, 61, 62, 63], 4, 0, 6), s15.addMany(i(32, 64), 6, 0, 6), s15.add(127, 6, 0, 6), s15.addMany(i(64, 127), 6, 0, 0), s15.addMany(i(32, 48), 3, 9, 5), s15.addMany(i(32, 48), 5, 9, 5), s15.addMany(i(48, 64), 5, 0, 6), s15.addMany(i(64, 127), 5, 7, 0), s15.addMany(i(32, 48), 4, 9, 5), s15.addMany(i(32, 48), 1, 9, 2), s15.addMany(i(32, 48), 2, 9, 2), s15.addMany(i(48, 127), 2, 10, 0), s15.addMany(i(48, 80), 1, 10, 0), s15.addMany(i(81, 88), 1, 10, 0), s15.addMany([89, 90, 92], 1, 10, 0), s15.addMany(i(96, 127), 1, 10, 0), s15.add(80, 1, 11, 9), s15.addMany(n, 9, 0, 9), s15.add(127, 9, 0, 9), s15.addMany(i(28, 32), 9, 0, 9), s15.addMany(i(32, 48), 9, 9, 12), s15.addMany(i(48, 60), 9, 8, 10), s15.addMany([60, 61, 62, 63], 9, 9, 10), s15.addMany(n, 11, 0, 11), s15.addMany(i(32, 128), 11, 0, 11), s15.addMany(i(28, 32), 11, 0, 11), s15.addMany(n, 10, 0, 10), s15.add(127, 10, 0, 10), s15.addMany(i(28, 32), 10, 0, 10), s15.addMany(i(48, 60), 10, 8, 10), s15.addMany([60, 61, 62, 63], 10, 0, 11), s15.addMany(i(32, 48), 10, 9, 12), s15.addMany(n, 12, 0, 12), s15.add(127, 12, 0, 12), s15.addMany(i(28, 32), 12, 0, 12), s15.addMany(i(32, 48), 12, 9, 12), s15.addMany(i(48, 64), 12, 0, 11), s15.addMany(i(64, 127), 12, 12, 13), s15.addMany(i(64, 127), 10, 12, 13), s15.addMany(i(64, 127), 9, 12, 13), s15.addMany(n, 13, 13, 13), s15.addMany(r5, 13, 13, 13), s15.add(127, 13, 0, 13), s15.addMany([27, 156, 24, 26], 13, 14, 0), s15.add(ke, 0, 2, 0), s15.add(ke, 8, 5, 8), s15.add(ke, 6, 0, 6), s15.add(ke, 11, 0, 11), s15.add(ke, 13, 13, 13), s15;
})();
var bn = class extends D {
  constructor(e = hc) {
    super();
    this._transitions = e;
    this._parseStack = { state: 0, handlers: [], handlerPos: 0, transition: 0, chunkPos: 0 };
    this.initialState = 0, this.currentState = this.initialState, this._params = new ci(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._printHandlerFb = (i, r5, n) => {
    }, this._executeHandlerFb = (i) => {
    }, this._csiHandlerFb = (i, r5) => {
    }, this._escHandlerFb = (i) => {
    }, this._errorHandlerFb = (i) => i, this._printHandler = this._printHandlerFb, this._executeHandlers = /* @__PURE__ */ Object.create(null), this._csiHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null), this._register(C(() => {
      this._csiHandlers = /* @__PURE__ */ Object.create(null), this._executeHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null);
    })), this._oscParser = this._register(new mn()), this._dcsParser = this._register(new _n()), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, () => true);
  }
  _identifier(e, i = [64, 126]) {
    let r5 = 0;
    if (e.prefix) {
      if (e.prefix.length > 1) throw new Error("only one byte as prefix supported");
      if (r5 = e.prefix.charCodeAt(0), r5 && 60 > r5 || r5 > 63) throw new Error("prefix must be in range 0x3c .. 0x3f");
    }
    if (e.intermediates) {
      if (e.intermediates.length > 2) throw new Error("only two bytes as intermediates are supported");
      for (let o2 = 0; o2 < e.intermediates.length; ++o2) {
        let l = e.intermediates.charCodeAt(o2);
        if (32 > l || l > 47) throw new Error("intermediate must be in range 0x20 .. 0x2f");
        r5 <<= 8, r5 |= l;
      }
    }
    if (e.final.length !== 1) throw new Error("final must be a single byte");
    let n = e.final.charCodeAt(0);
    if (i[0] > n || n > i[1]) throw new Error(`final must be in range ${i[0]} .. ${i[1]}`);
    return r5 <<= 8, r5 |= n, r5;
  }
  identToString(e) {
    let i = [];
    for (; e; ) i.push(String.fromCharCode(e & 255)), e >>= 8;
    return i.reverse().join("");
  }
  setPrintHandler(e) {
    this._printHandler = e;
  }
  clearPrintHandler() {
    this._printHandler = this._printHandlerFb;
  }
  registerEscHandler(e, i) {
    let r5 = this._identifier(e, [48, 126]);
    this._escHandlers[r5] === void 0 && (this._escHandlers[r5] = []);
    let n = this._escHandlers[r5];
    return n.push(i), { dispose: () => {
      let o2 = n.indexOf(i);
      o2 !== -1 && n.splice(o2, 1);
    } };
  }
  clearEscHandler(e) {
    this._escHandlers[this._identifier(e, [48, 126])] && delete this._escHandlers[this._identifier(e, [48, 126])];
  }
  setEscHandlerFallback(e) {
    this._escHandlerFb = e;
  }
  setExecuteHandler(e, i) {
    this._executeHandlers[e.charCodeAt(0)] = i;
  }
  clearExecuteHandler(e) {
    this._executeHandlers[e.charCodeAt(0)] && delete this._executeHandlers[e.charCodeAt(0)];
  }
  setExecuteHandlerFallback(e) {
    this._executeHandlerFb = e;
  }
  registerCsiHandler(e, i) {
    let r5 = this._identifier(e);
    this._csiHandlers[r5] === void 0 && (this._csiHandlers[r5] = []);
    let n = this._csiHandlers[r5];
    return n.push(i), { dispose: () => {
      let o2 = n.indexOf(i);
      o2 !== -1 && n.splice(o2, 1);
    } };
  }
  clearCsiHandler(e) {
    this._csiHandlers[this._identifier(e)] && delete this._csiHandlers[this._identifier(e)];
  }
  setCsiHandlerFallback(e) {
    this._csiHandlerFb = e;
  }
  registerDcsHandler(e, i) {
    return this._dcsParser.registerHandler(this._identifier(e), i);
  }
  clearDcsHandler(e) {
    this._dcsParser.clearHandler(this._identifier(e));
  }
  setDcsHandlerFallback(e) {
    this._dcsParser.setHandlerFallback(e);
  }
  registerOscHandler(e, i) {
    return this._oscParser.registerHandler(e, i);
  }
  clearOscHandler(e) {
    this._oscParser.clearHandler(e);
  }
  setOscHandlerFallback(e) {
    this._oscParser.setHandlerFallback(e);
  }
  setErrorHandler(e) {
    this._errorHandler = e;
  }
  clearErrorHandler() {
    this._errorHandler = this._errorHandlerFb;
  }
  reset() {
    this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._parseStack.state !== 0 && (this._parseStack.state = 2, this._parseStack.handlers = []);
  }
  _preserveStack(e, i, r5, n, o2) {
    this._parseStack.state = e, this._parseStack.handlers = i, this._parseStack.handlerPos = r5, this._parseStack.transition = n, this._parseStack.chunkPos = o2;
  }
  parse(e, i, r5) {
    let n = 0, o2 = 0, l = 0, a;
    if (this._parseStack.state) if (this._parseStack.state === 2) this._parseStack.state = 0, l = this._parseStack.chunkPos + 1;
    else {
      if (r5 === void 0 || this._parseStack.state === 1) throw this._parseStack.state = 1, new Error("improper continuation due to previous async handler, giving up parsing");
      let u = this._parseStack.handlers, h2 = this._parseStack.handlerPos - 1;
      switch (this._parseStack.state) {
        case 3:
          if (r5 === false && h2 > -1) {
            for (; h2 >= 0 && (a = u[h2](this._params), a !== true); h2--) if (a instanceof Promise) return this._parseStack.handlerPos = h2, a;
          }
          this._parseStack.handlers = [];
          break;
        case 4:
          if (r5 === false && h2 > -1) {
            for (; h2 >= 0 && (a = u[h2](), a !== true); h2--) if (a instanceof Promise) return this._parseStack.handlerPos = h2, a;
          }
          this._parseStack.handlers = [];
          break;
        case 6:
          if (n = e[this._parseStack.chunkPos], a = this._dcsParser.unhook(n !== 24 && n !== 26, r5), a) return a;
          n === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
        case 5:
          if (n = e[this._parseStack.chunkPos], a = this._oscParser.end(n !== 24 && n !== 26, r5), a) return a;
          n === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
      }
      this._parseStack.state = 0, l = this._parseStack.chunkPos + 1, this.precedingJoinState = 0, this.currentState = this._parseStack.transition & 15;
    }
    for (let u = l; u < i; ++u) {
      switch (n = e[u], o2 = this._transitions.table[this.currentState << 8 | (n < 160 ? n : ke)], o2 >> 4) {
        case 2:
          for (let m = u + 1; ; ++m) {
            if (m >= i || (n = e[m]) < 32 || n > 126 && n < ke) {
              this._printHandler(e, u, m), u = m - 1;
              break;
            }
            if (++m >= i || (n = e[m]) < 32 || n > 126 && n < ke) {
              this._printHandler(e, u, m), u = m - 1;
              break;
            }
            if (++m >= i || (n = e[m]) < 32 || n > 126 && n < ke) {
              this._printHandler(e, u, m), u = m - 1;
              break;
            }
            if (++m >= i || (n = e[m]) < 32 || n > 126 && n < ke) {
              this._printHandler(e, u, m), u = m - 1;
              break;
            }
          }
          break;
        case 3:
          this._executeHandlers[n] ? this._executeHandlers[n]() : this._executeHandlerFb(n), this.precedingJoinState = 0;
          break;
        case 0:
          break;
        case 1:
          if (this._errorHandler({ position: u, code: n, currentState: this.currentState, collect: this._collect, params: this._params, abort: false }).abort) return;
          break;
        case 7:
          let c = this._csiHandlers[this._collect << 8 | n], d = c ? c.length - 1 : -1;
          for (; d >= 0 && (a = c[d](this._params), a !== true); d--) if (a instanceof Promise) return this._preserveStack(3, c, d, o2, u), a;
          d < 0 && this._csiHandlerFb(this._collect << 8 | n, this._params), this.precedingJoinState = 0;
          break;
        case 8:
          do
            switch (n) {
              case 59:
                this._params.addParam(0);
                break;
              case 58:
                this._params.addSubParam(-1);
                break;
              default:
                this._params.addDigit(n - 48);
            }
          while (++u < i && (n = e[u]) > 47 && n < 60);
          u--;
          break;
        case 9:
          this._collect <<= 8, this._collect |= n;
          break;
        case 10:
          let _3 = this._escHandlers[this._collect << 8 | n], p = _3 ? _3.length - 1 : -1;
          for (; p >= 0 && (a = _3[p](), a !== true); p--) if (a instanceof Promise) return this._preserveStack(4, _3, p, o2, u), a;
          p < 0 && this._escHandlerFb(this._collect << 8 | n), this.precedingJoinState = 0;
          break;
        case 11:
          this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
        case 12:
          this._dcsParser.hook(this._collect << 8 | n, this._params);
          break;
        case 13:
          for (let m = u + 1; ; ++m) if (m >= i || (n = e[m]) === 24 || n === 26 || n === 27 || n > 127 && n < ke) {
            this._dcsParser.put(e, u, m), u = m - 1;
            break;
          }
          break;
        case 14:
          if (a = this._dcsParser.unhook(n !== 24 && n !== 26), a) return this._preserveStack(6, [], 0, o2, u), a;
          n === 27 && (o2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
          break;
        case 4:
          this._oscParser.start();
          break;
        case 5:
          for (let m = u + 1; ; m++) if (m >= i || (n = e[m]) < 32 || n > 127 && n < ke) {
            this._oscParser.put(e, u, m), u = m - 1;
            break;
          }
          break;
        case 6:
          if (a = this._oscParser.end(n !== 24 && n !== 26), a) return this._preserveStack(5, [], 0, o2, u), a;
          n === 27 && (o2 |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
          break;
      }
      this.currentState = o2 & 15;
    }
  }
};
var dc = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/;
var fc = /^[\da-f]+$/;
function Ws(s15) {
  if (!s15) return;
  let t = s15.toLowerCase();
  if (t.indexOf("rgb:") === 0) {
    t = t.slice(4);
    let e = dc.exec(t);
    if (e) {
      let i = e[1] ? 15 : e[4] ? 255 : e[7] ? 4095 : 65535;
      return [Math.round(parseInt(e[1] || e[4] || e[7] || e[10], 16) / i * 255), Math.round(parseInt(e[2] || e[5] || e[8] || e[11], 16) / i * 255), Math.round(parseInt(e[3] || e[6] || e[9] || e[12], 16) / i * 255)];
    }
  } else if (t.indexOf("#") === 0 && (t = t.slice(1), fc.exec(t) && [3, 6, 9, 12].includes(t.length))) {
    let e = t.length / 3, i = [0, 0, 0];
    for (let r5 = 0; r5 < 3; ++r5) {
      let n = parseInt(t.slice(e * r5, e * r5 + e), 16);
      i[r5] = e === 1 ? n << 4 : e === 2 ? n : e === 3 ? n >> 4 : n >> 8;
    }
    return i;
  }
}
function Hs(s15, t) {
  let e = s15.toString(16), i = e.length < 2 ? "0" + e : e;
  switch (t) {
    case 4:
      return e[0];
    case 8:
      return i;
    case 12:
      return (i + i).slice(0, 3);
    default:
      return i + i;
  }
}
function ml(s15, t = 16) {
  let [e, i, r5] = s15;
  return `rgb:${Hs(e, t)}/${Hs(i, t)}/${Hs(r5, t)}`;
}
var mc = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 };
var ut = 131072;
var _l = 10;
function bl(s15, t) {
  if (s15 > 24) return t.setWinLines || false;
  switch (s15) {
    case 1:
      return !!t.restoreWin;
    case 2:
      return !!t.minimizeWin;
    case 3:
      return !!t.setWinPosition;
    case 4:
      return !!t.setWinSizePixels;
    case 5:
      return !!t.raiseWin;
    case 6:
      return !!t.lowerWin;
    case 7:
      return !!t.refreshWin;
    case 8:
      return !!t.setWinSizeChars;
    case 9:
      return !!t.maximizeWin;
    case 10:
      return !!t.fullscreenWin;
    case 11:
      return !!t.getWinState;
    case 13:
      return !!t.getWinPosition;
    case 14:
      return !!t.getWinSizePixels;
    case 15:
      return !!t.getScreenSizePixels;
    case 16:
      return !!t.getCellSizePixels;
    case 18:
      return !!t.getWinSizeChars;
    case 19:
      return !!t.getScreenSizeChars;
    case 20:
      return !!t.getIconTitle;
    case 21:
      return !!t.getWinTitle;
    case 22:
      return !!t.pushTitle;
    case 23:
      return !!t.popTitle;
    case 24:
      return !!t.setWinLines;
  }
  return false;
}
var vl = 5e3;
var gl = 0;
var vn = class extends D {
  constructor(e, i, r5, n, o2, l, a, u, h2 = new bn()) {
    super();
    this._bufferService = e;
    this._charsetService = i;
    this._coreService = r5;
    this._logService = n;
    this._optionsService = o2;
    this._oscLinkService = l;
    this._coreMouseService = a;
    this._unicodeService = u;
    this._parser = h2;
    this._parseBuffer = new Uint32Array(4096);
    this._stringDecoder = new er();
    this._utf8Decoder = new tr();
    this._windowTitle = "";
    this._iconName = "";
    this._windowTitleStack = [];
    this._iconNameStack = [];
    this._curAttrData = X2.clone();
    this._eraseAttrDataInternal = X2.clone();
    this._onRequestBell = this._register(new v());
    this.onRequestBell = this._onRequestBell.event;
    this._onRequestRefreshRows = this._register(new v());
    this.onRequestRefreshRows = this._onRequestRefreshRows.event;
    this._onRequestReset = this._register(new v());
    this.onRequestReset = this._onRequestReset.event;
    this._onRequestSendFocus = this._register(new v());
    this.onRequestSendFocus = this._onRequestSendFocus.event;
    this._onRequestSyncScrollBar = this._register(new v());
    this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event;
    this._onRequestWindowsOptionsReport = this._register(new v());
    this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event;
    this._onA11yChar = this._register(new v());
    this.onA11yChar = this._onA11yChar.event;
    this._onA11yTab = this._register(new v());
    this.onA11yTab = this._onA11yTab.event;
    this._onCursorMove = this._register(new v());
    this.onCursorMove = this._onCursorMove.event;
    this._onLineFeed = this._register(new v());
    this.onLineFeed = this._onLineFeed.event;
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this._onTitleChange = this._register(new v());
    this.onTitleChange = this._onTitleChange.event;
    this._onColor = this._register(new v());
    this.onColor = this._onColor.event;
    this._parseStack = { paused: false, cursorStartX: 0, cursorStartY: 0, decodedLength: 0, position: 0 };
    this._specialColors = [256, 257, 258];
    this._register(this._parser), this._dirtyRowTracker = new Zi(this._bufferService), this._activeBuffer = this._bufferService.buffer, this._register(this._bufferService.buffers.onBufferActivate((c) => this._activeBuffer = c.activeBuffer)), this._parser.setCsiHandlerFallback((c, d) => {
      this._logService.debug("Unknown CSI code: ", { identifier: this._parser.identToString(c), params: d.toArray() });
    }), this._parser.setEscHandlerFallback((c) => {
      this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(c) });
    }), this._parser.setExecuteHandlerFallback((c) => {
      this._logService.debug("Unknown EXECUTE code: ", { code: c });
    }), this._parser.setOscHandlerFallback((c, d, _3) => {
      this._logService.debug("Unknown OSC code: ", { identifier: c, action: d, data: _3 });
    }), this._parser.setDcsHandlerFallback((c, d, _3) => {
      d === "HOOK" && (_3 = _3.toArray()), this._logService.debug("Unknown DCS code: ", { identifier: this._parser.identToString(c), action: d, payload: _3 });
    }), this._parser.setPrintHandler((c, d, _3) => this.print(c, d, _3)), this._parser.registerCsiHandler({ final: "@" }, (c) => this.insertChars(c)), this._parser.registerCsiHandler({ intermediates: " ", final: "@" }, (c) => this.scrollLeft(c)), this._parser.registerCsiHandler({ final: "A" }, (c) => this.cursorUp(c)), this._parser.registerCsiHandler({ intermediates: " ", final: "A" }, (c) => this.scrollRight(c)), this._parser.registerCsiHandler({ final: "B" }, (c) => this.cursorDown(c)), this._parser.registerCsiHandler({ final: "C" }, (c) => this.cursorForward(c)), this._parser.registerCsiHandler({ final: "D" }, (c) => this.cursorBackward(c)), this._parser.registerCsiHandler({ final: "E" }, (c) => this.cursorNextLine(c)), this._parser.registerCsiHandler({ final: "F" }, (c) => this.cursorPrecedingLine(c)), this._parser.registerCsiHandler({ final: "G" }, (c) => this.cursorCharAbsolute(c)), this._parser.registerCsiHandler({ final: "H" }, (c) => this.cursorPosition(c)), this._parser.registerCsiHandler({ final: "I" }, (c) => this.cursorForwardTab(c)), this._parser.registerCsiHandler({ final: "J" }, (c) => this.eraseInDisplay(c, false)), this._parser.registerCsiHandler({ prefix: "?", final: "J" }, (c) => this.eraseInDisplay(c, true)), this._parser.registerCsiHandler({ final: "K" }, (c) => this.eraseInLine(c, false)), this._parser.registerCsiHandler({ prefix: "?", final: "K" }, (c) => this.eraseInLine(c, true)), this._parser.registerCsiHandler({ final: "L" }, (c) => this.insertLines(c)), this._parser.registerCsiHandler({ final: "M" }, (c) => this.deleteLines(c)), this._parser.registerCsiHandler({ final: "P" }, (c) => this.deleteChars(c)), this._parser.registerCsiHandler({ final: "S" }, (c) => this.scrollUp(c)), this._parser.registerCsiHandler({ final: "T" }, (c) => this.scrollDown(c)), this._parser.registerCsiHandler({ final: "X" }, (c) => this.eraseChars(c)), this._parser.registerCsiHandler({ final: "Z" }, (c) => this.cursorBackwardTab(c)), this._parser.registerCsiHandler({ final: "`" }, (c) => this.charPosAbsolute(c)), this._parser.registerCsiHandler({ final: "a" }, (c) => this.hPositionRelative(c)), this._parser.registerCsiHandler({ final: "b" }, (c) => this.repeatPrecedingCharacter(c)), this._parser.registerCsiHandler({ final: "c" }, (c) => this.sendDeviceAttributesPrimary(c)), this._parser.registerCsiHandler({ prefix: ">", final: "c" }, (c) => this.sendDeviceAttributesSecondary(c)), this._parser.registerCsiHandler({ final: "d" }, (c) => this.linePosAbsolute(c)), this._parser.registerCsiHandler({ final: "e" }, (c) => this.vPositionRelative(c)), this._parser.registerCsiHandler({ final: "f" }, (c) => this.hVPosition(c)), this._parser.registerCsiHandler({ final: "g" }, (c) => this.tabClear(c)), this._parser.registerCsiHandler({ final: "h" }, (c) => this.setMode(c)), this._parser.registerCsiHandler({ prefix: "?", final: "h" }, (c) => this.setModePrivate(c)), this._parser.registerCsiHandler({ final: "l" }, (c) => this.resetMode(c)), this._parser.registerCsiHandler({ prefix: "?", final: "l" }, (c) => this.resetModePrivate(c)), this._parser.registerCsiHandler({ final: "m" }, (c) => this.charAttributes(c)), this._parser.registerCsiHandler({ final: "n" }, (c) => this.deviceStatus(c)), this._parser.registerCsiHandler({ prefix: "?", final: "n" }, (c) => this.deviceStatusPrivate(c)), this._parser.registerCsiHandler({ intermediates: "!", final: "p" }, (c) => this.softReset(c)), this._parser.registerCsiHandler({ intermediates: " ", final: "q" }, (c) => this.setCursorStyle(c)), this._parser.registerCsiHandler({ final: "r" }, (c) => this.setScrollRegion(c)), this._parser.registerCsiHandler({ final: "s" }, (c) => this.saveCursor(c)), this._parser.registerCsiHandler({ final: "t" }, (c) => this.windowOptions(c)), this._parser.registerCsiHandler({ final: "u" }, (c) => this.restoreCursor(c)), this._parser.registerCsiHandler({ intermediates: "'", final: "}" }, (c) => this.insertColumns(c)), this._parser.registerCsiHandler({ intermediates: "'", final: "~" }, (c) => this.deleteColumns(c)), this._parser.registerCsiHandler({ intermediates: '"', final: "q" }, (c) => this.selectProtected(c)), this._parser.registerCsiHandler({ intermediates: "$", final: "p" }, (c) => this.requestMode(c, true)), this._parser.registerCsiHandler({ prefix: "?", intermediates: "$", final: "p" }, (c) => this.requestMode(c, false)), this._parser.setExecuteHandler(b.BEL, () => this.bell()), this._parser.setExecuteHandler(b.LF, () => this.lineFeed()), this._parser.setExecuteHandler(b.VT, () => this.lineFeed()), this._parser.setExecuteHandler(b.FF, () => this.lineFeed()), this._parser.setExecuteHandler(b.CR, () => this.carriageReturn()), this._parser.setExecuteHandler(b.BS, () => this.backspace()), this._parser.setExecuteHandler(b.HT, () => this.tab()), this._parser.setExecuteHandler(b.SO, () => this.shiftOut()), this._parser.setExecuteHandler(b.SI, () => this.shiftIn()), this._parser.setExecuteHandler(Ai.IND, () => this.index()), this._parser.setExecuteHandler(Ai.NEL, () => this.nextLine()), this._parser.setExecuteHandler(Ai.HTS, () => this.tabSet()), this._parser.registerOscHandler(0, new pe((c) => (this.setTitle(c), this.setIconName(c), true))), this._parser.registerOscHandler(1, new pe((c) => this.setIconName(c))), this._parser.registerOscHandler(2, new pe((c) => this.setTitle(c))), this._parser.registerOscHandler(4, new pe((c) => this.setOrReportIndexedColor(c))), this._parser.registerOscHandler(8, new pe((c) => this.setHyperlink(c))), this._parser.registerOscHandler(10, new pe((c) => this.setOrReportFgColor(c))), this._parser.registerOscHandler(11, new pe((c) => this.setOrReportBgColor(c))), this._parser.registerOscHandler(12, new pe((c) => this.setOrReportCursorColor(c))), this._parser.registerOscHandler(104, new pe((c) => this.restoreIndexedColor(c))), this._parser.registerOscHandler(110, new pe((c) => this.restoreFgColor(c))), this._parser.registerOscHandler(111, new pe((c) => this.restoreBgColor(c))), this._parser.registerOscHandler(112, new pe((c) => this.restoreCursorColor(c))), this._parser.registerEscHandler({ final: "7" }, () => this.saveCursor()), this._parser.registerEscHandler({ final: "8" }, () => this.restoreCursor()), this._parser.registerEscHandler({ final: "D" }, () => this.index()), this._parser.registerEscHandler({ final: "E" }, () => this.nextLine()), this._parser.registerEscHandler({ final: "H" }, () => this.tabSet()), this._parser.registerEscHandler({ final: "M" }, () => this.reverseIndex()), this._parser.registerEscHandler({ final: "=" }, () => this.keypadApplicationMode()), this._parser.registerEscHandler({ final: ">" }, () => this.keypadNumericMode()), this._parser.registerEscHandler({ final: "c" }, () => this.fullReset()), this._parser.registerEscHandler({ final: "n" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "o" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "|" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "}" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "~" }, () => this.setgLevel(1)), this._parser.registerEscHandler({ intermediates: "%", final: "@" }, () => this.selectDefaultCharset()), this._parser.registerEscHandler({ intermediates: "%", final: "G" }, () => this.selectDefaultCharset());
    for (let c in ne) this._parser.registerEscHandler({ intermediates: "(", final: c }, () => this.selectCharset("(" + c)), this._parser.registerEscHandler({ intermediates: ")", final: c }, () => this.selectCharset(")" + c)), this._parser.registerEscHandler({ intermediates: "*", final: c }, () => this.selectCharset("*" + c)), this._parser.registerEscHandler({ intermediates: "+", final: c }, () => this.selectCharset("+" + c)), this._parser.registerEscHandler({ intermediates: "-", final: c }, () => this.selectCharset("-" + c)), this._parser.registerEscHandler({ intermediates: ".", final: c }, () => this.selectCharset("." + c)), this._parser.registerEscHandler({ intermediates: "/", final: c }, () => this.selectCharset("/" + c));
    this._parser.registerEscHandler({ intermediates: "#", final: "8" }, () => this.screenAlignmentPattern()), this._parser.setErrorHandler((c) => (this._logService.error("Parsing error: ", c), c)), this._parser.registerDcsHandler({ intermediates: "$", final: "q" }, new Xi((c, d) => this.requestStatusString(c, d)));
  }
  getAttrData() {
    return this._curAttrData;
  }
  _preserveStack(e, i, r5, n) {
    this._parseStack.paused = true, this._parseStack.cursorStartX = e, this._parseStack.cursorStartY = i, this._parseStack.decodedLength = r5, this._parseStack.position = n;
  }
  _logSlowResolvingAsync(e) {
    this._logService.logLevel <= 3 && Promise.race([e, new Promise((i, r5) => setTimeout(() => r5("#SLOW_TIMEOUT"), vl))]).catch((i) => {
      if (i !== "#SLOW_TIMEOUT") throw i;
      console.warn(`async parser handler taking longer than ${vl} ms`);
    });
  }
  _getCurrentLinkId() {
    return this._curAttrData.extended.urlId;
  }
  parse(e, i) {
    let r5, n = this._activeBuffer.x, o2 = this._activeBuffer.y, l = 0, a = this._parseStack.paused;
    if (a) {
      if (r5 = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, i)) return this._logSlowResolvingAsync(r5), r5;
      n = this._parseStack.cursorStartX, o2 = this._parseStack.cursorStartY, this._parseStack.paused = false, e.length > ut && (l = this._parseStack.position + ut);
    }
    if (this._logService.logLevel <= 1 && this._logService.debug(`parsing data ${typeof e == "string" ? ` "${e}"` : ` "${Array.prototype.map.call(e, (c) => String.fromCharCode(c)).join("")}"`}`), this._logService.logLevel === 0 && this._logService.trace("parsing data (codes)", typeof e == "string" ? e.split("").map((c) => c.charCodeAt(0)) : e), this._parseBuffer.length < e.length && this._parseBuffer.length < ut && (this._parseBuffer = new Uint32Array(Math.min(e.length, ut))), a || this._dirtyRowTracker.clearRange(), e.length > ut) for (let c = l; c < e.length; c += ut) {
      let d = c + ut < e.length ? c + ut : e.length, _3 = typeof e == "string" ? this._stringDecoder.decode(e.substring(c, d), this._parseBuffer) : this._utf8Decoder.decode(e.subarray(c, d), this._parseBuffer);
      if (r5 = this._parser.parse(this._parseBuffer, _3)) return this._preserveStack(n, o2, _3, c), this._logSlowResolvingAsync(r5), r5;
    }
    else if (!a) {
      let c = typeof e == "string" ? this._stringDecoder.decode(e, this._parseBuffer) : this._utf8Decoder.decode(e, this._parseBuffer);
      if (r5 = this._parser.parse(this._parseBuffer, c)) return this._preserveStack(n, o2, c, 0), this._logSlowResolvingAsync(r5), r5;
    }
    (this._activeBuffer.x !== n || this._activeBuffer.y !== o2) && this._onCursorMove.fire();
    let u = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp), h2 = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
    h2 < this._bufferService.rows && this._onRequestRefreshRows.fire({ start: Math.min(h2, this._bufferService.rows - 1), end: Math.min(u, this._bufferService.rows - 1) });
  }
  print(e, i, r5) {
    let n, o2, l = this._charsetService.charset, a = this._optionsService.rawOptions.screenReaderMode, u = this._bufferService.cols, h2 = this._coreService.decPrivateModes.wraparound, c = this._coreService.modes.insertMode, d = this._curAttrData, _3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && r5 - i > 0 && _3.getWidth(this._activeBuffer.x - 1) === 2 && _3.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, d);
    let p = this._parser.precedingJoinState;
    for (let m = i; m < r5; ++m) {
      if (n = e[m], n < 127 && l) {
        let O2 = l[String.fromCharCode(n)];
        O2 && (n = O2.charCodeAt(0));
      }
      let f = this._unicodeService.charProperties(n, p);
      o2 = Ae.extractWidth(f);
      let A2 = Ae.extractShouldJoin(f), R3 = A2 ? Ae.extractWidth(p) : 0;
      if (p = f, a && this._onA11yChar.fire(Ce(n)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), this._activeBuffer.x + o2 - R3 > u) {
        if (h2) {
          let O2 = _3, I2 = this._activeBuffer.x - R3;
          for (this._activeBuffer.x = R3, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), true)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = true), _3 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y), R3 > 0 && _3 instanceof Ze && _3.copyCellsFrom(O2, I2, 0, R3, false); I2 < u; ) O2.setCellFromCodepoint(I2++, 0, 1, d);
        } else if (this._activeBuffer.x = u - 1, o2 === 2) continue;
      }
      if (A2 && this._activeBuffer.x) {
        let O2 = _3.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
        _3.addCodepointToCell(this._activeBuffer.x - O2, n, o2);
        for (let I2 = o2 - R3; --I2 >= 0; ) _3.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, d);
        continue;
      }
      if (c && (_3.insertCells(this._activeBuffer.x, o2 - R3, this._activeBuffer.getNullCell(d)), _3.getWidth(u - 1) === 2 && _3.setCellFromCodepoint(u - 1, 0, 1, d)), _3.setCellFromCodepoint(this._activeBuffer.x++, n, o2, d), o2 > 0) for (; --o2; ) _3.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, d);
    }
    this._parser.precedingJoinState = p, this._activeBuffer.x < u && r5 - i > 0 && _3.getWidth(this._activeBuffer.x) === 0 && !_3.hasContent(this._activeBuffer.x) && _3.setCellFromCodepoint(this._activeBuffer.x, 0, 1, d), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  registerCsiHandler(e, i) {
    return e.final === "t" && !e.prefix && !e.intermediates ? this._parser.registerCsiHandler(e, (r5) => bl(r5.params[0], this._optionsService.rawOptions.windowOptions) ? i(r5) : true) : this._parser.registerCsiHandler(e, i);
  }
  registerDcsHandler(e, i) {
    return this._parser.registerDcsHandler(e, new Xi(i));
  }
  registerEscHandler(e, i) {
    return this._parser.registerEscHandler(e, i);
  }
  registerOscHandler(e, i) {
    return this._parser.registerOscHandler(e, new pe(i));
  }
  bell() {
    return this._onRequestBell.fire(), true;
  }
  lineFeed() {
    return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), true;
  }
  carriageReturn() {
    return this._activeBuffer.x = 0, true;
  }
  backspace() {
    if (!this._coreService.decPrivateModes.reverseWraparound) return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, true;
    if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0) this._activeBuffer.x--;
    else if (this._activeBuffer.x === 0 && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)?.isWrapped) {
      this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
      let e = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
      e.hasWidth(this._activeBuffer.x) && !e.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
    }
    return this._restrictCursor(), true;
  }
  tab() {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let e = this._activeBuffer.x;
    return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e), true;
  }
  shiftOut() {
    return this._charsetService.setgLevel(1), true;
  }
  shiftIn() {
    return this._charsetService.setgLevel(0), true;
  }
  _restrictCursor(e = this._bufferService.cols - 1) {
    this._activeBuffer.x = Math.min(e, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  _setCursor(e, i) {
    this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e, this._activeBuffer.y = this._activeBuffer.scrollTop + i) : (this._activeBuffer.x = e, this._activeBuffer.y = i), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  _moveCursor(e, i) {
    this._restrictCursor(), this._setCursor(this._activeBuffer.x + e, this._activeBuffer.y + i);
  }
  cursorUp(e) {
    let i = this._activeBuffer.y - this._activeBuffer.scrollTop;
    return i >= 0 ? this._moveCursor(0, -Math.min(i, e.params[0] || 1)) : this._moveCursor(0, -(e.params[0] || 1)), true;
  }
  cursorDown(e) {
    let i = this._activeBuffer.scrollBottom - this._activeBuffer.y;
    return i >= 0 ? this._moveCursor(0, Math.min(i, e.params[0] || 1)) : this._moveCursor(0, e.params[0] || 1), true;
  }
  cursorForward(e) {
    return this._moveCursor(e.params[0] || 1, 0), true;
  }
  cursorBackward(e) {
    return this._moveCursor(-(e.params[0] || 1), 0), true;
  }
  cursorNextLine(e) {
    return this.cursorDown(e), this._activeBuffer.x = 0, true;
  }
  cursorPrecedingLine(e) {
    return this.cursorUp(e), this._activeBuffer.x = 0, true;
  }
  cursorCharAbsolute(e) {
    return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), true;
  }
  cursorPosition(e) {
    return this._setCursor(e.length >= 2 ? (e.params[1] || 1) - 1 : 0, (e.params[0] || 1) - 1), true;
  }
  charPosAbsolute(e) {
    return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), true;
  }
  hPositionRelative(e) {
    return this._moveCursor(e.params[0] || 1, 0), true;
  }
  linePosAbsolute(e) {
    return this._setCursor(this._activeBuffer.x, (e.params[0] || 1) - 1), true;
  }
  vPositionRelative(e) {
    return this._moveCursor(0, e.params[0] || 1), true;
  }
  hVPosition(e) {
    return this.cursorPosition(e), true;
  }
  tabClear(e) {
    let i = e.params[0];
    return i === 0 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : i === 3 && (this._activeBuffer.tabs = {}), true;
  }
  cursorForwardTab(e) {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let i = e.params[0] || 1;
    for (; i--; ) this._activeBuffer.x = this._activeBuffer.nextStop();
    return true;
  }
  cursorBackwardTab(e) {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let i = e.params[0] || 1;
    for (; i--; ) this._activeBuffer.x = this._activeBuffer.prevStop();
    return true;
  }
  selectProtected(e) {
    let i = e.params[0];
    return i === 1 && (this._curAttrData.bg |= 536870912), (i === 2 || i === 0) && (this._curAttrData.bg &= -536870913), true;
  }
  _eraseInBufferLine(e, i, r5, n = false, o2 = false) {
    let l = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
    l.replaceCells(i, r5, this._activeBuffer.getNullCell(this._eraseAttrData()), o2), n && (l.isWrapped = false);
  }
  _resetBufferLine(e, i = false) {
    let r5 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
    r5 && (r5.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), i), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e), r5.isWrapped = false);
  }
  eraseInDisplay(e, i = false) {
    this._restrictCursor(this._bufferService.cols);
    let r5;
    switch (e.params[0]) {
      case 0:
        for (r5 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(r5), this._eraseInBufferLine(r5++, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, i); r5 < this._bufferService.rows; r5++) this._resetBufferLine(r5, i);
        this._dirtyRowTracker.markDirty(r5);
        break;
      case 1:
        for (r5 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(r5), this._eraseInBufferLine(r5, 0, this._activeBuffer.x + 1, true, i), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(r5 + 1).isWrapped = false); r5--; ) this._resetBufferLine(r5, i);
        this._dirtyRowTracker.markDirty(0);
        break;
      case 2:
        if (this._optionsService.rawOptions.scrollOnEraseInDisplay) {
          for (r5 = this._bufferService.rows, this._dirtyRowTracker.markRangeDirty(0, r5 - 1); r5-- && !this._activeBuffer.lines.get(this._activeBuffer.ybase + r5)?.getTrimmedLength(); ) ;
          for (; r5 >= 0; r5--) this._bufferService.scroll(this._eraseAttrData());
        } else {
          for (r5 = this._bufferService.rows, this._dirtyRowTracker.markDirty(r5 - 1); r5--; ) this._resetBufferLine(r5, i);
          this._dirtyRowTracker.markDirty(0);
        }
        break;
      case 3:
        let n = this._activeBuffer.lines.length - this._bufferService.rows;
        n > 0 && (this._activeBuffer.lines.trimStart(n), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - n, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - n, 0), this._onScroll.fire(0));
        break;
    }
    return true;
  }
  eraseInLine(e, i = false) {
    switch (this._restrictCursor(this._bufferService.cols), e.params[0]) {
      case 0:
        this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, i);
        break;
      case 1:
        this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, false, i);
        break;
      case 2:
        this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, true, i);
        break;
    }
    return this._dirtyRowTracker.markDirty(this._activeBuffer.y), true;
  }
  insertLines(e) {
    this._restrictCursor();
    let i = e.params[0] || 1;
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let r5 = this._activeBuffer.ybase + this._activeBuffer.y, n = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, o2 = this._bufferService.rows - 1 + this._activeBuffer.ybase - n + 1;
    for (; i--; ) this._activeBuffer.lines.splice(o2 - 1, 1), this._activeBuffer.lines.splice(r5, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
  }
  deleteLines(e) {
    this._restrictCursor();
    let i = e.params[0] || 1;
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let r5 = this._activeBuffer.ybase + this._activeBuffer.y, n;
    for (n = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, n = this._bufferService.rows - 1 + this._activeBuffer.ybase - n; i--; ) this._activeBuffer.lines.splice(r5, 1), this._activeBuffer.lines.splice(n, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
  }
  insertChars(e) {
    this._restrictCursor();
    let i = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i && (i.insertCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  deleteChars(e) {
    this._restrictCursor();
    let i = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i && (i.deleteCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  scrollUp(e) {
    let i = e.params[0] || 1;
    for (; i--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollDown(e) {
    let i = e.params[0] || 1;
    for (; i--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(X2));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollLeft(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e.params[0] || 1;
    for (let r5 = this._activeBuffer.scrollTop; r5 <= this._activeBuffer.scrollBottom; ++r5) {
      let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + r5);
      n.deleteCells(0, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollRight(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e.params[0] || 1;
    for (let r5 = this._activeBuffer.scrollTop; r5 <= this._activeBuffer.scrollBottom; ++r5) {
      let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + r5);
      n.insertCells(0, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  insertColumns(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e.params[0] || 1;
    for (let r5 = this._activeBuffer.scrollTop; r5 <= this._activeBuffer.scrollBottom; ++r5) {
      let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + r5);
      n.insertCells(this._activeBuffer.x, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  deleteColumns(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i = e.params[0] || 1;
    for (let r5 = this._activeBuffer.scrollTop; r5 <= this._activeBuffer.scrollBottom; ++r5) {
      let n = this._activeBuffer.lines.get(this._activeBuffer.ybase + r5);
      n.deleteCells(this._activeBuffer.x, i, this._activeBuffer.getNullCell(this._eraseAttrData())), n.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  eraseChars(e) {
    this._restrictCursor();
    let i = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i && (i.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  repeatPrecedingCharacter(e) {
    let i = this._parser.precedingJoinState;
    if (!i) return true;
    let r5 = e.params[0] || 1, n = Ae.extractWidth(i), o2 = this._activeBuffer.x - n, a = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(o2), u = new Uint32Array(a.length * r5), h2 = 0;
    for (let d = 0; d < a.length; ) {
      let _3 = a.codePointAt(d) || 0;
      u[h2++] = _3, d += _3 > 65535 ? 2 : 1;
    }
    let c = h2;
    for (let d = 1; d < r5; ++d) u.copyWithin(c, 0, h2), c += h2;
    return this.print(u, 0, c), true;
  }
  sendDeviceAttributesPrimary(e) {
    return e.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(b.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(b.ESC + "[?6c")), true;
  }
  sendDeviceAttributesSecondary(e) {
    return e.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(b.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(b.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(b.ESC + "[>83;40003;0c")), true;
  }
  _is(e) {
    return (this._optionsService.rawOptions.termName + "").indexOf(e) === 0;
  }
  setMode(e) {
    for (let i = 0; i < e.length; i++) switch (e.params[i]) {
      case 4:
        this._coreService.modes.insertMode = true;
        break;
      case 20:
        this._optionsService.options.convertEol = true;
        break;
    }
    return true;
  }
  setModePrivate(e) {
    for (let i = 0; i < e.length; i++) switch (e.params[i]) {
      case 1:
        this._coreService.decPrivateModes.applicationCursorKeys = true;
        break;
      case 2:
        this._charsetService.setgCharset(0, Je), this._charsetService.setgCharset(1, Je), this._charsetService.setgCharset(2, Je), this._charsetService.setgCharset(3, Je);
        break;
      case 3:
        this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
        break;
      case 6:
        this._coreService.decPrivateModes.origin = true, this._setCursor(0, 0);
        break;
      case 7:
        this._coreService.decPrivateModes.wraparound = true;
        break;
      case 12:
        this._optionsService.options.cursorBlink = true;
        break;
      case 45:
        this._coreService.decPrivateModes.reverseWraparound = true;
        break;
      case 66:
        this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire();
        break;
      case 9:
        this._coreMouseService.activeProtocol = "X10";
        break;
      case 1e3:
        this._coreMouseService.activeProtocol = "VT200";
        break;
      case 1002:
        this._coreMouseService.activeProtocol = "DRAG";
        break;
      case 1003:
        this._coreMouseService.activeProtocol = "ANY";
        break;
      case 1004:
        this._coreService.decPrivateModes.sendFocus = true, this._onRequestSendFocus.fire();
        break;
      case 1005:
        this._logService.debug("DECSET 1005 not supported (see #2507)");
        break;
      case 1006:
        this._coreMouseService.activeEncoding = "SGR";
        break;
      case 1015:
        this._logService.debug("DECSET 1015 not supported (see #2507)");
        break;
      case 1016:
        this._coreMouseService.activeEncoding = "SGR_PIXELS";
        break;
      case 25:
        this._coreService.isCursorHidden = false;
        break;
      case 1048:
        this.saveCursor();
        break;
      case 1049:
        this.saveCursor();
      case 47:
      case 1047:
        this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
        break;
      case 2004:
        this._coreService.decPrivateModes.bracketedPasteMode = true;
        break;
      case 2026:
        this._coreService.decPrivateModes.synchronizedOutput = true;
        break;
    }
    return true;
  }
  resetMode(e) {
    for (let i = 0; i < e.length; i++) switch (e.params[i]) {
      case 4:
        this._coreService.modes.insertMode = false;
        break;
      case 20:
        this._optionsService.options.convertEol = false;
        break;
    }
    return true;
  }
  resetModePrivate(e) {
    for (let i = 0; i < e.length; i++) switch (e.params[i]) {
      case 1:
        this._coreService.decPrivateModes.applicationCursorKeys = false;
        break;
      case 3:
        this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
        break;
      case 6:
        this._coreService.decPrivateModes.origin = false, this._setCursor(0, 0);
        break;
      case 7:
        this._coreService.decPrivateModes.wraparound = false;
        break;
      case 12:
        this._optionsService.options.cursorBlink = false;
        break;
      case 45:
        this._coreService.decPrivateModes.reverseWraparound = false;
        break;
      case 66:
        this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire();
        break;
      case 9:
      case 1e3:
      case 1002:
      case 1003:
        this._coreMouseService.activeProtocol = "NONE";
        break;
      case 1004:
        this._coreService.decPrivateModes.sendFocus = false;
        break;
      case 1005:
        this._logService.debug("DECRST 1005 not supported (see #2507)");
        break;
      case 1006:
        this._coreMouseService.activeEncoding = "DEFAULT";
        break;
      case 1015:
        this._logService.debug("DECRST 1015 not supported (see #2507)");
        break;
      case 1016:
        this._coreMouseService.activeEncoding = "DEFAULT";
        break;
      case 25:
        this._coreService.isCursorHidden = true;
        break;
      case 1048:
        this.restoreCursor();
        break;
      case 1049:
      case 47:
      case 1047:
        this._bufferService.buffers.activateNormalBuffer(), e.params[i] === 1049 && this.restoreCursor(), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
        break;
      case 2004:
        this._coreService.decPrivateModes.bracketedPasteMode = false;
        break;
      case 2026:
        this._coreService.decPrivateModes.synchronizedOutput = false, this._onRequestRefreshRows.fire(void 0);
        break;
    }
    return true;
  }
  requestMode(e, i) {
    let r5;
    ((P3) => (P3[P3.NOT_RECOGNIZED = 0] = "NOT_RECOGNIZED", P3[P3.SET = 1] = "SET", P3[P3.RESET = 2] = "RESET", P3[P3.PERMANENTLY_SET = 3] = "PERMANENTLY_SET", P3[P3.PERMANENTLY_RESET = 4] = "PERMANENTLY_RESET"))(r5 ||= {});
    let n = this._coreService.decPrivateModes, { activeProtocol: o2, activeEncoding: l } = this._coreMouseService, a = this._coreService, { buffers: u, cols: h2 } = this._bufferService, { active: c, alt: d } = u, _3 = this._optionsService.rawOptions, p = (A2, R3) => (a.triggerDataEvent(`${b.ESC}[${i ? "" : "?"}${A2};${R3}$y`), true), m = (A2) => A2 ? 1 : 2, f = e.params[0];
    return i ? f === 2 ? p(f, 4) : f === 4 ? p(f, m(a.modes.insertMode)) : f === 12 ? p(f, 3) : f === 20 ? p(f, m(_3.convertEol)) : p(f, 0) : f === 1 ? p(f, m(n.applicationCursorKeys)) : f === 3 ? p(f, _3.windowOptions.setWinLines ? h2 === 80 ? 2 : h2 === 132 ? 1 : 0 : 0) : f === 6 ? p(f, m(n.origin)) : f === 7 ? p(f, m(n.wraparound)) : f === 8 ? p(f, 3) : f === 9 ? p(f, m(o2 === "X10")) : f === 12 ? p(f, m(_3.cursorBlink)) : f === 25 ? p(f, m(!a.isCursorHidden)) : f === 45 ? p(f, m(n.reverseWraparound)) : f === 66 ? p(f, m(n.applicationKeypad)) : f === 67 ? p(f, 4) : f === 1e3 ? p(f, m(o2 === "VT200")) : f === 1002 ? p(f, m(o2 === "DRAG")) : f === 1003 ? p(f, m(o2 === "ANY")) : f === 1004 ? p(f, m(n.sendFocus)) : f === 1005 ? p(f, 4) : f === 1006 ? p(f, m(l === "SGR")) : f === 1015 ? p(f, 4) : f === 1016 ? p(f, m(l === "SGR_PIXELS")) : f === 1048 ? p(f, 1) : f === 47 || f === 1047 || f === 1049 ? p(f, m(c === d)) : f === 2004 ? p(f, m(n.bracketedPasteMode)) : f === 2026 ? p(f, m(n.synchronizedOutput)) : p(f, 0);
  }
  _updateAttrColor(e, i, r5, n, o2) {
    return i === 2 ? (e |= 50331648, e &= -16777216, e |= De.fromColorRGB([r5, n, o2])) : i === 5 && (e &= -50331904, e |= 33554432 | r5 & 255), e;
  }
  _extractColor(e, i, r5) {
    let n = [0, 0, -1, 0, 0, 0], o2 = 0, l = 0;
    do {
      if (n[l + o2] = e.params[i + l], e.hasSubParams(i + l)) {
        let a = e.getSubParams(i + l), u = 0;
        do
          n[1] === 5 && (o2 = 1), n[l + u + 1 + o2] = a[u];
        while (++u < a.length && u + l + 1 + o2 < n.length);
        break;
      }
      if (n[1] === 5 && l + o2 >= 2 || n[1] === 2 && l + o2 >= 5) break;
      n[1] && (o2 = 1);
    } while (++l + i < e.length && l + o2 < n.length);
    for (let a = 2; a < n.length; ++a) n[a] === -1 && (n[a] = 0);
    switch (n[0]) {
      case 38:
        r5.fg = this._updateAttrColor(r5.fg, n[1], n[3], n[4], n[5]);
        break;
      case 48:
        r5.bg = this._updateAttrColor(r5.bg, n[1], n[3], n[4], n[5]);
        break;
      case 58:
        r5.extended = r5.extended.clone(), r5.extended.underlineColor = this._updateAttrColor(r5.extended.underlineColor, n[1], n[3], n[4], n[5]);
    }
    return l;
  }
  _processUnderline(e, i) {
    i.extended = i.extended.clone(), (!~e || e > 5) && (e = 1), i.extended.underlineStyle = e, i.fg |= 268435456, e === 0 && (i.fg &= -268435457), i.updateExtended();
  }
  _processSGR0(e) {
    e.fg = X2.fg, e.bg = X2.bg, e.extended = e.extended.clone(), e.extended.underlineStyle = 0, e.extended.underlineColor &= -67108864, e.updateExtended();
  }
  charAttributes(e) {
    if (e.length === 1 && e.params[0] === 0) return this._processSGR0(this._curAttrData), true;
    let i = e.length, r5, n = this._curAttrData;
    for (let o2 = 0; o2 < i; o2++) r5 = e.params[o2], r5 >= 30 && r5 <= 37 ? (n.fg &= -50331904, n.fg |= 16777216 | r5 - 30) : r5 >= 40 && r5 <= 47 ? (n.bg &= -50331904, n.bg |= 16777216 | r5 - 40) : r5 >= 90 && r5 <= 97 ? (n.fg &= -50331904, n.fg |= 16777216 | r5 - 90 | 8) : r5 >= 100 && r5 <= 107 ? (n.bg &= -50331904, n.bg |= 16777216 | r5 - 100 | 8) : r5 === 0 ? this._processSGR0(n) : r5 === 1 ? n.fg |= 134217728 : r5 === 3 ? n.bg |= 67108864 : r5 === 4 ? (n.fg |= 268435456, this._processUnderline(e.hasSubParams(o2) ? e.getSubParams(o2)[0] : 1, n)) : r5 === 5 ? n.fg |= 536870912 : r5 === 7 ? n.fg |= 67108864 : r5 === 8 ? n.fg |= 1073741824 : r5 === 9 ? n.fg |= 2147483648 : r5 === 2 ? n.bg |= 134217728 : r5 === 21 ? this._processUnderline(2, n) : r5 === 22 ? (n.fg &= -134217729, n.bg &= -134217729) : r5 === 23 ? n.bg &= -67108865 : r5 === 24 ? (n.fg &= -268435457, this._processUnderline(0, n)) : r5 === 25 ? n.fg &= -536870913 : r5 === 27 ? n.fg &= -67108865 : r5 === 28 ? n.fg &= -1073741825 : r5 === 29 ? n.fg &= 2147483647 : r5 === 39 ? (n.fg &= -67108864, n.fg |= X2.fg & 16777215) : r5 === 49 ? (n.bg &= -67108864, n.bg |= X2.bg & 16777215) : r5 === 38 || r5 === 48 || r5 === 58 ? o2 += this._extractColor(e, o2, n) : r5 === 53 ? n.bg |= 1073741824 : r5 === 55 ? n.bg &= -1073741825 : r5 === 59 ? (n.extended = n.extended.clone(), n.extended.underlineColor = -1, n.updateExtended()) : r5 === 100 ? (n.fg &= -67108864, n.fg |= X2.fg & 16777215, n.bg &= -67108864, n.bg |= X2.bg & 16777215) : this._logService.debug("Unknown SGR attribute: %d.", r5);
    return true;
  }
  deviceStatus(e) {
    switch (e.params[0]) {
      case 5:
        this._coreService.triggerDataEvent(`${b.ESC}[0n`);
        break;
      case 6:
        let i = this._activeBuffer.y + 1, r5 = this._activeBuffer.x + 1;
        this._coreService.triggerDataEvent(`${b.ESC}[${i};${r5}R`);
        break;
    }
    return true;
  }
  deviceStatusPrivate(e) {
    switch (e.params[0]) {
      case 6:
        let i = this._activeBuffer.y + 1, r5 = this._activeBuffer.x + 1;
        this._coreService.triggerDataEvent(`${b.ESC}[?${i};${r5}R`);
        break;
      case 15:
        break;
      case 25:
        break;
      case 26:
        break;
      case 53:
        break;
    }
    return true;
  }
  softReset(e) {
    return this._coreService.isCursorHidden = false, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = X2.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = false, true;
  }
  setCursorStyle(e) {
    let i = e.length === 0 ? 1 : e.params[0];
    if (i === 0) this._coreService.decPrivateModes.cursorStyle = void 0, this._coreService.decPrivateModes.cursorBlink = void 0;
    else {
      switch (i) {
        case 1:
        case 2:
          this._coreService.decPrivateModes.cursorStyle = "block";
          break;
        case 3:
        case 4:
          this._coreService.decPrivateModes.cursorStyle = "underline";
          break;
        case 5:
        case 6:
          this._coreService.decPrivateModes.cursorStyle = "bar";
          break;
      }
      let r5 = i % 2 === 1;
      this._coreService.decPrivateModes.cursorBlink = r5;
    }
    return true;
  }
  setScrollRegion(e) {
    let i = e.params[0] || 1, r5;
    return (e.length < 2 || (r5 = e.params[1]) > this._bufferService.rows || r5 === 0) && (r5 = this._bufferService.rows), r5 > i && (this._activeBuffer.scrollTop = i - 1, this._activeBuffer.scrollBottom = r5 - 1, this._setCursor(0, 0)), true;
  }
  windowOptions(e) {
    if (!bl(e.params[0], this._optionsService.rawOptions.windowOptions)) return true;
    let i = e.length > 1 ? e.params[1] : 0;
    switch (e.params[0]) {
      case 14:
        i !== 2 && this._onRequestWindowsOptionsReport.fire(0);
        break;
      case 16:
        this._onRequestWindowsOptionsReport.fire(1);
        break;
      case 18:
        this._bufferService && this._coreService.triggerDataEvent(`${b.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
        break;
      case 22:
        (i === 0 || i === 2) && (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > _l && this._windowTitleStack.shift()), (i === 0 || i === 1) && (this._iconNameStack.push(this._iconName), this._iconNameStack.length > _l && this._iconNameStack.shift());
        break;
      case 23:
        (i === 0 || i === 2) && this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), (i === 0 || i === 1) && this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
        break;
    }
    return true;
  }
  saveCursor(e) {
    return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, true;
  }
  restoreCursor(e) {
    return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), true;
  }
  setTitle(e) {
    return this._windowTitle = e, this._onTitleChange.fire(e), true;
  }
  setIconName(e) {
    return this._iconName = e, true;
  }
  setOrReportIndexedColor(e) {
    let i = [], r5 = e.split(";");
    for (; r5.length > 1; ) {
      let n = r5.shift(), o2 = r5.shift();
      if (/^\d+$/.exec(n)) {
        let l = parseInt(n);
        if (Sl(l)) if (o2 === "?") i.push({ type: 0, index: l });
        else {
          let a = Ws(o2);
          a && i.push({ type: 1, index: l, color: a });
        }
      }
    }
    return i.length && this._onColor.fire(i), true;
  }
  setHyperlink(e) {
    let i = e.indexOf(";");
    if (i === -1) return true;
    let r5 = e.slice(0, i).trim(), n = e.slice(i + 1);
    return n ? this._createHyperlink(r5, n) : r5.trim() ? false : this._finishHyperlink();
  }
  _createHyperlink(e, i) {
    this._getCurrentLinkId() && this._finishHyperlink();
    let r5 = e.split(":"), n, o2 = r5.findIndex((l) => l.startsWith("id="));
    return o2 !== -1 && (n = r5[o2].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({ id: n, uri: i }), this._curAttrData.updateExtended(), true;
  }
  _finishHyperlink() {
    return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), true;
  }
  _setOrReportSpecialColor(e, i) {
    let r5 = e.split(";");
    for (let n = 0; n < r5.length && !(i >= this._specialColors.length); ++n, ++i) if (r5[n] === "?") this._onColor.fire([{ type: 0, index: this._specialColors[i] }]);
    else {
      let o2 = Ws(r5[n]);
      o2 && this._onColor.fire([{ type: 1, index: this._specialColors[i], color: o2 }]);
    }
    return true;
  }
  setOrReportFgColor(e) {
    return this._setOrReportSpecialColor(e, 0);
  }
  setOrReportBgColor(e) {
    return this._setOrReportSpecialColor(e, 1);
  }
  setOrReportCursorColor(e) {
    return this._setOrReportSpecialColor(e, 2);
  }
  restoreIndexedColor(e) {
    if (!e) return this._onColor.fire([{ type: 2 }]), true;
    let i = [], r5 = e.split(";");
    for (let n = 0; n < r5.length; ++n) if (/^\d+$/.exec(r5[n])) {
      let o2 = parseInt(r5[n]);
      Sl(o2) && i.push({ type: 2, index: o2 });
    }
    return i.length && this._onColor.fire(i), true;
  }
  restoreFgColor(e) {
    return this._onColor.fire([{ type: 2, index: 256 }]), true;
  }
  restoreBgColor(e) {
    return this._onColor.fire([{ type: 2, index: 257 }]), true;
  }
  restoreCursorColor(e) {
    return this._onColor.fire([{ type: 2, index: 258 }]), true;
  }
  nextLine() {
    return this._activeBuffer.x = 0, this.index(), true;
  }
  keypadApplicationMode() {
    return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire(), true;
  }
  keypadNumericMode() {
    return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire(), true;
  }
  selectDefaultCharset() {
    return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, Je), true;
  }
  selectCharset(e) {
    return e.length !== 2 ? (this.selectDefaultCharset(), true) : (e[0] === "/" || this._charsetService.setgCharset(mc[e[0]], ne[e[1]] || Je), true);
  }
  index() {
    return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), true;
  }
  tabSet() {
    return this._activeBuffer.tabs[this._activeBuffer.x] = true, true;
  }
  reverseIndex() {
    if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
      let e = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
      this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
    } else this._activeBuffer.y--, this._restrictCursor();
    return true;
  }
  fullReset() {
    return this._parser.reset(), this._onRequestReset.fire(), true;
  }
  reset() {
    this._curAttrData = X2.clone(), this._eraseAttrDataInternal = X2.clone();
  }
  _eraseAttrData() {
    return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= this._curAttrData.bg & 67108863, this._eraseAttrDataInternal;
  }
  setgLevel(e) {
    return this._charsetService.setgLevel(e), true;
  }
  screenAlignmentPattern() {
    let e = new q();
    e.content = 1 << 22 | 69, e.fg = this._curAttrData.fg, e.bg = this._curAttrData.bg, this._setCursor(0, 0);
    for (let i = 0; i < this._bufferService.rows; ++i) {
      let r5 = this._activeBuffer.ybase + this._activeBuffer.y + i, n = this._activeBuffer.lines.get(r5);
      n && (n.fill(e), n.isWrapped = false);
    }
    return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), true;
  }
  requestStatusString(e, i) {
    let r5 = (a) => (this._coreService.triggerDataEvent(`${b.ESC}${a}${b.ESC}\\`), true), n = this._bufferService.buffer, o2 = this._optionsService.rawOptions, l = { block: 2, underline: 4, bar: 6 };
    return r5(e === '"q' ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : e === '"p' ? 'P1$r61;1"p' : e === "r" ? `P1$r${n.scrollTop + 1};${n.scrollBottom + 1}r` : e === "m" ? "P1$r0m" : e === " q" ? `P1$r${l[o2.cursorStyle] - (o2.cursorBlink ? 1 : 0)} q` : "P0$r");
  }
  markRangeDirty(e, i) {
    this._dirtyRowTracker.markRangeDirty(e, i);
  }
};
var Zi = class {
  constructor(t) {
    this._bufferService = t;
    this.clearRange();
  }
  clearRange() {
    this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
  }
  markDirty(t) {
    t < this.start ? this.start = t : t > this.end && (this.end = t);
  }
  markRangeDirty(t, e) {
    t > e && (gl = t, t = e, e = gl), t < this.start && (this.start = t), e > this.end && (this.end = e);
  }
  markAllDirty() {
    this.markRangeDirty(0, this._bufferService.rows - 1);
  }
};
Zi = M([S(0, F)], Zi);
function Sl(s15) {
  return 0 <= s15 && s15 < 256;
}
var _c = 5e7;
var El = 12;
var bc = 50;
var gn = class extends D {
  constructor(e) {
    super();
    this._action = e;
    this._writeBuffer = [];
    this._callbacks = [];
    this._pendingData = 0;
    this._bufferOffset = 0;
    this._isSyncWriting = false;
    this._syncCalls = 0;
    this._didUserInput = false;
    this._onWriteParsed = this._register(new v());
    this.onWriteParsed = this._onWriteParsed.event;
  }
  handleUserInput() {
    this._didUserInput = true;
  }
  writeSync(e, i) {
    if (i !== void 0 && this._syncCalls > i) {
      this._syncCalls = 0;
      return;
    }
    if (this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting) return;
    this._isSyncWriting = true;
    let r5;
    for (; r5 = this._writeBuffer.shift(); ) {
      this._action(r5);
      let n = this._callbacks.shift();
      n && n();
    }
    this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = false, this._syncCalls = 0;
  }
  write(e, i) {
    if (this._pendingData > _c) throw new Error("write data discarded, use flow control to avoid losing data");
    if (!this._writeBuffer.length) {
      if (this._bufferOffset = 0, this._didUserInput) {
        this._didUserInput = false, this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(i), this._innerWrite();
        return;
      }
      setTimeout(() => this._innerWrite());
    }
    this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(i);
  }
  _innerWrite(e = 0, i = true) {
    let r5 = e || performance.now();
    for (; this._writeBuffer.length > this._bufferOffset; ) {
      let n = this._writeBuffer[this._bufferOffset], o2 = this._action(n, i);
      if (o2) {
        let a = (u) => performance.now() - r5 >= El ? setTimeout(() => this._innerWrite(0, u)) : this._innerWrite(r5, u);
        o2.catch((u) => (queueMicrotask(() => {
          throw u;
        }), Promise.resolve(false))).then(a);
        return;
      }
      let l = this._callbacks[this._bufferOffset];
      if (l && l(), this._bufferOffset++, this._pendingData -= n.length, performance.now() - r5 >= El) break;
    }
    this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > bc && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout(() => this._innerWrite())) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
  }
};
var ui = class {
  constructor(t) {
    this._bufferService = t;
    this._nextId = 1;
    this._entriesWithId = /* @__PURE__ */ new Map();
    this._dataByLinkId = /* @__PURE__ */ new Map();
  }
  registerLink(t) {
    let e = this._bufferService.buffer;
    if (t.id === void 0) {
      let a = e.addMarker(e.ybase + e.y), u = { data: t, id: this._nextId++, lines: [a] };
      return a.onDispose(() => this._removeMarkerFromLink(u, a)), this._dataByLinkId.set(u.id, u), u.id;
    }
    let i = t, r5 = this._getEntryIdKey(i), n = this._entriesWithId.get(r5);
    if (n) return this.addLineToLink(n.id, e.ybase + e.y), n.id;
    let o2 = e.addMarker(e.ybase + e.y), l = { id: this._nextId++, key: this._getEntryIdKey(i), data: i, lines: [o2] };
    return o2.onDispose(() => this._removeMarkerFromLink(l, o2)), this._entriesWithId.set(l.key, l), this._dataByLinkId.set(l.id, l), l.id;
  }
  addLineToLink(t, e) {
    let i = this._dataByLinkId.get(t);
    if (i && i.lines.every((r5) => r5.line !== e)) {
      let r5 = this._bufferService.buffer.addMarker(e);
      i.lines.push(r5), r5.onDispose(() => this._removeMarkerFromLink(i, r5));
    }
  }
  getLinkData(t) {
    return this._dataByLinkId.get(t)?.data;
  }
  _getEntryIdKey(t) {
    return `${t.id};;${t.uri}`;
  }
  _removeMarkerFromLink(t, e) {
    let i = t.lines.indexOf(e);
    i !== -1 && (t.lines.splice(i, 1), t.lines.length === 0 && (t.data.id !== void 0 && this._entriesWithId.delete(t.key), this._dataByLinkId.delete(t.id)));
  }
};
ui = M([S(0, F)], ui);
var Tl = false;
var Sn = class extends D {
  constructor(e) {
    super();
    this._windowsWrappingHeuristics = this._register(new ye());
    this._onBinary = this._register(new v());
    this.onBinary = this._onBinary.event;
    this._onData = this._register(new v());
    this.onData = this._onData.event;
    this._onLineFeed = this._register(new v());
    this.onLineFeed = this._onLineFeed.event;
    this._onResize = this._register(new v());
    this.onResize = this._onResize.event;
    this._onWriteParsed = this._register(new v());
    this.onWriteParsed = this._onWriteParsed.event;
    this._onScroll = this._register(new v());
    this._instantiationService = new ln(), this.optionsService = this._register(new dn(e)), this._instantiationService.setService(H, this.optionsService), this._bufferService = this._register(this._instantiationService.createInstance(ni)), this._instantiationService.setService(F, this._bufferService), this._logService = this._register(this._instantiationService.createInstance(ii)), this._instantiationService.setService(nr, this._logService), this.coreService = this._register(this._instantiationService.createInstance(li)), this._instantiationService.setService(ge, this.coreService), this.coreMouseService = this._register(this._instantiationService.createInstance(ai)), this._instantiationService.setService(rr, this.coreMouseService), this.unicodeService = this._register(this._instantiationService.createInstance(Ae)), this._instantiationService.setService(Js, this.unicodeService), this._charsetService = this._instantiationService.createInstance(pn), this._instantiationService.setService(Zs, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(ui), this._instantiationService.setService(sr, this._oscLinkService), this._inputHandler = this._register(new vn(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this._register($.forward(this._inputHandler.onLineFeed, this._onLineFeed)), this._register(this._inputHandler), this._register($.forward(this._bufferService.onResize, this._onResize)), this._register($.forward(this.coreService.onData, this._onData)), this._register($.forward(this.coreService.onBinary, this._onBinary)), this._register(this.coreService.onRequestScrollToBottom(() => this.scrollToBottom(true))), this._register(this.coreService.onUserInput(() => this._writeBuffer.handleUserInput())), this._register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], () => this._handleWindowsPtyOptionChange())), this._register(this._bufferService.onScroll(() => {
      this._onScroll.fire({ position: this._bufferService.buffer.ydisp }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
    })), this._writeBuffer = this._register(new gn((i, r5) => this._inputHandler.parse(i, r5))), this._register($.forward(this._writeBuffer.onWriteParsed, this._onWriteParsed));
  }
  get onScroll() {
    return this._onScrollApi || (this._onScrollApi = this._register(new v()), this._onScroll.event((e) => {
      this._onScrollApi?.fire(e.position);
    })), this._onScrollApi.event;
  }
  get cols() {
    return this._bufferService.cols;
  }
  get rows() {
    return this._bufferService.rows;
  }
  get buffers() {
    return this._bufferService.buffers;
  }
  get options() {
    return this.optionsService.options;
  }
  set options(e) {
    for (let i in e) this.optionsService.options[i] = e[i];
  }
  write(e, i) {
    this._writeBuffer.write(e, i);
  }
  writeSync(e, i) {
    this._logService.logLevel <= 3 && !Tl && (this._logService.warn("writeSync is unreliable and will be removed soon."), Tl = true), this._writeBuffer.writeSync(e, i);
  }
  input(e, i = true) {
    this.coreService.triggerDataEvent(e, i);
  }
  resize(e, i) {
    isNaN(e) || isNaN(i) || (e = Math.max(e, ks), i = Math.max(i, Cs), this._bufferService.resize(e, i));
  }
  scroll(e, i = false) {
    this._bufferService.scroll(e, i);
  }
  scrollLines(e, i) {
    this._bufferService.scrollLines(e, i);
  }
  scrollPages(e) {
    this.scrollLines(e * (this.rows - 1));
  }
  scrollToTop() {
    this.scrollLines(-this._bufferService.buffer.ydisp);
  }
  scrollToBottom(e) {
    this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
  }
  scrollToLine(e) {
    let i = e - this._bufferService.buffer.ydisp;
    i !== 0 && this.scrollLines(i);
  }
  registerEscHandler(e, i) {
    return this._inputHandler.registerEscHandler(e, i);
  }
  registerDcsHandler(e, i) {
    return this._inputHandler.registerDcsHandler(e, i);
  }
  registerCsiHandler(e, i) {
    return this._inputHandler.registerCsiHandler(e, i);
  }
  registerOscHandler(e, i) {
    return this._inputHandler.registerOscHandler(e, i);
  }
  _setup() {
    this._handleWindowsPtyOptionChange();
  }
  reset() {
    this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
  }
  _handleWindowsPtyOptionChange() {
    let e = false, i = this.optionsService.rawOptions.windowsPty;
    i && i.buildNumber !== void 0 && i.buildNumber !== void 0 ? e = i.backend === "conpty" && i.buildNumber < 21376 : this.optionsService.rawOptions.windowsMode && (e = true), e ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
  }
  _enableWindowsWrappingHeuristics() {
    if (!this._windowsWrappingHeuristics.value) {
      let e = [];
      e.push(this.onLineFeed(Bs.bind(null, this._bufferService))), e.push(this.registerCsiHandler({ final: "H" }, () => (Bs(this._bufferService), false))), this._windowsWrappingHeuristics.value = C(() => {
        for (let i of e) i.dispose();
      });
    }
  }
};
var gc = { 48: ["0", ")"], 49: ["1", "!"], 50: ["2", "@"], 51: ["3", "#"], 52: ["4", "$"], 53: ["5", "%"], 54: ["6", "^"], 55: ["7", "&"], 56: ["8", "*"], 57: ["9", "("], 186: [";", ":"], 187: ["=", "+"], 188: [",", "<"], 189: ["-", "_"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"], 219: ["[", "{"], 220: ["\\", "|"], 221: ["]", "}"], 222: ["'", '"'] };
function Il(s15, t, e, i) {
  let r5 = { type: 0, cancel: false, key: void 0 }, n = (s15.shiftKey ? 1 : 0) | (s15.altKey ? 2 : 0) | (s15.ctrlKey ? 4 : 0) | (s15.metaKey ? 8 : 0);
  switch (s15.keyCode) {
    case 0:
      s15.key === "UIKeyInputUpArrow" ? t ? r5.key = b.ESC + "OA" : r5.key = b.ESC + "[A" : s15.key === "UIKeyInputLeftArrow" ? t ? r5.key = b.ESC + "OD" : r5.key = b.ESC + "[D" : s15.key === "UIKeyInputRightArrow" ? t ? r5.key = b.ESC + "OC" : r5.key = b.ESC + "[C" : s15.key === "UIKeyInputDownArrow" && (t ? r5.key = b.ESC + "OB" : r5.key = b.ESC + "[B");
      break;
    case 8:
      r5.key = s15.ctrlKey ? "\b" : b.DEL, s15.altKey && (r5.key = b.ESC + r5.key);
      break;
    case 9:
      if (s15.shiftKey) {
        r5.key = b.ESC + "[Z";
        break;
      }
      r5.key = b.HT, r5.cancel = true;
      break;
    case 13:
      r5.key = s15.altKey ? b.ESC + b.CR : b.CR, r5.cancel = true;
      break;
    case 27:
      r5.key = b.ESC, s15.altKey && (r5.key = b.ESC + b.ESC), r5.cancel = true;
      break;
    case 37:
      if (s15.metaKey) break;
      n ? r5.key = b.ESC + "[1;" + (n + 1) + "D" : t ? r5.key = b.ESC + "OD" : r5.key = b.ESC + "[D";
      break;
    case 39:
      if (s15.metaKey) break;
      n ? r5.key = b.ESC + "[1;" + (n + 1) + "C" : t ? r5.key = b.ESC + "OC" : r5.key = b.ESC + "[C";
      break;
    case 38:
      if (s15.metaKey) break;
      n ? r5.key = b.ESC + "[1;" + (n + 1) + "A" : t ? r5.key = b.ESC + "OA" : r5.key = b.ESC + "[A";
      break;
    case 40:
      if (s15.metaKey) break;
      n ? r5.key = b.ESC + "[1;" + (n + 1) + "B" : t ? r5.key = b.ESC + "OB" : r5.key = b.ESC + "[B";
      break;
    case 45:
      !s15.shiftKey && !s15.ctrlKey && (r5.key = b.ESC + "[2~");
      break;
    case 46:
      n ? r5.key = b.ESC + "[3;" + (n + 1) + "~" : r5.key = b.ESC + "[3~";
      break;
    case 36:
      n ? r5.key = b.ESC + "[1;" + (n + 1) + "H" : t ? r5.key = b.ESC + "OH" : r5.key = b.ESC + "[H";
      break;
    case 35:
      n ? r5.key = b.ESC + "[1;" + (n + 1) + "F" : t ? r5.key = b.ESC + "OF" : r5.key = b.ESC + "[F";
      break;
    case 33:
      s15.shiftKey ? r5.type = 2 : s15.ctrlKey ? r5.key = b.ESC + "[5;" + (n + 1) + "~" : r5.key = b.ESC + "[5~";
      break;
    case 34:
      s15.shiftKey ? r5.type = 3 : s15.ctrlKey ? r5.key = b.ESC + "[6;" + (n + 1) + "~" : r5.key = b.ESC + "[6~";
      break;
    case 112:
      n ? r5.key = b.ESC + "[1;" + (n + 1) + "P" : r5.key = b.ESC + "OP";
      break;
    case 113:
      n ? r5.key = b.ESC + "[1;" + (n + 1) + "Q" : r5.key = b.ESC + "OQ";
      break;
    case 114:
      n ? r5.key = b.ESC + "[1;" + (n + 1) + "R" : r5.key = b.ESC + "OR";
      break;
    case 115:
      n ? r5.key = b.ESC + "[1;" + (n + 1) + "S" : r5.key = b.ESC + "OS";
      break;
    case 116:
      n ? r5.key = b.ESC + "[15;" + (n + 1) + "~" : r5.key = b.ESC + "[15~";
      break;
    case 117:
      n ? r5.key = b.ESC + "[17;" + (n + 1) + "~" : r5.key = b.ESC + "[17~";
      break;
    case 118:
      n ? r5.key = b.ESC + "[18;" + (n + 1) + "~" : r5.key = b.ESC + "[18~";
      break;
    case 119:
      n ? r5.key = b.ESC + "[19;" + (n + 1) + "~" : r5.key = b.ESC + "[19~";
      break;
    case 120:
      n ? r5.key = b.ESC + "[20;" + (n + 1) + "~" : r5.key = b.ESC + "[20~";
      break;
    case 121:
      n ? r5.key = b.ESC + "[21;" + (n + 1) + "~" : r5.key = b.ESC + "[21~";
      break;
    case 122:
      n ? r5.key = b.ESC + "[23;" + (n + 1) + "~" : r5.key = b.ESC + "[23~";
      break;
    case 123:
      n ? r5.key = b.ESC + "[24;" + (n + 1) + "~" : r5.key = b.ESC + "[24~";
      break;
    default:
      if (s15.ctrlKey && !s15.shiftKey && !s15.altKey && !s15.metaKey) s15.keyCode >= 65 && s15.keyCode <= 90 ? r5.key = String.fromCharCode(s15.keyCode - 64) : s15.keyCode === 32 ? r5.key = b.NUL : s15.keyCode >= 51 && s15.keyCode <= 55 ? r5.key = String.fromCharCode(s15.keyCode - 51 + 27) : s15.keyCode === 56 ? r5.key = b.DEL : s15.keyCode === 219 ? r5.key = b.ESC : s15.keyCode === 220 ? r5.key = b.FS : s15.keyCode === 221 && (r5.key = b.GS);
      else if ((!e || i) && s15.altKey && !s15.metaKey) {
        let l = gc[s15.keyCode]?.[s15.shiftKey ? 1 : 0];
        if (l) r5.key = b.ESC + l;
        else if (s15.keyCode >= 65 && s15.keyCode <= 90) {
          let a = s15.ctrlKey ? s15.keyCode - 64 : s15.keyCode + 32, u = String.fromCharCode(a);
          s15.shiftKey && (u = u.toUpperCase()), r5.key = b.ESC + u;
        } else if (s15.keyCode === 32) r5.key = b.ESC + (s15.ctrlKey ? b.NUL : " ");
        else if (s15.key === "Dead" && s15.code.startsWith("Key")) {
          let a = s15.code.slice(3, 4);
          s15.shiftKey || (a = a.toLowerCase()), r5.key = b.ESC + a, r5.cancel = true;
        }
      } else e && !s15.altKey && !s15.ctrlKey && !s15.shiftKey && s15.metaKey ? s15.keyCode === 65 && (r5.type = 1) : s15.key && !s15.ctrlKey && !s15.altKey && !s15.metaKey && s15.keyCode >= 48 && s15.key.length === 1 ? r5.key = s15.key : s15.key && s15.ctrlKey && (s15.key === "_" && (r5.key = b.US), s15.key === "@" && (r5.key = b.NUL));
      break;
  }
  return r5;
}
var ee = 0;
var En = class {
  constructor(t) {
    this._getKey = t;
    this._array = [];
    this._insertedValues = [];
    this._flushInsertedTask = new Jt();
    this._isFlushingInserted = false;
    this._deletedIndices = [];
    this._flushDeletedTask = new Jt();
    this._isFlushingDeleted = false;
  }
  clear() {
    this._array.length = 0, this._insertedValues.length = 0, this._flushInsertedTask.clear(), this._isFlushingInserted = false, this._deletedIndices.length = 0, this._flushDeletedTask.clear(), this._isFlushingDeleted = false;
  }
  insert(t) {
    this._flushCleanupDeleted(), this._insertedValues.length === 0 && this._flushInsertedTask.enqueue(() => this._flushInserted()), this._insertedValues.push(t);
  }
  _flushInserted() {
    let t = this._insertedValues.sort((n, o2) => this._getKey(n) - this._getKey(o2)), e = 0, i = 0, r5 = new Array(this._array.length + this._insertedValues.length);
    for (let n = 0; n < r5.length; n++) i >= this._array.length || this._getKey(t[e]) <= this._getKey(this._array[i]) ? (r5[n] = t[e], e++) : r5[n] = this._array[i++];
    this._array = r5, this._insertedValues.length = 0;
  }
  _flushCleanupInserted() {
    !this._isFlushingInserted && this._insertedValues.length > 0 && this._flushInsertedTask.flush();
  }
  delete(t) {
    if (this._flushCleanupInserted(), this._array.length === 0) return false;
    let e = this._getKey(t);
    if (e === void 0 || (ee = this._search(e), ee === -1) || this._getKey(this._array[ee]) !== e) return false;
    do
      if (this._array[ee] === t) return this._deletedIndices.length === 0 && this._flushDeletedTask.enqueue(() => this._flushDeleted()), this._deletedIndices.push(ee), true;
    while (++ee < this._array.length && this._getKey(this._array[ee]) === e);
    return false;
  }
  _flushDeleted() {
    this._isFlushingDeleted = true;
    let t = this._deletedIndices.sort((n, o2) => n - o2), e = 0, i = new Array(this._array.length - t.length), r5 = 0;
    for (let n = 0; n < this._array.length; n++) t[e] === n ? e++ : i[r5++] = this._array[n];
    this._array = i, this._deletedIndices.length = 0, this._isFlushingDeleted = false;
  }
  _flushCleanupDeleted() {
    !this._isFlushingDeleted && this._deletedIndices.length > 0 && this._flushDeletedTask.flush();
  }
  *getKeyIterator(t) {
    if (this._flushCleanupInserted(), this._flushCleanupDeleted(), this._array.length !== 0 && (ee = this._search(t), !(ee < 0 || ee >= this._array.length) && this._getKey(this._array[ee]) === t)) do
      yield this._array[ee];
    while (++ee < this._array.length && this._getKey(this._array[ee]) === t);
  }
  forEachByKey(t, e) {
    if (this._flushCleanupInserted(), this._flushCleanupDeleted(), this._array.length !== 0 && (ee = this._search(t), !(ee < 0 || ee >= this._array.length) && this._getKey(this._array[ee]) === t)) do
      e(this._array[ee]);
    while (++ee < this._array.length && this._getKey(this._array[ee]) === t);
  }
  values() {
    return this._flushCleanupInserted(), this._flushCleanupDeleted(), [...this._array].values();
  }
  _search(t) {
    let e = 0, i = this._array.length - 1;
    for (; i >= e; ) {
      let r5 = e + i >> 1, n = this._getKey(this._array[r5]);
      if (n > t) i = r5 - 1;
      else if (n < t) e = r5 + 1;
      else {
        for (; r5 > 0 && this._getKey(this._array[r5 - 1]) === t; ) r5--;
        return r5;
      }
    }
    return e;
  }
};
var Us = 0;
var yl = 0;
var Tn = class extends D {
  constructor() {
    super();
    this._decorations = new En((e) => e?.marker.line);
    this._onDecorationRegistered = this._register(new v());
    this.onDecorationRegistered = this._onDecorationRegistered.event;
    this._onDecorationRemoved = this._register(new v());
    this.onDecorationRemoved = this._onDecorationRemoved.event;
    this._register(C(() => this.reset()));
  }
  get decorations() {
    return this._decorations.values();
  }
  registerDecoration(e) {
    if (e.marker.isDisposed) return;
    let i = new Ks(e);
    if (i) {
      let r5 = i.marker.onDispose(() => i.dispose()), n = i.onDispose(() => {
        n.dispose(), i && (this._decorations.delete(i) && this._onDecorationRemoved.fire(i), r5.dispose());
      });
      this._decorations.insert(i), this._onDecorationRegistered.fire(i);
    }
    return i;
  }
  reset() {
    for (let e of this._decorations.values()) e.dispose();
    this._decorations.clear();
  }
  *getDecorationsAtCell(e, i, r5) {
    let n = 0, o2 = 0;
    for (let l of this._decorations.getKeyIterator(i)) n = l.options.x ?? 0, o2 = n + (l.options.width ?? 1), e >= n && e < o2 && (!r5 || (l.options.layer ?? "bottom") === r5) && (yield l);
  }
  forEachDecorationAtCell(e, i, r5, n) {
    this._decorations.forEachByKey(i, (o2) => {
      Us = o2.options.x ?? 0, yl = Us + (o2.options.width ?? 1), e >= Us && e < yl && (!r5 || (o2.options.layer ?? "bottom") === r5) && n(o2);
    });
  }
};
var Ks = class extends Ee {
  constructor(e) {
    super();
    this.options = e;
    this.onRenderEmitter = this.add(new v());
    this.onRender = this.onRenderEmitter.event;
    this._onDispose = this.add(new v());
    this.onDispose = this._onDispose.event;
    this._cachedBg = null;
    this._cachedFg = null;
    this.marker = e.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
  }
  get backgroundColorRGB() {
    return this._cachedBg === null && (this.options.backgroundColor ? this._cachedBg = z.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
  }
  get foregroundColorRGB() {
    return this._cachedFg === null && (this.options.foregroundColor ? this._cachedFg = z.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
  }
  dispose() {
    this._onDispose.fire(), super.dispose();
  }
};
var Sc = 1e3;
var In = class {
  constructor(t, e = Sc) {
    this._renderCallback = t;
    this._debounceThresholdMS = e;
    this._lastRefreshMs = 0;
    this._additionalRefreshRequested = false;
  }
  dispose() {
    this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
  }
  refresh(t, e, i) {
    this._rowCount = i, t = t !== void 0 ? t : 0, e = e !== void 0 ? e : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, t) : t, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, e) : e;
    let r5 = performance.now();
    if (r5 - this._lastRefreshMs >= this._debounceThresholdMS) this._lastRefreshMs = r5, this._innerRefresh();
    else if (!this._additionalRefreshRequested) {
      let n = r5 - this._lastRefreshMs, o2 = this._debounceThresholdMS - n;
      this._additionalRefreshRequested = true, this._refreshTimeoutID = window.setTimeout(() => {
        this._lastRefreshMs = performance.now(), this._innerRefresh(), this._additionalRefreshRequested = false, this._refreshTimeoutID = void 0;
      }, o2);
    }
  }
  _innerRefresh() {
    if (this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) return;
    let t = Math.max(this._rowStart, 0), e = Math.min(this._rowEnd, this._rowCount - 1);
    this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(t, e);
  }
};
var xl = 20;
var wl = false;
var Tt = class extends D {
  constructor(e, i, r5, n) {
    super();
    this._terminal = e;
    this._coreBrowserService = r5;
    this._renderService = n;
    this._rowColumns = /* @__PURE__ */ new WeakMap();
    this._liveRegionLineCount = 0;
    this._charsToConsume = [];
    this._charsToAnnounce = "";
    let o2 = this._coreBrowserService.mainDocument;
    this._accessibilityContainer = o2.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = o2.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
    for (let l = 0; l < this._terminal.rows; l++) this._rowElements[l] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[l]);
    if (this._topBoundaryFocusListener = (l) => this._handleBoundaryFocus(l, 0), this._bottomBoundaryFocusListener = (l) => this._handleBoundaryFocus(l, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = o2.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this._register(new In(this._renderRows.bind(this))), !this._terminal.element) throw new Error("Cannot enable accessibility before Terminal.open");
    wl ? (this._accessibilityContainer.classList.add("debug"), this._rowContainer.classList.add("debug"), this._debugRootContainer = o2.createElement("div"), this._debugRootContainer.classList.add("xterm"), this._debugRootContainer.appendChild(o2.createTextNode("------start a11y------")), this._debugRootContainer.appendChild(this._accessibilityContainer), this._debugRootContainer.appendChild(o2.createTextNode("------end a11y------")), this._terminal.element.insertAdjacentElement("afterend", this._debugRootContainer)) : this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this._register(this._terminal.onResize((l) => this._handleResize(l.rows))), this._register(this._terminal.onRender((l) => this._refreshRows(l.start, l.end))), this._register(this._terminal.onScroll(() => this._refreshRows())), this._register(this._terminal.onA11yChar((l) => this._handleChar(l))), this._register(this._terminal.onLineFeed(() => this._handleChar(`
`))), this._register(this._terminal.onA11yTab((l) => this._handleTab(l))), this._register(this._terminal.onKey((l) => this._handleKey(l.key))), this._register(this._terminal.onBlur(() => this._clearLiveRegion())), this._register(this._renderService.onDimensionsChange(() => this._refreshRowsDimensions())), this._register(L(o2, "selectionchange", () => this._handleSelectionChange())), this._register(this._coreBrowserService.onDprChange(() => this._refreshRowsDimensions())), this._refreshRowsDimensions(), this._refreshRows(), this._register(C(() => {
      wl ? this._debugRootContainer.remove() : this._accessibilityContainer.remove(), this._rowElements.length = 0;
    }));
  }
  _handleTab(e) {
    for (let i = 0; i < e; i++) this._handleChar(" ");
  }
  _handleChar(e) {
    this._liveRegionLineCount < xl + 1 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e && (this._charsToAnnounce += e) : this._charsToAnnounce += e, e === `
` && (this._liveRegionLineCount++, this._liveRegionLineCount === xl + 1 && (this._liveRegion.textContent += _i.get())));
  }
  _clearLiveRegion() {
    this._liveRegion.textContent = "", this._liveRegionLineCount = 0;
  }
  _handleKey(e) {
    this._clearLiveRegion(), /\p{Control}/u.test(e) || this._charsToConsume.push(e);
  }
  _refreshRows(e, i) {
    this._liveRegionDebouncer.refresh(e, i, this._terminal.rows);
  }
  _renderRows(e, i) {
    let r5 = this._terminal.buffer, n = r5.lines.length.toString();
    for (let o2 = e; o2 <= i; o2++) {
      let l = r5.lines.get(r5.ydisp + o2), a = [], u = l?.translateToString(true, void 0, void 0, a) || "", h2 = (r5.ydisp + o2 + 1).toString(), c = this._rowElements[o2];
      c && (u.length === 0 ? (c.textContent = "\xA0", this._rowColumns.set(c, [0, 1])) : (c.textContent = u, this._rowColumns.set(c, a)), c.setAttribute("aria-posinset", h2), c.setAttribute("aria-setsize", n), this._alignRowWidth(c));
    }
    this._announceCharacters();
  }
  _announceCharacters() {
    this._charsToAnnounce.length !== 0 && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
  }
  _handleBoundaryFocus(e, i) {
    let r5 = e.target, n = this._rowElements[i === 0 ? 1 : this._rowElements.length - 2], o2 = r5.getAttribute("aria-posinset"), l = i === 0 ? "1" : `${this._terminal.buffer.lines.length}`;
    if (o2 === l || e.relatedTarget !== n) return;
    let a, u;
    if (i === 0 ? (a = r5, u = this._rowElements.pop(), this._rowContainer.removeChild(u)) : (a = this._rowElements.shift(), u = r5, this._rowContainer.removeChild(a)), a.removeEventListener("focus", this._topBoundaryFocusListener), u.removeEventListener("focus", this._bottomBoundaryFocusListener), i === 0) {
      let h2 = this._createAccessibilityTreeNode();
      this._rowElements.unshift(h2), this._rowContainer.insertAdjacentElement("afterbegin", h2);
    } else {
      let h2 = this._createAccessibilityTreeNode();
      this._rowElements.push(h2), this._rowContainer.appendChild(h2);
    }
    this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(i === 0 ? -1 : 1), this._rowElements[i === 0 ? 1 : this._rowElements.length - 2].focus(), e.preventDefault(), e.stopImmediatePropagation();
  }
  _handleSelectionChange() {
    if (this._rowElements.length === 0) return;
    let e = this._coreBrowserService.mainDocument.getSelection();
    if (!e) return;
    if (e.isCollapsed) {
      this._rowContainer.contains(e.anchorNode) && this._terminal.clearSelection();
      return;
    }
    if (!e.anchorNode || !e.focusNode) {
      console.error("anchorNode and/or focusNode are null");
      return;
    }
    let i = { node: e.anchorNode, offset: e.anchorOffset }, r5 = { node: e.focusNode, offset: e.focusOffset };
    if ((i.node.compareDocumentPosition(r5.node) & Node.DOCUMENT_POSITION_PRECEDING || i.node === r5.node && i.offset > r5.offset) && ([i, r5] = [r5, i]), i.node.compareDocumentPosition(this._rowElements[0]) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING) && (i = { node: this._rowElements[0].childNodes[0], offset: 0 }), !this._rowContainer.contains(i.node)) return;
    let n = this._rowElements.slice(-1)[0];
    if (r5.node.compareDocumentPosition(n) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_PRECEDING) && (r5 = { node: n, offset: n.textContent?.length ?? 0 }), !this._rowContainer.contains(r5.node)) return;
    let o2 = ({ node: u, offset: h2 }) => {
      let c = u instanceof Text ? u.parentNode : u, d = parseInt(c?.getAttribute("aria-posinset"), 10) - 1;
      if (isNaN(d)) return console.warn("row is invalid. Race condition?"), null;
      let _3 = this._rowColumns.get(c);
      if (!_3) return console.warn("columns is null. Race condition?"), null;
      let p = h2 < _3.length ? _3[h2] : _3.slice(-1)[0] + 1;
      return p >= this._terminal.cols && (++d, p = 0), { row: d, column: p };
    }, l = o2(i), a = o2(r5);
    if (!(!l || !a)) {
      if (l.row > a.row || l.row === a.row && l.column >= a.column) throw new Error("invalid range");
      this._terminal.select(l.column, l.row, (a.row - l.row) * this._terminal.cols - l.column + a.column);
    }
  }
  _handleResize(e) {
    this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
    for (let i = this._rowContainer.children.length; i < this._terminal.rows; i++) this._rowElements[i] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[i]);
    for (; this._rowElements.length > e; ) this._rowContainer.removeChild(this._rowElements.pop());
    this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
  }
  _createAccessibilityTreeNode() {
    let e = this._coreBrowserService.mainDocument.createElement("div");
    return e.setAttribute("role", "listitem"), e.tabIndex = -1, this._refreshRowDimensions(e), e;
  }
  _refreshRowsDimensions() {
    if (this._renderService.dimensions.css.cell.height) {
      Object.assign(this._accessibilityContainer.style, { width: `${this._renderService.dimensions.css.canvas.width}px`, fontSize: `${this._terminal.options.fontSize}px` }), this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
      for (let e = 0; e < this._terminal.rows; e++) this._refreshRowDimensions(this._rowElements[e]), this._alignRowWidth(this._rowElements[e]);
    }
  }
  _refreshRowDimensions(e) {
    e.style.height = `${this._renderService.dimensions.css.cell.height}px`;
  }
  _alignRowWidth(e) {
    e.style.transform = "";
    let i = e.getBoundingClientRect().width, r5 = this._rowColumns.get(e)?.slice(-1)?.[0];
    if (!r5) return;
    let n = r5 * this._renderService.dimensions.css.cell.width;
    e.style.transform = `scaleX(${n / i})`;
  }
};
Tt = M([S(1, xt), S(2, ae), S(3, ce)], Tt);
var hi = class extends D {
  constructor(e, i, r5, n, o2) {
    super();
    this._element = e;
    this._mouseService = i;
    this._renderService = r5;
    this._bufferService = n;
    this._linkProviderService = o2;
    this._linkCacheDisposables = [];
    this._isMouseOut = true;
    this._wasResized = false;
    this._activeLine = -1;
    this._onShowLinkUnderline = this._register(new v());
    this.onShowLinkUnderline = this._onShowLinkUnderline.event;
    this._onHideLinkUnderline = this._register(new v());
    this.onHideLinkUnderline = this._onHideLinkUnderline.event;
    this._register(C(() => {
      Ne(this._linkCacheDisposables), this._linkCacheDisposables.length = 0, this._lastMouseEvent = void 0, this._activeProviderReplies?.clear();
    })), this._register(this._bufferService.onResize(() => {
      this._clearCurrentLink(), this._wasResized = true;
    })), this._register(L(this._element, "mouseleave", () => {
      this._isMouseOut = true, this._clearCurrentLink();
    })), this._register(L(this._element, "mousemove", this._handleMouseMove.bind(this))), this._register(L(this._element, "mousedown", this._handleMouseDown.bind(this))), this._register(L(this._element, "mouseup", this._handleMouseUp.bind(this)));
  }
  get currentLink() {
    return this._currentLink;
  }
  _handleMouseMove(e) {
    this._lastMouseEvent = e;
    let i = this._positionFromMouseEvent(e, this._element, this._mouseService);
    if (!i) return;
    this._isMouseOut = false;
    let r5 = e.composedPath();
    for (let n = 0; n < r5.length; n++) {
      let o2 = r5[n];
      if (o2.classList.contains("xterm")) break;
      if (o2.classList.contains("xterm-hover")) return;
    }
    (!this._lastBufferCell || i.x !== this._lastBufferCell.x || i.y !== this._lastBufferCell.y) && (this._handleHover(i), this._lastBufferCell = i);
  }
  _handleHover(e) {
    if (this._activeLine !== e.y || this._wasResized) {
      this._clearCurrentLink(), this._askForLink(e, false), this._wasResized = false;
      return;
    }
    this._currentLink && this._linkAtPosition(this._currentLink.link, e) || (this._clearCurrentLink(), this._askForLink(e, true));
  }
  _askForLink(e, i) {
    (!this._activeProviderReplies || !i) && (this._activeProviderReplies?.forEach((n) => {
      n?.forEach((o2) => {
        o2.link.dispose && o2.link.dispose();
      });
    }), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = e.y);
    let r5 = false;
    for (let [n, o2] of this._linkProviderService.linkProviders.entries()) i ? this._activeProviderReplies?.get(n) && (r5 = this._checkLinkProviderResult(n, e, r5)) : o2.provideLinks(e.y, (l) => {
      if (this._isMouseOut) return;
      let a = l?.map((u) => ({ link: u }));
      this._activeProviderReplies?.set(n, a), r5 = this._checkLinkProviderResult(n, e, r5), this._activeProviderReplies?.size === this._linkProviderService.linkProviders.length && this._removeIntersectingLinks(e.y, this._activeProviderReplies);
    });
  }
  _removeIntersectingLinks(e, i) {
    let r5 = /* @__PURE__ */ new Set();
    for (let n = 0; n < i.size; n++) {
      let o2 = i.get(n);
      if (o2) for (let l = 0; l < o2.length; l++) {
        let a = o2[l], u = a.link.range.start.y < e ? 0 : a.link.range.start.x, h2 = a.link.range.end.y > e ? this._bufferService.cols : a.link.range.end.x;
        for (let c = u; c <= h2; c++) {
          if (r5.has(c)) {
            o2.splice(l--, 1);
            break;
          }
          r5.add(c);
        }
      }
    }
  }
  _checkLinkProviderResult(e, i, r5) {
    if (!this._activeProviderReplies) return r5;
    let n = this._activeProviderReplies.get(e), o2 = false;
    for (let l = 0; l < e; l++) (!this._activeProviderReplies.has(l) || this._activeProviderReplies.get(l)) && (o2 = true);
    if (!o2 && n) {
      let l = n.find((a) => this._linkAtPosition(a.link, i));
      l && (r5 = true, this._handleNewLink(l));
    }
    if (this._activeProviderReplies.size === this._linkProviderService.linkProviders.length && !r5) for (let l = 0; l < this._activeProviderReplies.size; l++) {
      let a = this._activeProviderReplies.get(l)?.find((u) => this._linkAtPosition(u.link, i));
      if (a) {
        r5 = true, this._handleNewLink(a);
        break;
      }
    }
    return r5;
  }
  _handleMouseDown() {
    this._mouseDownLink = this._currentLink;
  }
  _handleMouseUp(e) {
    if (!this._currentLink) return;
    let i = this._positionFromMouseEvent(e, this._element, this._mouseService);
    i && this._mouseDownLink && Ec(this._mouseDownLink.link, this._currentLink.link) && this._linkAtPosition(this._currentLink.link, i) && this._currentLink.link.activate(e, this._currentLink.link.text);
  }
  _clearCurrentLink(e, i) {
    !this._currentLink || !this._lastMouseEvent || (!e || !i || this._currentLink.link.range.start.y >= e && this._currentLink.link.range.end.y <= i) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, Ne(this._linkCacheDisposables), this._linkCacheDisposables.length = 0);
  }
  _handleNewLink(e) {
    if (!this._lastMouseEvent) return;
    let i = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
    i && this._linkAtPosition(e.link, i) && (this._currentLink = e, this._currentLink.state = { decorations: { underline: e.link.decorations === void 0 ? true : e.link.decorations.underline, pointerCursor: e.link.decorations === void 0 ? true : e.link.decorations.pointerCursor }, isHovered: true }, this._linkHover(this._element, e.link, this._lastMouseEvent), e.link.decorations = {}, Object.defineProperties(e.link.decorations, { pointerCursor: { get: () => this._currentLink?.state?.decorations.pointerCursor, set: (r5) => {
      this._currentLink?.state && this._currentLink.state.decorations.pointerCursor !== r5 && (this._currentLink.state.decorations.pointerCursor = r5, this._currentLink.state.isHovered && this._element.classList.toggle("xterm-cursor-pointer", r5));
    } }, underline: { get: () => this._currentLink?.state?.decorations.underline, set: (r5) => {
      this._currentLink?.state && this._currentLink?.state?.decorations.underline !== r5 && (this._currentLink.state.decorations.underline = r5, this._currentLink.state.isHovered && this._fireUnderlineEvent(e.link, r5));
    } } }), this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((r5) => {
      if (!this._currentLink) return;
      let n = r5.start === 0 ? 0 : r5.start + 1 + this._bufferService.buffer.ydisp, o2 = this._bufferService.buffer.ydisp + 1 + r5.end;
      if (this._currentLink.link.range.start.y >= n && this._currentLink.link.range.end.y <= o2 && (this._clearCurrentLink(n, o2), this._lastMouseEvent)) {
        let l = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
        l && this._askForLink(l, false);
      }
    })));
  }
  _linkHover(e, i, r5) {
    this._currentLink?.state && (this._currentLink.state.isHovered = true, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(i, true), this._currentLink.state.decorations.pointerCursor && e.classList.add("xterm-cursor-pointer")), i.hover && i.hover(r5, i.text);
  }
  _fireUnderlineEvent(e, i) {
    let r5 = e.range, n = this._bufferService.buffer.ydisp, o2 = this._createLinkUnderlineEvent(r5.start.x - 1, r5.start.y - n - 1, r5.end.x, r5.end.y - n - 1, void 0);
    (i ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(o2);
  }
  _linkLeave(e, i, r5) {
    this._currentLink?.state && (this._currentLink.state.isHovered = false, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(i, false), this._currentLink.state.decorations.pointerCursor && e.classList.remove("xterm-cursor-pointer")), i.leave && i.leave(r5, i.text);
  }
  _linkAtPosition(e, i) {
    let r5 = e.range.start.y * this._bufferService.cols + e.range.start.x, n = e.range.end.y * this._bufferService.cols + e.range.end.x, o2 = i.y * this._bufferService.cols + i.x;
    return r5 <= o2 && o2 <= n;
  }
  _positionFromMouseEvent(e, i, r5) {
    let n = r5.getCoords(e, i, this._bufferService.cols, this._bufferService.rows);
    if (n) return { x: n[0], y: n[1] + this._bufferService.buffer.ydisp };
  }
  _createLinkUnderlineEvent(e, i, r5, n, o2) {
    return { x1: e, y1: i, x2: r5, y2: n, cols: this._bufferService.cols, fg: o2 };
  }
};
hi = M([S(1, Dt), S(2, ce), S(3, F), S(4, lr)], hi);
function Ec(s15, t) {
  return s15.text === t.text && s15.range.start.x === t.range.start.x && s15.range.start.y === t.range.start.y && s15.range.end.x === t.range.end.x && s15.range.end.y === t.range.end.y;
}
var yn = class extends Sn {
  constructor(e = {}) {
    super(e);
    this._linkifier = this._register(new ye());
    this.browser = tn;
    this._keyDownHandled = false;
    this._keyDownSeen = false;
    this._keyPressHandled = false;
    this._unprocessedDeadKey = false;
    this._accessibilityManager = this._register(new ye());
    this._onCursorMove = this._register(new v());
    this.onCursorMove = this._onCursorMove.event;
    this._onKey = this._register(new v());
    this.onKey = this._onKey.event;
    this._onRender = this._register(new v());
    this.onRender = this._onRender.event;
    this._onSelectionChange = this._register(new v());
    this.onSelectionChange = this._onSelectionChange.event;
    this._onTitleChange = this._register(new v());
    this.onTitleChange = this._onTitleChange.event;
    this._onBell = this._register(new v());
    this.onBell = this._onBell.event;
    this._onFocus = this._register(new v());
    this._onBlur = this._register(new v());
    this._onA11yCharEmitter = this._register(new v());
    this._onA11yTabEmitter = this._register(new v());
    this._onWillOpen = this._register(new v());
    this._setup(), this._decorationService = this._instantiationService.createInstance(Tn), this._instantiationService.setService(Be, this._decorationService), this._linkProviderService = this._instantiationService.createInstance(Qr), this._instantiationService.setService(lr, this._linkProviderService), this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(wt)), this._register(this._inputHandler.onRequestBell(() => this._onBell.fire())), this._register(this._inputHandler.onRequestRefreshRows((i) => this.refresh(i?.start ?? 0, i?.end ?? this.rows - 1))), this._register(this._inputHandler.onRequestSendFocus(() => this._reportFocus())), this._register(this._inputHandler.onRequestReset(() => this.reset())), this._register(this._inputHandler.onRequestWindowsOptionsReport((i) => this._reportWindowsOptions(i))), this._register(this._inputHandler.onColor((i) => this._handleColorEvent(i))), this._register($.forward(this._inputHandler.onCursorMove, this._onCursorMove)), this._register($.forward(this._inputHandler.onTitleChange, this._onTitleChange)), this._register($.forward(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this._register($.forward(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this._register(this._bufferService.onResize((i) => this._afterResize(i.cols, i.rows))), this._register(C(() => {
      this._customKeyEventHandler = void 0, this.element?.parentNode?.removeChild(this.element);
    }));
  }
  get linkifier() {
    return this._linkifier.value;
  }
  get onFocus() {
    return this._onFocus.event;
  }
  get onBlur() {
    return this._onBlur.event;
  }
  get onA11yChar() {
    return this._onA11yCharEmitter.event;
  }
  get onA11yTab() {
    return this._onA11yTabEmitter.event;
  }
  get onWillOpen() {
    return this._onWillOpen.event;
  }
  _handleColorEvent(e) {
    if (this._themeService) for (let i of e) {
      let r5, n = "";
      switch (i.index) {
        case 256:
          r5 = "foreground", n = "10";
          break;
        case 257:
          r5 = "background", n = "11";
          break;
        case 258:
          r5 = "cursor", n = "12";
          break;
        default:
          r5 = "ansi", n = "4;" + i.index;
      }
      switch (i.type) {
        case 0:
          let o2 = U.toColorRGB(r5 === "ansi" ? this._themeService.colors.ansi[i.index] : this._themeService.colors[r5]);
          this.coreService.triggerDataEvent(`${b.ESC}]${n};${ml(o2)}${fs.ST}`);
          break;
        case 1:
          if (r5 === "ansi") this._themeService.modifyColors((l) => l.ansi[i.index] = j.toColor(...i.color));
          else {
            let l = r5;
            this._themeService.modifyColors((a) => a[l] = j.toColor(...i.color));
          }
          break;
        case 2:
          this._themeService.restoreColor(i.index);
          break;
      }
    }
  }
  _setup() {
    super._setup(), this._customKeyEventHandler = void 0;
  }
  get buffer() {
    return this.buffers.active;
  }
  focus() {
    this.textarea && this.textarea.focus({ preventScroll: true });
  }
  _handleScreenReaderModeOptionChange(e) {
    e ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(Tt, this)) : this._accessibilityManager.clear();
  }
  _handleTextAreaFocus(e) {
    this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(b.ESC + "[I"), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
  }
  blur() {
    return this.textarea?.blur();
  }
  _handleTextAreaBlur() {
    this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(b.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
  }
  _syncTextArea() {
    if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) return;
    let e = this.buffer.ybase + this.buffer.y, i = this.buffer.lines.get(e);
    if (!i) return;
    let r5 = Math.min(this.buffer.x, this.cols - 1), n = this._renderService.dimensions.css.cell.height, o2 = i.getWidth(r5), l = this._renderService.dimensions.css.cell.width * o2, a = this.buffer.y * this._renderService.dimensions.css.cell.height, u = r5 * this._renderService.dimensions.css.cell.width;
    this.textarea.style.left = u + "px", this.textarea.style.top = a + "px", this.textarea.style.width = l + "px", this.textarea.style.height = n + "px", this.textarea.style.lineHeight = n + "px", this.textarea.style.zIndex = "-5";
  }
  _initGlobal() {
    this._bindKeys(), this._register(L(this.element, "copy", (i) => {
      this.hasSelection() && Vs(i, this._selectionService);
    }));
    let e = (i) => qs(i, this.textarea, this.coreService, this.optionsService);
    this._register(L(this.textarea, "paste", e)), this._register(L(this.element, "paste", e)), Ss ? this._register(L(this.element, "mousedown", (i) => {
      i.button === 2 && Pn(i, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
    })) : this._register(L(this.element, "contextmenu", (i) => {
      Pn(i, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
    })), Bi && this._register(L(this.element, "auxclick", (i) => {
      i.button === 1 && Mn(i, this.textarea, this.screenElement);
    }));
  }
  _bindKeys() {
    this._register(L(this.textarea, "keyup", (e) => this._keyUp(e), true)), this._register(L(this.textarea, "keydown", (e) => this._keyDown(e), true)), this._register(L(this.textarea, "keypress", (e) => this._keyPress(e), true)), this._register(L(this.textarea, "compositionstart", () => this._compositionHelper.compositionstart())), this._register(L(this.textarea, "compositionupdate", (e) => this._compositionHelper.compositionupdate(e))), this._register(L(this.textarea, "compositionend", () => this._compositionHelper.compositionend())), this._register(L(this.textarea, "input", (e) => this._inputEvent(e), true)), this._register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
  }
  open(e) {
    if (!e) throw new Error("Terminal requires a parent element.");
    if (e.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this.element?.ownerDocument.defaultView && this._coreBrowserService) {
      this.element.ownerDocument.defaultView !== this._coreBrowserService.window && (this._coreBrowserService.window = this.element.ownerDocument.defaultView);
      return;
    }
    this._document = e.ownerDocument, this.options.documentOverride && this.options.documentOverride instanceof Document && (this._document = this.optionsService.rawOptions.documentOverride), this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), e.appendChild(this.element);
    let i = this._document.createDocumentFragment();
    this._viewportElement = this._document.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), i.appendChild(this._viewportElement), this.screenElement = this._document.createElement("div"), this.screenElement.classList.add("xterm-screen"), this._register(L(this.screenElement, "mousemove", (o2) => this.updateCursorStyle(o2))), this._helperContainer = this._document.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), i.appendChild(this.screenElement);
    let r5 = this.textarea = this._document.createElement("textarea");
    this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", mi.get()), Ts || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._register(this.optionsService.onSpecificOptionChange("disableStdin", () => r5.readOnly = this.optionsService.rawOptions.disableStdin)), this.textarea.readOnly = this.optionsService.rawOptions.disableStdin, this._coreBrowserService = this._register(this._instantiationService.createInstance(Jr, this.textarea, e.ownerDocument.defaultView ?? window, this._document ?? typeof window < "u" ? window.document : null)), this._instantiationService.setService(ae, this._coreBrowserService), this._register(L(this.textarea, "focus", (o2) => this._handleTextAreaFocus(o2))), this._register(L(this.textarea, "blur", () => this._handleTextAreaBlur())), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(jt, this._document, this._helperContainer), this._instantiationService.setService(nt, this._charSizeService), this._themeService = this._instantiationService.createInstance(ti), this._instantiationService.setService(Re, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(ct), this._instantiationService.setService(or, this._characterJoinerService), this._renderService = this._register(this._instantiationService.createInstance(Qt, this.rows, this.screenElement)), this._instantiationService.setService(ce, this._renderService), this._register(this._renderService.onRenderedViewportChange((o2) => this._onRender.fire(o2))), this.onResize((o2) => this._renderService.resize(o2.cols, o2.rows)), this._compositionView = this._document.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance($t, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this._mouseService = this._instantiationService.createInstance(Xt), this._instantiationService.setService(Dt, this._mouseService);
    let n = this._linkifier.value = this._register(this._instantiationService.createInstance(hi, this.screenElement));
    this.element.appendChild(i);
    try {
      this._onWillOpen.fire(this.element);
    } catch {
    }
    this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this._register(this.onCursorMove(() => {
      this._renderService.handleCursorMove(), this._syncTextArea();
    })), this._register(this.onResize(() => this._renderService.handleResize(this.cols, this.rows))), this._register(this.onBlur(() => this._renderService.handleBlur())), this._register(this.onFocus(() => this._renderService.handleFocus())), this._viewport = this._register(this._instantiationService.createInstance(zt, this.element, this.screenElement)), this._register(this._viewport.onRequestScrollLines((o2) => {
      super.scrollLines(o2, false), this.refresh(0, this.rows - 1);
    })), this._selectionService = this._register(this._instantiationService.createInstance(ei, this.element, this.screenElement, n)), this._instantiationService.setService(Qs, this._selectionService), this._register(this._selectionService.onRequestScrollLines((o2) => this.scrollLines(o2.amount, o2.suppressScrollEvent))), this._register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire())), this._register(this._selectionService.onRequestRedraw((o2) => this._renderService.handleSelectionChanged(o2.start, o2.end, o2.columnSelectMode))), this._register(this._selectionService.onLinuxMouseSelection((o2) => {
      this.textarea.value = o2, this.textarea.focus(), this.textarea.select();
    })), this._register($.any(this._onScroll.event, this._inputHandler.onScroll)(() => {
      this._selectionService.refresh(), this._viewport?.queueSync();
    })), this._register(this._instantiationService.createInstance(Gt, this.screenElement)), this._register(L(this.element, "mousedown", (o2) => this._selectionService.handleMouseDown(o2))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(Tt, this)), this._register(this.optionsService.onSpecificOptionChange("screenReaderMode", (o2) => this._handleScreenReaderModeOptionChange(o2))), this.options.overviewRuler.width && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(bt, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRuler", (o2) => {
      !this._overviewRulerRenderer && o2 && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(bt, this._viewportElement, this.screenElement)));
    }), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
  }
  _createRenderer() {
    return this._instantiationService.createInstance(Yt, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
  }
  bindMouse() {
    let e = this, i = this.element;
    function r5(l) {
      let a = e._mouseService.getMouseReportCoords(l, e.screenElement);
      if (!a) return false;
      let u, h2;
      switch (l.overrideType || l.type) {
        case "mousemove":
          h2 = 32, l.buttons === void 0 ? (u = 3, l.button !== void 0 && (u = l.button < 3 ? l.button : 3)) : u = l.buttons & 1 ? 0 : l.buttons & 4 ? 1 : l.buttons & 2 ? 2 : 3;
          break;
        case "mouseup":
          h2 = 0, u = l.button < 3 ? l.button : 3;
          break;
        case "mousedown":
          h2 = 1, u = l.button < 3 ? l.button : 3;
          break;
        case "wheel":
          if (e._customWheelEventHandler && e._customWheelEventHandler(l) === false) return false;
          let c = l.deltaY;
          if (c === 0 || e.coreMouseService.consumeWheelEvent(l, e._renderService?.dimensions?.device?.cell?.height, e._coreBrowserService?.dpr) === 0) return false;
          h2 = c < 0 ? 0 : 1, u = 4;
          break;
        default:
          return false;
      }
      return h2 === void 0 || u === void 0 || u > 4 ? false : e.coreMouseService.triggerMouseEvent({ col: a.col, row: a.row, x: a.x, y: a.y, button: u, action: h2, ctrl: l.ctrlKey, alt: l.altKey, shift: l.shiftKey });
    }
    let n = { mouseup: null, wheel: null, mousedrag: null, mousemove: null }, o2 = { mouseup: (l) => (r5(l), l.buttons || (this._document.removeEventListener("mouseup", n.mouseup), n.mousedrag && this._document.removeEventListener("mousemove", n.mousedrag)), this.cancel(l)), wheel: (l) => (r5(l), this.cancel(l, true)), mousedrag: (l) => {
      l.buttons && r5(l);
    }, mousemove: (l) => {
      l.buttons || r5(l);
    } };
    this._register(this.coreMouseService.onProtocolChange((l) => {
      l ? (this.optionsService.rawOptions.logLevel === "debug" && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(l)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), l & 8 ? n.mousemove || (i.addEventListener("mousemove", o2.mousemove), n.mousemove = o2.mousemove) : (i.removeEventListener("mousemove", n.mousemove), n.mousemove = null), l & 16 ? n.wheel || (i.addEventListener("wheel", o2.wheel, { passive: false }), n.wheel = o2.wheel) : (i.removeEventListener("wheel", n.wheel), n.wheel = null), l & 2 ? n.mouseup || (n.mouseup = o2.mouseup) : (this._document.removeEventListener("mouseup", n.mouseup), n.mouseup = null), l & 4 ? n.mousedrag || (n.mousedrag = o2.mousedrag) : (this._document.removeEventListener("mousemove", n.mousedrag), n.mousedrag = null);
    })), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this._register(L(i, "mousedown", (l) => {
      if (l.preventDefault(), this.focus(), !(!this.coreMouseService.areMouseEventsActive || this._selectionService.shouldForceSelection(l))) return r5(l), n.mouseup && this._document.addEventListener("mouseup", n.mouseup), n.mousedrag && this._document.addEventListener("mousemove", n.mousedrag), this.cancel(l);
    })), this._register(L(i, "wheel", (l) => {
      if (!n.wheel) {
        if (this._customWheelEventHandler && this._customWheelEventHandler(l) === false) return false;
        if (!this.buffer.hasScrollback) {
          if (l.deltaY === 0) return false;
          if (e.coreMouseService.consumeWheelEvent(l, e._renderService?.dimensions?.device?.cell?.height, e._coreBrowserService?.dpr) === 0) return this.cancel(l, true);
          let h2 = b.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (l.deltaY < 0 ? "A" : "B");
          return this.coreService.triggerDataEvent(h2, true), this.cancel(l, true);
        }
      }
    }, { passive: false }));
  }
  refresh(e, i) {
    this._renderService?.refreshRows(e, i);
  }
  updateCursorStyle(e) {
    this._selectionService?.shouldColumnSelect(e) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
  }
  _showCursor() {
    this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = true, this.refresh(this.buffer.y, this.buffer.y));
  }
  scrollLines(e, i) {
    this._viewport ? this._viewport.scrollLines(e) : super.scrollLines(e, i), this.refresh(0, this.rows - 1);
  }
  scrollPages(e) {
    this.scrollLines(e * (this.rows - 1));
  }
  scrollToTop() {
    this.scrollLines(-this._bufferService.buffer.ydisp);
  }
  scrollToBottom(e) {
    e && this._viewport ? this._viewport.scrollToLine(this.buffer.ybase, true) : this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
  }
  scrollToLine(e) {
    let i = e - this._bufferService.buffer.ydisp;
    i !== 0 && this.scrollLines(i);
  }
  paste(e) {
    Cn(e, this.textarea, this.coreService, this.optionsService);
  }
  attachCustomKeyEventHandler(e) {
    this._customKeyEventHandler = e;
  }
  attachCustomWheelEventHandler(e) {
    this._customWheelEventHandler = e;
  }
  registerLinkProvider(e) {
    return this._linkProviderService.registerLinkProvider(e);
  }
  registerCharacterJoiner(e) {
    if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
    let i = this._characterJoinerService.register(e);
    return this.refresh(0, this.rows - 1), i;
  }
  deregisterCharacterJoiner(e) {
    if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
    this._characterJoinerService.deregister(e) && this.refresh(0, this.rows - 1);
  }
  get markers() {
    return this.buffer.markers;
  }
  registerMarker(e) {
    return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e);
  }
  registerDecoration(e) {
    return this._decorationService.registerDecoration(e);
  }
  hasSelection() {
    return this._selectionService ? this._selectionService.hasSelection : false;
  }
  select(e, i, r5) {
    this._selectionService.setSelection(e, i, r5);
  }
  getSelection() {
    return this._selectionService ? this._selectionService.selectionText : "";
  }
  getSelectionPosition() {
    if (!(!this._selectionService || !this._selectionService.hasSelection)) return { start: { x: this._selectionService.selectionStart[0], y: this._selectionService.selectionStart[1] }, end: { x: this._selectionService.selectionEnd[0], y: this._selectionService.selectionEnd[1] } };
  }
  clearSelection() {
    this._selectionService?.clearSelection();
  }
  selectAll() {
    this._selectionService?.selectAll();
  }
  selectLines(e, i) {
    this._selectionService?.selectLines(e, i);
  }
  _keyDown(e) {
    if (this._keyDownHandled = false, this._keyDownSeen = true, this._customKeyEventHandler && this._customKeyEventHandler(e) === false) return false;
    let i = this.browser.isMac && this.options.macOptionIsMeta && e.altKey;
    if (!i && !this._compositionHelper.keydown(e)) return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(true), false;
    !i && (e.key === "Dead" || e.key === "AltGraph") && (this._unprocessedDeadKey = true);
    let r5 = Il(e, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
    if (this.updateCursorStyle(e), r5.type === 3 || r5.type === 2) {
      let n = this.rows - 1;
      return this.scrollLines(r5.type === 2 ? -n : n), this.cancel(e, true);
    }
    if (r5.type === 1 && this.selectAll(), this._isThirdLevelShift(this.browser, e) || (r5.cancel && this.cancel(e, true), !r5.key) || e.key && !e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1 && e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 90) return true;
    if (this._unprocessedDeadKey) return this._unprocessedDeadKey = false, true;
    if ((r5.key === b.ETX || r5.key === b.CR) && (this.textarea.value = ""), this._onKey.fire({ key: r5.key, domEvent: e }), this._showCursor(), this.coreService.triggerDataEvent(r5.key, true), !this.optionsService.rawOptions.screenReaderMode || e.altKey || e.ctrlKey) return this.cancel(e, true);
    this._keyDownHandled = true;
  }
  _isThirdLevelShift(e, i) {
    let r5 = e.isMac && !this.options.macOptionIsMeta && i.altKey && !i.ctrlKey && !i.metaKey || e.isWindows && i.altKey && i.ctrlKey && !i.metaKey || e.isWindows && i.getModifierState("AltGraph");
    return i.type === "keypress" ? r5 : r5 && (!i.keyCode || i.keyCode > 47);
  }
  _keyUp(e) {
    this._keyDownSeen = false, !(this._customKeyEventHandler && this._customKeyEventHandler(e) === false) && (Tc(e) || this.focus(), this.updateCursorStyle(e), this._keyPressHandled = false);
  }
  _keyPress(e) {
    let i;
    if (this._keyPressHandled = false, this._keyDownHandled || this._customKeyEventHandler && this._customKeyEventHandler(e) === false) return false;
    if (this.cancel(e), e.charCode) i = e.charCode;
    else if (e.which === null || e.which === void 0) i = e.keyCode;
    else if (e.which !== 0 && e.charCode !== 0) i = e.which;
    else return false;
    return !i || (e.altKey || e.ctrlKey || e.metaKey) && !this._isThirdLevelShift(this.browser, e) ? false : (i = String.fromCharCode(i), this._onKey.fire({ key: i, domEvent: e }), this._showCursor(), this.coreService.triggerDataEvent(i, true), this._keyPressHandled = true, this._unprocessedDeadKey = false, true);
  }
  _inputEvent(e) {
    if (e.data && e.inputType === "insertText" && (!e.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
      if (this._keyPressHandled) return false;
      this._unprocessedDeadKey = false;
      let i = e.data;
      return this.coreService.triggerDataEvent(i, true), this.cancel(e), true;
    }
    return false;
  }
  resize(e, i) {
    if (e === this.cols && i === this.rows) {
      this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
      return;
    }
    super.resize(e, i);
  }
  _afterResize(e, i) {
    this._charSizeService?.measure();
  }
  clear() {
    if (!(this.buffer.ybase === 0 && this.buffer.y === 0)) {
      this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
      for (let e = 1; e < this.rows; e++) this.buffer.lines.push(this.buffer.getBlankLine(X2));
      this._onScroll.fire({ position: this.buffer.ydisp }), this.refresh(0, this.rows - 1);
    }
  }
  reset() {
    this.options.rows = this.rows, this.options.cols = this.cols;
    let e = this._customKeyEventHandler;
    this._setup(), super.reset(), this._selectionService?.reset(), this._decorationService.reset(), this._customKeyEventHandler = e, this.refresh(0, this.rows - 1);
  }
  clearTextureAtlas() {
    this._renderService?.clearTextureAtlas();
  }
  _reportFocus() {
    this.element?.classList.contains("focus") ? this.coreService.triggerDataEvent(b.ESC + "[I") : this.coreService.triggerDataEvent(b.ESC + "[O");
  }
  _reportWindowsOptions(e) {
    if (this._renderService) switch (e) {
      case 0:
        let i = this._renderService.dimensions.css.canvas.width.toFixed(0), r5 = this._renderService.dimensions.css.canvas.height.toFixed(0);
        this.coreService.triggerDataEvent(`${b.ESC}[4;${r5};${i}t`);
        break;
      case 1:
        let n = this._renderService.dimensions.css.cell.width.toFixed(0), o2 = this._renderService.dimensions.css.cell.height.toFixed(0);
        this.coreService.triggerDataEvent(`${b.ESC}[6;${o2};${n}t`);
        break;
    }
  }
  cancel(e, i) {
    if (!(!this.options.cancelEvents && !i)) return e.preventDefault(), e.stopPropagation(), false;
  }
};
function Tc(s15) {
  return s15.keyCode === 16 || s15.keyCode === 17 || s15.keyCode === 18;
}
var xn = class {
  constructor() {
    this._addons = [];
  }
  dispose() {
    for (let t = this._addons.length - 1; t >= 0; t--) this._addons[t].instance.dispose();
  }
  loadAddon(t, e) {
    let i = { instance: e, dispose: e.dispose, isDisposed: false };
    this._addons.push(i), e.dispose = () => this._wrappedAddonDispose(i), e.activate(t);
  }
  _wrappedAddonDispose(t) {
    if (t.isDisposed) return;
    let e = -1;
    for (let i = 0; i < this._addons.length; i++) if (this._addons[i] === t) {
      e = i;
      break;
    }
    if (e === -1) throw new Error("Could not dispose an addon that has not been loaded");
    t.isDisposed = true, t.dispose.apply(t.instance), this._addons.splice(e, 1);
  }
};
var wn = class {
  constructor(t) {
    this._line = t;
  }
  get isWrapped() {
    return this._line.isWrapped;
  }
  get length() {
    return this._line.length;
  }
  getCell(t, e) {
    if (!(t < 0 || t >= this._line.length)) return e ? (this._line.loadCell(t, e), e) : this._line.loadCell(t, new q());
  }
  translateToString(t, e, i) {
    return this._line.translateToString(t, e, i);
  }
};
var Ji = class {
  constructor(t, e) {
    this._buffer = t;
    this.type = e;
  }
  init(t) {
    return this._buffer = t, this;
  }
  get cursorY() {
    return this._buffer.y;
  }
  get cursorX() {
    return this._buffer.x;
  }
  get viewportY() {
    return this._buffer.ydisp;
  }
  get baseY() {
    return this._buffer.ybase;
  }
  get length() {
    return this._buffer.lines.length;
  }
  getLine(t) {
    let e = this._buffer.lines.get(t);
    if (e) return new wn(e);
  }
  getNullCell() {
    return new q();
  }
};
var Dn = class extends D {
  constructor(e) {
    super();
    this._core = e;
    this._onBufferChange = this._register(new v());
    this.onBufferChange = this._onBufferChange.event;
    this._normal = new Ji(this._core.buffers.normal, "normal"), this._alternate = new Ji(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate(() => this._onBufferChange.fire(this.active));
  }
  get active() {
    if (this._core.buffers.active === this._core.buffers.normal) return this.normal;
    if (this._core.buffers.active === this._core.buffers.alt) return this.alternate;
    throw new Error("Active buffer is neither normal nor alternate");
  }
  get normal() {
    return this._normal.init(this._core.buffers.normal);
  }
  get alternate() {
    return this._alternate.init(this._core.buffers.alt);
  }
};
var Rn = class {
  constructor(t) {
    this._core = t;
  }
  registerCsiHandler(t, e) {
    return this._core.registerCsiHandler(t, (i) => e(i.toArray()));
  }
  addCsiHandler(t, e) {
    return this.registerCsiHandler(t, e);
  }
  registerDcsHandler(t, e) {
    return this._core.registerDcsHandler(t, (i, r5) => e(i, r5.toArray()));
  }
  addDcsHandler(t, e) {
    return this.registerDcsHandler(t, e);
  }
  registerEscHandler(t, e) {
    return this._core.registerEscHandler(t, e);
  }
  addEscHandler(t, e) {
    return this.registerEscHandler(t, e);
  }
  registerOscHandler(t, e) {
    return this._core.registerOscHandler(t, e);
  }
  addOscHandler(t, e) {
    return this.registerOscHandler(t, e);
  }
};
var Ln = class {
  constructor(t) {
    this._core = t;
  }
  register(t) {
    this._core.unicodeService.register(t);
  }
  get versions() {
    return this._core.unicodeService.versions;
  }
  get activeVersion() {
    return this._core.unicodeService.activeVersion;
  }
  set activeVersion(t) {
    this._core.unicodeService.activeVersion = t;
  }
};
var Ic = ["cols", "rows"];
var Ue = 0;
var Dl = class extends D {
  constructor(t) {
    super(), this._core = this._register(new yn(t)), this._addonManager = this._register(new xn()), this._publicOptions = { ...this._core.options };
    let e = (r5) => this._core.options[r5], i = (r5, n) => {
      this._checkReadonlyOptions(r5), this._core.options[r5] = n;
    };
    for (let r5 in this._core.options) {
      let n = { get: e.bind(this, r5), set: i.bind(this, r5) };
      Object.defineProperty(this._publicOptions, r5, n);
    }
  }
  _checkReadonlyOptions(t) {
    if (Ic.includes(t)) throw new Error(`Option "${t}" can only be set in the constructor`);
  }
  _checkProposedApi() {
    if (!this._core.optionsService.rawOptions.allowProposedApi) throw new Error("You must set the allowProposedApi option to true to use proposed API");
  }
  get onBell() {
    return this._core.onBell;
  }
  get onBinary() {
    return this._core.onBinary;
  }
  get onCursorMove() {
    return this._core.onCursorMove;
  }
  get onData() {
    return this._core.onData;
  }
  get onKey() {
    return this._core.onKey;
  }
  get onLineFeed() {
    return this._core.onLineFeed;
  }
  get onRender() {
    return this._core.onRender;
  }
  get onResize() {
    return this._core.onResize;
  }
  get onScroll() {
    return this._core.onScroll;
  }
  get onSelectionChange() {
    return this._core.onSelectionChange;
  }
  get onTitleChange() {
    return this._core.onTitleChange;
  }
  get onWriteParsed() {
    return this._core.onWriteParsed;
  }
  get element() {
    return this._core.element;
  }
  get parser() {
    return this._parser || (this._parser = new Rn(this._core)), this._parser;
  }
  get unicode() {
    return this._checkProposedApi(), new Ln(this._core);
  }
  get textarea() {
    return this._core.textarea;
  }
  get rows() {
    return this._core.rows;
  }
  get cols() {
    return this._core.cols;
  }
  get buffer() {
    return this._buffer || (this._buffer = this._register(new Dn(this._core))), this._buffer;
  }
  get markers() {
    return this._checkProposedApi(), this._core.markers;
  }
  get modes() {
    let t = this._core.coreService.decPrivateModes, e = "none";
    switch (this._core.coreMouseService.activeProtocol) {
      case "X10":
        e = "x10";
        break;
      case "VT200":
        e = "vt200";
        break;
      case "DRAG":
        e = "drag";
        break;
      case "ANY":
        e = "any";
        break;
    }
    return { applicationCursorKeysMode: t.applicationCursorKeys, applicationKeypadMode: t.applicationKeypad, bracketedPasteMode: t.bracketedPasteMode, insertMode: this._core.coreService.modes.insertMode, mouseTrackingMode: e, originMode: t.origin, reverseWraparoundMode: t.reverseWraparound, sendFocusMode: t.sendFocus, synchronizedOutputMode: t.synchronizedOutput, wraparoundMode: t.wraparound };
  }
  get options() {
    return this._publicOptions;
  }
  set options(t) {
    for (let e in t) this._publicOptions[e] = t[e];
  }
  blur() {
    this._core.blur();
  }
  focus() {
    this._core.focus();
  }
  input(t, e = true) {
    this._core.input(t, e);
  }
  resize(t, e) {
    this._verifyIntegers(t, e), this._core.resize(t, e);
  }
  open(t) {
    this._core.open(t);
  }
  attachCustomKeyEventHandler(t) {
    this._core.attachCustomKeyEventHandler(t);
  }
  attachCustomWheelEventHandler(t) {
    this._core.attachCustomWheelEventHandler(t);
  }
  registerLinkProvider(t) {
    return this._core.registerLinkProvider(t);
  }
  registerCharacterJoiner(t) {
    return this._checkProposedApi(), this._core.registerCharacterJoiner(t);
  }
  deregisterCharacterJoiner(t) {
    this._checkProposedApi(), this._core.deregisterCharacterJoiner(t);
  }
  registerMarker(t = 0) {
    return this._verifyIntegers(t), this._core.registerMarker(t);
  }
  registerDecoration(t) {
    return this._checkProposedApi(), this._verifyPositiveIntegers(t.x ?? 0, t.width ?? 0, t.height ?? 0), this._core.registerDecoration(t);
  }
  hasSelection() {
    return this._core.hasSelection();
  }
  select(t, e, i) {
    this._verifyIntegers(t, e, i), this._core.select(t, e, i);
  }
  getSelection() {
    return this._core.getSelection();
  }
  getSelectionPosition() {
    return this._core.getSelectionPosition();
  }
  clearSelection() {
    this._core.clearSelection();
  }
  selectAll() {
    this._core.selectAll();
  }
  selectLines(t, e) {
    this._verifyIntegers(t, e), this._core.selectLines(t, e);
  }
  dispose() {
    super.dispose();
  }
  scrollLines(t) {
    this._verifyIntegers(t), this._core.scrollLines(t);
  }
  scrollPages(t) {
    this._verifyIntegers(t), this._core.scrollPages(t);
  }
  scrollToTop() {
    this._core.scrollToTop();
  }
  scrollToBottom() {
    this._core.scrollToBottom();
  }
  scrollToLine(t) {
    this._verifyIntegers(t), this._core.scrollToLine(t);
  }
  clear() {
    this._core.clear();
  }
  write(t, e) {
    this._core.write(t, e);
  }
  writeln(t, e) {
    this._core.write(t), this._core.write(`\r
`, e);
  }
  paste(t) {
    this._core.paste(t);
  }
  refresh(t, e) {
    this._verifyIntegers(t, e), this._core.refresh(t, e);
  }
  reset() {
    this._core.reset();
  }
  clearTextureAtlas() {
    this._core.clearTextureAtlas();
  }
  loadAddon(t) {
    this._addonManager.loadAddon(this, t);
  }
  static get strings() {
    return { get promptLabel() {
      return mi.get();
    }, set promptLabel(t) {
      mi.set(t);
    }, get tooMuchOutput() {
      return _i.get();
    }, set tooMuchOutput(t) {
      _i.set(t);
    } };
  }
  _verifyIntegers(...t) {
    for (Ue of t) if (Ue === 1 / 0 || isNaN(Ue) || Ue % 1 !== 0) throw new Error("This API only accepts integers");
  }
  _verifyPositiveIntegers(...t) {
    for (Ue of t) if (Ue && (Ue === 1 / 0 || isNaN(Ue) || Ue % 1 !== 0 || Ue < 0)) throw new Error("This API only accepts positive integers");
  }
};

// node_modules/@xterm/addon-fit/lib/addon-fit.mjs
var h = 2;
var _ = 1;
var o = class {
  activate(e) {
    this._terminal = e;
  }
  dispose() {
  }
  fit() {
    let e = this.proposeDimensions();
    if (!e || !this._terminal || isNaN(e.cols) || isNaN(e.rows)) return;
    let t = this._terminal._core;
    (this._terminal.rows !== e.rows || this._terminal.cols !== e.cols) && (t._renderService.clear(), this._terminal.resize(e.cols, e.rows));
  }
  proposeDimensions() {
    if (!this._terminal || !this._terminal.element || !this._terminal.element.parentElement) return;
    let t = this._terminal._core._renderService.dimensions;
    if (t.css.cell.width === 0 || t.css.cell.height === 0) return;
    let s15 = this._terminal.options.scrollback === 0 ? 0 : this._terminal.options.overviewRuler?.width || 14, r5 = window.getComputedStyle(this._terminal.element.parentElement), l = parseInt(r5.getPropertyValue("height")), a = Math.max(0, parseInt(r5.getPropertyValue("width"))), i = window.getComputedStyle(this._terminal.element), n = { top: parseInt(i.getPropertyValue("padding-top")), bottom: parseInt(i.getPropertyValue("padding-bottom")), right: parseInt(i.getPropertyValue("padding-right")), left: parseInt(i.getPropertyValue("padding-left")) }, m = n.top + n.bottom, d = n.right + n.left, c = l - m, p = a - d - s15;
    return { cols: Math.max(h, Math.floor(p / t.css.cell.width)), rows: Math.max(_, Math.floor(c / t.css.cell.height)) };
  }
};

// node_modules/@xterm/addon-unicode11/lib/addon-unicode11.mjs
var ue2 = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]];
var qe2 = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
var A;
function He2(r5, e) {
  let t = 0, n = e.length - 1, o2;
  if (r5 < e[0][0] || r5 > e[n][1]) return false;
  for (; n >= t; ) if (o2 = t + n >> 1, r5 > e[o2][1]) t = o2 + 1;
  else if (r5 < e[o2][0]) n = o2 - 1;
  else return true;
  return false;
}
var H2 = class {
  constructor() {
    this.version = "6";
    if (!A) {
      A = new Uint8Array(65536), A.fill(1), A[0] = 0, A.fill(0, 1, 32), A.fill(0, 127, 160), A.fill(2, 4352, 4448), A[9001] = 2, A[9002] = 2, A.fill(2, 11904, 42192), A[12351] = 1, A.fill(2, 44032, 55204), A.fill(2, 63744, 64256), A.fill(2, 65040, 65050), A.fill(2, 65072, 65136), A.fill(2, 65280, 65377), A.fill(2, 65504, 65511);
      for (let e = 0; e < ue2.length; ++e) A.fill(0, ue2[e][0], ue2[e][1] + 1);
    }
  }
  wcwidth(e) {
    return e < 32 ? 0 : e < 127 ? 1 : e < 65536 ? A[e] : He2(e, qe2) ? 0 : e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141 ? 2 : 1;
  }
  charProperties(e, t) {
    let n = this.wcwidth(e), o2 = n === 0 && t !== 0;
    if (o2) {
      let d = w.extractWidth(t);
      d === 0 ? o2 = false : d > n && (n = d);
    }
    return w.createPropertyValue(0, n, o2);
  }
};
var de2 = class {
  constructor() {
    this.listeners = [], this.unexpectedErrorHandler = function(e) {
      setTimeout(() => {
        throw e.stack ? J2.isErrorNoTelemetry(e) ? new J2(e.message + `

` + e.stack) : new Error(e.message + `

` + e.stack) : e;
      }, 0);
    };
  }
  addListener(e) {
    return this.listeners.push(e), () => {
      this._removeListener(e);
    };
  }
  emit(e) {
    this.listeners.forEach((t) => {
      t(e);
    });
  }
  _removeListener(e) {
    this.listeners.splice(this.listeners.indexOf(e), 1);
  }
  setUnexpectedErrorHandler(e) {
    this.unexpectedErrorHandler = e;
  }
  getUnexpectedErrorHandler() {
    return this.unexpectedErrorHandler;
  }
  onUnexpectedError(e) {
    this.unexpectedErrorHandler(e), this.emit(e);
  }
  onUnexpectedExternalError(e) {
    this.unexpectedErrorHandler(e);
  }
};
var Ge = new de2();
function Y2(r5) {
  Je2(r5) || Ge.onUnexpectedError(r5);
}
var ce2 = "Canceled";
function Je2(r5) {
  return r5 instanceof G2 ? true : r5 instanceof Error && r5.name === ce2 && r5.message === ce2;
}
var G2 = class extends Error {
  constructor() {
    super(ce2), this.name = this.message;
  }
};
var J2 = class r extends Error {
  constructor(e) {
    super(e), this.name = "CodeExpectedError";
  }
  static fromError(e) {
    if (e instanceof r) return e;
    let t = new r();
    return t.message = e.message, t.stack = e.stack, t;
  }
  static isErrorNoTelemetry(e) {
    return e.name === "CodeExpectedError";
  }
};
function pe2(r5, e) {
  let t = this, n = false, o2;
  return function() {
    if (n) return o2;
    if (n = true, e) try {
      o2 = r5.apply(t, arguments);
    } finally {
      e();
    }
    else o2 = r5.apply(t, arguments);
    return o2;
  };
}
function Ye2(r5, e, t = 0, n = r5.length) {
  let o2 = t, d = n;
  for (; o2 < d; ) {
    let v2 = Math.floor((o2 + d) / 2);
    e(r5[v2]) ? o2 = v2 + 1 : d = v2;
  }
  return o2 - 1;
}
var X3 = class X4 {
  constructor(e) {
    this._array = e;
    this._findLastMonotonousLastIdx = 0;
  }
  findLastMonotonous(e) {
    if (X4.assertInvariants) {
      if (this._prevFindLastPredicate) {
        for (let n of this._array) if (this._prevFindLastPredicate(n) && !e(n)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
      }
      this._prevFindLastPredicate = e;
    }
    let t = Ye2(this._array, e, this._findLastMonotonousLastIdx);
    return this._findLastMonotonousLastIdx = t + 1, t === -1 ? void 0 : this._array[t];
  }
};
X3.assertInvariants = false;
var Be2;
((E) => {
  function r5(p) {
    return p < 0;
  }
  E.isLessThan = r5;
  function e(p) {
    return p <= 0;
  }
  E.isLessThanOrEqual = e;
  function t(p) {
    return p > 0;
  }
  E.isGreaterThan = t;
  function n(p) {
    return p === 0;
  }
  E.isNeitherLessOrGreaterThan = n, E.greaterThan = 1, E.lessThan = -1, E.neitherLessOrGreaterThan = 0;
})(Be2 ||= {});
function we2(r5, e) {
  return (t, n) => e(r5(t), r5(n));
}
var ke2 = (r5, e) => r5 - e;
var R = class R2 {
  constructor(e) {
    this.iterate = e;
  }
  forEach(e) {
    this.iterate((t) => (e(t), true));
  }
  toArray() {
    let e = [];
    return this.iterate((t) => (e.push(t), true)), e;
  }
  filter(e) {
    return new R2((t) => this.iterate((n) => e(n) ? t(n) : true));
  }
  map(e) {
    return new R2((t) => this.iterate((n) => t(e(n))));
  }
  some(e) {
    let t = false;
    return this.iterate((n) => (t = e(n), !t)), t;
  }
  findFirst(e) {
    let t;
    return this.iterate((n) => e(n) ? (t = n, false) : true), t;
  }
  findLast(e) {
    let t;
    return this.iterate((n) => (e(n) && (t = n), true)), t;
  }
  findLastMaxBy(e) {
    let t, n = true;
    return this.iterate((o2) => ((n || Be2.isGreaterThan(e(o2, t))) && (n = false, t = o2), true)), t;
  }
};
R.empty = new R((e) => {
});
function Oe(r5, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let n of r5) {
    let o2 = e(n), d = t[o2];
    d || (d = t[o2] = []), d.push(n);
  }
  return t;
}
var Se2;
var Re2;
var Le2 = class {
  constructor(e, t) {
    this.toKey = t;
    this._map = /* @__PURE__ */ new Map();
    this[Se2] = "SetWithKey";
    for (let n of e) this.add(n);
  }
  get size() {
    return this._map.size;
  }
  add(e) {
    let t = this.toKey(e);
    return this._map.set(t, e), this;
  }
  delete(e) {
    return this._map.delete(this.toKey(e));
  }
  has(e) {
    return this._map.has(this.toKey(e));
  }
  *entries() {
    for (let e of this._map.values()) yield [e, e];
  }
  keys() {
    return this.values();
  }
  *values() {
    for (let e of this._map.values()) yield e;
  }
  clear() {
    this._map.clear();
  }
  forEach(e, t) {
    this._map.forEach((n) => e.call(t, n, n, this));
  }
  [(Re2 = Symbol.iterator, Se2 = Symbol.toStringTag, Re2)]() {
    return this.values();
  }
};
var Z = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(e, t) {
    let n = this.map.get(e);
    n || (n = /* @__PURE__ */ new Set(), this.map.set(e, n)), n.add(t);
  }
  delete(e, t) {
    let n = this.map.get(e);
    n && (n.delete(t), n.size === 0 && this.map.delete(e));
  }
  forEach(e, t) {
    let n = this.map.get(e);
    n && n.forEach(t);
  }
  get(e) {
    let t = this.map.get(e);
    return t || /* @__PURE__ */ new Set();
  }
};
var fe2;
((le) => {
  function r5(u) {
    return u && typeof u == "object" && typeof u[Symbol.iterator] == "function";
  }
  le.is = r5;
  let e = Object.freeze([]);
  function t() {
    return e;
  }
  le.empty = t;
  function* n(u) {
    yield u;
  }
  le.single = n;
  function o2(u) {
    return r5(u) ? u : n(u);
  }
  le.wrap = o2;
  function d(u) {
    return u || e;
  }
  le.from = d;
  function* v2(u) {
    for (let f = u.length - 1; f >= 0; f--) yield u[f];
  }
  le.reverse = v2;
  function E(u) {
    return !u || u[Symbol.iterator]().next().done === true;
  }
  le.isEmpty = E;
  function p(u) {
    return u[Symbol.iterator]().next().value;
  }
  le.first = p;
  function b2(u, f) {
    let m = 0;
    for (let g of u) if (f(g, m++)) return true;
    return false;
  }
  le.some = b2;
  function D2(u, f) {
    for (let m of u) if (f(m)) return m;
  }
  le.find = D2;
  function* T(u, f) {
    for (let m of u) f(m) && (yield m);
  }
  le.filter = T;
  function* B2(u, f) {
    let m = 0;
    for (let g of u) yield f(g, m++);
  }
  le.map = B2;
  function* L2(u, f) {
    let m = 0;
    for (let g of u) yield* f(g, m++);
  }
  le.flatMap = L2;
  function* oe(...u) {
    for (let f of u) yield* f;
  }
  le.concat = oe;
  function z2(u, f, m) {
    let g = m;
    for (let W of u) g = f(g, W);
    return g;
  }
  le.reduce = z2;
  function* k(u, f, m = u.length) {
    for (f < 0 && (f += u.length), m < 0 ? m += u.length : m > u.length && (m = u.length); f < m; f++) yield u[f];
  }
  le.slice = k;
  function ae2(u, f = Number.POSITIVE_INFINITY) {
    let m = [];
    if (f === 0) return [m, u];
    let g = u[Symbol.iterator]();
    for (let W = 0; W < f; W++) {
      let xe2 = g.next();
      if (xe2.done) return [m, le.empty()];
      m.push(xe2.value);
    }
    return [m, { [Symbol.iterator]() {
      return g;
    } }];
  }
  le.consume = ae2;
  async function V(u) {
    let f = [];
    for await (let m of u) f.push(m);
    return Promise.resolve(f);
  }
  le.asyncToArray = V;
})(fe2 ||= {});
var Xe2 = false;
var O = null;
var ee2 = class ee3 {
  constructor() {
    this.livingDisposables = /* @__PURE__ */ new Map();
  }
  getDisposableData(e) {
    let t = this.livingDisposables.get(e);
    return t || (t = { parent: null, source: null, isSingleton: false, value: e, idx: ee3.idx++ }, this.livingDisposables.set(e, t)), t;
  }
  trackDisposable(e) {
    let t = this.getDisposableData(e);
    t.source || (t.source = new Error().stack);
  }
  setParent(e, t) {
    let n = this.getDisposableData(e);
    n.parent = t;
  }
  markAsDisposed(e) {
    this.livingDisposables.delete(e);
  }
  markAsSingleton(e) {
    this.getDisposableData(e).isSingleton = true;
  }
  getRootParent(e, t) {
    let n = t.get(e);
    if (n) return n;
    let o2 = e.parent ? this.getRootParent(this.getDisposableData(e.parent), t) : e;
    return t.set(e, o2), o2;
  }
  getTrackedDisposables() {
    let e = /* @__PURE__ */ new Map();
    return [...this.livingDisposables.entries()].filter(([, n]) => n.source !== null && !this.getRootParent(n, e).isSingleton).flatMap(([n]) => n);
  }
  computeLeakingDisposables(e = 10, t) {
    let n;
    if (t) n = t;
    else {
      let p = /* @__PURE__ */ new Map(), b2 = [...this.livingDisposables.values()].filter((T) => T.source !== null && !this.getRootParent(T, p).isSingleton);
      if (b2.length === 0) return;
      let D2 = new Set(b2.map((T) => T.value));
      if (n = b2.filter((T) => !(T.parent && D2.has(T.parent))), n.length === 0) throw new Error("There are cyclic diposable chains!");
    }
    if (!n) return;
    function o2(p) {
      function b2(T, B2) {
        for (; T.length > 0 && B2.some((L2) => typeof L2 == "string" ? L2 === T[0] : T[0].match(L2)); ) T.shift();
      }
      let D2 = p.source.split(`
`).map((T) => T.trim().replace("at ", "")).filter((T) => T !== "");
      return b2(D2, ["Error", /^trackDisposable \(.*\)$/, /^DisposableTracker.trackDisposable \(.*\)$/]), D2.reverse();
    }
    let d = new Z();
    for (let p of n) {
      let b2 = o2(p);
      for (let D2 = 0; D2 <= b2.length; D2++) d.add(b2.slice(0, D2).join(`
`), p);
    }
    n.sort(we2((p) => p.idx, ke2));
    let v2 = "", E = 0;
    for (let p of n.slice(0, e)) {
      E++;
      let b2 = o2(p), D2 = [];
      for (let T = 0; T < b2.length; T++) {
        let B2 = b2[T];
        B2 = `(shared with ${d.get(b2.slice(0, T + 1).join(`
`)).size}/${n.length} leaks) at ${B2}`;
        let oe = d.get(b2.slice(0, T).join(`
`)), z2 = Oe([...oe].map((k) => o2(k)[T]), (k) => k);
        delete z2[b2[T]];
        for (let [k, ae2] of Object.entries(z2)) D2.unshift(`    - stacktraces of ${ae2.length} other leaks continue with ${k}`);
        D2.unshift(B2);
      }
      v2 += `


==================== Leaking disposable ${E}/${n.length}: ${p.value.constructor.name} ====================
${D2.join(`
`)}
============================================================

`;
    }
    return n.length > e && (v2 += `


... and ${n.length - e} more leaking disposables

`), { leaks: n, details: v2 };
  }
};
ee2.idx = 0;
function Ze2(r5) {
  O = r5;
}
if (Xe2) {
  let r5 = "__is_disposable_tracked__";
  Ze2(new class {
    trackDisposable(e) {
      let t = new Error("Potentially leaked disposable").stack;
      setTimeout(() => {
        e[r5] || console.log(t);
      }, 3e3);
    }
    setParent(e, t) {
      if (e && e !== _2.None) try {
        e[r5] = true;
      } catch {
      }
    }
    markAsDisposed(e) {
      if (e && e !== _2.None) try {
        e[r5] = true;
      } catch {
      }
    }
    markAsSingleton(e) {
    }
  }());
}
function Te2(r5) {
  return O?.trackDisposable(r5), r5;
}
function ve2(r5) {
  O?.markAsDisposed(r5);
}
function he2(r5, e) {
  O?.setParent(r5, e);
}
function et(r5, e) {
  if (O) for (let t of r5) O.setParent(t, e);
}
function Pe(r5) {
  if (fe2.is(r5)) {
    let e = [];
    for (let t of r5) if (t) try {
      t.dispose();
    } catch (n) {
      e.push(n);
    }
    if (e.length === 1) throw e[0];
    if (e.length > 1) throw new AggregateError(e, "Encountered errors while disposing of store");
    return Array.isArray(r5) ? [] : r5;
  } else if (r5) return r5.dispose(), r5;
}
function Me(...r5) {
  let e = me(() => Pe(r5));
  return et(r5, e), e;
}
function me(r5) {
  let e = Te2({ dispose: pe2(() => {
    ve2(e), r5();
  }) });
  return e;
}
var te = class te2 {
  constructor() {
    this._toDispose = /* @__PURE__ */ new Set();
    this._isDisposed = false;
    Te2(this);
  }
  dispose() {
    this._isDisposed || (ve2(this), this._isDisposed = true, this.clear());
  }
  get isDisposed() {
    return this._isDisposed;
  }
  clear() {
    if (this._toDispose.size !== 0) try {
      Pe(this._toDispose);
    } finally {
      this._toDispose.clear();
    }
  }
  add(e) {
    if (!e) return e;
    if (e === this) throw new Error("Cannot register a disposable on itself!");
    return he2(e, this), this._isDisposed ? te2.DISABLE_DISPOSED_WARNING || console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack) : this._toDispose.add(e), e;
  }
  delete(e) {
    if (e) {
      if (e === this) throw new Error("Cannot dispose a disposable on itself!");
      this._toDispose.delete(e), e.dispose();
    }
  }
  deleteAndLeak(e) {
    e && this._toDispose.has(e) && (this._toDispose.delete(e), he2(e, null));
  }
};
te.DISABLE_DISPOSED_WARNING = false;
var U2 = te;
var _2 = class {
  constructor() {
    this._store = new U2();
    Te2(this), he2(this._store, this);
  }
  dispose() {
    ve2(this), this._store.dispose();
  }
  _register(e) {
    if (e === this) throw new Error("Cannot register a disposable on itself!");
    return this._store.add(e);
  }
};
_2.None = Object.freeze({ dispose() {
} });
var P = class P2 {
  constructor(e) {
    this.element = e, this.next = P2.Undefined, this.prev = P2.Undefined;
  }
};
P.Undefined = new P(void 0);
var tt = globalThis.performance && typeof globalThis.performance.now == "function";
var ne2 = class r2 {
  static create(e) {
    return new r2(e);
  }
  constructor(e) {
    this._now = tt && e === false ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
  }
  stop() {
    this._stopTime = this._now();
  }
  reset() {
    this._startTime = this._now(), this._stopTime = -1;
  }
  elapsed() {
    return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime;
  }
};
var nt2 = false;
var Ve2 = false;
var rt2 = false;
var it;
((Q3) => {
  Q3.None = () => _2.None;
  function e(l) {
    if (rt2) {
      let { onDidAddListener: i } = l, a = K2.create(), s15 = 0;
      l.onDidAddListener = () => {
        ++s15 === 2 && (console.warn("snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here"), a.print()), i?.();
      };
    }
  }
  function t(l, i) {
    return B2(l, () => {
    }, 0, void 0, true, void 0, i);
  }
  Q3.defer = t;
  function n(l) {
    return (i, a = null, s15) => {
      let x = false, c;
      return c = l((h2) => {
        if (!x) return c ? c.dispose() : x = true, i.call(a, h2);
      }, null, s15), x && c.dispose(), c;
    };
  }
  Q3.once = n;
  function o2(l, i, a) {
    return D2((s15, x = null, c) => l((h2) => s15.call(x, i(h2)), null, c), a);
  }
  Q3.map = o2;
  function d(l, i, a) {
    return D2((s15, x = null, c) => l((h2) => {
      i(h2), s15.call(x, h2);
    }, null, c), a);
  }
  Q3.forEach = d;
  function v2(l, i, a) {
    return D2((s15, x = null, c) => l((h2) => i(h2) && s15.call(x, h2), null, c), a);
  }
  Q3.filter = v2;
  function E(l) {
    return l;
  }
  Q3.signal = E;
  function p(...l) {
    return (i, a = null, s15) => {
      let x = Me(...l.map((c) => c((h2) => i.call(a, h2))));
      return T(x, s15);
    };
  }
  Q3.any = p;
  function b2(l, i, a, s15) {
    let x = a;
    return o2(l, (c) => (x = i(x, c), x), s15);
  }
  Q3.reduce = b2;
  function D2(l, i) {
    let a, s15 = { onWillAddFirstListener() {
      a = l(x.fire, x);
    }, onDidRemoveLastListener() {
      a?.dispose();
    } };
    i || e(s15);
    let x = new C2(s15);
    return i?.add(x), x.event;
  }
  function T(l, i) {
    return i instanceof Array ? i.push(l) : i && i.add(l), l;
  }
  function B2(l, i, a = 100, s15 = false, x = false, c, h2) {
    let F2, y, S2, $2 = 0, j2, Ce2 = { leakWarningThreshold: c, onWillAddFirstListener() {
      F2 = l((Qe) => {
        $2++, y = i(y, Qe), s15 && !S2 && (q2.fire(y), y = void 0), j2 = () => {
          let $e2 = y;
          y = void 0, S2 = void 0, (!s15 || $2 > 1) && q2.fire($e2), $2 = 0;
        }, typeof a == "number" ? (clearTimeout(S2), S2 = setTimeout(j2, a)) : S2 === void 0 && (S2 = 0, queueMicrotask(j2));
      });
    }, onWillRemoveListener() {
      x && $2 > 0 && j2?.();
    }, onDidRemoveLastListener() {
      j2 = void 0, F2.dispose();
    } };
    h2 || e(Ce2);
    let q2 = new C2(Ce2);
    return h2?.add(q2), q2.event;
  }
  Q3.debounce = B2;
  function L2(l, i = 0, a) {
    return Q3.debounce(l, (s15, x) => s15 ? (s15.push(x), s15) : [x], i, void 0, true, void 0, a);
  }
  Q3.accumulate = L2;
  function oe(l, i = (s15, x) => s15 === x, a) {
    let s15 = true, x;
    return v2(l, (c) => {
      let h2 = s15 || !i(c, x);
      return s15 = false, x = c, h2;
    }, a);
  }
  Q3.latch = oe;
  function z2(l, i, a) {
    return [Q3.filter(l, i, a), Q3.filter(l, (s15) => !i(s15), a)];
  }
  Q3.split = z2;
  function k(l, i = false, a = [], s15) {
    let x = a.slice(), c = l((y) => {
      x ? x.push(y) : F2.fire(y);
    });
    s15 && s15.add(c);
    let h2 = () => {
      x?.forEach((y) => F2.fire(y)), x = null;
    }, F2 = new C2({ onWillAddFirstListener() {
      c || (c = l((y) => F2.fire(y)), s15 && s15.add(c));
    }, onDidAddFirstListener() {
      x && (i ? setTimeout(h2) : h2());
    }, onDidRemoveLastListener() {
      c && c.dispose(), c = null;
    } });
    return s15 && s15.add(F2), F2.event;
  }
  Q3.buffer = k;
  function ae2(l, i) {
    return (s15, x, c) => {
      let h2 = i(new le());
      return l(function(F2) {
        let y = h2.evaluate(F2);
        y !== V && s15.call(x, y);
      }, void 0, c);
    };
  }
  Q3.chain = ae2;
  let V = /* @__PURE__ */ Symbol("HaltChainable");
  class le {
    constructor() {
      this.steps = [];
    }
    map(i) {
      return this.steps.push(i), this;
    }
    forEach(i) {
      return this.steps.push((a) => (i(a), a)), this;
    }
    filter(i) {
      return this.steps.push((a) => i(a) ? a : V), this;
    }
    reduce(i, a) {
      let s15 = a;
      return this.steps.push((x) => (s15 = i(s15, x), s15)), this;
    }
    latch(i = (a, s15) => a === s15) {
      let a = true, s15;
      return this.steps.push((x) => {
        let c = a || !i(x, s15);
        return a = false, s15 = x, c ? x : V;
      }), this;
    }
    evaluate(i) {
      for (let a of this.steps) if (i = a(i), i === V) break;
      return i;
    }
  }
  function u(l, i, a = (s15) => s15) {
    let s15 = (...F2) => h2.fire(a(...F2)), x = () => l.on(i, s15), c = () => l.removeListener(i, s15), h2 = new C2({ onWillAddFirstListener: x, onDidRemoveLastListener: c });
    return h2.event;
  }
  Q3.fromNodeEventEmitter = u;
  function f(l, i, a = (s15) => s15) {
    let s15 = (...F2) => h2.fire(a(...F2)), x = () => l.addEventListener(i, s15), c = () => l.removeEventListener(i, s15), h2 = new C2({ onWillAddFirstListener: x, onDidRemoveLastListener: c });
    return h2.event;
  }
  Q3.fromDOMEventEmitter = f;
  function m(l) {
    return new Promise((i) => n(l)(i));
  }
  Q3.toPromise = m;
  function g(l) {
    let i = new C2();
    return l.then((a) => {
      i.fire(a);
    }, () => {
      i.fire(void 0);
    }).finally(() => {
      i.dispose();
    }), i.event;
  }
  Q3.fromPromise = g;
  function W(l, i) {
    return l((a) => i.fire(a));
  }
  Q3.forward = W;
  function xe2(l, i, a) {
    return i(a), l((s15) => i(s15));
  }
  Q3.runAndSubscribe = xe2;
  class ze {
    constructor(i, a) {
      this._observable = i;
      this._counter = 0;
      this._hasChanged = false;
      let s15 = { onWillAddFirstListener: () => {
        i.addObserver(this);
      }, onDidRemoveLastListener: () => {
        i.removeObserver(this);
      } };
      a || e(s15), this.emitter = new C2(s15), a && a.add(this.emitter);
    }
    beginUpdate(i) {
      this._counter++;
    }
    handlePossibleChange(i) {
    }
    handleChange(i, a) {
      this._hasChanged = true;
    }
    endUpdate(i) {
      this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = false, this.emitter.fire(this._observable.get())));
    }
  }
  function ut2(l, i) {
    return new ze(l, i).emitter.event;
  }
  Q3.fromObservable = ut2;
  function dt2(l) {
    return (i, a, s15) => {
      let x = 0, c = false, h2 = { beginUpdate() {
        x++;
      }, endUpdate() {
        x--, x === 0 && (l.reportChanges(), c && (c = false, i.call(a)));
      }, handlePossibleChange() {
      }, handleChange() {
        c = true;
      } };
      l.addObserver(h2), l.reportChanges();
      let F2 = { dispose() {
        l.removeObserver(h2);
      } };
      return s15 instanceof U2 ? s15.add(F2) : Array.isArray(s15) && s15.push(F2), F2;
    };
  }
  Q3.fromObservableLight = dt2;
})(it ||= {});
var M2 = class M3 {
  constructor(e) {
    this.listenerCount = 0;
    this.invocationCount = 0;
    this.elapsedOverall = 0;
    this.durations = [];
    this.name = `${e}_${M3._idPool++}`, M3.all.add(this);
  }
  start(e) {
    this._stopWatch = new ne2(), this.listenerCount = e;
  }
  stop() {
    if (this._stopWatch) {
      let e = this._stopWatch.elapsed();
      this.durations.push(e), this.elapsedOverall += e, this.invocationCount += 1, this._stopWatch = void 0;
    }
  }
};
M2.all = /* @__PURE__ */ new Set(), M2._idPool = 0;
var be2 = M2;
var We2 = -1;
var ie2 = class ie3 {
  constructor(e, t, n = (ie3._idPool++).toString(16).padStart(3, "0")) {
    this._errorHandler = e;
    this.threshold = t;
    this.name = n;
    this._warnCountdown = 0;
  }
  dispose() {
    this._stacks?.clear();
  }
  check(e, t) {
    let n = this.threshold;
    if (n <= 0 || t < n) return;
    this._stacks || (this._stacks = /* @__PURE__ */ new Map());
    let o2 = this._stacks.get(e.value) || 0;
    if (this._stacks.set(e.value, o2 + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
      this._warnCountdown = n * 0.5;
      let [d, v2] = this.getMostFrequentStack(), E = `[${this.name}] potential listener LEAK detected, having ${t} listeners already. MOST frequent listener (${v2}):`;
      console.warn(E), console.warn(d);
      let p = new De2(E, d);
      this._errorHandler(p);
    }
    return () => {
      let d = this._stacks.get(e.value) || 0;
      this._stacks.set(e.value, d - 1);
    };
  }
  getMostFrequentStack() {
    if (!this._stacks) return;
    let e, t = 0;
    for (let [n, o2] of this._stacks) (!e || t < o2) && (e = [n, o2], t = o2);
    return e;
  }
};
ie2._idPool = 1;
var Ee2 = ie2;
var K2 = class r3 {
  constructor(e) {
    this.value = e;
  }
  static create() {
    let e = new Error();
    return new r3(e.stack ?? "");
  }
  print() {
    console.warn(this.value.split(`
`).slice(2).join(`
`));
  }
};
var De2 = class extends Error {
  constructor(e, t) {
    super(e), this.name = "ListenerLeakError", this.stack = t;
  }
};
var Ae2 = class extends Error {
  constructor(e, t) {
    super(e), this.name = "ListenerRefusalError", this.stack = t;
  }
};
var st2 = 0;
var N = class {
  constructor(e) {
    this.value = e;
    this.id = st2++;
  }
};
var ot2 = 2;
var at2 = (r5, e) => {
  if (r5 instanceof N) e(r5);
  else for (let t = 0; t < r5.length; t++) {
    let n = r5[t];
    n && e(n);
  }
};
var re2;
if (nt2) {
  let r5 = [];
  setInterval(() => {
    r5.length !== 0 && (console.warn("[LEAKING LISTENERS] GC'ed these listeners that were NOT yet disposed:"), console.warn(r5.join(`
`)), r5.length = 0);
  }, 3e3), re2 = new FinalizationRegistry((e) => {
    typeof e == "string" && r5.push(e);
  });
}
var C2 = class {
  constructor(e) {
    this._size = 0;
    this._options = e, this._leakageMon = We2 > 0 || this._options?.leakWarningThreshold ? new Ee2(e?.onListenerError ?? Y2, this._options?.leakWarningThreshold ?? We2) : void 0, this._perfMon = this._options?._profName ? new be2(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
  }
  dispose() {
    if (!this._disposed) {
      if (this._disposed = true, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners) {
        if (Ve2) {
          let e = this._listeners;
          queueMicrotask(() => {
            at2(e, (t) => t.stack?.print());
          });
        }
        this._listeners = void 0, this._size = 0;
      }
      this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose();
    }
  }
  get event() {
    return this._event ??= (e, t, n) => {
      if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
        let p = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
        console.warn(p);
        let b2 = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], D2 = new Ae2(`${p}. HINT: Stack shows most frequent listener (${b2[1]}-times)`, b2[0]);
        return (this._options?.onListenerError || Y2)(D2), _2.None;
      }
      if (this._disposed) return _2.None;
      t && (e = e.bind(t));
      let o2 = new N(e), d, v2;
      this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2) && (o2.stack = K2.create(), d = this._leakageMon.check(o2.stack, this._size + 1)), Ve2 && (o2.stack = v2 ?? K2.create()), this._listeners ? this._listeners instanceof N ? (this._deliveryQueue ??= new Fe2(), this._listeners = [this._listeners, o2]) : this._listeners.push(o2) : (this._options?.onWillAddFirstListener?.(this), this._listeners = o2, this._options?.onDidAddFirstListener?.(this)), this._size++;
      let E = me(() => {
        re2?.unregister(E), d?.(), this._removeListener(o2);
      });
      if (n instanceof U2 ? n.add(E) : Array.isArray(n) && n.push(E), re2) {
        let p = new Error().stack.split(`
`).slice(2, 3).join(`
`).trim(), b2 = /(file:|vscode-file:\/\/vscode-app)?(\/[^:]*:\d+:\d+)/.exec(p);
        re2.register(E, b2?.[2] ?? p, E);
      }
      return E;
    }, this._event;
  }
  _removeListener(e) {
    if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
    if (this._size === 1) {
      this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
      return;
    }
    let t = this._listeners, n = t.indexOf(e);
    if (n === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
    this._size--, t[n] = void 0;
    let o2 = this._deliveryQueue.current === this;
    if (this._size * ot2 <= t.length) {
      let d = 0;
      for (let v2 = 0; v2 < t.length; v2++) t[v2] ? t[d++] = t[v2] : o2 && (this._deliveryQueue.end--, d < this._deliveryQueue.i && this._deliveryQueue.i--);
      t.length = d;
    }
  }
  _deliver(e, t) {
    if (!e) return;
    let n = this._options?.onListenerError || Y2;
    if (!n) {
      e.value(t);
      return;
    }
    try {
      e.value(t);
    } catch (o2) {
      n(o2);
    }
  }
  _deliverQueue(e) {
    let t = e.current._listeners;
    for (; e.i < e.end; ) this._deliver(t[e.i++], e.value);
    e.reset();
  }
  fire(e) {
    if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof N) this._deliver(this._listeners, e);
    else {
      let t = this._deliveryQueue;
      t.enqueue(this, e, this._listeners.length), this._deliverQueue(t);
    }
    this._perfMon?.stop();
  }
  hasListeners() {
    return this._size > 0;
  }
};
var Fe2 = class {
  constructor() {
    this.i = -1;
    this.end = 0;
  }
  enqueue(e, t, n) {
    this.i = 0, this.end = n, this.current = e, this.value = t;
  }
  reset() {
    this.i = this.end, this.current = void 0, this.value = void 0;
  }
};
var w = class r4 {
  constructor() {
    this._providers = /* @__PURE__ */ Object.create(null);
    this._active = "";
    this._onChange = new C2();
    this.onChange = this._onChange.event;
    let e = new H2();
    this.register(e), this._active = e.version, this._activeProvider = e;
  }
  static extractShouldJoin(e) {
    return (e & 1) !== 0;
  }
  static extractWidth(e) {
    return e >> 1 & 3;
  }
  static extractCharKind(e) {
    return e >> 3;
  }
  static createPropertyValue(e, t, n = false) {
    return (e & 16777215) << 3 | (t & 3) << 1 | (n ? 1 : 0);
  }
  dispose() {
    this._onChange.dispose();
  }
  get versions() {
    return Object.keys(this._providers);
  }
  get activeVersion() {
    return this._active;
  }
  set activeVersion(e) {
    if (!this._providers[e]) throw new Error(`unknown Unicode version "${e}"`);
    this._active = e, this._activeProvider = this._providers[e], this._onChange.fire(e);
  }
  register(e) {
    this._providers[e.version] = e;
  }
  wcwidth(e) {
    return this._activeProvider.wcwidth(e);
  }
  getStringCellWidth(e) {
    let t = 0, n = 0, o2 = e.length;
    for (let d = 0; d < o2; ++d) {
      let v2 = e.charCodeAt(d);
      if (55296 <= v2 && v2 <= 56319) {
        if (++d >= o2) return t + this.wcwidth(v2);
        let b2 = e.charCodeAt(d);
        56320 <= b2 && b2 <= 57343 ? v2 = (v2 - 55296) * 1024 + b2 - 56320 + 65536 : t += this.wcwidth(b2);
      }
      let E = this.charProperties(v2, n), p = r4.extractWidth(E);
      r4.extractShouldJoin(E) && (p -= r4.extractWidth(n)), t += p, n = E;
    }
    return t;
  }
  charProperties(e, t) {
    return this._activeProvider.charProperties(e, t);
  }
};
var ye2 = [[768, 879], [1155, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1541], [1552, 1562], [1564, 1564], [1611, 1631], [1648, 1648], [1750, 1757], [1759, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2045, 2045], [2070, 2073], [2075, 2083], [2085, 2087], [2089, 2093], [2137, 2139], [2259, 2306], [2362, 2362], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2391], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2558, 2558], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2641, 2641], [2672, 2673], [2677, 2677], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2810, 2815], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2884], [2893, 2893], [2902, 2902], [2914, 2915], [2946, 2946], [3008, 3008], [3021, 3021], [3072, 3072], [3076, 3076], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3170, 3171], [3201, 3201], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3328, 3329], [3387, 3388], [3393, 3396], [3405, 3405], [3426, 3427], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3981, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4151], [4153, 4154], [4157, 4158], [4184, 4185], [4190, 4192], [4209, 4212], [4226, 4226], [4229, 4230], [4237, 4237], [4253, 4253], [4448, 4607], [4957, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6158], [6277, 6278], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6683, 6683], [6742, 6742], [6744, 6750], [6752, 6752], [6754, 6754], [6757, 6764], [6771, 6780], [6783, 6783], [6832, 6846], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7040, 7041], [7074, 7077], [7080, 7081], [7083, 7085], [7142, 7142], [7144, 7145], [7149, 7149], [7151, 7153], [7212, 7219], [7222, 7223], [7376, 7378], [7380, 7392], [7394, 7400], [7405, 7405], [7412, 7412], [7416, 7417], [7616, 7673], [7675, 7679], [8203, 8207], [8234, 8238], [8288, 8292], [8294, 8303], [8400, 8432], [11503, 11505], [11647, 11647], [11744, 11775], [12330, 12333], [12441, 12442], [42607, 42610], [42612, 42621], [42654, 42655], [42736, 42737], [43010, 43010], [43014, 43014], [43019, 43019], [43045, 43046], [43204, 43205], [43232, 43249], [43263, 43263], [43302, 43309], [43335, 43345], [43392, 43394], [43443, 43443], [43446, 43449], [43452, 43453], [43493, 43493], [43561, 43566], [43569, 43570], [43573, 43574], [43587, 43587], [43596, 43596], [43644, 43644], [43696, 43696], [43698, 43700], [43703, 43704], [43710, 43711], [43713, 43713], [43756, 43757], [43766, 43766], [44005, 44005], [44008, 44008], [44013, 44013], [64286, 64286], [65024, 65039], [65056, 65071], [65279, 65279], [65529, 65531]];
var lt2 = [[66045, 66045], [66272, 66272], [66422, 66426], [68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [68325, 68326], [68900, 68903], [69446, 69456], [69633, 69633], [69688, 69702], [69759, 69761], [69811, 69814], [69817, 69818], [69821, 69821], [69837, 69837], [69888, 69890], [69927, 69931], [69933, 69940], [70003, 70003], [70016, 70017], [70070, 70078], [70089, 70092], [70191, 70193], [70196, 70196], [70198, 70199], [70206, 70206], [70367, 70367], [70371, 70378], [70400, 70401], [70459, 70460], [70464, 70464], [70502, 70508], [70512, 70516], [70712, 70719], [70722, 70724], [70726, 70726], [70750, 70750], [70835, 70840], [70842, 70842], [70847, 70848], [70850, 70851], [71090, 71093], [71100, 71101], [71103, 71104], [71132, 71133], [71219, 71226], [71229, 71229], [71231, 71232], [71339, 71339], [71341, 71341], [71344, 71349], [71351, 71351], [71453, 71455], [71458, 71461], [71463, 71467], [71727, 71735], [71737, 71738], [72148, 72151], [72154, 72155], [72160, 72160], [72193, 72202], [72243, 72248], [72251, 72254], [72263, 72263], [72273, 72278], [72281, 72283], [72330, 72342], [72344, 72345], [72752, 72758], [72760, 72765], [72767, 72767], [72850, 72871], [72874, 72880], [72882, 72883], [72885, 72886], [73009, 73014], [73018, 73018], [73020, 73021], [73023, 73029], [73031, 73031], [73104, 73105], [73109, 73109], [73111, 73111], [73459, 73460], [78896, 78904], [92912, 92916], [92976, 92982], [94031, 94031], [94095, 94098], [113821, 113822], [113824, 113827], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [121344, 121398], [121403, 121452], [121461, 121461], [121476, 121476], [121499, 121503], [121505, 121519], [122880, 122886], [122888, 122904], [122907, 122913], [122915, 122916], [122918, 122922], [123184, 123190], [123628, 123631], [125136, 125142], [125252, 125258], [917505, 917505], [917536, 917631], [917760, 917999]];
var ge2 = [[4352, 4447], [8986, 8987], [9001, 9002], [9193, 9196], [9200, 9200], [9203, 9203], [9725, 9726], [9748, 9749], [9800, 9811], [9855, 9855], [9875, 9875], [9889, 9889], [9898, 9899], [9917, 9918], [9924, 9925], [9934, 9934], [9940, 9940], [9962, 9962], [9970, 9971], [9973, 9973], [9978, 9978], [9981, 9981], [9989, 9989], [9994, 9995], [10024, 10024], [10060, 10060], [10062, 10062], [10067, 10069], [10071, 10071], [10133, 10135], [10160, 10160], [10175, 10175], [11035, 11036], [11088, 11088], [11093, 11093], [11904, 11929], [11931, 12019], [12032, 12245], [12272, 12283], [12288, 12329], [12334, 12350], [12353, 12438], [12443, 12543], [12549, 12591], [12593, 12686], [12688, 12730], [12736, 12771], [12784, 12830], [12832, 12871], [12880, 19903], [19968, 42124], [42128, 42182], [43360, 43388], [44032, 55203], [63744, 64255], [65040, 65049], [65072, 65106], [65108, 65126], [65128, 65131], [65281, 65376], [65504, 65510]];
var xt2 = [[94176, 94179], [94208, 100343], [100352, 101106], [110592, 110878], [110928, 110930], [110948, 110951], [110960, 111355], [126980, 126980], [127183, 127183], [127374, 127374], [127377, 127386], [127488, 127490], [127504, 127547], [127552, 127560], [127568, 127569], [127584, 127589], [127744, 127776], [127789, 127797], [127799, 127868], [127870, 127891], [127904, 127946], [127951, 127955], [127968, 127984], [127988, 127988], [127992, 128062], [128064, 128064], [128066, 128252], [128255, 128317], [128331, 128334], [128336, 128359], [128378, 128378], [128405, 128406], [128420, 128420], [128507, 128591], [128640, 128709], [128716, 128716], [128720, 128722], [128725, 128725], [128747, 128748], [128756, 128762], [128992, 129003], [129293, 129393], [129395, 129398], [129402, 129442], [129445, 129450], [129454, 129482], [129485, 129535], [129648, 129651], [129656, 129658], [129664, 129666], [129680, 129685], [131072, 196605], [196608, 262141]];
var I;
function je2(r5, e) {
  let t = 0, n = e.length - 1, o2;
  if (r5 < e[0][0] || r5 > e[n][1]) return false;
  for (; n >= t; ) if (o2 = t + n >> 1, r5 > e[o2][1]) t = o2 + 1;
  else if (r5 < e[o2][0]) n = o2 - 1;
  else return true;
  return false;
}
var se2 = class {
  constructor() {
    this.version = "11";
    if (!I) {
      I = new Uint8Array(65536), I.fill(1), I[0] = 0, I.fill(0, 1, 32), I.fill(0, 127, 160);
      for (let e = 0; e < ye2.length; ++e) I.fill(0, ye2[e][0], ye2[e][1] + 1);
      for (let e = 0; e < ge2.length; ++e) I.fill(2, ge2[e][0], ge2[e][1] + 1);
    }
  }
  wcwidth(e) {
    return e < 32 ? 0 : e < 127 ? 1 : e < 65536 ? I[e] : je2(e, lt2) ? 0 : je2(e, xt2) ? 2 : 1;
  }
  charProperties(e, t) {
    let n = this.wcwidth(e), o2 = n === 0 && t !== 0;
    if (o2) {
      let d = w.extractWidth(t);
      d === 0 ? o2 = false : d > n && (n = d);
    }
    return w.createPropertyValue(0, n, o2);
  }
};
var Ke = class {
  activate(e) {
    e.unicode.register(new se2());
  }
  dispose() {
  }
};

// src/frontend/BgTerminal.tsx
import {
  invokeAction,
  useHost,
  useSlotContributions as useSlotContributions2,
  useTheme,
  useTranslation as useTranslation2
} from "@termix/plugin-sdk/frontend";
import { copyToClipboard, readFromClipboard } from "@termix/plugin-sdk/ui";

// src/frontend/runtime.ts
import { useSyncExternalStore } from "react";
var current = null;
function setApp(app2) {
  current = app2;
}
function app() {
  if (!current) throw new Error("BG Shell is not active");
  return current;
}
var TAB_TYPE = "bg-shell";
var SELECTED_KEY = "bg-shell:selected";
function readSelected() {
  try {
    return localStorage.getItem(SELECTED_KEY);
  } catch {
    return null;
  }
}
function writeSelected(id) {
  try {
    if (id) localStorage.setItem(SELECTED_KEY, id);
    else localStorage.removeItem(SELECTED_KEY);
  } catch {
  }
}
function errorMessage(error) {
  const response = error?.response;
  if (typeof response?.data?.error === "string") return response.data.error;
  if (error instanceof Error && error.message) return error.message;
  return "Unknown error";
}
var SELECT_EVENT = "bg-shell:select";
var pendingOpen = null;
function takePendingOpen() {
  const id = pendingOpen;
  pendingOpen = null;
  return id;
}
function requestSelect(id) {
  writeSelected(id);
  pendingOpen = id;
  window.dispatchEvent(new CustomEvent(SELECT_EVENT, { detail: id }));
}
function onSelectRequest(listener) {
  const handler = (event) => {
    const id = event.detail;
    if (typeof id === "string") listener(id);
  };
  window.addEventListener(SELECT_EVENT, handler);
  return () => window.removeEventListener(SELECT_EVENT, handler);
}
var shownId = readSelected();
var shownListeners = /* @__PURE__ */ new Set();
function setShownSession(id) {
  if (shownId === id) return;
  shownId = id;
  for (const listener of [...shownListeners]) listener();
}
function useShownSession() {
  return useSyncExternalStore(
    (listener) => {
      shownListeners.add(listener);
      return () => shownListeners.delete(listener);
    },
    () => shownId
  );
}
var panelsShown = 0;
var panelListeners = /* @__PURE__ */ new Set();
function notePanelShown() {
  panelsShown++;
  for (const listener of [...panelListeners]) listener();
  let done = false;
  return () => {
    if (done) return;
    done = true;
    panelsShown--;
    for (const listener of [...panelListeners]) listener();
  };
}
function usePanelShown() {
  return useSyncExternalStore(
    (listener) => {
      panelListeners.add(listener);
      return () => panelListeners.delete(listener);
    },
    () => panelsShown > 0
  );
}

// src/frontend/toolbar/TerminalToolbar.tsx
import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo as useMemo2,
  useRef,
  useState
} from "react";

// src/frontend/toolbar/terminal-slots.ts
var TERMINAL_TOOLBAR_SLOT = "terminal.toolbar";
var TERMINAL_TOOLBAR_STATUS_SLOT = "terminal.toolbarStatus";
var TERMINAL_SIDE_PANEL_SLOT = "terminal.sidePanel";

// src/frontend/toolbar/toolbar-geometry.ts
var TOOLBAR_POSITION_STORAGE_KEY = "termix-terminal-toolbar-position-v2";
var TOOLBAR_MARGIN = 8;
var RECOVERY_SIZE = 44;
function getDefaultToolbarPosition() {
  return { x: 0, y: 0 };
}
function sanitizeToolbarPosition(value) {
  if (!value || typeof value !== "object") return getDefaultToolbarPosition();
  const candidate = value;
  return Number.isFinite(candidate.x) && Number.isFinite(candidate.y) ? { x: Number(candidate.x), y: Number(candidate.y) } : getDefaultToolbarPosition();
}
function readStoredPosition(storageKey) {
  if (typeof window === "undefined") return getDefaultToolbarPosition();
  try {
    return sanitizeToolbarPosition(
      JSON.parse(window.localStorage.getItem(storageKey) ?? "null")
    );
  } catch {
    return getDefaultToolbarPosition();
  }
}
function persistPosition(storageKey, position) {
  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify(sanitizeToolbarPosition(position))
    );
  } catch {
  }
}
function toolbarPositionStorageKey(anchor = "bottom") {
  return anchor === "bottom" ? TOOLBAR_POSITION_STORAGE_KEY : `${TOOLBAR_POSITION_STORAGE_KEY}-${anchor}`;
}
function readStoredToolbarPosition(anchor) {
  return readStoredPosition(toolbarPositionStorageKey(anchor));
}
function persistToolbarPosition(position, anchor) {
  persistPosition(toolbarPositionStorageKey(anchor), position);
}
function clampToolbarPosition(position, toolbarRect, hostRect, renderedPosition = position) {
  if (!toolbarRect.width || !toolbarRect.height || !hostRect.width || !hostRect.height)
    return sanitizeToolbarPosition(position);
  const left = hostRect.left + TOOLBAR_MARGIN;
  const right = hostRect.right - TOOLBAR_MARGIN;
  const top = hostRect.top + TOOLBAR_MARGIN;
  const bottom = hostRect.bottom - TOOLBAR_MARGIN;
  const baseLeft = toolbarRect.left - renderedPosition.x;
  const baseRight = toolbarRect.right - renderedPosition.x;
  const baseTop = toolbarRect.top - renderedPosition.y;
  const baseBottom = toolbarRect.bottom - renderedPosition.y;
  const clamp = (min, max, value) => Math.min(max, Math.max(min, value));
  const xMin = toolbarRect.width <= right - left ? left - baseLeft : left + RECOVERY_SIZE - baseRight;
  const xMax = right - baseRight;
  const yMin = toolbarRect.height <= bottom - top ? top - baseTop : top + RECOVERY_SIZE - baseBottom;
  const yMax = bottom - baseBottom;
  return { x: clamp(xMin, xMax, position.x), y: clamp(yMin, yMax, position.y) };
}
function getResponsiveToolbarDensity(selectedDensity, currentDensity, availableInlineSize, requiredInlineSize) {
  if (selectedDensity === "icon") return "icon";
  if (!Number.isFinite(availableInlineSize) || availableInlineSize <= 0)
    return currentDensity;
  if (!Number.isFinite(requiredInlineSize) || requiredInlineSize <= 0)
    return currentDensity;
  if (currentDensity === "icon")
    return availableInlineSize >= requiredInlineSize * 1.15 ? selectedDensity : currentDensity;
  return availableInlineSize < requiredInlineSize * 1.1 ? "icon" : selectedDensity;
}

// src/frontend/toolbar/toolbar-settings.ts
var TOOLBAR_ANCHORS = [
  "bottom",
  "bottom-left",
  "bottom-right",
  "top",
  "top-left",
  "top-right"
];
var DEFAULT_TOOLBAR_SETTINGS = {
  anchor: "bottom",
  startCollapsed: false,
  density: null,
  showStatus: true,
  fadeWhenIdle: true
};
var DENSITIES = ["icon", "labeled", "expanded"];
function readToolbarSettings(host) {
  const values = host?.pluginSettings?.["ssh-terminal"] ?? {};
  const anchor = values.terminalToolbarPosition;
  const density = values.terminalToolbarDisplay;
  const bool = (value, fallback) => typeof value === "boolean" ? value : fallback;
  return {
    anchor: TOOLBAR_ANCHORS.includes(anchor) ? anchor : DEFAULT_TOOLBAR_SETTINGS.anchor,
    startCollapsed: values.terminalToolbarStartState === "collapsed",
    density: DENSITIES.includes(density) ? density : null,
    showStatus: bool(
      values.terminalToolbarShowStatus,
      DEFAULT_TOOLBAR_SETTINGS.showStatus
    ),
    fadeWhenIdle: bool(
      values.terminalToolbarFade,
      DEFAULT_TOOLBAR_SETTINGS.fadeWhenIdle
    )
  };
}
function isLeftAnchor(anchor) {
  return anchor.endsWith("-left");
}
function isTopAnchor(anchor) {
  return anchor.startsWith("top");
}
function toolbarAnchorClasses(anchor) {
  const vertical = isTopAnchor(anchor) ? "items-start pt-2" : "items-end pb-2";
  const horizontal = anchor.endsWith("-left") ? "justify-start pl-2" : anchor.endsWith("-right") ? "justify-end pr-2" : "justify-center";
  return `${vertical} ${horizontal}`;
}

// src/frontend/toolbar/TerminalToolbar.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  cn as cn2,
  ActionSlot,
  ComponentSlot,
  useIsMobile
} from "@termix/plugin-sdk/ui";
import {
  usePluginUiPreferences,
  useHostActions,
  useTabs,
  useTranslation,
  useSlotContributions
} from "@termix/plugin-sdk/frontend";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var TOOLBAR_SLOT_ID = TERMINAL_TOOLBAR_SLOT;
var DENSITY_OPTIONS = [
  { value: "icon" },
  { value: "labeled" },
  { value: "expanded" }
];
var DENSITIES2 = DENSITY_OPTIONS.map((option) => option.value);
var LEGACY_DENSITY_KEY = "termix-terminal-toolbar-density";
function asDensity(value) {
  return DENSITIES2.includes(value) ? value : "labeled";
}
var CONTROL = "inline-flex min-h-8 min-w-8 items-center justify-center gap-1.5 rounded-sm px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:translate-y-px active:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 data-[state=open]:bg-muted data-[state=open]:text-foreground";
var SEPARATOR = "mx-0.5 h-5 w-px shrink-0 bg-border";
var TerminalToolbar = ({
  host,
  terminalIdentity,
  isConnected,
  isTmuxAttached,
  onTmuxDetach,
  isImageUploading,
  onUploadImage,
  onPasteImage,
  isFocused,
  actionsEnabled = true,
  slotApi,
  onOpenFiles
}) => {
  const { t } = useTranslation();
  const allSlotContributions = useSlotContributions(TOOLBAR_SLOT_ID, { host });
  const statusContributions = useSlotContributions(
    TERMINAL_TOOLBAR_STATUS_SLOT,
    { host }
  );
  const slotContributions = useMemo2(
    () => allSlotContributions.filter(
      (contribution) => contribution.kind !== "component"
    ),
    [allSlotContributions]
  );
  const hostActions = useHostActions();
  const tabs = useTabs();
  const hostLinks = useMemo2(() => {
    const record = host;
    return hostActions.filter(
      (action) => action.kind === "open" && !action.items && (action.run || action.tabType) && action.when(record)
    );
  }, [hostActions, host]);
  const openHostLink = (action) => {
    const record = host;
    if (action.tabType === "files" && onOpenFiles) onOpenFiles();
    else if (action.run) action.run(record, tabs);
    else if (action.tabType) tabs.openTab(record, action.tabType);
  };
  const settings = useMemo2(() => readToolbarSettings(host), [host]);
  const { anchor } = settings;
  const rememberDensity = settings.density === null;
  const { values: uiPrefs, set: setUiPref } = usePluginUiPreferences();
  const preferredDensity = asDensity(uiPrefs.toolbarDensity);
  useEffect(() => {
    try {
      const legacy = window.localStorage.getItem(LEGACY_DENSITY_KEY);
      if (legacy === null) return;
      window.localStorage.removeItem(LEGACY_DENSITY_KEY);
      if (DENSITIES2.includes(legacy)) {
        setUiPref("toolbarDensity", legacy);
      }
    } catch {
    }
  }, []);
  const [density, setDensity] = useState(
    () => settings.density ?? preferredDensity
  );
  const [responsiveDensity, setResponsiveDensity] = useState(() => density);
  const [position, setPosition] = useState(
    () => readStoredToolbarPosition(anchor)
  );
  const positionRef = useRef(position);
  const [collapsed, setCollapsed] = useState(settings.startCollapsed);
  const [densityOpen, setDensityOpen] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [retryImageAction, setRetryImageAction] = useState(
    null
  );
  const fileInputRef = useRef(null);
  const hideToolbarRef = useRef(null);
  const pendingExpansionFocusRef = useRef(false);
  const pendingEdgeRef = useRef(null);
  const mountedRef = useRef(false);
  const imageGenerationRef = useRef(0);
  const hostRef = useRef(null);
  const toolbarRef = useRef(null);
  const measurementRef = useRef(null);
  const dragRef = useRef(null);
  const capturedPointerIdRef = useRef(null);
  const dragMovedRef = useRef(false);
  const densityId = useId();
  const [desktopViewportReady, setDesktopViewportReady] = useState();
  const hostIdentity = terminalIdentity ?? `${host.id ?? "unknown"}`;
  positionRef.current = position;
  const effectiveDensity = isFocused ? responsiveDensity : "icon";
  const showStats = settings.showStatus && effectiveDensity === "expanded" && statusContributions.length > 0;
  const isMobile = useIsMobile();
  useLayoutEffect(() => {
    setDesktopViewportReady(
      typeof window !== "undefined" && window.innerWidth >= 768
    );
  }, []);
  useEffect(() => {
    if (isMobile === false) setDesktopViewportReady(true);
  }, [isMobile]);
  useEffect(() => {
    if (settings.density) setDensity(settings.density);
  }, [settings.density]);
  useEffect(() => {
    const next = readStoredToolbarPosition(anchor);
    positionRef.current = next;
    setPosition(next);
  }, [anchor]);
  useEffect(() => {
    if (!rememberDensity) return;
    if (desktopViewportReady !== true || isMobile !== false) return;
    setDensity(preferredDensity);
  }, [preferredDensity, desktopViewportReady, isMobile, rememberDensity]);
  useEffect(() => {
    if (desktopViewportReady !== true || isMobile !== false) return;
    const measurement = measurementRef.current;
    const host2 = hostRef.current;
    if (!measurement || !host2) return;
    let frameId = null;
    let remeasurements = 0;
    const measure = () => {
      frameId = null;
      const available = host2.getBoundingClientRect().width;
      const required = measurement.getBoundingClientRect().width;
      if (available > 0 && required > 0) {
        setResponsiveDensity(
          (current2) => getResponsiveToolbarDensity(density, current2, available, required)
        );
        remeasurements = 0;
      } else if (remeasurements < 2) {
        remeasurements += 1;
        frameId = window.requestAnimationFrame(measure);
      }
    };
    const schedule = () => {
      if (frameId == null) frameId = window.requestAnimationFrame(measure);
    };
    schedule();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    observer?.observe(host2);
    observer?.observe(measurement);
    return () => {
      if (frameId != null) window.cancelAnimationFrame(frameId);
      observer?.disconnect();
    };
  }, [
    density,
    desktopViewportReady,
    isConnected,
    isMobile,
    isTmuxAttached,
    actionsEnabled,
    slotContributions,
    hostLinks,
    t
  ]);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      imageGenerationRef.current += 1;
      dragRef.current = null;
      capturedPointerIdRef.current = null;
    };
  }, []);
  useLayoutEffect(() => {
    if (desktopViewportReady !== true || isMobile !== false) return;
    const toolbar = toolbarRef.current;
    const host2 = hostRef.current;
    if (!toolbar || !host2 || dragRef.current) return;
    const hostRect = host2.getBoundingClientRect();
    const toolbarRect = toolbar.getBoundingClientRect();
    const extremeOffset = hostRect.width > 0 && hostRect.height > 0 && Math.max(
      Math.abs(positionRef.current.x),
      Math.abs(positionRef.current.y)
    ) > Math.max(hostRect.width, hostRect.height) * 4;
    if (extremeOffset) {
      positionRef.current = { x: 0, y: 0 };
      setPosition({ x: 0, y: 0 });
      persistToolbarPosition({ x: 0, y: 0 }, anchor);
      return;
    }
    if (toolbarRect.width > 0 && toolbarRect.height > 0) {
      const pendingEdge = pendingEdgeRef.current;
      pendingEdgeRef.current = null;
      const baseEdge = (isLeftAnchor(anchor) ? toolbarRect.left : toolbarRect.right) - positionRef.current.x;
      const next = clampToolbarPosition(
        {
          x: pendingEdge == null ? positionRef.current.x : pendingEdge - baseEdge,
          y: positionRef.current.y
        },
        toolbarRect,
        hostRect,
        positionRef.current
      );
      if (next.x !== positionRef.current.x || next.y !== positionRef.current.y) {
        positionRef.current = next;
        setPosition(next);
        persistToolbarPosition(next, anchor);
      }
    }
    if (!collapsed && pendingExpansionFocusRef.current) {
      pendingExpansionFocusRef.current = false;
      hideToolbarRef.current?.focus();
    }
  }, [
    anchor,
    collapsed,
    density,
    desktopViewportReady,
    effectiveDensity,
    isConnected,
    isMobile,
    isTmuxAttached,
    responsiveDensity
  ]);
  useEffect(() => {
    imageGenerationRef.current += 1;
    setImageError(null);
    setRetryImageAction(null);
  }, [isConnected, hostIdentity]);
  useEffect(() => {
    if (collapsed || !pendingExpansionFocusRef.current) return;
    pendingExpansionFocusRef.current = false;
    hideToolbarRef.current?.focus();
  }, [collapsed]);
  if (!isConnected || desktopViewportReady !== true || isMobile !== false)
    return null;
  const setAndStoreDensity = (next) => {
    setDensity(next);
    if (rememberDensity) setUiPref("toolbarDensity", next);
  };
  const reportImageResult = (action, retry) => {
    const generation = ++imageGenerationRef.current;
    let result;
    try {
      result = action();
    } catch (error) {
      result = Promise.reject(error);
    }
    void Promise.resolve(result).then(
      () => {
        if (!mountedRef.current || generation !== imageGenerationRef.current)
          return;
        setImageError(null);
        setRetryImageAction(null);
      },
      (error) => {
        if (!mountedRef.current || generation !== imageGenerationRef.current)
          return;
        setImageError(
          error instanceof Error ? error.message : t("terminalToolbar.imageActionFailed")
        );
        setRetryImageAction(() => retry);
      }
    );
  };
  const uploadFile = (file) => {
    setImageError(null);
    reportImageResult(
      () => onUploadImage(file),
      () => uploadFile(file)
    );
  };
  const pasteImage = () => {
    setImageError(null);
    reportImageResult(onPasteImage, pasteImage);
  };
  const chooseFile = () => fileInputRef.current?.click();
  const anchoredEdge = () => {
    const rect = toolbarRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return isLeftAnchor(anchor) ? rect.left : rect.right;
  };
  const handleGrabPointerDown = (event) => {
    if (event.button !== 0 || event.pointerType === "touch") return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    capturedPointerIdRef.current = event.pointerId;
    dragMovedRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      basePosition: positionRef.current
    };
  };
  const handleGrabPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    const toolbar = toolbarRef.current;
    const host2 = hostRef.current;
    if (!toolbar || !host2) return;
    const next = clampToolbarPosition(
      {
        x: drag.basePosition.x + deltaX,
        y: drag.basePosition.y + deltaY
      },
      toolbar.getBoundingClientRect(),
      host2.getBoundingClientRect(),
      positionRef.current
    );
    if (event.clientX !== drag.startX || event.clientY !== drag.startY) {
      dragMovedRef.current = true;
    }
    positionRef.current = next;
    setPosition(next);
  };
  const handleGrabPointerEnd = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    persistToolbarPosition(positionRef.current, anchor);
    dragRef.current = null;
    if (capturedPointerIdRef.current === event.pointerId) {
      capturedPointerIdRef.current = null;
      if (event.type !== "lostpointercapture") {
        try {
          event.currentTarget.releasePointerCapture?.(event.pointerId);
        } catch {
        }
      }
    }
  };
  const densityLabels = {
    icon: t("terminalToolbar.layoutIcon"),
    labeled: t("terminalToolbar.layoutLabeled"),
    expanded: t("terminalToolbar.layoutExpanded")
  };
  const densitySelect = /* @__PURE__ */ jsxs(
    Select,
    {
      value: density,
      open: densityOpen,
      onOpenChange: setDensityOpen,
      onValueChange: (value) => setAndStoreDensity(value),
      children: [
        /* @__PURE__ */ jsx(
          SelectTrigger,
          {
            id: densityId,
            size: "sm",
            "aria-label": t("terminalToolbar.layout"),
            title: t("terminalToolbar.layout"),
            className: cn2(
              CONTROL,
              "h-8 border-0 bg-transparent px-2 shadow-none dark:bg-transparent dark:hover:bg-muted"
            ),
            children: /* @__PURE__ */ jsx(LayoutGrid, { className: "size-4 shrink-0" })
          }
        ),
        /* @__PURE__ */ jsx(SelectContent, { children: DENSITY_OPTIONS.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option.value, children: densityLabels[option.value] }, option.value)) })
      ]
    }
  );
  const imageButtons = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: CONTROL,
        "aria-label": t("terminalToolbar.uploadImage"),
        title: t("terminalToolbar.uploadImage"),
        disabled: isImageUploading,
        onClick: chooseFile,
        children: [
          /* @__PURE__ */ jsx(ImagePlus, { className: "size-4 shrink-0" }),
          effectiveDensity !== "icon" && t("terminalToolbar.upload")
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: CONTROL,
        "aria-label": t("terminalToolbar.pasteImage"),
        title: t("terminalToolbar.pasteImage"),
        disabled: isImageUploading,
        onClick: pasteImage,
        children: [
          /* @__PURE__ */ jsx(ClipboardPaste, { className: "size-4 shrink-0" }),
          effectiveDensity !== "icon" && t("terminalToolbar.paste")
        ]
      }
    )
  ] });
  const expandButton = /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: CONTROL,
      "aria-label": t("terminalToolbar.showToolbar"),
      title: t("terminalToolbar.showToolbar"),
      onClick: () => {
        pendingEdgeRef.current = anchoredEdge();
        pendingExpansionFocusRef.current = true;
        setCollapsed(false);
      },
      children: [
        /* @__PURE__ */ jsx(Maximize2, { className: "size-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: t("terminalToolbar.showToolbar") })
      ]
    }
  );
  const grabButton = () => /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      className: cn2(CONTROL, "cursor-grab active:cursor-grabbing"),
      "aria-label": t("terminalToolbar.moveToolbar"),
      title: t("terminalToolbar.moveToolbarHint"),
      onPointerDown: handleGrabPointerDown,
      onPointerMove: handleGrabPointerMove,
      onPointerUp: handleGrabPointerEnd,
      onPointerCancel: handleGrabPointerEnd,
      onLostPointerCapture: handleGrabPointerEnd,
      children: /* @__PURE__ */ jsx(GripVertical, { className: "size-4" })
    }
  );
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: hostRef,
      "data-terminal-toolbar-host": true,
      "data-anchor": anchor,
      className: cn2(
        "pointer-events-none @container absolute inset-0 z-[110] flex",
        toolbarAnchorClasses(anchor)
      ),
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            className: "sr-only",
            tabIndex: -1,
            disabled: isImageUploading,
            "aria-hidden": "true",
            onChange: (event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) uploadFile(file);
            }
          }
        ),
        /* @__PURE__ */ jsx("span", { role: "status", "aria-live": "polite", className: "sr-only", children: isImageUploading ? t("terminalToolbar.uploadingImage") : "" }),
        imageError && /* @__PURE__ */ jsxs(
          "div",
          {
            role: "alert",
            className: "pointer-events-auto absolute bottom-full mb-2 flex min-h-11 max-w-sm items-center gap-2 rounded-sm border border-destructive bg-background p-2 text-xs text-destructive shadow-lg",
            children: [
              /* @__PURE__ */ jsx("span", { children: imageError }),
              retryImageAction && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: cn2(CONTROL, "text-foreground"),
                  title: t("terminalToolbar.retry"),
                  disabled: isImageUploading,
                  onClick: retryImageAction,
                  children: t("terminalToolbar.retry")
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: cn2(CONTROL, "px-2"),
                  "aria-label": t("terminalToolbar.dismissError"),
                  title: t("terminalToolbar.dismissError"),
                  onClick: () => {
                    setImageError(null);
                    setRetryImageAction(null);
                  },
                  children: /* @__PURE__ */ jsx(X, { className: "size-4" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: measurementRef,
            "aria-hidden": "true",
            className: "pointer-events-none invisible absolute left-0 top-0 flex whitespace-nowrap",
            children: [
              isTmuxAttached && /* @__PURE__ */ jsxs("span", { className: CONTROL, children: [
                /* @__PURE__ */ jsx(LogOut, { className: "size-4" }),
                density !== "icon" && t("terminalToolbar.detachTmux")
              ] }),
              /* @__PURE__ */ jsxs("span", { className: CONTROL, children: [
                /* @__PURE__ */ jsx(ImagePlus, { className: "size-4" }),
                density !== "icon" && t("terminalToolbar.upload")
              ] }),
              /* @__PURE__ */ jsxs("span", { className: CONTROL, children: [
                /* @__PURE__ */ jsx(ClipboardPaste, { className: "size-4" }),
                density !== "icon" && t("terminalToolbar.paste")
              ] }),
              actionsEnabled && slotContributions.map((contribution) => /* @__PURE__ */ jsxs("span", { className: CONTROL, children: [
                contribution.icon && /* @__PURE__ */ jsx(contribution.icon, { className: "size-4" }),
                density !== "icon" && t(contribution.titleKey)
              ] }, contribution.actionId)),
              actionsEnabled && hostLinks.map((action) => /* @__PURE__ */ jsxs("span", { className: CONTROL, children: [
                /* @__PURE__ */ jsx(action.icon, { className: "size-4" }),
                density !== "icon" && t(action.titleKey)
              ] }, action.id)),
              /* @__PURE__ */ jsxs("span", { className: cn2(CONTROL, "h-8 px-2"), children: [
                /* @__PURE__ */ jsx(LayoutGrid, { className: "size-4" }),
                /* @__PURE__ */ jsx(ChevronDown, { className: "size-4" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: CONTROL, children: /* @__PURE__ */ jsx(Minimize2, { className: "size-4" }) }),
              /* @__PURE__ */ jsx("span", { className: CONTROL, children: /* @__PURE__ */ jsx(GripVertical, { className: "size-4" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: toolbarRef,
            "data-terminal-toolbar-wide": true,
            className: cn2(
              "pointer-events-auto transition-opacity duration-300 hover:duration-0 focus-within:duration-0 hover:opacity-100 focus-within:opacity-100",
              collapsed || densityOpen || !settings.fadeWhenIdle ? "opacity-100" : "opacity-30"
            ),
            style: {
              transform: `translate(${position.x}px, ${position.y}px)`
            },
            children: collapsed ? /* @__PURE__ */ jsxs(
              "div",
              {
                "data-toolbar-collapsed": true,
                className: "relative flex rounded-sm border border-border bg-background/90 p-0.5 shadow-lg backdrop-blur-sm",
                children: [
                  expandButton,
                  grabButton()
                ]
              }
            ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col overflow-hidden rounded-sm border border-border bg-background/90 shadow-lg backdrop-blur-sm", children: [
              showStats && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center justify-center gap-x-1 border-b border-border px-1.5 py-0.5", children: /* @__PURE__ */ jsx(
                ComponentSlot,
                {
                  slotId: TERMINAL_TOOLBAR_STATUS_SLOT,
                  when: { host },
                  props: {
                    host,
                    isConnected,
                    active: isConnected && desktopViewportReady === true && isMobile === false
                  }
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: cn2("flex gap-0.5 p-0.5", "items-center"), children: [
                isTmuxAttached && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    className: CONTROL,
                    "aria-label": t("terminalToolbar.detachTmuxDescription"),
                    title: t("terminalToolbar.detachTmuxDescription"),
                    onClick: onTmuxDetach,
                    children: [
                      /* @__PURE__ */ jsx(LogOut, { className: "size-4" }),
                      effectiveDensity !== "icon" && t("terminalToolbar.detachTmux")
                    ]
                  }
                ),
                isTmuxAttached && /* @__PURE__ */ jsx("div", { className: SEPARATOR }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    role: "group",
                    "aria-label": t("terminalToolbar.image"),
                    className: "flex items-center gap-0.5",
                    children: imageButtons
                  }
                ),
                actionsEnabled && slotContributions.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("div", { className: SEPARATOR }),
                  /* @__PURE__ */ jsx(
                    ActionSlot,
                    {
                      slotId: TOOLBAR_SLOT_ID,
                      className: CONTROL,
                      enabled: actionsEnabled,
                      hideLabels: effectiveDensity === "icon",
                      when: { host },
                      context: () => [slotApi]
                    }
                  )
                ] }),
                actionsEnabled && hostLinks.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("div", { className: SEPARATOR }),
                  hostLinks.map((action) => /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      className: CONTROL,
                      "aria-label": t(action.titleKey),
                      title: t(action.titleKey),
                      onClick: () => openHostLink(action),
                      children: [
                        /* @__PURE__ */ jsx(action.icon, { className: "size-4" }),
                        effectiveDensity !== "icon" && t(action.titleKey)
                      ]
                    },
                    action.id
                  ))
                ] }),
                /* @__PURE__ */ jsx("div", { className: SEPARATOR }),
                densitySelect,
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    ref: hideToolbarRef,
                    type: "button",
                    className: CONTROL,
                    "aria-label": t("terminalToolbar.hideToolbar"),
                    title: t("terminalToolbar.hideToolbar"),
                    onClick: () => {
                      pendingEdgeRef.current = anchoredEdge();
                      setCollapsed(true);
                    },
                    children: [
                      /* @__PURE__ */ jsx(Minimize2, { className: "size-4" }),
                      /* @__PURE__ */ jsx("span", { className: "sr-only", children: t("terminalToolbar.hideToolbar") })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: SEPARATOR }),
                grabButton()
              ] })
            ] })
          }
        )
      ]
    }
  ) });
};

// src/frontend/BgTerminal.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var FALLBACK_COLORS = {
  background: "#0c0d0b",
  foreground: "#fafafa",
  cursor: "#fafafa",
  cursorAccent: "#0c0d0b"
};
var FALLBACK_FONT = '"SF Mono", Consolas, "Liberation Mono", monospace';
function quotePath(value) {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}
function uploadError(error) {
  const data = error?.response?.data;
  const message = data?.error || data?.message;
  if (message) return data?.code ? `${message} (${data.code})` : message;
  return error instanceof Error && error.message ? error.message : "";
}
function BgTerminal({
  sessionId,
  hostId,
  backendSessionId,
  tabInstanceId,
  ended,
  live,
  socket,
  isVisible,
  onSizeMismatch
}) {
  const { t } = useTranslation2();
  const { theme: appTheme } = useTheme();
  const containerRef = useRef2(null);
  const termRef = useRef2(null);
  const fitRef = useRef2(null);
  const ptySize = useRef2(null);
  const endedRef = useRef2(ended);
  endedRef.current = ended;
  const [look, setLook] = useState2(null);
  const host = useHost(hostId);
  const [uploading, setUploading] = useState2(false);
  const [dock, setDock] = useState2(null);
  const dockContributions = useSlotContributions2(TERMINAL_SIDE_PANEL_SLOT, {
    host
  });
  useEffect2(() => {
    let active = true;
    void invokeAction("terminal.resolveTheme", { appTheme, hostId }).then((resolved) => {
      if (active && resolved) setLook(resolved);
    }).catch(() => {
    });
    return () => {
      active = false;
    };
  }, [appTheme, hostId]);
  useEffect2(() => {
    const term = termRef.current;
    if (!term) return;
    term.options.theme = look ? { ...look.colors } : { ...FALLBACK_COLORS };
    term.options.fontFamily = look?.fontFamily ?? FALLBACK_FONT;
    term.options.fontSize = look?.fontSize ?? 14;
    try {
      fitRef.current?.fit();
    } catch {
    }
  }, [look]);
  useEffect2(() => {
    const container = containerRef.current;
    if (!container) return;
    const term = new Dl({
      cursorBlink: true,
      scrollback: 1e4,
      allowProposedApi: true,
      allowTransparency: true,
      fontFamily: look?.fontFamily ?? FALLBACK_FONT,
      fontSize: look?.fontSize ?? 14,
      theme: look ? { ...look.colors } : { ...FALLBACK_COLORS }
    });
    const fit = new o();
    term.loadAddon(fit);
    try {
      term.loadAddon(new Ke());
      term.unicode.activeVersion = "11";
    } catch {
    }
    term.open(container);
    termRef.current = term;
    fitRef.current = fit;
    try {
      fit.fit();
    } catch {
    }
    let awaitingSnapshot = true;
    const reportMismatch = () => {
      const pty = ptySize.current;
      onSizeMismatch(
        !endedRef.current && !!pty && (pty.cols !== term.cols || pty.rows !== term.rows)
      );
    };
    const claimSize = () => {
      if (endedRef.current) return;
      const pty = ptySize.current;
      if (pty && pty.cols === term.cols && pty.rows === term.rows) return;
      socket.noteSize(term.cols, term.rows);
      if (socket.send({ type: "resize", cols: term.cols, rows: term.rows })) {
        ptySize.current = { cols: term.cols, rows: term.rows };
        reportMismatch();
      }
    };
    const offMessage = socket.onMessage((message) => {
      switch (message.type) {
        case "snapshot":
          awaitingSnapshot = false;
          ptySize.current = {
            cols: Number(message.cols) || term.cols,
            rows: Number(message.rows) || term.rows
          };
          term.reset();
          if (typeof message.data === "string") term.write(message.data);
          reportMismatch();
          break;
        case "o":
          if (!awaitingSnapshot && typeof message.data === "string") {
            term.write(message.data);
          }
          break;
        case "size":
          ptySize.current = {
            cols: Number(message.cols) || term.cols,
            rows: Number(message.rows) || term.rows
          };
          reportMismatch();
          break;
        default:
          break;
      }
    });
    const offState = socket.onState((open) => {
      if (open) awaitingSnapshot = true;
    });
    const onData = term.onData((data) => {
      if (endedRef.current) return;
      claimSize();
      socket.send({ type: "input", data });
    });
    const onBinary = term.onBinary((data) => {
      if (endedRef.current) return;
      socket.send({ type: "input", data });
    });
    term.attachCustomKeyEventHandler((event) => {
      if (event.type !== "keydown") return true;
      const mod = event.ctrlKey || event.metaKey;
      const key = event.key.toLowerCase();
      if (mod && key === "c" && (event.shiftKey || term.hasSelection())) {
        if (term.hasSelection()) void copyToClipboard(term.getSelection());
        event.preventDefault();
        return false;
      }
      if (event.ctrlKey && event.shiftKey && key === "v") {
        event.preventDefault();
        void readFromClipboard().then((text) => {
          if (text) term.paste(text);
        }).catch(() => {
        });
        return false;
      }
      return true;
    });
    const onPointer = () => claimSize();
    container.addEventListener("mousedown", onPointer);
    container.addEventListener("touchstart", onPointer, { passive: true });
    const laidOut = container.offsetWidth > 0 && container.offsetHeight > 0;
    socket.attach(
      sessionId,
      laidOut && !endedRef.current ? term.cols : null,
      laidOut && !endedRef.current ? term.rows : null
    );
    let resizeTimer = null;
    const observer = new ResizeObserver(() => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!container.offsetWidth || !container.offsetHeight) return;
        const before = `${term.cols}x${term.rows}`;
        try {
          fit.fit();
        } catch {
          return;
        }
        if (`${term.cols}x${term.rows}` !== before) {
          socket.noteSize(term.cols, term.rows);
          claimSize();
        }
        reportMismatch();
      }, 80);
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
      container.removeEventListener("mousedown", onPointer);
      container.removeEventListener("touchstart", onPointer);
      offMessage();
      offState();
      onData.dispose();
      onBinary.dispose();
      socket.detach();
      termRef.current = null;
      fitRef.current = null;
      term.dispose();
    };
  }, [sessionId, socket]);
  useEffect2(() => {
    if (!isVisible) return;
    const handle = setTimeout(() => {
      try {
        fitRef.current?.fit();
      } catch {
      }
      termRef.current?.focus();
    }, 50);
    return () => clearTimeout(handle);
  }, [isVisible, sessionId]);
  const typeIn = useCallback(
    (data) => {
      if (!endedRef.current) socket.send({ type: "input", data });
    },
    [socket]
  );
  const runCommand = useCallback(
    (command) => {
      const trimmed = command.trim();
      if (!trimmed) return;
      typeIn(`${trimmed}\r`);
      setTimeout(() => termRef.current?.focus(), 50);
    },
    [typeIn]
  );
  const slotApi = useMemo3(
    () => ({
      host: host ?? void 0,
      getBufferText: () => {
        const term = termRef.current;
        if (!term) return "";
        const buffer = term.buffer.active;
        const lines = [];
        for (let i = 0; i < buffer.length; i++) {
          lines.push(buffer.getLine(i)?.translateToString(true) ?? "");
        }
        return lines.join("\n").trimEnd();
      },
      sessionId: () => backendSessionId,
      openSidePanel: (panelId, props) => setDock({ id: panelId, props: props ?? {} }),
      runCommand,
      getShareTarget: () => live ? {
        hostId,
        sessionId: backendSessionId,
        protocol: "ssh",
        ...tabInstanceId ? { tabInstanceId } : {},
        origin: "local"
      } : null
    }),
    [host, backendSessionId, runCommand, live, hostId, tabInstanceId]
  );
  const uploadImage = async (file, source) => {
    if (file.type && !file.type.startsWith("image/")) {
      toast.error(t("bgShell.imageChooseFile"));
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      form.append("instanceId", tabInstanceId ?? "");
      form.append("source", source);
      form.append("clientUploadTimestamp", (/* @__PURE__ */ new Date()).toISOString());
      const response = await app().api.post(
        `/sessions/${encodeURIComponent(sessionId)}/image`,
        form,
        { headers: { "Content-Type": void 0 } }
      );
      const { shellPath } = response.data;
      if (socket.send({ type: "input", data: quotePath(shellPath) })) {
        toast.success(t("bgShell.imageUploaded", { path: shellPath }));
      } else {
        toast.warning(t("bgShell.imageNotPasted", { path: shellPath }));
      }
    } catch (error) {
      toast.error(uploadError(error) || t("bgShell.imageUploadFailed"));
    } finally {
      setUploading(false);
    }
  };
  const pasteImage = async () => {
    if (!navigator.clipboard?.read) {
      toast.error(t("bgShell.imageClipboardUnavailable"));
      return;
    }
    try {
      for (const item of await navigator.clipboard.read()) {
        const type = item.types.find((candidate) => candidate.startsWith("image/"));
        if (!type) continue;
        const blob = await item.getType(type);
        await uploadImage(new File([blob], "clipboard-image.png", { type }), "clipboard");
        return;
      }
      toast.error(t("bgShell.imageClipboardEmpty"));
    } catch (error) {
      toast.error(uploadError(error) || t("bgShell.imageClipboardUnavailable"));
    }
  };
  const openFiles = () => {
    if (!host) return;
    const reqId = Math.random().toString(36).slice(2);
    let settled = false;
    const finish = (path) => {
      if (settled) return;
      settled = true;
      off();
      clearTimeout(timer);
      void invokeAction("files.openHost", host, path).catch(() => {
      });
    };
    const off = socket.onMessage((message) => {
      if (message.type === "cwd" && message.reqId === reqId) {
        finish(typeof message.path === "string" ? message.path : "/");
      }
    });
    const timer = setTimeout(() => finish("/"), 1e4);
    if (!socket.send({ type: "cwd", reqId })) finish("/");
  };
  const DockPanel = dock ? dockContributions.find((item) => item.actionId === dock.id)?.component : void 0;
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: "relative h-full w-full overflow-hidden p-1",
      style: {
        backgroundColor: look?.colors.background ?? FALLBACK_COLORS.background
      },
      "aria-label": t("bgShell.title"),
      children: [
        /* @__PURE__ */ jsx2("div", { ref: containerRef, className: "h-full w-full" }),
        host && /* @__PURE__ */ jsx2(
          TerminalToolbar,
          {
            host,
            terminalIdentity: sessionId,
            isConnected: live && !ended,
            isTmuxAttached: false,
            onTmuxDetach: () => {
            },
            isImageUploading: uploading,
            onUploadImage: (file) => uploadImage(file, "file"),
            onPasteImage: () => pasteImage(),
            isFocused: isVisible,
            slotApi,
            onOpenFiles: openFiles
          }
        ),
        dock && DockPanel && /* @__PURE__ */ jsx2(
          DockPanel,
          {
            host: host ?? void 0,
            hostId,
            hostLabel: host ? `${host.username ?? ""}@${host.name || host.ip}` : "",
            panelProps: dock.props,
            onClose: () => {
              setDock(null);
              setTimeout(() => termRef.current?.focus(), 50);
            },
            onRunInTerminal: runCommand
          }
        )
      ]
    }
  );
}

// src/frontend/socket.ts
var RECONNECT_DELAYS_MS = [500, 1e3, 2e3, 4e3, 8e3, 1e4];
var PING_MS = 25e3;
var ViewSocket = class {
  ws = null;
  listeners = /* @__PURE__ */ new Set();
  stateListeners = /* @__PURE__ */ new Set();
  attempt = 0;
  reconnectTimer = null;
  pingTimer = null;
  closed = false;
  connecting = false;
  open = false;
  /** Re-sent after every reconnect. */
  attachment = null;
  constructor() {
    void this.connect();
  }
  async connect() {
    if (this.closed || this.connecting || this.ws) return;
    this.connecting = true;
    let target = null;
    try {
      target = await app().wsUrl("/view");
    } catch {
      target = null;
    }
    this.connecting = false;
    if (this.closed) return;
    if (!target) {
      this.scheduleReconnect();
      return;
    }
    let ws2;
    try {
      ws2 = new WebSocket(target.url, target.protocols);
    } catch {
      this.scheduleReconnect();
      return;
    }
    this.ws = ws2;
    ws2.onopen = () => {
      if (this.ws !== ws2) return;
      this.attempt = 0;
      this.setOpen(true);
      this.pingTimer = setInterval(() => this.send({ type: "ping" }), PING_MS);
      if (this.attachment) this.send({ type: "attach", ...this.attachment });
    };
    ws2.onmessage = (event) => {
      if (this.ws !== ws2) return;
      let message;
      try {
        message = JSON.parse(String(event.data));
      } catch {
        return;
      }
      for (const listener of [...this.listeners]) listener(message);
    };
    ws2.onclose = () => {
      if (this.ws !== ws2) return;
      this.ws = null;
      if (this.pingTimer) clearInterval(this.pingTimer);
      this.pingTimer = null;
      this.setOpen(false);
      this.scheduleReconnect();
    };
    ws2.onerror = () => {
    };
  }
  scheduleReconnect() {
    if (this.closed || this.reconnectTimer) return;
    const delay = RECONNECT_DELAYS_MS[Math.min(this.attempt, RECONNECT_DELAYS_MS.length - 1)];
    this.attempt++;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      void this.connect();
    }, delay);
  }
  /** Reconnect now, e.g. when the page becomes visible again. */
  wake() {
    if (this.closed || this.ws || this.connecting) return;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.attempt = 0;
    void this.connect();
  }
  setOpen(open) {
    this.open = open;
    for (const listener of [...this.stateListeners]) listener(open);
  }
  send(message) {
    const ws2 = this.ws;
    if (!ws2 || ws2.readyState !== WebSocket.OPEN) return false;
    try {
      ws2.send(JSON.stringify(message));
      return true;
    } catch {
      return false;
    }
  }
  attach(id, cols, rows) {
    this.attachment = { id, cols, rows };
    this.send({ type: "attach", id, cols, rows });
  }
  /** Keeps the size a reconnect re-attaches with current. */
  noteSize(cols, rows) {
    if (this.attachment) this.attachment = { ...this.attachment, cols, rows };
  }
  detach() {
    this.attachment = null;
    this.send({ type: "detach" });
  }
  onMessage(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  onState(listener) {
    this.stateListeners.add(listener);
    return () => this.stateListeners.delete(listener);
  }
  close() {
    this.closed = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.pingTimer) clearInterval(this.pingTimer);
    const ws2 = this.ws;
    this.ws = null;
    if (ws2) {
      ws2.onclose = null;
      ws2.close();
    }
    this.listeners.clear();
    this.stateListeners.clear();
  }
};

// src/frontend/BgShellTab.tsx
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function ago(t, at3) {
  if (!at3) return "";
  const minutes = Math.floor((Date.now() - at3) / 6e4);
  if (minutes < 1) return t("bgShell.justNow");
  if (minutes < 60) return t("bgShell.minutesAgo", { count: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return t("bgShell.hoursAgo", { count: hours });
  return t("bgShell.daysAgo", { count: Math.floor(hours / 24) });
}
var STATUS_KEY = {
  attaching: "bgShell.statusAttaching",
  live: "bgShell.statusLive",
  away: "bgShell.statusAway",
  reconnecting: "bgShell.statusReconnecting",
  "needs-auth": "bgShell.statusNeedsAuth",
  ended: "bgShell.statusEnded"
};
function statusDot(status) {
  switch (status) {
    case "live":
      return "bg-accent-brand";
    case "ended":
      return "bg-muted-foreground/40";
    case "away":
      return "bg-muted-foreground";
    default:
      return "bg-accent-brand/50 animate-pulse";
  }
}
function useNow() {
  const [now, setNow] = useState3(() => Date.now());
  useEffect3(() => {
    const handle = setInterval(() => setNow(Date.now()), 3e4);
    return () => clearInterval(handle);
  }, []);
  return now;
}
function BgShellTab({ isVisible }) {
  const { t } = useTranslation3();
  const isMobile = useIsMobile2();
  const panelShown = usePanelShown();
  useNow();
  const socket = useMemo4(() => new ViewSocket(), []);
  useEffect3(() => () => socket.close(), [socket]);
  const [sessions, setSessions] = useState3(null);
  const [connected, setConnected] = useState3(socket.open);
  const [initialOpen] = useState3(() => takePendingOpen());
  const [selectedId, setSelectedId] = useState3(
    () => initialOpen ?? readSelected()
  );
  const [mobileShowsTerminal, setMobileShowsTerminal] = useState3(!!initialOpen);
  const [sizeMismatch, setSizeMismatch] = useState3(false);
  const [renaming, setRenaming] = useState3(null);
  const [renameValue, setRenameValue] = useState3("");
  const [terminating, setTerminating] = useState3(null);
  useEffect3(() => {
    const offState = socket.onState(setConnected);
    const offMessage = socket.onMessage((message) => {
      if (message.type === "sessions" && Array.isArray(message.sessions)) {
        setSessions(message.sessions);
      }
    });
    return () => {
      offState();
      offMessage();
    };
  }, [socket]);
  useEffect3(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") socket.wake();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onVisible);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onVisible);
    };
  }, [socket]);
  useEffect3(
    () => onSelectRequest((id) => {
      takePendingOpen();
      setSelectedId(id);
      setMobileShowsTerminal(true);
    }),
    []
  );
  useEffect3(() => {
    if (!sessions) return;
    if (selectedId && sessions.some((s15) => s15.id === selectedId)) return;
    const next = sessions.find((s15) => s15.status !== "ended") ?? sessions[0] ?? null;
    setSelectedId(next?.id ?? null);
  }, [sessions, selectedId]);
  useEffect3(() => {
    if (selectedId) writeSelected(selectedId);
    setShownSession(selectedId);
  }, [selectedId]);
  useEffect3(() => () => setShownSession(null), []);
  const selected = sessions?.find((s15) => s15.id === selectedId) ?? null;
  const running = sessions?.filter((s15) => s15.status !== "ended").length ?? 0;
  const select = useCallback2((id) => {
    setSelectedId(id);
    setMobileShowsTerminal(true);
  }, []);
  const submitRename = async () => {
    if (!renaming || !renameValue.trim()) return;
    try {
      await app().api.patch(`/sessions/${encodeURIComponent(renaming.id)}`, {
        label: renameValue.trim()
      });
      setRenaming(null);
    } catch (error) {
      toast2.error(errorMessage(error));
    }
  };
  const confirmTerminate = async () => {
    const target = terminating;
    setTerminating(null);
    if (!target) return;
    try {
      await app().api.post(`/sessions/${encodeURIComponent(target.id)}/terminate`);
      toast2.success(t("bgShell.terminated", { label: target.label }));
    } catch (error) {
      toast2.error(errorMessage(error));
    }
  };
  const dismiss = async (target) => {
    try {
      await app().api.delete(`/sessions/${encodeURIComponent(target.id)}`);
      toast2.success(t("bgShell.dismissed", { label: target.label }));
    } catch (error) {
      toast2.error(errorMessage(error));
    }
  };
  const showList = isMobile ? !mobileShowsTerminal || !selected : !panelShown;
  const showTerminal = !isMobile || mobileShowsTerminal && !!selected;
  const list = /* @__PURE__ */ jsxs3(
    "div",
    {
      className: `relative flex shrink-0 flex-col border-border bg-card ${isMobile ? "w-full flex-1" : "w-72 border-r"}`,
      children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 border-b border-border px-3 py-2", children: [
          /* @__PURE__ */ jsx3(SquareChevronRight, { className: "size-4" }),
          /* @__PURE__ */ jsx3("span", { className: "text-sm font-semibold", children: t("bgShell.title") }),
          /* @__PURE__ */ jsx3("span", { className: "ml-auto text-xs text-muted-foreground", children: t("bgShell.count", { count: running }) })
        ] }),
        !connected && /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 border-b border-border px-3 py-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx3(WifiOff, { className: "size-3.5 shrink-0" }),
          /* @__PURE__ */ jsx3("span", { className: "truncate", children: t("bgShell.connectionLost") })
        ] }),
        /* @__PURE__ */ jsx3("div", { className: "min-h-0 flex-1 overflow-y-auto py-1", children: sessions?.map((session) => {
          const active = session.id === selectedId;
          const ended = session.status === "ended";
          return /* @__PURE__ */ jsxs3(
            "button",
            {
              type: "button",
              onClick: () => select(session.id),
              className: `group flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted/40 ${active ? "bg-accent-brand/10" : ""}`,
              children: [
                /* @__PURE__ */ jsx3(
                  "span",
                  {
                    className: `size-2 shrink-0 rounded-full ${statusDot(session.status)}`,
                    "aria-hidden": true
                  }
                ),
                /* @__PURE__ */ jsxs3("span", { className: "flex min-w-0 flex-1 flex-col", children: [
                  /* @__PURE__ */ jsx3(
                    "span",
                    {
                      className: `truncate text-sm font-medium ${ended ? "text-muted-foreground" : ""}`,
                      children: session.label
                    }
                  ),
                  /* @__PURE__ */ jsxs3("span", { className: "truncate text-xs text-muted-foreground", children: [
                    session.hostName,
                    " \xB7",
                    " ",
                    ended ? t("bgShell.endedAt", { time: ago(t, session.endedAt) }) : t("bgShell.movedAt", { time: ago(t, session.movedAt) })
                  ] })
                ] }),
                session.viewers > 0 && !ended && /* @__PURE__ */ jsxs3(
                  "span",
                  {
                    className: "flex shrink-0 items-center gap-1 text-xs text-muted-foreground",
                    title: t("bgShell.viewerCount", { count: session.viewers }),
                    children: [
                      /* @__PURE__ */ jsx3(Monitor, { className: "size-3" }),
                      session.viewers
                    ]
                  }
                )
              ]
            },
            session.id
          );
        }) })
      ]
    }
  );
  const viewer = selected ? /* @__PURE__ */ jsxs3("div", { className: "flex min-h-0 min-w-0 flex-1 flex-col", children: [
    /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 border-b border-border bg-card px-3 py-1.5 text-xs text-muted-foreground", children: [
      isMobile && /* @__PURE__ */ jsx3(
        "button",
        {
          type: "button",
          className: "-ml-1 mr-1 flex items-center gap-1 text-muted-foreground hover:text-foreground",
          onClick: () => setMobileShowsTerminal(false),
          children: /* @__PURE__ */ jsx3(ArrowLeft, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ jsx3(
        "span",
        {
          className: `size-2 shrink-0 rounded-full ${statusDot(selected.status)}`,
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsx3("span", { className: "truncate text-sm font-medium text-foreground", children: selected.label }),
      /* @__PURE__ */ jsx3("span", { className: "hidden truncate sm:inline", children: selected.hostName }),
      /* @__PURE__ */ jsxs3("span", { className: "shrink-0", children: [
        "\xB7 ",
        t(STATUS_KEY[selected.status])
      ] }),
      selected.status !== "ended" && /* @__PURE__ */ jsxs3("span", { className: "hidden shrink-0 sm:inline", children: [
        "\xB7 ",
        selected.cols,
        "\xD7",
        selected.rows
      ] }),
      /* @__PURE__ */ jsxs3("span", { className: "ml-auto flex shrink-0 items-center gap-2", children: [
        /* @__PURE__ */ jsx3(
          "button",
          {
            type: "button",
            className: "p-0.5 text-muted-foreground hover:text-foreground",
            title: t("bgShell.rename"),
            "aria-label": t("bgShell.rename"),
            onClick: () => {
              setRenameValue(selected.label);
              setRenaming(selected);
            },
            children: /* @__PURE__ */ jsx3(Pencil, { className: "size-3.5" })
          }
        ),
        selected.status === "ended" ? /* @__PURE__ */ jsx3(
          "button",
          {
            type: "button",
            className: "p-0.5 text-muted-foreground hover:text-destructive",
            title: t("bgShell.dismiss"),
            "aria-label": t("bgShell.dismiss"),
            onClick: () => void dismiss(selected),
            children: /* @__PURE__ */ jsx3(Trash, { className: "size-3.5" })
          }
        ) : /* @__PURE__ */ jsx3(
          "button",
          {
            type: "button",
            className: "p-0.5 text-muted-foreground hover:text-destructive",
            title: t("bgShell.terminate"),
            "aria-label": t("bgShell.terminate"),
            onClick: () => setTerminating(selected),
            children: /* @__PURE__ */ jsx3(Power, { className: "size-3.5" })
          }
        )
      ] })
    ] }),
    (selected.status === "ended" || selected.status === "away" || selected.status === "needs-auth" || sizeMismatch && selected.status === "live") && /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 border-b border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx3(TriangleAlert, { className: "size-3.5 shrink-0" }),
      /* @__PURE__ */ jsx3("span", { className: "min-w-0", children: selected.status === "ended" ? `${t("bgShell.endedHint")}${selected.endReason ? ` ${selected.endReason}` : ""}` : selected.status === "away" ? t("bgShell.awayHint") : selected.status === "needs-auth" ? t("bgShell.needsAuthHint") : t("bgShell.resizeHint") })
    ] }),
    /* @__PURE__ */ jsx3("div", { className: "relative min-h-0 flex-1", children: /* @__PURE__ */ jsx3(
      BgTerminal,
      {
        sessionId: selected.id,
        hostId: selected.hostId,
        backendSessionId: selected.sessionId,
        tabInstanceId: selected.tabInstanceId,
        ended: selected.status === "ended",
        live: selected.status === "live",
        socket,
        isVisible: isVisible && showTerminal,
        onSizeMismatch: setSizeMismatch
      },
      selected.id
    ) })
  ] }) : null;
  return /* @__PURE__ */ jsxs3("div", { className: "flex h-full w-full bg-background text-foreground", children: [
    sessions && sessions.length === 0 ? /* @__PURE__ */ jsx3("div", { className: "flex flex-1 items-center justify-center p-6", children: /* @__PURE__ */ jsx3(
      EmptyState,
      {
        icon: SquareChevronRight,
        title: t("bgShell.emptyTitle"),
        hint: t("bgShell.emptyBody")
      }
    ) }) : /* @__PURE__ */ jsxs3(Fragment2, { children: [
      showList && list,
      showTerminal && (viewer ?? /* @__PURE__ */ jsx3("div", { className: "flex flex-1 items-center justify-center text-sm text-muted-foreground", children: sessions ? t("bgShell.selectSession") : null }))
    ] }),
    /* @__PURE__ */ jsx3(Dialog, { open: !!renaming, onOpenChange: (open) => !open && setRenaming(null), children: /* @__PURE__ */ jsxs3(DialogContent, { children: [
      /* @__PURE__ */ jsx3(DialogHeader, { children: /* @__PURE__ */ jsx3(DialogTitle, { children: t("bgShell.rename") }) }),
      /* @__PURE__ */ jsx3(
        Input,
        {
          autoFocus: true,
          value: renameValue,
          placeholder: t("bgShell.renamePlaceholder"),
          maxLength: 120,
          onChange: (event) => setRenameValue(event.target.value),
          onKeyDown: (event) => {
            if (event.key === "Enter") void submitRename();
          }
        }
      ),
      /* @__PURE__ */ jsxs3(DialogFooter, { children: [
        /* @__PURE__ */ jsx3(Button, { variant: "outline", onClick: () => setRenaming(null), children: t("bgShell.cancel") }),
        /* @__PURE__ */ jsx3(Button, { onClick: () => void submitRename(), disabled: !renameValue.trim(), children: t("bgShell.save") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx3(
      AlertDialog,
      {
        open: !!terminating,
        onOpenChange: (open) => !open && setTerminating(null),
        children: /* @__PURE__ */ jsxs3(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxs3(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsx3(AlertDialogTitle, { children: t("bgShell.terminateTitle", { label: terminating?.label ?? "" }) }),
            /* @__PURE__ */ jsx3(AlertDialogDescription, { children: t("bgShell.terminateBody") })
          ] }),
          /* @__PURE__ */ jsxs3(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsx3(AlertDialogCancel, { children: t("bgShell.cancel") }),
            /* @__PURE__ */ jsx3(
              AlertDialogAction,
              {
                className: "bg-destructive text-white hover:bg-destructive/90",
                onClick: () => void confirmTerminate(),
                children: t("bgShell.terminate")
              }
            )
          ] })
        ] })
      }
    )
  ] });
}

// src/frontend/BgShellPanel.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function BgShellPanel({ shell, active, placement }) {
  const { t } = useTranslation4();
  useNow();
  const rootRef = useRef3(null);
  const shownId2 = useShownSession();
  useEffect4(() => {
    const root = rootRef.current;
    if (!active || placement === "tab" || !root) return;
    let unmark = null;
    const update = () => {
      const visible = root.offsetWidth > 0 && root.offsetHeight > 0;
      if (visible && !unmark) unmark = notePanelShown();
      else if (!visible && unmark) {
        unmark();
        unmark = null;
      }
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    return () => {
      observer.disconnect();
      unmark?.();
    };
  }, [active, placement]);
  const [sessions, setSessions] = useState4(null);
  const [connected, setConnected] = useState4(true);
  const socket = useMemo5(() => active ? new ViewSocket() : null, [active]);
  useEffect4(() => {
    if (!socket) return;
    const offState = socket.onState(setConnected);
    const offMessage = socket.onMessage((message) => {
      if (message.type === "sessions" && Array.isArray(message.sessions)) {
        setSessions(message.sessions);
      }
    });
    return () => {
      offState();
      offMessage();
      socket.close();
    };
  }, [socket]);
  const open = (id) => {
    if (id) requestSelect(id);
    shell.openTab(null, TAB_TYPE);
  };
  const running = sessions?.filter((s15) => s15.status !== "ended").length ?? 0;
  return /* @__PURE__ */ jsxs4("div", { ref: rootRef, className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx4("span", { children: t("bgShell.count", { count: running }) }),
      !connected && /* @__PURE__ */ jsx4(WifiOff, { className: "size-3.5" }),
      /* @__PURE__ */ jsx4(Button2, { size: "xs", variant: "outline", className: "ml-auto", onClick: () => open(), children: t("bgShell.openFull") })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "min-h-0 flex-1 overflow-y-auto", children: [
      sessions && sessions.length === 0 && /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center gap-2 px-6 py-10 text-center", children: [
        /* @__PURE__ */ jsx4(SquareChevronRight, { className: "size-5 text-muted-foreground/50" }),
        /* @__PURE__ */ jsx4("span", { className: "text-sm font-semibold text-muted-foreground", children: t("bgShell.emptyTitle") }),
        /* @__PURE__ */ jsx4("span", { className: "text-xs text-muted-foreground", children: t("bgShell.panelHint") })
      ] }),
      sessions?.map((session) => {
        const ended = session.status === "ended";
        return /* @__PURE__ */ jsxs4(
          "button",
          {
            type: "button",
            onClick: () => open(session.id),
            className: `flex w-full items-center gap-2 border-b border-border px-3 py-2 text-left hover:bg-muted/40 ${session.id === shownId2 ? "bg-accent-brand/10" : ""}`,
            children: [
              /* @__PURE__ */ jsx4(
                "span",
                {
                  className: `size-2 shrink-0 rounded-full ${statusDot(session.status)}`,
                  "aria-hidden": true
                }
              ),
              /* @__PURE__ */ jsxs4("span", { className: "flex min-w-0 flex-1 flex-col", children: [
                /* @__PURE__ */ jsx4(
                  "span",
                  {
                    className: `truncate text-sm font-medium ${ended ? "text-muted-foreground" : ""}`,
                    children: session.label
                  }
                ),
                /* @__PURE__ */ jsxs4("span", { className: "truncate text-xs text-muted-foreground", children: [
                  session.hostName,
                  " \xB7",
                  " ",
                  ended ? t("bgShell.endedAt", { time: ago(t, session.endedAt) }) : t("bgShell.movedAt", { time: ago(t, session.movedAt) })
                ] })
              ] }),
              session.viewers > 0 && !ended && /* @__PURE__ */ jsxs4("span", { className: "flex shrink-0 items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsx4(Monitor, { className: "size-3" }),
                session.viewers
              ] })
            ]
          },
          session.id
        );
      })
    ] })
  ] });
}

// src/frontend/move.ts
import { toast as toast3 } from "sonner";
var SSH_TERMINAL_SOCKET = "/plugin-ws/ssh-terminal/";
function isDisconnectMessage(data) {
  if (typeof data !== "string" || !data.includes("disconnect")) return false;
  try {
    return JSON.parse(data).type === "disconnect";
  } catch {
    return false;
  }
}
function closeTabKeepingSession(tabId, handle) {
  const proto = WebSocket.prototype;
  const nativeSend = proto.send;
  const guardedSend = function(data) {
    if (typeof this.url === "string" && this.url.includes(SSH_TERMINAL_SOCKET) && isDisconnectMessage(data)) {
      return;
    }
    return nativeSend.call(this, data);
  };
  const originalDisconnect = handle?.disconnect;
  let confirmSetting = null;
  try {
    confirmSetting = localStorage.getItem("confirmTabClose");
  } catch {
  }
  proto.send = guardedSend;
  try {
    if (handle && typeof originalDisconnect === "function") {
      handle.disconnect = () => {
      };
    }
    if (confirmSetting === "true") localStorage.setItem("confirmTabClose", "false");
    app().tabs.closeTab(tabId);
  } finally {
    if (confirmSetting === "true") {
      try {
        localStorage.setItem("confirmTabClose", "true");
      } catch {
      }
    }
    if (handle && typeof originalDisconnect === "function") {
      handle.disconnect = originalDisconnect;
    }
    if (proto.send === guardedSend) proto.send = nativeSend;
  }
}
var moving = false;
function canMove(tab, handle) {
  return !!tab && tab.type === "terminal" && !!tab.host && !String(tab.host.id ?? "").startsWith("quick-connect-") && typeof handle?.isConnected === "function" && handle.isConnected();
}
async function moveToBgShell(handle, tab) {
  const { t, api } = app();
  if (!tab || moving) return;
  if (!canMove(tab, handle)) {
    toast3.error(t("bgShell.notConnected"));
    return;
  }
  moving = true;
  const label = tab.label || "Terminal";
  const toastId = toast3.loading(t("bgShell.moving", { label }));
  try {
    let moveId;
    try {
      const { data } = await api.post("/move/prepare", {
        tabInstanceId: tab.instanceId ?? tab.id,
        hostId: tab.host?.id,
        label
      });
      moveId = data.moveId;
    } catch (error) {
      toast3.error(t("bgShell.moveFailed", { error: errorMessage(error) }), {
        id: toastId
      });
      return;
    }
    closeTabKeepingSession(tab.id, handle ?? null);
    try {
      await api.post("/move/commit", { moveId });
      toast3.success(t("bgShell.moved", { label }), {
        id: toastId,
        description: t("bgShell.movedDescription"),
        action: {
          label: t("bgShell.open"),
          onClick: () => app().tabs.openSingletonTab(TAB_TYPE)
        }
      });
    } catch (error) {
      toast3.error(t("bgShell.moveFailed", { error: errorMessage(error) }), {
        id: toastId,
        description: t("bgShell.moveFailedDetached")
      });
    }
  } finally {
    moving = false;
  }
}

// src/frontend/index.tsx
var MOVE_ACTION = "bg-shell.moveTab";
function activate(app2) {
  setApp(app2);
  app2.onDispose(() => setApp(null));
  app2.registerTab(TAB_TYPE, BgShellTab, {
    icon: SquareChevronRight,
    titleKey: "nav.bgShell",
    singleton: true,
    hostless: true,
    persistent: true,
    ownBackground: true
  });
  app2.registerPanel(TAB_TYPE, BgShellPanel);
  app2.registerRailItem({
    id: TAB_TYPE,
    icon: SquareChevronRight,
    titleKey: "nav.bgShell",
    after: "ssh-tools",
    promotable: true,
    rightDockable: true,
    permission: "use"
  });
  app2.registerPaletteEntry({
    id: TAB_TYPE,
    titleKey: "palette.open",
    icon: SquareChevronRight,
    keywords: ["background", "bg", "shell", "detach", "keep", "running"],
    scope: "global",
    run: (shell) => shell.openSingletonTab(TAB_TYPE)
  });
  app2.registerAction(
    MOVE_ACTION,
    ((handle, tab) => moveToBgShell(
      handle,
      tab
    )),
    { permission: "use" }
  );
  app2.registerSlotContribution("tab.menu", {
    actionId: MOVE_ACTION,
    titleKey: "bgShell.moveToBg",
    icon: SquareChevronRight,
    kind: "button",
    when: ({ tab, handle }) => canMove(tab, handle)
  });
}
export {
  activate
};
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs:
lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs:
lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs:
lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs:
lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide-react/dist/esm/context.mjs:
lucide-react/dist/esm/Icon.mjs:
lucide-react/dist/esm/createLucideIcon.mjs:
lucide-react/dist/esm/icons/arrow-left.mjs:
lucide-react/dist/esm/icons/chevron-down.mjs:
lucide-react/dist/esm/icons/clipboard-paste.mjs:
lucide-react/dist/esm/icons/grip-vertical.mjs:
lucide-react/dist/esm/icons/image-plus.mjs:
lucide-react/dist/esm/icons/layout-grid.mjs:
lucide-react/dist/esm/icons/log-out.mjs:
lucide-react/dist/esm/icons/maximize-2.mjs:
lucide-react/dist/esm/icons/minimize-2.mjs:
lucide-react/dist/esm/icons/monitor.mjs:
lucide-react/dist/esm/icons/pencil.mjs:
lucide-react/dist/esm/icons/power.mjs:
lucide-react/dist/esm/icons/square-chevron-right.mjs:
lucide-react/dist/esm/icons/trash.mjs:
lucide-react/dist/esm/icons/triangle-alert.mjs:
lucide-react/dist/esm/icons/wifi-off.mjs:
lucide-react/dist/esm/icons/x.mjs:
lucide-react/dist/esm/lucide-react.mjs:
  (**
   * @license lucide-react v1.52.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@xterm/xterm/lib/xterm.mjs:
@xterm/addon-fit/lib/addon-fit.mjs:
@xterm/addon-unicode11/lib/addon-unicode11.mjs:
  (**
   * Copyright (c) 2014-2024 The xterm.js authors. All rights reserved.
   * @license MIT
   *
   * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
   * @license MIT
   *
   * Originally forked from (with the author's permission):
   *   Fabrice Bellard's javascript vt100 for jslinux:
   *   http://bellard.org/jslinux/
   *   Copyright (c) 2011 Fabrice Bellard
   *)
*/
//# sourceMappingURL=frontend.js.map
