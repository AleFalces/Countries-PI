import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActualPage } from "../../Redux/actions";
import "./Pagination.css";
export const Pagination = ({ countriesPerPage, countries }) => {
	const dispatch = useDispatch();
	const activePage = useSelector((state) => state.actualPage);
	let pages = [];
	for (let i = 1; i <= Math.ceil(countries.length / countriesPerPage); i++) {
		pages.push(i);
	}
	return (
		<>
			<ul className="Pages">
				{pages.map((el) => (
					<li
						className={`li ${activePage === el ? "activePage" : ""}`}
						onClick={() => {
							console.log(activePage);
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
