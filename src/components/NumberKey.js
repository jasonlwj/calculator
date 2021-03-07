import React from 'react';

const NumberKey = ({ value, onClick }) => (
	<div onClick={onClick} className="Key NumberKey">
		{value}
	</div>
);

export default NumberKey;
