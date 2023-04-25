let Deportistas = {};

Deportistas.form = {
    NOMBRE: "form-nombre",
    EDAD: "form-edad",
    CAMPEONATOSMUNDO: "form-c",
    PARTICIPACIONESJJOO: "form-participaciones",
    PAIS: "form-pais",
    CIUDAD: "form-ciudad",
    ALTURA: "form-altura",
    SEXO: "form-sexo",
    MEDALLASORO: "form-medallas-oro",
    MEDALLASBRONCE: "form-medallas-bronce",
    MEDALLASPLATA: "form-medallas-plata",
    RETIRADO: "form-retirado"
}

Deportistas.formularioDeportista = {}

Deportistas.ponerBotones = function(){
    let msj = Deportistas.botones;
    Frontend.Article.actualizar("Aplicación remo", msj)
}

Deportistas.botones=`<div>
<a href="javascript:Deportistas.listarNombres()" class="opcion-principal mostrar"
           title="Realiza un listado de los nombres de todos los deportistas que hay en la BBDD">Listar nombres Deportistas</a>
        <a href="javascript:Deportistas.crear()" class="opcion-principal mostrar"
           title="Realiza un formulario para crear un nuevo deportista">Crear nuevo deportista</a>
</div>`

// Cabecera del formulario
Deportistas.formularioDeportista.formulario = `
<form method='post' action='' class="listado-personas">

    <p>Nombre del deportista</p>
    <input type="text" class="form-persona-elemento editable" 
                        id="form-nombre" required 
                        name="nombre" value="nombrePrueba"/> 
    <p>Edad del deportista</p>           
    <input type="number" class="form-persona-elemento editable" 
                        id="form-edad" required
                        name="apellidos_persona" value="40"/>             
    <p>Campeonatos del mundo</p>  
    <input type="number" class="form-persona-elemento editable" 
                        id="form-c" required
                        name="apellidos_persona" value="0"/>          
    <p>Participaciones en JJOO(si hay varias, separarlas por comas)</p>  
    <input type="text" class="form-persona-elemento editable" 
                        id="form-participaciones" required
                        name="año_entrada_persona" value="1990,1994"/>            
    <p>Pais del deportista</p>  
    <input type="text" class="form-persona-elemento editable" 
                        id="form-pais" required 
                        name="nombre" value="España"/>            
    <p>Ciudad del deportista</p>  
    <input type="text" class="form-persona-elemento editable" 
                        id="form-ciudad" required 
                        name="nombre" value="Madrid"/>            
    <p>Altura del deportista</p>  
    <input type="number" class="form-persona-elemento editable" 
                        id="form-altura" required 
                        name="nombre" value="1.94"/>            
    <p>Sexo del deportista(H o M)</p>  
    <input type="text" class="form-persona-elemento editable" 
                        id="form-sexo" 
                        name="sexo" value="H"/>
    <p>Medallas de oro</p>        
    <input type="number" class="form-persona-elemento editable" 
                        id="form-medallas-oro" required 
                        name="nombre" value="0"/>           
    <p>Medallas de plata</p>
    <input type="number" class="form-persona-elemento editable" 
                        id="form-medallas-plata" required 
                        name="nombre" value="0"/>            
    <p>Medallas de bronce</p>
    <input type="number" class="form-persona-elemento editable" 
                        id="form-medallas-bronce" required 
                        name="nombre" value="1"/>           
    <p>¿El deportista está retirado? (S o N)</p>
    <input type="text" class="form-persona-elemento editable" 
                        id="form-retirado" required 
                        name="nombre" value="S"/>            
      
</form>
<br/><br/>
<div><a href="javascript:Deportistas.guardar()" style="margin-left: 32em;font-size: 20px;" class="opcion-principal mostrar">Guardar</a></div><br/>
<br/>`;

/// Objeto para almacenar los datos de la persona que se está mostrando
Deportistas.deportistaMostrado = null
Deportistas.vectorDeportistas = null

// Tags que voy a usar para sustituir los campos
Deportistas.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "EDAD": "### EDAD ###",
    "CAMPEONATOSMUNDO": "### CAMPEONATOS DEL MUNDO ###",
    "PARTICIPACIONESJJOO": "### PARTICIPACIONES JJOO ###",
    "PAIS": "### PAIS ###",
    "CIUDAD": "### CIUDAD ###",
    "ALTURA": "### ALTURA ###",
    "SEXO": "### SEXO ###",
    "MEDALLASORO": "### MEDALAS DE ORO ###",
    "MEDALLASPLATA": "### MEDALLAS DE PLATA ###",
    "MEDALLASBRONCE": "### MEDALLAS DE BRONCE ###",
    "RETIRADO": "### RETIRADO ###"
}
Deportistas.DatosNulos = `<h4>No se ha podido acceder correctamente a los datos</h4>`
Deportistas.DatosNoEncontrado = `<h4>Ninguno de los datos coincide con los criterios de búsqueda</h4>`
/// Plantilla para poner los datos de varias personas dentro de una tabla
Deportistas.tablaDeportistasDatos = {}
Deportistas.tablaDeportistasNombres = {}
Deportistas.tablaUnDeportista = {}
Deportistas.plantillaModifica = {}


// Cabecera de la tabla
Deportistas.tablaDeportistasDatos.cabecera = `
                    <div>
                    <input type="text" class="form-persona-elemento editable" 
                        id="filter-nombre" required 
                        name="nombre" value=""/> 
                        <a href="javascript:Deportistas.filtraNombreD()" class="opcion-principal mostrar">
                            Buscar
                        </a>
                        <a href="javascript:Deportistas.OrdenarAlfabeticamenteD()" class="opcion-principal mostrar">
                            Ordenar alfabéticamente
                        </a>
                        <a href="javascript:Deportistas.listarNombres()" class="opcion-principal mostrar">
                            listar Nombres
                        </a>
                    </div>
                    <table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">ID</th>
                        <th width="10%">Nombre</th>
                        <th width="5%">Edad</th>
                        <th width="15%">Campeonatos del mundo</th>
                        <th width="15%">Participaciones en JJOO</th>
                        <th width="5%">Medallas de oro</th>
                        <th width="5%">Medallas de plata</th>
                        <th width="5%">Medallas de bronce</th>
                        <th width="10%">Pais</th>
                        <th width="10%">Ciudad</th>
                        <th width="5%">Altura</th>
                        <th width="5%">Sexo</th>
                        <th width="10%">Retirado</th>
                        <th width="15%">Acciones</th>
                    </thead>
                    <tbody>
    `;

Deportistas.tablaDeportistasNombres.cabecera = `
                    <div>
                        <input type="text" class="form-persona-elemento editable" 
                            id="filter-nombre" required 
                            name="nombre" value=""/> 
                        <a href="javascript:Deportistas.filtraNombreN()" class="opcion-principal mostrar">
                            Buscar
                        </a>
                        <a href="javascript:Deportistas.OrdenarAlfabeticamenteN()" class="opcion-principal mostrar">
                            Ordenar alfabéticamente
                        </a>
                        <a href="javascript:Deportistas.listarDatos()" class="opcion-principal mostrar">
                            listar Datos
                        </a>
                        
                    </div>
                    <table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">ID</th>
                        <th width="15%">Nombre</th>
                        <th width="15%">Acciones</th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
Deportistas.tablaDeportistasDatos.cuerpo = `
    <tr title="${Deportistas.plantillaTags.ID}">
        <td>${Deportistas.plantillaTags.ID}</td>
        <td>${Deportistas.plantillaTags.NOMBRE}</td>
        <td>${Deportistas.plantillaTags.EDAD}</td>
        <td>${Deportistas.plantillaTags.CAMPEONATOSMUNDO}</td>
        <td>${Deportistas.plantillaTags.PARTICIPACIONESJJOO}</td>
        <td>${Deportistas.plantillaTags.MEDALLASORO}</td>
        <td>${Deportistas.plantillaTags.MEDALLASPLATA}</td>
        <td>${Deportistas.plantillaTags.MEDALLASBRONCE}</td>
        <td>${Deportistas.plantillaTags.PAIS}</td>
        <td>${Deportistas.plantillaTags.CIUDAD}</td>
        <td>${Deportistas.plantillaTags.ALTURA}</td>
        <td>${Deportistas.plantillaTags.SEXO}</td>
        <td>${Deportistas.plantillaTags.RETIRADO}</td>
        <td>
        <div><a href="javascript:Deportistas.mostrar('${Deportistas.plantillaTags.ID}')" class="opcion-principal mostrar">Mostrar</a></div> 
        <div><a href="javascript:Deportistas.borrarD('${Deportistas.plantillaTags.ID}')" class="opcion-principal borrar">Borrar</a></div>
        </td>
    </tr>
    `;


Deportistas.tablaUnDeportista.cabecera = `
                    <table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">ID</th>
                        <th width="10%">Nombre</th>
                        <th width="5%">Edad</th>
                        <th width="15%">Campeonatos del mundo</th>
                        <th width="15%">Participaciones en JJOO</th>
                        <th width="5%">Medallas de oro</th>
                        <th width="5%">Medallas de plata</th>
                        <th width="5%">Medallas de bronce</th>
                        <th width="10%">Pais</th>
                        <th width="10%">Ciudad</th>
                        <th width="5%">Altura</th>
                        <th width="5%">Sexo</th>
                        <th width="10%">Retirado</th>
                        <th width="15%">Acciones</th>
                    </thead>
                    <tbody>
    `;

Deportistas.tablaUnDeportista.cuerpo = `
    <tr title="${Deportistas.plantillaTags.ID}">
        <td>${Deportistas.plantillaTags.ID}</td>
        <td>${Deportistas.plantillaTags.NOMBRE}</td>
        <td>${Deportistas.plantillaTags.EDAD}</td>
        <td>${Deportistas.plantillaTags.CAMPEONATOSMUNDO}</td>
        <td>${Deportistas.plantillaTags.PARTICIPACIONESJJOO}</td>
        <td>${Deportistas.plantillaTags.MEDALLASORO}</td>
        <td>${Deportistas.plantillaTags.MEDALLASPLATA}</td>
        <td>${Deportistas.plantillaTags.MEDALLASBRONCE}</td>
        <td>${Deportistas.plantillaTags.PAIS}</td>
        <td>${Deportistas.plantillaTags.CIUDAD}</td>
        <td>${Deportistas.plantillaTags.ALTURA}</td>
        <td>${Deportistas.plantillaTags.SEXO}</td>
        <td>${Deportistas.plantillaTags.RETIRADO}</td>
        <td><a href="javascript:Deportistas.modificar()" class="opcion-principal mostrar">Modificar</a></td>
        
    </tr>
    `;


Deportistas.plantillaModifica.cuerpo = `
    <tr title="${Deportistas.plantillaTags.ID}">
        <td>${Deportistas.plantillaTags.ID}</td>
        <td><input type="text" class="form-persona-elemento editable" 
                        id="modifica-nombre" required 
                        name="nombre" value="${Deportistas.plantillaTags.NOMBRE}" /> </td>
        <td>${Deportistas.plantillaTags.EDAD}</td>
        <td>${Deportistas.plantillaTags.CAMPEONATOSMUNDO}</td>
        <td>${Deportistas.plantillaTags.PARTICIPACIONESJJOO}</td>
        <td>${Deportistas.plantillaTags.MEDALLASORO}</td>
        <td>${Deportistas.plantillaTags.MEDALLASPLATA}</td>
        <td>${Deportistas.plantillaTags.MEDALLASBRONCE}</td>
        <td>${Deportistas.plantillaTags.PAIS}</td>
        <td>${Deportistas.plantillaTags.CIUDAD}</td>
        <td>${Deportistas.plantillaTags.ALTURA}</td>
        <td>${Deportistas.plantillaTags.SEXO}</td>
        <td>${Deportistas.plantillaTags.RETIRADO}</td>
        <td><a href="javascript:Deportistas.guardarModificacion('${Deportistas.plantillaTags.ID}')" class="opcion-principal mostrar">Guardar</a></td>
        
    </tr>
    `;

Deportistas.tablaDeportistasNombres.cuerpo = `
    <tr title="${Deportistas.plantillaTags.ID}">
        <td>${Deportistas.plantillaTags.ID}</td>
        <td>${Deportistas.plantillaTags.NOMBRE}</td>
        <td>
        <div><a href="javascript:Deportistas.mostrar('${Deportistas.plantillaTags.ID}')" class="opcion-principal mostrar">Mostrar</a></div> 
        <div><a href="javascript:Deportistas.borrarN('${Deportistas.plantillaTags.ID}')" class="opcion-principal borrar">Borrar</a></div>
        </td>
    </tr>
    `;

// Pie de la tabla
Deportistas.tablaDeportistasDatos.pie = `</tbody></table>`;

Deportistas.comparaNombre = function (a, b) {
    if (a.data.nombre > b.data.nombre) {
        return 1;
    }
    if (a.data.nombre < b.data.nombre) {
        return -1;
    }

    return 0;
}
Deportistas.OrdenarNombres = function (vector) {
    Deportistas.imprimeNombreMuchasPersonas(vector.sort(Deportistas.comparaNombre))
}

Deportistas.OrdenarDatos = function (vector) {
    Deportistas.imprimeDatosMuchasPersonas(vector.sort(Deportistas.comparaNombre))
}

Deportistas.OrdenarAlfabeticamenteN = function () {
    Deportistas.recupera(Deportistas.OrdenarNombres)

}

Deportistas.OrdenarAlfabeticamenteD = function () {
    Deportistas.recupera(Deportistas.OrdenarDatos)

}

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la deportista que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la deportista que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Deportistas.sustituyeTagsDatos = function (plantilla, deportista) {
    return plantilla
        .replace(new RegExp(Deportistas.plantillaTags.ID, 'g'), deportista.ref['@ref'].id)
        .replace(new RegExp(Deportistas.plantillaTags.NOMBRE, 'g'), deportista.data.nombre)
        .replace(new RegExp(Deportistas.plantillaTags.EDAD, 'g'), deportista.data.edad)
        .replace(new RegExp(Deportistas.plantillaTags.CAMPEONATOSMUNDO, 'g'), deportista.data.campeonatosMundo)
        .replace(new RegExp(Deportistas.plantillaTags.PARTICIPACIONESJJOO, 'g'), deportista.data.participacionesJJOO)
        .replace(new RegExp(Deportistas.plantillaTags.MEDALLASORO, 'g'), deportista.data.medallasOro)
        .replace(new RegExp(Deportistas.plantillaTags.MEDALLASPLATA, 'g'), deportista.data.medallasPlata)
        .replace(new RegExp(Deportistas.plantillaTags.MEDALLASBRONCE, 'g'), deportista.data.medallasBronce)
        .replace(new RegExp(Deportistas.plantillaTags.PAIS, 'g'), deportista.data.nacionalidad[0].pais)
        .replace(new RegExp(Deportistas.plantillaTags.CIUDAD, 'g'), deportista.data.nacionalidad[0].ciudad)
        .replace(new RegExp(Deportistas.plantillaTags.ALTURA, 'g'), deportista.data.altura)
        .replace(new RegExp(Deportistas.plantillaTags.SEXO, 'g'), deportista.data.sexo)
        .replace(new RegExp(Deportistas.plantillaTags.RETIRADO, 'g'), deportista.data.retirado)
}

Deportistas.sustituyeTagsNombre = function (plantilla, deportista) {
    return plantilla
        .replace(new RegExp(Deportistas.plantillaTags.ID, 'g'), deportista.ref['@ref'].id)
        .replace(new RegExp(Deportistas.plantillaTags.NOMBRE, 'g'), deportista.data.nombre)
}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Deportista} Deportista Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados
 */
Deportistas.tablaDeportistasDatos.actualiza = function (deportista) {
    return Deportistas.sustituyeTagsDatos(this.cuerpo, deportista)
}

Deportistas.tablaDeportistasNombres.actualiza = function (deportista) {
    return Deportistas.sustituyeTagsNombre(this.cuerpo, deportista)
}
Deportistas.tablaUnDeportista.actualiza = function (deportista) {
    return Deportistas.sustituyeTagsDatos(this.cuerpo, deportista)
}

Deportistas.plantillaModifica.actualiza = function (deportista) {
    return Deportistas.sustituyeTagsDatos(this.cuerpo, deportista)
}


/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Deportistas.imprimeNombreMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = "";
    if (vector !== null) {
        if (vector.length > 0) {
            msj = Deportistas.tablaDeportistasNombres.cabecera
            vector.forEach(e => msj += Deportistas.tablaDeportistasNombres.actualiza(e))
            msj += Deportistas.tablaDeportistasDatos.pie
        } else {
            msj += Deportistas.DatosNoEncontrado
        }
    } else {
        msj += Deportistas.DatosNulos
    }
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de nombres de deportistas", msj)
}

Deportistas.imprimeDatosMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = "";
    if (vector !== null) {
        if (vector.length > 0) {
            msj = Deportistas.tablaDeportistasDatos.cabecera
            vector.forEach(e => msj += Deportistas.tablaDeportistasDatos.actualiza(e))
            msj += Deportistas.tablaDeportistasDatos.pie
        } else {
            msj += Deportistas.DatosNoEncontrado
        }
    } else {
        msj += Deportistas.DatosNulos
    }
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de datos de deportistas", msj)
}

/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Deportistas.listarDatos = function () {
    Deportistas.recupera(Deportistas.imprimeDatosMuchasPersonas);
}

Deportistas.listarNombres = function () {
    Deportistas.recupera(Deportistas.imprimeNombreMuchasPersonas);
}

Deportistas.deportistaModifica = function (deportista) {
    return Deportistas.tablaUnDeportista.cabecera
        + Deportistas.plantillaModifica.actualiza(deportista)
        + Deportistas.tablaDeportistasDatos.pie;
}

Deportistas.deportistaComoTabla = function (deportista) {
    return Deportistas.tablaUnDeportista.cabecera
        + Deportistas.tablaUnDeportista.actualiza(deportista)
        + Deportistas.tablaDeportistasDatos.pie;
}

Deportistas.imprimeUnaPersona = function (deportista) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = "";
    if (deportista !== null) {
        msj = Deportistas.deportistaComoTabla(deportista);
    }
    else{
        msj = Deportistas.DatosNulos;
    }
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar un deportista", msj)

    Deportistas.almacenaDatos(deportista)
}

Deportistas.almacenaDatos = function (deportista) {
    Deportistas.deportistaMostrado = deportista;
}

Deportistas.mostrar = function (id) {
    this.recuperaUnDeportista(id, Deportistas.imprimeUnaPersona);
}

Deportistas.crear = function () {
    let msj = Deportistas.formularioDeportista.formulario
    Frontend.Article.actualizar("Crear nuevo deportista", msj)
}

Deportistas.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las personas que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
        Deportistas.almacenaVector(vectorPersonas.data)
    }
}

Deportistas.borrarN = async function (id) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/borrarDeportista/" + id
        const response = await fetch(url)
        alert("Tu deportista se ha eliminado correctamente")
        Deportistas.listarNombres()
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}

Deportistas.borrarD = async function (id) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/borrarDeportista/" + id
        const response = await fetch(url)
        alert("Tu deportista se ha eliminado correctamente")
        Deportistas.listarDatos()
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}
Deportistas.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/crearDeportista"
        let participaciones = document.getElementById("form-participaciones").value
        let pJJOO = participaciones.split(',')
        console.log(pJJOO)
        let retirado = document.getElementById("form-retirado").value
        let r = false
        if (retirado === "S") {
            r = true
        }
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "nombre": document.getElementById("form-nombre").value,
                "edad": document.getElementById("form-edad").value,
                "campeonatosmundo": document.getElementById("form-c").value,
                "participacionesjjoo": pJJOO,
                "pais": document.getElementById("form-pais").value,
                "ciudad": document.getElementById("form-ciudad").value,
                "altura": document.getElementById("form-altura").value,
                "sexo": document.getElementById("form-sexo").value,
                "medallasoro": document.getElementById("form-medallas-oro").value,
                "medallasplata": document.getElementById("form-medallas-plata").value,
                "medallasbronce": document.getElementById("form-medallas-bronce").value,
                "retirado": r
            }), // body data type must match "Content-Type" header
        })
        alert("Tu deportista se ha añadido correctamente (puede visualizarlo en el listado)")
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
    }

}


Deportistas.modificar = function () {
    let msj = Deportistas.deportistaModifica(this.deportistaMostrado);
    Frontend.Article.actualizar("Modificar un deportista", msj)
}

/*Convertimos la función a asíncrona para que se muestren los datos actualizados*/
Deportistas.guardarModificacion = async function (id) {
    await this.modificarDeportista(id)
    this.mostrar(id)
}

Deportistas.modificarDeportista = async function (id) {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/setDeportista/" + id
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "nombre": document.getElementById("modifica-nombre").value,
                "edad": this.deportistaMostrado.EDAD,
                "campeonatosmundo": this.deportistaMostrado.CAMPEONATOSMUNDO,
                "participacionesjjoo": this.deportistaMostrado.PARTICIPACIONESJJOO,
                "pais": this.deportistaMostrado.PAIS,
                "ciudad": this.deportistaMostrado.CIUDAD,
                "altura": this.deportistaMostrado.ALTURA,
                "sexo": this.deportistaMostrado.SEXO,
                "medallasoro": this.deportistaMostrado.MEDALLASORO,
                "medallasplata": this.deportistaMostrado.MEDALLASPLATA,
                "medallasbronce": this.deportistaMostrado.MEDALLASBRONCE,
                "retirado": this.deportistaMostrado.RETIRADO
            }), // body data type must match "Content-Type" header
        })
        alert("Tu deportista se ha actualiza correctamente")
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
    }

}


Deportistas.recuperaUnDeportista = async function (id, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/deportista/" + id
        const response = await fetch(url);
        if (response) {
            const deportista = await response.json()
            callBackFn(deportista)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

Deportistas.almacenaVector = function (vector) {
    this.vectorDeportistas = vector
}

Deportistas.filtraNombreN = function () {
    let n = document.getElementById("filter-nombre").value
    Deportistas.imprimeNombreMuchasPersonas(this.vectorDeportistas.filter(each => each.data.nombre.includes(n)))
}

Deportistas.filtraNombreD = function () {
    let n = document.getElementById("filter-nombre").value
    Deportistas.imprimeDatosMuchasPersonas(this.vectorDeportistas.filter(each => each.data.nombre.includes(n)))
}
