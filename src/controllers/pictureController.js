import { Sequelize } from "sequelize";
import { createToken, decodeToken } from "../config/jwt.js";
import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";

let model = initModels(sequelize);
let Op = Sequelize.Op;

// LẤY TẤT CẢ CÁC ẢNH
export const getAllPicture = async (req, res) => {
  try {
    let data = await model.hinh_anh.findAll();
    responseData(res, "Thành Công", data, 200);
  } catch (error) {
    responseData(res, "Lỗi từ backend...", "", 500);
  }
};

// LẤY ẢNH THEO TÊN
export const getPictureByName = async (req, res) => {
  try {
    const { ten_hinh } = req.params; // Giả sử tên ảnh được truyền qua params

    // Sử dụng phương thức findAll với điều kiện tìm kiếm theo tên_anh
    let data = await model.hinh_anh.findAll({
      where: {
        ten_hinh: {
          [Op.like]: `%${ten_hinh}%`, // Sử dụng like để tìm kiếm một phần của tên
        },
      },
    });

    if (data.length > 0) {
      responseData(res, "Thành Công", data, 200);
    } else {
      responseData(res, "Không tìm thấy hình ảnh", "", 404);
    }
  } catch (error) {
    console.error(error);
    responseData(res, "Lỗi từ backend...", "", 500);
  }
};

// LẤY CHI TIẾT ẢNH KÈM THEO USER
export const getPictureDetail = async (req, res) => {
  let { hinh_id } = req.params;

  try {
    let data = await model.hinh_anh.findOne({
      where: {
        hinh_id,
      },
      include: ["nguoi_dung"],
      // hoặc include: [model.nguoi_dung] nhưng phải xóa tên bên init model
    });

    responseData(res, "Thành công", data, 200);
  } catch (error) {
    responseData(res, "Lỗi backend...", "", 200);
  }
};

// LẤY BÌNH LUẬN THEO ID ẢNH
export const getCommentById = async (req, res) => {
  let { hinh_id } = req.params;

  try {
    let data = await model.binh_luan.findAll({
      where: {
        hinh_id,
      },
      // include: ["hinh_anh"],
      // hoặc include: [model.nguoi_dung] nhưng phải xóa tên bên init model
    });

    responseData(res, "Thành công", data, 200);
  } catch (error) {
    responseData(res, "Lỗi backend...", "", 200);
  }
};

// LẤY TÌNH TRẠNG LƯU CỦA ẢNH
export const getSave = async (req, res) => {
  let { token } = req.headers;
  let { hinh_id } = req.params;

  let dToken = decodeToken(token);
  let { nguoi_dung_id } = dToken.data;

  try {
    let data = await model.luu_anh1.findOne({
      where: {
        nguoi_dung_id,
        hinh_id,
      },
    });

    if (data) {
      // Có dòng dữ liệu khớp với nguoi_dung_id và hinh_id
      responseData(res, "Đã lưu ảnh", data, 200);
    } else {
      // Không có dòng dữ liệu khớp
      responseData(res, "Chưa lưu ảnh", data, 200);
    }
  } catch (error) {
    console.error(error);
    responseData(res, "Lỗi backend...", "", 500);
  }
};

export const commentPicture = async (req, res) => {
  let { token } = req.headers;
  let { hinh_id, noi_dung } = req.body;

  let dToken = decodeToken(token);
  let { nguoi_dung_id } = dToken.data;

  try {
    // Sử dụng phương thức create để tạo mới một bình luận
    let newComment = await model.binh_luan.create({
      nguoi_dung_id: nguoi_dung_id,
      hinh_id: hinh_id,
      ngay_binh_luan: new Date(),
      noi_dung: noi_dung,
    });

    // newComment sẽ giữ thông tin của bình luận mới được tạo
    responseData(res, "Bình luận thành công", newComment, 200);
  } catch (error) {
    console.error(error);
    responseData(res, "Lỗi backend...", "", 500);
  }
};

export const deletePicture = async (req, res) => {
  let { token } = req.headers;
  let { hinh_id } = req.body;

  let dToken = decodeToken(token);
  let { nguoi_dung_id } = dToken.data;

  try {
    // Kiểm tra xem ảnh có tồn tại và thuộc về người dùng không
    let check = await model.hinh_anh.findOne({
      where: {
        hinh_id,
        nguoi_dung_id,
      },
    });

    if (check) {
      // Nếu ảnh tồn tại và thuộc về người dùng, thì xóa nó
      await model.hinh_anh.destroy({
        where: {
          hinh_id,
          nguoi_dung_id,
        },
      });

      responseData(res, "Xóa ảnh thành công", "", 200);
    } else {
      // Nếu không tìm thấy ảnh hoặc không thuộc về người dùng
      responseData(res, "Ảnh không tồn tại hoặc không thuộc về bạn", "", 404);
    }
  } catch (error) {
    console.error(error);
    responseData(res, "Lỗi backend...", "", 500);
  }
};