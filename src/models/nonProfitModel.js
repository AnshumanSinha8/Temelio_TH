// using in-memory data so no real need for models, but extensibly we would describe
// the data models and how they'd interact with likely a SQL database here.

/*
Since we aren't using a real database, let's just store data in memory here.
This can be replaced with an actual DB (Mongo, Postgres) later. */

// Key = email, Value = { name, address, email }
const nonprofits = new Map();

// CRUD operations on nonprofits:
function createNonprofit({ name, address, email }) {
  nonprofits.set(email, { name, address, email, cc });
}

function getNonprofitByEmail(email) {
  return nonprofits.get(email);
}

function getAllNonprofits() {
  return Array.from(nonprofits.values());
}

function hasNonprofitWithEmail(email) {
  return nonprofits.has(email);
}

module.exports = {
  createNonprofit,
  getNonprofitByEmail,
  getAllNonprofits,
  hasNonprofitWithEmail
};
