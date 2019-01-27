/**
 * check if field value is empty or not
 * @param {*} field 
 * returns @bool true/false
 */
const isEmpty = (field=null) => {
    return (field ===null || field.trim().length===0 || field ===false ) ? true : false;
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

const sortData = (data) => {
    return data.sort( (a, b) => a.title.localeCompare(b.title) );
};

const setCheckboxAttrs = (obj, status, checked) => {
    
    for(let prop in obj)
    {
        if (obj.hasOwnProperty(prop))
        { 
            if(status===true) 
            {
                obj[prop].setAttribute('checked', checked);
            }
            else 
            {
                obj[prop].removeAttribute('checked');
            }
        }
    }
};

const setTableRowAttrs = (obj, status) => {
    
    for(let prop in obj)
    {
        if (obj.hasOwnProperty(prop))
        { 
            obj[prop].setAttribute('class', status);
        }
    }
};


export { isEmpty, isLessThan, mergeObjs, sortData, setTableRowAttrs, setCheckboxAttrs };