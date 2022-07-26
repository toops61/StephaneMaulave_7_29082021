//fonction update du local storage et recup

export function storeToLocal(where, what) {
    localStorage.setItem(where, JSON.stringify(what));
}
export function recupLocal(where) {
    JSON.parse(localStorage.getItem(where));
}