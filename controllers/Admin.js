import Admin from "../models/AdminModel.js";
import argon2 from "argon2";

export const getAdmin = async (req, res) => {
  try {
    const response = await Admin.findAll({
      attributes: [
        "id",
        "uuid",
        "nama",
        "umur",
        "prodi",
        "semester",
        "no_hp",
        "email",
        "role",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const response = await Admin.findOne({
      attributes: [
        "id",
        "uuid",
        "nama",
        "umur",
        "prodi",
        "semester",
        "no_hp",
        "email",
        "role",
      ],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createAdmin = async (req, res) => {
  const {
    nama,
    umur,
    prodi,
    semester,
    no_hp,
    alamat,
    email,
    password,
    confPassword,
    role,
  } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await Admin.create({
      nama: nama,
      umur: umur,
      prodi: prodi,
      semester: semester,
      no_hp: no_hp,
      alamat: alamat,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
  const {
    nama,
    umur,
    prodi,
    semester,
    no_hp,
    alamat,
    email,
    password,
    confPassword,
    role,
  } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = admin.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await Admin.update(
      {
        nama: nama,
        umur: umur,
        prodi: prodi,
        semester: semester,
        no_hp: no_hp,
        alamat: alamat,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: admin.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await Admin.destroy({
      where: {
        id: admin.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
