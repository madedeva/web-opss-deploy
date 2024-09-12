import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
        user: 'deva.kerti@undiksha.ac.id',
        pass: 'zntegtyxgvnqojbn'
    }
});

export async function sendResetPasswordEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: 'deva.kerti@undiksha.ac.id',
    to: email,
    subject: 'Password Reset Request',
    text: `You have requested a password reset. Please use the following link to reset your password: ${resetUrl}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f7; padding: 20px; color: #51545e;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <div style="padding: 20px; text-align: center; background-color: #172554; color: white;">
            <h1 style="margin: 0;">Password Reset Request</h1>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px;">Hello,</p>
            <p style="font-size: 16px;">
              We received a request to reset your password. Click the button below to reset it:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #172554; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 5px; font-size: 16px;">
                Reset Password
              </a>
            </div>
            <p style="font-size: 16px;">
              If you didn't request a password reset, please ignore this email or contact our support team if you have any questions.
            </p>
            <p style="font-size: 16px;">
              Thank you,<br/>
              <strong>OPSS Team</strong>
            </p>
          </div>
          <div style="padding: 20px; text-align: center; background-color: #f4f4f7; color: #6b6e76; font-size: 14px;">
            <p style="margin: 0;">If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
            <p style="word-break: break-all;">${resetUrl}</p>
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
