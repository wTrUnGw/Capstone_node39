import { createToken } from "../config/jwt.js";
import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";

let model = initModels(sequelize);

// ĐĂNG NHẬP
export const login = async (req, res) => {
  try {
    let { email, mat_khau } = req.body;

    let existUser = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });

    // nếu đã tồn tại
    if (existUser) {
      if (bcrypt.compareSync(mat_khau, existUser.mat_khau)) {
        let token = createToken({nguoi_dung_id:existUser.nguoi_dung_id});

        responseData(res, "Đăng Nhập Thành Công", token, 200);
      } else {
        responseData(res, "Mật Khẩu Không Đúng", "", 400);
      }
    } else {
      // không tồn tại email nào
      responseData(res, "Email Không Đúng", "", 400);
    }
  } catch {
    responseData(res, "Lỗi từ backend..", "", 500);
  }
};

// ĐĂNG KÝ
export const signUp = async (req, res) => {
  try {
    let { email, mat_khau, ho_ten, tuoi } = req.body;

    let existUser = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });

    // nếu đã tồn tại
    if (existUser) {
      responseData(res, "Email đã tồn tại", "", 400);
      return; // để ngắt lệnh chạy tiếp
    }

    let newUser = {
      email,
      mat_khau: bcrypt.hashSync(mat_khau, 10),
      ho_ten,
      tuoi,
      anh_dai_dien: "",
    };

    // INSERT VÀO TABLE nguoi_dung
    await model.nguoi_dung.create(newUser);

    responseData(res, "Đăng ký thành công rồi", "", 200);
  } catch {
    responseData(res, "Lỗi từ backend..", "", 500);
  }
};