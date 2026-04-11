import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <main className="py-4">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
