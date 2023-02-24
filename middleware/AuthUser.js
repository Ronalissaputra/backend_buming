import Admin from "../models/AdminModel.js";

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

export const admin1Only = async (req, res, next) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.session.adminId,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (admin.role !== "admin1")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};

export const admin2Only = async (req, res, next) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.session.adminId,
    },
  });
  if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (admin.role !== "admin2")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};
