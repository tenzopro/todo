
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

    static setAttrs(obj, status, checked) 
    {
        if(typeof checked === 'boolean')
        {
            UIBase.unsetCheckbox(obj, status);
            UIBase.setTableRowAttrs(obj, status);
        } else
        {
            UIBase.setCheckbox(obj, status, checked);
            UIBase.setTableRowAttrs(obj, status);
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

    static setCheckbox(obj, status, checked) 
    {
        for(let prop in obj)
        {
            if (obj.hasOwnProperty(prop))
            { 
                obj[prop].setAttribute('checked', checked);
            }
        }
    }

    static unsetCheckbox(obj, status, checked) 
    {
        for(let prop in obj)
        {
            if (obj.hasOwnProperty(prop))
            { 
                obj[prop].removeAttribute('checked');
            }
        }
    }
} 