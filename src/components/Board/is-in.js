export const isInArr = (arrx = 0, arry = 0, arr = []) => {
    return arr.find((el) => el[0] === arrx && el[1] === arry);
}
export const isInArrIndex = (arrx = 0, arry = 0, arr = []) => {
    return arr.findIndex((ele) => ele[0] === arrx && ele[1] === arry);
}
