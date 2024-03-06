declare const onChange: <T extends object>(object: T, onChange: Record<string, (newValue: any, previousValue: any, updatedObject: T) => void> | ((propName: string, newValue: any, previousValue: any, updatedObject: T) => void), thisArg?: {}) => T;
export { onChange };
