import { useState } from 'react';
import NumberPad from './components/NumberPad';
import './App.css';

const TermInput = ({ value }) => (
	<div className="TermInput">
		{value}
	</div>
);

const EvaluateKey = ({ evaluate }) => (
	<div className="Key EvaluateKey" onClick={evaluate}>
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
	const [termInput, setTermInput] = useState("0");
	const [previousTerm, setPreviousTerm] = useState(null);
	const [currentTerm, setCurrentTerm] = useState(null);
	const [currentOperator, setCurrentOperator] = useState(null);

	const inputNumeral = value => {
		const newTermInput = (termInput === "0") 
			? value.toString()
			: termInput + value;

		setTermInput(newTermInput);
	}

	const inputDecimal = () => {
		if (termInput.includes('.'))
			return;

		setTermInput(termInput + '.');
	}

	const negateTerm = () => {
		// console.log("negateTerm");
	}

	const inputOperator = operator => {
		setPreviousTerm(termInput);
		setCurrentTerm("");
		setCurrentOperator(operator);
	}

	const evaluate = () => {
		// setCurrentTerm("here's your answer!");
	}

	const generateExpression = () => {
		return `
			${(previousTerm || "")} ${(currentOperator || "")} ${(currentTerm || "")}
		`;
	}

	return (
		<div className="App">
			<div className="Display">
				<Expression value={generateExpression()} />
				<TermInput value={termInput} />
			</div>
			<div className="KeyPad">
				<NumberPad
					inputNumeral={inputNumeral}
					inputDecimal={inputDecimal}
					negateTerm={negateTerm}
				/>
				<div className="OperatorPad">
					<OperatorKey operator={"/"} onClick={() => inputOperator("/")} />
					<OperatorKey operator={"*"} onClick={() => inputOperator("*")} />
					<OperatorKey operator={"-"} onClick={() => inputOperator("-")} />
					<OperatorKey operator={"+"} onClick={() => inputOperator("+")} />
					<EvaluateKey onClick={evaluate} />
				</div>
			</div>
		</div>
	);
}

export default App;
