import "./App.scss";
import { inject } from "@vercel/analytics";

import Footer from "./pages/Footer";
import Navbar from "./pages/Navbar";
import Popup from "./pages/Popup";

function App() {
	inject();

	return (
		<div>
			<Popup />
			<Navbar />
			<Footer />
		</div>
	);
}

export default App;
