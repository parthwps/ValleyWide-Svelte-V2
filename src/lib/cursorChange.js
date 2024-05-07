export function loadingCursor() {
    setTimeout(() => {
        document.body.style.cursor = 'default'; // default on load
    }, 1000);
}