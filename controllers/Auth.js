import User from "../models/Tb_userModel.js";
import Tb_ibuhamil from "../models/tb_IbuHamilModel.js";
import argon2 from "argon2";

export const loginAdmin = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Password Tidak Sesuai" });
  req.session.tbUserId = user.uuid;
  const uuid = user.uuid;
  const nama = user.nama;
  const umur = user.umur;
  const prodi = user.prodi;
  const semester = user.semester;
  const no_hp = user.no_hp;
  const alamat = user.alamat;
  const email = user.email;
  const role = user.role;
  res
    .status(200)
    .json({ uuid, nama, umur, prodi, semester, no_hp, alamat, email, role });
};

export const meAdmin = async (req, res) => {
  if (!req.session.tbUserId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const user = await User.findOne({
    attributes: [
      "uuid",
      "nama",
      "umur",
      "prodi",
      "semester",
      "no_hp",
      "alamat",
      "email",
      "role",
    ],
    where: {
      uuid: req.session.tbUserId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const logOutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};

// Login Ibu Hamil
export const loginIbuHamil = async (req, res) => {
  const ibuhamil = await Tb_ibuhamil.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!ibuhamil) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(ibuhamil.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });
  req.session.tbIbuhamilId = ibuhamil.uuid;
  const uuid = ibuhamil.uuid;
  const nama_ibu = ibuhamil.nama_ibu;
  const email = ibuhamil.email;
  const role = ibuhamil.role;
  res.status(200).json({ uuid, nama_ibu, email, role });
};

export const meIbuHamil = async (req, res) => {
  if (!req.session.tbIbuhamilId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const ibuhamil = await Tb_ibuhamil.findOne({
    attributes: ["uuid", "nama_ibu", "email", "role"],
    where: {
      uuid: req.session.tbIbuhamilId,
    },
  });
  if (!ibuhamil) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(ibuhamil);
};

export const logoutIbuHamil = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
