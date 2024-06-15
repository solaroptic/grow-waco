import { Resend } from "resend";

export const sendEmail = async (email, subject, URL_text) => {
  const resend = new Resend("re_PL8NGUqp_9UPADAssapGRFGJKBLdwnvxv");
  try {
    await resend.emails.send({
      from: "accounts@growwaco.org",
      to: email,
      subject: subject,
      html: `<strong>Welcome to Grow Waco </strong> <p>Click <a href=${URL_text}>here</a> to verify your email</p>`,
    });
  } catch (error) {
    console.log("🚀 ~ file: sendEmail.js ~ line 17 ~ sendEmail ~ error", error);
  }
};
