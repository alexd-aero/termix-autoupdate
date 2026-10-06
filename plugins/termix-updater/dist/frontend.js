// src/frontend/index.tsx
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

// ../bg-shell/node_modules/lucide-react/dist/esm/createLucideIcon.mjs
import { forwardRef as forwardRef2, createElement as createElement3 } from "react";

// ../bg-shell/node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var toKebabCase = (string) => string?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

// ../bg-shell/node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
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

// ../bg-shell/node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
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

// ../bg-shell/node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

// ../bg-shell/node_modules/lucide-react/dist/esm/Icon.mjs
import { forwardRef, createElement as createElement2 } from "react";

// ../bg-shell/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// ../bg-shell/node_modules/lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs
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

// ../bg-shell/node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
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

// ../bg-shell/node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
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

// ../bg-shell/node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};

// ../bg-shell/node_modules/lucide-react/dist/esm/context.mjs
import { createContext, useContext, useMemo, createElement } from "react";
var LucideContext = createContext({});
var useLucideContext = () => useContext(LucideContext);

// ../bg-shell/node_modules/lucide-react/dist/esm/Icon.mjs
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

// ../bg-shell/node_modules/lucide-react/dist/esm/createLucideIcon.mjs
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

// ../bg-shell/node_modules/lucide-react/dist/esm/icons/cloud-download.mjs
var __iconData = {
  name: "cloud-download",
  size: 24,
  node: [
    ["path", { d: "M12 13v8l-4-4", key: "1f5nwf" }],
    ["path", { d: "m12 21 4-4", key: "1lfcce" }],
    [
      "path",
      { d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284", key: "ui1hmy" }
    ]
  ],
  aliases: ["download-cloud"]
};
__iconData.node;
var CloudDownload = createLucideIcon(__iconData);

// src/frontend/index.tsx
import { useTranslation } from "@termix/plugin-sdk/frontend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button
} from "@termix/plugin-sdk/ui";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var app = null;
var confirmListeners = /* @__PURE__ */ new Set();
async function fetchStatus() {
  try {
    return (await app.api.get("/status")).data;
  } catch {
    return null;
  }
}
async function startUpdate() {
  const { t } = app;
  try {
    await app.api.post("/update");
    toast.loading(t("updater.started"), { id: "termix-update", duration: 12e4 });
  } catch (error) {
    const message = error?.response?.data?.error ?? String(error);
    toast.error(t("updater.failed", { error: message }), { id: "termix-update" });
  }
}
function askToUpdate() {
  if (confirmListeners.size > 0) {
    for (const listener of confirmListeners) listener();
  } else if (window.confirm(app.t("updater.confirmBody"))) {
    void startUpdate();
  }
}
function ConfirmHost() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [version, setVersion] = useState("");
  useEffect(() => {
    const listener = () => {
      void fetchStatus().then((s) => setVersion(s?.latest?.version ?? ""));
      setOpen(true);
    };
    confirmListeners.add(listener);
    return () => {
      confirmListeners.delete(listener);
    };
  }, []);
  return /* @__PURE__ */ jsx(AlertDialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
    /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
      /* @__PURE__ */ jsx(AlertDialogTitle, { children: t("updater.confirmTitle", { version }) }),
      /* @__PURE__ */ jsx(AlertDialogDescription, { children: t("updater.confirmBody") })
    ] }),
    /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
      /* @__PURE__ */ jsx(AlertDialogCancel, { children: t("updater.cancel") }),
      /* @__PURE__ */ jsx(AlertDialogAction, { onClick: () => void startUpdate(), children: t("updater.updateNow") })
    ] })
  ] }) });
}
function UpdateCard(_props) {
  const { t } = useTranslation();
  const [status, setStatus] = useState(void 0);
  const refresh = useCallback(() => void fetchStatus().then(setStatus), []);
  useEffect(() => {
    refresh();
    const handle = setInterval(refresh, 5e3);
    return () => clearInterval(handle);
  }, [refresh]);
  const running = status?.job.state === "running";
  return /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col gap-2 p-3 text-sm", children: [
    status === null && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: t("updater.unavailable") }),
    status && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-x-3 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { children: t("updater.current", { version: status.current ?? "?" }) }),
        /* @__PURE__ */ jsx("span", { children: t("updater.latest", { version: status.latest?.version ?? "?" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "font-medium", children: status.updateAvailable ? t("updater.available", { version: status.latest?.version }) : t("updater.upToDate") }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { size: "sm", disabled: !status.updateAvailable || running, onClick: askToUpdate, children: [
          /* @__PURE__ */ jsx(CloudDownload, { className: "size-4" }),
          running ? t("updater.running") : t("updater.updateNow")
        ] }),
        status.latest?.url && /* @__PURE__ */ jsx("a", { className: "text-xs text-accent-brand hover:underline", href: status.latest.url, target: "_blank", rel: "noreferrer", children: t("updater.releaseNotes") })
      ] }),
      status.job.log.length > 0 && /* @__PURE__ */ jsx("pre", { className: "min-h-0 flex-1 overflow-auto whitespace-pre-wrap bg-muted/30 p-2 text-[11px] text-muted-foreground", children: status.job.log.slice(-8).join("\n") })
    ] })
  ] });
}
async function activate(termix) {
  app = termix;
  termix.onDispose(() => {
    app = null;
  });
  termix.registerAction("termix-updater.update", (() => askToUpdate()), {
    permission: "update"
  });
  termix.registerSlotContribution("shell.overlay", {
    actionId: "termix-updater.update",
    titleKey: "updater.title",
    kind: "component",
    component: ConfirmHost
  });
  termix.registerDashboardCard({
    id: "termix_update",
    titleKey: "updater.title",
    defaultHeight: 220,
    defaultPanel: "side",
    component: UpdateCard
  });
  termix.registerPaletteEntry({
    id: "termix-update",
    titleKey: "updater.palette",
    icon: CloudDownload,
    keywords: ["update", "upgrade", "version", "termix"],
    scope: "global",
    run: () => askToUpdate()
  });
  if (termix.guest || !await termix.hasPermission("update")) return;
  const status = await fetchStatus();
  if (status?.updateAvailable && status.job.state !== "running") {
    toast(termix.t("updater.available", { version: status.latest?.version }), {
      id: "termix-update-available",
      duration: 2e4,
      action: { label: termix.t("updater.updateNow"), onClick: askToUpdate }
    });
  }
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
lucide-react/dist/esm/icons/cloud-download.mjs:
lucide-react/dist/esm/lucide-react.mjs:
  (**
   * @license lucide-react v1.52.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=frontend.js.map
