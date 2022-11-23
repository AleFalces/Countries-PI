import React from "react";

export default function Filter({ arr, propsFunction, propName }) {
	return (
		<select onChange={propsFunction}>
			{arr.map((el, i) => (
				<option key={el + i} value={propName ? el[propName] : el}>
					{propName ? el[propName] : el}
				</option>
			))}
		</select>
	);
}
