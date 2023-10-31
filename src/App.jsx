import "./App.css";
import GalleryGrid from "./components/GalleryGrid/GalleryGrid";
import TopBar from "./components/TopBar/TopBar";

function App() {
  return (
    <main>
      {/* top bar section */}
      <TopBar />
      {/* gallery grid section */}
      <GalleryGrid />
    </main>
  );
}

export default App;
