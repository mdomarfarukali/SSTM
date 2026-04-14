const sendToken = (user, statusCode, res) => {
  // Create JWT token
  const token = user.getJwtToken();
  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
  };

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