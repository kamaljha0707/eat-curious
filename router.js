let route =(event)=>{
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, '' , event.target.href);
    handleLocation();
}

let routes = {
    404 : '/pages/404.html',
    "/": '/index.html',
    "/products" :'/product.html',
    "/recipes" : '#recipes',
    "/about" : '#about'
}

let handleLocation  = async ()=>{
    let path = window.location.pathname;
    if(path.length == 0){
        path = '/'
    }
    let route = routes[path] ;
    let html = await fetch(route).then((data) => data.text());
    document.querySelector('.main').innerHTML = html
}

window.onpopstate = handleLocation
window.route = route;
handleLocation()


handleLocation();