import React from 'react';
import NumberKey from './NumberKey';

const NumberPad = ({ inputNumeral, inputDecimal, negateTerm }) => {
	const numRows = [7, 4, 1];
	const numPad = numRows.map(row =>
		<div key={row} className="NumberRow">
			<NumberKey value={row} onClick={() => inputNumeral(row)} />
			<NumberKey value={row + 1} onClick={() => inputNumeral(row + 1)} />
			<NumberKey value={row + 2} onClick={() => inputNumeral(row + 2)} />
		</div>
	);

	return (
		<div className="NumberPad">
			{numPad}
			<div className="NumberRow">
				<NumberKey value="+/-" onClick={negateTerm} />
				<NumberKey value={0} onClick={() => inputNumeral(0)} />
				<NumberKey value="." onClick={inputDecimal} />
			</div>
		</div>
	);
}

export default NumberPad;
