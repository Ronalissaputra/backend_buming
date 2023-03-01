import Admin from "../models/AdminModel.js";
import Users from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.adminId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const admin = await Admin.findOne({
    where: {
      uuid: req.session.adminId,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.adminId = admin.id;
  req.role = admin.role;
  next();
};

export const superAdminOnly = async (req, res, next) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.session.adminId,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (admin.role !== "superadmin")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};

// ibu hamil
export const adminOnly = async (req, res, next) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.session.adminId,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (admin.role !== "admin")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};

export const dminOnly = async (req, res, next) => {
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "admin")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};
