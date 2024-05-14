"use server";
import * as z from "zod";

import Nodemailer from "nodemailer";
import { db } from "@/lib/db/db";
import { stripIndents } from "common-tags";
import { ApiResponse } from "@/features/common/wrappers/response-wrapper";
import { inscriptionSchema } from "../schemas/new-inscription-schema";
import { render } from "@react-email/render";
import { InscriptionEmail } from "@/root/emails/inscription";

export default async function newInscriptionAction(values: z.infer<typeof inscriptionSchema>): Promise<ApiResponse<any>> {
  const validatedFields = inscriptionSchema.safeParse(values);

  const { data, error } = validatedFields;

  if (!data) {
    const response = ApiResponse.error({
      errors: error.errors.map((e) => e.message),
      message: "Error en los campos",
      statusCode: 400,
    });

    return JSON.parse(JSON.stringify(response));
  }

  // const checkIfExists = await db.inscription.findFirst({
  //   where: {
  //     email: data.email,
  //   },
  // });

  // if (checkIfExists) {
  //   const response = ApiResponse.error({
  //     errors: ["Ya existe una inscripción con este correo electrónico"],
  //     message: "Ya existe una inscripción con este correo electrónico",
  //     statusCode: 400,
  //   });

  //   return JSON.parse(JSON.stringify(response));
  // }

  const inscription = await db.inscription.create({
    data: {
      city: data.city,
      email: data.email,
      name: data.fullName,
      company: data.company,
      phone: data.phone,
      description: data.description,
    },
  });

  sendEmail(data);

  const response = ApiResponse.success({
    data: inscription,
    message: "Muchas gracias por inscribirte en la Expoconstruye 2024",
    statusCode: 200,
  });

  return JSON.parse(JSON.stringify(response));
}

async function sendEmail(data: z.infer<typeof inscriptionSchema>) {
  const emailHtml = render(<InscriptionEmail clientName={data.fullName} />);

  try {
    const transportEmail = Nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    transportEmail.sendMail({
      from: `"Grupo Platino" <${process.env.SMTP_USER}>`,
      to: process.env.SEND_EMAIL_NOTIFICATIONS_TO,
      subject: "Grupo Platino te da la bienvenida a Expoconstruye 2024",
      html: emailHtml,
    });
  } catch (error) {}
}
