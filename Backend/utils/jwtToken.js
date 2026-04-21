const sendToken = (user, statusCode, req, res) => {
  // 🔐 Create JWT token
  const token = user.getJwtToken();

  // 🌍 Environment check
  const isProd = process.env.NODE_ENV === "production";

  // 🔎 Detect HTTPS correctly (works behind proxy too)
  const isHTTPS =
    req.secure || req.headers["x-forwarded-proto"] === "https";

  // 🍪 Cookie options
  const options = {
    expires: new Date(
      Date.now() +
        (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,

    // ✅ Only secure when actually HTTPS
    secure: isProd && isHTTPS,

    // ✅ Required for cross-origin in production
    sameSite: isProd ? "none" : "lax",
  };

  // 📤 Send response
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user,
    });
};

export default sendToken;