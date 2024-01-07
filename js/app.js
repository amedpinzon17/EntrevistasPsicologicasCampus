//0. Odenar base de datos (ARRAS DE OBJETOS)
console.log(campers);

campers.sort((a,b) =>{
    if(a.nombre < b.nombre){
        return -1
    }

    if  (a.nombre > b.nombre){
        return 1
    }

    return 0
})

//1. lenar dinamicamente valores del elemneto select con nombres de csmpers

campers.forEach((camper)=>{
    const option = document.createElement('option'); 
    option.value = camper.nombre;
    option.textContent = camper.nombre;
    document.querySelector('#camper').appendChild(option);
})

//2. SLECORES INPUT DEL FORMULARIO

const camperInput = document.querySelector('#camper')
const psicologa = document.querySelector('#psicologa')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const resultados = document.querySelector('#resultados')

//3.SELECTORES D4E FORMULARIO Y CONTENEDOR DE RESULTADOS
//3.1 FORMULARIO
const formulario = document.querySelector('#nueva-entrevista')
//3.2 CONATINER
const contenedorEntrevista = document.querySelector('#entrevistas')

//12.LISTENERS  FORMULARIO
formulario.addEventListener('submit', nuevaEntrevista);

//4. LISTENER/EVENTS

eventListeners();

function eventListeners(){
    camperInput.addEventListener('change',datoEntrevista);
    //8. añadir los demas avenListerners
    psicologa.addEventListener('change',datoEntrevista);
    fechaInput,addEventListener('change',datoEntrevista);
    horaInput.addEventListener('change', datoEntrevista);
    resultados.addEventListener('change', datoEntrevista);
}

//6. pbjeto con propiedades que tiene como valor los input de formulario    
const entrevisteObject = {
    camper: '',
    //9.AGREGAR LAS DEMAS PROPIRDAREES DEL OBJETO ENTREVISTA
    psicologa: '',
    hora: '',
    resultados: '',
}

console.log(entrevisteObject);

//5. FUNCIONES

function datoEntrevista(e){
    console.log(e.target.value);

    //7. guaradar en cda propiedad 
    entrevisteObject[e.target.name] = e.target.value;
}

//10. CLASES
class Interviws{
    constructor(){
        //11.1 CONSTRnuevaEntrevistaUCTOR
        this.interviws = [];
    }

    //16.2 METODO DE LA CLASE QUE AGREGA UNA ENTREVISTA
    addINterviws(interviws){
        this.interviws= [...this.interviws,interviws];
        console.log(this.interviws);
    }
}

class UserInterface{

    //15.2 metofdo para gestion dce errores o confirmaciones de la interfaz de usuario

    printAlert(mensaje, tipo){

        //15.3 crear el div

        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')


        //15.4 
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success')
        }

        //15.5 mensaje de error
        divMensaje.textContent = mensaje

        //15.6 insertar en el DOM

        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-entrevista'))

        //15.7 quitar el alert despues de tres segundos 
        setTimeout(() =>{
            divMensaje.remove();
        },3000)

     }
     //17.1 METODO POARA INPIRMIR ENTREVISTAS 
     printInterviws({interviws}){//plaicar destructuring desde funcion 
        limpiar()
        interviws.forEach((interviw) =>{
            
            const {camper, psicologa, fecha, hora, resultados, id, img} = interviw
            const interviwHTML = document.createElement('p')
            interviwHTML.innerHTML = `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="/img/${img}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${camper}</h5>
                            <p class="card-text">${psicologa}</p>
                            <p class="card-text">${fecha}</p>
                            <p class="card-text">${hora}</p>
                            <p class="card-text"><small class="text-body-secondary"></small>${resultados}</p>
                        </div>
                        </div>
                    </div>
                </div>
            `;
            contenedorEntrevista.appendChild(interviwHTML)
        })
     }
}

function limpiar(){
    let m = document.querySelectorAll('p');
    for (let n = 0 ; n < m.length ; n++){
        m[n].remove();
    }
}

//11. INSTACIAR LAS CLASES DE INTERVIWS Y USERFACES       

const interviwsManager = new Interviws();
const userInterface = new UserInterface();

//13. FUNCION PARA VALIDAR Y ENTREGAR UNA NUEVA ENTREVISTA PSOLOCOLOGIA

function nuevaEntrevista(e){
    e.preventDefault();

    //14.DESTRUCTURING DESDE OBJETO DE ENTREVISTAS

        const {camper, psicologa, hora, fecha, resultados} = entrevisteObject

        //15. validar

        if(camper ===''|| psicologa === '' || hora === ''|| fecha === '' || resultados === '' ){

        //15.1 LLAMADO METODO DEL OBJETO USERINTERFACE

        userInterface.printAlert('TODOS LOS CAMPOS SON OBLIGATORIOS', 'error')
            return;

        }


        //16. gestien de un nuevo registro
        //16.1 gemerara un ID unico

        entrevisteObject.ID = Date.now()


    //agregar imagen al objeto buscandolo en campers
        let index = campers.findIndex(e => e.nombre === entrevisteObject.camper);
        if( index !== -1){
            entrevisteObject.img = campers[index].imagen;
            index = null;
        }
        


        //16.3INVICAR METODO QUE AÑADE LA ENTREVISTA
        interviwsManager.addINterviws({...entrevisteObject})

        //16.4 REINICIAR FORMULARIO
        formulario.reset();

        ///16.5 REINICIAR OBJETO 
        reiniarObjeto();


        //17. IMPRIMIR HTML DE ENTREVISTA

        userInterface.printInterviws(interviwsManager);
  }
  

function reiniarObjeto(){
    entrevisteObject.camper = '';
    entrevisteObject.psicologa = '';
    entrevisteObject.fecha = '';
    entrevisteObject.resultados = '';
    entrevisteObject.id = '';
    entrevisteObject.img = '';
}


























































