const returnObjectIfValue = (value) => {
    return Object.keys(value).length ? value : undefined;
}
module.exports = {
    returnObjectIfValue,
};