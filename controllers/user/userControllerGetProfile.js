export const  getProfile = async (req, res) => {
    const { firstName, lastName, userName, email, tc } = req.user;
    res.send({'user': {firstName, lastName, userName, email, tc}});
  };