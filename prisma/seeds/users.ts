import { Prisma, Role } from "@prisma/client";

export const users = [
  {
    id: 1,
    username: "phuongvd",
    password: "$2a$10$Sl.FF/O0NokR4cJRxu/35.bwFhohoPUHUgNgjBUoTrvCYMI0Kj/KG",
    name: "Vu Duc Phuong",
    role: Role.ADMIN,
  },
  {
    id: 2,
    username: "nhatpa",
    password: "$2a$10$Sl.FF/O0NokR4cJRxu/35.bwFhohoPUHUgNgjBUoTrvCYMI0Kj/KG",
    name: "Pham Anh Nhat",
    role: Role.ADMIN,
  },
  {
    id: 3,
    username: "tamnt",
    password: "$2a$10$Sl.FF/O0NokR4cJRxu/35.bwFhohoPUHUgNgjBUoTrvCYMI0Kj/KG",
    name: "Nguyen Thanh Tam",
    role: Role.TEACHER,
  },
  {
    id: 4,
    username: "hoan",
    password: "$2a$10$Sl.FF/O0NokR4cJRxu/35.bwFhohoPUHUgNgjBUoTrvCYMI0Kj/KG",
    name: "Nhat Hoa",
    role: Role.TEACHER,
  },
  {
    id: 5,
    username: "hungvt",
    password: "$2a$10$Sl.FF/O0NokR4cJRxu/35.bwFhohoPUHUgNgjBUoTrvCYMI0Kj/KG",
    name: "Vo Tuan Hung",
    role: Role.STUDENT,
  },
];
