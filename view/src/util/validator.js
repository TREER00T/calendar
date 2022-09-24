export const isEmpty = (thing) => {
    let empty = false;

    switch (typeof thing) {
        case 'undefined':
            empty = true;
            break;
        case 'string':
            if (thing.trim().length === 0) {
                empty = true;
            }
            break;
        case 'object':
            if (thing === null) {
                empty = true;
            } else if (Object.keys(thing).length === 0) {
                empty = true;
            }
            break;
        default:
            empty = true;
    }

    return empty;
}


export const isLength = (str, options) => {

    if (isEmpty(options)) {
        throw new Error("Who will provide the options you?")
    }

    let isValid = true;

    if (['string', 'number'].indexOf(typeof str) === -1) {
        isValid = false;
    } else {
        let len = 0;

        if (options.trim) {
            len = str.toString().trim().length;
        } else {
            len = str.toString().length;
        }

        if (typeof options.lt === 'number' && len >= options.lt) {
            isValid = false;
        } else if (typeof options.lte === 'number' && len > options.lte) {
            isValid = false;
        } else if (typeof options.gt === 'number' && len <= options.gt) {
            isValid = false;
        } else if (typeof options.gte === 'number' && len < options.gte) {
            isValid = false;
        }
    }

    return isValid;
}

export const isContainWhiteSpace = (str) => {

    if (typeof str === 'string' || typeof str === 'number') {
        return str.toString().trim().indexOf(' ') !== -1;
    } else {
        return false;
    }
}