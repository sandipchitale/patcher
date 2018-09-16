/**
 * @callback beforeCallback
 * @param {function} original the original constructor
 * @param {function} patchedOriginal the patched constructor
 * @param {any[]} arguments the invocation arguments
 * @return new object or null
 *
 */

 /**
 * @callback afterCallback
 * @param {function} original the original constructor
 * @param {function} patchedOriginal the patched constructor
 * @param {any} returnValue the return value to be post processed
 * @return processed retrun value
 *
 */

/**
 * @callback afterThrowCallback
 * @param {function} original the original constructor
 * @param {function} patchedOriginal the patched constructor
 * @param {any} exception the thrown callback
 * @return none
 *
 */

/**
 * A utility to monkey patch any constructor, even native ones like Date or String.
 *
 * @function patcher
 * @param {Object} context window or global
 * @param {string} constructorName  the name of the constructor to override e.g. 'Date'
 * @param {beforeCallback} beforeCallback a callback to do special handling of arguments. return null to have original constructor called.
 * @param {afterCallback} [afterCallback] a callback to do special handling of returned value.
 * @param {afterThrowCallback} [afterThrowCallback] a callback to do special handling of thrown exception.
 */
function patcher(context, constructorName, beforeCallback, afterCallback, afterThrowCallback) {
    var Original, props, i;

    Original = context[constructorName];
    context[constructorName] = function PatchedOriginal() {
        var returnObject;
        if (beforeCallback) {
            returnObject = beforeCallback(Original, PatchedOriginal, arguments);
        }

        if (returnObject !== null) {
            return returnObject;
        }

        try {
            returnObject =  new (Function.prototype.bind.apply(Original, arguments))();
            if (afterCallback) {
                return afterCallback(Original, PatchedOriginal, returnObject);
            } else {
                return returnObject;
            }
        } catch (e) {
            if (afterThrowCallback) {
                throw afterThrowCallback(Original, patchedOriginal, e);
            } else {
                throw e;
            }
        }
    }
    // Copy static properties
    props = Object.getOwnPropertyNames(Original);
    for (i = 0; i < props.length; i++) {
        // Strict mode does not allow acces to the following properties
        if (props[i] === 'caller' || props[i] === 'arguments') {
            continue;
        }
        context[constructorName][props[i]] = Original[props[i]];
    }
}
