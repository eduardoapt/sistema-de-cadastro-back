const CustomerServices = require("../Models/CustomerServices");
const yup = require("yup");

const getCLients = async (req, res) => {
  let customers = await CustomerServices.find();
  return res.status(200).json({
    customers,
    error: false,
  });
};

const getCLientActivities = async (req, res) => {
  let { serviceId } = req.params;
  try {
    let customerActivities = await CustomerServices.findOne({ serviceId });
    return res.status(200).json({
      customerActivities,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Cliente não existe",
    });
  }
};

const registerNewClient = async (req, res) => {
  let schema = yup.object().shape({
    clientName: yup.string().required(),
    clientCPF: yup.number().required(),
    startingTime: yup.date(),
    receptionTime: yup.date(),
    nurseRoomTime: yup.date(),
    doctorTime: yup.date(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      error: true,
      message: "Dados inválidos",
    });
  }

  const {
    clientName,
    clientCPF,
    startingTime,
    receptionTime,
    nurseRoomTime,
    doctorTime,
  } = req.body;

  const dados = {
    clientName,
    clientCPF,
    startingTime,
    receptionTime,
    nurseRoomTime,
    doctorTime,
  };

  await CustomerServices.create(dados, (err) => {
    if (err)
      return res.status(400).json({
        error: true,
        message: "Erro de cadastro",
      });

    return res.status(200).json({
      error: false,
      message: "Atendimento ao Cliente iniciado",
    });
  });
};

const clientNextStage = async (req, res) => {
  let schema = yup.object().shape({
    clientName: yup.string().required(),
    clientCPF: yup.string().required(),
    startingTime: yup.date(),
    receptionTime: yup.date(),
    nurseRoomTime: yup.date(),
    doctorTime: yup.date(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({
      error: true,
      message: "Dados inválidos",
    });
  }

  let { serviceId } = req.params;
  const filter = { serviceId };
  const update = req.body;
  try {
    let customerNextStage = await CustomerServices.findOneAndUpdate(
      filter,
      update
    );
    return res.status(200).json({
      error: false,
      message: "Cliente passou para o próximo estágio de atendimento",
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Cliente não existe",
    });
  }
};

module.exports = {
  getCLients,
  getCLientActivities,
  registerNewClient,
  clientNextStage,
};
