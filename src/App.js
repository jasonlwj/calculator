import { useState } from 'react';
import NumberPad from './components/NumberPad';
import './App.css';

const NumInput = ({ value }) => (
	<div className="NumInput">
		{value}
	</div>
);

const EvaluateKey = ({ onClick }) => (
	<div className="Key EvaluateKey" onClick={onClick}>
		=
	</div>
);

const OperatorKey = ({ operator, onClick }) => {
	const symbolMapping = {
		'*': '×',
		'/': '÷'
	};

	const displayedOperator = symbolMapping[operator] || operator;
	
	return (
		<div className="Key" onClick={onClick}>
			{displayedOperator}
		</div>
	);
}

const Expression = ({ value }) => (
	<div className="Expression">
		{value}
	</div>
);

const App = () => {
	const [numInput, setNumInput] = useState('0');
	const [newInputReady, setNewInputReady] = useState(true);
	const [previousNum, setPreviousNum] = useState(null);
	const [currentNum, setCurrentNum] = useState(null);
	const [operation, setOperation] = useState(null);

	const inputNumeral = value => {
		if (newInputReady) {
			setNewInputReady(false);
			setNumInput('0');
		} 

		const newNumInput = (newInputReady) 
			? value.toString()
			: numInput + value;

		setNumInput(newNumInput);
	}

	const inputDecimal = () => {
		if (numInput.includes('.'))
			return;

		setNumInput(numInput + '.');
	}

	const negateTerm = () => {
		if (numInput === '0') 
			return;

		const newNumInput = (numInput.startsWith('-'))
			? numInput.substring(1)
			: '-'.concat(numInput);

		setNumInput(newNumInput);
	}

	const inputOperation = operator => {
		if (previousNum)
			evaluate();
		else
			setPreviousNum(numInput);
		
		setNewInputReady(true);
		setOperation(operator);
	}

	const evaluate = () => {
		const firstTerm = parseFloat(previousNum);
		const secondTerm = parseFloat(numInput);
		let result;

		switch(operation) {
			case '+': 
				result = firstTerm + secondTerm;
				break;
			case '-': 
				result = firstTerm - secondTerm;
				break;
			case '*': 
				result = firstTerm * secondTerm;
				break;
			case '/': 
				result = firstTerm / secondTerm;
				break;
			default:
		}

		setPreviousNum(result.toString());
		setNumInput(result);
	}

	const generateExpression = () => {
		return `
			State: previousNum = ${(previousNum || "")} currentNum = ${(currentNum || "")} operation = ${(operation || "") }
		`;
	}

	return (
		<div className="App">
			<div className="Display">
				<Expression value={generateExpression()} />
				<NumInput value={numInput} />
			</div>
			<div className="KeyPad">
				<NumberPad
					inputNumeral={inputNumeral}
					inputDecimal={inputDecimal}
					negateTerm={negateTerm}
				/>
				<div className="OperatorPad">
					<OperatorKey operator={"/"} onClick={() => inputOperation("/")} />
					<OperatorKey operator={"*"} onClick={() => inputOperation("*")} />
					<OperatorKey operator={"-"} onClick={() => inputOperation("-")} />
					<OperatorKey operator={"+"} onClick={() => inputOperation("+")} />
					<EvaluateKey onClick={evaluate} />
				</div>
			</div>
		</div>
	);
}

export default App;
