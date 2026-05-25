'use client';

import { useState } from 'react';

export default function SupportPage() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  return (
    <section>
      <h2>Help — Support tickets</h2>
      <p>Create a ticket for our support team. Live chatbot available on storefront.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Ticket submitted (wire to POST /support/tickets after login)');
        }}
      >
        <label>
          Subject
          <input value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </label>
        <label>
          Message
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={5} required />
        </label>
        <button type="submit">Create ticket</button>
      </form>
      <div className="chat-widget" style={{ marginTop: '2rem', padding: '1rem', background: '#e3f2fd', borderRadius: 8 }}>
        <strong>Live chat</strong>
        <p>Bot: Hello! How can Gogate Products help you today?</p>
      </div>
    </section>
  );
}
