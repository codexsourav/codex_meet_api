export const newAcountMail = (username, link) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Codex Meet</title>
    
</head>
<body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div class="container" style="max-width: 600px; margin: 50px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Welcome to Codex Meet!</h2>
        <p style="color: #555;">Dear ${username},</p>
        <p style="color: #555;">We're thrilled to have you on board. Codex Meet is your platform for seamless collaboration and communication. Get ready to experience a new way of working together!</p>
        <p style="color: #555;">To get started, click the button below:</p>
        <a href="${link}" class="btn" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px;">Activate Your Account</a>
        <p style="color: #555;">If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
        <p style="color: #555;"><a href="${link}">${link}</a></p>
        <div class="footer" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #777;">
            <p style="color: #555;">Thank you for choosing Codex Meet. If you have any questions or need assistance, feel free to contact our support team at codexsourav404@gmail.com.</p>
        </div>
    </div>
</body>
</html>
    `
};


export const resetPassMail = (name, link) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
</head>
<body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

  <div class="container" style="max-width: 600px; margin: 30px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333;">Password Reset - Codex Meet</h2>
    <p style="color: #666;">Hello ${name},</p>
    <p style="color: #666;">We received a request to reset your password. Click the button below to reset it:</p>
    <a href="${link}" class="button" style="display: inline-block; padding: 10px 20px; margin: 20px 0; text-decoration: none; background-color: #3498db; color: #fff; border-radius: 5px;">Reset Password</a>
    <p style="color: #666;">If you did not request a password reset, please ignore this email.</p>
    <p style="color: #666;">Thank you,<br>Codex Meet Team</p>
  </div>

  <div class="footer" style="margin-top: 30px; text-align: center; color: #888;">
    <p style="color: #666;">This email was sent by Codex Meet. Please do not reply to this email.</p>
  </div>

</body>
</html>

`
}

export const SuccessfullyChangePasswordMail = (name) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
</head>
<body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

  <div class="container" style="max-width: 600px; margin: 30px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h2>Password Change Successful</h2>
    <p style="color: #666;">Hello ${name},</p>
    <p style="color: #666;">Your password for Codex Meet has been successfully changed.</p>
    <p style="color: #666;">If you did not make this change, please contact us immediately.</p>
    <p style="color: #666;">Thank you for using Codex Meet.</p>
  </div>

  <div class="footer" style="margin-top: 30px; text-align: center; color: #888;">
    <p style="color: #666;">This email was sent by Codex Meet. Please do not reply to this email.</p>
  </div>

</body>
</html>

  `;
}


export const successfullyEmailVerified = (name) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
</head>
<body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

  <div class="container" style="max-width: 600px; margin: 30px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h2>Email Verification Successful</h2>
    <p style="color: #666;">Hello ${name},</p>
    <p style="color: #666;">Your email address has been successfully verified with Codex Meet.</p>
    <p style="color: #666;">Thank you for verifying your email and joining our community.</p>
    <p style="color: #666;">Best regards,<br>Codex Meet Team</p>
  </div>

  <div class="footer" style="margin-top: 30px; text-align: center; color: #888;">
    <p style="color: #666;">This email was sent by Codex Meet. Please do not reply to this email.</p>
  </div>

</body>
</html>

  `;
}