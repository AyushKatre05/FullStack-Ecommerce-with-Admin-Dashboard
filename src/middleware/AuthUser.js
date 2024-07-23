import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const AuthUser = async (req) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return false;
  }

  try {
    const extractAuthUserInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (extractAuthUserInfo) {
      console.log("Authenticated User Info:", extractAuthUserInfo);
      return extractAuthUserInfo;
    }
  } catch (e) {
    console.log("JWT verification error:", e);
    return false;
  }
};

export default AuthUser;
