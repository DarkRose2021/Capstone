import "./App.scss";
import { inject } from "@vercel/analytics";

import Footer from "./pages/OnAllPages/Footer";
import Navbar from "./pages/OnAllPages/Navbar";
import Popup from "./pages/OnAllPages/Popup";

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
