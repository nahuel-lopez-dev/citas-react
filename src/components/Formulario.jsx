import {useState, useEffect} from 'react';
import Error from './Error';


const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  /** acá van los hooks */
  const [nombre, setNombre] = useState(''); //valor inicial 'Hook' si lo coloco 
  const [propietario, setPropietario] = useState(''); //valor inicial 'Hook' si lo coloco 
  const [email, setEmail] = useState(''); //valor inicial 'Hook' si lo coloco 
  const [fecha, setFecha] = useState(''); //valor inicial 'Hook' si lo coloco 
  const [sintomas, setSintomas] = useState(''); //valor inicial 'Hook' si lo coloco 

  const [error, setError] = useState(false); //

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente])


  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    
    return random + fecha;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    /** validando el formulario */
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log('Hay al menos un campo vacío');
      setError(true);
      return;
    }

    setError(false);

    /** agregando el paciente a la lista como un objeto*/
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    }

    if(paciente.id){
      /** editando el registro */
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map(pacienteState => 
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState);

        setPacientes(pacientesActualizados);
        setPaciente({});

    } else{
      /** nuevo registro */
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }
    
    /** Reinicia el form */
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');

  }
  
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg text-center mt-5 mb-5">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 ml-3"
      > 
        {error && <Error><p>¡Todos los campos son obligatorios!</p></Error> }
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 font-bold uppercase">
            Nombre Mascota {nombre}
          </label>
          <input 
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full rounded-lg p-2 mt-2 placeholder-gray-400"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 font-bold uppercase">
            Nombre del propietario
          </label>
          <input 
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="border-2 w-full rounded-lg p-2 mt-2 placeholder-gray-400"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 font-bold uppercase">
            email
          </label>
          <input 
            id="email"
            type="email"
            placeholder="Email de contacto del propietario"
            className="border-2 w-full rounded-lg p-2 mt-2 placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 font-bold uppercase">
            Alta
          </label>
          <input 
            id="alta"
            type="date"
            className="border-2 w-full rounded-lg p-2 mt-2 placeholder-gray-400"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 font-bold uppercase">
            Síntomas
          </label>
          <textarea 
            id="sintomas"
            className="border-2 w-full rounded-lg p-2 mt-2 placeholder-gray-400"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          ></textarea>
        </div>

        <input 
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 w-full uppercase text-white font-bold p-2 rounded-lg cursor-pointer transition-all"
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} 
        />
      </form>
    </div>
    
  )
}

export default Formulario