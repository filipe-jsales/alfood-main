import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IPaginacao } from "../../interfaces/IPaginacao";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [buscaRestaurante, setBuscaRestaurante] = useState("");

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    axios
      .get<IPaginacao<IRestaurante>>(
        `http://localhost:8000/api/v1/restaurantes/?search=${buscaRestaurante}`
      ) //promise, vai tentar mas nao sabe se vai conseguir
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        console.log(resposta.data.results);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  // useEffect(() => {
  //   axios
  //     .get<IPaginacao<IRestaurante>>(
  //       `http://localhost:8000/api/v1/restaurantes/?search=${buscaRestaurante}`
  //     ) //promise, vai tentar mas nao sabe se vai conseguir
  //     .then((resposta) => {
  //       console.log(resposta);
  //     })
  //     .catch((erro) => {
  //       console.log(erro);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/?ordering=nome"
      ) //promise, vai tentar mas nao sabe se vai conseguir
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        console.log(resposta);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const verMais = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((resposta) => {
        setRestaurantes([...restaurantes, ...resposta.data.results]);
        setProximaPagina(resposta.data.next);
        console.log(resposta);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && <button onClick={verMais}>ver mais</button>}
      <form onSubmit={aoSubmeterForm}>
        <TextField
          value={buscaRestaurante}
          onChange={(evento) => setBuscaRestaurante(evento.target.value)}
          label="Nome do Restaurante"
          variant="standard"
        />
        <Button
          type="submit"
          variant="outlined"
        >
          Buscar
        </Button>
      </form>
    </section>
  );
};

export default ListaRestaurantes;
