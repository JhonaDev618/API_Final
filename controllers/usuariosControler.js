import express from "express";
import usuarioService from "../service/UsuarioService.js";
const router = express.Router();

function listarUsuarios() {
  return usuarioService.listarUsuarios();
}

function adicionarUsuario(novoUsuario) {
  return usuarioService.adicionarUsuario(novoUsuario);
}

function buscarUsuarioID(novoID) {
  return usuarioService.buscarUsuarioID(novoID);
}

function atualizarUsuario(dados) {
  return usuarioService.atualizarUsuario(dados);
}

function removerUsuarioID(id) {
  return usuarioService.removerUsuarioID(id);
}

export default {
  listarUsuarios,
  adicionarUsuario,
  buscarUsuarioID,
  removerUsuarioID,
  atualizarUsuario,
};
