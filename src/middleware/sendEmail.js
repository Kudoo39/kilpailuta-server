import nodemailer from 'nodemailer'

export const sendEmailToManager = async ({ senderEmail, gigDetails }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MANAGER_HOSTNAME,
    port: process.env.MANAGER_PORT,
    secure: false,
    auth: {
      user: process.env.MANAGER_USERNAME,   
      pass: process.env.MANAGER_PASSWORD
    }
  })

  const mailOptions = {
    from: `"Gig System" <${process.env.MANAGER_EMAIL}>`,
    to: process.env.MANAGER_EMAIL,
    subject: `New Gig Posted by ${senderEmail}`,
    html: `
      <h1>New Gig Submission</h1>
      <p><strong>From:</strong> ${senderEmail}</p>
      <p><strong>Title:</strong> ${gigDetails.title}</p>
      <p><strong>Budget:</strong> €${gigDetails.budget}</p>
      <p><strong>Description:</strong></p>
      <div>${gigDetails.description}</div>
    `
  }

  await transporter.sendMail(mailOptions)
}
