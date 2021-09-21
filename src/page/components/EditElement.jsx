import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ThemeContext from "../../components/ThemeContext.js";

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
		<ThemeContext.Consumer>
			{({ colors }) => (
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
							<h1 className="leading-6 font-medium">{label}</h1>
							<div className="w-0"></div>
						</Link>
					</div>
					<div className="mx-3 py-4">
						<textarea
							type="text"
							name="data"
							id="data"
							autoComplete="none"
							rows="4"
							className="block max-w-lg w-full shadow-sm sm:text-sm rounded-md"
							defaultValue={data}
							{...register("example")}
							placeholder={data}
							style={{
								backgroundColor: colors?.input_background,
								color: colors?.input_color,
								color: colors?.input_color,
								borderColor: colors?.input_border,
							}}
						/>

						<div className="flex justify-end pt-4">
							<Link
								to="/"
								className="py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
								style={{
									backgroundColor: colors?.button,
									color: colors?.button_color,
								}}
							>
								{browser.i18n.getMessage("btnCancel")}
							</Link>
							<button
								type="submit"
								className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
								style={{
									backgroundColor: colors?.button_primary,
									color: colors?.button_primary_color,
								}}
							>
								{browser.i18n.getMessage("btnSave")}
							</button>
						</div>
					</div>
				</div>
			)}
		</ThemeContext.Consumer>
	);
}

export default EditElement;
