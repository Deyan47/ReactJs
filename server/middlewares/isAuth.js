module.exports = (req, res, next) => {
  if (!req.user) return res.json({ message: "You must be authenticated!" });
  next();
};
