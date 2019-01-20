export default class Validation 
{
    constructor(){
        this._errors = [];
    }

    // getErrors()
    // {
    //     return this._errors;
    // }

    setErrors(msg)
    {
        this._errors.push(msg);
    }

    validate(rules, data) 
    {
        const validation = new Validation();
        let _errors = null;
        let valid = true;

        rules.forEach((rule, index) => {

            let callbacks = rule.title.split('|');

            callbacks.forEach(callback => {

                let value = (data[index]) ? data[index] : null;

                let fieldName = Object.keys(data[0])[0];

                if(validation[callback](value, fieldName) === false) 
                { 
                    valid = false
                }
                
            });
        });

        if(valid===false) { 
            _errors = validation._errors;
            this.setErrors(_errors); 
        }

        return valid;
    }

    min(value=null, fieldName)
    {
        let valid = null;

        if(this.lessThan(value._name) === true) 
        {
            valid = false;
            this.setErrors(`${fieldName} must be more than 5 characters.`);
        }  
        else {
            valid = true;
        }

        return valid;
    }

    required(value=null, fieldName)
    {
        let valid = null;

        if(this.empty(value._name) ===true) 
        {
            valid = false;
            this.setErrors(`${fieldName} is reqired`);
        } else {
            valid = true;
        }

        return valid;
    }

    empty(field=null)
    {
        return (field ===null || field.trim().length===0) ? true : false;
    }

    lessThan(field=null)
    {
        return (field.length <= 5) ? true : false;
    }

}