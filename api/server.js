const express = require('express');
const app = express();

app.use(express.json());

const {
    find,
    findById,
    insert,
    update,
    remove,
    resetDB,
} = require("./users/model.js");

// POST /api/users
server.post("/api/users", (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
        return res
            .status(400)
            .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    }

    insert({ name, bio })
        .then((newUser) => {
            res.status(201).json(newUser);
        })
        .catch((error) => {
            res
                .status(500)
                .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
        });
});

// GET /api/users
server.get("/api/users", (req, res) => {
    find()
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
        });
});

// GET /api/users/:id
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;

    findById(id)
        .then((user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
            }

            res.json(user);
        })
        .catch((error) => {
            res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
        });
});

// DELETE /api/users/:id
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    remove(id)
        .then((user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
            }

            res.json(user);
        })
        .catch((error) => {
            res.status(500).json({ message: "Kullanıcı silinemedi" });
        });
});

// PUT /api/users/:id
server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const { name, bio } = req.body;

    if (!name || !bio) {
        return res
            .status(400)
            .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
    }

    update(id, { name, bio })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res
                    .status(404)
                    .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
            }

            res.json(updatedUser);
        })
        .catch((error) => {
            res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
        });
});

module.exports = server;