import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoEmpleados() {
  const urlBase = "http://localhost:8080/rh-app/empleados";

  const[empleados,setEmpleados] = useState([]);

  useEffect(() =>{
    cargarEmpleados();
  },[]);
  
  const cargarEmpleados = async() => {
    const resultado = await axios.get(urlBase);
    console.log(resultado.data);
    setEmpleados(resultado.data);
  }

  const eliminarEmpleado = async(id) => {
    const resultado = await axios.delete(urlBase+"/"+id);
    console.log(resultado.data);
    //setEmpleados(resultado.data);
    cargarEmpleados();
  }

  return (
    <div className='container text-center' >
    <h3 style={{margin:"30px"}}>Sistema de Recursos Humanos</h3>
    <table className="table table-striped table-hover align-middle">
      <thead className='table-dark'>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Empleado</th>
          <th scope="col">Departamento</th>
          <th scope="col">Sueldo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {
      empleados.map((empleado,indice) => (
            <tr key={indice}>
            <th scope="row">{empleado.idEmpleado}</th>
            <td>{empleado.nombre}</td>
            <td>{empleado.departamento}</td>
            <td><NumericFormat value={empleado.sueldo} displayType='text' thousandSeparator="," prefix='$' decimalScale={2} fixedDecimalScale ></NumericFormat></td>
            <td className='text-center'>
              <div>
                <Link to={`/editar/${empleado.idEmpleado}`} className='btn btn-warning btn-sm me-3'>Editar</Link>
                <button onClick={() => eliminarEmpleado(empleado.idEmpleado)} className='btn btn-danger btn-sm'>Eliminar</button>
              </div>
            </td>
          </tr>
      ))
      }  
        
      </tbody>
    </table>
  </div>
  )
}
