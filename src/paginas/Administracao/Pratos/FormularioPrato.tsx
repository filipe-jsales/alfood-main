import { TagSharp } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Toolbar,
  Link,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import Itag from "../../../interfaces/ITag";

const FormularioPrato = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`You have clicked ${count} times`);
  });

  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<Itag[]>([]);

  const [restaurante, setRestaurante] = useState("");
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    http
      .get<{ tags: Itag[] }>("tags/")
      .then((resposta) => setTags(resposta.data.tags));
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append("nome", nomePrato);
    formData.append("descricao", descricao);

    formData.append("tag", tag);
    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    http
      .request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => alert("Prato cadastrado com sucesso"))
      .catch((erro) => console.log(erro));
  };

  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>{/**Conteudo da pagina */}</Paper>
        </Container>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          flexGrow: 1,
        }}
      >
        <Typography component="h1" variant="h6">
          Formulário de Pratos
        </Typography>
        <Box component="form" onSubmit={aoSubmeterForm}>
          <TextField
            value={nomePrato}
            onChange={(evento) => setNomePrato(evento.target.value)}
            label="Nome do Prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />
          <TextField
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            label="Descrição do Prato"
            variant="standard"
            fullWidth
            required
          />

          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-tag">Tag</InputLabel>
            <Select
              labelId="select-tag"
              value={tag}
              onChange={(evento) => setTag(evento.target.value)}
            >
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.value}>
                  {tag.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-restaurante">Restaurante</InputLabel>
            <Select
              labelId="select-restaurante"
              value={restaurante}
              onChange={(evento) => setRestaurante(evento.target.value)}
            >
              {restaurantes.map((restaurante) => (
                <MenuItem key={restaurante.id} value={restaurante.id}>
                  {restaurante.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <input type="file" onChange={selecionarArquivo} />

          <Button type="submit" variant="outlined" fullWidth>
            Salvar
          </Button>
          <Button variant="outlined" onClick={() => setCount(count + 1)}>
            Count
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FormularioPrato;
