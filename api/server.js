// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const server = express();

server.use(express.json());
const userModel = require("./users/model");

// POST Request
server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    } else {
      const insertedData = await userModel.insert({ name, bio });
      res.status(201).json(insertedData);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});

// GET Request -- get all users
server.get("/api/users", async (req, res) => {
  try {
    const getData = await userModel.find();
    res.json(getData);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

// GET Request --- get user by id
server.get("/api/users/:id", async (req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id);
    if (getUser) {
      res.json(getUser);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});

// DELETE Request --- delete request by id
server.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.remove(req.params.id);
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});

// PUT Request --- update user by id
server.put("/api/users/:id", async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      res
        .status(400)
        .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
    } else {
      const updatedUser = await userModel.update(req.params.id, req.body);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res
          .status(404)
          .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
  }
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}
