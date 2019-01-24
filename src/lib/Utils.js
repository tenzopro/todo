/**
 * check if field value is empty or not
 * @param {*} field 
 * returns @bool true/false
 */
const isEmpty = (field=null) => {
    return (field ===null || field.trim().length===0) ? true : false;
};

/**
 * checks if field has characters less or equal to 5:
 * a minimum required for any input field
 * @param {*} field 
 * returns @bool true/false
 */
const isLessThan = (field=null) => {
    return (field.length <= 5) ? true : false;
};

const mergeObjs = (objArr, newObj) => {
    let newArr = objArr.filter(obj => obj.id !== newObj[0].id);
    return [...newArr, newObj[0]];
};

export { isEmpty, isLessThan, mergeObjs };