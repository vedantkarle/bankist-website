const Customer = require("../models/customer");
const Transfer = require("../models/transfer");

module.exports.getCustomers = async (req, res, next) => {
  const customers = await Customer.find({});
  res.render("customers.ejs", { customers });
};

module.exports.getSingleCustomer = async (req, res) => {
  const currentCustomer = await Customer.findById(req.params.id);
  const customers = await Customer.find({});

  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const date = new Intl.DateTimeFormat("en-GB", options).format(now);

  res.render("customer", {
    title: currentCustomer.name,
    currentCustomer,
    customers,
    date,
  });
};

module.exports.postTransfer = async (req, res) => {
  const sender = await Customer.findById(req.params.id);
  const receiver = await Customer.findOne({ name: req.body.customer });
  const amount = req.body.amount;

  if (!amount) {
    return res.send("Amount is needed");
  }

  if (amount > sender.currentBalance) {
    return res.send("Insufficient Balance");
  }

  sender.currentBalance -= amount * 1;
  receiver.currentBalance += amount * 1;

  sender.movements.push(`-₹${amount}`);
  receiver.movements.push(`+₹${amount}`);

  const transfer = Transfer({
    sender: sender.name,
    receiver: receiver.name,
    amount,
  });

  await transfer.save();
  await sender.save();
  await receiver.save();

  res.redirect("/transfers");
};

module.exports.getTransfer = async (req, res) => {
  const transfers = await Transfer.find({});

  res.render("transfers", { transfers });
};
