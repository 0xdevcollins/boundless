// import { Button } from "@/components/ui/button";
// import { getPublicKey, signTransaction } from "@/hooks/useStellarWallet";
// import createProject from "@/src/contracts/project_contract";
// import React, { useState, useEffect } from "react";

// const CreateProjectComponent = () => {
// 	const [walletAddress, setWalletAddress] = useState<string | null>(null);
// 	const [projectId, setProjectId] = useState("");
// 	const [fundingTarget, setFundingTarget] = useState("");
// 	const [milestoneCount, setMilestoneCount] = useState("");
// 	const [loading, setLoading] = useState(false);
// 	const [status, setStatus] = useState("");

// 	useEffect(() => {
// 		const fetchPublicKey = async () => {
// 			const address = await getPublicKey();
// 			if (address) {
// 				setWalletAddress(address);
// 				createProject.options.publicKey = address;
// 				createProject.options.signTransaction = signTransaction;
// 			}
// 		};
// 		fetchPublicKey();
// 	}, []);

// 	const handleCreateProject = async () => {
// 		if (!walletAddress) {
// 			alert("Please connect your wallet first.");
// 			return;
// 		}

// 		try {
// 			setLoading(true);
// 			setStatus("Preparing transaction...");

// 			setStatus("Building transaction...");
// 			const tx = await createProject.create_project({
// 				project_id: projectId,
// 				creator: walletAddress,
// 				funding_target: BigInt(fundingTarget),
// 				metadata_uri: "https://example.com/project-metadata",
// 				milestone_count: Number.parseInt(milestoneCount),
// 			});

// 			const { result } = await tx.signAndSend();
// 			console.log(result);

// 			setStatus("Success!");
// 			alert("Project successfully created!");

// 			setProjectId("");
// 			setFundingTarget("");
// 			setMilestoneCount("");
// 		} catch (error) {
// 			console.error("Error creating project:", error);
// 			setStatus("Failed");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div className="p-6 space-y-4 border rounded-lg shadow-lg max-w-md mx-auto">
// 			<h2 className="text-lg font-semibold">Create a New Project</h2>

// 			{status && (
// 				<div
// 					className={`text-sm p-2 rounded ${status === "Success!" ? "bg-green-100" : status === "Failed" ? "bg-red-100" : "bg-blue-100"}`}
// 				>
// 					{status}
// 				</div>
// 			)}

// 			<input
// 				type="text"
// 				placeholder="Project ID (Numeric)"
// 				value={projectId}
// 				onChange={(e) => setProjectId(e.target.value)}
// 				className="w-full p-2 border rounded"
// 			/>

// 			<input
// 				type="text"
// 				placeholder="Funding Target (XLM)"
// 				value={fundingTarget}
// 				onChange={(e) => setFundingTarget(e.target.value)}
// 				className="w-full p-2 border rounded"
// 			/>

// 			<input
// 				type="text"
// 				placeholder="Milestone Count"
// 				value={milestoneCount}
// 				onChange={(e) => setMilestoneCount(e.target.value)}
// 				className="w-full p-2 border rounded"
// 			/>

// 			<Button
// 				onClick={handleCreateProject}
// 				disabled={loading || !projectId || !fundingTarget || !milestoneCount}
// 				className="w-full"
// 			>
// 				{loading ? `${status}` : "Create Project"}
// 			</Button>

// 			{!walletAddress && (
// 				<p className="text-sm text-red-500">Please connect your wallet first</p>
// 			)}
// 		</div>
// 	);
// };

// export default CreateProjectComponent;
import React from 'react'

const CreateProjectComponent = () => {
  return (
	<div>CreateProjectComponent</div>
  )
}

export default CreateProjectComponent
