import "./App.scss";
import { inject } from "@vercel/analytics";
import { SpeedInsights } from "@vercel/speed-insights/react"

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
			<SpeedInsights />
		</div>
	);
}

export default App;
