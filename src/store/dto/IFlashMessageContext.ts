export interface IFlashMessageContext {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}
