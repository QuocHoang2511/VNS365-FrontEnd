export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export enum Status {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const STATUS = {
  PENDING: "Chờ duyệt",
  APPROVED: "Đã duyệt",
  REJECTED: "Từ chối",
};

export const Role = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const ROLE = {
  ADMIN: "Quản trị viên",
  USER: "Người dùng",
};

export enum Region {
  NORTH = "NORTH",
  CENTRAL = "CENTRAL",
  SOUTH = "SOUTH",
}

export const REGION = {
  NORTH: "Miền Bắc",
  CENTRAL: "Miền Trung",
  SOUTH: "Miền Nam",
};

export const COLOR_STATUS = {
  PENDING: "yellow",
  APPROVED: "green",
  REJECTED: "red",
};
