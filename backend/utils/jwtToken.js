export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // Determine the cookie name based on the user's role
  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      // ✅ COOKIE_EXPIRE converted to number of days
      expires: new Date(
        Date.now() + Number(process.env.COOKIE_EXPIRY) * 24 * 60 * 60 * 1000
      ),
    })
     
    .json({
      success: true,
      message,
      user,
      token,
    });
};