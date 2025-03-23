import express from "express";
import { Router } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.SECRET;

function verifyJwt(req, res, next) {
  const token = req.headers["x-access-token"];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ Menssage: "Não autorizado" });
    }
    req.id = decoded.id;
    next();
  });
}

export default verifyJwt;
