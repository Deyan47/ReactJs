const User = require("../Models/User");

module.exports = {
  addOfferToDash: async ({ userId, offer }) => {
    let user = await User.findById(userId);

    user.offers?.push(offer);

    return user.save();
  },
  getUsersOffers: async (userId) => {
    const user = await User.findById(userId);

    return user.offers;
  },
  removeFromLibrary: async (offerId, userId) => {
    const user = await User.findById(userId);

    const findOffer = user.offers.find((x) => x.id.toString() === offerId);

    const index = user.offers.indexOf(findOffer);

    user.offers.splice(index, 1);

    return user.save();
  },
};
