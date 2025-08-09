import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetail: React.FC = () => {
	const { id } = useParams();

	return (
		<div>
			<h1 className='text-2xl font-bold'>Project ID: {id}</h1>
			<p className='mt-2 text-gray-300'>
				This is where project details, chats, and test cases will appear.
			</p>
		</div>
	);
};

export default ProjectDetail;
