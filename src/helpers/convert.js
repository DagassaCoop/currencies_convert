export function convert(data, type, firstTitle, firstValue, secondTitle, secondValue) {

    let firstRate = data.filter(el => {
        return el.cc === firstTitle
    })[0].rate

    let secondRate = data.filter(el => {
        return el.cc === secondTitle
    })[0].rate

    function calculate() {
        let rate = type === '1'
            ? firstRate/secondRate
            : secondRate/firstRate

        let result = type === '1'
            ? firstValue * rate
            : secondValue * rate

        return result.toFixed(2)
    }

    return calculate()
}