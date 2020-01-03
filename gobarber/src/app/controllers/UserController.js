import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, password } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (password && (await user.checkPassword(password))) {
      return res
        .status(400)
        .json({ error: 'New password cannot be equal the old one' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email: user.email,
      provider,
    });
  }
}

export default new UserController();
