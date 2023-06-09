import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ErrorAlert } from "../../Alerts/Error";
import { SuccessAlert } from "../../Alerts/Success";
import { WarningAlert } from "../../Alerts/Warning";

import styles from "./Horarios.module.scss";

export const Agregar = () => {
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [dia, setDia] = useState("");
  const [grupos, setGrupos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [labs, setLabs] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [seleccionGrupo, setSeleccionGrupo] = useState("");
  const [seleccionMateria, setSeleccionMateria] = useState("");
  const [seleccionLab, setSeleccionLab] = useState("");
  const [seleccioUsuario, setSeleccioUsuario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showSucces, setShowSucces] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("/grupos/grupos")
      .then((response) => {
        setGrupos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axiosPrivate
      .get("/materias/addHorario")
      .then((response) => {
        console.log(response);
        setMaterias(response?.data?.topic);
      })
      .catch((error) => {
        console.log(error);
      });
    axiosPrivate
      .get("/labs")
      .then((response) => {
        setLabs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axiosPrivate
      .get("/usuarios/docente")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPrivate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataHorario = new FormData();
    dataHorario.append("inicia", inicio);
    dataHorario.append("finaliza", fin);
    dataHorario.append("dia", dia);
    dataHorario.append("idGrupo", seleccionGrupo);
    dataHorario.append("idMateria", seleccionMateria);
    dataHorario.append("idLab", seleccionLab);
    dataHorario.append("idUsuario", seleccioUsuario);

    axiosPrivate
      .post("/horarios/create", dataHorario)
      .then((response) => {
        setSeleccionMateria("");
        setSeleccioUsuario("");
        setSeleccionGrupo("");
        setSeleccionLab("");
        setInicio("");
        setDia("");
        setFin("");
        const message = response.data?.message || "";

        if (
          message.includes(
            "No puedes agregar la misma hora para el inicio y la finalización"
          )
        ) {
          setMensaje(message);
          setShowWarning(true);
        } else if (message.includes("Existe un horario")) {
          setMensaje(message);
          setShowError(true);
        } else if (message.includes("Incorrect integer value")) {
          setMensaje(
            "Revisa que estés seleccionando todas las opciones requeridas"
          );
          setShowError(true);
        } else if (
          message.includes("No puedes agregar una hora de finalización pasada")
        ) {
          setMensaje(message);
          setShowError(true);
        } else if (
          message.includes(
            "El usuario tiene asignado el mismo horario en el mismo día en otro laboratorio"
          )
        ) {
          setMensaje(message);
          setShowError(true);
        }
      })
      .catch((error) => {
        setMensaje(error);
        setShowError(true);
      });
  };
  return (
    <div>
      <SuccessAlert
        show={showSucces}
        setShow={setShowSucces}
        mensaje={mensaje}
      />
      <ErrorAlert show={showError} setShow={setShowError} error={mensaje} />
      <WarningAlert
        show={showWarning}
        setShow={setShowWarning}
        mensaje={mensaje}
      />
      <form onSubmit={handleSubmit}>
        <Table responsive variant="dark">
          <thead>
            <tr>
              <th>
                <select
                  className={styles.input_select}
                  value={inicio}
                  onChange={(e) => setInicio(e.target.value)}
                >
                  <option value="">Entrada</option>
                  <option value="07:00 AM">07:00 AM</option>
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                </select>
              </th>
              <th>
                <select
                  className={styles.input_select}
                  value={fin}
                  onChange={(e) => setFin(e.target.value)}
                >
                  <option value="">Salida</option>
                  <option value="07:00 AM">07:00 AM</option>
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                </select>
              </th>
              <th>
                <select
                  className={styles.input_select}
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                >
                  <option value="">Dias</option>
                  <option value="Lunes">Lunes</option>
                  <option value="Martes">Martes</option>
                  <option value="Miercoles">Miércoles</option>
                  <option value="Jueves">Jueves</option>
                  <option value="Viernes">Viernes</option>
                  <option value="Sabado">Sábado</option>
                </select>
              </th>
              <th>
                <select
                  className={styles.input_select}
                  value={seleccionGrupo}
                  onChange={(e) => setSeleccionGrupo(e.target.value)}
                >
                  <option value="">Grupos</option>
                  {grupos.map((grupo) => (
                    <option key={grupo.id} value={grupo.id}>
                      {grupo.name} - {grupo.tipo.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <select
                  className={styles.input_select}
                  value={seleccionMateria}
                  onChange={(e) => setSeleccionMateria(e.target.value)}
                >
                  <option value="">Materias</option>
                  {materias.map((materia) => (
                    <option key={materia.id} value={materia.id}>
                      {materia.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <select
                  className={styles.input_select}
                  value={seleccionLab}
                  onChange={(e) => setSeleccionLab(e.target.value)}
                >
                  <option value="">Laboratorios</option>
                  {labs.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <select
                  className={styles.input_select}
                  value={seleccioUsuario}
                  onChange={(e) => setSeleccioUsuario(e.target.value)}
                >
                  <option value="">Usuarios</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <Button
                  className={styles.input_select}
                  type="submit"
                  variant="primary"
                >
                  Enviar
                </Button>
              </th>
              <th>
                <Button
                  className={styles.input_select}
                  type="button"
                  variant="danger"
                >
                  Cancelar
                </Button>
              </th>
            </tr>
          </thead>
        </Table>
      </form>
    </div>
  );
};
