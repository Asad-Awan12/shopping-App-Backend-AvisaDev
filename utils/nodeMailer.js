import { info } from 'console';
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'linktooali@gmail.com',
    pass: 'gypbpxclqqrvcuvs',
  }
});


function sendEmail(to,otp) {
    transporter.sendMail({
        to:to,
        otp:otp,
        html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin:auto;">
    <div style="background-color: white; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); padding: 40px; width: 100%; max-width: 420px; text-align: center;">
        <div style="margin-bottom: 32px;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 16px;">
                <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#4F46E5" stroke-width="1.5"/>
                <path d="M8.5 12C8.5 14.21 10.29 16 12.5 16C14.71 16 16.5 14.21 16.5 12C16.5 9.79 14.71 8 12.5 8" stroke="#4F46E5" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#4F46E5" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <h1 style="color: #111827; font-size: 24px; font-weight: 600; margin-bottom: 8px;">Verify Your Account</h1>
            <p style="color: #6B7280; font-size: 14px; margin: 0;">We've sent a verification code to your email</p>
            <p style="color: #6B7280; font-size: 14px; font-weight: 500;">${to}</p>
        </div>

        <form id="otpForm" style="margin-bottom: 32px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 32px; gap: 12px;">
                
                
            <h1 style="color: #111827; font-size: 30px; font-weight: 600; margin-bottom: 8px; display: flex; justify-content: center; align-items: center;">${otp}</h1>
            </div>

            <button type="submit" style="width: 100%; background-color: #4F46E5; color: white; border: none; border-radius: 8px; padding: 14px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background-color 0.2s;">Verify Account</button>
        </form>

        <div style="font-size: 14px; color: #6B7280;">
            <p>Didn't receive the code? <a href="#" style="color: #4F46E5; text-decoration: none; font-weight: 500;">Resend</a></p>
        </div></div>`,

    })
    console.log("senddd ",otp);
    console.log("senddd ",to);

    
}

export default sendEmail