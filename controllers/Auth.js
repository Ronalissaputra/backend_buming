import Admin from "../models/AdminModel.js";
import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(admin.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });
  req.session.adminId = admin.uuid;
  const uuid = admin.uuid;
  const name = admin.name;
  const email = admin.email;
  const role = admin.role;
  res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const admin = await Admin.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.adminId,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(admin);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};

// Login User
export const LoginUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Wrong Password" });
  req.session.adminId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ uuid, name, email, role });
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
