export const calculateAge = (birthDate) => {
    var diff_ms = Date.now() - birthDate.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export const monthNumber = (month) => {
    const monthMap = {
        'Not Selected':0,
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12
    };
    const selectedMonthName = month;
    const selectedMonthNumber = monthMap[selectedMonthName];
    return selectedMonthNumber
}

export const monthName = (month) => {
    const monthMap = {
        'Not Selected':0,
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12
    };

    const reverseMonthMap = {};
    for (const key in monthMap) {
        const value = monthMap[key];
        reverseMonthMap[value] = key;
    }

    if (typeof month === 'number' && month >= 1 && month <= 12) {
        return reverseMonthMap[month];
    } else {
        throw new Error('Invalid month number');
    }
}
