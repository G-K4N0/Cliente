import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../api/api.js";
import "./Login.scss";
import { Image } from "react-bootstrap";
import pantera from "../../imgs/pantera.png";

export const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard/inicio";

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ user, password: pwd });
      const token = response?.data?.token;
      const roles = [response?.data?.rol];
      setAuth({ user, pwd, roles, token });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("El servidor no responde");
      } else if (error.response?.status === 400) {
        setErrMsg("Usuario y/o contraseña incorrectos");
      } else if (error.response?.status === 401) {
        setErrMsg("Usuario no autorizado");
      } else {
        setErrMsg("Inicio fallido");
      }
    }
  };

  const togglePwdVisibility = () => {
    setShowPwd((prevShowPwd) => !prevShowPwd);
  };

  return (
    <div className="overlay">
      <form onSubmit={handleLogin} className="formulario">
        <div className="con">
          <div className="centerImage">
          <Image src={pantera} roundedCircle width={150}/>
          </div>
          <header className="head_form">
            <h2>Inicio de Sesión</h2>
            <p className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          </header>

          <br />

          <div className="field_set">
            <div className="input-wrapper">
              <span className="input_item">
                <i className="fa fa-user-circle"></i>
              </span>
              <input
                className="form_input txt_input"
                id=""
                type="text"
                placeholder="Usuario"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                autoComplete="off"
                required
              />
            </div>
            <br />

            <div className="input-wrapper">
              <span className="input_item">
                <i className="fa fa-key"></i>
              </span>
              <input
                className="form_input"
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                id="pwd"
                name="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                autoComplete="off"
                required
              />
              <span className="input_item_eye">
                <i
                  className={`fa ${showPwd ? "fa-eye-slash" : "fa-eye"}`}
                  aria-hidden="true"
                  type="button"
                  onClick={togglePwdVisibility}
                ></i>
              </span>
            </div>

            <button type="submit" className="button_login">
              Iniciar Sesión
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
