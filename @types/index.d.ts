/**
 * Note that this extension is going to be available in your whole project not just the file you define it in.
 */
declare global {
    interface Window {
        store: any;
    }
}
window.store = {};
