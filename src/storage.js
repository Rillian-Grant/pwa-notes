function getList() {
    var list = JSON.parse(localStorage.getItem("_list"));
    if (list === null) {
        console.log("Couldn't get the list of notes. Creating new")
        list = [];
    }

    return list;
}

function putList(list) {
    localStorage.setItem("_list", JSON.stringify(list))
}

function put(title, contents) {
    var list = getList();
    localStorage.setItem(title, contents);
    list.append(title);
    putList(list);
}

function get(title) {
    var list = getList();
    if (list.includes(title)) {
        return(localStorage.getItem(title))
    } else {
        console.log("Error cannot get: " + title)
    }
}

export default { get, put, getList, putList }