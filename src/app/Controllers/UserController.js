const Users = require("../Models/Users");
const bcrypt = require("bcryptjs");
const yup = require("yup");

const show = async (req, res) => {
  let users = await (
    await Users.find()
  ).map((users) => ({
    Id: users.sequentialId,
    Nome: users.name,
  }));
  return res.status(200).json({
    users,
    error: false,
  });
};

const showOne = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await Users.findById(id);
    return res.status(200).json({
      user,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Usuário não existe",
    });
  }
};

const store = async (req, res) => {
  let schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    perfil: yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      error: true,
      message: "Dados inválidos",
    });
  }

  let userExist = await Users.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).json({
      error: true,
      message: "Este usuário já existe!",
    });
  }

  const { name, email, password, perfil } = req.body;

  const dados = { name, email, password, perfil };
  dados.password = await bcrypt.hash(dados.password, 8);

  await Users.create(dados, (err) => {
    if (err)
      return res.status(400).json({
        error: true,
        message: "Erro de cadastro",
      });

    return res.status(200).json({
      error: false,
      message: "Usuário Cadastrado",
    });
  });
};

module.exports = {
  show,
  showOne,
  store,
};
