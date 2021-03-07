import { useState } from 'react';
import NumberPad from './components/NumberPad';
import './App.css';

const Result = ({ value }) => (
	<div className="Result">
		{value}
	</div>
);

const EvaluateKey = () => (
	<div className="Key EvaluateKey">
		=
	</div>
);

const OperatorKey = ({ value, onClick }) => (
	<div className="Key" onClick={onClick}>
		{value}
	</div>
);

const App = () => {
	const [result, setResult] = useState("0");
	const [currentOperation, setCurrentOperation] = useState(null);

	const inputNumeral = value => {
		const newResult = (result === "0") 
			? value.toString()
			: result + value;

		setResult(newResult);
	}

	const inputDecimal = () => {
		if (result.includes('.'))
			return;

		setResult(result + '.');
	}

	const negateResult = () => {
		console.log("negateResult");
	}

	return (
		<div className="App">
			<Result value={result} />
			<div className="KeyPad">
				<NumberPad
					inputNumeral={inputNumeral}
					inputDecimal={inputDecimal}
					negateResult={negateResult}
				/>
				<div className="OperatorPad">
					<OperatorKey value={"×"} onClick={() => setCurrentOperation("multiply")} />
					<OperatorKey value={"-"} onClick={() => setCurrentOperation("subtract")} />
					<OperatorKey value={"+"} onClick={() => setCurrentOperation("add")} />
					<EvaluateKey />
				</div>
			</div>
		</div>
	);
}

export default App;
