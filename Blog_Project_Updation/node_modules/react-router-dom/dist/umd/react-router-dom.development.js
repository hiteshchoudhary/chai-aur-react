/**
 * React Router DOM v6.16.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-router'), require('@remix-run/router')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-router', '@remix-run/router'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactRouterDOM = {}, global.React, global.ReactRouter, global.RemixRouter));
})(this, (function (exports, React, reactRouter, router) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }

  const defaultMethod = "get";
  const defaultEncType = "application/x-www-form-urlencoded";
  function isHtmlElement(object) {
    return object != null && typeof object.tagName === "string";
  }
  function isButtonElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
  }
  function isFormElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
  }
  function isInputElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
  }
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  function shouldProcessLinkClick(event, target) {
    return event.button === 0 && (
    // Ignore everything but left clicks
    !target || target === "_self") &&
    // Let browser handle "target=_blank" etc.
    !isModifiedEvent(event) // Ignore clicks with modifier keys
    ;
  }

  /**
   * Creates a URLSearchParams object using the given initializer.
   *
   * This is identical to `new URLSearchParams(init)` except it also
   * supports arrays as values in the object form of the initializer
   * instead of just strings. This is convenient when you need multiple
   * values for a given key, but don't want to use an array initializer.
   *
   * For example, instead of:
   *
   *   let searchParams = new URLSearchParams([
   *     ['sort', 'name'],
   *     ['sort', 'price']
   *   ]);
   *
   * you can do:
   *
   *   let searchParams = createSearchParams({
   *     sort: ['name', 'price']
   *   });
   */
  function createSearchParams(init) {
    if (init === void 0) {
      init = "";
    }
    return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
      let value = init[key];
      return memo.concat(Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]);
    }, []));
  }
  function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
    let searchParams = createSearchParams(locationSearch);
    if (defaultSearchParams) {
      // Use `defaultSearchParams.forEach(...)` here instead of iterating of
      // `defaultSearchParams.keys()` to work-around a bug in Firefox related to
      // web extensions. Relevant Bugzilla tickets:
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1414602
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1023984
      defaultSearchParams.forEach((_, key) => {
        if (!searchParams.has(key)) {
          defaultSearchParams.getAll(key).forEach(value => {
            searchParams.append(key, value);
          });
        }
      });
    }
    return searchParams;
  }

  // Thanks https://github.com/sindresorhus/type-fest!

  // One-time check for submitter support
  let _formDataSupportsSubmitter = null;
  function isFormDataSubmitterSupported() {
    if (_formDataSupportsSubmitter === null) {
      try {
        new FormData(document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0);
        _formDataSupportsSubmitter = false;
      } catch (e) {
        _formDataSupportsSubmitter = true;
      }
    }
    return _formDataSupportsSubmitter;
  }
  const supportedFormEncTypes = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
  function getFormEncType(encType) {
    if (encType != null && !supportedFormEncTypes.has(encType)) {
      router.UNSAFE_warning(false, "\"" + encType + "\" is not a valid `encType` for `<Form>`/`<fetcher.Form>` " + ("and will default to \"" + defaultEncType + "\"")) ;
      return null;
    }
    return encType;
  }
  function getFormSubmissionInfo(target, basename) {
    let method;
    let action;
    let encType;
    let formData;
    let body;
    if (isFormElement(target)) {
      // When grabbing the action from the element, it will have had the basename
      // prefixed to ensure non-JS scenarios work, so strip it since we'll
      // re-prefix in the router
      let attr = target.getAttribute("action");
      action = attr ? router.stripBasename(attr, basename) : null;
      method = target.getAttribute("method") || defaultMethod;
      encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
      formData = new FormData(target);
    } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
      let form = target.form;
      if (form == null) {
        throw new Error("Cannot submit a <button> or <input type=\"submit\"> without a <form>");
      }

      // <button>/<input type="submit"> may override attributes of <form>

      // When grabbing the action from the element, it will have had the basename
      // prefixed to ensure non-JS scenarios work, so strip it since we'll
      // re-prefix in the router
      let attr = target.getAttribute("formaction") || form.getAttribute("action");
      action = attr ? router.stripBasename(attr, basename) : null;
      method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
      encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;

      // Build a FormData object populated from a form and submitter
      formData = new FormData(form, target);

      // If this browser doesn't support the `FormData(el, submitter)` format,
      // then tack on the submitter value at the end.  This is a lightweight
      // solution that is not 100% spec compliant.  For complete support in older
      // browsers, consider using the `formdata-submitter-polyfill` package
      if (!isFormDataSubmitterSupported()) {
        let {
          name,
          type,
          value
        } = target;
        if (type === "image") {
          let prefix = name ? name + "." : "";
          formData.append(prefix + "x", "0");
          formData.append(prefix + "y", "0");
        } else if (name) {
          formData.append(name, value);
        }
      }
    } else if (isHtmlElement(target)) {
      throw new Error("Cannot submit element that is not <form>, <button>, or " + "<input type=\"submit|image\">");
    } else {
      method = defaultMethod;
      action = null;
      encType = defaultEncType;
      body = target;
    }

    // Send body for <Form encType="text/plain" so we encode it into text
    if (formData && encType === "text/plain") {
      body = formData;
      formData = undefined;
    }
    return {
      action,
      method: method.toLowerCase(),
      encType,
      formData,
      body
    };
  }

  const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"],
    _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"],
    _excluded3 = ["reloadDocument", "replace", "state", "method", "action", "onSubmit", "submit", "relative", "preventScrollReset"];
  //#endregion

  ////////////////////////////////////////////////////////////////////////////////
  //#region Routers
  ////////////////////////////////////////////////////////////////////////////////
  function createBrowserRouter(routes, opts) {
    return router.createRouter({
      basename: opts == null ? void 0 : opts.basename,
      future: _extends({}, opts == null ? void 0 : opts.future, {
        v7_prependBasename: true
      }),
      history: router.createBrowserHistory({
        window: opts == null ? void 0 : opts.window
      }),
      hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
      routes,
      mapRouteProperties: reactRouter.UNSAFE_mapRouteProperties
    }).initialize();
  }
  function createHashRouter(routes, opts) {
    return router.createRouter({
      basename: opts == null ? void 0 : opts.basename,
      future: _extends({}, opts == null ? void 0 : opts.future, {
        v7_prependBasename: true
      }),
      history: router.createHashHistory({
        window: opts == null ? void 0 : opts.window
      }),
      hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
      routes,
      mapRouteProperties: reactRouter.UNSAFE_mapRouteProperties
    }).initialize();
  }
  function parseHydrationData() {
    var _window;
    let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
    if (state && state.errors) {
      state = _extends({}, state, {
        errors: deserializeErrors(state.errors)
      });
    }
    return state;
  }
  function deserializeErrors(errors) {
    if (!errors) return null;
    let entries = Object.entries(errors);
    let serialized = {};
    for (let [key, val] of entries) {
      // Hey you!  If you change this, please change the corresponding logic in
      // serializeErrors in react-router-dom/server.tsx :)
      if (val && val.__type === "RouteErrorResponse") {
        serialized[key] = new router.UNSAFE_ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
      } else if (val && val.__type === "Error") {
        // Attempt to reconstruct the right type of Error (i.e., ReferenceError)
        if (val.__subType) {
          let ErrorConstructor = window[val.__subType];
          if (typeof ErrorConstructor === "function") {
            try {
              // @ts-expect-error
              let error = new ErrorConstructor(val.message);
              // Wipe away the client-side stack trace.  Nothing to fill it in with
              // because we don't serialize SSR stack traces for security reasons
              error.stack = "";
              serialized[key] = error;
            } catch (e) {
              // no-op - fall through and create a normal Error
            }
          }
        }
        if (serialized[key] == null) {
          let error = new Error(val.message);
          // Wipe away the client-side stack trace.  Nothing to fill it in with
          // because we don't serialize SSR stack traces for security reasons
          error.stack = "";
          serialized[key] = error;
        }
      } else {
        serialized[key] = val;
      }
    }
    return serialized;
  }

  //#endregion

  ////////////////////////////////////////////////////////////////////////////////
  //#region Components
  ////////////////////////////////////////////////////////////////////////////////

  /**
    Webpack + React 17 fails to compile on any of the following because webpack
    complains that `startTransition` doesn't exist in `React`:
    * import { startTransition } from "react"
    * import * as React from from "react";
      "startTransition" in React ? React.startTransition(() => setState()) : setState()
    * import * as React from from "react";
      "startTransition" in React ? React["startTransition"](() => setState()) : setState()

    Moving it to a constant such as the following solves the Webpack/React 17 issue:
    * import * as React from from "react";
      const START_TRANSITION = "startTransition";
      START_TRANSITION in React ? React[START_TRANSITION](() => setState()) : setState()

    However, that introduces webpack/terser minification issues in production builds
    in React 18 where minification/obfuscation ends up removing the call of
    React.startTransition entirely from the first half of the ternary.  Grabbing
    this exported reference once up front resolves that issue.

    See https://github.com/remix-run/react-router/issues/10579
  */
  const START_TRANSITION = "startTransition";
  const startTransitionImpl = React__namespace[START_TRANSITION];
  /**
   * A `<Router>` for use in web browsers. Provides the cleanest URLs.
   */
  function BrowserRouter(_ref) {
    let {
      basename,
      children,
      future,
      window
    } = _ref;
    let historyRef = React__namespace.useRef();
    if (historyRef.current == null) {
      historyRef.current = router.createBrowserHistory({
        window,
        v5Compat: true
      });
    }
    let history = historyRef.current;
    let [state, setStateImpl] = React__namespace.useState({
      action: history.action,
      location: history.location
    });
    let {
      v7_startTransition
    } = future || {};
    let setState = React__namespace.useCallback(newState => {
      v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
    }, [setStateImpl, v7_startTransition]);
    React__namespace.useLayoutEffect(() => history.listen(setState), [history, setState]);
    return /*#__PURE__*/React__namespace.createElement(reactRouter.Router, {
      basename: basename,
      children: children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    });
  }
  /**
   * A `<Router>` for use in web browsers. Stores the location in the hash
   * portion of the URL so it is not sent to the server.
   */
  function HashRouter(_ref2) {
    let {
      basename,
      children,
      future,
      window
    } = _ref2;
    let historyRef = React__namespace.useRef();
    if (historyRef.current == null) {
      historyRef.current = router.createHashHistory({
        window,
        v5Compat: true
      });
    }
    let history = historyRef.current;
    let [state, setStateImpl] = React__namespace.useState({
      action: history.action,
      location: history.location
    });
    let {
      v7_startTransition
    } = future || {};
    let setState = React__namespace.useCallback(newState => {
      v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
    }, [setStateImpl, v7_startTransition]);
    React__namespace.useLayoutEffect(() => history.listen(setState), [history, setState]);
    return /*#__PURE__*/React__namespace.createElement(reactRouter.Router, {
      basename: basename,
      children: children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    });
  }
  /**
   * A `<Router>` that accepts a pre-instantiated history object. It's important
   * to note that using your own history object is highly discouraged and may add
   * two versions of the history library to your bundles unless you use the same
   * version of the history library that React Router uses internally.
   */
  function HistoryRouter(_ref3) {
    let {
      basename,
      children,
      future,
      history
    } = _ref3;
    let [state, setStateImpl] = React__namespace.useState({
      action: history.action,
      location: history.location
    });
    let {
      v7_startTransition
    } = future || {};
    let setState = React__namespace.useCallback(newState => {
      v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
    }, [setStateImpl, v7_startTransition]);
    React__namespace.useLayoutEffect(() => history.listen(setState), [history, setState]);
    return /*#__PURE__*/React__namespace.createElement(reactRouter.Router, {
      basename: basename,
      children: children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    });
  }
  {
    HistoryRouter.displayName = "unstable_HistoryRouter";
  }
  const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
  const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

  /**
   * The public API for rendering a history-aware <a>.
   */
  const Link = /*#__PURE__*/React__namespace.forwardRef(function LinkWithRef(_ref4, ref) {
    let {
        onClick,
        relative,
        reloadDocument,
        replace,
        state,
        target,
        to,
        preventScrollReset
      } = _ref4,
      rest = _objectWithoutPropertiesLoose(_ref4, _excluded);
    let {
      basename
    } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);

    // Rendered into <a href> for absolute URLs
    let absoluteHref;
    let isExternal = false;
    if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
      // Render the absolute href server- and client-side
      absoluteHref = to;

      // Only check for external origins client-side
      if (isBrowser) {
        try {
          let currentUrl = new URL(window.location.href);
          let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
          let path = router.stripBasename(targetUrl.pathname, basename);
          if (targetUrl.origin === currentUrl.origin && path != null) {
            // Strip the protocol/origin/basename for same-origin absolute URLs
            to = path + targetUrl.search + targetUrl.hash;
          } else {
            isExternal = true;
          }
        } catch (e) {
          // We can't do external URL detection without a valid URL
          router.UNSAFE_warning(false, "<Link to=\"" + to + "\"> contains an invalid URL which will probably break " + "when clicked - please update to a valid URL path.") ;
        }
      }
    }

    // Rendered into <a href> for relative URLs
    let href = reactRouter.useHref(to, {
      relative
    });
    let internalOnClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
      preventScrollReset,
      relative
    });
    function handleClick(event) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      React__namespace.createElement("a", _extends({}, rest, {
        href: absoluteHref || href,
        onClick: isExternal || reloadDocument ? onClick : handleClick,
        ref: ref,
        target: target
      }))
    );
  });
  {
    Link.displayName = "Link";
  }
  /**
   * A <Link> wrapper that knows if it's "active" or not.
   */
  const NavLink = /*#__PURE__*/React__namespace.forwardRef(function NavLinkWithRef(_ref5, ref) {
    let {
        "aria-current": ariaCurrentProp = "page",
        caseSensitive = false,
        className: classNameProp = "",
        end = false,
        style: styleProp,
        to,
        children
      } = _ref5,
      rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);
    let path = reactRouter.useResolvedPath(to, {
      relative: rest.relative
    });
    let location = reactRouter.useLocation();
    let routerState = React__namespace.useContext(reactRouter.UNSAFE_DataRouterStateContext);
    let {
      navigator
    } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
    let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }
    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let ariaCurrent = isActive ? ariaCurrentProp : undefined;
    let className;
    if (typeof classNameProp === "function") {
      className = classNameProp({
        isActive,
        isPending
      });
    } else {
      // If the className prop is not a function, we use a default `active`
      // class for <NavLink />s that are active. In v5 `active` was the default
      // value for `activeClassName`, but we are removing that API and can still
      // use the old default behavior for a cleaner upgrade path and keep the
      // simple styling rules working as they currently do.
      className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null].filter(Boolean).join(" ");
    }
    let style = typeof styleProp === "function" ? styleProp({
      isActive,
      isPending
    }) : styleProp;
    return /*#__PURE__*/React__namespace.createElement(Link, _extends({}, rest, {
      "aria-current": ariaCurrent,
      className: className,
      ref: ref,
      style: style,
      to: to
    }), typeof children === "function" ? children({
      isActive,
      isPending
    }) : children);
  });
  {
    NavLink.displayName = "NavLink";
  }
  /**
   * A `@remix-run/router`-aware `<form>`. It behaves like a normal form except
   * that the interaction with the server is with `fetch` instead of new document
   * requests, allowing components to add nicer UX to the page as the form is
   * submitted and returns with data.
   */
  const Form = /*#__PURE__*/React__namespace.forwardRef((props, ref) => {
    let submit = useSubmit();
    return /*#__PURE__*/React__namespace.createElement(FormImpl, _extends({}, props, {
      submit: submit,
      ref: ref
    }));
  });
  {
    Form.displayName = "Form";
  }
  const FormImpl = /*#__PURE__*/React__namespace.forwardRef((_ref6, forwardedRef) => {
    let {
        reloadDocument,
        replace,
        state,
        method = defaultMethod,
        action,
        onSubmit,
        submit,
        relative,
        preventScrollReset
      } = _ref6,
      props = _objectWithoutPropertiesLoose(_ref6, _excluded3);
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let formAction = useFormAction(action, {
      relative
    });
    let submitHandler = event => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
      submit(submitter || event.currentTarget, {
        method: submitMethod,
        replace,
        state,
        relative,
        preventScrollReset
      });
    };
    return /*#__PURE__*/React__namespace.createElement("form", _extends({
      ref: forwardedRef,
      method: formMethod,
      action: formAction,
      onSubmit: reloadDocument ? onSubmit : submitHandler
    }, props));
  });
  {
    FormImpl.displayName = "FormImpl";
  }
  /**
   * This component will emulate the browser's scroll restoration on location
   * changes.
   */
  function ScrollRestoration(_ref7) {
    let {
      getKey,
      storageKey
    } = _ref7;
    useScrollRestoration({
      getKey,
      storageKey
    });
    return null;
  }
  {
    ScrollRestoration.displayName = "ScrollRestoration";
  }
  //#endregion

  ////////////////////////////////////////////////////////////////////////////////
  //#region Hooks
  ////////////////////////////////////////////////////////////////////////////////
  var DataRouterHook = /*#__PURE__*/function (DataRouterHook) {
    DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
    DataRouterHook["UseSubmit"] = "useSubmit";
    DataRouterHook["UseSubmitFetcher"] = "useSubmitFetcher";
    DataRouterHook["UseFetcher"] = "useFetcher";
    return DataRouterHook;
  }(DataRouterHook || {});
  var DataRouterStateHook = /*#__PURE__*/function (DataRouterStateHook) {
    DataRouterStateHook["UseFetchers"] = "useFetchers";
    DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
    return DataRouterStateHook;
  }(DataRouterStateHook || {});
  function getDataRouterConsoleError(hookName) {
    return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
  }
  function useDataRouterContext(hookName) {
    let ctx = React__namespace.useContext(reactRouter.UNSAFE_DataRouterContext);
    !ctx ? router.UNSAFE_invariant(false, getDataRouterConsoleError(hookName))  : void 0;
    return ctx;
  }
  function useDataRouterState(hookName) {
    let state = React__namespace.useContext(reactRouter.UNSAFE_DataRouterStateContext);
    !state ? router.UNSAFE_invariant(false, getDataRouterConsoleError(hookName))  : void 0;
    return state;
  }

  /**
   * Handles the click behavior for router `<Link>` components. This is useful if
   * you need to create custom `<Link>` components with the same click behavior we
   * use in our exported `<Link>`.
   */
  function useLinkClickHandler(to, _temp) {
    let {
      target,
      replace: replaceProp,
      state,
      preventScrollReset,
      relative
    } = _temp === void 0 ? {} : _temp;
    let navigate = reactRouter.useNavigate();
    let location = reactRouter.useLocation();
    let path = reactRouter.useResolvedPath(to, {
      relative
    });
    return React__namespace.useCallback(event => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();

        // If the URL hasn't changed, a regular <a> will do a replace instead of
        // a push, so do the same here unless the replace prop is explicitly set
        let replace = replaceProp !== undefined ? replaceProp : reactRouter.createPath(location) === reactRouter.createPath(path);
        navigate(to, {
          replace,
          state,
          preventScrollReset,
          relative
        });
      }
    }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
  }

  /**
   * A convenient wrapper for reading and writing search parameters via the
   * URLSearchParams interface.
   */
  function useSearchParams(defaultInit) {
    router.UNSAFE_warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not " + "support the URLSearchParams API. If you need to support Internet " + "Explorer 11, we recommend you load a polyfill such as " + "https://github.com/ungap/url-search-params\n\n" + "If you're unsure how to load polyfills, we recommend you check out " + "https://polyfill.io/v3/ which provides some recommendations about how " + "to load polyfills only for users that need them, instead of for every " + "user.") ;
    let defaultSearchParamsRef = React__namespace.useRef(createSearchParams(defaultInit));
    let hasSetSearchParamsRef = React__namespace.useRef(false);
    let location = reactRouter.useLocation();
    let searchParams = React__namespace.useMemo(() =>
    // Only merge in the defaults if we haven't yet called setSearchParams.
    // Once we call that we want those to take precedence, otherwise you can't
    // remove a param with setSearchParams({}) if it has an initial value
    getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [location.search]);
    let navigate = reactRouter.useNavigate();
    let setSearchParams = React__namespace.useCallback((nextInit, navigateOptions) => {
      const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
      hasSetSearchParamsRef.current = true;
      navigate("?" + newSearchParams, navigateOptions);
    }, [navigate, searchParams]);
    return [searchParams, setSearchParams];
  }

  /**
   * Submits a HTML `<form>` to the server without reloading the page.
   */

  /**
   * Submits a fetcher `<form>` to the server without reloading the page.
   */

  function validateClientSideSubmission() {
    if (typeof document === "undefined") {
      throw new Error("You are calling submit during the server render. " + "Try calling submit within a `useEffect` or callback instead.");
    }
  }

  /**
   * Returns a function that may be used to programmatically submit a form (or
   * some arbitrary data) to the server.
   */
  function useSubmit() {
    let {
      router
    } = useDataRouterContext(DataRouterHook.UseSubmit);
    let {
      basename
    } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
    let currentRouteId = reactRouter.UNSAFE_useRouteId();
    return React__namespace.useCallback(function (target, options) {
      if (options === void 0) {
        options = {};
      }
      validateClientSideSubmission();
      let {
        action,
        method,
        encType,
        formData,
        body
      } = getFormSubmissionInfo(target, basename);
      router.navigate(options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        replace: options.replace,
        state: options.state,
        fromRouteId: currentRouteId
      });
    }, [router, basename, currentRouteId]);
  }

  /**
   * Returns the implementation for fetcher.submit
   */
  function useSubmitFetcher(fetcherKey, fetcherRouteId) {
    let {
      router: router$1
    } = useDataRouterContext(DataRouterHook.UseSubmitFetcher);
    let {
      basename
    } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
    return React__namespace.useCallback(function (target, options) {
      if (options === void 0) {
        options = {};
      }
      validateClientSideSubmission();
      let {
        action,
        method,
        encType,
        formData,
        body
      } = getFormSubmissionInfo(target, basename);
      !(fetcherRouteId != null) ? router.UNSAFE_invariant(false, "No routeId available for useFetcher()")  : void 0;
      router$1.fetch(fetcherKey, fetcherRouteId, options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType
      });
    }, [router$1, basename, fetcherKey, fetcherRouteId]);
  }

  // v7: Eventually we should deprecate this entirely in favor of using the
  // router method directly?
  function useFormAction(action, _temp2) {
    let {
      relative
    } = _temp2 === void 0 ? {} : _temp2;
    let {
      basename
    } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
    let routeContext = React__namespace.useContext(reactRouter.UNSAFE_RouteContext);
    !routeContext ? router.UNSAFE_invariant(false, "useFormAction must be used inside a RouteContext")  : void 0;
    let [match] = routeContext.matches.slice(-1);
    // Shallow clone path so we can modify it below, otherwise we modify the
    // object referenced by useMemo inside useResolvedPath
    let path = _extends({}, reactRouter.useResolvedPath(action ? action : ".", {
      relative
    }));

    // Previously we set the default action to ".". The problem with this is that
    // `useResolvedPath(".")` excludes search params of the resolved URL. This is
    // the intended behavior of when "." is specifically provided as
    // the form action, but inconsistent w/ browsers when the action is omitted.
    // https://github.com/remix-run/remix/issues/927
    let location = reactRouter.useLocation();
    if (action == null) {
      // Safe to write to this directly here since if action was undefined, we
      // would have called useResolvedPath(".") which will never include a search
      path.search = location.search;

      // When grabbing search params from the URL, remove the automatically
      // inserted ?index param so we match the useResolvedPath search behavior
      // which would not include ?index
      if (match.route.index) {
        let params = new URLSearchParams(path.search);
        params.delete("index");
        path.search = params.toString() ? "?" + params.toString() : "";
      }
    }
    if ((!action || action === ".") && match.route.index) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    }

    // If we're operating within a basename, prepend it to the pathname prior
    // to creating the form action.  If this is a root navigation, then just use
    // the raw basename which allows the basename to have full control over the
    // presence of a trailing slash on root actions
    if (basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : router.joinPaths([basename, path.pathname]);
    }
    return reactRouter.createPath(path);
  }
  function createFetcherForm(fetcherKey, routeId) {
    let FetcherForm = /*#__PURE__*/React__namespace.forwardRef((props, ref) => {
      let submit = useSubmitFetcher(fetcherKey, routeId);
      return /*#__PURE__*/React__namespace.createElement(FormImpl, _extends({}, props, {
        ref: ref,
        submit: submit
      }));
    });
    {
      FetcherForm.displayName = "fetcher.Form";
    }
    return FetcherForm;
  }
  let fetcherId = 0;
  // TODO: (v7) Change the useFetcher generic default from `any` to `unknown`
  /**
   * Interacts with route loaders and actions without causing a navigation. Great
   * for any interaction that stays on the same page.
   */
  function useFetcher() {
    var _route$matches;
    let {
      router: router$1
    } = useDataRouterContext(DataRouterHook.UseFetcher);
    let route = React__namespace.useContext(reactRouter.UNSAFE_RouteContext);
    !route ? router.UNSAFE_invariant(false, "useFetcher must be used inside a RouteContext")  : void 0;
    let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
    !(routeId != null) ? router.UNSAFE_invariant(false, "useFetcher can only be used on routes that contain a unique \"id\"")  : void 0;
    let [fetcherKey] = React__namespace.useState(() => String(++fetcherId));
    let [Form] = React__namespace.useState(() => {
      !routeId ? router.UNSAFE_invariant(false, "No routeId available for fetcher.Form()")  : void 0;
      return createFetcherForm(fetcherKey, routeId);
    });
    let [load] = React__namespace.useState(() => href => {
      !router$1 ? router.UNSAFE_invariant(false, "No router available for fetcher.load()")  : void 0;
      !routeId ? router.UNSAFE_invariant(false, "No routeId available for fetcher.load()")  : void 0;
      router$1.fetch(fetcherKey, routeId, href);
    });
    let submit = useSubmitFetcher(fetcherKey, routeId);
    let fetcher = router$1.getFetcher(fetcherKey);
    let fetcherWithComponents = React__namespace.useMemo(() => _extends({
      Form,
      submit,
      load
    }, fetcher), [fetcher, Form, submit, load]);
    React__namespace.useEffect(() => {
      // Is this busted when the React team gets real weird and calls effects
      // twice on mount?  We really just need to garbage collect here when this
      // fetcher is no longer around.
      return () => {
        if (!router$1) {
          console.warn("No router available to clean up from useFetcher()");
          return;
        }
        router$1.deleteFetcher(fetcherKey);
      };
    }, [router$1, fetcherKey]);
    return fetcherWithComponents;
  }

  /**
   * Provides all fetchers currently on the page. Useful for layouts and parent
   * routes that need to provide pending/optimistic UI regarding the fetch.
   */
  function useFetchers() {
    let state = useDataRouterState(DataRouterStateHook.UseFetchers);
    return [...state.fetchers.values()];
  }
  const SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
  let savedScrollPositions = {};

  /**
   * When rendered inside a RouterProvider, will restore scroll positions on navigations
   */
  function useScrollRestoration(_temp3) {
    let {
      getKey,
      storageKey
    } = _temp3 === void 0 ? {} : _temp3;
    let {
      router: router$1
    } = useDataRouterContext(DataRouterHook.UseScrollRestoration);
    let {
      restoreScrollPosition,
      preventScrollReset
    } = useDataRouterState(DataRouterStateHook.UseScrollRestoration);
    let {
      basename
    } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
    let location = reactRouter.useLocation();
    let matches = reactRouter.useMatches();
    let navigation = reactRouter.useNavigation();

    // Trigger manual scroll restoration while we're active
    React__namespace.useEffect(() => {
      window.history.scrollRestoration = "manual";
      return () => {
        window.history.scrollRestoration = "auto";
      };
    }, []);

    // Save positions on pagehide
    usePageHide(React__namespace.useCallback(() => {
      if (navigation.state === "idle") {
        let key = (getKey ? getKey(location, matches) : null) || location.key;
        savedScrollPositions[key] = window.scrollY;
      }
      sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
      window.history.scrollRestoration = "auto";
    }, [storageKey, getKey, navigation.state, location, matches]));

    // Read in any saved scroll locations
    if (typeof document !== "undefined") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React__namespace.useLayoutEffect(() => {
        try {
          let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
          if (sessionPositions) {
            savedScrollPositions = JSON.parse(sessionPositions);
          }
        } catch (e) {
          // no-op, use default empty object
        }
      }, [storageKey]);

      // Enable scroll restoration in the router
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React__namespace.useLayoutEffect(() => {
        let getKeyWithoutBasename = getKey && basename !== "/" ? (location, matches) => getKey( // Strip the basename to match useLocation()
        _extends({}, location, {
          pathname: router.stripBasename(location.pathname, basename) || location.pathname
        }), matches) : getKey;
        let disableScrollRestoration = router$1 == null ? void 0 : router$1.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKeyWithoutBasename);
        return () => disableScrollRestoration && disableScrollRestoration();
      }, [router$1, basename, getKey]);

      // Restore scrolling when state.restoreScrollPosition changes
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React__namespace.useLayoutEffect(() => {
        // Explicit false means don't do anything (used for submissions)
        if (restoreScrollPosition === false) {
          return;
        }

        // been here before, scroll to it
        if (typeof restoreScrollPosition === "number") {
          window.scrollTo(0, restoreScrollPosition);
          return;
        }

        // try to scroll to the hash
        if (location.hash) {
          let el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
          if (el) {
            el.scrollIntoView();
            return;
          }
        }

        // Don't reset if this navigation opted out
        if (preventScrollReset === true) {
          return;
        }

        // otherwise go to the top on new locations
        window.scrollTo(0, 0);
      }, [location, restoreScrollPosition, preventScrollReset]);
    }
  }

  /**
   * Setup a callback to be fired on the window's `beforeunload` event. This is
   * useful for saving some data to `window.localStorage` just before the page
   * refreshes.
   *
   * Note: The `callback` argument should be a function created with
   * `React.useCallback()`.
   */
  function useBeforeUnload(callback, options) {
    let {
      capture
    } = options || {};
    React__namespace.useEffect(() => {
      let opts = capture != null ? {
        capture
      } : undefined;
      window.addEventListener("beforeunload", callback, opts);
      return () => {
        window.removeEventListener("beforeunload", callback, opts);
      };
    }, [callback, capture]);
  }

  /**
   * Setup a callback to be fired on the window's `pagehide` event. This is
   * useful for saving some data to `window.localStorage` just before the page
   * refreshes.  This event is better supported than beforeunload across browsers.
   *
   * Note: The `callback` argument should be a function created with
   * `React.useCallback()`.
   */
  function usePageHide(callback, options) {
    let {
      capture
    } = options || {};
    React__namespace.useEffect(() => {
      let opts = capture != null ? {
        capture
      } : undefined;
      window.addEventListener("pagehide", callback, opts);
      return () => {
        window.removeEventListener("pagehide", callback, opts);
      };
    }, [callback, capture]);
  }

  /**
   * Wrapper around useBlocker to show a window.confirm prompt to users instead
   * of building a custom UI with useBlocker.
   *
   * Warning: This has *a lot of rough edges* and behaves very differently (and
   * very incorrectly in some cases) across browsers if user click addition
   * back/forward navigations while the confirm is open.  Use at your own risk.
   */
  function usePrompt(_ref8) {
    let {
      when,
      message
    } = _ref8;
    let blocker = reactRouter.unstable_useBlocker(when);
    React__namespace.useEffect(() => {
      if (blocker.state === "blocked") {
        let proceed = window.confirm(message);
        if (proceed) {
          // This timeout is needed to avoid a weird "race" on POP navigations
          // between the `window.history` revert navigation and the result of
          // `window.confirm`
          setTimeout(blocker.proceed, 0);
        } else {
          blocker.reset();
        }
      }
    }, [blocker, message]);
    React__namespace.useEffect(() => {
      if (blocker.state === "blocked" && !when) {
        blocker.reset();
      }
    }, [blocker, when]);
  }

  //#endregion

  Object.defineProperty(exports, 'AbortedDeferredError', {
    enumerable: true,
    get: function () { return reactRouter.AbortedDeferredError; }
  });
  Object.defineProperty(exports, 'Await', {
    enumerable: true,
    get: function () { return reactRouter.Await; }
  });
  Object.defineProperty(exports, 'MemoryRouter', {
    enumerable: true,
    get: function () { return reactRouter.MemoryRouter; }
  });
  Object.defineProperty(exports, 'Navigate', {
    enumerable: true,
    get: function () { return reactRouter.Navigate; }
  });
  Object.defineProperty(exports, 'NavigationType', {
    enumerable: true,
    get: function () { return reactRouter.NavigationType; }
  });
  Object.defineProperty(exports, 'Outlet', {
    enumerable: true,
    get: function () { return reactRouter.Outlet; }
  });
  Object.defineProperty(exports, 'Route', {
    enumerable: true,
    get: function () { return reactRouter.Route; }
  });
  Object.defineProperty(exports, 'Router', {
    enumerable: true,
    get: function () { return reactRouter.Router; }
  });
  Object.defineProperty(exports, 'RouterProvider', {
    enumerable: true,
    get: function () { return reactRouter.RouterProvider; }
  });
  Object.defineProperty(exports, 'Routes', {
    enumerable: true,
    get: function () { return reactRouter.Routes; }
  });
  Object.defineProperty(exports, 'UNSAFE_DataRouterContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_DataRouterContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_DataRouterStateContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_DataRouterStateContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_LocationContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_LocationContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_NavigationContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_NavigationContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_RouteContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_RouteContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_useRouteId', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_useRouteId; }
  });
  Object.defineProperty(exports, 'createMemoryRouter', {
    enumerable: true,
    get: function () { return reactRouter.createMemoryRouter; }
  });
  Object.defineProperty(exports, 'createPath', {
    enumerable: true,
    get: function () { return reactRouter.createPath; }
  });
  Object.defineProperty(exports, 'createRoutesFromChildren', {
    enumerable: true,
    get: function () { return reactRouter.createRoutesFromChildren; }
  });
  Object.defineProperty(exports, 'createRoutesFromElements', {
    enumerable: true,
    get: function () { return reactRouter.createRoutesFromElements; }
  });
  Object.defineProperty(exports, 'defer', {
    enumerable: true,
    get: function () { return reactRouter.defer; }
  });
  Object.defineProperty(exports, 'generatePath', {
    enumerable: true,
    get: function () { return reactRouter.generatePath; }
  });
  Object.defineProperty(exports, 'isRouteErrorResponse', {
    enumerable: true,
    get: function () { return reactRouter.isRouteErrorResponse; }
  });
  Object.defineProperty(exports, 'json', {
    enumerable: true,
    get: function () { return reactRouter.json; }
  });
  Object.defineProperty(exports, 'matchPath', {
    enumerable: true,
    get: function () { return reactRouter.matchPath; }
  });
  Object.defineProperty(exports, 'matchRoutes', {
    enumerable: true,
    get: function () { return reactRouter.matchRoutes; }
  });
  Object.defineProperty(exports, 'parsePath', {
    enumerable: true,
    get: function () { return reactRouter.parsePath; }
  });
  Object.defineProperty(exports, 'redirect', {
    enumerable: true,
    get: function () { return reactRouter.redirect; }
  });
  Object.defineProperty(exports, 'redirectDocument', {
    enumerable: true,
    get: function () { return reactRouter.redirectDocument; }
  });
  Object.defineProperty(exports, 'renderMatches', {
    enumerable: true,
    get: function () { return reactRouter.renderMatches; }
  });
  Object.defineProperty(exports, 'resolvePath', {
    enumerable: true,
    get: function () { return reactRouter.resolvePath; }
  });
  Object.defineProperty(exports, 'unstable_useBlocker', {
    enumerable: true,
    get: function () { return reactRouter.unstable_useBlocker; }
  });
  Object.defineProperty(exports, 'useActionData', {
    enumerable: true,
    get: function () { return reactRouter.useActionData; }
  });
  Object.defineProperty(exports, 'useAsyncError', {
    enumerable: true,
    get: function () { return reactRouter.useAsyncError; }
  });
  Object.defineProperty(exports, 'useAsyncValue', {
    enumerable: true,
    get: function () { return reactRouter.useAsyncValue; }
  });
  Object.defineProperty(exports, 'useHref', {
    enumerable: true,
    get: function () { return reactRouter.useHref; }
  });
  Object.defineProperty(exports, 'useInRouterContext', {
    enumerable: true,
    get: function () { return reactRouter.useInRouterContext; }
  });
  Object.defineProperty(exports, 'useLoaderData', {
    enumerable: true,
    get: function () { return reactRouter.useLoaderData; }
  });
  Object.defineProperty(exports, 'useLocation', {
    enumerable: true,
    get: function () { return reactRouter.useLocation; }
  });
  Object.defineProperty(exports, 'useMatch', {
    enumerable: true,
    get: function () { return reactRouter.useMatch; }
  });
  Object.defineProperty(exports, 'useMatches', {
    enumerable: true,
    get: function () { return reactRouter.useMatches; }
  });
  Object.defineProperty(exports, 'useNavigate', {
    enumerable: true,
    get: function () { return reactRouter.useNavigate; }
  });
  Object.defineProperty(exports, 'useNavigation', {
    enumerable: true,
    get: function () { return reactRouter.useNavigation; }
  });
  Object.defineProperty(exports, 'useNavigationType', {
    enumerable: true,
    get: function () { return reactRouter.useNavigationType; }
  });
  Object.defineProperty(exports, 'useOutlet', {
    enumerable: true,
    get: function () { return reactRouter.useOutlet; }
  });
  Object.defineProperty(exports, 'useOutletContext', {
    enumerable: true,
    get: function () { return reactRouter.useOutletContext; }
  });
  Object.defineProperty(exports, 'useParams', {
    enumerable: true,
    get: function () { return reactRouter.useParams; }
  });
  Object.defineProperty(exports, 'useResolvedPath', {
    enumerable: true,
    get: function () { return reactRouter.useResolvedPath; }
  });
  Object.defineProperty(exports, 'useRevalidator', {
    enumerable: true,
    get: function () { return reactRouter.useRevalidator; }
  });
  Object.defineProperty(exports, 'useRouteError', {
    enumerable: true,
    get: function () { return reactRouter.useRouteError; }
  });
  Object.defineProperty(exports, 'useRouteLoaderData', {
    enumerable: true,
    get: function () { return reactRouter.useRouteLoaderData; }
  });
  Object.defineProperty(exports, 'useRoutes', {
    enumerable: true,
    get: function () { return reactRouter.useRoutes; }
  });
  exports.BrowserRouter = BrowserRouter;
  exports.Form = Form;
  exports.HashRouter = HashRouter;
  exports.Link = Link;
  exports.NavLink = NavLink;
  exports.ScrollRestoration = ScrollRestoration;
  exports.UNSAFE_useScrollRestoration = useScrollRestoration;
  exports.createBrowserRouter = createBrowserRouter;
  exports.createHashRouter = createHashRouter;
  exports.createSearchParams = createSearchParams;
  exports.unstable_HistoryRouter = HistoryRouter;
  exports.unstable_usePrompt = usePrompt;
  exports.useBeforeUnload = useBeforeUnload;
  exports.useFetcher = useFetcher;
  exports.useFetchers = useFetchers;
  exports.useFormAction = useFormAction;
  exports.useLinkClickHandler = useLinkClickHandler;
  exports.useSearchParams = useSearchParams;
  exports.useSubmit = useSubmit;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=react-router-dom.development.js.map
