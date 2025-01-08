export default function Income() {
  const transactionsData = [
    { amount: 720, date: "Jan 3, '23", id: "1" },
    { amount: 560, date: "Dec 12, '22", id: "2" },
    { amount: 980, date: "Dec 3, '22", id: "3" },
  ];
  return (
    <section className="host-income">
      <h1>Income</h1>
      <p>
        Last <span>30 days</span>
      </p>
      <h2>$2,260</h2>
      <img
        className="graph"
        src="https://ocoguozldfoijgxkgmha.supabase.co/storage/v1/object/sign/vansApp/otherImages/income-graph.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2YW5zQXBwL290aGVySW1hZ2VzL2luY29tZS1ncmFwaC5wbmciLCJpYXQiOjE3MzYzNTQ3NDQsImV4cCI6MTc2Nzg5MDc0NH0.SPsNTdmIuIK7yW-tpajphWLW3-8ArMYb_LyKtOCMqjI&t=2025-01-08T16%3A45%3A44.396Z.png"
        alt="Income graph"
      />
      <div className="info-header">
        <h3>Your transactions (3)</h3>
        <p>
          Last <span>30 days</span>
        </p>
      </div>
      <div className="transactions">
        {transactionsData.map((item) => (
          <div key={item.id} className="transaction">
            <h3>${item.amount}</h3>
            <p>{item.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
