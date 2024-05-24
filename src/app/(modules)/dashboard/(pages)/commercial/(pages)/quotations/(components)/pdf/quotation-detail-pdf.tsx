import { QuotationEntity } from "@/features/quotation/domain/entities/quotation.entity";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

export default function QuotationDetailPdf({ quotation }: { quotation: QuotationEntity }) {
  return (
    <Document>
      <Page size={"A4"}>
        <View>
          <Text>Quotation Detail</Text>
        </View>

        {quotation.quotationDetails.map((detail) => (
          <View key={detail.id}>
            <Text>{detail.product.name}</Text>
            <Text>{detail.product.category.name}</Text>
            <Text>{detail.quantity}</Text>
            <Text>{detail.price}</Text>
            <Text>{detail.total}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
