import User from "../models/Tb_userModel.js";
import Tb_ibuhamil from "../models/Tb_ibuhamilModel.js";
import Tb_bayi from "../models/Tb_bayiModel.js";
import argon2 from "argon2";

export const getIbuHamil = async (req, res) => {
  try {
    let response;
    if (req.role === "superadmin") {
      response = await Tb_ibuhamil.findAll({
        attributes: ["uuid", "nama_ibu", "email", "nama_suami", "role"],
        include: [
          {
            model: User,
            attributes: ["nama", "email"],
          },
          {
            model: Tb_bayi,
            attributes: ["nama_bayi", "jenis_klamin"],
          },
        ],
      });
    } else {
      response = await Tb_ibuhamil.findAll({
        attributes: [
          "uuid",
          "nama_ibu",
          "nik",
          "umur",
          "lama_nikah",
          "suku",
          "agama",
          "pendidikan",
          "pekerjaan",
          "alamat",
          "no_hp",
          "gol_darah",
          "no_bpjs",
          "tempat_periksa",
          "nama_suami",
          "umur_suami",
          "agama_suami",
          "suku_suami",
          "pendidikan_suami",
          "pekerjaan_suami",
          "alamat_suami",
          "no_hpsuami",
          "email",
        ],
        where: {
          tbUserId: req.tbUserId,
        },
        include: [
          {
            model: User,
            attributes: ["nama", "email"],
          },
          {
            model: Tb_bayi,
            attributes: ["nama_bayi", "jenis_klamin"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getIbuHamilById = async (req, res) => {
  try {
    const response = await Tb_ibuhamil.findOne({
      attributes: [
        "uuid",
        "nama_ibu",
        "nik",
        "umur",
        "lama_nikah",
        "suku",
        "agama",
        "pendidikan",
        "pekerjaan",
        "alamat",
        "no_hp",
        "gol_darah",
        "no_bpjs",
        "tempat_periksa",
        "nama_suami",
        "umur_suami",
        "agama_suami",
        "suku_suami",
        "pendidikan_suami",
        "pekerjaan_suami",
        "alamat_suami",
        "no_hpsuami",
        "email",
      ],
      where: {
        uuid: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["nama", "email"],
        },
        {
          model: Tb_bayi,
          attributes: ["nama_bayi", "jenis_klamin", "tnggl_lahir", "anak_ke"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createIbuHamil = async (req, res) => {
  const {
    nama_ibu,
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
    nama_suami,
    umur_suami,
    agama_suami,
    suku_suami,
    pendidikan_suami,
    pekerjaan_suami,
    alamat_suami,
    no_hpsuami,
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
    await Tb_ibuhamil.create({
      nama_ibu: nama_ibu,
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
      nama_suami: nama_suami,
      umur_suami: umur_suami,
      agama_suami: agama_suami,
      suku_suami: suku_suami,
      pendidikan_suami: pendidikan_suami,
      pekerjaan_suami: pekerjaan_suami,
      alamat_suami: alamat_suami,
      no_hpsuami: no_hpsuami,
      email: email,
      password: hashPassword,
      role: role,
      tbUserId: req.tbUserId,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateIbuHamil = async (req, res) => {
  const ibuhamil = await Tb_ibuhamil.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!ibuhamil) return res.status(404).json({ msg: "User tidak ditemukan" });
  const {
    nama_ibu,
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
    nama_suami,
    umur_suami,
    agama_suami,
    suku_suami,
    pendidikan_suami,
    pekerjaan_suami,
    alamat_suami,
    no_hpsuami,
    email,
    password,
    confPassword,
    role,
  } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = ibuhamil.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await Tb_ibuhamil.update(
      {
        nama_ibu: nama_ibu,
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
        nama_suami: nama_suami,
        umur_suami: umur_suami,
        agama_suami: agama_suami,
        suku_suami: suku_suami,
        pendidikan_suami: pendidikan_suami,
        pekerjaan_suami: pekerjaan_suami,
        alamat_suami: alamat_suami,
        no_hpsuami: no_hpsuami,
        email: email,
        password: hashPassword,
        role: role,
        tbUserId: req.tbUserId,
      },
      {
        where: {
          id: ibuhamil.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteIbuHamil = async (req, res) => {
  const ibuhamil = await Tb_ibuhamil.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!ibuhamil) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await Tb_ibuhamil.destroy({
      where: {
        id: ibuhamil.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
