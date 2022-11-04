const money = function (value) {
    return Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
}
const optionText = function (itemValue = '', selects = [],) {
    if (!selects || !selects.length) {
        return
    }
    const targetItem = selects.find(item => {
        return item.value === itemValue
    })
    if (targetItem) {
        return targetItem.text
    }
    return ''
}
const date = function (dateString) {
    if (!dateString) {
        return
    }
    const date = new Date(dateString)
    const formatter = new Intl.DateTimeFormat("zh", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
    const formatResult = formatter.format(date)
    return formatResult
}
const time = function (dateString) {
    if (!dateString) {
        return
    }
    const date = new Date(dateString)
    const formatter = new Intl.DateTimeFormat("zh", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    })
    const formatResult = formatter.format(date)
    return formatResult
}
const rank = function (score) {
    if (!score) {
        return 0
    }
    const level = (score * 100) / 5
    const ceil = Math.ceil(level)
    const normalized = Math.floor(ceil * 5)
    return normalized
}
const salary = function (item) {
    let expression = ""
    const { salaryType = "", salaryMin = 0, salaryMax = 0, incentiveCompensation = 0 } = item
    const formattedMax = Math.max(Number(salaryMin), Number(salaryMax))
    switch (salaryType) {
        case "monthly": {
            const lowerBoundInK = Math.floor(salaryMin / 1000)
            const upperBoundInK = Math.floor(formattedMax / 1000)
            expression = `月薪 ${lowerBoundInK}K ~ ${upperBoundInK}K`
            break
        }
        case "daily": {
            const formatLowerBound = salaryMin.toLocaleString()
            const formatUpperBound = formattedMax.toLocaleString()
            expression = `日薪 ${formatLowerBound} ~ ${formatUpperBound}`
            break
        }
        case "hourly": {
            const formatLowerBound = salaryMin.toLocaleString()
            const formatUpperBound = formattedMax.toLocaleString()
            expression = `時薪 ${formatLowerBound} ~ ${formatUpperBound}`
            break
        }
        case 'yearly': {
            const salaryMinTenThou = Math.ceil(Number(salaryMin / 10000).toPrecision(3))
            const salaryMaxTenThou = Math.ceil(Number(formattedMax / 10000).toPrecision(3))
            const formatLowerBound = salaryMinTenThou.toLocaleString()
            const formatUpperBound = salaryMaxTenThou.toLocaleString()
            expression = `年薪 ${formatLowerBound}萬 ~ ${formatUpperBound}萬`
            break
        }
        default: {
            if (salaryType) {
                // eslint-disable-next-line
                alert("salaryType Exception.")
            }
        }
    }
    return expression
}
export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            filter: {
                money,
                optionText,
                date,
                time,
                rank,
                salary
            },
            // deprecated
            money,
            optionText,
            date,
            time,
            rank,
            salary
        }
    }
})
