const Short = require("../models/Short");

module.exports = {
  async getById(req, res) {
    const { _id } = req.params;

    const short = await Short.findById(_id);

    if (!short) {
      return res.render("not-found");
    }

    if (short.type === "app" && short.payload) {
      return res.render("mobile-app", {
        appStore: short.payload.appStore || "",
        googlePlay: short.payload.googlePlay || "",
        fallback: short.payload.fallback || "",
        name: short.name,
      });
    }

    return res.render("not-found");
  },

  async deleteById(req, res) {
    const { _id } = req.params;

    try {
      await Short.deleteOne({ _id });

      res.sendMessage(410, "Successful remove ");
    } catch (e) {
      res.sendError(404, "", e);
    }
  },

  async get(req, res) {
    try {
      const shorts = await Short.find({ user: req.user._id });
      if (!shorts) {
        return res.sendError(404, "");
      }
      res.json(shorts);
    } catch (err) {
      res.sendError(404, "", err);
    }
  },

  async create(req, res) {
    const { user } = req;
    const { name, fallback, googlePlay, appStore, type } = req.body;

    try {
      const newShort = await new Short({
        payload: { fallback, googlePlay, appStore },
        type,
        name,
        user: user._id,
      });

      await newShort.save();

      res.json(newShort);
    } catch (error) {
      res.sendError(500, "", error);
    }
  },

  async update(req, res) {
    const { user } = req;
    const { _id } = req.params;

    const { name, fallback, googlePlay, appStore } = req.body;

    try {
      const short = await Short.findOneAndUpdate(
        { _id, user: user._id },
        { name, fallback, googlePlay, appStore },
        { new: true }
      );
      console.log(short);
      if (!short) {
        return res.sendError(404, "");
      }

      res.json(short);
    } catch (error) {
      res.sendError(500, "", error);
    }
  },
};
