//fonction update du local storage et recup

export function storeToLocal(where, what) {
    return localStorage.setItem(where, JSON.stringify(what));
}
export function recupLocal(where) {
    return JSON.parse(localStorage.getItem(where));
}