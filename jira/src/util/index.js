const isFalsy = (value) => value === 0 ? false : !value
// 取俩遍反是为了获得该值的布尔值
export const cleanObject = (object) => {
    const result = { ...object }
    Object.keys(result).forEach(key => {
        const value = object[key]
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}