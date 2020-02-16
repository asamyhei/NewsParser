window.onload = () => {
   /* fetch("http://localhost:9001/news?categories=LEFIGARO")
        .then(response => response.json())
        .then(response => console.log(response));*/
};

const getAll = () => {
    fetch("http://localhost:9001/news")
        .then(response => response.json())
        .then(response => console.log(response));
};

const getCategorie = (categories) => {
    fetch("http://localhost:9001/news", {})
        .then(response => response.json())
        .then(response => {
            response.forEach(res => {
                const body = document.getElementsByTagName('body')[0];
                body.append('<p>', res.title);
            })
        });
};