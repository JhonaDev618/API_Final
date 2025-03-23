let usuarios = [];
let novoid = 1;

function listarUsuarios() {
  return usuarios;
}
function adicionarUsuario(novoUsuario) {
  const { nome, email } = novoUsuario;
  novoid++;
  let newItem = { id: novoid, nome: nome, email: email };
  usuarios.push(newItem);
}

function buscarUsuarioID(novoID) {
  const resultado = usuarios.find((usuarios) => usuarios.id === novoID);
  if (!resultado) {
    return 0;
  }
  return resultado;
}

function alterarUsuario(id, NewUser) {
  const { nome, email } = NewUser;
  const user = usuarios.find((u) => u.id === parseInt(id));
  user.nome = nome || user.nome;
  user.email = email || user.email;
  return user;
}

function atualizarUsuario(dados) {
  const { id, nome, email } = dados;
  const usuariosantigo = buscarUsuarioID(id);
  let newUser = { id: id, nome: nome, email: email };

  return alterarUsuario(id, newUser);
}

function removerUsuarioID(id) {
  usuarios.splice(parseInt(id), 1);
}

export default {
  listarUsuarios,
  adicionarUsuario,
  buscarUsuarioID,
  atualizarUsuario,
  alterarUsuario,
  removerUsuarioID,
};
