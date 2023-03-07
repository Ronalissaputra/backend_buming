import Tb_ibuhamil from "../models/Tb_ibuhamilModel.js";
import Tb_bayi from "../models/Tb_bayiModel.js";

export const getBayi = async (req, res) => {
  try {
    let response;
    if (req.role === "superadmin") {
      response = await Tb_bayi.findAll({
        attributes: ["nama_bayi", "jenis_klamin", "tnggl_lahir"],
        include: [
          {
            model: Tb_ibuhamil,
            attributes: ["nama_ibu", "nama_suami"],
          },
        ],
      });
    } else {
      response = await Tb_bayi.findAll({
        attributes: ["nama_bayi", "jenis_klamin", "tnggl_lahir"],
        where: {
          tbUserId: req.tbUserId,
        },
        include: [
          {
            model: Tb_ibuhamil,
            attributes: ["nama_ibu", "nama_suami"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBayi = async (req, res) => {
  const { nama_bayi, jenis_klamin, tnggl_lahir, anak_ke, tbIbuhamilId } =
    req.body;
  try {
    await Tb_bayi.create({
      nama_bayi: nama_bayi,
      jenis_klamin: jenis_klamin,
      tnggl_lahir: tnggl_lahir,
      anak_ke: anak_ke,
      tbIbuhamilId: tbIbuhamilId,
      tbUserId: req.tbUserId,
    });
    res.status(201).json({ msg: "Data tersimpan" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
