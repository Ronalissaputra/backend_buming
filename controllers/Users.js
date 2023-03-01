import Admin from "../models/AdminModel.js";
import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    let response;
    if (req.role === "superadmin") {
      response = await User.findAll({
        attributes: ["uuid", "name", "email", "role"],
        include: [
          {
            model: Admin,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await User.findAll({
        attributes: ["uuid", "nama", "email", "role"],
        where: {
          adminId: req.adminId,
        },
        include: [
          {
            model: Admin,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "nama", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const {
    nama,
    nik,
    umur,
    lama_nikah,
    suku,
    agama,
    pendidikan,
    pekerjaan,
    alamat,
    no_hp,
    gol_darah,
    no_bpjs,
    tempat_periksa,
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
    await User.create({
      nama: nama,
      nik: nik,
      umur: umur,
      lama_nikah: lama_nikah,
      suku: suku,
      agama: agama,
      pendidikan: pendidikan,
      pekerjaan: pekerjaan,
      alamat: alamat,
      no_hp: no_hp,
      gol_darah: gol_darah,
      no_bpjs: no_bpjs,
      tempat_periksa: tempat_periksa,
      email: email,
      password: hashPassword,
      role: role,
      adminId: req.adminId,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const {
    nama,
    nik,
    umur,
    lama_nikah,
    suku,
    agama,
    pendidikan,
    pekerjaan,
    alamat,
    no_hp,
    gol_darah,
    no_bpjs,
    tempat_periksa,
    email,
    password,
    confPassword,
    role,
  } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await User.update(
      {
        nama: nama,
        nik: nik,
        umur: umur,
        lama_nikah: lama_nikah,
        suku: suku,
        agama: agama,
        pendidikan: pendidikan,
        pekerjaan: pekerjaan,
        alamat: alamat,
        no_hp: no_hp,
        gol_darah: gol_darah,
        no_bpjs: no_bpjs,
        tempat_periksa: tempat_periksa,
        email: email,
        password: hashPassword,
        role: role,
        adminId: req.adminId,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
