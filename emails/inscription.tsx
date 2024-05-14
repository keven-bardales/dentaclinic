import { Body, Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from "@react-email/components";
import * as React from "react";
import logoGrupoPlatino from "@/root/public/logos/logo_grupo_platino_gray.png";

export interface InscriptionEmailProps {
  clientName: string;
}

export const InscriptionEmail = ({ clientName }: InscriptionEmailProps) => (
  <Html>
    <Head />
    <Preview>Grupo Platino Construyendo oportunidades</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img width="170" src={"https://platinosoftware.blob.core.windows.net/develop/logo_black.png"} alt="Logo Grupo Platino" style={logo} />
        <Text style={paragraph}>Hola {clientName},</Text>
        <Text style={paragraph}>
          ¡Gracias por proporcionar tu información en Expoconstruye 2024! Apreciamos mucho tu interés en nuestros productos y servicios. Nos pondremos
          en contacto contigo pronto para proporcionarte más detalles sobre los productos que has preguntado. Si tienes alguna otra pregunta o
          necesitas más información mientras tanto, no dudes en acercarte a nuestro stand. ¡Esperamos poder ayudarte y satisfacer tus necesidades!,
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://www.grupoplatino.hn/">
            Visitanos en nuestro sitio web
          </Button>
        </Section>
        <Text style={paragraph}>
          Saludos cordiales,
          <br />
          Grupo Platino
        </Text>
        <Hr style={hr} />
        <Text style={footer}>info@grupoplatino.hn</Text>
        <Text style={footer}>+504-2545-8475</Text>
        <Text style={footer}>Ent. a Lomas Del Carmen, Blvr. del Este, San Pedro Sula 21101</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#F6AA1C",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
