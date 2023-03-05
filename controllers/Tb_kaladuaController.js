import Tb_ibuhamil from "../models/Tb_ibuhamilModel.js";
import Tb_kaladua from "../models/Tb_kaladuaModel.js";

export const getKaladua = async (req, res) => {
  try {
    let response;
    if (req.role === "superadmin") {
      response = await Tb_kaladua.findAll({
        attributes: ["keadaan_umum", "kesadaran", "kondisi_saatlahir"],
        include: [
          {
            model: Tb_ibuhamil,
            attributes: ["nama_ibu", "nama_suami"],
          },
        ],
      });
    } else {
      response = await Tb_kaladua.findAll({
        attributes: ["keadaan_umum", "kesadaran", "kondisi_saatlahir"],
        where: {
          ibuhamilId: req.ibuhamilId,
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
