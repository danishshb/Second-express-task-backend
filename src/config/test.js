exports.updatePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, token } = req.body;
    if (confirmPassword !== newPassword)
      return res
        .status(400)
        .json({ message: "Passwords should match each other." });

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findOne({
      email: decoded.user.email,
      name: decoded.user.name,
      _id: decoded.user._id,
      forget_password_token: token,
    });

    if (!user) return res.status(404).json({ message: "Access failed." });

    const hashedPassword = await bcrypt.hash(confirmPassword, 10);

    await User.findOneAndUpdate(
      {
        _id: decoded.user._id,
        forget_password_token: token,
      },
      {
        password: hashedPassword,
        forget_password_token: null,
      }
    );

    const authToken = jwt.sign(
      { email: user.email, userId: user._id },
      JWT_SECRET_KEY,
      { expiresIn: "12h" }
    );

    return res.status(200).json({
      message: "Password updated.",
      token: authToken,
      userId: user._id,
      userType: user.userType,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() })
      .select("-password")
      .lean()
      .exec();
    if (!user)
      return res.status(404).json({
        error: "No account found with this email. Double-check and try again.",
      });
    const token = getLinkToken(user, "900s");

    const firstName = user.firstName;
    const link = `${FRONTEND_URL}/reset-password?token=${token}`;

    const templatePath = path.join(__dirname, "../utils/resetPassword.html");

    const deliveryHTML = fs.readFileSync(templatePath, "utf-8");

    const dynamicHTML = deliveryHTML
      .replace(/{{RECPFNAME}}/g, `${firstName}`)
      .replace(/{{RLINK}}/g, `${link}`);
    const emailData = {
      email: user.email,
      subject: "Reset Your Password",
      message: dynamicHTML,
    };

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "info@aga-tax.com",
            Name: "AGA Tax",
          },
          To: [
            {
              Email: emailData.email,
              Name: `${user.firstName} ${user.lastName}`,
            },
          ],
          Subject: emailData.subject,
          TextPart: "Reset your password",
          HTMLPart: emailData.message,
        },
      ],
    });

    try {
      await request;
    } catch (error) {
      console.error("Mailjet API Error:", error);
    }

    await User.findOneAndUpdate(
      { email },
      {
        forget_password_token: token,
      }
    );
    return res.status(200).json({ link });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong!" });
  }
};

exports.verifyLinkToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res
        .status(404)
        .json({ message: "token is required.", link_alive: false });
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findOne({
      email: decoded.user.email,
      name: decoded.user.name,
      _id: decoded.user._id,
      forget_password_token: token,
    });
    if (!user)
      return res
        .status(404)
        .json({ message: "access failed.", link_alive: false });

    return res.status(200).json({ link_alive: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ ...err, link_alive: false });
  }
};


209.38.164.171
DanishDlet@17$l