import React from "react";
import { AppUi } from "./AppUi";
import { TodoProvider } from "../Context";


function App() {
	return (
		<TodoProvider>
			<AppUi />
		</TodoProvider>
	);
}

export default App;
