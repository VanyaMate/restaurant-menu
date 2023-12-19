export const toInt = function (value: any, defaultValue?: number): number {
    const intValue: number = parseInt(value);
    return isNaN(intValue) ? (defaultValue ?? 0) : intValue;
};