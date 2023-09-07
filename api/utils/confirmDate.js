const mailgen = require("mailgen");
const nodemailer = require("nodemailer");
const UserModel = require("../schemas/User");
const EstateModel = require("../schemas/Estate");

const confirmMail = (userId, propertyId, dateId) => {
  EstateModel.findById(propertyId)
    .then((response) => {
      const date = response.date.find((e) => e._id == dateId);

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
              intro: `${response.lastName} ${response.name}, tu cita se ha confirmado para el dia ${date.date} a horas ${date.hour}`,
              outro: "Si tienes algun inconveniente, por favor haznoslo saber!",
            },
          };
          const emailBodyHtml = mailGenerator.generate(emailBody);

          const mailOptions = {
            from: process.env.EMAIL_NOTIFICATION,
            to: response.email,
            subject: "Cita Confirmada",
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
    })
    .catch((err) => console.log(err));
};

module.exports = confirmMail;
