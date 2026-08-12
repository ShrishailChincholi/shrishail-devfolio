const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (text = "") => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const sendContactEmail = async ({
  name,
  email,
  message
}) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  try {
    const { data, error } = await resend.emails.send({
      // This is the FROM address (your portfolio email)
      from: process.env.EMAIL_FROM,
      
      // TO: Your email (you receive the message)
      to: [process.env.EMAIL_TO],
      
      subject: `New Portfolio Message from ${name}`,
      
      // REPLY-TO: Visitor's email (so you can reply to them)
      replyTo: email,

      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Portfolio Contact</title>
        </head>

        <body style="
          margin:0;
          padding:0;
          background:#f5f5f5;
          font-family:Arial,sans-serif;
        ">

          <div style="
            max-width:650px;
            margin:40px auto;
            background:#ffffff;
            border-radius:12px;
            padding:30px;
          ">

            <h1 style="
              color:#7048ff;
              margin-bottom:25px;
            ">
              New Portfolio Message
            </h1>

            <p>
              <strong>Name:</strong>
              ${safeName}
            </p>

            <p>
              <strong>Email:</strong>
              ${safeEmail}
            </p>

            <hr style="
              border:none;
              border-top:1px solid #eeeeee;
              margin:25px 0;
            ">

            <h3>Message</h3>

            <div style="
              background:#f7f7f7;
              padding:20px;
              border-radius:8px;
              line-height:1.7;
              white-space:pre-wrap;
            ">
              ${safeMessage}
            </div>

            <p style="
              margin-top:30px;
              color:#777;
              font-size:13px;
            ">
              This message was sent from your portfolio website.
            </p>

            <hr style="
              border:none;
              border-top:1px solid #eeeeee;
              margin:25px 0;
            ">

            <p style="
              color:#777;
              font-size:12px;
            ">
              Reply to this email to respond to ${safeName} at ${safeEmail}
            </p>

          </div>

        </body>
        </html>
      `,

      text: `
New Portfolio Message

Name: ${name}

Email: ${email}

Message:

${message}

---
Reply to this email to respond to ${name} at ${email}
      `
    });

    if (error) {
      console.error('[Resend API Error]:', error);
      throw new Error(error.message || "Email sending failed");
    }

    console.log('✅ Email sent successfully to:', process.env.EMAIL_TO);
    console.log('📧 From visitor:', email);
    return data;

  } catch (error) {
    console.error('❌ Email error:', error);
    throw error;
  }
};

module.exports = sendContactEmail;