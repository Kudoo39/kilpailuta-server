import nodemailer from 'nodemailer'

export const sendEmailToManager = async ({ senderEmail, gigDetails }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false,
    auth: {
      user: 'postmaster@mail.kilpailuta365.fi',
      pass: process.env.MANAGER_PASSWORD
    }
  })

  const mailOptions = {
    from: '"Gig System" <no-reply@kilpailuta365.fi>',
    to: process.env.MANAGER_EMAIL,
    subject: `New Gig Posted by ${senderEmail}`,
    headers: {
      'X-Mailer': 'Nodemailer',
      'X-Priority': '3',
      'X-MSMail-Priority': 'Normal'
    },
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
        <h2 style="color: #2c3e50; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New Gig Submission</h2>
        <p>Hello Manager,</p>
        <p style="font-size: 16px;"><strong>Submitted by:</strong> ${senderEmail}</p>
        <p style="font-size: 16px;"><strong>Gig Title:</strong> ${gigDetails.title}</p>
        <p style="font-size: 16px;"><strong>Budget:</strong> €${gigDetails.budget}</p>
        <div style="margin-top: 20px;">
          <p style="font-size: 16px; margin-bottom: 5px;"><strong>Description:</strong></p>
          <div style="padding: 10px; background-color: #f9f9f9; border-radius: 4px; font-size: 15px; color: #333;">
            ${gigDetails.description}
          </div>
        </div>
        <p style="font-size: 13px; color: #aaa; margin-top: 30px;">This email was sent from Kilpailuta365.fi</p>
      </div>
    `
  }

  await transporter.sendMail(mailOptions)
}
