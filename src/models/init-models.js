import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _binh_luan from  "./binh_luan.js";
import _hinh_anh from  "./hinh_anh.js";
import _luu_anh from  "./luu_anh.js";
import _luu_anh1 from  "./luu_anh1.js";
import _nguoi_dung from  "./nguoi_dung.js";

export default function initModels(sequelize) {
  const binh_luan = _binh_luan.init(sequelize, DataTypes);
  const hinh_anh = _hinh_anh.init(sequelize, DataTypes);
  const luu_anh = _luu_anh.init(sequelize, DataTypes);
  const luu_anh1 = _luu_anh1.init(sequelize, DataTypes);
  const nguoi_dung = _nguoi_dung.init(sequelize, DataTypes);

  hinh_anh.belongsToMany(nguoi_dung, { as: 'nguoi_dung_id_nguoi_dungs', through: luu_anh, foreignKey: "hinh_id", otherKey: "nguoi_dung_id" });
  hinh_anh.belongsToMany(nguoi_dung, { as: 'nguoi_dung_id_nguoi_dung_luu_anh1s', through: luu_anh1, foreignKey: "hinh_id", otherKey: "nguoi_dung_id" });
  nguoi_dung.belongsToMany(hinh_anh, { as: 'hinh_id_hinh_anhs', through: luu_anh, foreignKey: "nguoi_dung_id", otherKey: "hinh_id" });
  nguoi_dung.belongsToMany(hinh_anh, { as: 'hinh_id_hinh_anh_luu_anh1s', through: luu_anh1, foreignKey: "nguoi_dung_id", otherKey: "hinh_id" });
  binh_luan.belongsTo(hinh_anh, { as: "hinh", foreignKey: "hinh_id"});
  hinh_anh.hasMany(binh_luan, { as: "binh_luans", foreignKey: "hinh_id"});
  luu_anh.belongsTo(hinh_anh, { as: "hinh", foreignKey: "hinh_id"});
  hinh_anh.hasMany(luu_anh, { as: "luu_anhs", foreignKey: "hinh_id"});
  luu_anh1.belongsTo(hinh_anh, { as: "hinh", foreignKey: "hinh_id"});
  hinh_anh.hasMany(luu_anh1, { as: "luu_anh1s", foreignKey: "hinh_id"});
  binh_luan.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(binh_luan, { as: "binh_luans", foreignKey: "nguoi_dung_id"});
  hinh_anh.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(hinh_anh, { as: "hinh_anhs", foreignKey: "nguoi_dung_id"});
  luu_anh.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(luu_anh, { as: "luu_anhs", foreignKey: "nguoi_dung_id"});
  luu_anh1.belongsTo(nguoi_dung, { as: "nguoi_dung", foreignKey: "nguoi_dung_id"});
  nguoi_dung.hasMany(luu_anh1, { as: "luu_anh1s", foreignKey: "nguoi_dung_id"});

  return {
    binh_luan,
    hinh_anh,
    luu_anh,
    luu_anh1,
    nguoi_dung,
  };
}
