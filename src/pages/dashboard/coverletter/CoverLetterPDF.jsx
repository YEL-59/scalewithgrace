import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 1.5,
    color: "#1f2937",
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
  },
  contact: {
    fontSize: 10,
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  closing: {
    marginTop: 20,
  },
});

const CoverLetterPDF = ({ form, data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{form.name}</Text>
        <Text style={styles.title}>{form.title}</Text>
        <Text style={styles.contact}>
          {new Date().toLocaleDateString()} | {form.email} | {form.phone}
        </Text>
      </View>

      {/* Greeting */}
      <Text style={styles.section}>
        Dear {form.hiringManager || "Hiring Manager"},
      </Text>

      {/* Body */}
      <Text style={styles.section}>{data?.data?.intro}</Text>
      <Text style={styles.section}>{data?.data?.body}</Text>
      <Text style={styles.section}>{data?.data?.conclusion}</Text>

      {/* Closing */}
      <View style={styles.closing}>
        <Text>Sincerely,</Text>
        <Text style={{ marginTop: 10 }}>{form.name}</Text>
      </View>
    </Page>
  </Document>
);

export default CoverLetterPDF;
