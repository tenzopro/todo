/**
 * check if field value is empty or not
 * @param {*} field 
 * returns @bool true/false
 */
const isEmpty = (field=null) => {
    if(typeof field !== 'string') 
    {
        return true;
    }
    return (field == null || field.trim().length==0 || field =='' ) ? true : false;
};

/**
 * checks if field has characters less or equal to 5:
 * a minimum required for any input field
 * @param {*} field 
 * returns @bool true/false
 */
const isLessThan = (field) => {
    return (field.length < 6) ? true : false;
};

const mergeObjs = (objArr, newObj) => {
    let newArr = objArr.filter(obj => obj.id !== newObj.id);
    return [...newArr, newObj];
};

const sortData = (data) => {
    return data.sort( (a, b) => a.title.localeCompare(b.title) );
};

export { isEmpty, isLessThan, mergeObjs, sortData };