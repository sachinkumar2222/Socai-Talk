export const VERIFICATION_EMAIL_TEMPLATE = ({ verificationCode, companyName}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f3f3; font-family: 'Segoe UI', sans-serif;">

  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(to right, #00c9ff, #92fe9d); padding: 30px; text-align: center;">
      <h1 style="color: #fff; font-size: 26px; margin: 0;">🔐 Verify Your Email</h1>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #333;">Hello,</p>

      <p style="font-size: 16px; color: #333;">
        Thank you for signing up to <strong>${companyName}</strong>! To complete your registration, please use the verification code below:
      </p>

      <div style="background: #f0f4f8; padding: 25px; margin: 30px auto; text-align: center; border-radius: 10px; box-shadow: inset 0 0 10px rgba(0,0,0,0.05); max-width: 300px;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #00b894;">${verificationCode}</span>
      </div>

      <p style="font-size: 15px; color: #555;">This code will expire in <strong>15 minutes</strong> for your security.</p>
      <p style="font-size: 15px; color: #555;">If you didn't request this, you can safely ignore this email.</p>

      <p style="margin-top: 35px; font-size: 15px;">Warm regards,<br><strong>The ${companyName} Team</strong></p>
    </div>

    <!-- Footer -->
    <div style="background-color: #fafafa; text-align: center; padding: 20px; font-size: 12px; color: #888;">
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = ({ companyName}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset Successful</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', sans-serif;">

  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(to right, #00c9ff, #92fe9d); padding: 30px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 26px;">✅ Password Reset Successful</h1>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #333;">Hello,</p>

      <p style="font-size: 16px; color: #333;">
        We’re letting you know that your password was successfully reset for your <strong>${companyName}</strong> account.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #2ecc71; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 30px;">
          ✓
        </div>
      </div>

      <p style="font-size: 15px; color: #555;">
        If you did not request this change, please contact our support team immediately.
      </p>

      <p style="font-size: 15px; margin-top: 25px; font-weight: 500;">🔐 To help keep your account safe, we recommend:</p>
      <ul style="color: #555; font-size: 15px; padding-left: 20px; line-height: 1.7;">
        <li>Using a strong, unique password</li>
        <li>Enabling two-factor authentication (if available)</li>
        <li>Avoiding the reuse of passwords across different services</li>
      </ul>

      <p style="margin-top: 30px; font-size: 15px;">Thanks for being security conscious,</p>
      <p style="font-size: 15px;"><strong>The ${companyName} Team</strong></p>
    </div>

    <!-- Footer -->
    <div style="background-color: #fafafa; text-align: center; padding: 20px; font-size: 12px; color: #888;">
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = ({ resetURL, companyName }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', sans-serif;">

  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background: linear-gradient(to right, #00c9ff, #92fe9d); padding: 30px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 26px;">🔐 Reset Your Password</h1>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #333;">Hello,</p>

      <p style="font-size: 16px; color: #333;">
        We received a request to reset your password for your <strong>${companyName}</strong> account.
      </p>

      <p style="font-size: 16px; color: #333;">
        If you didn't make this request, you can safely ignore this email. Otherwise, click the button below to reset your password:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetURL}" style="background: #00b894; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; display: inline-block;">
          🔁 Reset Password
        </a>
      </div>

      <p style="font-size: 15px; color: #555;">
        This link will expire in <strong>1 hour</strong> for security reasons.
      </p>

      <p style="margin-top: 35px; font-size: 15px;">Warm regards,<br><strong>The ${companyName} Team</strong></p>
    </div>

    <!-- Footer -->
    <div style="background-color: #fafafa; text-align: center; padding: 20px; font-size: 12px; color: #888;">
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = ({ userName, companyName, unsubscribeURL }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to ${companyName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Segoe UI', sans-serif;">

  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background: linear-gradient(to right, #00b09b, #96c93d); padding: 30px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 28px;">🎉 Welcome to ${companyName}!</h1>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #333;">Hi <strong>${userName}</strong>,</p>
      
      <p style="font-size: 16px; color: #333;">
        We're thrilled to have you on board. Welcome to the <strong>${companyName}</strong> community — a place where conversations grow and ideas spark!
      </p>

      <p style="font-size: 16px; color: #333;">
        Your account has been successfully created. We’re here to help you connect, share, and thrive.
      </p>

      <p style="font-size: 16px; color: #333;">If you ever have any questions or feedback, just hit reply — we'd love to hear from you.</p>

      <p style="font-size: 16px; margin-top: 30px;">Cheers,<br/><strong>The ${companyName} Team</strong></p>
    </div>

    <!-- Footer -->
    <div style="background-color: #fafafa; text-align: center; padding: 20px; font-size: 12px; color: #888;">
      <p>This is an automated message. Please do not reply directly to this email.</p>
      <p>
        <a href="${unsubscribeURL}" style="color: #888; text-decoration: underline;">Unsubscribe</a> from future emails
      </p>
    </div>
  </div>
</body>
</html>
`;

