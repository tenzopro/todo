/**
 * Error handling class
 * contains errors class property
 * and get & set class methods
 */

export default class Errors 
{
    constructor()
    {
        // initialize errors property to empty array
        Errors.errors = [];
    } 

    // returns errors array
    static get()
    {
        return Errors.errors;
    }

    // sets values to errors property
    static set(errMsg=null)
    {
        Errors.errors.push(errMsg);
    }
}