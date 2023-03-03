import Admin from "../models/AdminModel.js";
import IbuHamil from "../models/IbuHamilModel.js";
import argon2 from "argon2";

export const loginAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(admin.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Password Tidak Sesuai" });
  req.session.adminId = admin.uuid;
  const uuid = admin.uuid;
  const nama = admin.nama;
  const umur = admin.umur;
  const prodi = admin.prodi;
  const semester = admin.semester;
  const no_hp = admin.no_hp;
  const alamat = admin.alamat;
  const email = admin.email;
  const role = admin.role;
  res
    .status(200)
    .json({ uuid, nama, umur, prodi, semester, no_hp, alamat, email, role });
};

export const meAdmin = async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const admin = await Admin.findOne({
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
      uuid: req.session.adminId,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(admin);
};

export const logOutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};

// Login Ibu Hamil
export const loginIbuHamil = async (req, res) => {
  const ibuhamil = await IbuHamil.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!ibuhamil) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(ibuhamil.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });
  req.session.ibuhamilId = ibuhamil.uuid;
  const uuid = ibuhamil.uuid;
  const nama = ibuhamil.nama;
  const email = ibuhamil.email;
  const role = ibuhamil.role;
  res.status(200).json({ uuid, nama, email, role });
};

export const meIbuHamil = async (req, res) => {
  if (!req.session.ibuhamilId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const ibuhamil = await IbuHamil.findOne({
    attributes: ["uuid", "nama", "email", "role"],
    where: {
      uuid: req.session.ibuhamilId,
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
