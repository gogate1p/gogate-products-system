import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';

const API = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export default function App() {
  const [shipmentId, setShipmentId] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gogate Delivery Agent</Text>
      <Text style={styles.sub}>Scan hub QR · OFD deliveries · COD QR payment</Text>

      <Text style={styles.section}>Hub check-in</Text>
      <Button title="Scan Hub QR Code" onPress={() => alert('Open camera scanner')} />

      <Text style={styles.section}>Working time slot</Text>
      <Text>Select daily slot after approval (API PATCH /agents/:id/slots)</Text>

      <Text style={styles.section}>COD — gogateproducts.store QR</Text>
      <TextInput
        style={styles.input}
        placeholder="Shipment ID"
        value={shipmentId}
        onChangeText={setShipmentId}
      />
      <Button
        title="Generate payment QR"
        onPress={() => alert(`QR for shipment ${shipmentId} — marks codCollected on pay`)}
      />
      <Button
        title="Submit hub delivery report"
        onPress={() => alert('POST confirm-delivery — marks order Delivered')}
      />

      <Text style={styles.note}>
        Order stays Out for Delivery until hub report submitted. Shipment delivery update on customer portal clears
        only after confirm-delivery.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 48 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  sub: { color: '#666', marginBottom: 24 },
  section: { fontWeight: '600', marginTop: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6, marginBottom: 8 },
  note: { marginTop: 24, fontSize: 12, color: '#888' },
});
