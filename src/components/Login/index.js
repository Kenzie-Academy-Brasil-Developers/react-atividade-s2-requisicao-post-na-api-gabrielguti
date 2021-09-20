import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
import "./styles.css";

const Login = () => {
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);

  const formSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleObjectMaker = (data) => {
    axios
      .post("https://kenzieshop.herokuapp.com/sessions/", data)
      .then((response) => {
        if (response.status === 200) {
          setStatus(!status);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  return (
    <div className="content">
      <div className="container">
        <form className="InputsCamp" onSubmit={handleSubmit(handleObjectMaker)}>
          <input placeholder="Username" type="text" {...register("username")} />
          <input
            placeholder="Senha"
            type="password"
            {...register("password")}
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div className="alert">
        {status ? (
          <span id="loginTrue">Login realizado com sucesso</span>
        ) : (
          <></>
        )}
        {error ? <span id="loginFalse">Usuário não encontrado</span> : <></>}
      </div>
    </div>
  );
};

export default Login;
