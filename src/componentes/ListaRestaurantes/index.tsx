import axios from "axios";
import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/restaurantes/") //promise, vai tentar mas nao sabe se vai conseguir
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        console.log(resposta.data.results);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);
  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
    </section>
  );
};

export default ListaRestaurantes;
