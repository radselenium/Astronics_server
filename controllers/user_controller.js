const prisma = require("../src/connection");

module.exports.getAllsUser = function (req, res) {
  prisma.user.findMany().then((users) => {
    res.json(users);
  });
};

module.exports.getOneUser = function (req, res) {
  const { id } = req.params;
  prisma.user.findUnique({ where: { id: Number(id) } }).then((user) => {
    res.json(user);
  });
};

module.exports.createUser = function (req, res) {
  const { name, email, password } = req.body;
  prisma.user
    .create({
      data: {
        name,
        email,
        password,
      },
    })
    .then((user) => {
      res.json(user);
    });
};

module.exports.updateUser = function (req, res) {
  const { id } = req.params;
  const { name, email } = req.body;
  prisma.user
    .update({
      where: { id: Number(id) },
      data: {
        name,
        email,
      },
    })
    .then((user) => {
      res.json(user);
    });
};

module.exports.deleteUser = function (req, res) {
  const { id } = req.params;
  prisma.user
    .delete({
      where: { id: Number(id) },
    })
    .then((user) => {
      res.json(user);
    });
};
