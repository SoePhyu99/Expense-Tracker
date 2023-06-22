interface Props {
	categories: string[];
	onSelect: (category: string) => void;
}

const ExpenseFilter = ({ categories, onSelect }: Props) => {
	return (
		<select
			className="form-select"
			onChange={(e) => onSelect(e.target.value)}
		>
			{categories.map((category, index) => (
				<option key={index} value={category}>
					{category === "" ? "All" : category}
				</option>
			))}
		</select>
	);
};

export default ExpenseFilter;
