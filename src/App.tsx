import { useState } from "react";
import Form from "./Components/Form";
import Expense from "./Components/Expense";
import ExpenseFilter from "./Components/ExpenseFilter";
import { FieldValues } from "react-hook-form";

interface FormData {
	id: number;
	description: string;
	amount: number;
	category: string;
}

function App() {
	let [data, setData] = useState<FormData[]>([]);
	let [select, setSelect] = useState<FormData[]>(data);
	let categories = ["", "Groceries", "Utilities", "Entertainment"];

	let onDelete = (id: number) =>
		setData(data.filter((item) => item.id !== id));

	let onSelect = (category: string) =>
		setSelect(
			data.filter((item1) =>
				category === "" ? item1 : item1.category == category
			)
		);
	let onFormSubmit = (formData: FieldValues) => {
		setData([
			...data,
			{
				id: data.length + 1,
				description: formData.description,
				amount: formData.amount,
				category: formData.category,
			},
		]);
	};

	return (
		<div className="container mt-3">
			<Form
				categories={categories}
				onFormSubmit={(formData) => onFormSubmit(formData)}
			></Form>
			<ExpenseFilter
				categories={categories}
				onSelect={(item) => onSelect(item)}
			></ExpenseFilter>
			<Expense onDelete={(id) => onDelete(id)} items={select}></Expense>
		</div>
	);
}

export default App;
