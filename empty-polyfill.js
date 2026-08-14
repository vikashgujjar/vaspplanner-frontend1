// Intentionally empty. See next.config.mjs — this replaces Next.js's
// built-in polyfill-module/polyfill-nomodule, which the framework requires
// unconditionally (regardless of .browserslistrc) from its own compiled
// client entry (node_modules/next/dist/client/app-globals.js). Those
// polyfills (Array.prototype.at, Object.hasOwn, Array.flat/flatMap,
// Object.fromEntries, String.trimStart/trimEnd, Promise.prototype.finally,
// Symbol.prototype.description, URL.canParse) are all natively supported by
// every browser in our .browserslistrc target, and this app never calls
// URL.canParse() or reads Symbol.prototype.description, so there is nothing
// left for them to do — Lighthouse was flagging pure dead weight.
