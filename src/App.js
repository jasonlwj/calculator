import { useState } from 'react';
import NumberPad from './components/NumberPad';
import './App.css';

const Operand = ({ value }) => (
	<div className="Operand">
		{value}
	</div>
);

const EvaluateKey = ({ evaluate }) => (
	<div className="Key EvaluateKey" onClick={evaluate}>
		=
	</div>
);

const OperatorKey = ({ value, onClick }) => {
	const displayedValue = (value === "*")
		? "×"
		: value;
	
	return (
		<div className="Key" onClick={onClick}>
			{displayedValue}
		</div>
	);
}

const Expression = ({ value }) => (
	<div className="Expression">
		{value}
	</div>
);

const App = () => {
	const [displayedValue, setDisplayedValue] = useState("0")
	const [operands, setOperands] = useState([]);
	const [currentOperation, setCurrentOperation] = useState(null);

	// TODO
	const inputNumeral = value => {
		const newDisplayedValue = (displayedValue === "0") 
			? value.toString()
			: displayedValue + value;

		setDisplayedValue(newDisplayedValue);
	}

	const inputDecimal = () => {
		if (displayedValue.includes('.'))
			return;

		setDisplayedValue(displayedValue + '.');
	}

	const negateOperand = () => {
		// console.log("negateOperand");
	}

	const inputOperation = operation => {
		const newOperands = operands.concat(displayedValue);
		setOperands(newOperands);
		setCurrentOperation(operation);
	}

	const evaluate = () => {
		// setCurrentOperand("here's your answer!");
	}

	const generateExpression = () => {
		return `
			${(operands[0] || "")} ${(currentOperation || "")} ${(operands[1] || "")}
		`;
	}

	return (
		<div className="App">
			<div className="Display">
				<Expression value={generateExpression()} />
				<Operand value={displayedValue} />
			</div>
			<div className="KeyPad">
				<NumberPad
					inputNumeral={inputNumeral}
					inputDecimal={inputDecimal}
					negateOperand={negateOperand}
				/>
				<div className="OperatorPad">
					<OperatorKey value={"*"} onClick={() => inputOperation("*")} />
					<OperatorKey value={"-"} onClick={() => inputOperation("-")} />
					<OperatorKey value={"+"} onClick={() => inputOperation("+")} />
					<EvaluateKey onClick={evaluate} />
				</div>
			</div>
		</div>
	);
}

export default App;
