const sendToken = (user, statusCode, res) => {
  // Create JWT token
  const token = user.getJwtToken();
  // Options for cookie

  const isProd = process.env.NODE_ENV === "production";
  const isHTTPS = req.secure || req.headers["x-forwarded-proto"] === "https";

  const options = {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: isProd && isHTTPS,  // ✅ smarter check
    sameSite: isProd ? "none" : "lax",

    // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    // secure: process.env.NODE_ENV === 'production',
    // secure: false,
    // domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
  };

  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: isProd && isHTTPS,  // ✅ smarter check
  //   sameSite: isProd ? "none" : "lax",
  // });

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user
    });
};

export default sendToken;