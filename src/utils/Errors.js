export default class Errors 
{
    constructor()
    {
        Errors.errors = [];
    } 

    static get()
    {
        return Errors.errors;
    }

    static set(errMsg=null)
    {
        Errors.errors.push(errMsg);
    }
}