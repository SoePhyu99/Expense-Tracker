import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
	description: z.string().min(1, { message: "Description must be fill." }),
	amount: z
		.number({ invalid_type_error: "Amount is required." })
		.min(1, { message: "Add at least 1." }),
	category: z.string().min(1, { message: "Category must be choose." }),
});

type FormData = z.infer<typeof schema>;

interface Props {
	categories: string[];
	onFormSubmit: (data: FieldValues) => void;
}

const Form = ({ categories, onFormSubmit }: Props) => {
	let {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});
	let onSubmit = (data: FieldValues) => {
		onFormSubmit(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-3">
				<label htmlFor="description" className="form-label">
					Description
				</label>
				<input
					{...register("description")}
					id="description"
					type="text"
					className="form-control"
				/>
				{errors.description && (
					<p className="text-danger">{errors.description.message}</p>
				)}
			</div>
			<div className="mb-3">
				<label htmlFor="amount" className="form-label">
					Amount
				</label>
				<input
					{...register("amount", { valueAsNumber: true })}
					id="amount"
					type="number"
					className="form-control"
				/>
				{errors.amount && (
					<p className="text-danger">{errors.amount.message}</p>
				)}
			</div>
			<div className="mb-3">
				<label htmlFor="category" className="form-label">
					Category
				</label>
				<select
					{...register("category")}
					id="category"
					className="form-select"
				>
					{categories.map((category) => (
						<option key={category}>{category}</option>
					))}
				</select>
				{errors.category && (
					<p className="text-danger">{errors.category.message}</p>
				)}
			</div>
			<button
				disabled={!isValid}
				type="submit"
				className="btn btn-primary mb-3"
			>
				Submit
			</button>
		</form>
	);
};

export default Form;
