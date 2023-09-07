const mailgen = require("mailgen");
const nodemailer = require("nodemailer");
const Estate = require("../schemas/Estate");
const UserModel = require("../schemas/User");

const sendEmail = (userId) => {
  UserModel.findById(userId)
    .then((response) => {
      if (!response) console.log("error al encontrar");
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_NOTIFICATION,
          pass: process.env.PASSWORD_NOTIFICATION,
        },
      });
      const mailGenerator = new mailgen({
        theme: "salted",
        product: {
          name: "House Of Dev",
          link: "http://localhost:5173",
        },
        signature: "Saludos Cordiales",
      });
      const emailBody = {
        body: {
          name: response.name,
          intro: `Gracias! ${response.lastName} ${response.name} por agendar una cita en nuestra pagina`,
          action: {
            button: {
              color: "#22BC66",
              text: "Volver a la pagina",
              link: "http://localhost:5173",
            },
          },
          outro:
            "En las proximas horas un agente inmobiliario, confirmara tu cita",
        },
      };
      const emailBodyHtml = mailGenerator.generate(emailBody);

      const mailOptions = {
        from: process.env.EMAIL_NOTIFICATION,
        to: response.email,
        subject: "Cita Agendada",
        html: emailBodyHtml,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error al enviar el correo electrónico: ", error);
        } else {
          console.log("Correo electrónico enviado: ", info.response);
        }
      });
    })
    .catch((err) => console.log(err));
};

module.exports = sendEmail;
