import { Role } from "@prisma/client";

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
    username: "admin",
    password: "$2a$10$Sl.FF/O0NokR4cJRxu/35.bwFhohoPUHUgNgjBUoTrvCYMI0Kj/KG",
    name: "Admin",
    role: Role.ADMIN,
  },
  {
    id: 3,
    username: "user01",
    password: "$2a$10$Sl.FF/O0NokR4cJRxu/35.bwFhohoPUHUgNgjBUoTrvCYMI0Kj/KG",
    name: "User 01",
    role: Role.USER,
  },
  {
    id: 4,
    username: "user02",
    password: "$2a$10$Sl.FF/O0NokR4cJRxu/35.bwFhohoPUHUgNgjBUoTrvCYMI0Kj/KG",
    name: "User 02",
    role: Role.USER,
  },
];
