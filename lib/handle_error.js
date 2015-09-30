module.exports = function(err, res) {
  if (err.code === 11000) {
    console.log(err);
    return res.status(500).json({msg: 'username must be unique'});
  }
  console.log(err);
  res.status(500).json({msg: 'internal server error'});
};
