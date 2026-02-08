import { Link } from "react-router-dom";
import { usePagination, DOTS } from "./usePagination";

const Pagination = (props) => {
	const {
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		pathname,
	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	return (
		<div className="paginate">
			{paginationRange.map((p, i) => (
				<div key={i}>
					{p === DOTS ? (
						<span>---</span>
					) : (
						<Link
							to={`${pathname}?page=${p}`}
							key={i}
							className={p === currentPage ? "active" : ""}
						>
							{p}
						</Link>
					)}
				</div>
			))}
		</div>
	);
};

export default Pagination;
