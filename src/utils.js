export const getFromSessionStorageOrDefault = (key, defaultValue, setState) => {
    let value = JSON.parse(sessionStorage.getItem(key))
    if (value != null) setState(value)
    else sessionStorage.setItem(key, JSON.stringify(defaultValue))
}
export const getFromLocalStorageOrDefault = (key, defaultValue, setState) => {
    let value = JSON.parse(localStorage.getItem(key))
    if (value != null) setState(value)
    else localStorage.setItem(key, JSON.stringify(defaultValue))
}