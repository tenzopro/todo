import Errors from './Errors';

export default class Validation 
{

    static validate(rules, data) 
    {
        let valid = true;

        rules.forEach((rule, index) => {

            let callbacks = rule.title.split('|');

            callbacks.forEach(callback => {

                let value = (data[index]) ? data[index] : null;

                let fieldName = Object.keys(data[0])[0];

                if(Validation[callback](value, fieldName) === false) 
                { 
                    valid = false
                }
                
            });
        });

        return valid;
    }

    static min(value=null, fieldName)
    {
        let valid = null;

        if(Validation.lessThan(value._name) === true) 
        {
            valid = false;
            Errors.set(`${fieldName} must be more than 5 characters.`);
        }  
        else {
            valid = true;
        }

        return valid;
    }

    static required(value=null, fieldName)
    {
        let valid = null;

        if(Validation.empty(value._name) ===true) 
        {
            valid = false;
            Errors.set(`${fieldName} is reqired`);
        } else {
            valid = true;
        }

        return valid;
    }

    static empty(field=null)
    {
        return (field ===null || field.trim().length===0) ? true : false;
    }

    static lessThan(field=null)
    {
        return (field.length <= 5) ? true : false;
    }

}