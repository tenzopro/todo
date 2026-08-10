// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"lQTGG":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = "127.0.0.1";
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "8af382e242846cbd";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"slJIX":[function(require,module,exports,__globalThis) {
"use strict";
var _UI = _interopRequireDefault(require("2796e1c0d20c1ccf"));
var _Actions = require("42b805d4e7b99baa");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// display todos when DOM loads
window.document.addEventListener("DOMContentLoaded", function() {
    // initialize UI
    new _UI.default();
    //display data
    _UI.default.showTodos();
    // handle events
    (0, _Actions.todoSubmit)();
    (0, _Actions.toggleCompleted)();
    (0, _Actions.editTodo)();
    (0, _Actions.removeTodo)();
    (0, _Actions.checkAll)();
});

},{"2796e1c0d20c1ccf":"55kM7","42b805d4e7b99baa":"ATRTI"}],"55kM7":[function(require,module,exports,__globalThis) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _Todo = _interopRequireDefault(require("a2a6aaeeec4d18c8"));
var _Utils = require("418ce805c6cfceb4");
var _UIBase = _interopRequireDefault(require("ce044a10c8894861"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Class responsible for creating dynamic DOM elements:
 * todo list, alerts etc
 * ref: https://davidwalsh.name/documentfragment
 */ class UI extends _UIBase.default {
    constructor(todos){
        super();
        // init todos
        UI.todo = new _Todo.default();
        UI.todos = UI.todo.all().sort((a, b)=>a.title.localeCompare(b.title));
        if (UI.todos.length == 0) // checkall flag
        _UIBase.default.checkAllFlag = false;
        // get div with id 'app' from index.html
        UI.appHook = document.getElementById("app");
        UI.table = document.createElement("table");
        UI.table.setAttribute("id", "list-items");
        UI.iniFooter();
    }
    static showTodos() {
        UI.appHook.innerHTML = '';
        if (!UI.todos) {
            /**
       * If no todos then show theres no todos:
       */ // set notification variable
            const preText = '<span>You have no todos yet :)</span>';
            // 1. create notification element - p tag
            // 2. set its attributes
            // 3. append to the parent element
            // 4. terminate script
            const p = document.createElement("p");
            p.setAttribute('id', 'pretext');
            p.innerHTML = preText;
            UI.appHook.appendChild(p);
            return;
        }
        // iterate through each todo and 
        //delegate DOM manipulation to showTodo()
        UI.todos.map((todo)=>UI.showTodo(todo));
    }
    /**
   * method responsible for creating new DOM nodes and 
   * assigning todo values to list nodes.
   * @param {*} todo 
   */ static showTodo(todo) {
        // Normalize the incoming todo payload so render logic can safely use either
        // a single todo object or a model instance with an .all() collection.
        const todoData = todo && Array.isArray(todo.todos) ? todo.all().slice(-1)[0] : todo;
        if (todo && Array.isArray(todo.todos)) // Sync the UI cache from the model-backed collection before rendering.
        UI.todos = todo.all().slice().sort((a, b)=>a.title.localeCompare(b.title));
        // reset flag 
        UI.resetFlag(todoData);
        // update footer & its variables
        UI.iniFooter();
        // create html elems (tr, td, input, span, button)
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const input = document.createElement("input");
        const span = document.createElement("span");
        const btn = document.createElement("button");
        if (todoData.completed == true) {
            // check checkbox input if todo is completed
            input.setAttribute('checked', 'checked');
            // apply a 'true' class
            tr.setAttribute('class', todoData.completed);
        }
        input.setAttribute('type', 'checkbox');
        input.setAttribute('class', 'checkbox');
        input.setAttribute('value', todoData.id);
        span.setAttribute('class', 'todo-title');
        span.setAttribute('id', todoData.id);
        span.innerHTML = todoData.title;
        btn.setAttribute('id', todoData.id);
        btn.setAttribute('class', 'delete');
        btn.innerHTML = "X";
        //append children to tds
        td.prepend(input);
        td1.appendChild(span);
        td2.appendChild(btn);
        // append tds to tr
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        // append tr to table
        UI.table.appendChild(tr);
        // finally append table to main parent and refresh the footer count
        // so the visible count stays in sync with the list that was just rendered.
        UI.appHook.appendChild(UI.table);
        UI.iniFooter();
    }
    static toggleTodo(el) {
        // select only element(s) with 'checkbos' class attrs
        if (el.classList.contains('checkbox')) {
            // update completed property
            UI.todo.toggleCompleted(el.value);
            // Refresh the cached todo list after the toggle so the footer count
            // reflects the current completed-state snapshot.
            UI.todos = UI.todo.all();
            // update the UI
            el.parentElement.parentElement.classList.toggle("true");
            UI.iniFooter();
            // if one of todos is unchecked 
            if (el.checked == false) {
                // then uncheck 'check all' checkbox
                const tickAll = document.querySelector('#tick-untick-all');
                tickAll.checked = false;
            }
        }
    }
    static editTodo(el) {
        // if parent element has class of one of the 
        // elements we're looking for in its class list
        if (el.classList.contains('todo-title')) {
            // prompt user to supply new title text
            const newTitleText = prompt("Enter new todo title", el.innerHTML);
            // ensure input is not empty
            if ((0, _Utils.isEmpty)(newTitleText) == true) // terminate script if input is empty
            return;
            // otherwise update db 
            // then also update UI
            UI.todo.editTitle(el.id, newTitleText);
            // Refresh the in-memory list after an edit so the footer count remains accurate.
            UI.todos = UI.todo.all();
            UI.iniFooter();
            el.innerHTML = newTitleText;
        }
    }
    static removeTodo(el) {
        // if parent element has class of one of the 
        // elements we're looking for in its class list
        if (el.classList.contains('delete')) {
            // attempt to delete todo from DB
            UI.todo.delete(el.id);
            // update copy of in-memory todos to ensure we retain
            // consistency by removing the deleted todo from array
            // or returning all todos except for the just-deleted todo
            // then save rest back in todos array
            UI.todos = UI.todos.filter((todo)=>todo.id != el.id);
            // update the UI also
            el.parentElement.parentElement.remove();
            // ensure the stats on footer reflect this change
            UI.iniFooter();
        }
    }
    static checkAll(element, status) {
        const list = document.querySelector('#list-items');
        const tableRows = list ? list.childNodes : [];
        const checkBoxes = document.querySelectorAll('.checkbox');
        const isChecked = Boolean(status);
        // Apply the footer checkbox state to each visible todo row so the UI
        // and the underlying todo objects stay in sync when “check all” is used.
        Array.from(tableRows).forEach((row)=>{
            if (row && row.setAttribute) row.setAttribute('class', isChecked ? 'true' : 'false');
        });
        Array.from(checkBoxes).forEach((checkbox)=>{
            // Set the checkbox state explicitly so the row inputs reflect the footer toggle.
            checkbox.checked = isChecked;
            checkbox.setAttribute('checked', isChecked ? 'checked' : '');
        });
        // Update the cached todo objects so the model-backed state matches the UI selection.
        UI.todos = (UI.todos || []).map((todo)=>({
                ...todo,
                completed: isChecked
            }));
        UI.todo.update(UI.todos);
        _UIBase.default.checkAllFlag = isChecked;
        if (element) {
            element.checked = isChecked;
            element.classList.toggle('true', isChecked);
        }
    }
    static iniFooter() {
        // initialize variables
        const checkAllElem = document.querySelector('#tick-untick-all');
        const itemCount = document.querySelector('#item-count');
        const instruction = document.querySelector('#instruction');
        const instructionNote = '* double-click title to edit';
        const todoCount = UI.todos.length;
        const itemCountValue = itemCount ? itemCount.querySelector('span') : null;
        const instructionValue = instruction ? instruction.querySelector('small') : null;
        // set values if there are todos (item count & instruction note)
        // Update the footer count from the current UI todo cache so it stays in sync
        // with the rendered list immediately after add/remove/toggle/edit actions.
        if (itemCountValue) itemCountValue.innerHTML = UI.todos.length;
        if (todoCount > 0 && instructionValue) instructionValue.innerHTML = instructionNote;
        UI.resetCheckAll(checkAllElem, UI.checkAllFlag);
    }
    /**
   * displays errors when called
   * @param {*} errorArray 
   */ static renderErrors(errorArray = []) {
        // ensure errorsAray is set
        if (errorArray.length === 0) // stop script if array is empty. log message
        return console.log('error array empty');
        // hook to alerts section in index.html
        const alerts = document.getElementById('display-alerts');
        // create a ul tag
        let ul = document.createElement("ul");
        // loop thru errors
        errorArray.forEach((error)=>{
            // create li element each time
            let li = document.createElement("li");
            // add error text to li element
            li.innerHTML = error;
            // append it immediately to the ul tag
            ul.appendChild(li);
        });
        // append the ul tag to allerts div
        alerts.appendChild(ul);
        // clear msgs after 5 secs
        setTimeout(()=>{
            alerts.remove();
        }, 5000);
    }
}
exports.default = UI;

},{"a2a6aaeeec4d18c8":"cGI9j","418ce805c6cfceb4":"bqGr6","ce044a10c8894861":"3b3TY"}],"cGI9j":[function(require,module,exports,__globalThis) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _Model = _interopRequireDefault(require("92bfc8e3055a393c"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Extends model abstract
 * initializes instance properties
 */ class Todo extends _Model.default {
    constructor(title = null){
        super(title);
    }
}
exports.default = Todo;

},{"92bfc8e3055a393c":"dKoFK"}],"dKoFK":[function(require,module,exports,__globalThis) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _Store = _interopRequireDefault(require("e9e431e981153af5"));
var _Utils = require("8250d240c501d821");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Handles all CRUD tasks
 * Abstracts methods for child models 
 * thru inheritance (all models inherit from Model class)
 */ class Model {
    constructor(title){
        this.title = title;
        this.todos = _Store.default.todos();
    }
    // returns all todos
    all() {
        return this.todos;
    }
    get(id) {
        return this.todos.filter((item)=>item.id == id);
    }
    /**
   * invokes storeState method which engages 
   * persistence storage when saving NEW todo
   */ save() {
        this.storeState();
    }
    storeState() {
        this.todos.push({
            id: Math.floor(Math.random() * 100),
            title: this.title,
            completed: false
        });
        _Store.default.save(this.todos);
    }
    update(data) {
        _Store.default.save(data);
    }
    editTitle(id, newTitleText) {
        const todo = this.todos.filter((item)=>item.id == id);
        if (todo.length === 0) return;
        todo[0].title = newTitleText;
        this.updateStore(todo);
    }
    updateStore(_todo) {
        // update - merge data and save it to store
        const newStore = (0, _Utils.mergeObjs)(this.todos, _todo[0]);
        _Store.default.save(newStore);
    }
    toggleCompleted(id) {
        const todo = this.todos.filter((item)=>item.id == id);
        if (todo.length === 0) return;
        todo[0].completed = !todo[0].completed;
        this.updateStore(todo);
    }
    delete(_id) {
        const remainingTodos = this.todos.filter((todo)=>todo.id != _id);
        _Store.default.save(remainingTodos);
    }
}
exports.default = Model;

},{"e9e431e981153af5":"aJuEU","8250d240c501d821":"bqGr6"}],"aJuEU":[function(require,module,exports,__globalThis) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
const Store = function() {
    const getTodos = ()=>{
        const db = JSON.parse(localStorage.getItem("_todos"));
        if (anyData(db) == false) {
            dbInit();
            return JSON.parse(localStorage.getItem("_todos"));
        }
        return db;
    };
    const saveData = (data)=>{
        localStorage.setItem("_todos", JSON.stringify(data));
    };
    const dbInit = ()=>{
        const _id = Math.floor(Math.random() * 100);
        const data = [
            {
                id: _id,
                title: "You're up & running!",
                completed: false
            }
        ];
        saveData(data);
    };
    const anyData = (data)=>{
        return data == null || data == undefined ? false : true;
    };
    return {
        todos: getTodos,
        save: saveData
    };
}();
var _default = exports.default = Store;

},{}],"bqGr6":[function(require,module,exports,__globalThis) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sortData = exports.mergeObjs = exports.isLessThan = exports.isEmpty = void 0;
/**
 * check if field value is empty or not
 * @param {*} field 
 * returns @bool true/false
 */ const isEmpty = (field = null)=>{
    if (typeof field !== 'string') return true;
    return field == null || field.trim().length == 0 || field == '' ? true : false;
};
/**
 * checks if field has characters less or equal to 5:
 * a minimum required for any input field
 * @param {*} field 
 * returns @bool true/false
 */ exports.isEmpty = isEmpty;
const isLessThan = (field = '')=>{
    return field.length < 6 ? true : false;
};
exports.isLessThan = isLessThan;
const mergeObjs = (objArr, newObj)=>{
    let newArr = objArr.filter((obj)=>obj.id !== newObj.id);
    return [
        ...newArr,
        newObj
    ];
};
exports.mergeObjs = mergeObjs;
const sortData = (data)=>{
    return data.sort((a, b)=>a.title.localeCompare(b.title));
};
exports.sortData = sortData;

},{}],"3b3TY":[function(require,module,exports,__globalThis) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
class UIBase {
    constructor(){
        // checkall flag
        UIBase.checkAllFlag = true;
    }
    static sortData(data) {
        return data.sort((a, b)=>a.title.localeCompare(b.title));
    }
    static resetCheckAll(element, flag) {
        if (flag === true) element.setAttribute('checked', true);
        else element.removeAttribute('checked');
    }
    static resetFlag(todo) {
        if (todo.completed === false) UIBase.checkAllFlag = false;
    }
    static setAttrs(obj, status, checked) {
        if (typeof checked === 'boolean') {
            UIBase.unsetCheckbox(obj, status);
            UIBase.setTableRowAttrs(obj, status);
        } else {
            UIBase.setCheckbox(obj, status, checked);
            UIBase.setTableRowAttrs(obj, status);
        }
    }
    static setTableRowAttrs(obj, status) {
        for(let prop in obj)if (obj.hasOwnProperty(prop)) obj[prop].setAttribute('class', status);
    }
    static setCheckbox(obj, status, checked) {
        for(let prop in obj)if (obj.hasOwnProperty(prop)) obj[prop].setAttribute('checked', checked);
    }
    static unsetCheckbox(obj, status, checked) {
        for(let prop in obj)if (obj.hasOwnProperty(prop)) obj[prop].removeAttribute('checked');
    }
}
exports.default = UIBase;

},{}],"ATRTI":[function(require,module,exports,__globalThis) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toggleCompleted = exports.todoSubmit = exports.removeTodo = exports.editTodo = exports.checkAll = void 0;
var _Todo = _interopRequireDefault(require("6842d1eb47108a5e"));
var _UI = _interopRequireDefault(require("24b4229c2ac63c81"));
var _Validation = _interopRequireDefault(require("4bdaa7d310fb2cad"));
var _Errors = _interopRequireDefault(require("534c00775f59ec4f"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * handle button click
 * display errors if any
 * collect form input, and delegate validation
 *  delegate todo persistence
 */ const todoSubmit = ()=>{
    // query button tag
    // const btn = document.getElementById("btn");
    const _input = document.getElementById("new-todo");
    // add event to button tag
    _input.addEventListener("change", (e)=>{
        /** 
     * initialize variables 
     * **/ // set rules
        const rules = [
            {
                title: 'required|min'
            }
        ];
        // get input element
        // const _input = document.getElementById("new-todo");
        // obtain input name
        const name = _input.name;
        // obtain input value
        const newTodo = _input.value.trim();
        /** Initialize errors object **/ new _Errors.default();
        // validate input, passing rules and input value.
        if (_Validation.default.validate(rules, [
            {
                name: newTodo
            }
        ])) {
            const p = document.querySelector('#pretext');
            /**
       * If Validation passes then...
       * initialize Todo object and save new Todo
       * clear input UI
       */ const todo = new _Todo.default(newTodo);
            todo.save();
            // Keep the UI's in-memory todo list in sync with the newly saved item
            // so the footer count and rendered rows reflect the current state immediately.
            const newTodoItem = {
                id: Date.now(),
                title: newTodo,
                completed: false
            };
            _UI.default.todos = [
                ..._UI.default.todos || [],
                newTodoItem
            ].sort((a, b)=>a.title.localeCompare(b.title));
            _UI.default.todo = todo;
            _UI.default.todo.todos = _UI.default.todos;
            p && p.remove();
            _UI.default.showTodo(newTodoItem);
            _input.value = "";
        } else /**
       * Otherwise render errors on UI
       */ _UI.default.renderErrors(_Errors.default.get());
    });
};
exports.todoSubmit = todoSubmit;
const toggleCompleted = ()=>{
    const todoList = document.querySelector('#list-items');
    if (todoList) // add event to the node AND all its children (propagation)
    todoList.addEventListener('click', (e)=>{
        /**
       * delegate action to UI toggle action -
       * passing the clicked element
       */ _UI.default.toggleTodo(e.target);
    }, false);
};
exports.toggleCompleted = toggleCompleted;
const editTodo = ()=>{
    const todoList = document.querySelector('#list-items');
    if (todoList) todoList.addEventListener('dblclick', (e)=>{
        /**
       * delegate action to UI edit action -
       * passing the clicked element
       */ _UI.default.editTodo(e.target);
    }, false);
};
exports.editTodo = editTodo;
const removeTodo = ()=>{
    // selectlist item wrapper
    const todoList = document.querySelector('#list-items');
    if (todoList) todoList.addEventListener('click', (e)=>{
        _UI.default.removeTodo(e.target);
    }, false);
};
exports.removeTodo = removeTodo;
const checkAll = ()=>{
    const tickAll = document.querySelector('#tick-untick-all');
    if (tickAll) // Listen for the checkbox change event so the footer toggle updates
    // every todo row as soon as the user checks or unchecks it.
    tickAll.addEventListener('change', (e)=>{
        _UI.default.checkAll(tickAll, e.target.checked);
    });
};
exports.checkAll = checkAll;

},{"6842d1eb47108a5e":"cGI9j","24b4229c2ac63c81":"55kM7","4bdaa7d310fb2cad":"easDv","534c00775f59ec4f":"8Mj1Z"}],"easDv":[function(require,module,exports,__globalThis) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _Errors = _interopRequireDefault(require("7096e04bbd04d842"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * NOTE: class subject to extention as theres 
 * a lot of methods that could potentially be added
 * eg: email, password etc
 */ /**
 * Validation class validates any form input.
 * call validate class method and pass it rules & 
 * form data. Any errors are routed to Errors class within
 * its methods.
 */ class Validation {
    /**
   * cycles through inputs array and returns TRUE/FALSE
   * depending on whether there are errors or not
   * @param {*} rules 
   * @param {*} data 
   * returns @bool depending on whether form is valid on not
   */ static validate(rules, data) {
        // set valid to true unless something is wrong within data object
        let valid = true;
        // loop through rules first
        rules.forEach((rule, index)=>{
            // extract rules into callback array.
            let callbacks = rule.title.split('|');
            // loop thru array of callback rules 
            callbacks.forEach((callback)=>{
                /**
         * extract input data and set value variable
         * extract keys from data object and set field name
         * variable
         */ let value = data[index] ? data[index] : null;
                let fieldName = Object.keys(data[0])[0];
                // dynamically call this class methods and pass value and field name.
                if (Validation[callback](value, fieldName) === false) /**
           * if false ie there was a problem: no input value 
           * or value infringes some rule then set form validity to false.
           */ valid = false;
            });
        });
        // return whatever valid value is (true or false i.e form is good or not)
        return valid;
    }
    /**
   * Check if input has minimum character length
   * @param {*} value 
   * @param {*} fieldName 
   * Returns @bool true/false 
   */ static min(value, fieldName) {
        // initialize validity
        let valid = true;
        // check if input is less that a certain minimum
        if (Validation.hasLessThan(value.name)) {
            // if so set valid to false: input has less characters ...
            // than required
            valid = false;
            // set error message to errors class
            _Errors.default.set(`${fieldName} must be more than 5 characters.`);
        }
        // return validity
        return valid;
    }
    /**
   * Check input for missing value: input MUST contain value
   * @param {*} value 
   * @param {*} fieldName 
   * returns @bool true/false
   */ static required(value, fieldName) {
        // initialize validity
        let valid = true;
        // check if input has empty string
        if (Validation.isEmpty(value.name)) {
            // if so set validity to false: input is empty
            valid = false;
            // set error message to errors class
            _Errors.default.set(`${fieldName} is required`);
        }
        // return valid
        return valid;
    }
    /**
   * check if field value is empty or not
   * @param {*} field 
   * returns @bool true/false
   */ static isEmpty(value = '') {
        return value === "" || value.length === 0 ? true : false;
    }
    /**
   * checks if field has characters less or equal to 5:
   * a minimum required for any input field
   * @param {*} field 
   * returns @bool true/false
   */ static hasLessThan(value) {
        return value.length <= 5;
    }
}
exports.default = Validation;

},{"7096e04bbd04d842":"8Mj1Z"}],"8Mj1Z":[function(require,module,exports,__globalThis) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
/**
 * Error handling class
 * contains errors class property
 * and get & set class methods
 */ class Errors {
    constructor(){
        // initialize errors property to empty array
        Errors.errors = [];
    }
    // returns errors array
    static get() {
        return Errors.errors;
    }
    // sets values to errors property
    static set(errMsg = null) {
        Errors.errors.push(errMsg);
    }
}
exports.default = Errors;

},{}]},["lQTGG","slJIX"], "slJIX", "parcelRequiref536", {})

//# sourceMappingURL=todoapp.42846cbd.js.map
