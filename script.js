// Link Class
class Link {
    constructor(title,description,link){
        this.title = title;
        this.description = description;
        this.link = link
    }
}

//UI Class: Handles the UI
class UI {
    //methods: display books
    static displayLinks(){

        const links = Store.getLinks();

        links.forEach((link) => {
            UI.addLinkToList(link)
        });
    }

    static addLinkToList(link){
        const list = document.querySelector('#link-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="value"><p>${link.title}</p></td>
            <td class="value"><p>${link.description}</p></td>
            <td class="value"><a href=${link.link} class="btn btn-outline-info click">Visit Site</a></td>
            <td><a href="#" class="btn btn-danger btn-md delete"><i class="fas fa-trash"></i></a></td>
        `;
        
        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#description').value = '';
        document.querySelector('#link').value = '';
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#link-form');
        container.insertBefore(div,form);

        //Remove after sometime
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static deleteLinks(ele){
        if (ele.classList.contains('delete')){
            ele.parentElement.parentElement.remove();
        }
    }
}

//Store Class: Local Storage Handler
class Store{
    static getLinks(){
        let links;
        if(localStorage.getItem('links') === null){
            links = [];
        }else {
            links = JSON.parse(localStorage.getItem('links'));
        }
        return links
    }

    static addLinks(newLink){
        const links = Store.getLinks();
        links.push(newLink);

        localStorage.setItem('links', JSON.stringify(links))
    }

    static deleteLinks(ourLink){
        const links = Store.getLinks();
        links.forEach((link,index) => {
            if(link.link === ourLink){
                links.splice(index, 1);
            }
        });

        localStorage.setItem('links',JSON.stringify(links))
    }
}

// UI-Events Events in UI

//Display Links
document.addEventListener('DOMContentLoaded', UI.displayLinks());

//Add A Link
document.querySelector("#link-form").addEventListener('submit', (e) => {

    e.preventDefault();
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const link = document.querySelector('#link').value;

    //Validation
    if(title === '' || description === '' || link === ''){
        //Show Warning
        UI.showAlert('Please Fill All The Fields', 'warning');
    }else {
        //Create A Link Object
        const newLink = new Link(title,description,link);

        //Add Link to UI
        UI.addLinkToList(newLink);

        //Add Link to store
        Store.addLinks(newLink);

        //Show success
        UI.showAlert('Sucessfully Added to list', 'success');

        //Clear the fields
        UI.clearFields();

    }
 
})

//Remove A Link
document.querySelector('#link-list').addEventListener('click', (e) => {
    UI.deleteLinks(e.target);

    //Remove Link from Storage
    console.log(e.target.parentElement.previousElementSibling.querySelector('.click').getAttribute('href'))
    Store.deleteLinks(e.target.parentElement.previousElementSibling.querySelector('.click').getAttribute('href'));

    UI.showAlert('You have Sucessfully Deleted Element from List', 'danger')
})


