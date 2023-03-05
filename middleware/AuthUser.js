import User from "../models/Tb_userModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.tbUserId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const user = await User.findOne({
    where: {
      uuid: req.session.tbUserId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.tbUserId = user.id;
  req.role = user.role;
  next();
};

export const superAdminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.tbUserId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "superadmin")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};

// ibu hamil
// export const adminOnly = async (req, res, next) => {
//   const admin = await Admin.findAll({
//     where: {
//       uuid: req.session.adminId,
//     },
//   });
//   if (!admin) return res.status(404).json({ msg: "User tidak ditemukan" });
//   if (admin.role !== "admin")
//     return res.status(403).json({ msg: "Akses terlarang" });
//   next();
// };
