//Jednostavan lib za manipulaciju js objektima

export function pushItem (key, item, data){
    const obj = {};
    obj[key] = item;
    data.push(obj);

    return data;
}

export function removeItem (id, data){
    data.splice(id , 1);

    return data;
}

export function editItem (id, key, item, data){
    const obj = {};
    obj[key] = item;
    data[id] = obj;

    return data;
}