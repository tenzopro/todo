import Errors from './Errors';

/**
 * NOTE: class subject to extention as theres 
 * a lot of methods that could potentially be added
 * eg: email, password etc
 */

 /**
  * Validation class validates any form input.
  * call validate class method and pass it rules & 
  * form data. Any errors are routed to Errors class within
  * its methods.
  */
export default class Validation 
{
    /**
     * cycles through inputs array and returns TRUE/FALSE
     * depending on whether there are errors or not
     * @param {*} rules 
     * @param {*} data 
     * returns @bool depending on whether form is valid on not
     */
    static validate(rules, data) 
    {
        // set valide to true unless something is wrong within data object
        let valid = true;

        // loop through rules first
        rules.forEach((rule, index) => {

            // extract rules into callback array.
            let callbacks = rule.title.split('|');

            // loop thru rules array
            callbacks.forEach(callback => {

                /**
                 * extract input data and set value variable
                 * extract keys from data object and set field name
                 * variable
                 */
                let value = (data[index]) ? data[index] : null;
                let fieldName = Object.keys(data[0])[0];

                // dynamically call this class methods and pass value and field name.
                if(Validation[callback](value, fieldName) === false) 
                { 
                    /**
                     * if false ie there was a problem: no input value 
                     * or value infringes some rule then set form validity to false.
                     */
                    valid = false;
                }
                
            });
        });

        // return whether form was valid or not
        return valid;
    }

    /**
     * Check if input has minimum character length
     * @param {*} value 
     * @param {*} fieldName 
     * Returns @bool true/false 
     */
    static min(value, fieldName)
    {
        // initialize validity
        let valid = true;

        // check if input is less that a certain minimum
        if(Validation.hasLessThan(value.name)) 
        {
            // if so set valid to false: input has less characters ...
            // than required
            valid = false;

            // set error message to errors class
            Errors.set(`${fieldName} must be more than 5 characters.`);
        } 

        // return validity
        return valid;
    }

    /**
     * Check input for missing value: input MUST contain value
     * @param {*} value 
     * @param {*} fieldName 
     * returns @bool true/false
     */
    static required(value, fieldName)
    {
        // initialize validity
        let valid = true;

        // check if input has empty string
        if(Validation.isEmpty(value.name)) 
        {
            // if so set validity to false: input is empty
            valid = false;
            
            // set error message to errors class
            Errors.set(`${fieldName} is required`);
        }

        // return valid
        return valid;
    }

    /**
     * check if field value is empty or not
     * @param {*} field 
     * returns @bool true/false
     */
    static isEmpty(value='')
    {
        return (value === "" || value.length === 0) ? true : false;
    }

    /**
     * checks if field has characters less or equal to 5:
     * a minimum required for any input field
     * @param {*} field 
     * returns @bool true/false
     */
    static hasLessThan(value)
    {
        return (value.length <= 5);
    }

}