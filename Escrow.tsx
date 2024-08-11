import React, { useState, useEffect } from 'react';

interface Escrow {
  id: number;
  title: string;
  amount: number;
  status: string; // Could be 'open', 'closed', or 'pending'
}

const EscrowManager: React.FC = () => {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/escrows`)
      .then(response => response.json())
      .then(setEscrows)
      .catch(console.error);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/escrows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, amount })
      });
      const newEscrow = await response.json();
      setEscrows(current => [...current, newEscrow]);
      setTitle('');
      setAmount(0);
    } catch (error) {
      console.error("Failed to create escrow", error);
    }
  };

  return (
    <div>
      <h2>Create Escrow</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount: </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={e => setAmount(parseFloat(e.target.value))}
          />
        </div>
        <button type="submit">Create Escrow</button>
      </form>
      <h2>Existing Escrows</h2>
      <ul>
        {escrows.map(escrow => (
          <li key={escrow.id}>{`${escrow.title} - $${escrow.amount} [${escrow.status}]`}</li>
        ))}
      </ul>
    </div>
  );
};

export default EscrowManager;