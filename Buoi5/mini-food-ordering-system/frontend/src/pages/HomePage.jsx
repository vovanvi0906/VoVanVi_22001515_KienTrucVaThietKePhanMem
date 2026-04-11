const pageStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "56px 24px",
};

const heroStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  padding: "48px 32px",
  boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)",
  border: "1px solid #e5e7eb",
};

const titleStyle = {
  margin: "0 0 16px",
  fontSize: "36px",
  color: "#0f172a",
};

const textStyle = {
  margin: 0,
  fontSize: "18px",
  lineHeight: "1.7",
  color: "#475569",
};

function HomePage() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <h1 style={titleStyle}>Welcome to Mini Food App</h1>
        <p style={textStyle}>
          Chào mừng đến với Mini Food Ordering System.
        </p>
      </section>
    </main>
  );
}

export default HomePage;
