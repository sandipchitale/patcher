/**
 * @callback callback
 * @param {function} original - the original constructor
 * @param {function} patchedOriginal - the patched constructor
 * @param {any[]} arguments - the invocation arguments
 * @return
 */

/**
 * A utility to monkey patch any constructor, even native ones like Date or String.
 *
 * @function patcher
 * @param {Object} context - window or global
 * @param {string} constructorName - name of the constructor to override e.g. 'Date'
 * @param {callback} callback a callback to do special handling. return null to have original constructor called.
 */
function patcher(context, constructorName, callback) {
    var Original, props, i;

    Original = context[constructorName];
    context[constructorName] = function PatchedOriginal() {
        var args, returnObject;
        args = Array.prototype.slice.call(arguments);
        if (callback) {
            returnObject = callback(Original, PatchedOriginal, args);
        }

        if (returnObject !== null) {
            return returnObject;
        }

        return new (Function.prototype.bind.apply(Original, args))();
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
