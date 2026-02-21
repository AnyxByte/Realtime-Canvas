import { Doc } from "../models/doc.model.js";
import resend from "../utils/email.js";

export const handleGetAllDocs = async (req, res) => {
  try {
    const userId = req.user.id;

    const doc = await Doc.find({
      $or: [{ createdBy: userId }, { collaborators: userId }],
    })
      .populate("createdBy", "username")
      .populate("collaborators", "username");

    return res.status(200).json({
      msg: "fetched docs successfully",
      doc,
    });
  } catch (error) {
    console.log("handleGetAllDocs error:- ", error);
    return res.status(500).json({
      msg: "server error",
    });
  }
};

export const handleCreateDocs = async (req, res) => {
  try {
    const { name, content, collaborators } = req.body;
    const userId = req.user.id;

    const collaboratorsId = collaborators.map((u) => u.userId) || [];
    const collaboratorsEmail = collaborators.map((u) => u.email) || [];

    const doc = await Doc.create({
      name,
      content,
      createdBy: userId,
      collaborators: collaboratorsId,
    });

    //send message to collaborators using nodemailers

    if (collaboratorsEmail.length > 0) {
      await resend.emails.send({
        from: "Whiteboard <onboarding@resend.dev>",
        to: collaboratorsEmail,
        subject: "Added to Document",
        html: `
        
         <p>${req.user.email} added you to a document.</p>
            <a href="${process.env.CLIENT_URL}/doc/${doc._id}">
              Open Document
            </a>`,
      });
    }

    return res.status(200).json({
      msg: "Document created successfully",
    });
  } catch (error) {
    console.log("handleCreateDocs error:- ", error);
    return res.status(500).json({
      msg: "server error",
    });
  }
};

export const handleGetSingleDocs = async (req, res) => {
  try {
    const docId = req.params.id;

    if (!docId) {
      return res.status(400).json({
        msg: "no document id",
      });
    }

    const doc = await Doc.findById(docId);

    if (!doc) {
      return res.status(400).json({
        msg: "no such document",
      });
    }

    return res.status(200).json({
      msg: "fetched successfully",
      doc,
    });
  } catch (error) {
    console.log("handleGetSingleDocs error:- ", error);
    return res.status(500).json({
      msg: "server error",
    });
  }
};

export const handleDeleteDocs = async (req, res) => {
  try {
    const docId = req.params.id;

    if (!docId) {
      return res.status(400).json({
        msg: "no document id",
      });
    }

    const doc = await Doc.findByIdAndDelete(docId);

    if (!doc) {
      return res.status(400).json({
        msg: "no such document",
      });
    }

    return res.status(200).json({
      msg: "deleted successfully",
    });
  } catch (error) {
    console.log("handleDeleteDocs error:- ", error);
    return res.status(500).json({
      msg: "server error",
    });
  }
};

export const handleUpdateDocs = async (req, res) => {
  try {
    const docId = req.params.id;

    const { name, content } = req.body;

    if (!docId || !name || !content) {
      return res.status(400).json({
        msg: "Missing fields",
      });
    }

    const doc = await Doc.findByIdAndUpdate(
      docId,
      {
        name,
        content,
      },
      {
        new: true,
      },
    );

    if (!doc) {
      return res.status(400).json({
        msg: "no such document",
      });
    }

    return res.status(200).json({
      msg: "doc updated successfully",
      doc,
    });
  } catch (error) {
    console.log("handleUpdateDocs error:- ", error);
    return res.status(500).json({
      msg: "server error",
    });
  }
};
