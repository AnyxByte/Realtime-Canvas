import jwt from "jsonwebtoken"

export const auth = (res, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        msg: "Token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const verified = jwt.verify(token , process.env.JWT_SECRET);

    // if(verified){
    //   req.user = verified
    // }
    // to be continued 

  } catch (error) {
    console.log("error at auth middleware: ", error);
    return res.status(500).json({
      msg: "authorization error",
    });
  }
};
