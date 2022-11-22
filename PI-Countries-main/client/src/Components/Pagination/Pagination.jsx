import React from "react";
import { useDispatch } from "react-redux";
import { ActualPage } from "../../Redux/actions";
import "./Pagination.css";
export const Pagination = ({ countriesPerPage, countries }) => {
	const dispatch = useDispatch();
	let pages = [];
	for (let i = 1; i <= Math.ceil(countries.length / countriesPerPage); i++) {
		pages.push(i);
	}
	return (
		<>
			<ul className="Pages">
				{pages.map((el) => (
					<li
						className="li"
						onClick={() => {
							dispatch(ActualPage(el));
						}}
						key={el}>
						{el}
					</li>
				))}
			</ul>
		</>
	);
};
