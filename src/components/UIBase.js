
export default class UIBase
{
    constructor()
    {
        // checkall flag
        UIBase.checkAllFlag = true;
    }

    static sortData(data)
    {
        return data.sort( (a, b) => a.title.localeCompare(b.title) );
    }

    static resetCheckAll(element, flag)
    {
        if(flag === true) {
			element.setAttribute('checked', true) 
		} else {
			element.removeAttribute('checked') 
		}
    }
    
    static resetFlag(todo)
	{
		if(todo.completed === false)
		{
			UIBase.checkAllFlag = false;
		} 
    }
    
    static setCheckboxAttrs(obj, status, checked) 
    {
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
    }
    
    static setTableRowAttrs(obj, status)
    {
        for(let prop in obj)
        {
            if (obj.hasOwnProperty(prop))
            { 
                obj[prop].setAttribute('class', status);
            }
        }
    }
} 