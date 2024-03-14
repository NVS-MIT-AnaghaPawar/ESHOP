const nodemailer = require("nodemailer");

async function Demo() {
  try {
    const config = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "martand.mahajan@mitaoe.ac.in",
        pass: "31122003",
      },
    });

    const sendemailnow = await config.sendMail({
      from: "martand.mahajan@mitaoe.ac.in",
      to: "martandmahajan03@gmail.com",
      subject: "test",
      text: "hello",
      html: "<h1>using html</h1>",
    });

    console.log("message sent: %s", sendemailnow.messageId);
    console.log("preview url: %s", nodemailer.getTestMessageUrl(sendemailnow));
  } catch (error) {
    console.error(error);
  }
}

export default Demo();
