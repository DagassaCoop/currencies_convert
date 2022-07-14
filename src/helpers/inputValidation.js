export function inputValidation (str) {
    const reg = new RegExp(/^-?\d+\.?\d*$/)
    return reg.test(str)
}