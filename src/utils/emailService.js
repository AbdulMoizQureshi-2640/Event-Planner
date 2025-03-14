const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEventReminder = async (userEmail, eventName, eventDate) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Reminder: ${eventName}`,
      text: `This is a reminder for your event "${eventName}" scheduled for ${new Date(
        eventDate
      ).toLocaleString()}.`,
      html: `
        <h2>Event Reminder</h2>
        <p>This is a reminder for your event "<strong>${eventName}</strong>"</p>
        <p>Scheduled for: <strong>${new Date(
          eventDate
        ).toLocaleString()}</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = {
  sendEventReminder,
};
