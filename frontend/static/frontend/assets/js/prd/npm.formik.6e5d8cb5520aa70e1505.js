(self.webpackChunkcarded_react=self.webpackChunkcarded_react||[]).push([[344],{62598:function(e,t,r){"use strict";r.d(t,{J9:function(){return D},TA:function(){return k}});var n=r(67294),a=r(69590),i=r.n(a),u=r(5664),o=r(30353),l=r(3373),c=r(16094),s=r(45298),d=(r(8679),r(42151));function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function v(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var h=function(e){return Array.isArray(e)&&0===e.length},y=function(e){return"function"==typeof e},m=function(e){return null!==e&&"object"==typeof e},E=function(e){return String(Math.floor(Number(e)))===e},S=function(e){return"[object String]"===Object.prototype.toString.call(e)},T=function(e){return 0===n.Children.count(e)},b=function(e){return m(e)&&y(e.then)};function _(e,t,r,n){void 0===n&&(n=0);for(var a=(0,c.Z)(t);e&&n<a.length;)e=e[a[n++]];return void 0===e?r:e}function g(e,t,r){for(var n=(0,l.Z)(e),a=n,i=0,u=(0,c.Z)(t);i<u.length-1;i++){var o=u[i],s=_(e,u.slice(0,i+1));if(s&&(m(s)||Array.isArray(s)))a=a[o]=(0,l.Z)(s);else{var d=u[i+1];a=a[o]=E(d)&&Number(d)>=0?[]:{}}}return(0===i?e:a)[u[i]]===r?e:(void 0===r?delete a[u[i]]:a[u[i]]=r,0===i&&void 0===r&&delete n[u[i]],n)}function A(e,t,r,n){void 0===r&&(r=new WeakMap),void 0===n&&(n={});for(var a=0,i=Object.keys(e);a<i.length;a++){var u=i[a],o=e[u];m(o)?r.get(o)||(r.set(o,!0),n[u]=Array.isArray(o)?[]:{},A(o,t,r,n[u])):n[u]=t}return n}var R=(0,n.createContext)(void 0);R.displayName="FormikContext";var O=R.Provider;function I(e,t){switch(t.type){case"SET_VALUES":return f({},e,{values:t.payload});case"SET_TOUCHED":return f({},e,{touched:t.payload});case"SET_ERRORS":return i()(e.errors,t.payload)?e:f({},e,{errors:t.payload});case"SET_STATUS":return f({},e,{status:t.payload});case"SET_ISSUBMITTING":return f({},e,{isSubmitting:t.payload});case"SET_ISVALIDATING":return f({},e,{isValidating:t.payload});case"SET_FIELD_VALUE":return f({},e,{values:g(e.values,t.payload.field,t.payload.value)});case"SET_FIELD_TOUCHED":return f({},e,{touched:g(e.touched,t.payload.field,t.payload.value)});case"SET_FIELD_ERROR":return f({},e,{errors:g(e.errors,t.payload.field,t.payload.value)});case"RESET_FORM":return f({},e,t.payload);case"SET_FORMIK_STATE":return t.payload(e);case"SUBMIT_ATTEMPT":return f({},e,{touched:A(e.values,!0),isSubmitting:!0,submitCount:e.submitCount+1});case"SUBMIT_FAILURE":case"SUBMIT_SUCCESS":return f({},e,{isSubmitting:!1});default:return e}}R.Consumer;var C={},F={};function k(e){var t=e.validateOnChange,r=void 0===t||t,a=e.validateOnBlur,o=void 0===a||a,l=e.validateOnMount,c=void 0!==l&&l,s=e.isInitialValid,d=e.enableReinitialize,p=void 0!==d&&d,h=e.onSubmit,E=v(e,["validateOnChange","validateOnBlur","validateOnMount","isInitialValid","enableReinitialize","onSubmit"]),T=f({validateOnChange:r,validateOnBlur:o,validateOnMount:c,onSubmit:h},E),A=(0,n.useRef)(T.initialValues),R=(0,n.useRef)(T.initialErrors||C),O=(0,n.useRef)(T.initialTouched||F),k=(0,n.useRef)(T.initialStatus),D=(0,n.useRef)(!1),P=(0,n.useRef)({});(0,n.useEffect)((function(){return D.current=!0,function(){D.current=!1}}),[]);var V=(0,n.useReducer)(I,{values:T.initialValues,errors:T.initialErrors||C,touched:T.initialTouched||F,status:T.initialStatus,isSubmitting:!1,isValidating:!1,submitCount:0}),w=V[0],B=V[1],j=(0,n.useCallback)((function(e,t){return new Promise((function(r,n){var a=T.validate(e,t);null==a?r(C):b(a)?a.then((function(e){r(e||C)}),(function(e){n(e)})):r(a)}))}),[T.validate]),N=(0,n.useCallback)((function(e,t){var r=T.validationSchema,n=y(r)?r(t):r,a=t&&n.validateAt?n.validateAt(t,e):function(e,t,r,n){void 0===r&&(r=!1),void 0===n&&(n={});var a=M(e);return t[r?"validateSync":"validate"](a,{abortEarly:!1,context:n})}(e,n);return new Promise((function(e,t){a.then((function(){e(C)}),(function(r){"ValidationError"===r.name?e(function(e){var t={};if(e.inner){if(0===e.inner.length)return g(t,e.path,e.message);var r=e.inner,n=Array.isArray(r),a=0;for(r=n?r:r[Symbol.iterator]();;){var i;if(n){if(a>=r.length)break;i=r[a++]}else{if((a=r.next()).done)break;i=a.value}var u=i;_(t,u.path)||(t=g(t,u.path,u.message))}}return t}(r)):t(r)}))}))}),[T.validationSchema]),x=(0,n.useCallback)((function(e,t){return new Promise((function(r){return r(P.current[e].validate(t))}))}),[]),Z=(0,n.useCallback)((function(e){var t=Object.keys(P.current).filter((function(e){return y(P.current[e].validate)})),r=t.length>0?t.map((function(t){return x(t,_(e,t))})):[Promise.resolve("DO_NOT_DELETE_YOU_WILL_BE_FIRED")];return Promise.all(r).then((function(e){return e.reduce((function(e,r,n){return"DO_NOT_DELETE_YOU_WILL_BE_FIRED"===r||r&&(e=g(e,t[n],r)),e}),{})}))}),[x]),G=(0,n.useCallback)((function(e){return Promise.all([Z(e),T.validationSchema?N(e):{},T.validate?j(e):{}]).then((function(e){var t=e[0],r=e[1],n=e[2];return u.Z.all([t,r,n],{arrayMerge:L})}))}),[T.validate,T.validationSchema,Z,j,N]),H=U((function(e){return void 0===e&&(e=w.values),B({type:"SET_ISVALIDATING",payload:!0}),G(e).then((function(e){return D.current&&(B({type:"SET_ISVALIDATING",payload:!1}),B({type:"SET_ERRORS",payload:e})),e}))}));(0,n.useEffect)((function(){c&&!0===D.current&&i()(A.current,T.initialValues)&&H(A.current)}),[c,H]);var W=(0,n.useCallback)((function(e){var t=e&&e.values?e.values:A.current,r=e&&e.errors?e.errors:R.current?R.current:T.initialErrors||{},n=e&&e.touched?e.touched:O.current?O.current:T.initialTouched||{},a=e&&e.status?e.status:k.current?k.current:T.initialStatus;A.current=t,R.current=r,O.current=n,k.current=a;var i=function(){B({type:"RESET_FORM",payload:{isSubmitting:!!e&&!!e.isSubmitting,errors:r,touched:n,status:a,values:t,isValidating:!!e&&!!e.isValidating,submitCount:e&&e.submitCount&&"number"==typeof e.submitCount?e.submitCount:0}})};if(T.onReset){var u=T.onReset(w.values,se);b(u)?u.then(i):i()}else i()}),[T.initialErrors,T.initialStatus,T.initialTouched]);(0,n.useEffect)((function(){!0!==D.current||i()(A.current,T.initialValues)||(p&&(A.current=T.initialValues,W()),c&&H(A.current))}),[p,T.initialValues,W,c,H]),(0,n.useEffect)((function(){p&&!0===D.current&&!i()(R.current,T.initialErrors)&&(R.current=T.initialErrors||C,B({type:"SET_ERRORS",payload:T.initialErrors||C}))}),[p,T.initialErrors]),(0,n.useEffect)((function(){p&&!0===D.current&&!i()(O.current,T.initialTouched)&&(O.current=T.initialTouched||F,B({type:"SET_TOUCHED",payload:T.initialTouched||F}))}),[p,T.initialTouched]),(0,n.useEffect)((function(){p&&!0===D.current&&!i()(k.current,T.initialStatus)&&(k.current=T.initialStatus,B({type:"SET_STATUS",payload:T.initialStatus}))}),[p,T.initialStatus,T.initialTouched]);var K=U((function(e){if(P.current[e]&&y(P.current[e].validate)){var t=_(w.values,e),r=P.current[e].validate(t);return b(r)?(B({type:"SET_ISVALIDATING",payload:!0}),r.then((function(e){return e})).then((function(t){B({type:"SET_FIELD_ERROR",payload:{field:e,value:t}}),B({type:"SET_ISVALIDATING",payload:!1})}))):(B({type:"SET_FIELD_ERROR",payload:{field:e,value:r}}),Promise.resolve(r))}return T.validationSchema?(B({type:"SET_ISVALIDATING",payload:!0}),N(w.values,e).then((function(e){return e})).then((function(t){B({type:"SET_FIELD_ERROR",payload:{field:e,value:t[e]}}),B({type:"SET_ISVALIDATING",payload:!1})}))):Promise.resolve()})),z=(0,n.useCallback)((function(e,t){var r=t.validate;P.current[e]={validate:r}}),[]),Y=(0,n.useCallback)((function(e){delete P.current[e]}),[]),J=U((function(e,t){return B({type:"SET_TOUCHED",payload:e}),(void 0===t?o:t)?H(w.values):Promise.resolve()})),q=(0,n.useCallback)((function(e){B({type:"SET_ERRORS",payload:e})}),[]),Q=U((function(e,t){var n=y(e)?e(w.values):e;return B({type:"SET_VALUES",payload:n}),(void 0===t?r:t)?H(n):Promise.resolve()})),X=(0,n.useCallback)((function(e,t){B({type:"SET_FIELD_ERROR",payload:{field:e,value:t}})}),[]),$=U((function(e,t,n){return B({type:"SET_FIELD_VALUE",payload:{field:e,value:t}}),(void 0===n?r:n)?H(g(w.values,e,t)):Promise.resolve()})),ee=(0,n.useCallback)((function(e,t){var r,n=t,a=e;if(!S(e)){e.persist&&e.persist();var i=e.target?e.target:e.currentTarget,u=i.type,o=i.name,l=i.id,c=i.value,s=i.checked,d=(i.outerHTML,i.options),f=i.multiple;n=t||o||l,a=/number|range/.test(u)?(r=parseFloat(c),isNaN(r)?"":r):/checkbox/.test(u)?function(e,t,r){if("boolean"==typeof e)return Boolean(t);var n=[],a=!1,i=-1;if(Array.isArray(e))n=e,a=(i=e.indexOf(r))>=0;else if(!r||"true"==r||"false"==r)return Boolean(t);return t&&r&&!a?n.concat(r):a?n.slice(0,i).concat(n.slice(i+1)):n}(_(w.values,n),s,c):d&&f?function(e){return Array.from(e).filter((function(e){return e.selected})).map((function(e){return e.value}))}(d):c}n&&$(n,a)}),[$,w.values]),te=U((function(e){if(S(e))return function(t){return ee(t,e)};ee(e)})),re=U((function(e,t,r){return void 0===t&&(t=!0),B({type:"SET_FIELD_TOUCHED",payload:{field:e,value:t}}),(void 0===r?o:r)?H(w.values):Promise.resolve()})),ne=(0,n.useCallback)((function(e,t){e.persist&&e.persist();var r=e.target,n=r.name,a=r.id,i=(r.outerHTML,t||n||a);re(i,!0)}),[re]),ae=U((function(e){if(S(e))return function(t){return ne(t,e)};ne(e)})),ie=(0,n.useCallback)((function(e){y(e)?B({type:"SET_FORMIK_STATE",payload:e}):B({type:"SET_FORMIK_STATE",payload:function(){return e}})}),[]),ue=(0,n.useCallback)((function(e){B({type:"SET_STATUS",payload:e})}),[]),oe=(0,n.useCallback)((function(e){B({type:"SET_ISSUBMITTING",payload:e})}),[]),le=U((function(){return B({type:"SUBMIT_ATTEMPT"}),H().then((function(e){var t=e instanceof Error;if(!t&&0===Object.keys(e).length){var r;try{if(void 0===(r=de()))return}catch(e){throw e}return Promise.resolve(r).then((function(e){return D.current&&B({type:"SUBMIT_SUCCESS"}),e})).catch((function(e){if(D.current)throw B({type:"SUBMIT_FAILURE"}),e}))}if(D.current&&(B({type:"SUBMIT_FAILURE"}),t))throw e}))})),ce=U((function(e){e&&e.preventDefault&&y(e.preventDefault)&&e.preventDefault(),e&&e.stopPropagation&&y(e.stopPropagation)&&e.stopPropagation(),le().catch((function(e){console.warn("Warning: An unhandled error was caught from submitForm()",e)}))})),se={resetForm:W,validateForm:H,validateField:K,setErrors:q,setFieldError:X,setFieldTouched:re,setFieldValue:$,setStatus:ue,setSubmitting:oe,setTouched:J,setValues:Q,setFormikState:ie,submitForm:le},de=U((function(){return h(w.values,se)})),fe=U((function(e){e&&e.preventDefault&&y(e.preventDefault)&&e.preventDefault(),e&&e.stopPropagation&&y(e.stopPropagation)&&e.stopPropagation(),W()})),ve=(0,n.useCallback)((function(e){return{value:_(w.values,e),error:_(w.errors,e),touched:!!_(w.touched,e),initialValue:_(A.current,e),initialTouched:!!_(O.current,e),initialError:_(R.current,e)}}),[w.errors,w.touched,w.values]),pe=(0,n.useCallback)((function(e){return{setValue:function(t,r){return $(e,t,r)},setTouched:function(t,r){return re(e,t,r)},setError:function(t){return X(e,t)}}}),[$,re,X]),he=(0,n.useCallback)((function(e){var t=m(e),r=t?e.name:e,n=_(w.values,r),a={name:r,value:n,onChange:te,onBlur:ae};if(t){var i=e.type,u=e.value,o=e.as,l=e.multiple;"checkbox"===i?void 0===u?a.checked=!!n:(a.checked=!(!Array.isArray(n)||!~n.indexOf(u)),a.value=u):"radio"===i?(a.checked=n===u,a.value=u):"select"===o&&l&&(a.value=a.value||[],a.multiple=!0)}return a}),[ae,te,w.values]),ye=(0,n.useMemo)((function(){return!i()(A.current,w.values)}),[A.current,w.values]),me=(0,n.useMemo)((function(){return void 0!==s?ye?w.errors&&0===Object.keys(w.errors).length:!1!==s&&y(s)?s(T):s:w.errors&&0===Object.keys(w.errors).length}),[s,ye,w.errors,T]);return f({},w,{initialValues:A.current,initialErrors:R.current,initialTouched:O.current,initialStatus:k.current,handleBlur:ae,handleChange:te,handleReset:fe,handleSubmit:ce,resetForm:W,setErrors:q,setFormikState:ie,setFieldTouched:re,setFieldValue:$,setFieldError:X,setStatus:ue,setSubmitting:oe,setTouched:J,setValues:Q,submitForm:le,validateForm:H,validateField:K,isValid:me,dirty:ye,unregisterField:Y,registerField:z,getFieldProps:he,getFieldMeta:ve,getFieldHelpers:pe,validateOnBlur:o,validateOnChange:r,validateOnMount:c})}function D(e){var t=k(e),r=e.component,a=e.children,i=e.render,u=e.innerRef;return(0,n.useImperativeHandle)(u,(function(){return t})),(0,n.createElement)(O,{value:t},r?(0,n.createElement)(r,t):i?i(t):a?y(a)?a(t):T(a)?null:n.Children.only(a):null)}function M(e){var t=Array.isArray(e)?[]:{};for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=String(r);!0===Array.isArray(e[n])?t[n]=e[n].map((function(e){return!0===Array.isArray(e)||(0,o.Z)(e)?M(e):""!==e?e:void 0})):(0,o.Z)(e[n])?t[n]=M(e[n]):t[n]=""!==e[n]?e[n]:void 0}return t}function L(e,t,r){var n=e.slice();return t.forEach((function(t,a){if(void 0===n[a]){var i=!1!==r.clone&&r.isMergeableObject(t);n[a]=i?(0,u.Z)(Array.isArray(t)?[]:{},t,r):t}else r.isMergeableObject(t)?n[a]=(0,u.Z)(e[a],t,r):-1===e.indexOf(t)&&n.push(t)})),n}var P="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?n.useLayoutEffect:n.useEffect;function U(e){var t=(0,n.useRef)(e);return P((function(){t.current=e})),(0,n.useCallback)((function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return t.current.apply(void 0,r)}),[])}(0,n.forwardRef)((function(e,t){var r,a=e.action,i=v(e,["action"]),u=null!=a?a:"#",o=((r=(0,n.useContext)(R))||(0,s.Z)(!1),r),l=o.handleReset,c=o.handleSubmit;return(0,n.createElement)("form",Object.assign({onSubmit:c,ref:t,onReset:l,action:u},i))})).displayName="Form";var V=function(e,t,r){var n=w(e);return n.splice(t,0,r),n},w=function(e){if(e){if(Array.isArray(e))return[].concat(e);var t=Object.keys(e).map((function(e){return parseInt(e)})).reduce((function(e,t){return t>e?t:e}),0);return Array.from(f({},e,{length:t+1}))}return[]};(function(e){function t(t){var r;return(r=e.call(this,t)||this).updateArrayField=function(e,t,n){var a=r.props,i=a.name;(0,a.formik.setFormikState)((function(r){var a="function"==typeof n?n:e,u="function"==typeof t?t:e,o=g(r.values,i,e(_(r.values,i))),l=n?a(_(r.errors,i)):void 0,c=t?u(_(r.touched,i)):void 0;return h(l)&&(l=void 0),h(c)&&(c=void 0),f({},r,{values:o,errors:n?g(r.errors,i,l):r.errors,touched:t?g(r.touched,i,c):r.touched})}))},r.push=function(e){return r.updateArrayField((function(t){return[].concat(w(t),[(0,d.Z)(e)])}),!1,!1)},r.handlePush=function(e){return function(){return r.push(e)}},r.swap=function(e,t){return r.updateArrayField((function(r){return function(e,t,r){var n=w(e),a=n[t];return n[t]=n[r],n[r]=a,n}(r,e,t)}),!0,!0)},r.handleSwap=function(e,t){return function(){return r.swap(e,t)}},r.move=function(e,t){return r.updateArrayField((function(r){return function(e,t,r){var n=w(e),a=n[t];return n.splice(t,1),n.splice(r,0,a),n}(r,e,t)}),!0,!0)},r.handleMove=function(e,t){return function(){return r.move(e,t)}},r.insert=function(e,t){return r.updateArrayField((function(r){return V(r,e,t)}),(function(t){return V(t,e,null)}),(function(t){return V(t,e,null)}))},r.handleInsert=function(e,t){return function(){return r.insert(e,t)}},r.replace=function(e,t){return r.updateArrayField((function(r){return function(e,t,r){var n=w(e);return n[t]=r,n}(r,e,t)}),!1,!1)},r.handleReplace=function(e,t){return function(){return r.replace(e,t)}},r.unshift=function(e){var t=-1;return r.updateArrayField((function(r){var n=r?[e].concat(r):[e];return t<0&&(t=n.length),n}),(function(e){var r=e?[null].concat(e):[null];return t<0&&(t=r.length),r}),(function(e){var r=e?[null].concat(e):[null];return t<0&&(t=r.length),r})),t},r.handleUnshift=function(e){return function(){return r.unshift(e)}},r.handleRemove=function(e){return function(){return r.remove(e)}},r.handlePop=function(){return function(){return r.pop()}},r.remove=r.remove.bind(p(r)),r.pop=r.pop.bind(p(r)),r}var r,a;a=e,(r=t).prototype=Object.create(a.prototype),r.prototype.constructor=r,r.__proto__=a;var u=t.prototype;return u.componentDidUpdate=function(e){this.props.validateOnChange&&this.props.formik.validateOnChange&&!i()(_(e.formik.values,e.name),_(this.props.formik.values,this.props.name))&&this.props.formik.validateForm(this.props.formik.values)},u.remove=function(e){var t;return this.updateArrayField((function(r){var n=r?w(r):[];return t||(t=n[e]),y(n.splice)&&n.splice(e,1),n}),!0,!0),t},u.pop=function(){var e;return this.updateArrayField((function(t){var r=t;return e||(e=r&&r.pop&&r.pop()),r}),!0,!0),e},u.render=function(){var e={push:this.push,pop:this.pop,swap:this.swap,move:this.move,insert:this.insert,replace:this.replace,unshift:this.unshift,remove:this.remove,handlePush:this.handlePush,handlePop:this.handlePop,handleSwap:this.handleSwap,handleMove:this.handleMove,handleInsert:this.handleInsert,handleReplace:this.handleReplace,handleUnshift:this.handleUnshift,handleRemove:this.handleRemove},t=this.props,r=t.component,a=t.render,i=t.children,u=t.name,o=f({},e,{form:v(t.formik,["validate","validationSchema"]),name:u});return r?(0,n.createElement)(r,o):a?a(o):i?"function"==typeof i?i(o):T(i)?null:n.Children.only(i):null},t}(n.Component)).defaultProps={validateOnChange:!0},n.Component,n.Component}}]);
//# sourceMappingURL=npm.formik.f62b526081ecbf2788ecf2b18d787065.js.map