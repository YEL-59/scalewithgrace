import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define professional styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 1.6,
    color: "#1f2937",
  },
  header: {
    marginBottom: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  nameBlock: {
    flexDirection: "column",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 12,
    marginTop: 2,
  },
  contact: {
    fontSize: 10,
    textAlign: "right",
    lineHeight: 1.4,
  },
  headerLine: {
    height: 1,
    backgroundColor: "#1f2937",
    marginTop: 8,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 10,
    marginBottom: 10,
  },
  recipientBlock: {
    marginBottom: 25,
  },
  section: {
    marginBottom: 15,
    textAlign: "justify",
  },
  closing: {
    marginTop: 30,
  },
  signature: {
    marginTop: 10,
    fontWeight: "bold",
  },
});

const CoverLetterPDF = ({ form, data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Stylish Line */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View style={styles.nameBlock}>
            <Text style={styles.name}>{form.name}</Text>
            <Text style={styles.title}>{form.title}</Text>
          </View>
          <View>
            <Text style={styles.contact}>{form.email}</Text>
            <Text style={styles.contact}>{form.phone}</Text>
          </View>
        </View>
        <View style={styles.headerLine} />
      </View>

      {/* Date and Recipient */}
      <View style={styles.recipientBlock}>
        <Text style={styles.dateText}>{new Date().toLocaleDateString()}</Text>
        {form.hiringManager && <Text>{form.hiringManager}</Text>}
        {form.company && <Text>{form.company}</Text>}
        {form.companyAddress && <Text>{form.companyAddress}</Text>}
      </View>

      {/* Greeting */}
      <Text style={styles.section}>
        Dear {form.hiringManager || "Hiring Manager"},
      </Text>

      {/* Letter Body */}
      <Text style={styles.section}>{data?.data?.intro}</Text>
      <Text style={styles.section}>{data?.data?.body}</Text>
      <Text style={styles.section}>{data?.data?.conclusion}</Text>

      {/* Closing */}
      <View style={styles.closing}>
        <Text>Sincerely,</Text>
        <Text style={styles.signature}>{form.name}</Text>
      </View>
    </Page>
  </Document>
);

export default CoverLetterPDF;
