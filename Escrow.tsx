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
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/escrows`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(setEscrows)
      .catch(error => {
        console.error("There was a problem with your fetch operation:", error);
        setErrorMessage("Failed to load existing escrows. Please try again later.");
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Basic validation
    if (!title || amount <= 0) {
      setErrorMessage('Please make sure all fields are correctly filled out.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/escrows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, amount })
      });

      if (!response.ok) {
        throw new Error('Failed to create new escrow');
      }

      const newEscrow = await response.json();
      setEscrows(current => [...current, newEscrow]);
      setTitle(''); // Reset the title
      setAmount(0); // Reset the amount
      setErrorMessage(''); // Clear any existing errors
    } catch (error) {
      console.error("Failed to create escrow:", error);
      setErrorMessage("Failed to create escrow. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create Escrow</h2>
      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
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