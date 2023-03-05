import Tb_ibuhamil from "../models/Tb_ibuhamilModel.js";
import Tb_bayi from "../models/Tb_bayiModel.js";

export const getBayi = async (req, res) => {
  try {
    let response;
    if (req.role === "superadmin") {
      response = await Tb_bayi.findAll({
        attributes: ["nama_bayi", "jenis_kelamin", "tnggl_lahir"],
        include: [
          {
            model: Tb_ibuhamil,
            attributes: ["nama_ibu", "nama_suami"],
          },
        ],
      });
    } else {
      response = await Tb_bayi.findAll({
        attributes: ["nama_bayi", "jenis_kelamin", "tnggl_lahir"],
        where: {
          tbIbuhamilId: req.tbIbuhamilId,
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
