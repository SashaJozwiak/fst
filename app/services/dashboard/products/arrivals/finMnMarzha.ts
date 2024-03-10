'use server'

export const finMarzha = (lastPrice: any, bonuses: any, costPrice: any) => {
    const arrB: any = [];

    function sumBonuses(bon: any) {
        if (bon < 1) {
            return;
        }
        arrB.push(bon)
        sumBonuses(bon / 2)
    }

    sumBonuses(bonuses)
    const res = arrB.reduce((partialSum: any, a: any) => partialSum + a, 0)
    const finRes = (lastPrice - costPrice - res) / costPrice * 100

    if (costPrice > 0) {
        console.log(+finRes.toFixed(2))
        return +finRes.toFixed(2);
    }

    return 0;
}
