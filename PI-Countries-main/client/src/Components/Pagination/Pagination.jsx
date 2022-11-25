import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActualPage } from "../../Redux/actions";
import "./Pagination.css";
import { Next, Prev } from "../../Redux/actions";
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
				<li
					onClick={() => dispatch(Prev(activePage))}
					hidden={activePage <= 1 ? true : false}
					className={"button"}>
					🡸
				</li>
				{pages.map((el) => (
					<li
						className={`li ${activePage === el ? "activePage" : ""}`}
						onClick={() => {
							dispatch(ActualPage(el));
						}}
						key={el}>
						{el}
					</li>
				))}
				<li
					onClick={() => dispatch(Next(activePage))}
					hidden={activePage === pages.length ? true : false}>
					🡺
				</li>
			</ul>
		</>
	);
};
