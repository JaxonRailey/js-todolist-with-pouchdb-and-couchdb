$ = document.querySelector.bind(document);

class Todo {

    db = null;

    constructor() {
        this.db = new PouchDB('todo');

        PouchDB.sync('todo', 'http://admin:admin@127.0.0.1:5984/todo', {
            live: true,
            retry: true
        });

        this.db.allDocs({
            include_docs: true
        }).then((result) => {
            $('ul').innerHTML = '';
            result.rows.reverse().forEach(item => {
                $('ul').innerHTML += this.item(item.doc.text, item.doc._id);
            });
        });
    }

    item(text, id) {
        return '<li>' + this.sanitize(text) + '<button id="' + id +'" onclick="todo.delete(\'' + id + '\')"><span></span></button></li>';
    }

    add(text) {
        this.db.put({
            _id: 'id' + Date.now(),
            text: text
        }).then((result) => {
            this.db.get(result.id).then((doc) => {
                const html = $('ul').innerHTML;
                $('ul').innerHTML  = this.item(doc.text, doc._id);
                $('ul').innerHTML += html;
            });

            $('input').value = '';
        });
    }

    delete(id) {
        this.db.get(id).then((doc) => {
            return this.db.remove(doc);
        }).then((result) => {
            $('#' + result.id).parentElement.remove();
        });
    }

    sanitize(string) {
        return string.replace(/[^\w. ]/gi, function(letter) {
            return '&#' + letter.charCodeAt(0) + ';';
        });
    };
}

const todo = new Todo();

$('input').addEventListener('keypress', function(event) {
    if (this.value.length && event.key === 'Enter') {
        todo.add(this.value);
    }
});