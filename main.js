const url = 'https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json';

fetch(url).then(res =>res.json()).then(res=>{
    let eventos = []
    let mcc = []
    llenarTabla1(res)
    matriz(res, eventos, mcc)
    llenarTabla2(eventos,mcc)
})

function llenarTabla1(contenido) {
    const tabla1 = document.getElementById("contenido1");
    x = 1;
    contenido.forEach(dato => {
        let fila = document.createElement("tr");
        let indice = document.createElement("th");
        let eventos = document.createElement("td");
        let ardilla = document.createElement("td");
        let nodo = document.createTextNode(x)
        indice.appendChild(nodo)
        nodo=document.createTextNode(dato.events)
        eventos.appendChild(nodo)
        nodo=document.createTextNode(dato.squirrel)
        ardilla.appendChild(nodo)
        fila.appendChild(indice)
        fila.appendChild(eventos)
        fila.appendChild(ardilla)
        if(dato.squirrel) {
            fila.classList.add("table-danger")
        }
        tabla1.appendChild(fila)
        x++;
    });
}

function matriz(contenido, eventos, mcc) {
    contenido.forEach(dato => {
        dato.events.forEach(evento => {
            if(!containsObject(evento, eventos)){
                let fn = 0
                let tp = 0
                let tn = 0
                let fp = 0
                contenido.forEach(fila => {
                    if(containsObject(evento, fila.events) && fila.squirrel){
                        tp++
                    }
                    else if(containsObject(evento, fila.events)&& !fila.squirrel){
                        fn++
                    }
                    else if(!containsObject(evento, fila.events)&& fila.squirrel){
                        fp++
                    }
                    else{
                        tn++
                    }
                })
                let valor = ((tp*tn)-(fp*fn))/Math.sqrt((tp+fp)*(tp+fn)*(tn+fp)*(tn+fn));
                eventos.push(evento)
                mcc.push(valor)
            }
        })
    })
}

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}

function indexOfMax(list) {
    var max = list[0];
    var maxIndex = 0;

    for (var i = 1; i < list.length; i++) {
        if (list[i] > max) {
            maxIndex = i;
            max = list[i];
        }
    }
    return maxIndex;
}

function llenarTabla2(eventos, mcc){
    let nuevoEventos = []
    let nuevoMcc = []

    while(eventos.length!=0) {
        let maximo = indexOfMax(mcc)
        nuevoEventos.push(eventos[maximo])
        nuevoMcc.push(mcc[maximo])
        eventos.splice(maximo,1)
        mcc.splice(maximo,1)
    }
    eventos=nuevoEventos
    mcc=nuevoMcc
    
    const tabla2 = document.getElementById("contenido2");
    x = 1;
    eventos.forEach(dato => {
        let fila = document.createElement("tr");
        let indice = document.createElement("th");
        let eventos = document.createElement("td");
        let num = document.createElement("td");
        let nodo = document.createTextNode(x)
        indice.appendChild(nodo)
        nodo=document.createTextNode(dato)
        eventos.appendChild(nodo)
        nodo=document.createTextNode(mcc[x-1])
        num.appendChild(nodo)
        fila.appendChild(indice)
        fila.appendChild(eventos)
        fila.appendChild(num)
        tabla2.appendChild(fila)
        x++;
    });
}