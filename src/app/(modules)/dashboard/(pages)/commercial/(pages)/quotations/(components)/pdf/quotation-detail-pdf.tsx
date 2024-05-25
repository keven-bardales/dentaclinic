// @ts-nocheck
import { QuotationEntity } from "@/features/quotation/domain/entities/quotation.entity";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Table, TableHeader, TableBody, TableCell, DataTableCell } from "@david.kucsai/react-pdf-table";

export default function QuotationDetailPdf({ quotation }: { quotation: QuotationEntity }) {
  const currencyFormatter = new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
  });

  const tableHeaderStyle = StyleSheet.create({
    header: {
      fontSize: 9,
      padding: 5,
    },
  });

  const tableCellStyle = StyleSheet.create({
    cell: {
      fontSize: 8,
      padding: 5,
      textAlign: "center",
    },
    cellPrice: {
      fontSize: 8,
      padding: 5,
      textAlign: "right",
    },
    cellTotalTitle: {
      fontSize: 8,
      padding: 5,
      textAlign: "center",
      fontWeight: "bold",
    },
  });

  const styleHeaderText = StyleSheet.create({
    marginBot: {
      marginBottom: 12,
    },
  });

  const StyledHeaderView = ({ children }: { children: any }) => {
    return <Text style={styleHeaderText.marginBot}>{children}</Text>;
  };

  const TableCellStyled = ({ children }: { children: any }) => {
    return <TableCell style={tableHeaderStyle.header}>{children}</TableCell>;
  };

  return (
    <Document>
      <Page
        style={{
          padding: 5,
        }}
        size={"A4"}
      >
        <View>
          <StyledHeaderView>{quotation.branchOffice?.company?.acronym}</StyledHeaderView>
          <StyledHeaderView>{quotation.branchOffice?.company?.name}</StyledHeaderView>
          <StyledHeaderView>{quotation.branchOffice?.address?.fullAddress}</StyledHeaderView>
          <StyledHeaderView>{`Tel: ${quotation.branchOffice?.branchOfficeFaxes?.filter((fax) => fax.isMainFax)?.[0]?.fax?.fax}`}</StyledHeaderView>
          <StyledHeaderView>{`Fax: ${
            quotation.branchOffice?.branchOfficePhones?.filter((phone) => phone.isMainPhone)?.[0]?.phone?.phone
          }`}</StyledHeaderView>
        </View>

        <View>
          <StyledHeaderView>Cotización</StyledHeaderView>
        </View>

        <View>
          <Text>Cliente</Text>
          <StyledHeaderView>{quotation.customer?.fullName}</StyledHeaderView>
        </View>

        <View>
          <Text>Proyecto</Text>
          <StyledHeaderView>{quotation?.project}</StyledHeaderView>
        </View>

        <View>
          <Text>Fecha</Text>
          <StyledHeaderView>{quotation?.createdAt.toLocaleDateString}</StyledHeaderView>
        </View>

        <View>
          <Text>Ubicacion</Text>
          <StyledHeaderView>{quotation?.address?.fullAddress}</StyledHeaderView>
        </View>

        <Table data={quotation.quotationDetails}>
          <TableHeader>
            <TableCell>Descripción</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>P.U (L.)</TableCell>
            <TableCell>Total</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell style={tableCellStyle.cell} getContent={(detail: (typeof quotation.quotationDetails)[0]) => detail.description} />
            <DataTableCell style={tableCellStyle.cell} getContent={(detail: (typeof quotation.quotationDetails)[0]) => detail.quantity} />
            <DataTableCell
              style={tableCellStyle.cell}
              getContent={(detail: (typeof quotation.quotationDetails)[0]) => currencyFormatter.format(detail.price)}
            />
            <DataTableCell
              style={tableCellStyle.cellPrice}
              getContent={(detail: (typeof quotation.quotationDetails)[0]) => currencyFormatter.format(detail.total)}
            />
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableCell includeTopBorder={false} style={tableCellStyle.cell}></TableCell>
            <TableCell includeTopBorder={false} style={tableCellStyle.cell}></TableCell>
            <TableCell includeTopBorder={false} style={tableCellStyle.cellTotalTitle}>
              Total
            </TableCell>
            <TableCell includeTopBorder={false} style={tableCellStyle.cellPrice}>
              {currencyFormatter.format(quotation.total)}
            </TableCell>
          </TableHeader>
        </Table>

        {/* make totals */}
      </Page>
    </Document>
  );
}
