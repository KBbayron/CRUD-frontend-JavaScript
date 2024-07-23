class Personas{
    ingreso(e) {
        e.preventDefault();
        //si ese evento se da en clase agregrar
        if (e.target.classList.contains('agregar')) {
            const persona = e.target.parentElement.parentElement;
            this.leerDatospersona(persona);
        }

    }
    leerDatospersona(persona){
        // Leer los datos de la persona
        const infoPersona = {
            name: persona.querySelector('input[id="name"]').value,
            age: persona.querySelector('input[id="age"]').value,
            address: persona.querySelector('input[id="address"]').value,
            email: persona.querySelector('input[id="email"]').value,
            id: persona.querySelector('a').getAttribute('data-id'),
        };
        console.log(infoPersona);
        let personasLS;
        personasLS = this.obtenerPersonasLocalStorage();
        personasLS.forEach(function (personaLS) {
            if (personaLS.name === infoPersona.name) {
                personasLS = personaLS.name;
            }
        });
        if(personasLS===infoPersona.name){
            Swal.fire({
                icon: 'error',
                type: 'info',
                title: '...',
                text: 'Persona Agregada',
                timer: 2000,
                showConfirmButton: false
            })
        }   else {
            this.insertarPersona(infoPersona);
        }
    }

    insertarPersona(persona) {
        // Crear fila y celdas
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="custom-table text-white">${persona.name}</td>
            <td class="custom-table text-white">${persona.age}</td>
            <td class="custom-table text-white">${persona.address}</td>
            <td class="custom-table text-white">${persona.email}</td>
            <td class="custom-table text-white">
                    <a class="btn btn-danger col-3 eliminar" id="" data-id="${persona.name}">Delete</a>
                    <a class="btn btn-warning col-2 editar" id="" data-id="${persona.name}">Edit</a>     
            </td>
        `;
        // Agregar fila al tbody
        
        listaPersonas.appendChild(row);
        this.limpiarFormulario();
        this.guardarPersonasLocalStorage(persona);
        
    }
    limpiarFormulario() {
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('address').value = '';
        document.getElementById('email').value = '';
    }
    guardarPersonasLocalStorage(persona) {
        let personas;
        personas = this.obtenerPersonasLocalStorage();
        personas.push(persona);
        localStorage.setItem('personas', JSON.stringify(personas));
    };

    obtenerPersonasLocalStorage() {
        let personasLS;
        if (localStorage.getItem('personas') === null) {
            personasLS = [];
        } else {
            personasLS = JSON.parse(localStorage.getItem('personas'));
        }
        return personasLS;
    }

    //eliminacion
    salida(e){
        e.preventDefault();
        let persona, personaName;
        if (e.target.classList.contains('eliminar')) {
            e.target.parentElement.parentElement.remove();
            //borra de local storage tambien
            persona = e.target.parentElement.parentElement,
            personaName = persona.querySelector('a').getAttribute('data-id');
            console.log(personaName);
            this.eliminarPersonasLocalStorage(personaName);
        }
    }

    eliminarPersonasLocalStorage(personaName) {
        let personasLS;
        personasLS = this.obtenerPersonasLocalStorage();

        personasLS.forEach(function (persona, index) {
            if (persona.name === personaName) {
                //eliminar elementos dentro de un arreglo
                personasLS.splice(index,1);
            }
        });
        localStorage.setItem('personas', JSON.stringify(personasLS));
    }

    obtenerPersonasLocalStorage() {
        let personasLS;
        if (localStorage.getItem('personas') === null) {
            personasLS = [];
        } else {
            personasLS = JSON.parse(localStorage.getItem('personas'));
        }
        return personasLS;
    }

    leerlocalStorage() {
        let personasLS;
        personasLS = this.obtenerPersonasLocalStorage();
        personasLS.forEach(function (persona) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="custom-table text-white">${persona.name}</td>
                <td class="custom-table text-white">${persona.age}</td>
                <td class="custom-table text-white">${persona.address}</td>
                <td class="custom-table text-white">${persona.email}</td>
                <td class="custom-table text-white">
                    <a class="btn btn-danger col-3 eliminar" id="" data-id="${persona.name}">Delete</a>
                    <a class="btn btn-warning col-2 editar" id="" data-id="${persona.name}">Edit</a>    
                </td>
            `;
            listaPersonas.appendChild(row);
        });
    }
    editarPersona(e){
        e.preventDefault();
        if (e.target.classList.contains('editar')) {
            const persona = e.target.parentElement.parentElement;
            const personaName = persona.querySelector('a[data-id]').getAttribute('data-id');
            const personasLS = this.obtenerPersonasLocalStorage();
            const personaData = personasLS.find(persona => persona.name === personaName);

            document.getElementById('name').value = personaData.name;
            document.getElementById('age').value = personaData.age;
            document.getElementById('address').value = personaData.address;
            document.getElementById('email').value = personaData.email;

            idPersonaEditada = personaName;

            persona.remove();
            this.eliminarPersonasLocalStorage(personaName);
        }
    };
}