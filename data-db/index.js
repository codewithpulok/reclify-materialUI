const addresses = require("./addresses");
const cards = require("./cards");
const invoices = require("./invoices");
const memberships = require("./memberships");
const plans = require("./plans");
const profiles = require("./profiles");
const reviews = require("./reviews");
const transactions = require("./transactions");
const warehouses = require("./warehouses");

const data = {
  warehouses: warehouses,
  addresses: addresses,
  cards: cards,
  invoices: invoices,
  memberships: memberships,
  plans: plans,
  profiles: profiles,
  reviews: reviews,
  transactions: transactions,
};

module.exports = () => data;
