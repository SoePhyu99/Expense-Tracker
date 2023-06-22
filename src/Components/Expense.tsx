interface Category {
	id: number;
	description: string;
	amount: number;
	category: string;
}

interface Props {
	items: Category[];
	onDelete: (id: number) => void;
}

const Expense = ({ items, onDelete }: Props) => {
	if (items.length == 0) return null;
	return (
		<div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Description</th>
						<th scope="col">Amount</th>
						<th scope="col">Category</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.id}>
							<td scope="row">{item.description}</td>
							<td>${item.amount}</td>
							<td>{item.category}</td>
							<td>
								<button
									onClick={() => onDelete(item.id)}
									className="btn btn-outline-danger"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
					<tr>
						<td scope="row">Total</td>
						<td scope="row">
							{items
								.reduce((accu, curr) => curr.amount + accu, 0)
								.toFixed(2)}
							$
						</td>
						<td scope="row"></td>
						<td scope="row"></td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Expense;
