import { Doc } from "../models/doc.model.js";

export const handleGetAllDocs = async (req, res) => {};

export const handleGetSingleDocs = async (req, res) => {};

export const handleCreateDocs = async (req, res) => {
  try {
    const { name, content } = req.body;
    const userId = req.user.id;

    await Doc.create({
      name,
      content,
      createdBy: userId,
    });
  } catch (error) {
    console.log("handleCreateDocs error:- ", error);
    return res.status(500).json({
      msg: "server error",
    });
  }
};

export const handleDeleteDocs = async (req, res) => {};

export const handleUpdateDocs = async (req, res) => {};
