export function useHeight(multiply = 1) {
    console.log(window.innerHeight);
    if (!document.body.getBoundingClientRect().height) {
        return window.innerHeight - (48 * multiply);
    }
    return document.body.getBoundingClientRect().height - (48 * multiply);
}
