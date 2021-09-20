import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function EditElement({ location }) {
	const { label, data } = location.state;
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	console.log("props", location.state);
	return (
		<div className="w-96 select-none divide-y">
			<div className="flex justify-center m-4">
				<Link
					to="/"
					className="flex justify-between hover:bg-gray-200 rounded p-2 w-full"
				>
					<div className="self-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</div>
					<h1 className="leading-6 font-bold text-gray-900">{label}</h1>
					<div className="w-0"></div>
				</Link>
			</div>
			<div className="mx-3 py-4">
				<textarea
					type="text"
					name="published"
					id="published"
					autoComplete="none"
					rows="4"
					className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
					defaultValue={data}
					{...register("example")}
					placeholder={data}
				/>
			</div>

			{/* <div className="mx-3 py-4">
				<button type="submit">Save</button>
			</div> */}
			<div className="mx-3 py-4">
				<div className="flex justify-end">
					<Link
						to="/"
						className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Cancel
					</Link>
					<button
						type="submit"
						className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

export default EditElement;
