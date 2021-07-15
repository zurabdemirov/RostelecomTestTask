export const formatQuery = (obj) => {
    return Object.keys(obj).map((k) => {
        return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
    }).join('&')
}