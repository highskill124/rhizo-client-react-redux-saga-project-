export function debounce(callback, wait, context) {
    let timeout;
    return (...rest) => {
        const result = timeout ? Promise.resolve(null) : Promise.resolve(callback.apply(context, rest));
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
        }, wait);
        return result;
    };
}
