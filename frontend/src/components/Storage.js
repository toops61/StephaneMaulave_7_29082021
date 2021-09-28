//fonction update du local storage et recup

function storeToLocal(where, what) {
    localStorage.setItem(where, JSON.stringify(what));
}
function recupLocal(what, where) {
    what = JSON.parse(localStorage.getItem(where));
}