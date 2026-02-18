import express from "express";
import {
  handleCreateDocs,
  handleDeleteDocs,
  handleGetAllDocs,
  handleGetSingleDocs,
  handleUpdateDocs,
} from "../controllers/doc.controller.js";

const router = express.Router();

router.get("/all", handleGetAllDocs);
router.get("/:id", handleGetSingleDocs);
router.post("/create", handleCreateDocs);
router.post("/update/:id", handleUpdateDocs);
router.delete("/:id", handleDeleteDocs);


export default router;